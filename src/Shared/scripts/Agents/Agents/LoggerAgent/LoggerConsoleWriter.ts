import { ILoggerWriter } from "../../../Interfaces/Agents/ILoggerWriter";

export class LoggerConsoleWriter implements ILoggerWriter {
  WriteText(text: string) {
        console.log(text);
    }
}
