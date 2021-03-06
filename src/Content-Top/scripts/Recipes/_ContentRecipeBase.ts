﻿import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";

export abstract class _ContentRecipeBase extends _FrontBase {
  CommandParams: ICommandParams;

  Friendly: string;
  Dependancies: ICommandDependancies;

  constructor(hindeCore: IHindeCore, commandParams: ICommandParams, dependancies: ICommandDependancies, friendly: string) {
    super(hindeCore)
    if (!StaticHelpers.IsNullOrUndefined(commandParams)) {
      this.Friendly = friendly;
      this.CommandParams = commandParams;
      this.Dependancies = dependancies;
    } else {
      this.ErrorHand.ErrorAndThrow(_ContentRecipeBase.name, 'null check: ' + this.Friendly);
    }
  }
}