import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IJacketOfType } from "../../../../../../Shared/scripts/IJacketOfType";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IBaseScProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/IBaseScProxy";
import { IStateFullElemProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullElemProxy";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { _BaseScProxy } from "../../../StateFullDocProxies/_BaseScDocProxy";

export abstract class _BaseStateFullElemProxy<T> extends _BaseScProxy implements IStateFullElemProxy {
  readonly abstract ScProxyDisciminator: ScProxyDisciminator;
  readonly abstract ScProxyDisciminatorFriendly: string;
  readonly HostedProxies: IBaseScProxy[] = [];

  protected ContainerElemJacket: IJacketOfType;

  abstract GetState(): Promise<T>;
  abstract SetState(state: T): Promise<any>;

  constructor(apiCore: IAPICore, containerElemJacket: IJacketOfType) {
    super(apiCore, containerElemJacket);
    this.ContainerElemJacket = containerElemJacket;
  }

  async InstantiateAsyncMembers(): Promise<void> {
    return this.InstantiateAsyncMembersOnHostedProxies();
  }
  WireEvents(): void {
  }
}