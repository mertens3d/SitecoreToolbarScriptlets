//import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
//import { IBaseScProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScProxy";
//import { IScFrameProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
//import { IStateOf_ } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
//import { BaseScFrameProxy } from "../../Desktop/DesktopProxy/FrameProxies/BaseFrameProxy";
//import { InstallerBuildPackageDocProxy } from "../StateLessDocProxies/InstallerBuildPackageDocProxy";

//export class InstallerBuildPackageFrameProxy extends BaseScFrameProxy<IStateOf_> implements IScFrameProxy {
//  readonly ScProxyDisciminator = ScProxyDisciminator.InstallerBuildPackageFrameProxy;
//  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.InstallerBuildPackageFrameProxy];

//  FrameSelectorOnHost: string;

//  async OpenFile(fileName: string): Promise<void> {
//    //todo - handle case where filename no longer exists
//    try {
//      let foundProxies: IBaseScProxy[] = this.GetHostedProxiesStateByDisciminator(ScProxyDisciminator.InstallerBuildPackageDocProxy);

//      let InstallerBuildPackageDocProxy: InstallerBuildPackageDocProxy = null;

//      if (foundProxies.length === 1) {
//        InstallerBuildPackageDocProxy = <InstallerBuildPackageDocProxy>foundProxies[0];
//      } else {
//        this.ErrorHand.HandleFatalError([InstallerBuildPackageFrameProxy.name, this.OpenFile.name], 'More than one hosted proxy found');
//      }

//      if (InstallerBuildPackageDocProxy) {
//        await InstallerBuildPackageDocProxy.OpenFile(fileName)
//          .catch((err: any) => this.ErrorHand.HandleFatalError(this.OpenFile.name, err));
//      }
//    }
//    catch (err: any) {
//      this.ErrorHand.HandleFatalError([InstallerBuildPackageFrameProxy.name, this.OpenFile.name], err);
//    }
//  }
//}