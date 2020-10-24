﻿import { TypeDiscriminator } from "../../Enums/70 - TypeDiscriminator";
import { ISingleClickEvent_Payload } from "../../Events/SingleClickEvent/ISingleClickEvent_Payload";
import { SingleClickEvent_Observer } from "../../Events/SingleClickEvent/SingleClickEvent_Observer";
import { SingleClickEvent_Subject } from "../../Events/SingleClickEvent/SingleClickEvent_Subject";
import { ITaskListMutationEvent_Payload } from "../../Events/TaskListMutationEvent/ITaskListMutationEvent_Payload";
import { TaskListMutationEvent_Observer } from "../../Events/TaskListMutationEvent/TaskListMutationEvent_Observer";
import { ICommonCore } from "../../Interfaces/Agents/ICommonCore";
import { IToastAgent } from "../../Interfaces/Agents/IToastAgent";
import { _CommonBase } from "../../_CommonCoreBase";
import { TaskMutationType } from "../../Enums/TaskMutationType";
import { SharedConst } from "../../SharedConst";
import { CommandStartEndCancelEvent_Observer } from "../../Events/CommandStartEndCancelEvent/CommandStartEndCancelEvent_Observer";
import { ICommandStartEndCancelEvent_Payload } from "../../Events/CommandStartEndCancelEvent/ICommandStartEndCancelEvent_Payload";
import { CommandState_State } from "../../Events/CommandStartEndCancelEvent/CommandState_State";
import { CommandRouter } from "../../../../ContentTop/scripts/Proxies/CommandRouter";

export class ToastAgent extends _CommonBase implements IToastAgent {

  readonly TypeDiscriminator = TypeDiscriminator.ToastAgent;
  private classSlideUp: string = 'slide-up';
  private classSlideDown: string = 'slide-down';
  private ToastContainer: HTMLElement;
  private FlagSlider: HTMLElement;
  private BodyTag: HTMLBodyElement;
  private HasBeenInit: boolean = false;
  private TargetDoc: Document;
  OnButtonClick_Subject: SingleClickEvent_Subject;
  OnButtonClick_ObserverTest: SingleClickEvent_Observer;
  private FlagTextDiv: HTMLDivElement;
  private WaitingLight: HTMLDivElement;
  private TaskMutationEvent_Observer: TaskListMutationEvent_Observer;
  private MessageDiv: HTMLDivElement;
  private CancelButtonElem: HTMLInputElement;
  private waitingLightClassOn: string = 'waiting-on';
  private waitingLightClassOff: string = 'waiting-off';
  private mouseBlockerClassOff: string = 'mouse-blocker-off';
  private mouseBlockerClassOn: string = 'mouse-blocker-on';
  private MouseBlocker: HTMLDivElement;
   private  CommandTriggeredEvent_Observer: CommandStartEndCancelEvent_Observer;

  constructor(commonCore: ICommonCore, targetDoc: Document) {
    super(commonCore);
    this.TargetDoc = targetDoc;
    this.DivineElements();
  }

  public WireEvents() {
    this.Logger.FuncStart(this.WireEvents.name);
    this.TaskMutationEvent_Observer = new TaskListMutationEvent_Observer(this.CommonCore, this.CallBackOnTaskListMutationEvent.bind(this))
    this.TaskMonitor.TaskMutationEvent_Subject.RegisterObserver(this.TaskMutationEvent_Observer);


    this.CommandTriggeredEvent_Observer = new CommandStartEndCancelEvent_Observer(this.CommonCore, this.OnCommandStartEndCancelEvent.bind(this));


    this.Logger.FuncEnd(this.WireEvents.name);
  }

  private async OnCommandStartEndCancelEvent(payload: ICommandStartEndCancelEvent_Payload): Promise<void> {
    this.Logger.FuncStart(this.OnCommandStartEndCancelEvent.name);
    if (payload.CommandState == CommandState_State.CommandStarted) {
      this.ShowToastAsync('Starting to do something')
    } else if (payload.CommandState == CommandState_State.CommandCompletedSuccessfully) {
    }

    this.Logger.FuncEnd(this.OnCommandStartEndCancelEvent.name);
  }

  ObserveRouter(commandRouter: CommandRouter) {
    if (this.CommandTriggeredEvent_Observer && commandRouter) {
      commandRouter.CommandTriggeredEvent_Subject.RegisterObserver(this.CommandTriggeredEvent_Observer);
    }
  }
  CallBackOnTaskListMutationEvent(payload: ITaskListMutationEvent_Payload) {
    if (payload.MutationType === TaskMutationType.TasksHaveGoneIdle) {
      this.HideToast('');
    } else {
      if (payload.MutationType === TaskMutationType.TaskWaitingYes) {
        this.TurnOnWaitingLight(true);
      } else {
        this.TurnOnWaitingLight(false);
      }

      this.SetSliderDivText(payload.CompletedCount + ':' + payload.TotalTaskCount);//+ '  ' + Math.ceil((payload.CompletedCount / payload.TotalTaskCount) * 100) +  '% ')
    }
  }

  TurnOnWaitingLight(isOn: boolean) {
    if (isOn) {
      this.WaitingLight.classList.add(this.waitingLightClassOn);
      this.WaitingLight.classList.remove(this.waitingLightClassOff);
    } else {
      this.WaitingLight.classList.remove(this.waitingLightClassOn);
      this.WaitingLight.classList.add(this.waitingLightClassOff);
    }
  }

  async HideToast(message: string): Promise<void> {
    this.Logger.FuncStart(this.HideToast.name);
    this.TurnOnMouseBlocker(false);
    this.SetSliderDivText(message);
    this.LowerToastAsync();
    this.Logger.FuncEnd(this.HideToast.name);
  }

  async ShowToastAsync(message: string): Promise<void> {
    try {
      this.Logger.FuncStart(this.ShowToastAsync.name);
      this.SetSliderDivText(message);
      this.TurnOnMouseBlocker(true);
      this.TurnOnWaitingLight(false);
      this.RaiseToastAsync();
      this.Logger.FuncEnd(this.ShowToastAsync.name);
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.ShowToastAsync.name, err);
    }
  }
  private TurnOnMouseBlocker(isOn: boolean) {
    if (this.MouseBlocker) {
      if (isOn) {
        this.MouseBlocker.classList.add(this.mouseBlockerClassOn);
        this.MouseBlocker.classList.remove(this.mouseBlockerClassOff);

      } else {
        this.MouseBlocker.classList.add(this.mouseBlockerClassOff);
        this.MouseBlocker.classList.remove(this.mouseBlockerClassOn);
      }
    }
  }

  private DivineElements() {
    this.Logger.FuncStart(this.DivineElements.name);
    if (!this.HasBeenInit) {
      this.BodyTag = <HTMLBodyElement> this.TargetDoc.getElementsByTagName(SharedConst.Const.KeyWords.Html.Tags.Body)[0];//(treeGlyphTargetId);
      this.ToastContainer = this.CreateToastContainer(this.TargetDoc);
      this.CreateSliderDiv();
      this.CreateCancelButton();
      this.CreateMouseBlocker();
      this.FlagSlider.appendChild(this.CancelButtonElem);

      this.BodyTag.appendChild(this.ToastContainer);
    }
    this.HasBeenInit = true;
    this.Logger.FuncEnd(this.DivineElements.name);
  }

  private async RaiseToastAsync(): Promise<void> {
    try {
      var self = this;
      setTimeout(async function () {
        self.ToastContainer.appendChild(self.FlagSlider);
        self.FlagSlider.classList.remove(self.classSlideDown);
        self.FlagSlider.classList.add(self.classSlideUp);
      }, 1000);
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.RaiseToastAsync.name, err);
    }
  }

  private async LowerToastAsync(): Promise<void> {
    try {
      var self = this;
      setTimeout(async function () {
        self.FlagSlider.classList.remove(self.classSlideUp);
        self.FlagSlider.classList.add(self.classSlideDown);
      }, 1000);
    } catch (err: any) {
      this.ErrorHand.HandleFatalError(this.LowerToastAsync.name, err);
    }
  }

  private SetSliderDivText(sliderDivText: string) {
    if (this.MessageDiv) {
      //let headerElem: HTMLDivElement = this.TargetDoc.createElement('div');
      //headerElem.innerText = "HindSite";
      //headerElem.classList.add("header");

      //let headWrapper: HTMLDivElement = this.TargetDoc.createElement('div');
      //headWrapper.innerText = "HindSite";
      //headWrapper.classList.add("header");

      //this.MessageDiv = this.TargetDoc.createElement('div');
      //this.MessageDiv.innerText = "";
      //this.MessageDiv.classList.add("message");

      //let bigDiv: HTMLDivElement = this.TargetDoc.createElement('div');

      //let closeButton: HTMLInputElement = this.CreateCloseButton();

      this.FlagTextDiv.innerHTML = sliderDivText;
    }
  }

  CancelCallback() {
    this.TaskMonitor.RequestCancel(ToastAgent.name + '.' + this.CancelCallback.name);
  }

  private CallbackOnCloseButton() {
    this.HideToast('Closing');
  }

  private CreateCloseButton(): HTMLInputElement {
    let closeButtonElem: HTMLInputElement = this.TargetDoc.createElement('input');
    closeButtonElem.type = "button";
    closeButtonElem.value = "X";
    closeButtonElem.classList.add("close-btn");

    //let closeButton: string = '<div class="close-btn" id="toast-close-btn">X</div>'

    //this.OnButtonClick_Subject_Close = new SingleClickEvent_Subject(this.CommonCore);
    //this.OnButtonClick_ObserverTest_Close = new SingleClickEvent_Observer(this.CommonCore, this.CallbackOnCloseButton.bind(this));
    //this.OnButtonClick_Subject_Close.RegisterObserver(this.OnButtonClick_ObserverTest);

    closeButtonElem.addEventListener('click', (() => this.CallbackOnCloseButton()));

    return closeButtonElem;
  }

  private CreateMouseBlocker(): void {
    this.MouseBlocker = this.TargetDoc.createElement('div');
    this.MouseBlocker.classList.add('mouse-blocker');
    this.MouseBlocker.classList.add('mouse-blocker-off');
    document.body.appendChild(this.MouseBlocker);
  }

  private CreateCancelButton(): void {
    this.CancelButtonElem = this.TargetDoc.createElement('input');
    this.CancelButtonElem.type = "button";
    this.CancelButtonElem.value = "Cancel";

    this.OnButtonClick_Subject = new SingleClickEvent_Subject(this.CommonCore);
    this.OnButtonClick_ObserverTest = new SingleClickEvent_Observer(this.CommonCore, this.CancelCallback.bind(this));
    this.OnButtonClick_Subject.RegisterObserver(this.OnButtonClick_ObserverTest);
    this.CancelButtonElem.addEventListener('click', (() => {
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

    this.WaitingLight = this.TargetDoc.createElement('div');
    this.WaitingLight.classList.add(this.waitingLightClassOff);
    this.WaitingLight.classList.add('waiting');

    let closeButton: HTMLInputElement = this.CreateCloseButton();

    let headerElem: HTMLDivElement = this.TargetDoc.createElement('div');
    headerElem.innerText = "HindSite";
    headerElem.classList.add("header");

    let headWrapper: HTMLDivElement = this.TargetDoc.createElement('div');
    headWrapper.classList.add("header-wrapper");

    this.MessageDiv = this.TargetDoc.createElement('div');
    this.MessageDiv.innerText = "";
    this.MessageDiv.classList.add("message");

    this.FlagTextDiv = this.TargetDoc.createElement('div');

    headWrapper.appendChild(headerElem);
    headWrapper.appendChild(closeButton);

    this.FlagSlider.appendChild(headWrapper);
    this.FlagSlider.appendChild(this.WaitingLight);
    this.FlagSlider.appendChild(this.MessageDiv);

    this.FlagSlider.appendChild(this.FlagTextDiv);
  }

  CreateToastContainer(targetDoc: Document): HTMLElement {
    let flagContainer: HTMLElement = targetDoc.createElement('div');
    flagContainer.classList.add('toast');

    return flagContainer
  }
}