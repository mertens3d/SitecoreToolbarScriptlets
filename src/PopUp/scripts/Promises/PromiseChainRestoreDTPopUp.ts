import { PopUpManagerBase } from "../Managers/PopUpManagerBase";
import { PopUpHub } from "../Managers/PopUpHub";
import { IDataBucketRestoreDesktop } from "../../../Shared/scripts/Interfaces/IDataBucketRestoreDesktop";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";
import { SharedConst } from "../../../Shared/scripts/SharedConst";

export class PromiseChainRestoreDtPopUp extends PopUpManagerBase {
  constructor(hub: PopUpHub) {
    hub.Log.FuncStart(PromiseChainRestoreDtPopUp.name);
    super(hub)
    hub.Log.FuncEnd(PromiseChainRestoreDtPopUp.name);
  }

  async GoToAndWaitForDesktopPage(promiseBucket: IDataBucketRestoreDesktop) {
    return new Promise(async (resolve, reject) => {

      await this.Helpers().PromiseHelp.TabChainSetHrefWaitForComplete(SharedConst.SharedConst.UrlSuffix.Desktop, this.TabMan().CurrentTabData)
        .then((promiseBucket) => resolve(promiseBucket))
        .catch((err) => reject(err))


      //await this.Helpers().PromiseHelp.SetHrefAndWaitForReadyStateComplete(this.Const().UrlSuffix.Desktop, promiseBucket.targetWindow, scWindowType.Desktop)
      //  .then((promiseBucket) => resolve(promiseBucket))
      //  .catch((err) => reject(err))
    });
  }
}