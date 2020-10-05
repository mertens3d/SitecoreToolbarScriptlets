import { DocReadyState, ReadyStateNAB } from "../../../../../../Shared/scripts/Enums/ReadyState";
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { FrameJacket } from "../../../../../../DOMJacket/FrameJacket";
import { ScDocumentFacade } from "../../../ScDocumentFacade";
import { _BaseStateFullProxy } from "./_StateProxy";
import { StateFullProxyDisciminator } from "../../../../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { RecipeBasics } from "../../../../../../Shared/scripts/Classes/RecipeBasics";

export abstract class _BaseScFrameProxy<T> extends _BaseStateFullProxy<T> implements IStateFullProxy {
  protected readonly FrameJacket: FrameJacket = null;
  Id: string = null;
  abstract StateFullProxyDisciminator: StateFullProxyDisciminator;
  ScDocumentProxy: ScDocumentFacade;
  abstract Friendly: string;
  RecipeBasics: RecipeBasics;


  constructor(hindeCore: IHindeCore, frameJacket: FrameJacket) {
    super(hindeCore); 

    this.ErrorHand.ThrowIfNullOrUndefined(_BaseScFrameProxy.name, [frameJacket]);
    this.FrameJacket = frameJacket;
    this.ScDocumentProxy = new ScDocumentFacade(this.HindeCore, this.FrameJacket.DocumentJacket);
    this.Id = 'base_' + this.FrameJacket.GetNativeIframeId();// Guid.NewRandomGuid().Raw;
  }

  abstract InstantiateAsyncMembers();

  abstract WireEvents();


  GetZindexAsInt(): number {
    return this.FrameJacket.ZindexAsInt();
  }

  //DataOneContentDocFactoryFromIframe(): ScDocumentProxy {
  //  var toReturn: ScDocumentProxy = null;

  //  if (dataOneIframe) {
  //    toReturn = new ScDocumentProxy(this.HindeCore, this.NativeIFrameProxy.GetNativeContentDoc());
  //    toReturn.Nickname = ' - content doc'
  //  } else {
  //    this.ErrorHand.ErrorAndThrow(this.DataOneContentDocFactoryFromIframe.name, 'no iframe provided');
  //  }
  //  return toReturn;
  //}

  GetContentDoc(): ScDocumentFacade {
    return this.ScDocumentProxy;//  NativeIFrameProxy.GetNativeContentDoc();
    //return  this.DataOneContentDocFactoryFromIframe(this.DocumentProxy);
  }

  public async WaitForCompleteNABFrameProxyOrReject(): Promise<DocReadyState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForCompleteNABFrameProxyOrReject.name, this.Friendly);

      await this.FrameJacket.WaitForCompleteNABHtmlIframeElement(this.Friendly)
        .then((result: ReadyStateNAB) => {
          //result.LogDebugValues();
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