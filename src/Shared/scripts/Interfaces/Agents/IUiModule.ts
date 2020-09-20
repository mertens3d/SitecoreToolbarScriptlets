import { UiHydrationData } from "../MenuCommand";
import { ModuleKey } from "../../Enums/ModuleKey";
import { SingleClickEvent_Subject } from "../../../../PopUp/scripts/Events/SelectSnapUiMutationEvent/SelectSnapUiMutationEvent_Subject.1";

export interface IUiModuleButton extends IUiModule{
  SingleButtonClickEvent_Subject: SingleClickEvent_Subject;

}

export interface IUiModule {
  Hydrate(refreshData: UiHydrationData ): void;
  Init(): void;
  WireEvents(): void;
  RefreshUi(): void;
  ModuleKey: ModuleKey;
}