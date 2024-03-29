﻿import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";
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

  constructor() {
  }
  IntroduceSiblings(logger: ILoggerAgent, taskMonitor: ICoreTaskMonitor) {
    this.Logger = logger;
    this.TaskMonitor = taskMonitor;
  }

  ThrowIfNullOrUndefined(title: string | string[], testSubject: any | any[]): void {
    if (testSubject instanceof Array) {
      (<any[]>testSubject).forEach((testSubject: any) => this.ThrowIfNullOrUndefined(title, testSubject));
    }
    else {
      if (typeof testSubject === 'undefined' || testSubject === null) {
        try {
          if (this.TaskMonitor) {
            this.TaskMonitor.RequestCancel();
          } else {
            console.log('No Task Monitor found');
          }
        } catch (err) {
          console.log('Error in: ' + this.ThrowIfNullOrUndefined.name + '  ' + err);
        }

        this.ErrorAndThrow(title, 'Failed Null check A');
      } else {
        //passed
      }
    }
  }

  static ThrowIfNullOrUndefinedStatic(title: string, testSubject: any): void;
  static ThrowIfNullOrUndefinedStatic(title: string, testSubject: any[]): void;
  static ThrowIfNullOrUndefinedStatic(title: string, testSubject: any | any[]): void {
    if (testSubject instanceof Array) {
      (<any[]>testSubject).forEach((testSubject: any) => ErrorHandlerAgent.ThrowIfNullOrUndefinedStatic(title, testSubject));
    }
    else {
      if (typeof testSubject === 'undefined' || testSubject === null) {
        throw (title + ' Failed Null check B');
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

  async ErrorLogger(text) {
    console.log('********** ' + text + ' **********');
  }

  FormatejectMessage(container: string[], err: string): string {
    let toReturn: string = '';

    let isFirstInArray = true;
    container.forEach((subContainer: string) => {
      if (!isFirstInArray) {
        toReturn += '.';
      }
      isFirstInArray = false;
      toReturn += subContainer
    })

    toReturn += ' | ' + err;

    return toReturn;
  }

  ErrorAndThrow(container: string | string[], text: string): void {
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
      this.TaskMonitor.RequestCancel();
    } catch (err) {
      console.log(err);
    }
    throw ('----- sigh...sad face ');
  }
}