/** Node: node for a singly linked list. */

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

/** LinkedList: chained together nodes. */

class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		for (let val of vals) this.push(val);
	}

	traverse() {
		let currentNode = this.head;
		let count = 0;

		console.log(currentNode);
		while (currentNode) {
			if (count < 1) {
				console.log("HEAD: ", currentNode.val);
			} else if (currentNode.next) {
				console.log("NODE: ", currentNode.val);
			} else {
				console.log("TAIL: ", currentNode.val);
			}

			currentNode = currentNode.next;
			count++;
		}
	}

	/** push(val): add new value to end of list. */

	push(val) {
		let newNode = new Node(val);

		if (this.head === null) this.head = newNode;

		if (this.tail !== null) this.tail.next = newNode;

		this.length++;
		this.tail = newNode;
	}

	/** unshift(val): add new value to start of list. */

	unshift(val) {
		const prevNodeVal = this.head;

		this.head = new Node(val);

		if (this.tail == null) this.tail = new Node(val);

		this.length++;
		this.head.next = prevNodeVal;
	}

	/** pop(): return & remove last item. */

	pop() {
		if (this.head === null && this.tail === null) {
			throw new Error(`Invalid LinkedList is empty`);
		}

		let currentNode = this.head;
		let poppedValue;

		if (this.head === this.tail) {
			poppedValue = this.head.val;
			this.head = null;
			this.tail = null;
		} else {
			while (currentNode.next !== this.tail) {
				currentNode = currentNode.next;
			}

			poppedValue = this.tail.val;
			currentNode.next = null;
			this.tail = currentNode;
		}

		this.length -= 1;
		return poppedValue;
	}

	/** shift(): return & remove first item. */

	shift() {
		if (this.head === null && this.tail === null) {
			throw new Error(`Invalid LinkedList is empty`);
		}

		const removedValue = this.head;
		this.head = this.head.next;

		if (this.length === 1) {
			this.head = null;
			this.tail = null;
		}

		this.length -= 1;
		return removedValue.val;
	}

	/** getAt(idx): get val at idx. */

	getAt(idx) {
		if (idx < 0 || idx > this.length) {
			throw new Error(`Invalid index. valid options: 0-${this.length}`);
		}

		let currentNode = this.head;

		for (let i = 0; i < this.length; i++) {
			if (i === idx) return currentNode.val;

			currentNode = currentNode.next;
		}

		console.log(this.length);
	}

	/** setAt(idx, val): set val at idx to val */

	setAt(idx, val) {
		if (idx < 0 || idx > this.length) {
			throw new Error(`Invalid index. valid options: 0-${this.length}`);
		}

		let currentNode = this.head;

		for (let i = 0; i < this.length; i++) {
			if (i === idx) {
				currentNode.val = val;
				return;
			}

			currentNode = currentNode.next;
		}
	}

	/** insertAt(idx, val): add node w/val before idx. */

	insertAt(idx, val) {
		if (idx < 0 || idx > this.length) {
			throw new Error(`Invalid index. valid options: 0-${this.length}`);
		}

		let prevNode;
		let currentNode = this.head;

		const newNode = new Node(val);

		if (idx === 0) {
			this.unshift(val);
			return;
		}

		if (this.length === idx) {
			this.push(val);
			return;
		}

		for (let i = 0; i < this.length; i++) {
			if (i === idx - 1) prevNode = currentNode;

			if (i === idx) {
				prevNode.next = newNode;
				newNode.next = currentNode;
			}

			currentNode = currentNode.next;
		}

		this.length += 1;
	}

	/** removeAt(idx): return & remove item at idx, */

	removeAt(idx) {
		if (idx < 0 || idx > this.length) {
			throw new Error(`Invalid index. valid options: 0-${this.length}`);
		}

		let prevNode;
		let currentNode = this.head;

		if (idx === 0) {
			this.shift();
			return;
		}

		if (this.length === idx) {
			this.pop();
			return;
		}

		for (let i = 0; i < this.length; i++) {
			if (i === idx - 1) prevNode = currentNode;

			if (i === idx) {
				prevNode.next = currentNode.next;
				return currentNode.val;
			}

			currentNode = currentNode.next;
		}

		this.length += 1;
	}

	/** average(): return an average of all values in the list */

	average() {
		if (this.length < 1) return 0;

		let total = 0;
		let currentNode = this.head;

		while (currentNode) {
			total += currentNode.val;
			currentNode = currentNode.next;
		}

		return total / this.length;
	}
}

function zipper(numsHead, ltrsHead) {
	let tail = numsHead;
	let currNum = numsHead.next;
	let currLtrs = ltrsHead;
	let count = 0;

	while (currNum && currLtrs) {
		if (count % 2 === 0) {
			tail.next = currLtrs;
			currLtrs = currLtrs.next;
		} else {
			tail.next = currNum;
			currNum = currNum.next;
		}

		tail = tail.next;
		count++;
	}

	if (currNum !== null) tail.next = currNum;
	if (currLtrs !== null) tail.next = currLtrs;

	return numsHead;
}

const LinkedListOne = new LinkedList([1, 2, 5]);
const LinkedLisTwo = new LinkedList([1, 4, 2]);

console.log(LinkedLisTwo);

function everyOther(numsHead) {
	let currNum = numsHead;
	let count = 0;

	while (currNum) {
		if (count % 2 === 0) console.log(currNum.val);

		currNum = currNum.next;
		count++;
	}

	return;
}

const mergeTwoLists = function (head1, head2) {
	if (!head1 && !head2) return null;
	if (head1 && !head2) return head1;
	if (!head1 && head2) return head2;

	let tail = head1;
	let curr1 = head1.next;
	let curr2 = head2;
	let count = 0;

	while (curr1 && curr2) {
		if (count % 2 === 0) {
			tail.next = curr2;
			curr2 = curr2.next;
		} else {
			tail.next = curr1;
			curr1 = curr1.next;
		}

		tail = tail.next;
		count++;
	}

	if (curr1 !== null) tail.next = curr1;
	if (curr2 !== null) tail.next = curr2;

	return head1;
};

function traverse(head) {
	let curr = head;

	while (curr) {
		console.log(curr.val);
		curr = curr.next;
	}

	return;
}
