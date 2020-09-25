import { ScWindowRecipePartials } from "../../../../../Content/scripts/Managers/ScWindowManager/ScWindowRecipePartials";
import { IContentEditorProxy, IDesktopProxy } from "../../Proxies/IDesktopProxy";
import { ScWindowType } from "../../../Enums/scWindowType";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { IDataOneDoc } from "../../Data/IDataOneDoc";
import { IDataStateOfSitecoreWindow } from "../../Data/States/IDataStateOfSitecoreWindow";
import { InitResultsScWindowManager } from "../InitResultsScWindowManager";
import { IScUrlAgent } from "../IScUrlAgent/IScUrlAgent";

export interface IScWindowManager {
  GetStateOfSitecoreWindow(snapshotFlavor: SnapShotFlavor): Promise<IDataStateOfSitecoreWindow>;
  MakeScWinRecipeParts(): ScWindowRecipePartials;
  GetScUrlAgent(): IScUrlAgent;
  GetCurrentPageType(): ScWindowType;
  OnReadyInitScWindowManager(): Promise<InitResultsScWindowManager>;
  SetCompactCss(targetDoc: IDataOneDoc);
  ContentEditorProxy(): IContentEditorProxy;
  DesktopProxy(): IDesktopProxy;
  GetTopLevelDoc(): IDataOneDoc;
}
