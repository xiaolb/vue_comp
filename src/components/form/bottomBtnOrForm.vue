<template>
    <div id="bottomBtnOrForm">
        <section>
            <el-button v-if="cancelBtn" @click="onCancel('form')">{{ cancelBtnText }}</el-button>
            <el-button v-if="saveBtn" type="primary" @click="onSubmit()">{{ saveBtnText }}</el-button>
            <div v-for="(btn, index) of buttons" :key="btn.name" :class="{ restBtngather: true }">
                <el-button
                    v-if="!btn.hidden"
                    :disabled="!!btn.disabled"
                    :class="{ restBtn: index === 0 }"
                    :type="btn.type || 'primary'"
                    :size="searchFooterMar ? 'small' : 'medium'"
                    @click="
                        () => {
                            validateFun(btn.onclick, btn.validate, btn.loading);
                        }
                    "
                    >{{ btn.name }}</el-button
                >
            </div>
        </section>
        <Form 
            ref="btnForm"
            v-if="formItemsBtn.length > 0"
            :form-items="formItemsBtn"
            :form-data="formData"
            :formWidth="'400px'"
        ></Form>
    </div>
</template>
<script>
import { flatten, isEmptyObject, debounceWork } from '@/components/utils';
import { setInterval, clearInterval } from 'timers';

export default {
    name: 'bottomBtnOrForm',
    props: {
        // 按钮旁边的表单
        formItemsBtn: {
            type: Array,
            default: () => [],
        },
        formData: {
            type: Object,
            required: true,
        },
        allDisabled: {
            type: Boolean,
            required: true,
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
        // search表单的时候不展示
        searchFooterMar: {
            type: Boolean,
            default: false,
        },
        refsForm: {
            required: true,
        },
    },
    mounted() {},
    methods: {
        // button做表单的校验
        validateFun(fun, validate, loading) {
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

            this.refsForm.validate((valid, obj) => {
                if (this.validateUeOrvideoOrPicture(valid, obj)) {
                    console.log('validateFunform表单校验', valid, obj, this.formData);
                    this.isLoading(true);
                    setTimeout(() => {
                        this.isLoading(false);
                    }, 1000);
                    fun();
                }
            });
        },
        // 保存按钮
        onSubmit(type) {
            if (!debounceWork('form', 500)) {
                this.$message.warning('操作过于频繁');
                return;
            }
            this.refsForm.validate((valid, obj) => {
                if (this.validateUeOrvideoOrPicture(valid, obj)) {
                    console.log('onSubmitform表单校验', valid, obj, this.formData);
                    this.isLoading(true);
                    setTimeout(() => {
                        this.isLoading(false);
                    }, 1000);
                    this.$emit('save', type);
                }
            });
        },
        // 校验ue和地图
        validateUeOrvideoOrPicture(valid, obj) {
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
                    let _value = this.formData[item.$parent.labelFor];
                    if (_value && _value.length > 0) {
                        item.$parent.clearValidate();
                        delete obj[item.$parent.labelFor];
                    }
                });
            }
            if (isEmptyObject(obj)) {
                valid = true;
            }
            return valid;
        },
        onCancel() {
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
    },
};
</script>
<style lang="scss">
#bottomBtnOrForm {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-right: 64px;
    section {
        display: flex;
    }
    .el-button:nth-child(1),
    .restBtngather:nth-child(1) {
        margin-left: 0px;
    }
    .restBtngather {
        margin-left: 9px;
    }
    .spider_form_data {
        & > div {
            height: 36px;
        }
        .el-form {
            padding-bottom: 0;
            display: flex;
            justify-content: flex-end;
        }
        .el-form-item {
            margin-bottom: 0 !important;
        }
    }
}
</style>