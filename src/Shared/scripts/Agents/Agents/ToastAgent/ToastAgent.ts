import { ISingleClickEvent_Payload } from "../../../Events/SingleClickEvent/ISingleClickEvent_Payload";
import { SingleClickEvent_Observer } from "../../../Events/SingleClickEvent/SingleClickEvent_Observer";
import { SingleClickEvent_Subject } from "../../../Events/SingleClickEvent/SingleClickEvent_Subject";
import { ICommonCore } from "../../../Interfaces/Agents/ICommonCore";
import { IToastAgent } from "../../../Interfaces/Agents/IToastAgent";
import { _CommonBase } from "../../../_CommonCoreBase";
import { TaskMutationType } from "../LoggerAgent/TaskMutationType";
import { TaskListMutationEvent_Observer } from "../../../Events/TaskListMutationEvent/TaskListMutationEvent_Observer";
import { ITaskListMutationEvent_Payload } from "../../../Events/TaskListMutationEvent/ITaskListMutationEvent_Payload";
import { TypeDiscriminator } from "../../../Enums/70 - TypeDiscriminator";

export class ToastAgent extends _CommonBase implements IToastAgent {
  readonly TypeDiscriminator = TypeDiscriminator.ToastAgent;
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
  private FlagTextDiv: HTMLDivElement;
  private TaskMutationEvent_Observer: TaskListMutationEvent_Observer;

  constructor(commonCore: ICommonCore, targetDoc: Document) {
    super(commonCore);
    this.TargetDoc = targetDoc;
    this.DivineElements();
  }

  Instantiate() {
    this.TaskMutationEvent_Observer = new TaskListMutationEvent_Observer(this.CommonCore, this.CallBackOnTaskListMutationEvent.bind(this))
    this.TaskMonitor.TaskMutationEvent_Subject.RegisterObserver(this.TaskMutationEvent_Observer);
  }

  CallBackOnTaskListMutationEvent(payload: ITaskListMutationEvent_Payload) {
    if (payload.MutationType === TaskMutationType.TasksHaveGoneIdle) {
      this.LiftToast('');
    } else {
      this.SetSliderDivText(payload.CompletedCount + ':' + payload.TotalTaskCount);//+ '  ' + Math.ceil((payload.CompletedCount / payload.TotalTaskCount) * 100) +  '% ')
    }
  }

  async LiftToast(message: string): Promise<void> {
    this.Logger.FuncStart(this.DropToast.name);
    this.SetSliderDivText(message);
    await this.LowerToastA();
    this.Logger.FuncEnd(this.DropToast.name);
  }

  async DropToast(message: string): Promise<void> {
    try {
      this.Logger.FuncStart(this.DropToast.name);
      this.SetSliderDivText(message);

      await this.RaiseToastA();

      this.Logger.FuncEnd(this.DropToast.name);
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.DropToast.name, err);
    }
  }

  private DivineElements() {
    this.Logger.FuncStart(this.DivineElements.name);
    if (!this.HasBeenInit) {
      this.BodyTag = this.TargetDoc.getElementsByTagName('body')[0];//(treeGlyphTargetId);
      this.ToastContainer = this.CreateToastContainer(this.TargetDoc);
      this.CreateSliderDiv();
      this.CreateCancelButton();
      this.FlagSlider.appendChild(this.ButtonElem);

      this.BodyTag.appendChild(this.ToastContainer);
    }
    this.HasBeenInit = true;
    this.Logger.FuncEnd(this.DivineElements.name);
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
      this.ErrorHand.ErrorAndThrow(this.RaiseToastA.name, err);
    }
  }

  private async LowerToastA(): Promise<void> {
    try {
      var self = this;
      await setTimeout(async function () {
        self.FlagSlider.classList.remove(self.classSlideUp);
        self.FlagSlider.classList.add(self.classSlideDown);
      }, 1000);
    } catch (err) {
      this.ErrorHand.ErrorAndThrow(this.LowerToastA.name, err);
    }
  }

  private SetSliderDivText(sliderDivText: string) {
    if (this.FlagSlider) {
      this.FlagTextDiv.innerHTML = '<div class="header">HindSite</div><div class="message">' + sliderDivText + '</div>';
    }
  }

  TestCancelCallback() {
    this.TaskMonitor.RequestCancel();
  }

  private CreateCancelButton(): void {
    this.ButtonElem = this.TargetDoc.createElement('input');
    this.ButtonElem.type = "button";
    this.ButtonElem.value = "Cancel";

    this.OnButtonClick_Subject = new SingleClickEvent_Subject(this.CommonCore);
    this.OnButtonClick_ObserverTest = new SingleClickEvent_Observer(this.CommonCore, this.TestCancelCallback.bind(this));
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