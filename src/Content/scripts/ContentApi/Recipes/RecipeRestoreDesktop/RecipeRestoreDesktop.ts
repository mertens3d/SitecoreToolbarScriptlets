import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { FrameProxy } from '../../../../../Shared/scripts/Interfaces/Data/Proxies/FrameProxy';
import { IDataStateOfContentEditor } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState';
import { IDataStateOfFrame } from '../../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfFrame';
import { ICommandRecipes } from '../../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { MiscAgent } from '../../../Agents/MiscAgent/MiscAgent';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { DesktopStartBarProxy } from '../../../Proxies/Desktop/DesktopStartBarProxy/DesktopStartBarProxy';
import { RecipeAddNewContentEditorToDesktop } from '../RecipeAddContentEditorToDesktop/RecipeAddContentEditorToDesktop';

export class RecipeRestoreFrameOnDesktop extends LoggableBase implements ICommandRecipes {
  private MiscAgent: MiscAgent;
  private TargetDoc: IDataOneDoc;
  private DataStateOfFrame: IDataStateOfFrame;
  private RecipeBasics: RecipeBasics;
  private SettingsAgent: ISettingsAgent;
  DesktopTabButtonTabAgent: DesktopStartBarProxy;

  constructor(logger: ILoggerAgent, targetDoc: IDataOneDoc, dataStateOfFrame: IDataStateOfFrame, settingsAgent: ISettingsAgent, ceButtonTabAgent: DesktopStartBarProxy) {
    super(logger);
    this.Logger.InstantiateStart(RecipeRestoreFrameOnDesktop.name);

    this.MiscAgent = new MiscAgent(this.Logger);

    this.TargetDoc = targetDoc;
    this.DataStateOfFrame = dataStateOfFrame;
    this.SettingsAgent = settingsAgent;
    this.RecipeBasics = new RecipeBasics(this.Logger, this.SettingsAgent);
    this.DesktopTabButtonTabAgent = ceButtonTabAgent;

    this.Logger.InstantiateEnd(RecipeRestoreFrameOnDesktop.name);
  }
  async Execute(): Promise<void> {
    await this.RunOneChain();
  }

  private __restoreDataToOneIframe(oneTreeState: IDataStateOfFrame, frameProxy: FrameProxy) {
    return new Promise<void>(async (resolve, reject) => {
      this.Logger.FuncStart(this.__restoreDataToOneIframe.name);

      await frameProxy.SetStateFrame(oneTreeState)
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.__restoreDataToOneIframe.name);
    });
  }

  private async RunOneChain(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RunOneChain.name);

      if (this.MiscAgent.NotNullOrUndefined([this.TargetDoc, this.DataStateOfFrame], this.RunOneChain.name)) {
        //guaranteed to be on the correct page
        var frameProxy: FrameProxy;
        let recipeAddCe = new RecipeAddNewContentEditorToDesktop(this.Logger, this.TargetDoc, this.SettingsAgent, this.DesktopTabButtonTabAgent);

        await recipeAddCe.Execute()
          .then((result: FrameProxy) => frameProxy = result)
          .then(() => frameProxy.WaitForReady())
          .then(() => this.__restoreDataToOneIframe(this.DataStateOfFrame, frameProxy))
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