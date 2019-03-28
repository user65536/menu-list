var mainList = document.getElementsByClassName('nav')[0];
var wrapper = document.getElementsByClassName('wrapper')[0];
mainList.onclick = function (e) {
    utils.stopBubble(e);
    var event = e || window.event;
    var src = e.target || e.srcElement;
    var index = utils.getIndex(src);
    if(src.nodeName === 'LI') {
      if(!FirstMenu.listActive) {
          new FirstMenu(index).show();
          FirstMenu.listActive = index;
      } else {
          new FirstMenu(index).hide();
          FirstMenu.listActive = 0;
      }
    }
}
mainList.onmouseover = function (e) {
  var event = e || window.event;
  var src = e.target || e.srcElement;
  if(src.nodeName === 'LI') {
    var currentIndex = utils.getIndex(src);
    var active = FirstMenu.listActive;
    if(active && active !== currentIndex) {
      new FirstMenu(active).hide();
      new FirstMenu(currentIndex).show();
      FirstMenu.listActive = currentIndex;
    }
  }
}
document.onclick = function () {
  if(FirstMenu.listActive) {
    new FirstMenu(FirstMenu.listActive).hide();
    FirstMenu.listActive = 0;
  }
}
function Menu() {};
Menu.prototype.hide = function () {
  this.dom.style.display = "none";
  if(this.activeIndex) {
    this.activeChild.dom.style.display = "none";
  }
}
Menu.prototype.show = function () {
  if(!this.dom) {
    this.dom = this.createList(this.listNameArray, this.hoverChildrenCallback, this.clickChildrenCallback);
    this.setStyle();
    wrapper.appendChild(this.dom);
  } else {
    this.dom.style.display = "block";
  }
}
Menu.prototype.createList =
                        function (listArr,
                        hoverChildrenCallback,
                        clickChildrenCallback) {
  var oUl = document.createElement('ul');
  oUl.classList.add('menu')
  listArr.forEach(function (ele, index) {
      var oLi = document.createElement('li');
      oLi.innerText = ele;
      oUl.appendChild(oLi);
  })
  oUl.addEventListener('click', (e) => {
    utils.stopBubble(e);
    var event = e || window.event;
    var src = e.target || e.srcElement;
    if(src.nodeName === "LI") {
      clickChildrenCallback && clickChildrenCallback.call(this, src);
    }
  }, false)
  oUl.addEventListener('mouseover', (e) => {
    utils.stopBubble(e);
    var event = e || window.event;
    var src = e.target || e.srcElement;
    if(src.nodeName === "LI") {
      hoverChildrenCallback && hoverChildrenCallback.call(this, src);
    }
  }, false)
  return oUl;
}
var FirstMenu = (function () {
  var cache = {};
  var content = [
    [
      {name: "新建", child: null},
      {name: "保存", child: null},
      {name: "另存为", child: ["当前格式", "兼容性格式"]},
      {name: "打开", child: null},
      {name: "打开文件夹", child: null},
      {name: "退出", child: null},
    ],
    [
      {name: "撤销", child: ["第一步", "第二步", "第三步", "第四步", "第五步", "第六步", "第七步", "第八步"]},
      {name: "反撤销", child: null},
      {name: "全选", child: null},
      {name: "复制", child: null},
      {name: "粘贴", child: ["保留原格式", "仅保留文本", "粘贴为图片"]},
      {name: "重命名", child: null},
      {name: "删除", child: null},

    ],
    [
      {name: "网页", child: null},
      {name: "大纲", child: null},
      {name: "阅读", child: null},
      {name: "标准", child: null},
      {name: "缩放", child: ["放大", "缩小", "还原"]}
    ],
    [
      {name: "批注", child: null},
      {name: "段落", child: null},
      {name: "格式", child: null},
    ],
    [
      {name: "版本信息", child: null},
      {name: "更多", child: null},
      {name: "联系", child: null},
    ],
  ]
  return function (index) {
    if(!cache[index]) {
      this.listArray = content[index - 1];
      this.listNameArray = this.listArray.map(function (ele, index) {
        return ele.name;
      })
      this.index = index;
      this.activeIndex = 0;
      this.activeChild = null;
      cache[index] = this;
    }
    return cache[index];
  }
}())
utils.inherit(FirstMenu, Menu);
FirstMenu.prototype.setStyle = function () {
  this.dom.style.left = mainList.children[this.index - 1].offsetLeft + 10 + 'px';
  this.dom.style.top = '25px';
  this.dom.classList.add('first-menu');
  this.listArray.forEach((ele, index) => {
    if(ele.child) {
      this.dom.children[index].classList.add('with-children');
    }
  })
}
FirstMenu.prototype.hoverChildrenCallback = function (src) {
  var currentIndex = utils.getIndex(src);
  var child = this.listArray[currentIndex - 1].child;
  if(this.activeChild && currentIndex !== this.activeIndex){
    this.activeChild.hide();
    this.activeIndex = 0;
  }
  if(child) {
    this.activeIndex = currentIndex;
    this.activeChild = new SecondMenu(this.index, this.activeIndex, child);
    this.activeChild.show();
  }
}
FirstMenu.prototype.clickChildrenCallback = function (src) {
  if(!src.classList.contains('with-children')) {
    console.log(src.innerText)
    new FirstMenu(FirstMenu.listActive).hide();
    FirstMenu.listActive = 0;
  }
}

var SecondMenu = (function () {
  var cache = {};
  return function (mainIndex, firstIndex, arr) {
    if(!cache[mainIndex + "" + firstIndex]) {
      this.listNameArray = arr;
      this.dom = null;
      this.mainIndex = mainIndex;
      this.firstIndex = firstIndex;
      cache[mainIndex + "" + firstIndex] = this;
    }
    return cache[mainIndex + "" + firstIndex]
  }
}());
utils.inherit(SecondMenu, Menu);
SecondMenu.prototype.setStyle = function () {
  this.dom.style.left = (this.mainIndex - 1) * 80 + 217 + 'px';
  this.dom.style.top = (this.firstIndex - 1) * 31 + 25 + 'px'
  this.dom.classList.add('second-menu');
}
SecondMenu.prototype.clickChildrenCallback = function (src) {
  console.log(src.innerText)
  new FirstMenu(FirstMenu.listActive).hide();
  FirstMenu.listActive = 0;
}




