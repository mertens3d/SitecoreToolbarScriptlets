import { KeyPressJacket } from "../../../../DOMJacket/KeyPressJacket";
import { ReqCommandMsgFlag } from "../../Enums/10 - MessageFlag";
import { HotKeyEvent_Subject } from "../../Events/KeyBoardComboEvent/HotKeyEvent_Subject";
import { IKeyBoardComboEvent_Payload } from "../../Events/KeyBoardComboEvent/IKeyBoardComboEvent_Payload";
import { KeyBoardComboEvent_Observer } from "../../Events/KeyBoardComboEvent/KeyBoardComboEvent_Observer";
import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { IUrlJacket } from "../../Interfaces/IUrlAgent";
import { IGenericUrlParts } from "../../Interfaces/Jackets/IUrlParts";
import { _CommonBase } from "../../_CommonCoreBase";
import { HotKeys } from "./HotKeys";
import { IHotKeyEvent_Payload } from "../../Events/KeyBoardComboEvent/IHotKeyEvent_Payload";
import { ISingleHotKeyPayload, IDeepHotKeyData } from "../../Interfaces/IMessageControllerToContent";
import { SharedConst } from "../../SharedConst";

export class DeepHotKeyAgent extends _CommonBase {
  private KeyPressJacket_Observer: KeyBoardComboEvent_Observer;
  private KeyPressJacket: KeyPressJacket;
  //public ChildFrameMsgKey: string = "message";
  private UrlJacket: IUrlJacket;
  public HotKeyEvent_Subject: HotKeyEvent_Subject;

  constructor(commonCore: ICommonCore, urlJacket: IUrlJacket) {
    super(commonCore);
    this.Logger.CTORStart(DeepHotKeyAgent.name);
    this.UrlJacket = urlJacket;
    this.Instantiate();
    this.WireEvents();
    this.Logger.CTOREnd(DeepHotKeyAgent.name);
  }

  private Instantiate() {
    this.KeyPressJacket = new KeyPressJacket(this.CommonCore, HotKeys.AllHotKeys);
    this.KeyPressJacket_Observer = new KeyBoardComboEvent_Observer(this.CommonCore, this.CallBackOnKeyboardComboEvent.bind(this));
    this.HotKeyEvent_Subject = new HotKeyEvent_Subject(this.CommonCore);
  }

  private WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, 'Is top? ' + (window.self === window.top).toString());
    this.KeyPressJacket.KeyBoardComboEvent_Subject.RegisterObserver(this.KeyPressJacket_Observer);
    window.addEventListener(SharedConst.Const.KeyWords.Javascript.Events.Message, ((messageEvent: MessageEvent) => this.CallBackOnMessageFromFrame(messageEvent)));
    this.Logger.FuncEnd(this.WireEvents.name, 'Is top? ' + (window.self === window.top).toString());
  }

  CallBackOnMessageFromFrame(event: MessageEvent) {
    console.log(this.CallBackOnMessageFromFrame.name)
    if (event && event.origin === this.GetDomain()) {
      this.Logger.LogImportant('Frame message received');

      let deepHotKeydata: IDeepHotKeyData = <IDeepHotKeyData>event.data;
        console.log('Frame message received ' + JSON.stringify(deepHotKeydata));
      if (deepHotKeydata) {
        let hotKeyPayload: IHotKeyEvent_Payload = {
          ReqCommandMsgFlag: deepHotKeydata.ReqCommandMsgFlag,
          SelectText: window.getSelection ? window.getSelection().toString() : '',
        };

        console.log('Frame message sending ' + JSON.stringify(hotKeyPayload));
        this.HotKeyEvent_Subject.NotifyObserversAsync(hotKeyPayload);
      } else {
        console.log('incorrect data');
      }
    } else {
      console.log('not a valid domain: ' + event.origin);
    }
  }

  async CallBackOnKeyboardComboEvent(keyboardComboEvent_Payload: IKeyBoardComboEvent_Payload): Promise<void> {
    this.Logger.FuncStart(this.CallBackOnKeyboardComboEvent.name);

    this.Logger.LogVal('keyBoardComboEvent ', ReqCommandMsgFlag[keyboardComboEvent_Payload.ReqCommandMsgFlag]);
    console.log('keyBoardComboEvent ' + ReqCommandMsgFlag[keyboardComboEvent_Payload.ReqCommandMsgFlag]);
    this.HandleHotKeyPayload(keyboardComboEvent_Payload);
    this.Logger.FuncEnd(this.CallBackOnKeyboardComboEvent.name);
  }

  private HandleTopWindow(hotKeyPayload: IKeyBoardComboEvent_Payload) {
    this.Logger.LogImportant('hotkey received at top');
  }

  private GetDomain(): string {
    let urlParts: IGenericUrlParts = this.UrlJacket.GetUrlParts();
    let combined: string = urlParts.Protocol + '//' + urlParts.HostAndPort;
    return combined;
  }
  private BubbleMessageUp(hotKeyPayload: IKeyBoardComboEvent_Payload) {
    this.Logger.FuncStart(this.BubbleMessageUp.name);
    let maxIter: number = 100;
    let currIter: number = 0;
    let candidateHasParent: boolean = true;
    //let candidateWindow: Window = window;

    //while ((currIter < maxIter) && candidateHasParent) {
    //    if (candidateWindow.parent) {
    //        candidateHasParent = true;
    //        candidateWindow = candidateWindow.parent;
    //    }
    //    else {
    //        candidateHasParent = false;
    //    }
    //}

    //if (window.top) {
    console.log('posting from ' + this.GetDomain());

    window.top.postMessage(hotKeyPayload, this.GetDomain());
    //} else {
    //  window.postMessage(hotKeyPayload, this.UrlJacket.GetUrlParts().HostAndPort);
    //}
    this.Logger.FuncEnd(this.BubbleMessageUp.name);
  }

  private HandleHotKeyPayload(hotKeyPayload: IKeyBoardComboEvent_Payload) {
    console.log(this.HandleHotKeyPayload.name);
    if (hotKeyPayload) {
      if (window.self !== window.top) {
        console.log('bubble up');
        this.BubbleMessageUp(hotKeyPayload);
      }
    }
    else {
      console.log('at top');
      this.HandleTopWindow(hotKeyPayload);
    }
  }
}