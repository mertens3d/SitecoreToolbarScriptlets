import { ILoggerAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { ISettingsAgent } from '../../../../../Shared/scripts/Interfaces/Agents/ISettingsAgent';
import { IframeProxy } from '../../../../../Shared/scripts/Interfaces/Data/IDataOneIframe';
import { LoggableBase } from '../../../Managers/LoggableBase';
import { ContentEditorProxy } from './ContentEditorProxy';

export class DesktopIframeProxy extends LoggableBase {
  NewCeProxy: ContentEditorProxy;
  SettingsAgent: ISettingsAgent;

  constructor(logger: ILoggerAgent, oneIframe: IframeProxy, settingsAgent: ISettingsAgent) {
    super(logger);
    this.SettingsAgent = settingsAgent;

    this.NewCeProxy = new ContentEditorProxy(oneIframe.GetContentDoc(), this.Logger, this.SettingsAgent, oneIframe.IframeElem.id);
  }

  async WaitForReadyAssociatedDocandInit(): Promise<void> {
    try {
      await this.NewCeProxy.WaitForReadyAssociatedDocandInit()
    } catch (err) {
      throw (this.WaitForReadyAssociatedDocandInit.name + ' ' + err)
    }
  }
}