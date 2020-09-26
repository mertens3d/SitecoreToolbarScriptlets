import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IScWindowProxy } from '../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IApiCallPayload } from '../../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent';
import { ICommandRecipes } from '../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { DTFrameProxy } from '../../Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy';
import { DesktopStartBarProxy } from '../../Proxies/Desktop/DesktopStartBarProxy/DesktopStartBarProxy';
import { _ApiRecipeBase } from './__RecipeBase/_ApiRecipeBase';

export class RecipeAdminB extends _ApiRecipeBase implements ICommandRecipes {
    constructor(logger: ILoggerAgent, apiCallPayload: IApiCallPayload, targetDoc: IDataOneDoc, ceButtonTabAgent: DesktopStartBarProxy, scWinProxy: IScWindowProxy) {
        super(logger);

        this.Logger.InstantiateStart(RecipeAdminB.name);

        this.Logger.InstantiateEnd(RecipeAdminB.name);
    }
    Execute(): Promise<DTFrameProxy> {
        return new Promise(async (resolve, reject) => {
            reject('not implemented');
        });
    };
}
