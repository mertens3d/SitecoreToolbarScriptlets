import { ModuleKey } from "../../Enums/ModuleKey";
import { UiHydrationData } from "../UiHydrationData";

export interface IUiModule {
  Hydrate(refreshData: UiHydrationData ): void;
  Init(): void;
  WireEvents_Module(): void;
  RefreshUi(): void;
  ModuleKey: ModuleKey;
}