import { DocumentJacket } from "../../../../../../DOMJacket/Document/DocumentJacket";
import { FrameElemJacket } from "../../../../../../DOMJacket/Elements/FrameElemJacket";
import { DocReadyState } from "../../../../../../Shared/scripts/Enums/ReadyState";
import { ReadyStateNAB } from "../../../../../../Shared/scripts/Classes/ReadyStateNAB";
import { IStateFullFrameProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullFrameProxy";
import { RecipeBasics } from "../../../../RecipeBasics";
import { _BaseStateFullFrameProxy } from "./_BaseStateFullFrameProxy";
import { ScProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";

export abstract class _BaseScFrameProxy<T> extends _BaseStateFullFrameProxy<T> implements IStateFullFrameProxy {
  public readonly FrameJacket: FrameElemJacket = null;
  abstract readonly ScProxyDisciminatorFriendly;
  Id: string = null;
  abstract readonly ScProxyDisciminator: ScProxyDisciminator;
  abstract Friendly: string;
  RecipeBasics: RecipeBasics;

  constructor(apiCore: IAPICore, frameJacket: FrameElemJacket) {
    super(apiCore, frameJacket);

    this.ErrorHand.ThrowIfNullOrUndefined(_BaseScFrameProxy.name, [frameJacket]);
    this.FrameJacket = frameJacket;
    this.Id = 'base_' + this.FrameJacket.GetNativeIframeId();
  }

  abstract InstantiateAsyncMembers();

  abstract WireEvents();

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
        .catch((err) => reject(this.WaitForCompleteNABFrameProxyOrReject.name + ' | ' + err));

      this.Logger.FuncEnd(this.WaitForCompleteNABFrameProxyOrReject.name, this.Friendly);
    });
  }
}