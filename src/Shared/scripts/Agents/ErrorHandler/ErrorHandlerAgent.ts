import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";
import { ICoreErrorHandler } from "../../Interfaces/Agents/IErrorHandlerAgent";
import { ILoggerAgent } from "../../Interfaces/Agents/ILoggerAgent";
import { IError } from "../../Interfaces/IError";
import { SharedConst } from "../../SharedConst";
import { ICoreTaskMonitor } from "../../Interfaces/Agents/Core/ITaskMonitorAgent";

export class ErrorHandlerAgent implements ICoreErrorHandler {
  readonly TypeDiscriminator = TypeDiscriminator.IErrorHandler;

  ErrorStack: IError[] = [];
  private TaskMonitor: ICoreTaskMonitor;
  private Logger: ILoggerAgent;
  private errorContents: HTMLDivElement = null;
  private MessageDiv: any;
  private FlagTextDiv: any;
  private errorFlagContainer: HTMLElement;
  private CancelButtonElem: HTMLInputElement;

  constructor() {
    
  }

  IntroduceSiblings(logger: ILoggerAgent, taskMonitor: ICoreTaskMonitor) {
    this.Logger = logger;
    this.TaskMonitor = taskMonitor;
    this.CreateFlag();
  }

  ThrowIfNullOrUndefined(title: string | string[], testSubject: any | any[]): void {
    if (testSubject instanceof Array) {
      (<any[]>testSubject).forEach((testSubject: any) => this.ThrowIfNullOrUndefined(title, testSubject));
    }
    else {
      if (typeof testSubject === 'undefined' || testSubject === null) {
        try {
          if (this.TaskMonitor) {
            this.TaskMonitor.RequestCancel(ErrorHandlerAgent.name + '.' + this.ThrowIfNullOrUndefined.name + '-' + title);
          } else {
            console.log('No Task Monitor found');
          }
        } catch (err: any) {
          console.log('Error in: ' + this.ThrowIfNullOrUndefined.name + '  ' + err);
        }

        this.HandleFatalError(title, 'Failed Null check A');
      } else {
        //passed
      }
    }
  }

  private CommonThrow(errorMessage: string): void {
    
    throw (errorMessage);
  }

  ThrowIfNullOrUndefinedStatic(title: string, testSubject: any): void;
  ThrowIfNullOrUndefinedStatic(title: string, testSubject: any[]): void;
  ThrowIfNullOrUndefinedStatic(title: string, testSubject: any | any[]): void {
    if (testSubject instanceof Array) {
      (<any[]>testSubject).forEach((testSubject: any) => this.ThrowIfNullOrUndefinedStatic(title, testSubject));
    }
    else {
      if (typeof testSubject === 'undefined' || testSubject === null) {
        this.CommonThrow(title + ' Failed Null check B');
      }
    }
  }

  WarningAndContinue(container: string, text: any): void {
    if (!container) {
      container = 'unknown';
    }

    if (!text) {
      text = 'unknown';
    }

    this.ErrorLogger('');
    this.ErrorLogger('\t\t** WARNING ** ' + container + ' ' + text);
    this.ErrorLogger('');
  }

  private StyleFormat(colorAr: string[], text: string) {
    let toReturn: string = '';

    toReturn = '';

    colorAr.forEach((color) => {
      toReturn += SharedConst.Const.Colors.ConsoleStyles.StyleEsc + color;
    });

    toReturn += text + SharedConst.Const.Colors.ConsoleStyles.StyleEsc + SharedConst.Const.Colors.ConsoleStyles.StyleReset;

    return toReturn;
  }

  private DrawErrorMessage(container: string, text: string | string[]) {
    if (!container) {
      container = 'unknown';
    }

    let textToRender: string[] = [];

    if (!text) {
      text = ['unknown'];
    }

    if (!Array.isArray(text)) {
      textToRender = [text];
    } else {
      textToRender = text;
    }

    this.ErrorLogger('');
    this.ErrorLogger('\t\ts) '
      + this.StyleFormat([SharedConst.Const.Colors.ConsoleStyles.StyleBgRed], '** ERROR **'));

    this.ErrorLogger('\t\t  container: ' + container);

    this.ErrorLogger('');

    textToRender.forEach((message: string) => {
      this.ErrorStack.push({
        ContainerFunc: container,
        ErrorString: message
      });

      this.ErrorLogger('\t\t' + message);
    })

    this.ErrorLogger('');
    this.ErrorLogger('\t\te)** ERROR container: ** ' + container);
    this.ErrorLogger('');
  }

  ErrorAndContinue(container: string, text: any): void {
    this.DrawErrorMessage(container, text);
  }

  ErrorLogger(text: string): void {
    console.log('********** ' + text + ' **********');
  }

  FormatRejectMessage(container: string | string[], err: string): string {
    let toReturn: string = '';

    if (Array.isArray(container)) {
      let isFirstInArray = true;
      container.forEach((arrayItem: string) => {
        if (!isFirstInArray) {
          toReturn += '.';
        }
        isFirstInArray = false;
        toReturn += arrayItem
      })
    } else {
      toReturn = container;
    }

    toReturn += ' | ' + err;

    return toReturn;
  }

  DisplayErrorFlag() {
    if (this.errorFlagContainer) {
      this.errorFlagContainer.style.display = 'block';
    }
  }

  private CreateFlag() {
    this.Logger.FuncStart(this.CreateFlag.name);
    let BodyTag = <HTMLBodyElement>document.getElementsByTagName(SharedConst.Const.KeyWords.Html.Tags.Body)[0];//(treeGlyphTargetId);
    this.errorFlagContainer = this.CreateContainer();
    this.CreateFlagContents();
    this.CreateResetButton();
    this.errorContents.appendChild(this.CancelButtonElem);

    BodyTag.appendChild(this.errorFlagContainer);
    this.Logger.FuncEnd(this.CreateFlag.name);
  }

  private Reset(): void {
    alert('reset code needed');
  }

  private CreateResetButton(): void {
    this.CancelButtonElem = document.createElement('input');
    this.CancelButtonElem.type = "button";
    this.CancelButtonElem.value = "Reset";
    this.CancelButtonElem.addEventListener('click', (() => this.Reset()));
  }

  private CreateFlagContents(): void {
    this.errorContents = document.createElement('div');
    this.errorContents.classList.add('error-contents');

    let closeButton: HTMLInputElement = this.CreateCloseButton();

    let headerElem: HTMLDivElement = document.createElement('div');
    headerElem.innerText = "HindSite";
    headerElem.classList.add("header");

    let headWrapper: HTMLDivElement = document.createElement('div');
    headWrapper.classList.add("header-wrapper");

    this.MessageDiv = document.createElement('div');
    this.MessageDiv.innerText = "Sigh...Sad Face";
    this.MessageDiv.classList.add("message");

    this.FlagTextDiv = document.createElement('div');

    headWrapper.appendChild(headerElem);
    headWrapper.appendChild(closeButton);

    this.errorContents.appendChild(headWrapper);
    this.errorContents.appendChild(this.MessageDiv);

    this.errorContents.appendChild(this.FlagTextDiv);

    this.errorFlagContainer.appendChild(this.errorContents);
  }

  async HideErrorFlag(message: string): Promise<void> {
    this.Logger.FuncStart(this.HideErrorFlag.name);
    if (this.errorFlagContainer) {
      this.errorFlagContainer.style.display = 'none';
    }
    this.Logger.FuncEnd(this.HideErrorFlag.name);
  }

  private CreateCloseButton(): HTMLInputElement {
    let closeButtonElem: HTMLInputElement = document.createElement('input');
    closeButtonElem.type = "button";
    closeButtonElem.value = "X";
    closeButtonElem.classList.add("close-btn");

    closeButtonElem.addEventListener('click', (() => this.CallbackOnCloseButton()));

    return closeButtonElem;
  }

  private CallbackOnCloseButton() {
    this.HideErrorFlag('Closing');
  }

  CreateContainer(): HTMLElement {
    let flagContainer: HTMLElement = document.createElement('div');
    flagContainer.classList.add('hind-site-error-flag');
    flagContainer.style.display = 'none';

    return flagContainer
  }

  HandleTopLevelTryCatch(container: string | string[], text: string): void {
    console.log(JSON.stringify(container));
    console.log(text);
    console.log('Top level Try/Catch');
    this.DisplayErrorFlag();
  }

  HandleFatalError(container: string | string[], text: string): void {
    let stack = new Error().stack;

    let containerTextToRender: string = '';

    if (Array.isArray(container)) {
      let isFirstInArray = true;
      container.forEach((subContainer: string) => {
        if (!isFirstInArray) {
          containerTextToRender += '.';
        }
        isFirstInArray = false;
        containerTextToRender += subContainer
      })
    } else {
      containerTextToRender = container;
    }

    this.DrawErrorMessage(containerTextToRender, [text, stack]);
    try {
      this.TaskMonitor.RequestCancel(ErrorHandlerAgent.name + '.' + this.HandleFatalError.name);
    } catch (err: any) {
      console.log(err);
    }
    console.log('----- sigh...sad face ');
  }

  HandleCancelReaction(arg0: string, arg1: string) {
    console.log('Reacting to cancel');
  }
}