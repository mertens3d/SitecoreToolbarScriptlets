export interface IUiMan {
  AssignMenuWindowChanged(handler: Function): void
  AssignOnClickEvent(targetId: string, handler: Function): void
  AssignDblClickEvent(targetId: string, handler: Function): void
}