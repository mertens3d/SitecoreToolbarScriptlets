import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";
import { ICommonCore } from "./ICommonCore";

export interface IHindeCore extends ICommonCore {
  readonly TypeDiscriminator: TypeDiscriminator;
}

