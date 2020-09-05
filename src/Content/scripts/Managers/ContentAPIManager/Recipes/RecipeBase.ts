import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/IDataOneDoc";
import { IRecipeBasics } from "../../../../../Shared/scripts/Interfaces/IPromiseHelper";

export class RecipeBase {
  protected CommandData: ICommandHndlrDataForContent;

  protected Logger: ILoggerAgent;
  protected TopLevelDoc: IDataOneDoc;
  protected PromiseBasic: IRecipeBasics;

  constructor(commandData: ICommandHndlrDataForContent) {
    this.CommandData = commandData;
    this.Logger = commandData.Logger;
    this.TopLevelDoc = commandData.TopLevelDoc;
    this.PromiseBasic = commandData.RecipeBasics;
  }
}
