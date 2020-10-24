import { ScProxyDisciminator } from '../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator';
import { ScWindowType } from '../../../../../../Shared/scripts/Enums/50 - scWindowType';
import { IJacketOfType } from "../../../../../../Shared/scripts/IJacketOfType";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { IBaseScProxy } from '../../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScProxy';
import { IStateOf_ } from '../../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_';
import { ConResolver } from '../../../ContentEditor/ContentEditorProxy/ContentTreeProxy/ScContentTreeNodeProxy/ConResolver';
import { IContentTreeProxyMutationEvent_Payload } from '../Events/ContentTreeProxyMutationEvent/IContentTreeProxyMutationEvent_Payload';
import { IDTAreaProxyMutationEvent_Payload } from '../Events/DTAreaProxyMutationEvent/IDTAreaProxyMutationEvent_Payload';
import { IDTFrameProxyMutationEvent_Payload } from '../Events/DTFrameProxyMutationEvent/IDTFrameProxyMutationEvent_Payload';
import { _BaseElemProxy } from "../FrameProxies/_BaseElemProxy";
import { AsyncLock } from './AsyncLock';
import { DesktopStartBarButtonProxy } from './DesktopStartBarButtonProxy';
import { IButtonSelectors } from './IButtonSelectors';
import { StartMenuButtonResolver } from './StartMenuButtonResolver';

export class DTStartBarElemProxy extends _BaseElemProxy<IStateOf_> implements IBaseScProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.DTStartBarElem;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.DTStartBarElem];

  private StartBarButtonProxyBucket: DesktopStartBarButtonProxy[] = [];
  private StartMenuButtonResolver: StartMenuButtonResolver;
  private ConResolver: ConResolver;

  constructor(apiCore: IAPICore, containerElemJacket: IJacketOfType) {
    super(apiCore, containerElemJacket);
    this.Logger.CTORStart(DTStartBarElemProxy.name);
    this.InstantiateInstance();
    this.Logger.CTOREnd(DTStartBarElemProxy.name);
  }

  private InstantiateInstance() {
    this.ConResolver = new ConResolver(this.ApiCore);
  }

  public async InstantiateChildrenSelf(): Promise<void> {
    this.Logger.FuncStart([DTStartBarElemProxy.name, this.InstantiateChildrenSelf.name]);
    this.Logger.FuncEnd([DTStartBarElemProxy.name, this.InstantiateChildrenSelf.name]);
  }

  WireEvent() {
    this.Logger.FuncStart(this.WireEvent.name, DTStartBarElemProxy.name);
    this.Logger.FuncEnd(this.WireEvent.name, DTStartBarElemProxy.name);
  }

  async TriggerRedButtonAsync(scWindowType: ScWindowType, methodLock: AsyncLock): Promise<void> {
    this.Logger.FuncStart(this.TriggerRedButtonAsync.name);

    try {
      this.StartMenuButtonResolver = new StartMenuButtonResolver(this.ApiCore);

      let buttonSelectors: IButtonSelectors = this.StartMenuButtonResolver.GetButtonSelectors(scWindowType);

      if (!buttonSelectors || !buttonSelectors.Pop1Selector) {
        this.Logger.LogAsJsonPretty('buttonSelectors', buttonSelectors);
        this.ErrorHand.HandleFatalError([this.TriggerRedButtonAsync.name], 'something is wrong with the button selectors');
      }
      //let pop1ElemJacket: ElementJacket
      await methodLock.WaitForLockControl(ScWindowType[scWindowType])

        .then(() => this.ContainerElemJacket.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButtonVSpec))
        .then(() => this.TaskMonitor.AsyncTaskStarted(this.TriggerRedButtonAsync.name))
        .then(() => this.TriggerPopXButton(buttonSelectors.Pop1Selector, ContentConst.Const.Selector.SC.StartMenu.Popup1.Id))
        .then(() => this.TriggerPopXButton(buttonSelectors.Pop2Selector, ContentConst.Const.Selector.SC.StartMenu.Popup2.Id))
        .then(() => this.TriggerPopXButton(buttonSelectors.Pop3Selector, ContentConst.Const.Selector.SC.StartMenu.Popup3.Id))
        .then(() => methodLock.ReleaseLock())
        .then(() => this.WaitForTimePeriod(1, this.TriggerRedButtonAsync.name))
        .then(() => this.TaskMonitor.AsyncTaskCompleted(this.TriggerRedButtonAsync.name))
        .catch((err: any) => this.ErrorHand.HandleFatalError(this.TriggerRedButtonAsync.name, err));
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.TriggerRedButtonAsync.name, err);
    }
    this.Logger.FuncEnd(this.TriggerRedButtonAsync.name);
  }

  private async TriggerPopXButton(buttonSelector: string, containerSelector: string): Promise<void> {
    this.Logger.FuncStart(this.TriggerPopXButton.name, buttonSelector + ' | ' + containerSelector);
    try {
      if (buttonSelector && buttonSelector.length > 0 && containerSelector && containerSelector.length > 0) {
        let containerElemJacket: IJacketOfType = null;
        let buttonElemJacket: IJacketOfType = null;

        await this.ContainerElemJacket.WaitFor(containerSelector)
          .then((elementJacket: IJacketOfType) => containerElemJacket = elementJacket)
          .then(() => containerElemJacket.WaitFor(buttonSelector, this.TriggerRedButtonAsync.name))
          .then((elementJacket: IJacketOfType) => buttonElemJacket = elementJacket)
          .then(() => this.Logger.LogImportant('About to click ' + buttonSelector))
          .then(() => buttonElemJacket.Click())
          .then(() => this.WaitForTimePeriod(1, this.TriggerPopXButton.name))
          .catch((err: any) => this.ErrorHand.HandleFatalError(this.TriggerPopXButton.name + ' ' + buttonSelector + ' ' + containerSelector, err));
      } else {
        // do nothing
      }
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.TriggerPopXButton.name, err);
    }
    this.Logger.FuncEnd(this.TriggerPopXButton.name, buttonSelector + ' | ' + containerSelector);
  }

  private async GetAssociatedStartBarButton(dTFrameProxyMutationEventPayload: IDTFrameProxyMutationEvent_Payload): Promise<DesktopStartBarButtonProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetAssociatedStartBarButton.name);
      this.ErrorHand.ThrowIfNullOrUndefined(this.GetAssociatedStartBarButton.name, [dTFrameProxyMutationEventPayload]);

      let foundStartBarButtonProxy: DesktopStartBarButtonProxy = null;

      this.StartBarButtonProxyBucket.forEach((startBarButtonProxy: DesktopStartBarButtonProxy) => {
        if (startBarButtonProxy.FrameId === dTFrameProxyMutationEventPayload.FrameId) {
          foundStartBarButtonProxy = startBarButtonProxy;
        }
      });

      if (!foundStartBarButtonProxy) {
        foundStartBarButtonProxy = new DesktopStartBarButtonProxy(this.ApiCore, dTFrameProxyMutationEventPayload.FrameId, this.ContainerElemJacket, this.ConResolver);
        await foundStartBarButtonProxy.Instantiate_DestopStartBarButtonProxyAsyncItems()
          .catch((err: any) => reject(this.GetAssociatedStartBarButton.name + ' | ' + err));

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
        dTAreaProxyMutationEvent_Payload.DTFrameProxyMutationEvent_Payload.ContentEditorProxyMutationPayload.TreeMutationEvent_Payload.ContentTree.ActiveNodeShallow) {
        let contentTreeProxyMutationEvent_Payload: IContentTreeProxyMutationEvent_Payload = dTAreaProxyMutationEvent_Payload.DTFrameProxyMutationEvent_Payload.ContentEditorProxyMutationPayload.TreeMutationEvent_Payload;

        if (contentTreeProxyMutationEvent_Payload.ContentTree.ActiveNodeShallow) {
          this.GetAssociatedStartBarButton(dTAreaProxyMutationEvent_Payload.DTFrameProxyMutationEvent_Payload)
            .then((startBarButtonProxy: DesktopStartBarButtonProxy) => startBarButtonProxy.SetStateOfDesktopStartBarButtonAsync(contentTreeProxyMutationEvent_Payload.ContentTree))
            .catch((err: any) => this.ErrorHand.HandleFatalError(this.OnTreeMutationEvent_DesktopStartBarProxy.name, err));
        }
        else {
          this.Logger.Log('null activeNodeFlat provided');
        }
      }
      else {
        this.Logger.LogAsJsonPretty('dTAreaProxyMutationEvent_Payload', dTAreaProxyMutationEvent_Payload);
      }
    } else {
      this.ErrorHand.HandleFatalError(this.OnTreeMutationEvent_DesktopStartBarProxy.name, 'Null payload');
    }

    this.TaskMonitor.AsyncTaskCompleted(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
    this.Logger.FuncEnd(this.OnTreeMutationEvent_DesktopStartBarProxy.name);
  }
}