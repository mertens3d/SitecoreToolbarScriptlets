import { IterationDrone } from "../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { ICommonCore } from "../Shared/scripts/Interfaces/Agents/ICommonCore";
import { _CommonBase } from "../Shared/scripts/_CommonCoreBase";

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

  async WaitForElement(selector: string, friendly: string =''): Promise<ElementJacketBase<HTMLElement>> {
    return new Promise(async (resolve, reject) => {
      //this.Logger.FuncStart(this.WaitForElement.name, selector);
      this.ErrorHand.ThrowIfNullOrUndefined([ElementJacketBase.name, this.WaitForElement.name], [selector]);
      var toReturnElemJacket: ElementJacketBase<HTMLElement> = null;
      var iterationJr = new IterationDrone(this.CommonCore, this.WaitForElement.name + ' : ' + selector + ' ' + friendly, false);

      while (!toReturnElemJacket && iterationJr.DecrementAndKeepGoing()) {
        let candidate: HTMLElement = this.NativeElement.querySelector(selector);
        if (candidate) {
          resolve(new ElementJacketBase<HTMLElement>(this.CommonCore, candidate));
        }
        else {
          await iterationJr.Wait();
        }
      }

      if (iterationJr.IsExhausted) {
        reject(iterationJr.IsExhaustedMsg);
      }
      //this.Logger.FuncEnd(this.WaitForElement.name, selector);
    });
  }

  public WaitForThenClick(selectorAr: string[]): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForThenClick.name, [selectorAr]);

      var foundHtmlElement: HTMLElement = null;
      var iterationJr = new IterationDrone(this.CommonCore, this.WaitForThenClick.name + ' | ' + JSON.stringify(selectorAr), true);
      let foundSelector: string = '';

      while (!foundHtmlElement && iterationJr.DecrementAndKeepGoing()) { // todo put back && !this.MsgMan().OperationCancelled) {
        for (var idx = 0; idx < selectorAr.length; idx++) {
          foundSelector = selectorAr[idx];
          foundHtmlElement = this.NativeElement.querySelector(foundSelector);

          if (foundHtmlElement) {
            break;
          }
        }
        await iterationJr.Wait();
      }

      if (foundHtmlElement) {
        try {
          this.Logger.LogAsJsonPretty(this.WaitForThenClick.name + ' clicking', foundSelector);
          foundHtmlElement.click();
          resolve();
        }
        catch (err) {
          reject(this.WaitForThenClick.name + ' | ' + err);
        }
      } else {
        if (!foundHtmlElement && iterationJr.IsExhausted) {
          reject(iterationJr.IsExhaustedMsg);
        } else {
          reject('unknown reason');
        }
      }
    });
  }


}