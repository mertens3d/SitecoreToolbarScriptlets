import { ScWindowType } from '../../../../Shared/scripts/Enums/scWindowType';
import { IToastAgent } from '../../../../Shared/scripts/Interfaces/Agents/IToastAgent';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataStateOfSitecoreWindow } from "../../../../Shared/scripts/Interfaces/Data/States/IDataStateOfSitecoreWindow";
import { ContentEditorProxy } from '../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { LoggableBase } from '../../../../Shared/scripts/LoggableBase';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { DesktopProxy } from '../../Proxies/Desktop/DesktopProxy/DesktopProxy';

export class ScWindowRecipePartials extends LoggableBase {
  constructor(logger: ILoggerAgent) {
    super(logger);
  }

 
}