import { ICommonCore } from "../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { GenericElemJacket } from "./GenericElemJacket";

export abstract class ElementJacketOfType<T extends HTMLElement> extends GenericElemJacket {
    public NativeElement: T;

  constructor(commonCore: ICommonCore, htmlElement: T) {
    super(commonCore, htmlElement);
        this.NodeTagName = htmlElement.tagName;
    }
}
