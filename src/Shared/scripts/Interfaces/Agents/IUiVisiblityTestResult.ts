import { VisiblityTestResult } from "./VisiblityTestResult";

export class VisiblityTestResults {
  TestResults: VisiblityTestResult[] = [];

  HasFailures(): boolean {
    let oneFailed: boolean = false;

    this.TestResults.forEach((oneTest) => oneFailed = oneFailed || !oneTest.Passes);
    return oneFailed;
  }

  GetFriendlyFails(): string {
    let toReturn: string = '';

    this.TestResults.forEach((oneTest) => {
      if (!oneTest.Passes) {
        toReturn = ' ' + oneTest.FriendlyFailReason;
      }
    });

    return toReturn;
  }
}

