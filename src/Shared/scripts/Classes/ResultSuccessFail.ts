export class ResultSuccessFail{
    FailMessage: string;
    Succeeded: boolean;
  constructor() {
    this.Succeeded = false;
    this.FailMessage = '';
  }
}