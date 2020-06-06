﻿import { OneGenericSetting } from "./OneGenericSetting";
import { SettingKey } from "../../../Enums/SettingKey";
import { SettingType } from "../../../Enums/SettingType";
import { SettingFlavor } from "../../../Enums/SettingFlavor";
import { PopConst } from "../../../../../PopUp/scripts/Classes/PopConst";
import { SharedConst } from "../../../SharedConst";
import { IOneGenericSetting } from "../../../Interfaces/Agents/IOneGenericSetting";

export class ConstAllSettings {
   AllSettings: IOneGenericSetting[] = [
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
      SettingFlavor.ContentAndPopUp,
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
       SettingFlavor.ContentAndPopUp,
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
      SettingFlavor.ContentAndPopUp,
      'Auto Login',
    ),
    new OneGenericSetting(
      SettingKey.LgndLog,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndDebug,
      PopConst.Const.Settings.Defaults.LgndDebug,
      SettingFlavor.PopUp,
      'Log',
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
      SettingKey.LgndHindSite,
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
      SettingKey.LgndState,
      SettingType.Accordion,
      null,
      PopConst.Const.Selector.Legend.LgndState,
      PopConst.Const.Settings.Defaults.LgndState,
      SettingFlavor.PopUp,
      'State',
    ),
    new OneGenericSetting(
      SettingKey.MaxAutoSaveCount,
      SettingType.Number,
      null,
      PopConst.Const.Selector.HS.SettingAutoSaveMaxCount,
      PopConst.Const.Numbers.MaxAutoSaveCount,
      SettingFlavor.ContentAndPopUp,
      'Auto Save Max Count',
    ),
    new OneGenericSetting(
      SettingKey.AutoSaveIntervalMin,
      SettingType.Number,
      null,
      PopConst.Const.Selector.HS.SettingAutoSaveInterval,
      PopConst.Const.Numbers.AutoSaveIntervalMin,
      SettingFlavor.ContentAndPopUp,
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