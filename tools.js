var inherit = (function () {
	var F = function() {};
	return function (Origin, Target) {
		F.prototype = Origin.prototype;
		Target.prototype = new F();
		Target.prototype.constructor = Target;
		Target.prototype.uber = Origin.prototypr
	}
}())


function inherit(Origin, Target) {
	var F = function () {};
	F.prototype = Origin.prototype;
	Target.prototype = new F();
	Target.prototype.uber = Origin.prototype;
	Target.prototype.constructor = Target;
}



// 能把所有类型的数据都判断出来
function type(target) {
	var typeStr = typeof(target),
		toStr = Object.prototype.toString,
		objStr = {
			"[object Object]":"object - Object",
			"[object Array]":"array - Object",
			"[object Number]":"number - Object",
			"[object Boolean]":"boolean - Object",
			"[object String]":"string - Object",
		}
	if(target === null) {
		return null;
	}else if(typeStr === "function") {
		return "function";
	}
	if(typeStr !== "object") {
		return typeStr;
	}
	else{
		return objStr[toStr.call(target)];
	}
}


function getScrollOffset() {
	if(window.pageXOffset) {
		return{
			x : window.pageXOffset,
			y : window.pageYOffset
		}
	}else{
		return {
			x : document.body.scrollLeft + document.documentElement.scrollLeft,
			y : document.body.scrollTop + document.documentElement.scrollTop
			}


	}
}

//获取浏览器窗口尺寸
function ViewportOffset (){
    if(window.innerWidth){
        return {
            x : window.innerWidth,
            y : window.innerHeight
        }
    }else if(document.compatMode === "CSS1Compat"){
        return {
            x : document.documentElement.clientWidth,
            y : document.documentElement.clientHeight
        }
    }else if(document.compatMode === "BACKCompat"){
        return {
            x : document.bady.clientWidth,
            y : document.bady.clientHeight
        }
    }
}

function removeEvent(elem, type, handle) {
    if(elem.removeEventListener) {
        elem.removeEventListener(type, handle, false)
    }else if(elem.detachEvent) {
        elem.detachEvent('on' + type, handle)
    }else{

        elem['on' + type] = null;
    }
}



function stopBubble(event) {
	if(event.stopPropagation) {
		event.stopPropagation
	}else {
		event.cancelBubble = true;
	}
}

function cancelHandle(event) {
	if(event.preventDefault) {
		event.preventDefault();
	}else {
		event.returnValue = false;
	}
}


function addEvent(elem, type, handler) {
	if(elem.addEventListener) {
		elem.addEventListener(type, handler, false)
	}else if(elem.attachEvent) {
		elem['temp' + type + handle] = handler;
		elem[type + handler] = function () {
			elem['temp' + type + handle].call(elem);
		}
		elem.attachEvent('on' + type, elem[type + handler])
	}else{
		elem['on' + type] = handler;
	}
}


function getStyle(obj, styleProp) {
	if(obj.currentStyle) {
		return obj.currentStyle[styleProp]
	}else {
		return window.getComputedStyle(obj, null)[styleProp]
	}
}

//拖拽函数
function drag(elem) {
    elem.onmousedown = function(e) {
        clearInterval(this.timer);
        var lastX = oDiv.offsetLeft;
        var lastY = oDiv.offsetTop;
        var iSpeedX = 0;
        var iSpeedY = 0;
        var event = e || window.event;
        var disX = event.clientX - this.offsetLeft;
        var disY = event.clientY - this.offsetTop;
        var _self = this;
        document.onmousemove = function (e) {
            event = e || window.event;
            var newL = event.clientX - disX;
            var newT = event.clientY - disY;

            // var oSpan = document.createElement("span");
            // oSpan.style.cssText = 'position: absolute; width: 5px; height: 5px; background: red; left:' + newL + 'px;' + 'top:' + newT + 'px;';
            // document.body.appendChild(oSpan);

            iSpeedX = newL - lastX;
            iSpeedY = newT - lastY;

            lastX = newL;
            lastY = newT;

            _self.style.left = newL + "px";
            _self.style.top = newT + "px";
        }
        document.onmouseup = function (){
            document.onmousemove = null;
            document.onmouseup = null;
            startMove(_self, iSpeedX, iSpeedY);
        }
    }
}
function startMove (obj, iSpeedX, iSpeedY){
    clearInterval(obj.timer);
    var g = 3;
    obj.timer = setInterval(function (){
        iSpeedY += g;
        var newL = obj.offsetLeft + iSpeedX;
        var newT = obj.offsetTop + iSpeedY;

        if(newT >= document.documentElement.clientHeight - obj.offsetHeight){
            iSpeedY *= -1;
            iSpeedY *= 0.8;
            iSpeedX *= 0.8;
            newT = document.documentElement.clientHeight - obj.offsetHeight;
        }
        if(newT < 0){
            iSpeedY *=-1;
            iSpeedY *=0.8;
            newT = 0;
        }
        if(newL >= document.documentElement.clientWidth - obj.offsetWidth){
            iSpeedX *= -1;
            iSpeedX *= 0.8;
            newL = document.documentElement.clientWidth - obj.offsetWidth;
        }
        if(newL < 0){
            iSpeedX *= -1;
            iSpeedX *= 0.8;
            newL = 0;
        }
        if(Math.abs(iSpeedX) < 1){
            iSpeedX = 0;
        }
        if(Math.abs(iSpeedY) < 1){
            iSpeedY = 0;
        }
        if(iSpeedX === 0 && iSpeedY === 0 && newT === (document.documentElement.clientHeight - obj.offsetHeight)){
            clearInterval(obj.timer);
        }
        obj.style.left = newL + "px";
        obj.style.top = newT + "px";
    }, 30);
}

//弹性运动
function move (obj, iTarget){
        clearInterval(obj.timer);
        var iSpeed = 0;
        var a = 0;
        var u = 0.8;
        obj.timer = setInterval(function(){
            a = (iTarget - obj.offsetLeft) / 7;
            iSpeed = iSpeed + a;
            iSpeed = iSpeed * u;
            if(Math.abs(iSpeed) < 1 && Math.abs(iTarget - obj.offsetLeft) < 1){
                clearInterval(obj.timer);
                obj.style.left = iTarget + "px";
            }
            obj.style.left = obj.offsetLeft + iSpeed + "px";
        }, 30);
    }

function startNBMove(obj, changeData, func) {
    clearInterval(obj.timer);
    var iCurValue = 0;
    var iSpeed = 0;
    obj.timer = window.setInterval(function () {
        var bStop = true;
        for(var name in changeData) {
            if(name === 'opacity') {
                iCurValue = parseFloat(getStyle(obj, name)) * 100
            }else{
                iCurValue = parseInt(getStyle(obj, name));
            }
            iSpeed = (changeData[name] - iCurValue) / 7;
            if(iSpeed > 0) {
                iSpeed = Math.ceil(iSpeed);
            }else{
                iSpeed = Math.floor(iSpeed);
            }
            if(name === 'opacity') {
                obj.style.opacity = (iCurValue + iSpeed) / 100
            }else if(name==='zIndex'){
                obj.style.zIndex = iCurValue + '0';
            }else{
                obj.style[name] = iCurValue + iSpeed + 'px'
            }
            if(iCurValue === changeData[name]) {
                bStop = true;
            }else{
                bStop = false
            }
        }
        if(bStop) {
            clearInterval(obj.timer);
            func();
        }
    }, 30)
}

function getByClassName(target) {
    var allDom = document.getElementsByTagName('div');
    var allSelectDom = [];
    for(var i = 0; i < allDom.length; i++) {
        var allClassName = getDomAllClass(allDom[i]);
        allClassName.forEach(function (elem) {
            if(elem === target) {
                allSelectDom.push(allDom[i])
            }
        });
    }
    return allSelectDom;
}


function getDomAllClass(dom) {
    if(dom.className) {
        var str = dom.className.trim();
        var reg = /\s+/g;
        str = str.replace(reg, ' ');
        return str.split(' ');
    }else {
        return [];
    }
}

function Ajax(method, url, flag, data, callback) {
    var xhr = null;
    if(window.XMLHttpRequest) {
        //chrome firefox
        var xhr = new window.XMLHttpRequest()
    }else {
        //IE
        var xhr = new window.ActiveXObject('Microsoft.XMLHTTP')
    }
    method = method.toUpperCase()
    if(method === 'GET') {
        xhr.open("GET", url + "?" + data, flag);
        xhr.send(data)
    }else if(method === 'POST') {
        xhr.open("POST", url, flag);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data)
    }
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                callback(xhr.responseText)
            }else {
                alert("error")
            }
        }
    }
}

var cookieTool = {
    setCookie : function (key, value, iDay) {
            var oDate = new Date();
            oDate.setDate( oDate.getDate() + iDay );
            document.cookie = key + '=' + value + ';expires=' + oDate;
            return this;
        },
    removeCookie : function (key) {
            setCookie(key, '', -1);
            return this;
        },
    getCookie : function (key, callBack) {
            var cookieArr = document.cookie.split('; ');
            var realCookie = null;
            var len = cookieArr.length;
            for(var i = 0; i < len; i++) {
                var arr = cookieArr[i].split('=');
                if(arr[0] === key) {
                    callBack(arr[1]);
                }
            }
            return this;
        }
}