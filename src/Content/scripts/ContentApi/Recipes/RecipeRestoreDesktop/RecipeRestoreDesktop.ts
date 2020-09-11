import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataBucketRestoreDesktop } from '../../../../../Shared/scripts/Interfaces/Data/IDataBucketRestoreDesktop';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { FrameProxy } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneIframe';
import { IDataOneStorageOneTreeState } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState';
import { ICommandRecipes } from '../../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { ContentEditorProxy } from '../../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { MiscAgent } from '../../../Agents/MiscAgent/MiscAgent';
import { IframeHelper } from '../../../Helpers/IframeHelper';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { RecipeAddNewContentEditorToDesktop } from '../RecipeAddContentEditorToDesktop/RecipeAddContentEditorToDesktop';
import { DesktopStartBarProxy } from '../../../Proxies/Desktop/DesktopStartBarProxy/DesktopStartBarProxy';

export class RecipeRestoreDesktop extends LoggableBase implements ICommandRecipes {
  private MiscAgent: MiscAgent;
  private TargetDoc: IDataOneDoc;
  private DataToRestore: IDataOneStorageOneTreeState;
  private RecipeBasics: RecipeBasics;
  private SettingsAgent: ISettingsAgent;
  DesktopTabButtonTabAgent: DesktopStartBarProxy;

  constructor(logger: ILoggerAgent, targetDoc: IDataOneDoc, dataToRestore: IDataOneStorageOneTreeState, settingsAgent: ISettingsAgent, ceButtonTabAgent: DesktopStartBarProxy) {
    super(logger);
    this.Logger.InstantiateStart(RecipeRestoreDesktop.name);

    this.MiscAgent = new MiscAgent(this.Logger);

    this.TargetDoc = targetDoc;
    this.DataToRestore = dataToRestore;
    this.SettingsAgent = settingsAgent;
    this.RecipeBasics = new RecipeBasics(this.Logger, this.SettingsAgent);
    this.DesktopTabButtonTabAgent = ceButtonTabAgent;

    this.Logger.InstantiateEnd(RecipeRestoreDesktop.name);
  }
  async Execute(): Promise<void> {
    await this.RunOneChain();
  }

  private __restoreDataToOneIframe(oneTreeState: IDataOneStorageOneTreeState, frameProxy: FrameProxy) {
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

      if (this.MiscAgent.NotNullOrUndefined([this.TargetDoc, this.DataToRestore], this.RunOneChain.name)) {
        //guaranteed to be on the correct page
        var frameProxy: FrameProxy;
        let recipeAddCe = new RecipeAddNewContentEditorToDesktop(this.Logger, this.TargetDoc, this.SettingsAgent, this.DesktopTabButtonTabAgent);

        await recipeAddCe.Execute()
          .then((result: FrameProxy) => frameProxy = result)
          .then(() => frameProxy.WaitForReady())
          .then(() => this.__restoreDataToOneIframe(this.DataToRestore, frameProxy))
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