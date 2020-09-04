import { PayloadDataFromPopUp } from '../../../../Shared/scripts/Classes/PayloadDataReqPopUp';
import { IAllAgents } from '../../../../Shared/scripts/Interfaces/Agents/IAllAgents';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/IDataOneDoc';
import { ContentMessageBroker } from '../../Drones/ContentMessageBroker/ContentMessageBroker';
import { ContentManagerBase } from '../../_first/_ContentManagerBase';
import { ContentHub } from '../ContentHub/ContentHub';

export class ContentMessageManager extends ContentManagerBase {
  private ContentMessageBroker: ContentMessageBroker;
  OperationCancelled: any;

  constructor(contentHub: ContentHub, contentAgents: IAllAgents) {
    super(contentHub, contentAgents);
    this.AllAgents.Logger.FuncStart(ContentMessageManager.name);

    this.AllAgents.Logger.FuncEnd(ContentMessageManager.name);
  }

  InitContentMessageManager() {
    this.AllAgents.Logger.FuncStart(this.InitContentMessageManager.name + ' ' + ContentMessageManager.name);
    this.ContentMessageBroker = new ContentMessageBroker(this.AllAgents.Logger, this.AllAgents.SettingsAgent, this.APIMan(), this.ScUiMan().TopLevelDoc(), this.ContentHub, this.AllAgents);
    this.ContentMessageBroker.BeginListening();
    this.AllAgents.Logger.FuncEnd(this.InitContentMessageManager.name);
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
              .then((result) => dataOneWindowStorage = result)
              .catch((err) => reject(err));

            if (dataOneWindowStorage) {
              var self = this;
              var targetDoc: IDataOneDoc = this.ScUiMan().TopLevelDoc();

              if (targetDoc) {
                await self.OneScWinMan().RestoreStateToTargetDoc(targetDoc, dataOneWindowStorage)
                  .then(() => resolve())
                  .catch((err) => reject(err))
              }
              else {
                reject(this.__restoreClick.name + ' no target window');
              }
            }
          } else {
            reject(this.__restoreClick.name + ' No IdOfSelect');
          }
        } else {
          reject(this.__restoreClick.name + ' No data')
        }
      } catch (err) {
        reject(err)
      }

      this.AllAgents.Logger.FuncEnd(this.__restoreClick.name);
    });
  }

  SetParentInfo(__winDataParent: IDataOneDoc) {
  }
}