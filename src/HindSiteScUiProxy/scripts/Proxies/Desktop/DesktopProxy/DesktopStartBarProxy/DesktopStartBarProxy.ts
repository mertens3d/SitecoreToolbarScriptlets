import { ILoggerAgent } from '../../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IDataOneDoc } from '../../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { FrameHelper } from '../../../../Helpers/FrameHelper';
import { LoggableBase } from '../../../../../../Shared/scripts/LoggableBase';
import { DTFrameProxy } from '../FrameProxies/DTFrameProxy';
import { DesktopProxy } from '../DesktopProxy';
import { IDTFrameProxyMutationEvent_Payload } from '../Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload';
import { ITreeProxyMutationEvent_Payload } from '../Events/TreeMutationEvent/ITreeMutationEvent_Payload';
import { TreeMutationEvent_Observer } from '../Events/TreeMutationEvent/TreeMutationEvent_Observer';
import { DesktopStartBarButtonProxy } from './DesktopStartBarButtonProxy';
import { _ApiRecipeBase } from '../../../../ContentApi/Recipes/__RecipeBase/_ApiRecipeBase';
import { RecipeBasics } from '../../../../../../Shared/scripts/Classes/RecipeBasics';

export class DTStartBarProxy extends LoggableBase {
  private __statBarElem: HTMLElement;
  private RecipeBasics: RecipeBasics;
  private AssociatedDoc: IDataOneDoc;

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

  GetAssociatedStartBarButton(iframeElemId: string): DesktopStartBarButtonProxy {
    let foundStartBarProxy = new DesktopStartBarButtonProxy(this.Logger, iframeElemId, this.AssociatedDoc);
    return foundStartBarProxy;
  }

  OnTreeMutationEvent_DesktopStartBarProxy(dtframeProxyMutationEvent_Payload: IDTFrameProxyMutationEvent_Payload) {
    this.Logger.FuncStart(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
    // at this point we have a new active node (or some other change event)

    if (dtframeProxyMutationEvent_Payload) {
      if (dtframeProxyMutationEvent_Payload.ContentEditorProxyMutationPayload && dtframeProxyMutationEvent_Payload.ContentEditorProxyMutationPayload.TreeMutationEvent_Payload) {
        let treeMutationEvent_Payload: ITreeProxyMutationEvent_Payload = dtframeProxyMutationEvent_Payload.ContentEditorProxyMutationPayload.TreeMutationEvent_Payload;
        let dtframeProxy: DTFrameProxy = dtframeProxyMutationEvent_Payload.DTFrameProxy;

        if (treeMutationEvent_Payload.StateOfContentEditorTreeProxy.ActiveNodeCoord.SiblingIndex > -1) {
          let desktopStartBarButtonProxy: DesktopStartBarButtonProxy = this.GetAssociatedStartBarButton(dtframeProxy.HTMLIframeElement.id);

          desktopStartBarButtonProxy.Update(desktopStartBarButtonProxy, treeMutationEvent_Payload.StateOfContentEditorTreeProxy);
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
    } else {
      this.Logger.ErrorAndThrow(this.OnTreeMutationEvent_DesktopStartBarProxy.name, 'Null payload');
    }

    this.Logger.FuncEnd(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
  }
}