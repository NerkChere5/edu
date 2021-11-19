(function _General() {
  function capitalLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  function copyProps(obj, sourceObj) {
    for (var p in sourceObj) {
      obj[p] = sourceObj[p];
    }
  }
  
  function getProp(obj, propChain) {
    propChain = toArray(propChain);
    
    for (var i = 0; obj && i < propChain.length; i++) {
      obj = obj[propChain[i]];
    }
    
    return obj;
  }
  
  function isSet(val) {
    return !!val || val == false;
  }
  
  function isType(obj, constructor) {
    return isSet(obj) && obj.constructor == constructor;
  }
  
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function randomProb(probs) {
    for (var i = 0, s = 0; i < probs.length; s += probs[i++]);
    for (var i = 0, n = 0, r = Math.random() * s; i < probs.length && r >= 0; n = i, r -= probs[i++]);
    
    return n;
  }

  function round(num, precision) {
    return precision ? +num.toFixed(precision) : Math.round(num);
  }
  
  function sign(num) {
    return num < 0 ? -1 : (num > 0 ? 1 : 0);
  }
  
  function toArray(arg, separ) {
    function f(flatArr, item) {
      item.reduce ? item.reduce(f, flatArr) : flatArr.push(item);
      
      return flatArr;
    }
    
    return isType(arg, Array) ? arg.reduce(f, []) : (isType(arg, String) ? arg.split(separ || " ") : [arg]);
  }
  
  function toRange(val, min, max) {
    return val < min ? min : (val > max ? max : val);
  }
  
  
  
  (function () {
    var re = /^moz|ms|opera|webkit/i;
    
    for (var p in window) {
      var m = p.match(re);
      
      if (m) {
        var browser = {moz: "Firefox", ms: "IE", opera: "Opera", webkit: "Chrome"}[m[0]];
        var cssObjPrefix = capitalLetter(m[0]);
        var cssPrefix = "-" + m[0] + "-";
        
        break;
      }
    }
    
    
    
    window.BROWSER = browser;
    window.CSS_OBJ_PREFIX = cssObjPrefix;
    window.CSS_PREFIX = cssPrefix;
  })();
  
  
  
  window.capitalLetter = capitalLetter;
  window.copyProps = copyProps;
  window.getProp = getProp;
  window.isSet = isSet;
  window.isType = isType;
  window.random = random;
  window.randomProb = randomProb;
  window.round = round;
  window.sign = sign;
  window.toArray = toArray;
  window.toRange = toRange;
})();







(function _Class(_General) {
  var _constrStr = "return " + _Class.toString();
  
  
  
  function _Class() {
    arguments[0] !== null && this.create && this.create.apply(this, arguments);
  }
  
  function _createClass(classNames, staticProps, props) {
    classNames = toArray(classNames, /\W+/);
    
    var Class = window[classNames[0]] = (new Function("", _constrStr.replace("_Class", classNames[0])))();
    var ParentClass = window[classNames[1]];
    
    if (ParentClass) {
      Class.prototype = Object.create(ParentClass.prototype);
      
      copyProps(Class, ParentClass);
    }
    
    _createProps(Class, staticProps);
    _createProps(Class.prototype, props);
    
    Class.prototype.C = Class.prototype.constructor = Class;
    Class.prototype.N = Class.N = classNames[0];
    
    Class._create && Class._create();
    
    return Class;
  }
  
  function _createProps(obj, props) {
    for (var p in props) {
      obj[p] = isType(obj[p], Function) && isType(props[p], Function) ? _wrapMethod(obj[p], props[p]) : props[p];
    }
  }
  
  function _wrapMethod(parentMethod, method) {
    return function super_() {
      this.super = parentMethod;
      
      var v = method.apply(this, arguments);
      
      delete this.super;
      
      return v;
    };
  }
  
  
  
  function class_(classNames) {
    return _createClass.bind(this, classNames);
  }
  
  
  
  window.class_ = class_;
})();



(function _Dom(_General) {
  function getCss(domEl, prop) {
    domEl._computedStyle = domEl._computedStyle || getComputedStyle(domEl);
    
    var v = domEl._computedStyle[prop in domEl._computedStyle ? prop : CSS_OBJ_PREFIX + capitalLetter(prop)];
    var n = parseFloat(v);
    
    return isSet(n) ? n : v;
  }
  
  function getHeight(domEl, isOut) {
    return (
      isOut
        ? domEl.offsetHeight + getCss(domEl, "marginTop") + getCss(domEl, "marginBottom")
        : domEl.clientHeight - getCss(domEl, "paddingTop") - getCss(domEl, "paddingBottom")
    );
  }
  
  function getLeft(domEl, includePadding) {
    var offsetParent = domEl.offsetParent || document.body;
    var offsetParentRect = offsetParent.getBoundingClientRect();
    var rect = domEl.getBoundingClientRect();
    
    return (
      rect.left - getCss(domEl, "marginLeft") - offsetParentRect.left - getCss(offsetParent, "borderLeftWidth")
      - (includePadding ? getCss(offsetParent, "paddingLeft") : 0)
    );
  }
  
  function getTop(domEl, includePadding) {
    var offsetParent = domEl.offsetParent || document.body;
    var offsetParentRect = offsetParent.getBoundingClientRect();
    var rect = domEl.getBoundingClientRect();
    
    return (
      rect.top - getCss(domEl, "marginTop") - offsetParentRect.top - getCss(offsetParent, "borderTopWidth")
      - (includePadding ? getCss(offsetParent, "paddingTop") : 0)
    );
  }
  
  function getWidth(domEl, isOut) {
    return (
      isOut
        ? domEl.offsetWidth + getCss(domEl, "marginLeft") + getCss(domEl, "marginRight")
        : domEl.clientWidth - getCss(domEl, "paddingLeft") - getCss(domEl, "paddingRight")
    );
  }
  
  function setCss(domEl, props) {
    for (var p in props) {
      if (isSet(props[p])) {
        domEl.style[p in domEl.style ? p : CSS_OBJ_PREFIX + capitalLetter(p)] =
          props[p] + (isType(props[p], Number) ? "px" : "")
      }
    }
  }
  
  function setFullScreen(b, domEl) {
    b = isSet(b)
      ? b
      : !(
        document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
        || document.webkitFullscreenElement
      );
    
    if (b) {
      domEl = domEl || document.documentElement;
      
      (
        domEl.requestFullscreen || domEl.mozRequestFullScreen || domEl.msRequestFullscreen
        || domEl.webkitRequestFullScreen
      ).call(domEl);
    }
    else {
      (
        document.exitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen
        || document.webkitExitFullscreen
      ).call(document);
    }
  }
  
  function setHeight(domEl, height, isOut) {
    var b = getCss(domEl, "boxSizing") == "border-box";
    
    var n = b && !isOut || !b && isOut
      ?
        getCss(domEl, "borderTopWidth") + getCss(domEl, "borderBottomWidth")
        + getCss(domEl, "paddingTop") + getCss(domEl, "paddingBottom")
      : 0;
    
    setCss(
      domEl,
      {height: toRange(height - (isOut ? n + getCss(domEl, "marginTop") + getCss(domEl, "marginBottom") : -n), 0)}
    );
  }
  
  function setLeft(domEl, left, includePadding) {
    var cssLeft = getCss(domEl, "left");
    var realLeft = getLeft(domEl, includePadding);
    
    cssLeft == "auto" && (cssLeft = getCss(domEl, "position") == "relative" ? 0 : realLeft);
    
    setCss(domEl, {left: cssLeft + left - realLeft});
  }
  
  function setTop(domEl, top, includePadding) {
    var cssTop = getCss(domEl, "top");
    var realTop = getTop(domEl, includePadding);
    
    cssTop == "auto" && (cssTop = getCss(domEl, "position") == "relative" ? 0 : realTop);
    
    setCss(domEl, {top: cssTop + top - realTop});
  }
  
  function setWidth(domEl, width, isOut) {
    var b = getCss(domEl, "boxSizing") == "border-box";
    
    var n = b && !isOut || !b && isOut
      ?
        getCss(domEl, "borderLeftWidth") + getCss(domEl, "borderRightWidth")
        + getCss(domEl, "paddingLeft") + getCss(domEl, "paddingRight")
      : 0;
    
    setCss(
      domEl, {width: toRange(width - (isOut ? n + getCss(domEl, "marginLeft") + getCss(domEl, "marginRight") : -n), 0)}
    );
  }
  
  function triggerEvent(evTarget, evType, isPropag, evData) {
    if (evTarget.offsetParent || evTarget == document || evTarget == window) {
      var ev = document.createEvent("Event");
      
      ev.data = evData;
      
      ev.initEvent(evType, isPropag, true);
      evTarget.dispatchEvent(ev);
    }
  }
  
  
  
  window.getCss = getCss;
  window.getHeight = getHeight;
  window.getLeft = getLeft;
  window.getTop = getTop;
  window.getWidth = getWidth;
  window.setCss = setCss;
  window.setFullScreen = setFullScreen;
  window.setHeight = setHeight;
  window.setLeft = setLeft;
  window.setTop = setTop;
  window.setWidth = setWidth;
  window.triggerEvent = triggerEvent;
})();



(function _Web(_General) {
  var _js = {};
  
  
  
  function ajax(url, method, data, cb) {
    var xhr = new XMLHttpRequest();
    var xhrBody = [];
    
    cb && xhr.addEventListener("load", cb.bind(null, xhr));
    
    for (var p in data) {
      xhrBody.push((p + "=" + data[p]).replace(/&/g, "%26"));
    }
    
    xhrBody = xhrBody.join("&");
    
    xhr.open(method || "post", url + (method == "get" ? "?" + xhrBody : ""), true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(xhrBody);
  }
  
  function loadJs(urls, cb) {
    for (var i = 0; i < urls.length; i++) {
      var js = document.createElement("script");
      
      js.src = urls[i];
      
      var jsSrc = js.src.toLowerCase();
      
      if (!_js[jsSrc]) {
        _js[jsSrc] = true;
        js.async = false;
        
        document.head.appendChild(js);
        document.head.removeChild(js);
      }
    }
    
    cb && js.addEventListener("load", cb);
  }
  
  
  
  window.ajax = ajax;
  window.loadJs = loadJs;
})();







class_("Block")(
  {
    bemSepars: ["--", "-"]
  },
  
  {
    create: function (arg) {
      this._els = {};
      this._mods = {};
      
      this.domEl = !arg || isType(arg, String) ? document.createElement(arg || "div") : arg;
      this.domEl.block = this;
      
      this.C != Block && this.domEl.classList.add(this.N);
      
      return this;
    },
    
    destroy: function () {
      delete this.domEl.block;
      
      this.detach();
    },
    
    
    
    _createEl: function (elName, elBlock) {
      elBlock.domEl.classList.add(elBlock._elName = this.N + this.C.bemSepars[0] + elName);
      
      return elBlock;
    },
    
    _createEls: function (elBlocks) {
      for (var p in elBlocks) {
        if (isType(elBlocks[p], Array)) {
          var Class = elBlocks[p][2] || Block;
          var count = elBlocks[p][0];
          var elName = elBlocks[p][1];
          var params = elBlocks[p][3];
          
          this._els[p] = [];
          
          for (var i = 0; i < count; i++) {
            var elBlock = this._els[p][i] = new Class(null);
            
            elBlock.create.apply(elBlock, params);
            
            this._createEl(elName, elBlock);
          }
        }
        else {
          this._els[p] = this._createEl(p, elBlocks[p]);
        }
      }
      
      return this;
    },
    
    _getMod: function (modName, isElMod) {
      return this._mods[((isElMod ? this._elName : this.N) || "") + this.C.bemSepars[1] + modName];
    },
    
    _setMod: function (modName, modVal, isElMod) {
      modName = ((isElMod ? this._elName : this.N) || "") + this.C.bemSepars[1] + modName;
      
      if (this._mods[modName] != modVal) {
        this.domEl.classList.remove(
          modName + (this._mods[modName] === true ? "" : this.C.bemSepars[1] + this._mods[modName])
        );
        
        if (modVal || modVal === 0) {
          this._mods[modName] = modVal;
          
          this.domEl.classList.add(modName + (modVal === true ? "" : this.C.bemSepars[1] + modVal));
        }
        else {
          delete this._mods[modName];
        }
      }
      
      return this;
    },
    
    
    
    append: function (children, next) {
      children = toArray(children);
      next = next && next.domEl || next;
      
      for (var i = 0; i < children.length; i++) {
        try {
          this.domEl.insertBefore(children[i].domEl || children[i], next);
        }
        catch (ex) {}
      }
      
      return this;
    },
    
    appendTo: function (parent, next) {
      parent = parent ? parent.domEl || parent : this.domEl.parentNode;
      
      try {
        parent.insertBefore(this.domEl, next && next.domEl || next);
      }
      catch (ex) {}
      
      return this;
    },
    
    clear: function () {
      this.domEl.innerHTML = "";
      
      return this;
    },
    
    detach: function () {
      this.domEl.parentNode && this.domEl.parentNode.removeChild(this.domEl);
      
      return this;
    },
    
    getCss: function (prop) {
      return getCss(this.domEl, prop);
    },
    
    getHeight: function (isOut) {
      return getHeight(this.domEl, isOut);
    },
    
    getLeft: function (includePadding) {
      return getLeft(this.domEl, includePadding);
    },
    
    getTop: function (includePadding) {
      return getTop(this.domEl, includePadding);
    },
    
    getWidth: function (isOut) {
      return getWidth(this.domEl, isOut);
    },
    
    off: function (evType, handler, capture) {
      this.domEl.removeEventListener(evType, handler, capture);
      
      return this;
    },
    
    on: function (evType, handler, capture) {
      this.domEl.addEventListener(evType, handler, capture);
      
      return this;
    },
    
    setCss: function (props) {
      setCss(this.domEl, props);
      
      return this;
    },
    
    setHeight: function (height, isOut) {
      setHeight(this.domEl, height, isOut);
      
      return this;
    },
    
    setLeft: function (left, includePadding) {
      setLeft(this.domEl, left, includePadding);
      
      return this;
    },
    
    setTop: function (top, includePadding) {
      setTop(this.domEl, top, includePadding);
      
      return this;
    },
    
    setWidth: function (width, isOut) {
      setWidth(this.domEl, width, isOut);
      
      return this;
    },
    
    triggerEvent: function (evType, isPropag, evData) {
      triggerEvent(this.domEl, evType, isPropag, evData);
      
      return this;
    }
  }
);







class_("Css")(
  {
    _finalReplacements: [[/",/g, ";"], [/"/g, ""], [/: *{/g, " {"], [/},/g, "}"], [/_\$\d*/g, ""]],
    _preprocessorRegExps: {capitalLetter: /[A-Z]/g, cssPrefix: /\$_/g},
    
    _styleSheet: new Block("style").appendTo(document.head).domEl.sheet,
    
    
    
    _preprocessor: function (rules) {
      var processedRules = {};
      var regExps = this._preprocessorRegExps;
      
      for (var key in rules) {
        var value = rules[key];
        
        if (isType(value, Object)) {
          var values = [this._preprocessor(value)];
        }
        else {
          key = key.replace(regExps.capitalLetter, "-$&").toLowerCase();
          
          if (isType(value, String)) {
            values = regExps.cssPrefix.test(value)
              ? [value.replace(regExps.cssPrefix, CSS_PREFIX), value.replace(regExps.cssPrefix, "")]
              : [value]
          }
          else if (isType(value, Number)) {
            values = [value + "px"];
          }
        }
        
        var keys = regExps.cssPrefix.test(key)
          ? [key.replace(regExps.cssPrefix, CSS_PREFIX), key.replace(regExps.cssPrefix, "")]
          : [key];
        
        for (var i = 0; i < keys.length; i++) {
          for (var j = 0; j < values.length; j++) {
            processedRules[keys[i] + (j ? "_$" : "")] = values[j];
          }
        }
      }
      
      return processedRules;
    },
    
    
    
    addRules: function (rules) {
      rules = this._preprocessor(rules);
      
      for (var p in rules) {
        var ruleStr = p + " " + JSON.stringify(rules[p], null, 2);
        
        for (var i = 0; i < this._finalReplacements.length; i++) {
          ruleStr = ruleStr.replace(this._finalReplacements[i][0], this._finalReplacements[i][1]);
        }
        
        try {
          this._styleSheet.insertRule(ruleStr, this._styleSheet.cssRules.length);
        }
        catch (ex) {}
      }
      
      return this;
    }
  }
);
