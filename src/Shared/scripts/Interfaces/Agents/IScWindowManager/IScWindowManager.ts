import { DesktopAgent } from "../../../../../Content//scripts/Agents/DesktopAgent/DesktopAgent";
import { ScWindowType } from "../../../Enums/scWindowType";
import { IDataOneDoc } from "../../Data/IDataOneDoc";
import { IScUrlAgent } from "../IScUrlAgent/IScUrlAgent";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { ScWindowRecipePartials } from "../../../../../Content/scripts/Managers/ScWindowManager/ScWindowRecipePartials";
import { ContentEditorAgent } from "../../../../../Content/scripts/Agents/ContentEditorAgent/ContentEditorAgent";

export interface IScWindowManager {
  GetScWindowStateA();
  MakeScWinRecipeParts(): ScWindowRecipePartials;
  GetScWindowStateB(TargetSnapShotFlavor: SnapShotFlavor);
  GetScUrlAgent(): IScUrlAgent;
  GetCurrentPageType(): ScWindowType;
  InitScWindowManager(): Promise<void>;
  SetCompactCss(targetDoc: IDataOneDoc);
  OneCEAgent: ContentEditorAgent
  OneDesktopMan: DesktopAgent;
  GetTopLevelDoc(): IDataOneDoc;
}
