import { IError } from "../IError";
import { IDiscriminator } from "./IDiscriminator";

export interface IErrorHandlerAgent extends IDiscriminator{
  FormatejectMessage(arg0: string[], err: string): string;
  ErrorAndThrow(container: string | string[], text: string): void;
  ErrorAndContinue(container: string, text: any): void;
  WarningAndContinue(container: string, text: any): void;
  ErrorStack: IError[];
  ThrowIfNullOrUndefined(title: string| string[], objectsToCheck: any | any[]): void;
}