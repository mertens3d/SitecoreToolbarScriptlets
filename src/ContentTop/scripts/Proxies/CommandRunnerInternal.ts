import { ReplyCommandMsgFlag } from "../../../Shared/scripts/Enums/ReplyCommandMsgFlag";
import { IHindSiteScUiProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IHindSiteScUiProxy";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateOfScUi } from "../../../Shared/scripts/Interfaces/StateOf/IDataStateOfSitecoreWindow";
import { ICommandDependancies } from "../../../Shared/scripts/Interfaces/ICommandDependancies";
import { ICommandParams } from "../../../Shared/scripts/Interfaces/ICommandParams";
import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";
import { AutoSnapShotAgent } from "../Agents/AutoSnapShotAgent";
import { RecipeChangeNickName } from "../Recipes/RecipeChangeNickName";
import { RecipeForceAutoSnapShot } from "../Recipes/RecipeForceAutoSnapShot";
import { RecipeInitFromQueryStr, RecipeSetStateFromMostRecent } from "../Recipes/RecipeInitFromQueryStr";
import { RecipeRemoveItemFromStorage } from "../Recipes/RecipeRemoveItemFromStorage";
import { RecipeSaveStateManual } from "../Recipes/RecipeSaveState";
import { RecipeToggleFavorite } from "../Recipes/RecipeToggleFavorite";
import { DocumentJacket } from "../../../DOMJacket/scripts/Document/DocumentJacket";

export class CommandRunnerInternal extends _FrontBase {
    Dependancies: ICommandDependancies;

    constructor(hindeCore: IHindeCore, atticAgent: IContentAtticAgent, autoSnapShotAgent: AutoSnapShotAgent, scUiProxy: IHindSiteScUiProxy, documentJacket: DocumentJacket) {
        super(hindeCore);

        this.Dependancies = {
            AtticAgent: atticAgent,
            AutoSnapShotAgent: autoSnapShotAgent,
            ScUiProxy: scUiProxy,
            HindeCore: this.HindeCore,
            DocumentJacket: documentJacket
        };
    }


    async SetNickName(commandParams: ICommandParams): Promise<void> {
        return new Promise(async (resolve, reject) => {
            //let recipe = new RecipeForceAutoSnapShot(this.Logger, commandParams, this.Dependancies);
            let recipe = new RecipeChangeNickName(this.HindeCore, commandParams, this.Dependancies);

            recipe.Execute()
                .then(() => resolve())
                .catch((err: any) => reject(this.DebugForceAutoSnapShot.name + ' | ' + err));
        });
    }

    Ping() {
        return new Promise(async (resolve, reject) => {
            resolve(ReplyCommandMsgFlag.RespListeningAndReady);
        });
    }


    async DebugForceAutoSnapShot(commandParams: ICommandParams): Promise<void> {
        return new Promise(async (resolve, reject) => {
            let recipe = new RecipeForceAutoSnapShot(this.HindeCore, commandParams, this.Dependancies);

            recipe.Execute()
                .then(() => resolve())
                .catch((err: any) => reject(this.DebugForceAutoSnapShot.name + ' | ' + err));
        });
    }


    async SaveWindowState(commandParams: ICommandParams): Promise<void> {
        return new Promise(async (resolve, reject) => {
            let recipe = new RecipeSaveStateManual(this.HindeCore, commandParams, this.Dependancies);
            await recipe.Execute()
                .then(resolve)
                .catch((err: any) => reject(err));
        });
    }

    ToggleFavorite(commandParams: ICommandParams) {
        return new Promise(async (resolve, reject) => {
            await new RecipeToggleFavorite(this.HindeCore, commandParams, this.Dependancies).Execute()
                .then(() => resolve())
                .catch((err: any) => reject(err));
        });
    }


    async SetStateFromMostRecent(commandParams: ICommandParams): Promise<void> {
        try {
            this.Logger.FuncStart(this.SetStateFromMostRecent.name);
            let recipe = new RecipeSetStateFromMostRecent(this.HindeCore, commandParams, this.Dependancies);
            await recipe.Execute();
        }
        catch (err: any) {
            this.ErrorHand.HandleFatalError(this.SetStateFromQueryString.name, err);
        }
        this.Logger.FuncEnd(this.SetStateFromMostRecent.name);
    }


    async SetStateFromQueryString(commandParams: ICommandParams): Promise<void> {
        try {
            let recipe = new RecipeInitFromQueryStr(this.HindeCore, commandParams, this.Dependancies);
            recipe.Execute();
        }
        catch (err: any) {
            this.ErrorHand.HandleFatalError(this.SetStateFromQueryString.name, err);
        }
    }


    async RemoveSnapShot(commandParams: ICommandParams): Promise<void> {
        return new Promise(async (resolve, reject) => {
            let recipe = new RecipeRemoveItemFromStorage(this.HindeCore, commandParams, this.Dependancies);
            await recipe.Execute()
                .then(resolve)
                .catch((err: any) => reject(err));
        });
    }

    SetStateOfSitecoreWindow(commandParams: ICommandParams, dependancies: ICommandDependancies): Promise<void> {
        return new Promise(async (resolve, reject) => {
            dependancies.HindeCore.Logger.LogAsJsonPretty("IdOfSelect", commandParams.TargetSnapShotId);
            let dataOneWindowStorage: IStateOfScUi = dependancies.AtticAgent.GetFromStorageBySnapShotId(commandParams.TargetSnapShotId);

            if (dataOneWindowStorage) {
                dependancies.ScUiProxy.SetStateOfSitecoreWindowAsync(commandParams.ApiPayload, dataOneWindowStorage)
                    .then(() => resolve())
                    .catch((err: any) => reject(this.SetStateOfSitecoreWindow.name + ' | ' + err));
            };
        });
    }
}
