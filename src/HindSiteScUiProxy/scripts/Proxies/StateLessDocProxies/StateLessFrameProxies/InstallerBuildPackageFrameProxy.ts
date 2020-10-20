import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IStateLessScFrameProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/StateLess/IStateLessFrameProxy";
import { InstallerBuildPackageDocProxy } from "../StateLessDocProxies/InstallerBuildPackageDocProxy";
import { _baseStatelessFrameProxyOfType } from "./_baseStatelessFrameProxyOfType";

export class InstallerBuildPackageFrameProxy extends _baseStatelessFrameProxyOfType<InstallerBuildPackageDocProxy> implements IStateLessScFrameProxy {
  ScProxyDisciminator: ScProxyDisciminator = ScProxyDisciminator.InstallerBuildPackageFrameProxy;
  ScProxyDisciminatorFriendly:string;
  FrameSelectorOnHost: string;

  async OpenFile(fileName: string): Promise<void> {
    //todo - handle case where filename no longer exists
    try {
      if (this.HostedDocProxy) {
        await this.HostedDocProxy.OpenFile(fileName)
          .catch((err: any) => this.ErrorHand.HandleFatalError(this.OpenFile.name, err));
      }
    }
    catch (err: any) {
      this.ErrorHand.HandleFatalError([InstallerBuildPackageFrameProxy.name, this.OpenFile.name], err);
    }
  }
}