﻿import { SharedConst } from '../SharedConst';
import { HelperBase } from './HelperBase';
import { HelperHub } from '../Helpers/Helpers';
import { IAllHelperAgents } from '../Interfaces/Agents/IAllHelperAgents';

export class IterationHelper extends HelperBase{
  private __currentIteration: number;
  private __maxIterations: number;
  private __nickName: string;
  private __timeout: number;
  IsExhausted: boolean;
  IsExhaustedMsg: string = 'Iteration helper exhausted';
  OperationCancelled: any;

  constructor(helperHub: HelperHub, nickname: string, allHelperAgents: IAllHelperAgents, maxIterations: number = null ) {

    super(helperHub, allHelperAgents)
    if (!maxIterations) {
      maxIterations = SharedConst.Const.IterHelper.MaxCount.Default;
    }

    this.__maxIterations = maxIterations;
    this.__currentIteration = maxIterations;
    this.__timeout = SharedConst.Const.IterHelper.Timeouts.Default;
    this.__nickName = nickname;
    this.IsExhausted = false;

  }

  DecrementAndKeepGoing() {
    var toReturn = false;

    //!this.MsgMan().OperationCancelled &&

    if ( this.__currentIteration > 0) {
      this.__currentIteration -= 1;
      this.__timeout += this.__timeout * SharedConst.Const.IterHelper.GrowthPerIteration;
      if (this.__timeout > SharedConst.Const.IterHelper.Timeouts.Max) {
        this.__timeout = SharedConst.Const.IterHelper.Timeouts.Max;
      }
      this.AllHelperAgents.Logger.Log('DecrementAndKeepGoing: ' + this.__nickName + ' ' + this.__currentIteration + ':' + this.__maxIterations + ' | timeout: ' + this.__timeout);

      toReturn = true;
    } else {
      this.IsExhausted = true;
      this.NotifyExhausted();
      toReturn = false;
    }
    return toReturn
  }

  NotifyExhausted() {
    this.AllHelperAgents.Logger.Log('Iteration: ' + this.__nickName + ' counter exhausted ' + this.__currentIteration + ':' + this.__maxIterations);
  }
  WaitAndThen(timeoutFunction: Function) {
    this.AllHelperAgents.Logger.FuncStart(this.WaitAndThen.name, this.__nickName + ' ' + timeoutFunction.name);
    var self = this;
    setTimeout(timeoutFunction(), self.__timeout);
    this.AllHelperAgents.Logger.FuncEnd(this.WaitAndThen.name, this.__nickName);
  }

  Wait(): Promise<void> {
    //this.AllHelperAgents.Logger.FuncStart(this.Wait.name, this.__nickName);

    if (!this.OperationCancelled) {
      return new Promise((resolve) => {
        setTimeout(resolve, this.__timeout);
      });
    }
    //this.AllHelperAgents.Logger.FuncEnd(this.WaitAndThen.name, this.__nickName);
  }
}