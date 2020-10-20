import { DocumentJacket } from "../../../../../DOMJacket/scripts/Document/DocumentJacket";
import { IAPICore } from "../../../../../Shared/scripts/Interfaces/Agents/IAPICore";
import { IStateLessDocProxy } from "../../../../../Shared/scripts/Interfaces/Proxies/IStateLessDocProxy";
import { _BaseScDocProxy } from "../../StateFullDocProxies/_BaseScDocProxy";

export abstract class _BaseStateLessScDocProxy extends _BaseScDocProxy  {
  constructor(apiCore: IAPICore, documentJacket: DocumentJacket) {
    super(apiCore, documentJacket);
  }

  async OnFocus(): Promise<any> {
    //empty by default
  }

  protected _BaseInstantiateAsyncMembers() {
  }

  async InstantiateAsyncMembers() {
    return this._BaseInstantiateAsyncMembers();
  }

  TriggerInboundEventsAsync(): void {
    //empty
  }

  async WireEvents(): Promise<void> {
    //return this._BaseWireEvents();
  }

  protected async _BaseWireEvents(): Promise<void> {
    this.Logger.FuncStart([_BaseStateLessScDocProxy.name, this.WireEvents.name]);

    this.Logger.FuncEnd([_BaseStateLessScDocProxy.name, this.WireEvents.name]);
  }
}