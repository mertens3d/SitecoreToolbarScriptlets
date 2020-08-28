import { MsgFromPopUp } from "../../../../Shared/scripts/Classes/MsgFromPopUp";
import { PayloadDataFromPopUp } from '../../../../Shared/scripts/Classes/PayloadDataReqPopUp';
import { StaticHelpers } from '../../../../Shared/scripts/Classes/StaticHelpers';
import { SettingKey } from '../../../../Shared/scripts/Enums/3xxx-SettingKey';
import { scWindowType } from '../../../../Shared/scripts/Enums/scWindowType';
import { SnapShotFlavor } from '../../../../Shared/scripts/Enums/SnapShotFlavor';
import { IAllAgents } from '../../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { IOneGenericSetting } from '../../../../Shared/scripts/Interfaces/Agents/IOneGenericSetting';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/IDataOneDoc';
import { IDataPayloadSnapShot } from '../../../../Shared/scripts/Interfaces/IDataPayloadSnapShot';
import { ContentConst } from '../../../../Shared/scripts/Interfaces/InjectConst';
import { SharedConst } from '../../../../Shared/scripts/SharedConst';
import { ContentMessageBroker } from '../../Drones/ContentMessageBroker/ContentMessageBroker';
import { ContentManagerBase } from '../../_first/_ContentManagerBase';
import { ContentHub } from '../ContentHub/ContentHub';

export class ContentMessageManager extends ContentManagerBase {
  AutoSaveHasBeenScheduled: boolean = false;
  private ContentMessageBroker: ContentMessageBroker;

  constructor(contentHub: ContentHub, contentAgents: IAllAgents) {
    super(contentHub, contentAgents);
    this.AllAgents.Logger.FuncStart(ContentMessageManager.name);

    this.AllAgents.Logger.FuncEnd(ContentMessageManager.name);
  }

  Init() {
    this.AllAgents.Logger.FuncStart(this.Init.name + ' ' + ContentMessageManager.name);
    var self = this;
    this.ContentMessageBroker = new ContentMessageBroker(this.AllAgents.Logger, this.AllAgents.SettingsAgent, this.APIMan(), this.ScUiMan().TopLevelDoc(), this.ContentHub, this.AllAgents);
    this.ContentMessageBroker.BeginListening();
    this.AllAgents.Logger.FuncEnd(this.Init.name);
  }

  ScheduleIntervalTasks(reqMsgFromPopup: MsgFromPopUp) {
    this.AllAgents.Logger.FuncStart(this.ScheduleIntervalTasks.name);
    this.AllAgents.Logger.LogVal('Has been scheduled: ', this.AutoSaveHasBeenScheduled)

    let autoSaveSetting: IOneGenericSetting = this.AllAgents.SettingsAgent.GetByKey(SettingKey.AutoSaveIntervalMin)

    if (this.AllAgents.SettingsAgent.ValueAsInteger(autoSaveSetting) > 0) {
      if (!this.AutoSaveHasBeenScheduled) {
        this.AllAgents.Logger.MarkerA();
        var self = this;
        this.AllAgents.Logger.MarkerB();
        var intervalMs = StaticHelpers.MinToMs(ContentConst.Const.Timeouts.AutoSaveIntervalMin);

        this.AllAgents.Logger.MarkerC();
        window.setInterval(() => {
          self.AutoSaveSnapShot(this.ScUiMan().GetCurrentPageType());
        }, intervalMs)

        this.AllAgents.Logger.MarkerD();
        this.AutoSaveHasBeenScheduled = true;
      }
    }
    this.AllAgents.Logger.FuncEnd(this.ScheduleIntervalTasks.name);
  }

  AutoSaveSnapShot(pageType: scWindowType) {
    this.AllAgents.Logger.FuncStart(this.AutoSaveSnapShot.name);
    var SnapShotSettings: IDataPayloadSnapShot = {
      SnapShotNewNickname: '',
      Flavor: SnapShotFlavor.Autosave,
      CurrentPageType: pageType
    }

    this.OneScWinMan().SaveWindowState(SnapShotSettings);

    this.AllAgents.Logger.FuncEnd(this.AutoSaveSnapShot.name);
  }
  async SetLoggerFromMessage(reqMsgFromPopup: MsgFromPopUp) {
    let currSetting: IOneGenericSetting = this.AllAgents.SettingsAgent.GetByKey(SettingKey.LogToConsole);
    let valueToUse: boolean = SharedConst.Const.Settings.Defaults.LogToConsole;

    if (currSetting) {
      let candidate = this.AllAgents.SettingsAgent.ValueAsBool(currSetting);
      if (candidate) {
        console.log('setting value as bool ' + valueToUse);
        console.log('setting it to ' + valueToUse);
      } else {
        console.log('candidate was null');
      }
      await this.AllAgents.Logger.Init(valueToUse);
    } else {
      console.log('curr setting not found');
    }
  }

  private ToggleCompactCss(Data: PayloadDataFromPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.ToggleCompactCss.name);

      var targetDoc: IDataOneDoc = this.ScUiMan().TopLevelDoc();
      if (targetDoc) {
        var self = this;
        await this.OneScWinMan().SetCompactCss(targetDoc)
          .then(() => resolve())
          .catch((err) => { this.AllAgents.Logger.ErrorAndThrow(this.ToggleCompactCss.name, err) })
      }

      this.AllAgents.Logger.FuncEnd(this.ToggleCompactCss.name);
    });
  }

  __restoreClick(data: PayloadDataFromPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.Logger.FuncStart(this.__restoreClick.name);

      try {
        if (data) {
          if (data.IdOfSelect) {
            this.AllAgents.Logger.LogVal("IdOfSelect", data.IdOfSelect);
            var dataOneWindowStorage;

            await this.AtticMan().GetFromStorageById(data.IdOfSelect)
              .then((result) => dataOneWindowStorage = result);

            var self = this;

            var targetDoc: IDataOneDoc = this.ScUiMan().TopLevelDoc();//  await this.PageMan().GetTargetWindowAsync(Data.UseOriginalWindowLocation ? true : false, dataOneWindowStorage.WindowType);

            if (targetDoc) {
              await self.OneScWinMan().RestoreStateToTargetDoc(targetDoc, dataOneWindowStorage)
                .then(() => resolve())
                .catch((err) => reject(err))
            }
            else {
              self.AllAgents.Logger.ErrorAndThrow(this.__restoreClick.name, 'no target window');
            }
          } else {
            reject('No IdOfSelect');
          }
        } else {
          reject('No data')
        }
      } catch (ex) {
        this.AllAgents.Logger.ErrorAndThrow(this.__restoreClick.name, ex)
      }

      this.AllAgents.Logger.FuncEnd(this.__restoreClick.name);
    });
  }

  IsLogEnabled(): boolean {
    return this.AllAgents.Logger.EnabledStatus();
  }

  OperationCancelled: any;
  SetParentInfo(__winDataParent: IDataOneDoc) {
  }
}