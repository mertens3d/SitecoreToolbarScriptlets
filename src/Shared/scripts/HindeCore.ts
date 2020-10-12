import { IHindeCore } from "./Interfaces/Agents/IHindeCore";
import { TypeDiscriminator } from "./Enums/70 - TypeDiscriminator";
import { CommonCore } from "./_CommonCoreBase";
import { ICommonCore } from "./Interfaces/Agents/ICommonCore";

export class HindeCore extends CommonCore implements IHindeCore {
    TypeDiscriminator: TypeDiscriminator;

  constructor(commonCore: ICommonCore) {
    super();
    this.ErrorHand = commonCore.ErrorHand;
    this.Logger = commonCore.Logger;
    this.TaskMonitor = commonCore.TaskMonitor;

  }

}
