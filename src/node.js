class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			node.parent = this;
		} else {
			if (!this.right){
				this.right = node;
				node.parent = this;
			}
		}
	}

	removeChild(node) {
		if (this.left != node && this.right != node) {
			throw new Error();
		}
		if (this.left == node) {
			this.left = null;
			node.parent = null;
		}
		if (this.right == node) {
			this.right = null;
			node.parent = null;
		}
	}

	remove() {
		if (this.parent) {
			var parent = this.parent;
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {
			var pp = this.parent.parent;
			var p = this.parent;	
			var that = this;
			var pr = this.parent.right;
			var l = this.left;
			
			if (this.parent.left && this.parent.right) {
				this.parent.left.parent = this;
			} else {
				if (this.parent.parent && this.parent.parent.left == this.parent) {
					this.parent.parent.left = that;
					this.parent = pp;
					return;
				}

				if (this.parent.parent && this.parent.parent.right == this.parent) {
					this.parent.parent.right = that;
					this.parent.parent = that;
					this.parent = pp;
					return;
				}
			}
			this.right = pr;
			this.left = p;
			this.left.left = l;
			this.parent.parent = that;
		}
	}
}

module.exports = Node;
