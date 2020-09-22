import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { _base_ButtonModule } from "./_baseButtonModule";

export class CloseButtonModule extends _base_ButtonModule implements IUiModule {
  RefreshUi(): void {
  }
  Init(): void {
    this.Init_BaseButtonModule();
  }
  WireEvents(): void {
    this.WireEvents_Base();
  }
}