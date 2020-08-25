import { ILogWriter } from "../../../Interfaces/Agents/ILoggerWriter";

export class LoggerConsoleWriter implements ILogWriter {
  WriteText(text: string) {
        console.log(text);
    }
}
