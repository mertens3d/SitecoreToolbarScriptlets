import { _CommonBase } from "../../../_CommonCoreBase";
import { ICommonCore } from "../../../Interfaces/Agents/ICommonCore";
import { SharedConst } from "../../../SharedConst";


export class IterationDrone extends _CommonBase {
  IsExhausted: boolean;
  IsExhaustedMsg: string = 'Iteration helper exhausted';
  OperationCancelled: any;
  private CurrentIteration: number;
  private MaxIterations: number;
  private NickName: string;
  private Timeout: number;
  private LogThisDroneInstance: boolean;

  constructor(hindeCore: ICommonCore, nickname: string, logThisDroneInstance: boolean, maxIterations: number = null) {
    super(hindeCore);
    this.LogThisDroneInstance = logThisDroneInstance;
    if (!maxIterations) {
      maxIterations = SharedConst.Const.IterHelper.MaxCount.Default;
    }

    this.MaxIterations = maxIterations;
    this.CurrentIteration = maxIterations;
    this.Timeout = SharedConst.Const.IterHelper.Timeouts.Default;
    this.NickName = nickname;
    this.IsExhausted = false;
  }

  DecrementAndKeepGoing() {
    var toReturn = false;

    if (this.CurrentIteration > 0) {
      this.CurrentIteration -= 1;
      this.Timeout += this.Timeout * SharedConst.Const.IterHelper.GrowthPerIteration;

      if (this.TaskMonitor.IsCancelRequested()) {
        this.ErrorHand.HandleFatalError('CANCEL REQUESTED', '-----------------------------------');
      }

      if (this.Timeout > SharedConst.Const.IterHelper.Timeouts.Max) {
        this.Timeout = SharedConst.Const.IterHelper.Timeouts.Max;
      }

      if (this.LogThisDroneInstance) {
        this.Logger.Log(this.DecrementAndKeepGoing.name + ' ' + this.NickName + ' ' + this.CurrentIteration + ':' + this.MaxIterations + ' | cur. timeout: ' + this.Timeout);
      }

      toReturn = true;
    } else {
      this.IsExhausted = true;
      this.NotifyExhausted();
      toReturn = false;
    }
    return toReturn
  }

  CurrentTimeout(): number {
    return this.Timeout;
  }

  NotifyExhausted() {
    if (this.LogThisDroneInstance) {
      this.Logger.Log('Iteration: ' + this.NickName + ' counter exhausted ' + this.CurrentIteration + ':' + this.MaxIterations);
    }
  }

  WaitAndThen(timeoutFunction: Function) {
    if (this.LogThisDroneInstance) {
      this.Logger.FuncStart(this.WaitAndThen.name, this.NickName + ' ' + timeoutFunction.name);
    }
    var self = this;
    setTimeout(timeoutFunction(), self.Timeout);

    if (this.LogThisDroneInstance) {
      this.Logger.FuncEnd(this.WaitAndThen.name, this.NickName);
    }
  }

  Wait(): Promise<void> {
    if (!this.OperationCancelled) {
      this.TaskMonitor.NotifyWaiting(true);

      return new Promise((resolve) => {
        setTimeout(() => {
      this.TaskMonitor.NotifyWaiting(false);

          resolve();
        }   , this.Timeout);
      });
    }
  }
}