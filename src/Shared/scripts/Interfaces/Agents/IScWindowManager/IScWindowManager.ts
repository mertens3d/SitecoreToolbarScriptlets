import { ScWindowType } from "../../../Enums/scWindowType";
import { IDataOneDoc } from "../../Data/IDataOneDoc";
import { IScUrlAgent } from "../IScUrlAgent/IScUrlAgent";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { ScWindowRecipePartials } from "../../../../../Content/scripts/Managers/ScWindowManager/ScWindowRecipePartials";
import { ContentEditorProxy } from "../../../../../Content/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopProxy } from "../../../../../Content/scripts/Proxies/Desktop/DesktopProxy/DesktopProxy";
import { IDataOneWindowStorage } from "../../Data/IDataOneWindowStorage";

export interface IScWindowManager {
  GetStateScWindow();
  MakeScWinRecipeParts(): ScWindowRecipePartials;
  GetStateForStorage(TargetSnapShotFlavor: SnapShotFlavor): Promise<IDataOneWindowStorage>;
  GetScUrlAgent(): IScUrlAgent;
  GetCurrentPageType(): ScWindowType;
  InitScWindowManager(): Promise<void>;
  SetCompactCss(targetDoc: IDataOneDoc);
  CeProxy: ContentEditorProxy
  DesktopUiProxy: DesktopProxy;
  GetTopLevelDoc(): IDataOneDoc;
}
