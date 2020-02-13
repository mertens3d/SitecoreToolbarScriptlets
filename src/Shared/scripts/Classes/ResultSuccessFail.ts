export class ResultSuccessFail {
  RejectMessage: string;
  Succeeded: boolean;

  constructor() {
    this.Succeeded = false;
    this.RejectMessage = '';
  }
}