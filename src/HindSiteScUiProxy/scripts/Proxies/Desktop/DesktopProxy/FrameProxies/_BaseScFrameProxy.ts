import { DocReadyState, ReadyStateNAB } from "../../../../../../Shared/scripts/Enums/ReadyState";
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { NativeIframeProxy } from "../../../NativeScIframeProxy";
import { ScDocumentProxy } from "../../../ScDocumentProxy";
import { _BaseStateFullProxy } from "./_StateProxy";

export abstract class _BaseScFrameProxy<T> extends _BaseStateFullProxy<T> implements IStateFullProxy<T> {
  NativeIFrameProxy: NativeIframeProxy = null; //todo - work towards making this private
  Id: string = null;

  constructor(hindeCore: IHindeCore, iframeElem: HTMLIFrameElement)
  constructor(hindeCore: IHindeCore, iframeElem: NativeIframeProxy)
  constructor(hindeCore: IHindeCore, iframeElem: any)
  constructor(hindeCore: IHindeCore, argIframe: HTMLIFrameElement | NativeIframeProxy) {
    super(hindeCore);
    if (typeof argIframe === typeof NativeIframeProxy) {
      this.NativeIFrameProxy = <NativeIframeProxy>argIframe;
    } else {
      this.NativeIFrameProxy = new NativeIframeProxy(this.HindeCore, <HTMLIFrameElement>argIframe);
    }

    this.ErrorHand.ThrowIfNullOrUndefined(_BaseScFrameProxy.name, this.NativeIFrameProxy)
    this.Id = 'base_' + this.NativeIFrameProxy.GetNativeIframeId();// Guid.NewRandomGuid().Raw;
  }

  Instantiate_BaseScFrameProxy() {
    //this.DataOneContentDocFactoryFromIframe();
    this.NativeIFrameProxy.Instantiate();
  }

  GetZindexAsInt(): number {
    return this.NativeIFrameProxy.ZindexAsInt();
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

  GetContentDoc(): ScDocumentProxy {
    return this.NativeIFrameProxy.GetNativeContentDoc();
    //return  this.DataOneContentDocFactoryFromIframe(this.DocumentProxy);
  }

  public async WaitForCompleteNABFrameProxyOrReject(): Promise<DocReadyState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForCompleteNABFrameProxyOrReject.name, this.Friendly);

      await this.NativeIFrameProxy.WaitForCompleteNABHtmlIframeElement(this.Friendly)
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