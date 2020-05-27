import { IGuid } from "../IGuid";
import { IDataOneDoc } from "../IDataOneDoc";
import { IError } from "../IError";

export interface ILoggerAgentBase {
  HndlrClearDebugText(self: ILoggerAgentBase): void
  HndlrClearDebugText(self: ILoggerAgentBase, verify: boolean ): void
  DebugIDataOneDoc(targetDoc: IDataOneDoc);
  DebugIGuid(Id: IGuid);
  EnabledStatus();
  Error(container, text);
  ErrorStack: IError[];
  AddDebugTextChangedCallback(caller: any, callback: Function): void
  FuncEnd(text, optionalValueInput: string | number);
  FuncEnd(text, optionalValueInput?: number);
  FuncEnd(text, optionalValueInput?: string);
  FuncStart(textOrFunc: string, optionalValue: number | string): void;
  FuncStart(textOrFunc: string, optionalValue?: number): void;
  FuncStart(textOrFunc: string, optionalValue?: string): void;
  Init(valueToUse: boolean);
  IsNotNullOrUndefinedBool(title: string, dataToCheck: any);
  IsNullOrUndefined(dataToCheck: any): string;
  Log(text);
  Log(text, optionalValue: string);
  Log(text, optionalValue: string, hasPrefix: boolean);
  LogAsJsonPretty(texValName: string, jsonObj: any);
  LogVal(textValName: string, textVal: string | boolean | number | IGuid): any;
  MarkerA();
  MarkerB();
  MarkerC();
  MarkerD();
  SetEnabled(arg0: boolean);
}