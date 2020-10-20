import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";
import { FrameElemJacket } from "../../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { IStateFullFrameProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullFrameProxy";
import { DocumentJacket } from "../../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { DocReadyState } from "../../../../../../Shared/scripts/Enums/ReadyState";

export abstract class _BaseStateFullFrameProxy<T> extends _APICoreBase implements IStateFullFrameProxy {
  FrameJacket: FrameElemJacket;
  abstract GetState(): Promise<T>;
  abstract SetState(state: T): Promise<any>;
  abstract readonly ScProxyDisciminator: ScProxyDisciminator;
  abstract readonly ScProxyDisciminatorFriendly:string;
  abstract InstantiateAsyncMembers(): Promise<void>;
  abstract TriggerInboundEventsAsync(): void;
  abstract WireEvents(): Promise<void>;

  constructor(apiCore: IAPICore, frameJacket: FrameElemJacket) {
    super(apiCore);

    this.FrameJacket = frameJacket;
  }
  abstract WaitForCompleteNABFrameProxyOrReject(): Promise<DocReadyState>;

  GetDocumentJacket(): DocumentJacket {
    return null; //todo - why null?
  }
}