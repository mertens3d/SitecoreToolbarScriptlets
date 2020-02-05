﻿import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { PayloadDataFromPopUp } from '../../../Shared/scripts/Classes/PayloadDataReqPopUp';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { IDataPopUpSettings } from '../../../Shared/scripts/Interfaces/IDataSettings';
import { IOneStorageData } from '../../../Shared/scripts/Interfaces/IOneStorageData';
import { scWindowType } from '../../../Shared/scripts/Enums/scWindowType';

export class ContentAtticManager extends ContentManagerBase {
  //eventAwesome: CustomEvent<string>;

  constructor(xyyz: ContentHub) {
    super(xyyz);
    xyyz.debug.FuncStart(ContentAtticManager.name);

    xyyz.debug.FuncEnd(ContentAtticManager.name);
  }

  Init() {
  }
  //functioneventHandler(e) {
  //  console.log('this data is ' + e.detail);
  //}

  UpdateNickname(payload: PayloadDataFromPopUp) {
    this.debug().FuncStart(this.UpdateNickname.name);

    if (payload.IdOfSelect) {
      var storageMatch = this.GetFromStorageById(payload.IdOfSelect)
      if (storageMatch && payload.SnapShotSettings && payload.SnapShotSettings.SnapShotNewNickname) {

        storageMatch.NickName = payload.SnapShotSettings.SnapShotNewNickname;
        this.WriteToStorage(storageMatch);
      }
    }

    this.debug().FuncEnd(this.UpdateNickname);
  }

  ToggleFavorite(data: PayloadDataFromPopUp) {
    this.debug().FuncStart(this.ToggleFavorite.name);

    if (data.IdOfSelect) {
      var storageMatch = this.GetFromStorageById(data.IdOfSelect)
      if (storageMatch) {
        storageMatch.IsFavorite = !storageMatch.IsFavorite;
        this.WriteToStorage(storageMatch);
      }
    }

    this.debug().FuncEnd(this.ToggleFavorite.name);
  }
  WriteToStorage(dataOneWindow: IDataOneWindowStorage) {
    this.debug().FuncStart(this.WriteToStorage.name);

    var snapShotAsString = JSON.stringify(dataOneWindow);
    //this.debug().LogVal('snapShotAsString', snapShotAsString);

    window.localStorage.setItem(this.Const().Storage.WindowRoot + this.Const().Storage.SnapShotPrefix + dataOneWindow.Id.AsString, snapShotAsString);

    this.debug().FuncEnd(this.WriteToStorage.name);
  }

  GetFromStorageById(needleId: IGuid): IDataOneWindowStorage {
    this.debug().FuncStart(this.GetFromStorageById.name, needleId.AsString);
    var foundStorage: IDataOneWindowStorage[] = this.GetAllStorageAsIDataOneWindow();
    var DateOneWinStoreMatch: IDataOneWindowStorage = null;

    if (foundStorage) {
      for (var idx = 0; idx < foundStorage.length; idx++) {
        var candidate = foundStorage[idx];
        if (candidate.Id.AsString === needleId.AsString) {
          DateOneWinStoreMatch = candidate;
          break;
        }
      }
    }
    if (DateOneWinStoreMatch) {
      this.debug().Log('found match', this.Utilites().TimeNicknameFavStr(DateOneWinStoreMatch));
    } else {
      this.debug().Error(this.GetFromStorageById.name, 'Match notfound')
    }

    this.debug().FuncEnd(this.GetFromStorageById.name);
    return DateOneWinStoreMatch;
  }

  private __getAllLocalStorageAsIOneStorageData(): IOneStorageData[] {
    this.debug().FuncStart(this.__getAllLocalStorageAsIOneStorageData.name);
    var toReturn: IOneStorageData[] = [];

    var storageLength: number = window.localStorage.length;
    this.debug().LogVal('storageLength', storageLength);

    for (var idx: number = 0; idx < storageLength; idx++) {
      this.debug().LogVal('Processing Index', idx);

      var candidate: IOneStorageData = {
        data: '',
        key: '',
      };

      candidate.key = window.localStorage.key(idx);

      this.debug().LogVal('Candidate.key', candidate.key);

      if (candidate.key.startsWith(this.Const().Storage.WindowRoot + this.Const().Storage.SnapShotPrefix)) {
        this.debug().LogVal('valid candidate', true);

        candidate.data = window.localStorage.getItem(candidate.key);
        if (this.debug().IsNotNullOrUndefinedBool('candidate.data', candidate.data)) {
          toReturn.push(candidate);
        }
      }
    }

    this.debug().FuncEnd(this.__getAllLocalStorageAsIOneStorageData.name, toReturn.length);
    return toReturn;
  }

  GetAllStorageAsIDataOneWindow(): IDataOneWindowStorage[] {
    this.debug().FuncStart(this.GetAllStorageAsIDataOneWindow.name);
    var toReturn: IDataOneWindowStorage[] = [];
    var rawStorageData: IOneStorageData[] = this.__getAllLocalStorageAsIOneStorageData();
    if (rawStorageData) {
      for (var idx = 0; idx < rawStorageData.length; idx++) {
        var oneRaw: IOneStorageData = rawStorageData[idx];
        var candidate: IDataOneWindowStorage = <IDataOneWindowStorage>JSON.parse(oneRaw.data);
        console.log 

        if (candidate) {
          candidate.TimeStamp = new Date(candidate.TimeStamp);
          candidate.Id = this.Xyyz.GuidMan.ParseGuid(candidate.Id.AsString);
          candidate.RawData = oneRaw;

          if (!candidate.WindowType) {
            candidate.WindowType = scWindowType.Unknown;
            candidate.WindowFriendly = scWindowType[candidate.WindowType];
          }

          if (!candidate.NickName) {
            candidate.NickName = '';
          }
          toReturn.push(candidate);
        }
        else {
          this.debug().Error(this.GetAllStorageAsIDataOneWindow.name, 'Saved data did not import correctly')
        }
      }
    }

    toReturn.sort((a: IDataOneWindowStorage, b: IDataOneWindowStorage) =>
      +b.TimeStamp - +a.TimeStamp
    );

    this.debug().FuncEnd(this.GetAllStorageAsIDataOneWindow.name);
    return toReturn;
  }
  RemoveOneFromStorage(targetId: IGuid) {
    this.debug().FuncStart(this.RemoveOneFromStorage.name);

    if (targetId) {
      var storageMatch = this.GetFromStorageById(targetId)
      if (storageMatch) {
        var result: boolean = confirm('Remove ?: ' + this.Xyyz.Utilities.TimeNicknameFavStr(storageMatch));
        if (result === true) {
          window.localStorage.removeItem(storageMatch.RawData.key);
        }
      }
    }

    this.debug().FuncEnd(this.RemoveOneFromStorage.name);
  }

  GetRawFromStorageById(needleId: IGuid): IOneStorageData {
    this.debug().FuncStart(this.GetRawFromStorageById.name, needleId.AsString);
    var toReturn: IOneStorageData = null;
    var foundStorage: IOneStorageData[] = this.__getAllLocalStorageAsIOneStorageData();
    if (foundStorage) {
      for (var idx = 0; idx < foundStorage.length; idx++) {
        var candidate = foundStorage[idx];
        //if (candidate.key === needleId) {
        //}
      }
    }
    this.debug().FuncEnd(this.GetRawFromStorageById.name);

    return toReturn;
  }
}