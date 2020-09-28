import { IDataOneDoc } from "../Data/IDataOneDoc";

export interface IToastAgent {
  LowerPerpetualToast(arg0: string);
  OnRaiseToastReq();
  RaisePerpetualToast(arg0: string);
  RaiseToastNotification( ScreenMessage: string);
}
