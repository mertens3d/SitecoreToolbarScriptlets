import { InternalCommandPayload } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { GuidData } from "../../../Shared/scripts/Helpers/GuidData";
import { LoggableBase } from "../../../HindSiteScUiProxy/scripts/Managers/LoggableBase";
import { ILoggerAgent } from "../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";

export abstract class _ContentRecipeBase extends LoggableBase {
  CommandData: InternalCommandPayload;

  TargetSnapShotId: GuidData;
  AtticAgent: IContentAtticAgent;

  constructor(logger: ILoggerAgent, commandData: InternalCommandPayload) {
    super(logger)
    this.CommandData = commandData;
    this.TargetSnapShotId = commandData.TargetSnapShotId;
    this.AtticAgent = commandData.AtticAgent;
  }
}