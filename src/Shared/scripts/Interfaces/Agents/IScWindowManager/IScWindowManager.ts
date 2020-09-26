import { ScWindowRecipePartials } from "../../../../../HindSiteScUiProxy/scripts/Managers/ScWindowManager/ScWindowRecipePartials";
import { ContentEditorProxy } from "../../../../../HindSiteScUiProxy/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopProxy } from "../../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/DesktopProxy";
import { ScWindowType } from "../../../Enums/scWindowType";
import { IDataOneDoc } from "../../Data/IDataOneDoc";
import { IDataStateOfSitecoreWindow } from "../../Data/States/IDataStateOfSitecoreWindow";
import { IScUrlAgent } from "../IScUrlAgent/IScUrlAgent";
import { InitResultsScWindowManager } from "../InitResultsScWindowManager";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";

export interface IScWindowManager {
  GetStateOfSitecoreWindow(snapshotFlavor: SnapShotFlavor): Promise<IDataStateOfSitecoreWindow>;
  MakeScWinRecipeParts(): ScWindowRecipePartials;
  GetScUrlAgent(): IScUrlAgent;
  GetCurrentPageType(): ScWindowType;
  OnReadyInitScWindowManager(): Promise<InitResultsScWindowManager>;
  SetCompactCss(targetDoc: IDataOneDoc);
  ContentEditorProxy(): ContentEditorProxy;
  DesktopProxy(): DesktopProxy;
  GetTopLevelDoc(): IDataOneDoc;
}
