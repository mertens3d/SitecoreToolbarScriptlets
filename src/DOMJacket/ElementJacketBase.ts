import { IterationDrone } from "../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { IHindeCore } from "../Shared/scripts/Interfaces/Agents/IHindeCore";
import { _HindeCoreBase } from "../Shared/scripts/_HindeCoreBase";
import { ElementJacket } from "./ElementJacket";

export class ElementJacketBase<T extends HTMLElement> extends _HindeCoreBase {
  public NativeElement: T;

  constructor(hindeCore: IHindeCore, htmlElement: T) {
    super(hindeCore);
    this.NativeElement = htmlElement;
  }

  Click(): any {
    this.NativeElement.click()
  }

  parentElement(): ElementJacket {
    let toReturn: ElementJacket
    let candidate = this.NativeElement.parentElement;
    if (candidate) {
      toReturn = new ElementJacket(this.HindeCore, candidate);
    }
    return toReturn;
  }

  querySelector(selector: string): ElementJacket {
    let toReturn: ElementJacket = null;
    let candidate: HTMLElement = this.NativeElement.querySelector(selector);
    if (candidate) {
      toReturn = new ElementJacket(this.HindeCore, candidate);
    }

    return toReturn;
  }



  async WaitAndReturnFoundElemJacketFromElemJacket(selector: string, friendly: string): Promise<ElementJacket> {
    return new Promise(async (resolve, reject) => {
      //this.Logger.FuncStart(this.WaitAndReturnFoundElemJacketFromElemJacket.name, selector);
      this.ErrorHand.ThrowIfNullOrUndefined(this.WaitAndReturnFoundElemJacketFromElemJacket.name, [selector]);
      var toReturnElemJacket: ElementJacket = null;
      var iterationJr = new IterationDrone(this.HindeCore, this.WaitAndReturnFoundElemJacketFromElemJacket.name + ' : ' + selector + ' ' + friendly, false);

      while (!toReturnElemJacket && iterationJr.DecrementAndKeepGoing()) {
        let candidate: HTMLElement = this.NativeElement.querySelector(selector);
        if (candidate) {
          resolve(new ElementJacket(this.HindeCore, candidate));
        }
        else {
          await iterationJr.Wait();
        }
      }

      if (iterationJr.IsExhausted) {
        reject(iterationJr.IsExhaustedMsg);
      }
      //this.Logger.FuncEnd(this.WaitAndReturnFoundElemJacketFromElemJacket.name, selector);
    });
  }
}