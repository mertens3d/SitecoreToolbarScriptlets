import { IterationDrone } from "../Shared/scripts/Agents/Drones/IterationDrone/IterationDrone";
import { ReadyStateNAB } from "../Shared/scripts/Enums/ReadyState";
import { IHindeCore } from "../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IFrameJacketStyling } from "../Shared/scripts/Interfaces/Data/States/IStateOfFrameStyling";
import { DocumentJacket } from "./DocumentJacket";
import { UrlJacket } from "./UrlJacket";
import { ElementJacketBase } from "./ElementJacketBase";

export class ElementFrameJacket extends ElementJacketBase<HTMLIFrameElement> {
    public DocumentJacket: DocumentJacket;
    private NativeIframeId: string;

    constructor(hindeCore: IHindeCore, htmlIframeElement: HTMLIFrameElement) {
        super(hindeCore, htmlIframeElement);
        this.BuildInstance();
    }


    private BuildInstance() {
        this.Logger.FuncStart(this.BuildInstance.name, ElementFrameJacket.name);

        this.DocumentJacket = new DocumentJacket(this.HindeCore, this.NativeElement.contentDocument);

        this.NativeIframeId = this.NativeElement.id;

        this.Logger.FuncEnd(this.BuildInstance.name, ElementFrameJacket.name);
    }

    GetUrlJacket(): UrlJacket {
        return this.DocumentJacket.UrlJacket;
    }

    SetFrameStyling(StateOfFrameStyling: IFrameJacketStyling): void {
        this.Logger.FuncStart(this.SetFrameStyling.name, ElementFrameJacket.name);
        this.NativeElement.style.height = StateOfFrameStyling.Height;
        this.NativeElement.style.left = StateOfFrameStyling.Left;
        this.NativeElement.style.position = StateOfFrameStyling.Position;
        this.NativeElement.style.top = StateOfFrameStyling.Top;
        this.NativeElement.style.width = StateOfFrameStyling.Width;
        this.NativeElement.style.zIndex = StateOfFrameStyling.ZIndex;
        this.Logger.FuncEnd(this.SetFrameStyling.name, ElementFrameJacket.name);
    }

    GetFrameStyling(): IFrameJacketStyling {
        let toReturn: IFrameJacketStyling = null;
        try {
            let sourceStyle = this.NativeElement.style;
            toReturn = {
                Height: sourceStyle.height,
                Left: sourceStyle.left,
                Position: sourceStyle.position,
                Top: sourceStyle.top,
                Width: sourceStyle.width,
                ZIndex: sourceStyle.zIndex
            };
        }
        catch (err) {
            this.ErrorHand.ErrorAndThrow(this.GetFrameStyling.name, err);
        }
        return toReturn;
    }

    TriggerInboundEventsAsync(): void {
    }

    //-----------------------------------------------------------------------------------
    GetIframeHtmlElem(): HTMLIFrameElement {
        return this.NativeElement;
    }

    GetNativeContentDoc(): DocumentJacket {
        return this.DocumentJacket;
    }

    src(): string {
        return this.NativeElement.src;
    }
    ZindexAsInt(): number {
        let toReturn: number = -99;

        if (this.NativeElement.style && this.NativeElement.style.zIndex) {
            //toReturn = this.IframeElem.style.zIndex;
            toReturn = parseInt(this.NativeElement.style.zIndex);
        }

        return toReturn;
    }

    GetNativeIframeId(): string {
        return this.NativeIframeId;
    }


    private async WaitForNABHostedDoc(): Promise<void> {
        this.Logger.FuncStart(this.WaitForNABHostedDoc.name);
        try {
            var iterationJr: IterationDrone = new IterationDrone(this.HindeCore, this.WaitForNABHostedDoc.name, false);
            let readyStateNAB: ReadyStateNAB = new ReadyStateNAB(this.HindeCore, this.NativeElement.contentDocument);

            while (iterationJr.DecrementAndKeepGoing() && readyStateNAB.DocIsAboutBlank()) {
                await iterationJr.Wait();
                readyStateNAB.SetDocument(this.NativeElement.contentDocument);
                readyStateNAB.LogDebugValues();
            }

            if (iterationJr.IsExhausted) {
                this.Logger.Log(iterationJr.IsExhaustedMsg);
            }
        }
        catch (err) {
            this.ErrorHand.ErrorAndThrow(this.WaitForNABHostedDoc.name, err);
        }
        this.Logger.FuncEnd(this.WaitForNABHostedDoc.name);
    }


    async WaitForCompleteNABHtmlIframeElement(friendly: string): Promise<ReadyStateNAB> {
        return new Promise(async (resolve, reject) => {
            this.Logger.FuncStart(this.WaitForCompleteNABHtmlIframeElement.name, friendly);
            this.Logger.Log(this.DocumentJacket.UrlJacket.GetOriginalURL());

            if (this.NativeElement) {
                await this.WaitForNABHostedDoc()
                    .then(() => this.DocumentJacket = new DocumentJacket(this.HindeCore, this.NativeElement.contentDocument))
                    .then(() => this.DocumentJacket.WaitForCompleteNAB_DocumentJacket(friendly))
                    .then((result: ReadyStateNAB) => {
                        this.Logger.LogVal(this.WaitForCompleteNABHtmlIframeElement.name, result.DocumentReadtStateFriendly());
                        this.Logger.LogVal(this.WaitForCompleteNABHtmlIframeElement.name, this.NativeElement.contentDocument.URL);
                        this.Logger.LogVal(this.WaitForCompleteNABHtmlIframeElement.name, this.NativeElement.contentDocument.readyState);
                        resolve(result);
                    })
                    .catch((err) => reject(this.ErrorHand.FormatejectMessage([this.WaitForCompleteNABHtmlIframeElement.name], err)));
            }
            else {
                this.ErrorHand.ErrorAndThrow([ElementFrameJacket.name, this.WaitForCompleteNABHtmlIframeElement.name], 'No target doc: ' + friendly);
            }
            this.Logger.FuncEnd(this.WaitForCompleteNABHtmlIframeElement.name, friendly);;
        });
    }
}
