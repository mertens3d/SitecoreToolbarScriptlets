import { TypeDiscriminator } from "../../../Enums/70 - TypeDiscriminator";

export interface ISolicitor {
  ExecuteTest():Promise<any>;
  TypeDiscriminator: TypeDiscriminator;
}
