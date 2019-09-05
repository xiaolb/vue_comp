let Element, Vue;
require('@static/UE/ueditor.config.js');
require('@static/UE/ueditor.all.js');
require('@static/UE/lang/zh-cn/zh-cn.js');
require('@static/UE/ueditor.parse.min.js');
if ('development' === process.env.NODE_ENV) {
    Vue = require('vue');
    Element = require('element-ui');
    require('element-ui/lib/theme-chalk/index.css');
    Vue.default.use(Element);
}

import Form from '@/components/form/index.js';
import QRCode from '@/components/qrcode/index.js';
import ListPage from '@/components/listPage/index.js';
import ModalForm from '@/components/modalForm/index.js';
import SearchItem from '@/components/search/index.js';
import TableItem from '@/components/table/index.js';
import Upload from '@/components/upload/index.js';
import UE from '@/components/ue/index.js';
import MapItem from '@/components/map/index.js';
import Wrapper from '@/components/wrapper.vue';

const components = [UE, Form, QRCode, ListPage, SearchItem, ModalForm, TableItem, Upload, Wrapper, MapItem];

const install = function(Vue, opts = {}) {
    components.map(component => {
        Vue.component(component.name, component);
    });
};

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

window.onresize = () => {
    window.tableChangeHeight && window.tableChangeHeight();
    window.getModalScrollHeight && window.getModalScrollHeight();
};

export default {
    install,
    Form,
    QRCode,
    ModalForm,
    ListPage,
    SearchItem,
    TableItem,
    Wrapper,
    Upload,
    UE,
    MapItem,
};
