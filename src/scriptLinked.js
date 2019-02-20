class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class SinglyList {

    constructor() {
        this._length = 0;
        this.head = null;
    }

    indexOf(element) {

        let count = 0;
        let current = this.head;
        let flag = 0;

        // iterae over the list
        while (current != null && flag !=1 ) {
            // compare each element of the list
            // with given element
            if (JSON.stringify(current.data) === JSON.stringify(element)) {
                flag+=1;
                return count;
            }

            count++;
            current = current.next;
        }

        // not found
        return -1;
    }

    push(data) {


        let node = new Node(data),
            currentNode = this.head;
        // 1-ый случай: пустой список
        if (!currentNode) {
            this.head = node;
            this._length++;

            return node.data;
        }
        // 2-ой случай: не пустой список
        while (currentNode.next) {
            currentNode = currentNode.next;
        }
        currentNode.next = node;
        this._length++;
        return node.data;
    }

    unshift(data) {
        let tempNode = this.head;
        this.head = new Node(data);
        this.head.next = tempNode;
        this._length++;
        return this._length;
    }

    pop() {

        let lastNode = this.head;
        let beforeLastNode = this.head;
        let deleteNode;

        if(this._length == 0){
            return null;
        }

        if(this._length == 1){
            deleteNode = this.head;
            this.head = null;
            this._length = 0;
            return deleteNode.data;
        }

        for (let i = 1; i < this._length; i++) {
            lastNode = lastNode.next;
        }
        for (let i = 1; i < this._length - 1; i++) {
            beforeLastNode = beforeLastNode.next;
        }
        beforeLastNode.next = null;
        deleteNode = lastNode;
        lastNode = null;
        this._length--;
        return deleteNode.data;

    }

    shift() {

        if(this._length == 0){
            return null;
        }

        let firstNode = this.head;
        this.head = this.head.next;
        let deleteNote = firstNode;
        firstNode = null;
        this._length--;
        return deleteNote.data;
    }

    insertAt(element, index) {

        if (index > 0 && index > this._length)
            return false;
        else {
            // creates a new node
            let node = new Node(element);
            let curr, prev;

            curr = this.head;

            // add the element to the
            // first index
            if (index == 0) {
                node.next = this.head;
                this.head = node;
            } else {
                curr = this.head;
                var it = 0;

                // iterate over the list to find
                // the position to insert
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }

                // adding an element
                node.next = curr;
                prev.next = node;
            }
            this._length++;
            return this._length;
        }
    }

    searchNodeAt(position) {
        let currentNode = this.head,
            length = this._length,
            count = 1,
            message = {
                failure: 'Failure: non-existent node in this list.'
            };

        // 1-ый случай: неверная позиция
        if (length === 0 || position < 1 || position > length) {
            throw new Error(message.failure);
        }

        // 2-ой случай: верная позиция
        while (count < position) {
            currentNode = currentNode.next;
            count++;
        }
        return currentNode;
    }

    remove(position) {


        var currentNode = this.head,
            length = this._length,
            count = 0,
            message = {
                failure: 'Failure: non-existent node in this list.'
            },
            beforeNodeToDelete = null,
            nodeToDelete = null,
            deletedNode = null;

        // 1-ый случай: неверная позиция
        if (position <= 0 || position > length || position == null || position == undefined) {
            throw new Error(message.failure);
        }

        // 2-ой случай: первый узел удален
        if (position === 1) {
            this.head = currentNode.next;
            deletedNode = currentNode;
            currentNode = null;
            this._length--;

            return deletedNode;
        }

        if (position > 1) {
            for (let i = 1; i < position - 1; i++) {
                currentNode = currentNode.next;
            }

            // 3-ий случай: все другие узлы удалены
            while (count < position) {
                beforeNodeToDelete = currentNode;
                nodeToDelete = currentNode.next;
                count++;
            }

            beforeNodeToDelete.next = nodeToDelete.next;
            deletedNode = nodeToDelete;
            nodeToDelete = null;
            this._length--;

            return deletedNode;
        }

    }

    removeElement(element) {
        var current = this.head;
        var prev = null;

        // iterate over the list
        while (current != null) {
            // comparing element with current
            // element if found then remove the
            // and return true
            if (JSON.stringify(current.data) === JSON.stringify(element)) {
                if (prev == null) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                this._length--;
                return current.data;
            }
            prev = current;
            current = current.next;
        }
        return -1;
    }

    length() {
        return this._length;
    }

    isArray(arg) {
        if (typeof arg[`data`] === 'object' &&
            ('join' in arg[`data`] && typeof arg[`data`].join === 'function') &&
            ('length' in arg[`data`] && typeof arg[`data`].length === 'number')) {
            return true;
        }
        return false;
    }

    toString() {

        let outStringArr = [];
        let currentNode = this.head;
        for (let i = 0; i < this._length; i++) {
            outStringArr.push(currentNode[`data`]);
            currentNode = currentNode.next;
        }
        return outStringArr.toString();
    }

    toArray() {
        let outStringArr = [];
        let currentNode = this.head;
        for (let i = 0; i < this._length; i++) {
            outStringArr.push(currentNode[`data`]);
            currentNode = currentNode.next;
        }
        return outStringArr;
    }

    printList() {
        let curr = this.head;
        let str = "";
        while (curr) {
            str += curr.data + " / ";
            curr = curr.next;
        }
        return str;
    }

    isEmpty() {
        if (this._length == 0) {
            return true;
        }
        return false;
    }

    some(callback) {

        if (this == null) {
            throw new TypeError('Linked List ==> null');
        }

        if (typeof callback !== 'function') {
            throw new TypeError(`Callback is not function!!!`);
        }

        // let t = Object(this);
        let length = this._length;
        let currentNode = this.head;

        let thisArg = arguments.length >= 2 ? arguments[1] : void 0;

        for (let i = 0; i < length; i++) {
            if (i > 0) {
                currentNode = currentNode.next;
            }

            if (callback.call(thisArg, currentNode, this.indexOf(currentNode.data), this)) {
                return true;
            }
        }

        return false;
    }

    every(callback) {

        if (this == null) {
            throw new TypeError('Linked List ==> null');
        }

        if (typeof callback !== 'function') {
            throw new TypeError(`Callback is not function!!!`);
        }

        let length = this._length;
        let currentNode = this.head;
        let boolFlag = 0;

        let thisArg = arguments.length >= 2 ? arguments[1] : void 0;

        for (let i = 1; i < length; i++) {

            if (i > 1) {
                currentNode = currentNode.next;
            }

            if (callback.call(thisArg, currentNode, this.indexOf(currentNode.data), this)) {
                boolFlag += 1;
            }

            if (i == length - 1) return true;

            if (boolFlag != i) return false;

        }
        return false;
    }

    splice(){
        let removedElements= new SinglyList();
        if(this.head === null){

            if(arguments.length<3) return removedElements;
            this.head= new Node(arguments[2]);
            let lastEl=this.head;
            this._length=1;
            for(let i=3; i<arguments.length; i++){
                lastEl.next=new Node(arguments[i]);
                lastEl=lastEl.next;
                this._length++;
            }
            return removedElements;
        }
        let elBeforeSeg = this.head;
        let elAfterSeg;
        let startIndex = arguments[0] >= 0 ? arguments[0] : this._length-arguments[0];

        let i = 0;
        while (i < startIndex - 1){
            elBeforeSeg = elBeforeSeg.next;
            i++;
        }

        if(arguments[0]==0) {
            elAfterSeg = elBeforeSeg;
        }

        if(arguments[0]>0) {
            elAfterSeg = elBeforeSeg.next;
        }


        if (startIndex === 0){
            elBeforeSeg =null;
        }

        i = 0;
        if(arguments[1]>0){
            removedElements.head=elAfterSeg;
            let lastEl=elAfterSeg;

            while(i < arguments[1]){
                if(elAfterSeg === null){
                    elAfterSeg=new Node();
                    lastEl=elAfterSeg;
                    break;
                };
                lastEl=elAfterSeg;
                removedElements._length++;
                elAfterSeg=elAfterSeg.next;
                this._length--;
                i++;
            }
            lastEl.next=null;
        }

        if(arguments.length < 3){
            if(elBeforeSeg !== null){
                elBeforeSeg.next = elAfterSeg;
                return removedElements;
            }
            else{//нету хэда
                this.head = elAfterSeg;
                return removedElements;
            }
        }

        let firstElSeg = new Node(arguments[2]);
        this._length++;
        if(elBeforeSeg == null){
            this.head = firstElSeg;
        }
        else{
            elBeforeSeg.next = firstElSeg;
        }

        let lastElSeg = firstElSeg;

        for (let i = 3; i < arguments.length; i++) {
            lastElSeg.next = new Node(arguments[i]);
            this._length++;
            lastElSeg = lastElSeg.next;
        }
        lastElSeg.next = elAfterSeg;
        return removedElements;
    }
}

arr1 = [1, 2, 3];
arr2 = `[3, 4, 5, 6]`;
arr3 = [7, 8, 9, 10, 11];
arr4 = [12, 13, 14, 15, 16, 17];
arr5 = [18, 19, 20, 21, 22, 23, 24];

linkedList = new SinglyList();
// //linkedList.push(arr1,arr2);
linkedList.push(arr1);
linkedList.push(arr2);
linkedList.push(arr3);
linkedList.push(arr4);
linkedList.push(arr5);

// //console.log(linkedList.push(arr1,arr2));
// console.log(linkedList);

// linkedList.isArray(linkedList.searchNodeAt(2));
// console.log(linkedList.isArray(linkedList.searchNodeAt(2)));
// console.log(linkedList.toString());
// console.log(linkedList);
// console.log(linkedList.insertAt(`hello`, 5));
// console.log(linkedList);
// console.log(linkedList.printList());
// console.log(linkedList.isEmpty());
// console.log(linkedList.indexOf(arr5));
// console.log(linkedList.removeElement(arr4));
// console.log(linkedList.printList());
// console.log(linkedList.unshift(new Node(`xxx`)));
// console.log(linkedList.unshift(new Node(`XXXxxx`)));
// console.log(linkedList.printList());
// console.log(linkedList);
// console.log(linkedList.toArray());
// console.log(linkedList.some(node => node.data == `xxx`));
// console.log(linkedList.every(node => node.data == `XXXxxx`));

// linkedList.push({name: 123, age: 455});

// console.log(linkedList.shift());

// console.log(linkedList);

// console.log(linkedList.insertAt(`hello`, 0));

// console.log(linkedList);

// console.log(linkedList.toString());

console.log(linkedList.printList());

console.log(linkedList.splice(1, 2, "Мы", `yes`, 55555));

console.log(linkedList.printList());

console.log(linkedList.length());








