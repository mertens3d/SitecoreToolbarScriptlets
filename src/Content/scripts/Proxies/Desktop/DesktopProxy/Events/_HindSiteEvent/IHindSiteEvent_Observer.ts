export interface IHindSiteEvent_Observer<T> {
  Friendly: string;
  UpdateAsync(payload: T): void;
}