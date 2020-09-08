import { ILoggerAgent } from "../../../../../Shared/scripts/Interfaces/Agents/ILoggerAgent";
import { IDataOneDoc } from "../../../../../Shared/scripts/Interfaces/Data/IDataOneDoc";
import { LoggableBase } from "../../../Managers/LoggableBase";
import { DesktopProxy } from "./DesktopProxy";

export class ScContentEditorDomObserver extends LoggableBase {
  AddListenerNodeAdded(ReactToElementAdded: (ReactToElementAdded: any) => void) {
    this.Logger.ErrorAndContinue(this.AddListenerNodeAdded.name, "Method not implemented.");
    }
    AssociatedDoc: IDataOneDoc;
    constructor(logger: ILoggerAgent, targetDoc: IDataOneDoc) {
        super(logger);

        this.Logger.InstantiateStart(DesktopProxy.name);
        this.AssociatedDoc = targetDoc;
    }




    private AttachIframeAddedObserver() {
        this.Logger.FuncStart(this.AttachIframeAddedObserver.name);

        try {
            if (this.AssociatedDoc) {
                let observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === 'childList') {
                            this.Logger.LogVal('mutation.type', mutation.type);

                            this.Logger.Log('added nodes');

                            let mutatedElement: HTMLElement = <HTMLElement>(mutation.target);
                            this.Logger.Log('-----> ' + mutatedElement.id);
                        }
                    });
                });

                let desktop: HTMLElement = this.AssociatedDoc.ContentDoc.getElementById('Desktop');
                if (desktop) {
                    observer.observe(desktop, { attributes: false, subtree: false, childList: true });
                }
            }
            else {
                this.Logger.ErrorAndThrow(this.AttachIframeAddedObserver.name, 'no TreeHolder Elem');
            }
        }
        catch (err) {
            throw (err);
        }

        this.Logger.FuncEnd(this.AttachIframeAddedObserver.name);
    }
}
