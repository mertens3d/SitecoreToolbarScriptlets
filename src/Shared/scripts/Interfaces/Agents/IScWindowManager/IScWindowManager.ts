import { DocumentJacket } from "../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { ScWindowType } from "../../../Enums/50 - scWindowType";
import { APICommandFlag } from "../../../Enums/APICommand";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { IScDocProxy } from "../../ScProxies/IBaseScDocProxy";
import { IStateOfScUi } from "../../StateOf/IDataStateOfSitecoreWindow";

export interface IScWindowTreeProxy {
  TriggerCERibbonCommand(ribbonCommand: APICommandFlag): void;
  GetCurrentPageType(): ScWindowType;
  GetStateOfScUiProxy(snapshotFlavor: SnapShotFlavor): Promise<IStateOfScUi>;
  InstantiatetRoot(): Promise<void>;
  PublishActiveCE():Promise<void>;
  SetCompactCss(targetDoc: DocumentJacket):void;
  SetStateOfScWin(dataToRestore: IStateOfScUi): Promise<void>
  RootProxy: IScDocProxy;
}
