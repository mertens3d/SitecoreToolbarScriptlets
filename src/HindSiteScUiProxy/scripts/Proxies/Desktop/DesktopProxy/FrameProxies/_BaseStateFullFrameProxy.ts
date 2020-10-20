import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { FrameElemJacket } from "../../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { IStateFullFrameProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullFrameProxy";

export abstract class _BaseStateFullFrameProxy<T> extends _APICoreBase implements IStateFullFrameProxy {
  FrameJacket: FrameElemJacket;
  abstract GetState(): Promise<T>;
  abstract SetState(state: T);
  abstract readonly ScProxyDisciminator: ScProxyDisciminator;
  abstract readonly ScProxyDisciminatorFriendly;
  abstract InstantiateAsyncMembers();
  abstract TriggerInboundEventsAsync(): void;
  abstract WireEvents();

  constructor(apiCore: IAPICore, frameJacket: FrameElemJacket) {
    super(apiCore);

    this.FrameJacket = frameJacket;
  }
    WaitForCompleteNABFrameProxyOrReject() {
        //empty
    }
    GetDocumentJacket() {
        //empty
    }
}