import { MiscAgent } from '../../../../Content/scripts/Agents/MiscAgent';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { IScWindowProxy } from '../../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataStateOfDTFrame } from '../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDTFrame';
import { ICommandRecipes } from '../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { LoggableBase } from '../../../../Shared/scripts/LoggableBase';
import { DTFrameProxy } from '../../Proxies/Desktop/DesktopProxy/FrameProxies/DTFrameProxy';
import { DesktopStartBarProxy } from '../../Proxies/Desktop/DesktopStartBarProxy/DesktopStartBarProxy';
import { RecipeAddNewContentEditorToDesktop } from './RecipeAddContentEditorToDesktop';

export class RecipeRestoreFrameOnDesktop extends LoggableBase implements ICommandRecipes {
  private MiscAgent: MiscAgent;
  private TargetDoc: IDataOneDoc;
  private DataStateOfFrame: IDataStateOfDTFrame;
  DesktopTabButtonTabAgent: DesktopStartBarProxy;
  private  ScWinProxy: IScWindowProxy;

  constructor(logger: ILoggerAgent, targetDoc: IDataOneDoc, dataStateOfFrame: IDataStateOfDTFrame, ceButtonTabAgent: DesktopStartBarProxy, scWinProxy: IScWindowProxy) {
    super(logger);
    this.Logger.InstantiateStart(RecipeRestoreFrameOnDesktop.name);

    this.MiscAgent = new MiscAgent(this.Logger);
    this.ScWinProxy = scWinProxy;
    this.TargetDoc = targetDoc;
    this.DataStateOfFrame = dataStateOfFrame;
    this.DesktopTabButtonTabAgent = ceButtonTabAgent;

    this.Logger.InstantiateEnd(RecipeRestoreFrameOnDesktop.name);
  }
  async Execute(): Promise<void> {
    try {
      await this.RunOneChain()
        .catch((err) => { throw (this.Execute.name + ' ' + err) });
    } catch (err) {
      throw (this.Execute.name + ' ' + err);
    }
  }

  private SetStateOfDTFrameProxy(oneTreeState: IDataStateOfDTFrame, dtFrameProxy: DTFrameProxy) {
    return new Promise<void>(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetStateOfDTFrameProxy.name);

      await dtFrameProxy.SetStateOfDTFrame(oneTreeState)
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.SetStateOfDTFrameProxy.name);
    });
  }

  private async RunOneChain(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RunOneChain.name);

      if (this.MiscAgent.NotNullOrUndefined([this.TargetDoc, this.DataStateOfFrame], this.RunOneChain.name)) {
        //guaranteed to be on the correct page
        var dtFrameProxy: DTFrameProxy;

        let recipeAddCe = new RecipeAddNewContentEditorToDesktop(this.Logger, this.ScWinProxy, this.TargetDoc); //todo - fix the null

        await recipeAddCe.Execute()
          .then((result: DTFrameProxy) => dtFrameProxy = result)
          .then(() => dtFrameProxy.OnReadyInitDTFrameProxy())
          .then(() => this.SetStateOfDTFrameProxy(this.DataStateOfFrame, dtFrameProxy))
          .then(() => resolve())
          .catch(ex => {
            reject(this.RunOneChain.name + ' ' + ex);
          });
      }
      else {
        reject(this.RunOneChain.name + ' missing data');
      }

      this.Logger.FuncEnd(this.RunOneChain.name);
    });
  }
}