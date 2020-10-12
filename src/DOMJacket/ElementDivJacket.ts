import { ICommonCore } from "../Shared/scripts/Interfaces/Agents/ICommonCore";
import { ElementJacketBase } from "./ElementJacketBase";

export class ElementDivJacket extends ElementJacketBase<HTMLDivElement> {
    constructor(commonCore: ICommonCore, htmlElement: HTMLDivElement) {
        super(commonCore, htmlElement);
    }
}
