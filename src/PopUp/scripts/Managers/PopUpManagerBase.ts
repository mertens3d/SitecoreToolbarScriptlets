import { PopUpHub } from "./PopUpHub";
import { UiManager } from "./UiManager";
import { PopUpMessagesManager } from "./PopUpMessagesManager";
import { PopUpAtticManager } from "./PopUpAtticManager";
import { PopUpDebug } from "../Classes/PopUpDebug";

import { Utilities } from "../../../Shared/scripts/Classes/Utilities";
import { GuidHelper } from "../../../Shared/scripts/Classes/GuidHelper";
import { IPopUpConst } from "../../../Shared/scripts/Interfaces/IPopUpConst";

export class PopUpManagerBase {

  PopHub: PopUpHub;

  constructor(popHub: PopUpHub) {
    this.PopHub = popHub;
  }

  Utilites(): Utilities { return this.PopHub.Utilities; }
  UiMan(): UiManager { return this.PopHub.UiMan; }
  debug(): PopUpDebug { return this.PopHub.debug; }
  PopConst(): IPopUpConst { return this.PopHub.PopUpConst; }
  MsgMan(): PopUpMessagesManager { return this.PopHub.PopMsgMan; }
  PopAtticMan(): PopUpAtticManager { return this.PopHub.PopUpAtticMan; }
  //MsgFlag(): MessageFlag { return this.PopHub.MessageFlag; }
  GuidMan(): GuidHelper { return this.PopHub.GuidMan; }

}