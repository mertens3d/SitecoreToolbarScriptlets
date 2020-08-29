import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/IDataOneDoc";
import { IPromisesBasic } from "../../../../../Shared/scripts/Interfaces/IPromiseHelper";

export class RecipeBase {
  CommandData: ICommandHndlrDataForContent;
  protected Logger: ILoggerAgent;
  protected TopLevelDoc: IDataOneDoc;
  protected PromiseBasic: IPromisesBasic;
  constructor(commandData: ICommandHndlrDataForContent) {
    this.CommandData = commandData;
    this.Logger = commandData.Logger;
    this.TopLevelDoc = commandData.TopLevelDoc;
    this.PromiseBasic = commandData.PromiseBasic;
  }
}
