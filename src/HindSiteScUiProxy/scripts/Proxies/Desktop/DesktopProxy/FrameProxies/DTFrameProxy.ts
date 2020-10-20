import { DocumentJacket } from "../../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { FrameElemJacket } from "../../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { ScWindowTypeResolver } from "../../../../../../Shared/scripts/Agents/UrlAgent/ScWindowTypeResolver";
import { DefaultStateOfDTFrame } from "../../../../../../Shared/scripts/Classes/Defaults/DefaultStateOfDTFrame";
import { ReadyStateNAB } from "../../../../../../Shared/scripts/Classes/ReadyStateNAB";
import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { ScWindowType } from "../../../../../../Shared/scripts/Enums/50 - scWindowType";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullDocProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { IStateFullFrameProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullFrameProxy";
import { IStateOfDTFrame } from "../../../../../../Shared/scripts/Interfaces/StateOf/IStateOfDTFrame";
import { IStateOf_ } from "../../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { ContentEditorDocProxy } from "../../../ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { ScDocProxyResolver } from "../../../ScDocProxyResolver";
import { MarketingControlPanelDocProxy } from "../../../StateFullDocProxies/MarketingControlPanelProxy";
import { MediaLibraryProxy } from "../../../StateFullDocProxies/MediaLibraryProxy";
import { TemplateManagerProxy } from "../../../StateFullDocProxies/TemplateManagerProxy";
import { JqueryModalDialogsFrameProxy } from "../../../StateLessDocProxies/StateLessFrameProxies/JqueryModalDialogsFrameProxy";
import { _ContentTreeBasedProxyMutationEvent_Observer } from "../Events/ContentEditorProxyMutationEvent/ContentEditorProxyMutationEvent_Observer";
import { I_ContentTreeBasedProxyMutationEvent_Payload } from "../Events/ContentEditorProxyMutationEvent/IContentEditorProxyMutationEvent_Payload";
import { DTFrameProxyMutationEvent_Subject } from "../Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Subject";
import { IDTFrameProxyMutationEvent_Payload } from "../Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload";
import { _BaseScFrameProxy } from "./_BaseScFrameProxy";

export class DTFrameProxy extends _BaseScFrameProxy<IStateOfDTFrame> implements IStateFullFrameProxy {
  FrameTypeDiscriminator = DTFrameProxy.name;
  Friendly: string = DTFrameProxy.name;
  private _ContentTreeBasedProxyMutationEvent_Observer: _ContentTreeBasedProxyMutationEvent_Observer;
  private StateFullProxyFactory: ScDocProxyResolver;
  public DTFrameProxyMutationEvent_Subject: DTFrameProxyMutationEvent_Subject;
  public HostedStateFullProxy: IStateFullDocProxy;
  readonly ScProxyDisciminator = ScProxyDisciminator.DTFrameProxy;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.DTFrameProxy];
  private JqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy;

  constructor(apiCore: IAPICore, frameJacket: FrameElemJacket, jqueryModalDialogsFrameProxy: JqueryModalDialogsFrameProxy) { //HTMLIFrameElement |
    super(apiCore, frameJacket);

    this.JqueryModalDialogsFrameProxy = jqueryModalDialogsFrameProxy;

    this.ErrorHand.ThrowIfNullOrUndefined(DTFrameProxy.name, [frameJacket, this.JqueryModalDialogsFrameProxy]);

    this.Friendly = 'DTFrameProxy_' + this.FrameJacket.GetNativeIframeId();

    this.InstantiateInstance();
  }

  InstantiateInstance(): void {
    this.StateFullProxyFactory = new ScDocProxyResolver(this.ApiCore);
  }

  async InstantiateAsyncMembers(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.InstantiateAsyncMembers.name, DTFrameProxy.name);

      this.ErrorHand.ThrowIfNullOrUndefined(this.InstantiateAsyncMembers.name, [this.FrameJacket]);

      await this.FrameJacket.WaitForCompleteNABFrameElement(this.Friendly)
        .then((result: ReadyStateNAB) => {
          if (!result.IsCompleteNAB()) {
            reject(result.DocumentReadtStateFriendly())
          }
        })
        .then(() => this.StateFullProxyFactory.ScDocProxyFactoryMake( this.FrameJacket.DocumentJacket, this.JqueryModalDialogsFrameProxy))
        .then((stateFullProxy: IStateFullDocProxy) => this.HostedStateFullProxy = stateFullProxy)

        .then(() => {
          this.DTFrameProxyMutationEvent_Subject = new DTFrameProxyMutationEvent_Subject(this.ApiCore);
          this._ContentTreeBasedProxyMutationEvent_Observer = new _ContentTreeBasedProxyMutationEvent_Observer(this.ApiCore, this);
        })

        .then(() => resolve())
        .catch((err) => reject(this.InstantiateAsyncMembers.name + ' | ' + err));

      this.Logger.FuncEnd(this.InstantiateAsyncMembers.name, DTFrameProxy.name);
    });
  }

  async WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, DTFrameProxy.name);

    if (this.HostedStateFullProxy.ScProxyDisciminator === ScProxyDisciminator.ContentEditor) {
      (<ContentEditorDocProxy>this.HostedStateFullProxy).__ContentTreeBasedProxyMutationEvent_Subject.RegisterObserver(this._ContentTreeBasedProxyMutationEvent_Observer);
    } else if (this.HostedStateFullProxy.ScProxyDisciminator === ScProxyDisciminator.MediaLibrary) {
      (<MediaLibraryProxy>this.HostedStateFullProxy).__ContentTreeBasedProxyMutationEvent_Subject.RegisterObserver(this._ContentTreeBasedProxyMutationEvent_Observer);
    } else if (this.HostedStateFullProxy.ScProxyDisciminator === ScProxyDisciminator.TemplateManager) {
      (<TemplateManagerProxy>this.HostedStateFullProxy).__ContentTreeBasedProxyMutationEvent_Subject.RegisterObserver(this._ContentTreeBasedProxyMutationEvent_Observer);
    } else if (this.HostedStateFullProxy.ScProxyDisciminator === ScProxyDisciminator.MarketingControlPanel) {
      (<MarketingControlPanelDocProxy>this.HostedStateFullProxy).__ContentTreeBasedProxyMutationEvent_Subject.RegisterObserver(this._ContentTreeBasedProxyMutationEvent_Observer);
    }

    this.HostedStateFullProxy.WireEvents();
    this.Logger.FuncEnd(this.WireEvents.name, DTFrameProxy.name);
  }

  async GetState(): Promise<IStateOfDTFrame> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetState.name, DTFrameProxy.name);
      let stateOfDTFrame: IStateOfDTFrame = new DefaultStateOfDTFrame();

      stateOfDTFrame.FrameStyling = stateOfDTFrame.FrameStyling = this.FrameJacket.GetFrameStyling();

      stateOfDTFrame.ZIndex = this.GetZindexAsInt();

      if (this.HostedStateFullProxy) {
        await this.HostedStateFullProxy.GetState()
          .then((statefullProxyState: IStateOf_) => stateOfDTFrame.HostedFrame = statefullProxyState)
          .catch((err) => reject(this.GetState.name + ' | ' + err));
      }

      resolve(stateOfDTFrame);
      this.Logger.FuncEnd(this.GetState.name, DTFrameProxy.name);
    });
  }

  async SetState(stateOfDTFrame: IStateOfDTFrame): Promise<void> {
    try {
      this.Logger.FuncStart(this.SetState.name, DTFrameProxy.name);
      this.DTFrameProxyMutationEvent_Subject.DisableNotifications();

      await this.HostedStateFullProxy.SetState(stateOfDTFrame.HostedFrame)
        .then(() => {
          this.SetFrameStyling(stateOfDTFrame)
          this.DTFrameProxyMutationEvent_Subject.EnableNotifications();
        });
    } catch (err) {
      this.ErrorHand.HandleFatalError(this.SetState.name, err);
    }
    this.Logger.FuncEnd(this.SetState.name, DTFrameProxy.name);
  }

  TriggerEventsForInbound() {
    if (this.HostedStateFullProxy) {
      this.HostedStateFullProxy.TriggerInboundEventsAsync();
    }
  }

  TriggerInboundEventsAsync(): void {
  }

  //----------------------------------------------------------------------

  GetDocumentJacket(): DocumentJacket {
    return this.FrameJacket.DocumentJacket;
    //return new FactoryHelper(this.apiCore).DataOneContentDocFactoryFromIframe(this);
  }

  GetNativeFrameId(): string {
    return this.FrameJacket.GetNativeIframeId()
  }

  GetScWindowType(): ScWindowType {
    let scPageTypeResolver = new ScWindowTypeResolver(this.ApiCore);
    return scPageTypeResolver.GetScWindowType( this.FrameJacket.DocumentJacket.UrlJacket);
  }

  private SetFrameStyling(stateOfDTFrame: IStateOfDTFrame) {
    this.Logger.FuncStart(this.SetFrameStyling.name);

    this.FrameJacket.SetFrameStyling(stateOfDTFrame.FrameStyling);

    this.Logger.FuncEnd(this.SetFrameStyling.name);
  }

  OnContentEditorProxyMutation(payload: I_ContentTreeBasedProxyMutationEvent_Payload) {
    let dtFrameProxyMutationEvent_Payload: IDTFrameProxyMutationEvent_Payload = {
      ContentEditorProxyMutationPayload: payload,
      FrameId: this.FrameJacket.GetNativeIframeId()
      //DTFrameProxy: this
    }
    this.DTFrameProxyMutationEvent_Subject.NotifyObserversAsync(dtFrameProxyMutationEvent_Payload);
  }
}