import { OneGenericSetting } from "./OneGenericSetting";
import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { SettingType } from "../../../Enums/SettingType";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { PopConst } from "../../../../../PopUp/scripts/Classes/PopConst";
import { SharedConst } from "../../../SharedConst";
import { IGenericSetting } from "../../../Interfaces/Agents/IGenericSetting";
import { Enabled } from "../../../Enums/Enabled";
import { ContentConst } from "../../../Interfaces/InjectConst";

export class ConstAllSettings {
  AllSettings: IGenericSetting[] = [
    new OneGenericSetting(
      SettingKey.LastUsedLogToStorageKey,
      SettingType.Number,
      0,
      null,
      0,
      SettingFlavor.ContentAndPopUpStoredInEach,
      'Rolling Prefix key for log to storage',
      Enabled.Enabled,
      false // has ui
    ),
    new OneGenericSetting(
      SettingKey.EnableLogging,
      SettingType.BoolCheckBox,
      true,
      PopConst.Const.Selector.HS.EnableLogging,
      SharedConst.Const.Settings.Defaults.EnableLogging,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Enable Logging (note: page refresh + open pop up required to fully realize)',
      Enabled.Enabled
    ),
    new OneGenericSetting(
      SettingKey.UseCompactCss,
      SettingType.BoolCheckBox,
      false,
      PopConst.Const.Selector.HS.SettingUseCompactCss,
      SharedConst.Const.Settings.Defaults.UseCompactCss,
      SettingFlavor.ContentOnly,
      'Use Compact CSS',
      Enabled.Disabled
    ),
    new OneGenericSetting(
      SettingKey.AutoSnapshotBeforeWindowChange,
      SettingType.BoolCheckBox,
      null,
      PopConst.Const.Selector.HS.AutoSnapshotBeforeWindowChange,
      PopConst.Const.Storage.Defaults.bool.AutoSnapshotBeforeWindowChange,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Auto Save Snapshot on HindSite Window Change',
      Enabled.Disabled
    ),
    //new OneGenericSetting(
    //  SettingKey.NotUsed,
    //  SettingType.BoolCheckBox,
    //  null,
    //  PopConst.Const.Selector.HS.SettingAutoSaveEnabled,
    //  PopConst.Const.Settings.Defaults.AutoSaveEnabled,
    //  SettingFlavor.Content,
    //  'todo',
    //),
    new OneGenericSetting(
      SettingKey.AutoLogin,
      SettingType.BoolCheckBox,
      null,
      PopConst.Const.Selector.HS.iCBoxdSettingsAutoLogin,
      PopConst.Const.Storage.Defaults.bool.AutoLogin,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Auto Login',
      Enabled.Disabled
    ),
    new OneGenericSetting(
      SettingKey.LgndPopUpLog,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndPopUpLog,
      PopConst.Const.Settings.Defaults.LgndPopUpLog,
      SettingFlavor.PopUp,
      'Pop Up Log',
      Enabled.Enabled
    ),
    new OneGenericSetting(
      SettingKey.LgndForeSite,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndForeSite,
      PopConst.Const.Settings.Defaults.LgndForeSite,
      SettingFlavor.PopUp,
      'Fore&bull;Site',
      Enabled.Enabled
    ),
    new OneGenericSetting(
      SettingKey.LgndHindSite,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndHindSite,
      PopConst.Const.Settings.Defaults.LgndHindSite,
      SettingFlavor.PopUp,
      'Hind&bull;Site',
      Enabled.Enabled
    ),
    new OneGenericSetting(
      SettingKey.LgndSettings,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndSettings,
      PopConst.Const.Settings.Defaults.LgndSettings,
      SettingFlavor.PopUp,
      'Settings',
      Enabled.Enabled
    ),
    new OneGenericSetting(
      SettingKey.LgndMessages,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndMessages,
      PopConst.Const.Settings.Defaults.LgndMessages,
      SettingFlavor.PopUp,
      'Messages',
      Enabled.Enabled
    ),
    new OneGenericSetting(
      SettingKey.LgndPopUpState,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndPopUpState,
      PopConst.Const.Settings.Defaults.LgndPopUpState,
      SettingFlavor.PopUp,
      'Pop Up State',
      Enabled.Enabled
    ),
    new OneGenericSetting(
      SettingKey.LgndContentState,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndContentState,
      PopConst.Const.Settings.Defaults.LgndContentState,
      SettingFlavor.PopUp,
      'Content State',
      Enabled.Enabled
    ),

    new OneGenericSetting(
      SettingKey.LgndBrowserState,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndBrowserState,
      PopConst.Const.Settings.Defaults.LgndBrowserState,
      SettingFlavor.PopUp,
      'Browser State',
      Enabled.Enabled
    ),

    new OneGenericSetting(
      SettingKey.MaxAutoSaveCount,
      SettingType.Number,
      null,
      PopConst.Const.Selector.HS.SettingAutoSaveMaxCount,
      PopConst.Const.Numbers.MaxAutoSaveCount,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Auto Save Max Count',
      Enabled.Disabled
    ),

    new OneGenericSetting(
      SettingKey.AutoSaveIntervalMin,
      SettingType.Number,
      null,
      PopConst.Const.Selector.HS.SettingAutoSaveInterval,
      PopConst.Const.Numbers.AutoSaveIntervalMin,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Auto Save Interval (Min) - 0 to disable',
      Enabled.Disabled
    ),

    new OneGenericSetting(
      SettingKey.DebugKeepDialogOpen,
      SettingType.BoolCheckBox,
      null,
      PopConst.Const.Selector.HS.SettingDebugKeepDialogOpen,
      PopConst.Const.Settings.Defaults.DebugKeepDialogOpen,
      SettingFlavor.PopUp,
      '(Debug) Keep Dialog Open',
      Enabled.Enabled
    ),
    new OneGenericSetting(
      SettingKey.AutoSaveRetainDays,
      SettingType.Number,
      null,
      PopConst.Const.Selector.HS.SettingAutoSaveSnapshotRetainDays,
      ContentConst.Const.DefaultMaxAutoSaveAgeDays,
      SettingFlavor.ContentOnly,
       'Days to Retain Auto Snap Shots',
      Enabled.Enabled
    )
  ];
}