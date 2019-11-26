let Element, Vue;
if ('development' === process.env.NODE_ENV) {
    require('./ueditor.config');
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

const TopsForm = Form,
    TopsQRCode = QRCode,
    TopsModalForm = ModalForm,
    TopsListPage = ListPage,
    TopsSearchItem = SearchItem,
    TopsTableItem = TableItem,
    TopsWrapper = Wrapper,
    TopsUpload = Upload,
    TopsUE = UE,
    TopsMapItem = MapItem;

let components = [UE, Form, QRCode, ListPage, SearchItem, ModalForm, TableItem, Upload, Wrapper, MapItem];
components = components.concat(
    components.map(item => {
        return {
            ...item,
            name: `Tops${item.name}`,
        };
    })
);

const install = function(Vue, opts = {}) {
    components.map(component => {
        Vue.component(component.name, component);
    });
};

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

window.topsTableChangeHeight = [];
window.topsGetModalScrollHeight = [];
window.topsBottomFixedWidth = [];

const onWindowResize = () => {
    for (const item of window.topsTableChangeHeight) {
        item.func();
    }
    for (const item of window.topsGetModalScrollHeight) {
        item.func();
    }
    for (const item of window.topsBottomFixedWidth) {
        item.func();
    }
};

// 添加window 的resize事件监听 防止项目工程中冲突
window.addEventListener('resize', onWindowResize);
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
    TopsForm,
    TopsQRCode,
    TopsModalForm,
    TopsListPage,
    TopsSearchItem,
    TopsTableItem,
    TopsWrapper,
    TopsUpload,
    TopsUE,
    TopsMapItem,
};
