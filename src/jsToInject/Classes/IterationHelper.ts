import { Hub } from '../Managers/Hub';
import { ManagerBase } from '../_first/_ManagerBase';

export class IterationHelper extends ManagerBase {
  private __currentIteration: number;
  private __maxIterations: number;
  private __nickName: string;
  private __timeout: number;
  IsExhausted: boolean;

  constructor(xyyz: Hub, nickname: string, maxIterations: number = null) {
    super(xyyz);
    //xyyz.debug.FuncStart('ctor: ' + IterationHelper.name, nickname);

    if (!maxIterations) {
      maxIterations = this.Const().IterHelper.MaxCount.Default;
    }

    this.__maxIterations = maxIterations;
    this.__currentIteration = maxIterations;
    this.__timeout = xyyz.Const.IterHelper.Timeouts.Default;
    this.__nickName = nickname;
    this.IsExhausted = false;

    //xyyz.debug.FuncEnd('ctor: ' + IterationHelper.name);
  }

  DecrementAndKeepGoing() {
    var toReturn = false;

    if (!this.UiMan().OperationCancelled && this.__currentIteration > 0) {
      this.__currentIteration -= 1;
      this.__timeout += this.__timeout * this.Const().IterHelper.GrowthPerIteration;
      if (this.__timeout > this.Const().IterHelper. Timeouts.Max) {
        this.__timeout = this.Const().IterHelper. Timeouts.Max;
      }
      this.debug().Log('DecrementAndKeepGoing: ' + this.__nickName + ' ' + this.__currentIteration + ':' + this.__maxIterations + ' | timeout: ' + this.__timeout);

      toReturn = true;
    } else {
      this.IsExhausted = true;
      this.NotifyExhausted();
      toReturn = false;
    }
    return toReturn
  }

  NotifyExhausted() {
    this.debug().Log('Iteration: ' + this.__nickName + ' counter exhausted ' + this.__currentIteration + ':' + this.__maxIterations);
  }
  WaitAndThen(timeoutFunction: Function) {
    this.debug().FuncStart(this.WaitAndThen.name, this.__nickName + ' ' + timeoutFunction.name);
    var self = this;
    setTimeout(timeoutFunction(), self.__timeout);
    this.debug().FuncEnd(this.WaitAndThen.name, this.__nickName);
  }

  Wait(): Promise<void> {
    //self.debug().FuncStart(self.WaitAndThen.name, self.__nickName + ' ' + timeoutFunction.name);
    if (!this.UiMan().OperationCancelled) {
      return new Promise((resolve) => {
        setTimeout(resolve, this.__timeout);
      });
    }
    //this.debug().FuncEnd(this.WaitAndThen.name, self.__nickName);
  }
}