import { DocumentJacket } from "../../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullDocProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullDocProxy";
import { _BaseScDocProxy } from "../../../StateFullDocProxies/_BaseScDocProxy";

export abstract class _BaseStateFullDocProxy<T> extends _BaseScDocProxy implements IStateFullDocProxy {
  abstract GetState(): Promise<T>;
  abstract SetState(state: T);
  Friendly: string = '{unknown friendly}';

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore, documentJacket);

  }
}