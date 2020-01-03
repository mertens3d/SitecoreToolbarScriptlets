export interface iSitecoreUiManager {
  AssignOnClickEvent(targetId: string, handler: Function) : void
  AssignOnChangeEvent(targetId: string, handler: Function) : void
  AssignDblClickEvent(targetId: string, handler: Function) : void
  AssignMenuWindowChanged( handler: Function) : void
}