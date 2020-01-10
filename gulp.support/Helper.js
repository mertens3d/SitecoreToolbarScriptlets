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

  CleanHtml(htmlToInjectWithVar) {
    htmlToInjectWithVar = htmlToInjectWithVar.replace(/<!doctype html>/gi, '');
    htmlToInjectWithVar = htmlToInjectWithVar.replace(/<html>/gi, '');
    htmlToInjectWithVar = htmlToInjectWithVar.replace(/<head>.*<\/head>/gi, '');
    htmlToInjectWithVar = htmlToInjectWithVar.replace(/<body>/gi, '');
    htmlToInjectWithVar = htmlToInjectWithVar.replace(/<\/body>/gi, '');
    htmlToInjectWithVar = htmlToInjectWithVar.replace(/<script.*\/script>/gi, '');
    htmlToInjectWithVar = htmlToInjectWithVar.replace(/<\/html>/gi, '');
    htmlToInjectWithVar = htmlToInjectWithVar.replace(/>\s*?</gi, '><');

    return htmlToInjectWithVar
  }

  GetInjectData(vars) {
    var cssToInjectWithVar = this.MyResources(vars.stylesToInject.dist + vars.stylesToInject.MinFileName, vars.stylesToInject.VarName);

    var htmlToInjectWithVar = this.MyResources(vars.htmlToInject.dist + vars.htmlToInject.MinFileName, vars.htmlToInject.VarName);
    htmlToInjectWithVar = this.CleanHtml(htmlToInjectWithVar);

    var jsToInjectWithVar = this.MyResources(vars.jsToInject.dist + vars.jsToInject.MinFileName, vars.jsToInject.VarName);

    return {
      'cssToInjectWithVar': cssToInjectWithVar,
      'htmlToInjectWithVar': htmlToInjectWithVar,
      'jsToInjectWithVar': jsToInjectWithVar
    }
  }
}

module.exports = Helper;