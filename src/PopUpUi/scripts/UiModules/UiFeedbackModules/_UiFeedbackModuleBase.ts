import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { SharedConst } from "../../../../Shared/scripts/SharedConst";
import { _UiModuleBase } from "../_UiModuleBase";

export abstract class _UiFeedbackModuleBase extends _UiModuleBase {
  protected indentedLineBreak = '<br/>&nbsp;&nbsp;&nbsp;';
  protected lineBreak = '<br/>';
  ModuleKey: ModuleKey = ModuleKey.Unknown;
  FeedbackTextContainer: HTMLDivElement;

  constructor(logger: ILoggerAgent, selector: string) {
    super(logger, selector);
    this.ContainerSelector = selector;
  }

  Init_Module() {
    this.Init_UiModuleBase();
  }

  abstract RefreshUi_Module();
  abstract WireEvents_Module();


  BuildHtmlForModule() {
    this.FeedbackTextContainer = document.createElement('div');
    let scroller = document.createElement('div');
    scroller.classList.add('scroller');
    let fullCol = document.createElement('div');
    fullCol.classList.add('col-full');
    let flexContainer = document.createElement('div');
    flexContainer.classList.add('flex-container');

    scroller.appendChild(this.FeedbackTextContainer);
    fullCol.appendChild(scroller);
    flexContainer.appendChild(fullCol);

    if (this.ContainerUiDivElem) {
      this.ContainerUiDivElem.appendChild(flexContainer);
    } else {
      this.Logger.ErrorAndContinue(this.BuildHtmlForModule.name, this.Friendly);
    }
  }

  AddHtmlString(htmlText: string) {
    if (htmlText) {
      this.FeedbackTextContainer.insertAdjacentHTML(SharedConst.Const.KeyWords.Html.beforeend, htmlText);
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
    if (this.FeedbackTextContainer) {
      this.FeedbackTextContainer.innerHTML = '';
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

  ConvertNBSP(input: string): string {
    return input.replace(/&nbsp;/g, "&nbsp;&nbsp;");
  }

  WriteSingleLine(text: string): void {
    this.FeedbackTextContainer.innerHTML += this.ConvertNBSP( this.ConvertIndents(this.ConvertTabs(this.ConvertLineBreaks(text)) + '<br/>'));
  }
}