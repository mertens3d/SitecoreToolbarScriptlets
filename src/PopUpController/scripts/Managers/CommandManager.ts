import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { MsgFlag } from '../../../Shared/scripts/Enums/1xxx-MessageFlag';
import { MenuCommandKey } from '../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IMenuCommandDefinition } from "../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { ICommandDefinitionBucket } from '../../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket';
import { IHindSiteUiLayer } from "../../../Shared/scripts/Interfaces/IHindSiteUiLayer";
import { MessageBroker_PopUp } from '../Agents/PopUpMessagesBrokerAgent';
import { IStateOfPopUp } from "../../../Shared/scripts/Interfaces/IStateOfPopUp";
import { HandlersForInternal } from '../Classes/HandlersForInternal';
import { LoggableBase } from '../../../Shared/scripts/LoggableBase';
import { IUiCommandFlagRaisedEvent_Payload } from '../../../Shared/scripts/Events/UiCommandFlagRaisedEvent/IUiCommandFlagRaisedEvent_Payload';

export class CommandManager extends LoggableBase {
  public CommandDefinitionBucket: ICommandDefinitionBucket;
  private PopUpMsgBroker: MessageBroker_PopUp;
  private UiLayer: IHindSiteUiLayer;
  HandlersForInternal: HandlersForInternal;

  constructor(logger: ILoggerAgent, popUpMessageBroker: MessageBroker_PopUp, commandDefinitionBucket: ICommandDefinitionBucket, uiLayer: IHindSiteUiLayer, handlerInternal: HandlersForInternal) {
    super(logger);

    this.CommandDefinitionBucket = commandDefinitionBucket;
    this.PopUpMsgBroker = popUpMessageBroker;
    this.HandlersForInternal = handlerInternal;
    this.UiLayer = uiLayer;

    if (StaticHelpers.IsNullOrUndefined([this.CommandDefinitionBucket, this.PopUpMsgBroker, this.UiLayer, this.HandlersForInternal])) {
      throw (CommandManager.name + ' | null at constructor');
    }
  }

  Init_CommandManager() {
  }

  GetMenuCommandParamsByKey(needleCommand: MenuCommandKey): IMenuCommandDefinition {
    this.Logger.ThrowIfNullOrUndefined(this.GetMenuCommandParamsByKey.name, needleCommand);
    let toReturn: IMenuCommandDefinition = null;
    for (var idx = 0; idx < this.CommandDefinitionBucket.MenuCommandParamsAr.length; idx++) {
      let candidate: IMenuCommandDefinition = this.CommandDefinitionBucket.MenuCommandParamsAr[idx];
      if (candidate.MenuCommandKey === needleCommand) {
        toReturn = candidate;
        break;
      }
    }
    return toReturn;
  }

  HandleCommandTypePopUp(uiCommandFlagRaisedEvent_Payload: IUiCommandFlagRaisedEvent_Payload) {
    this.Logger.Log(this.HandleCommandTypePopUp.name + ' should be handling ' + MsgFlag[uiCommandFlagRaisedEvent_Payload.MsgFlag]);

    switch (uiCommandFlagRaisedEvent_Payload.MsgFlag) {
      case MsgFlag.ReqSetStateOfSitecoreNewWindow:
        this.HandlersForInternal.HandlerForSnapShotRestoreNewTab(uiCommandFlagRaisedEvent_Payload)
        break;
      case MsgFlag.ReqDebugClearConsole:
        console.clear();
        break;
      case MsgFlag.ReqDebugTriggerReload:
        location.reload(true);
        break;

      case MsgFlag.ReqClosePopUpWindow:
        window.close();
        break;

      default:
        this.Logger.WarningAndContinue(this.HandleCommandTypePopUp.name, 'Unhandled command');
        break
    }
  }

  async TriggerPingEventAsync(): Promise<void> {
    this.Logger.FuncStart(this.TriggerPingEventAsync.name);

    try {
      let stateOfPopUp: IStateOfPopUp = this.UiLayer.GetStateOfPopUp();

      this.PopUpMsgBroker.SendCommandToContentAsync(MsgFlag.Ping, stateOfPopUp) //todo put correct value in for null. query the ui?
    } catch (err) {
      throw (this.TriggerPingEventAsync.name + ' | ' + err);
    }

    this.Logger.FuncEnd(this.TriggerPingEventAsync.name);
  }
}