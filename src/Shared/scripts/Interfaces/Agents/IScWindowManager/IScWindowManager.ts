import { IDataOneDoc } from "../../IDataOneDoc";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { scWindowType } from "../../../Enums/scWindowType";

export interface IScWindowManager {
  GetCurrentPageType(): scWindowType;
  GetWindowState(TargetSnapShotFlavor: SnapShotFlavor);
  InitScWindowManager(): any;
  SetCompactCss(targetDoc: IDataOneDoc);
  OneCEAgent: any;
  OneDesktopMan: any;
  RestoreStateToTargetDoc(targetDoc: IDataOneDoc, dataOneWindowStorage: any);
  TopLevelDoc(): IDataOneDoc;
}
