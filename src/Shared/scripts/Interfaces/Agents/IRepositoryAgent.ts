import { IOneGenericSettingForStorage } from "../../Classes/IOneGenericSettingForStorage";
import { IOneStorageData } from "../IOneStorageData";

export interface IRepositoryAgent {
  GetBulkLocalStorageByKeyPrefix(targetPrefix: string): Promise<IOneStorageData[]>;
  ReadDataOfKey(targetKey: string): browser.storage.StorageValue;
  WriteGenericSettings(nonDefaultSettings: IOneGenericSettingForStorage[]): void;
}