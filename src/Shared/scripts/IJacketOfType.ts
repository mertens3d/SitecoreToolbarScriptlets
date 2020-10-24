import { ElementJacketMutationEvent_Subject } from "../../DOMJacket/scripts/Events/ElementJacketMutationEvent/ElementJacketMutationEvent_Subject";
import { IElemJacketWatcherParameters } from "./IElemJacketWatcherParameters";
import { IScVerSpec } from "./Interfaces/IScVerSpec";

export interface IJacketOfType {
  ZindexAsInt(): number;
  RaceWaitAndClick(scStartButtonVSpec: IScVerSpec): any;
  NativeElement: HTMLElement;
  NodeTagName: string;
  AddWatcher(watcherParams: IElemJacketWatcherParameters): Promise<ElementJacketMutationEvent_Subject>;
  Click(): void;
  WaitFor(buttonSelector: string, name?: string): Promise<IJacketOfType>;
} 