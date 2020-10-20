import { DocumentJacket } from "../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { IStateOfScUi } from "../../StateOf/IDataStateOfSitecoreWindow";
import { IStateFullDocProxy } from "../../Proxies/StateFull/IStateFullDocProxy";
import { ScWindowType } from "../../../Enums/50 - scWindowType";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { ScRibbonCommand } from "../../../Enums/eScRibbonCommand";

export interface IScWindowFacade {
  TriggerCERibbonCommand(ribbonCommand: ScRibbonCommand): void;
  GetCurrentPageType(): ScWindowType;
  GetStateOfScUiProxy(snapshotFlavor: SnapShotFlavor): Promise<IStateOfScUi>;
  InstantiateAsyncMembers(): Promise<void>;
  PublishActiveCE():Promise<void>;
  SetCompactCss(targetDoc: DocumentJacket):void;
  SetStateOfScWin(dataToRestore: IStateOfScUi): Promise<void>
  StateFullProxy: IStateFullDocProxy;
}
