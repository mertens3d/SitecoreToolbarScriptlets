import { IDataOneDoc } from "./IDataOneDoc";
import { Guid } from "../Helpers/Guid";

export interface IDataOneIframe {
  Index: number,
  IframeElem: HTMLIFrameElement,
  ContentDoc: IDataOneDoc,
  Id: Guid,
  Zindex: number,
  Nickname:string ,
}