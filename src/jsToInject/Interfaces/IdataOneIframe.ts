import { IDataOneDoc } from '../Interfaces/IDataOneDoc';

export interface IDataOneIframe {
  Index: number,
  IframeElem: HTMLIFrameElement,
  ContentDoc: IDataOneDoc,
  Id: IGuid,
  Zindex: number,
  Nickname:string ,
}