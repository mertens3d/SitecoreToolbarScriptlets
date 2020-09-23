import { LoggableBase } from '../../Content/scripts/Managers/LoggableBase';
import { StaticHelpers } from '../../Shared/scripts/Classes/StaticHelpers';
import { MsgFlag } from '../../Shared/scripts/Enums/1xxx-MessageFlag';
import { MenuCommandKey } from '../../Shared/scripts/Enums/2xxx-MenuCommand';
import { ILoggerAgent } from '../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IMenuCommandDefinition } from "../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { ICommandDefinitionBucket, IUiLayer } from '../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket';
import { PopUpMessagesBrokerAgent } from '../scripts/Agents/PopUpMessagesBrokerAgent';
import { IStateOfPopUp } from "../../Shared/scripts/Interfaces/IStateOfPopUp";

export class CommandManager extends LoggableBase {
  public CommandDefinitionBucket: ICommandDefinitionBucket;
  private PopUpMsgBroker: PopUpMessagesBrokerAgent;
  private  UiLayer: IUiLayer;

  constructor(logger: ILoggerAgent, popUpMessageBroker: PopUpMessagesBrokerAgent, commandDefinitionBucket: ICommandDefinitionBucket, uiLayer:IUiLayer) {
    super(logger);

    this.CommandDefinitionBucket = commandDefinitionBucket;
    this.PopUpMsgBroker = popUpMessageBroker;
    this.UiLayer = uiLayer;


    if (StaticHelpers.IsNullOrUndefined([this.CommandDefinitionBucket, this.PopUpMsgBroker, this.UiLayer])) {
      throw (CommandManager.name + ' | null at constructor');
    }
  }

  Init_CommandManager() {
  }

  GetMenuCommandParamsByKey(needleCommand: MenuCommandKey): IMenuCommandDefinition {
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

  async TriggerPingEventAsync(): Promise<void> {
    this.Logger.FuncStart(this.TriggerPingEventAsync.name);

    try {

        
      let stateOfPopUp: IStateOfPopUp = this.UiLayer.GetStateOfPopUp();


      this.PopUpMsgBroker.SendCommandToContentImprovedAsync(MsgFlag.Ping, stateOfPopUp) //todo put correct value in for null. query the ui?
    } catch (err) {
      throw (this.TriggerPingEventAsync.name + ' | ' + err);
    }

    this.Logger.FuncEnd(this.TriggerPingEventAsync.name);
  }
}