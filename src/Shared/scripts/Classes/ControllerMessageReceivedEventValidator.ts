import { ScProxyDisciminator } from "../Enums/40 - ScProxyDisciminator";
import { IControllerMessageReceivedEvent_Payload } from "../Events/ContentReplyReceivedEvent/IDataContentReplyReceivedEvent_Payload";
import { IMessageContentToController_Payload } from "../Events/ContentReplyReceivedEvent/IMessageContentToController_Payload";
import { IStateOfScUi } from "../Interfaces/StateOf/IDataStateOfSitecoreWindow";
import { IWindowStateTree } from "../Interfaces/StateOf/IRootState";
import { IStateOfContentEditor } from "../Interfaces/StateOf/IStateOfContentEditor";
import { IStateOfDesktop } from "../Interfaces/StateOf/IStateOfDesktop";
import { IStateOfDTArea } from "../Interfaces/StateOf/IStateOfDTProxy";
import { IStateOfStorageSnapShots } from "../Interfaces/StateOf/IStateOfStorageSnapShots";
import { _CommonBase } from "../_CommonCoreBase";
import { DefaultControllerMessageReceivedEvent_Payload } from "./Defaults/DefaultControllerMessageReceivedEvent_Payload";
import { DefaultStateOfContentEditor } from "./Defaults/DefaultStateOfContentEditor";
import { DefaultStateOfDesktop } from "./Defaults/DefaultStateOfDesktop";
import { DefaultWindowStateTree } from "./Defaults/DefaultStateOfTree";
import { DefaultStateOfScUiProxy } from "./Defaults/DefaultStateOfScUiProxy";
import { DefaultStateOfStorageSnapshots } from "./Defaults/DefaultStateOfSnapshots";
import { StaticHelpers } from "./StaticHelpers";

export class ControllerMessageReceivedEventValidator extends _CommonBase {
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
    stateOfScUiProxy.WindowState = this.ValidateStateOfScWindowProxy(stateOfScUiProxy.WindowState);
    return stateOfScUiProxy;
  }

  private ValidateStateOfScWindowProxy(stateOfScWindow: IWindowStateTree): IWindowStateTree {
    if (!stateOfScWindow) {
      stateOfScWindow = new DefaultWindowStateTree();
    }

    let discriminator: ScProxyDisciminator = stateOfScWindow.Disciminator;

    if (discriminator === ScProxyDisciminator.ContentEditor) {
      stateOfScWindow = this.ValidateStateOfContentEditorProxy(<IStateOfContentEditor>stateOfScWindow);
    } else if (discriminator === ScProxyDisciminator.Desktop) {
      stateOfScWindow = this.ValidateStateOfDesktopProxy(<IStateOfDesktop>stateOfScWindow);
    }
    return stateOfScWindow;
  }

  private ValidateStateOfContentEditorProxy(StateOfContentEditor: IStateOfContentEditor): IStateOfContentEditor {
    if (!StateOfContentEditor) {
      StateOfContentEditor = new DefaultStateOfContentEditor();
    }
    //if (!StateOfContentEditor.ContentTree) {
    //  StateOfContentEditor.ContentTree = new DefaultStateOfContentTree();
    //}
    return StateOfContentEditor;
  }

  private ValidateStateOfDTAreaProxy(stateOfDTAreaProxy: IStateOfDTArea): IStateOfDTArea {
    if (stateOfDTAreaProxy.ActiveFrameIndex === null) {
      stateOfDTAreaProxy.ActiveFrameIndex = -1;
    }
    if (!stateOfDTAreaProxy.Children) {
      stateOfDTAreaProxy.Children = [];
    }
    return stateOfDTAreaProxy;
  }

  private ValidateStateOfDesktopProxy(StateOfDesktop: IStateOfDesktop): IStateOfDesktop {
    if (!StateOfDesktop) {
      StateOfDesktop = new DefaultStateOfDesktop();
    }
    //todo - put back StateOfDesktop.DTArea = this.ValidateStateOfDTAreaProxy(StateOfDesktop.DTArea);

    return StateOfDesktop;
  }
}