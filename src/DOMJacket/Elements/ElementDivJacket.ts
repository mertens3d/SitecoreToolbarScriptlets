import { ElementJacketBase } from "./ElementJacketBase";
import { ICommonCore } from "../../Shared/scripts/Interfaces/Agents/ICommonCore";

export class ElementDivJacket extends ElementJacketBase<HTMLDivElement> {
    constructor(commonCore: ICommonCore, htmlElement: HTMLDivElement) {
        super(commonCore, htmlElement);
    }
}
