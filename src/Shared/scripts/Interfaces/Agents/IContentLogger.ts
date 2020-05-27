import { IDataOneDoc } from "../IDataOneDoc";
import { IDataOneIframe } from "../IDataOneIframe";
import { IDataBucketRestoreDesktop } from "../IDataBucketRestoreDesktop";
import { ILoggerAgentBase } from "./ILoggerBase";
export interface IContentLoggerAgent extends ILoggerAgentBase {

  DebugIDataOneDoc(associatedDoc: IDataOneDoc);
  PromiseBucketDebug(promiseBucket: IDataBucketRestoreDesktop, name: string);
  DebugDataOneIframe(NewIframe: IDataOneIframe);
  CtorName(name: string);
}