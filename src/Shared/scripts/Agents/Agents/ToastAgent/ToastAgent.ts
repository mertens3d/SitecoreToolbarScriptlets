import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerAgent";
import { IToastAgent } from "../../../Interfaces/Agents/IToastAgent";
import { IDataOneDoc } from "../../../Interfaces/IDataOneDoc";

export class ToastAgent implements IToastAgent {
  private Logger: ILoggerAgent;
  private classSlideUp: string = 'slide-up';
  private classSlideDown: string = 'slide-down';
  constructor(loggerAgent: ILoggerAgent) {
    this.Logger = loggerAgent;
  }

  PopUpToastNotification(targetDoc: IDataOneDoc = null, Message: string) {
    this.Logger.FuncStart(this.PopUpToastNotification.name);

    this.Logger.LogVal("Message", Message);

    if (targetDoc) {
      let bodyTag = targetDoc.ContentDoc.getElementsByTagName('body')[0];//(treeGlyphTargetId);

      let toastContainer: HTMLElement = this.CreateToastContainer(targetDoc);
      let flagSlider: HTMLElement = this.CreateSliderDiv(targetDoc, Message);

      toastContainer.appendChild(flagSlider);
      var self = this;

      setTimeout(async function () {
        flagSlider.classList.remove(self.classSlideDown);
        flagSlider.classList.add(self.classSlideUp);

        setTimeout(async function () {
          flagSlider.classList.remove(self.classSlideUp);
          flagSlider.classList.add(self.classSlideDown);

          setTimeout(function () {
            toastContainer.remove();
          }, 3000)
        }, 3000);//ContentConst.Const.Timeouts.WaitBeforeRemovingCompleteFlagOnContent);
      }, 3000)

      bodyTag.appendChild(toastContainer);
    }

    this.Logger.FuncEnd(this.PopUpToastNotification.name);
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