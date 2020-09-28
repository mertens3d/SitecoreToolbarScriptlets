import { ModuleKey } from "../../Enums/ModuleKey";
import { UiHydrationData } from "../UiHydrationData";

export interface IUiModule {
  Hydrate(refreshData: UiHydrationData ): void;
  Init_Module(): void;
  BuildHtmlForModule(): void;
  WireEvents_Module(): void;
  RefreshUi_Module(): void;
  ModuleKey: ModuleKey;
  Friendly: string;

  ContainerSelector: string;
  ContainerUiDivElem: HTMLDivElement;
}