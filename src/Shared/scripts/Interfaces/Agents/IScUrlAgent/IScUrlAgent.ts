import { IUrlAgent } from "../../IUrlAgent";
import { scWindowType } from "../../../Enums/scWindowType";

export interface IScUrlAgent extends IUrlAgent {
    GetScWindowType(): scWindowType;
    InitScUrlAgent();
}
