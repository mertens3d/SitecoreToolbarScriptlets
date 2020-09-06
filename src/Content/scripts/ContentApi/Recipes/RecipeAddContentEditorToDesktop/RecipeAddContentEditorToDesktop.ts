import { IDataOneIframe } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneIframe';
import { ICommandRecipes } from '../../../../../Shared/scripts/Interfaces/ICommandRecipes';
import { ContentConst } from '../../../../../Shared/scripts/Interfaces/InjectConst';
import { OneCEAgent } from '../../../Agents/OneCEAgent/OneCEAgent';
import { __RecipeBase } from '../__RecipeBase/__RecipeBase';
import { IframeHelper } from '../../../Helpers/IframeHelper';

export class RecipeAddNewContentEditorToDesktop extends __RecipeBase implements ICommandRecipes {
  Execute(): Promise<void> {
    return new Promise((resolve, reject) => {
      let allIframeDataAtBeginning: IDataOneIframe[];
      let newIframe: IDataOneIframe;
      let iframeHelper = new IframeHelper(this.Logger);

      iframeHelper.GetHostedIframes(this.TargetDoc)
        .then((result) => allIframeDataAtBeginning = result)
        .then(() => this.RecipeBasics.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, this.TargetDoc))
        .then(() => this.RecipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], this.TargetDoc))
        .then(() => this.RecipeBasics.WaitForNewIframe(allIframeDataAtBeginning, this.TargetDoc))
        .then((result) => newIframe = result)
        .then(() => this.RecipeBasics.WaitForReadyIframe(newIframe))
        .then(() => this.TargetCeAgent = new OneCEAgent(newIframe.ContentDoc, this.Logger))
        .then(() => resolve())
        .catch((err) => reject(this.Execute.name + ' ' + err));
    });
  }
    
}