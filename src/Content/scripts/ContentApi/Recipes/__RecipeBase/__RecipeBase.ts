import { IContentEditorProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/IDesktopProxy";
import { RecipeBasicsForContent } from "../../../../../Shared/scripts/Classes/RecipeBasics";
import { SnapShotFlavor } from "../../../../../Shared/scripts/Enums/SnapShotFlavor";
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { IContentAtticAgent } from "../../../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IScWindowManager } from "../../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { ICommandHandlerDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { IRecipeBasicsForContent } from "../../../../../Shared/scripts/Interfaces/IPromiseHelper";
import { AutoSnapShotAgent } from "../../../Agents/AutoSnapShotAgent/AutoSnapShotAgent";

export abstract class __RecipeBase {
  protected AtticAgent: IContentAtticAgent;
  protected Logger: ILoggerAgent;
  protected RecipeBasics: IRecipeBasicsForContent;
  protected ScWinMan: IScWindowManager;
  protected TargetSnapShotId: GuidData;
  protected TargetSnapShotFlavor: SnapShotFlavor;
  protected TargetDoc: IDataOneDoc;
  protected TargetConEdProxy: IContentEditorProxy;
  protected AutoSnapShotAgent: AutoSnapShotAgent;
    ContentBrowserProxy: import("C:/projects/SitecoreToolbarScriptlets/src/Shared/scripts/Interfaces/Agents/IContentBrowserProxy").IContentBrowserProxy;
    CommandData: ICommandHandlerDataForContent;
    DesktopProxy: import("C:/projects/SitecoreToolbarScriptlets/src/Shared/scripts/Interfaces/Proxies/IDesktopProxy").IDesktopProxy;

  constructor(commandData: ICommandHandlerDataForContent) {
    this.CommandData = commandData;
    this.Logger = commandData.Logger;
    this.RecipeBasics = new RecipeBasicsForContent(this.Logger, commandData.ContentBrowserProxy);
    this.ScWinMan = commandData.ScWinMan;
    this.AtticAgent = commandData.AtticAgent;
    this.TargetSnapShotId = commandData.TargetSnapShotId;
    //this.TargetSnapShotFlavor = commandData.TargetSnapShotFlavor
    this.TargetDoc = commandData.TargetDoc;
    this.TargetConEdProxy = commandData.TargetCeProxy;
    this.AutoSnapShotAgent = commandData.AutoSnapShotAgent;
    this.ContentBrowserProxy = commandData.ContentBrowserProxy;
    this.DesktopProxy = commandData.DesktopProxy;
  }
}