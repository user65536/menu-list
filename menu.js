
function Menu() {

}
Menu.prototype.show = function () {
    if(this.dom) {
        this.dom.style.display = "block";
    } else {
        this.dom = this.createList(this.list)
    }
}
Menu.prototype.hide = function () {
    this.dom.style.display = "none";
}
Menu.prototype.createList = function (listArrs) {
    var oUl = document.createElement('ul');
    oUl.style.position = "absolute";
    listArr.forEach(function (ele, index) {
        var oLi = document.createElement('li');
        oLi.innerText = ele;
        oUl.appendChild(oLi);
    })
    return oUl;
}
Menu.prototype.firstLevelActive = false;
Menu.prototype.allList = [
    [
        {
            name: '1',
            child: null
        },
        {
            name: '1',
            child: null
        },
        {
            name: '1',
            child: ['11', '22', '33']
        },
    ],
    [
        {
            name: '2',
            child: null
        },
        {
            name: '2',
            child: null
        },
        {
            name: '2',
            child: ['11', '22', '33']
        },
    ],
    [
        {
            name: '3',
            child: null
        },
        {
            name: '3',
            child: null
        },
        {
            name: '3',
            child: ['11', '22', '33']
        },
    ],
]
function extend(Parent) {
    var Target = function () {};
    var F = function () {};
    F.prototype = Parent.prototype;
    Target.prototype = new F();
    Target.prototype.constructor = Target;
    Target.prototype.uber = Parent;
    return Target;
}
var FirstMenu = extend(Menu);
var SecondMenu = extend(Menu);
