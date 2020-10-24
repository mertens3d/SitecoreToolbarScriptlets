import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IJacketOfType } from "../../../../../../Shared/scripts/IJacketOfType";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IBaseScProxy } from "../../../../../../Shared/scripts/Interfaces/ScProxies/IBaseScProxy";
import { IScElemProxy } from "../../../../../../Shared/scripts/Interfaces/ScProxies/IStateFullElemProxy";
import { IStateOf_ } from "../../../../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { _BaseScProxy } from "../../../StateFullDocProxies/_BaseScProxy";

export abstract class _BaseElemProxy<T extends IStateOf_> extends _BaseScProxy implements IScElemProxy {
  readonly abstract ScProxyDisciminator: ScProxyDisciminator;
  readonly abstract ScProxyDisciminatorFriendly: string;
  readonly HostedProxies: IBaseScProxy[] = [];

  protected ContainerElemJacket: IJacketOfType;

  constructor(apiCore: IAPICore, containerElemJacket: IJacketOfType) {
    super(apiCore);
    this.ContainerElemJacket = containerElemJacket;
  }

  GetZindexAsInt(): number {
    let toReturn: number = this.ContainerElemJacket.ZindexAsInt();
    this.Logger.LogVal(this.GetZindexAsInt.name, toReturn.toString());
    return toReturn;
  }
}