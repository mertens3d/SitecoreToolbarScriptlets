const fs = require('fs');
const vars = require('./vars');

class Helper {
  MyResources(fileName, varName) {
    console.log('-----------------------');
    console.log('s) myResources: fileName: ' + fileName + ' : ' + varName);
    var fileContent = fs.readFileSync(fileName, 'utf8');
    fileContent = fileContent.replace(/\r|\n/gi, '');
    fileContent = fileContent.replace(/"/gi, '\'');
    var toReturn = 'var ' + varName + ' = \"' + fileContent + '\";'; // + '\r\n';
    //console.log(toReturn);
    console.log('e) myResources');
    return (toReturn);
  };

  CleanHtml(PopUpWithVar) {
    PopUpWithVar = PopUpWithVar.replace(/<!doctype html>/gi, '');
    PopUpWithVar = PopUpWithVar.replace(/<html>/gi, '');
    PopUpWithVar = PopUpWithVar.replace(/<head>.*<\/head>/gi, '');
    PopUpWithVar = PopUpWithVar.replace(/<body>/gi, '');
    PopUpWithVar = PopUpWithVar.replace(/<\/body>/gi, '');
    PopUpWithVar = PopUpWithVar.replace(/<script.*\/script>/gi, '');
    PopUpWithVar = PopUpWithVar.replace(/<\/html>/gi, '');
    PopUpWithVar = PopUpWithVar.replace(/>\s*?</gi, '><');

    return PopUpWithVar
  }

  GetInjectData(vars) {
    var cssToInjectWithVar = this.MyResources(vars.stylesToInject.dist + vars.stylesToInject.MinFileName, vars.stylesToInject.VarName);

    var PopUpWithVar = this.MyResources(vars.PopUp.dist + vars.PopUp.MinFileName, vars.PopUp.VarName);
    PopUpWithVar = this.CleanHtml(PopUpWithVar);

    var jsContentWithVar = this.MyResources(vars.jsContent.dist + vars.jsContent.MinFileName, vars.jsContent.VarName);

    return {
      'cssToInjectWithVar': cssToInjectWithVar,
      'PopUpWithVar': PopUpWithVar,
      'jsContentWithVar': jsContentWithVar
    }
  }
}

module.exports = Helper;