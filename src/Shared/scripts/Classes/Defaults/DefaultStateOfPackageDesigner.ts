import { ScProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";
import { IStateOfPackageDesigner } from "../../Interfaces/StateOf/IStateOfPackageDesigner";

export class DefaultStateOfPackageDesigner implements IStateOfPackageDesigner {
  DisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.PackageDesigner];
  Disciminator = ScProxyDisciminator.PackageDesigner;
  StatusText: '';
}