import _ from 'lodash';
import QRCode from 'qrcode';


export const isEmptyObject = (options) => {
    return options !== null && Object.keys(options).length === 0;
}

/**
   * [flatten Flatten an array, eg below:
   *           input: var array = [[1, 2, 3], [4, 5, 6], 7, [8]]
   *           call: Util.flatten(array);
   *           output: [1, 2, 3, 4, 5, 6, 7, 8]
   *           
   * @Author   mapleLeaf
   * @DateTime 2016-11-02T16:47:20+0800
   * @param    {[type]}                     array [description]
   * @return   {[type]}                           [description]
   */
export const flatten = (array) => {
    let ret = [];
    array.forEach(function (item) {
        if (Array.isArray(item)) {
            ret = ret.concat(flatten(item));
        } else {
            ret.push(item);
        }
    });

    return ret;
};

/**
* @method 防抖函数
* @param {string} key 定时的值
* @param {number} delay 多少秒执行一次时间
*/
export const debounceWork = (key, delay = 300) => {
    let prevTime = sessionStorage.getItem(key);
    let now = new Date().getTime();

    if (!prevTime) {
        sessionStorage.setItem(key, now);
        return true;
    } else {
        if (now > Number(prevTime) + delay) {
            sessionStorage.setItem(key, now);
            return true
        }
        return false;
    }
}

let QRCodecount = 0;
export const creatQRCode = (url) => {
    let resStr = ''
    QRCode.toString(url, function (err, string) {
        if (err) {
            QRCodecount++;
            if (QRCodecount > 5) {
                throw err;
            } else {
                creatQRCode(url);
            }
        }
        resStr = string;
    })
    return resStr;
}