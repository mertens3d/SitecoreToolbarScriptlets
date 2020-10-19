import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IStateLessScFrameProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/StateLess/IStateLessFrameProxy";
import { InstallerBuildPackageDocProxy } from "../StateLessDocProxies/InstallerBuildPackageDocProxy";
import { _baseStatelessFrameProxyOfType } from "./_baseStatelessFrameProxyOfType";

export class InstallerBuildPackageFrameProxy extends _baseStatelessFrameProxyOfType<InstallerBuildPackageDocProxy> implements IStateLessScFrameProxy {
  ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.InstallerBuildPackageFrameProxy;
  ScProxyDisciminatorFriendly: any;
  FrameSelectorOnHost: string;

  async OpenFile(fileName: string): Promise<void> {
    //todo - handle case where filename no longer exists
    try {
      if (this.HostedStatelessDocProxy) {
        await this.HostedStatelessDocProxy.OpenFile(fileName)
          .catch((err) => this.ErrorHand.HandleFatalError(this.OpenFile.name, err));
      }
    }
    catch (err) {
      this.ErrorHand.HandleFatalError([InstallerBuildPackageFrameProxy.name, this.OpenFile.name], err);
    }
  }
}