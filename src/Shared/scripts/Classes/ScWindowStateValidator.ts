﻿import { DefaultContentReplyPayload } from "./Defaults/DefaultScWindowState";
import { DefaultStateOfContentEditor } from "./Defaults/DefaultStateOfContentEditor";
import { DefaultStateOfDesktop } from "./Defaults/DefaultStateOfDesktop";
import { DefaultStateOfSitecoreWindow, DefaultScWindowStates } from "./Defaults/DefaultStateOfSitecoreWindow";
import { DefaultStateOfSnapshotStorage } from "./Defaults/DefaultStateOfSnapshots";
import { DefaultStateOfTree } from "./Defaults/DefaultStateOfTree";
import { IDataContentReplyReceivedEvent_Payload } from "../../../Content/scripts/Proxies/Desktop/DesktopProxy/Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IDataStateOfContentEditor } from "../Interfaces/Data/States/IDataStateOfContentEditor";
import { IDataStateOfDesktop } from "../Interfaces/Data/States/IDataStateOfDesktop";
import { IDataStateOfSitecoreWindow } from "../Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IDataStateOfStorageSnapShots } from "../Interfaces/Data/States/IDataStateOfStorageSnapShots";
import { LoggableBase } from "../../../Content/scripts/Managers/LoggableBase";
import { IDataSitecoreWindowStates } from "../Interfaces/Data/States/IDataStates";

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

    StateOfSitecoreWindow.ScWindowStates = this.ValidateScWindowStates(StateOfSitecoreWindow.ScWindowStates);

    return StateOfSitecoreWindow;
  }
  ValidateScWindowStates(ccWindowStates: IDataSitecoreWindowStates): IDataSitecoreWindowStates {
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

  ValidateStateOfDesktop(StateOfDesktop: IDataStateOfDesktop): IDataStateOfDesktop {
    if (!StateOfDesktop) {
      StateOfDesktop = new DefaultStateOfDesktop();
    }

    if (StateOfDesktop.IndexOfActiveFrame === null) {
      StateOfDesktop.IndexOfActiveFrame = -1;
    }

    if (!StateOfDesktop.StateOfDTFrames) {
      StateOfDesktop.StateOfDTFrames = [];
    }

    return StateOfDesktop;
  }
}