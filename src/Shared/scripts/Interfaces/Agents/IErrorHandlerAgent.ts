import { IError } from "../IError";
import { IDiscriminator } from "./IDiscriminator";

export interface IErrorHandlerAgent extends IDiscriminator{
  ErrorAndThrow(container: string, text: any): void;
  ErrorAndContinue(container: string, text: any): void;
  WarningAndContinue(container: string, text: any): void;
  ErrorStack: IError[];
  ThrowIfNullOrUndefined(title: string, objectsToCheck: any | any[]): void;
}