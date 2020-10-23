import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { GenericElemJacket } from "../../../../DOMJacket/scripts/Elements/GenericElemJacket";
import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IJacketOfType } from "../../../../Shared/scripts/IJacketOfType";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IBaseScProxy } from "../../../../Shared/scripts/Interfaces/Proxies/IBaseScProxy";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { ScDocProxyWatcherForFrames } from "./ScDocProxyWatcherForFrames";

export abstract class _BaseScProxy extends _APICoreBase implements IBaseScProxy {
  abstract readonly ScProxyDisciminator: ScProxyDisciminator;
  abstract readonly ScProxyDisciminatorFriendly: string;
  readonly HostedProxies: IBaseScProxy[] = [];
  private WatcherForFrames: ScDocProxyWatcherForFrames;
  protected readonly DocumentJacket: DocumentJacket;
  readonly ContainerJacket: GenericElemJacket;

  abstract WireEvents(): void;
  abstract InstantiateAsyncMembers(): Promise<void>;

  constructor(apiCore: IAPICore, container: DocumentJacket | IJacketOfType) {
    super(apiCore);

    if (container instanceof DocumentJacket) {
      this.DocumentJacket = <DocumentJacket>container;
    } else if (container instanceof GenericElemJacket) {
      this.ContainerJacket = <GenericElemJacket>container;
    }
  }

  TriggerInboundEventsAsync(): void {
    this.TriggerInboundEventsAsync();
  }

  protected TriggerInboundEventsAsyncOnHosted() {
    if (this.HostedProxies) {
      this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => hostedProxy.TriggerInboundEventsAsync());
    }
  }

  async OnFocus(): Promise<any> {
    // empty by default
  }

  async GetState(): Promise<any> {

  }

  async SetState(state: any): Promise<any> {
  }

  protected async InstantiateAsyncMembersOnHostedProxies(): Promise<void> {
    if (this.HostedProxies) {
      let promAr: Promise<void>[] = [];

      this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => promAr.push(hostedProxy.InstantiateAsyncMembers()));

      await Promise.all(promAr)
        .catch((err) => this.ErrorHand.HandleFatalError(this.ScProxyDisciminatorFriendly, err));
    }
  }

  protected WireEventsOnHostedProxies() {
    if (this.HostedProxies) {
      this.HostedProxies.forEach((hostedProxy: IBaseScProxy) => hostedProxy.WireEvents());
    }
  }

  public async EnableWatcherForFrames(): Promise<void> {
    try {
      this.WatcherForFrames = new ScDocProxyWatcherForFrames(this.ApiCore, this.DocumentJacket, this.ScProxyDisciminatorFriendly);
      await this.WatcherForFrames.EnableWatcherForFrames()
        .catch((err: any) => this.ErrorHand.HandleFatalError([_BaseScProxy.name, this.EnableWatcherForFrames.name, this.ScProxyDisciminatorFriendly], err));
    } catch (err: any) {
      this.ErrorHand.HandleFatalError([_BaseScProxy.name, this.EnableWatcherForFrames.name, this.ScProxyDisciminatorFriendly], err);
    }
  }
}