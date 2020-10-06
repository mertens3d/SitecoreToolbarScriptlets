﻿import { DocumentJacket } from "../../../DOMJacket/DocumentJacket";
import { ScPageTypeResolver } from "../../../Shared/scripts/Agents/Agents/UrlAgent/ScUrlAgent";
import { DefaultFriendly } from "../../../Shared/scripts/Classes/Defaults/DefaultFriendly";
import { DefaultMetaData } from "../../../Shared/scripts/Classes/Defaults/DefaultMetaData";
import { DefaultStateOfScUiProxy } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfScUiProxy";
import { DefaultStateOfScWindow } from "../../../Shared/scripts/Classes/Defaults/DefaultStateOfScWindowProxy";
import { StaticHelpers } from '../../../Shared/scripts/Classes/StaticHelpers';
import { StateFullProxyDisciminator } from "../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";
import { ReadyStateNAB } from '../../../Shared/scripts/Enums/ReadyState';
import { ScWindowType } from '../../../Shared/scripts/Enums/scWindowType';
import { SnapShotFlavor } from '../../../Shared/scripts/Enums/SnapShotFlavor';
import { Guid } from '../../../Shared/scripts/Helpers/Guid';
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IScWindowFacade } from '../../../Shared/scripts/Interfaces/Agents/IScWindowManager/IScWindowManager';
import { ISettingsAgent } from '../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IStateFullProxy } from "../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { IDataFriendly } from '../../../Shared/scripts/Interfaces/Data/States/IDataFriendly';
import { IDataMetaData } from '../../../Shared/scripts/Interfaces/Data/States/IDataMetaData';
import { IStateOfScUi } from "../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { IStateOfScWindow } from '../../../Shared/scripts/Interfaces/Data/States/IStateOfScWindow';
import { IStateOf_ } from "../../../Shared/scripts/Interfaces/Data/States/IStateofX";
import { ContentConst } from '../../../Shared/scripts/Interfaces/InjectConst';
import { _HindeCoreBase } from '../../../Shared/scripts/LoggableBase';
import { ContentEditorSFProxy } from './ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { DesktopSFProxy } from './Desktop/DesktopProxy/DesktopProxy';


export class ScWindowFacade extends _HindeCoreBase implements IScWindowFacade {
    SettingsAgent: ISettingsAgent;
    TabSessionId: string;
    StateFullProxy: IStateFullProxy;
    private DocumentJacket: DocumentJacket;
    private ScPageTypeResolver: ScPageTypeResolver;

    constructor(hindeCore: IHindeCore, documentJacket: DocumentJacket) {
        super(hindeCore);
        this.Logger.CTORStart(ScWindowFacade.name);
        this.DocumentJacket = documentJacket;
        this.Instantiate();
        this.Logger.CTOREnd(ScWindowFacade.name);
    }


    private Instantiate() {
        this.ScPageTypeResolver = new ScPageTypeResolver(this.HindeCore, this.DocumentJacket.UrlJacket);
    }


    async InstantiateAsyncMembers_ScWindowFacade(): Promise<void> {
        try {
            this.Logger.FuncStart(this.InstantiateAsyncMembers_ScWindowFacade.name);

            this.TabSessionId = sessionStorage.getItem(ContentConst.Const.Storage.SessionKey);

            if (!this.TabSessionId) {
                this.TabSessionId = Guid.WithoutDashes(Guid.NewRandomGuid());
                sessionStorage.setItem(ContentConst.Const.Storage.SessionKey, this.TabSessionId);
            }

            await this.DocumentJacket.WaitForCompleteNAB_NativeDocument('Window.Document') // recipesBasic.WaitForCompleteNAB_DataOneDoc(this.GetTopLevelDoc(), 'Window.Document')
                .then((result: ReadyStateNAB) => {
                    let windowType: ScWindowType = this.ScPageTypeResolver.GetScWindowType();

                    if (windowType === ScWindowType.Desktop) {
                        this.StateFullProxy = new DesktopSFProxy(this.HindeCore, this.DocumentJacket);
                    }
                    else if (windowType === ScWindowType.ContentEditor) {
                        this.StateFullProxy = new ContentEditorSFProxy(this.HindeCore, this.DocumentJacket, 'Solo Content Editor doc');
                    };
                })
                .then(() => this.StateFullProxy.InstantiateAsyncMembers())
                .then(() => this.StateFullProxy.WireEvents())
                .catch((err) => this.ErrorHand.ErrorAndThrow(this.InstantiateAsyncMembers_ScWindowFacade.name, err));
        }
        catch (err) {
            this.ErrorHand.ErrorAndThrow(this.InstantiateAsyncMembers_ScWindowFacade.name, err);
        }

        this.Logger.FuncEnd(this.InstantiateAsyncMembers_ScWindowFacade.name);
    }

    GetCurrentPageType(): ScWindowType {
        return this.ScPageTypeResolver.GetScWindowType();
    }


    async SetCompactCss(documentJacket: DocumentJacket) {
        //await this.ContentEditorProxy.SetCompactCss();
    }


    private GetState(): Promise<IStateOfScWindow> {
        return new Promise(async (resolve, reject) => {
            let toReturn: IStateOfScWindow = new DefaultStateOfScWindow();

            if (this.StateFullProxy) {
                await this.StateFullProxy.GetState()
                    .then((stateOf_: IStateOf_) => toReturn.StateOf_ = stateOf_)
                    .then(() => toReturn.StateOf_.StatefullDisciminatorFriendly = StateFullProxyDisciminator[toReturn.StateOf_.StatefullDisciminator])
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
                .then((dataSitecoreWindowStates: IStateOfScWindow) => toReturnStateOfSitecoreWindow.StateOfScWindow = dataSitecoreWindowStates)
                .then(() => {
                    toReturnStateOfSitecoreWindow.Meta = this.PopulateMetaData(snapshotFlavor, toReturnStateOfSitecoreWindow.StateOfScWindow);
                    toReturnStateOfSitecoreWindow.Friendly = this.PopulateFriendly(toReturnStateOfSitecoreWindow.Meta);
                })
                .then(() => resolve(toReturnStateOfSitecoreWindow))
                .catch((err) => reject(this.GetStateOfScUiProxy.name + ' | ' + err));
            this.Logger.FuncEnd(this.GetStateOfScUiProxy.name);
        });
    }

    PublishActiveCE() {
        return new Promise(async (resolve, reject) => {
            if (this.GetCurrentPageType() == ScWindowType.ContentEditor) {
                await (<ContentEditorSFProxy>this.StateFullProxy).PublishItem()
                    .then(() => resolve());
            }
            else if (this.GetCurrentPageType() == ScWindowType.Desktop) {
                (<DesktopSFProxy>this.StateFullProxy).PublishItem()
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
                    if (dataToRestore.StateOfScWindow.StateOf_) {
                        await this.StateFullProxy.SetState(dataToRestore.StateOfScWindow.StateOf_)
                            .then(() => resolve())
                            .catch((err) => reject(this.SetStateOfScWin.name + ' | ' + err));
                    }
                    else {
                        this.ErrorHand.ErrorAndThrow(this.SetStateOfScWin.name, 'no states in dataToRestore');
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

    PopulateMetaData(snapshotFlavor: SnapShotFlavor, stateOfScWindow: IStateOfScWindow): IDataMetaData {
        let toReturn: IDataMetaData = new DefaultMetaData();
        toReturn.WindowType = this.ScPageTypeResolver.GetScWindowType();
        toReturn.TimeStamp = new Date();
        toReturn.SessionId = this.TabSessionId;
        toReturn.Flavor = snapshotFlavor;
        toReturn.Hash = this.Hash(JSON.stringify(stateOfScWindow));
        return toReturn;
    }
}