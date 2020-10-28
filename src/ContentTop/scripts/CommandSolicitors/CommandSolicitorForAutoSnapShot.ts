import { _FrontBase } from "../../../Shared/scripts/_HindeCoreBase";
import { HindSiteSettingWrapper } from "../../../Shared/scripts/Agents/SettingsAgent/HindSiteSettingWrapper";
import { StaticHelpers } from "../../../Shared/scripts/Classes/StaticHelpers";
import { SettingKey } from "../../../Shared/scripts/Enums/30 - SettingKey";
import { IHindSiteScUiProxy } from "../../../Shared/scripts/Interfaces/Agents/IContentApi/IHindSiteScUiProxy";
import { IContentAtticAgent } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/IContentAtticAgent";
import { IHindeCore } from "../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { ISettingsAgent } from "../../../Shared/scripts/Interfaces/Agents/ISettingsAgent";
import { IStateOfScUi } from "../../../Shared/scripts/Interfaces/StateOf/IDataStateOfSitecoreWindow";
import { IScUiReturnPayload } from "../../../Shared/scripts/Interfaces/StateOf/IScUiReturnPayload";
import { SharedConst } from "../../../Shared/scripts/SharedConst";
import { SnapShotFlavor } from "../../../Shared/scripts/Enums/SnapShotFlavor";
import { IToApiCallPayload } from "../../../Shared/scripts/Interfaces/IApiCallPayload";
import { APICommandFlag } from "../../../Shared/scripts/Enums/APICommand";
import { _CommandSolicitorForEvent_ } from "./_CommandSolicitorFor_";
import { DocumentJacket } from "../../../DOMJacket/scripts/Document/DocumentJacket";
import { ICommandRouterParams } from "../../../Shared/scripts/Interfaces/ICommandRouterParams";
import { ReqCommandMsgFlag } from "../../../Shared/scripts/Enums/10 - MessageFlag";
import { ICommandRouterResult } from "../../../Shared/scripts/Interfaces/StateOf/ICommandRouterResult";
import { ISolicitor } from "../../../Shared/scripts/Interfaces/Agents/IContentAtticAgent/ISolicitor";
import { TypeDiscriminator } from "../../../Shared/scripts/Enums/70 - TypeDiscriminator";
import { CommandRouter } from "../Proxies/CommandRouter";

export class SolicitorForScheduledAutoSnapShot extends _CommandSolicitorForEvent_ implements ISolicitor {
  readonly TypeDiscriminator: TypeDiscriminator = TypeDiscriminator.SolicitorForScheduledAutoSnapShot;
  private AtticAgent: IContentAtticAgent;
  private AutoSaveHasBeenScheduled: boolean = false;
  private LastKnownSavedState: IStateOfScUi = null;
  private SettingsAgent: ISettingsAgent;
  ScUiProxy: IHindSiteScUiProxy;

  constructor(hindeCore: IHindeCore, settingsAgent: ISettingsAgent, atticAgent: IContentAtticAgent, scUiProxy: IHindSiteScUiProxy, commandRouter: CommandRouter, documentJacket: DocumentJacket) {
    super(hindeCore, commandRouter, documentJacket);
    this.SettingsAgent = settingsAgent;
    this.AtticAgent = atticAgent;
    this.ScUiProxy = scUiProxy;
    this.CommandRouter = commandRouter;
  }

  async ExecuteTest(): Promise<any> {
  }

  protected Instantiate(): void {
    //empty
  }

  async AutoSaveSnapShot() {
    this.Logger.FuncStart(this.AutoSaveSnapShot.name);

    //if (!this.RecipeAutoSaveState) {
    //  this.RecipeAutoSaveState = new RecipeAutoSaveState(this.HindeCore, this.ScUiProxy, this.AtticAgent);
    //}
    let windowStatePrior = this.LastKnownSavedState;

    let payload: IToApiCallPayload = {
      StateOfScUi: null,
      APICommand: APICommandFlag.Unknown,
      SnapShotFlavor: SnapShotFlavor.Autosave,
    };

    let setStateFromX: ICommandRouterParams = {
      ReqMsgFlag: ReqCommandMsgFlag.GetStateOfWindow,
      ReqMsgFlagFriendly: ReqCommandMsgFlag[ReqCommandMsgFlag.GetStateOfWindow],
      NewNickName: null,
      SelectSnapShotId: null,
      SelectText: null,
      StateSnapShot: null,
    };

    this.CommandRouter.RouteCommand(setStateFromX)
      .then((commandRouterResult: ICommandRouterResult) => {
        let returnPayload: IScUiReturnPayload = commandRouterResult.ScUiReturnPayload;
        let hasCorrectData = returnPayload && returnPayload.StateOfScUi && returnPayload.StateOfScUi.Meta && returnPayload.StateOfScUi.Meta.Hash
          && windowStatePrior && windowStatePrior.Meta && windowStatePrior.Meta.Hash;

        if (!hasCorrectData || (returnPayload.StateOfScUi.Meta.Hash !== windowStatePrior.Meta.Hash)) {
          this.Logger.Log('states are different, save snap shot');

          this.AtticAgent.WriteStateOfSitecoreToStorage(returnPayload.StateOfScUi);
        } else {
          this.Logger.Log('states are same, no save');
        }
        this.LastKnownSavedState = returnPayload.StateOfScUi;
      })
      .catch((err: any) => this.ErrorHand.HandleFatalError(this.AutoSaveSnapShot.name, err));

    this.Logger.FuncEnd(this.AutoSaveSnapShot.name);
  }

  ScheduleIntervalTasks() {
    this.Logger.FuncStart(this.ScheduleIntervalTasks.name);
    this.Logger.LogVal('Has been scheduled: ', this.AutoSaveHasBeenScheduled);
    let autoSaveSetting: HindSiteSettingWrapper = this.SettingsAgent.HindSiteSettingsBucket.GetByKey(SettingKey.AutoSaveIntervalMin);
    this.Logger.LogVal('autoSaveSetting: ', autoSaveSetting.HindSiteSetting.ValueAsInt());

    if (autoSaveSetting.HindSiteSetting.ValueAsInt() > 0) {
      if (!this.AutoSaveHasBeenScheduled) {
        var self = this;

        var intervalMs = StaticHelpers.MinToMs(autoSaveSetting.HindSiteSetting.ValueAsInt());

        window.setInterval(() => {
          self.AutoSaveSnapShot();
        }, intervalMs / SharedConst.Const.Debug.SpeedUpAutoSaveIntervalFactor);

        this.AutoSaveHasBeenScheduled = true;
      }
    }
    this.Logger.FuncEnd(this.ScheduleIntervalTasks.name);
  }
}