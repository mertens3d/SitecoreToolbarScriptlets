import { ModuleKey } from "../../Enums/ModuleKey";
import { UiHydrationData } from "../UiHydrationData";

export interface IUiModule {
  ContainerSelector: string;
  ContainerUiDivElem: HTMLDivElement;
  Friendly: string;
  ModuleKey: ModuleKey;

  BuildHtmlForModule(): void;
  Hydrate(refreshData: UiHydrationData): void;
  Init_Module(): void;
  RefreshUi_Module(): void;
  WireEvents_Module(): void;
}