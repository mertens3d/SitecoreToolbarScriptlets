import { UiHydrationData } from "../UiHydrationData";
import { ModuleKey } from "../../Enums/ModuleKey";

export interface IUiModule {
  Hydrate(refreshData: UiHydrationData ): void;
  Init(): void;
  WireEvents(): void;
  RefreshUi(): void;
  ModuleKey: ModuleKey;
}