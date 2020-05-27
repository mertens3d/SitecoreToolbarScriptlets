import { PopUpManagerBase } from "../Managers/PopUpManagerBase";
import { PopUpHub } from "../Managers/PopUpHub";
import { IDataBucketRestoreDesktop } from "../../../Shared/scripts/Interfaces/IDataBucketRestoreDesktop";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";
import { SharedConst } from "../../../Shared/scripts/SharedConst";
import { AbsoluteUrl } from "../../../Shared/scripts/Interfaces/AbsoluteUrl";
import { IAllPopUpAgents } from "../../../Shared/scripts/Interfaces/Agents/IAllPopUpAgents";

export class PromiseChainRestoreDtPopUp extends PopUpManagerBase {
  constructor(hub: PopUpHub, allPopUpAgents: IAllPopUpAgents) {
    super(hub, allPopUpAgents)
    this.AllPopUpAgents.Logger.FuncStart(PromiseChainRestoreDtPopUp.name);
    this.AllPopUpAgents.Logger.FuncEnd(PromiseChainRestoreDtPopUp.name);
  }

  //async GoToAndWaitForDesktopPage(promiseBucket: IDataBucketRestoreDesktop) {
  //  return new Promise(async (resolve, reject) => {
  //    promiseBucket.UrlParts = this.Helpers().UrlHelp.SetFilePathFromWindowType(promiseBucket.UrlParts, scWindowType.Desktop );

  //    let absUrl: AbsoluteUrl = this.Helpers().UrlHelp.BuildFullUrlFromParts(promiseBucket.UrlParts)

  //    await this.Helpers().PromiseHelp.TabChainSetHrefWaitForComplete(absUrl, this.TabMan().CurrentTabData)
  //      .then((promiseBucket) => resolve(promiseBucket))
  //      .catch((err) => reject(err))

  //    //await this.Helpers().PromiseHelp.SetHrefAndWaitForReadyStateComplete(this.Const().UrlSuffix.Desktop, promiseBucket.targetWindow, scWindowType.Desktop)
  //    //  .then((promiseBucket) => resolve(promiseBucket))
  //    //  .catch((err) => reject(err))
  //  });
  //}
}