/*global document*/

// This line forces the script to wait for the DOM object to load before assigning event listeners
document.addEventListener("DOMContentLoaded", run, false);
function run() {
    // local reference to the calculator/s display
    var disp = document.getElementById("disp")
    // The last input operator, false if there are no pending operations
    var lastoperator = false
    // The last accumulated number (operand 1)
    var lastnum = "0"
    // The number of times '.' has been placed in the current number. Used to check for input errors
    var numdecimals = 0
    // Evaluates the function using lastnum -> lastoperator -> disp.innerHTML
    // Sets disp.innerHTML to the result of the operation
    function evaluate() {
        var int1 = parseFloat(lastnum)
        var int2 = parseFloat(disp.innerHTML)
        switch (lastoperator) {
            case "+/=": 
                disp.innerHTML = int1 + int2
                break;
            case "-":
                disp.innerHTML = int1 - int2
                break;
            case "*":
                disp.innerHTML = int1 * int2
                break;
            case "/":
                disp.innerHTML = int1 / int2
                break;
            default:
                break;
        }
        lastoperator = false
    }
    
    // Handles the 'C' clear button presses
    function handleclear() {
        lastoperator = false;
        disp.innerHTML = "0";
        numdecimals = 0
    }
    
    // Handles all operator button presses
    function handleoperator(x) {
        if  (!lastoperator) {
            lastnum = disp.innerHTML
            disp.innerHTML = "0"
            lastoperator = x
            numdecimals = 0
        } else if (x == "+/=") {
            evaluate();
        } else {
            handleclear();
        }
 
    }
    
    // Handles a number/decimal button press
    function handlenumber(x) {
        if (x == ".") {
            numdecimals += 1;
            if (numdecimals > 1) {
                handleclear();
                return;
            }
        }
        if (disp.innerHTML == 0) {
            disp.innerHTML = x;
        } else {
            disp.innerHTML =  disp.innerHTML.toString().concat(x);
        }
    }
    
    // Determins which set of operations needs to be called given a button press
    function parsebuttonpress(x) {
        if (x == "C") {
            handleclear();
        } else if (x == "+/=" || x == "-" || x == "*" || x == "/") {
            handleoperator(x);
        } else {
            handlenumber(x);
        }
    }
    // The list below assigns each button an event listener and links each listener to the initial function.
    document.getElementById("0").addEventListener("click",function(){parsebuttonpress("0")},true);
    document.getElementById("1").addEventListener("click",function(){parsebuttonpress("1")},true);
    document.getElementById("2").addEventListener("click",function(){parsebuttonpress("2")},true);
    document.getElementById("3").addEventListener("click",function(){parsebuttonpress("3")},true);
    document.getElementById("4").addEventListener("click",function(){parsebuttonpress("4")},true);
    document.getElementById("5").addEventListener("click",function(){parsebuttonpress("5")},true);
    document.getElementById("6").addEventListener("click",function(){parsebuttonpress("6")},true);
    document.getElementById("7").addEventListener("click",function(){parsebuttonpress("7")},true);
    document.getElementById("8").addEventListener("click",function(){parsebuttonpress("8")},true);
    document.getElementById("9").addEventListener("click",function(){parsebuttonpress("9")},true);
    document.getElementById("+/=").addEventListener("click",function(){parsebuttonpress("+/=")},true);
    document.getElementById("-").addEventListener("click",function(){parsebuttonpress("-")},true);
    document.getElementById("/").addEventListener("click",function(){parsebuttonpress("/")},true);
    document.getElementById("*").addEventListener("click",function(){parsebuttonpress("*")},true);
    document.getElementById(".").addEventListener("click",function(){parsebuttonpress(".")},true);
    document.getElementById("C").addEventListener("click",function(){parsebuttonpress("C")},true);

}