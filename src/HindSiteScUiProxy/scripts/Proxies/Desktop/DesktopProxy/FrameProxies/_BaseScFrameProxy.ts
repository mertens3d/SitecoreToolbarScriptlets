﻿import { DocumentJacket } from "../../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { FrameElemJacket } from "../../../../../../DOMJacket/scripts/Elements/FrameElemJacket";
import { DocReadyState } from "../../../../../../Shared/scripts/Enums/ReadyState";
import { ReadyStateNAB } from "../../../../../../Shared/scripts/Classes/ReadyStateNAB";
import { IStateFullFrameProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullFrameProxy";
import { _BaseStateFullFrameProxy } from "./_BaseStateFullFrameProxy";
import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";

export abstract class _BaseScFrameProxy<T> extends _BaseStateFullFrameProxy<T> implements IStateFullFrameProxy {
  abstract Friendly: string;
  abstract readonly Disciminator: ScProxyDisciminator;
  abstract readonly DisciminatorFriendly: string;
  Id: string = null;
  public readonly FrameJacket: FrameElemJacket = null;

  constructor(apiCore: IAPICore, frameJacket: FrameElemJacket) {
    super(apiCore, frameJacket);

    this.ErrorHand.ThrowIfNullOrUndefined(_BaseScFrameProxy.name, [frameJacket]);
    this.FrameJacket = frameJacket;
    this.Id = 'base_' + this.FrameJacket.GetNativeIframeId();
  }

  abstract InstantiateAsyncMembers(): Promise<void>;

  abstract WireEvents(): Promise<void>;

  GetZindexAsInt(): number {
    let toReturn: number = this.FrameJacket.ZindexAsInt();
    this.Logger.LogVal(this.GetZindexAsInt.name, toReturn.toString());
    return toReturn;
  }

  GetDocumentJacket(): DocumentJacket {
    return this.FrameJacket.DocumentJacket;
  }

  public async WaitForCompleteNABFrameProxyOrReject(): Promise<DocReadyState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForCompleteNABFrameProxyOrReject.name, this.Friendly);

      await this.FrameJacket.WaitForCompleteNABFrameElement(this.Friendly)
        .then((result: ReadyStateNAB) => {
          if (result.IsCompleteNAB()) {
            resolve(result.DocumentReadyState());
          }
          else {
            reject(result.DocumentReadtStateFriendly);
          }
        })
        .catch((err: any) => reject(this.WaitForCompleteNABFrameProxyOrReject.name + ' | ' + err));

      this.Logger.FuncEnd(this.WaitForCompleteNABFrameProxyOrReject.name, this.Friendly);
    });
  }
}