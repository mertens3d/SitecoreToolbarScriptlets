import { OneGenericSetting } from "../../../Shared/scripts/Classes/OneGenericSetting";
import { SettingKey } from "../../../Shared/scripts/Enums/SettingKey";
import { SettingType } from "../../../Shared/scripts/Enums/SettingType";
import { SettingFlavor } from "../../../Shared/scripts/Enums/SettingFlavor";
import { PopConst } from "../Classes/PopConst";
import { SharedConst } from "../../../Shared/scripts/SharedConst";

export class ConstAllSettings {
   AllSettings: OneGenericSetting[] = [
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
      null,
      PopConst.Const.Selector.HS.LogToConsole,
      SharedConst.Const.Settings.Defaults.LogToConsole,
      SettingFlavor.ContentAndPopUp,
      'Log to Console',
    ),
    new OneGenericSetting(
      SettingKey.AutoSaveEnabled,
      SettingType.BoolCheckBox,
      null,
      PopConst.Const.Selector.HS.SettingAutoSaveEnabled,
      PopConst.Const.Storage.Defaults.bool.AutoSaveEnabled,
      SettingFlavor.ContentAndPopUp,
      'Auto Save Snapshot',
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
      SettingType.Accordian,
      null,
      PopConst.Const.Selector.Legend.LgndDebug,
      PopConst.Const.Settings.Defaults.LgndDebug,
      SettingFlavor.PopUp,
      'Log',
    ),
    new OneGenericSetting(
      SettingKey.LgndForeSite,
      SettingType.Accordian,
      null,
      PopConst.Const.Selector.Legend.LgndForeSite,
      PopConst.Const.Settings.Defaults.LgndForeSite,
      SettingFlavor.PopUp,
      'Fore&bull;Site',
    ),
    new OneGenericSetting(
      SettingKey.LgndHindSite,
      SettingType.Accordian,
      null,
      PopConst.Const.Selector.Legend.LgndHindSite,
      PopConst.Const.Settings.Defaults.LgndHindSite,
      SettingFlavor.PopUp,
      'Hind&bull;Site',
    ),
    new OneGenericSetting(
      SettingKey.LgndHindSite,
      SettingType.Accordian,
      null,
      PopConst.Const.Selector.Legend.LgndInSite,
      PopConst.Const.Settings.Defaults.LgndInSite,
      SettingFlavor.PopUp,
      'In&bull;Site',
    ),
    new OneGenericSetting(
      SettingKey.LgndSettings,
      SettingType.Accordian,
      null,
      PopConst.Const.Selector.Legend.LgndSettings,
      PopConst.Const.Settings.Defaults.LgndSettings,
      SettingFlavor.PopUp,
      'Settings',
    ),
    new OneGenericSetting(
      SettingKey.LgndState,
      SettingType.Accordian,
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
      'Auto Save Interval (Minutes)',
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