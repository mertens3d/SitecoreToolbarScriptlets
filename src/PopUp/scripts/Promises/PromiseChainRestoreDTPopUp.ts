import { PopUpManagerBase } from "../Managers/PopUpManagerBase";
import { PopUpHub } from "../Managers/PopUpHub";
import { IDataBucketRestoreDesktop } from "../../../Shared/scripts/Interfaces/IDataBucketRestoreDesktop";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";

export class PromiseChainRestoreDtPopUp extends PopUpManagerBase {
  constructor(hub: PopUpHub) {
    hub.debug.FuncStart(PromiseChainRestoreDtPopUp.name);
    super(hub)
    hub.debug.FuncEnd(PromiseChainRestoreDtPopUp.name);
  }

  async GoToAndWaitForDesktopPage(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise(async (resolve, reject) => {
      await this.Helpers().PromiseHelp.SetHrefAndWaitForReadyStateComplete(this.Const().UrlSuffix.Desktop, promiseBucket.targetWindow, scWindowType.Desktop)
        .then((promiseBucket) => resolve(promiseBucket))
        .catch((err) => reject(err))
    });
  }
}