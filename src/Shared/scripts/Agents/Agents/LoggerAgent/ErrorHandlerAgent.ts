﻿import { IErrorHandlerAgent } from "../../../Interfaces/Agents/IErrorHandlerAgent";
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
          }
        } catch (err) {
          console.log(err);
        }

        this.ErrorAndThrow(title, 'Failed Null check');
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
        throw (title + ' Failed Null check');
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

  ErrorAndContinue(container: string, text: any): void {
    if (!container) {
      container = 'unknown';
    }

    if (!text) {
      text = 'unknown';
    }

    this.ErrorStack.push({
      ContainerFunc: container,
      ErrorString: text
    });

    this.ErrorLogger('');
    this.ErrorLogger('\t\ts) ** ERROR ** container: ' + container);
    this.ErrorLogger('');
    this.ErrorLogger('\t\t error message: ' + text);
    this.ErrorLogger('');
    this.ErrorLogger('\t\te)** ERROR container: ** ' + container);
    this.ErrorLogger('');
  }

  async ErrorLogger(text) {
    console.log('**********' + text + '**********');
  }

  ErrorAndThrow(container: string, text: any): void {
    let stack = new Error().stack;
    this.ErrorAndContinue(container, text + '   ' + stack);
    throw container + " " + text;
  }
}