console.log('_SpokeBase loaded');
class SpokeBase {
  Xyyz: Hub;

  constructor(xyyzHub: Hub) {
    //console.log(xyyzHub);
    this.Xyyz = xyyzHub;
    console.log('SpokeBase');
  }
}

exports = SpokeBase;