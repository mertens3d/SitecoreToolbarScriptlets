import { VisiblityTestResult } from "./VisiblityTestResult";
import { _CommonBase } from "../../_CommonCoreBase";

export class VisiblityTestResultsBucket extends _CommonBase {
  TestResults: VisiblityTestResult[] = [];

  HasFailures(): boolean {
    let oneFailed: boolean = false;

    if (this.TestResults) {
      this.TestResults.forEach((oneTest) => oneFailed = oneFailed || !oneTest || !oneTest.DidItPass);
    } else {
      this.ErrorHand.HandleFatalError(this.HasFailures.name, 'null test results');
    }
    return oneFailed;
  }

  GetFriendlyFails(): string {
    let toReturn: string = '';

    if (this.TestResults) {

      this.TestResults.forEach((oneTest) => {
        if (oneTest) {

          if (!oneTest.DidItPass) {
            toReturn = ' ' + oneTest.FriendlyFailReason;
          }
        } else {
          this.Logger.LogAsJsonPretty('this.TestResults', this.TestResults);
          this.ErrorHand.HandleFatalError(this.GetFriendlyFails.name, 'null single test result');
        }
      });
    } else {
      this.ErrorHand.HandleFatalError(this.GetFriendlyFails.name, 'null testResults');
    }

    return toReturn;
  }
}