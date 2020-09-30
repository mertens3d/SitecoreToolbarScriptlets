import { IControllerMessageReceivedEvent_Payload } from "../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IMessageContentToController_Payload } from "../Events/ContentReplyReceivedEvent/IMessageContentToController_Payload";
import { IStateOfScUiProxy } from "../Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IStateOfContentEditor } from "../Interfaces/Data/States/IStateOfContentEditor";
import { IStateOfDesktop } from "../Interfaces/Data/States/IStateOfDesktop";
import { IStateOfDTArea } from "../Interfaces/Data/States/IStateOfDTProxy";
import { IStateOfScWindow } from "../Interfaces/Data/States/IStateOfScWindow";
import { LoggableBase } from "../LoggableBase";
import { DefaultControllerMessageReceivedEvent_Payload } from "./Defaults/DefaultControllerMessageReceivedEvent_Payload";
import { DefaultStateOfContentEditor } from "./Defaults/DefaultStateOfContentEditor";
import { DefaultStateOfDesktop } from "./Defaults/DefaultStateOfDesktop";
import { DefaultStateOfScUiProxy } from "./Defaults/DefaultStateOfScUiProxy";
import { DefaultStateOfScWindowProxy } from "./Defaults/DefaultStateOfScWindowProxy";
import { DefaultStateOfStorageSnapshots } from "./Defaults/DefaultStateOfSnapshots";
import { DefaultStateOfContentTree } from "./Defaults/DefaultStateOfContentTree";
import { IStateOfStorageSnapShots } from "../Interfaces/Data/States/IStateOfStorageSnapShots";

export class ControllerMessageReceivedEventValidator extends LoggableBase {
  TranslateAndValidatePayload(messageContentToController_Payload: IMessageContentToController_Payload): IControllerMessageReceivedEvent_Payload {
    this.Logger.FuncStart(this.TranslateAndValidatePayload.name);

    this.Logger.ThrowIfNullOrUndefined(this.TranslateAndValidatePayload.name, [messageContentToController_Payload]);

    var controllerMessageReceivedEvent_Payload: IControllerMessageReceivedEvent_Payload = new DefaultControllerMessageReceivedEvent_Payload();

    controllerMessageReceivedEvent_Payload.StateOfScUiProxy_Live = this.ValidateStateOfScUiProxy(messageContentToController_Payload.StateOfScUiProxy_Live);

    controllerMessageReceivedEvent_Payload.StateOfStorageSnapShots = this.ValidateStateOfStorageSnapShots(messageContentToController_Payload.StateOfStorageSnapShots);

    if (!messageContentToController_Payload.ErrorStack) {
      controllerMessageReceivedEvent_Payload.ErrorStack = controllerMessageReceivedEvent_Payload.ErrorStack;
    }

    this.Logger.FuncEnd(this.TranslateAndValidatePayload.name);
    return controllerMessageReceivedEvent_Payload;
  }

  private ValidateStateOfStorageSnapShots(stateOfStorageSnapShots: IStateOfStorageSnapShots): IStateOfStorageSnapShots {
    if (!stateOfStorageSnapShots) {
      stateOfStorageSnapShots = new DefaultStateOfStorageSnapshots();
    }
    return stateOfStorageSnapShots;
  }

  private ValidateStateOfScUiProxy(stateOfScUiProxy: IStateOfScUiProxy): IStateOfScUiProxy {
    if (!stateOfScUiProxy) {
      stateOfScUiProxy = new DefaultStateOfScUiProxy();
    }
    stateOfScUiProxy.StateOfScWindowProxy = this.ValidateStateOfScWindowProxy(stateOfScUiProxy.StateOfScWindowProxy);
    return stateOfScUiProxy;
  }

  private ValidateStateOfScWindowProxy(stateOfScWindowProxy: IStateOfScWindow): IStateOfScWindow {
    if (!stateOfScWindowProxy) {
      stateOfScWindowProxy = new DefaultStateOfScWindowProxy();
    }
    stateOfScWindowProxy.StateOfDesktop = this.ValidateStateOfDesktopProxy(stateOfScWindowProxy.StateOfDesktop);
    stateOfScWindowProxy.StateOfContentEditor = this.ValidateStateOfContentEditorProxy(stateOfScWindowProxy.StateOfContentEditor);
    return stateOfScWindowProxy;
  }

  private ValidateStateOfContentEditorProxy(StateOfContentEditor: IStateOfContentEditor): IStateOfContentEditor {
    if (!StateOfContentEditor) {
      StateOfContentEditor = new DefaultStateOfContentEditor();
    }
    if (!StateOfContentEditor.StateOfContentTree) {
      StateOfContentEditor.StateOfContentTree = new DefaultStateOfContentTree();
    }
    return StateOfContentEditor;
  }

  private ValidateStateOfDTAreaProxy(stateOfDTAreaProxy: IStateOfDTArea): IStateOfDTArea {
    if (stateOfDTAreaProxy.IndexOfActiveDTFrameProxy === null) {
      stateOfDTAreaProxy.IndexOfActiveDTFrameProxy = -1;
    }
    if (!stateOfDTAreaProxy.StateOfDTFrames) {
      stateOfDTAreaProxy.StateOfDTFrames = [];
    }
    return stateOfDTAreaProxy;
  }

  private ValidateStateOfDesktopProxy(StateOfDesktop: IStateOfDesktop): IStateOfDesktop {
    if (!StateOfDesktop) {
      StateOfDesktop = new DefaultStateOfDesktop();
    }
    StateOfDesktop.StateOfDTArea = this.ValidateStateOfDTAreaProxy(StateOfDesktop.StateOfDTArea);

    return StateOfDesktop;
  }
}