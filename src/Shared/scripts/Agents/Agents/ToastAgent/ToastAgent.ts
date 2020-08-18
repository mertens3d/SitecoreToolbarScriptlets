import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerBase";
import { IToastAgent } from "../../../Interfaces/Agents/IToastAgent";
import { IDataOneDoc } from "../../../Interfaces/IDataOneDoc";
import { ContentConst } from "../../../Interfaces/InjectConst";

export class ToastAgent implements IToastAgent {
  private Logger: ILoggerAgent;
  private classSlideUp: string = 'slide-up';
  private classSlideDown: string = 'slide-down';
  constructor(loggerAgent: ILoggerAgent) {
    this.Logger = loggerAgent;
  }

  NotifyCompleteOnContent(targetDoc: IDataOneDoc = null, Message: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      this.Logger.FuncStart(this.NotifyCompleteOnContent.name);

      if (targetDoc) {
        let bodyTag = targetDoc.ContentDoc.getElementsByTagName('body')[0];//(treeGlyphTargetId);

        let toastContainer: HTMLElement = this.CreateToastContainer(targetDoc);
        let flagSlider: HTMLElement = this.CreateSliderDiv(targetDoc, Message);

        toastContainer.appendChild(flagSlider);
        var self = this;

        await setTimeout(async function () {
          flagSlider.classList.remove(self.classSlideDown);
          flagSlider.classList.add(self.classSlideUp);

          await setTimeout(async function () {
            flagSlider.classList.remove(self.classSlideUp);
            flagSlider.classList.add(self.classSlideDown);

            await setTimeout(function () {
              toastContainer.remove();
            }, 3000)
          }, 3000);//ContentConst.Const.Timeouts.WaitBeforeRemovingCompleteFlagOnContent);
        }, 3000);

        bodyTag.appendChild(toastContainer);
      }

      this.Logger.FuncEnd(this.NotifyCompleteOnContent.name);
    });
  }
  CreateSliderDiv(targetDoc: IDataOneDoc, Message: string): HTMLElement {
    let flagSlider: HTMLElement = targetDoc.ContentDoc.createElement('div');
    flagSlider.classList.add('slider');
    flagSlider.classList.add(this.classSlideDown);
    flagSlider.innerHTML = '<div class="header">HindSite</div><div class="message">' + Message + '</div>';

    return flagSlider;
  }

  CreateToastContainer(targetDoc: IDataOneDoc): HTMLElement {
    let flagContainer: HTMLElement = targetDoc.ContentDoc.createElement('div');
    flagContainer.classList.add('toast');

    return flagContainer
  }
}