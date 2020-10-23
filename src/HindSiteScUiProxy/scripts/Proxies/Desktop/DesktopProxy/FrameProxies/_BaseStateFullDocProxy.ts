import { DocumentJacket } from "../../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IBaseScDocProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/IBaseScDocProxy";
import { _BaseScProxy } from "../../../StateFullDocProxies/_BaseScDocProxy";

export abstract class _BaseStateFullDocProxy<T> extends _BaseScProxy implements IBaseScDocProxy {
  abstract GetState(): Promise<T>;
  abstract SetState(state: T): Promise<void>;
  Friendly: string = '{unknown friendly}';

  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore, documentJacket);

  }
}