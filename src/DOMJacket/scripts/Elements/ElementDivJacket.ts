import { ICommonCore } from "../../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { ElementJacketOfType } from "./ElementJacketBaseOfType";

export class ElementDivJacket extends ElementJacketOfType<HTMLDivElement> {
    constructor(commonCore: ICommonCore, htmlElement: HTMLDivElement) {
        super(commonCore, htmlElement);
    }
}
