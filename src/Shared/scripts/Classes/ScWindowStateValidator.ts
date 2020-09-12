import { ILoggerAgent } from "../Interfaces/Agents/ILoggerAgent";
import { IDataContentReplyPayload } from "../Interfaces/Data/IContentState";
import { IDataStateOfSitecoreWindow } from "../Interfaces/Data/IDataOneWindowStorage";
import { IDataStateOfDesktop } from "../Interfaces/Data/IDataDesktopState";
import { DefaultContentReplyPayload } from "./Defaults/DefaultScWindowState";
import { DefaultStateOfDesktop } from "./Defaults/DefaultStateOfDesktop";
import { DefaultStateOfSnapshots } from "./Defaults/DefaultStateOfSnapshots";
import { DefaultStateOfFrame } from "./Defaults/DefaultStateOfFrame";
import { DefaultStateOfSitecoreWindow } from "./Defaults/DefaultStateOfSitecoreWindow";
import { IDataStateOfContentEditor } from "../Interfaces/Data/IDataOneStorageOneTreeState";
import { DefaultStateOfContentEditor } from "./Defaults/DefaultStateOfContentEditor";
import { DefaultStateOfTree } from "./Defaults/DefaultStateOfTree";

export class ScWindowStateValidator {
  Logger: ILoggerAgent;

  constructor(logger: ILoggerAgent) {
    this.Logger = logger;
  }

  ValidatePayload(contentState: IDataContentReplyPayload): IDataContentReplyPayload {
    this.Logger.FuncStart(this.ValidatePayload.name);

    var defaultVal: IDataContentReplyPayload = new DefaultContentReplyPayload();

    if (!contentState) {
      contentState = defaultVal;
      this.Logger.ErrorAndContinue(this.ValidatePayload.name, 'Null contentState');
    }

    contentState.StateOfSitecoreWindow = this.ValidateStateOfSitecoreWindow(contentState.StateOfSitecoreWindow);

    if (!contentState.ErrorStack) {
      contentState.ErrorStack = defaultVal.ErrorStack;
    }

    //if (!contentState..ActiveCe) {
    //  contentState.ActiveCe = defaultVal.ActiveCe;
    //}

    this.Logger.FuncEnd(this.ValidatePayload.name);
    return contentState;
  }

  ValidateStateOfSitecoreWindow(StateOfSitecoreWindow: IDataStateOfSitecoreWindow): IDataStateOfSitecoreWindow {
    if (!StateOfSitecoreWindow) {
      StateOfSitecoreWindow = new DefaultStateOfSitecoreWindow();
    }

    StateOfSitecoreWindow.StateOfDesktop = this.ValidateStateOfDesktop(StateOfSitecoreWindow.StateOfDesktop);
    StateOfSitecoreWindow.StateOfContentEditor = this.ValidateStateOfContentEditor(StateOfSitecoreWindow.StateOfContentEditor);

    if (!StateOfSitecoreWindow.StateOfSnapShots) {
      StateOfSitecoreWindow.StateOfSnapShots = new DefaultStateOfSnapshots();
    }

    return StateOfSitecoreWindow;
  }
  ValidateStateOfContentEditor(StateOfContentEditor: IDataStateOfContentEditor): IDataStateOfContentEditor {
    if (!StateOfContentEditor) {
      StateOfContentEditor = new DefaultStateOfContentEditor();
    }

    if (!StateOfContentEditor.Id) {
      StateOfContentEditor.Id = new DefaultStateOfContentEditor().Id;
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

    if (!StateOfDesktop.StateOfActiveFrame) {
      StateOfDesktop.StateOfActiveFrame = new DefaultStateOfFrame();
    }

    if (!StateOfDesktop.StateOfFrames) {
      StateOfDesktop.StateOfFrames = [];
    }

    return StateOfDesktop;
  }
}