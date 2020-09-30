import { ScWindowType } from "../../../Enums/scWindowType";
import { IDataOneDoc } from "../../Data/IDataOneDoc";
import { IStateOfScUiProxy } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IScUrlAgent } from "../IScUrlAgent/IScUrlAgent";
import { InitReportScWindowManager } from "../InitResultsScWindowManager";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { ScWindowRecipePartials } from "../../../../../HindSiteScUiProxy/scripts/Managers/ScWindowManager/ScWindowRecipePartials";
import { ContentEditorProxy } from "../../../../../HindSiteScUiProxy/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopProxy } from "../../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/DesktopProxy";

export interface IScWindowProxy {
  PublishActiveCE();
  ContentEditorProxy: ContentEditorProxy;
  DesktopProxy: DesktopProxy;
  GetCurrentPageType(): ScWindowType;
  GetStateOfScUiProxy(snapshotFlavor: SnapShotFlavor): Promise<IStateOfScUiProxy>;
  GetTopLevelDoc(): IDataOneDoc;
  Instantiate_ScWindowProxy(): Promise<void>;
  SetCompactCss(targetDoc: IDataOneDoc);
  SetStateOfScWin(dataToRestore: IStateOfScUiProxy): Promise<void>
}
