import { DocumentJacket } from "../../../../../DOMJacket/DocumentJacket";
import { ScWindowType } from "../../../Enums/5000 - scWindowType";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { IStateOfScUi } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IStateFullProxy } from "../IStateProxy";

export interface IScWindowFacade {
  GetCurrentPageType(): ScWindowType;
  GetStateOfScUiProxy(snapshotFlavor: SnapShotFlavor): Promise<IStateOfScUi>;
  InstantiateAsyncMembers_ScWindowFacade();
  PublishActiveCE();
  SetCompactCss(targetDoc: DocumentJacket);
  SetStateOfScWin(dataToRestore: IStateOfScUi): Promise<void>
  StateFullProxy: IStateFullProxy;
}
