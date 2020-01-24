import { IDataOneDoc } from '../Interfaces/IDataOneDoc';
import { IGuid } from '../../JsShared/Interfaces/IGuid';

export interface IDataOneIframe {
  Index: number,
  IframeElem: HTMLIFrameElement,
  ContentDoc: IDataOneDoc,
  Id: IGuid,
  Zindex: number,
  Nickname:string ,
}