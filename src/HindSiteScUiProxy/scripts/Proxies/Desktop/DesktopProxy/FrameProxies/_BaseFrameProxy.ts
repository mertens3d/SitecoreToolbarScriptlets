import { RecipeBasics } from "../../../../../../Shared/scripts/Classes/RecipeBasics";
import { DocumentReadyState, ReadyStateNAB } from "../../../../../../Shared/scripts/Enums/ReadyState";
import { FactoryHelper } from "../../../../../../Shared/scripts/Helpers/FactoryHelper";
import { Guid } from "../../../../../../Shared/scripts/Helpers/Guid";
import { GuidData } from "../../../../../../Shared/scripts/Helpers/GuidData";
import { IHindeCore } from "../../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IDataOneDoc } from "../../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { DTFrameProxyMutationEvent_Subject } from "../Events/DTFrameProxyMutationEvent/DTFrameProxyMutationEvent_Subject";
import { CommandToExecuteData } from "../../../../../../Content/scripts/Proxies/CommandToExecuteData";
import { _BaseScStateProxy } from "./_StateProxy";
import { _HindeCoreBase } from "../../../../../../Shared/scripts/LoggableBase";

export class _BaseFrameProxy extends _BaseScStateProxy {
  Instantiate() {
      throw new Error("Method not implemented.");
  }
  Index: number = -1;
  HTMLIframeElement: HTMLIFrameElement = null;
  Id: GuidData = null;
  DTFrameProxyMutationEvent_Subject: DTFrameProxyMutationEvent_Subject;
  FrameTypeDiscriminator: string = _BaseFrameProxy.name;
  

  constructor(hindeCore: IHindeCore, iframeElem: HTMLIFrameElement) {
    super(hindeCore);
    this.ErrorHand.ThrowIfNullOrUndefined(_BaseFrameProxy.name,[iframeElem]);

    this.HTMLIframeElement = iframeElem;
    this.Id = Guid.NewRandomGuid();
    this.RecipeBasics = new RecipeBasics(this.HindeCore);
  }

  GetZindexAsInt(): number {
    let toReturn: number = -99;

    if (this.HTMLIframeElement && this.HTMLIframeElement.style && this.HTMLIframeElement.style.zIndex) {
      //toReturn = this.IframeElem.style.zIndex;
      toReturn = parseInt(this.HTMLIframeElement.style.zIndex);
    }

    return toReturn;
  }

  async WaitForCompleteNABFrameProxyOrReject(): Promise<DocumentReadyState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.WaitForCompleteNABFrameProxyOrReject.name, this.Friendly);

      await this.RecipeBasics.WaitForCompleteNABHtmlIframeElement(this.HTMLIframeElement, this.Friendly)
        .then((result: ReadyStateNAB) => {
          //result.LogDebugValues();
          if (result.IsCompleteNAB()) {
            resolve(result.DocumentReadyState());
          } else {
            reject(result.DocumentReadtStateFriendly);
          }
        })
        .catch((err) => reject(this.WaitForCompleteNABFrameProxyOrReject.name + ' | ' + err));

      this.Logger.FuncEnd(this.WaitForCompleteNABFrameProxyOrReject.name, this.Friendly);
    });
  }

  GetContentDoc(): IDataOneDoc {
    return new FactoryHelper(this.HindeCore).DataOneContentDocFactoryFromIframe(this);
  }
}