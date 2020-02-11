﻿import { PopUpHub } from "../Managers/PopUpHub";
import { PopUpManagerBase } from "../Managers/PopUpManagerBase";

export class CommonEvents extends PopUpManagerBase{

  constructor(hub: PopUpHub) {
    super(hub);
  }

  protected __cleardebugText() {
    this.debug().HndlrClearDebugText(this.debug());
  }

  protected __initNewOperation() {
    this.__cleardebugText();
    this.UiMan().ClearCancelFlag();
  }
}