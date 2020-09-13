export class VisiblityTestResult {
  Passes: boolean = true;
  FriendlyFailReason: string = '';
  TestNameFriendly: string;

  constructor(testNameFriendly: string) {
    this.TestNameFriendly = testNameFriendly;
  }
}