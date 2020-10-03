import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IScWindowProxy } from '../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { ScDocumentProxy } from "../../Proxies/ScDocumentProxy";
import { IApiCallPayload } from "../../../../Shared/scripts/Interfaces/IApiCallPayload";
import { ICommandRecipes } from '../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { DTFrameProxy } from '../../Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy';
import { _ApiRecipeBase } from './__RecipeBase/_ApiRecipeBase';
import { DTStartBarProxy } from '../../Proxies/Desktop/DesktopProxy/DesktopStartBarProxy/DesktopStartBarProxy';

export class RecipeAdminB extends _ApiRecipeBase implements ICommandRecipes {
    constructor(hindeCore: IHindeCore, apiCallPayload: IApiCallPayload, targetDoc: ScDocumentProxy, ceButtonTabAgent: DTStartBarProxy, scWinProxy: IScWindowProxy) {
        super(hindeCore);

        this.Logger.CTORStart(RecipeAdminB.name);

        this.Logger.CTOREnd(RecipeAdminB.name);
    }
    Execute(): Promise<DTFrameProxy> {
        return new Promise(async (resolve, reject) => {
            reject('not implemented');
        });
    };
}
