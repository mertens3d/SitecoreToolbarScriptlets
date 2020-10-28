import { APICommandFlag } from "../Enums/APICommand";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { IStateOfScUi } from "./StateOf/IDataStateOfSitecoreWindow";

export interface IToApiCallPayload {
  APICommand: APICommandFlag;
  SnapShotFlavor: SnapShotFlavor;
  StateOfScUi: IStateOfScUi;
}