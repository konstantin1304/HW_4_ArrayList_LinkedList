function Alisto(){
    this.arr = [];
    this.pop = function (){
        if(this.arr.length === 0){
            return undefined;
        }
        let lastElement = this.arr[this.arr.length-1]
        this.arr.length = this.arr.length -1;
        return lastElement;
    }
    this.push = function(){
        for (let i = 0; i < arguments.length; i++) {
            this.arr[this.arr.length] = arguments[i];
        }
        return this.arr.length;
    }
    this.shift = function (){
        if(this.arr.length === 0){
            return undefined;
        }
        let firstEl = this.arr[0];
        for (let i = 0; i < this.arr.length; i++) {
            this.arr[i] = this.arr[i+1];
        }
        this.arr.length = this.arr.length - 1;
        return firstEl;
    }
    this.unshift = function (){
        for (let i = 0; i < arguments.length; i++) {
            for (let j = this.arr.length; j > 0 ; j--) {
                this.arr[j] = this.arr[j-1];
            }
            this.arr[0] = arguments[i];
        }
        return this.arr.length;
    }
    this.length = function (){
        let i = -1;
        for (let key in this.arr) {
            i = key;
        }
        return +i+1;
    };
    this.isArray = function (obj){
        if (obj.constructor === Array) return true;
        else return false;
    }
    this.remove = function(element){
        if (this.arr.length-1 < element){
            return undefined;
        }
        let removeElement = this.arr[element];
        for (let i = element; this.arr.length > i; i++) {
            this.arr[i] = this.arr[i + 1];
        }
        this.arr.length = this.arr.length - 1;
        return removeElement;
    };
    this.some = function(arr, callback, arg) {
        var i, length = this.arr.length;
        for (i = 0; i < length; i = i + 1) {
            if (callback.call(arg, this.arr[i], i, this.arr)) {
                return true;
            }
        }
        return false;
    };
    this.every = function (arr, callback, arg) {
        var i, length = arr.length;
        for (i = 0; i < length; i = i + 1) {
            if (!callback.call(arg, arr[i], i, arr)) {
                return false;
            }
        }
        return true;
    };
    this.splice = function (){
        let removedElements = [];
        if (arguments[1] === undefined && arguments[0] > 0){
            let j = 0;
            for (let i =  arguments[0]; i < this.arr.length; i++) {
                removedElements[j] = this.arr[i];
                j++;
            }
            this.arr.length = arguments[0];
            return removedElements;
        }
        if (arguments[1] === undefined && arguments[0] < 0){
            let j = 0;
            for (let i = this.arr.length + arguments[0]; i < this.arr.length; i++) {
                removedElements[j] = this.arr[i];
                j++;
            }
            this.arr.length = this.arr.length + arguments[0];
            return removedElements;
        }
        if (arguments[1] === undefined && arguments[0] === 0){
            for (let i = 0; i < this.arr.length; i++) {
                removedElements[i] = this.arr[i];
            }
            this.arr.length = 0;
            return removedElements;
        }

        if(arguments[0] >= 0 ){
            if (arguments[1] > 0){
                let k = 0;
                for (let i = arguments[0]; i < arguments[0] + arguments[1]; i++) {
                    removedElements[k] = this.arr[i];
                    k++;
                }
                for (let i = 0; i < arguments[1]; i++) {
                    for (let j = arguments[0]; j < this.arr.length; j++) {
                        this.arr[j] = this.arr[j+1];
                    }
                    this.arr.length = this.arr.length - 1;
                }

            }
            if(arguments[2] !== undefined){
                for (let i = arguments.length-3; i >= 0;  i--) {
                    for (let j = this.arr.length; j > arguments[0]; j--) {
                        this.arr[j] = this.arr[j-1];
                    }
                    this.arr[arguments[0]] = arguments[i+2];
                }
            }
        }
        if(arguments[0] < 0){
            var arg = this.arr.length+arguments[0];
            if(arguments[1] > 0){
                let k = 0;
                for (let i = arg; i < arg + arguments[1]; i++) {
                    removedElements[k] = this.arr[i];
                    k++;
                }
                for (let i = 0; i < arguments[1]; i++) {
                    for (let j = arg; j < this.arr.length ; j++) {
                        this.arr[j] = this.arr[j+1];
                    }
                    this.arr.length = this.arr.length - 1;
                }

            }
            if(arguments[2] !== undefined){
                for (let i = arguments.length-3; i >= 0;  i--) {
                    for (let j = this.arr.length; j > -arguments[0]; j--) {
                        this.arr[j] = this.arr[j-1];
                    }
                    this.arr[arg] = arguments[i+2];
                }
            }
        }
        return removedElements;
    }
}