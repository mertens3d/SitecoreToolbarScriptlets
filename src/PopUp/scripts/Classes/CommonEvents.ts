import { PopUpHub } from "../Managers/PopUpHub";
import { PopUpManagerBase } from "../Managers/PopUpManagerBase";

export class CommonEvents extends PopUpManagerBase {
  constructor(hub: PopUpHub) {
    super(hub);
  }

  protected __cleardebugText() {
    this.Log().HndlrClearDebugText(this.Log());
  }

  protected __initNewOperation() {
    return new Promise((resolve, reject) => {
      this.Log().FuncStart(this.__initNewOperation.name);
      this.__cleardebugText();
      this.UiMan().ClearCancelFlag();
      this.Log().FuncEnd(this.__initNewOperation.name);

      resolve();
    });
  }
}