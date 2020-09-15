import { IOneStorageData } from "../IOneStorageData";

export interface IRepositoryAgent {
  RemoveByKey(key: string);
  GetBulkLocalStorageByKeyPrefix(targetPrefix: string): IOneStorageData[];
  ReadDataOfKey(storageKey: string): string;
  WriteByKey(storageKey: string, storageJson: string): void;
}