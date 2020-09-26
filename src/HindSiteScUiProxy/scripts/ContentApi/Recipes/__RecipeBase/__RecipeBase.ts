import { AutoSnapShotAgent } from "../../../../../Content/scripts/Agents/AutoSnapShotAgent";
import { RecipeBasics } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { SnapShotFlavor } from "../../../../../Shared/scripts/Enums/SnapShotFlavor";
import { IContentAtticAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowManager } from "../../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IApiCommandPayload } from "../../../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { IRecipeBasics } from "../../../../../Shared/scripts/Interfaces/IPromiseHelper";
import { ContentEditorProxy } from "../../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";

export abstract class _ApiRecipeBase {
  protected AtticAgent: IContentAtticAgent;
  protected Logger: ILoggerAgent;
  protected RecipeBasics: IRecipeBasics;
  protected ScWinMan: IScWindowManager;
  protected TargetSnapShotFlavor: SnapShotFlavor;
  protected TargetDoc: IDataOneDoc;
  protected TargetConEdProxy: ContentEditorProxy;
  protected AutoSnapShotAgent: AutoSnapShotAgent;

  constructor(commandData: IApiCommandPayload) {
    this.Logger = commandData.Logger;
    this.RecipeBasics = new RecipeBasics(this.Logger);
    this.ScWinMan = commandData.ScWinMan;
    this.AtticAgent = commandData.AtticAgent;
    //this.TargetSnapShotFlavor = commandData.TargetSnapShotFlavor
    this.TargetDoc = commandData.TargetDoc;
    this.TargetConEdProxy = commandData.TargetCeProxy;
    this.AutoSnapShotAgent = commandData.AutoSnapShotAgent;
  }
}