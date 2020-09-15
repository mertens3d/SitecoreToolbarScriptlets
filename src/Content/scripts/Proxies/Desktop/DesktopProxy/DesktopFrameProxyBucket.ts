import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { CEFrameProxy } from "../../CEFrameProxy";

export class CEFrameProxyBucket extends LoggableBase {
  private FrameBucketUnits: CEFrameProxy[] = [];

  constructor(logger: ILoggerAgent) {
    super(logger);
  }

  AddToCEFrameProxyBucket(ceframeProxy: CEFrameProxy): boolean {
    let toReturn: boolean = false;
    if (!this.BucketHasSameItem(ceframeProxy)) {
      this.FrameBucketUnits.push(ceframeProxy);
      toReturn = true;
    }
    return (toReturn);
  }

  private BucketHasSameItem(ceframeBucketItem: CEFrameProxy): boolean {
    let toReturn: boolean = true;

    //todo - I think we'll need to check against the iframe id
    if (this.FrameBucketUnits.indexOf(ceframeBucketItem) < 0) {
      toReturn = false;
    } else {
      toReturn = true;
      this.Logger.WarningAndContinue(this.BucketHasSameItem.name, 'Proxy already exists in bucket');
    }

    return toReturn;
  }
}