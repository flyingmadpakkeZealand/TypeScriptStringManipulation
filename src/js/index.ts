interface Dictionary<T> {
    [key: string]: T;
}

let firstChar: number;
let lastChar: number;
let allChars: number[];

let machine: Dictionary<string>[] = [{}, {}, {}, {}];
let settings = ["e", "n", "g"];
let ticks = [settings.pop().charCodeAt(0), settings.pop().charCodeAt(0), settings.pop().charCodeAt(0)];
let genArray: number[] = [ticks[0], ticks[1], ticks[2], 0];
let allcharsArray:number[][] = [[], [], [], []];

new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        name: "",
        operation: "",
        output: ""
    },
    created() {
        firstChar = 65;
        lastChar = 122;
        allChars = [];
        for (let index = firstChar; index <= lastChar; index++) {
            allChars.push(index);
        }
        resetMachine();
        
    },
    methods: {
        manipulateString() {
            let operation: string = this.operation;
            let output: string = "";
            let name: string = this.name;
            console.log(operation);

            switch (operation) {
                case "toUpperCase": output = name.toUpperCase(); break;
                case "toLowerCase": output = name.toLowerCase(); break;
                case "invertCase": output = invertCase(name); break;
                case "reverse": output = reverseString(name); break;
                case "meme": output = meme(name); break;
                case "toCharNumbers": output = toCharNumbers(name); break;
                case "perm enc/dec": output = permEncrypt(name); break;
            }

            this.output = output;
        },
        flooring(x: number): string {
            let numbers = iterate(x, 10000);
            let all = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            for (let index = 0; index < numbers.length; index++) {
                numbers[index] = Math.floor(numbers[index] * 2);
                all[parseInt(("" + numbers[index]).charAt(0))]++;
            }
            
            return all.toString();
        },
        permTest(){
            let testString="u]Zu";
            let result = "";
            
            for (let index = 0; index < testString.length; index++) {
                result = result + permutateChar(testString.charAt(index));
                
            }

            return result;
        }
    }
})

function permEncrypt(str:string):string{
    let result = "";
    for (let index = 0; index < str.length; index++) {
        let char = str.charAt(index);
        if(char.charCodeAt(0)<65 || char.charCodeAt(0)>122){
            return "Sorry, currently unsupported char detected: '" + char + "', please use chars between: " + firstChar + " and " + lastChar + " inclusive.";
        }
        result = result + permutateChar(char);
        
    }
    resetMachine();
    return result;
}

function resetMachine(){
    for (let index = 0; index < allcharsArray.length; index++) {
        resetCharArray(index);
    }
    settings = ["e", "n", "g"];
    ticks = [settings.pop().charCodeAt(0), settings.pop().charCodeAt(0), settings.pop().charCodeAt(0)];
    genArray= [ticks[0], ticks[1], ticks[2], 0];
    machine = [{}, {}, {}, {}];
}

function reverseString(str: string): string {
    let output: string = "";

    for (let index = str.length - 1; index >= 0; index--) {
        output = output + str[index];
    }

    return output;
}

function meme(str: string): string {
    let output: string = "";
    if (str.length > 0) {
        str = str.toUpperCase();

        for (let index = 0; index < str.length - 1; index++) {
            output = output + str[index] + " ";
        }

        output = output + str[str.length - 1]
    }

    return output;
}

function toCharNumbers(str: string): string {
    let output = "";

    if (str.length > 0) {
        for (let index = 0; index < str.length - 1; index++) {
            output = output + str[index].charCodeAt(0) + " ";
        }

        output = output + str[str.length - 1].charCodeAt(0);
    }

    return output;
}

function invertCase(str: string): string {
    let output = "";

    for (let index = 0; index < str.length; index++) {
        let charCode: number = str.charCodeAt(index);

        if (charCode >= 65 && charCode <= 90) {
            output = output + String.fromCharCode(charCode + 32);
        }
        else if (charCode >= 97 && charCode <= 122) {
            output = output + String.fromCharCode(charCode - 32);
        }
        else {
            output = output + str[index];
        }

    }

    return output;
}

function iterate(x: number, iterations: number): number[] {
    const baseShift = 0.1713;
    const xLimit = 10000000;
    let mult: number = 1;
    let iteration = 0;
    let numbers = [];

    for (let j = 2; j < iterations * 3; j = j + 3) {

        x = (x + baseShift) / baseShift;
        if (x > xLimit)
            x = x / Math.max(2, Math.min(xLimit * 100, Math.pow(mult, j)));

        iteration = Math.floor(x * mult) + 1 - x * mult;
        let iString: string = "" + iteration;

        let count = j % iString.length;
        let index = count;
        let fallBack = false;
        while (iString.charAt(index) == '0' || iString.charAt(index) == '.') {
            index++;
            index = index % iString.length;
            if (index == count) {
                fallBack = true;
                break;
            }
        }


        if (fallBack) {
            mult = 1234;
        }
        else {
            let mod: string = "";
            for (let i = 0; i <= 6; i++) {
                let charNum: number = (index + i) % iString.length;
                mod = mod + iString.charAt(charNum);
            }
            mult = parseFloat(mod);
        }

        numbers.push(iteration);
    }

    return numbers;
}



function next(layer: number): number {
    const height = 123456.456735;
    const minStep = 0.0123;
    let gen = genArray[layer];

    gen = gen * height + minStep;
    gen = Math.floor(gen) + 1 - gen;
    genArray[layer] = gen;
    
    return gen;
}

function nextLim(layer: number, lower: number, upper: number): number {
    return Math.floor(next(layer) * (upper - lower) + lower);
}

function heightModify(no: number): number {
    let noString = "" + no;
    let digit = "";
    console.log(noString);
    for (let index = 0; index < noString.length; index++) {
        digit = noString.charAt(index);
        if (digit != '0' && digit != '.') {
            break;
        }

    }
    console.log(digit);
    return digit != "0" ? parseFloat(digit) * 0.1713 : 1;

}




function find(char: string, layer: number): string {
    let char1: string;
    let char2: string;
    
    while (machine[layer][char] == undefined) {
        let number1 = nextLim(layer, 0, allcharsArray[layer].length);
        char1 = String.fromCharCode(allcharsArray[layer][number1]); //Doesn't work because allChars needs to get smaller.
        allcharsArray[layer].splice(number1, 1);
        let number2 = nextLim(layer, 0, allcharsArray[layer].length);
        char2 = String.fromCharCode(allcharsArray[layer][number2]);
        allcharsArray[layer].splice(number2, 1);
        
        machine[layer][char1] = char2;
        machine[layer][char2] = char1;
    }
    
    return machine[layer][char];
}

function permutateChar(char: string):string {
    for (let index = 0; index < machine.length - 1; index++) {
        char = find(char, index);
    }

    char = find(char, machine.length-1);

    for (let index = machine.length - 2; index >= 0; index--) {
        char = find(char, index);
    }

    
    checkTicks();
    return char;
}

function checkTicks() {
    for (let index = 0; index < ticks.length; index++) {
        ticks[index]++;
        
        resetCharArray(index);
        if (ticks[index] == lastChar + 1) {
            ticks[index] = firstChar;
            genArray[index] = firstChar;
        }
        else {
            genArray[index] = ticks[index];
            break;
        }
    }
}

function resetCharArray(layer:number){
    allcharsArray[layer] = [];
    machine[layer] = {};
    for (let index = 0; index < allChars.length; index++) {
        allcharsArray[layer].push(allChars[index]);
        
    }
    
}