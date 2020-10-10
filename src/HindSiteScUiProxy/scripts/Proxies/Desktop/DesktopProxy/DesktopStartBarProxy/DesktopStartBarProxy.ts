import { DocumentJacket } from '../../../../../../DOMJacket/DocumentJacket';
import { ElementJacket } from '../../../../../../DOMJacket/ElementJacket';
import { RecipeBasics } from '../../../../RecipeBasics';
import { ScWindowType } from '../../../../../../Shared/scripts/Enums/50 - scWindowType';
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { ConResolver } from '../../../ContentEditor/ContentEditorProxy/ContentTreeProxy/ScContentTreeNodeProxy/ConResolver';
import { IContentTreeProxyMutationEvent_Payload } from '../Events/ContentTreeProxyMutationEvent/IContentTreeProxyMutationEvent_Payload';
import { IDTAreaProxyMutationEvent_Payload } from '../Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload';
import { IDTFrameProxyMutationEvent_Payload } from '../Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload';
import { AsyncLock } from './AsyncLock';
import { DesktopStartBarButtonProxy } from './DesktopStartBarButtonProxy';
import { IButtonSelectors } from './IButtonSelectors';
import { StartMenuButtonResolver } from './StartMenuButtonResolver';
import { IHindSiteScUiAPIRunTimeOptions } from '../../../../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi';

export class DTStartBarProxy extends _APICoreBase {
  private DocumentJacket: DocumentJacket;
  private StartBarButtonProxyBucket: DesktopStartBarButtonProxy[] = [];
  private StartMenuButtonResolver: StartMenuButtonResolver;
  private RecipeBasics: RecipeBasics;
  private ConResolver: ConResolver;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore);
    this.Logger.CTORStart(DTStartBarProxy.name);
    this.DocumentJacket = documentJacket;
    this.InstantiateInstance();
    this.Logger.CTOREnd(DTStartBarProxy.name);
  }

  private InstantiateInstance() {
    this.RecipeBasics = new RecipeBasics(this.ApiCore);
    this.ConResolver = new ConResolver(this.ApiCore);
  }

  public Instantiate_DTStartBarProxy() {
    this.Logger.FuncStart(this.Instantiate_DTStartBarProxy.name, DTStartBarProxy.name);
    this.Logger.FuncEnd(this.Instantiate_DTStartBarProxy.name, DTStartBarProxy.name);
  }

  WireEvent() {
    this.Logger.FuncStart(this.WireEvent.name, DTStartBarProxy.name);
    this.Logger.FuncEnd(this.WireEvent.name, DTStartBarProxy.name);
  }

  async TriggerRedButtonAsync(scWindowType: ScWindowType, methodLock: AsyncLock): Promise<void> {
    this.Logger.FuncStart(this.TriggerRedButtonAsync.name);

    try {
      this.StartMenuButtonResolver = new StartMenuButtonResolver(this.ApiCore);

      let buttonSelectors: IButtonSelectors = this.StartMenuButtonResolver.GetButtonSelectors(scWindowType);

      if (!buttonSelectors || !buttonSelectors.Pop1Selector) {
        this.Logger.LogAsJsonPretty('buttonSelectors', buttonSelectors);
        this.ErrorHand.ErrorAndThrow([this.TriggerRedButtonAsync.name], 'something is wrong with the button selectors');
      }
      //let pop1ElemJacket: ElementJacket

      await methodLock.WaitForLockControl(ScWindowType[scWindowType])

        .then(() => this.DocumentJacket.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButtonVSpec))
        .then(() => this.TaskMonitor.AsyncTaskStarted(this.TriggerRedButtonAsync.name))
        .then(() => this.TriggerPopXButton(buttonSelectors.Pop1Selector, ContentConst.Const.Selector.SC.Popup1.Id))
        .then(() => this.TriggerPopXButton(buttonSelectors.Pop2Selector, ContentConst.Const.Selector.SC.Popup2.Id))
        .then(() => this.TriggerPopXButton(buttonSelectors.Pop3Selector, ContentConst.Const.Selector.SC.Popup3.Id))
        .then(() => methodLock.ReleaseLock())
        .then(() => this.RecipeBasics.WaitForTimePeriod(1, this.TriggerRedButtonAsync.name))
        .then(() => this.TaskMonitor.AsyncTaskCompleted(this.TriggerRedButtonAsync.name))
        .catch((err) => this.ErrorHand.ErrorAndThrow(this.TriggerRedButtonAsync.name, err))
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.TriggerRedButtonAsync.name, err);
    }
    this.Logger.FuncEnd(this.TriggerRedButtonAsync.name);
  }

  private async TriggerPopXButton(buttonSelector: string, containerSelector: string): Promise<void> {
    this.Logger.FuncStart(this.TriggerPopXButton.name, buttonSelector + ' | ' + containerSelector);
    try {
      if (buttonSelector && buttonSelector.length > 0 && containerSelector && containerSelector.length > 0) {
        let containerElemJacket: ElementJacket = null;
        let buttonElemJacket: ElementJacket = null;

        await this.DocumentJacket.WaitForElem(containerSelector)
          .then((elementJacket: ElementJacket) => containerElemJacket = elementJacket)
          .then(() => containerElemJacket.WaitForElement(buttonSelector, this.TriggerRedButtonAsync.name))
          .then((elementJacket: ElementJacket) => buttonElemJacket = elementJacket)
          .then(() => this.Logger.LogImportant('About to click ' + buttonSelector))
          .then(() => buttonElemJacket.Click())
          .then(() => this.RecipeBasics.WaitForTimePeriod(1, this.TriggerPopXButton.name))
          .catch((err) => this.ErrorHand.ErrorAndThrow(this.TriggerPopXButton.name + ' ' + buttonSelector + ' ' + containerSelector, err));
      } else {
        // do nothing
      }
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.TriggerPopXButton.name, err);
    }
    this.Logger.FuncEnd(this.TriggerPopXButton.name, buttonSelector + ' | ' + containerSelector);
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
        foundStartBarButtonProxy = new DesktopStartBarButtonProxy(this.ApiCore, dTFrameProxyMutationEventPayload.FrameId, this.DocumentJacket, this.ConResolver);
        await foundStartBarButtonProxy.Instantiate_DestopStartBarButtonProxyAsyncItems()
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
        dTAreaProxyMutationEvent_Payload.DTFrameProxyMutationEvent_Payload.ContentEditorProxyMutationPayload.TreeMutationEvent_Payload.ContentTree
        &&
        dTAreaProxyMutationEvent_Payload.DTFrameProxyMutationEvent_Payload.ContentEditorProxyMutationPayload.TreeMutationEvent_Payload.ContentTree.ActiveNodeShallow
      ) {
        let contentTreeProxyMutationEvent_Payload: IContentTreeProxyMutationEvent_Payload = dTAreaProxyMutationEvent_Payload.DTFrameProxyMutationEvent_Payload.ContentEditorProxyMutationPayload.TreeMutationEvent_Payload;

        if (contentTreeProxyMutationEvent_Payload.ContentTree.ActiveNodeShallow) {
          this.GetAssociatedStartBarButton(dTAreaProxyMutationEvent_Payload.DTFrameProxyMutationEvent_Payload)
            .then((startBarButtonProxy: DesktopStartBarButtonProxy) => startBarButtonProxy.SetStateOfDesktopStartBarButtonAsync(contentTreeProxyMutationEvent_Payload.ContentTree))
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