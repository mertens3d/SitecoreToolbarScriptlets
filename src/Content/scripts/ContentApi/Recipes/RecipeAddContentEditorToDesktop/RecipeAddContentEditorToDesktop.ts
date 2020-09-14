﻿import { RecipeBasics } from '../../../../../Shared/scripts/Classes/RecipeBasics';
import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent, InitResultsFrameProxy } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { FrameProxy } from '../../../../../Shared/scripts/Interfaces/Data/Proxies/FrameProxy';
import { ICommandRecipes } from '../../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { DesktopStartBarProxy } from '../../../Proxies/Desktop/DesktopStartBarProxy/DesktopStartBarProxy';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { FrameHelper } from '../../../Helpers/IframeHelper';
import { CEFrameProxy } from '../../../../../Shared/scripts/Interfaces/Data/Proxies/FrameProxyForContentEditor';

export class RecipeAddNewContentEditorToDesktop extends LoggableBase implements ICommandRecipes {
  private TargetDoc: IDataOneDoc;
  private SettingsAgent: ISettingsAgent;
  DesktopTabButtonAgent: DesktopStartBarProxy;

  constructor(logger: ILoggerAgent, targetDoc: IDataOneDoc, settingsAgent: ISettingsAgent, ceButtonTabAgent: DesktopStartBarProxy) {
    super(logger);

    this.Logger.InstantiateStart(RecipeAddNewContentEditorToDesktop.name);
    this.TargetDoc = targetDoc;
    this.SettingsAgent = settingsAgent;
    this.DesktopTabButtonAgent = ceButtonTabAgent;

    this.Logger.InstantiateEnd(RecipeAddNewContentEditorToDesktop.name);
  }

  Execute(): Promise<CEFrameProxy> {
    return new Promise(async (resolve, reject) => {
      let allIframeDataAtBeginning: FrameProxy[];
      let ceframeProxy: CEFrameProxy;
      let frameHelper = new FrameHelper(this.Logger, this.SettingsAgent);
      let recipeBasics = new RecipeBasics(this.Logger, this.SettingsAgent);


      await frameHelper.GetLiveFrames(this.TargetDoc)
        .then((result) => allIframeDataAtBeginning = result)
        .catch((err) => reject(this.Execute.name + ' ' + err));


      await recipeBasics.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, this.TargetDoc)
        .then(() => recipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], this.TargetDoc))
        .then(() => recipeBasics.WaitForNewIframeContentEditor(allIframeDataAtBeginning, this.TargetDoc))
        .then((result: CEFrameProxy) => ceframeProxy = result)
        .then(() => ceframeProxy.OnReadyInitCEFrameProxy())
        .then((result: InitResultsFrameProxy) => this.Logger.LogAsJsonPretty('InitResultsFrameProxy', result))
        .then(() => resolve(ceframeProxy))
        .catch((err) => reject(this.Execute.name + ' ' + err));
    });
  }
}