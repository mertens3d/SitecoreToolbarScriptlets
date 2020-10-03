import { RecipeBasics } from '../../../../../../Shared/scripts/Classes/RecipeBasics';
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ScDocumentProxy } from "../../../ScDocumentProxy";
import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { _HindeCoreBase } from '../../../../../../Shared/scripts/LoggableBase';
import { IDTAreaProxyMutationEvent_Payload } from '../Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload';
import { IContentTreeProxyMutationEvent_Payload } from '../Events/TreeMutationEvent/IContentTreeProxyMutationEvent_Payload';
import { DesktopStartBarButtonProxy } from './DesktopStartBarButtonProxy';
import { IDTFrameProxyMutationEvent_Payload } from '../Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload';

export class DTStartBarProxy extends _HindeCoreBase {
  private __statBarElem: HTMLElement;
  private RecipeBasics: RecipeBasics;
  private AssociatedDoc: ScDocumentProxy;
  private StartBarButtonProxyBucket: DesktopStartBarButtonProxy[] = [];

  constructor(hindeCore: IHindeCore, associatedDoc: ScDocumentProxy) {
    super(hindeCore);
    this.Logger.CTORStart(DTStartBarProxy.name);
    this.AssociatedDoc = associatedDoc;
    this.Logger.CTOREnd(DTStartBarProxy.name);
  }

  public Instantiate_DTStartBarProxy() {
    this.RecipeBasics = new RecipeBasics(this.HindeCore);
  }

  GetStartBarButtonById(targetId: string) {
    return this.AssociatedDoc.querySelector('[id=' + targetId + ']');
  }

  GetStartBarElement(): HTMLElement {
    if (!this.__statBarElem) {
      this.__statBarElem = this.AssociatedDoc.querySelector(ContentConst.Const.Selector.SC.Desktop.DtStartBar);
    }

    return this.__statBarElem;
  }

  async TriggerRedButton(): Promise<void> {
    try {
      await this.AssociatedDoc.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, )
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.TriggerRedButton.name, err));
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.TriggerRedButton.name, err);
    }
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
        foundStartBarButtonProxy = new DesktopStartBarButtonProxy(this.HindeCore, dTFrameProxyMutationEventPayload.FrameId, this.AssociatedDoc);
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
        //let iframeElement: HTMLIFrameElement = <HTMLIFrameElement>this.OwnerDesktopProxy.GetAssociatedDoc().ContentDoc.getElementById(treeMutationEvent_Payload.AssociatedIframeElemId);

        //if (iframeElement) {
        //  }

        //we need to know what the associated button is
        //we can get that by knowing the id of the CE
        //} else {
        //  this.ErrorHand.ErrorAndContinue(this.OnTreeMutationEvent_DesktopStartBarProxy.name, 'Did not find Frame');
        //}
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