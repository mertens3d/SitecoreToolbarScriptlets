import { DocumentJacket } from '../../../DOMJacket/scripts/Document/DocumentJacket';
import { ReqCommandMsgFlag } from '../../../Shared/scripts/Enums/10 - MessageFlag';
import { SettingKey } from '../../../Shared/scripts/Enums/30 - SettingKey';
import { QueryStrKey } from '../../../Shared/scripts/Enums/QueryStrKey';
import { IHindeCore } from '../../../Shared/scripts/Interfaces/Agents/IHindeCore';
import { ISettingsAgent } from '../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { ICommandRouterParams } from '../../../Shared/scripts/Interfaces/ICommandRouterParams';
import { CommandRouter } from '../Proxies/CommandRouter';
import { _CommandSolicitorFor_ } from "./_CommandSolicitorFor_";


export class CommandSolicitorForQueryString extends _CommandSolicitorFor_ {
    SettingsAgent: ISettingsAgent;

    constructor(hindCore: IHindeCore, commandRouter: CommandRouter, documentJacket: DocumentJacket, settingsAgent: ISettingsAgent) {
        super(hindCore, commandRouter, documentJacket);
        this.SettingsAgent = settingsAgent;
    }

    protected Instantiate() {
        //empty
    }

    StatUp(): any {
        let setStateFromX: ICommandRouterParams = {
            MsgFlag: ReqCommandMsgFlag.SetStateFromQueryString,
            NewNickName: null,
            SelectSnapShotId: null,
            SelectText: null,
        };

        if (this.DocumentJacket.UrlJacket.QueryStringHasKey(QueryStrKey.hsTargetSs)) {
            setStateFromX.MsgFlag = ReqCommandMsgFlag.SetStateFromQueryString,
                this.CommandRouter.RouteCommand(setStateFromX);
        } else if ((this.SettingsAgent.GetByKey(SettingKey.AutoRestoreState)).ValueAsBool()) {
            this.HindeCore.Logger.Log('yup...has the setting');
            setStateFromX.MsgFlag = ReqCommandMsgFlag.SetStateFromMostRecent;
            this.CommandRouter.RouteCommand(setStateFromX);
        }
    }
}
