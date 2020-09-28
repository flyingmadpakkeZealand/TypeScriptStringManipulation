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
            }

            this.output = output;
        }
    }
})

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

function toCharNumbers(str:string):string {
    let output = "";

    if(str.length>0){
        for (let index = 0; index < str.length - 1; index++) {
            output = output + str[index].charCodeAt(0) + " ";
        }
    
        output = output + str[str.length - 1].charCodeAt(0);
    }

    return output;
}

function invertCase(str:string):string {
    let output = "";

    for (let index = 0; index < str.length; index++) {
        let charCode:number = str.charCodeAt(index);

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