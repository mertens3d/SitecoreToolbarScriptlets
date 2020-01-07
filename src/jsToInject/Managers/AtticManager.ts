import { Hub } from '../Managers/Hub';
import { ManagerBase } from '../_first/_ManagerBase';
import { scWindowType } from '../Enums/scWindowType';
import { IDataOneWindowStorage } from '../Interfaces/IDataOneWindowStorage';
import { IDataOneStorageCE } from '../Interfaces/IDataOneStorageCE';
import { IDataMenuWindowPrefs } from '../Interfaces/IDataMenuWindowPrefs';
import { IDataSettings } from '../Interfaces/IDataSettings';

export class AtticManager extends ManagerBase {
  
  eventAwesome: CustomEvent<string>;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStart(AtticManager.name);

    xyyz.debug.FuncEnd(AtticManager.name);

  }

  Init() {
    this.eventAwesome = new CustomEvent('awesome', { detail: 'some detail' });
  }

  //functioneventHandler(e) {
  //  console.log('this data is ' + e.detail);
  //}

  UpdateMenuCoords(menuData: IDataMenuWindowPrefs) {
    var settings: IDataSettings = this.CurrentSettings();
    settings.MenuPrefs = menuData;
    this.StoreSettings(settings);
  }


  UpdateNickname(self: AtticManager) {
    self.debug().FuncStart(self.UpdateNickname.name);

    var targetId: IGuid = self.UiMan().GetIdOfSelectWindowSnapshot();
    if (targetId) {
      var storageMatch = self.GetFromStorageById(targetId)
      if (storageMatch) {
        var newNickname = self.UiMan().GetValueInNickname();
        storageMatch.NickName = newNickname;
        self.WriteToStorage(storageMatch);
      }
    }

    self.debug().FuncEnd(self.UpdateNickname);
  }

  ToggleFavorite() {
    this.debug().FuncStart(this.ToggleFavorite.name);

    var targetId: IGuid = this.UiMan().GetIdOfSelectWindowSnapshot();
    if (targetId) {
      var storageMatch = this.GetFromStorageById(targetId)
      if (storageMatch) {
        storageMatch.IsFavorite = !storageMatch.IsFavorite;
        this.WriteToStorage(storageMatch);
      }
    }

    this.debug().FuncEnd(this.ToggleFavorite.name);
  }

  DrawDebugDataPretty(source: IDataOneWindowStorage): void {
    this.debug().FuncStart(this.DrawDebugDataPretty.name, 'source not null: ' + this.debug().IsNullOrUndefined(source));

    var allDebugData: string[] = this.__buildDebugDataPretty(source);

    allDebugData = allDebugData.concat(this.__drawSettings());


    for (var ldx = 0; ldx < allDebugData.length; ldx++) {
      this.Xyyz.FeedbackMan.WriteLine(allDebugData[ldx]);
    }

    this.debug().FuncEnd(this.DrawDebugDataPretty.name);
  }

  private __drawSettings():string[] {
    var toReturn: string[] = [];
    var settings = this.CurrentSettings();
    toReturn.push('----- Settings - Accordian ------')
    for (var idx = 0; idx < settings.Accordian.length; idx++) {
      toReturn.push(settings.Accordian[idx].ElemId + ':' + settings.Accordian[idx].isCollapsed.toString());

    }

    return toReturn;
  }

  __buildDebugDataPretty(dataOneWindow: IDataOneWindowStorage) {
    this.debug().FuncStart(this.__buildDebugDataPretty.name, 'data not null? ' + this.debug().IsNullOrUndefined(dataOneWindow));

    var toReturn: string[] = [];
    if (dataOneWindow) {
      toReturn.push('------ One Window Snap Shot Start -----');
      toReturn.push('Id: ' + dataOneWindow.Id);
      toReturn.push('TimeStamp: ' + dataOneWindow.TimeStamp);
      toReturn.push('CE Count: ' + dataOneWindow.AllCEAr.length);
      toReturn.push('Type: ' + scWindowType[dataOneWindow.WindowType]);
      toReturn.push('Nickname: ' + dataOneWindow.NickName);
      for (var jdx = 0; jdx < dataOneWindow.AllCEAr.length; jdx++) {
        toReturn.push('\t------ One CE Start -----');
        var dataOneCE: IDataOneStorageCE = dataOneWindow.AllCEAr[jdx];
        toReturn.push('\tId: ' + dataOneCE.Id.asString);

        var allCeDebugDataAr = this.Xyyz.OneCEMan.GetDebugDataOneCE(dataOneCE);
        for (var kdx = 0; kdx < allCeDebugDataAr.length; kdx++) {
          toReturn.push('\t\t' + allCeDebugDataAr[kdx]);
        }
        toReturn.push('\t------ One CE End -----');
      }
      toReturn.push('------ One Window Snap Shot End -----');

      this.debug().FuncEnd(this.__buildDebugDataPretty.name);
    } else {
      this.debug().Error(this.__buildDebugDataPretty.name, 'missing data')
    }
    return toReturn;
  }
  private __drawStorageRaw(ourData: IOneStorageData[]) {
    this.debug().FuncStart('DrawStorageRaw');
    for (var idx = 0; idx < ourData.length; idx++) {
      this.debug().Log('key: \t' + ourData[idx].key);
      this.debug().Log('data: \t' + ourData[idx].data);
      this.debug().Log('------------');
    }
    this.debug().FuncEnd('DrawStorageRaw');
  }
  private __drawStoragePretty(ourData: IOneStorageData[]) {
    this.debug().FuncStart(this.__drawStoragePretty.name);

    this.Xyyz.FeedbackMan.ClearTextArea();
    for (var idx = 0; idx < ourData.length; idx++) {
      this.debug().Log('key: \t' + ourData[idx].key);
      var parsed: IDataOneWindowStorage = <IDataOneWindowStorage>JSON.parse(ourData[idx].data);
      if (parsed) {
        this.DrawDebugDataPretty(parsed);
        this.debug().Log('------------');
      }
    }
    this.debug().FuncEnd(this.__drawStoragePretty.name);
  }

  UpdateAccodianState(needleKey: string, isCollapsed: boolean) {
    this.debug().FuncStart(this.UpdateAccodianState.name, needleKey + ' ' + isCollapsed);
    var settings: IDataSettings = this.CurrentSettings();

    var accordianPairs: IDataOneSettingPair[] = settings.Accordian;

    var found = null;
    for (var idx = 0; idx < accordianPairs.length; idx++) {
      var candidate = accordianPairs[idx];
      if (candidate.ElemId === needleKey) {
        found = true;
        candidate.isCollapsed = isCollapsed;
        break;
      }
    }

    if (!found) {
      var newSetting: IDataOneSettingPair = {
        ElemId: needleKey,
        isCollapsed: isCollapsed
      }

      accordianPairs.push(newSetting);
    }
    this.StoreSettings(settings);
    this.debug().FuncStart(this.UpdateAccodianState.name);
  }

  StoreSettings(currentSettings: IDataSettings) {
    //this.debug().FuncStart(this.StoreSettings.name);
    window.localStorage.setItem(this.Const().Storage.WindowRoot + this.Const().Storage.SettingsSuffix, JSON.stringify(currentSettings));
    //this.debug().FuncEnd(this.StoreSettings.name);
  }

  GetDefaultSettings(): IDataSettings {
    let defaultDebugSettings: IDataDebugSettings = {
      KeepDialogOpen: this.Const().Storage.DefaultDebugKeepDialogOpen,
      ShowDebugData: this.Const().Storage.ShowDebugData,
    }

    let defaultMenuPrefs: IDataMenuWindowPrefs = {
      MenuHeight: null,
      MenuWidth: null,
      MenuX: null,
      MenuY: null
    }


    let toReturn: IDataSettings = {
      DebugSettings: defaultDebugSettings,
      Accordian: [],
      MenuPrefs: defaultMenuPrefs
    };

    return toReturn;
  }

  CurrentSettings(): IDataSettings {
    //this.debug().FuncStart(this.CurrentSettings.name);
    var defaultSettings = this.GetDefaultSettings();
    var toReturn: IDataSettings;

    var settingsRaw = window.localStorage.getItem(this.Const().Storage.WindowRoot + this.Const().Storage.SettingsSuffix);
    //this.debug().LogVal('settingsRaw', settingsRaw);

    if (settingsRaw) {
      toReturn = <IDataSettings>JSON.parse(settingsRaw);
    }

    if (!toReturn) {
      toReturn = defaultSettings;
    }
    this.debug().NotNullCheck('toReturn', toReturn);

    if (!toReturn.DebugSettings) {
      toReturn.DebugSettings = defaultSettings.DebugSettings;
    }

    if (!toReturn.DebugSettings.KeepDialogOpen) {
      toReturn.DebugSettings.KeepDialogOpen = defaultSettings.DebugSettings.KeepDialogOpen;
    }

    if (!toReturn.DebugSettings.ShowDebugData) {
      toReturn.DebugSettings.ShowDebugData = defaultSettings.DebugSettings.ShowDebugData;
    }

    if (!toReturn.Accordian) {
      toReturn.Accordian = [];
    }

    if (!toReturn.MenuPrefs) {
      toReturn.MenuPrefs = defaultSettings.MenuPrefs;
    }

    //this.DebugSettings(toReturn);

    //this.debug().FuncEnd(this.CurrentSettings.name);
    return toReturn;
  }
  DebugSettings(toReturn: IDataSettings): void {
    this.debug().FuncStart(this.DebugSettings.name);

    this.debug().LogVal('Settings', JSON.stringify(toReturn));

    this.debug().FuncEnd(this.DebugSettings.name);
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
  WriteToStorage(dataOneWindow: IDataOneWindowStorage) {
    this.debug().FuncStart(this.WriteToStorage.name);

    var snapShotAsString = JSON.stringify(dataOneWindow);
    this.debug().Log('snapShotAsString: ' + snapShotAsString);

    window.localStorage.setItem(this.Const().Storage.WindowRoot + this.Const().Storage.SnapShotSuffix + dataOneWindow.Id.asString, snapShotAsString);

    this.UiMan().RefreshUi();
    this.debug().FuncEnd(this.WriteToStorage.name);
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
  RemoveOneFromStorage() {
    this.debug().FuncStart(this.RemoveOneFromStorage.name);

    var targetId: IGuid = this.UiMan().GetIdOfSelectWindowSnapshot();
    if (targetId) {
      var storageMatch = this.GetFromStorageById(targetId)
      if (storageMatch) {
        var result: boolean = confirm('Remove ?: ' + this.Xyyz.Utilities.TimeNicknameFavStr(storageMatch));
        if (result === true) {
          window.localStorage.removeItem(storageMatch.RawData.key);
        }
      }
    }

    this.UiMan().RefreshUi();
    this.debug().FuncEnd(this.RemoveOneFromStorage.name);
  }
  DrawStorage() {
    this.debug().FuncStart('DrawStorage');
    try {
      var ourData: IOneStorageData[] = this.__getAllLocalStorageAsIOneStorageData();
      if (ourData) {
        this.__drawStorageRaw(ourData)
        this.__drawStoragePretty(ourData)
      }
    } catch (e) {
      this.Xyyz.debug.Error(this.DrawStorage.name, e.message);
    }
    this.debug().FuncEnd('DrawStorage');
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
}