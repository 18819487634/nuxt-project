
import { ImagePreview } from 'vant'

const Base64 = require('js-base64').Base64

class HqTool {
  constructor () {
    const self = HqTool
    this.version = '1.0.0'
    this.arrayAddingMethod()
    this.stringAddingMethod()
    this.domAddingMethod(self)
  }

  // prototype
  arrayAddingMethod () {
    /* eslint-disable */
        Array.prototype.removeRepeat = function () {
        return Array.from(new Set(this))
        }
        Array.prototype.newSort = function () {
        // 不传参数 则为正序 传递参数为倒序
        this.sort();
        if (arguments.length) this.reverse();
        }
    }
    stringAddingMethod () {
        String.prototype.wholeTrim = function () {
        return this.replace(/\s/g,"")
        }
    }
    domAddingMethod (self) {
        // 扩展一些必要的dom操作方法
        const domRelevant  = {
        getEle: function (str) {
            if (typeof str !== 'string') return str
            return document.querySelector(str)
        },
        getStyle: function (elObj, attr) {
            if (elObj.currentStyle) { // IE
            if (elObj.currentStyle[attr] === 'auto') {
                if (attr === 'height') {
                return elObj.offsetHeight
                } else if (attr === 'width') {
                return elObj.offsetWidth
                } else {
                }
            } else {
                return elObj.currentStyle[attr]
            }
            } else {
            return getComputedStyle(elObj, null)[attr]
            }
        },
        setStyle: function (elObj, attr, value) {
            if (elObj.length > 1) {
            for (let i = 0; i < elObj.length; i++) {
                let elObjEle = elObj[i]
                elObjEle.style[attr] = value
            }
            } else {
            elObj.style[attr] = value
            }
        },
        getAttr: function (el, name) {
            return el.getAttribute(name)
        },
        setAttr: function (el, name, val) {
            el.setAttribute(name, val)
        },
        isShow: function (elObj) {
            let display = this.getStyle(elObj, 'display')
            if (display === 'none') {
            return false
            } else {
            return true
            }
        },
        getElHeight: function (elObj) {
            if (elObj != null && this.isShow(elObj)) {
            return setHeight(this)
            } else {
            // 将元素显示出来 获取高度 再将元素隐藏掉
            elObj.style.display = 'block'
            let height = setHeight(this)
            elObj.style.display = 'none'
            return height
            }
            function setHeight (that) {
            // 当前元素display为block时
            if (elObj.style.height != null && elObj.style.height.length > 0) {
                // 从style中获取对应的高度
                return parseFloat(elObj.style.height)
            }
            if (parseFloat(that.getStyle(elObj, 'height')) > 0) {
                // 如果elObj.style.height为空  则从css里面获取是否定义了height信息如果定义了 则读取css里面定义的高度height
                return parseFloat(that.getStyle(elObj, 'height'))
            }
            // 如果从css里获取到的值不是大于0  可能是auto 则通过offsetHeight来进行计算
            if (elObj.offsetHeight > 0) {
                let h = 0
                let borderTopWidth = parseFloat(that.getStyle(elObj, 'borderTopWidth'))
                if (!isNaN(borderTopWidth)) {
                h = parseFloat(elObj.offsetHeight) - borderTopWidth
                }
                let borderBottomWidth = parseFloat(that.getStyle(elObj, 'borderBottomWidth'))
                if (!isNaN(borderBottomWidth)) {
                h = parseFloat(elObj.offsetHeight) - borderBottomWidth
                }
                let paddingTop = parseFloat(that.getStyle(elObj, 'paddingTop'))
                if (!isNaN(paddingTop)) {
                h = parseFloat(elObj.offsetHeight) - paddingTop
                }
                let paddingBottom = parseFloat(that.getStyle(elObj, 'paddingBottom'))
                if (!isNaN(paddingBottom)) {
                h = parseFloat(elObj.offsetHeight) - paddingBottom
                }
                return parseFloat(h)
            }
            return 0
            }
            // return parseFloat(elObj.style.height);
        },
        getElWidth: function (elObj) {
            if (elObj != null && this.isShow(elObj)) {
            return setWidth(this)
            } else {
            // 将元素显示出来 获取高度 再将元素隐藏掉
            elObj.style.display = 'block'
            let width = setWidth(this)
            elObj.style.display = 'none'
            return width
            }

            function setWidth (that) {
            // 当前元素display为block时
            if (elObj.style.width != null && elObj.style.width.length > 0) {
                // 从style中获取对应的高度
                return parseFloat(elObj.style.width)
            }
            if (parseFloat(that.getStyle(elObj, 'width')) > 0) {
                // 如果elObj.style.height为空  则从css里面获取是否定义了height信息如果定义了 则读取css里面定义的高度height
                return parseFloat(that.getStyle(elObj, 'width'))
            }
            // 如果从css里获取到的值不是大于0  可能是auto 则通过offsetHeight来进行计算
            if (elObj.offsetHeight > 0) {
                let h = 0
                let borderLeftWidth = parseFloat(that.getStyle(elObj, 'borderLeftWidth'))
                if (!isNaN(borderLeftWidth)) {
                h = parseFloat(elObj.offsetWidth) - borderLeftWidth
                }
                let borderRightWidth = parseFloat(that.getStyle(elObj, 'borderRightWidth'))
                if (!isNaN(borderRightWidth)) {
                h = parseFloat(elObj.offsetWidth) - borderRightWidth
                }
                let paddingLeft = parseFloat(that.getStyle(elObj, 'paddingLeft'))
                if (!isNaN(paddingLeft)) {
                h = parseFloat(elObj.offsetWidth) - paddingLeft
                }
                let paddingRight = parseFloat(that.getStyle(elObj, 'paddingRight'))
                if (!isNaN(paddingRight)) {
                h = parseFloat(elObj.offsetWidth) - paddingRight
                }
                return parseFloat(h)
            }
            return 0
            }
        },
        animation: function (obj) {
            /*
            animation({
            el: 元素,
            attrs:{
            属性名称:值
            },
            speed:速度,
            callback:function () {
            回调
            }
        })
        */
            let el = obj.el
            let json = obj.attrs
            let speed = obj.speed
            let callback = obj.callback
            let that = this
            clearInterval(el.timer)
            let boxSizing = that.getStyle(el, 'boxSizing')
            if (boxSizing === 'border-box') {
            that.setStyle(el, 'boxSizing', 'initial')
            }
            el.timer = setInterval(function () {
            let flag = true // 用来判断是否停止定时器
            for (let attr in json) {
                // attr  属性     json[attr]  值
                // 计算步长  目标位置 减去当前的位置  除以 10
                let current = 0
                if (attr === 'opacity') {
                current = Math.round(parseInt(that.getStyle(el, attr) * 100)) || 0
                } else {
                current = parseInt(that.getStyle(el, attr)) // 数值
                }
                // 目标位置就是  属性值
                let step = (json[attr] - current) / 10 // 步长  用目标位置 - 现在的位置 / 10
                step = step > 0 ? Math.ceil(step) : Math.floor(step)
                // 判断透明度
                if (attr === 'opacity') {
                // 判断用户有没有输入 opacity
                if ('opacity' in el.style) {
                    // 判断 我们浏览器是否支持opacity
                    el.style.opacity = (current + step) / 100
                } else {
                    // ie8下 处理
                    current = json[attr]
                    // el.style.filter = alpha(opacity = 30)
                    el.style.filter = 'alpha(opacity = ' + (current + step) * 10 + ')'
                }
                } else if (attr === 'zIndex') {
                // z-index
                el.style.zIndex = json[attr]
                } else {
                el.style[attr] = current + step + 'px'
                }
                if (current !== Number(json[attr])) {
                // 只要其中一个不满足条件 就不应该停止定时器
                flag = false
                }
            }
            if (flag) {
                clearInterval(el.timer)
                if (boxSizing === 'border-box') {
                that.setStyle(el, 'boxSizing', 'border-box')
                }
                typeof callback === 'function' && callback(el)
            }
            }, speed)
        },
        slideToggle: function (obj) {
            /*
            slideToggle({
            el: '',
            speed: 13,
            callback (isShow) {
            }
            })
            */
            let self = this
            let el = obj.el || ''
            self.el = self.getEle(el)
            self.speed = 13
            if (obj.speed < 30) {
            self.speed = obj.speed
            }
            self.cb = obj.callback
            self.setStyle(self.el, 'overflow', 'hidden')
            let h = self.getElHeight(self.el)
            let display = self.getStyle(self.el, 'display')
            let newH = h
            if (h > 0 && display !== 'none') {
            newH = 0
            } else {
            // 需要展示
            if (h <= 0) {
                h = self.getAttr(self.el, 'currentH')
            }
            newH = h
            self.setStyle(self.el, 'display', 'block')
            self.setStyle(self.el, 'height', 0)
            }
            newH = Number(newH)
            newH = newH.toFixed(0)
            self.animation({
            el: self.el,
            attrs: {
                height: newH
            },
            speed: self.speed,
            callback: function () {
                if (h > 0) {
                self.setAttr(self.el, 'currentH', h)
                }
                if (newH > 0) {
                typeof self.cb === 'function' && self.cb(true)
                } else {
                typeof self.cb === 'function' && self.cb(false)
                }
            }
            })
        }
        }
        self.prototype.getEle = function (str) {
        return domRelevant.getEle(str)
        }
        self.prototype.getAttr = function (el, name) {
        domRelevant.getAttr(el, name)
        }
        self.prototype.setAttr = function (el, name, val) {
        domRelevant.setAttr(el, name, val)
        }
        self.prototype.getElHeight = function (el) {
        return domRelevant.getElHeight(el)
        }
        self.prototype.animation = function (obj) {
        domRelevant.animation(obj)
        }
        self.prototype.slideToggle = function (obj) {
        domRelevant.slideToggle(obj)
        }
        self.prototype.hasClass = function ( elements,cName ){
        return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") );
        };
    }
    // fn
    isString (str) {
        return typeof str === "string"
    }
    jsonStr (str) {
        if (typeof str === 'string') {
        try {
            let obj = JSON.parse(str)
            if (typeof obj === 'object' && obj) {
            return true
            } else {
            return false
            }
        } catch (e) {
            return false
        }
        } else {
        return false
        }
    }
    isFn (fn) {
        if (typeof fn === 'function') return true
        return false
    }
    isObj (obj) {
        const type = Object.prototype.toString.call(obj)
        if (type === '[object Object]') {
        return true
        }
        return false
    }
    emptyObject (obj) {
        // 是否为空对象
        const arr = Object.keys(obj);
        if (arr.length == 0) return true
        return false
    }
    isArray(arg){
        if (typeof arg === 'object') return Object.prototype.toString.call(arg) === '[object Array]'
        return false
    }
    isNull (str) {
        if (str === null || str ==='null') return true
        return false
    }
    isUndefined (str) {
        if (str === undefined || str ==='undefined') return true
        return false
    }
    isJsonStr (str) {
        if (typeof str === 'string') {
        try {
            let obj = JSON.parse(str)
            if (typeof obj === 'object' && obj) {
            return true
            } else {
            return false
            }
        } catch (e) {
            return false
        }
        } else {
        return false
        }
    }
    iosDateStr (dateStr) {
        // ios时间格式件兼容
        return dateStr.replace(/-/g, '/')
    }
    countDown (timeStamp) {
        /**
         *倒计时
        * @param timeStamp 结束时间戳 或者 结束时间
        * * @returns {string} s
        */
        // 当前时间戳
        let curTimeStamp = new Date().getTime()
        // 结束时间戳
        const reg =/\D/g
        if (reg.test(timeStamp)) {
        timeStamp = new Date(timeStamp).getTime()
        }
        let endTimeStamp = timeStamp
        // 获取剩下的时间戳
        let Leftover = endTimeStamp - curTimeStamp
        // 将剩下的时间戳转为秒
        let overSecond = Math.floor(Leftover / 1000)
        // 秒转为天
        let D = Math.floor(overSecond / 60 / 60 / 24)
        // 余数代表剩下的秒数；
        overSecond = overSecond % (60 * 60 * 24)
        // 秒转为 时
        let h = Math.floor(overSecond / 60 / 60)
        // 余数代表 剩下的秒数；
        overSecond %= 3600
        // 秒转为 分
        let m = Math.floor(overSecond / 60)
        // 余数代表秒
    //    overSecond %= 60;
        let s = overSecond % 60
        // 补零操作
        D = D < 10 ? '0' + D : D
        h = h < 10 ? '0' + h : h
        m = m < 10 ? '0' + m : m
        s = s < 10 ? '0' + s : s
        // 返回值容错处理
        if (D === '00') {
        return h + ':' + m + ':' + s
        }
        return D + '天 ' + h + ':' + m + ':' + s
    }
    getUrlKey(name){
        /* eslint-disable */
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        let r = window.location.search.substr(1).match(reg)
        if (r != null) {
        let regExp = /^[\u4e00-\u9fa5]+$/g
        let str = unescape(r[2])
        if (str.match(regExp)) {
            return str
        } else {
            // 处理 beat64编码后 获取后无法处理+ 和替换 '\n'
            str = str.replace(/\\n/g, "")
            return str.replace(/\s/g,"+")
        }
        }
        // 没有返回空
        return '';
    }
    getCookie (name) {
        // (^| )name=([^;]*)(;|$),match[0]为与整个正则表达式匹配的字符串，match[i]为正则表达式捕获数组相匹配的数组；
        let arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null) {
        return unescape(arr[2]);
        }
        return null;
    }
    setCookie(name, value, seconds) {
        seconds = seconds || 86400;   // 86400 默认一天
        let expires = "";
        if (seconds !== 0) {      //设置cookie生存时间
        let date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + escape(value) + expires + "; path=/";   //转码并赋值
    }
    delCookie (name) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval=this.getCookie(name)
        if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
    clearCookie () {
        let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
        for (let i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .kevis.com
        }
        }
    }
    setLocalStorage(key, value) {
        if (typeof value ==='object') {
        value = JSON.stringify(value)
        }
        localStorage.removeItem(key);
        localStorage.setItem(key, value);
    }
    getLocalStorage (key) {
        return localStorage.getItem(key)
    }
    delLocalStorage(key){
        return localStorage.removeItem(key)
    }
    clearLocalStorage() {
        localStorage.clear();
    }
    setSessionStorage(key, value) {
        this.removeSessionStorage(key)
        window.sessionStorage.setItem(key, value)
    }
    getSessionStorage(key) {
        return window.sessionStorage.getItem(key)
    }
    removeSessionStorage(key) {
        window.sessionStorage.removeItem(key)
    }
    clearSessionStorage() {
        window.sessionStorage.clear()
    }
    imgSrc(str){
        // http://tiku.hqjy.com//Upload/image/20140913/20140913170832_8644.jpg
        let startReg = /http:|https:/ig
        let imgReg = /src/
        // 不需要处理的图片路径
        if (imgReg.test(str) && startReg.test(str)) return str
        let reg1 = /src="/g
        let reg2 = /src='/g
        let res = ''
        let imgCdn = `src="http://tiku.hqjy.com/`
        let cdn = `http://tiku.hqjy.com/`
        if (reg1.test(str)) {
        res = str.replace(reg1, imgCdn)
        } else if (reg2.test(str)) {
        res = str.replace(reg2, imgCdn)
        } else {
        const regImgSrc = /^(\s|\S)+(jpg|png|JPG|PNG)+$/
        if (regImgSrc.test(str)) {
            let newImg = `<img src="${cdn + str}" />`
            if (startReg.test(str)) {
            newImg = `<img src="${str}" />`
            } else {
            newImg = `<img src="${cdn + str}" />`
            }
            res = newImg
        } else {
            res = str
        }
        }
        return res
    }
    imgEnlargeMax(target){
        // 图片缩放
        let tag = target.srcElement
        if (!tag || !tag.src) return
        ImagePreview({
            images:[tag.src],
            showIndex: false,
            showIndicators: false,
            loop: false,
            className: 'vantImagePreview'
        })
    }
    numberToChinese(num){
        // 返回中文数子
        let chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
        let chnUnitSection = ["","万","亿","万亿","亿亿"];
        let chnUnitChar = ["","十","百","千"];
        let unitPos = 0;
        let strIns = '', chnStr = '';
        let needZero = false;

        if(num === 0){
        return chnNumChar[0];
        }

        while(num > 0){
        let section = num % 10000;
        if(needZero){
            chnStr = chnNumChar[0] + chnStr;
        }
        strIns = SectionToChinese(section);
        strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
        chnStr = strIns + chnStr;
        needZero = (section < 1000) && (section > 0);
        num = Math.floor(num / 10000);
        unitPos++;
        }
        return chnStr;
        function SectionToChinese(section){
        let strIns = '', chnStr = '';
        let unitPos = 0;
        let zero = true;
        while(section > 0){
            let v = section % 10;
            if(v === 0){
            if(!zero){
                zero = true;
                chnStr = chnNumChar[v] + chnStr;
            }
            }else{
            zero = false;
            strIns = chnNumChar[v];
            strIns += chnUnitChar[unitPos];
            chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
        }
    }
    chineseToNumber(chnStr){
        //  返回阿拉伯数子
        let chnNumChar = {
        零:0,
        一:1,
        二:2,
        三:3,
        四:4,
        五:5,
        六:6,
        七:7,
        八:8,
        九:9
        };
        let chnNameValue = {
        十:{value:10, secUnit:false},
        百:{value:100, secUnit:false},
        千:{value:1000, secUnit:false},
        万:{value:10000, secUnit:true},
        亿:{value:100000000, secUnit:true}
        }
        let rtn = 0;
        let section = 0;
        let number = 0;
        let secUnit = false;
        let str = chnStr.split('');

        for(let i = 0; i < str.length; i++){
        let num = chnNumChar[str[i]];
        if(typeof num !== 'undefined'){
            number = num;
            if(i === str.length - 1){
            section += number;
            }
        }else{
            let unit = chnNameValue[str[i]].value;
            secUnit = chnNameValue[str[i]].secUnit;
            if(secUnit){
            section = (section + number) * unit;
            rtn += section;
            section = 0;
            }else{
            section += (number * unit);
            }
            number = 0;
        }
        }
        return rtn + section;
    }
    moneyRegExp = (val) => {
        let regExp = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
        if (regExp.test(val)) {
        return true
        }
        return false
    }
    base64Cncode (str) {
        // 编码
        return Base64.encode(str)
    }
    base64Decode (str) {
        // 解码
        return Base64.decode(str)
    }
    urlParamsIsObj (search) {
        const queryString = (search && search.split('?')[1]) || location.search.split('?')[1] || ''
        const queryList = queryString.split('&')
        let result = {}
        queryString && queryList.map((item) => {
        let keyValue = item.split('=')
        result[keyValue[0]] = decodeURIComponent(keyValue[1])})
        return result
    }
    objIsUrlParams (obj) {
        // 将对象转为 a=1&b=2 形式
        return Object.entries(obj).reduce((arr, [k, v]) => arr.concat(encodeURIComponent(k) + '=' + encodeURIComponent(v)), []).join('&')
    }
    openPage (url,ParamsObj) {
        if (this.isObj(ParamsObj) && !this.emptyObject(ParamsObj)) {
        window.location.href = `${url}?${this.objIsUrlParams(ParamsObj)}`
        }else {
        window.location.href = `${url}`
        }

    }
    setBarStatus (el, contentEl, cb) {
        if (this.isUndefined(el) || this.isUndefined(contentEl))  return false
        const self = this
        let maxH = 220
        if (window.Vm.$appSdk.terminalType === 'Android' ) {
        maxH = 180
        }
        const imgs = contentEl.querySelectorAll('img')
        if (!imgs.length) {
        const h = this.getElHeight(el)
        self.isFn(cb) && cb(h > maxH)
        }  else {
        for (let i = 0; i < imgs.length; i++) {
            const img = imgs[i];
            img.onload = () => {
            const h = this.getElHeight(el)
            self.isFn(cb) && cb(h > maxH)
            }
            img.onerror = () => {
            const h = this.getElHeight(el)
            self.isFn(cb) && cb(h > maxH)
            }
        }
        }

    }
    formatDate(time, str) {
        /*
        *格式化时间 如果传了时间戳 就用时间戳 如果没传入 就用当前的时间戳
        * @param time 时间戳
        * @param str {'h:m:s' :只转时间, 'YY:MM:DD': 只转日期}
        * @returns {string}
        */
        time = time - 0
        let Time = time ? new Date(time) : new Date();
        let year = Time.getFullYear();
        let month = Time.getMonth() + 1;
        let date = Time.getDate();
        date = date < 10 ? '0' + date : date;
        let hour = Time.getHours();
        let minute = Time.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        let second = Time.getSeconds();
        second = second < 10 ? '0' + second : second;
        if (str === 'h:m:s') {
        // 只转时间
        return hour + ':' + minute + ':' + second;
        } else if (str === 'YY:MM:DD') {
        // 只转日期
        return year + '-' + month + '-' + date
        }
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    }
    removeHtmlTag(str, tagArr) {
        // 过滤字符串中的html标签
        /*
        str: 字符串
        tagArr: [] 需要保留的标签数组 需要过滤全部 则传递一个空数组  例: removeHtmlTag(str,['p','img'])
        */
        let tagName = '';
        let newStr = ''
        if (tagArr.length) {
        for (let i = 0; i < tagArr.length; i++) {
            let tag = tagArr[i]
            let newTag = tag.trim()
            switch (newTag) {
            case 'img':
            case 'br':
            case 'hr':
            case 'link':
            case 'input':
            case 'source':
                // 自闭合标签
                tagName += newTag+'|'
                break
            default:
                tagName += newTag + '|\/' + newTag+'|';
            }
        }
        tagName = tagName.substring(0,tagName.length-1)
        let reg = new RegExp('<(?!' + tagName + ').*?>', 'gi')
        newStr = str.replace(reg, '')
        } else {
        let reg = new RegExp('<.*?>', 'gi')
        newStr = str.replace(reg, '')
        }
        return newStr
    }
    emojiStatus (val) {
        let reg2=/([\u00A9\u00AE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9-\u21AA\u231A-\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA-\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614-\u2615\u2618\u261D\u2620\u2622-\u2623\u2626\u262A\u262E-\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665-\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B-\u269C\u26A0-\u26A1\u26AA-\u26AB\u26B0-\u26B1\u26BD-\u26BE\u26C4-\u26C5\u26C8\u26CE-\u26CF\u26D1\u26D3-\u26D4\u26E9-\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733-\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934-\u2935\u2B05-\u2B07\u2B1B-\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70-\uDD71\uDD7E-\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01-\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50-\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96-\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF])|(\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F-\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95-\uDD96\uDDA4-\uDDA5\uDDA8\uDDB1-\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB-\uDEEC\uDEF0\uDEF3-\uDEF6])|(\uD83E[\uDD10-\uDD1E\uDD20-\uDD27\uDD30\uDD33-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4B\uDD50-\uDD5E\uDD80-\uDD91\uDDC0])/g;
        if (reg2.test(val)){
        // alert('有表情')
        return true
        }else {
        // alert('没')
        return false
        }
    }
    iOSBlurSetScrollTop () {
        document.body.scrollTop = 0
        return false
    }
    // 输入框失焦 ios 弹出bug修复
    textareaBlur (windowHeight) {
        let windowFocusHeight = window.innerHeight
        if (windowHeight === windowFocusHeight) {
            return
        }
        let currentPosition
        let speed = 1 // 页面滚动距离
        currentPosition = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        currentPosition -= speed
        window.scrollTo(0, currentPosition) // 页面向上滚动
        currentPosition += speed // speed变量
        window.scrollTo(0, currentPosition) // 页面向下滚动
    }
    stringTrim(val){
        return val.replace(/^\s+|\s+$/gm,'')
    }
    // 报错提示统一处理
    apiErr (name, err) {
        console.log(`[ ${name} ]`, 'error: ', err)
    }
    checkVersion() {
        let u = navigator.userAgent;
        //app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信
            qq: u.match(/\sQQ/i) == " qq", //是否QQ
            //app: u.indexOf('') > -1 //是否在app内
        };
    }
    // 下载app
    appDownload () {
        let version = this.checkVersion();
        let url = ''
        if (!version.ios) {
            url = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.kjcity.answer.student';
            // window.location.href = "android://com.kjcity.answer.student/open";// 尝试打开app
        } else { // ios端
            url = `https://itunes.apple.com/us/app/hui-da/id1064833923?l=zh&ls=1&mt=8` // APPstore 地址
        }
        window.location.href = url
    }
}
export default new HqTool()
