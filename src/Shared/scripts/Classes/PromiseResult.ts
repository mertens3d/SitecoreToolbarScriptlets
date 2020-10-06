import { IHindeCore } from "../Interfaces/Agents/IHindeCore";
import { _HindeCoreBase } from "../LoggableBase";

export class PromiseResult extends _HindeCoreBase {
  private Success: boolean;
  privaILoggerAgentBaseggerBase;
  NickName: string;
  private prefix: string = 'Promise Successful? -> ';
  RejectReasons: string

  constructor(nickname: string, hindeCore: IHindeCore) {
    super(hindeCore);
    this.NickName = nickname;
  }
  WasSuccessful() {
    return this.Success;
  }
  MarkSuccessful() {
    this.Success = true;
    if (this.Logger) {
      this.Logger.LogVal(this.prefix + this.NickName, this.Success);
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
    if (this.Logger) {
      this.ErrorHand.ErrorAndThrow(this.prefix + this.NickName, this.Success + '  err: ' + ex);
    } else {
      console.log('no logger fail ' + ex);
    }
  }
}