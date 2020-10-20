import { ICommonCore } from "../../../Shared/scripts/Interfaces/Agents/ICommonCore";
import { ElementJacketOfType } from "./ElementJacketBaseOfType";

export class GenericElemJacket extends ElementJacketOfType<HTMLElement> {
  constructor(commonCore: ICommonCore, htmlElement: HTMLElement) {
    super(commonCore, htmlElement);
    this.NativeElement = htmlElement;
    this.NodeTagName = htmlElement.tagName;
  }
}