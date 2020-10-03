import { DocReadyState, ReadyStateNAB } from "../../../../../../Shared/scripts/Enums/ReadyState";
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IScStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { NativeScIframeProxy } from "../../../NativeScIframeProxy";
import { ScDocumentProxy } from "../../../ScDocumentProxy";
import { _BaseScStateFullProxy } from "./_StateProxy";

export abstract class _BaseScFrameProxy extends _BaseScStateFullProxy implements IScStateFullProxy {
  NativeIFrameProxy: NativeScIframeProxy = null; //todo - work towards making this private
  Id: string = null;

  constructor(hindeCore: IHindeCore, iframeElem: HTMLIFrameElement)
  constructor(hindeCore: IHindeCore, iframeElem: NativeScIframeProxy)
  constructor(hindeCore: IHindeCore, iframeElem: any)
  constructor(hindeCore: IHindeCore, argIframe: HTMLIFrameElement | NativeScIframeProxy) {
    super(hindeCore);
    if (typeof argIframe === typeof NativeScIframeProxy) {
      this.NativeIFrameProxy = <NativeScIframeProxy>argIframe;
    } else {
      this.NativeIFrameProxy = new NativeScIframeProxy(this.HindeCore, <HTMLIFrameElement>argIframe);
    }

    this.ErrorHand.ThrowIfNullOrUndefined(_BaseScFrameProxy.name, this.NativeIFrameProxy)
    this.Id = 'base_' + this.NativeIFrameProxy.GetId();// Guid.NewRandomGuid().Raw;
  }

  Instantiate_BaseScFrameProxy() {
    //this.DataOneContentDocFactoryFromIframe();
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