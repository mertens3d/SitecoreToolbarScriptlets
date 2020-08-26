﻿import { OneGenericSetting } from "./OneGenericSetting";
import { SettingKey } from "../../../Enums/3xxx-SettingKey";
import { SettingType } from "../../../Enums/SettingType";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { PopConst } from "../../../../../PopUp/scripts/Classes/PopConst";
import { SharedConst } from "../../../SharedConst";
import { IOneGenericSetting } from "../../../Interfaces/Agents/IOneGenericSetting";

export class ConstAllSettings {
  AllSettings: IOneGenericSetting[] = [
    new OneGenericSetting(
      SettingKey.LastUsedLogToStorageKey,
      SettingType.Number,
      0,
      null,
      0,
      SettingFlavor.ContentAndPopUpStoredInEach,
      'Rolling Prefix key for log to storage',
      false // has ui
    ),
    new OneGenericSetting(
      SettingKey.Test,
      SettingType.BoolCheckBox,
      null,
      PopConst.Const.Selector.HS.GenericSettingTest,
      false,
      SettingFlavor.PopUp,
      'Generic Setting Test'
    ),
    new OneGenericSetting(
      SettingKey.LogToConsole,
      SettingType.BoolCheckBox,
      true,
      PopConst.Const.Selector.HS.LogToConsole,
      SharedConst.Const.Settings.Defaults.LogToConsole,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Log to Console',
    ),
    new OneGenericSetting(
      SettingKey.UseCompactCss,
      SettingType.BoolCheckBox,
      false,
      PopConst.Const.Selector.HS.SettingUseCompactCss,
      SharedConst.Const.Settings.Defaults.UseCompactCss,
      SettingFlavor.ContentOnly,
      'Use Compact CSS',
    ),
    new OneGenericSetting(
      SettingKey.LogToConsole,
      SettingType.BoolCheckBox,
      true,
      PopConst.Const.Selector.HS.LogToConsole,
      SharedConst.Const.Settings.Defaults.LogToConsole,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Log to Console',
    ),
    //new OneGenericSetting(
    //  SettingKey.AutoSaveEnabled,
    //  SettingType.BoolCheckBox,
    //  null,
    //  PopConst.Const.Selector.HS.SettingAutoSaveEnabled,
    //  PopConst.Const.Storage.Defaults.bool.AutoSaveEnabled,
    //  SettingFlavor.ContentAndPopUp,
    //  'Auto Save Snapshot',
    // ),
    new OneGenericSetting(
      SettingKey.AutoSnapshotBeforeWindowChange,
      SettingType.BoolCheckBox,
      null,
      PopConst.Const.Selector.HS.AutoSnapshotBeforeWindowChange,
      PopConst.Const.Storage.Defaults.bool.AutoSnapshotBeforeWindowChange,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Auto Save Snapshot on HindSite Window Change',
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
    ),
    new OneGenericSetting(
      SettingKey.LgndPopUpLog,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndPopUpLog,
      PopConst.Const.Settings.Defaults.LgndPopUpLog,
      SettingFlavor.PopUp,
      'Pop Up Log',
    ),
    new OneGenericSetting(
      SettingKey.LgndForeSite,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndForeSite,
      PopConst.Const.Settings.Defaults.LgndForeSite,
      SettingFlavor.PopUp,
      'Fore&bull;Site',
    ),
    new OneGenericSetting(
      SettingKey.LgndHindSite,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndHindSite,
      PopConst.Const.Settings.Defaults.LgndHindSite,
      SettingFlavor.PopUp,
      'Hind&bull;Site',
    ),
    new OneGenericSetting(
      SettingKey.LgndInSite,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndInSite,
      PopConst.Const.Settings.Defaults.LgndInSite,
      SettingFlavor.PopUp,
      'In&bull;Site',
    ),
    new OneGenericSetting(
      SettingKey.LgndSettings,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndSettings,
      PopConst.Const.Settings.Defaults.LgndSettings,
      SettingFlavor.PopUp,
      'Settings',
    ),
    new OneGenericSetting(
      SettingKey.LgndMessages,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndMessages,
      PopConst.Const.Settings.Defaults.LgndMessages,
      SettingFlavor.PopUp,
      'Messages',
    ),
    new OneGenericSetting(
      SettingKey.LgndPopUpState,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndPopUpState,
      PopConst.Const.Settings.Defaults.LgndPopUpState,
      SettingFlavor.PopUp,
      'Pop Up State',
    ),
    new OneGenericSetting(
      SettingKey.LgndContentState,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndContentState,
      PopConst.Const.Settings.Defaults.LgndContentState,
      SettingFlavor.PopUp,
      'Content State',
    ),

    new OneGenericSetting(
      SettingKey.LgndBrowserState,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndBrowserState,
      PopConst.Const.Settings.Defaults.LgndBrowserState,
      SettingFlavor.PopUp,
      'Browser State',
    ),




    new OneGenericSetting(
      SettingKey.MaxAutoSaveCount,
      SettingType.Number,
      null,
      PopConst.Const.Selector.HS.SettingAutoSaveMaxCount,
      PopConst.Const.Numbers.MaxAutoSaveCount,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Auto Save Max Count',
    ),


    new OneGenericSetting(
      SettingKey.AutoSaveIntervalMin,
      SettingType.Number,
      null,
      PopConst.Const.Selector.HS.SettingAutoSaveInterval,
      PopConst.Const.Numbers.AutoSaveIntervalMin,
      SettingFlavor.ContentAndPopUpStoredInPopUp,
      'Auto Save Interval (Min) - 0 to disable',
    ),

    new OneGenericSetting(
      SettingKey.DebugKeepDialogOpen,
      SettingType.BoolCheckBox,
      null,
      PopConst.Const.Selector.HS.SettingDebugKeepDialogOpen,
      PopConst.Const.Settings.Defaults.DebugKeepDialogOpen,
      SettingFlavor.PopUp,
      '(Debug) Keep Dialog Open',
    )
  ];
}