// DOM Helper

https://github.com/franciscop/umbrella/blob/master/umbrella.js
http://youmightnotneedjquery.com/

const domHelper = function(parameter, context) {
	if (!(this instanceof domHelper)) {
		return new domHelper(parameter, context);
	}

	if (parameter instanceof domHelper) {
		return parameter;
	}

	if (typeof parameter === 'string') {
		parameter = this.select(parameter, context);
	}

	if (parameter && parameter.nodeName) {
		parameter = [parameter];
	}

	this.nodes = this.slice(parameter);
};

domHelper.prototype = {
	get length() {
		return this.nodes.length;
	}
};

domHelper.prototype.nodes = [];

domHelper.prototype.args = function (args, node, i) {
  if (typeof args === 'function') {
    args = args(node, i);
  }

  // First flatten it all to a string http://stackoverflow.com/q/22920305
  // If we try to slice a string bad things happen: ['n', 'a', 'm', 'e']
  if (typeof args !== 'string') {
    args = this.slice(args).map(this.str(node, i));
  }

  // Then convert that string to an array of not-null strings
  return args.toString().split(/[\s,]+/).filter(function (e) {
    return e.length;
  });
};

domHelper.prototype.array = function(callback) {
  callback = callback;
  var self = this;
  return this.nodes.reduce(function(list, node, i) {
    var val;
    if (callback) {
      val = callback.call(self, node, i);
      if (!val) val = false;
      if (typeof val === 'string') val = u(val);
      if (val instanceof u) val = val.nodes;
    } else {
      val = node.innerHTML;
    }
    return list.concat(val !== false ? val : []);
  }, []);
};

domHelper.prototype.append = function (html, data) {
  return this.adjacent(html, data, function(node, fragment) {
    node.appendChild(fragment);
  });
};

u.prototype.data = function (name, value) {
  return this.attr(name, value, true);
};



export default function(selector, context) {
	return new Init(selector, context);
};
