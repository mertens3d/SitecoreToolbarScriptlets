﻿import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";
import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { GuidData } from "../../../../../Shared/scripts/Helpers/GuidData";
import { Guid } from "../../../../../Shared/scripts/Helpers/Guid";
import { IUiModule } from "../../../../../Shared/scripts/Interfaces/Agents/IUiModule";

export class FeedbackModulePopUpState extends UiFeedbackModuleBase implements IUiModule {
  
  constructor(selector: string, loggerAgent: ILoggerAgent) {
    super(selector, loggerAgent);
  }

  Init(): void {
  }
  RefreshUi(): void {
  }

  HydratePopUpStateUI(selectSnapShot: GuidData) {
    var allStateText: string = 'Pop Up State:' + this.lineBreak;
    allStateText += 'Select Snapshot: ' + Guid.AsShort( selectSnapShot);

    this.AddHtmlString(allStateText);
  }
}