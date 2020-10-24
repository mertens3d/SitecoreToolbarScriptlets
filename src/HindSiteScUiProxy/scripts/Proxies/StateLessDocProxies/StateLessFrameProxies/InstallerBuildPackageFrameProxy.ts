import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IScFrameProxy } from "../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullFrameProxy";
import { IStateOf_ } from "../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { BaseFrameProxy } from "../../Desktop/DesktopProxy/FrameProxies/BaseFrameProxy";
import { InstallerBuildPackageDocProxy } from "../StateLessDocProxies/InstallerBuildPackageDocProxy";

export class InstallerBuildPackageFrameProxy extends BaseFrameProxy<IStateOf_> implements IScFrameProxy {
  readonly ScProxyDisciminator = ScProxyDisciminator.InstallerBuildPackageFrameProxy;
  readonly ScProxyDisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.InstallerBuildPackageFrameProxy];

  FrameSelectorOnHost: string;

  async OpenFile(fileName: string): Promise<void> {
    //todo - handle case where filename no longer exists
    try {
      let InstallerBuildPackageDocProxy: InstallerBuildPackageDocProxy = <InstallerBuildPackageDocProxy> this.GetHostedByDisciminator(ScProxyDisciminator.InstallerBuildPackageDocProxy);

      if (InstallerBuildPackageDocProxy) {
        await InstallerBuildPackageDocProxy.OpenFile(fileName)
          .catch((err: any) => this.ErrorHand.HandleFatalError(this.OpenFile.name, err));
      }
    }
    catch (err: any) {
      this.ErrorHand.HandleFatalError([InstallerBuildPackageFrameProxy.name, this.OpenFile.name], err);
    }
  }
}