export interface IStateFullProxy<T> {
  Instantiate();
  WireEvents();
  GetState(): Promise<T>;
  SetState(state: T): Promise<any>;
}
