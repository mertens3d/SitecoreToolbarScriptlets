import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IStateFullProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _HindeCoreBase } from '../../../../../Shared/scripts/LoggableBase';
import { ContentEditorProxy } from './ContentEditorProxy';
import { ScDocumentProxy } from "../../ScDocumentProxy";
import { IStateOfPackageDesigner } from "../../../../../Shared/scripts/Interfaces/Data/States/IStateOfPackageDesigner";
import { _BaseStateFullProxy } from "../../Desktop/DesktopProxy/FrameProxies/_StateProxy";


export class PackageDesignerProxy extends _BaseStateFullProxy< IStateOfPackageDesigner  > implements IStateFullProxy<IStateOfPackageDesigner> {

  private DocumentProxy: ScDocumentProxy;
  Friendly: string;

  constructor(hindeCore: IHindeCore, documentProxy: ScDocumentProxy, friendly: string) {
    super(hindeCore);
    this.Logger.CTORStart(ContentEditorProxy.name);
    this.DocumentProxy = documentProxy;
    this.Friendly = friendly;
    this.Logger.CTOREnd(ContentEditorProxy.name);
  }
 
  Instantiate() {
    this.Logger.FuncStart(this.Instantiate.name, this.Friendly)
    this.Logger.FuncEnd(this.Instantiate.name, this.Friendly) 
  }

  WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name, this.Friendly) 
    this.Logger.FuncEnd(this.WireEvents.name, this.Friendly) 
  }

  GetState(): Promise<IStateOfPackageDesigner> {
    throw new Error("Method not implemented.");
  }
  SetState(state: IStateOfPackageDesigner) {
    throw new Error("Method not implemented.");
  }
}