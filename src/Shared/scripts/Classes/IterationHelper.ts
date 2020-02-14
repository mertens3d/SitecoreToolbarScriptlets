import { LoggerBase } from "./LoggerBase";
import { SharedConst } from '../SharedConst';
import { HelperBase } from './HelperBase';
import { HelperHub } from '../Helpers/Helpers';

export class IterationHelper extends HelperBase{
  private __currentIteration: number;
  private __maxIterations: number;
  private __nickName: string;
  private __timeout: number;
  IsExhausted: boolean;
  IsExhaustedMsg: string = 'Iteration helper exhausted';
  OperationCancelled: any;

  constructor(helperHub: HelperHub, nickname: string, maxIterations: number = null) {

    super(helperHub)
    if (!maxIterations) {
      maxIterations = SharedConst.SharedConst.IterHelper.MaxCount.Default;
    }

    this.__maxIterations = maxIterations;
    this.__currentIteration = maxIterations;
    this.__timeout = SharedConst.SharedConst.IterHelper.Timeouts.Default;
    this.__nickName = nickname;
    this.IsExhausted = false;

  }

  DecrementAndKeepGoing() {
    var toReturn = false;

    //!this.MsgMan().OperationCancelled &&

    if ( this.__currentIteration > 0) {
      this.__currentIteration -= 1;
      this.__timeout += this.__timeout * SharedConst.SharedConst.IterHelper.GrowthPerIteration;
      if (this.__timeout > SharedConst.SharedConst.IterHelper.Timeouts.Max) {
        this.__timeout = SharedConst.SharedConst.IterHelper.Timeouts.Max;
      }
      this.Debug.Log('DecrementAndKeepGoing: ' + this.__nickName + ' ' + this.__currentIteration + ':' + this.__maxIterations + ' | timeout: ' + this.__timeout);

      toReturn = true;
    } else {
      this.IsExhausted = true;
      this.NotifyExhausted();
      toReturn = false;
    }
    return toReturn
  }

  NotifyExhausted() {
    this.Debug.Log('Iteration: ' + this.__nickName + ' counter exhausted ' + this.__currentIteration + ':' + this.__maxIterations);
  }
  WaitAndThen(timeoutFunction: Function) {
    this.Debug.FuncStart(this.WaitAndThen.name, this.__nickName + ' ' + timeoutFunction.name);
    var self = this;
    setTimeout(timeoutFunction(), self.__timeout);
    this.Debug.FuncEnd(this.WaitAndThen.name, this.__nickName);
  }

  Wait(): Promise<void> {
    this.Debug.FuncStart(this.Wait.name, this.__nickName);

    if (!this.OperationCancelled) {
      return new Promise((resolve) => {
        setTimeout(resolve, this.__timeout);
      });
    }
    this.Debug.FuncEnd(this.WaitAndThen.name, this.__nickName);
  }
}