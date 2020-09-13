import { StaticHelpers } from '../../../../../Shared/scripts/Classes/StaticHelpers';
import { BufferChar } from '../../../../../Shared/scripts/Enums/BufferChar';
import { BufferDirection } from '../../../../../Shared/scripts/Enums/BufferDirection';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { ContentEditorProxy } from '../../ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { DesktopProxy } from '../DesktopProxy/DesktopProxy';
import { ITreeMutationEvent_Payload } from '../DesktopProxy/Events/TreeMutationEvent/ITreeMutationEvent_Payload';
import { DesktopStartBarButtonProxy } from './DesktopStartBarButtonProxy';
import { FrameHelper } from '../../../Helpers/IframeHelper';
import { IFrameProxyMutated_Payload } from "../DesktopProxy/Events/Subject_DesktopIframeProxyMutatedEvent/IFrameProxyMutatedEvent_Payload";
import { TreeMutationEvent_Observer } from '../../ContentEditor/ContentEditorTreeProxy/TreeMutationEvent_Observer';


export class DesktopStartBarProxy extends LoggableBase {
  private CeProxies: ContentEditorProxy[] = [];
  private OwnerDesktopProxy: DesktopProxy;
  private SettingsAgent: ISettingsAgent;
  private __statBarElem: HTMLElement;
  private __iframeHelper: FrameHelper;

  constructor(logger: ILoggerAgent, ownerDesktopProxy: DesktopProxy, settingsAgent: ISettingsAgent) {
    super(logger);
    this.SettingsAgent = settingsAgent;
    this.Logger.InstantiateStart(DesktopStartBarProxy.name);
    this.OwnerDesktopProxy = ownerDesktopProxy;

    //this.EnrollListenerForActiveNodeChange();
    this.Logger.InstantiateEnd(DesktopStartBarProxy.name);
  }

  GetAssociatedDoc(): IDataOneDoc {
    return this.OwnerDesktopProxy.GetAssociatedDoc();
  }

  GetStartBarButtonById(targetId: string) {
    return this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.querySelector('[id=' + targetId + ']');
  }

  GetStartBarElement(): HTMLElement {
    if (!this.__statBarElem) {
      this.__statBarElem = this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.querySelector(ContentConst.Const.Selector.SC.Desktop.DtStartBar);
    }

    return this.__statBarElem;
  }

  private GetIframeHelper() {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new FrameHelper(this.Logger, this.SettingsAgent);
    }
    return this.__iframeHelper;
  }

  GetAssociatedStartBarButton(iframeElemId: string): DesktopStartBarButtonProxy {
    let foundStartBarProxy = new DesktopStartBarButtonProxy(this.Logger, iframeElemId, this);
    return foundStartBarProxy;
  }

 

  OnContentEditorProxyAdded(payload: IFrameProxyMutated_Payload) {
    this.Logger.FuncStart(this.OnContentEditorProxyAdded.name);

    if (payload) {
      if (this.CeProxies.indexOf(payload.NewCeProxy) < 0) {
        this.CeProxies.push(payload.NewCeProxy);

        let treeMutationEvent_Observer = new TreeMutationEvent_Observer(this.Logger);
        payload.NewCeProxy.RegisterObserverForTreeMutation(treeMutationEvent_Observer);
      }
    } else {
      this.Logger.ErrorAndThrow(this.OnContentEditorProxyAdded.name, 'Null ceProxy');
    }

    this.Logger.FuncEnd(this.OnContentEditorProxyAdded.name);
  }

  CallbackTreeNodeChanged(payload: ITreeMutationEvent_Payload) {
    this.Logger.FuncStart(this.CallbackTreeNodeChanged.name);
    // at this point we have a new active node (or some other change event)

    if (payload) {
      this.Logger.LogVal('target Iframe Id', payload.AssociatedIframeElemId);

      let iframeElement: HTMLIFrameElement = <HTMLIFrameElement>this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.getElementById(payload.AssociatedIframeElemId);

      if (iframeElement) {
        if (payload.ActiveNode) {
          let desktopStartBarButtonProxy: DesktopStartBarButtonProxy = this.GetAssociatedStartBarButton(payload.AssociatedIframeElemId);

          desktopStartBarButtonProxy.Update(desktopStartBarButtonProxy, payload.ActiveNode);
        }

        //we need to know what the associated button is
        //we can get that by knowing the id of the CE
      } else {
        this.Logger.ErrorAndContinue(this.CallbackTreeNodeChanged.name, 'Did not find iframe');
      }
    } else {
      this.Logger.ErrorAndThrow(this.CallbackTreeNodeChanged.name, 'Null payload');
    }

    this.Logger.FuncEnd(this.CallbackTreeNodeChanged.name);
  }
}