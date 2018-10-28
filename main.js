function $(id) { return document.getElementById(id); }

window.onload = function(){
  init();
  $("run").onclick = function(){ run(); result(); };
  $("step").onclick = function(){ steprun(); result(); };
  $("init").onclick = init;
}

var step, pointer, source, input, output, memory;

function init(){
  step=0
  pointer=0;
  source=$("source").value;
  input=$("input").value;
  output="";
  memory=[0];
}

function run() {
  for(; step<source.length; ){
    if(steprun()) break;
  }
}

function steprun(){
    switch (source[step]) {
      case "0":
        memory[pointer] = 0;
        break;
      case "1":
        memory[pointer] = 1;
        break;
      case "<":
        pointer--;
        break;
      case ">":
        pointer++;
      case "?":
        memory[pointer] = input[0] ? 1 : 0;
        input=input.substring(1);
        break;
      case "!":
        output += memory[pointer] ? "1" : "0";
        break;
      case "[":
        if(memory[pointer]) break;
        step++;
        for(var j=1; j!=0; step++){
          if(source[step]=="]") j--;
          if(source[step]=="[") j++;
        }
        break;
      case "]":
        if(!memory[pointer]) break;
        step--;
        for(var j=1; j!=0; step--){
          if(source[step]=="]") j++;
          if(source[step]=="[") j--;
        }
      default:
        break;
    }
    step++;
    return source[step]=="@";
}

function result() {
  $("result").innerHTML =
  output + "<br>" +
  memory.join(",") + ",0,0,...<br>" +
  Array(pointer).join("  ")+"^" + "<br>" +
  source.substring(0, step-1) + "<span style='background-color:#F00'>" + source[step-1] + "</span>" + source.substring(step);
}
