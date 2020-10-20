export interface ILoggerWriter {
  WriteText(text: string):void;
  FriendlyName: string;
}