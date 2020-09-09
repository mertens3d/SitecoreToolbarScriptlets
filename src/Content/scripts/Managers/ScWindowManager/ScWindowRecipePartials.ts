import { ScWindowType } from '../../../../Shared/scripts/Enums/scWindowType';
import { IToastAgent } from '../../../../Shared/scripts/Interfaces/Agents/IToastAgent';
import { IDataOneDoc } from '../../../../Shared/scripts/Interfaces/Data/IDataOneDoc';
import { IDataOneWindowStorage } from '../../../../Shared/scripts/Interfaces/Data/IDataOneWindowStorage';
import { ContentEditorProxy } from '../../Proxies/ContentEditor/ContentEditorProxy/ContentEditorProxy';
import { LoggableBase } from '../LoggableBase';
import { ILoggerAgent } from '../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent';
import { DesktopProxy } from '../../Proxies/Desktop/DesktopProxy/DesktopProxy';

export class ScWindowRecipePartials extends LoggableBase {
  ToastAgent: IToastAgent;

  constructor(logger: ILoggerAgent, toastAgent: IToastAgent) {
    super(logger);
    this.ToastAgent = toastAgent;
  }


  async RestoreStateToTargetDoc(targetDoc: IDataOneDoc, dataToRestore: IDataOneWindowStorage, desktopProxy: DesktopProxy, OneCEAgent: ContentEditorProxy): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.Logger.FuncStart(this.RestoreStateToTargetDoc.name);

            if (dataToRestore) {
                if (dataToRestore.WindowType == ScWindowType.Desktop) {
                    await desktopProxy.SetStateDesktop(targetDoc, dataToRestore)
                      .then(() => this.ToastAgent.PopUpToastNotification(targetDoc, 'Restore Completed'))
                        .then(() => resolve())
                        .catch((err) => reject(err));
                }
                else if (dataToRestore.WindowType === ScWindowType.ContentEditor) {
                    await OneCEAgent.SetStateDesktopIframeProxy(dataToRestore.AllCEAr[0])
                      .then(() => this.ToastAgent.PopUpToastNotification(targetDoc, 'Restore Completed'))
                        .then(() => resolve())
                        .catch((err) => reject(err));
                }
                else {
                    reject(this.RestoreStateToTargetDoc.name + 'Data not restored. Not in Desktop or Content Editor');
                }
            }
            else {
                reject(this.RestoreStateToTargetDoc.name + " No data found to restore");
            }

            reject(this.RestoreStateToTargetDoc.name + ' : unknown reason');

            this.Logger.FuncEnd(this.RestoreStateToTargetDoc.name);
        });
    }

}
