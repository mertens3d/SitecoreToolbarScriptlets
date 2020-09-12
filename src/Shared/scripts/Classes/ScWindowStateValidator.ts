import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { IDataContentReplyPayload } from "../Interfaces/Data/IContentState";
import { IDataStateOfDesktop } from "../Interfaces/Data/IDataDesktopState";
import { IDataStateOfContentEditor } from "../Interfaces/Data/IDataOneStorageOneTreeState";
import { IDataStateOfSitecoreWindow } from "../Interfaces/Data/IDataOneWindowStorage";
import { IDataStateOfSnapShots } from "../Interfaces/Data/IDataSnapShots";
import { DefaultContentReplyPayload } from "./Defaults/DefaultScWindowState";
import { DefaultStateOfContentEditor } from "./Defaults/DefaultStateOfContentEditor";
import { DefaultStateOfDesktop } from "./Defaults/DefaultStateOfDesktop";
import { DefaultStateOfSitecoreWindow } from "./Defaults/DefaultStateOfSitecoreWindow";
import { DefaultStateOfSnapshots } from "./Defaults/DefaultStateOfSnapshots";
import { DefaultStateOfTree } from "./Defaults/DefaultStateOfTree";

export class ScWindowStateValidator extends LoggableBase {
  
  ValidatePayload(payload: IDataContentReplyPayload): IDataContentReplyPayload {
    this.Logger.FuncStart(this.ValidatePayload.name);

    var defaultVal: IDataContentReplyPayload = new DefaultContentReplyPayload();

    if (!payload) {
      payload = defaultVal;
      this.Logger.ErrorAndContinue(this.ValidatePayload.name, 'Null contentState');
    }

    payload.StateOfSitecoreWindow = this.ValidateStateOfSitecoreWindow(payload.StateOfSitecoreWindow);
    payload.StateOfSnapShots = this.ValidateStateOfSnapshots(payload.StateOfSnapShots);

    if (!payload.ErrorStack) {
      payload.ErrorStack = defaultVal.ErrorStack;
    }

    this.Logger.FuncEnd(this.ValidatePayload.name);
    return payload;
  }

  ValidateStateOfSnapshots(stateOfSnapShots: IDataStateOfSnapShots): IDataStateOfSnapShots {
    if (!stateOfSnapShots) {
      stateOfSnapShots = new DefaultStateOfSnapshots();
    }

    return stateOfSnapShots;
  }

  ValidateStateOfSitecoreWindow(StateOfSitecoreWindow: IDataStateOfSitecoreWindow): IDataStateOfSitecoreWindow {
    if (!StateOfSitecoreWindow) {
      StateOfSitecoreWindow = new DefaultStateOfSitecoreWindow();
    }

    StateOfSitecoreWindow.StateOfDesktop = this.ValidateStateOfDesktop(StateOfSitecoreWindow.StateOfDesktop);
    StateOfSitecoreWindow.StateOfContentEditor = this.ValidateStateOfContentEditor(StateOfSitecoreWindow.StateOfContentEditor);

    return StateOfSitecoreWindow;
  }

  ValidateStateOfContentEditor(StateOfContentEditor: IDataStateOfContentEditor): IDataStateOfContentEditor {
    if (!StateOfContentEditor) {
      StateOfContentEditor = new DefaultStateOfContentEditor();
    }

    if (!StateOfContentEditor.StateOfTree) {
      StateOfContentEditor.StateOfTree = new DefaultStateOfTree();
    }

    return StateOfContentEditor;
  }

  ValidateStateOfDesktop(StateOfDesktop: IDataStateOfDesktop): IDataStateOfDesktop {
    if (!StateOfDesktop) {
      StateOfDesktop = new DefaultStateOfDesktop();
    }

    if (!StateOfDesktop.IndexOfActiveFrame) {
      StateOfDesktop.IndexOfActiveFrame = -1;
    }

    if (!StateOfDesktop.StateOfFrames) {
      StateOfDesktop.StateOfFrames = [];
    }

    return StateOfDesktop;
  }
}