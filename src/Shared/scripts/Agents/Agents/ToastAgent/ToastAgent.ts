import { ISingleClickEvent_Payload } from "../../../../../PopUpUi/scripts/Events/SingleClickEvent/ISingleClickEvent_Payload";
import { SingleClickEvent_Observer } from "../../../../../PopUpUi/scripts/Events/SingleClickEvent/SingleClickEvent_Observer";
import { SingleClickEvent_Subject } from "../../../../../PopUpUi/scripts/Events/SingleClickEvent/SingleClickEvent_Subject";
import { IHindeCore } from "../../../Interfaces/Agents/ILoggerAgent";
import { IToastAgent } from "../../../Interfaces/Agents/IToastAgent";
import { _HindeCoreBase } from "../../../LoggableBase";

export class ToastAgent  extends _HindeCoreBase implements IToastAgent {

  private classSlideUp: string = 'slide-up';
  private classSlideDown: string = 'slide-down';
  private ToastContainer: HTMLElement;
  private FlagSlider: HTMLElement;
  private BodyTag: HTMLBodyElement;
  private HasBeenInit: boolean = false;
  private TargetDoc: Document;
  private ButtonElem: HTMLInputElement;
  OnButtonClick_Subject: SingleClickEvent_Subject;
  OnButtonClick_ObserverTest: SingleClickEvent_Observer;
  FlagTextDiv: HTMLDivElement;

  constructor(hindeCore: IHindeCore, targetDoc: Document) {
    super(hindeCore);
    this.TargetDoc = targetDoc;
    this.DivineElements();
  }

  async LowerPerpetualToast(message: string): Promise<void> {
    this.Logger.FuncStart(this.RaisePerpetualToast.name);
    this.SetSliderDivText(message);
    await this.LowerToastA();
    this.Logger.FuncEnd(this.RaisePerpetualToast.name);
  }

  async RaisePerpetualToast(message: string): Promise<void> {
    try {
      this.Logger.FuncStart(this.RaisePerpetualToast.name);
      this.SetSliderDivText(message);

      await this.RaiseToastA();

      this.Logger.FuncEnd(this.RaisePerpetualToast.name);
    } catch (err) {
      this.Logger.ErrorAndThrow(this.RaisePerpetualToast.name, err);
    }
  }

  async OnRaiseToastReq() {
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
      this.CreateSliderDiv();
      this.CreateCancelButton();
      this.FlagSlider.appendChild(this.ButtonElem);

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

  private async LowerToastA(): Promise<void> {
    try {
      var self = this;
      await setTimeout(async function () {
        self.FlagSlider.classList.remove(self.classSlideUp);
        self.FlagSlider.classList.add(self.classSlideDown);
      }, 3000);
    } catch (err) {
      this.Logger.ErrorAndThrow(this.LowerToastA.name, err);
    }
  }

  RaiseToastNotification(message: string) {
    this.Logger.FuncStart(this.RaiseToastNotification.name);

    this.SetSliderDivText(message);

    this.RaiseToastA();

    var self = this;

    //setTimeout(async function () {
    //  setTimeout(async function () {
    //    this.FlagSlider.classList.remove(self.classSlideUp);
    //    this.FlagSlider.classList.add(self.classSlideDown);

    //    setTimeout(function () {
    //      //this.ToastContainer.remove();
    //    }, 3000)
    //  }, 3000);//ContentConst.Const.Timeouts.WaitBeforeRemovingCompleteFlagOnContent);
    //}, 3000)

    this.Logger.FuncEnd(this.RaiseToastNotification.name);
  }

  private SetSliderDivText(sliderDivText: string) {
    if (this.FlagSlider) {
      this.FlagTextDiv.innerHTML = '<div class="header">HindSite</div><div class="message">' + sliderDivText + '</div>';
    }
  }

  TestCancelCallback() {
    this.Logger.CancelRequested(); 
    
  }

  private CreateCancelButton(): void {
    this.ButtonElem = this.TargetDoc.createElement('input');
    this.ButtonElem.type = "button";
    this.ButtonElem.value = "Cancel";

    this.OnButtonClick_Subject = new SingleClickEvent_Subject(this.HindeCore, this.CreateCancelButton.name);
    this.OnButtonClick_ObserverTest = new SingleClickEvent_Observer(this.HindeCore, this.TestCancelCallback.bind(this));
    this.OnButtonClick_Subject.RegisterObserver(this.OnButtonClick_ObserverTest);
    this.ButtonElem.addEventListener('click', (() => {
      let payload: ISingleClickEvent_Payload = {
        HandlerData: null
      }
      this.OnButtonClick_Subject.NotifyObserversAsync(payload)
    }))
  }

  private CreateSliderDiv(): void {
    this.FlagSlider = this.TargetDoc.createElement('div');
    this.FlagSlider.classList.add('slider');
    this.FlagSlider.classList.add(this.classSlideDown);

    this.FlagTextDiv = this.TargetDoc.createElement('div');
    this.FlagSlider.appendChild(this.FlagTextDiv);
  }

  CreateToastContainer(targetDoc: Document): HTMLElement {
    let flagContainer: HTMLElement = targetDoc.createElement('div');
    flagContainer.classList.add('toast');

    return flagContainer
  }
}