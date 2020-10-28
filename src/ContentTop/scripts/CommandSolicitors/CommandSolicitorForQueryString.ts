import { DocumentJacket } from '../../../DOMJacket/scripts/Document/DocumentJacket';
import { ReqCommandMsgFlag } from '../../../Shared/scripts/Enums/10 - MessageFlag';
import { SettingKey } from '../../../Shared/scripts/Enums/30 - SettingKey';
import { TypeDiscriminator } from '../../../Shared/scripts/Enums/70 - TypeDiscriminator';
import { QueryStrKey } from '../../../Shared/scripts/Enums/QueryStrKey';
import { Guid } from '../../../Shared/scripts/Helpers/Guid';
import { GuidData } from '../../../Shared/scripts/Helpers/GuidData';
import { IContentAtticAgent } from '../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent';
import { ISolicitor } from '../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/ISolicitor';
import { IHindeCore } from '../../../Shared/scripts/Interfaces/Agents/IHindeCore';
import { ISettingsAgent } from '../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { ICommandRouterParams } from '../../../Shared/scripts/Interfaces/ICommandRouterParams';
import { CommandRouter } from '../Proxies/CommandRouter';
import { _CommandSolicitorForEvent_ } from "./_CommandSolicitorFor_";

export class CommandSolicitorForEventRestoreMostRecent extends _CommandSolicitorForEvent_ implements ISolicitor {
  readonly TypeDiscriminator: TypeDiscriminator = TypeDiscriminator.CommandSolicitorForEventRestoreMostRecent;
  private SettingsAgent: ISettingsAgent;
  private AtticAgent: IContentAtticAgent;

  constructor(hindCore: IHindeCore, commandRouter: CommandRouter, documentJacket: DocumentJacket, settingsAgent: ISettingsAgent, atticAgent: IContentAtticAgent) {
    super(hindCore, commandRouter, documentJacket);
    this.SettingsAgent = settingsAgent;
    this.AtticAgent = atticAgent;
  }

  async ExecuteTest(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  protected Instantiate() {
    //empty
  }
  StartUp(): any {
  }
}

export class CommandSolicitorForEventQueryString extends _CommandSolicitorForEvent_ {
  private SettingsAgent: ISettingsAgent;
  private AtticAgent: IContentAtticAgent;

  constructor(hindCore: IHindeCore, commandRouter: CommandRouter, documentJacket: DocumentJacket, settingsAgent: ISettingsAgent, atticAgent: IContentAtticAgent) {
    super(hindCore, commandRouter, documentJacket);
    this.SettingsAgent = settingsAgent;
    this.AtticAgent = atticAgent;
  }

  protected Instantiate() {
    //empty
  }

  //StartUp(): any {
  //  let RouterParams: ICommandRouterParams = {
  //    ReqMsgFlag: ReqCommandMsgFlag.SetStateFromQueryString,
  //    ReqMsgFlagFriendly: ReqCommandMsgFlag[ReqCommandMsgFlag.SetStateFromQueryString],
  //    NewNickName: null,
  //    SelectSnapShotId: null,
  //    SelectText: null,
  //    StateSnapShot: null,
  //  };

  //  if (this.DocumentJacket.UrlJacket.QueryStringHasKey(QueryStrKey.hsTargetSs)) {
  //    RouterParams.ReqMsgFlag = ReqCommandMsgFlag.SetStateFromQueryString,
  //      this.CommandRouter.RouteCommand(RouterParams);
  //  } else if ((this.SettingsAgent.GetByKey(SettingKey.AutoRestoreState)).ValueAsBool()) {
  //    this.HindeCore.Logger.Log('yup...has the setting');
  //    RouterParams.ReqMsgFlag = ReqCommandMsgFlag.SetStateFromMostRecent;
  //    RouterParams.ReqMsgFlagFriendly = ReqCommandMsgFlag[ReqCommandMsgFlag.SetStateFromMostRecent];
  //    this.CommandRouter.RouteCommand(RouterParams);
  //  }
  //}

  public async StartUp(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart([CommandSolicitorForEventQueryString.name, this.StartUp.name]);
      if (this.DocumentJacket.UrlJacket.QueryStringHasKey(QueryStrKey.hsTargetSs)) {
        let qsValue: string = (this.DocumentJacket.UrlJacket.GetQueryStringValueByKey(QueryStrKey.hsTargetSs));

        if (Guid.IsValidGuidStr(qsValue)) {
          let targetGuid: GuidData = Guid.ParseGuid(qsValue, false);

          if (targetGuid && targetGuid !== Guid.GetEmptyGuid()) {
            this.Logger.LogVal("targetGuid", targetGuid.Raw);
            var dataOneWindowStorage;

            dataOneWindowStorage = this.AtticAgent.GetFromStorageBySnapShotId(targetGuid);

            let routingParams: ICommandRouterParams = {
              ReqMsgFlag: ReqCommandMsgFlag.ReqSetStateOfSitecoreSameWindow,
              ReqMsgFlagFriendly : ReqCommandMsgFlag[ReqCommandMsgFlag.ReqSetStateOfSitecoreSameWindow],
              NewNickName: '',
              SelectSnapShotId: targetGuid,
              SelectText: '',
              StateSnapShot: dataOneWindowStorage
            }

           await this.CommandRouter.RouteCommand(routingParams);
            //this.CommandParams.ToAPIPayload.DataOneWindowStorage = dataOneWindowStorage;

            //this.Dependancies.ScUiProxy.SetStateOfSitecoreWindowAsync(this.CommandParams.ToAPIPayload);
          } else {
            reject('Either no snapshot provided or an illegal one was found');
          }
        } else {
          this.Logger.Log('guid is not a valid guid');
        }
      } else {
        this.Logger.Log('Does not have qs target');
        resolve();
      }

      this.Logger.FuncEnd([CommandSolicitorForEventQueryString.name, this.StartUp.name]);
    });
  }
}