import { DocumentJacket } from "../../../../../../DOMJacket/Document/DocumentJacket";
import { GenericElemJacket } from "../../../../../../DOMJacket/Elements/GenericElemJacket";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullElemProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullElemProxy";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";

export abstract class _BaseStateFullElemProxy<T> extends _APICoreBase implements IStateFullElemProxy {
  protected ContainerElemJacket: GenericElemJacket;

  abstract GetState(): Promise<T>;
  abstract SetState(state: T);

  constructor(apiCore: IAPICore,  containerElemJacket: GenericElemJacket) {
    super(apiCore);
    this.ContainerElemJacket = containerElemJacket;
  }
}