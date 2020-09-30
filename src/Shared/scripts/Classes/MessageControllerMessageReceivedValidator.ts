import { DefaultControllerMessageReceivedEvent_Payload, DefaultMessageContentToController_Payload } from "./Defaults/DefaultScWindowState";
import { DefaultStateOfContentEditor } from "./Defaults/DefaultStateOfContentEditor";
import { DefaultStateOfDesktop } from "./Defaults/DefaultStateOfDesktop";
import { DefaultStateOfScUiProxy, DefaultStateOfScWindowProxy } from "./Defaults/DefaultStateOfSitecoreWindow";
import { DefaultStateOfStorageSnapshots } from "./Defaults/DefaultStateOfSnapshots";
import { DefaultStateOfContentEditorTreeProxy } from "./Defaults/DefaultStateOfTree";
import { IStateOfContentEditorProxy } from "../Interfaces/Data/States/IDataStateOfContentEditor";
import { IDataStateOfDesktopProxy } from "../Interfaces/Data/States/IDataStateOfDesktop";
import { IStateOfScUiProxy } from "../Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IStateOfStorageSnapShots } from "../Interfaces/Data/States/IDataStateOfStorageSnapShots";
import { IStateOfScWindowProxy } from "../Interfaces/Data/States/IDataStates";
import { LoggableBase } from "../LoggableBase";
import { IControllerMessageReceivedEvent_Payload, IMessageContentToController_Payload } from "../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IStateOfDTAreaProxy } from "../Interfaces/Data/States/IStateOfDTProxy";

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

  private ValidateStateOfScWindowProxy(stateOfScWindowProxy: IStateOfScWindowProxy): IStateOfScWindowProxy {
    if (!stateOfScWindowProxy) {
      stateOfScWindowProxy = new DefaultStateOfScWindowProxy();
    }
    stateOfScWindowProxy.StateOfDesktopProxy = this.ValidateStateOfDesktopProxy(stateOfScWindowProxy.StateOfDesktopProxy);
    stateOfScWindowProxy.StateOfContentEditor = this.ValidateStateOfContentEditorProxy(stateOfScWindowProxy.StateOfContentEditor);
    return stateOfScWindowProxy;
  }

  private ValidateStateOfContentEditorProxy(StateOfContentEditor: IStateOfContentEditorProxy): IStateOfContentEditorProxy {
    if (!StateOfContentEditor) {
      StateOfContentEditor = new DefaultStateOfContentEditor();
    }
    if (!StateOfContentEditor.StateOfContentEditorTreeProxy) {
      StateOfContentEditor.StateOfContentEditorTreeProxy = new DefaultStateOfContentEditorTreeProxy();
    }
    return StateOfContentEditor;
  }

  private ValidateStateOfDTAreaProxy(stateOfDTAreaProxy: IStateOfDTAreaProxy): IStateOfDTAreaProxy {
    if (stateOfDTAreaProxy.IndexOfActiveDTFrameProxy === null) {
      stateOfDTAreaProxy.IndexOfActiveDTFrameProxy = -1;
    }
    if (!stateOfDTAreaProxy.StateOfDTFrameProxies) {
      stateOfDTAreaProxy.StateOfDTFrameProxies = [];
    }
    return stateOfDTAreaProxy;
  }

  private ValidateStateOfDesktopProxy(StateOfDesktop: IDataStateOfDesktopProxy): IDataStateOfDesktopProxy {
    if (!StateOfDesktop) {
      StateOfDesktop = new DefaultStateOfDesktop();
    }
    StateOfDesktop.StateOfDTAreaProxy = this.ValidateStateOfDTAreaProxy(StateOfDesktop.StateOfDTAreaProxy);

    return StateOfDesktop;
  }
}