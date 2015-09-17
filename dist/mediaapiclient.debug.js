(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MediaApiClient = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.domel = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var addD, addDWrap, domHelper, isString, nonAutoAttach, root,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

root = this;


/*
	
	Extend natives
 */

isString = function(vr) {
  return typeof vr === 'string' || vr instanceof String;
};

nonAutoAttach = ["domel", "create", "byClass", "byId"];

addDWrap = function(fn, el, elIdx) {
  if (elIdx == null) {
    elIdx = 0;
  }
  return function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    args.splice(elIdx, 0, el);
    return fn.apply(domHelper, args);
  };
};

addD = function(el, key) {
  var j, len, nameFn, ref;
  if (key == null) {
    key = "d";
  }
  if (el == null) {
    return el;
  }
  if (el[key] != null) {
    return el;
  }
  el[key] = {};
  ref = Object.keys(domHelper);
  for (j = 0, len = ref.length; j < len; j++) {
    nameFn = ref[j];
    if (indexOf.call(nonAutoAttach, nameFn) < 0) {
      el[key][nameFn] = addDWrap(domHelper[nameFn], el);
    }
  }
  el[key].find = addDWrap(domHelper, el, 1);
  el[key].byId = addDWrap(domHelper.byId, el, 1);
  el[key].byClass = addDWrap(domHelper.byClass, el, 1);
  return el;
};


/*
	
	DOM helpers
 */

domHelper = function(sel, context, onlyFirst) {
  var _el, _results, _sel, _sels, ref;
  if (context == null) {
    context = document;
  }
  if (onlyFirst == null) {
    onlyFirst = false;
  }
  _sels = sel.split(" ");
  if (_sels.every((function(sel) {
    var ref;
    return (ref = sel[0]) === "." || ref === "#";
  }))) {
    while (_sels.length) {
      if ((_sel = (ref = _sels.splice(0, 1)) != null ? ref[0] : void 0)) {
        switch (_sel[0]) {
          case ".":
            context = domHelper.byClass(_sel, context, onlyFirst);
            break;
          case "#":
            context = domHelper.byId(_sel, context, onlyFirst);
        }
      }
    }
    return context;
  }
  _results = context.querySelectorAll(sel);
  if (onlyFirst) {
    return addD(_results != null ? _results[0] : void 0);
  }
  return (function() {
    var j, len, results;
    results = [];
    for (j = 0, len = _results.length; j < len; j++) {
      _el = _results[j];
      results.push(addD(_el));
    }
    return results;
  })();
};

domHelper.domel = function(el) {
  if (el != null) {
    return addD(el);
  }
};

domHelper.create = function(tag, attributes) {
  var _el, _k, _v;
  if (tag == null) {
    tag = "DIV";
  }
  if (attributes == null) {
    attributes = {};
  }
  _el = document.createElement(tag);
  for (_k in attributes) {
    _v = attributes[_k];
    _el.setAttribute(_k, _v);
  }
  return addD(_el);
};

domHelper.data = function(el, key, val) {
  if ((el != null ? el.dataset : void 0) == null) {
    if (val != null) {
      return;
    }
    return addD(el);
  }
  if ((key != null) && (val != null)) {
    el.dataset[key] = val;
  } else if (key != null) {
    return el.dataset[key];
  }
  return el.dataset;
};

domHelper.attr = function(el, key, val) {
  if ((key != null) && (val != null)) {
    el.setAttribute(key, val);
  } else if (key != null) {
    el.getAttribute(key);
  }
  return el;
};

domHelper.byClass = function(_cl, context, onlyFirst) {
  var _el, _results;
  if (context == null) {
    context = document;
  }
  if (onlyFirst == null) {
    onlyFirst = false;
  }
  if (_cl[0] === ".") {
    _cl = _cl.slice(1);
  }
  _results = context.getElementsByClassName(_cl);
  if (onlyFirst) {
    return addD(_results != null ? _results[0] : void 0);
  }
  return (function() {
    var j, len, results;
    results = [];
    for (j = 0, len = _results.length; j < len; j++) {
      _el = _results[j];
      results.push(addD(_el));
    }
    return results;
  })();
};

domHelper.byId = function(_id, context) {
  if (context == null) {
    context = document;
  }
  if (_id[0] === "#") {
    _id = _id.slice(1);
  }
  return addD(context.getElementById(_id));
};

domHelper.last = function(el, selector) {
  var idx;
  idx = el.childNodes.length - 1;
  while (idx >= 0) {
    if (domHelper.is(el.childNodes[idx], selector)) {
      return addD(el.childNodes[idx]);
      break;
    }
    idx--;
  }
  return null;
};

domHelper.parent = function(el, selector) {
  var _cursor;
  if (selector == null) {
    return addD(el.parentNode);
  }
  _cursor = el;
  while (_cursor.parentNode != null) {
    _cursor = _cursor.parentNode;
    if (domHelper.is(_cursor, selector)) {
      return addD(_cursor);
    }
  }
  return null;
};

domHelper.first = function(el, selector) {
  var child, idx, j, len, ref;
  idx = el.childNodes.length - 1;
  ref = el.childNodes;
  for (j = 0, len = ref.length; j < len; j++) {
    child = ref[j];
    if (domHelper.is(child, selector)) {
      return addD(child);
    }
  }
  return null;
};

domHelper.children = function(el, selector) {
  var child, children, idx, j, len, ref;
  children = [];
  idx = el.childNodes.length - 1;
  ref = el.childNodes;
  for (j = 0, len = ref.length; j < len; j++) {
    child = ref[j];
    if (domHelper.is(child, selector)) {
      children.push(addD(child));
    }
  }
  return children;
};

domHelper.countChildren = function(el, selector) {
  return domHelper.children(el, selector).length;
};

domHelper.is = function(el, selector) {
  if (selector[0] === ".") {
    return domHelper.hasClass(el, selector.slice(1));
  }
  if (selector[0] === "#") {
    return domHelper.hasId(el, selector.slice(1));
  }
  return false;
};

domHelper.hasClass = function(el, classname) {
  var ref;
  if (el.classList != null) {
    return el.classList.contains(classname);
  }
  if ((el != null ? el.className : void 0) == null) {
    return false;
  }
  if (indexOf.call((el != null ? (ref = el.className) != null ? ref.split(" ") : void 0 : void 0) || [], classname) >= 0) {
    return true;
  }
  return false;
};

domHelper.hide = function(el) {
  if ((el != null ? el.style : void 0) == null) {
    return null;
  }
  el.style.display = "none";
  return el;
};

domHelper.show = function(el, display) {
  if (display == null) {
    display = "block";
  }
  if ((el != null ? el.style : void 0) == null) {
    return null;
  }
  el.style.display = display;
  return el;
};

domHelper.addClass = function(element, classname) {
  var _classnames;
  if (this.hasClass(element, classname)) {
    return;
  }
  _classnames = element.className;
  if (!_classnames.length) {
    element.className = classname;
    return;
  }
  element.className += " " + classname;
  return addD(element);
};

domHelper.removeClass = function(element, classname) {
  var _classnames, rxp;
  if (!this.hasClass(element, classname)) {
    return;
  }
  _classnames = element.className;
  rxp = new RegExp("\\s?\\b" + classname + "\\b", "g");
  _classnames = _classnames.replace(rxp, "");
  element.className = _classnames;
  return addD(element);
};

domHelper.hasId = function(el, id) {
  if ((el != null ? el.id : void 0) === id) {
    return true;
  }
  return false;
};

domHelper.append = function(el, html) {
  var _hdiv, child, j, k, len, len1, ref;
  if (isString(html)) {
    _hdiv = document.createElement('div');
    _hdiv.innerHTML = html;
    ref = _hdiv.childNodes;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      if ((child != null ? child.tagName : void 0) != null) {
        el.appendChild(child);
      }
    }
  } else if (html instanceof HTMLCollection) {
    for (k = 0, len1 = html.length; k < len1; k++) {
      child = html[k];
      el.appendChild(child);
    }
  } else if (html instanceof Element) {
    el.appendChild(html);
  }
  return addD(el);
};

domHelper.prepend = function(el, html) {
  var _firstCh, _hdiv, _latestFirst, child, j, ref, ref1;
  _firstCh = (ref = el.childNodes) != null ? ref[0] : void 0;
  if (_firstCh == null) {
    domHelper.append(el, html);
    return;
  }
  _hdiv = document.createElement('div');
  _hdiv.innerHTML = html;
  _latestFirst = _firstCh;
  ref1 = _hdiv.childNodes;
  for (j = ref1.length - 1; j >= 0; j += -1) {
    child = ref1[j];
    if (!((child != null ? child.tagName : void 0) != null)) {
      continue;
    }
    el.insertBefore(child, _latestFirst);
    _latestFirst = child;
  }
  return el;
};

domHelper.remove = function(el) {
  var i;
  if (el instanceof Element) {
    el.parentElement.removeChild(el);
  }
  if (el instanceof HTMLCollection) {
    i = el.length - 1;
    while (i >= 0) {
      if (el[i] && el[i].parentElement) {
        el[i].parentElement.removeChild(el[i]);
      }
      i--;
    }
  }
  return el;
};

domHelper.replaceWith = function(el, elToRepl) {
  domHelper.parent(el).replaceChild(elToRepl, el);
  return el;
};

domHelper.clone = function(el) {
  return addD(el.cloneNode(true));
};

domHelper.on = function(el, type, handler) {
  if (el == null) {
    return;
  }
  if (el.addEventListener != null) {
    el.addEventListener(type, handler, false);
  } else if (el.attachEvent != null) {
    el.attachEvent('on' + type, handler);
  } else {
    el['on' + type] = handler;
  }
  return el;
};

domHelper.off = function(el, type, handler) {
  if (el == null) {
    return;
  }
  if (el.removeEventListener != null) {
    el.removeEventListener(type, handler, false);
  } else if (el.detachEvent != null) {
    el.detachEvent('on' + type, handler);
  } else {
    delete el['on' + type];
  }
  return el;
};

domHelper.emit = function(el, type) {
  var evt;
  evt = document.createEvent('Event');
  evt.initEvent(type, true, false);
  el.dispatchEvent(evt);
  return evt;
};

module.exports = domHelper;


},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(_dereq_,module,exports){
var Base,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Base = (function(superClass) {
  extend(Base, superClass);

  function Base() {
    this._error = bind(this._error, this);
    return Base.__super__.constructor.apply(this, arguments);
  }

  Base.prototype._error = function(cb, err) {
    var _err;
    if (!(err instanceof Error)) {
      _err = new Error(err);
      _err.name = err;
      try {
        _err.message = this.ERRORS[err] || " - ";
      } catch (undefined) {}
    } else {
      _err = err;
    }
    if (cb == null) {
      throw _err;
    } else {
      cb(_err);
    }
  };

  return Base;

})(_dereq_('events'));

module.exports = Base;


},{"events":8}],3:[function(_dereq_,module,exports){
var Base, Client, File, FileView, _defauktKeys, _defaults, _k, _v, dom, utils,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

dom = _dereq_("domel");

utils = _dereq_("./utils");

Base = _dereq_("./base");

File = _dereq_("./file");

FileView = _dereq_("./fileview");

_defaults = {
  host: null,
  domain: null,
  accesskey: null,
  keyprefix: "clientupload",
  autostart: true,
  requestSignFn: null,
  resultTemplateFn: null,
  maxsize: 0,
  maxcount: 0,
  width: null,
  height: null,
  accept: null,
  ttl: 0,
  acl: "public-read",
  properties: null,
  tags: null,
  "content-disposition": null,
  cssdroppable: "dropable",
  csshover: "hover",
  cssprocess: "process",
  cssdisabled: "disabled"
};

_defauktKeys = (function() {
  var results;
  results = [];
  for (_k in _defaults) {
    _v = _defaults[_k];
    results.push(_k);
  }
  return results;
})();

Client = (function(superClass) {
  extend(Client, superClass);

  Client.prototype.version = "@@version";

  Client.prototype._rgxHost = /https?:\/\/[^\/$\s]+/i;

  function Client(drag, elresults, options) {
    var _html, _htmlData, _inpAccept, _mxcnt, _mxsz, _opt, _tag, i, len, ref, ref1, ref2, ref3, ref4, ref5;
    if (options == null) {
      options = {};
    }
    this._validateEl = bind(this._validateEl, this);
    this._checkFinish = bind(this._checkFinish, this);
    this.onFinish = bind(this.onFinish, this);
    this.fileNew = bind(this.fileNew, this);
    this.fileError = bind(this.fileError, this);
    this.fileDone = bind(this.fileDone, this);
    this.enable = bind(this.enable, this);
    this.disable = bind(this.disable, this);
    this.abortAll = bind(this.abortAll, this);
    this.upload = bind(this.upload, this);
    this.onLeave = bind(this.onLeave, this);
    this.onOver = bind(this.onOver, this);
    this.onHover = bind(this.onHover, this);
    this.onSelect = bind(this.onSelect, this);
    this.initFileAPI = bind(this.initFileAPI, this);
    this.initialize = bind(this.initialize, this);
    Client.__super__.constructor.apply(this, arguments);
    this.enabled = true;
    this.useFileAPI = false;
    this.on("file.new", this.fileNew);
    this.on("file.done", this.fileDone);
    this.on("file.error", this.fileError);
    this.on("file.invalid", this.fileError);
    this.on("file.aborted", this.fileError);
    this.on("finish", this.onFinish);
    this.within_enter = false;
    this.el = this._validateEl(drag, "drag");
    this.sel = this.el.d.find("input" + (options.inputclass || "") + "[type='file']", true);
    if (this.sel == null) {
      this._error(null, "missing-select-el");
      return;
    }
    this.formname = this.sel.getAttribute("name");
    if (elresults != null) {
      this.res = this._validateEl(elresults, "result");
    }
    _htmlData = this.el.d.data();
    this.options = utils.assign({}, _defaults, _htmlData, options || {});
    if (!((ref = this.options.host) != null ? ref.length : void 0)) {
      this._error(null, "missing-host");
      return;
    }
    if (!this._rgxHost.test(this.options.host)) {
      this._error(null, "invalid-host");
      return;
    }
    if (!((ref1 = this.options.domain) != null ? ref1.length : void 0)) {
      this._error(null, "missing-domain");
      return;
    }
    if (!((ref2 = this.options.accesskey) != null ? ref2.length : void 0)) {
      this._error(null, "missing-accesskey");
      return;
    }
    if (this.options.maxcount != null) {
      _mxcnt = parseInt(this.options.maxcount, 10);
      if (isNaN(_mxcnt)) {
        this.options.maxcount = _defaults.maxcount;
      } else {
        this.options.maxcount = _mxcnt;
      }
    }
    if (this.options.maxcount !== 1) {
      this.sel.setAttribute("multiple", "multiple");
    }
    if (this.options.maxsize != null) {
      _mxsz = parseInt(this.options.maxsize, 10);
      if (isNaN(_mxsz)) {
        this.options.maxsize = _defaults.maxsize;
      } else {
        this.options.maxsize = _mxsz;
      }
    }
    if ((this.options.requestSignFn != null) && typeof this.options.requestSignFn !== "function") {
      this._error(null, "invalid-requestSignfn");
      return;
    }
    if ((this.options.ttl != null) && !utils.isInt(this.options.ttl)) {
      this._error(null, "invalid-ttl");
      return;
    } else if (this.options.ttl != null) {
      this.options.ttl = parseInt(this.options.ttl, 10);
      if (isNaN(this.options.ttl)) {
        this._error(null, "invalid-ttl");
        return;
      }
    }
    if ((this.options.tags != null) && utils.isArray(this.options.tags)) {
      ref3 = this.options.tags;
      for (i = 0, len = ref3.length; i < len; i++) {
        _tag = ref3[i];
        if (!(!utils.isString(_tag))) {
          continue;
        }
        this._error(null, "invalid-tags");
        return;
      }
    } else if (this.options.tags != null) {
      this._error(null, "invalid-tags");
      return;
    }
    if ((this.options.properties != null) && !utils.isObject(this.options.properties)) {
      this._error(null, "invalid-properties");
      return;
    }
    if ((this.options["content-disposition"] != null) && !utils.isString(this.options["content-disposition"])) {
      this._error(null, "invalid-content-disposition");
      return;
    }
    if ((this.options.acl != null) && !utils.isString(this.options.acl) && ((ref4 = this.options.acl) !== "public-read" && ref4 !== "authenticated-read")) {
      this._error(null, "invalid-acl");
      return;
    }
    _inpAccept = this.sel.getAttribute("accept");
    if ((this.options.accept != null) || (_inpAccept != null)) {
      _html = (_inpAccept != null ? _inpAccept.split(",") : void 0) || [];
      _opt = ((ref5 = this.options.accept) != null ? ref5.split(",") : void 0) || [];
      if (_html != null ? _html.length : void 0) {
        this.options.accept = _html;
      } else if (_opt != null ? _opt.length : void 0) {
        this.sel.setAttribute("accept", this.options.accept);
      }
      this.options.acceptRules = this.generateAcceptRules(this.options.accept);
    }
    this.initialize();
    this.idx_started = 0;
    this.idx_finished = 0;
    this.el.d.data("mediaapiclient", this);
    return;
  }

  Client.prototype.generateAcceptRules = function(accept) {
    var _rule, _rules, i, len;
    _rules = [];
    for (i = 0, len = accept.length; i < len; i++) {
      _rule = accept[i];
      if (_rule.indexOf("/") >= 0) {
        _rules.push((function() {
          var _regex;
          _regex = new RegExp((_rule.replace("*", "\\w+")) + "$", "i");
          return function(file) {
            return _regex.test(file.type);
          };
        })());
      } else if (_rule.indexOf(".") >= 0) {
        _rules.push((function() {
          var _regex;
          _regex = new RegExp((_rule.replace(".", "\\.")) + "$", "i");
          return function(file) {
            return _regex.test(file.name);
          };
        })());
      } else if (_rule === "*") {
        _rules.push((function(file) {
          return true;
        }));
      }
    }
    return _rules;
  };

  Client.prototype.initialize = function() {
    if (window.File && window.FileList && window.FileReader) {
      this.sel.d.on("change", this.onSelect);
      this.useFileAPI = true;
      this.initFileAPI();
    } else {

    }
  };

  Client.prototype.initFileAPI = function() {
    var xhr;
    xhr = new XMLHttpRequest();
    if (xhr != null ? xhr.upload : void 0) {
      this.el.ondragover = this.onHover;
      this.el.ondragleave = this.onLeave;
      this.el.ondrop = this.onSelect;
      this.el.d.addClass(this.options.cssdroppable);
    } else {

    }
  };

  Client.prototype.onSelect = function(evnt) {
    var files, ref, ref1, ref2, ref3, ref4, ref5;
    evnt.preventDefault();
    if (!this.enabled) {
      return;
    }
    if (this.options.maxcount <= 0 || this.idx_started < this.options.maxcount) {
      this.el.d.removeClass(this.options.csshover);
      this.el.d.addClass(this.options.cssprocess);
      files = ((ref = evnt.target) != null ? ref.files : void 0) || ((ref1 = evnt.originalEvent) != null ? (ref2 = ref1.target) != null ? ref2.files : void 0 : void 0) || ((ref3 = evnt.dataTransfer) != null ? ref3.files : void 0) || ((ref4 = evnt.originalEvent) != null ? (ref5 = ref4.dataTransfer) != null ? ref5.files : void 0 : void 0);
      this.upload(files);
    } else {
      this.el.d.removeClass(this.options.csshover);
      this.disable();
    }
  };

  Client.prototype.onHover = function(evnt) {
    evnt.preventDefault();
    if (!this.enabled) {
      return;
    }
    this.within_enter = true;
    setTimeout(((function(_this) {
      return function() {
        return _this.within_enter = false;
      };
    })(this)), 0);
    this.el.d.addClass(this.options.csshover);
  };

  Client.prototype.onOver = function(evnt) {
    evnt.preventDefault();
    if (!this.enabled) {
      return;
    }
  };

  Client.prototype.onLeave = function(evnt) {
    if (!this.enabled) {
      return;
    }
    if (!this.within_enter) {
      this.el.d.removeClass(this.options.csshover);
    }
  };

  Client.prototype.upload = function(files) {
    var file, i, idx, len;
    if (this.useFileAPI) {
      for (idx = i = 0, len = files.length; i < len; idx = ++i) {
        file = files[idx];
        if (this.enabled) {
          if (this.options.maxcount <= 0 || this.idx_started < this.options.maxcount) {
            this.idx_started++;
            new File(file, this.idx_started, this, this.options);
          } else {
            this.disable();
          }
        }
      }
    }
  };

  Client.prototype.abortAll = function() {
    this.emit("abortAll");
  };

  Client.prototype.disable = function() {
    this.sel.setAttribute("disabled", "disabled");
    this.el.d.addClass(this.options.cssdisabled);
    this.enabled = false;
  };

  Client.prototype.enable = function() {
    this.sel.removeAttribute("disabled");
    this.el.d.removeClass(this.options.cssdisabled);
    this.enabled = true;
  };

  Client.prototype.fileDone = function(file) {
    this.idx_finished++;
    this._checkFinish();
  };

  Client.prototype.fileError = function(file, err) {
    console.error("FILE-ERROR", file, err);
    this.idx_finished++;
    this._checkFinish();
  };

  Client.prototype.fileNew = function(file) {
    var _fileview;
    if (this.res != null) {
      _fileview = new FileView(file, this, this.options);
      this.res.d.append(_fileview.render());
    }
  };

  Client.prototype.onFinish = function() {
    this.el.d.removeClass(this.options.cssprocess);
  };

  Client.prototype._checkFinish = function() {
    if (this.idx_finished >= this.idx_started) {
      this.emit("finish");
      if (this.options.maxcount > 0 && this.idx_started >= this.options.maxcount) {
        this.disable();
      }
    }
  };

  Client.prototype._validateEl = function(el, type) {
    var _el;
    if (el == null) {
      this._error(null, "missing-" + type + "-el");
      return;
    }
    switch (typeof el) {
      case "string":
        _el = dom(el, null, true);
        break;
      case "object":
        if (el instanceof HTMLElement) {
          _el = dom.domel(el);
        }
    }
    if (_el == null) {
      this._error(null, "invalid-" + type + "-el");
      return;
    }
    return _el;
  };

  Client.prototype.ERRORS = {
    "missing-select-el": "Missing select element. Please define a valid element as a Selector, DOM-node",
    "invalid-select-el": "Invalid select element. Please define a valid element as a Selector, DOM-node",
    "missing-drag-el": "Missing drag element. Please define a valid element as a Selector, DOM-node",
    "invalid-drag-el": "Invalid drag element. Please define a valid element as a Selector, DOM-node",
    "missing-host": "Missing host. You have to defien a host as url starting with `http://` or `https://`.",
    "invalid-host": "Invalid host. You have to defien a host as url starting with `http://` or `https://`.",
    "missing-domain": "Missing domain. You have to define a domain.",
    "missing-accesskey": "Missing accesskey. You have to define a accesskey.",
    "missing-keyprefix": "Missing keyprefix. You have to define a keyprefix.",
    "invalid-ttl": "for the option `ttl` only a positiv number is allowed",
    "invalid-tags": "for the option `tags` only an array of strings is allowed",
    "invalid-properties": "for the option `properties` only an object is allowed",
    "invalid-content-disposition": "for the option `content-disposition` only an string like: `attachment; filename=friendly_filename.pdf` is allowed",
    "invalid-acl": "the option acl only accepts the string `public-read` or `authenticated-read`"
  };

  return Client;

})(Base);

Client.defaults = function(options) {
  for (_k in options) {
    _v = options[_k];
    if (indexOf.call(_defauktKeys, _k) >= 0) {
      _defaults[_k] = _v;
    }
  }
  return _defaults;
};

module.exports = Client;


},{"./base":2,"./file":4,"./fileview":5,"./utils":7,"domel":1}],4:[function(_dereq_,module,exports){
var File, xhr,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

xhr = _dereq_("xhr");

File = (function(superClass) {
  extend(File, superClass);

  File.prototype.states = ["new", "start", "signed", "upload", "progress", "done", "invalid", "error", "aborted"];

  function File(file, idx, client, options) {
    var ref;
    this.file = file;
    this.idx = idx;
    this.client = client;
    this.options = options;
    this._defaultRequestSignature = bind(this._defaultRequestSignature, this);
    this._handleProgress = bind(this._handleProgress, this);
    this._upload = bind(this._upload, this);
    this._sign = bind(this._sign, this);
    this._testMime = bind(this._testMime, this);
    this._validate = bind(this._validate, this);
    this._setState = bind(this._setState, this);
    this.getData = bind(this.getData, this);
    this.getType = bind(this.getType, this);
    this.getName = bind(this.getName, this);
    this.getProgress = bind(this.getProgress, this);
    this.getResult = bind(this.getResult, this);
    this.getState = bind(this.getState, this);
    this.abort = bind(this.abort, this);
    this.start = bind(this.start, this);
    File.__super__.constructor.apply(this, arguments);
    this.state = 0;
    this.validation = [];
    this.key = this.options.keyprefix + "_" + this.getName().replace(this._rgxFile2Key, "") + "_" + this._now() + "_" + this.idx;
    this.client.emit("file.new", this);
    this.client.on("abortAll", this.abort);
    this.on("start", this.start);
    this.on("signed", this._upload);
    if (this.options.requestSignFn == null) {
      this.options.requestSignFn = this._defaultRequestSignature;
    }
    if (!((ref = this.options.keyprefix) != null ? ref.length : void 0)) {
      this.options.keyprefix = "clientupload";
    }
    if (this.options.autostart == null) {
      this.options.autostart = true;
    }
    this._validate();
    if (this.options.autostart) {
      this.emit("start");
    }
    return;
  }

  File.prototype.start = function() {
    if (this.state <= 0) {
      this._setState(1);
      this.client.emit("file.upload", this);
      this._sign();
    }
    return this;
  };

  File.prototype.abort = function() {
    var ref;
    if (this.state <= 4) {
      this._setState(8);
      if ((ref = this.requestUpload) != null) {
        ref.abort();
      }
      this.emit("aborted");
      this.client.emit("file.aborted", this);
    }
    return this;
  };

  File.prototype.getState = function() {
    return this.states[this.state];
  };

  File.prototype.getResult = function() {
    if (this.state === 5 && (this.data != null)) {
      return {
        url: this.data.url,
        hash: this.data.filehash,
        key: this.data.key,
        type: this.data.content_type
      };
    }
    return null;
  };

  File.prototype.getProgress = function(asFactor) {
    var _fac;
    if (asFactor == null) {
      asFactor = false;
    }
    if (this.state < 4) {
      _fac = 0;
    } else if (this.state > 4) {
      _fac = 1;
    } else {
      _fac = this.progressState;
    }
    if (asFactor) {
      return _fac;
    } else {
      return Math.round(_fac * 100);
    }
  };

  File.prototype.getName = function() {
    return this.file.name;
  };

  File.prototype.getType = function() {
    return this.file.type;
  };

  File.prototype.getData = function() {
    var _ret;
    _ret = {
      name: this.client.formname,
      filename: this.getName(),
      idx: this.idx,
      state: this.getState(),
      progress: this.getProgress(),
      result: this.getResult(),
      options: this.options,
      invalid_reason: this.validation,
      error: this.error
    };
    return _ret;
  };

  File.prototype._setState = function(state) {
    if (state > this.state) {
      this.state = state;
      this.emit("state", this.getState());
    }
    return state;
  };

  File.prototype._validate = function() {
    var _size, ref;
    _size = this.file.size / 1024;
    if (this.options.maxsize > 0 && this.options.maxsize < _size) {
      this.validation.push("maxsize");
    }
    if (((ref = this.options.acceptRules) != null ? ref.length : void 0) && !this._testMime(this.options.acceptRules)) {
      this.validation.push("accept");
    }
    if (this.validation.length) {
      this._setState(6);
      this.emit("invalid", this.validation);
      this.client.emit("file.invalid", this, this.validation);
      return false;
    }
    return true;
  };

  File.prototype._testMime = function(acceptRules) {
    var _rule, i, len;
    for (i = 0, len = acceptRules.length; i < len; i++) {
      _rule = acceptRules[i];
      if (_rule(this.file)) {
        return true;
      }
    }
    return false;
  };

  File.prototype._now = function() {
    return Math.round(Date.now() / 1000);
  };

  File.prototype._rgxFile2Key = /([^A-Za-z0-9])/ig;

  File.prototype._sign = function() {
    var _content_type, _name;
    _name = this.getName();
    _content_type = this.getType();
    if (this.state > 1) {
      return;
    }
    this.url = this.options.host + this.options.domain + "/" + this.key;
    this.json = {
      blob: true,
      acl: this.options.acl,
      ttl: this.options.ttl,
      properties: {
        filename: _name
      }
    };
    if (this.options.width != null) {
      this.json.width = this.options.width;
    }
    if (this.options.height != null) {
      this.json.height = this.options.height;
    }
    if (this.options.tags != null) {
      this.json.tags = this.options.tags;
    }
    if (this.options.properties != null) {
      this.json.properties = this.options.properties;
    }
    if (this.options["content-disposition"] != null) {
      this.json["content-disposition"] = this.options["content-disposition"];
    }
    if (_content_type != null ? _content_type.length : void 0) {
      this.json.content_type = _content_type;
    }
    this.emit("content", this.key, this.json);
    this.client.emit("file.content", this, this.key, this.json);
    this.options.requestSignFn.call(this, this.options.domain, this.options.accesskey, this.url, this.key, this.json, (function(_this) {
      return function(err, signature) {
        if (err) {
          _this.error = err;
          _this._setState(7);
          _this.emit("error", err);
          _this.client.emit("file.error", _this, err);
          return;
        }
        if (_this.url.indexOf("?") >= 0) {
          _this.url += "&";
        } else {
          _this.url += "?";
        }
        _this.url += "signature=" + encodeURIComponent(signature);
        _this._setState(2);
        _this.emit("signed");
      };
    })(this));
  };

  File.prototype._upload = function() {
    var _xhr, data, ref;
    if (this.state > 2) {
      return;
    }
    this._setState(3);
    data = new FormData();
    data.append("JSON", JSON.stringify(this.json));
    data.append("blob", this.file);
    _xhr = new window.XMLHttpRequest();
    if ((ref = _xhr.upload) != null) {
      ref.addEventListener("progress", this._handleProgress(), false);
    }
    _xhr.addEventListener("progress", this._handleProgress(), false);
    _xhr._isfile = true;
    this.requestUpload = xhr({
      xhr: _xhr,
      url: this.url,
      method: "POST",
      data: data
    }, (function(_this) {
      return function(err, resp, body) {
        var _data;
        if (err) {
          _this._setState(7);
          _this.progressState = 0;
          _this.error = err;
          _this.emit("error", err);
          _this.client.emit("file.error", _this, err);
          return;
        }
        _data = JSON.parse(body);
        if (resp.statusCode >= 300) {
          _this._setState(7);
          _this.progressState = 0;
          _this.error = _data;
          _this.emit("error", _data);
          _this.client.emit("file.error", _this, _data);
          return;
        }
        _this.data = _data != null ? _data.rows[0] : void 0;
        _this.progressState = 1;
        _this._setState(5);
        _this.emit("done", _this.data);
        _this.client.emit("file.done", _this);
      };
    })(this));
  };

  File.prototype._handleProgress = function() {
    return (function(_this) {
      return function(evnt) {
        if (evnt.target.method == null) {
          _this.progressState = evnt.loaded / evnt.total;
          _this._setState(4);
          _this.emit("progress", _this.getProgress(), evnt);
          return;
        }
      };
    })(this);
  };

  File.prototype._defaultRequestSignature = function(domain, accesskey, madiaapiurl, key, json, cb) {
    var _url, _xhr, data;
    _url = this.options.host + domain + "/sign/" + accesskey;
    _xhr = new window.XMLHttpRequest();
    data = new FormData();
    data.append("url", madiaapiurl);
    data.append("key", key);
    data.append("json", JSON.stringify(json));
    xhr({
      xhr: _xhr,
      method: "POST",
      url: _url,
      body: data
    }, function(err, resp, signature) {
      if (err) {
        console.error("get sign error", err);
        cb(err);
        return;
      }
      cb(null, signature);
    });
  };

  return File;

})(_dereq_("./base"));

module.exports = File;


},{"./base":2,"xhr":9}],5:[function(_dereq_,module,exports){
var FileView, dom,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

dom = _dereq_("domel");

FileView = (function(superClass) {
  extend(FileView, superClass);

  function FileView(fileObj, client, options) {
    this.fileObj = fileObj;
    this.client = client;
    this.options = options;
    this.update = bind(this.update, this);
    this.render = bind(this.render, this);
    FileView.__super__.constructor.apply(this, arguments);
    if ((this.client.resultTemplateFn != null) && typeof this.options.resultTemplateFn !== "function") {
      this.template = this.client.resultTemplateFn;
    } else {
      this.template = this._defaultTemplate;
    }
    this.fileObj.on("progress", this.update());
    this.fileObj.on("done", this.update());
    this.fileObj.on("error", this.update());
    this.fileObj.on("invalid", this.update());
    return;
  }

  FileView.prototype.render = function() {
    this.el = dom.create("div", {
      "class": "file col-sm-6 col-md-4"
    });
    this.el.innerHTML = this.template(this.fileObj.getData());
    return this.el;
  };

  FileView.prototype.update = function() {
    return (function(_this) {
      return function(evnt) {
        _this.el.innerHTML = _this.template(_this.fileObj.getData());
      };
    })(this);
  };

  FileView.prototype._defaultTemplate = function(data) {
    var _html, _k, _reason, _v, i, len, ref, ref1;
    _html = "<div class=\"thumbnail state-" + data.state + "\">\n	<b>" + data.filename + "</b>";
    switch (data.state) {
      case "progress":
        _html += "<div class=\"progress\">\n	<div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"" + data.progress + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: " + data.progress + "%;\">\n		<span>" + data.progress + "%</span>\n	</div>\n</div>";
        break;
      case "done":
        _html += "<div class=\"result\">\n	<a href=\"" + data.result.url + "\" target=\"_new\">Fertig! ( " + data.result.key + " )</a>";
        ref = data.result;
        for (_k in ref) {
          _v = ref[_k];
          _html += "<input type=\"hidden\" name=\"" + data.name + "_" + data.idx + "_" + _k + "\" value=\"" + _v + "\">";
        }
        _html += "</div>";
        break;
      case "invalid":
        _html += "<div class=\"result\">\n	<b>Invalid</b>";
        ref1 = data.invalid_reason;
        for (i = 0, len = ref1.length; i < len; i++) {
          _reason = ref1[i];
          switch (_reason) {
            case "maxsize":
              _html += "<div class=\"alert alert-error\">File too big. Only files until " + data.options.maxsize + "kb are allowed.</div>";
              break;
            case "accept":
              _html += "<div class=\"alert alert-error\">Wrong type. Only files of type " + (data.options.accept.join(", ")) + " are allowed.</div>";
          }
          _html += "</div>";
        }
        break;
      case "error":
        _html += "<div class=\"alert alert-error\">An Error occured.</div>";
        break;
      case "aborted":
        _html += "<div class=\"alert alert-error\">Upload aborted.</div>";
    }
    _html += "</div>";
    return _html;
  };

  return FileView;

})(_dereq_("./base"));

module.exports = FileView;


},{"./base":2,"domel":1}],6:[function(_dereq_,module,exports){
var Base, Client, File, FileView;

Base = _dereq_("./base");

File = _dereq_("./file");

FileView = _dereq_("./fileview");

Client = _dereq_("./client");

Client.Base = Base;

Client.File = File;

Client.FileView = FileView;

module.exports = Client;


},{"./base":2,"./client":3,"./file":4,"./fileview":5}],7:[function(_dereq_,module,exports){
var _intRegex, assign, isArray, isInt, isObject, isString,
  slice = [].slice;

isObject = function(vr) {
  return vr !== null && typeof vr === 'object';
};

isArray = function(vr) {
  return Object.prototype.toString.call(vr) === '[object Array]';
};

isString = function(vr) {
  return typeof vr === 'string' || vr instanceof String;
};

_intRegex = /^\d+$/;

isInt = function(vr) {
  return _intRegex.test(vr);
};

assign = function() {
  var _k, _v, i, len, src, srcs, tgrt;
  tgrt = arguments[0], srcs = 2 <= arguments.length ? slice.call(arguments, 1) : [];
  for (i = 0, len = srcs.length; i < len; i++) {
    src = srcs[i];
    if (isObject(src)) {
      for (_k in src) {
        _v = src[_k];
        tgrt[_k] = _v;
      }
    }
  }
  return tgrt;
};

module.exports = {
  isArray: isArray,
  isObject: isObject,
  isString: isString,
  isInt: isInt,
  assign: assign
};


},{}],8:[function(_dereq_,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],9:[function(_dereq_,module,exports){
"use strict";
var window = _dereq_("global/window")
var once = _dereq_("once")
var parseHeaders = _dereq_("parse-headers")



module.exports = createXHR
createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest


function isEmpty(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)) return false
    }
    return true
}

function createXHR(options, callback) {
    function readystatechange() {
        if (xhr.readyState === 4) {
            loadFunc()
        }
    }

    function getBody() {
        // Chrome with requestType=blob throws errors arround when even testing access to responseText
        var body = undefined

        if (xhr.response) {
            body = xhr.response
        } else if (xhr.responseType === "text" || !xhr.responseType) {
            body = xhr.responseText || xhr.responseXML
        }

        if (isJson) {
            try {
                body = JSON.parse(body)
            } catch (e) {}
        }

        return body
    }

    var failureResponse = {
                body: undefined,
                headers: {},
                statusCode: 0,
                method: method,
                url: uri,
                rawRequest: xhr
            }

    function errorFunc(evt) {
        clearTimeout(timeoutTimer)
        if(!(evt instanceof Error)){
            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
        }
        evt.statusCode = 0
        callback(evt, failureResponse)
    }

    // will load the data & process the response in a special response object
    function loadFunc() {
        if (aborted) return
        var status
        clearTimeout(timeoutTimer)
        if(options.useXDR && xhr.status===undefined) {
            //IE8 CORS GET successful response doesn't have a status field, but body is fine
            status = 200
        } else {
            status = (xhr.status === 1223 ? 204 : xhr.status)
        }
        var response = failureResponse
        var err = null

        if (status !== 0){
            response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
            }
            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
                response.headers = parseHeaders(xhr.getAllResponseHeaders())
            }
        } else {
            err = new Error("Internal XMLHttpRequest Error")
        }
        callback(err, response, response.body)

    }

    if (typeof options === "string") {
        options = { uri: options }
    }

    options = options || {}
    if(typeof callback === "undefined"){
        throw new Error("callback argument missing")
    }
    callback = once(callback)

    var xhr = options.xhr || null

    if (!xhr) {
        if (options.cors || options.useXDR) {
            xhr = new createXHR.XDomainRequest()
        }else{
            xhr = new createXHR.XMLHttpRequest()
        }
    }

    var key
    var aborted
    var uri = xhr.url = options.uri || options.url
    var method = xhr.method = options.method || "GET"
    var body = options.body || options.data
    var headers = xhr.headers = options.headers || {}
    var sync = !!options.sync
    var isJson = false
    var timeoutTimer

    if ("json" in options) {
        isJson = true
        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
        if (method !== "GET" && method !== "HEAD") {
            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
            body = JSON.stringify(options.json)
        }
    }

    xhr.onreadystatechange = readystatechange
    xhr.onload = loadFunc
    xhr.onerror = errorFunc
    // IE9 must have onprogress be set to a unique function.
    xhr.onprogress = function () {
        // IE must die
    }
    xhr.ontimeout = errorFunc
    xhr.open(method, uri, !sync, options.username, options.password)
    //has to be after open
    if(!sync) {
        xhr.withCredentials = !!options.withCredentials
    }
    // Cannot set timeout with sync request
    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
    if (!sync && options.timeout > 0 ) {
        timeoutTimer = setTimeout(function(){
            aborted=true//IE9 may still call readystatechange
            xhr.abort("timeout")
            var e = new Error("XMLHttpRequest timeout")
            e.code = "ETIMEDOUT"
            errorFunc(e)
        }, options.timeout )
    }

    if (xhr.setRequestHeader) {
        for(key in headers){
            if(headers.hasOwnProperty(key)){
                xhr.setRequestHeader(key, headers[key])
            }
        }
    } else if (options.headers && !isEmpty(options.headers)) {
        throw new Error("Headers cannot be set on an XDomainRequest object")
    }

    if ("responseType" in options) {
        xhr.responseType = options.responseType
    }

    if ("beforeSend" in options &&
        typeof options.beforeSend === "function"
    ) {
        options.beforeSend(xhr)
    }

    xhr.send(body)

    return xhr


}

function noop() {}

},{"global/window":10,"once":11,"parse-headers":15}],10:[function(_dereq_,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],11:[function(_dereq_,module,exports){
module.exports = once

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })
})

function once (fn) {
  var called = false
  return function () {
    if (called) return
    called = true
    return fn.apply(this, arguments)
  }
}

},{}],12:[function(_dereq_,module,exports){
var isFunction = _dereq_('is-function')

module.exports = forEach

var toString = Object.prototype.toString
var hasOwnProperty = Object.prototype.hasOwnProperty

function forEach(list, iterator, context) {
    if (!isFunction(iterator)) {
        throw new TypeError('iterator must be a function')
    }

    if (arguments.length < 3) {
        context = this
    }
    
    if (toString.call(list) === '[object Array]')
        forEachArray(list, iterator, context)
    else if (typeof list === 'string')
        forEachString(list, iterator, context)
    else
        forEachObject(list, iterator, context)
}

function forEachArray(array, iterator, context) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            iterator.call(context, array[i], i, array)
        }
    }
}

function forEachString(string, iterator, context) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        iterator.call(context, string.charAt(i), i, string)
    }
}

function forEachObject(object, iterator, context) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            iterator.call(context, object[k], k, object)
        }
    }
}

},{"is-function":13}],13:[function(_dereq_,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],14:[function(_dereq_,module,exports){

exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};

},{}],15:[function(_dereq_,module,exports){
var trim = _dereq_('trim')
  , forEach = _dereq_('for-each')
  , isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }

module.exports = function (headers) {
  if (!headers)
    return {}

  var result = {}

  forEach(
      trim(headers).split('\n')
    , function (row) {
        var index = row.indexOf(':')
          , key = trim(row.slice(0, index)).toLowerCase()
          , value = trim(row.slice(index + 1))

        if (typeof(result[key]) === 'undefined') {
          result[key] = value
        } else if (isArray(result[key])) {
          result[key].push(value)
        } else {
          result[key] = [ result[key], value ]
        }
      }
  )

  return result
}
},{"for-each":12,"trim":14}]},{},[6])(6)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9kb21lbC9saWIvbWFpbi5qcyIsIi9Vc2Vycy9tYXRoaWFzcGV0ZXIvUHJvamVrdGUvbWVkaWEtYXBpLWNsaWVudC9fc3JjL2xpYi9iYXNlLmNvZmZlZSIsIi9Vc2Vycy9tYXRoaWFzcGV0ZXIvUHJvamVrdGUvbWVkaWEtYXBpLWNsaWVudC9fc3JjL2xpYi9jbGllbnQuY29mZmVlIiwiL1VzZXJzL21hdGhpYXNwZXRlci9Qcm9qZWt0ZS9tZWRpYS1hcGktY2xpZW50L19zcmMvbGliL2ZpbGUuY29mZmVlIiwiL1VzZXJzL21hdGhpYXNwZXRlci9Qcm9qZWt0ZS9tZWRpYS1hcGktY2xpZW50L19zcmMvbGliL2ZpbGV2aWV3LmNvZmZlZSIsIi9Vc2Vycy9tYXRoaWFzcGV0ZXIvUHJvamVrdGUvbWVkaWEtYXBpLWNsaWVudC9fc3JjL2xpYi9tYWluLmNvZmZlZSIsIi9Vc2Vycy9tYXRoaWFzcGV0ZXIvUHJvamVrdGUvbWVkaWEtYXBpLWNsaWVudC9fc3JjL2xpYi91dGlscy5jb2ZmZWUiLCJub2RlX21vZHVsZXMvZ3J1bnQtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy94aHIvaW5kZXguanMiLCJub2RlX21vZHVsZXMveGhyL25vZGVfbW9kdWxlcy9nbG9iYWwvd2luZG93LmpzIiwibm9kZV9tb2R1bGVzL3hoci9ub2RlX21vZHVsZXMvb25jZS9vbmNlLmpzIiwibm9kZV9tb2R1bGVzL3hoci9ub2RlX21vZHVsZXMvcGFyc2UtaGVhZGVycy9ub2RlX21vZHVsZXMvZm9yLWVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMveGhyL25vZGVfbW9kdWxlcy9wYXJzZS1oZWFkZXJzL25vZGVfbW9kdWxlcy9mb3ItZWFjaC9ub2RlX21vZHVsZXMvaXMtZnVuY3Rpb24vaW5kZXguanMiLCJub2RlX21vZHVsZXMveGhyL25vZGVfbW9kdWxlcy9wYXJzZS1oZWFkZXJzL25vZGVfbW9kdWxlcy90cmltL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3hoci9ub2RlX21vZHVsZXMvcGFyc2UtaGVhZGVycy9wYXJzZS1oZWFkZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM3TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuZG9tZWwgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgYWRkRCwgYWRkRFdyYXAsIGRvbUhlbHBlciwgaXNTdHJpbmcsIG5vbkF1dG9BdHRhY2gsIHJvb3QsXG4gIHNsaWNlID0gW10uc2xpY2UsXG4gIGluZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKGl0ZW0pIHsgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykgeyBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHJldHVybiBpOyB9IHJldHVybiAtMTsgfTtcblxucm9vdCA9IHRoaXM7XG5cblxuLypcblx0XG5cdEV4dGVuZCBuYXRpdmVzXG4gKi9cblxuaXNTdHJpbmcgPSBmdW5jdGlvbih2cikge1xuICByZXR1cm4gdHlwZW9mIHZyID09PSAnc3RyaW5nJyB8fCB2ciBpbnN0YW5jZW9mIFN0cmluZztcbn07XG5cbm5vbkF1dG9BdHRhY2ggPSBbXCJkb21lbFwiLCBcImNyZWF0ZVwiLCBcImJ5Q2xhc3NcIiwgXCJieUlkXCJdO1xuXG5hZGREV3JhcCA9IGZ1bmN0aW9uKGZuLCBlbCwgZWxJZHgpIHtcbiAgaWYgKGVsSWR4ID09IG51bGwpIHtcbiAgICBlbElkeCA9IDA7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzO1xuICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICBhcmdzLnNwbGljZShlbElkeCwgMCwgZWwpO1xuICAgIHJldHVybiBmbi5hcHBseShkb21IZWxwZXIsIGFyZ3MpO1xuICB9O1xufTtcblxuYWRkRCA9IGZ1bmN0aW9uKGVsLCBrZXkpIHtcbiAgdmFyIGosIGxlbiwgbmFtZUZuLCByZWY7XG4gIGlmIChrZXkgPT0gbnVsbCkge1xuICAgIGtleSA9IFwiZFwiO1xuICB9XG4gIGlmIChlbCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGVsO1xuICB9XG4gIGlmIChlbFtrZXldICE9IG51bGwpIHtcbiAgICByZXR1cm4gZWw7XG4gIH1cbiAgZWxba2V5XSA9IHt9O1xuICByZWYgPSBPYmplY3Qua2V5cyhkb21IZWxwZXIpO1xuICBmb3IgKGogPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICBuYW1lRm4gPSByZWZbal07XG4gICAgaWYgKGluZGV4T2YuY2FsbChub25BdXRvQXR0YWNoLCBuYW1lRm4pIDwgMCkge1xuICAgICAgZWxba2V5XVtuYW1lRm5dID0gYWRkRFdyYXAoZG9tSGVscGVyW25hbWVGbl0sIGVsKTtcbiAgICB9XG4gIH1cbiAgZWxba2V5XS5maW5kID0gYWRkRFdyYXAoZG9tSGVscGVyLCBlbCwgMSk7XG4gIGVsW2tleV0uYnlJZCA9IGFkZERXcmFwKGRvbUhlbHBlci5ieUlkLCBlbCwgMSk7XG4gIGVsW2tleV0uYnlDbGFzcyA9IGFkZERXcmFwKGRvbUhlbHBlci5ieUNsYXNzLCBlbCwgMSk7XG4gIHJldHVybiBlbDtcbn07XG5cblxuLypcblx0XG5cdERPTSBoZWxwZXJzXG4gKi9cblxuZG9tSGVscGVyID0gZnVuY3Rpb24oc2VsLCBjb250ZXh0LCBvbmx5Rmlyc3QpIHtcbiAgdmFyIF9lbCwgX3Jlc3VsdHMsIF9zZWwsIF9zZWxzLCByZWY7XG4gIGlmIChjb250ZXh0ID09IG51bGwpIHtcbiAgICBjb250ZXh0ID0gZG9jdW1lbnQ7XG4gIH1cbiAgaWYgKG9ubHlGaXJzdCA9PSBudWxsKSB7XG4gICAgb25seUZpcnN0ID0gZmFsc2U7XG4gIH1cbiAgX3NlbHMgPSBzZWwuc3BsaXQoXCIgXCIpO1xuICBpZiAoX3NlbHMuZXZlcnkoKGZ1bmN0aW9uKHNlbCkge1xuICAgIHZhciByZWY7XG4gICAgcmV0dXJuIChyZWYgPSBzZWxbMF0pID09PSBcIi5cIiB8fCByZWYgPT09IFwiI1wiO1xuICB9KSkpIHtcbiAgICB3aGlsZSAoX3NlbHMubGVuZ3RoKSB7XG4gICAgICBpZiAoKF9zZWwgPSAocmVmID0gX3NlbHMuc3BsaWNlKDAsIDEpKSAhPSBudWxsID8gcmVmWzBdIDogdm9pZCAwKSkge1xuICAgICAgICBzd2l0Y2ggKF9zZWxbMF0pIHtcbiAgICAgICAgICBjYXNlIFwiLlwiOlxuICAgICAgICAgICAgY29udGV4dCA9IGRvbUhlbHBlci5ieUNsYXNzKF9zZWwsIGNvbnRleHQsIG9ubHlGaXJzdCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiI1wiOlxuICAgICAgICAgICAgY29udGV4dCA9IGRvbUhlbHBlci5ieUlkKF9zZWwsIGNvbnRleHQsIG9ubHlGaXJzdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHQ7XG4gIH1cbiAgX3Jlc3VsdHMgPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsKTtcbiAgaWYgKG9ubHlGaXJzdCkge1xuICAgIHJldHVybiBhZGREKF9yZXN1bHRzICE9IG51bGwgPyBfcmVzdWx0c1swXSA6IHZvaWQgMCk7XG4gIH1cbiAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICB2YXIgaiwgbGVuLCByZXN1bHRzO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGogPSAwLCBsZW4gPSBfcmVzdWx0cy5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgX2VsID0gX3Jlc3VsdHNbal07XG4gICAgICByZXN1bHRzLnB1c2goYWRkRChfZWwpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0pKCk7XG59O1xuXG5kb21IZWxwZXIuZG9tZWwgPSBmdW5jdGlvbihlbCkge1xuICBpZiAoZWwgIT0gbnVsbCkge1xuICAgIHJldHVybiBhZGREKGVsKTtcbiAgfVxufTtcblxuZG9tSGVscGVyLmNyZWF0ZSA9IGZ1bmN0aW9uKHRhZywgYXR0cmlidXRlcykge1xuICB2YXIgX2VsLCBfaywgX3Y7XG4gIGlmICh0YWcgPT0gbnVsbCkge1xuICAgIHRhZyA9IFwiRElWXCI7XG4gIH1cbiAgaWYgKGF0dHJpYnV0ZXMgPT0gbnVsbCkge1xuICAgIGF0dHJpYnV0ZXMgPSB7fTtcbiAgfVxuICBfZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gIGZvciAoX2sgaW4gYXR0cmlidXRlcykge1xuICAgIF92ID0gYXR0cmlidXRlc1tfa107XG4gICAgX2VsLnNldEF0dHJpYnV0ZShfaywgX3YpO1xuICB9XG4gIHJldHVybiBhZGREKF9lbCk7XG59O1xuXG5kb21IZWxwZXIuZGF0YSA9IGZ1bmN0aW9uKGVsLCBrZXksIHZhbCkge1xuICBpZiAoKGVsICE9IG51bGwgPyBlbC5kYXRhc2V0IDogdm9pZCAwKSA9PSBudWxsKSB7XG4gICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBhZGREKGVsKTtcbiAgfVxuICBpZiAoKGtleSAhPSBudWxsKSAmJiAodmFsICE9IG51bGwpKSB7XG4gICAgZWwuZGF0YXNldFtrZXldID0gdmFsO1xuICB9IGVsc2UgaWYgKGtleSAhPSBudWxsKSB7XG4gICAgcmV0dXJuIGVsLmRhdGFzZXRba2V5XTtcbiAgfVxuICByZXR1cm4gZWwuZGF0YXNldDtcbn07XG5cbmRvbUhlbHBlci5hdHRyID0gZnVuY3Rpb24oZWwsIGtleSwgdmFsKSB7XG4gIGlmICgoa2V5ICE9IG51bGwpICYmICh2YWwgIT0gbnVsbCkpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoa2V5LCB2YWwpO1xuICB9IGVsc2UgaWYgKGtleSAhPSBudWxsKSB7XG4gICAgZWwuZ2V0QXR0cmlidXRlKGtleSk7XG4gIH1cbiAgcmV0dXJuIGVsO1xufTtcblxuZG9tSGVscGVyLmJ5Q2xhc3MgPSBmdW5jdGlvbihfY2wsIGNvbnRleHQsIG9ubHlGaXJzdCkge1xuICB2YXIgX2VsLCBfcmVzdWx0cztcbiAgaWYgKGNvbnRleHQgPT0gbnVsbCkge1xuICAgIGNvbnRleHQgPSBkb2N1bWVudDtcbiAgfVxuICBpZiAob25seUZpcnN0ID09IG51bGwpIHtcbiAgICBvbmx5Rmlyc3QgPSBmYWxzZTtcbiAgfVxuICBpZiAoX2NsWzBdID09PSBcIi5cIikge1xuICAgIF9jbCA9IF9jbC5zbGljZSgxKTtcbiAgfVxuICBfcmVzdWx0cyA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShfY2wpO1xuICBpZiAob25seUZpcnN0KSB7XG4gICAgcmV0dXJuIGFkZEQoX3Jlc3VsdHMgIT0gbnVsbCA/IF9yZXN1bHRzWzBdIDogdm9pZCAwKTtcbiAgfVxuICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBqLCBsZW4sIHJlc3VsdHM7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoaiA9IDAsIGxlbiA9IF9yZXN1bHRzLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICBfZWwgPSBfcmVzdWx0c1tqXTtcbiAgICAgIHJlc3VsdHMucHVzaChhZGREKF9lbCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSkoKTtcbn07XG5cbmRvbUhlbHBlci5ieUlkID0gZnVuY3Rpb24oX2lkLCBjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0ID09IG51bGwpIHtcbiAgICBjb250ZXh0ID0gZG9jdW1lbnQ7XG4gIH1cbiAgaWYgKF9pZFswXSA9PT0gXCIjXCIpIHtcbiAgICBfaWQgPSBfaWQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGFkZEQoY29udGV4dC5nZXRFbGVtZW50QnlJZChfaWQpKTtcbn07XG5cbmRvbUhlbHBlci5sYXN0ID0gZnVuY3Rpb24oZWwsIHNlbGVjdG9yKSB7XG4gIHZhciBpZHg7XG4gIGlkeCA9IGVsLmNoaWxkTm9kZXMubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgaWYgKGRvbUhlbHBlci5pcyhlbC5jaGlsZE5vZGVzW2lkeF0sIHNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIGFkZEQoZWwuY2hpbGROb2Rlc1tpZHhdKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZHgtLTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmRvbUhlbHBlci5wYXJlbnQgPSBmdW5jdGlvbihlbCwgc2VsZWN0b3IpIHtcbiAgdmFyIF9jdXJzb3I7XG4gIGlmIChzZWxlY3RvciA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGFkZEQoZWwucGFyZW50Tm9kZSk7XG4gIH1cbiAgX2N1cnNvciA9IGVsO1xuICB3aGlsZSAoX2N1cnNvci5wYXJlbnROb2RlICE9IG51bGwpIHtcbiAgICBfY3Vyc29yID0gX2N1cnNvci5wYXJlbnROb2RlO1xuICAgIGlmIChkb21IZWxwZXIuaXMoX2N1cnNvciwgc2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gYWRkRChfY3Vyc29yKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5kb21IZWxwZXIuZmlyc3QgPSBmdW5jdGlvbihlbCwgc2VsZWN0b3IpIHtcbiAgdmFyIGNoaWxkLCBpZHgsIGosIGxlbiwgcmVmO1xuICBpZHggPSBlbC5jaGlsZE5vZGVzLmxlbmd0aCAtIDE7XG4gIHJlZiA9IGVsLmNoaWxkTm9kZXM7XG4gIGZvciAoaiA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgIGNoaWxkID0gcmVmW2pdO1xuICAgIGlmIChkb21IZWxwZXIuaXMoY2hpbGQsIHNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIGFkZEQoY2hpbGQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmRvbUhlbHBlci5jaGlsZHJlbiA9IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xuICB2YXIgY2hpbGQsIGNoaWxkcmVuLCBpZHgsIGosIGxlbiwgcmVmO1xuICBjaGlsZHJlbiA9IFtdO1xuICBpZHggPSBlbC5jaGlsZE5vZGVzLmxlbmd0aCAtIDE7XG4gIHJlZiA9IGVsLmNoaWxkTm9kZXM7XG4gIGZvciAoaiA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgIGNoaWxkID0gcmVmW2pdO1xuICAgIGlmIChkb21IZWxwZXIuaXMoY2hpbGQsIHNlbGVjdG9yKSkge1xuICAgICAgY2hpbGRyZW4ucHVzaChhZGREKGNoaWxkKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjaGlsZHJlbjtcbn07XG5cbmRvbUhlbHBlci5jb3VudENoaWxkcmVuID0gZnVuY3Rpb24oZWwsIHNlbGVjdG9yKSB7XG4gIHJldHVybiBkb21IZWxwZXIuY2hpbGRyZW4oZWwsIHNlbGVjdG9yKS5sZW5ndGg7XG59O1xuXG5kb21IZWxwZXIuaXMgPSBmdW5jdGlvbihlbCwgc2VsZWN0b3IpIHtcbiAgaWYgKHNlbGVjdG9yWzBdID09PSBcIi5cIikge1xuICAgIHJldHVybiBkb21IZWxwZXIuaGFzQ2xhc3MoZWwsIHNlbGVjdG9yLnNsaWNlKDEpKTtcbiAgfVxuICBpZiAoc2VsZWN0b3JbMF0gPT09IFwiI1wiKSB7XG4gICAgcmV0dXJuIGRvbUhlbHBlci5oYXNJZChlbCwgc2VsZWN0b3Iuc2xpY2UoMSkpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmRvbUhlbHBlci5oYXNDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc25hbWUpIHtcbiAgdmFyIHJlZjtcbiAgaWYgKGVsLmNsYXNzTGlzdCAhPSBudWxsKSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc25hbWUpO1xuICB9XG4gIGlmICgoZWwgIT0gbnVsbCA/IGVsLmNsYXNzTmFtZSA6IHZvaWQgMCkgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoaW5kZXhPZi5jYWxsKChlbCAhPSBudWxsID8gKHJlZiA9IGVsLmNsYXNzTmFtZSkgIT0gbnVsbCA/IHJlZi5zcGxpdChcIiBcIikgOiB2b2lkIDAgOiB2b2lkIDApIHx8IFtdLCBjbGFzc25hbWUpID49IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5kb21IZWxwZXIuaGlkZSA9IGZ1bmN0aW9uKGVsKSB7XG4gIGlmICgoZWwgIT0gbnVsbCA/IGVsLnN0eWxlIDogdm9pZCAwKSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICByZXR1cm4gZWw7XG59O1xuXG5kb21IZWxwZXIuc2hvdyA9IGZ1bmN0aW9uKGVsLCBkaXNwbGF5KSB7XG4gIGlmIChkaXNwbGF5ID09IG51bGwpIHtcbiAgICBkaXNwbGF5ID0gXCJibG9ja1wiO1xuICB9XG4gIGlmICgoZWwgIT0gbnVsbCA/IGVsLnN0eWxlIDogdm9pZCAwKSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZWwuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG4gIHJldHVybiBlbDtcbn07XG5cbmRvbUhlbHBlci5hZGRDbGFzcyA9IGZ1bmN0aW9uKGVsZW1lbnQsIGNsYXNzbmFtZSkge1xuICB2YXIgX2NsYXNzbmFtZXM7XG4gIGlmICh0aGlzLmhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzbmFtZSkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgX2NsYXNzbmFtZXMgPSBlbGVtZW50LmNsYXNzTmFtZTtcbiAgaWYgKCFfY2xhc3NuYW1lcy5sZW5ndGgpIHtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzbmFtZTtcbiAgICByZXR1cm47XG4gIH1cbiAgZWxlbWVudC5jbGFzc05hbWUgKz0gXCIgXCIgKyBjbGFzc25hbWU7XG4gIHJldHVybiBhZGREKGVsZW1lbnQpO1xufTtcblxuZG9tSGVscGVyLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWxlbWVudCwgY2xhc3NuYW1lKSB7XG4gIHZhciBfY2xhc3NuYW1lcywgcnhwO1xuICBpZiAoIXRoaXMuaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NuYW1lKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBfY2xhc3NuYW1lcyA9IGVsZW1lbnQuY2xhc3NOYW1lO1xuICByeHAgPSBuZXcgUmVnRXhwKFwiXFxcXHM/XFxcXGJcIiArIGNsYXNzbmFtZSArIFwiXFxcXGJcIiwgXCJnXCIpO1xuICBfY2xhc3NuYW1lcyA9IF9jbGFzc25hbWVzLnJlcGxhY2UocnhwLCBcIlwiKTtcbiAgZWxlbWVudC5jbGFzc05hbWUgPSBfY2xhc3NuYW1lcztcbiAgcmV0dXJuIGFkZEQoZWxlbWVudCk7XG59O1xuXG5kb21IZWxwZXIuaGFzSWQgPSBmdW5jdGlvbihlbCwgaWQpIHtcbiAgaWYgKChlbCAhPSBudWxsID8gZWwuaWQgOiB2b2lkIDApID09PSBpZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmRvbUhlbHBlci5hcHBlbmQgPSBmdW5jdGlvbihlbCwgaHRtbCkge1xuICB2YXIgX2hkaXYsIGNoaWxkLCBqLCBrLCBsZW4sIGxlbjEsIHJlZjtcbiAgaWYgKGlzU3RyaW5nKGh0bWwpKSB7XG4gICAgX2hkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBfaGRpdi5pbm5lckhUTUwgPSBodG1sO1xuICAgIHJlZiA9IF9oZGl2LmNoaWxkTm9kZXM7XG4gICAgZm9yIChqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICBjaGlsZCA9IHJlZltqXTtcbiAgICAgIGlmICgoY2hpbGQgIT0gbnVsbCA/IGNoaWxkLnRhZ05hbWUgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChodG1sIGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24pIHtcbiAgICBmb3IgKGsgPSAwLCBsZW4xID0gaHRtbC5sZW5ndGg7IGsgPCBsZW4xOyBrKyspIHtcbiAgICAgIGNoaWxkID0gaHRtbFtrXTtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaHRtbCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICBlbC5hcHBlbmRDaGlsZChodG1sKTtcbiAgfVxuICByZXR1cm4gYWRkRChlbCk7XG59O1xuXG5kb21IZWxwZXIucHJlcGVuZCA9IGZ1bmN0aW9uKGVsLCBodG1sKSB7XG4gIHZhciBfZmlyc3RDaCwgX2hkaXYsIF9sYXRlc3RGaXJzdCwgY2hpbGQsIGosIHJlZiwgcmVmMTtcbiAgX2ZpcnN0Q2ggPSAocmVmID0gZWwuY2hpbGROb2RlcykgIT0gbnVsbCA/IHJlZlswXSA6IHZvaWQgMDtcbiAgaWYgKF9maXJzdENoID09IG51bGwpIHtcbiAgICBkb21IZWxwZXIuYXBwZW5kKGVsLCBodG1sKTtcbiAgICByZXR1cm47XG4gIH1cbiAgX2hkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgX2hkaXYuaW5uZXJIVE1MID0gaHRtbDtcbiAgX2xhdGVzdEZpcnN0ID0gX2ZpcnN0Q2g7XG4gIHJlZjEgPSBfaGRpdi5jaGlsZE5vZGVzO1xuICBmb3IgKGogPSByZWYxLmxlbmd0aCAtIDE7IGogPj0gMDsgaiArPSAtMSkge1xuICAgIGNoaWxkID0gcmVmMVtqXTtcbiAgICBpZiAoISgoY2hpbGQgIT0gbnVsbCA/IGNoaWxkLnRhZ05hbWUgOiB2b2lkIDApICE9IG51bGwpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgZWwuaW5zZXJ0QmVmb3JlKGNoaWxkLCBfbGF0ZXN0Rmlyc3QpO1xuICAgIF9sYXRlc3RGaXJzdCA9IGNoaWxkO1xuICB9XG4gIHJldHVybiBlbDtcbn07XG5cbmRvbUhlbHBlci5yZW1vdmUgPSBmdW5jdGlvbihlbCkge1xuICB2YXIgaTtcbiAgaWYgKGVsIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgIGVsLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWwpO1xuICB9XG4gIGlmIChlbCBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uKSB7XG4gICAgaSA9IGVsLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUgKGkgPj0gMCkge1xuICAgICAgaWYgKGVsW2ldICYmIGVsW2ldLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgZWxbaV0ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbFtpXSk7XG4gICAgICB9XG4gICAgICBpLS07XG4gICAgfVxuICB9XG4gIHJldHVybiBlbDtcbn07XG5cbmRvbUhlbHBlci5yZXBsYWNlV2l0aCA9IGZ1bmN0aW9uKGVsLCBlbFRvUmVwbCkge1xuICBkb21IZWxwZXIucGFyZW50KGVsKS5yZXBsYWNlQ2hpbGQoZWxUb1JlcGwsIGVsKTtcbiAgcmV0dXJuIGVsO1xufTtcblxuZG9tSGVscGVyLmNsb25lID0gZnVuY3Rpb24oZWwpIHtcbiAgcmV0dXJuIGFkZEQoZWwuY2xvbmVOb2RlKHRydWUpKTtcbn07XG5cbmRvbUhlbHBlci5vbiA9IGZ1bmN0aW9uKGVsLCB0eXBlLCBoYW5kbGVyKSB7XG4gIGlmIChlbCA9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChlbC5hZGRFdmVudExpc3RlbmVyICE9IG51bGwpIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgfSBlbHNlIGlmIChlbC5hdHRhY2hFdmVudCAhPSBudWxsKSB7XG4gICAgZWwuYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGhhbmRsZXIpO1xuICB9IGVsc2Uge1xuICAgIGVsWydvbicgKyB0eXBlXSA9IGhhbmRsZXI7XG4gIH1cbiAgcmV0dXJuIGVsO1xufTtcblxuZG9tSGVscGVyLm9mZiA9IGZ1bmN0aW9uKGVsLCB0eXBlLCBoYW5kbGVyKSB7XG4gIGlmIChlbCA9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChlbC5yZW1vdmVFdmVudExpc3RlbmVyICE9IG51bGwpIHtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcbiAgfSBlbHNlIGlmIChlbC5kZXRhY2hFdmVudCAhPSBudWxsKSB7XG4gICAgZWwuZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGhhbmRsZXIpO1xuICB9IGVsc2Uge1xuICAgIGRlbGV0ZSBlbFsnb24nICsgdHlwZV07XG4gIH1cbiAgcmV0dXJuIGVsO1xufTtcblxuZG9tSGVscGVyLmVtaXQgPSBmdW5jdGlvbihlbCwgdHlwZSkge1xuICB2YXIgZXZ0O1xuICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgZXZ0LmluaXRFdmVudCh0eXBlLCB0cnVlLCBmYWxzZSk7XG4gIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgcmV0dXJuIGV2dDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tSGVscGVyO1xuXG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTsiLCJjbGFzcyBCYXNlIGV4dGVuZHMgcmVxdWlyZSgnZXZlbnRzJylcblx0X2Vycm9yOiAoIGNiLCBlcnIgKT0+XG5cdFx0aWYgbm90ICggZXJyIGluc3RhbmNlb2YgRXJyb3IgKVxuXHRcdFx0X2VyciA9IG5ldyBFcnJvciggZXJyIClcblx0XHRcdF9lcnIubmFtZSA9IGVyclxuXHRcdFx0dHJ5XG5cdFx0XHRcdF9lcnIubWVzc2FnZSA9IEBFUlJPUlNbIGVyciBdIG9yIFwiIC0gXCJcblx0XHRlbHNlXG5cdFx0XHRfZXJyID0gZXJyXG5cblx0XHRpZiBub3QgY2I/XG5cdFx0XHR0aHJvdyBfZXJyXG5cdFx0ZWxzZVxuXHRcdFx0Y2IoIF9lcnIgKVxuXHRcdHJldHVyblxuXHRcdFxubW9kdWxlLmV4cG9ydHMgPSBCYXNlXG4iLCJkb20gPSByZXF1aXJlKCBcImRvbWVsXCIgKVxuXG51dGlscyA9IHJlcXVpcmUoIFwiLi91dGlsc1wiIClcbkJhc2UgPSByZXF1aXJlKCBcIi4vYmFzZVwiIClcbkZpbGUgPSByZXF1aXJlKCBcIi4vZmlsZVwiIClcbkZpbGVWaWV3ID0gcmVxdWlyZSggXCIuL2ZpbGV2aWV3XCIgKVxuXG5fZGVmYXVsdHMgPVxuXHRob3N0OiBudWxsXG5cdGRvbWFpbjogbnVsbFxuXHRhY2Nlc3NrZXk6IG51bGxcblx0a2V5cHJlZml4OiBcImNsaWVudHVwbG9hZFwiXG5cdGF1dG9zdGFydDogdHJ1ZVxuXHRyZXF1ZXN0U2lnbkZuOiBudWxsXG5cdHJlc3VsdFRlbXBsYXRlRm46IG51bGxcblx0bWF4c2l6ZTogMFxuXHRtYXhjb3VudDogMFxuXHR3aWR0aDogbnVsbFxuXHRoZWlnaHQ6IG51bGxcblx0YWNjZXB0OiBudWxsXG5cdHR0bDogMFxuXHRhY2w6IFwicHVibGljLXJlYWRcIlxuXHRwcm9wZXJ0aWVzOiBudWxsXG5cdHRhZ3M6IG51bGxcblx0XCJjb250ZW50LWRpc3Bvc2l0aW9uXCI6IG51bGxcblx0Y3NzZHJvcHBhYmxlOiBcImRyb3BhYmxlXCJcblx0Y3NzaG92ZXI6IFwiaG92ZXJcIlxuXHRjc3Nwcm9jZXNzOiBcInByb2Nlc3NcIlxuXHRjc3NkaXNhYmxlZDogXCJkaXNhYmxlZFwiXG5cbl9kZWZhdWt0S2V5cyA9IGZvciBfaywgX3Ygb2YgX2RlZmF1bHRzXG5cdF9rXG5cbmNsYXNzIENsaWVudCBleHRlbmRzIEJhc2Vcblx0dmVyc2lvbjogXCJAQHZlcnNpb25cIlxuXG5cdF9yZ3hIb3N0OiAvaHR0cHM/OlxcL1xcL1teXFwvJFxcc10rL2lcblxuXHRjb25zdHJ1Y3RvcjogKCBkcmFnLCBlbHJlc3VsdHMsIG9wdGlvbnMgPSB7fSApLT5cblx0XHRzdXBlclxuXHRcdFxuXHRcdEBlbmFibGVkID0gdHJ1ZVxuXHRcdEB1c2VGaWxlQVBJID0gZmFsc2Vcblx0XHRcblx0XHRAb24oIFwiZmlsZS5uZXdcIiwgQGZpbGVOZXcgKVxuXG5cdFx0QG9uKCBcImZpbGUuZG9uZVwiLCBAZmlsZURvbmUgKVxuXHRcdEBvbiggXCJmaWxlLmVycm9yXCIsIEBmaWxlRXJyb3IgKVxuXHRcdEBvbiggXCJmaWxlLmludmFsaWRcIiwgQGZpbGVFcnJvciApXG5cdFx0QG9uKCBcImZpbGUuYWJvcnRlZFwiLCBAZmlsZUVycm9yIClcblx0XHRAb24oIFwiZmluaXNoXCIsIEBvbkZpbmlzaCApXG5cdFx0QHdpdGhpbl9lbnRlciA9IGZhbHNlXG5cblxuXHRcdEBlbCA9IEBfdmFsaWRhdGVFbCggZHJhZywgXCJkcmFnXCIgKVxuXHRcdEBzZWwgPSBAZWwuZC5maW5kKCBcImlucHV0I3sgb3B0aW9ucy5pbnB1dGNsYXNzIG9yIFwiXCIgfVt0eXBlPSdmaWxlJ11cIiwgdHJ1ZSApXG5cdFx0aWYgbm90IEBzZWw/XG5cdFx0XHRAX2Vycm9yKCBudWxsLCBcIm1pc3Npbmctc2VsZWN0LWVsXCIgKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRAZm9ybW5hbWUgPSBAc2VsLmdldEF0dHJpYnV0ZSggXCJuYW1lXCIgKVxuXG5cdFx0aWYgZWxyZXN1bHRzP1xuXHRcdFx0QHJlcyA9IEBfdmFsaWRhdGVFbCggZWxyZXN1bHRzLCBcInJlc3VsdFwiIClcblxuXG5cdFx0X2h0bWxEYXRhID0gQGVsLmQuZGF0YSgpXG5cdFx0QG9wdGlvbnMgPSB1dGlscy5hc3NpZ24oIHt9LCBfZGVmYXVsdHMsIF9odG1sRGF0YSwgb3B0aW9ucyBvciB7fSApXG5cblx0XHRpZiBub3QgQG9wdGlvbnMuaG9zdD8ubGVuZ3RoXG5cdFx0XHRAX2Vycm9yKCBudWxsLCBcIm1pc3NpbmctaG9zdFwiIClcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgbm90IEBfcmd4SG9zdC50ZXN0KCBAb3B0aW9ucy5ob3N0IClcblx0XHRcdEBfZXJyb3IoIG51bGwsIFwiaW52YWxpZC1ob3N0XCIgKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRpZiBub3QgQG9wdGlvbnMuZG9tYWluPy5sZW5ndGhcblx0XHRcdEBfZXJyb3IoIG51bGwsIFwibWlzc2luZy1kb21haW5cIiApXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIG5vdCBAb3B0aW9ucy5hY2Nlc3NrZXk/Lmxlbmd0aFxuXHRcdFx0QF9lcnJvciggbnVsbCwgXCJtaXNzaW5nLWFjY2Vzc2tleVwiIClcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgQG9wdGlvbnMubWF4Y291bnQ/XG5cdFx0XHRfbXhjbnQgPSBwYXJzZUludCggQG9wdGlvbnMubWF4Y291bnQsIDEwIClcblx0XHRcdGlmIGlzTmFOKCBfbXhjbnQgKVxuXHRcdFx0XHRAb3B0aW9ucy5tYXhjb3VudCA9IF9kZWZhdWx0cy5tYXhjb3VudFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAb3B0aW9ucy5tYXhjb3VudCA9IF9teGNudFxuXG5cdFx0aWYgQG9wdGlvbnMubWF4Y291bnQgaXNudCAxXG5cdFx0XHRAc2VsLnNldEF0dHJpYnV0ZSggXCJtdWx0aXBsZVwiLCBcIm11bHRpcGxlXCIgKVxuXG5cdFx0aWYgQG9wdGlvbnMubWF4c2l6ZT9cblx0XHRcdF9teHN6ID0gcGFyc2VJbnQoIEBvcHRpb25zLm1heHNpemUsIDEwIClcblx0XHRcdGlmIGlzTmFOKCBfbXhzeiApXG5cdFx0XHRcdEBvcHRpb25zLm1heHNpemUgPSBfZGVmYXVsdHMubWF4c2l6ZVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAb3B0aW9ucy5tYXhzaXplID0gX214c3pcblxuXHRcdGlmIEBvcHRpb25zLnJlcXVlc3RTaWduRm4/IGFuZCB0eXBlb2YgQG9wdGlvbnMucmVxdWVzdFNpZ25GbiBpc250IFwiZnVuY3Rpb25cIlxuXHRcdFx0QF9lcnJvciggbnVsbCwgXCJpbnZhbGlkLXJlcXVlc3RTaWduZm5cIiApXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIEBvcHRpb25zLnR0bD8gYW5kIG5vdCB1dGlscy5pc0ludCggQG9wdGlvbnMudHRsIClcblx0XHRcdEBfZXJyb3IoIG51bGwsIFwiaW52YWxpZC10dGxcIiApXG5cdFx0XHRyZXR1cm5cblx0XHRlbHNlIGlmIEBvcHRpb25zLnR0bD9cblx0XHRcdEBvcHRpb25zLnR0bCA9IHBhcnNlSW50KCBAb3B0aW9ucy50dGwsIDEwIClcblx0XHRcdGlmIGlzTmFOKCBAb3B0aW9ucy50dGwgKVxuXHRcdFx0XHRAX2Vycm9yKCBudWxsLCBcImludmFsaWQtdHRsXCIgKVxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdGlmIEBvcHRpb25zLnRhZ3M/IGFuZCB1dGlscy5pc0FycmF5KCBAb3B0aW9ucy50YWdzIClcblx0XHRcdGZvciBfdGFnIGluIEBvcHRpb25zLnRhZ3Mgd2hlbiBub3QgdXRpbHMuaXNTdHJpbmcoIF90YWcgKVxuXHRcdFx0XHRAX2Vycm9yKCBudWxsLCBcImludmFsaWQtdGFnc1wiIClcblx0XHRcdFx0cmV0dXJuXG5cdFx0ZWxzZSBpZiBAb3B0aW9ucy50YWdzP1xuXHRcdFx0QF9lcnJvciggbnVsbCwgXCJpbnZhbGlkLXRhZ3NcIiApXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIEBvcHRpb25zLnByb3BlcnRpZXM/IGFuZCBub3QgdXRpbHMuaXNPYmplY3QoIEBvcHRpb25zLnByb3BlcnRpZXMgKVxuXHRcdFx0QF9lcnJvciggbnVsbCwgXCJpbnZhbGlkLXByb3BlcnRpZXNcIiApXG5cdFx0XHRyZXR1cm5cblxuXHRcdGlmIEBvcHRpb25zWyBcImNvbnRlbnQtZGlzcG9zaXRpb25cIiBdPyBhbmQgbm90IHV0aWxzLmlzU3RyaW5nKCBAb3B0aW9uc1sgXCJjb250ZW50LWRpc3Bvc2l0aW9uXCIgXSApXG5cdFx0XHRAX2Vycm9yKCBudWxsLCBcImludmFsaWQtY29udGVudC1kaXNwb3NpdGlvblwiIClcblx0XHRcdHJldHVyblxuXG5cdFx0aWYgQG9wdGlvbnMuYWNsPyBhbmQgbm90IHV0aWxzLmlzU3RyaW5nKCBAb3B0aW9ucy5hY2wgKSBhbmQgQG9wdGlvbnMuYWNsIG5vdCBpbiBbIFwicHVibGljLXJlYWRcIiwgXCJhdXRoZW50aWNhdGVkLXJlYWRcIiBdXG5cdFx0XHRAX2Vycm9yKCBudWxsLCBcImludmFsaWQtYWNsXCIgKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRfaW5wQWNjZXB0ID0gQHNlbC5nZXRBdHRyaWJ1dGUoIFwiYWNjZXB0XCIgKVxuXHRcdGlmIEBvcHRpb25zLmFjY2VwdD8gb3IgX2lucEFjY2VwdD9cblx0XHRcdF9odG1sID0gX2lucEFjY2VwdD8uc3BsaXQoIFwiLFwiICkgb3IgW11cblx0XHRcdF9vcHQgPSBAb3B0aW9ucy5hY2NlcHQ/LnNwbGl0KCBcIixcIiApIG9yIFtdXG5cdFx0XHRpZiBfaHRtbD8ubGVuZ3RoXG5cdFx0XHRcdEBvcHRpb25zLmFjY2VwdCA9IF9odG1sXG5cdFx0XHRlbHNlIGlmIF9vcHQ/Lmxlbmd0aFxuXHRcdFx0XHRAc2VsLnNldEF0dHJpYnV0ZSggXCJhY2NlcHRcIiwgQG9wdGlvbnMuYWNjZXB0IClcblx0XHRcdEBvcHRpb25zLmFjY2VwdFJ1bGVzID0gQGdlbmVyYXRlQWNjZXB0UnVsZXMoIEBvcHRpb25zLmFjY2VwdCApXG5cblx0XHRAaW5pdGlhbGl6ZSgpXG5cdFx0QGlkeF9zdGFydGVkID0gMFxuXHRcdEBpZHhfZmluaXNoZWQgPSAwXG5cblx0XHRAZWwuZC5kYXRhKCBcIm1lZGlhYXBpY2xpZW50XCIsIEAgKVxuXHRcdHJldHVyblxuXG5cdGdlbmVyYXRlQWNjZXB0UnVsZXM6ICggYWNjZXB0ICktPlxuXHRcdF9ydWxlcyA9IFtdXG5cblx0XHRmb3IgX3J1bGUgaW4gYWNjZXB0XG5cdFx0XHRpZiBfcnVsZS5pbmRleE9mKCBcIi9cIiApID49IDBcblx0XHRcdFx0X3J1bGVzLnB1c2ggKCAtPlxuXHRcdFx0XHRcdF9yZWdleCA9IG5ldyBSZWdFeHAoIFwiI3tfcnVsZS5yZXBsYWNlKCBcIipcIiwgXCJcXFxcdytcIiApfSRcIiwgXCJpXCIgKVxuXHRcdFx0XHRcdHJldHVybiAoIGZpbGUgKS0+XG5cdFx0XHRcdFx0XHRyZXR1cm4gX3JlZ2V4LnRlc3QoIGZpbGUudHlwZSApXG5cdFx0XHRcdFx0KSgpXG5cdFx0XHRlbHNlIGlmIF9ydWxlLmluZGV4T2YoIFwiLlwiICkgPj0gMFxuXHRcdFx0XHRfcnVsZXMucHVzaCAoIC0+XG5cdFx0XHRcdFx0X3JlZ2V4ID0gbmV3IFJlZ0V4cCggXCIje19ydWxlLnJlcGxhY2UoIFwiLlwiLCBcIlxcXFwuXCIgKX0kXCIsIFwiaVwiIClcblx0XHRcdFx0XHRyZXR1cm4gKCBmaWxlICktPlxuXHRcdFx0XHRcdFx0cmV0dXJuIF9yZWdleC50ZXN0KCBmaWxlLm5hbWUgKVxuXHRcdFx0XHRcdCkoKVxuXHRcdFx0ZWxzZSBpZiBfcnVsZSBpcyBcIipcIlxuXHRcdFx0XHRfcnVsZXMucHVzaCAoKCBmaWxlICktPiB0cnVlIClcblx0XHRyZXR1cm4gX3J1bGVzXG5cblx0aW5pdGlhbGl6ZTogPT5cblx0XHRpZiB3aW5kb3cuRmlsZSBhbmQgd2luZG93LkZpbGVMaXN0IGFuZCB3aW5kb3cuRmlsZVJlYWRlclxuXHRcdFx0QHNlbC5kLm9uKCBcImNoYW5nZVwiLCBAb25TZWxlY3QgKVxuXHRcdFx0QHVzZUZpbGVBUEkgPSB0cnVlXG5cdFx0XHRAaW5pdEZpbGVBUEkoKVxuXHRcdGVsc2Vcblx0XHRcdCMgVE9ETyBpbXBsZW1lbnQgSUU5IEZhbGxiYWNrXHRcdFxuXHRcdHJldHVyblxuXG5cdGluaXRGaWxlQVBJOiA9PlxuXHRcdHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cdFx0XG5cdFx0aWYgeGhyPy51cGxvYWRcblx0XHRcdEBlbC5vbmRyYWdvdmVyID0gQG9uSG92ZXJcblx0XHRcdEBlbC5vbmRyYWdsZWF2ZSA9IEBvbkxlYXZlXG5cdFx0XHRAZWwub25kcm9wID0gQG9uU2VsZWN0XG5cdFx0XHRcblx0XHRcdEBlbC5kLmFkZENsYXNzKCBAb3B0aW9ucy5jc3Nkcm9wcGFibGUgKVxuXHRcdGVsc2Vcblx0XHRyZXR1cm5cblxuXHRvblNlbGVjdDogKCBldm50ICk9PlxuXHRcdGV2bnQucHJldmVudERlZmF1bHQoKVxuXHRcdGlmIG5vdCBAZW5hYmxlZFxuXHRcdFx0cmV0dXJuXG5cdFx0aWYgQG9wdGlvbnMubWF4Y291bnQgPD0gMCBvciBAaWR4X3N0YXJ0ZWQgPCBAb3B0aW9ucy5tYXhjb3VudFxuXHRcdFx0QGVsLmQucmVtb3ZlQ2xhc3MoIEBvcHRpb25zLmNzc2hvdmVyIClcblx0XHRcdEBlbC5kLmFkZENsYXNzKCBAb3B0aW9ucy5jc3Nwcm9jZXNzIClcblxuXHRcdFx0ZmlsZXMgPSBldm50LnRhcmdldD8uZmlsZXMgb3IgZXZudC5vcmlnaW5hbEV2ZW50Py50YXJnZXQ/LmZpbGVzIG9yIGV2bnQuZGF0YVRyYW5zZmVyPy5maWxlcyBvciBldm50Lm9yaWdpbmFsRXZlbnQ/LmRhdGFUcmFuc2Zlcj8uZmlsZXNcblx0XHRcdEB1cGxvYWQoIGZpbGVzIClcblx0XHRlbHNlXG5cdFx0XHRAZWwuZC5yZW1vdmVDbGFzcyggQG9wdGlvbnMuY3NzaG92ZXIgKVxuXHRcdFx0QGRpc2FibGUoKVxuXHRcdHJldHVyblxuXG5cdG9uSG92ZXI6ICggZXZudCApPT5cblx0XHRldm50LnByZXZlbnREZWZhdWx0KClcblx0XHRpZiBub3QgQGVuYWJsZWRcblx0XHRcdHJldHVyblxuXHRcdEB3aXRoaW5fZW50ZXIgPSB0cnVlXG5cdFx0c2V0VGltZW91dCggKCA9PiBAd2l0aGluX2VudGVyID0gZmFsc2UgKSwgMClcblx0XHRAZWwuZC5hZGRDbGFzcyggQG9wdGlvbnMuY3NzaG92ZXIgKVxuXHRcdHJldHVyblxuXG5cdG9uT3ZlcjogKCBldm50ICk9PlxuXHRcdGV2bnQucHJldmVudERlZmF1bHQoKVxuXHRcdGlmIG5vdCBAZW5hYmxlZFxuXHRcdFx0cmV0dXJuXG5cdFx0cmV0dXJuXG5cblx0b25MZWF2ZTogKCBldm50ICk9PlxuXHRcdGlmIG5vdCBAZW5hYmxlZFxuXHRcdFx0cmV0dXJuXG5cdFx0aWYgbm90IEB3aXRoaW5fZW50ZXJcblx0XHRcdEBlbC5kLnJlbW92ZUNsYXNzKCBAb3B0aW9ucy5jc3Nob3ZlciApXG5cdFx0cmV0dXJuXG5cblx0dXBsb2FkOiAoIGZpbGVzICk9PlxuXHRcdGlmIEB1c2VGaWxlQVBJXG5cdFx0XHRmb3IgZmlsZSwgaWR4IGluIGZpbGVzIHdoZW4gQGVuYWJsZWRcblx0XHRcdFx0aWYgQG9wdGlvbnMubWF4Y291bnQgPD0gMCBvciBAaWR4X3N0YXJ0ZWQgPCBAb3B0aW9ucy5tYXhjb3VudFxuXHRcdFx0XHRcdEBpZHhfc3RhcnRlZCsrXG5cdFx0XHRcdFx0bmV3IEZpbGUoIGZpbGUsIEBpZHhfc3RhcnRlZCwgQCwgQG9wdGlvbnMgKVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0QGRpc2FibGUoKVxuXHRcdHJldHVyblxuXG5cdGFib3J0QWxsOiA9PlxuXHRcdEBlbWl0IFwiYWJvcnRBbGxcIlxuXHRcdHJldHVyblxuXG5cdGRpc2FibGU6ID0+XG5cdFx0QHNlbC5zZXRBdHRyaWJ1dGUoIFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiIClcblx0XHRAZWwuZC5hZGRDbGFzcyggQG9wdGlvbnMuY3NzZGlzYWJsZWQgKVxuXHRcdEBlbmFibGVkID0gZmFsc2Vcblx0XHRyZXR1cm5cblxuXHRlbmFibGU6ID0+XG5cdFx0QHNlbC5yZW1vdmVBdHRyaWJ1dGUoIFwiZGlzYWJsZWRcIiApXG5cdFx0QGVsLmQucmVtb3ZlQ2xhc3MoIEBvcHRpb25zLmNzc2Rpc2FibGVkIClcblx0XHRAZW5hYmxlZCA9IHRydWVcblx0XHRyZXR1cm5cblxuXHRmaWxlRG9uZTogKCBmaWxlICk9PlxuXHRcdEBpZHhfZmluaXNoZWQrK1xuXHRcdEBfY2hlY2tGaW5pc2goKVxuXHRcdHJldHVyblxuXG5cdGZpbGVFcnJvcjogKCBmaWxlLCBlcnIgKT0+XG5cdFx0Y29uc29sZS5lcnJvciBcIkZJTEUtRVJST1JcIiwgZmlsZSwgZXJyXG5cdFx0QGlkeF9maW5pc2hlZCsrXG5cdFx0QF9jaGVja0ZpbmlzaCgpXG5cdFx0cmV0dXJuXG5cblx0ZmlsZU5ldzogKCBmaWxlICk9PlxuXHRcdGlmIEByZXM/XG5cdFx0XHRfZmlsZXZpZXcgPSBuZXcgRmlsZVZpZXcoIGZpbGUsIEAsIEBvcHRpb25zIClcblx0XHRcdEByZXMuZC5hcHBlbmQoIF9maWxldmlldy5yZW5kZXIoKSApXG5cdFx0cmV0dXJuXG5cblx0b25GaW5pc2g6ID0+XG5cdFx0QGVsLmQucmVtb3ZlQ2xhc3MoIEBvcHRpb25zLmNzc3Byb2Nlc3MgKVxuXHRcdHJldHVyblxuXG5cdF9jaGVja0ZpbmlzaDogPT5cblx0XHRpZiBAaWR4X2ZpbmlzaGVkID49IEBpZHhfc3RhcnRlZFxuXHRcdFx0QGVtaXQoIFwiZmluaXNoXCIgKVxuXHRcdFx0aWYgQG9wdGlvbnMubWF4Y291bnQgPiAwIGFuZCBAaWR4X3N0YXJ0ZWQgPj0gQG9wdGlvbnMubWF4Y291bnRcblx0XHRcdFx0QGRpc2FibGUoKVxuXHRcdHJldHVyblxuXG5cdF92YWxpZGF0ZUVsOiAoIGVsLCB0eXBlICk9PlxuXHRcdGlmIG5vdCBlbD9cblx0XHRcdEBfZXJyb3IoIG51bGwsIFwibWlzc2luZy0je3R5cGV9LWVsXCIgKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRzd2l0Y2ggdHlwZW9mIGVsXG5cdFx0XHR3aGVuIFwic3RyaW5nXCJcblx0XHRcdFx0X2VsID0gZG9tKCBlbCwgbnVsbCwgdHJ1ZSApXG5cdFx0XHR3aGVuIFwib2JqZWN0XCJcblx0XHRcdFx0aWYgZWwgaW5zdGFuY2VvZiBIVE1MRWxlbWVudFxuXHRcdFx0XHRcdF9lbCA9IGRvbS5kb21lbCggZWwgKVxuXG5cdFx0aWYgbm90IF9lbD9cblx0XHRcdEBfZXJyb3IoIG51bGwsIFwiaW52YWxpZC0je3R5cGV9LWVsXCIgKVxuXHRcdFx0cmV0dXJuXG5cblx0XHRyZXR1cm4gX2VsXG5cblx0XG5cblx0RVJST1JTOlxuXHRcdFwibWlzc2luZy1zZWxlY3QtZWxcIjogXCJNaXNzaW5nIHNlbGVjdCBlbGVtZW50LiBQbGVhc2UgZGVmaW5lIGEgdmFsaWQgZWxlbWVudCBhcyBhIFNlbGVjdG9yLCBET00tbm9kZVwiXG5cdFx0XCJpbnZhbGlkLXNlbGVjdC1lbFwiOiBcIkludmFsaWQgc2VsZWN0IGVsZW1lbnQuIFBsZWFzZSBkZWZpbmUgYSB2YWxpZCBlbGVtZW50IGFzIGEgU2VsZWN0b3IsIERPTS1ub2RlXCJcblx0XHRcIm1pc3NpbmctZHJhZy1lbFwiOiBcIk1pc3NpbmcgZHJhZyBlbGVtZW50LiBQbGVhc2UgZGVmaW5lIGEgdmFsaWQgZWxlbWVudCBhcyBhIFNlbGVjdG9yLCBET00tbm9kZVwiXG5cdFx0XCJpbnZhbGlkLWRyYWctZWxcIjogXCJJbnZhbGlkIGRyYWcgZWxlbWVudC4gUGxlYXNlIGRlZmluZSBhIHZhbGlkIGVsZW1lbnQgYXMgYSBTZWxlY3RvciwgRE9NLW5vZGVcIlxuXHRcdFwibWlzc2luZy1ob3N0XCI6IFwiTWlzc2luZyBob3N0LiBZb3UgaGF2ZSB0byBkZWZpZW4gYSBob3N0IGFzIHVybCBzdGFydGluZyB3aXRoIGBodHRwOi8vYCBvciBgaHR0cHM6Ly9gLlwiXG5cdFx0XCJpbnZhbGlkLWhvc3RcIjogXCJJbnZhbGlkIGhvc3QuIFlvdSBoYXZlIHRvIGRlZmllbiBhIGhvc3QgYXMgdXJsIHN0YXJ0aW5nIHdpdGggYGh0dHA6Ly9gIG9yIGBodHRwczovL2AuXCJcblx0XHRcIm1pc3NpbmctZG9tYWluXCI6IFwiTWlzc2luZyBkb21haW4uIFlvdSBoYXZlIHRvIGRlZmluZSBhIGRvbWFpbi5cIlxuXHRcdFwibWlzc2luZy1hY2Nlc3NrZXlcIjogXCJNaXNzaW5nIGFjY2Vzc2tleS4gWW91IGhhdmUgdG8gZGVmaW5lIGEgYWNjZXNza2V5LlwiXG5cdFx0XCJtaXNzaW5nLWtleXByZWZpeFwiOiBcIk1pc3Npbmcga2V5cHJlZml4LiBZb3UgaGF2ZSB0byBkZWZpbmUgYSBrZXlwcmVmaXguXCJcblx0XHRcImludmFsaWQtdHRsXCI6IFwiZm9yIHRoZSBvcHRpb24gYHR0bGAgb25seSBhIHBvc2l0aXYgbnVtYmVyIGlzIGFsbG93ZWRcIlxuXHRcdFwiaW52YWxpZC10YWdzXCI6IFwiZm9yIHRoZSBvcHRpb24gYHRhZ3NgIG9ubHkgYW4gYXJyYXkgb2Ygc3RyaW5ncyBpcyBhbGxvd2VkXCJcblx0XHRcImludmFsaWQtcHJvcGVydGllc1wiOiBcImZvciB0aGUgb3B0aW9uIGBwcm9wZXJ0aWVzYCBvbmx5IGFuIG9iamVjdCBpcyBhbGxvd2VkXCJcblx0XHRcImludmFsaWQtY29udGVudC1kaXNwb3NpdGlvblwiOiBcImZvciB0aGUgb3B0aW9uIGBjb250ZW50LWRpc3Bvc2l0aW9uYCBvbmx5IGFuIHN0cmluZyBsaWtlOiBgYXR0YWNobWVudDsgZmlsZW5hbWU9ZnJpZW5kbHlfZmlsZW5hbWUucGRmYCBpcyBhbGxvd2VkXCJcblx0XHRcImludmFsaWQtYWNsXCI6IFwidGhlIG9wdGlvbiBhY2wgb25seSBhY2NlcHRzIHRoZSBzdHJpbmcgYHB1YmxpYy1yZWFkYCBvciBgYXV0aGVudGljYXRlZC1yZWFkYFwiXG5cbkNsaWVudC5kZWZhdWx0cyA9ICggb3B0aW9ucyApLT5cblx0Zm9yIF9rLCBfdiBvZiBvcHRpb25zIHdoZW4gX2sgaW4gX2RlZmF1a3RLZXlzXG5cdFx0X2RlZmF1bHRzWyBfayBdID0gX3Zcblx0cmV0dXJuIF9kZWZhdWx0c1xuXHRcbm1vZHVsZS5leHBvcnRzID0gQ2xpZW50XG4iLCJ4aHIgPSByZXF1aXJlKCBcInhoclwiIClcblxuY2xhc3MgRmlsZSBleHRlbmRzIHJlcXVpcmUoXCIuL2Jhc2VcIilcblxuXHRzdGF0ZXM6IFsgXCJuZXdcIiwgXCJzdGFydFwiLCBcInNpZ25lZFwiLCBcInVwbG9hZFwiLCBcInByb2dyZXNzXCIsIFwiZG9uZVwiLCBcImludmFsaWRcIiwgXCJlcnJvclwiLCBcImFib3J0ZWRcIiBdXG5cblx0Y29uc3RydWN0b3I6ICggQGZpbGUsIEBpZHgsIEBjbGllbnQsIEBvcHRpb25zICktPlxuXHRcdHN1cGVyXG5cdFx0QHN0YXRlID0gMFxuXHRcdEB2YWxpZGF0aW9uID0gW11cblxuXHRcdEBrZXkgPSBAb3B0aW9ucy5rZXlwcmVmaXggKyBcIl9cIiArIEBnZXROYW1lKCkucmVwbGFjZSggQF9yZ3hGaWxlMktleSwgXCJcIiApICsgXCJfXCIgKyBAX25vdygpICsgXCJfXCIgKyBAaWR4XG5cblx0XHRAY2xpZW50LmVtaXQoIFwiZmlsZS5uZXdcIiwgQCApXG5cdFx0QGNsaWVudC5vbiBcImFib3J0QWxsXCIsIEBhYm9ydFxuXG5cdFx0QG9uKCBcInN0YXJ0XCIsIEBzdGFydCApXG5cdFx0QG9uKCBcInNpZ25lZFwiLCBAX3VwbG9hZCApXG5cblx0XHRpZiBub3QgQG9wdGlvbnMucmVxdWVzdFNpZ25Gbj9cblx0XHRcdEBvcHRpb25zLnJlcXVlc3RTaWduRm4gPSBAX2RlZmF1bHRSZXF1ZXN0U2lnbmF0dXJlXG5cblx0XHRpZiBub3QgQG9wdGlvbnMua2V5cHJlZml4Py5sZW5ndGhcblx0XHRcdEBvcHRpb25zLmtleXByZWZpeCA9IFwiY2xpZW50dXBsb2FkXCJcblxuXHRcdGlmIG5vdCBAb3B0aW9ucy5hdXRvc3RhcnQ/XG5cdFx0XHRAb3B0aW9ucy5hdXRvc3RhcnQgPSB0cnVlXG5cblx0XHRAX3ZhbGlkYXRlKClcblxuXHRcdGlmIEBvcHRpb25zLmF1dG9zdGFydFxuXHRcdFx0QGVtaXQgXCJzdGFydFwiXG5cdFx0cmV0dXJuXG5cblx0c3RhcnQ6ID0+XG5cdFx0aWYgQHN0YXRlIDw9IDBcblx0XHRcdEBfc2V0U3RhdGUoIDEgKVxuXHRcdFx0QGNsaWVudC5lbWl0KCBcImZpbGUudXBsb2FkXCIsIEAgKVxuXHRcdFx0QF9zaWduKClcblx0XHRyZXR1cm4gQFxuXHRcblx0YWJvcnQ6ID0+XG5cdFx0aWYgQHN0YXRlIDw9IDRcblx0XHRcdEBfc2V0U3RhdGUoIDggKVxuXHRcdFx0QHJlcXVlc3RVcGxvYWQ/LmFib3J0KClcblx0XHRcdEBlbWl0IFwiYWJvcnRlZFwiXG5cdFx0XHRAY2xpZW50LmVtaXQoIFwiZmlsZS5hYm9ydGVkXCIsIEAgKVxuXHRcdHJldHVybiBAXG5cdFxuXHRnZXRTdGF0ZTogPT5cblx0XHRyZXR1cm4gQHN0YXRlc1sgQHN0YXRlIF1cblxuXHRnZXRSZXN1bHQ6ID0+XG5cdFx0aWYgQHN0YXRlIGlzIDUgYW5kIEBkYXRhP1xuXHRcdFx0cmV0dXJuIHsgdXJsOiBAZGF0YS51cmwsIGhhc2g6IEBkYXRhLmZpbGVoYXNoLCBrZXk6IEBkYXRhLmtleSwgdHlwZTogQGRhdGEuY29udGVudF90eXBlIH1cblx0XHRyZXR1cm4gbnVsbFxuXG5cdGdldFByb2dyZXNzOiAoIGFzRmFjdG9yID0gZmFsc2UgKT0+XG5cdFx0aWYgQHN0YXRlIDwgNFxuXHRcdFx0X2ZhYyA9IDBcblx0XHRlbHNlIGlmIEBzdGF0ZSA+IDRcblx0XHRcdF9mYWMgPSAxXG5cdFx0ZWxzZVxuXHRcdFx0X2ZhYyA9IEBwcm9ncmVzc1N0YXRlXG5cblx0XHRpZiBhc0ZhY3RvclxuXHRcdFx0cmV0dXJuIF9mYWNcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gTWF0aC5yb3VuZCggX2ZhYyAqIDEwMCApXG5cblx0Z2V0TmFtZTogPT5cblx0XHRyZXR1cm4gQGZpbGUubmFtZVxuXG5cdGdldFR5cGU6ID0+XG5cdFx0cmV0dXJuIEBmaWxlLnR5cGVcblxuXHRnZXREYXRhOiA9PlxuXHRcdF9yZXQgPVxuXHRcdFx0bmFtZTogQGNsaWVudC5mb3JtbmFtZVxuXHRcdFx0ZmlsZW5hbWU6IEBnZXROYW1lKClcblx0XHRcdGlkeDogQGlkeFxuXHRcdFx0c3RhdGU6IEBnZXRTdGF0ZSgpXG5cdFx0XHRwcm9ncmVzczogQGdldFByb2dyZXNzKClcblx0XHRcdHJlc3VsdDogQGdldFJlc3VsdCgpXG5cdFx0XHRvcHRpb25zOiBAb3B0aW9uc1xuXHRcdFx0aW52YWxpZF9yZWFzb246IEB2YWxpZGF0aW9uXG5cdFx0XHRlcnJvcjogQGVycm9yXG5cdFx0cmV0dXJuIF9yZXRcblxuXHRfc2V0U3RhdGU6ICggc3RhdGUgKT0+XG5cdFx0aWYgc3RhdGUgPiBAc3RhdGVcblx0XHRcdEBzdGF0ZSA9IHN0YXRlXG5cdFx0XHRAZW1pdCggXCJzdGF0ZVwiLCBAZ2V0U3RhdGUoKSApXG5cdFx0cmV0dXJuIHN0YXRlXG5cblx0X3ZhbGlkYXRlOiA9PlxuXHRcdF9zaXplID0gQGZpbGUuc2l6ZSAvIDEwMjRcblx0XHRpZiBAb3B0aW9ucy5tYXhzaXplID4gMCBhbmQgQG9wdGlvbnMubWF4c2l6ZSA8IF9zaXplXG5cdFx0XHRAdmFsaWRhdGlvbi5wdXNoIFwibWF4c2l6ZVwiXG5cblx0XHRpZiBAb3B0aW9ucy5hY2NlcHRSdWxlcz8ubGVuZ3RoIGFuZCBub3QgQF90ZXN0TWltZSggQG9wdGlvbnMuYWNjZXB0UnVsZXMgKVxuXHRcdFx0QHZhbGlkYXRpb24ucHVzaCBcImFjY2VwdFwiXG5cblx0XHRpZiBAdmFsaWRhdGlvbi5sZW5ndGhcblx0XHRcdEBfc2V0U3RhdGUoIDYgKVxuXHRcdFx0QGVtaXQoIFwiaW52YWxpZFwiLCBAdmFsaWRhdGlvbiApXG5cdFx0XHRAY2xpZW50LmVtaXQoIFwiZmlsZS5pbnZhbGlkXCIsIEAsIEB2YWxpZGF0aW9uIClcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdHJldHVybiB0cnVlXG5cblx0X3Rlc3RNaW1lOiAoIGFjY2VwdFJ1bGVzICk9PlxuXHRcdGZvciBfcnVsZSBpbiBhY2NlcHRSdWxlc1xuXHRcdFx0aWYgX3J1bGUoIEBmaWxlIClcblx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHRyZXR1cm4gZmFsc2VcblxuXHRfbm93OiAtPlxuXHRcdHJldHVybiBNYXRoLnJvdW5kKCBEYXRlLm5vdygpIC8gMTAwMCApXG5cblx0X3JneEZpbGUyS2V5OiAvKFteQS1aYS16MC05XSkvaWdcblx0X3NpZ246ID0+XG5cdFx0X25hbWUgPSBAZ2V0TmFtZSgpXG5cdFx0X2NvbnRlbnRfdHlwZSA9IEBnZXRUeXBlKClcblx0XHRpZiBAc3RhdGUgPiAxXG5cdFx0XHRyZXR1cm5cblx0XHRAdXJsID0gQG9wdGlvbnMuaG9zdCArIEBvcHRpb25zLmRvbWFpbiArIFwiL1wiICsgQGtleVxuXHRcdEBqc29uID1cblx0XHRcdGJsb2I6IHRydWVcblx0XHRcdGFjbDogQG9wdGlvbnMuYWNsXG5cdFx0XHR0dGw6IEBvcHRpb25zLnR0bFxuXHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0ZmlsZW5hbWU6IF9uYW1lXG5cblx0XHRAanNvbi53aWR0aCA9IEBvcHRpb25zLndpZHRoIGlmIEBvcHRpb25zLndpZHRoP1xuXHRcdEBqc29uLmhlaWdodCA9IEBvcHRpb25zLmhlaWdodCBpZiBAb3B0aW9ucy5oZWlnaHQ/XG5cblx0XHRAanNvbi50YWdzID0gQG9wdGlvbnMudGFncyBpZiBAb3B0aW9ucy50YWdzP1xuXHRcdEBqc29uLnByb3BlcnRpZXMgPSBAb3B0aW9ucy5wcm9wZXJ0aWVzIGlmIEBvcHRpb25zLnByb3BlcnRpZXM/XG5cdFx0QGpzb25bIFwiY29udGVudC1kaXNwb3NpdGlvblwiIF0gPSBAb3B0aW9uc1sgXCJjb250ZW50LWRpc3Bvc2l0aW9uXCIgXSBpZiBAb3B0aW9uc1sgXCJjb250ZW50LWRpc3Bvc2l0aW9uXCIgXT9cblxuXHRcdEBqc29uLmNvbnRlbnRfdHlwZSA9IF9jb250ZW50X3R5cGUgaWYgX2NvbnRlbnRfdHlwZT8ubGVuZ3RoXG5cblx0XHRAZW1pdCggXCJjb250ZW50XCIsIEBrZXksIEBqc29uIClcblx0XHRAY2xpZW50LmVtaXQoIFwiZmlsZS5jb250ZW50XCIsIEAsIEBrZXksIEBqc29uIClcblxuXHRcdEBvcHRpb25zLnJlcXVlc3RTaWduRm4uY2FsbCBALCBAb3B0aW9ucy5kb21haW4sIEBvcHRpb25zLmFjY2Vzc2tleSwgQHVybCwgQGtleSwgQGpzb24sICggZXJyLCBzaWduYXR1cmUgKT0+XG5cdFx0XHRpZiBlcnJcblx0XHRcdFx0QGVycm9yID0gZXJyXG5cdFx0XHRcdEBfc2V0U3RhdGUoIDcgKVxuXHRcdFx0XHRAZW1pdCggXCJlcnJvclwiLCBlcnIgKVxuXHRcdFx0XHRAY2xpZW50LmVtaXQoIFwiZmlsZS5lcnJvclwiLCBALCBlcnIgKVxuXHRcdFx0XHRyZXR1cm5cblxuXHRcdFx0aWYgQHVybC5pbmRleE9mKCBcIj9cIiApID49IDBcblx0XHRcdFx0QHVybCArPSBcIiZcIlxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAdXJsICs9IFwiP1wiXG5cdFx0XHRAdXJsICs9ICggXCJzaWduYXR1cmU9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoIHNpZ25hdHVyZSApIClcblxuXHRcdFx0QF9zZXRTdGF0ZSggMiApXG5cdFx0XHRAZW1pdCggXCJzaWduZWRcIiApXG5cdFx0XHRyZXR1cm5cblx0XHRyZXR1cm5cblxuXHRfdXBsb2FkOiA9PlxuXHRcdGlmIEBzdGF0ZSA+IDJcblx0XHRcdHJldHVyblxuXHRcdEBfc2V0U3RhdGUoIDMgKVxuXHRcdGRhdGEgPSBuZXcgRm9ybURhdGEoKVxuXHRcdGRhdGEuYXBwZW5kKCBcIkpTT05cIiwgSlNPTi5zdHJpbmdpZnkoIEBqc29uICkgKVxuXHRcdGRhdGEuYXBwZW5kKCBcImJsb2JcIiwgQGZpbGUgKVxuXHRcdFxuXHRcdF94aHIgPSBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KClcblx0XHRfeGhyLnVwbG9hZD8uYWRkRXZlbnRMaXN0ZW5lciggXCJwcm9ncmVzc1wiLCBAX2hhbmRsZVByb2dyZXNzKCksIGZhbHNlIClcblx0XHRfeGhyLmFkZEV2ZW50TGlzdGVuZXIoIFwicHJvZ3Jlc3NcIiwgQF9oYW5kbGVQcm9ncmVzcygpLCBmYWxzZSApXG5cdFx0X3hoci5faXNmaWxlID0gdHJ1ZVxuXHRcdFxuXHRcdEByZXF1ZXN0VXBsb2FkID0geGhyKCB7XG5cdFx0XHR4aHI6IF94aHJcblx0XHRcdHVybDogQHVybFxuXHRcdFx0bWV0aG9kOiBcIlBPU1RcIlxuXHRcdFx0ZGF0YTogZGF0YVxuXHRcdH0sICggZXJyLCByZXNwLCBib2R5ICk9PlxuXHRcdFx0I2NvbnNvbGUubG9nIFwicmVxdWVzdFVwbG9hZFwiLCBlcnIsIHJlc3AsIGJvZHlcblx0XHRcdGlmIGVyclxuXHRcdFx0XHRAX3NldFN0YXRlKCA3IClcblx0XHRcdFx0QHByb2dyZXNzU3RhdGUgPSAwXG5cdFx0XHRcdEBlcnJvciA9IGVyclxuXHRcdFx0XHRAZW1pdCggXCJlcnJvclwiLCBlcnIgKVxuXHRcdFx0XHRAY2xpZW50LmVtaXQoIFwiZmlsZS5lcnJvclwiLCBALCBlcnIgKVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0XG5cdFx0XHRfZGF0YSA9IEpTT04ucGFyc2UoIGJvZHkgKVxuXHRcdFx0aWYgcmVzcC5zdGF0dXNDb2RlID49IDMwMFxuXHRcdFx0XHRAX3NldFN0YXRlKCA3IClcblx0XHRcdFx0QHByb2dyZXNzU3RhdGUgPSAwXG5cdFx0XHRcdEBlcnJvciA9IF9kYXRhXG5cdFx0XHRcdEBlbWl0KCBcImVycm9yXCIsIF9kYXRhIClcblx0XHRcdFx0QGNsaWVudC5lbWl0KCBcImZpbGUuZXJyb3JcIiwgQCwgX2RhdGEgKVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdFxuXHRcdFx0QGRhdGEgPSBfZGF0YT8ucm93c1sgMCBdXG5cdFx0XHRAcHJvZ3Jlc3NTdGF0ZSA9IDFcblx0XHRcdEBfc2V0U3RhdGUoIDUgKVxuXHRcdFx0QGVtaXQoIFwiZG9uZVwiLCBAZGF0YSApXG5cdFx0XHRAY2xpZW50LmVtaXQoIFwiZmlsZS5kb25lXCIsIEAgKVxuXHRcdFx0cmV0dXJuXG5cdFx0KVxuXHRcdHJldHVyblxuXG5cdF9oYW5kbGVQcm9ncmVzczogPT5cblx0XHRyZXR1cm4gKCBldm50ICk9PlxuXHRcdFx0aWYgbm90IGV2bnQudGFyZ2V0Lm1ldGhvZD9cblx0XHRcdFx0QHByb2dyZXNzU3RhdGUgPSBldm50LmxvYWRlZC9ldm50LnRvdGFsXG5cdFx0XHRcdEBfc2V0U3RhdGUoIDQgKVxuXHRcdFx0XHRAZW1pdCggXCJwcm9ncmVzc1wiLCBAZ2V0UHJvZ3Jlc3MoKSwgZXZudCApXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0cmV0dXJuXG5cblx0X2RlZmF1bHRSZXF1ZXN0U2lnbmF0dXJlOiAoIGRvbWFpbiwgYWNjZXNza2V5LCBtYWRpYWFwaXVybCwga2V5LCBqc29uLCBjYiApPT5cblx0XHRfdXJsID0gQG9wdGlvbnMuaG9zdCArIGRvbWFpbiArIFwiL3NpZ24vXCIgKyBhY2Nlc3NrZXlcblx0XHRcblx0XHRfeGhyID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpXG5cdFx0XG5cdFx0ZGF0YSA9IG5ldyBGb3JtRGF0YSgpXG5cdFx0ZGF0YS5hcHBlbmQoIFwidXJsXCIsIG1hZGlhYXBpdXJsIClcblx0XHRkYXRhLmFwcGVuZCggXCJrZXlcIiwga2V5IClcblx0XHRkYXRhLmFwcGVuZCggXCJqc29uXCIsIEpTT04uc3RyaW5naWZ5KCBqc29uICkgKVxuXHRcdHhocigge1xuXHRcdFx0eGhyOiBfeGhyXG5cdFx0XHRtZXRob2Q6IFwiUE9TVFwiXG5cdFx0XHR1cmw6IF91cmxcblx0XHRcdGJvZHk6IGRhdGFcblx0XHR9LCAoIGVyciwgcmVzcCwgc2lnbmF0dXJlICktPlxuXHRcdFx0aWYgZXJyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IgXCJnZXQgc2lnbiBlcnJvclwiLCBlcnJcblx0XHRcdFx0Y2IoIGVyciApXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0Y2IoIG51bGwsIHNpZ25hdHVyZSApXG5cdFx0XHRyZXR1cm5cblx0XHQpXG5cdFx0cmV0dXJuXG5cdFx0XG5tb2R1bGUuZXhwb3J0cyA9IEZpbGVcbiIsImRvbSA9IHJlcXVpcmUoIFwiZG9tZWxcIiApXG5cbmNsYXNzIEZpbGVWaWV3IGV4dGVuZHMgcmVxdWlyZShcIi4vYmFzZVwiKVxuXHRjb25zdHJ1Y3RvcjogKCBAZmlsZU9iaiwgQGNsaWVudCwgQG9wdGlvbnMgKS0+XG5cdFx0c3VwZXJcblxuXHRcdGlmIEBjbGllbnQucmVzdWx0VGVtcGxhdGVGbj8gYW5kIHR5cGVvZiBAb3B0aW9ucy5yZXN1bHRUZW1wbGF0ZUZuIGlzbnQgXCJmdW5jdGlvblwiXG5cdFx0XHRAdGVtcGxhdGUgPSBAY2xpZW50LnJlc3VsdFRlbXBsYXRlRm5cblx0XHRlbHNlXG5cdFx0XHRAdGVtcGxhdGUgPSBAX2RlZmF1bHRUZW1wbGF0ZVxuXG5cdFx0QGZpbGVPYmoub24oIFwicHJvZ3Jlc3NcIiwgQHVwZGF0ZSgpIClcblx0XHRAZmlsZU9iai5vbiggXCJkb25lXCIsIEB1cGRhdGUoKSApXG5cdFx0QGZpbGVPYmoub24oIFwiZXJyb3JcIiwgQHVwZGF0ZSgpIClcblx0XHRAZmlsZU9iai5vbiggXCJpbnZhbGlkXCIsIEB1cGRhdGUoKSApXG5cdFx0cmV0dXJuXG5cblx0cmVuZGVyOiA9PlxuXHRcdEBlbCA9IGRvbS5jcmVhdGUoIFwiZGl2XCIsIHsgY2xhc3M6XCJmaWxlIGNvbC1zbS02IGNvbC1tZC00XCIgfSApXG5cdFx0QGVsLmlubmVySFRNTCA9IEB0ZW1wbGF0ZSggQGZpbGVPYmouZ2V0RGF0YSgpIClcblx0XHRyZXR1cm4gQGVsXG5cblx0dXBkYXRlOiA9PlxuXHRcdHJldHVybiAoIGV2bnQgKT0+XG5cdFx0XHRAZWwuaW5uZXJIVE1MID0gQHRlbXBsYXRlKCBAZmlsZU9iai5nZXREYXRhKCkgKVxuXHRcdFx0cmV0dXJuXG5cblx0X2RlZmF1bHRUZW1wbGF0ZTogKCBkYXRhICktPlxuXHRcdF9odG1sID0gXCJcIlwiXG5cdDxkaXYgY2xhc3M9XCJ0aHVtYm5haWwgc3RhdGUtI3sgZGF0YS5zdGF0ZSB9XCI+XG5cdFx0PGI+I3sgZGF0YS5maWxlbmFtZX08L2I+XG5cdFx0XCJcIlwiXG5cdFx0c3dpdGNoIGRhdGEuc3RhdGVcblx0XHRcdHdoZW4gXCJwcm9ncmVzc1wiXG5cdFx0XHRcdF9odG1sICs9IFwiXCJcIlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgYXJpYS12YWx1ZW5vdz1cIiN7ZGF0YS5wcm9ncmVzc31cIiBhcmlhLXZhbHVlbWluPVwiMFwiIGFyaWEtdmFsdWVtYXg9XCIxMDBcIiBzdHlsZT1cIndpZHRoOiAje2RhdGEucHJvZ3Jlc3N9JTtcIj5cblx0XHRcdFx0XHRcdDxzcGFuPiN7ZGF0YS5wcm9ncmVzc30lPC9zcGFuPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XCJcIlwiXG5cdFx0XHR3aGVuIFwiZG9uZVwiXG5cdFx0XHRcdF9odG1sICs9IFwiXCJcIlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicmVzdWx0XCI+XG5cdFx0XHRcdFx0PGEgaHJlZj1cIiN7ZGF0YS5yZXN1bHQudXJsfVwiIHRhcmdldD1cIl9uZXdcIj5GZXJ0aWchICggI3tkYXRhLnJlc3VsdC5rZXl9ICk8L2E+XG5cdFx0XHRcdFwiXCJcIlxuXHRcdFx0XHRmb3IgX2ssIF92IG9mIGRhdGEucmVzdWx0XG5cdFx0XHRcdFx0X2h0bWwgKz0gXCJcIlwiXG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCIje2RhdGEubmFtZX1fI3sgZGF0YS5pZHggfV8je19rfVwiIHZhbHVlPVwiI3tfdn1cIj5cblx0XHRcdFx0XHRcIlwiXCJcblx0XHRcdFx0X2h0bWwgKz0gXCJcIlwiXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcIlwiXCJcblx0XHRcdHdoZW4gXCJpbnZhbGlkXCJcblx0XHRcdFx0X2h0bWwgKz0gXCJcIlwiXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJyZXN1bHRcIj5cblx0XHRcdFx0XHQ8Yj5JbnZhbGlkPC9iPlxuXHRcdFx0XHRcIlwiXCJcblx0XHRcdFx0Zm9yIF9yZWFzb24gaW4gZGF0YS5pbnZhbGlkX3JlYXNvblxuXHRcdFx0XHRcdHN3aXRjaCBfcmVhc29uXG5cdFx0XHRcdFx0XHR3aGVuIFwibWF4c2l6ZVwiXG5cdFx0XHRcdFx0XHRcdF9odG1sICs9IFwiPGRpdiBjbGFzcz1cXFwiYWxlcnQgYWxlcnQtZXJyb3JcXFwiPkZpbGUgdG9vIGJpZy4gT25seSBmaWxlcyB1bnRpbCAje2RhdGEub3B0aW9ucy5tYXhzaXplfWtiIGFyZSBhbGxvd2VkLjwvZGl2PlwiXG5cdFx0XHRcdFx0XHR3aGVuIFwiYWNjZXB0XCJcblx0XHRcdFx0XHRcdFx0X2h0bWwgKz0gXCI8ZGl2IGNsYXNzPVxcXCJhbGVydCBhbGVydC1lcnJvclxcXCI+V3JvbmcgdHlwZS4gT25seSBmaWxlcyBvZiB0eXBlICN7ZGF0YS5vcHRpb25zLmFjY2VwdC5qb2luKCBcIiwgXCIgKX0gYXJlIGFsbG93ZWQuPC9kaXY+XCJcblxuXHRcdFx0XHQgX2h0bWwgKz0gXCJcIlwiXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcIlwiXCJcblx0XHRcdHdoZW4gXCJlcnJvclwiXG5cdFx0XHRcdF9odG1sICs9IFwiPGRpdiBjbGFzcz1cXFwiYWxlcnQgYWxlcnQtZXJyb3JcXFwiPkFuIEVycm9yIG9jY3VyZWQuPC9kaXY+XCJcblxuXHRcdFx0d2hlbiBcImFib3J0ZWRcIlxuXHRcdFx0XHRfaHRtbCArPSBcIjxkaXYgY2xhc3M9XFxcImFsZXJ0IGFsZXJ0LWVycm9yXFxcIj5VcGxvYWQgYWJvcnRlZC48L2Rpdj5cIlxuXG5cdFx0X2h0bWwgKz0gXCJcIlwiXG5cdDwvZGl2PlxuXHRcdFwiXCJcIlxuXHRcdHJldHVybiBfaHRtbFxuXHRcdFxubW9kdWxlLmV4cG9ydHMgPSBGaWxlVmlld1xuIiwiQmFzZSA9IHJlcXVpcmUoIFwiLi9iYXNlXCIgKVxuRmlsZSA9IHJlcXVpcmUoIFwiLi9maWxlXCIgKVxuRmlsZVZpZXcgPSByZXF1aXJlKCBcIi4vZmlsZXZpZXdcIiApXG5cbkNsaWVudCA9IHJlcXVpcmUoIFwiLi9jbGllbnRcIiApXG5DbGllbnQuQmFzZSA9IEJhc2VcbkNsaWVudC5GaWxlID0gRmlsZVxuQ2xpZW50LkZpbGVWaWV3ID0gRmlsZVZpZXdcblxubW9kdWxlLmV4cG9ydHMgPSBDbGllbnRcbiIsImlzT2JqZWN0ID0gKCB2ciApLT5cblx0cmV0dXJuICggdnIgaXNudCBudWxsIGFuZCB0eXBlb2YgdnIgaXMgJ29iamVjdCcgKVxuXG5pc0FycmF5ID0gKCB2ciApLT5cblx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCggdnIgKSBpcyAnW29iamVjdCBBcnJheV0nXG5cbmlzU3RyaW5nID0gKCB2ciApLT5cblx0cmV0dXJuIHR5cGVvZiB2ciBpcyAnc3RyaW5nJyBvciB2ciBpbnN0YW5jZW9mIFN0cmluZ1xuXG5faW50UmVnZXggPSAvXlxcZCskL1xuaXNJbnQgPSAoIHZyICktPlxuXHRyZXR1cm4gX2ludFJlZ2V4LnRlc3QoIHZyIClcblxuYXNzaWduID0gKCB0Z3J0LCBzcmNzLi4uICktPlxuXHRmb3Igc3JjIGluIHNyY3Ncblx0XHRpZiBpc09iamVjdCggc3JjIClcblx0XHRcdGZvciBfaywgX3Ygb2Ygc3JjXG5cdFx0XHRcdHRncnRbIF9rIF0gPSBfdlxuXHRyZXR1cm4gdGdydFxuXHRcbm1vZHVsZS5leHBvcnRzID1cblx0aXNBcnJheTogaXNBcnJheVxuXHRpc09iamVjdDogaXNPYmplY3Rcblx0aXNTdHJpbmc6IGlzU3RyaW5nXG5cdGlzSW50OiBpc0ludFxuXHRhc3NpZ246IGFzc2lnblxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH1cbiAgICAgIHRocm93IFR5cGVFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4nKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgYXJncyA9IG5ldyBBcnJheShsZW4gLSAxKTtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8IGxlbjsgaSsrKVxuICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgYXJncyA9IG5ldyBBcnJheShsZW4gLSAxKTtcbiAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIHZhciBtO1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghZW1pdHRlci5fZXZlbnRzIHx8ICFlbWl0dGVyLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gMDtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbihlbWl0dGVyLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IDE7XG4gIGVsc2VcbiAgICByZXQgPSBlbWl0dGVyLl9ldmVudHNbdHlwZV0ubGVuZ3RoO1xuICByZXR1cm4gcmV0O1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgd2luZG93ID0gcmVxdWlyZShcImdsb2JhbC93aW5kb3dcIilcbnZhciBvbmNlID0gcmVxdWlyZShcIm9uY2VcIilcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKFwicGFyc2UtaGVhZGVyc1wiKVxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVYSFJcbmNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCB8fCBub29wXG5jcmVhdGVYSFIuWERvbWFpblJlcXVlc3QgPSBcIndpdGhDcmVkZW50aWFsc1wiIGluIChuZXcgY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0KCkpID8gY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0IDogd2luZG93LlhEb21haW5SZXF1ZXN0XG5cblxuZnVuY3Rpb24gaXNFbXB0eShvYmope1xuICAgIGZvcih2YXIgaSBpbiBvYmope1xuICAgICAgICBpZihvYmouaGFzT3duUHJvcGVydHkoaSkpIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBjcmVhdGVYSFIob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBmdW5jdGlvbiByZWFkeXN0YXRlY2hhbmdlKCkge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIGxvYWRGdW5jKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJvZHkoKSB7XG4gICAgICAgIC8vIENocm9tZSB3aXRoIHJlcXVlc3RUeXBlPWJsb2IgdGhyb3dzIGVycm9ycyBhcnJvdW5kIHdoZW4gZXZlbiB0ZXN0aW5nIGFjY2VzcyB0byByZXNwb25zZVRleHRcbiAgICAgICAgdmFyIGJvZHkgPSB1bmRlZmluZWRcblxuICAgICAgICBpZiAoeGhyLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICBib2R5ID0geGhyLnJlc3BvbnNlXG4gICAgICAgIH0gZWxzZSBpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PT0gXCJ0ZXh0XCIgfHwgIXhoci5yZXNwb25zZVR5cGUpIHtcbiAgICAgICAgICAgIGJvZHkgPSB4aHIucmVzcG9uc2VUZXh0IHx8IHhoci5yZXNwb25zZVhNTFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzSnNvbikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBib2R5ID0gSlNPTi5wYXJzZShib2R5KVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBib2R5XG4gICAgfVxuXG4gICAgdmFyIGZhaWx1cmVSZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICBib2R5OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogMCxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICB1cmw6IHVyaSxcbiAgICAgICAgICAgICAgICByYXdSZXF1ZXN0OiB4aHJcbiAgICAgICAgICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9yRnVuYyhldnQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRUaW1lcilcbiAgICAgICAgaWYoIShldnQgaW5zdGFuY2VvZiBFcnJvcikpe1xuICAgICAgICAgICAgZXZ0ID0gbmV3IEVycm9yKFwiXCIgKyAoZXZ0IHx8IFwiVW5rbm93biBYTUxIdHRwUmVxdWVzdCBFcnJvclwiKSApXG4gICAgICAgIH1cbiAgICAgICAgZXZ0LnN0YXR1c0NvZGUgPSAwXG4gICAgICAgIGNhbGxiYWNrKGV2dCwgZmFpbHVyZVJlc3BvbnNlKVxuICAgIH1cblxuICAgIC8vIHdpbGwgbG9hZCB0aGUgZGF0YSAmIHByb2Nlc3MgdGhlIHJlc3BvbnNlIGluIGEgc3BlY2lhbCByZXNwb25zZSBvYmplY3RcbiAgICBmdW5jdGlvbiBsb2FkRnVuYygpIHtcbiAgICAgICAgaWYgKGFib3J0ZWQpIHJldHVyblxuICAgICAgICB2YXIgc3RhdHVzXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpXG4gICAgICAgIGlmKG9wdGlvbnMudXNlWERSICYmIHhoci5zdGF0dXM9PT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vSUU4IENPUlMgR0VUIHN1Y2Nlc3NmdWwgcmVzcG9uc2UgZG9lc24ndCBoYXZlIGEgc3RhdHVzIGZpZWxkLCBidXQgYm9keSBpcyBmaW5lXG4gICAgICAgICAgICBzdGF0dXMgPSAyMDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXR1cyA9ICh4aHIuc3RhdHVzID09PSAxMjIzID8gMjA0IDogeGhyLnN0YXR1cylcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzcG9uc2UgPSBmYWlsdXJlUmVzcG9uc2VcbiAgICAgICAgdmFyIGVyciA9IG51bGxcblxuICAgICAgICBpZiAoc3RhdHVzICE9PSAwKXtcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIGJvZHk6IGdldEJvZHkoKSxcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiBzdGF0dXMsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICAgICAgdXJsOiB1cmksXG4gICAgICAgICAgICAgICAgcmF3UmVxdWVzdDogeGhyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKXsgLy9yZW1lbWJlciB4aHIgY2FuIGluIGZhY3QgYmUgWERSIGZvciBDT1JTIGluIElFXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuaGVhZGVycyA9IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoXCJJbnRlcm5hbCBYTUxIdHRwUmVxdWVzdCBFcnJvclwiKVxuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKGVyciwgcmVzcG9uc2UsIHJlc3BvbnNlLmJvZHkpXG5cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgb3B0aW9ucyA9IHsgdXJpOiBvcHRpb25zIH1cbiAgICB9XG5cbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIGlmKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbGxiYWNrIGFyZ3VtZW50IG1pc3NpbmdcIilcbiAgICB9XG4gICAgY2FsbGJhY2sgPSBvbmNlKGNhbGxiYWNrKVxuXG4gICAgdmFyIHhociA9IG9wdGlvbnMueGhyIHx8IG51bGxcblxuICAgIGlmICgheGhyKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmNvcnMgfHwgb3B0aW9ucy51c2VYRFIpIHtcbiAgICAgICAgICAgIHhociA9IG5ldyBjcmVhdGVYSFIuWERvbWFpblJlcXVlc3QoKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHhociA9IG5ldyBjcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGtleVxuICAgIHZhciBhYm9ydGVkXG4gICAgdmFyIHVyaSA9IHhoci51cmwgPSBvcHRpb25zLnVyaSB8fCBvcHRpb25zLnVybFxuICAgIHZhciBtZXRob2QgPSB4aHIubWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgXCJHRVRcIlxuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5IHx8IG9wdGlvbnMuZGF0YVxuICAgIHZhciBoZWFkZXJzID0geGhyLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge31cbiAgICB2YXIgc3luYyA9ICEhb3B0aW9ucy5zeW5jXG4gICAgdmFyIGlzSnNvbiA9IGZhbHNlXG4gICAgdmFyIHRpbWVvdXRUaW1lclxuXG4gICAgaWYgKFwianNvblwiIGluIG9wdGlvbnMpIHtcbiAgICAgICAgaXNKc29uID0gdHJ1ZVxuICAgICAgICBoZWFkZXJzW1wiYWNjZXB0XCJdIHx8IGhlYWRlcnNbXCJBY2NlcHRcIl0gfHwgKGhlYWRlcnNbXCJBY2NlcHRcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIikgLy9Eb24ndCBvdmVycmlkZSBleGlzdGluZyBhY2NlcHQgaGVhZGVyIGRlY2xhcmVkIGJ5IHVzZXJcbiAgICAgICAgaWYgKG1ldGhvZCAhPT0gXCJHRVRcIiAmJiBtZXRob2QgIT09IFwiSEVBRFwiKSB7XG4gICAgICAgICAgICBoZWFkZXJzW1wiY29udGVudC10eXBlXCJdIHx8IGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gfHwgKGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIikgLy9Eb24ndCBvdmVycmlkZSBleGlzdGluZyBhY2NlcHQgaGVhZGVyIGRlY2xhcmVkIGJ5IHVzZXJcbiAgICAgICAgICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShvcHRpb25zLmpzb24pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gcmVhZHlzdGF0ZWNoYW5nZVxuICAgIHhoci5vbmxvYWQgPSBsb2FkRnVuY1xuICAgIHhoci5vbmVycm9yID0gZXJyb3JGdW5jXG4gICAgLy8gSUU5IG11c3QgaGF2ZSBvbnByb2dyZXNzIGJlIHNldCB0byBhIHVuaXF1ZSBmdW5jdGlvbi5cbiAgICB4aHIub25wcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gSUUgbXVzdCBkaWVcbiAgICB9XG4gICAgeGhyLm9udGltZW91dCA9IGVycm9yRnVuY1xuICAgIHhoci5vcGVuKG1ldGhvZCwgdXJpLCAhc3luYywgb3B0aW9ucy51c2VybmFtZSwgb3B0aW9ucy5wYXNzd29yZClcbiAgICAvL2hhcyB0byBiZSBhZnRlciBvcGVuXG4gICAgaWYoIXN5bmMpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9ICEhb3B0aW9ucy53aXRoQ3JlZGVudGlhbHNcbiAgICB9XG4gICAgLy8gQ2Fubm90IHNldCB0aW1lb3V0IHdpdGggc3luYyByZXF1ZXN0XG4gICAgLy8gbm90IHNldHRpbmcgdGltZW91dCBvbiB0aGUgeGhyIG9iamVjdCwgYmVjYXVzZSBvZiBvbGQgd2Via2l0cyBldGMuIG5vdCBoYW5kbGluZyB0aGF0IGNvcnJlY3RseVxuICAgIC8vIGJvdGggbnBtJ3MgcmVxdWVzdCBhbmQganF1ZXJ5IDEueCB1c2UgdGhpcyBraW5kIG9mIHRpbWVvdXQsIHNvIHRoaXMgaXMgYmVpbmcgY29uc2lzdGVudFxuICAgIGlmICghc3luYyAmJiBvcHRpb25zLnRpbWVvdXQgPiAwICkge1xuICAgICAgICB0aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBhYm9ydGVkPXRydWUvL0lFOSBtYXkgc3RpbGwgY2FsbCByZWFkeXN0YXRlY2hhbmdlXG4gICAgICAgICAgICB4aHIuYWJvcnQoXCJ0aW1lb3V0XCIpXG4gICAgICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcihcIlhNTEh0dHBSZXF1ZXN0IHRpbWVvdXRcIilcbiAgICAgICAgICAgIGUuY29kZSA9IFwiRVRJTUVET1VUXCJcbiAgICAgICAgICAgIGVycm9yRnVuYyhlKVxuICAgICAgICB9LCBvcHRpb25zLnRpbWVvdXQgKVxuICAgIH1cblxuICAgIGlmICh4aHIuc2V0UmVxdWVzdEhlYWRlcikge1xuICAgICAgICBmb3Ioa2V5IGluIGhlYWRlcnMpe1xuICAgICAgICAgICAgaWYoaGVhZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKXtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcnNba2V5XSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5oZWFkZXJzICYmICFpc0VtcHR5KG9wdGlvbnMuaGVhZGVycykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVycyBjYW5ub3QgYmUgc2V0IG9uIGFuIFhEb21haW5SZXF1ZXN0IG9iamVjdFwiKVxuICAgIH1cblxuICAgIGlmIChcInJlc3BvbnNlVHlwZVwiIGluIG9wdGlvbnMpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMucmVzcG9uc2VUeXBlXG4gICAgfVxuXG4gICAgaWYgKFwiYmVmb3JlU2VuZFwiIGluIG9wdGlvbnMgJiZcbiAgICAgICAgdHlwZW9mIG9wdGlvbnMuYmVmb3JlU2VuZCA9PT0gXCJmdW5jdGlvblwiXG4gICAgKSB7XG4gICAgICAgIG9wdGlvbnMuYmVmb3JlU2VuZCh4aHIpXG4gICAgfVxuXG4gICAgeGhyLnNlbmQoYm9keSlcblxuICAgIHJldHVybiB4aHJcblxuXG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBzZWxmO1xufSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHt9O1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBvbmNlXG5cbm9uY2UucHJvdG8gPSBvbmNlKGZ1bmN0aW9uICgpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZ1bmN0aW9uLnByb3RvdHlwZSwgJ29uY2UnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBvbmNlKHRoaXMpXG4gICAgfSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSlcbn0pXG5cbmZ1bmN0aW9uIG9uY2UgKGZuKSB7XG4gIHZhciBjYWxsZWQgPSBmYWxzZVxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmIChjYWxsZWQpIHJldHVyblxuICAgIGNhbGxlZCA9IHRydWVcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9XG59XG4iLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJ2lzLWZ1bmN0aW9uJylcblxubW9kdWxlLmV4cG9ydHMgPSBmb3JFYWNoXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcblxuZnVuY3Rpb24gZm9yRWFjaChsaXN0LCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGlmICghaXNGdW5jdGlvbihpdGVyYXRvcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaXRlcmF0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICB9XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgY29udGV4dCA9IHRoaXNcbiAgICB9XG4gICAgXG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobGlzdCkgPT09ICdbb2JqZWN0IEFycmF5XScpXG4gICAgICAgIGZvckVhY2hBcnJheShsaXN0LCBpdGVyYXRvciwgY29udGV4dClcbiAgICBlbHNlIGlmICh0eXBlb2YgbGlzdCA9PT0gJ3N0cmluZycpXG4gICAgICAgIGZvckVhY2hTdHJpbmcobGlzdCwgaXRlcmF0b3IsIGNvbnRleHQpXG4gICAgZWxzZVxuICAgICAgICBmb3JFYWNoT2JqZWN0KGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoQXJyYXkoYXJyYXksIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGFycmF5LCBpKSkge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBhcnJheVtpXSwgaSwgYXJyYXkpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZvckVhY2hTdHJpbmcoc3RyaW5nLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzdHJpbmcubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgLy8gbm8gc3VjaCB0aGluZyBhcyBhIHNwYXJzZSBzdHJpbmcuXG4gICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgc3RyaW5nLmNoYXJBdChpKSwgaSwgc3RyaW5nKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZm9yRWFjaE9iamVjdChvYmplY3QsIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgayBpbiBvYmplY3QpIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrKSkge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmplY3Rba10sIGssIG9iamVjdClcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvblxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24gKGZuKSB7XG4gIHZhciBzdHJpbmcgPSB0b1N0cmluZy5jYWxsKGZuKVxuICByZXR1cm4gc3RyaW5nID09PSAnW29iamVjdCBGdW5jdGlvbl0nIHx8XG4gICAgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiBzdHJpbmcgIT09ICdbb2JqZWN0IFJlZ0V4cF0nKSB8fFxuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAvLyBJRTggYW5kIGJlbG93XG4gICAgIChmbiA9PT0gd2luZG93LnNldFRpbWVvdXQgfHxcbiAgICAgIGZuID09PSB3aW5kb3cuYWxlcnQgfHxcbiAgICAgIGZuID09PSB3aW5kb3cuY29uZmlybSB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5wcm9tcHQpKVxufTtcbiIsIlxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdHJpbTtcblxuZnVuY3Rpb24gdHJpbShzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqfFxccyokL2csICcnKTtcbn1cblxuZXhwb3J0cy5sZWZ0ID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKTtcbn07XG5cbmV4cG9ydHMucmlnaHQgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xccyokLywgJycpO1xufTtcbiIsInZhciB0cmltID0gcmVxdWlyZSgndHJpbScpXG4gICwgZm9yRWFjaCA9IHJlcXVpcmUoJ2Zvci1lYWNoJylcbiAgLCBpc0FycmF5ID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChoZWFkZXJzKSB7XG4gIGlmICghaGVhZGVycylcbiAgICByZXR1cm4ge31cblxuICB2YXIgcmVzdWx0ID0ge31cblxuICBmb3JFYWNoKFxuICAgICAgdHJpbShoZWFkZXJzKS5zcGxpdCgnXFxuJylcbiAgICAsIGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gcm93LmluZGV4T2YoJzonKVxuICAgICAgICAgICwga2V5ID0gdHJpbShyb3cuc2xpY2UoMCwgaW5kZXgpKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgLCB2YWx1ZSA9IHRyaW0ocm93LnNsaWNlKGluZGV4ICsgMSkpXG5cbiAgICAgICAgaWYgKHR5cGVvZihyZXN1bHRba2V5XSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZVxuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkocmVzdWx0W2tleV0pKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0ucHVzaCh2YWx1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IFsgcmVzdWx0W2tleV0sIHZhbHVlIF1cbiAgICAgICAgfVxuICAgICAgfVxuICApXG5cbiAgcmV0dXJuIHJlc3VsdFxufSJdfQ==