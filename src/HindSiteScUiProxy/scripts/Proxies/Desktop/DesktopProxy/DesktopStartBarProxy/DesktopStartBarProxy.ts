import { RecipeBasics } from '../../../../../../Shared/scripts/Classes/RecipeBasics';
import { ILoggerAgent } from '../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IDataOneDoc } from '../../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { LoggableBase } from '../../../../../../Shared/scripts/LoggableBase';
import { IDTAreaProxyMutationEvent_Payload } from '../Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload';
import { IContentTreeProxyMutationEvent_Payload } from '../Events/TreeMutationEvent/IContentTreeProxyMutationEvent_Payload';
import { DesktopStartBarButtonProxy } from './DesktopStartBarButtonProxy';
import { IDTFrameProxyMutationEvent_Payload } from '../Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload';

export class DTStartBarProxy extends LoggableBase {
  private __statBarElem: HTMLElement;
  private RecipeBasics: RecipeBasics;
  private AssociatedDoc: IDataOneDoc;
  private StartBarButtonProxyBucket: DesktopStartBarButtonProxy[] = [];

  constructor(logger: ILoggerAgent, associatedDoc: IDataOneDoc) {
    super(logger);
    this.Logger.CTORStart(DTStartBarProxy.name);
    this.AssociatedDoc = associatedDoc;
    this.Logger.CTOREnd(DTStartBarProxy.name);
  }

  public Instantiate_DTStartBarProxy() {
    this.RecipeBasics = new RecipeBasics(this.Logger);
  }

  GetStartBarButtonById(targetId: string) {
    return this.AssociatedDoc.ContentDoc.querySelector('[id=' + targetId + ']');
  }

  GetStartBarElement(): HTMLElement {
    if (!this.__statBarElem) {
      this.__statBarElem = this.AssociatedDoc.ContentDoc.querySelector(ContentConst.Const.Selector.SC.Desktop.DtStartBar);
    }

    return this.__statBarElem;
  }

  async TriggerRedButton(): Promise<void> {
    try {
      await this.RecipeBasics.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, this.AssociatedDoc)
    } catch (err) {
      this.Logger.ErrorAndThrow(this.TriggerRedButton.name, err);
    }
  }

  private async GetAssociatedStartBarButton(dTFrameProxyMutationEventPayload: IDTFrameProxyMutationEvent_Payload): Promise<DesktopStartBarButtonProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetAssociatedStartBarButton.name);
      this.Logger.ThrowIfNullOrUndefined(this.GetAssociatedStartBarButton.name, [dTFrameProxyMutationEventPayload])

      let foundStartBarButtonProxy: DesktopStartBarButtonProxy = null;

      this.StartBarButtonProxyBucket.forEach((startBarButtonProxy: DesktopStartBarButtonProxy) => {
        if (startBarButtonProxy.FrameId === dTFrameProxyMutationEventPayload.FrameId) {
          foundStartBarButtonProxy = startBarButtonProxy
          this.Logger.Log('found a match');
        }
      });

      if (!foundStartBarButtonProxy) {
        this.Logger.Log('no match found, making it');

        foundStartBarButtonProxy = new DesktopStartBarButtonProxy(this.Logger, dTFrameProxyMutationEventPayload.FrameId, this.AssociatedDoc);
        await foundStartBarButtonProxy.Instantiate_DestopStartBarButtonProxy()
          .catch((err) => this.Logger.ErrorAndThrow(this.GetAssociatedStartBarButton.name, err));

        this.StartBarButtonProxyBucket.push(foundStartBarButtonProxy);
      }

      resolve(foundStartBarButtonProxy);

      this.Logger.FuncEnd(this.GetAssociatedStartBarButton.name);
    });
  }

  OnTreeMutationEvent_DesktopStartBarProxy(dTAreaProxyMutationEvent_Payload: IDTAreaProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
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
            .catch((err) => this.Logger.ErrorAndThrow(this.OnTreeMutationEvent_DesktopStartBarProxy.name, err));
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
        //  this.Logger.ErrorAndContinue(this.OnTreeMutationEvent_DesktopStartBarProxy.name, 'Did not find Frame');
        //}
      }
      else {
        this.Logger.LogAsJsonPretty('dTAreaProxyMutationEvent_Payload', dTAreaProxyMutationEvent_Payload)
      }
    } else {
      this.Logger.ErrorAndThrow(this.OnTreeMutationEvent_DesktopStartBarProxy.name, 'Null payload');
    }

    this.Logger.FuncEnd(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
  }
}