﻿import { ILoggerAgent } from "../Interfaces/Agents/ILoggerBase";
export class PromiseResult {
  private RejectReasonArPvt: string[];
  private Success: boolean;
  privaILoggerAgentBaseggerBase;
  NickName: string;
  private prefix: string = 'Promise Successful? -> ';
  RejectReasons: string
    Log: ILoggerAgent;

  constructor(nickname: string, logger: ILoggerAgent) {
    this.Success = false;
    this.NickName = nickname;
    this.RejectReasonArPvt = [];
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
    this.RejectReasons += ', ' + ex;
    this.Success = false;
    if (this.Log) {
      this.Log.Error(this.prefix + this.NickName, this.Success + '  err: ' + ex);
    } else {
      console.log('no logger fail ' + ex);
    }
  }
}