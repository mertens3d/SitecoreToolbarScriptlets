import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataDesktopState } from "../../../../Shared/scripts/Interfaces/Data/IDataDesktopState";
import { IDataOneDoc } from "../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IDataOneStorageOneTreeState } from "../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState";
import { IDataOneWindowStorage } from "../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage";
import { MiscAgent } from "../../Agents/MiscAgent/MiscAgent";
import { RecipeRestoreDesktop } from "../../ContentApi/Recipes/RecipeRestoreDesktop/RecipeRestoreDesktop";
import { IframeHelper } from "../../Helpers/IframeHelper";
import { LoggableBase } from "../../Managers/LoggableBase";
import { ContentEditorAgent } from "../ContentEditorAgent/ContentEditorAgent";
import { ContentConst } from "../../../../Shared/scripts/Interfaces/InjectConst";
import { IDataOneIframe } from "../../../../Shared/scripts/Interfaces/Data/IDataOneIframe";

export class ContentEditorContentTreeHolderAgent extends LoggableBase {
  private SelfDoc: IDataOneDoc;
  private SelfElem: HTMLElement;

  constructor(logger: ILoggerAgent, selfDoc: IDataOneDoc) {
    super(logger);
    this.SelfDoc = selfDoc;
    this.SelfElem = this.SelfDoc.ContentDoc.querySelector('[id=ContentTreeHolder]');

    this.AttachClickListener();

  }

  AttachClickListener() {
    if (this.SelfElem) {

      let observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {

          console.log((<HTMLElement>mutation.target).innerText);

        });


      });
      observer.observe(this.SelfElem, { attributes: true, subtree: true, childList: true });

      //this.SelfElem.addEventListener('click', (evt) => { alert((<HTMLElement>evt.target).innerText) });

      //use MutationObserver
    }
  }

}

export class DtStartBarAgent extends LoggableBase {
  HostDoc: IDataOneDoc;
  private __statBarElem: HTMLElement;

  constructor(logger: ILoggerAgent, hostDoc: IDataOneDoc) {
    super(logger);

    this.HostDoc = hostDoc;
  }

  GetStartBarButtonById(targetId: string) {
    return this.HostDoc.ContentDoc.querySelector('[id=' + targetId + ']');
  }

  GetStartBarElement(): HTMLElement {
    if (!this.__statBarElem) {
      this.__statBarElem = this.HostDoc.ContentDoc.querySelector(ContentConst.Const.Selector.SC.Desktop.DtStartBar)
    }

    return this.__statBarElem
  }
}

export class DesktopAgent extends LoggableBase {
  private MiscAgent: MiscAgent;
  private AssociatedDoc: IDataOneDoc;
  private _dtStartBarAgent: DtStartBarAgent;
  private __iframeHelper: IframeHelper;

  constructor(logger: ILoggerAgent, miscAgent: MiscAgent, associatedDoc: IDataOneDoc) {
    super(logger);

    this.Logger.InstantiateStart(DesktopAgent.name);
    this.MiscAgent = miscAgent;
    this.AssociatedDoc = associatedDoc;

    this.NameDesktopButtons();
    this.Logger.InstantiateEnd(DesktopAgent.name);
  }

  private GetIframeHelper(): IframeHelper {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new IframeHelper(this.Logger);
    }
    return this.__iframeHelper;
  }
  GetDtStartBarAgent(): DtStartBarAgent {
    if (!this._dtStartBarAgent) {
      this._dtStartBarAgent = new DtStartBarAgent(this.Logger, this.AssociatedDoc);
    }

    return this._dtStartBarAgent;
  }

  async NameDesktopButtons(): Promise<void> {
    try {
      await this.GetIframeHelper().GetHostedIframes(this.AssociatedDoc)
        .then((foundIframes: IDataOneIframe[]) => {
          for (var idx = 0; idx < foundIframes.length; idx++) {
            let iframe = foundIframes[idx];
            let iframeElemId = iframe.IframeElem.id;

            let tree = new ContentEditorContentTreeHolderAgent(this.Logger, iframe.ContentDoc);

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

              var ceAgent = new ContentEditorAgent(targetIframeObj.ContentDoc, this.Logger);

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
          var recipe: RecipeRestoreDesktop = new RecipeRestoreDesktop(this.Logger, targetDoc, dataToRestore.AllCEAr[idx]);

          await recipe.Execute()
            .then(() => this.NameDesktopButtons())
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