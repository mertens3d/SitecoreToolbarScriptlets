import { APICommandFlag } from "../Enums/APICommand";
import { InternalCommandFlag } from "../Enums/InternalCommand";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { IStateOfScUi } from "./StateOf/IDataStateOfSitecoreWindow";

export interface IToApiCallPayload {
  DataOneWindowStorage: IStateOfScUi;
  APICommand: APICommandFlag;

  SnapShotFlavor: SnapShotFlavor;
  SnapShotOfStateScUiApi: IStateOfScUi;
}