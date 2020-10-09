import { ContentConst } from '../../../../../../Shared/scripts/Interfaces/InjectConst';
import { _HindeCoreBase } from "../../../../../../Shared/scripts/_HindeCoreBase";
import { ScWindowType } from '../../../../../../Shared/scripts/Enums/5000 - scWindowType';
import { IButtonSelectors } from "./IButtonSelectors";
export class StartMenuButtonResolver extends _HindeCoreBase {

  GetButtonSelectors(scWindowType: ScWindowType): IButtonSelectors {
    let toReturn: IButtonSelectors = {
      L1Selector: null,
      Pop1Selector: null,
      Pop2Selector: null
    };
    switch (scWindowType) {
      case ScWindowType.ContentEditor:
        toReturn.L1Selector = ContentConst.Const.Selector.SC.StartMenuLeftOption;
        break;
      case ScWindowType.MediaLibrary:
        toReturn.L1Selector = ContentConst.Const.Selector.SC.MediaLibrary;
        break;
      case ScWindowType.PackageDesigner:
        toReturn.L1Selector = ContentConst.Const.Selector.SC.PopUp1.DevelopmentTools;
        toReturn.Pop1Selector = ContentConst.Const.Selector.SC.PopUp1.PackageDesignerButton; /// can't use TR....it's not guaranteed to be the first one. If powershell tools are installed it won't be
        break;
      case ScWindowType.TemplateManager:
        toReturn.L1Selector = ContentConst.Const.Selector.SC.TemplateManager;
        break;
      default:
    }

    return toReturn;
  }
}