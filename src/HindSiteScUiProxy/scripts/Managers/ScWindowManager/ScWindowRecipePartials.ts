import { ScWindowType } from '../../../../Shared/scripts/Enums/scWindowType';
import { IToastAgent } from '../../../../Shared/scripts/Interfaces/Agents/IToastAgent';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IStateOfScUiProxy } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ContentEditorProxy } from '../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { _HindeCoreBase } from '../../../../Shared/scripts/LoggableBase';
import { IHindeCore } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { DesktopProxy } from '../../Proxies/Desktop/DesktopProxy/DesktopProxy';

export class ScWindowRecipePartials extends _HindeCoreBase {
  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
  }

 
}