import { IOneStorageData } from "../IOneStorageData";

export interface IRepositoryAgent {
  GetBulkLocalStorageByKeyPrefix(targetPrefix: string): Promise<IOneStorageData[]>;
  ReadDataOfKey(targetKey: string): string;
  WriteByKey(storageKey: string, storageJson: string): void;
}