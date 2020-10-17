import { DocumentJacket } from "../../../../../../DOMJacket/Document/DocumentJacket";
import { IAPICore } from "../../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateFullElemProxy } from "../../../../../../Shared/scripts/Interfaces/Proxies/StateFull/IStateFullElemProxy";
import { _APICoreBase } from "../../../../../../Shared/scripts/_APICoreBase";

export abstract class _BaseStateFullElemProxy<T> extends _APICoreBase implements IStateFullElemProxy {
  HostDocumentJacket: DocumentJacket;
  abstract GetState(): Promise<T>;
  abstract SetState(state: T);

  constructor(apiCore: IAPICore, hostDocumentJacket: DocumentJacket) {
    super(apiCore);
    this.HostDocumentJacket = hostDocumentJacket;
  }
}