import { PayloadDataFromPopUp } from "../../../../Shared/scripts/Classes/PayloadDataReqPopUp";
import { MsgFlag } from "../../../../Shared/scripts/Enums/1xxx-MessageFlag";
import { CacheMode } from "../../../../Shared/scripts/Enums/CacheMode";
import { SnapShotFlavor } from "../../../../Shared/scripts/Enums/SnapShotFlavor";
import { IAllAgents } from "../../../../Shared/scripts/Interfaces/Agents/IAllAgents";
import { IDataOneDoc } from "../../../../Shared/scripts/Interfaces/IDataOneDoc";
import { IDataOneWindowStorage } from "../../../../Shared/scripts/Interfaces/IDataOneWindowStorage";
import { ContentManagerBase } from "../../_first/_ContentManagerBase";
import { ContentHub } from "../ContentHub/ContentHub";

//these are the exposed commands which can be called by the popup
export class ContentAPIManager extends ContentManagerBase {
  constructor(hub: ContentHub, AllAgents: IAllAgents) {
    super(hub, AllAgents);
    this.AllAgents.Logger.FuncStart(ContentAPIManager.name);

    this.AllAgents.Logger.FuncEnd(ContentAPIManager.name);
  }

  async UpdateNickname(payloadData: PayloadDataFromPopUp) {
    return new Promise(async (resolve, reject) => {
      await this.AtticMan().UpdateNickname(payloadData)
        .then(() => resolve())
        .catch((err) => reject(err));
    })
  }

  GetContentState() {
    return new Promise(async (resolve, reject) => {
      await this.ContentFactory().PopulateContentState()
        .then((result) => resolve(result))
        .catch((err) => reject(err))
    });
  }

  Notify(payloadData: PayloadDataFromPopUp): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.AllAgents.ToastAgent.Notify(this.ScUiMan().TopLevelDoc(), payloadData.ScreenMessage);
    });
  }

  AddCETab(payloadData: PayloadDataFromPopUp, self: ContentManagerBase, targetDoc: IDataOneDoc, contentHub: ContentHub): Promise<void> {
    return new Promise(async (resolve, reject) => {
      //let targetDoc: IDataOneDoc = self.ScUiMan().TopLevelDoc();

      await self.AllAgents.HelperAgent.PromisesRecipes.FromDesktopOpenNewCEIframe(targetDoc)
        .then(() => {
          resolve();
          self.AllAgents.ToastAgent.Notify(self.ScUiMan().TopLevelDoc(), "Success");
        })

        .catch((err) => reject(err));
    });
  }


  PublischActiveCE() {
    return new Promise(async (resolve, reject) => {
      await this.OneScWinMan().PublishActiveCE(this.ScUiMan().TopLevelDoc())
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }


  async RemoveSnapShot(payloadData: PayloadDataFromPopUp) {
    return new Promise(async (resolve, reject) => {
      await this.AtticMan().RemoveOneFromStorage(payloadData.IdOfSelect)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
  async SaveWindowState(payloadData: PayloadDataFromPopUp) {
    return new Promise(async (resolve, reject) => {
      await this.OneScWinMan().SaveWindowState(payloadData.SnapShotSettings)
        .then(() => { this.AllAgents.Logger.MarkerA() })
        .then(() => { this.AllAgents.Logger.MarkerA() })
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  async ToggleCompactCss(payloadData: PayloadDataFromPopUp) {
    return new Promise(async (resolve, reject) => {
      await this.ToggleCompactCss(payloadData)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }
  RestoreSnapshop(payloadData: PayloadDataFromPopUp) {
    return new Promise(async (resolve, reject) => {
      await this.ContentHub.MsgMan.__restoreClick(payloadData)
        .then(() => resolve())
        .catch((err) => reject(err));
    });
  }

  OpenContentEditor() {
    throw new Error("Method not implemented.");
  }

  MarkFavorite(payloadData: PayloadDataFromPopUp) {
    return new Promise(async (resolve, reject) => {
      if (payloadData.IdOfSelect) {
        await this.AtticMan().GetFromStorageById(payloadData.IdOfSelect, CacheMode.OkToUseCache)
          .then((result: IDataOneWindowStorage) => {
            result.Flavor = SnapShotFlavor.Favorite;
            this.AtticMan().WriteToStorage(result);
          })
          .then(() => resolve())
          .catch((err) => { throw this.MarkFavorite.name + ' ' + err });
      } else {
        reject('no targetId');
      }
    });
  }

  Ping(payloadData: PayloadDataFromPopUp) {
    return new Promise(async (resolve, reject) => {
      //if (this. ReadyForMessages) {
      resolve(MsgFlag.RespListeningAndReady);
      //} else {
      //  reject(MsgFlag.RespNotReady)
      //}
    });
  }
  AdminB() {
    this.ScUiMan().AdminB(this.ScUiMan().TopLevelDoc(), null);
  }
  RestoreToNewTab() {
    throw new Error("Method not implemented.");
  }
}