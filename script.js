function getHistory() {
    return document.getElementById("history-value").innerText;
}
function printHistory(num) {
    document.getElementById("history-value").innerText=num;
}
function getOutput() {
    return document.getElementById("output-value").innerText;
}
function printOutput(num) {
    document.getElementById("output-value").innerText=num;
}
function convertToNumber(num) {
    if(num=="-") {
        return "";
    }
    var n = Number(num);
    return n;
}
var operator = document.getElementsByClassName("operator");
for(var i=0;i<operator.length;i++){
    operator[i].addEventListener('click',function(){
        if(this.id=="clear") {
            printHistory("");
            printOutput("");
        } else if(this.id=="backspace") {
            var output=convertToNumber(getOutput()).toString();
            if(output) { // if output is not empty
                output=output.substr(0, output.length-1);
                printOutput(output);
            }
        } else if(this.id=="(" || this.id==")") {
            var output=getOutput();
            output=output+this.id;
            printOutput(output);
        } else {
            var output=getOutput();
            if(output!="" || history!="") { // if not empty
                if(this.id=="=") {
                    var result=eval(output);
                    printOutput(result);
                } else {
                    output=output+this.id;
                    printOutput(output);
                }
            }
        }
    });
}
var number = document.getElementsByClassName("number");
for(var i=0;i<number.length;i++){
    number[i].addEventListener('click',function(){
        var output=getOutput();
        if(this.id=="." && output.includes(".")) {
            printOutput(output);
        } else {
            output=output+this.id;
            printOutput(output);
        }
    });
}