import { IUrlAgent } from "../../IUrlAgent";
import { ScWindowType } from "../../../Enums/scWindowType";

export interface IScUrlAgent extends IUrlAgent {
  GetScWindowType(): ScWindowType;
  InitScUrlAgent(): Promise<void>;
}