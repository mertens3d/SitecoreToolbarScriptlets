import { DocumentJacket } from "../../../../DOMJacket/scripts/Document/DocumentJacket";
import { IAPICore } from "../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IScWindowTreeProxy } from '../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { IToApiCallPayload } from "../../../../Shared/scripts/Interfaces/IApiCallPayload";
import { ICommandRecipes } from '../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { IBaseScProxy } from "../../../../Shared/scripts/Interfaces/ScProxies/IBaseScProxy";
import { _APICoreBase } from "../../../../Shared/scripts/_APICoreBase";
import { DTStartBarElemProxy } from "../../Proxies/Desktop/DesktopProxy/DesktopStartBarProxy/DTStartBarProxy";

export class RecipeAdminB extends _APICoreBase implements ICommandRecipes {
  constructor(apiCore: IAPICore, apiCallPayload: IToApiCallPayload, targetDoc: DocumentJacket, ceButtonTabAgent: DTStartBarElemProxy, scWinProxy: IScWindowTreeProxy) {
        super(apiCore);

        this.Logger.CTORStart(RecipeAdminB.name);

        this.Logger.CTOREnd(RecipeAdminB.name);
  }
  Execute(): Promise<IBaseScProxy> {
        return new Promise(async (resolve, reject) => {
            reject('not implemented');
        });
    };
}
