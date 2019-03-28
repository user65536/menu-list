function Sandbox () {
    var args = Array.prototype.slice.call(arguments),
        callback = args.pop(),
        packages = (args[0] && typeof args[0] === "string") ? args : args[0];
    if(!(this instanceof Sandbox)) {
        return new Sandbox(packages, callback);
    }
    if(!packages  || packages[0] === "*") {
        packages = [];
        for(var prop in Sandbox.modules) {
            if(Sandbox.modules.hasOwnProperty(prop)) {
                packages.push(prop);
            }
        }
    }
    for(var i = 0; i < packages.length; i ++) {
        Sandbox.modules[packages[i]](this)
    }
    callback(this);
}
Sandbox.modules = {
    utils: function (box) {
        box.inherit = (function () {
            var F = function () {};
            return function (Target, Origin) {
                F.prototype = Origin.prototype;
                Target.prototype = new F();
                Target.prototype.constructor = Target;
                Target.prototype.uber = Origin;
            }
        })
    },
    dom: function(box) {
        box.getIndex = function (dom) {
            var index = 1,
                previous = dom.perviousElementSibling;
            while(previous) {
                previous = previous.previousElementSibling;
                index ++;
            }
        }
    }
}
var utils = {
    getIndex: function (dom) {
        if(dom) {
          var index = 1,
              previous = dom.previousElementSibling;
          while(previous) {
              previous = previous.previousElementSibling;
              index ++;
          }
          return index;
        }
        return -1;
    },
    inherit: (function () {
        var F = function () {};
        return function (Target, Origin) {
            F.prototype = Origin.prototype;
            Target.prototype = new F();
            Target.prototype.constructor = Target;
            Target.prototype.uber = Origin;
        }
    }()),
    stopBubble: function (e) {
      if(e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    }

}
