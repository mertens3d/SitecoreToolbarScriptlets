import { BaseDebug } from "../../../Shared/scripts/Classes/debug";
import { PageManagerPopUp } from "../Managers/PageManagerPopUp";

export class PopUpDebug extends BaseDebug {

  DebugPageMan(PageMan: PageManagerPopUp) {
    if (this.IsNotNullOrUndefinedBool('PageMan', PageMan)) {
      this.DebugIDataBrowserWindow(PageMan.TopLevelWindow());
    }
  }

}