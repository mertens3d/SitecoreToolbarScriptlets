import { IElemJacketWatcherParameters } from "./IElemJacketWatcherParameters";

export interface IJacketOfType {
    NativeElement: any;
    NodeTagName: string;
    AddWatcher(watcherParams: IElemJacketWatcherParameters);
    Click(): any;
    WaitForElement(buttonSelector: string, name?: string): Promise<IJacketOfType>;
}