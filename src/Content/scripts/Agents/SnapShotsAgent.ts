import { LoggableBase } from "../../../HindSiteScUiProxy/scripts/Managers/LoggableBase";
import { ISnapShotsAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IContentApi";
import { InternalCommandPayload } from "../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent";
import { RecipeChangeNickName } from "../Recipes/RecipeChangeNickName";

export class SnapShotsAgent extends LoggableBase implements ISnapShotsAgent {
  async SetNickName(commandData: InternalCommandPayload): Promise<void> {
    return new Promise(async (resolve, reject) => {
      //RecipeToExecute = new RecipeChangeNickName(this.Logger, messageFromController.SnapShotNewNickname, messageFromController.SelectSnapshotId, this.AtticAgent)

      let recipe = new RecipeChangeNickName(this.Logger, commandData);

      recipe.Execute()
        .then(() => resolve())
        .catch((err) => reject(this.SetNickName.name + ' | ' + err));
    });
  }
}