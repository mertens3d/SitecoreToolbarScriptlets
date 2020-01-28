import { IsScMode } from "../Interfaces/IscMode";
import { IGuid } from "../Interfaces/IGuid";

export class PayloadDataFromPopUp {
  idOfSelect: IGuid;
  NewNickname: string;
  ReqScMode: IsScMode;
  ScreenMessage: string;
  UseOriginalWindowLocation: boolean;
}