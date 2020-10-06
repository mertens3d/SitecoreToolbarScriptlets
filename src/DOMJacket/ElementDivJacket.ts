import { IHindeCore } from "../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ElementJacketBase } from "./ElementJacketBase";

export class ElementDivJacket extends ElementJacketBase<HTMLDivElement> {
    constructor(hindeCore: IHindeCore, htmlElement: HTMLDivElement) {
        super(hindeCore, htmlElement);
    }
}
