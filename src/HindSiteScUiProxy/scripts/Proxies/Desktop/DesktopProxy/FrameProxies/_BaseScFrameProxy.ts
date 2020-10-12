import { DocumentJacket } from "../../../../../../DOMJacket/DocumentJacket";
import { ElementFrameJacket } from "../../../../../../DOMJacket/ElementFrameJacket";
import { RecipeBasics } from "../../../../RecipeBasics";
import { StateFullProxyDisciminator } from "../../../../../../Shared/scripts/Enums/40 - StateFullProxyDisciminator";
import { DocReadyState, ReadyStateNAB } from "../../../../../../Shared/scripts/Classes/ReadyState";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _BaseStateFullProxy } from "./_StateProxy";

export abstract class _BaseScFrameProxy<T> extends _BaseStateFullProxy<T> implements IStateFullProxy {
  public readonly FrameJacket: ElementFrameJacket = null;
  abstract StateFullProxyDisciminatorFriendly;
  Id: string = null;
  abstract StateFullProxyDisciminator: StateFullProxyDisciminator;
  abstract Friendly: string;
  RecipeBasics: RecipeBasics;

  constructor(apiCore: IAPICore, frameJacket: ElementFrameJacket) {
    super(apiCore);

    this.ErrorHand.ThrowIfNullOrUndefined(_BaseScFrameProxy.name, [frameJacket]);
    this.FrameJacket = frameJacket;
    this.Id = 'base_' + this.FrameJacket.GetNativeIframeId();
  }

  abstract InstantiateAsyncMembers();

  abstract WireEvents();

  GetZindexAsInt(): number {
    return this.FrameJacket.ZindexAsInt();
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