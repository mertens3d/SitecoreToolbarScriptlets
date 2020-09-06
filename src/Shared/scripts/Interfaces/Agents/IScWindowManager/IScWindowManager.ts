import { OneCEAgent } from "../../../../../Content/scripts/Agents/OneCEAgent/OneCEAgent";
import { DesktopAgent } from "../../../../../Content/scripts/Managers/DesktopManager/DesktopManager";
import { ScWindowType } from "../../../Enums/scWindowType";
import { IDataOneDoc } from "../../Data/IDataOneDoc";
import { IScUrlAgent } from "../IScUrlAgent/IScUrlAgent";
import { SnapShotFlavor } from "../../../Enums/SnapShotFlavor";
import { ScWindowRecipePartials } from "../../../../../Content/scripts/Managers/ScWindowManager/ScWindowRecipePartials";

export interface IScWindowManager {
  GetScWindowStateA();
  MakeScWinRecipeParts(): ScWindowRecipePartials;
  GetScWindowStateB(TargetSnapShotFlavor: SnapShotFlavor);
  GetScUrlAgent(): IScUrlAgent;
  GetCurrentPageType(): ScWindowType;
  InitScWindowManager(): Promise<void>;
  SetCompactCss(targetDoc: IDataOneDoc);
  OneCEAgent: OneCEAgent;
  OneDesktopMan: DesktopAgent;
  GetTopLevelDoc(): IDataOneDoc;
}
