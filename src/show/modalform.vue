<template>
    <div id="modalFormTest">
        <el-button type="success" class="showBtn" @click="showModal">出现弹窗</el-button>
        <modal-form
            v-if="searchVisible"
            :title="'高级筛选'"
            :width="'600px'"
            ref="highSearch"
            :visible="searchVisible"
            :formDialogItems="formImmediateItems"
            @onCancel="onCancel"
            :modalBtns="modalBtns"
            :formData="searchParams"
            :search="true"
            :bottomFixed="false"
            :modal="true"
        ></modal-form>
        <modal-form
            v-if="preVisible"
            :width="'600px'"
            :search="true"
            :visible="preVisible"
            :nobtn="true"
            @onCancel="onCancel"
            :closeOnClickModal="true"
            :noModalBG="true"
            :modal="true"
        >
            <div slot="header" class="modalHeader">
                <h2>文章预览</h2>
                <section>
                    <a @click="() => {visible=true}">编辑</a>
                    <a @click="() => {}">推送</a>
                    <a @click="() => {}">关联房源</a>
                </section>
            </div>
            <!-- <Form
                :form-items="formImmediateItems"
                :form-data="searchParams"
                :labelWidth="'120px'"
                :cancel-btn="false"
                :save-btn="false"
                :bottom-fixed="true"
            >
            </Form> -->
            <!-- <MapItem></MapItem> -->
            <tableTest></tableTest>
            <!-- <div slot="footer" class="modalFooter">
                <el-button type="primary" @click="()=>{}">确定</el-button>
                <el-button @click="()=>{}">取 消</el-button>
            </div> -->
        </modal-form>
        <!-- <modal-form :visible="true" title="djdjdj"></modal-form> -->
        <el-dialog :visible.sync="visible"></el-dialog>
    </div>
</template>
<script>
import MapItem from './map';
import tableTest from './table';
export default {
    name: 'modalFormTest',
    components: { MapItem, tableTest },
    data() {
        return {
            // modalForm 字段
            annotation: 'nihaonihao 你好你好你好',
            searchVisible: false,
            preVisible: false,
            visible: false,
            searchParams: {
                pageIndex: 1,
                pageSize: 20,
            },
            // 高级搜索的点击事件及按钮
            modalBtns: [
                {
                    name: '搜 索',
                    typy: 'primary',
                    onclick: () => {},
                },
                {
                    name: '重 置',
                    onclick: params => {},
                },
            ],
        };
    },
    computed: {
        // 高级搜索formItems
        formImmediateItems() {
            return [
                { name: 'countryId', label: '区域', type: 'input', span: 24 },
                { name: 'provinceId', label: '省份', type: 'input', span: 24 },
                { name: 'cityId', label: '城市', type: 'input', span: 24 },
                { name: 'districtId', label: '区域', type: 'input', span: 24 },
                { name: 'districtId1', label: '区域', type: 'input', span: 24 },
                { name: 'districtId2', label: '区域', type: 'input', span: 24 },
                { name: 'districtId3', label: '区域', type: 'input', span: 24 },
                { name: 'districtId4', label: '区域', type: 'input', span: 24 },
                { name: 'districtId5', label: '区域', type: 'input', span: 24 },
                { name: 'blockId', label: '板块', type: 'input', span: 24 },
                { name: 'source', label: '来源', type: 'input', span: 24 },
                { name: 'sellStatus', label: '销售状态', type: 'input', span: 24 },
                { name: 'isTest', label: '是否测试', type: 'input', span: 24 },
                { name: 'propertyType', label: '物业类型', type: 'input', span: 24 },
                { name: 'onlineStatus', label: '状态', type: 'input', span: 24 },
                { name: 'developer', label: '开发商', type: 'input', span: 24 },
                { name: 'projectName', label: '项目公司', type: 'input', span: 24 },
                { name: 'developerBrand', label: '开发商品牌', type: 'input', span: 24 },
            ];
        },
    },
    methods: {
        showModal() {
            setTimeout(() => {
                
                this.preVisible = true;
            }, 0);
            this.searchVisible = true;
        },
        // 取消弹窗
        onCancel() {
            // this.searchVisible = false;
            this.preVisible = false;
        },
    },
};
</script>

<style lang="scss" scoped>
#modalFormTest {
    .modalHeader {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0px 16px;
        height: 54px;
        border-bottom: 1px solid #cccccc;
        h2 {
            margin: 0;
        }
        a {
            padding-left: 4px;
        }
    }
    .modalFooter {
        box-shadow: 2px 0px 5px #ccc;
        background: white;
        padding: 8px 0 12px 136px;
    }
    .showBtn {
        margin: 32px 0 0 32px;
    }
}
</style>
