import { PopUpManagerBase } from "../Managers/PopUpManagerBase";
import { PopUpHub } from "../Managers/PopUpHub";
import { IDataBucketRestoreDesktop } from "../../../Shared/scripts/Interfaces/IDataBucketRestoreDesktop";
import { scWindowType } from "../../../Shared/scripts/Enums/scWindowType";
import { IDataBrowserTab } from "../../../Shared/scripts/Interfaces/IDataBrowserWindow";
import { SharedConst } from "../../../Shared/scripts/SharedConst";
import { AbsoluteUrl } from "../../../Shared/scripts/Interfaces/AbsoluteUrl";
import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IallAgents";

export class PromiseChainRestoreDtPopUp extends PopUpManagerBase {
  constructor(hub: PopUpHub, allAgents: IAllAgents) {
    super(hub, allAgents)
    this.AllAgents.Logger.FuncStart(PromiseChainRestoreDtPopUp.name);
    this.AllAgents.Logger.FuncEnd(PromiseChainRestoreDtPopUp.name);
  }

  //async GoToAndWaitForDesktopPage(promiseBucket: IDataBucketRestoreDesktop) {
  //  return new Promise(async (resolve, reject) => {
  //    promiseBucket.UrlParts = this.AllAgents.HelperAgent.UrlHelp.SetFilePathFromWindowType(promiseBucket.UrlParts, scWindowType.Desktop );

  //    let absUrl: AbsoluteUrl = this.AllAgents.HelperAgent.UrlHelp.BuildFullUrlFromParts(promiseBucket.UrlParts)

  //    await this.AllAgents.HelperAgent.PromiseHelp.TabChainSetHrefWaitForComplete(absUrl, this.TabMan().CurrentTabData)
  //      .then((promiseBucket) => resolve(promiseBucket))
  //      .catch((err) => reject(err))

  //    //await this.AllAgents.HelperAgent.PromiseHelp.SetHrefAndWaitForReadyStateComplete(this.Const().UrlSuffix.Desktop, promiseBucket.targetWindow, scWindowType.Desktop)
  //    //  .then((promiseBucket) => resolve(promiseBucket))
  //    //  .catch((err) => reject(err))
  //  });
  //}
}