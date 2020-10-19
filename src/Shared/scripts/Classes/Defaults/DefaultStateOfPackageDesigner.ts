import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { IStateOfPackageDesigner } from "../../Interfaces/StateOf/IStateOfPackageDesigner";

export class DefaultStateOfPackageDesigner implements IStateOfPackageDesigner {
  DisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.PackageDesigner];
  Disciminator = ScProxyDisciminator.PackageDesigner;
  StatusText: '';
}