import { IHindeCore } from "../../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { IDataOneDoc } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { _HindeCoreBase } from '../../../../../Shared/scripts/LoggableBase';
import { DocumentProxy } from '../../../../../Shared/scripts/Agents/Agents/UrlAgent/DocumentProxy';
import { ContentEditorProxy } from './ContentEditorProxy';
import { IStateFullProxy } from "../../../../../Shared/scripts/Interfaces/Agents/IStateProxy";
import { _BaseFrameProxy } from "../../Desktop/DesktopProxy/FrameProxies/_BaseFrameProxy";

export class PackageDesignerFrameProxy extends _BaseFrameProxy {


  Instantiate() {
    throw new Error("Method not implemented.");
  }

}
export class JQFrameProxy  extends _BaseFrameProxy   {

  Instantiate() {
        throw new Error("Method not implemented.");
    }

}
export class PackageDesignerProxy extends _HindeCoreBase implements IStateFullProxy {
  private DocumentProxy: DocumentProxy;
  Friendly: string;

  constructor(hindeCore: IHindeCore, documentProxy: DocumentProxy, friendly: string) {
    super(hindeCore);
    this.Logger.CTORStart(ContentEditorProxy.name);
    this.DocumentProxy = documentProxy;
    this.Friendly = friendly;
    this.Logger.CTOREnd(ContentEditorProxy.name);
  }
    Instantiate() {
        
    }
}