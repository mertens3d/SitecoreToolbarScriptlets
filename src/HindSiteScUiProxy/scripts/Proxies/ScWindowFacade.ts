import { DocumentJacket } from "../../../DOMJacket/scripts/Document/DocumentJacket";
import { ScWindowTypeResolver } from "../../../Shared/scripts/Agents/UrlAgent/ScWindowTypeResolver";
import { DefaultFriendly } from "../../../Shared/scripts/Classes/Defaults/DefaultFriendly";
import { DefaultMetaData } from "../../../Shared/scripts/Classes/Defaults/DefaultMetaData";
import { DefaultStateOfScUiProxy } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfScUiProxy";
import { DefaultWindowStateTree } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfTree";
import { ReadyStateNAB } from "../../../Shared/scripts/Classes/ReadyStateNAB";
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { ScProxyDisciminator } from "../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { ScWindowType } from '../../../Shared/scripts/Enums/50 - scWindowType';
import { APICommandFlag } from "../../../Shared/scripts/Enums/APICommand";
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';
import { Guid } from '../../../Shared/scripts/Helpers/Guid';
import { IAPICore } from "../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IScWindowTreeProxy } from '../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { IScDocProxy } from "../../../Shared/scripts/Interfaces/ScProxies/IBaseScDocProxy";
import { IDataFriendly } from "../../../Shared/scripts/Interfaces/StateOf/IDataFriendly";
import { IDataMetaData } from "../../../Shared/scripts/Interfaces/StateOf/IDataMetaData";
import { IStateOfScUi } from "../../../Shared/scripts/Interfaces/StateOf/IDataStateOfSitecoreWindow";
import { IWindowStateTree } from "../../../Shared/scripts/Interfaces/StateOf/IRootState";
import { IStateOf_ } from "../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { _APICoreBase } from "../../../Shared/scripts/_APICoreBase";
import { ContentEditorDocProxy } from './ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { DesktopProxy } from './Desktop/DesktopProxy/DesktopProxy';
import { ScDocProxyResolver } from "./ScDocProxyResolver";

export class ScWindowTreeProxy extends _APICoreBase implements IScWindowTreeProxy {
  private DocumentJacket: DocumentJacket;
  private ScDocProxyResolver: ScDocProxyResolver;
  private ScPageTypeResolver: ScWindowTypeResolver;
  private TabSessionId: string;
  public RootProxy: IScDocProxy;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore);
    this.Logger.CTORStart(ScWindowTreeProxy.name);
    this.DocumentJacket = documentJacket;
    this.Instantiate();
    this.Logger.CTOREnd(ScWindowTreeProxy.name);
  }

  private Instantiate() {
    this.Logger.FuncStart([ScWindowTreeProxy.name, this.Instantiate.name]);

    this.ScPageTypeResolver = new ScWindowTypeResolver(this.ApiCore);
    this.ScDocProxyResolver = new ScDocProxyResolver(this.ApiCore);

    this.Logger.FuncEnd([ScWindowTreeProxy.name, this.Instantiate.name]);
  }

  async InstantiatetRoot(): Promise<void> {
    try {
      this.Logger.FuncStart([ScWindowTreeProxy.name, this.InstantiatetRoot.name]);

      this.TabSessionId = sessionStorage.getItem(ContentConst.Const.Storage.SessionKey);

      if (!this.TabSessionId) {
        this.TabSessionId = Guid.WithoutDashes(Guid.NewRandomGuid());
        sessionStorage.setItem(ContentConst.Const.Storage.SessionKey, this.TabSessionId);
      }

      let windowType: ScWindowType = ScWindowType.Unknown;

      await this.DocumentJacket.WaitForCompleteNAB_DocumentJacket('Window.Document') // recipesBasic.WaitForCompleteNAB_DataOneDoc(this.GetTopLevelDoc(), 'Window.Document')
        .then((result: ReadyStateNAB) => windowType = this.ScPageTypeResolver.GetScWindowType(this.DocumentJacket.UrlJacket))
        .then(() => this.ScDocProxyResolver.ScDocProxyFactoryMake(this.DocumentJacket, null))
        .then((scDocProxy: IScDocProxy) => this.RootProxy = scDocProxy)
        .then(() => this.RootProxy.InstantiateAwaitElementsTop())
        .then(() => this.RootProxy.WireEvents())
        .then(() => this.RootProxy.OnFocus())
        .catch((err: any) => this.ErrorHand.HandleFatalError(this.InstantiatetRoot.name, err));
    }
    catch (err: any) {
      this.ErrorHand.HandleFatalError(this.InstantiatetRoot.name, err);
    }

    this.Logger.FuncEnd([ScWindowTreeProxy.name, this.InstantiatetRoot.name]);
  }

  GetCurrentPageType(): ScWindowType {
    return this.ScPageTypeResolver.GetScWindowType(this.DocumentJacket.UrlJacket);
  }

  TriggerCERibbonCommand(ribbonCommand: APICommandFlag): void {
    this.Logger.FuncStart([ScWindowTreeProxy.name, this.TriggerCERibbonCommand.name]);
    if (this.RootProxy) {
      if (this.RootProxy.ScProxyDisciminator === ScProxyDisciminator.ContentEditor) {
        let contentEditorProxy: ContentEditorDocProxy = <ContentEditorDocProxy>this.RootProxy;
        if (contentEditorProxy) {
          contentEditorProxy.TriggerCERibbonCommand(ribbonCommand);
        }
      }
      else if (this.RootProxy.ScProxyDisciminator === ScProxyDisciminator.Desktop) {
        let desktopProxy: DesktopProxy = <DesktopProxy>this.RootProxy;
        if (desktopProxy) {
          desktopProxy.TriggerCERibbonCommand(ribbonCommand);
        }
      }
    }
    this.Logger.FuncEnd([ScWindowTreeProxy.name, this.TriggerCERibbonCommand.name]);
  }

  async SetCompactCss(documentJacket: DocumentJacket) {
    //await this.ContentEditorProxy.SetCompactCss();
  }

  private GetState(): Promise<IWindowStateTree> {
    return new Promise(async (resolve, reject) => {
      let toReturn: IWindowStateTree = new DefaultWindowStateTree();

      if (this.RootProxy) {
        await this.RootProxy.GetState()
          .then((stateOf_: IStateOf_) => toReturn = stateOf_)
          //.then(() => toReturn.DisciminatorFriendly = ScProxyDisciminator[toReturn.Disciminator])
          .then(() => resolve(toReturn))
          .catch((err: any) => reject(this.GetState.name + ' | ' + err));
      }
      else {
        resolve(toReturn);
      }
    });
  }

  GetStateOfScUiProxy(snapshotFlavor: SnapShotFlavor): Promise<IStateOfScUi> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfScUiProxy.name);

      let toReturnStateOfSitecoreWindow: IStateOfScUi = new DefaultStateOfScUiProxy();

      await this.GetState()
        .then((dataSitecoreWindowStates: IWindowStateTree) => toReturnStateOfSitecoreWindow.WindowState = dataSitecoreWindowStates)
        .then(() => {
          toReturnStateOfSitecoreWindow.Meta = this.PopulateMetaData(snapshotFlavor, toReturnStateOfSitecoreWindow.WindowState);
          toReturnStateOfSitecoreWindow.Friendly = this.PopulateFriendly(toReturnStateOfSitecoreWindow.Meta);
        })
        .then(() => resolve(toReturnStateOfSitecoreWindow))
        .catch((err: any) => reject(this.GetStateOfScUiProxy.name + ' | ' + err));
      this.Logger.FuncEnd(this.GetStateOfScUiProxy.name);
    });
  }

  async PublishActiveCE(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (this.GetCurrentPageType() == ScWindowType.ContentEditor) {
        await (<ContentEditorDocProxy>this.RootProxy).PublishItem()
          .then(() => resolve())
          .catch((err: any) => reject(this.PublishActiveCE.name + ' | ' + err));
      }
      else if (this.GetCurrentPageType() == ScWindowType.Desktop) {
        (<DesktopProxy>this.RootProxy).PublishItem()
          .then(() => resolve())
          .catch((err: any) => reject(this.PublishActiveCE.name + ' | ' + err));
      }
      else {
        reject(this.PublishActiveCE.name + ' Unhandled page type');
      }
    });
  }

  async SetStateOfScWin(dataToRestore: IStateOfScUi): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([ScWindowTreeProxy.name, this.SetStateOfScWin.name]);

      if (dataToRestore) {
        if (dataToRestore.Meta.WindowType == ScWindowType.Desktop) {
          if (dataToRestore.WindowState) {
            await this.RootProxy.SetState(dataToRestore.WindowState)
              .then(() => resolve())
              .catch((err: any) => reject(this.SetStateOfScWin.name + ' | ' + err));
          }
          else {
            this.ErrorHand.HandleFatalError(this.SetStateOfScWin.name, 'no states in dataToRestore');
          }
        }
        else {
          reject(this.SetStateOfScWin.name + 'Data not restored. Not in Desktop or Content Editor');
        }
      }
      else {
        this.ErrorHand.WarningAndContinue(this.SetStateOfScWin.name, " No data found to restore");
        resolve();
      }

      reject(this.ErrorHand.FormatRejectMessage([ScWindowTreeProxy.name, this.SetStateOfScWin.name], 'unknown reason'));

      this.Logger.FuncEnd([ScWindowTreeProxy.name, this.SetStateOfScWin.name]);
    });
  }

  PopulateFriendly(metadata: IDataMetaData): IDataFriendly {
    let toReturn: IDataFriendly = new DefaultFriendly();
    toReturn.WindowType = ScWindowType[metadata.WindowType];
    toReturn.TimeStamp = StaticHelpers.MakeFriendlyDate(metadata.TimeStamp);
    toReturn.Flavor = SnapShotFlavor[metadata.Flavor];
    return toReturn;
  }

  private Hash(input: string): number {
    //https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
    let hash: number = 0;
    let strLen = input.length;
    let charCode: number;

    if (strLen !== 0) {
      for (var idx = 0; idx < strLen; idx++) {
        charCode = input.charCodeAt(idx);
        hash = ((hash << 5) - hash) + charCode;
        hash = hash & hash;
      }
    }

    return hash;
  }

  PopulateMetaData(snapshotFlavor: SnapShotFlavor, stateOfScWindow: IWindowStateTree): IDataMetaData {
    let toReturn: IDataMetaData = new DefaultMetaData();
    toReturn.WindowType = this.ScPageTypeResolver.GetScWindowType(this.DocumentJacket.UrlJacket);
    toReturn.TimeStamp = new Date();
    toReturn.SessionId = this.TabSessionId;
    toReturn.Flavor = snapshotFlavor;
    toReturn.Hash = this.Hash(JSON.stringify(stateOfScWindow));
    return toReturn;
  }
}