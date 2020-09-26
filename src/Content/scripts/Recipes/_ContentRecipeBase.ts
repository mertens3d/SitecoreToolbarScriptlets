import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { LoggableBase } from "../../../Shared/scripts/LoggableBase";

export abstract class _ContentRecipeBase extends LoggableBase {
  CommandParams: ICommandParams;

  Friendly: string;
  Dependancies: ICommandDependancies;

  constructor(logger: ILoggerAgent, commandParams: ICommandParams, dependancies: ICommandDependancies, friendly: string) {
    super(logger)
    if (!StaticHelpers.IsNullOrUndefined(commandParams)) {
      this.Friendly = friendly;
      this.CommandParams = commandParams;
      this.Dependancies = dependancies;
    } else {
      this.Logger.ErrorAndThrow(_ContentRecipeBase.name, 'null check: ' + this.Friendly);
    }
  }
}