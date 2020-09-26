import { ScWindowType } from "../../../Enums/scWindowType";
import { IDataOneDoc } from "../../Data/IDataOneDoc";
import { IDataStateOfSitecoreWindow } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IScUrlAgent } from "../IScUrlAgent/IScUrlAgent";
import { InitResultsScWindowManager } from "../InitResultsScWindowManager";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { ScWindowRecipePartials } from "../../../../../HindSiteScUiProxy/scripts/Managers/ScWindowManager/ScWindowRecipePartials";
import { ContentEditorProxy } from "../../../../../HindSiteScUiProxy/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopProxy } from "../../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/DesktopProxy";

export interface IScWindowProxy {
  ContentEditorProxy: ContentEditorProxy;
  DesktopProxy: DesktopProxy;
  GetCurrentPageType(): ScWindowType;
  GetStateOfSitecoreWindow(snapshotFlavor: SnapShotFlavor): Promise<IDataStateOfSitecoreWindow>;
  GetTopLevelDoc(): IDataOneDoc;
  OnReadyInitScWindowManager(): Promise<InitResultsScWindowManager>;
  SetCompactCss(targetDoc: IDataOneDoc);
  SetStateOfScWin(dataToRestore: IDataStateOfSitecoreWindow): Promise<void>
}
