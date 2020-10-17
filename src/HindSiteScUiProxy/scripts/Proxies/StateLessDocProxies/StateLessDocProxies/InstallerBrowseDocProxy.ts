import { ScProxyDisciminator } from "../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IStateLessDocProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/IStateLessDocProxy";
import { _BaseStateLessScDocProxy } from "./_BaseStateLessScDocProxy";


export class InstallerBrowseDocProxy extends _BaseStateLessScDocProxy implements IStateLessDocProxy {
  ScProxyDisciminator: ScProxyDisciminator;
  ScProxyDisciminatorFriendly: any;
  //empty
  async InstantiateAsyncMembers() {
    //empty
  }
  TriggerInboundEventsAsync(): void {
    //empty
  }

}