import { IUrlAgent } from "../../IUrlAgent";

export interface IScUrlAgent extends IUrlAgent {
    GetScWindowType(): import("../../../Enums/scWindowType").scWindowType;
    InitScUrlAgent();
}
