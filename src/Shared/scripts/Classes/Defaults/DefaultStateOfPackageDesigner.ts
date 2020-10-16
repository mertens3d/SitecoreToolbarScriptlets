import { ScDocProxyDisciminator } from "../../Enums/40 - StateFullProxyDisciminator";
import { IStateOfPackageDesigner } from "../../Interfaces/Data/States/IStateOfPackageDesigner";

export class DefaultStateOfPackageDesigner implements IStateOfPackageDesigner {
  DisciminatorFriendly = ScDocProxyDisciminator[ScDocProxyDisciminator.PackageDesigner];
  Disciminator = ScDocProxyDisciminator.PackageDesigner;
  StatusText: '';
}