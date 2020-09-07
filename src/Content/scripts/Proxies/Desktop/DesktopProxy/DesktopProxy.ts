import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataDesktopState } from "../../../../../Shared/scripts/Interfaces/Data/IDataDesktopState";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IDataOneStorageOneTreeState } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState";
import { IDataOneWindowStorage } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage";
import { MiscAgent } from "../../../Agents/MiscAgent/MiscAgent";
import { RecipeRestoreDesktop } from "../../../ContentApi/Recipes/RecipeRestoreDesktop/RecipeRestoreDesktop";
import { IframeHelper } from "../../../Helpers/IframeHelper";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { ContentEditorAgent } from "../../../Agents/ContentEditorAgent/ContentEditorAgent";
import { IDataOneIframe } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneIframe";
import { DtStartBarProxy } from "../DtStartBarProxy/DtStartBarProxy";
import { ISettingsAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { SettingKey } from "../../../../../Shared/scripts/Enums/3xxx-SettingKey";

export class DesktopProxy extends LoggableBase {
  private MiscAgent: MiscAgent;
  private AssociatedDoc: IDataOneDoc;
  private _dtStartBarAgent: DtStartBarProxy;
  private __iframeHelper: IframeHelper;
  private SettingsAgent: ISettingsAgent;
  private HostedContentEditors: ContentEditorAgent[] = [];

  constructor(logger: ILoggerAgent, miscAgent: MiscAgent, associatedDoc: IDataOneDoc, settingsAgent: ISettingsAgent) {
    super(logger);

    this.Logger.InstantiateStart(DesktopProxy.name);
    this.MiscAgent = miscAgent;
    this.SettingsAgent = settingsAgent;
    this.AssociatedDoc = associatedDoc;

    this.EnrollListenerForActiveNodeChange();
    this.EnrollListenerForActiveNodeChange();
    this.Logger.InstantiateEnd(DesktopProxy.name);
  }

  private GetIframeHelper(): IframeHelper {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new IframeHelper(this.Logger);
    }
    return this.__iframeHelper;
  }
  GetDtStartBarAgent(): DtStartBarProxy {
    if (!this._dtStartBarAgent) {
      this._dtStartBarAgent = new DtStartBarProxy(this.Logger, this.AssociatedDoc);
    }

    return this._dtStartBarAgent;
  }

  async InitHostedContentEditors() {
    await this.GetIframeHelper().GetHostedIframes(this.AssociatedDoc)
      .then((foundIframes: IDataOneIframe[]) => {
        foundIframes.forEach((oneIframe) => {
          var newCeAgent = new ContentEditorAgent(oneIframe.ContentDoc, this.Logger, this.SettingsAgent);
          newCeAgent.AddListenerToActiveNodeChange(this.GetDtStartBarAgent().CallBackActiveElementChanged);
          this.HostedContentEditors.push(newCeAgent);
        })
      })
      .catch((err) => { throw (err) })
  }

  async EnrollListenerForActiveNodeChange(): Promise<void> {
    try {
      await this.GetIframeHelper().GetHostedIframes(this.AssociatedDoc)
        .then((foundIframes: IDataOneIframe[]) => {
          for (var idx = 0; idx < foundIframes.length; idx++) {
            let iframe = foundIframes[idx];
            let iframeElemId = iframe.IframeElem.id;

            //let tree = new ContentEditorContentTreeHolderProxy(this.Logger, iframe.ContentDoc);

            //start bar button is same with prefix added
            let startBarButtonElemId = 'startbar_application_' + iframeElemId;

            let querySelectBtn = '[id=' + startBarButtonElemId + ']';
            let foundStartBarButton = this.AssociatedDoc.ContentDoc.querySelector(querySelectBtn);
            if (foundStartBarButton) {
              let currentInnerHtml = document.querySelector(querySelectBtn).querySelector('div').querySelector('span').innerHTML;
              let currentInnerText = document.querySelector(querySelectBtn).querySelector('div').querySelector('span').innerText;

              let newInnerHtml = currentInnerHtml.replace(currentInnerText, 'dog');

              document.querySelector(querySelectBtn).querySelector('div').querySelector('span').innerHTML = newInnerHtml;
              //= document.querySelector('[id=startbar_application_FRAME267787985]').querySelector('div').querySelector('span').innerHTML.replace('Content Editor', 'dog')
            }
          }
        });
    } catch (err) {
      throw (err);
    }
  }

  async GetStateDesktop(): Promise<IDataDesktopState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateDesktop.name);

      this.Logger.LogAsJsonPretty(this.GetStateDesktop.name, this.AssociatedDoc);

      var toReturnDesktopState: IDataDesktopState = this.CreateNewDtDataShell();

      await this.__iframeHelper.GetHostedIframes(this.AssociatedDoc)
        .then((result) => toReturnDesktopState.HostedIframes = result)
        .then(() => {
          if (toReturnDesktopState.HostedIframes && toReturnDesktopState.HostedIframes.length > 0) {
            for (var iframeIdx = 0; iframeIdx < toReturnDesktopState.HostedIframes.length; iframeIdx++) {
              this.Logger.LogVal('iframeIdx: ', iframeIdx);

              var targetIframeObj = toReturnDesktopState.HostedIframes[iframeIdx];

              var ceAgent = new ContentEditorAgent(targetIframeObj.ContentDoc, this.Logger, this.SettingsAgent);

              //todo - should this be checking for min value. There may be a different iframe that is not ce that is top

              ceAgent.GetTreeState()
                .then((oneCeState: IDataOneStorageOneTreeState) => {
                  toReturnDesktopState.HostedContentEditors.push(oneCeState);

                  if (targetIframeObj.Zindex === 1) {
                    toReturnDesktopState.ActiveCEAgent = ceAgent;
                    toReturnDesktopState.ActiveCeState = oneCeState;
                  }
                })
                .catch((err) => this.Logger.ErrorAndThrow(this.GetStateDesktop.name, err));
            }
          }
        })
        .then(() => resolve(toReturnDesktopState))
        .catch((err) => reject(err));

      this.Logger.FuncEnd(this.GetStateDesktop.name);
    });
  }

  async RestoreDesktopState(targetDoc: IDataOneDoc, dataToRestore: IDataOneWindowStorage): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.RestoreDesktopState.name);;

      if (this.MiscAgent.NotNullOrUndefined([targetDoc, dataToRestore, dataToRestore.AllCEAr], this.RestoreDesktopState.name)) {
        for (var idx = 0; idx < dataToRestore.AllCEAr.length; idx++) {
          var recipe: RecipeRestoreDesktop = new RecipeRestoreDesktop(this.Logger, targetDoc, dataToRestore.AllCEAr[idx], this.SettingsAgent);

          await recipe.Execute()
            .then(() => this.EnrollListenerForActiveNodeChange())
            .catch((err) => reject(err));
        }

        resolve();
      } else {
        reject(this.RestoreDesktopState.name + ' bad data');
      }

      this.Logger.FuncEnd(this.RestoreDesktopState.name);
    });
  }

  CreateNewDtDataShell(): IDataDesktopState {
    var toReturn: IDataDesktopState = {
      HostedContentEditors: [],
      HostedIframes: [],
      ActiveCEAgent: null,
      ActiveCeState: null
    }

    return toReturn;
  }
}