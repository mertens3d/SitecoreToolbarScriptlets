import { DefaultStateOfScUiProxy } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfScUiProxy";
import { DefaultStateOfScWindowProxy } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfScWindowProxy";
import { DefaultMetaData } from "../../../Shared/scripts/Classes/Defaults/DefaultMetaData";
import { DefaultFriendly } from "../../../Shared/scripts/Classes/Defaults/DefaultFriendly";
import { RecipeBasics } from '../../../Shared/scripts/Classes/RecipeBasics';
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { ReadyStateNAB } from '../../../Shared/scripts/Enums/ReadyState';
import { ScWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';
import { Guid } from '../../../Shared/scripts/Helpers/Guid';
import { ILoggerAgent } from '../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { InitReportScWindowManager } from "../../../Shared/scripts/Interfaces/Agents/InitResultsScWindowManager";
import { IScUrlAgent } from '../../../Shared/scripts/Interfaces/Agents/IScUrlAgent/IScUrlAgent';
import { IScWindowProxy } from '../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { ISettingsAgent } from '../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IDataOneDoc } from '../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataFriendly } from '../../../Shared/scripts/Interfaces/Data/States/IDataFriendly';
import { IDataMetaData } from '../../../Shared/scripts/Interfaces/Data/States/IDataMetaData';
import { IStateOfContentEditor } from '../../../Shared/scripts/Interfaces/Data/States/IStateOfContentEditor';
import { IStateOfDesktop } from '../../../Shared/scripts/Interfaces/Data/States/IStateOfDesktop';
import { IStateOfScUiProxy } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IStateOfScWindow } from '../../../Shared/scripts/Interfaces/Data/States/IStateOfScWindow';
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { LoggableBase } from '../../../Shared/scripts/LoggableBase';
import { ContentEditorProxy } from './ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { DesktopProxy } from './Desktop/DesktopProxy/DesktopProxy';

export class ScWindowProxy extends LoggableBase implements IScWindowProxy {
  private ScUrlAgent: IScUrlAgent;
  private TopDoc: IDataOneDoc;
  SettingsAgent: ISettingsAgent;
  TabSessionId: string;
  ContentEditorProxy: ContentEditorProxy;
  DesktopProxy: DesktopProxy;
  InitReportScWindowManager: InitReportScWindowManager;

  constructor(logger: ILoggerAgent, scUrlAgent: IScUrlAgent) {
    super(logger);
    this.Logger.CTORStart(ScWindowProxy.name);
    this.ScUrlAgent = scUrlAgent;
    this.Logger.CTOREnd(ScWindowProxy.name);
  }

  PublishActiveCE() {
    return new Promise(async (resolve, reject) => {
      if (this.GetCurrentPageType() == ScWindowType.ContentEditor) {
        await this.ContentEditorProxy.PublishItem()
          .then(() => resolve());
      } else if (this.GetCurrentPageType() == ScWindowType.Desktop) {
        this.DesktopProxy.PublishItem()
          .then(() => resolve())
          .catch((err) => reject(this.PublishActiveCE.name + ' | ' + err));
      } else {
        reject(this.PublishActiveCE.name + ' Unhandled page type');
      }
    });
  }

  Init() {
    this.TabSessionId = sessionStorage.getItem(ContentConst.Const.Storage.SessionKey);

    if (!this.TabSessionId) {
      this.TabSessionId = Guid.WithoutDashes(Guid.NewRandomGuid());
      sessionStorage.setItem(ContentConst.Const.Storage.SessionKey, this.TabSessionId);
    }
  }

  async Instantiate_ScWindowProxy(): Promise<void> {
    try {
      this.Logger.FuncStart(this.Instantiate_ScWindowProxy.name);
      let recipesBasic = new RecipeBasics(this.Logger);
      this.InitReportScWindowManager = new InitReportScWindowManager();

      await recipesBasic.WaitForCompleteNABDataOneDoc(this.GetTopLevelDoc(), 'Window.Document')

        .then((result: ReadyStateNAB) => {
          if (this.ScUrlAgent.GetScWindowType() === ScWindowType.Desktop) {
            this.DesktopProxy = new DesktopProxy(this.Logger, this.GetTopLevelDoc());
            this.DesktopProxy.Instantiate_DesktopProxy()
              .then(() => this.DesktopProxy.WireEvents_DesktopProxy())
          }
        })
        .then(() => {
          if (this.ScUrlAgent.GetScWindowType() === ScWindowType.ContentEditor) {
            this.ContentEditorProxy = new ContentEditorProxy(this.Logger, this.GetTopLevelDoc(), 'Solo Content Editor doc');
            this.ContentEditorProxy.Instantiate_ContentEditorProxy()
              .then(() => this.ContentEditorProxy.WireEvents_ContentEditorProxy())
          }
        })

        .catch((err) => this.Logger.ErrorAndThrow(this.Instantiate_ScWindowProxy.name, err));
    } catch (err) {
      this.Logger.ErrorAndThrow(this.Instantiate_ScWindowProxy.name, err);
    }

    this.Logger.FuncEnd(this.Instantiate_ScWindowProxy.name);
  }

  //async GetCurrentStateByPageType(scWindowType: ScWindowType): Promise<IStateOfContentEditorProxy> {
  //  return new Promise(async (resolve, reject) => {
  //    this.Logger.FuncStart(this.GetCurrentStateByPageType.name, StaticHelpers.ScWindowTypeFriendly(scWindowType));
  //    let toReturn: IStateOfContentEditorProxy = null;

  //      if (scWindowType === ScWindowType.Desktop) {
  //        let dtResult;

  //        await this.DesktopProxy.GetStateOfDesktop()
  //          .then((result) => {
  //            dtResult = result;

  //            if (dtResult.ActiveCEAgent) {
  //              toReturn = dtResult.ActiveCEAgent.GetStateTree();
  //            }
  //          })
  //          .then(() => resolve(toReturn))
  //          .catch((err) => this.Logger.ErrorAndThrow(this.GetCurrentStateByPageType.name, err));
  //      }

  //      else if (scWindowType === ScWindowType.ContentEditor) {
  //        await this.ContentEditorProxy.GetStateOfContentEditorProxy()
  //          .then((stateOfContentEditorProxy: IStateOfContentEditorProxy) => toReturn = stateOfContentEditorProxy)
  //          .catch((err) => this.Logger.ErrorAndThrow(this.GetCurrentStateByPageType.name, err));
  //      }
  //      else if (scWindowType === ScWindowType.LoginPage
  //        || scWindowType === ScWindowType.Launchpad
  //        || scWindowType === ScWindowType.Edit
  //        || scWindowType === ScWindowType.Preview
  //        || scWindowType === ScWindowType.Normal) {
  //      }
  //      else {
  //        this.Logger.ErrorAndThrow(this.GetCurrentStateByPageType.name, 'unknown page type ' + StaticHelpers.ScWindowTypeFriendly(scWindowType));
  //    }

  //    this.Logger.FuncEnd(this.GetCurrentStateByPageType.name);
  //  });
  //}

  GetCurrentPageType(): ScWindowType {
    return this.ScUrlAgent.GetScWindowType()
  }

  GetTopLevelDoc(): IDataOneDoc {
    if (!this.TopDoc) {
      this.TopDoc = {
        ContentDoc: window.document,
        DocId: Guid.NewRandomGuid(),
        Nickname: 'top doc'
      }
    }
    return this.TopDoc;
  }

  async SetCompactCss(targetDoc: IDataOneDoc) {
    await this.ContentEditorProxy.SetCompactCss();
  }

  private GetStates(): Promise<IStateOfScWindow> {
    return new Promise(async (resolve, reject) => {
      let toReturn: IStateOfScWindow = new DefaultStateOfScWindowProxy();

      if (this.ScUrlAgent.GetScWindowType() === ScWindowType.Desktop) {
        await this.DesktopProxy.GetStateOfDesktop()
          .then((result: IStateOfDesktop) => toReturn.StateOfDesktop = result)
          .then(() => resolve(toReturn))
          .catch((err) => reject(this.GetStates.name + ' | ' + err));
      }

      if (this.ScUrlAgent.GetScWindowType() === ScWindowType.ContentEditor) {
        await this.ContentEditorProxy.GetStateOfContentEditorProxy()
          .then((stateOfContentEditorProxy: IStateOfContentEditor) => toReturn.StateOfContentEditor = stateOfContentEditorProxy)
          .then(() => resolve(toReturn))
          .catch((err) => reject(this.GetStates.name + ' | ' + err));
      }
    });
  }

  GetStateOfScUiProxy(snapshotFlavor: SnapShotFlavor): Promise<IStateOfScUiProxy> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.GetStateOfScUiProxy.name);

      let toReturnStateOfSitecoreWindow: IStateOfScUiProxy = new DefaultStateOfScUiProxy();

      await this.GetStates()
        .then((dataSitecoreWindowStates: IStateOfScWindow) => toReturnStateOfSitecoreWindow.StateOfScWindow = dataSitecoreWindowStates)
        .then(() => {
          toReturnStateOfSitecoreWindow.Meta = this.PopulateMetaData(snapshotFlavor, toReturnStateOfSitecoreWindow.StateOfScWindow);
          toReturnStateOfSitecoreWindow.Friendly = this.PopulateFriendly(toReturnStateOfSitecoreWindow.Meta)
        })
        .then(() => resolve(toReturnStateOfSitecoreWindow))
        .catch((err) => reject(this.GetStateOfScUiProxy.name + ' | ' + err));
      this.Logger.FuncEnd(this.GetStateOfScUiProxy.name);
    });
  }

  async SetStateOfScWin(dataToRestore: IStateOfScUiProxy): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.SetStateOfScWin.name);

      if (dataToRestore) {
        if (dataToRestore.Meta.WindowType == ScWindowType.Desktop) {
          if (dataToRestore.StateOfScWindow.StateOfDesktop) {
            await this.DesktopProxy.SetStateOfDesktop(dataToRestore.StateOfScWindow.StateOfDesktop)
              .then(() => resolve())
              .catch((err) => reject(this.SetStateOfScWin.name + ' | ' + err));
          } else {
            this.Logger.ErrorAndThrow(this.SetStateOfScWin.name, 'no states in dataToRestore');
          }
        }
        else if (dataToRestore.Meta.WindowType === ScWindowType.ContentEditor) {
          await this.ContentEditorProxy.SetStateOfContentEditorAsync(dataToRestore.StateOfScWindow.StateOfContentEditor)
            .then(() => resolve())
            .catch((err) => reject(err));
        }
        else {
          reject(this.SetStateOfScWin.name + 'Data not restored. Not in Desktop or Content Editor');
        }
      }
      else {
        this.Logger.WarningAndContinue(this.SetStateOfScWin.name, " No data found to restore");
        resolve();
      }

      reject(this.SetStateOfScWin.name + ' : unknown reason');

      this.Logger.FuncEnd(this.SetStateOfScWin.name);
    });
  }

  PopulateFriendly(metadata: IDataMetaData): IDataFriendly {
    let toReturn: IDataFriendly = new DefaultFriendly();
    toReturn.WindowType = ScWindowType[metadata.WindowType];
    toReturn.TimeStamp = StaticHelpers.MakeFriendlyDate(metadata.TimeStamp)
    toReturn.Flavor = SnapShotFlavor[metadata.Flavor];
    return toReturn;
  }

  private Hash(input: string):number {
    //https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
    let hash:number = 0;
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

  PopulateMetaData(snapshotFlavor: SnapShotFlavor, stateOfScWindow: IStateOfScWindow): IDataMetaData {
    let toReturn: IDataMetaData = new DefaultMetaData();
    toReturn.WindowType = this.ScUrlAgent.GetScWindowType();
    toReturn.TimeStamp = new Date();
    toReturn.SessionId = this.TabSessionId;
    toReturn.Flavor = snapshotFlavor;
    toReturn.Hash = this.Hash(JSON.stringify(stateOfScWindow));
    return toReturn;
  }
}