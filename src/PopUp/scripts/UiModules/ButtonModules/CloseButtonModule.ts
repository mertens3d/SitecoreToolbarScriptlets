import { IUiModule } from "../../../../Shared/scripts/Interfaces/Agents/IUiModule";
import { _baseButtonModule } from "./_baseButtonModule";

export class CloseButtonModule extends _baseButtonModule implements IUiModule {
  RefreshUi(): void {
  }
  Init(): void {
    this.Init_BaseButtonModule();
  }
  WireEvents(): void {
    this.WireEvents_Base();
  }
}