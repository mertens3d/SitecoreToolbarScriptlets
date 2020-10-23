import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IScWindowFacade } from '../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { IToApiCallPayload } from "../../../../Shared/scripts/Interfaces/IApiCallPayload";
import { ICommandRecipes } from '../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { DTStartBarElemProxy } from "../../Proxies/Desktop/DesktopProxy/DesktopStartBarProxy/DTStartBarProxy";
import { DTFrameProxy } from '../../Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy';

export class RecipeAdminB extends _APICoreBase implements ICommandRecipes {
  constructor(apiCore: IAPICore, apiCallPayload: IToApiCallPayload, targetDoc: DocumentJacket, ceButtonTabAgent: DTStartBarElemProxy, scWinProxy: IScWindowFacade) {
        super(apiCore);

        this.Logger.CTORStart(RecipeAdminB.name);

        this.Logger.CTOREnd(RecipeAdminB.name);
    }
    Execute(): Promise<DTFrameProxy> {
        return new Promise(async (resolve, reject) => {
            reject('not implemented');
        });
    };
}
