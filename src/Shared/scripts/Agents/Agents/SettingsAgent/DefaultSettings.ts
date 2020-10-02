import { PopConst } from "../../../Const/PopConst";
import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { UiEnableState } from "../../../Enums/Enabled";
import { ModuleKey } from "../../../Enums/ModuleKey";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { SettingType } from "../../../Enums/SettingType";
import { UiPresence } from "../../../Enums/UiPresence";
import { IHindSiteSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { ContentConst } from "../../../Interfaces/InjectConst";
import { _HindeCoreBase } from "../../../LoggableBase";
import { SharedConst } from "../../../SharedConst";
import { IHindeCore } from "../../../Interfaces/Agents/IHindeCore";
import { HindSiteSetting } from "./HindSiteSetting";
import { HindSiteSettingForNumbers } from "./HindSiteSettingForNumbers";
import { HindSiteSettingWrapper } from "./HindSiteSettingWrapper";

export class DefaultSettings extends _HindeCoreBase {

  constructor(hindeCore: IHindeCore) {
    super(hindeCore);
  }

  GetDefaultSettingsWrapper(): HindSiteSettingWrapper[] {
    let rawData: IHindSiteSetting[] = [

      new HindSiteSetting(

        SettingKey.LastUsedLogToStorageKey,
        SettingType.Number,
        null,
        SharedConst.Const.Settings.Defaults.EnableDebugging,
        SettingFlavor.ContentAndPopUpStoredInEach,
        'Rolling Prefix key for log to storage',
        UiEnableState.Enabled,
        UiPresence.HasNoUi,
        ModuleKey.Unknown,

      ),
      new HindSiteSetting(

        SettingKey.EnableDebugging,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.ModuleContainers.SettingEnableDebugging,
        SharedConst.Const.Settings.Defaults.EnableDebugging,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Enable Debugging',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,

      ),
      new HindSiteSetting(

        SettingKey.UseCompactCss,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.ModuleContainers.SettingUseCompactCss,
        SharedConst.Const.Settings.Defaults.UseCompactCss,
        SettingFlavor.ContentOnly,
        'Use Compact CSS',
        UiEnableState.Disabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,

      ),
      new HindSiteSetting(

        SettingKey.AutoSnapshotBeforeWindowChange,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.AutoSnapshotBeforeWindowChange,
        PopConst.Const.Storage.Defaults.bool.AutoSnapshotBeforeWindowChange,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto Save Snapshot on HindSite Window Change',
        UiEnableState.Disabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,

      ),
      new HindSiteSetting(

        SettingKey.AutoLogin,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.iCBoxdSettingsAutoLogin,
        PopConst.Const.Storage.Defaults.bool.AutoLogin,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto Login',
        UiEnableState.Disabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,

      ),
      new HindSiteSetting(

        SettingKey.LgndPopUpLog,
        SettingType.AccordionDebugging,
        PopConst.Const.Selector.HS.ModuleContainers.LgndPopUpLog,
        PopConst.Const.Settings.Defaults.LgndPopUpLog,
        SettingFlavor.PopUp,
        'Debugging - Pop Up Log',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.AccordionDebugging,

      ),
      new HindSiteSetting(

        SettingKey.LgndForeSite,
        SettingType.AccordionTypical,
        PopConst.Const.Selector.HS.ModuleContainers.LgndForeSite,
        PopConst.Const.Settings.Defaults.LgndForeSite,
        SettingFlavor.PopUp,
        'Fore&bull;Site',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.AccordionTypical,

      ),
      new HindSiteSetting(

        SettingKey.LgndHindSite,
        SettingType.AccordionTypical,
        PopConst.Const.Selector.HS.ModuleContainers.LgndHindSite,
        PopConst.Const.Settings.Defaults.LgndHindSite,
        SettingFlavor.PopUp,
        'Hind&bull;Site',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.AccordionTypical,

      ),
      new HindSiteSetting(

        SettingKey.LgndSettings,
        SettingType.AccordionTypical,
        PopConst.Const.Selector.HS.ModuleContainers.LgndSettings,
        PopConst.Const.Settings.Defaults.LgndSettings,
        SettingFlavor.PopUp,
        'Settings',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.AccordionTypical,

      ),
      new HindSiteSetting(

        SettingKey.LgndMessages,
        SettingType.AccordionDebugging,
        PopConst.Const.Selector.HS.ModuleContainers.LgndMessages,
        PopConst.Const.Settings.Defaults.LgndMessages,
        SettingFlavor.PopUp,
        'Debugging - Messages',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.AccordionDebugging,

      ),
      new HindSiteSetting(

        SettingKey.LgndPopUpState,
        SettingType.AccordionDebugging,
        PopConst.Const.Selector.HS.ModuleContainers.LgndPopUpState,
        PopConst.Const.Settings.Defaults.LgndPopUpState,
        SettingFlavor.PopUp,
        'Debugging - State of Pop-Up',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.AccordionDebugging,

      ),
      new HindSiteSetting(
        SettingKey.LgndPopUpDebug,
        SettingType.AccordionDebugging,
        PopConst.Const.Selector.HS.ModuleContainers.LgndPopUpDebug,
        PopConst.Const.Settings.Defaults.LgndPopUpState,
        SettingFlavor.PopUp,
        'Debugging',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.AccordionDebugging,
      ),
      new HindSiteSetting(

        SettingKey.LgndContentState,
        SettingType.AccordionDebugging,
        PopConst.Const.Selector.HS.ModuleContainers.LgndContentState,
        PopConst.Const.Settings.Defaults.LgndContentState,
        SettingFlavor.PopUp,
        'Debugging - Content State',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.AccordionDebugging,

      ),

      new HindSiteSetting(

        SettingKey.LgndBrowserState,
        SettingType.AccordionDebugging,
        PopConst.Const.Selector.HS.ModuleContainers.LgndBrowserState,
        PopConst.Const.Settings.Defaults.LgndBrowserState,
        SettingFlavor.PopUp,
        'Debugging - Browser State',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.AccordionDebugging,

      ),

      new HindSiteSettingForNumbers(

        SettingKey.MaxAutoSaveCount,
        SettingType.Number,
        PopConst.Const.Selector.HS.SettingAutoSaveMaxCount,
        PopConst.Const.Numbers.MaxAutoSaveCount,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto Save Max Count',
        UiEnableState.Disabled,
        UiPresence.HasUi,
        ModuleKey.Number,
        1,
        100
      ),

      new HindSiteSettingForNumbers(

        SettingKey.AutoSaveIntervalMin,
        SettingType.Number,
        PopConst.Const.Selector.HS.SettingAutoSaveInterval,
        PopConst.Const.Numbers.AutoSaveIntervalMin,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto Save Interval (Min) - 0 to disable',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Number,
        0,
        100

      ),

      new HindSiteSetting(

        SettingKey.DebugKeepDialogOpen,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.ModuleContainers.SettingDebugKeepDialogOpen,
        PopConst.Const.Settings.Defaults.DebugKeepDialogOpen,
        SettingFlavor.PopUp,
        'Keep Dialog Open',
        UiEnableState.Disabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,

      ),
      new HindSiteSetting(

        SettingKey.AutoRestoreState,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.ModuleContainers.SettingAutoRestoreState,
        PopConst.Const.Settings.Defaults.AutoRestoreState,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto-Restore State',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,

      ),
      new HindSiteSettingForNumbers(

        SettingKey.AutoSaveRetainDays,
        SettingType.Number,
        PopConst.Const.Selector.HS.SettingAutoSaveSnapshotRetainDays,
        ContentConst.Const.DefaultMaxAutoSaveAgeDays,
        SettingFlavor.ContentOnly,
        'Days to Retain Auto Snap Shots',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.Number,
        0,
        100,
      ),
      new HindSiteSetting(

        SettingKey.AutoRenameCeButton,
        SettingType.BoolCheckBox,
        PopConst.Const.Selector.HS.SettingAutoRenameCeTabButton,
        ContentConst.Const.DefaultAutoRenameCeTabButton,
        SettingFlavor.ContentAndPopUpStoredInPopUp,
        'Auto rename Content Editor tab button to match active node',
        UiEnableState.Enabled,
        UiPresence.HasUi,
        ModuleKey.CheckBox,

      ),
      //new HindSiteSetting(

      //  SettingKey._not_used,
      //  SettingType.BoolCheckBox,
      //  PopConst.Const.Selector.HS.ModuleContainers.SettingShowDebuggingModules,
      //  ContentConst.Const.DefaultShowDebuggingModules,
      //  SettingFlavor.PopUp,
      //  'Show Debugging Modules',
      //  UiEnableState.Enabled,
      //  UiPresence.HasUi,
      //  ModuleKey.CheckBox,
      //),
    ];

    let toReturn: HindSiteSettingWrapper[] = [];

    rawData.forEach((settingValue: HindSiteSetting) => {
      toReturn.push(new HindSiteSettingWrapper(this.HindeCore,  settingValue));
    })

    return toReturn;
  }
}