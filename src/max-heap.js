const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		if (this.parentNodes[this.parentNodes.length-1]) {
			this.parentNodes[this.parentNodes.length-1].left = null;
			this.parentNodes[this.parentNodes.length-1].right = null;
		}

	}

	pop() {
		if (!this.root) {
			return;
		}
		var toReturn;
		if (!this.root.left) {
			toReturn = this.detachRoot();
			this.restoreRootFromLastInsertedNode(toReturn);
			return toReturn.data;
		}
		toReturn = this.detachRoot();
		this.restoreRootFromLastInsertedNode(toReturn);
		this.shiftNodeDown(this.root);
		var rotates = [];
		this.parentNodes = [];
		rotates[0] = this.root;
			for (var i = 0; i < rotates.length; i++) {
				if (!rotates[i].left) {
					this.parentNodes[this.parentNodes.length] = rotates[i];
				} else {
					if (rotates.indexOf(rotates[i].left)==-1) {
						rotates[rotates.length] = rotates[i].left;
					}
					if (!rotates[i].right) {
						this.parentNodes[this.parentNodes.length] = rotates[i];
					} else {
					rotates[rotates.length] = rotates[i].right;
					}
				}
			}
		return toReturn.data;		
	}

	detachRoot() {
		var rootToPass = this.root;
		this.root = null;
		this.parentNodes.shift();
		return rootToPass;
	}

	restoreRootFromLastInsertedNode(detached) {
		var rotates = [];
		var last = this.parentNodes[this.parentNodes.length-1];
		rotates[0] = detached;
		for (var i = 0; i < rotates.length; i++) {
			if (!rotates[i].left) {
				if (rotates[i] == last) {
					this.root = rotates[i];
					if (detached.right == last) {
						this.root.left = detached.left;
						this.root.left.parent = this.root;
						rotates[i] = null;
					} else { 
						this.root.right = detached.right;
						if (detached.left.left) {
							this.root.left = detached.left;
							this.root.left.parent = this.root;
							this.root.left.left = null
							this.root.right = detached.right;
						}		
					}
					this.root.parent = null;
				}
				this.parentNodes[this.parentNodes.length] = rotates[i];
			} else {
				rotates[rotates.length] = rotates[i].left;
				if (!rotates[i].right) {
				} else {
					rotates[rotates.length] = rotates[i].right;
				}
			}
		}
	}

	size() {
		var rotates = [];
		var counter = 0;
		rotates[0] = this.root;
		if (!this.root) {
			return 0;
		}
		for (var i = 0; i < rotates.length; i++) {
			if (!rotates[i].left) {
				counter++;
			} else {
				rotates[rotates.length] = rotates[i].left;
				if (!rotates[i].right) {
					counter++;
				} else {
					rotates[rotates.length] = rotates[i].right;
					counter++;
				}
			}
		}
		return counter;
	}

	isEmpty() {
		if (this.size() == 0) {
			return true;
		}
		return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];	
	}

	insertNode(node) {	
		if (!this.root) {
			this.root = node;
			this.parentNodes[0] = node;
			return;
		}
		var newRoots = [];
		newRoots[0] = this.root;
		for (var i = 0; i < newRoots.length; i++) {
			if (!newRoots[i].left) {
				newRoots[i].left = node;
				newRoots[i].left.parent = newRoots[i];
				newRoots.length = i;
			} else {
				if (!newRoots[i].right) {
				newRoots[i].right = node;
				newRoots[i].right.parent = newRoots[i];
				newRoots.length = i;
				} else {
					newRoots[newRoots.length] = newRoots[i].left;
					newRoots[newRoots.length] = newRoots[i].right;
				}
			}
		}
		var rotates = [];
		this.parentNodes = [];
		rotates[0] = this.root;
		for (var i = 0; i < rotates.length; i++) {
			if (!rotates[i].left) {
				this.parentNodes[this.parentNodes.length] = rotates[i];
			} else {
				rotates[rotates.length] = rotates[i].left;
				if (!rotates[i].right) {
					this.parentNodes[this.parentNodes.length] = rotates[i];
				} else {
					rotates[rotates.length] = rotates[i].right;
				}
			}
		}
	}



	shiftNodeUp(node) {
		if (node.parent) {
			if (node.parent.right == node) {
				var toLeft = null;
				var nodeParent = node.parent;
				this.root = node;
				this.root.right = nodeParent;
				this.root.left = nodeParent.left;
				this.root.left.parent = this.root;
				this.root.right.parent = this.root;
				this.root.parent = null;
				this.root.left.left = null;
				nodeParent.left = null;
				nodeParent.right = null;
			} else {
				var toLeft = node.left;
				var nodeParent = node.parent;
				if (node.parent) {
					node.swapWithParent();
					if (node.parent == node) {
						node.parent = null;
					}
					node.left = nodeParent;
					node.left.left = null;
					this.shiftNodeUp(node);
				}
				this.root = node;
				if(this.root.left) {
					this.root.left.right = null;
				}
				if (toLeft) {
					this.root.left.left = toLeft;
				}
				if (this.root.left.left) {
					if (!this.root.left.parent) {
						this.root.left.parent = this.root;
						this.root.right.parent = this.root;
						this.root.left.left.parent = this.root.left;
					}
				}
			}
		}
		var rotates = [];
		this.parentNodes = [];
		rotates[0] = this.root;
		for (var i = 0; i < rotates.length; i++) {
			if (!rotates[i].left) {
				this.parentNodes[this.parentNodes.length] = rotates[i];
			} else {
				if (rotates.indexOf(rotates[i].left)==-1) {
					rotates[rotates.length] = rotates[i].left;
				}
				if (!rotates[i].right) {
					this.parentNodes[this.parentNodes.length] = rotates[i];
				} else {
					rotates[rotates.length] = rotates[i].right;
				}
			}
		}
	}

	shiftNodeDown(node) {
		if (node == null) {
			return;
		}
		var nodeRight = node.right;
		var nodeLeft = node.left;
		if (node.left) {
			var flagToLeft = node.left.left;
		}
		if (this.root == node) {
			node = node.left;
		}
		if (node != null) {
			var curRoot = this.root.left;
			node.swapWithParent();
			if (nodeLeft && !nodeRight) {
				node.parent = null;
				this.root = node;
			}
			if (nodeLeft && nodeRight && !flagToLeft) {
				node.parent = null;
				node.left.parent = node;
				node.left.right = null;
				node.right.parent = node;
				this.root = node;
			}
			if (flagToLeft) {
				this.root = node;
				node.left.left.parent = node.left;
				this.shiftNodeDown(node.left);
				this.shiftNodeDown(node.left);
				this.root = node;
				this.root.parent = null;
				this.root.left = flagToLeft;
				this.root.left.parent = this.root;
				this.root.left.right = null;
				this.root.left.left.parent = this.root.left;
				this.root.left.left.right = null;
				this.root.right.parent = this.root;
			}
			var rotates = [];
			this.parentNodes = [];
			rotates[0] = this.root;
			for (var i = 0; i < rotates.length; i++) {
				if (!rotates[i].left) {
					this.parentNodes[this.parentNodes.length] = rotates[i];
				} else {
					if (rotates.indexOf(rotates[i].left)==-1) {
						rotates[rotates.length] = rotates[i].left;
					}
					if (!rotates[i].right) {
						this.parentNodes[this.parentNodes.length] = rotates[i];
					} else {
						rotates[rotates.length] = rotates[i].right;
					}
				}
			}
		}
	}

	forQueueArr(data, priority) {
		var node = new Node(data, priority);
		return node;
	}
}

module.exports = MaxHeap;
