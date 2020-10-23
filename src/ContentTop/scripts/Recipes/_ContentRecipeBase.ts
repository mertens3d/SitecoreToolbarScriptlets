import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ICommandData } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";

export abstract class _ContentRecipeBase extends _FrontBase {
  CommandParams: ICommandData;

  Friendly: string;
  Dependancies: ICommandDependancies;

  constructor(hindeCore: IHindeCore, commandParams: ICommandData, dependancies: ICommandDependancies, friendly: string) {
    super(hindeCore)
    if (!StaticHelpers.IsNullOrUndefined(commandParams)) {
      this.Friendly = friendly;
      this.CommandParams = commandParams;
      this.Dependancies = dependancies;
    } else {
      this.ErrorHand.HandleFatalError(_ContentRecipeBase.name, 'null check: ' + this.Friendly);
    }
  }
}