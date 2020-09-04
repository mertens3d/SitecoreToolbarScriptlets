import { HelperBase } from './HelperBase';
import { IPromiseRecipes } from '../Interfaces/IPromiseRecipes';
import { IDataOneDoc } from '../Interfaces/IDataOneDoc';
import { OneCEAgent } from '../../../Content/scripts/Managers/OneCEAgent/OneCEAgent';
import { IDataOneIframe } from '../Interfaces/IDataOneIframe';
import { ContentConst } from '../Interfaces/InjectConst';

export class PromisesRecipes extends HelperBase implements IPromiseRecipes {

  async FromDesktopOpenNewCEIframe(targetDoc: IDataOneDoc): Promise<OneCEAgent> {
    return new Promise((resolve, reject) => {
      let allIframeDataAtBeginning: IDataOneIframe[];
      let targetCeAgent: OneCEAgent;
      let newIframe: IDataOneIframe;

      this.HelperAgent.PromisesBasic.GetAllLiveIframeData(targetDoc)
        .then((result) => allIframeDataAtBeginning = result)
        .then(() => this.HelperAgent.PromisesBasic.RaceWaitAndClick(ContentConst.Const.Selector.SC.scStartButton, targetDoc))
        .then(() => this.HelperAgent.PromisesBasic.WaitForThenClick([ContentConst.Const.Selector.SC.StartMenuLeftOption], targetDoc))
        .then(() => this.HelperAgent.PromisesBasic.WaitForNewIframe(allIframeDataAtBeginning, targetDoc))
        .then((result) => newIframe = result)
        .then(() => this.HelperAgent.PromisesBasic.WaitForReadyIframe(newIframe) )
        .then(() => targetCeAgent = new OneCEAgent(newIframe.ContentDoc, this.Logger))
        .then(() => resolve(targetCeAgent))
        .catch((err) => { throw this.FromDesktopOpenNewCEIframe.name + ' ' + err });
    });
  }
}
