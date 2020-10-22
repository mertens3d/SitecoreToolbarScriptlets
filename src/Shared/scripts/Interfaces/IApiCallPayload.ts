import { ScRibbonCommand } from "../Enums/eScRibbonCommand";
import { SnapShotFlavor } from "../Enums/SnapShotFlavor";
import { IStateOfScUi } from "./StateOf/IDataStateOfSitecoreWindow";

export interface IApiCallPayload {
    DataOneWindowStorage: IStateOfScUi;
    ScRibbonCommand: ScRibbonCommand;
    SnapShotFlavor: SnapShotFlavor;
    SnapShotOfStateScUiApi: IStateOfScUi;
}
