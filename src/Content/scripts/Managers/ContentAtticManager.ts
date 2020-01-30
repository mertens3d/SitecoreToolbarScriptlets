import { ContentHub } from './ContentHub';
import { ContentManagerBase } from '../_first/_ContentManagerBase';
import { PayloadDataFromPopUp } from '../../../Shared/scripts/Classes/PayloadDataReqPopUp';
import { IDataOneWindowStorage } from '../../../Shared/scripts/Interfaces/IDataOneWindowStorage';
import { IGuid } from '../../../Shared/scripts/Interfaces/IGuid';
import { IDataSettings } from '../../../Shared/scripts/Interfaces/IDataSettings';
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

    if (payload.idOfSelect) {
      var storageMatch = this.GetFromStorageById(payload.idOfSelect)
      if (storageMatch) {
        storageMatch.NickName = payload.NewNickname;
        this.WriteToStorage(storageMatch);
      }
    }

    this.debug().FuncEnd(this.UpdateNickname);
  }

  ToggleFavorite(data: PayloadDataFromPopUp) {
    this.debug().FuncStart(this.ToggleFavorite.name);

    if (data.idOfSelect) {
      var storageMatch = this.GetFromStorageById(data.idOfSelect)
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
    this.debug().Log('snapShotAsString: ' + snapShotAsString);

    window.localStorage.setItem(this.Const().Storage.WindowRoot + this.Const().Storage.SnapShotSuffix + dataOneWindow.Id.asString, snapShotAsString);

    this.debug().FuncEnd(this.WriteToStorage.name);
  }

  GetFromStorageById(needleId: IGuid): IDataOneWindowStorage {
    this.debug().FuncStart(this.GetFromStorageById.name, needleId.asString);
    var foundStorage: IDataOneWindowStorage[] = this.GetAllStorageAsIDataOneWindow();
    var DateOneWinStoreMatch: IDataOneWindowStorage = null;

    if (foundStorage) {
      for (var idx = 0; idx < foundStorage.length; idx++) {
        var candidate = foundStorage[idx];
        if (candidate.Id.asString === needleId.asString) {
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

    for (var idx = 0; idx < window.localStorage.length; idx++) {
      var candidate: IOneStorageData = {
        data: '',
        key: '',
      };

      candidate.key = window.localStorage.key(idx);

      if (candidate.key.startsWith(this.Const().Storage.WindowRoot + this.Const().Storage.SnapShotSuffix)) {
        candidate.data = window.localStorage.getItem(candidate.key);
        toReturn.push(candidate);
      }
    }

    this.debug().FuncEnd(this.__getAllLocalStorageAsIOneStorageData.name);
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

        if (candidate) {
          candidate.TimeStamp = new Date(candidate.TimeStamp);
          candidate.Id = this.Xyyz.GuidMan.ParseGuid(candidate.Id.asString);
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
    this.debug().FuncStart(this.GetRawFromStorageById.name, needleId.asString);
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