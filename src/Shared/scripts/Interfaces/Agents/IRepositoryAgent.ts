export interface IRepositoryAgent {
    WriteGenericSettings(nonDefaultSettings: import("../../Classes/IOneGenericSettingForStorage").IOneGenericSettingForStorage[]);
    WriteGenericSettings(nonDefaultSettings: import("../../Classes/IOneGenericSettingForStorage").IOneGenericSettingForStorage[]);
    ReadGenericSettings(): import("../../Classes/IOneGenericSettingForStorage").IOneGenericSettingForStorage[] | PromiseLike<import("../../Classes/IOneGenericSettingForStorage").IOneGenericSettingForStorage[]>;
}
