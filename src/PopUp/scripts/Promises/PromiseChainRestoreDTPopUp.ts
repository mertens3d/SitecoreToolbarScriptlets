import { IAllAgents } from "../../../Shared/scripts/Interfaces/Agents/IallAgents";
import { PopUpHub } from "../Managers/PopUpHub";
import { PopUpManagerBase } from "../Managers/PopUpManagerBase";

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