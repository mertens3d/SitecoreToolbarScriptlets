class IterationHelper extends ManagerBase {
  private __currentIteration: number;
  private __maxIterations: number;
  private __nickName: string;
  private __timeout: number;
    IsExhausted: boolean;

  constructor(xyyz: Hub, maxIterations: number, nickname: string) {
    super(xyyz);
    //xyyz.debug.FuncStart('ctor: ' + IterationHelper.name, nickname);
    this.__maxIterations = maxIterations;
    this.__currentIteration = maxIterations;
    this.__timeout = xyyz.Const.Timeouts.IterationHelperInitial;
    this.__nickName = nickname;
    this.IsExhausted = false;

    //xyyz.debug.FuncEnd('ctor: ' + IterationHelper.name);
  }

  DecrementAndKeepGoing() {
    var toReturn = false;

    if (this.__currentIteration > 0) {
      this.__currentIteration -= 1;
      this.__timeout += this.__timeout * 0.5;
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

  Wait() {
    //self.debug().FuncStart(self.WaitAndThen.name, self.__nickName + ' ' + timeoutFunction.name);
    return new Promise((resolve) => {
       setTimeout(resolve, this.__timeout);
    });

    //this.debug().FuncEnd(this.WaitAndThen.name, self.__nickName);
  }
}