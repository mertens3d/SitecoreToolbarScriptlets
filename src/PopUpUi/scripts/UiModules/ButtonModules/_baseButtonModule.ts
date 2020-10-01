import { MenuCommandKey } from "../../../../Shared/scripts/Enums/2xxx-MenuCommand";
import { CommandButtonEvents } from "../../../../Shared/scripts/Enums/CommandButtonEvents";
import { ModuleKey } from "../../../../Shared/scripts/Enums/ModuleKey";
import { ILoggerAgent } from "../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { ICommandHandlerDataForPopUp } from "../../../../Shared/scripts/Interfaces/ICommandHandlerDataForPopUp";
import { IMenuCommandDefinition } from "../../../../Shared/scripts/Interfaces/IMenuCommandDefinition";
import { UiHydrationData } from "../../../../Shared/scripts/Interfaces/UiHydrationData";
import { ISingleClickEvent_Payload } from "../../Events/SingleClickEvent/ISingleClickEvent_Payload";
import { _UiModuleBase } from "../_UiModuleBase";
import { SingleClickEvent_Subject } from "../../Events/SingleClickEvent/SingleClickEvent_Subject";

export abstract class _base_ButtonModule extends _UiModuleBase {
  abstract ModuleKey: ModuleKey = ModuleKey.Unknown;
  HTMLButtonElement: HTMLButtonElement = null;
  protected MenuCommandDefinition: IMenuCommandDefinition;
  protected RefreshData: UiHydrationData;
  public Friendly = this.MenuCommandDefinition ? MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey] : this.ContainerSelector;
  public SingleButtonClickEvent_Subject: SingleClickEvent_Subject;

  constructor(loggerAgent: ILoggerAgent, menuCommandDefinition: IMenuCommandDefinition) {
    super(loggerAgent, menuCommandDefinition ? menuCommandDefinition.PlaceHolderSelector : null);
    this.MenuCommandDefinition = menuCommandDefinition;
  }

  protected Init_BaseButtonModule(): void {
    this.Init_UiModuleBase();
  }

  protected WireEvents_Base(): void {
    this.WireClickEvents();
  }

  BuildHtmlForModule_base_ButtonModule(): void {
    this.Logger.FuncStart(this.BuildHtmlForModule_base_ButtonModule.name, this.MenuCommandDefinition.InnerText + ' ' + MenuCommandKey[this.MenuCommandDefinition.MenuCommandKey]);
    if (this.ContainerUiDivElem) {
      this.BuildButtonElem();
      this.ContainerUiDivElem.classList.add('btn-container');
      this.ContainerUiDivElem.appendChild(this.HTMLButtonElement);
    } else {
      this.Logger.ErrorAndContinue(this.BuildHtmlForModule_base_ButtonModule.name, 'Could not find ' + this.MenuCommandDefinition.PlaceHolderSelector);
    }
    this.Logger.FuncEnd(this.BuildHtmlForModule_base_ButtonModule.name);
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

  private BuildButtonElem(): void {
    //<div id='PresentationDetails' type = 'button' class="button-wrapper icon details" > Presentation Details < /div>
    this.HTMLButtonElement = document.createElement("button");
    this.HTMLButtonElement.classList.add("icon");
    this.HTMLButtonElement.classList.add(this.MenuCommandDefinition.IconClassName);
    this.HTMLButtonElement.innerText = this.MenuCommandDefinition.InnerText;
    this.HTMLButtonElement.type = "button";
  }
  private WireSingleClickEvent(): void {
    if (this.HTMLButtonElement) {
      this.HTMLButtonElement.addEventListener('click', (evt) => {
        let singleClickEvent_payload: ISingleClickEvent_Payload = {
          HandlerData: this.MenuCommandDefinition.EventHandlerData
        };

        this.SingleButtonClickEvent_Subject.NotifyObserversAsync(singleClickEvent_payload);
      });
    } else {
      this.Logger.ErrorAndThrow(this.WireSingleClickEvent.name, 'No button element: ' + this.MenuCommandDefinition.PlaceHolderSelector);
    }
  }

  private WireDoubleClickEvent(): void {
    //this.UiMan().AssignDblClickEvent(PopConst.Const.Selector.HS.SelStateSnapShot, (evt) => { this.Handlers.External.HndlrSnapShotRestoreNewTab(evt, this.PopHub); });
    //this.UiMan().AssignDblClickEvent(PopConst.Const.Selector.HS.FeedbackLogElement, (evt) => { this.Handlers.Internal.__cleardebugTextWithConfirm(evt, this.PopHub); });

    if (this.HTMLButtonElement) {
      this.HTMLButtonElement.ondblclick = (evt) => {
        let data: ICommandHandlerDataForPopUp = this.BuildCommandDataForPopUp();
        data.Evt = evt;
        //data.EventMan.RouteAllCommandEvents(data);
      };
    }
  }

  private BuildCommandDataForPopUp(): ICommandHandlerDataForPopUp {
    let data: ICommandHandlerDataForPopUp = {
      EventMan: null,
      MenuCommandDefinition: this.MenuCommandDefinition,
      EventHandlerData: this.MenuCommandDefinition.EventHandlerData,
      Evt: null,
    }

    return data;
  }
}