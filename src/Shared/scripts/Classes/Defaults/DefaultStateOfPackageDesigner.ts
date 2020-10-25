import { ScProxyDisciminator } from "../../Enums/40 - ScProxyDisciminator";
import { IStateOfPackageDesigner } from "../../Interfaces/StateOf/IStateOfPackageDesigner";
import { IStateOf_ } from "../../Interfaces/StateOf/IStateOf_";

export class DefaultStateOfPackageDesigner implements IStateOfPackageDesigner {
  DisciminatorFriendly = ScProxyDisciminator[ScProxyDisciminator.PackageDesigner];
  Disciminator = ScProxyDisciminator.PackageDesigner;
  StatusText: '';
  Children: IStateOf_[] = [];
}