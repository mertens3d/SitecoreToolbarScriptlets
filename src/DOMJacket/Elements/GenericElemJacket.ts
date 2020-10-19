import { IterationDrone } from "../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { ICommonCore } from "../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { _CommonBase } from "../../Shared/scripts/_CommonCoreBase";
import { ElementJacketWatcher } from "../Document/ElementJacketWatcher";
import { ElementJacketMutationEvent_Subject } from "../Events/ElementJacketMutationEvent/ElementJacketMutationEvent_Subject";
import { IElemJacketWatcherParameters } from "../Events/ElementJacketMutationEvent/IElemJacketWatcherParameters";

export class GenericElemJacket extends _CommonBase {
  private ElemJacketWatchers: ElementJacketWatcher[] = [];
  NodeTagName: string;
  NativeElement: HTMLElement;

  constructor(commonCore: ICommonCore, htmlElement: HTMLElement) {
    super(commonCore);
    this.NativeElement = htmlElement;
    this.NodeTagName = htmlElement.tagName;
  }

  Click(): any {
    this.NativeElement.click()
  }

  parentElement(): GenericElemJacket {
    let toReturn: GenericElemJacket
    let candidate = this.NativeElement.parentElement;
    if (candidate) {
      toReturn = new GenericElemJacket(this.CommonCore, candidate);
    }
    return toReturn;
  }

  async AddWatcher(watcherParams: IElemJacketWatcherParameters): Promise<ElementJacketMutationEvent_Subject> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart([GenericElemJacket.name, this.AddWatcher.name], (watcherParams && watcherParams.OwnerFriendly) ? watcherParams.OwnerFriendly : 'no watcher params');

      let jacketElemWatcher = new ElementJacketWatcher(this.CommonCore, this, watcherParams);
      this.ElemJacketWatchers.push(jacketElemWatcher);

      if (jacketElemWatcher) {
        resolve(jacketElemWatcher.ElemJacketMutationEvent_Subject);
      } else {
        reject(this.ErrorHand.FormatRejectMessage([GenericElemJacket.name, this.AddWatcher.name], 'Unknown reason'));
      }

      this.Logger.FuncEnd([GenericElemJacket.name, this.AddWatcher.name], (watcherParams && watcherParams.OwnerFriendly) ? watcherParams.OwnerFriendly : 'no watcher params');
    });
  }

  querySelector(selector: string): GenericElemJacket {
    let toReturn: GenericElemJacket = null;
    let candidate: HTMLElement = this.NativeElement.querySelector(selector);
    if (candidate) {
      toReturn = new GenericElemJacket(this.CommonCore, candidate);
    }

    return toReturn;
  }

  async WaitForElement(selector: string | string[], friendly: string = ''): Promise<GenericElemJacket> {
    return new Promise(async (resolve, reject) => {
      //this.Logger.FuncStart(this.WaitForElement.name, selector);

      let selectorAr: string[] = [];
      if (Array.isArray(selector)) {
        selectorAr = selector;
      } else {
        selectorAr.push(selector);
      }

      this.ErrorHand.ThrowIfNullOrUndefined([GenericElemJacket.name, this.WaitForElement.name], selectorAr);
      var toReturnElemJacket: GenericElemJacket = null;
      var iterationJr = new IterationDrone(this.CommonCore, this.WaitForElement.name + ' : ' + selectorAr.join(',') + ' ' + friendly, false);
      let foundSelector: string = '';
      var foundHtmlElement: HTMLElement = null;

      while (!toReturnElemJacket && iterationJr.DecrementAndKeepGoing()) {
        for (var idx = 0; idx < selectorAr.length; idx++) {
          foundSelector = selectorAr[idx];
          foundHtmlElement = this.NativeElement.querySelector(foundSelector);

          if (foundHtmlElement) {
            toReturnElemJacket = new GenericElemJacket(this.CommonCore, foundHtmlElement);
            break;
          }
        }
        await iterationJr.Wait();
      }

      if (foundHtmlElement) {
        resolve(toReturnElemJacket);
      }
      else {
        if (iterationJr.IsExhausted) {
          reject(iterationJr.IsExhaustedMsg);
        } else {
          reject('unknown reason');
        }
      }
      //this.Logger.FuncEnd(this.WaitForElement.name, selector);
    });
  }

  public WaitForThenClick(selectorAr: string[]): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForThenClick.name, [selectorAr]);

      await this.WaitForElement(selectorAr)
        .then((elemJacket: GenericElemJacket) => elemJacket.Click())
        .then(() => resolve())
        .catch((err) => this.ErrorHand.FormatRejectMessage(this.WaitForThenClick.name, err));
    });
  }
}