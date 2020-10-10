import { StateFullProxyDisciminator } from "../../Enums/4000 - StateFullProxyDisciminator";
import { IStateOfPackageDesigner } from "../../Interfaces/Data/States/IStateOfPackageDesigner";

export class DefaultStateOfPackageDesigner implements IStateOfPackageDesigner {
  DisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.PackageDesigner];
  Disciminator = StateFullProxyDisciminator.PackageDesigner;
  StatusText: '';
}