import { DefaultContentReplyPayload } from "./Defaults/DefaultScWindowState";
import { DefaultStateOfContentEditor } from "./Defaults/DefaultStateOfContentEditor";
import { DefaultStateOfDesktop } from "./Defaults/DefaultStateOfDesktop";
import { DefaultStateOfLiveHindSite, DefaultScWindowStates } from "./Defaults/DefaultStateOfSitecoreWindow";
import { DefaultStateOfSnapshotStorage } from "./Defaults/DefaultStateOfSnapshots";
import { DefaultStateOfTree } from "./Defaults/DefaultStateOfTree";
import { IDataStateOfContentEditor } from "../Interfaces/Data/States/IDataStateOfContentEditor";
import { IDataStateOfDesktop } from "../Interfaces/Data/States/IDataStateOfDesktop";
import { IDataStateOfLiveHindSite } from "../Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from "../Interfaces/Data/States/IDataStateOfStorageSnapShots";
import { IDataStateOfSitecoreWindow } from "../Interfaces/Data/States/IDataStates";
import { LoggableBase } from "../LoggableBase";
import { IDataContentReplyReceivedEvent_Payload } from "../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IDataStateOfDesktopArea } from "../Interfaces/Data/States/IDataStateOfDesktopArea";

export class ScWindowStateValidator extends LoggableBase {
  ValidatePayload(payload: IDataContentReplyReceivedEvent_Payload): IDataContentReplyReceivedEvent_Payload {
    this.Logger.FuncStart(this.ValidatePayload.name);

    var defaultVal: IDataContentReplyReceivedEvent_Payload = new DefaultContentReplyPayload();

    if (!payload) {
      payload = defaultVal;
      this.Logger.ErrorAndContinue(this.ValidatePayload.name, 'Null contentState');
    }

    payload.StateOfLiveHindSite = this.ValidateStateOfSitecoreWindow(payload.StateOfLiveHindSite);
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

  ValidateStateOfSitecoreWindow(StateOfSitecoreWindow: IDataStateOfLiveHindSite): IDataStateOfLiveHindSite {
    if (!StateOfSitecoreWindow) {
      StateOfSitecoreWindow = new DefaultStateOfLiveHindSite();
    }

    StateOfSitecoreWindow.StateOfSitecoreWindow = this.ValidateScWindowStates(StateOfSitecoreWindow.StateOfSitecoreWindow);

    return StateOfSitecoreWindow;
  }
  ValidateScWindowStates(ccWindowStates: IDataStateOfSitecoreWindow): IDataStateOfSitecoreWindow {
    if (!ccWindowStates) {
      ccWindowStates = new DefaultScWindowStates();
    }

    ccWindowStates.StateOfDesktop = this.ValidateStateOfDesktop(ccWindowStates.StateOfDesktop);
    ccWindowStates.StateOfContentEditor = this.ValidateStateOfContentEditor(ccWindowStates.StateOfContentEditor);

    return ccWindowStates;
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

  ValidateStateOfDesktopArea(stateOfDesktopArea: IDataStateOfDesktopArea): IDataStateOfDesktopArea {
    if (stateOfDesktopArea.IndexOfActiveFrame === null) {
      stateOfDesktopArea.IndexOfActiveFrame = -1;
    }

    if (!stateOfDesktopArea.StateOfDTFrames) {
      stateOfDesktopArea.StateOfDTFrames = [];
    }

    return stateOfDesktopArea;
  }

  ValidateStateOfDesktop(StateOfDesktop: IDataStateOfDesktop): IDataStateOfDesktop {
    if (!StateOfDesktop) {
      StateOfDesktop = new DefaultStateOfDesktop();
    }

    StateOfDesktop.StateOfDTArea = this.ValidateStateOfDesktopArea(StateOfDesktop.StateOfDTArea);

    return StateOfDesktop;
  }
}