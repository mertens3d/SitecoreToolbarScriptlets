import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataBucketRestoreDesktop } from '../../../../../Shared/scripts/Interfaces/Data/IDataBucketRestoreDesktop';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataOneIframe } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneIframe';
import { IDataOneStorageOneTreeState } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState';
import { ICommandRecipes } from '../../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { ContentEditorAgent } from '../../../Agents/ContentEditorAgent/ContentEditorAgent';
import { MiscAgent } from '../../../Agents/MiscAgent/MiscAgent';
import { IframeHelper } from '../../../Helpers/IframeHelper';
import { LoggableBase } from '../../../Managers/LoggableBase';

export class RecipeRestoreDesktop extends LoggableBase implements ICommandRecipes {
  private MiscAgent: MiscAgent;
  private TargetDoc: IDataOneDoc;
  private DataToRestore: IDataOneStorageOneTreeState;
  private  RecipeBasics: RecipeBasics;
  private  SettingsAgent: ISettingsAgent;

  constructor(logger: ILoggerAgent, targetDoc: IDataOneDoc, dataToRestore: IDataOneStorageOneTreeState, settingsAgent: ISettingsAgent) {
    super(logger);
    this.Logger.FuncStart(RecipeRestoreDesktop.name);

    this.MiscAgent = new MiscAgent(this.Logger);

    this.TargetDoc = targetDoc;
    this.DataToRestore = dataToRestore;
    this.RecipeBasics = new RecipeBasics(this.Logger);
    this.SettingsAgent = settingsAgent;

    this.Logger.FuncEnd(RecipeRestoreDesktop.name);
  }
  async Execute(): Promise<void> {
    await this.RunOneChain();
  }

  private __waitForAndClickRedStartButton(targetDoc: IDataOneDoc) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      this.Logger.FuncStart(this.__waitForAndClickRedStartButton.name);

      if (this.MiscAgent.NotNullOrUndefined(targetDoc, this.__waitForAndClickRedStartButton.name)) {
        this.Logger.MarkerB();

        await this.RecipeBasics.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, targetDoc)
          .then(() => resolve())
          .catch((ex) => reject(ex));
      } else {
        reject(this.__waitForAndClickRedStartButton.name + ' something was null or undefined');
      }
      this.Logger.FuncEnd(this.__waitForAndClickRedStartButton.name);
    });
  }

  private __waitForIframeReady(targetIframe: IDataOneIframe) {
    return new Promise<void>(async (resolve, reject) => {
      this.Logger.FuncStart(this.__waitForIframeReady.name, 'targetIframe not null: ' + (targetIframe !== null));

      await this.RecipeBasics.WaitForReadyIframe(targetIframe)
        .then(() => {
          targetIframe.ContentDoc.ContentDoc = targetIframe.IframeElem.contentDocument;
          this.Logger.LogAsJsonPretty(this.__waitForIframeReady.name, targetIframe);

          resolve();
        })
        .catch((err) => {
          this.Logger.Log('rejected ! : ');
          reject(this.__waitForIframeReady.name + ' ' + err);
        })

      this.Logger.FuncEnd(this.__waitForIframeReady.name);
    });
  }

  private __waitForAndThenClickCEFromMenu(targetDoc: IDataOneDoc) {
    return new Promise<IDataBucketRestoreDesktop>(async (resolve, reject) => {
      await this.RecipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], targetDoc)
        .then(() => { resolve(); })
        .catch((ex) => { reject(this.__waitForAndThenClickCEFromMenu.name + ' ' + ex); });
    });
  }

  private __restoreDataToOneIframe(oneTreeState: IDataOneStorageOneTreeState, targetCeAgent: ContentEditorAgent) {
    return new Promise<void>(async (resolve, reject) => {
      this.Logger.FuncStart(this.__restoreDataToOneIframe.name);

      await targetCeAgent.RestoreDataToOneIframeWorker(oneTreeState)
        .then(() => resolve())
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.__restoreDataToOneIframe.name);
    });
  }

  private async RunOneChain(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RunOneChain.name);

      if (this.MiscAgent.NotNullOrUndefined([this.TargetDoc,this.DataToRestore], this.RunOneChain.name)) {
        var dataBucket: IDataBucketRestoreDesktop = {
          targetDoc: this.TargetDoc,
          IFramesbefore: allIframeDataAtBeginning,
          oneTreeState: this.DataToRestore,
          LastChainLinkSuccessful: false,
        }
        //guaranteed to be on the correct page

        var allIframeDataAtBeginning: IDataOneIframe[];
        var targetCeAgent: ContentEditorAgent;
        let iframeHelper = new IframeHelper(this.Logger);

        await iframeHelper.GetHostedIframes(this.TargetDoc)
          .then((result) => allIframeDataAtBeginning = result)
          .then(() => this.__waitForAndClickRedStartButton(dataBucket.targetDoc))
          .then(() => this.__waitForAndThenClickCEFromMenu(dataBucket.targetDoc))

          .then(() => this.RecipeBasics.WaitForNewIframe(allIframeDataAtBeginning, dataBucket.targetDoc))

          .then((result) => {
            targetCeAgent = new ContentEditorAgent(result.ContentDoc, this.Logger,this.SettingsAgent);
            this.__waitForIframeReady(result);
          })
          .then(() => this.__restoreDataToOneIframe(this.DataToRestore, targetCeAgent))
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