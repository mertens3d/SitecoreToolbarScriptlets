import { IJacketOfType } from "../../../../../../Shared/scripts/IJacketOfType";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullElemProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullElemProxy";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";

export abstract class _BaseStateFullElemProxy<T> extends _APICoreBase implements IStateFullElemProxy {
  protected ContainerElemJacket: IJacketOfType;

  abstract GetState(): Promise<T>;
  abstract SetState(state: T): Promise<any>;

  constructor(apiCore: IAPICore, containerElemJacket: IJacketOfType) {
    super(apiCore);
    this.ContainerElemJacket = containerElemJacket;
  }
}