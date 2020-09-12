import { DefaultContentReplyPayload } from "./Defaults/DefaultScWindowState";
import { DefaultStateOfContentEditor } from "./Defaults/DefaultStateOfContentEditor";
import { DefaultStateOfDesktop } from "./Defaults/DefaultStateOfDesktop";
import { DefaultStateOfSitecoreWindow } from "./Defaults/DefaultStateOfSitecoreWindow";
import { DefaultStateOfSnapshotStorage } from "./Defaults/DefaultStateOfSnapshots";
import { DefaultStateOfTree } from "./Defaults/DefaultStateOfTree";
import { IDataContentReplyReceivedEvent_Payload } from "../Interfaces/Events/IDataContentReplyReceivedEvent_Payload";
import { IDataStateOfContentEditor } from "../Interfaces/Data/States/IDataStateOfContentEditor";
import { IDataStateOfDesktop } from "../Interfaces/Data/States/IDataStateOfDesktop";
import { IDataStateOfSitecoreWindow } from "../Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from "../Interfaces/Data/States/IDataStateOfStorageSnapShots";
import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";

export class ScWindowStateValidator extends LoggableBase {
  
  ValidatePayload(payload: IDataContentReplyReceivedEvent_Payload): IDataContentReplyReceivedEvent_Payload {
    this.Logger.FuncStart(this.ValidatePayload.name);

    var defaultVal: IDataContentReplyReceivedEvent_Payload = new DefaultContentReplyPayload();

    if (!payload) {
      payload = defaultVal;
      this.Logger.ErrorAndContinue(this.ValidatePayload.name, 'Null contentState');
    }

    payload.StateOfSitecoreWindow = this.ValidateStateOfSitecoreWindow(payload.StateOfSitecoreWindow);
    payload.StateOfStorageSnapShots = this.ValidateStateOfSnapshots(payload.StateOfStorageSnapShots);

    if (!payload.ErrorStack) {
      payload.ErrorStack = defaultVal.ErrorStack;
    }

    this.Logger.FuncEnd(this.ValidatePayload.name);
    return payload;
  }

  ValidateStateOfSnapshots(stateOfSnapShots: IDataStateOfStorageSnapShots): IDataStateOfStorageSnapShots {
    if (!stateOfSnapShots) {
      stateOfSnapShots = new DefaultStateOfSnapshotStorage();
    }

    return stateOfSnapShots;
  }

  ValidateStateOfSitecoreWindow(StateOfSitecoreWindow: IDataStateOfSitecoreWindow): IDataStateOfSitecoreWindow {
    if (!StateOfSitecoreWindow) {
      StateOfSitecoreWindow = new DefaultStateOfSitecoreWindow();
    }

    StateOfSitecoreWindow.States.StateOfDesktop = this.ValidateStateOfDesktop(StateOfSitecoreWindow.States.StateOfDesktop);
    StateOfSitecoreWindow.States.StateOfContentEditor = this.ValidateStateOfContentEditor(StateOfSitecoreWindow.States.StateOfContentEditor);

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