import { StateFullProxyDisciminator } from "../../Enums/4000 - StateFullProxyDisciminator";
import { IStateOfPackageDesigner } from "../../Interfaces/Data/States/IStateOfPackageDesigner";

export class DefaultStateOfPackageDesigner implements IStateOfPackageDesigner {
  StatefullDisciminatorFriendly = StateFullProxyDisciminator[StateFullProxyDisciminator.PackageDesigner];
  StatefullDisciminator = StateFullProxyDisciminator.PackageDesigner;
}