import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IScStateFullProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _HindeCoreBase } from '../../../../../Shared/scripts/LoggableBase';
import { ContentEditorProxy } from './ContentEditorProxy';
import { ScDocumentProxy } from "../../ScDocumentProxy";


export class PackageDesignerProxy extends _HindeCoreBase implements IScStateFullProxy {
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
}