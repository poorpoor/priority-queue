const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if (maxSize) {
			this.maxSize = maxSize;
		} else {
			this.maxSize = 30;
		}
		this.heap = new MaxHeap();
		this.pushed = [];
		this.order = [];
	}

	push(data, priority) {
		if (data >= this.maxSize) {
			throw new Error();
		}
		this.heap.push(data, priority);
		this.pushed.push(this.heap.forQueueArr(data, priority));
		this.order.push(this.heap.forQueueArr(data, priority));
	}

	shift() {
		if (this.heap.isEmpty()) {
			throw new Error();
		}
		if (this.heap.root.data == this.pushed[0].data) {
			this.heap.pop();
		}
		var h =[];
		h = this.order;
		return this.pushed.sort(function (a, b) {
  			if (a.priority > b.priority) {
   				return 1;
  			}
  			if (a.priority < b.priority) {
    			return -1;
			}
			if (h.indexOf(a.data) > h.indexOf(b.data)) {
				return -1;
			}
 			return 1;
		}).pop().data;
	}

	size() {
		return this.pushed.length;
	}

	isEmpty() {
		if (this.pushed.length) {
			return false;
		}
		return true;
	}
}

module.exports = PriorityQueue;
