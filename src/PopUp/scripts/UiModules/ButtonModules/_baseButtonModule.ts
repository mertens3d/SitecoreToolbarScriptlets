import { MenuCommandKey } from "../../../../Shared/scripts/Enums/2xxx-MenuCommand";
import { CommandButtonEvents } from "../../../../Shared/scripts/Enums/CommandButtonEvents";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ICommandHandlerDataForPopUp } from "../../../../Shared/scripts/Interfaces/ICommandHandlerDataForPopUp";
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { UiHydrationData } from "../../../../Shared/scripts/Interfaces/MenuCommand";
import { ISingleClickEvent_Payload } from "../../Events/SelectSnapUiMutationEvent/ISelectSnapUiMutationEvent_Payload";
import { SingleClickEvent_Subject } from "../../Events/SelectSnapUiMutationEvent/SelectSnapUiMutationEvent_Subject.1";
import { _UiModuleBase } from "../UiFeedbackModules/_UiModuleBase";

export class _baseButtonModule extends _UiModuleBase {
  protected MenuCommandDefinition: IMenuCommandDefinition;

  protected RefreshData: UiHydrationData;
  ModuleKey: ModuleKey = ModuleKey.Unknown;
  Friendly = this.MenuCommandDefinition ? MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey] : '{error 111}';
  protected ElemButton: HTMLButtonElement;
  public SingleButtonClickEvent_Subject: SingleClickEvent_Subject;

  constructor(loggerAgent: ILoggerAgent, menuCommandDefinition: IMenuCommandDefinition) {
    super(loggerAgent, menuCommandDefinition ? menuCommandDefinition.PlaceHolderSelector : null);
    this.MenuCommandDefinition = menuCommandDefinition;
  }

  protected Init_BaseButtonModule(): void {
    this.InitUiModuleBase();
  }

  protected WireEvents_Base(): void {
    this.WireClickEvents();
  }

  WireClickEvents(): void {
    this.SingleButtonClickEvent_Subject = new SingleClickEvent_Subject(this.Logger, MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey]);

    if (this.MenuCommandDefinition && this.MenuCommandDefinition.PlaceHolderSelector) {
      var targetElem: HTMLElement = document.querySelector(this.MenuCommandDefinition.PlaceHolderSelector);
      if (targetElem) {
        if (this.MenuCommandDefinition.EventHandlerData.Event === CommandButtonEvents.OnSingleClick) {
          this.WireSingleClickEvent();
        } else if (this.MenuCommandDefinition.EventHandlerData.Event === CommandButtonEvents.OnDoubleClick) {
          this.WireDoubleClickEvent()
        }
      } else {
        this.Logger.ErrorAndThrow(this.WireClickEvents.name, 'did not find placeholder: ' + this.MenuCommandDefinition.PlaceHolderSelector);
      }
    } else {
      this.Logger.ErrorAndThrow(this.WireClickEvents.name, 'no command or no command placeholder');
    }
  }

  private WireSingleClickEvent(): void {
    if (this.ElemButton) {
      this.ElemButton.addEventListener('click', (evt) => {
        let singleClickEvent_payload: ISingleClickEvent_Payload = {
          HandlerData: this.MenuCommandDefinition.EventHandlerData
        };

        this.SingleButtonClickEvent_Subject.NotifyObservers(singleClickEvent_payload);

        //let data: ICommandHandlerDataForPopUp = this.BuildCommandData();
        //data.Evt = evt;
        //data.EventMan = eventMan;
        //data.EventMan.RouteAllCommandEvents(data);
      });
    } else {
      this.Logger.ErrorAndThrow(this.WireSingleClickEvent.name, 'No Id: ' + this.MenuCommandDefinition.PlaceHolderSelector);
    }
  }

  private WireDoubleClickEvent(): void {
    //this.UiMan().AssignDblClickEvent(PopConst.Const.Selector.HS.SelStateSnapShot, (evt) => { this.Handlers.External.HndlrSnapShotRestoreNewTab(evt, this.PopHub); });
    //this.UiMan().AssignDblClickEvent(PopConst.Const.Selector.HS.FeedbackLogElement, (evt) => { this.Handlers.Internal.__cleardebugTextWithConfirm(evt, this.PopHub); });

    if (this.ElemButton) {
      this.ElemButton.ondblclick = (evt) => {
        let data: ICommandHandlerDataForPopUp = this.BuildCommandData();
        data.Evt = evt,
          data.EventMan.RouteAllCommandEvents(data)
      };
    }
  }

  private BuildCommandData(): ICommandHandlerDataForPopUp {
    this.MenuCommandDefinition.EventHandlerData.Handler = this.MenuCommandDefinition.EventHandlerData.Handler.bind(this);

    let data: ICommandHandlerDataForPopUp = {
      EventMan: null,
      MenuCommandParams: this.MenuCommandDefinition,
      EventHandlerData: this.MenuCommandDefinition.EventHandlerData,
      Evt: null,
    }

    return data;
  }

  Hydrate(refreshData: UiHydrationData): void {
    this.Logger.FuncStart(this.Hydrate.name, this.Friendly);
    this.RefreshData = refreshData;
    this.Logger.FuncEnd(this.Hydrate.name, this.Friendly);
  }
}