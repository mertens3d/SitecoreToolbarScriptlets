import { AutoSnapShotAgent } from "../../../../Content/scripts/Agents/AutoSnapShotAgent";
import { MessageBroker_Content } from "../../../../Content/scripts/Proxies/ContentMessageBroker";
import { ScUiManager } from "../../../../HindSiteScUiProxy/scripts/Managers/SitecoreUiManager/SitecoreUiManager";
import { ContentEditorProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy";
import { DesktopProxy } from "../../../../HindSiteScUiProxy/scripts/Proxies/Desktop/DesktopProxy/DesktopProxy";
import { GuidData } from "../../Helpers/GuidData";
import { IHindSiteScUiProxy } from "../../Interfaces/Agents/IContentApi/IContentApi";
import { IContentAtticAgent } from "../../Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IHindeCore } from "../../Interfaces/Agents/IHindeCore";
import { ISettingsAgent } from "../../Interfaces/Agents/ISettingsAgent";
import { IToastAgent } from "../../Interfaces/Agents/IToastAgent";
import { IDataOneDoc } from "../../Interfaces/Data/IDataOneDoc";
import { IApiCallPayload } from "../../Interfaces/IApiCallPayload";
import { ICommandParams } from "../../Interfaces/ICommandParams";
import { _HindeCoreBase } from "../../LoggableBase";

export class CommandPayloadForInternal extends _HindeCoreBase implements ICommandParams {
    NewNickname: string;
    TargetSnapShotId: GuidData;
    AtticAgent: IContentAtticAgent;
    ContentMessageBroker: MessageBroker_Content = null;
    DesktopProxy: DesktopProxy = null;
    hindeCore: IHindeCore = null;
    ScUiMan: ScUiManager = null;
    TargetCeProxy: ContentEditorProxy;
    TargetDoc: IDataOneDoc = null;
    TargetNickName: string = '';
    ToastAgent: IToastAgent = null;
    TopLevelDoc: IDataOneDoc = null;
    SettingsAgent: ISettingsAgent;
    AutoSnapShotAgent: AutoSnapShotAgent;
    ApiPayload: IApiCallPayload;
    ScUiProxy: IHindSiteScUiProxy;

  constructor(hindeCore: IHindeCore, atticAgent: IContentAtticAgent, toastAgent: IToastAgent, scUiMan: ScUiManager, settingsAgent: ISettingsAgent, autoSnapShotAgent: AutoSnapShotAgent, apiPayload: IApiCallPayload) {
    super(hindeCore);
        this.AtticAgent = atticAgent;
        this.ToastAgent = toastAgent;
        this.ScUiMan = scUiMan;
        this.SettingsAgent = settingsAgent;
        this.AutoSnapShotAgent = autoSnapShotAgent;
        this.ApiPayload = apiPayload;
    }
}
