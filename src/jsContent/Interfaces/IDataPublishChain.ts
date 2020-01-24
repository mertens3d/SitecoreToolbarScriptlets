import { IDataOneDoc } from '../Interfaces/IDataOneDoc';
import { IDataOneIframe } from './IDataOneIframe';

export interface IDataPublishChain {
  TopLevelDoc: IDataOneDoc,
  Iframe0Blue: IDataOneIframe;
  docToPublish: IDataOneDoc
  jqIframe: IDataOneIframe;
  messageDialogIframeRed: IDataOneIframe;
}