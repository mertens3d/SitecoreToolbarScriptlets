import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ISettingsAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IDataDesktopState } from "../../../../../Shared/scripts/Interfaces/Data/IDataDesktopState";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { IframeProxy } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneIframe";
import { IDataOneStorageOneTreeState } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneStorageOneTreeState";
import { IDataOneWindowStorage } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage";
import { CeTabButtonAgent } from "../../../Agents/CeTabButtonAgent/CeTabButtonAgent";
import { MiscAgent } from "../../../Agents/MiscAgent/MiscAgent";
import { RecipeRestoreDesktop } from "../../../ContentApi/Recipes/RecipeRestoreDesktop/RecipeRestoreDesktop";
import { IframeHelper } from "../../../Helpers/IframeHelper";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { ContentEditorProxy } from "../../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DtStartBarProxy } from "../DtStartBarProxy/DtStartBarProxy";
import { CeProxyBucket } from "./CeProxyBucket";
import { Subject_DesktopDomChangedEvent } from "./Events/DesktopDomChangedEvent/Subject_DesktopDomChangedEvent";
import { IPayloadDesktop_DomChangedEvent } from "./Events/DesktopDomChangedEvent/IPayloadContentEditorDomChanged";

export class DesktopProxy extends LoggableBase {
  private CeProxyBucket: CeProxyBucket;

  CeTabButtonAgent: CeTabButtonAgent;
  private __iframeHelper: IframeHelper;
  private _dtStartBarAgent: DtStartBarProxy;
  private AssociatedDoc: IDataOneDoc;

  private MiscAgent: MiscAgent;
  private SettingsAgent: ISettingsAgent;
  private Subject_DomChangedEvent: Subject_DesktopDomChangedEvent;

  constructor(logger: ILoggerAgent, miscAgent: MiscAgent, associatedDoc: IDataOneDoc, settingsAgent: ISettingsAgent) {
    super(logger);

    this.Logger.InstantiateStart(DesktopProxy.name);
    this.MiscAgent = miscAgent;
    this.SettingsAgent = settingsAgent;
    this.AssociatedDoc = associatedDoc;

    this.CeProxyBucket = new CeProxyBucket(this.Logger, this.AssociatedDoc, this.SettingsAgent);

    this.CeTabButtonAgent = new CeTabButtonAgent(this.Logger, this);

    
    let self = this;
    this.CeProxyBucket.EnrollProxyAddedListener((ceProxy: ContentEditorProxy) => self.CeTabButtonAgent.CallBackTreeMutated(ceProxy));

    this.Subject_DomChangedEvent = new Subject_DesktopDomChangedEvent(this.Logger, this.AssociatedDoc);

    this.Subject_DomChangedEvent.RegisterObserver((payload: IPayloadDesktop_DomChangedEvent) => { self.Observer_DesktopDomChangedEvent(payload) });

    this.CeProxyBucket.InitHostedContentEditors();

    this.Logger.InstantiateEnd(DesktopProxy.name);
  }

  Observer_DesktopDomChangedEvent(payload: IPayloadDesktop_DomChangedEvent) {
    this.Logger.Log("The desktop DOM changed - probably an iframe has been added");
    if (payload && payload.AddedIframes.length > 0) {
      payload.AddedIframes.forEach(async (iframeElement) => {
        this.Logger.LogVal('added iframe id', iframeElement.id);

        let iframeProxy: IframeProxy = new IframeProxy(this.Logger, iframeElement, iframeElement.id);
        await iframeProxy.WaitForReady()
          .then(() => this.CeProxyBucket.AddToBucketFromIframeProxy(iframeProxy))
      })
    }
    this.Logger.LogAsJsonPretty('payload', payload);
  }

  GetAssociatedDoc(): IDataOneDoc {
    return this.AssociatedDoc;
  }

  GetDtStartBarAgent(): DtStartBarProxy {
    if (!this._dtStartBarAgent) {
      this._dtStartBarAgent = new DtStartBarProxy(this.Logger, this.AssociatedDoc);
    }

    return this._dtStartBarAgent;
  }

  private GetIframeHelper(): IframeHelper {
    if (this.__iframeHelper == null) {
      this.__iframeHelper = new IframeHelper(this.Logger);
    }
    return this.__iframeHelper;
  }

  async GetStateDesktop(): Promise<IDataDesktopState> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateDesktop.name);

      this.Logger.LogAsJsonPretty(this.GetStateDesktop.name, this.AssociatedDoc);

      var toReturnDesktopState: IDataDesktopState = this.CreateNewDtDataShell();

      await this.GetIframeHelper().GetHostedIframes(this.AssociatedDoc)
        .then((result) => toReturnDesktopState.HostedIframes = result)
        .then(() => {
          if (toReturnDesktopState.HostedIframes && toReturnDesktopState.HostedIframes.length > 0) {
            for (var iframeIdx = 0; iframeIdx < toReturnDesktopState.HostedIframes.length; iframeIdx++) {
              this.Logger.LogVal('iframeIdx: ', iframeIdx);

              var iframeProxy: IframeProxy = toReturnDesktopState.HostedIframes[iframeIdx];

              var ceAgent = new ContentEditorProxy(iframeProxy.GetContentDoc(), this.Logger, this.SettingsAgent);

              //todo - should this be checking for min value. There may be a different iframe that is not ce that is top

              this.Logger.MarkerA();
              ceAgent.GetTreeState()
                .then((oneCeState: IDataOneStorageOneTreeState) => {
                  toReturnDesktopState.HostedContentEditors.push(oneCeState);

                  if (iframeProxy.GetZindex() === 1) {
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
  async SetStateDesktop(targetDoc: IDataOneDoc, dataToRestore: IDataOneWindowStorage): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetStateDesktop.name);;

      if (this.MiscAgent.NotNullOrUndefined([targetDoc, dataToRestore, dataToRestore.AllCEAr], this.SetStateDesktop.name)) {
        for (var idx = 0; idx < dataToRestore.AllCEAr.length; idx++) {
          let targetData: IDataOneStorageOneTreeState = dataToRestore.AllCEAr[idx];
          this.Logger.Log('Restoring ' + (idx + 1) + ":" + dataToRestore.AllCEAr.length + ' active node: ' + targetData.ActiveNode.NodeFriendly);
          var recipe: RecipeRestoreDesktop = new RecipeRestoreDesktop(this.Logger, targetDoc, targetData, this.SettingsAgent, this.CeTabButtonAgent);

          await recipe.Execute()
            //.then(() => this.EnrollListenerForActiveNodeChange())
            .catch((err) => reject(err));
        }

        resolve();
      } else {
        reject(this.SetStateDesktop.name + ' bad data');
      }

      this.Logger.FuncEnd(this.SetStateDesktop.name);
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