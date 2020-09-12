import { ScWindowType } from "../../../Enums/scWindowType";
import { IDataOneDoc } from "../../Data/IDataOneDoc";
import { IScUrlAgent } from "../IScUrlAgent/IScUrlAgent";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { ScWindowRecipePartials } from "../../../../../Content/scripts/Managers/ScWindowManager/ScWindowRecipePartials";
import { ContentEditorProxy } from "../../../../../Content/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopProxy } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/DesktopProxy";
import { IDataStateOfSitecoreWindow } from "../../Data/IDataOneWindowStorage";

export interface IScWindowManager {
  GetStateOfSiteCoreWindow(): Promise<IDataStateOfSitecoreWindow>;
  MakeScWinRecipeParts(): ScWindowRecipePartials;
  //GetStateOfSitecore(TargetSnapShotFlavor: SnapShotFlavor): Promise<IDataStateOfSitecoreWindow>;
  GetScUrlAgent(): IScUrlAgent;
  GetCurrentPageType(): ScWindowType;
  InitScWindowManager(): Promise<void>;
  SetCompactCss(targetDoc: IDataOneDoc);
  ContentEditorProxy(): ContentEditorProxy
  DesktopProxy(): DesktopProxy;
  GetTopLevelDoc(): IDataOneDoc;
}
