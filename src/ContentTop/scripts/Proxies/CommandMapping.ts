import { ReqCommandMsgFlag } from "../../../Shared/scripts/Enums/10 - MessageFlag"
import { APICommandFlag } from "../../../Shared/scripts/Enums/APICommand"
import { IMapMsgFlagToAPICommand } from "../../../Shared/scripts/Interfaces/IMapMsgFlagToAPICommand"

export class MappingMsgFlagToAPIFlag {
  static AllMapping: IMapMsgFlagToAPICommand[] = [
    {
      MsgFlag: ReqCommandMsgFlag.ReqAddCETab,
      APICommand: APICommandFlag.AddContentEditorToDesktopAsync
    }
    , {
      MsgFlag: ReqCommandMsgFlag.ReqAddCETab,
      APICommand: APICommandFlag.AddContentEditorToDesktopAsync,
    },
    {
      MsgFlag: ReqCommandMsgFlag.GetStateOfWindow,
      APICommand: APICommandFlag.GetStateOfScUiProxy,
    },
    {
      MsgFlag: ReqCommandMsgFlag.ReqAdminB,
      APICommand: APICommandFlag.AdminB,
    },
    {
      MsgFlag: ReqCommandMsgFlag.ReqOpenCE,
      APICommand: APICommandFlag.OpenContentEditor,
    }, {
      MsgFlag: ReqCommandMsgFlag.ReqToggleRawValues,
      APICommand: APICommandFlag.ToggleRawValues,
    },
    {
      MsgFlag: ReqCommandMsgFlag.OpenCERibbonPresentationDetails,
      APICommand: APICommandFlag.PresentationDetails,
    }, {
      MsgFlag: ReqCommandMsgFlag.OpenCERibbonNavigateLinks,
      APICommand: APICommandFlag.NavigateLinks,
    },
    {
      MsgFlag: ReqCommandMsgFlag.ReqNavigateBack,
      APICommand: APICommandFlag.NavigateBack,
    },
    {
      MsgFlag: ReqCommandMsgFlag.ReqNavigateForward,
      APICommand: APICommandFlag.NavigateForward,
    },
    {
      MsgFlag: ReqCommandMsgFlag.ReqNavigateUp,
      APICommand: APICommandFlag.NavigateUp,
    },
    {
      MsgFlag: ReqCommandMsgFlag.ReqQuickPublish,
      APICommand: APICommandFlag.PublischActiveCE,
    },
    {
      MsgFlag: ReqCommandMsgFlag.ReqGoToSelected,
      APICommand: APICommandFlag.CEGoSelected,
    },
    {
      MsgFlag: ReqCommandMsgFlag.ReqSetStateOfSitecoreSameWindow,
      APICommand: APICommandFlag.SetStateOfSitecoreWindowAsync,
    },
    {
      MsgFlag: ReqCommandMsgFlag.ReqToggleCompactCss,
      APICommand: APICommandFlag.ToggleCompactCss,
    },
  ]
}