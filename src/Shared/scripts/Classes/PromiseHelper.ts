import { BaseDebug } from "./debug";
import { ResultSuccessFail } from "./ResultSuccessFail";
import { IDataOneDoc } from "../Interfaces/IDataOneDoc";
import { IterationHelper } from "./IterationHelper";

export class PromiseHelper {
  private Debug: BaseDebug;

  constructor(debug: BaseDebug) {
    this.Debug = debug;
  }


  async WaitForPageReadyNative(targetDoc: IDataOneDoc) {
    return new Promise(async (resolve, reject) => {
      this.Debug.FuncStart(this.WaitForPageReadyNative.name);

      var result: ResultSuccessFail = new ResultSuccessFail();

      this.Debug.DebugIDataOneDoc(targetDoc);

      var iterationJr: IterationHelper = new IterationHelper(this.Debug, this.WaitForPageReadyNative.name);

      var isReady: boolean = false;
      this.Debug.MarkerA();

      while (iterationJr.DecrementAndKeepGoing() && !isReady) {
        this.Debug.MarkerB();
        var currentReadyState: string = targetDoc.Document.readyState.toString();
        var isReadyStateComplete = currentReadyState === 'complete';
        this.Debug.LogVal('readyState', currentReadyState);;
        this.Debug.LogVal('isReadyStateComplete', isReadyStateComplete);

        if (isReadyStateComplete) {
          isReady = true;
          result.Succeeded = true;
        } else {
          await iterationJr.Wait();
        }
      }

      if (iterationJr.IsExhausted) {
        result.Succeeded = false;
        result.FailMessage = iterationJr.IsExhaustedMsg;
      }

      this.Debug.FuncEnd(this.WaitForPageReadyNative.name, 'ready state: ' + currentReadyState + ' is ready: ' + isReady.toString());;

      if (result.Succeeded) {
        resolve();
      } else {
        reject(result.FailMessage);
      }
    });
  }
}