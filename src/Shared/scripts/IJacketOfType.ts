import { ElementJacketMutationEvent_Subject } from "../../DOMJacket/scripts/Events/ElementJacketMutationEvent/ElementJacketMutationEvent_Subject";
import { IElemJacketWatcherParameters } from "./IElemJacketWatcherParameters";

export interface IJacketOfType {
  NativeElement: HTMLElement;
  NodeTagName: string;
  AddWatcher(watcherParams: IElemJacketWatcherParameters): Promise<ElementJacketMutationEvent_Subject>;
  Click(): void;
  WaitForElement(buttonSelector: string, name?: string): Promise<IJacketOfType>;
}