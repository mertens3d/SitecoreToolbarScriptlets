class IterationHelper extends ManagerBase {
  private __currentIteration: number;
  private __maxIterations: number;
  private __nickName: string;
  private __timeout: number;

  constructor(xyyz: Hub, maxIterations: number, timeout: number, nickname: string) {
    super(xyyz);
    xyyz.debug.FuncStart(IterationHelper.name, nickname);
    this.__maxIterations = maxIterations;
    this.__currentIteration = maxIterations;
    this.__timeout = timeout;
    this.__nickName = nickname;

    xyyz.debug.FuncEnd(IterationHelper.name);
  }

  DecrementAndKeepGoing() {
    this.__currentIteration -= 1;
    this.debug().Log('Iteration: ' + this.__nickName + ' ' + this.__currentIteration + ':' + this.__maxIterations);
    var toReturn = this.__currentIteration > 0;

    if (!toReturn) {
      this.NotifyExhausted();
    }
    return toReturn
  }
  NotifyExhausted() {
    this.debug().Log('Iteration: ' + this.__nickName + ' counter exhausted ' + this.__currentIteration + ':' + this.__maxIterations);
  }
  WaitAndThen(timeoutFunction: Function) {
    setTimeout(timeoutFunction , this.__timeout);
  }
}