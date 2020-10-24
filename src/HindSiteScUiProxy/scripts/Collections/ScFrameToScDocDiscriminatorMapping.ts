import { ScProxyDisciminator } from "../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IDiscriminatorMappingPair } from "../../../Shared/scripts/Interfaces/IDiscriminatorMappingPair";

export class ScFrameToScDocDiscriminatorMapping {
  static Mappings: IDiscriminatorMappingPair[] = [
    {
      FrameProxyDiscriminator: ScProxyDisciminator.GenericStateLessFrameProxy,
      DocProxyDisciminator: ScProxyDisciminator.ScDocumentProxy,
    },
    {
      FrameProxyDiscriminator: ScProxyDisciminator.InstallerBrowseFrameProxy,
      DocProxyDisciminator: ScProxyDisciminator.InstallerBrowseDocProxy,
    },
    {
      FrameProxyDiscriminator: ScProxyDisciminator.InstallerBuildPackageFrameProxy,
      DocProxyDisciminator: ScProxyDisciminator.InstallerBuildPackageDocProxy,
    },
    {
      FrameProxyDiscriminator: ScProxyDisciminator.JqueryModalDialogsFrameProxy,
      DocProxyDisciminator: ScProxyDisciminator.JqueryModalDialogsDocProxy,
    },
  ];
}