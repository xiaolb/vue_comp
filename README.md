
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
### Wrapper（导航栏）
>支持一级二级三级导航。
```
const faMenus = [
    {
        href: '/listPage',
        menuId: '1',
        menuName: '一级导航',
        sonMenus: [],
    },
    {
        href: '',
        menuId: '2',
        menuName: '二级导航',
        sonMenus: [
            {
                href: '/listPage',
                menuId: '2-1',
                menuName: '二级导航',
                sonMenus: [],
            },
        ],
    },
    {
        href: '',
        menuId: '3',
        menuName: '三级导航',
        sonMenus: [
            {
                href: '',
                menuId: '3-1',
                menuName: '三级导航',
                sonMenus: [
                    {
                        href: '/listPage',
                        menuId: '3-1-1',
                        menuName: '三级导航',
                        sonMenus: [],
                    },
                ],
            },
        ],
    },
];
```
&nbsp;
****
&nbsp;
### ListPage (搜索及表格页面展示)
ListPage中包含两个组件SearchItem(搜索列表）和TableItem(列表展示）。
> 如果只需要使用其中的一个的话，可以单独使用SearchItem或TableItem。

| 所属组件 | 参数名 | 功能 | 类型 | 是否必传 | 默认值|
  :-:   |   :-:  |   :-:   |   :-:   |   :-:  |   :-:   |
| SearchItem |  formSearchItems | 搜索选项(详细字段见formItem) | Array[Objec]  |   | []
| SearchItem |  tableState | 表格的数据展示 | String  |   | ''
| SearchItem |  title | 当前页的title | String  |   | ''
| SearchItem |  formSearchWidth | 搜索时表单的宽度 | String  |   | ‘800px’
| SearchItem |  restButtons | 其他的操作按钮。新增之类的 | Array  |   | []
| SearchItem |  filterBtn | 筛选按钮(查询，筛选) | Array  |   | []
| |  |  |   |   | |
| 公用 |  searchParams | 搜索请求字段数据及表格分页数据 | Object  |  true | {}
| |  |  |   |   | |
| TableItem |  stripe | table表格是否有斑马线 | Boolean  |   | true
| TableItem |  tableTitle | table表格表头(详细字段见tableItem)  | Array[Objec]|  true | |
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
|  formSearchItems |  搜索选项(详细字段见formItem) | Array |  |   | []
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
|  count | 分页总数（为0的时候不展示分页栏） | Number |  |true |
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
|  formDialogItems | 表单项（详细见FormItem） | Array|  |   | []
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
|  isWrite | 是否展示可写图标 | Boolean|  |   | false
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
|  formData | 放置map数据 | Object|  |   | {}|
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
|  formItems | 表单选项 | Array[Object]|  |  true | |
|  formData | 表单数据 | Object|  |   | {}|
|  allDisabled | 表单是否禁止编辑  | Boolean|   |  |false |
|  saveBtn | 是否显示保存按钮 | Boolean |  |   | false|
|  saveBtnText | 操作保存按钮文本样式 | String |  |  |保存 |
|  cancelBtn | 是否展示取消按钮 | Boolean |  |   | false|
|  cancelBtnText | 操作取消按钮文本样式 | String |  |  |取消|
|  labelWidth  | 表单域标签的宽度 | String |  |   | 150px|
|  buttons | 其他的自定义操作 | Array[Object] |  |   | [] |
|  formSearchWidth | 搜索时表单的宽度，默认800 | String |  |   | 800px|
|  flexleftOrCenter | 表单位置 | String | left/cente  |   | left|
|  bottomFixed | 按钮悬浮 | Boolean|  |   | false|

#### FormItems 公共字段

```
let common = {
    name: 'common', // 绑定数据的名字
    label: '公用', // 展示label
    /**
     * type的类型
     *  cut/ checkboxs/ input/ number/
     *  date/ textarea/ switch/ radio/ 
     *  table/ tag /ue / map
     *  autocomplete/ cascader/ select/twoDate/ 
     *  videoOrPicture/ handleClick/ 
     * */   
    type: 'common', // 对应的type组件
    span: 12, // 当前宽度的多少份，24为100%
    hidden: false, // 是否隐藏当前item
    labelWidth: '140px', // 当前item的宽度，没有的话用form的labelWidth
    disabled: false, // 是否不可编辑
    placehold: '', // 提示语
    required: true, // 是否必填
    inputStyle: {
        // item的样式编写
        width: '360px',
    },
};
```

#### type=cut
```
{
    ...common,
    name: 'cut',
    labelWidth: '0px',
    label: '分隔符',
    type: 'cut',
    cutName: '分隔符', // 分割标题
    btnTitle: '编辑', // 操作字段
    btnFuntion: () => {
        // 操作函数
        console.log('操作按钮');
    },
},
```

#### type=checkboxs
```
{
    ...common,
    name: 'checkboxs',
    label: '复选框',
    type: 'checkboxs',

    rowOrColumn: false, // flex的方向，有connect或extra时用
    column: false, // 复选框竖着
    data: [
        // 可选项数据源，键名可通过 Props 属性配置
        { value: 'value', label: 'label' },
        { itemValue: 'itemValue', itemLabel: 'itemLabel' },
        { paramValue: 'paramValue', paramName: 'paramName' },
        { id: 'id', name: 'name' },
    ],
    selectFun: value => {
        // 选择事件
        console.log(value);
    },

    connect: '补充', // 符号什么 一到两字
    extra: '补充说明', // 补充说明
    extraStyle: {
        color: '#00ff00',
    }, //extra样式补充
    extraFun: () => {
        console.log('点击事件');
    },
},
```
#### type=input
```
{
    ...common,
    name: 'input',
    label: '输入框',
    type: 'input',

    rowOrColumn: false, // flex的方向，有connect或extra时用
    maxLength: 20, // 最大数量
    minLength: 10, // 最小数量
    clearable: true, // 是否可清除
    change: value => {
        // 字段变换的函数
        console.log(value, '失去焦点之后');
    },
    append: true, // 是否有slot,输入框的操作
    appendFun: () => {
        // 和append配套操作
        console.log('other thing');
    },
    connect: '补充', // 符号什么 一到两字
    extra: '补充说明', // 补充说明
    extraStyle: {
        color: '#00ff00',
    }, //extra样式补充
    extraFun: () => {
        console.log('点击事件');
    },
},
```
#### type=number
```
{
    ...common,
    name: 'number',
    label: '数字框',
    type: 'number',

    rowOrColumn: false, // flex的方向，有connect或extra时用
    maxi: 20, // 最大数
    mini: 10, // 最小数
    precision: 2, // 几位小数

    connect: '补充', // 符号什么 一到两字
    extra: '补充说明', // 补充说明
    extraStyle: {
        color: '#00ffff',
    }, //extra样式补充
    extraFun: () => {
        console.log('点击事件');
    },
},
```

#### type=autocomplete
```
{
    ...common,
    name: 'autocomplete',
    label: '自动匹配',
    type: 'autocomplete',

    rowOrColumn: false, // flex的方向，有connect或extra时用
    clearable: true, // 是否可清除
    querySearchAsync: (filterVaule, cb) => {
        // 搜索操作
        console.log('模糊搜索操作', filterVaule, cb);
    },
    selectFun: value => {
        // 当前选中的值
        console.log(value);
    },

    connect: '补充', // 符号什么 一到两字
    extra: '补充说明', // 补充说明
    extraStyle: {
        color: '#f0f',
    }, //extra样式补充
    extraFun: () => {
        console.log('点击事件');
    },
},
```

#### type=cascader
```
{
    ...common,
    name: 'cascader',
    label: '级联',
    type: 'cascader',

    rowOrColumn: false, // flex的方向，有connect或extra时用
    data: cascaderData, // 可选项数据源，键名可通过 Props 属性配置
    props: {
        // 配置选项，具体见element级联Props
        children: 'allDistrictDTOList',
        value: 'districtId',
        label: 'districtName',
    },
    debounce: 300, // 搜索关键词输入的去抖延迟，毫秒
    filterable: true, // 是否可搜索选项
    size: 'small', // 尺寸，默认medium
    separator: '', // 分隔符 默认/
    clearable: true, // 是否可清除
    change_on_select: true, // 是否允许选择任意一级的选项
    selectFun: value => {
        //当绑定值变化时触发的事件
        console.log(value);
    },

    connect: '补充', // 符号什么 一到两字
    extra: '补充说明', // 补充说明
    extraStyle: {
        color: '#f0f',
    }, //extra样式补充
    extraFun: () => {
        console.log('点击事件');
    },
},
```

#### type=select
```
{
    ...common,
    name: 'select',
    label: '选择',
    type: 'select',

    rowOrColumn: false, // flex的方向，有connect或extra时用
    multiple: true, // 是否可多选
    multipleLimit: 2, // 多选限制
    allowCreate: true, // 是否允许创建
    filterable: true, // 是否可搜索
    clearable: true, // 是否可清除
    data: [
        { value: 'value', label: 'label' },
        { itemValue: 'itemValue', itemLabel: 'itemLabel' },
        { paramValue: 'paramValue', paramName: 'paramName' },
        { id: 'id', name: 'name' },
    ], // 可选项数据源，键名可通过 Props 属性配置
    // filterSearch: () => {}, // 远程搜索
    selectFun: value => {
        console.log(value);
    }, // 选择函数

    connect: '补充', // 符号什么 一到两字
    extra: '补充说明', // 补充说明
    extraStyle: {
        color: '#f0f',
    }, //extra样式补充
    extraFun: () => {
        console.log('点击事件');
    },
},
```

#### type=twoDate
```
{
    ...common,
    name: 'twoDate', // 开始时间 begintwoDate， 结束时间 endtwoDate
    label: '两个时间',
    type: 'twoDate',

    dateType: 'month', // 类型 默认datetime
    format: 'yyyy-MM-dd HH', // 格式 默认'yyyy-MM-dd HH:mm:ss'
},
```


#### type=date
```
{
    ...common,
    name: 'date', // 开始时间 begintwoDate， 结束时间 endtwoDate
    label: '一个时间',
    type: 'date',

    dateType: 'date', // 类型 默认datetime
    format: 'yyyy-MM-dd HH', // 格式 默认'yyyy-MM-dd HH:mm:ss'
},
```


#### type=textarea
```
{
    ...common,
    name: 'textarea',
    label: '多行文本',
    type: 'textarea',

    rowOrColumn: false, // flex的方向，有connect或extra时用
    maxLength: 20, // 最大数量
    minLength: 10, // 最小数量
    autosize: {
        //  最小最大行 默认最小：编辑2行，查看一行，最大10行
        minRows: 2,
        maxRows: 10,
    },

    connect: '补充', // 符号什么 一到两字
    extra: '补充说明', // 补充说明
    extraStyle: {
        color: '#00ff00',
    }, //extra样式补充
    extraFun: () => {
        console.log('点击事件');
    },
},
```


#### type=switch
```
{
    ...common,
    name: 'switch',
    label: '开关',
    type: 'switch',

    rowOrColumn: false, // flex的方向，有connect或extra时用
    activeColor: '#ff0000', // 打开颜色
    inactiveColor: '#00ff00', // 关闭颜色

    connect: '补充', // 符号什么 一到两字
    extra: '补充说明', // 补充说明
    extraStyle: {
        color: '#00ff00',
    }, //extra样式补充
    extraFun: () => {
        console.log('点击事件');
    },
},
```

#### type=radio
```
{
    ...common,
    name: 'radio',
    label: '单选框',
    type: 'radio',
    // disabled: true,
    radioBtn: true, // 是否变成按钮形状
    rowOrColumn: false, // flex的方向，有connect或extra时用
    data: [
        // 可选项数据源，键名可通过 Props 属性配置
        { value: 'value', label: 'label' },
        { itemValue: 'itemValue', itemLabel: 'itemLabel' },
        { paramValue: 'paramValue', paramName: 'paramName' },
        { id: 'id', name: 'name' },
    ],
    selectFun: value => {
        // 选择事件
        console.log(value);
    },

    connect: '补充', // 符号什么 一到两字
    extra: '补充说明', // 补充说明
    extraStyle: {
        color: '#00ff00',
    }, //extra样式补充
    extraFun: () => {
        console.log('点击事件');
    },
},
```


#### type=table
```
{
    ...common,
    name: 'table',
    label: '表格',
    type: 'table',
    tableData: [{}, {}, {}], // 表格数据
    // table表格表头
    tableTitle: [{ prop: 'num', fixed: 'left', type: 'selection' }, { prop: 'id', label: 'ID' }],
    showHeader: true, // 是否显示表头
    stripe: true, // table表格是否有斑马线
    uniqueSelect: true, // 表格是否单选
},
```

#### type=videoOrPicture
```
{
    ...common,
    name: 'videoOrPicture',
    label: '视频图片上传',
    type: 'videoOrPicture',

    maxi: 3, // 最大上传数
    hint: '默认图片', // 图片提示 (数组的时候多个，单个字符串)
    // hint: ['默认图片1', '默认图片2'],
    flagType: 'picture', // 图片还是视频 video/picture
    size: 10, // 大小限制
    isFacePic: true, // 是否展示封面图标
    uploadUrl: 'http://bigdata-api.apitops.com/api/v1/common/upload/files', // 上传url
    uploadAK: '31c5df4c-054c-40a9-98fc-99e0fea40ef3', // ak，上传的话是必须的
    isWrite: true, // 是否展示可写图标
    isWriteFun: () => {
        // 是否可写操作
        console.log('写入图片');
    },
},
```

#### type=handleClick
```
{
    ...common,
    name: 'handleClick',
    label: '文本点击事件',
    type: 'handleClick',
    handleClickData: 'handleClick', // 当前字段，btnTitle存在的时候不生效
    btnTitle: '编辑', // 分割标题
    inputStyle: {
        color: 'orange',
    },
    btnFuntion: () => {
        // 没有的时候纯展示
        console.log('操作按钮');
    },
},
```
#### type=tag
```
{
    ...common,
    name: 'tag',
    label: '标签',
    type: 'tag',
    closable: true, // 是否可关闭
    hit: true, // 是否有描边
    typeColor: 'success', // 标签样式
    data: [
        // 可选项数据源，键名可通过 Props 属性配置
        { value: 'value', label: 'label' },
        { itemValue: 'itemValue', itemLabel: 'itemLabel' },
        { paramValue: 'paramValue', paramName: 'paramName' },
        { id: 'id', name: 'name' },
    ],
    closeFun: value => {
        // 关闭事件
        console.log(value);
    },
},
```
#### type=ue
```
{
    ...common,
    name: 'ue',
    label: '富文本',
    type: 'ue',
    span: 24,
    uploadUrl: 'http://bigdata-api.apitops.com/api/v1/common/upload/files', // 上传url
    uploadAK: '31c5df4c-054c-40a9-98fc-99e0fea40ef3', // ak，上传的话是必须的
},
```
#### type=map
```
{
    ...common,
    name: 'map',
    label: '地图',
    type: 'map',
    span: 24,
    inputStyle: {
        // input框设置样式
        width: '800px',
    },
    bindName: ['lng', 'lat'], // 绑定经纬度的name[经度，纬度]
},
```
![form1.png](https://imgapi.apitops.com/V5/bigdata-mgr/20190828/42b3e72594a641c58271e16b01fc9b63.png)

![form2.png](https://imgapi.apitops.com/V5/bigdata-mgr/20190828/71c3b44c58f4495ea542b0987874a542.png)
&nbsp;
****
&nbsp;