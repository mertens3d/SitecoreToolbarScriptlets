import { IterationDrone } from "../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { ICommonCore } from "../Shared/scripts/Interfaces/Agents/ICommonCore";
import { _CommonBase } from "../Shared/scripts/_CommonCoreBase";

export interface IAbortToken {
  Continue: boolean;
}

export class ElementJacketBase<T extends HTMLElement> extends _CommonBase {
  public NativeElement: T;

  constructor(commonCore: ICommonCore, htmlElement: T) {
    super(commonCore);
    this.NativeElement = htmlElement;
  }

  Click(): any {
    this.NativeElement.click()
  }

  parentElement(): ElementJacketBase<HTMLElement> {
    let toReturn: ElementJacketBase<HTMLElement>
    let candidate = this.NativeElement.parentElement;
    if (candidate) {
      toReturn = new ElementJacketBase<HTMLElement>(this.CommonCore, candidate);
    }
    return toReturn;
  }

  querySelector(selector: string): ElementJacketBase<HTMLElement> {
    let toReturn: ElementJacketBase<HTMLElement> = null;
    let candidate: HTMLElement = this.NativeElement.querySelector(selector);
    if (candidate) {
      toReturn = new ElementJacketBase<HTMLElement>(this.CommonCore, candidate);
    }

    return toReturn;
  }

  //private async WaitForElementSingleAsync(selector: string, abortToken: IAbortToken): Promise<ElementJacketBase<HTMLElement>> {
  //  return new Promise(async (resolve, reject) => {
  //    var iterationJr = new IterationDrone(this.CommonCore, this.WaitForElementSingleAsync.name + ' : ' + selector, false);

  //    var toReturnElemJacket: ElementJacketBase<HTMLElement> = null;
  //    let candidate: HTMLElement;

  //    while (!toReturnElemJacket && iterationJr.DecrementAndKeepGoing() && abortToken.Continue) {
  //      candidate = this.NativeElement.querySelector(selector);

  //      if (candidate) {
  //        break;
  //      } else {
  //        await iterationJr.Wait();
  //      }
  //    }

  //    if (candidate) {
  //      resolve(new ElementJacketBase<HTMLElement>(this.CommonCore, candidate));
  //    } else {
  //      if (iterationJr.IsExhausted) {
  //        reject(iterationJr.IsExhaustedMsg)
  //      } else if (!abortToken.Continue) {
  //        reject('aborted');
  //      } else {
  //        reject('unknown reason');
  //      }
  //    }
  //  });
  //}

  async WaitForElement(selector: string | string[], friendly: string = ''): Promise<ElementJacketBase<HTMLElement>> {
    return new Promise(async (resolve, reject) => {
      //this.Logger.FuncStart(this.WaitForElement.name, selector);

      let selectorAr: string[] = [];
      if (Array.isArray(selector)) {
        selectorAr = selector;
      } else {
        selectorAr.push(selector);
      }

      this.ErrorHand.ThrowIfNullOrUndefined([ElementJacketBase.name, this.WaitForElement.name], selectorAr);
      var toReturnElemJacket: ElementJacketBase<HTMLElement> = null;
      var iterationJr = new IterationDrone(this.CommonCore, this.WaitForElement.name + ' : ' + selectorAr.join(',') + ' ' + friendly, false);
      let foundSelector: string = '';
      var foundHtmlElement: HTMLElement = null;

      while (!toReturnElemJacket && iterationJr.DecrementAndKeepGoing()) {
        for (var idx = 0; idx < selectorAr.length; idx++) {
          foundSelector = selectorAr[idx];
          foundHtmlElement = this.NativeElement.querySelector(foundSelector);

          if (foundHtmlElement) {
            toReturnElemJacket = new ElementJacketBase<HTMLElement>(this.CommonCore, foundHtmlElement);
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

      //var foundHtmlElement: HTMLElement = null;
      //var iterationJr = new IterationDrone(this.CommonCore, this.WaitForThenClick.name + ' | ' + JSON.stringify(selectorAr), true);
      //let foundSelector: string = '';

      await this.WaitForElement(selectorAr)
        .then((elemJacket: ElementJacketBase<HTMLElement>) => elemJacket.Click())
        .then(() => resolve())
        .catch((err) => this.ErrorHand.FormatRejectMessage(this.WaitForThenClick.name, err));

      //while (!foundHtmlElement && iterationJr.DecrementAndKeepGoing()) { // todo put back && !this.MsgMan().OperationCancelled) {
      //  for (var idx = 0; idx < selectorAr.length; idx++) {
      //    foundSelector = selectorAr[idx];
      //    foundHtmlElement = this.NativeElement.querySelector(foundSelector);

      //    if (foundHtmlElement) {
      //      break;
      //    }
      //  }
      //  await iterationJr.Wait();
      //}

      //if (foundHtmlElement) {
      //  try {
      //    this.Logger.LogAsJsonPretty(this.WaitForThenClick.name + ' clicking', foundSelector);
      //    foundHtmlElement.click();
      //    resolve();
      //  }
      //  catch (err) {
      //    reject(this.WaitForThenClick.name + ' | ' + err);
      //  }
      //} else {
      //  if (!foundHtmlElement && iterationJr.IsExhausted) {
      //    reject(iterationJr.IsExhaustedMsg);
      //  } else {
      //    reject('unknown reason');
      //  }
      //}
    });
  }
}