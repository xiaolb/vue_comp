<template>
    <div
        :class="{ spider_form_data: true, searchFlag: searchFooterMar,  disabledStyle: allDisabled, modelForm: modelForm }"
        :style="{ width: searchFooterMar && !modelForm ? formSearchWidth : '' }"
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
                        v-if="item.type === 'addRowsInput' && !item.hidden"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <add-rows
                            :autosize="item.autosize"
                            :type="item.inputType"
                            :rows-name="item.rowsName"
                            :disabled="item.disabled || allDisabled"
                            :placeholder="item.placehold"
                            :form-data="formData"
                            :clearable="true"
                            :name="item.name"
                            :max-rows="item.maxRows"
                            :min-rows="item.minRows"
                            :maxlength="item.maxLength"
                            :minlength="item.minLength"
                            :unique-style="item.uniqueStyle"
                        ></add-rows>
                    </el-form-item>
                    <el-form-item
                        v-if="item.type === 'addRowsSelect' && !item.hidden"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <add-select
                            :rows-name="item.rowsName"
                            :placeholder="item.placehold"
                            :form-data="formData"
                            :name="item.name"
                            :country-data="item.countryData"
                            :city-data="item.cityData"
                            :select-fun="item.selectFun"
                            :filter-search="item.filterSearch"
                        ></add-select>
                    </el-form-item>
                    <el-form-item
                        v-if="item.type === 'input' && !item.hidden"
                        :class="{ rowOrColumnInput: item.rowOrColumn }"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <el-input
                            v-model="formData[item.name]"
                            :disabled="item.disabled"
                            :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
                            :style="item.inputStyle || {}"
                            :clearable="item.clearable"
                            :maxlength="item.maxLength"
                            :minlength="item.minLength"
                            @change="a => (item.change && item.change(a)) || function() {}"
                        >
                            <el-button v-if="item.append" slot="append" icon="el-icon-search" @click="item.appendFun"></el-button>
                        </el-input>
                        <span v-if="item.connect" class="spider_form_data_connect">{{ item.connect }}</span>
                        <span 
                            v-if="item.extra" 
                            class="spider_form_data_extra" 
                            :style="item.extraStyle || {}"
                            @click="a => (item.extraFun && item.extraFun()) || function() {}"
                        >{{ item.extra }}</span>
                    </el-form-item>
                    <el-form-item
                        v-if="item.type === 'number' && !item.hidden"
                        :class="{ rowOrColumnInput: item.rowOrColumn }"
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
                        <span v-if="item.connect" class="spider_form_data_connect">{{ item.connect }}</span>
                        <span 
                            v-if="item.extra" 
                            class="spider_form_data_extra" 
                            :style="item.extraStyle || {}"
                            @click="a => (item.extraFun && item.extraFun()) || function() {}"
                        >{{ item.extra }}</span>
                    </el-form-item>
                    <el-form-item
                        v-if="item.type === 'autocomplete' && !item.hidden"
                        :class="{ rowOrColumnInput: item.rowOrColumn }"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <el-autocomplete
                            v-model="formData[item.name]"
                            :disabled="item.disabled"
                            :fetch-suggestions="item.querySearchAsync"
                            :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
                            :style="item.inputStyle || {}"
                            :debounce="100"
                            :clearable="item.clearable"
                            @select="a => (item.selectFun && item.selectFun(a)) || function() {}"
                        ></el-autocomplete>
                        <span v-if="item.connect" class="spider_form_data_connect">{{ item.connect }}</span>
                        <span
                            v-if="item.extra"
                            class="spider_form_data_extra"
                            :style="item.extraStyle || {}"
                            @click="a => (item.extraFun && item.extraFun()) || function() {}"
                            >{{ item.extra }}</span
                        >
                    </el-form-item>
                    <el-form-item
                        v-if="item.type === 'cascader' && !item.hidden"
                        :class="{ rowOrColumnInput: item.rowOrColumn }"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <el-cascader
                            v-model="formData[item.name]"
                            :disabled="item.disabled"
                            :clearable="item.clearable"
                            :options="item.data || []"
                            :props="item.props"
                            :debounce="item.debounce || 300"
                            :change-on-select="item.change_on_select"
                            :filterable="item.filterable"
                            :size="item.size || 'medium'"
                            :separator="item.separator || '/'"
                            :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
                            :style="item.inputStyle || {}"
                            @change="a => (item.selectFun && item.selectFun(a)) || function() {}"
                        ></el-cascader>
                        <span v-if="item.connect" class="spider_form_data_connect">{{ item.connect }}</span>
                        <span
                            v-if="item.extra"
                            class="spider_form_data_extra"
                            :style="item.extraStyle || {}"
                            @click="a => (item.extraFun && item.extraFun()) || function() {}"
                            >{{ item.extra }}</span
                        >
                    </el-form-item>

                    <el-form-item
                        v-else-if="item.type === 'select' && !item.hidden"
                        :prop="item.name"
                        :class="{ rowOrColumnInput: item.rowOrColumn }"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <el-select
                            v-if="item.filterSearch"
                            v-model="formData[item.name]"
                            :disabled="item.disabled"
                            :filterable="item.filterable"
                            :clearable="item.clearable"
                            :multiple="item.multiple"
                            :multiple-limit="item.multipleLimit"
                            :allow-create="item.allowCreate"
                            :default-first-option="item.allowCreate"
                            :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
                            :style="item.inputStyle || {}"
                            :filter-method="item.filterSearch || function() {}"
                            
                            @change="a => (item.selectFun && item.selectFun(a)) || function() {}"
                        >
                            <el-option
                                v-for="(selectItem, selectIndex) of item.data"
                                :key="selectIndex"
                                :label="selectItem.label || selectItem.itemLabel || selectItem.paramName || selectItem.name"
                                :value="selectItem.value || selectItem.itemValue || selectItem.paramValue || selectItem.id"
                                :disabled="selectItem.disabled"
                            ></el-option>
                        </el-select>
                        <el-select
                            v-else
                            v-model="formData[item.name]"
                            :disabled="item.disabled"
                            :clearable="item.clearable"
                            :filterable="item.filterable"
                            :multiple-limit="item.multipleLimit"
                            :multiple="item.multiple"
                            :allow-create="item.allowCreate"
                            :default-first-option="item.allowCreate"
                            :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
                            :style="item.inputStyle || {}"
                            @change="a => (item.selectFun && item.selectFun(a)) || function() {}"
                        >
                            <el-option
                                v-for="(selectItem, selectIndex) of item.data"
                                :key="selectIndex"
                                :label="selectItem.label || selectItem.itemLabel || selectItem.paramName || selectItem.name"
                                :value="selectItem.value || selectItem.itemValue || selectItem.paramValue || selectItem.id"
                                :disabled="selectItem.disabled"
                            ></el-option>
                        </el-select>
                        <span v-if="item.connect" class="spider_form_data_connect">{{ item.connect }}</span>
                        <span
                            v-if="item.extra"
                            class="spider_form_data_extra"
                            :style="item.extraStyle || {}"
                            @click="a => (item.extraFun && item.extraFun()) || function() {}"
                            >{{ item.extra }}</span
                        >
                    </el-form-item>
                    <el-form-item
                        v-else-if="item.type === 'twoDate' && !item.hidden"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                        :style="{ 
                            ...item.inputStyle,
                            width: twoDateStyle(item.inputStyle, item.labelWidth || labelWidth)
                        }"
                    >
                        <el-col :span="11">
                            <el-form-item :prop="'begin' + item.name">
                                <el-date-picker
                                    v-model="formData[`begin${item.name}`]"
                                    :type="item.dateType || 'datetime'"
                                    :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
                                    :value-format="item.format || 'yyyy-MM-dd HH:mm:ss'"
                                    :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + '开始' + item.label"
                                    :disabled="item.disabled"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="center" :span="2" style="textAlign: center">-</el-col>
                        <el-col :span="11">
                            <el-form-item :prop="'end' + item.name">
                                <el-date-picker
                                    v-model="formData[`end${item.name}`]"
                                    :type="item.dateType || 'datetime'"
                                    :format="item.format || 'yyyy-MM-dd HH:mm:ss'"
                                    :value-format="item.format || 'yyyy-MM-dd HH:mm:ss'"
                                    :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + '结束' + item.label"
                                    :disabled="item.disabled"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item
                        v-else-if="item.type === 'date' && !item.hidden"
                        :prop="item.name"
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
                    </el-form-item>
                    <el-form-item
                        v-else-if="item.type === 'textarea' && !item.hidden"
                        :class="{ rowOrColumnInput: item.rowOrColumn }"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <el-input
                            v-model="formData[item.name]"
                            type="textarea"
                            :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
                            :disabled="item.disabled"
                            :maxlength="item.maxLength"
                            :minlength="item.minLength"
                            :style="item.inputStyle || {}"
                            :autosize="item.autosize || (item.disabled || allDisabled ? { minRows: 1, maxRows: 10 } : { minRows: 2, maxRows: 10 })"
                        ></el-input>
                        <span v-if="item.connect" class="spider_form_data_connect">{{ item.connect }}</span>
                        <span
                            v-if="item.extra"
                            class="spider_form_data_extra"
                            :style="item.extraStyle || {}"
                            @click="a => (item.extraFun && item.extraFun()) || function() {}"
                            >{{ item.extra }}</span
                        >
                    </el-form-item>
                    <el-form-item
                        v-else-if="item.type === 'switch' && !item.hidden"
                        :class="{ rowOrColumnInput: item.rowOrColumn }"
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
                        <span v-if="item.connect" class="spider_form_data_connect">{{ item.connect }}</span>
                        <span
                            v-if="item.extra"
                            class="spider_form_data_extra"
                            :style="item.extraStyle || {}"
                            @click="a => (item.extraFun && item.extraFun()) || function() {}"
                            >{{ item.extra }}</span
                        >
                    </el-form-item>
                    <el-form-item
                        v-else-if="item.type === 'ue' && !item.hidden"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <UE 
                            v-if="!item.disabled && !allDisabled" 
                            id="ue2" 
                            ref="ue" 
                            :form-data="formData" 
                            :default-msg="formData[item.name]" 
                            :uploadUrl="item.uploadUrl"
                            :uploadAK="item.uploadAK"
                        ></UE>
                        <div v-else v-html="formData[item.name]"></div>
                    </el-form-item>
                    <el-form-item
                        v-else-if="item.type === 'checkboxs' && !item.hidden"
                        :prop="item.name"
                        :class="{ rowOrColumnInput: item.rowOrColumn }"
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
                        <span v-if="item.connect" class="spider_form_data_connect">{{ item.connect }}</span>
                        <span
                            v-if="item.extra"
                            class="spider_form_data_extra"
                            :style="item.extraStyle || {}"
                            @click="a => (item.extraFun && item.extraFun()) || function() {}"
                            >{{ item.extra }}</span
                        >
                    </el-form-item>
                    <el-form-item
                        v-else-if="item.type === 'radio' && !item.hidden"
                        :prop="item.name"
                        :class="{ rowOrColumnInput: item.rowOrColumn }"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <el-radio-group
                            v-if="item.radioBtn"
                            v-model="formData[item.name]"
                            size="small"
                            :disabled="item.disabled"
                            @change="a => (item.selectFun && item.selectFun(a)) || function() {}"
                        >
                            <el-radio-button
                                v-for="(checkItem, radioIndex) of item.data"
                                :key="radioIndex"
                                :border="item.border"
                                :label="checkItem.value || checkItem.itemValue || checkItem.paramValue || checkItem.id"
                                >{{ checkItem.label || checkItem.itemLabel || checkItem.paramName || checkItem.name }}</el-radio-button
                            >
                        </el-radio-group>
                        <el-radio-group
                            v-else
                            v-model="formData[item.name]"
                            :disabled="item.disabled"
                            :class="{ columnRadio: item.column, rowsRadio: item.rows }"
                            @change="a => (item.selectFun && item.selectFun(a)) || function() {}"
                        >
                            <el-radio
                                v-for="(checkItem, radioIndex) of item.data"
                                :key="radioIndex"
                                :border="item.border"
                                :label="checkItem.value || checkItem.itemValue || checkItem.paramValue || checkItem.id"
                                >{{ checkItem.label || checkItem.itemLabel || checkItem.paramName || checkItem.name }}</el-radio
                            >
                        </el-radio-group>
                        <span v-if="item.connect" class="spider_form_data_connect">{{ item.connect }}</span>
                        <span
                            v-if="item.extra"
                            class="spider_form_data_extra"
                            :style="item.extraStyle || {}"
                            @click="a => (item.extraFun && item.extraFun()) || function() {}"
                            >{{ item.extra }}</span
                        >
                    </el-form-item>
                    <el-form-item
                        v-else-if="item.type === 'cut' && !item.hidden"
                        :style="{ marginBottom: 0 }"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <div class="spider_form_data_cut">
                            {{ item.cutName }}
                            <a v-if="item.btnTitle" class="cut_handle" @click="item.btnFuntion">{{ item.btnTitle }}</a>
                        </div>
                    </el-form-item>
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
                    <el-form-item
                        v-else-if="item.type === 'qrcode' && !item.hidden"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <qrcode :url="item.url"></qrcode>
                    </el-form-item>
                    <el-form-item
                        v-else-if="item.type === 'map' && !item.hidden"
                        class="mapPosition"
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
                    </el-form-item>
                    <el-form-item
                        v-else-if="item.type === 'tag' && !item.hidden"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <div class="tagList">
                            <el-tag
                                v-for="(value, tagIndex) in item.data"
                                :key="JSON.stringify(value) + tagIndex"
                                :closable="item.closable"
                                :hit="item.hit"
                                :size="item.size || 'medium '"
                                :type="item.typeColor"
                                @close="() => (item.closeFun && item.closeFun(value)) || function() {}"
                            >
                                {{ value.value || value.itemValue || value.paramValue || value.name }}
                            </el-tag>
                        </div>
                    </el-form-item>
                    <el-form-item
                        v-else-if="item.type === 'videoOrPicture' && !item.hidden"
                        :prop="item.name"
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
                        ></Upload>
                    </el-form-item>
                    <el-form-item
                        v-else-if="item.type === 'table' && !item.hidden"
                        :prop="item.name"
                        :label="item.label && `${item.label}：`"
                        :label-width="item.labelWidth || labelWidth"
                    >
                        <table-item
                            v-if="!item.btnFun || (item.btnFun && item.tableData && item.tableData.length > 0)"
                            ref="tableSelect"
                            :table-data="item.tableData"
                            :table-title="item.tableTitle"
                            :search-params="{}"
                            :show-header="item.showHeader"
                            :stripe="item.stripe"
                            :from-type="'form'"
                            :unique-select="!!item.uniqueSelect"
                        ></table-item>
                    </el-form-item>
                </el-col>
                <el-col v-if="buttons.length > 0 || cancelBtn || saveBtn" :span="searchSpan">
                     <el-form-item :label-width="searchSpan !== 24 ? '0px' : labelWidth" :class="{ elbtnStyle: true, bottomFixed: bottomFixed }">
                        <el-button v-if="cancelBtn" @click="onCancel('form')">{{ cancelBtnText }}</el-button>
                        <el-button v-if="saveBtn" type="primary" @click="onSubmit('form')">{{ saveBtnText }}</el-button>
                        <div v-for="(btn, index) of buttons" :key="btn.name" :class="{ restBtngather: true }">
                            <el-button
                                v-if="!btn.hidden"
                                :disabled="!!btn.disabled"
                                :class="{ restBtn: index === 0 }"
                                :type="btn.type || 'primary'"
                                :size="searchFooterMar ? 'small' : 'medium'"
                                @click="
                                    () => {
                                        validateFun('form', btn.onclick, btn.validate, btn.loading);
                                    }
                                "
                                >{{ btn.name }}</el-button
                            >
                        </div>
                    </el-form-item>
                </el-col>
            </el-form>
        </div>
    </div>
</template>

<script>
import UE from '@/components/ue/';
import AddRows from '@/components/addRows/';
import AddSelect from '@/components/addSelect/';
import Map from '@/components/map/';
import Upload from '@/components/upload/';
import TableItem from '@/components/table/';
import qrcode from '@/components/qrcode/';
import { flatten, isEmptyObject, debounceWork } from '@/components/utils';
import { formRules } from './rules';

export default {
    name: 'Form',
    components: {
        UE,
        Map,
        Upload,
        AddRows,
        TableItem,
        AddSelect,
        qrcode,
    },
    props: {
        // 表单
        formItems: {
            type: Array,
            required: true,
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
        // 搜索时表单的宽度，默认800
        formSearchWidth: {
            type: String,
            default: '800px',
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
            },
        };
    },
    mounted() {
        this.allDisabled && this.isDisabledStyle();
    },
    updated() {
        this.allDisabled && this.isDisabledStyle();
    },
    created() {
        this.createRules();
    },
    methods: {
        // button做表单的校验
        validateFun(formName, fun, validate, loading) {
            if (!debounceWork('form', 500)) {
                this.$message.warning('操作过于频繁');
                return;
            }
            if (!validate) {
                if (loading) {
                    this.isLoading(true);
                    setTimeout(() => {
                        this.isLoading(false);
                    }, 1000);
                }
                fun();
                return;
            }
            console.log('validate', validate);
            const _this = this;
            this.$refs[formName].validate((valid, obj) => {
                const { ue, videoOrPicture } = this.$refs;
                if (ue) {
                    ue.map(item => {
                        this.formData[item.$parent.prop] = item.getUEContent();
                        if (this.formData[item.$parent.prop]) {
                            item.$parent.clearValidate();
                            delete obj[item.$parent.labelFor];
                        }
                    });
                }
                if (videoOrPicture) {
                    videoOrPicture.map(item => {
                        let _value = _this.formData[item.$parent.labelFor];
                        if (_value && _value.length > 0) {
                            item.$parent.clearValidate();
                            delete obj[item.$parent.labelFor];
                        }
                    });
                }
                if (isEmptyObject(obj)) {
                    valid = true;
                }
                if (valid) {
                    console.log('validateFunform表单校验', valid, obj, this.formData);
                    this.isLoading(true);
                    setTimeout(() => {
                        this.isLoading(false);
                    }, 1000);
                    fun();
                }
            });
        },
        onSubmit(formName, type) {
            if (!debounceWork('form', 500)) {
                this.$message.warning('操作过于频繁');
                return;
            }
            const _this = this;
            this.$refs[formName].validate((valid, obj) => {
                const { ue, videoOrPicture } = this.$refs;
                if (ue) {
                    ue.map(item => {
                        this.formData[item.$parent.prop] = item.getUEContent();
                        if (this.formData[item.$parent.prop]) {
                            item.$parent.clearValidate();
                            delete obj[item.$parent.labelFor];
                        }
                    });
                }
                if (videoOrPicture) {
                    videoOrPicture.map(item => {
                        let _value = _this.formData[item.$parent.labelFor];
                        if (_value && _value.length > 0) {
                            item.$parent.clearValidate();
                            delete obj[item.$parent.labelFor];
                        }
                    });
                }
                if (isEmptyObject(obj)) {
                    valid = true;
                }
                if (valid) {
                    console.log('onSubmitform表单校验', valid, obj, this.formData);
                    this.isLoading(true);
                    setTimeout(() => {
                        this.isLoading(false);
                    }, 1000);
                    this.$emit('save', type);
                }
            });
        },
        onCancel() {
            // this.$refs[formName].resetFields();
            if (this.$route.query.from && process.env.ENV !== 'local') {
                window.parent.postMessage(
                    {
                        type: 'closeTab',
                        url: this.$route.path,
                    },
                    '*'
                );
            } else {
                window.history.back();
            }
        },
        // 树的选择 index表示是第几棵树
        checkFun(current, checkObj, name, checkstrictly, currentIndex) {
            let resultData;
            if (checkstrictly) {
                resultData = [current.id];
                this.$refs.tree[0].setCheckedKeys(resultData);
                this.$set(this.formData, name, resultData);
            } else {
                let data = this.$refs.tree.map((item, index) => {
                    if (index === currentIndex) {
                        return [];
                    }
                    return item.getCheckedKeys();
                });
                resultData = flatten(data).concat(checkObj.checkedKeys);
                this.$set(this.formData, name, resultData);
            }
            if (resultData.length) {
                this.$refs.tree[0].$parent.clearValidate();
            } else {
                this.$refs.form.validateField(name);
            }
        },
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
                    if (item.type === 'twoDate') {
                        this.rules[`begin${item.name}`] = temp;
                        this.rules[`end${item.name}`] = temp;
                    } else {
                        this.rules[item.name] = temp;
                    }
                }
            });
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
        isLoading(isLoad = false) {
            if (isLoad) {
                window.form_loading = this.$loading({
                    lock: true,
                    text: 'Loading...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                });
            } else {
                window.form_loading.close();
            }
        },
        twoDateStyle(inputStyle, labelWidth) {
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
    .el-input-number.el-input-number--medium.is-disabled {
        .el-input-number__decrease {
            display: none;
        }
        .el-input-number__increase {
            display: none;
        }
    }

    .modalFormSolid {
        height: 1px;
        margin: 17px 0 12px;
        background-color: #fdfdff;
        box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.1);
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
    .center {
        text-align: center;
    }
    .treeSurround {
        display: flex;
        justify-content: flex-start;
        .treeSurroundinner {
            border: 1px solid rgba(121, 121, 121, 1);
            margin-right: 16px;
            height: 300px;
            color: #333333;
            overflow: hidden;
            overflow-y: auto;
            .el-tree {
                width: 240px;
            }
            p {
                line-height: 36px;
                border-bottom: 1px solid rgba(121, 121, 121, 1);
                background: rgba(242, 242, 242, 1);
                text-align: center;
                margin: 0;
            }
        }
    }
    .hasBtn {
        .el-form-item__content {
            display: flex;
            flex-direction: column;
            .el-button {
                margin-left: 0;
                margin-top: 8px;
                width: 150px;
            }
            .projectuserName {
                padding-right: 8px;
                width: 200px;
                display: inline-block;
            }
            .projectdel {
                color: red;
                padding-left: 40px;
                cursor: pointer;
            }
        }
    }
    .treeSurround + p {
        margin: 0;
        line-height: 24px;
    }
    .el-input-group__append button.el-button {
        margin-left: -20px;
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
    .el-autocomplete {
        width: 100%;
    }
    .el-autocomplete-suggestion__wrap {
        max-height: 700px;
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
    .el-form-item__content {
        display: flex;
        justify-content: flex-start;
        .el-radio-group,
        .el-switch {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 36px;
        }
    }
    .spider_form_data_extra {
        display: inline-block;
        color: #666;
    }
    .spider_form_data_connect {
        width: 36px;
        text-align: center;
        color: #666;
    }
    .spider_form_data_cut {
        font-size: 20px;
        padding-left: 16px;
        margin-top: 16px;
        margin-bottom: 16px;
        border-bottom: 1px solid #ccc;
        width: 100%;
        color: #000;
        .cut_handle {
            color: #3a8ee6;
            float: right;
            margin-right: 16px;
            cursor: pointer;
        }
    }
    .elbtnStyle {
        .el-button:nth-child(1),
        .restBtngather:nth-child(1) {
            margin-left: 0px;
        }
        .restBtngather {
            margin-left: 9px;
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
    }
    .el-input-number.is-controls-right .el-input__inner {
        text-align: left;
    }
    .el-form-item--medium .el-form-item__label {
        color: #aaa;
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
    width: 800px;
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
</style>
