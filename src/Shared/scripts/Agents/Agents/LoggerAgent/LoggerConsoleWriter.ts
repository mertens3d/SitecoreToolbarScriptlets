import { ILoggerWriter } from "../../../Interfaces/Agents/ILoggerWriter";

export class LoggerConsoleWriter implements ILoggerWriter {
  FriendlyName: string = LoggerConsoleWriter.name;
  WriteText(text: string) {
        console.log(text);
    }
}
