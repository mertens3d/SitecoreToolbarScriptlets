import { ILoggerAgent } from "../../../../../../../Shared/scripts/Interfaces/Agents/ILoggerBase";
import { IOneStorageData } from "../../../../../../../Shared/scripts/Interfaces/IOneStorageData";
import { UiFeedbackModuleBase } from "../UiFeedbackModuleBase/UiFeedbackModuleBase";
import { IDataOneWindowStorage } from "../../../../../../../Shared/scripts/Interfaces/IDataOneWindowStorage";
import { scWindowType } from "../../../../../../../Shared/scripts/Enums/scWindowType";
import { IDataOneStorageOneTreeState } from "../../../../../../../Shared/scripts/Interfaces/IDataOneStorageOneTreeState";
import { IDataOneTreeNode } from "../../../../../../../Shared/scripts/Interfaces/IDataOneTreeNode";
import { IOneGenericSetting } from "../../../../../../../Shared/scripts/Interfaces/Agents/IOneGenericSetting";
import { PopConst } from "../../../../../Classes/PopConst";
import { SettingKey } from "../../../../../../../Shared/scripts/Enums/3xxx-SettingKey";

export class StorageFeedbackModule extends UiFeedbackModuleBase {

  constructor(selector: string, loggerAgent: ILoggerAgent) {
    super(selector, loggerAgent)
  }

  async FromAtticDrawStorage() {
    this.Logger.FuncStart(this.FromAtticDrawStorage.name);
    try {
    } catch (e) {
    }
    this.Logger.FuncEnd(this.FromAtticDrawStorage.name);
  }

  private __drawStoragePretty(ourData: IOneStorageData[]) {
    this.Logger.FuncStart(this.__drawStoragePretty.name);

    this.ClearFeedbackElem();

    for (var idx = 0; idx < ourData.length; idx++) {
      this.Logger.Log('key: \t' + ourData[idx].key);
      var parsed: IDataOneWindowStorage = <IDataOneWindowStorage>JSON.parse(ourData[idx].data);
      if (parsed) {
        this.DrawDebugDataPretty(parsed);
        this.Logger.Log('------------');
      }
    }
    this.Logger.FuncEnd(this.__drawStoragePretty.name);
  }

  DebugDataOneNode(dataOneTreeNode: IDataOneTreeNode): string {
    this.Logger.FuncStart(this.DebugDataOneNode.name);
    var activeOrNot = dataOneTreeNode.IsActive ? '* ' : '  ';
    var expandedOrNot = dataOneTreeNode.IsExpanded ? '+ ' : '  ';

    var toReturn: string = activeOrNot + expandedOrNot + dataOneTreeNode.NodeId.AsString + ' ' + dataOneTreeNode.NodeFriendly;
    this.Logger.FuncEnd(this.DebugDataOneNode.name);
    return toReturn;
  }

  GetDebugDataOneCE(dataOneCe: IDataOneStorageOneTreeState): string[] {
    this.Logger.FuncStart('GetDebugDataOneCE');
    var toReturn: string[] = [];
    toReturn.push('------ All Tree Nodes -----');

    for (var idx = 0; idx < dataOneCe.AllTreeNodeAr.length; idx++) {
      this.Logger.Log('idx: ' + idx);
      var oneVal = this.DebugDataOneNode(dataOneCe.AllTreeNodeAr[idx]);
      this.Logger.Log('oneVal : ' + oneVal);
      toReturn.push(oneVal);
    }

    this.Logger.FuncEnd(this.GetDebugDataOneCE.name);
    return toReturn;
  }

  __buildDebugDataPretty(dataOneWindow: IDataOneWindowStorage) {
    this.Logger.FuncStart(this.__buildDebugDataPretty.name, 'data not null? ' + this.Logger.IsNullOrUndefined(dataOneWindow));

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
        var dataOneCE: IDataOneStorageOneTreeState = dataOneWindow.AllCEAr[jdx];
        //toReturn.push('\tId: ' + dataOneCE.Id.AsString);

        var allCeDebugDataAr = this.GetDebugDataOneCE(dataOneCE);
        for (var kdx = 0; kdx < allCeDebugDataAr.length; kdx++) {
          toReturn.push('\t\t' + allCeDebugDataAr[kdx]);
        }
        toReturn.push('\t------ One CE End -----');
      }
      toReturn.push('------ One Window Snap Shot End -----');

      this.Logger.FuncEnd(this.__buildDebugDataPretty.name);
    } else {
      this.Logger.ErrorAndThrow(this.__buildDebugDataPretty.name, 'missing data')
    }
    return toReturn;
  }

  DrawDebugDataPretty(source: IDataOneWindowStorage): void {
    this.Logger.FuncStart(this.DrawDebugDataPretty.name, 'source not null: ' + this.Logger.IsNullOrUndefined(source));

    var allDebugData: string[] = this.__buildDebugDataPretty(source);

    this.WriteManyLines(allDebugData);

    this.Logger.FuncEnd(this.DrawDebugDataPretty.name);
  }

  async FromAtticDrawPopUpLogStorage(lastId: IOneGenericSetting) {
    try {
      await browser.storage.local.get()
        .then((storageResults: browser.storage.StorageObject) => {
          //let lastId = storageResults[PopConst.Const.Storage.StorageLastKeyKey];
         

          this.Logger.LogAsJsonPretty('lastId xxxx', lastId);
          let keyToUse = PopConst.Const.Storage.StorageLogKeyPrefix + lastId.ValueAsInt();
          console.log("keyToUse: " + keyToUse);
          let storedValue: browser.storage.StorageValue = storageResults[keyToUse];
          if (storedValue) {
            let valueSplit: string[] = storedValue.toString().split('|||');
            if (valueSplit) {
              console.log("length " + valueSplit.length);
              for (var idx = 0; idx < valueSplit.length; idx++) {
                console.log(valueSplit[idx]);
              }
            }
          } else {
            this.Logger.Log('No storedVal');
          }
        });
    } catch (e) {
      this.Logger.ErrorAndThrow(this.FromAtticDrawPopUpLogStorage.name, e.toString());
    }
  }


}
