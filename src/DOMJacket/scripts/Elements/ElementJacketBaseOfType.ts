import { IterationDrone } from "../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { ICommonCore } from "../../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { ElementJacketWatcher } from "../Document/ElementJacketWatcher";
import { ElementJacketMutationEvent_Subject } from "../Events/ElementJacketMutationEvent/ElementJacketMutationEvent_Subject";
import { IElemJacketWatcherParameters } from "../../../Shared/scripts/IElemJacketWatcherParameters";
import { IJacketOfType } from "../../../Shared/scripts/IJacketOfType";
import { _baseElemJacket } from "./_baseElemJacket";


export class ElementJacketOfType<T extends HTMLElement> extends _baseElemJacket implements IJacketOfType {
  public NativeElement: T;

  private ElemJacketWatchers: ElementJacketWatcher[] = [];
  NodeTagName: string;

  constructor(commonCore: ICommonCore, htmlElement: T) {
    super(commonCore)//, htmlElement);
    this.NodeTagName = htmlElement.tagName;
  }

  Click(): any {
    this.NativeElement.click()
  }

  //parentElement(): ElementJacketOfType<HTMLElement> {
  //  let toReturn: ElementJacketOfType<HTMLElement>
  //  let candidate = this.NativeElement.parentElement;
  //  if (candidate) {
  //    toReturn = new GenericElemJacket(this.CommonCore, candidate);
  //  }
  //  return toReturn;
  //}

  async AddWatcher(watcherParams: IElemJacketWatcherParameters): Promise<ElementJacketMutationEvent_Subject> {
    return new Promise((resolve, reject) => {
      this.Logger.FuncStart([ElementJacketOfType.name, this.AddWatcher.name], (watcherParams && watcherParams.OwnerFriendly) ? watcherParams.OwnerFriendly : 'no watcher params');

      let jacketElemWatcher = new ElementJacketWatcher(this.CommonCore, this, watcherParams);
      this.ElemJacketWatchers.push(jacketElemWatcher);

      if (jacketElemWatcher) {
        resolve(jacketElemWatcher.ElemJacketMutationEvent_Subject);
      } else {
        reject(this.ErrorHand.FormatRejectMessage([ElementJacketOfType.name, this.AddWatcher.name], 'Unknown reason'));
      }

      this.Logger.FuncEnd([ElementJacketOfType.name, this.AddWatcher.name], (watcherParams && watcherParams.OwnerFriendly) ? watcherParams.OwnerFriendly : 'no watcher params');
    });
  }

  querySelector(selector: string): IJacketOfType {
    let toReturn: IJacketOfType = null;
    let candidate: HTMLElement = this.NativeElement.querySelector(selector);
    if (candidate) {
      toReturn = new ElementJacketOfType<HTMLElement>(this.CommonCore, candidate);
    }

    return toReturn;
  }

  async WaitForElement(selector: string | string[], friendly: string = ''): Promise<IJacketOfType> {
    return new Promise(async (resolve, reject) => {
      //this.Logger.FuncStart(this.WaitForElement.name, selector);

      let selectorAr: string[] = [];
      if (Array.isArray(selector)) {
        selectorAr = selector;
      } else {
        selectorAr.push(selector);
      }

      this.ErrorHand.ThrowIfNullOrUndefined([ElementJacketOfType.name, this.WaitForElement.name], selectorAr);
      var toReturnElemJacket: IJacketOfType = null;
      var iterationJr = new IterationDrone(this.CommonCore, this.WaitForElement.name + ' : ' + selectorAr.join(',') + ' ' + friendly, false);
      let foundSelector: string = '';
      var foundHtmlElement: HTMLElement = null;

      while (!toReturnElemJacket && iterationJr.DecrementAndKeepGoing()) {
        for (var idx = 0; idx < selectorAr.length; idx++) {
          foundSelector = selectorAr[idx];
          foundHtmlElement = this.NativeElement.querySelector(foundSelector);

          if (foundHtmlElement) {
            toReturnElemJacket = new ElementJacketOfType<HTMLElement>(this.CommonCore, foundHtmlElement);
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
        .then((elemJacket: IJacketOfType) => elemJacket.Click())
        .then(() => resolve())
        .catch((err) => this.ErrorHand.FormatRejectMessage(this.WaitForThenClick.name, err));
    });
  }

  async WaitForElemToHaveClassOrReject( classNames: string[], friendly: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForElemToHaveClassOrReject.name, friendly + ' - ' + classNames);

      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForElemToHaveClassOrReject.name, [ classNames]);
      var elemHasClassName: boolean = false;
      var iterationJr = new IterationDrone(this.CommonCore, this.WaitForElemToHaveClassOrReject.name + ' : ' + classNames + ' ' + friendly, true);

      while (!elemHasClassName && iterationJr.DecrementAndKeepGoing()) {
        let classList = this.NativeElement.classList;

        classNames.forEach((className: string) => {
          if (classList.contains(className)) {
            elemHasClassName = true;
          }
        })

        if (elemHasClassName) {
          resolve()
        } else {
          await iterationJr.Wait();
        }
      }
      if (iterationJr.IsExhausted) {
        reject(iterationJr.IsExhaustedMsg);
      }
      this.Logger.FuncEnd(this.WaitForElemToHaveClassOrReject.name, friendly);
    });
  }
}