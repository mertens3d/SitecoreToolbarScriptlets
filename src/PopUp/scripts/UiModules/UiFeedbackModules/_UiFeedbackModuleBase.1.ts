import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";
import { _UiModuleBase } from "./_UiFeedbackModuleBase";

export class _UiFeedbackModuleBase extends _UiModuleBase implements IUiModule {
    protected indentedLineBreak = '<br/>&nbsp;&nbsp;&nbsp;';
    protected lineBreak = '<br/>';

    constructor(logger: ILoggerAgent, selector: string) {
        super(logger, selector);
        this.ElementSelector = selector;
    }


    private __getFeedbackElem(): HTMLElement {
        if (!this.__targetElement) {
            this.__targetElement = <HTMLElement>document.querySelector(this.ElementSelector);

            if (!this.__targetElement) {
                this.Logger.ErrorAndThrow(this.__getFeedbackElem.name, 'target not found: ' + this.ElementSelector);
            }
        }

        return this.__targetElement;
    }

    AddHtmlString(htmlText: string) {
        if (htmlText) {
            this.__getFeedbackElem().insertAdjacentHTML(SharedConst.Const.KeyWords.Html.beforeend, htmlText);
        }
        else {
            this.Logger.ErrorAndThrow(this.AddHtmlString.name, 'htmlText');
        }
    }

    WriteManyLines(strAr: string[]): void {
        if (strAr) {
            for (var ldx = 0; ldx < strAr.length; ldx++) {
                this.WriteSingleLine(strAr[ldx]);
            }
        }
        else {
            this.Logger.ErrorAndThrow(this.WriteManyLines.name, 'No strAr');
        }
    }

    ClearFeedbackElem(): void {
        var elem: HTMLElement = this.__getFeedbackElem();
        if (elem) {
            elem.innerHTML = '';
        }
        else {
            this.Logger.ErrorAndThrow(this.ClearFeedbackElem.name, 'No feedback elem found');
        }
    }

    ConvertIndents(input: string): string {
        let toReturn: string = '';

        for (var idx = 0; idx < input.length; idx++) {
            let oneChar = input[idx];
            if (oneChar === ' ') {
                toReturn += '&nbsp;';
            }
            else {
                toReturn += input.substring(idx);
                break;
            }
        }

        return toReturn;
    }

    ConvertLineBreaks(input: string): string {
        return input.replace(/\r?\n/g, "<br/>");
    }

    ConvertTabs(input: string): string {
        return input.replace(/\t/g, "&nbsp;&nbsp;xxxxxx");
  }

    WriteSingleLine(text: string): void {
        var ta = this.__getFeedbackElem();
        if (ta) {
            ta.innerHTML += this.ConvertIndents(this.ConvertTabs(this.ConvertLineBreaks(text)) + '<br/>');
        }
    }
}
