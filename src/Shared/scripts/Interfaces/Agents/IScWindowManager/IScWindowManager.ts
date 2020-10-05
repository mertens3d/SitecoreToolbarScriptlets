import { ContentEditorSFProxy } from "../../../../../HindSiteScUiProxy/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopSFProxy } from "../../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/DesktopProxy";
import { ScWindowType } from "../../../Enums/scWindowType";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { ScDocumentFacade } from "../../../../../HindSiteScUiProxy/Facades/ScDocumentFacade";
import { IStateOfScUi } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IStateFullProxy } from "../IStateProxy";

export interface IScWindowFacade {
  GetCurrentPageType(): ScWindowType;
  GetStateOfScUiProxy(snapshotFlavor: SnapShotFlavor): Promise<IStateOfScUi>;
  Instantiate_ScWindowFacade();
  PublishActiveCE();
  SetCompactCss(targetDoc: ScDocumentFacade);
  SetStateOfScWin(dataToRestore: IStateOfScUi): Promise<void>
  StateFullProxy: IStateFullProxy;
}
