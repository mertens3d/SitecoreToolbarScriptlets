var xyyz = xyyz || {};

xyyz.debug = {
    log : function(text){
        console.log(text);
        var ta = document.querySelector('#ta-debug');
        if(ta){
            
            ta.value += ('\\n\\r' + text);

        }
    }
}