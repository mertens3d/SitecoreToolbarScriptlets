import { ICommandHndlrDataForContent } from "../../../../../Shared/scripts/Interfaces/ICommandHndlrDataForContent";

export class RecipeBase {
  CommandData: ICommandHndlrDataForContent;
  constructor(commandData: ICommandHndlrDataForContent) {
    this.CommandData = commandData;
  }

}
