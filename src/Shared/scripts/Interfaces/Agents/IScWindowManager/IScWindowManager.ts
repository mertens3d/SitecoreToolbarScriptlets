﻿import { DocumentJacket } from "../../../../../DOMJacket/DocumentJacket";
import { IStateOfScUi } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IStateFullProxy } from "../IStateProxy";
import { ScWindowType } from "../../../Enums/50 - scWindowType";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";

export interface IScWindowFacade {
  GetCurrentPageType(): ScWindowType;
  GetStateOfScUiProxy(snapshotFlavor: SnapShotFlavor): Promise<IStateOfScUi>;
  InstantiateAsyncMembers_ScWindowFacade();
  PublishActiveCE();
  SetCompactCss(targetDoc: DocumentJacket);
  SetStateOfScWin(dataToRestore: IStateOfScUi): Promise<void>
  StateFullProxy: IStateFullProxy;
}
