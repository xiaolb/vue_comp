<style lang="scss">
#newHouseDetail {
    padding: 16px;
    min-width: 1100px;
    min-height: 95vh;
    background: white;
    overflow: auto;
    .pointer {
        cursor: pointer;
    }
    .newHouseDetail_back {
        position: fixed;
        right: 16px;
        top: 16px;
        z-index: 999;
    }
    .newHouseDetail_preview {
        position: fixed;
        right: 16px;
        top: 260px;
        z-index: 999;
    }
    .el-tabs__header .el-tabs__nav {
        width: 100%;
        display: flex;
        .el-tabs__item.is-top {
            flex: 1;
            text-align: center;
            height: 50px;
            line-height: 50px;
            font-size: 18px;
        }
    }
    .red {
        color: #ff0000;
    }
    .green {
        color: #008000;
    }
    .sectionNewHouse {
        display: flex;
        justify-content: space-between;
        padding: 12px;
        background: #f2f2f2;
        border-radius: 5px;
        .show {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
                margin: 8px 0;
                a {
                    margin-left: 12px;
                }
            }
            p:first-child {
                margin-top: 0;
            }
            p:last-child {
                margin-bottom: 0;
            }
        }
        .close {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
                margin: 0;
                color: #666666;
            }
            a {
                text-align: right;
            }
        }
    }
    .el-icon-success:before {
        color: #008000;
    }
    .el-icon-error:before {
        color: #ff0000;
    }
    .aTag {
        cursor: pointer;
        color: #409eff;
        text-decoration: none;
    }
}
</style>

<template>
    <div id="newHouseDetail">
        <q-r-code class="newHouseDetail_preview" :url="QRCodeUrl" :qrState="'sssss'"></q-r-code>
        <Form :formItems="formNewHouseItems" :formData="formNewHouseData" ></Form>
        <wrapper :menuData="faMenus"></wrapper>
    </div>
</template>

<script>
export default {
    data() {
        return {
            faMenus: [
                {
                    menuName: '主题推荐',
                    href: '',
                    menuId: 'theme_recommend',
                    sonMenus: [
                        {
                            menuId: '10',
                            menuName: '红包签到活动',
                            href: '',
                            sonMenus: [
                                {
                                    menuId: '10-1',
                                    menuName: '红包签到活动',
                                    href: '/activitySignList',
                                    sonMenus: [],
                                },
                            ],
                        },
                        {
                            menuId: '11',
                            menuName: '主题活动',
                            href: '',
                            sonMenus: [
                                {
                                    menuId: '11-1',
                                    sonMenus: [],
                                    menuName: '活动列表',
                                    href: '/operationPlatform/activityList',
                                },
                                {
                                    menuId: '11-2',
                                    sonMenus: [],
                                    menuName: '专题列表',
                                    href: '/operationPlatform/topicList',
                                },
                            ],
                        },
                    ],
                },
            ],
            detailID: '', // 详情id
            tabsDefault: 'newHouse',
            QRCodeUrl: 'http://localhost:8080/', // 楼盘预览二维码的url
            showHeader: true, // 是否展示头部信息
            villageName: '', // 小区名字
            newhouseName: '', // 楼盘名字
            sliveType: '', // proxy为代理楼盘，tops为销冠楼盘 allNetwork全网
            // 是否是商铺或者写字楼
            propertyTypeValue: {
                C0value: true,
                D0value: true,
            },
            // 键名为tab名；false表示没有请求，true之后不再次请求
            isAlreadyAjax: {
                newHouse: false,
            },
            // 字典数据
            dictData: {
                sourceData: [],
                newsTypeData: [],
            },
            // 新房信息
            formNewHouseData: {
                settingList: [],
                contract: false, // 是否填写业务信息
                outputSettingList: [],
                logo: [],
            },
            // 楼盘供给配置
            outputSettingTableTitle: [{ prop: 'name', label: '标题' }, { prop: 'content', label: '内容' }],
            // 楼盘纪事
            recordEventTableTitle: [{ prop: 'date', label: '时间' }, { prop: 'type', label: '类型' }, { prop: 'buildings', label: '楼栋' }],
            // 售卖资格
            sellStatusTableTitle: [
                { prop: 'licence', label: '售卖资格' },
                { prop: 'date', label: '发证时间' },
                { prop: 'buildings', label: '绑定楼栋' },
            ],
        };
    },
    computed: {
        onlineStatusType() {
            return this.$store.state.houseEstate.onlineStatus;
        },
        formNewHouseItems() {
            const { sliveType, propertyTypeValue, formNewHouseData } = this;
            const { C0value, D0value } = propertyTypeValue;
            const isNoTops = sliveType !== 'tops';

            return [
                {
                    cutName: '基本信息',
                    type: 'cut',
                    labelWidth: '0px',
                    span: 24,
                    btnTitle: '编辑',
                    btnFuntion: () => {
                        // sliveType && this.editOrAddBtn('newHouse');
                    },
                },
                {
                    name: 'outputSettingList',
                    rowsName: ['name', 'content'],
                    label: '楼房供给配置',
                    placehold: ['信息名称', '信息内容'],
                    type: 'addRowsInput',
                    span: 24,
                    maxRows: 4,
                    minRows: 3,
                },
                {
                    name: 'outputSettingList',
                    label: '楼房供给配置',
                    type: 'table',
                    span: 10,
                    tableData: formNewHouseData.outputSettingList,
                    tableTitle: this.outputSettingTableTitle,
                    hiddenHeader: true,
                },
                // {
                //     name: 'logo',
                //     label: '封面图',
                //     type: 'videoOrPicture',
                //     required: true,
                //     span: 24,
                //     size: 10,
                //     ak: '2de39150-0717-491a-b088-f07edfd71a03',
                //     uploadUrl: 'http://bigdata-api.test.apitops.com/api/v1/common/upload/files',
                //     flagType: 'picture',
                //     hint: '建议上传420*320像素，格式为JPG/JPEG/PNG；大小小于10M的图片',
                // },
                {
                    name: 'effectUrl',
                    label: '3D效果图URL',
                    uploadUrl: 'http://bigdata-api.test.apitops.com/api/v1/common/upload/files',
                    type: 'input',
                    span: 24,
                    hidden: isNoTops,
                },
                {
                    name: 'address',
                    label: '楼盘地址',
                    bindName: ['longitude', 'latitude'],
                    placehold: ' 请输入详细地址，比如街道及门牌号...',
                    type: 'map',
                    span: 24,
                },
                {
                    name: 'settingList',
                    rowsName: ['setting'],
                    label: '转发语',
                    placehold: ['转发语'],
                    type: 'addRowsInput',
                    inputType: 'textarea',
                    span: 24,
                    maxRows: 3,
                    maxLength: 100,
                },
                // {
                //     name: 'content',
                //     label: '正文',
                //     // required: true,
                //     uploadUrl: 'http://bigdata-api.test.apitops.com/api/v1/common/upload/files',
                //     type: 'ue',
                //     span: 24,
                // },
                { cutName: '楼盘纪事', type: 'cut', labelWidth: '0px', span: 24 },
                {
                    name: 'eventList',
                    label: '楼盘纪事',
                    type: 'table',
                    span: 18,
                    tableData: formNewHouseData.eventList,
                    tableTitle: this.recordEventTableTitle,
                },

                { cutName: '售卖资格', type: 'cut', labelWidth: '0px', span: 24 },
                {
                    name: 'licenceList',
                    label: '售卖资格',
                    type: 'table',
                    span: 18,
                    tableData: formNewHouseData.licenceList,
                    tableTitle: this.sellStatusTableTitle,
                },

                { cutName: '楼盘介绍', type: 'cut', labelWidth: '0px', span: 24 },
                { name: 'recommend', label: '推荐理由', type: 'textarea', span: 24 },
                { name: 'detail', label: '楼盘简述', type: 'textarea', span: 24 },

                { cutName: '写字楼', type: 'cut', labelWidth: '0px', span: 24, hidden: C0value },
                { name: 'standardArea', label: '标准层面积', type: 'input', span: 12, hidden: C0value },
                { name: 'officeArea', label: '办公面积', type: 'input', span: 12, hidden: C0value },
                { name: 'commerceArea', label: '商业面积', type: 'input', span: 12, hidden: C0value },
                { name: 'minUnitArea', label: '最小单位面积', type: 'input', span: 12, hidden: C0value },
                { name: 'standardFloorHeight', label: '标准层高', type: 'input', span: 12, hidden: C0value },
                { name: 'constructionRatio', label: '得房率', type: 'input', span: 12, hidden: C0value },
                { name: 'netHeight', label: '净高', type: 'input', span: 12, hidden: C0value },
                { name: 'loopPosition', label: '环线位置', type: 'input', span: 12, hidden: C0value },
                { name: 'commerceCircle', label: '所属商圈', type: 'input', span: 12, hidden: C0value },
                { name: 'level', label: '写字楼级别', type: 'input', span: 12, hidden: C0value },

                { cutName: '商铺', type: 'cut', labelWidth: '0px', span: 24, hidden: D0value },
                { name: 'officeStandardArea', label: '标准层面积', type: 'input', span: 12, hidden: D0value },
                { name: 'singleArea', label: '单套面积', type: 'input', span: 12, hidden: D0value },
                { name: 'officeStandardFloorHeight', label: '标准层高', type: 'input', span: 12, hidden: D0value },
                { name: 'width', label: '开间', type: 'input', span: 12, hidden: D0value },
                { name: 'officeNetHeight', label: '净高', type: 'input', span: 12, hidden: D0value },
                { name: 'depth', label: '进深', type: 'input', span: 12, hidden: D0value },
                { name: 'officeLoopPosition', label: '环线位置', type: 'input', span: 12, hidden: D0value },

                {
                    cutName: '标签',
                    type: 'cut',
                    labelWidth: '0px',
                    span: 24,
                    btnTitle: '标签管理',
                    btnFuntion: () => {
                        // this.editOrAddBtn('labelnewHouse');
                    },
                },
                { name: 'showLabel', label: '展示标签', type: 'input', span: 24 },
                { name: 'bizLabel', label: '运营标签', type: 'input', span: 24 },
            ];
        },
    },
};
</script>

