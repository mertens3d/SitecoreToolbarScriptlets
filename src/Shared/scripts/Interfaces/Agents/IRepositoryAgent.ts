import { IOneStorageData } from "../IOneStorageData";

export interface IRepositoryAgent {
  RemoveByKey(key: string);
  GetBulkLocalStorageByKeyPrefix(targetPrefix: string): IOneStorageData[];
  ReadDataOfKey(targetKey: string): string;
  WriteByKey(storageKey: string, storageJson: string): void;
}