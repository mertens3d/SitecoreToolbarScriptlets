import { ScProxyDisciminator } from "../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IDiscriminatorMappingPair } from "../../../Shared/scripts/Interfaces/IDiscriminatorMappingPair";

export class ScWindowTypeToScDocDiscriminatorMapping {



}

export class ScFrameToScDocDiscriminatorMapping {
  static Mappings: IDiscriminatorMappingPair[] = [
    {
      FrameProxyDiscriminator: ScProxyDisciminator.FrameProxy,
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

    {
      FrameProxyDiscriminator: ScProxyDisciminator.FrameProxy,
      DocProxyDisciminator: ScProxyDisciminator.ContentEditor,
    },
  ];
}