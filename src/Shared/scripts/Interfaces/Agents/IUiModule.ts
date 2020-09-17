import { UiRefreshData } from "../MenuCommand";

export interface IUiModule {
  Hydrate(refreshData: UiRefreshData ): void;
  Init(): void;
  RefreshUi(): void;
}