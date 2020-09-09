import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { SnapShotFlavor } from "../../../../../Shared/scripts/Enums/SnapShotFlavor";
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { IContentAtticAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowManager } from "../../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { IRecipeBasics } from "../../../../../Shared/scripts/Interfaces/IPromiseHelper";
import { ContentEditorProxy } from "../../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";

export class __RecipeBase {
  protected AtticAgent: IContentAtticAgent;
  protected Logger: ILoggerAgent;
  protected RecipeBasics: IRecipeBasics;
  protected ScWinMan: IScWindowManager;
  protected TargetSnapShotId: GuidData;
  protected TargetSnapShotFlavor: SnapShotFlavor;
  protected TargetDoc: IDataOneDoc;
  protected TargetConEdProxy: ContentEditorProxy;

  constructor(commandData: ICommandHndlrDataForContent) {
    this.Logger = commandData.Logger;
    this.RecipeBasics = new RecipeBasics(this.Logger);
    this.ScWinMan = commandData.ScWinMan;
    this.AtticAgent = commandData.AtticAgent;
    this.TargetSnapShotId = commandData.TargetSnapShotId;
    this.TargetSnapShotFlavor = commandData.TargetSnapShotFlavor
    this.TargetDoc = commandData.TargetDoc;
    this.TargetConEdProxy = commandData.TargetCeProxy;
  }
}