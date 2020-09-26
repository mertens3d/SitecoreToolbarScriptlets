import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { DTFrameProxy } from "./FrameProxies/DTFrameProxy";

export class DTFrameProxyBucket extends LoggableBase {
  private FrameBucketUnits: DTFrameProxy[] = [];

  constructor(logger: ILoggerAgent) {
    super(logger);
  }

  AddToDTFrameProxyBucket(dtframeProxy: DTFrameProxy): boolean {
    let toReturn: boolean = false;
    if (!this.BucketHasSameItem(dtframeProxy)) {
      this.FrameBucketUnits.push(dtframeProxy);
      toReturn = true;
    }
    return (toReturn);
  }

  private BucketHasSameItem(dtFrameBucketItem: DTFrameProxy): boolean {
    let toReturn: boolean = true;

    //todo - I think we'll need to check against the iframe id
    if (this.FrameBucketUnits.indexOf(dtFrameBucketItem) < 0) {
      toReturn = false;
    } else {
      toReturn = true;
      this.Logger.WarningAndContinue(this.BucketHasSameItem.name, 'Proxy already exists in bucket');
    }

    return toReturn;
  }
}