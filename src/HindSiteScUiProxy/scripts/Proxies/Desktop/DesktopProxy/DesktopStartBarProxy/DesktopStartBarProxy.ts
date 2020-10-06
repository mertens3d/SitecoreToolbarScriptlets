import { DocumentJacket } from '../../../../../../DOMJacket/DocumentJacket';
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { _HindeCoreBase } from '../../../../../../Shared/scripts/LoggableBase';
import { IDTAreaProxyMutationEvent_Payload } from '../Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload';
import { IDTFrameProxyMutationEvent_Payload } from '../Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload';
import { IContentTreeProxyMutationEvent_Payload } from '../Events/ContentTreeProxyMutationEvent/IContentTreeProxyMutationEvent_Payload';
import { DesktopStartBarButtonProxy } from './DesktopStartBarButtonProxy';
import { ElementJacket } from '../../../../../../DOMJacket/ElementJacket';

export class DTStartBarProxy extends _HindeCoreBase {

  private __startBarElem: ElementJacket;
  private DocumentJacket: DocumentJacket;
  private StartBarButtonProxyBucket: DesktopStartBarButtonProxy[] = [];

  constructor(hindeCore: IHindeCore, documentJacket: DocumentJacket) {
    super(hindeCore);
    this.Logger.CTORStart(DTStartBarProxy.name);
    this.DocumentJacket = documentJacket;
    this.Logger.CTOREnd(DTStartBarProxy.name);
  }

  public Instantiate_DTStartBarProxy() {
    this.Logger.FuncStart(this.Instantiate_DTStartBarProxy.name, DTStartBarProxy.name);
    this.Logger.FuncEnd(this.Instantiate_DTStartBarProxy.name, DTStartBarProxy.name);
  }

  WireEvent() {
    this.Logger.FuncStart(this.WireEvent.name, DTStartBarProxy.name);
    this.Logger.FuncEnd(this.WireEvent.name, DTStartBarProxy.name);
  }


  GetStartBarButtonById(targetId: string) {
    return this.DocumentJacket.QuerySelector('[id=' + targetId + ']');
  }

  GetStartBarElement(): ElementJacket {
    if (!this.__startBarElem) {
      this.__startBarElem = this.DocumentJacket.QuerySelector(ContentConst.Const.Selector.SC.Desktop.DtStartBar);
    }

    return this.__startBarElem;
  }

  async TriggerRedButton(): Promise<void> {
    this.Logger.FuncStart(this.TriggerRedButton.name);
    try {
      await this.DocumentJacket.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, )
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.TriggerRedButton.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.TriggerRedButton.name, err);
    }
    this.Logger.FuncEnd(this.TriggerRedButton.name);
  }

  private async GetAssociatedStartBarButton(dTFrameProxyMutationEventPayload: IDTFrameProxyMutationEvent_Payload): Promise<DesktopStartBarButtonProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetAssociatedStartBarButton.name);
      this.ErrorHand.ThrowIfNullOrUndefined(this.GetAssociatedStartBarButton.name, [dTFrameProxyMutationEventPayload])

      let foundStartBarButtonProxy: DesktopStartBarButtonProxy = null;

      this.StartBarButtonProxyBucket.forEach((startBarButtonProxy: DesktopStartBarButtonProxy) => {
        if (startBarButtonProxy.FrameId === dTFrameProxyMutationEventPayload.FrameId) {
          foundStartBarButtonProxy = startBarButtonProxy
        }
      });

      if (!foundStartBarButtonProxy) {
        foundStartBarButtonProxy = new DesktopStartBarButtonProxy(this.HindeCore, dTFrameProxyMutationEventPayload.FrameId, this.DocumentJacket);
        await foundStartBarButtonProxy.Instantiate_DestopStartBarButtonProxy()
          .catch((err) => reject(this.GetAssociatedStartBarButton.name + ' | ' + err));

        this.StartBarButtonProxyBucket.push(foundStartBarButtonProxy);
      }

      resolve(foundStartBarButtonProxy);

      this.Logger.FuncEnd(this.GetAssociatedStartBarButton.name);
    });
  }

  OnTreeMutationEvent_DesktopStartBarProxy(dTAreaProxyMutationEvent_Payload: IDTAreaProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
    this.TaskMonitor.AsyncTaskStarted(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
    // at this point we have a new active node (or some other change event)

    if (dTAreaProxyMutationEvent_Payload) {
      if (dTAreaProxyMutationEvent_Payload.DTFrameProxyMutationEvent_Payload
        &&
        dTAreaProxyMutationEvent_Payload.DTFrameProxyMutationEvent_Payload.ContentEditorProxyMutationPayload
        &&
        dTAreaProxyMutationEvent_Payload.DTFrameProxyMutationEvent_Payload.ContentEditorProxyMutationPayload.TreeMutationEvent_Payload
        &&
        dTAreaProxyMutationEvent_Payload.DTFrameProxyMutationEvent_Payload.ContentEditorProxyMutationPayload.TreeMutationEvent_Payload.StateOfContentTree
        &&
        dTAreaProxyMutationEvent_Payload.DTFrameProxyMutationEvent_Payload.ContentEditorProxyMutationPayload.TreeMutationEvent_Payload.StateOfContentTree.ActiveNodeFlat
      ) {
        let contentTreeProxyMutationEvent_Payload: IContentTreeProxyMutationEvent_Payload = dTAreaProxyMutationEvent_Payload.DTFrameProxyMutationEvent_Payload.ContentEditorProxyMutationPayload.TreeMutationEvent_Payload;

        //let dtframeProxy: DTFrameProxy = dTAreaProxyMutationEvent_Payload.DTFrameProxy;

        if (contentTreeProxyMutationEvent_Payload.StateOfContentTree.ActiveNodeFlat) {
          this.GetAssociatedStartBarButton(dTAreaProxyMutationEvent_Payload.DTFrameProxyMutationEvent_Payload)
            .then((startBarButtonProxy: DesktopStartBarButtonProxy) => startBarButtonProxy.SetStateOfDesktopStartBarButtonAsync(contentTreeProxyMutationEvent_Payload.StateOfContentTree))
            .catch((err) => this.ErrorHand.ErrorAndThrow(this.OnTreeMutationEvent_DesktopStartBarProxy.name, err));
        }
        else {
          this.Logger.Log('null activeNodeFlat provided');
        }
      }
      else {
        this.Logger.LogAsJsonPretty('dTAreaProxyMutationEvent_Payload', dTAreaProxyMutationEvent_Payload)
      }
    } else {
      this.ErrorHand.ErrorAndThrow(this.OnTreeMutationEvent_DesktopStartBarProxy.name, 'Null payload');
    }

    this.TaskMonitor.AsyncTaskCompleted(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
    this.Logger.FuncEnd(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
  }
}