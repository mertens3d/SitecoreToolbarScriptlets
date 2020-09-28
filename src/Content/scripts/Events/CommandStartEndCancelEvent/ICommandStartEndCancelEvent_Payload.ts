
export enum CommandState_State {
  Unknwon = 0,
  CommandStarted,
  CommandCompletedSuccessfully,
  CommandCompletedWithError,
  CommandCanceled
}
export interface ICommandStartEndCancelEvent_Payload {
  CommandState: CommandState_State;

}
