import { ScWindowType } from "../../Enums/50 - scWindowType";
import { IUrlJacket } from "../IUrlAgent";

export interface IScWindowTypeResolver {
  GetScWindowType(UrlJacket: IUrlJacket): ScWindowType;
}