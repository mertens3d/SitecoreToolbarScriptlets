import { UiHydrationData } from "../MenuCommand";
import { ModuleKey } from "../../Enums/ModuleKey";

export interface IUiModule {
  Hydrate(refreshData: UiHydrationData ): void;
  Init(): void;
  WireEvents(): void;
  RefreshUi(): void;
  ModuleKey: ModuleKey;
}