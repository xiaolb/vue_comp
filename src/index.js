import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import Vue from 'vue';
import '../static/UE/ueditor.config.js';
import '../static/UE/ueditor.all.js';
import '../static/UE/lang/zh-cn/zh-cn.js';
import '../static/UE/ueditor.parse.min.js';

import Form from '@/components/form/index.js';
import QRCode from '@/components/qrcode/index.js';
import ListPage from '@/components/listPage/index.js';
import ModalForm from '@/components/modalForm/index.js';
import SearchItem from '@/components/search/index.js';
import TableItem from '@/components/table/index.js';
import Upload from '@/components/upload/index.js';
import UE from '@/components/ue/index.js';
import Wrapper from '@/components/wrapper.vue';
Vue.use(Element);
const components = [Form, QRCode, ListPage, SearchItem, ModalForm, TableItem, Upload, Wrapper, UE];

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  console.log(22222);
  install(window.Vue);
}

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
};
