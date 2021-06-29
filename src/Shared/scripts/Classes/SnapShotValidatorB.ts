import { ScProxyDisciminator } from "../Enums/40 - ScProxyDisciminator";
import { IStateOfScUi } from "../Interfaces/StateOf/IDataStateOfSitecoreWindow";
import { IWindowStateTree } from "../Interfaces/StateOf/IRootState";
import { IStateOfContentEditor } from "../Interfaces/StateOf/IStateOfContentEditor";
import { IStateOfDesktop } from "../Interfaces/StateOf/IStateOfDesktop";
import { IStateOfDTArea } from "../Interfaces/StateOf/IStateOfDTProxy";
import { IStateOfStorageSnapShots } from "../Interfaces/StateOf/IStateOfStorageSnapShots";
import { _CommonBase } from "../_CommonCoreBase";
import { DefaultStateOfContentEditor } from "./Defaults/DefaultStateOfContentEditor";
import { DefaultStateOfDesktop } from "./Defaults/DefaultStateOfDesktop";
import { DefaultWindowStateTree } from "./Defaults/DefaultStateOfTree";
import { DefaultStateOfScUiProxy } from "./Defaults/DefaultStateOfScUiProxy";
import { DefaultStateOfStorageSnapshots } from "./Defaults/DefaultStateOfSnapshots";
import { StaticHelpers } from "./StaticHelpers";
import { IStateOf_ } from "../Interfaces/StateOf/IStateOf_";
import { IOneStorageData } from "../Interfaces/IOneStorageData";
import { DefaultMetaData } from "./Defaults/DefaultMetaData";
import { ScWindowType } from "../Enums/50 - scWindowType";
import { DefaultFriendly } from "./Defaults/DefaultFriendly";

export class SnapShotValidatorB extends _CommonBase {
  public ValidateStateOfStorageSnapShots(stateOfStorageSnapShots: IStateOfStorageSnapShots): IStateOfStorageSnapShots {
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


  public ValidateStorageData(oneRaw: IOneStorageData): IStateOfScUi {
    var candidate: IStateOfScUi = <IStateOfScUi>JSON.parse(oneRaw.data);

    if (candidate) {
      if (!candidate.Meta) {
        candidate.Meta = new DefaultMetaData();
      }

      candidate.Meta.TimeStamp = new Date(candidate.Meta.TimeStamp);

      if (!candidate.Meta.WindowType) {
        candidate.Meta.WindowType = ScWindowType.Unknown;
        candidate.Friendly.WindowType = ScWindowType[candidate.Meta.WindowType];
      }

      if (!candidate.Friendly) {
        candidate.Friendly = new DefaultFriendly();
      }

      if (!candidate.Friendly.NickName) {
        candidate.Friendly.NickName = '';
      }
    } else {
      this.ErrorHand.HandleFatalError(this.ValidateStorageData.name, 'Saved data did not import correctly')
    }
    return candidate
  }

  public ValidateStateOfScUiProxy(stateOfScUiProxy: IStateOfScUi): IStateOfScUi {
    if (!stateOfScUiProxy) {
      stateOfScUiProxy = new DefaultStateOfScUiProxy();
    }
    stateOfScUiProxy.WindowState = this.ValidateStateOfScWindowProxy(stateOfScUiProxy.WindowState);
    return stateOfScUiProxy;
  }

  private ValidateStateOfChildren_Recursive(stateOf: IStateOf_): IStateOf_ {
    let toReturn: IStateOf_ = stateOf;
    toReturn.Children = [];

    stateOf.Children.forEach((child: IStateOf_) => {
      if (child) {
        toReturn.Children.push(this.ValidateStateOfChildren_Recursive(child));
      }
    });

    return toReturn;
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

  private ValidateStateOfDesktopProxy(StateOfDesktop: IStateOfDesktop): IStateOfDesktop {
    if (!StateOfDesktop) {
      StateOfDesktop = new DefaultStateOfDesktop();
    }
    //todo - put back StateOfDesktop.DTArea = this.ValidateStateOfDTAreaProxy(StateOfDesktop.DTArea);
    return StateOfDesktop;
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
}