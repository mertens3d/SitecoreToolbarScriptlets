import { DocumentJacket } from "../../../DOMJacket/Document/DocumentJacket";
import { ScWindowTypeResolver } from "../../../Shared/scripts/Agents/UrlAgent/ScWindowTypeResolver";
import { DefaultFriendly } from "../../../Shared/scripts/Classes/Defaults/DefaultFriendly";
import { DefaultMetaData } from "../../../Shared/scripts/Classes/Defaults/DefaultMetaData";
import { DefaultStateOfScUiProxy } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfScUiProxy";
import { DefaultStateOfScWindow } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfScWindowProxy";
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { ScProxyDisciminator } from "../../../Shared/scripts/Enums/40 - ScProxyDisciminator";
import { ScWindowType } from '../../../Shared/scripts/Enums/50 - scWindowType';
import { ReadyStateNAB } from "../../../Shared/scripts/Classes/ReadyStateNAB";
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';
import { Guid } from '../../../Shared/scripts/Helpers/Guid';
import { IAPICore } from "../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IScWindowFacade } from '../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { IStateFullDocProxy } from "../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";

import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { _APICoreBase } from "../../../Shared/scripts/_APICoreBase";
import { ContentEditorDocProxy } from './ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { DesktopProxy } from './Desktop/DesktopProxy/DesktopProxy';
import { ScDocProxyResolver } from "./ScDocProxyResolver";
import { ScRibbonCommand } from "../../../Shared/scripts/Enums/eScRibbonCommand";
import { IRootState } from "../../../Shared/scripts/Interfaces/StateOf/IStateOfScWindow";
import { IStateOf_ } from "../../../Shared/scripts/Interfaces/StateOf/IStateOf_";
import { IStateOfScUi } from "../../../Shared/scripts/Interfaces/StateOf/IDataStateOfSitecoreWindow";
import { IDataFriendly } from "../../../Shared/scripts/Interfaces/StateOf/IDataFriendly";
import { IDataMetaData } from "../../../Shared/scripts/Interfaces/StateOf/IDataMetaData";

export class ScWindowFacade extends _APICoreBase implements IScWindowFacade {
  private DocumentJacket: DocumentJacket;
  private StateFullProxyFactory: ScDocProxyResolver;
  private ScPageTypeResolver: ScWindowTypeResolver;
  private TabSessionId: string;
  public StateFullProxy: IStateFullDocProxy;

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore);
    this.Logger.CTORStart(ScWindowFacade.name);
    this.DocumentJacket = documentJacket;
    this.Instantiate();
    this.Logger.CTOREnd(ScWindowFacade.name);
  }

  private Instantiate() {
    this.Logger.FuncStart([ScWindowFacade.name, this.Instantiate.name]);

    this.ScPageTypeResolver = new ScWindowTypeResolver(this.ApiCore);
    this.StateFullProxyFactory = new ScDocProxyResolver(this.ApiCore);

    this.Logger.FuncEnd([ScWindowFacade.name, this.Instantiate.name]);
  }

  async InstantiateAsyncMembers(): Promise<void> {
    try {
      this.Logger.FuncStart([ScWindowFacade.name,  this.InstantiateAsyncMembers.name]);

      this.TabSessionId = sessionStorage.getItem(ContentConst.Const.Storage.SessionKey);

      if (!this.TabSessionId) {
        this.TabSessionId = Guid.WithoutDashes(Guid.NewRandomGuid());
        sessionStorage.setItem(ContentConst.Const.Storage.SessionKey, this.TabSessionId);
      }

      let windowType: ScWindowType = ScWindowType.Unknown; 

      await this.DocumentJacket.WaitForCompleteNAB_DocumentJacket('Window.Document') // recipesBasic.WaitForCompleteNAB_DataOneDoc(this.GetTopLevelDoc(), 'Window.Document')
        .then((result: ReadyStateNAB) => windowType = this.ScPageTypeResolver.GetScWindowType(this.DocumentJacket.UrlJacket))
        .then(() => this.StateFullProxyFactory.ScDocProxyFactoryMake( this.DocumentJacket, null))
        .then((stateFullProxy: IStateFullDocProxy) => this.StateFullProxy = stateFullProxy)
        .catch((err) => this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err));
    }
    catch (err) {
      this.ErrorHand.HandleFatalError(this.InstantiateAsyncMembers.name, err);
    }

    this.Logger.FuncEnd([ScWindowFacade.name, this.InstantiateAsyncMembers.name]);
  }

  GetCurrentPageType(): ScWindowType {
    return this.ScPageTypeResolver.GetScWindowType(this.DocumentJacket.UrlJacket);
  }

  TriggerCERibbonCommand(ribbonCommand: ScRibbonCommand): void {
    this.Logger.FuncStart([ScWindowFacade.name, this.TriggerCERibbonCommand.name]);
    if (this.StateFullProxy) {
      if (this.StateFullProxy.ScProxyDisciminator === ScProxyDisciminator.ContentEditor) {
        let contentEditorProxy: ContentEditorDocProxy = <ContentEditorDocProxy>this.StateFullProxy;
        if (contentEditorProxy) {
          contentEditorProxy.TriggerCERibbonCommand(ribbonCommand);
        }
      }
      else if (this.StateFullProxy.ScProxyDisciminator === ScProxyDisciminator.Desktop) {
        let desktopProxy: DesktopProxy = <DesktopProxy>this.StateFullProxy;
        if (desktopProxy) {
          desktopProxy.TriggerCERibbonCommand(ribbonCommand);
        }
      }
    }
    this.Logger.FuncEnd([ScWindowFacade.name, this.TriggerCERibbonCommand.name]);
  }

  async SetCompactCss(documentJacket: DocumentJacket) {
    //await this.ContentEditorProxy.SetCompactCss();
  }

  private GetState(): Promise<IRootState> {
    return new Promise(async (resolve, reject) => {
      let toReturn: IRootState = new DefaultStateOfScWindow();

      if (this.StateFullProxy) {
        await this.StateFullProxy.GetState()
          .then((stateOf_: IStateOf_) => toReturn.ScWindow = stateOf_)
          .then(() => toReturn.ScWindow.DisciminatorFriendly = ScProxyDisciminator[toReturn.ScWindow.Disciminator])
          .then(() => resolve(toReturn))
          .catch((err) => reject(this.GetState.name + ' | ' + err));
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
        .then((dataSitecoreWindowStates: IRootState) => toReturnStateOfSitecoreWindow.State = dataSitecoreWindowStates)
        .then(() => {
          toReturnStateOfSitecoreWindow.Meta = this.PopulateMetaData(snapshotFlavor, toReturnStateOfSitecoreWindow.State);
          toReturnStateOfSitecoreWindow.Friendly = this.PopulateFriendly(toReturnStateOfSitecoreWindow.Meta);
        })
        .then(() => resolve(toReturnStateOfSitecoreWindow))
        .catch((err) => reject(this.GetStateOfScUiProxy.name + ' | ' + err));
      this.Logger.FuncEnd(this.GetStateOfScUiProxy.name);
    });
  }

 async PublishActiveCE():Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (this.GetCurrentPageType() == ScWindowType.ContentEditor) {
        await (<ContentEditorDocProxy>this.StateFullProxy).PublishItem()
          .then(() => resolve())
          .catch((err) => reject(this.PublishActiveCE.name + ' | ' + err));

      }
      else if (this.GetCurrentPageType() == ScWindowType.Desktop) {
        (<DesktopProxy>this.StateFullProxy).PublishItem()
          .then(() => resolve())
          .catch((err) => reject(this.PublishActiveCE.name + ' | ' + err));
      }
      else {
        reject(this.PublishActiveCE.name + ' Unhandled page type');
      }
    });
  }

  async SetStateOfScWin(dataToRestore: IStateOfScUi): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetStateOfScWin.name);

      if (dataToRestore) {
        if (dataToRestore.Meta.WindowType == ScWindowType.Desktop) {
          if (dataToRestore.State.ScWindow) {
            await this.StateFullProxy.SetState(dataToRestore.State.ScWindow)
              .then(() => resolve())
              .catch((err) => reject(this.SetStateOfScWin.name + ' | ' + err));
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

      reject(this.SetStateOfScWin.name + ' : unknown reason');

      this.Logger.FuncEnd(this.SetStateOfScWin.name);
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

  PopulateMetaData(snapshotFlavor: SnapShotFlavor, stateOfScWindow: IRootState): IDataMetaData {
    let toReturn: IDataMetaData = new DefaultMetaData();
    toReturn.WindowType = this.ScPageTypeResolver.GetScWindowType(this.DocumentJacket.UrlJacket);
    toReturn.TimeStamp = new Date();
    toReturn.SessionId = this.TabSessionId;
    toReturn.Flavor = snapshotFlavor;
    toReturn.Hash = this.Hash(JSON.stringify(stateOfScWindow));
    return toReturn;
  }
}