import { IterationDrone } from "../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { IHindeCore } from "../Shared/scripts/Interfaces/Agents/IHindeCore";
import { _HindeCoreBase } from "../Shared/scripts/_HindeCoreBase";

export  class ElementJacketBase<T extends HTMLElement> extends _HindeCoreBase {
  public NativeElement: T;

  constructor(hindeCore: IHindeCore, htmlElement: T) {
    super(hindeCore);
    this.NativeElement = htmlElement;
  }

  Click(): any {
    this.NativeElement.click()
  }

  parentElement(): ElementJacketBase<HTMLElement> {
    let toReturn: ElementJacketBase<HTMLElement>
    let candidate = this.NativeElement.parentElement;
    if (candidate) {
      toReturn = new ElementJacketBase<HTMLElement>(this.HindeCore, candidate);
    }
    return toReturn;
  }

  querySelector(selector: string): ElementJacketBase<HTMLElement> {
    let toReturn: ElementJacketBase<HTMLElement> = null;
    let candidate: HTMLElement = this.NativeElement.querySelector(selector);
    if (candidate) {
      toReturn = new ElementJacketBase<HTMLElement>(this.HindeCore, candidate);
    }

    return toReturn;
  }

  async WaitForElement(selector: string, friendly: string =''): Promise<ElementJacketBase<HTMLElement>> {
    return new Promise(async (resolve, reject) => {
      //this.Logger.FuncStart(this.WaitForElement.name, selector);
      this.ErrorHand.ThrowIfNullOrUndefined([ElementJacketBase.name, this.WaitForElement.name], [selector]);
      var toReturnElemJacket: ElementJacketBase<HTMLElement> = null;
      var iterationJr = new IterationDrone(this.HindeCore, this.WaitForElement.name + ' : ' + selector + ' ' + friendly, false);

      while (!toReturnElemJacket && iterationJr.DecrementAndKeepGoing()) {
        let candidate: HTMLElement = this.NativeElement.querySelector(selector);
        if (candidate) {
          resolve(new ElementJacketBase<HTMLElement>(this.HindeCore, candidate));
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
      var iterationJr = new IterationDrone(this.HindeCore, this.WaitForThenClick.name + ' | ' + JSON.stringify(selectorAr), true);
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