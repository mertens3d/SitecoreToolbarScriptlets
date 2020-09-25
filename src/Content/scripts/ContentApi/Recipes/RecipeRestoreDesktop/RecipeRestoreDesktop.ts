import { IDataStateOfDTFrame } from '../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfDTFrame';
import { ICommandHandlerDataForContent } from '../../../../../Shared/scripts/Interfaces/ICommandHandlerDataForContent';
import { ICommandRecipes } from '../../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { IDTFrameProxy } from '../../../../../Shared/scripts/Interfaces/Proxies/IDesktopProxy';
import { MiscAgent } from '../../../Agents/MiscAgent/MiscAgent';
import { RecipeAddNewContentEditorToDesktop } from '../RecipeAddContentEditorToDesktop/RecipeAddContentEditorToDesktop';
import { __RecipeBase } from '../__RecipeBase/__RecipeBase';

export class RecipeRestoreFrameOnDesktop extends __RecipeBase implements ICommandRecipes {
  private MiscAgent: MiscAgent;
  private DataStateOfFrame: IDataStateOfDTFrame;

  constructor(commandData: ICommandHandlerDataForContent, dataStateOfFrame: IDataStateOfDTFrame) {
    super(commandData);
    this.Logger.InstantiateStart(RecipeRestoreFrameOnDesktop.name);

    this.MiscAgent = new MiscAgent(this.Logger);

    this.DataStateOfFrame = dataStateOfFrame;

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

  private SetStateOfDTFrameProxy(oneTreeState: IDataStateOfDTFrame, dtFrameProxy: IDTFrameProxy) {
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
        var dtFrameProxy: IDTFrameProxy;
        let recipeAddCe = new RecipeAddNewContentEditorToDesktop(this.CommandData);

        await recipeAddCe.Execute()
          .then((result: IDTFrameProxy) => dtFrameProxy = result)
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