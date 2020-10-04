import { IterationDrone } from "../../../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { ReadyStateNAB } from "../../../Shared/scripts/Enums/ReadyState";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ContentConst } from "../../../Shared/scripts/Interfaces/InjectConst";
import { IScVerSpec } from "../../../Shared/scripts/Interfaces/IScVerSpec";
import { _BaseStateFullProxy } from "./Desktop/DesktopProxy/FrameProxies/_StateProxy";
import { NativeIframeProxy } from "./NativeScIframeProxy";

export abstract class _BaseNativeDocumentProxy<T> extends _BaseStateFullProxy<T> {
    protected NativeDocument: Document;

    constructor(hindeCore: IHindeCore, nativeDocument: Document) {
        super(hindeCore);
        this.NativeDocument = nativeDocument;
    }

    //------------------------------------------
    getElementById(idStr: string): HTMLElement {
        return this.NativeDocument.getElementById(idStr);
    }
    querySelector(selector: string): HTMLElement {
        return this.NativeDocument.querySelector(selector);
    }
    GetContentDoc(): Document {
        return this.NativeDocument;
    }

    GetIFramesFromDataOneDoc(): NativeIframeProxy[] {
        let toReturnIframeAr: NativeIframeProxy[] = [];

        this.ErrorHand.ThrowIfNullOrUndefined(this.GetIFramesFromDataOneDoc.name, [this.NativeDocument]);

        var queryResults = this.NativeDocument.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc920);

        if (!queryResults) {
            queryResults = this.NativeDocument.querySelectorAll(ContentConst.Const.Selector.SC.IframeContent.sc820);
        }

        if (queryResults) {
            for (var ifrIdx = 0; ifrIdx < queryResults.length; ifrIdx++) {
                var iframeElem: NativeIframeProxy = new NativeIframeProxy(this.HindeCore, <HTMLIFrameElement>queryResults[ifrIdx]);
                if (iframeElem) {
                    toReturnIframeAr.push(iframeElem);
                }
            }
        }

        this.Logger.LogVal('found iframes count', toReturnIframeAr.length);

        return toReturnIframeAr;
    }


    public WaitForThenClick(selectorAr: string[]): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForThenClick.name, [selectorAr, this.NativeDocument]);

            var found: HTMLElement = null;
            var iterationJr = new IterationDrone(this.HindeCore, this.WaitForThenClick.name, true);

            while (!found && iterationJr.DecrementAndKeepGoing()) { // todo put back && !this.MsgMan().OperationCancelled) {
                for (var idx = 0; idx < selectorAr.length; idx++) {
                    found = this.NativeDocument.querySelector(selectorAr[idx]);
                    if (found) {
                        break;
                    }
                }
            }

            if (found) {
                try {
                    this.Logger.LogAsJsonPretty(this.WaitForThenClick.name + ' clicking', selectorAr);
                    found.click();
                    resolve();
                }
                catch (err) {
                    reject(this.WaitForThenClick.name + ' | ' + err);
                }
            }
            else {
                await iterationJr.Wait()
                    .catch((err) => reject(this.WaitForThenClick.name + ' | ' + err));
            }

            if (!found && iterationJr.IsExhausted) {
                reject(iterationJr.IsExhaustedMsg);
            }
        });
    }


    async RaceWaitAndClick(selector: IScVerSpec): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await this.WaitForThenClick([selector.sc920, selector.sc820])
                .then(() => resolve())
                .catch((err) => reject(this.RaceWaitAndClick.name + ' | ' + err));
        });
    }

    WaitForAndClickWithPayload(selector: string, payload: any) {
        return new Promise<any>(async (resolve, reject) => {
            this.Logger.FuncStart(this.WaitForAndClickWithPayload.name, selector);

            await this.WaitForThenClick([selector])
                .then(() => resolve(payload))
                .catch(ex => {
                    this.ErrorHand.ErrorAndThrow(this.WaitForAndClickWithPayload.name, ex);
                    reject(ex);
                });
        });
    }


    protected async WaitForCompleteNAB_NativeDocument(friendly: string): Promise<ReadyStateNAB> {
        return new Promise(async (resolve, reject) => {
            this.Logger.FuncStart(this.WaitForCompleteNAB_NativeDocument.name, friendly);

            this.ErrorHand.ThrowIfNullOrUndefined(this.WaitForCompleteNAB_NativeDocument.name, this.NativeDocument);

            var iterationJr: IterationDrone = new IterationDrone(this.HindeCore, this.WaitForCompleteNAB_NativeDocument.name, false);
            let readyStateNAB: ReadyStateNAB = new ReadyStateNAB(this.HindeCore, this.NativeDocument);

            while (iterationJr.DecrementAndKeepGoing() && !readyStateNAB.IsCompleteNAB()) {
                readyStateNAB.LogDebugValues();
                await iterationJr.Wait();
            }

            if (iterationJr.IsExhausted) {
                this.Logger.Log(iterationJr.IsExhaustedMsg);
                reject(iterationJr.IsExhaustedMsg);
            }
            else {
                resolve(readyStateNAB);
            }

            this.Logger.FuncEnd(this.WaitForCompleteNAB_NativeDocument.name, friendly);
        });
    }
}
