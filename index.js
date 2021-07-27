const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Reverce Polish Notation Calculator\n\t\t\tby Nazar Shurubor\n");

/*
    Examples of RPN:
        1 + 1 -> 1 1 +
        1 + 2 * 3 / 9 -> 1 2 + 3 * 9 / 
        ( 3 + 4 ) * 2 -> 2 3 4 + *
*/

let stack = []

function passTheProblem(problem) {
    problem = problem.replace(/\s+/g, " ").trim();
    console.log("Got an input : " + problem);

    stack = [];

    tokens = problem.split(" ");
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        console.log("\nAction #" + i);

        if (token == "+" || token == "-" || token == "*" || token == "/") {
            let result = 0;

            if (stack.length < 2) {
                console.error("Wrong Stack at Token #" + i + " : " + token);
                stack = [];
                console.log("Terminating...");
                break;
            }

            let prevNum = stack[stack.length - 2];
            let lastNum = stack[stack.length - 1];
            if (token == "+") result = prevNum + lastNum;
            else if (token == "-") result = prevNum - lastNum;
            else if (token == "*") result = prevNum * lastNum;
            else if (token == "/") result = prevNum / lastNum;

            stack.pop();
            stack.pop();
            stack.push(result);

            console.log("Token #" + i + " was APPLIED to the stack: " + token);
            console.log("Stack View : [ " + stack.join(", ") + " ]");
        }
        else if (!isNaN(parseInt(token))) {
            stack.push(parseInt(token));
            console.log("Token #" + i + " was PUSHED to stack : " + token);
        }
        else {
            console.error("Wrong Token #" + i + " : " + token);
            stack = [];
            console.log("Terminating...");
            break;
        }
    }

    if (stack.length != 1) {
        console.error("Wrong Stack : [ " + stack.join(", ") + " ]");
        console.log("Terminating...");
    }
    else {
        console.log("Result : " + stack[0]);
        console.log("Problem solved!");
    }

    console.log();
    askForUserInput();
}

function askForUserInput() {
    rl.question("Enter the problem : ", passTheProblem);
}

askForUserInput();
