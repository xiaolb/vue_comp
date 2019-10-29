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
}
.popOut .el-dialog {
    max-height: 600px;
    margin-bottom: 0;
}
.bodyScrollHeight {
    overflow-y: auto;
}
.sidebar_in {
    animation: sidebar_in 0s;
}
@keyframes sidebar_in {
    0% {
        transform: translate3d(100%, 0, 0);
        opacity: 0;
    }
    100% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}
.sidebar_out {
    animation: sidebar_out 0s;
}

@keyframes sidebar_out {
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    100% {
        transform: translate3d(100%, 0, 0);
        opacity: 0;
    }
}

.el-dialog__header {
    display: flex;
    .el-dialog__title {
        font-size: 18px;
        color: #303133;
        font-weight: 600;
    }
    .el-dialog__headerbtn {
        top: 12px;
        font-size: 26px;
    }
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .el-dialog {
        margin: 0 !important;
    }
    .el-dialog__body {
        padding: 16px 16px 0;
    }
    .el-dialog__footer {
        padding: 16px 16px 20px;
        text-align: left;
        z-index: 2;
        position: relative;
        box-shadow: 2px 0px 5px #ccc;
    }
}
.isFlagSearch {
    .el-dialog__body {
        padding: 0px;
    }
}
.noModal.el-dialog__wrapper {
    left: auto;
}
.bodyScrollHeight::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
    background-color: #ffffff;
}
.bodyScrollHeight::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    background: #d5dbe7;
}
.bodyScrollHeight::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 2px;
    background: rgba(0, 0, 0, 0.01);
}
</style>

<template>
    <el-dialog
        :title="title"
        :visible.sync="visible"
        :center="false"
        :modal="modal"
        :width="width"
        :append-to-body="appendToBody"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :before-close="onCancel"
        @opened="opened"
        :class="{
            isDialog: true,
            popOut: !search,
            isFlagSearch: search,
            sidebar_in: search && visible, 
            sidebar_out: search && !visible,
            el_dialog_myself: true,
            noDialogHeader: !title,
            noModal: !modal,
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
                :showText="showText"
                :bottom-fixed="bottomFixed"
            ></form-item>
        </div>
        <div class="_dialogFooter">
            <slot name="footer"></slot>
        </div>
        <div
            v-if="!modalBtns.length && !nobtn && !allDisabled"
            slot="footer" class="dialog-footer"
            :style="{ marginLeft: bottomCenter === 'left' ? labelWidth || '100px' : 0, textAlign: bottomCenter}"
        >
            <el-button type="primary" @click="saveDialog">{{ saveDialogText }}</el-button>
            <el-button @click="onCancel">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import FormItem from '@/components/form/';
import { debounceWork } from '@/components/utils';
function getNum() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let nums = '';
    for (let i = 0; i < 8; i++) {
        const id = parseInt(Math.random() * 61);
        nums += chars[id];
    }
    return nums;
}
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
        // 底部按钮居中 默认居左
        bottomCenter: {
            type: String,
            default: 'left',
        },
        // disabled显示文本
        showText: {
            type: Boolean,
            default: false,
        },
        // 是否需要蒙层
        modal: {
            type: Boolean,
            default: false,
        },
        // 是否添加到body下边
        appendToBody: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            bodyScrollHeight: { maxHeight: '0px' },
            updateCount: 0,
            elDialogClass: `modal_${getNum()}`,
        };
    },
    mounted() {
        // 当前模态框唯一标识
        this.$vnode.elm.classList.add(this.elDialogClass);
        window.getModalScrollHeight = this.getscrollHeight;
        this.timeInterCount = setInterval(() => {
            if (document.querySelector(`.${this.elDialogClass} ._dialogFooter`)) {
                clearInterval(this.timeInterCount);
                this.getscrollHeight();
            }
        }, 100);
        setTimeout(() => {
            clearInterval(this.timeInterCount);
        }, 5000);
    },
    created() {
        console.log('-------------------dialog弹窗-------------------------');
    },
    methods: {
        opened() {
            this.getscrollHeight();
            clearInterval(this.timeInterCount);
        },
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
            const { title, modalBtns, nobtn, allDisabled, elDialogClass } = this;
            const removeHeaderHeight = title ? 54 : 0;
            const removeFotterHeight = !modalBtns.length && !nobtn && !allDisabled ? 76 : 20;

            const _dialogHeader = document.querySelector(`.${elDialogClass} ._dialogHeader`);
            const _dialogFooter = document.querySelector(`.${elDialogClass} ._dialogFooter`);
            const removeSoltHeaderHeight = (_dialogHeader && _dialogHeader.offsetHeight) || 0;
            const removeSoltFooterHeight = (_dialogFooter && _dialogFooter.offsetHeight) || 0;
            const scrollHeight = removeHeaderHeight + removeFotterHeight + removeSoltHeaderHeight + removeSoltFooterHeight;

            if (this.search) {
                this.bodyScrollHeight = { maxHeight: window.innerHeight - scrollHeight + 'px' };
            } else {
                const _elDialogHeight = 600; // 最大默认600
                this.bodyScrollHeight = { maxHeight: _elDialogHeight - scrollHeight + 'px' };
            }

            // header下的线
            if (this.title) {
                const el_dialog__header = document.querySelector(`.${elDialogClass} .el-dialog__header`);
                if (el_dialog__header) {
                    el_dialog__header.style.borderBottom = '1px solid #E6EBF5';
                }
            }
        },
    },
};
</script>
