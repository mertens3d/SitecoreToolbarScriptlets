import { ScWindowType } from '../../../../Shared/scripts/Enums/scWindowType';
import { IToastAgent } from '../../../../Shared/scripts/Interfaces/Agents/IToastAgent';
import { ScDocumentFacade } from "../../Proxies/ScDocumentFacade";
import { IStateOfScUi } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ContentEditorSFProxy } from '../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { _HindeCoreBase } from '../../../../Shared/scripts/LoggableBase';
import { IHindeCore } from "../../../../Shared/scripts/Interfaces/Agents/IHindeCore";
import { DesktopSFProxy } from '../../Proxies/Desktop/DesktopProxy/DesktopProxy';

export class ScWindowRecipePartials extends _HindeCoreBase {
  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
  }

 
}