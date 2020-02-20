import { LoggerBase } from "./LoggerBase";
export class PromiseResult {
  RejectReason: string;
  private Success: boolean;
  private Log: LoggerBase;
  NickName: string;
  private prefix: string = 'Promise Successful? -> ';
  constructor(nickname: string, logger: LoggerBase) {
    this.Success = false;
    this.NickName = nickname;
    this.RejectReason = '';
    this.Log = logger;
  }
  WasSuccessful() {
    return this.Success;
  }
  MarkSuccessful() {
    this.Success = true;
    if (this.Log) {
      this.Log.LogVal(this.prefix + this.NickName, this.Success);
    } else {
      console.log('no logger success');
    }
  }
  MarkFailed(ex: string) {
    if (ex) {
      ex = ex.toString();
    }
    else {
      ex = '{no fail message}';
    }
    this.RejectReason = ex;
    this.Success = false;
    if (this.Log) {
      this.Log.Error(this.prefix + this.NickName, ex);
    } else {
      console.log('no logger fail ' + ex);
    }
  }
}