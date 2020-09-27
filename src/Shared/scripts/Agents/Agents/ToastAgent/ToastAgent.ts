import { ILoggerAgent } from "../../../Interfaces/Agents/ILoggerAgent";
import { IToastAgent } from "../../../Interfaces/Agents/IToastAgent";

export class ToastAgent implements IToastAgent {
  private Logger: ILoggerAgent;
  private classSlideUp: string = 'slide-up';
  private classSlideDown: string = 'slide-down';
  private ToastContainer: HTMLElement;
  private FlagSlider: HTMLElement;
  private BodyTag: HTMLBodyElement;
  private HasBeenInit: boolean = false;
  private TargetDoc: Document;

  constructor(loggerAgent: ILoggerAgent, targetDoc: Document) {
    this.Logger = loggerAgent;
    this.TargetDoc = targetDoc;
    this.DivineElements();
  }

  async RaisePerpetualToast(message: string): Promise<void> {
    this.Logger.FuncStart(this.RaisePerpetualToast.name);
    this.SetSliderDivText(message);
    await this.RaiseToastA();
    this.Logger.FuncEnd(this.RaisePerpetualToast.name);
  }

  async LowerPerpetualToast() {
    var self = this;
    //setTimeout(async function () {
    this.FlagSlider.classList.remove(self.classSlideUp);
    this.FlagSlider.classList.add(self.classSlideDown);

    //setTimeout(function () {
    //  this.ToastContainer.remove();
    //}, 3000)
    //}, 0);
  }

  private DivineElements() {
    if (!this.HasBeenInit) {
      this.BodyTag = this.TargetDoc.getElementsByTagName('body')[0];//(treeGlyphTargetId);
      this.ToastContainer = this.CreateToastContainer(this.TargetDoc);
      this.FlagSlider = this.CreateSliderDiv();
      this.BodyTag.appendChild(this.ToastContainer);
    }
    this.HasBeenInit = true;
  }

  private async RaiseToastA(): Promise<void> {
    try {
      var self = this;
      await setTimeout(async function () {
        self.ToastContainer.appendChild(self.FlagSlider);
        self.FlagSlider.classList.remove(self.classSlideDown);
        self.FlagSlider.classList.add(self.classSlideUp);
      }, 1000);
    } catch (err) {
      this.Logger.ErrorAndThrow(this.RaiseToastA.name, err);
    }
  }

  RaiseToastNotification(message: string) {
    this.Logger.FuncStart(this.RaiseToastNotification.name);

    this.SetSliderDivText(message);

    this.RaiseToastA();

    var self = this;

    setTimeout(async function () {
      setTimeout(async function () {
        this.FlagSlider.classList.remove(self.classSlideUp);
        this.FlagSlider.classList.add(self.classSlideDown);

        setTimeout(function () {
          this.ToastContainer.remove();
        }, 3000)
      }, 3000);//ContentConst.Const.Timeouts.WaitBeforeRemovingCompleteFlagOnContent);
    }, 3000)

    this.Logger.FuncEnd(this.RaiseToastNotification.name);
  }

  private SetSliderDivText(sliderDivText: string) {
    if (this.FlagSlider) {
      this.FlagSlider.innerHTML = '<div class="header">HindSite</div><div class="message">' + sliderDivText + '</div>';
    }
  }
  private CreateSliderDiv(): HTMLElement {
    let flagSlider: HTMLElement = this.TargetDoc.createElement('div');
    flagSlider.classList.add('slider');
    flagSlider.classList.add(this.classSlideDown);

    return flagSlider;
  }

  CreateToastContainer(targetDoc: Document): HTMLElement {
    let flagContainer: HTMLElement = targetDoc.createElement('div');
    flagContainer.classList.add('toast');

    return flagContainer
  }
}