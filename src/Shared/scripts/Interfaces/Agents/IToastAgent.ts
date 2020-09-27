import { IDataOneDoc } from "../Data/IDataOneDoc";

export interface IToastAgent {
  LowerPerpetualToast();
  RaisePerpetualToast(arg0: string);
  RaiseToastNotification( ScreenMessage: string);
}
