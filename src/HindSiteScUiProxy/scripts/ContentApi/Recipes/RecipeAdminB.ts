import { IHindeCore } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IScWindowProxy } from '../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IApiCallPayload } from "../../../../Shared/scripts/Interfaces/IApiCallPayload";
import { ICommandRecipes } from '../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { DTFrameProxy } from '../../Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy';
import { _ApiRecipeBase } from './__RecipeBase/_ApiRecipeBase';
import { DTStartBarProxy } from '../../Proxies/Desktop/DesktopProxy/DesktopStartBarProxy/DesktopStartBarProxy';

export class RecipeAdminB extends _ApiRecipeBase implements ICommandRecipes {
    constructor(hindeCore: IHindeCore, apiCallPayload: IApiCallPayload, targetDoc: IDataOneDoc, ceButtonTabAgent: DTStartBarProxy, scWinProxy: IScWindowProxy) {
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
