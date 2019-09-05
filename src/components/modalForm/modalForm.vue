<style lang="scss">
.isDialog.isFlagSearch {
    .bottomFixed {
        margin-left: -16px;
        padding-left: 16px;
    }
    .el-dialog {
        position: fixed;
        right: 0;
        margin-bottom: 0;
        margin-top: 0 !important;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
    .bodyScrollHeight {
        overflow-y: auto;
        box-sizing: border-box;
        padding: 16px 16px;
        flex-grow: 1;
    }
    .el-dialog__header {
        display: flex;
    }
    .el-dialog__headerbtn {
        top: calc(50% - 16px);
        left: -40px;
        width: 40px;
        height: 40px;
        background: #409eff;
        .el-dialog__close {
            color: white;
            font-size: 24px;
        }
    }
    ._dialogHeader {
        height: auto;
    }
    ._dialogFooter {
        position: absolute;
        z-index: 4;
        bottom: 0;
        height: auto;
        width: 100%;
        background: #ffffff;
    }
    @keyframes dialog-fade-in {
        0% {
            transform: translate3d(100%, 0, 0);
            opacity: 0;
        }
        50% {
            transform: translate3d(0, 0, 0);
            opacity: 0.5;
        }
        100% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    }

    @keyframes dialog-fade-out {
        0% {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
        50% {
            transform: translate3d(0, 0, 0);
            opacity: 0.5;
        }
        100% {
            transform: translate3d(100%, 0, 0);
            opacity: 0;
        }
    }
}

// .el_dialog_myself {
//     .bottomFixed {
//         margin-left: -16px;
//         padding-left: 16px;
//     }
// }

.el-dialog__header {
    display: flex;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: rgba(0, 0, 0, 0.8);
}
.noDialogHeader {
    .el-dialog__header {
        height: 0;
        padding: 0;
    }
}
.el-dialog__body {
    display: flex;
    flex-direction: column;
}
.el_dialog_myself {
    .el-dialog__body {
        padding: 16px 16px 0;
    }
    .el-dialog__footer {
        padding: 16px 16px 20px;
        text-align: left;
        // margin-left: 100px;
        z-index: 2;
        position: relative;
    }
}
.isFlagSearch {
    .el-dialog__body {
        padding: 0px;
    }
}
.bodyScrollHeight::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
.bodyScrollHeight::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
}
.bodyScrollHeight::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
}
</style>

<template>
    <el-dialog
        :title="title"
        :visible.sync="visible"
        :center="false"
        :width="width"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :before-close="onCancel"
        :class="{
            isDialog: true,
            isFlagSearch: search,
            el_dialog_myself: true,
            noDialogHeader: !title,
            btnFixed: formDialogItems.length > 0 && modalType === 'form', // 矫正悬浮的按钮的位置
        }"
    >
        <div class="_dialogHeader">
            <slot name="header"></slot>
        </div>
        <div class="bodyScrollHeight" :style="[bodyScrollHeight || {}]">
            <slot></slot>
            <form-item
                v-if="formDialogItems.length > 0 && modalType === 'form'"
                ref="modalForm"
                :form-items="formDialogItems"
                :all-disabled="allDisabled"
                :form-data="formData"
                :label-width="labelWidth"
                :model-form="true"
                :buttons="modalBtns"
                :from-modal-solid="nobtn"
                :annotation="annotation"
                :bottom-fixed="bottomFixed"
            ></form-item>
        </div>
        <div class="_dialogFooter">
            <slot name="footer"></slot>
        </div>
        <div v-if="!modalBtns.length && !nobtn && !allDisabled" slot="footer" class="dialog-footer" :style="{ marginLeft: labelWidth || '100px' }">
            <el-button type="primary" @click="saveDialog">{{ saveDialogText }}</el-button>
            <el-button @click="onCancel">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import FormItem from '@/components/form/';
import { debounceWork } from '@/components/utils';

export default {
    name: 'ModalForm',
    components: {
        FormItem,
    },
    props: {
        // dialog的标题
        title: {
            type: String,
            default: '',
        },
        // dialog的宽度
        width: {
            type: String,
            default: '600px',
        },
        // 高级筛选
        search: {
            type: Boolean,
            default: false,
        },
        // 是否展示dialog
        visible: {
            type: Boolean,
            default: false,
            required: true,
        },
        //重新命名按钮及事件
        modalBtns: {
            type: Array,
            default: () => [],
        },
        // dialog里边是表单还是表格
        modalType: {
            type: String,
            default: 'form',
        },
        // 表单
        formDialogItems: {
            type: Array,
            default: () => [],
        },
        // 表单数据
        formData: {
            type: Object,
            default: () => {},
        },
        // 保存按钮文本
        saveDialogText: {
            type: String,
            default: '确定',
        },
        // modalForm的注释信息
        annotation: {
            type: String,
            default: '',
        },
        // 表单不可编辑
        allDisabled: {
            type: Boolean,
            default: false,
        },
        // 没有操作按钮
        nobtn: {
            type: Boolean,
            default: false,
        },
        // form 表单label宽度
        labelWidth: {
            type: String,
            default: '100px',
        },
        // 按钮悬浮
        bottomFixed: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            bodyScrollHeight: { maxHeight: '0px' },
            updateCount: 0,
        };
    },
    updated() {
        this.visible && this.updateCount < 2 && this.getscrollHeight();
    },
    mounted() {
        this.getscrollHeight();
        window.getModalScrollHeight = this.getscrollHeight;
    },
    created() {
        console.log('-------------------dialog弹窗-------------------------');
    },
    methods: {
        onCancel() {
            this.updateCount = 0;
            this.$emit('onCancel');
        },
        saveDialog() {
            if (!debounceWork('form', 500)) {
                this.$message.warning('操作过于频繁');
                return;
            }
            if (this.modalType === 'form') {
                const modalform = this.$refs['modalForm'];
                modalform.$refs['form'].validate(valid => {
                    console.log('form表单校验', valid);
                    valid && this.$emit('saveDialog');
                });
            }
        },
        getscrollHeight() {
            this.updateCount += 1;
            const { title, modalBtns, nobtn, allDisabled } = this;
            const removeHeaderHeight = title ? 54 : 0;
            const removeFotterHeight = !modalBtns.length && !nobtn && !allDisabled ? 76 : 20;

            const _dialogHeader = document.querySelectorAll('._dialogHeader');
            const _dialogFooter = document.querySelectorAll('._dialogFooter');
            const removeSoltHeaderHeight = (_dialogHeader[0] && _dialogHeader[0].offsetHeight) || 0;
            const removeSoltFooterHeight = (_dialogFooter[0] && _dialogFooter[0].offsetHeight) || 0;
            const scrollHeight = removeHeaderHeight + removeFotterHeight + removeSoltHeaderHeight + removeSoltFooterHeight;
            this.bodyScrollHeight = { maxHeight: window.innerHeight - scrollHeight + 'px' };

            // header下的线
            if (this.title) {
                const el_dialog__header = document.querySelector('.el-dialog__header');
                if (el_dialog__header) {
                    el_dialog__header.style.borderBottom = '1px solid #ccc';
                }
            }
        },
    },
};
</script>
