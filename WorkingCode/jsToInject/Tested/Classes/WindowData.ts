interface IWindowData {
  Window: Window;
}



class Opener {
  Document: Document;
  Window: Window;
  constructor() {
    this.Window = null;
    this.Document = null;
  }
}

class WindowData extends ManagerBase {
  Opener: Opener;

  constructor(xyyz: Hub) {
    super(xyyz);
    xyyz.debug.FuncStartName(this.constructor.name)
    this.Opener = new Opener();
    xyyz.debug.FuncEndName(this.constructor.name)
    xyyz.debug.FuncEndName(this.constructor.name)
  }
}