import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IBaseScProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/IBaseScProxy";
import { IStateFullElemProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullElemProxy";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { _BaseScProxy } from "../../../StateFullDocProxies/_BaseScDocProxy";


export abstract class _BaseStateLessElemProxy extends _BaseScProxy implements IStateFullElemProxy {
  readonly abstract ScProxyDisciminator: ScProxyDisciminator;
  readonly abstract ScProxyDisciminatorFriendly: string;
  readonly HostedProxies: IBaseScProxy[] = [];


  async abstract InstantiateAsyncMembers(): Promise<void>;


  async WireEvents(): Promise<void> {
  }
}
