export class VisiblityTestResult {
  DidItPass: boolean = true;
  FriendlyFailReason: string = '';
  TestNameFriendly: string;

  constructor(testNameFriendly: string) {
    this.TestNameFriendly = testNameFriendly;
  }
}