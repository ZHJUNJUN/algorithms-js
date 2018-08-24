'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LinkedListNode = require('./LinkedListNode');

var _LinkedListNode2 = _interopRequireDefault(_LinkedListNode);

var _Comparator = require('../../utils/comparator/Comparator');

var _Comparator2 = _interopRequireDefault(_Comparator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinkedList = function () {
  /**
   * @param {Function} [comparatorFunction]
   */
  function LinkedList(comparatorFunction) {
    _classCallCheck(this, LinkedList);

    /** @var LinkedListNode */
    this.head = null;

    /** @var LinkedListNode */
    this.tail = null;

    this.compare = new _Comparator2.default(comparatorFunction);
  }

  /**
   * @param {*} value
   * @return {LinkedList}
   */


  _createClass(LinkedList, [{
    key: 'prepend',
    value: function prepend(value) {
      // Make new node to be a head.
      this.head = new _LinkedListNode2.default(value, this.head);

      return this;
    }

    /**
     * @param {*} value
     * @return {LinkedList}
     */

  }, {
    key: 'append',
    value: function append(value) {
      var newNode = new _LinkedListNode2.default(value);

      // If there is no head yet let's make new node a head.
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;

        return this;
      }

      // Attach new node to the end of linked list.
      this.tail.next = newNode;
      this.tail = newNode;

      return this;
    }

    /**
     * @param {*} value
     * @return {LinkedListNode}
     */

  }, {
    key: 'delete',
    value: function _delete(value) {
      if (!this.head) {
        return null;
      }

      var deletedNode = null;

      // If the head must be deleted then make 2nd node to be a head.
      if (this.compare.equal(this.head.value, value)) {
        deletedNode = this.head;
        this.head = this.head.next;
      }

      var currentNode = this.head;

      if (currentNode !== null) {
        // If next node must be deleted then make next node to be a next next one.
        while (currentNode.next) {
          if (this.compare.equal(currentNode.next.value, value)) {
            deletedNode = currentNode.next;
            currentNode.next = currentNode.next.next;
          } else {
            currentNode = currentNode.next;
          }
        }
      }

      // Check if tail must be deleted.
      if (this.compare.equal(this.tail.value, value)) {
        this.tail = currentNode;
      }

      return deletedNode;
    }

    /**
     * @param {Object} findParams
     * @param {*} findParams.value
     * @param {function} [findParams.callback]
     * @return {LinkedListNode}
     */

  }, {
    key: 'find',
    value: function find(_ref) {
      var _ref$value = _ref.value,
          value = _ref$value === undefined ? undefined : _ref$value,
          _ref$callback = _ref.callback,
          callback = _ref$callback === undefined ? undefined : _ref$callback;

      if (!this.head) {
        return null;
      }

      var currentNode = this.head;

      while (currentNode) {
        // If callback is specified then try to find node by callback.
        if (callback && callback(currentNode.value)) {
          return currentNode;
        }

        // If value is specified then try to compare by value..
        if (value !== undefined && this.compare.equal(currentNode.value, value)) {
          return currentNode;
        }

        currentNode = currentNode.next;
      }

      return null;
    }

    /**
     * @return {LinkedListNode}
     */

  }, {
    key: 'deleteTail',
    value: function deleteTail() {
      if (this.head === this.tail) {
        var _deletedTail = this.tail;
        this.head = null;
        this.tail = null;

        return _deletedTail;
      }

      var deletedTail = this.tail;

      // Rewind to the last node and delete "next" link for the node before the last one.
      var currentNode = this.head;
      while (currentNode.next) {
        if (!currentNode.next.next) {
          currentNode.next = null;
        } else {
          currentNode = currentNode.next;
        }
      }

      this.tail = currentNode;
      return deletedTail;
    }

    /**
     * @return {LinkedListNode}
     */

  }, {
    key: 'deleteHead',
    value: function deleteHead() {
      if (!this.head) {
        return null;
      }

      var deletedHead = this.head;

      if (this.head.next) {
        this.head = this.head.next;
      } else {
        this.head = null;
        this.tail = null;
      }

      return deletedHead;
    }

    /**
     * @return {LinkedListNode[]}
     */

  }, {
    key: 'toArray',
    value: function toArray() {
      var nodes = [];

      var currentNode = this.head;
      while (currentNode) {
        nodes.push(currentNode);
        currentNode = currentNode.next;
      }

      return nodes;
    }

    /**
     * @param {function} [callback]
     * @return {string}
     */

  }, {
    key: 'toString',
    value: function toString(callback) {
      return this.toArray().map(function (node) {
        return node.toString(callback);
      }).toString();
    }
  }]);

  return LinkedList;
}();

exports.default = LinkedList;