import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { DocumentJacket } from "../../../../../../DOMJacket/Document/DocumentJacket";
import { IBaseScDocProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/IBaseScDocProxy";

export abstract class _BaseScDocProxy extends _APICoreBase implements IBaseScDocProxy {
  abstract readonly ScProxyDisciminator: ScProxyDisciminator;
  abstract readonly ScProxyDisciminatorFriendly;
  abstract InstantiateAsyncMembers();
  abstract TriggerInboundEventsAsync(): void;
  abstract WireEvents();
  protected readonly DocumentJacket: DocumentJacket;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore);
    this.DocumentJacket = documentJacket;
  }

  async OnFocus(): Promise<any> {
    // empty by default
  }
}