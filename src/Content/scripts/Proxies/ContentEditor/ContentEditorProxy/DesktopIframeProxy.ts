//import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
//import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
//import { FrameProxy } from '../../../../../Shared/scripts/Interfaces/Data/Proxies/FrameProxy';
//import { LoggableBase } from '../../../Managers/LoggableBase';
//import { ContentEditorProxy } from './ContentEditorProxy';

//export class DesktopFrameProxy extends LoggableBase {
//  NewCeProxy: ContentEditorProxy;
//  SettingsAgent: ISettingsAgent;

//  constructor(logger: ILoggerAgent, oneIframe: FrameProxy, settingsAgent: ISettingsAgent) {
//    super(logger);
//    this.SettingsAgent = settingsAgent;

//    this.NewCeProxy = new ContentEditorProxy(oneIframe.GetContentDoc(), this.Logger, this.SettingsAgent, oneIframe.IframeElem.id);
//  }

//  async WaitForReady(): Promise<void> {
//    try {
//      await this.NewCeProxy.WaitForReadyContentEditor()
//    } catch (err) {
//      throw (this.WaitForReady.name + ' ' + err)
//    }
//  }
//}