import { IControllerMessageReceivedEvent_Payload } from "../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IMessageContentToController_Payload } from "../Events/ContentReplyReceivedEvent/IMessageContentToController_Payload";
import { IStateOfScUi } from "../Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IStateOfContentEditor } from "../Interfaces/Data/States/IStateOfContentEditor";
import { IStateOfDesktop } from "../Interfaces/Data/States/IStateOfDesktop";
import { IStateOfDTArea } from "../Interfaces/Data/States/IStateOfDTProxy";
import { IRootState } from "../Interfaces/Data/States/IStateOfScWindow";
import { _HindeCoreBase } from "../_HindeCoreBase";
import { DefaultControllerMessageReceivedEvent_Payload } from "./Defaults/DefaultControllerMessageReceivedEvent_Payload";
import { DefaultStateOfContentEditor } from "./Defaults/DefaultStateOfContentEditor";
import { DefaultStateOfDesktop } from "./Defaults/DefaultStateOfDesktop";
import { DefaultStateOfScUiProxy } from "./Defaults/DefaultStateOfScUiProxy";
import { DefaultStateOfScWindow } from "./Defaults/DefaultStateOfScWindowProxy";
import { DefaultStateOfStorageSnapshots } from "./Defaults/DefaultStateOfSnapshots";
import { DefaultStateOfContentTree } from "./Defaults/DefaultStateOfContentTree";
import { IStateOfStorageSnapShots } from "../Interfaces/Data/States/IStateOfStorageSnapShots";
import { StaticHelpers } from "./StaticHelpers";
import { StateFullProxyDisciminator } from "../Enums/40 - StateFullProxyDisciminator";

export class ControllerMessageReceivedEventValidator extends _HindeCoreBase {
  TranslateAndValidatePayload(messageContentToController_Payload: IMessageContentToController_Payload): IControllerMessageReceivedEvent_Payload {
    this.Logger.FuncStart(this.TranslateAndValidatePayload.name);

    this.ErrorHand.ThrowIfNullOrUndefined(this.TranslateAndValidatePayload.name, [messageContentToController_Payload]);

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

    let validatedSnapShots: IStateOfScUi[] = [];

    stateOfStorageSnapShots.SnapShots.forEach((snapShot: IStateOfScUi) => {
      if (!StaticHelpers.IsNullOrUndefined(snapShot)) {
        validatedSnapShots.push(this.ValidateStateOfScUiProxy(snapShot));
      } else {
        this.ErrorHand.WarningAndContinue(this.ValidateStateOfStorageSnapShots.name, 'null snapshot passed in');
      }
    });

    stateOfStorageSnapShots.SnapShots = validatedSnapShots;

    return stateOfStorageSnapShots;
  }

  private ValidateStateOfScUiProxy(stateOfScUiProxy: IStateOfScUi): IStateOfScUi {
    if (!stateOfScUiProxy) {
      stateOfScUiProxy = new DefaultStateOfScUiProxy();
    }
    stateOfScUiProxy.State = this.ValidateStateOfScWindowProxy(stateOfScUiProxy.State);
    return stateOfScUiProxy;
  }

  private ValidateStateOfScWindowProxy(stateOfScWindow: IRootState): IRootState {
    if (!stateOfScWindow || ! stateOfScWindow.ScWindow) {
      stateOfScWindow = new DefaultStateOfScWindow();
    }

    let discriminator: StateFullProxyDisciminator = stateOfScWindow.ScWindow.Disciminator;

    if (discriminator === StateFullProxyDisciminator.ContentEditor) {
      stateOfScWindow.ScWindow = this.ValidateStateOfContentEditorProxy(<IStateOfContentEditor>stateOfScWindow.ScWindow);
    } else if (discriminator === StateFullProxyDisciminator.Desktop) {
      stateOfScWindow.ScWindow = this.ValidateStateOfDesktopProxy(<IStateOfDesktop>stateOfScWindow.ScWindow);
    }
    return stateOfScWindow;
  }

  private ValidateStateOfContentEditorProxy(StateOfContentEditor: IStateOfContentEditor): IStateOfContentEditor {
    if (!StateOfContentEditor) {
      StateOfContentEditor = new DefaultStateOfContentEditor();
    }
    if (!StateOfContentEditor.ContentTree) {
      StateOfContentEditor.ContentTree = new DefaultStateOfContentTree();
    }
    return StateOfContentEditor;
  }

  private ValidateStateOfDTAreaProxy(stateOfDTAreaProxy: IStateOfDTArea): IStateOfDTArea {
    if (stateOfDTAreaProxy.ActiveFrameIndex === null) {
      stateOfDTAreaProxy.ActiveFrameIndex = -1;
    }
    if (!stateOfDTAreaProxy.DTFrames) {
      stateOfDTAreaProxy.DTFrames = [];
    }
    return stateOfDTAreaProxy;
  }

  private ValidateStateOfDesktopProxy(StateOfDesktop: IStateOfDesktop): IStateOfDesktop {
    if (!StateOfDesktop) {
      StateOfDesktop = new DefaultStateOfDesktop();
    }
    StateOfDesktop.DTArea = this.ValidateStateOfDTAreaProxy(StateOfDesktop.DTArea);

    return StateOfDesktop;
  }
}