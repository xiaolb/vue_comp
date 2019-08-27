
# comp
> 基于vue的后台管理组件UI

****
&nbsp;
# 发布
> 需要先npm run build 之后才执行npm publish 

****
&nbsp;
举个栗子：
```
// 安装@ui/vue_comp
npm i -D @ui/vue_comp

// 在主入口main.js里边
import vue_comp from '@ui/vue_comp'；
console.log(vue_comp) // 可以打印出当前应有的组件
Vue.use(vue_comp);
```
****
&nbsp;
# 使用
### ListPage (搜索及表格页面展示)
ListPage中包含两个组件SearchItem(搜索列表）和TableItem(列表展示）。
> 如果只需要使用其中的一个的话，可以单独使用SearchItem或TableItem。

| 所属组件 | 参数名 | 功能 | 类型 | 是否必传 | 默认值|
  :-:   |   :-:  |   :-:   |   :-:   |   :-:  |   :-:   |
| SearchItem |  formSearchItems | 搜索选项 | Array  |   | []
| SearchItem |  tableState | 表格的数据展示 | String  |   | ''
| SearchItem |  title | 当前页的title | String  |   | ''
| SearchItem |  formSearchWidth | 搜索时表单的宽度 | String  |   | ‘800px’
| SearchItem |  restButtons | 其他的操作按钮。新增之类的 | Array  |   | []
| SearchItem |  filterBtn | 筛选按钮(查询，筛选) | Array  |   | []
| |  |  |   |   | |
| 公用 |  searchParams | 搜索请求字段数据及表格分页数据 | Object  |  true | {}
| |  |  |   |   | |
| TableItem |  stripe | table表格是否有斑马线 | Boolean  |   | true
| TableItem |  tableTitle | table表格表头 | Array |  true | |
| TableItem |  tableData | table表格数据 | Array | true  | |
| TableItem |  searchList（table中会emit()） | 表格分页变化使用搜索函数 | Function | true  | |
| TableItem |  borderTable | table是否需要边框线 | Boolean  |   | true
| TableItem |  showHeader | 是否显示表头 | Boolean  |   | true
| TableItem |  uniqueSelect| 表格是否单选 | Boolean  |   | false
| TableItem |  mergeSpan | 合并行或列 | Function |   | ()=>{}

![列表样式.png](https://imgapi.apitops.com/V5/bigdata-mgr/20190826/f0e23cae72f04c1e9e42adca767c1933.png)
&nbsp;
****
&nbsp;
### SearchItem (搜索组件)
> 距离周边没有距离

| 参数名 | 功能 | 类型 | 可选值| 是否必传 | 默认值|
  :-:  |   :-:   |   :-:   |   :-:  |   :-:   |  :-:   |
|  formSearchItems | 搜索选项 | Array |  |   | []
|  tableState | 表格的数据展示（单独用的时候没有太大的必要） | String|  |   | ''
|  title | 当前页的title | String | |   | ''
|  formSearchWidth | 搜索时表单的宽度（刷选按钮：大于700占2，480-700占3，小于等于480占4） | String|  |   | ‘800px’
|  restButtons | 其他的操作按钮。新增之类的 | Array | |   | []
|  filterBtn | 筛选按钮(查询，筛选) | Array | |   | []
|  searchParams | 搜索请求字段数据及表格分页数据 | Object|  |  true | {}

![search.png](https://imgapi.apitops.com/V5/bigdata-mgr/20190826/e2cf63e5b1a94e2f820038aa0cd8d893.png)
&nbsp;
****
&nbsp;
### TableItem (表格页面)
> 距离周边没有距离

| 参数名 | 功能 | 类型 | 可选值| 是否必传 | 默认值|
   :-:  |   :-:   |   :-:   |   :-:  |   :-:   |  :-:   |
|  searchParams | 搜索请求字段数据及表格分页数据 | Object|  |  true | {}
|  stripe | table表格是否有斑马线 | Boolean|  |   | true
|  tableTitle | table表格表头 | Array| |  true | |
|  tableData | table表格数据 | Array| | true  | |
|  fromType| 从哪个地方过来（不同地方计算高度不一样） |String| other/listPage/form| |other |
|  searchList（table中会emit()） | 表格分页变化使用搜索函数 | Function| | true  | |
|  borderTable | table是否需要边框线 | Boolean|  |   | true
|  showHeader | 是否显示表头 | Boolean|  |   | true
|  uniqueSelect| 表格是否单选 | Boolean|  |   | false
|  mergeSpan | 合并行或列 | Function| |   | ()=>{}

#### tableTitle详细参数
| 参数名 | 功能 | 类型 | 可选值 | 是否必传|
   :-:  |   :-:   |   :-:   |   :-:  |  :-:  | 
|  type | 对应列的类型。如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮） | String| selection/index/expand | |
|  prop | table表格当前列的name(和tableData数据对应) | String |  | true  |
|  label | table表格当前列的展示值 | String | |  true | 
|  width | table表格当前列的宽度 | 	Number/String |   | |
|  align | 当前列是否居左(默认左) | String|left/center/right | |
|  sortable | 当前列是否排序(默认不排序)| Boolean |  | |
|  filterSort | 排序操作 |  Function |  | |
|  mergeColHeader | 表头合并（最多支持三级） | Array[Object] | ||
|  render | 需要自定义一些样式 |	Function(row) {} //row：当前行的数据| | |

#### searchParams详细参数
| 参数名 | 功能 | 类型 | 可选值 | 是否必传|
   :-:  |   :-:   |   :-:   |   :-:  |  :-:  | 
|  count | 分页总数（为0的时候不展示分页栏 | Number |  |true |
|  pageNo| 当前为第几页 | Number|  | true  |
|  pageSize| 每页的数据 | Number| |  true | 

![表格.png](https://imgapi.apitops.com/V5/bigdata-mgr/20190826/3dc447c5cf454580a5fb0e424d3af0db.png)
&nbsp;
****
&nbsp;
### ModalForm (模态框)
> 模态框支持两种形式（solt和属性传入）

![solt和属性传入.png](https://imgapi.apitops.com/V5/bigdata-mgr/20190826/6e421f684f8547bc858e571fe82c701f.png)
##### 属性传入的参数
| 参数名 | 功能 | 类型 | 可选值| 是否必传 | 默认值|
   :-:  |   :-:   |   :-:   |   :-:  |   :-:   |  :-:   |
|  title | dialog的标题 | String |  |   | ''
|  width | dialog的宽度 | String|  |   | '600px'
|  search | 是否是搜索（侧边滑出） | Boolean | |  | false
|  visible | 是否展示dialog | Boolean | |  true  | |
|  modalBtns | 重新命名按钮及事件 |Array| | |[]|
|  modalType|dialog里边是表单还是表格 |  String| | | "form"
|  formDialogItems | 表单项 | Array|  |   | []
|  formData| 表单数据 | Object|  |   | {}
|  saveDialogText | 保存按钮文本 | String |  |   | '确定'
|  allDisabled| 表单不可编辑 | Boolean| |   | false
|  nobtn| 没有操作按钮 | Boolean| |   | false
|  labelWidth | form 表单label宽度 | String | |   | '100px'
|  bottomFixed | 按钮是否悬浮 | Boolean| |   | false
|  saveDialog | 操作按钮事件（modal自带） | Function| | | |
|  onCancel | 操作按钮事件（modal自带 | Function| | | |

##### solt
| 参数名 | 功能 | 类型 | 可选值| 是否必传 | 默认值|
   :-:  |   :-:   |   :-:   |   :-:  |   :-:   |  :-:   |
|  width | dialog的宽度 | String|  |   | '600px'
|  search | 是否是搜索（侧边滑出） | Boolean | |  | false
|  visible | 是否展示dialog | Boolean | |  true  | |
|  saveDialogText | 保存按钮文本 | String |  |   | '确定'
|  nobtn| 没有操作按钮 | Boolean| |   | false

![upload.png](https://imgapi.apitops.com/V5/bigdata-mgr/20190826/f4465ede56a745dd8912d0f908e302e9.png)
&nbsp;
****
&nbsp;
### UploadItem (图片视频上传)

| 参数名 | 功能 | 类型 | 可选值| 是否必传 | 默认值|
   :-:  |   :-:   |   :-:   |   :-:  |   :-:   |  :-:   |
|  max | 最大上传数 | Number |  |   | 1
|  hint | 图片提示 (数组的时候多个，单个字符串)| Array, String |  |   | ''
|  flagType | 图片还是视频 | String| video/picture |  true | |
|  bindName | 展示的数据的名字 | String | | true  | |
|  disabled | 是否可编辑  |Boolean| | |false
|  formData | 绑定的数据 | Object| | | {}|
|  size| 大小限制 | Number|  |   | 10000
|  isFacePic | 是否展示封面图标 | Boolean|  |   | false
|  isWrite | 是否展示封面图标 | Boolean|  |   | false
|  isWriteFun  | 是否可写操作 | Function|  |   | () => {}
|  uploadAK | ak，上传的话是必须的 | String|  |  true | ''
|  uploadUrl  | 上传url | String|  |  true | ''

![upload.png](https://imgapi.apitops.com/V5/bigdata-mgr/20190826/acea627593814b2c98574c142f923447.png)
&nbsp;
****
&nbsp;
### UE (富文本)

| 参数名 | 功能 | 类型 | 可选值| 是否必传 | 默认值|
   :-:  |   :-:   |   :-:   |   :-:  |   :-:   |  :-:   |
|  defaultMsg | 默认值 | String |  |   | 
|  config | 配置参数 | Object |  |   | { initialFrameWidth: 900, initialFrameHeight: 550, }
|  id | 多个的时候 | String|  |   | |
|  formData | 数据由对象包裹 | Object | | true  | |
|  uploadAK | ak，上传的话是必须的 | String|  |  true | |
|  uploadUrl  | 上传url | String|  |  true | |

![ueditor.png](https://imgapi.apitops.com/V5/bigdata-mgr/20190826/3fd2f0457b6542b9b0e5635c0615bc3a.png)
&nbsp;
****
&nbsp;
### QRCode (二维码)

| 参数名 | 功能 | 类型 | 可选值| 是否必传 | 默认值|
   :-:  |   :-:   |   :-:   |   :-:  |   :-:   |  :-:   |
|  url | 需要生成的二维码的url | String|  |  true | |
|  id| 二维码Id，适用于多个| String |  |   | 'tops_qrcode'
|  qrState| 二维码说明 | String|  |   | ''

![二维码.png](https://imgapi.apitops.com/V5/bigdata-mgr/20190826/0d1e970ab68040dca04d45ff66d862c7.png)
&nbsp;
****
&nbsp;
### Map(地图)

| 参数名 | 功能 | 类型 | 可选值| 是否必传 | 默认值|
   :-:  |   :-:   |   :-:   |   :-:  |   :-:   |  :-:   |
|  disabled | 是否可搜索或点击地图 | Boolean|  |   | false|
|  placeholder | 默认提示文字 | String|  |   | |
|  bindData | 输入框的prop，用于绑定数据  | String|   |   true| |
|  formData | 筛选按钮(查询，筛选)的数据 | Object|  |   | {}|
|  bindName | 绑定经纬度的name[经度，纬度] | Array |  |  true | |
|  inputStyle  | input框设置样式 | Object|  |   | {}|
![map.png](https://imgapi.apitops.com/V5/bigdata-mgr/20190827/4bc1e48b1e7d496c9fabb38c264ba714.png)
&nbsp;
&nbsp;
****
&nbsp;
### FormItem (表单)

| 参数名 | 功能 | 类型 | 可选值| 是否必传 | 默认值|
   :-:  |   :-:   |   :-:   |   :-:  |   :-:   |  :-:   |
|  disabled | 是否可搜索或点击地图 | Boolean|  |   | false|
|  placeholder | 默认提示文字 | String|  |   | |
|  bindData | 输入框的prop，用于绑定数据  | String|   |   true| |
|  formData | 筛选按钮(查询，筛选)的数据 | Object|  |   | {}|
|  bindName | 绑定经纬度的name[经度，纬度] | Array |  |  true | |
|  inputStyle  | input框设置样式 | Object|  |   | {}|

&nbsp;
****
&nbsp;