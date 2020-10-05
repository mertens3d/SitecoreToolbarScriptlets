import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _HindeCoreBase } from '../../../../../Shared/scripts/LoggableBase';
import { ContentEditorSFProxy } from './ContentEditorProxy';
import { ScDocumentFacade } from "../../ScDocumentFacade";
import { IStateOfPackageDesigner } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfPackageDesigner";
import { _BaseStateFullProxy } from "../../Desktop/DesktopProxy/FrameProxies/_StateProxy";
import { StateFullProxyDisciminator } from "../../../../../Shared/scripts/Enums/4000 - StateFullProxyDisciminator";

export class PackageDesignerProxy extends _BaseStateFullProxy<IStateOfPackageDesigner> implements IStateFullProxy {
  StateFullProxyDisciminator = StateFullProxyDisciminator.PackageDesigner;
  private DocumentProxy: ScDocumentFacade;
  Friendly: string;

  constructor(hindeCore: IHindeCore, documentProxy: ScDocumentFacade, friendly: string) {
    super(hindeCore);
    this.Logger.CTORStart(ContentEditorSFProxy.name);
    this.DocumentProxy = documentProxy;
    this.Friendly = friendly;
    this.Logger.CTOREnd(ContentEditorSFProxy.name);
  }

  InstantiateAsyncMembers() {
    this.Logger.FuncStart(this.InstantiateAsyncMembers.name, this.Friendly)
    this.Logger.FuncEnd(this.InstantiateAsyncMembers.name, this.Friendly)
  }

  WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, this.Friendly)
    this.Logger.FuncEnd(this.WireEvents.name, this.Friendly)
  }

  async GetState(): Promise<IStateOfPackageDesigner> {
    this.Logger.Log('todo ' + PackageDesignerProxy.name);
    return null;
  }

  async SetState(state: IStateOfPackageDesigner): Promise<void> {
    this.Logger.Log('todo ' + PackageDesignerProxy.name);
    return null;
  }

  TriggerInboundEventsAsync(): void {
    this.Logger.Log('todo ' + PackageDesignerProxy.name);
  }
}