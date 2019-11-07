<template>
    <div
        :class="{ spider_form_data: true, searchFlag: searchFooterMar, showText:showText, disabledStyle: allDisabled, modelForm: modelForm }"
        :style="{ width: !modelForm ? formWidth || 'auto' : '',...formStyle }"
    >
        <div :class="{ flexLeftOrCenter: flexleftOrCenter === 'center' }">
            <el-form
                ref="form"
                :model="formData"
                :disabled="allDisabled"
                :label-width="labelWidth"
                :size="searchFooterMar ? 'small' : 'medium'"
                :rules="rules"
            >
                <el-col v-for="(item, index) of formItems" :key="index" :span="item.span || 24">
                    <el-form-item
                        v-if="item.type === 'input' && !item.hidden"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <input-item
                            :inputType="'input'"
                            :item="item"
                            :formData="formData"
                            :formType="formType"
                            :allDisabled="allDisabled"
                        />
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'input' && item.appendSlot" name="appendinput"></slot>
                    <el-form-item
                        v-if="item.type === 'number' && !item.hidden"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <el-input-number
                            v-model="formData[item.name]"
                            :disabled="item.disabled"
                            :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
                            controls-position="right"
                            :min="item.mini"
                            :max="item.maxi"
                            :precision="item.precision"
                            :style="item.inputStyle || {}"
                        ></el-input-number>
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'number' && item.appendSlot" name="appendnumber"></slot>
                    <el-form-item
                        v-if="item.type === 'autocomplete' && !item.hidden"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <Autocomplete
                            :formItem="item"
                            :formData="formData"
                            :formType="formType"
                            :allDisabled="allDisabled"
                        />
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'autocomplete' && item.appendSlot" name="appendautocomplete"></slot>
                    <el-form-item
                        v-if="item.type === 'cascader' && !item.hidden"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <Cascader
                            :item="item"
                            :formData="formData"
                            :formType="formType"
                            :allDisabled="allDisabled"
                        />
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'cascader' && item.appendSlot" name="appendcascader"></slot>
                    <el-form-item
                        v-else-if="item.type === 'select' && !item.hidden"
                        :prop="item.name"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <select-item
                            :item="item"
                            :formData="formData"
                            :formType="formType"
                            :allDisabled="allDisabled"
                        />
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'select' && item.appendSlot" name="appendselect"></slot>
                    <el-form-item
                        v-else-if="item.type === 'twoDate' && !item.hidden"
                        :prop="item.name"
                        :class="{ twoDate: item.required, errorHidden: true, rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                        :style="{
                            ...item.inputStyle,
                            width: twoDateStyle(item.inputStyle, item.labelWidth || labelWidth)
                        }"
                    >
                        <two-date
                            :item="item"
                            :formData="formData"
                            :formType="formType"
                            :allDisabled="allDisabled"
                        />
                    </el-form-item>
                    <slot v-if="item.type === 'twoDate' && item.appendSlot" name="appendtwoDate"></slot>
                    <el-form-item
                        v-else-if="item.type === 'twoTime' && !item.hidden"
                        :prop="item.name"
                        :class="{ twoDate: item.required, errorHidden: true, rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                        :style="{
                            ...item.inputStyle,
                            width: twoDateStyle(item.inputStyle, item.labelWidth || labelWidth)
                        }"
                    >
                        <two-time
                            :item="item"
                            :formData="formData"
                            :formType="formType"
                            :allDisabled="allDisabled"
                        />
                    </el-form-item>
                    <slot v-if="item.type === 'twoTime' && item.appendSlot" name="appendtwoDate"></slot>
                    <el-form-item
                        v-else-if="item.type === 'time' && !item.hidden"
                        :prop="item.name"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <el-time-picker
                            v-model="formData[item.name]"
                            :type="item.dateType || 'time'"
                            :format="item.format || 'HH:mm:ss'"
                            :value-format="item.format || 'HH:mm:ss'"
                            :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
                            :start-placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
                            :end-placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
                            :disabled="item.disabled"
                            :style="item.inputStyle || {}"
                        ></el-time-picker>
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'time' && item.appendSlot" name="appenddate"></slot>
                    <el-form-item
                        v-else-if="item.type === 'date' && !item.hidden"
                        :prop="item.name"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <el-date-picker
                            v-model="formData[item.name]"
                            :type="item.dateType || 'datetime'"
                            :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
                            :value-format="item.format || 'yyyy-MM-dd HH:mm:ss'"
                            :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
                            :start-placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
                            :end-placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
                            :disabled="item.disabled"
                            :style="item.inputStyle || {}"
                        ></el-date-picker>
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'date' && item.appendSlot" name="appenddate"></slot>
                    <el-form-item
                        v-else-if="item.type === 'textarea' && !item.hidden"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <el-input
                            v-model="formData[item.name]"
                            type="textarea"
                            :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
                            :disabled="item.disabled"
                            :clearable="item.clearable"
                            :maxlength="item.maxLength"
                            :minlength="item.minLength"
                            :style="item.inputStyle || {}"
                            :resize="item.resize"
                            :autosize="item.autosize || (item.disabled || allDisabled ? { minRows: 1, maxRows: 10 } : { minRows: 2, maxRows: 10 })"
                        ></el-input>
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'textarea' && item.appendSlot" name="appendtextarea"></slot>
                    <el-form-item
                        v-else-if="item.type === 'switch' && !item.hidden"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <el-switch
                            v-model="formData[item.name]"
                            :disabled="item.disabled"
                            :active-color="item.activeColor || '#409EFF'"
                            :inactive-color="item.inactiveColor || '#C0CCDA'"
                        >
                        </el-switch>
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'switch' && item.appendSlot" name="appendswitch"></slot>
                    <el-form-item
                        v-else-if="item.type === 'ue' && !item.hidden"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <UE
                            v-if="!item.disabled && !allDisabled"
                            :id="item.id"
                            ref="ue"
                            :form-data="formData"
                            :default-msg="formData[item.name]"
                            :uploadUrl="item.uploadUrl"
                            :uploadAK="item.uploadAK"
                        ></UE>
                        <div v-else v-html="formData[item.name]"></div>
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'ue'  && item.appendSlot" name="appendue"></slot>
                    <el-form-item
                        v-else-if="item.type === 'checkboxs' && !item.hidden"
                        :prop="item.name"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <el-checkbox-group
                            v-model="formData[item.name]"
                            :disabled="item.disabled"
                            :class="{ columnCheckbox: item.column }"
                            @change="a => (item.selectFun && item.selectFun(a)) || function() {}"
                        >
                            <el-checkbox
                                v-for="(checkItem, checkIndex) of item.data"
                                :key="checkIndex"
                                :label="checkItem.value || checkItem.itemValue || checkItem.paramValue || checkItem.id"
                                >{{ checkItem.label || checkItem.itemLabel || checkItem.paramName || checkItem.name }}</el-checkbox
                            >
                        </el-checkbox-group>
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'checkboxs'  && item.appendSlot" name="appendcheckboxs"></slot>
                    <el-form-item
                        v-else-if="item.type === 'radio' && !item.hidden"
                        :prop="item.name"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <radio-item
                            :item="item"
                            :formData="formData"
                            :formType="formType"
                            :allDisabled="allDisabled"
                        />
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'radio'  && item.appendSlot" name="appendradio"></slot>
                    <el-form-item
                        v-else-if="item.type === 'cut' && !item.hidden"
                        :style="{ marginBottom: 0 }"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <div class="spider_form_data_cut">
                            <header>
                                <strong>{{ item.cutName }}</strong>
                                <span v-if="item.cutNameDescribe" class="cutNameDescribe">{{ item.cutNameDescribe }}</span>
                            </header>
                            <a v-if="item.btnTitle || item.btnDescribe" class="cut_handle">
                                {{ item.btnDescribe }}
                                <span v-if="item.btnTitle" @click="() => item.btnFuntion() || function() {}">{{ item.btnTitle }}</span>
                            </a>
                        </div>
                    </el-form-item>
                    <slot v-if="item.type === 'cut' && item.appendSlot" name="appendcut"></slot>
                    <el-form-item
                        v-else-if="item.type === 'handleClick' && !item.hidden"
                        :style="{ marginBottom: 0 }"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <div>
                            <a
                                v-if="item.btnFuntion"
                                :style="item.inputStyle || {}"
                                class="pointer blue"
                                @click="() => item.btnFuntion(item.handleClickData ? formData[item.handleClickData] : null)"
                                >{{ item.btnTitle || formData[item.name] }}</a
                            >
                            <a v-else class="blue default" :style="item.inputStyle || {}">{{ item.btnTitle || formData[item.name] }}</a>
                        </div>
                    </el-form-item>
                    <slot v-if="item.type === 'handleClick' && item.appendSlot" name="appendhandleClick"></slot>
                    <el-form-item
                        v-else-if="item.type === 'qrcode' && !item.hidden"
                        :label="item.label && `${item.label}：`"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <qrcode :url="item.url" :id="item.id" :qrState="item.qrState"></qrcode>
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'qrcode' && item.appendSlot" name="appendqrcode"></slot>
                    <el-form-item
                        v-else-if="item.type === 'map' && !item.hidden"
                        :class="{ mapPosition: true, rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <Map
                            ref="map"
                            :disabled="item.disabled || allDisabled"
                            :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
                            :bind-data="item.name"
                            :bind-name="item.bindName"
                            :form-data="formData"
                            :input-style="item.inputStyle"
                        ></Map>
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'map' && item.appendSlot" name="appendmap"></slot>
                    <el-form-item
                        v-else-if="item.type === 'tag' && !item.hidden"
                        :prop="item.name"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <div class="tagList">
                            <el-tag
                                v-for="(value, tagIndex) in item.data"
                                :key="JSON.stringify(value) + tagIndex"
                                :closable="item.closable"
                                :hit="item.hit"
                                :size="'medium '"
                                :type="item.typeColor"
                                @close="() => (item.closeFun && item.closeFun(value)) || function() {}"
                            >
                                {{ value.value || value.itemValue || value.paramValue || value.name }}
                            </el-tag>
                        </div>
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'tag' && item.appendSlot" name="appendtag"></slot>
                    <el-form-item
                        v-else-if="item.type === 'videoOrPicture' && !item.hidden"
                        :prop="item.name"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <Upload
                            ref="videoOrPicture"
                            v-model="formData[item.name]"
                            :max="item.maxi"
                            :hint="item.hint"
                            :disabled="item.disabled || allDisabled"
                            :flag-type="item.flagType"
                            :bind-name="item.name"
                            :form-data="formData"
                            :size="item.size"
                            :is-face-pic="!!item.isFacePic"
                            :is-write="!!item.isWrite"
                            :is-write-fun="item.isWriteFun"
                            :uploadUrl="item.uploadUrl"
                            :uploadAK="item.uploadAK"
                            :multiple="item.multiple"
                            :uploadFun="item.uploadFun"
                            :setable="item.setable"
                            :uploadClass="item.uploadClass"
                            :scanPics="item.scanPics"
                            :phoneSendPhotoFun="item.phoneSendPhotoFun"
                        ></Upload>
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'videoOrPicture' && item.appendSlot" name="appendvideoOrPicture"></slot>
                    <el-form-item
                        v-else-if="item.type === 'table' && !item.hidden"
                        :class="{ rowOrColumnInput: item.rowOrColumn, ...item.classList }"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <table-item
                            v-if="!item.btnFun || (item.btnFun && item.tableData && item.tableData.length > 0)"
                            ref="tableSelect"
                            :table-data="item.tableData"
                            :table-title="item.tableTitle"
                            :border-table="item.borderTable"
                            :search-params="{}"
                            :show-header="item.showHeader"
                            :stripe="item.stripe"
                            :from-type="'form'"
                            :unique-select="!!item.uniqueSelect"
                        ></table-item>
                        <connect-or-extra v-if="item.connect || item.extra" :item="item" />
                    </el-form-item>
                    <slot v-if="item.type === 'table' && item.appendSlot" name="appendtable"></slot>
                </el-col>
                <el-col v-if="buttons.length > 0 || cancelBtn || saveBtn" :span="searchSpan">
                     <el-form-item :label-width="searchSpan !== 24 ? '0px' : labelWidth" :class="{ bottomFixed: bottomFixed }" :style="{marginBottom: 0}">
                        <bottomBtnOrForm
                            ref="bottomBtnOrForm"
                            v-if="saveBtn || cancelBtn || buttons.length > 0"
                            :formData="formData"
                            :formType="formType"
                            :allDisabled="allDisabled"
                            :saveBtn="saveBtn"
                            :saveBtnText="saveBtnText"
                            :cancelBtn="cancelBtn"
                            :cancelBtnText="cancelBtnText"
                            :buttons="buttons"
                            :form-items="formItems"
                            :searchFooterMar="searchFooterMar"
                            :refsForm="refsForm"
                            :formItemsBtn="formItemsBtn"
                        />
                    </el-form-item>
                </el-col>
            </el-form>
        </div>
    </div>
</template>

<script>
import UE from '@/components/ue/';
import Map from '@/components/map/';
import Upload from '@/components/upload/';
import TableItem from '@/components/table/';
import qrcode from '@/components/qrcode/';
import { formRules } from './rules';
import connectOrExtra from './connectOrExtra.vue';
import InputItem from './input.vue';
import Autocomplete from './autocomplete.vue';
import Cascader from './cascader.vue';
import SelectItem from './select.vue';
import TwoDate from './twoDate.vue';
import TwoTime from './twoTime.vue';
import RadioItem from './radio.vue';
import bottomBtnOrForm from './bottomBtnOrForm.vue';
import { constants } from 'crypto';
import { clearInterval } from 'timers';

export default {
    name: 'Form',
    components: {
        UE,
        Map,
        Upload,
        TableItem,
        qrcode,
        connectOrExtra,
        InputItem,
        Autocomplete,
        Cascader,
        SelectItem,
        TwoDate,
        TwoTime,
        RadioItem,
        bottomBtnOrForm,
    },
    props: {
        // 表单
        formItems: {
            type: Array,
            required: true,
            default: () => [],
        },
        // 按钮旁边的表单
        formItemsBtn: {
            type: Array,
            default: () => [],
        },
        // 操作按钮文本样式
        saveBtnText: {
            type: String,
            default: '保 存',
        },
        // 取消按钮文本
        cancelBtnText: {
            type: String,
            default: '取 消',
        },
        // 表单域得宽度
        labelWidth: {
            type: String,
            default: '150px',
        },
        // 其他的操作
        buttons: {
            type: Array,
            default: () => [],
        },
        // 是否展示显示按钮
        saveBtn: {
            type: Boolean,
            default: false,
        },
        // 是否展示取消按钮
        cancelBtn: {
            type: Boolean,
            default: false,
        },
        // 表单数据
        formData: {
            type: Object,
            default: () => {},
        },
        // 表单不可编辑
        allDisabled: {
            type: Boolean,
            default: false,
        },
        // search表单的时候不展示
        searchFooterMar: {
            type: Boolean,
            default: false,
        },
        // search的时候所占宽度
        searchSpan: {
            type: Number,
            default: 24,
        },
        // 搜索时表单的宽度
        formWidth: {
            type: String,
            default: '',
        },
        formStyle: {
            type: Object,
            default: () => {},
        },
        // 是否从modal过来
        modelForm: {
            type: Boolean,
            default: false,
        },
        // 表单是否居中
        flexleftOrCenter: {
            type: String,
            default: 'left',
        },
        // 按钮悬浮
        bottomFixed: {
            type: Boolean,
            default: false,
        },
        // disabled显示文本
        showText: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            rules: {},
            formType: {
                input: '请输入',
                ue: '请输入',
                textarea: '请输入',
                autocomplete: '请输入',
                number: '请输入',
                date: '请选择',
                select: '请选择',
                twoDate: '请选择',
                selectGroup: '请选择',
                checkboxs: '请选择',
                map: '请输入',
                videoOrPicture: '请传入',
                radio: '请选择',
                tree: '请选择',
                cascader: '请选择',
                switch: '请选择',
                tag: '请选择',
                twoTime: '请选择',
                time: '请选择',
            },
            refsForm: '',
        };
    },
    mounted() {
        this.allDisabled && this.isDisabledStyle();
        window.bottomFixedWidth = this.bottomFixedWidth;
        let timer = setInterval(() => {
            this.refsForm = this.$refs['form'];
            if (this.refsForm) {
                window.clearInterval(timer);
            }
        }, 500);
    },
    updated() {
        this.allDisabled && this.isDisabledStyle();
        this.createRules();
    },
    created() {
        this.createRules();
    },
    methods: {
        createRules() {
            const { formType, formItems } = this;
            formItems.map(item => {
                let temp = [];
                if (item.required) {
                    temp.push({
                        required: true,
                        message: item.placehold || `${formType[item.type]}${item.label}`,
                        trigger: 'change',
                    });
                }
                if (item.pattern) {
                    let params = {
                        pattern: item.pattern,
                        message: item.message,
                        trigger: ['blur', 'change'],
                    };
                    temp.push(params);
                }
                if (item.ruleType) {
                    temp.push({
                        ...formRules[item.ruleType],
                    });
                }
                if (item.max) {
                    if (item.min) {
                        temp.push({
                            min: item.min,
                            max: item.max,
                            message: `长度在 ${item.min} 到 ${item.max} 个字符`,
                            trigger: 'change',
                        });
                    } else {
                        temp.push({
                            max: item.max,
                            message: `最多输入${item.max}个字符`,
                            trigger: 'change',
                        });
                    }
                } else if (item.min) {
                    temp.push({
                        min: item.min,
                        message: `最少输入${item.min}个字符`,
                        trigger: 'change',
                    });
                }

                if (temp.length) {
                    if (['twoDate', 'twoTime'].includes(item.type)) {
                        this.rules[`begin${item.name}`] = temp;
                        this.rules[`end${item.name}`] = temp;
                    } else {
                        this.rules[item.name] = temp;
                    }
                }
            });
        },
        bottomFixedWidth() {
            let bottomFixedWidth = document.querySelector('.bottomFixed');
            let spider_form_data = document.querySelector('.spider_form_data');
            if (!bottomFixedWidth || !spider_form_data) return;

            bottomFixedWidth.style.width = spider_form_data.parentNode.offsetWidth + 'px';
        },
        isDisabledStyle() {
            let isDisabled = document.querySelectorAll('.is-disabled');
            let qrcodeArr = document.querySelectorAll('#tops_qrcode');
            for (const value of isDisabled) {
                let el = Array.from(value.classList);
                if (el.includes('el-input-number__decrease') || el.includes('el-input-number__increase')) {
                    return;
                }
                this.nopaddingBottom(value);
            }
            for (const iterator of qrcodeArr) {
                this.nopaddingBottom(iterator);
            }
        },
        nopaddingBottom(el) {
            let count = 0;
            while (!Array.from(el.parentNode.classList).includes('el-form-item')) {
                if ('BODY' === el.parentNode.nodeName) {
                    break;
                }
                el = el.parentNode;
                count++;
                if (count > 10) {
                    break;
                }
            }
            if (Array.from(el.parentNode.classList).includes('el-form-item')) {
                el.parentNode.style.marginBottom = '0';
            }
        },
        twoDateStyle(inputStyle = {}, labelWidth) {
            if (inputStyle.width) {
                return parseInt(inputStyle.width) + parseInt(labelWidth) + 'px';
            }
            return 'auto';
        },
    },
};
</script>

<style lang="scss">
.flexLeftOrCenter {
    width: 800px;
    margin: 0 auto;
}
.spider_form_data {
    position: relative;
    .el-form-item.is-success .el-input__inner,
    .el-form-item.is-success .el-textarea__inner {
        border-color: #dcdfe6;
    }
    .el-form-item.is-success .el-input__inner:focus,
    .el-form-item.is-success .el-textarea__inner:focus {
        border-color: #409eff;
    }
    // input没有左右border
    .noLeftBorder {
        .el-input__inner {
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
        }
    }
    .noRightBorder {
        .el-input__inner {
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
        }
    }
    // input suffix
    .el-input__suffix {
        right: 6px;
        .el-input__suffix-inner {
            display: flex;
            flex-direction: row-reverse;
            height: 100%;
            align-items: center;
            pointer-events: all;
        }
    }
    .el-date-editor.el-input {
        width: 100%;
    }
    .el-range-editor.el-input__inner {
        justify-content: space-between;
    }
    .blue {
        color: #0091e8;
    }
    .red {
        color: red;
    }
    .default {
        cursor: default;
    }
    .pointer {
        cursor: pointer;
    }
    .el-form {
        display: inline-block;
        width: 100%;
        position: relative;
        padding-bottom: 40px;
    }
    .data_table {
        margin-top: 12px;
    }
    .spider_form_footer {
        margin: 10px 0 100px;
    }
    .el-form-item__content .columnRadio.el-radio-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: auto;
        .el-radio {
            margin-top: 9px;
        }
    }
    .el-form-item__content .rowsRadio.el-radio-group {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        height: auto;
        width: 100%;
        flex-wrap: wrap;
        .el-radio {
            margin-top: 9px;
        }
    }
    .el-form-item__content .columnCheckbox.el-checkbox-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: auto;
        .el-checkbox {
            margin-top: 0px;
        }
    }
    .el-input-number--medium {
        width: 100%;
    }

    .mapPosition {
        width: 100%;
        .el-form-item__content {
            display: block;
        }
    }
    .rowOrColumnInput {
        .el-form-item__content {
            display: flex;
            flex-direction: column;
        }
    }
    .twoDate {
        label.el-form-item__label:before {
            content: '*';
            color: #f56c6c;
            margin-right: 4px;
        }
    }
    .errorHidden {
        .el-form-item__error {
            display: none;
        }
        .el-input__inner {
            border: 1px solid #dcdfe6;
        }
    }

    .center {
        text-align: center;
    }
    .el-input-group__append button.el-button {
        margin-left: -20px;
    }

    .el-autocomplete {
        width: 100%;
    }
    .el-autocomplete-suggestion__wrap {
        max-height: 700px;
    }

    .el-input.el-input--medium.el-input--suffix {
        width: 100%;
    }

    .el-form-item__content {
        display: flex;
        justify-content: flex-start;
        .el-radio-group,
        .el-switch {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 36px;
        }
    }
    .spider_form_data_cut {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 30px 0;
        width: 100%;
        header {
            display: flex;
            align-items: center;
        }
        strong {
            font-size: 18px;
            color: #303133;
            height: 100%;
        }
        .cutNameDescribe {
            line-height: 20px;
            font-size: 14px;
            color: #606266;
            padding-left: 12px;
        }
        .cut_handle {
            float: right;
            font-weight: normal;
            font-size: 14px;
            color: #606266;
            span {
                cursor: pointer;
                font-size: 14px;
                color: #409eff;
            }
        }
    }
    .bottomFixed {
        position: fixed;
        bottom: 0;
        z-index: 1000;
        padding: 8px 0 12px 32px;
        margin-left: -32px;
        box-shadow: 2px 0px 5px #ccc;
        background: white;
        margin-bottom: 0;
        width: 100%;
        #bottomBtnOrForm {
            padding-right: 64px;
        }
    }
    .el-input-number.is-controls-right .el-input__inner {
        text-align: left;
    }
    .el-form-item--medium .el-form-item__label {
        color: #606266;
    }
    .tagList {
        .el-tag {
            margin-bottom: 8px;
            margin-right: 8px;
        }
    }
    .el-cascader {
        width: 100%;
    }
    #tops_qrcode {
        margin: 12px 0;
    }
    .el-table {
        .el-table__empty-block {
            flex-direction: row;
            height: auto !important;
        }
        .el-table__empty-block:before {
            content: '';
            display: none;
        }
    }
}
.disabledStyle {
    .el-form {
        .el-form-item {
            margin-bottom: 0 !important;
        }
        .el-form-item__content {
            p {
                margin: 0;
            }
        }
    }
}
.searchFlag {
    padding: 0;
    .el-form-item {
        margin-bottom: 0 !important;
    }
    .el-button {
        width: auto;
        margin-left: 9px;
    }
    .restBtn {
        margin-left: 8px;
    }
    .el-date-editor.el-input {
        width: 100%;
    }
    .el-select {
        width: auto;
    }
    .el-form-item__content {
        .el-radio-group,
        .el-switch {
            align-items: flex-start;
        }
    }
}
.modelForm {
    width: 100%;
}
.el-autocomplete-suggestion.el-popper.is-loading {
    display: none;
}
.noDataHidden {
    display: none;
}
.el-button.el-picker-panel__link-btn.el-button--text.el-button--mini {
    display: none;
}
button.el-button.el-button--default.el-button--small.restBtn {
    position: absolute;
    right: 0;
    top: 0;
}

.el-message.el-message--error {
    z-index: 9999 !important;
}

.showText {
    .el-input-number.el-input-number--medium.is-disabled {
        .el-input-number__decrease {
            display: none;
        }
        .el-input-number__increase {
            display: none;
        }
    }
    .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .is-disabled {
        color: #000;
        .el-input-group__append {
            display: none;
        }
    }
    .el-input.is-disabled .el-input__inner {
        background-color: white;
        font-size: 14px;
        border: none;
        color: black;
        cursor: inherit;
        padding: 0;
        resize: none;
    }
    .el-input.is-disabled .el-input__suffix {
        display: none;
    }
    .el-date-editor.is-disabled .el-input__prefix {
        display: none;
    }

    .el-checkbox + .el-checkbox.is-disabled {
        margin-left: 16px;
    }
    .el-checkbox__input.is-disabled {
        display: none;
    }
    .el-textarea.is-disabled .el-textarea__inner {
        background-color: white;
        font-size: 14px;
        border: none;
        color: black;
        cursor: inherit;
        resize: none; // 去掉textarea标签右下角的斜杠
        line-height: 26px;
        padding-left: 0;
    }

    .el-form-item.is-success .el-input__inner {
        border-color: #dcdfe6;
    }
}
.el-input.is-disabled .el-input__inner {
    background-color: #f2f6fc;
    border-color: #dcdfe6;
    color: #909399;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #606266;
}
</style>
