import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { MsgFlag } from '../../../Shared/scripts/Enums/1xxx-MessageFlag';
import { MenuCommandKey } from '../../../Shared/scripts/Enums/2xxx-MenuCommand';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IMenuCommandDefinition } from "../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { IMenuCommandDefinitionBucket } from '../../../Shared/scripts/Interfaces/IMenuCommandDefinitionBucket';
import { PopUpMessagesBrokerAgent } from '../Agents/PopUpMessagesBrokerAgent';

export class CommandManager extends LoggableBase {
  public MenuCommandParamsBucket: IMenuCommandDefinitionBucket;
  private PopUpMsgBroker: PopUpMessagesBrokerAgent;

  constructor(logger: ILoggerAgent, popUpMessageBroker: PopUpMessagesBrokerAgent, popupCommands: IMenuCommandDefinitionBucket) {
    super(logger);

    this.MenuCommandParamsBucket = popupCommands;
    this.PopUpMsgBroker = popUpMessageBroker;
    if (StaticHelpers.IsNullOrUndefined([this.MenuCommandParamsBucket, this.PopUpMsgBroker])) {
      throw (CommandManager.name + ' | null at constructor');
    }
   
  }

  GetMenuCommandParamsByKey(needleCommand: MenuCommandKey): IMenuCommandDefinition {
    let toReturn: IMenuCommandDefinition = null;
    for (var idx = 0; idx < this.MenuCommandParamsBucket.MenuCommandParamsAr.length; idx++) {
      let candidate: IMenuCommandDefinition = this.MenuCommandParamsBucket.MenuCommandParamsAr[idx];
      if (candidate.MenuCommandKey === needleCommand) {
        toReturn = candidate;
        break;
      }
    }
    return toReturn;
  }

  Init() {
  }


  async TriggerPingEventAsync(): Promise<void> {
    this.Logger.FuncStart(this.TriggerPingEventAsync.name);

    try {

      this.PopUpMsgBroker.SendCommandToContentImprovedAsync(MsgFlag.Ping)
    } catch (err) {
      throw (this.TriggerPingEventAsync.name + ' | ' + err);
    }

    this.Logger.FuncEnd(this.TriggerPingEventAsync.name);
  }

 
}