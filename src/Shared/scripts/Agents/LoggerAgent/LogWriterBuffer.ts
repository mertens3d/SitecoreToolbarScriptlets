import { ILoggerWriter } from "../../Interfaces/Agents/ILoggerWriter";

export class LogWriterBuffer implements ILoggerWriter {
  FriendlyName: string = LogWriterBuffer.name;
  private LogPreInitBuffer: string[] = [];
  private bufferPrefix: string = '* ';

  WriteText(text: string) {
    this.LogPreInitBuffer.push(this.bufferPrefix + text);
  }

  GetBuffer(): string[] {
    let iterCheckMax = 1000;
    let toReturn: string[] = [];

    while (this.LogPreInitBuffer.length > 0 && iterCheckMax > 0) {
      iterCheckMax--;
      toReturn.push(this.LogPreInitBuffer.shift());
    }

    return toReturn;
  }
}