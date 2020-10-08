import { IErrorHandlerAgent } from "../../../Interfaces/Agents/IErrorHandlerAgent";
import { IError } from "../../../Interfaces/IError";
import { Discriminator } from "../../../Interfaces/Agents/Discriminator";
import { TaskMonitor } from "./TaskMonitor";

export class ErrorHandlerAgent implements IErrorHandlerAgent {
  Discriminator = Discriminator.IErrorHandler;
  ErrorStack: IError[] = [];
  private TaskMonitor: TaskMonitor;

  constructor(taskMonitor: TaskMonitor) {
    this.TaskMonitor = taskMonitor;
  }

  Instantiate() {
  }

  ThrowIfNullOrUndefined(title: string, testSubject: any): void;
  ThrowIfNullOrUndefined(title: string, testSubject: any[]): void;
  ThrowIfNullOrUndefined(title: string, testSubject: any | any[]): void {
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
    this.ErrorLogger('\t\ts) ** ERROR ** container: ' + container);
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

    this.DrawErrorMessage(containerTextToRender, [text,stack]);
    try {
      this.TaskMonitor.RequestCancel();
    } catch (err) {
      console.log(err);
    }
    throw ('----- sigh...sad face ');
  }
}