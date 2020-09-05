import { LoggableBase } from '../../../Content/scripts/Managers/LoggableBase';
import { OneCEAgent } from '../../../Content/scripts/Managers/OneCEAgent/OneCEAgent';
import { IDataOneDoc } from '../Interfaces/IDataOneDoc';
import { IDataOneIframe } from '../Interfaces/IDataOneIframe';
import { ContentConst } from '../Interfaces/InjectConst';
import { IPromiseRecipes } from '../Interfaces/IPromiseRecipes';
import { RecipeBasics } from './PromiseGeneric';

export class PromisesRecipes extends LoggableBase implements IPromiseRecipes {
  async FromDesktopOpenNewCEIframe(targetDoc: IDataOneDoc, recipeBasics: RecipeBasics): Promise<OneCEAgent> {
    return new Promise((resolve, reject) => {
      let allIframeDataAtBeginning: IDataOneIframe[];
      let targetCeAgent: OneCEAgent;
      let newIframe: IDataOneIframe;

      recipeBasics.GetAllLiveIframeData(targetDoc)
        .then((result) => allIframeDataAtBeginning = result)
        .then(() => recipeBasics.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, targetDoc))
        .then(() => recipeBasics.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], targetDoc))
        .then(() => recipeBasics.WaitForNewIframe(allIframeDataAtBeginning, targetDoc))
        .then((result) => newIframe = result)
        .then(() => recipeBasics.WaitForReadyIframe(newIframe))
        .then(() => targetCeAgent = new OneCEAgent(newIframe.ContentDoc, this.Logger))
        .then(() => resolve(targetCeAgent))
        .catch((err) => reject(this.FromDesktopOpenNewCEIframe.name + ' ' + err));
    });
  }
}