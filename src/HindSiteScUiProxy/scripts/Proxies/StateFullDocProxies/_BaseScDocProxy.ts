﻿import { DocumentJacket } from "../../../../DOMJacket/Document/DocumentJacket";
import { ScProxyDisciminator } from "../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IBaseScDocProxy } from "../../../../Shared/scripts/Interfaces/Proxies/IBaseScDocProxy";
import { IStateFullElemProxy } from "../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullElemProxy";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { ScDocProxyWatcherForFrames } from "./ScDocProxyWatcherForFrames";

export abstract class _BaseScDocProxy extends _APICoreBase  {
  abstract readonly ScProxyDisciminator: ScProxyDisciminator;
  abstract readonly ScProxyDisciminatorFriendly;
  protected HostedElemProxies: IStateFullElemProxy[] = [];
  private WatcherForFrames: ScDocProxyWatcherForFrames;
  protected readonly DocumentJacket: DocumentJacket;

  abstract WireEvents();
  abstract TriggerInboundEventsAsync(): void;
  abstract InstantiateAsyncMembers();
  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore);
    this.DocumentJacket = documentJacket;
  }

  async OnFocus(): Promise<any> {
    // empty by default
  }

  public async EnableWatcherForFrames(): Promise<void> {
    try {
      this.WatcherForFrames = new ScDocProxyWatcherForFrames(this.ApiCore, this.DocumentJacket, this.ScProxyDisciminatorFriendly);
      this.WatcherForFrames.EnableWatcherForFrames()
        .catch((err) => this.ErrorHand.HandleFatalError([_BaseScDocProxy.name, this.EnableWatcherForFrames, this.ScProxyDisciminatorFriendly], err));
    } catch (err) {
      this.ErrorHand.HandleFatalError([_BaseScDocProxy.name, this.EnableWatcherForFrames, this.ScProxyDisciminatorFriendly], err);
    }
  }
}