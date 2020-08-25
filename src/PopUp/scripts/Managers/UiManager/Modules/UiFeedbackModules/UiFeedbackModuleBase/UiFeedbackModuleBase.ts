import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";

export class UiFeedbackModuleBase {

  protected __elementSelector: string;
  Logger: ILoggerAgent;
  protected __targetElement: HTMLElement;

  constructor(selector: string, logger: ILoggerAgent) {
    this.__elementSelector = selector;
    this.Logger = logger;
  }

  private __getFeedbackElem(): HTMLElement {

    let result = <HTMLElement>document.querySelector(this.__elementSelector);
    console.log(this.__elementSelector);
    console.log('++++++++++' + JSON.stringify(result))
    return result; 
  }

  AddHtml(htmlText: string) {
    if (htmlText) {
      this.__getFeedbackElem().innerHTML = htmlText;
    } else {
      this.Logger.ErrorAndThrow(this.AddHtml.name, 'htmlText');
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
    var ta: HTMLElement = this.__getFeedbackElem();
    if (ta) {
      ta.innerHTML = '';
    } else {
      this.Logger.ErrorAndThrow(this.ClearFeedbackElem.name, 'No feedback elem found');
    }
  }

  WriteSingleLine(text: string): void {
    var ta = this.__getFeedbackElem();
    if (ta) {
      ta.innerHTML += text + '<br/>';
    }
  }
}
