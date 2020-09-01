import { IDataOneDoc } from "./IDataOneDoc";
import { GuidData } from "../Helpers/GuidData";

export interface IDataOneIframe {
  Index: number,
  IframeElem: HTMLIFrameElement,
  ContentDoc: IDataOneDoc,
  Id: GuidData,
  Zindex: number,
  Nickname:string ,
}