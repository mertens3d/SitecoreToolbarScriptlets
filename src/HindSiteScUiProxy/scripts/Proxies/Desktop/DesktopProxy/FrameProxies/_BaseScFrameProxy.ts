import { DocumentJacket } from "../../../../../../DOMJacket/Document/DocumentJacket";
import { RecipeBasics } from "../../../../RecipeBasics";
import { ScDocProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { DocReadyState, ReadyStateNAB } from "../../../../../../Shared/scripts/Classes/ReadyState";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullDocProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateFullProxy";
import { _BaseStateFullDocProxy, _BaseStateFullFrameProxy } from "./_StateProxy";
import { FrameElemJacket } from "../../../../../../DOMJacket/Elements/FrameElemJacket";

export abstract class _BaseScFrameProxy<T> extends _BaseStateFullFrameProxy<T> implements IStateFullDocProxy {
  public readonly FrameJacket: FrameElemJacket = null;
  abstract readonly ScDocProxyDisciminatorFriendly;
  Id: string = null;
  abstract readonly ScDocProxyDisciminator: ScDocProxyDisciminator;
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

      await this.FrameJacket.WaitForCompleteNABHtmlIframeElement(this.Friendly)
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