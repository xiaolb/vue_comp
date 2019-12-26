<template>
    <div class="sf_upload">
        <!-- 提示语句 -->
        <div v-if="Array.isArray(hint)" class="hint">
            <p v-for="(item, index) of hint" :key="index">{{item}}</p>
        </div>
        <p class="hint-single" v-else-if="hint">{{hint}}</p>
        <!-- 上传控件 -->
        <template v-if="showUpload">
            <el-upload
                v-if="multiple"
                class="draggable-upload"
                ref="upload"
                :style="styleUpload"
                :limit="max"
                :multiple="multiple"
                :action="uploadUrl"
                :list-type="'picture-card'"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :disabled="disabled"
                :headers="headers"
                :file-list="formData[bindName] || []"
                :with-credentials="true"
                :on-success="handleAvatarSuccess"
                :on-progress="handleFileProgress"
                :http-request="uploadFun"
                :show-file-list="false"
                :class="{ uploadHidden: disabled, upload: true, ...uploadClass}"
            >
                <img
                    v-if="max === 1 && formData[bindName] && formData[bindName][0] && formData[bindName][0].url"
                    :style="picStyle"
                    :src="formData[bindName][0].url"
                    class="avatar"
                />
                <span v-else class="selfIcon" :style="picStyle">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </span>
                <div v-if="isPicture && scanPics" class="scanPic" @click.stop="phoneSendPhoto">
                    <img class="sendPic" src="//static.apitops.com/h5/common/images/phone@2x.png" alt="">
                </div>
            </el-upload>
            <el-upload
                v-else
                :style="styleUpload"
                class="draggable-upload"
                ref="upload"
                :action="uploadUrl"
                :list-type="'picture-card'"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :disabled="disabled"
                :headers="headers"
                :file-list="formData[bindName] || []"
                :with-credentials="true"
                :on-success="handleAvatarSuccess"
                :on-progress="handleFileProgress"
                :show-file-list="false"
                :class="{ uploadHidden: disabled, upload: true, ...uploadClass}"
            >
                <img
                    v-if="max === 1 && formData[bindName] && formData[bindName][0] && formData[bindName][0].url"
                    :style="picStyle"
                    :src="formData[bindName][0].url"
                    class="avatar"
                />
                <span v-else class="selfIcon" :style="picStyle">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </span>
                <div v-if="isPicture && scanPics" class="scanPic" @click.stop="phoneSendPhoto" >
                    <img class="sendPic" src="//static.apitops.com/h5/common/images/phone@2x.png" alt="">
                </div>
            </el-upload>
        </template>
        <!-- 图片列表 -->
        <draggable :class="{draggable: true, [!disabled && uploadLocal]: true}" v-model="formData[bindName]" tag="ul" v-bind="dragOptions" >
            <template v-if="formData[bindName] && (max !== 1 || disabled)">
                <li v-for="(item, index) of formData[bindName]" :key="item.url+index" :style="picStyle" :class="{'drag-able': true, curDragLi:true}">
                    <div v-if="!disabled && chooseable" class="sortAndCkeck">
                        <el-checkbox v-model="item.checked"></el-checkbox>
                    </div>
                    <div v-if="!disabled && index === 0 && isFacePic && isPicture" class="facePic">
                        封面
                    </div>
                    <i v-if="isPicture && showable" class="el-icon-zoom-in preview" @click="() => handlePictureCardPreview(item)"></i>
                    <span v-if="isPicture" :class="{icon: !disabled || isWrite}">
                        <span v-if="!disabled && setable && isFacePic" @click="() => settingFace(item, index)">设为封面</span>
                        <span v-if="isWrite" @click="() => isWriteFun(item)">备注</span>
                        <span v-if="!disabled" @click="() => handleRemove(item, formData[bindName].filter(value => value.url !== item.url))">删除</span>
                    </span>
                    <img v-if="isPicture" :src="item.url" alt="">
                    <div v-if="isVideo" class="uploadVideo" :style="picStyle">
                        <video :src="item.url" :style="picStyle" :class="{video: true, deleteShow: disabled}" controls="controls">您的浏览器不支持视频播放</video>
                        <span v-if="!disabled" @click="() => handleRemove(item, formData[bindName].filter(value => value.url !== item.url))">删除</span>
                    </div>
                </li>
            </template>
        </draggable>
        <!-- 预览弹窗 -->
        <el-dialog :visible.sync="dialogVisible" class="uploadElDialog" append-to-body>
            <img :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import draggable from 'vuedraggable';
import { debounceWork, getNum } from '@/components/utils';

export default {
    name: 'UploadItem',
    components: {
        draggable,
    },
    props: {
        // 图片是否可拖拽
        draggable: {
            type: Boolean,
            default: true,
        },
        // 多张上传
        multiple: {
            type: Boolean,
            default: false,
        },
        //最大上传数
        max: {
            type: Number,
            default: 1,
        },
        // 提示 为数组的时候是多个，否则为字符串
        hint: {
            type: [Array, String],
            default: '',
        },
        // 图片还是视频
        flagType: {
            required: true,
            type: String,
        },
        // 展示的名字
        bindName: {
            required: true,
            type: String,
        },
        // 是否可编辑
        disabled: {
            type: Boolean,
            default: false,
        },
        // 是否设为封面
        setable: {
            type: Boolean,
            default: true,
        },
        // 放大标识是否显示
        showable: {
            type: Boolean,
            default: true,
        },
        // 图片是否可选择
        chooseable: {
            type: Boolean,
            default: true,
        },
        // 表单数据
        formData: {
            type: Object,
            default: () => {},
        },
        // 大小限制
        size: {
            type: Number,
            default: 10000,
        },
        // 是否展示封面图标
        isFacePic: {
            type: Boolean,
            default: false,
        },
        // 是否可以填写备注
        isWrite: {
            type: Boolean,
            default: false,
        },
        // 是否可写
        isWriteFun: {
            type: Function,
            default: () => {},
        },
        // ak，上传的话是必须的
        uploadAK: {
            required: true,
            type: String,
            default: '',
        },
        // 上传url
        uploadUrl: {
            required: true,
            type: String,
            default: '',
        },
        uploadFun: {
            type: Function,
            default: () => {},
        },
        // 上传样式
        uploadClass: {
            type: Object,
            defalut: () => {},
        },
        // 上传的位置
        uploadLocal: {
            type: String,
            default: 'before',
        },
        // 图片的大小
        picStyle: {
            type: Object,
            default: () => ({
                width: '148px',
                height: '148px',
            }),
        },
        // 手机传图
        scanPics: {
            type: Boolean,
            default: false,
        },
        //手机传图操作
        phoneSendPhotoFun: {
            type: Function,
            default: () => {},
        },
    },
    data() {
        return {
            dragOptions: {
                sort: true,
                group: true,
                disabled: this.disabled,
                // 控制可拖拽的类名
                handle: this.draggable ? '.drag-able' : '.drag-disable',
            },
            dialogVisible: false,
            dialogImageUrl: '',
            headers: {
                Authorization: this.uploadAK,
            },
            isUploadList: [],
            styleUpload: {},
            backetData: [],
            showUpload: true, // 是否展示upload
            elUploadClass: `upload_${getNum()}`,
        };
    },
    computed: {
        isPicture() {
            return this.flagType === 'picture';
        },
        isVideo() {
            return this.flagType === 'video';
        },
    },
    watch: {
        formData: {
            handler(data) {
                if (JSON.stringify(this.backetData) !== JSON.stringify(data[this.bindName])) {
                    this.backetData = Object.assign({}, data[this.bindName]);
                    const _thisWatch = this;
                    setTimeout(() => {
                        _thisWatch.addChildLi();
                        setTimeout(() => {
                            if (_thisWatch.disabled) {
                                _thisWatch.removeChildLi();
                            }
                        }, 0);
                        if ((data[this.bindName] || []).length >= _thisWatch.max) {
                            _thisWatch.showUpload = false;
                            _thisWatch.$nextTick(() => {
                                _thisWatch.removeChildLi();
                            });
                        } else {
                            _thisWatch.showUpload = true;
                        }
                    }, 0);
                }
            },
            deep: true,
        },
    },
    created() {
        this.addStyle();
    },
    mounted() {
        // 给modal添加类
        this.addClass();
        if (!this.disabled) {
            this.addChildLi();
        }
    },
    methods: {
        // 手机传图操作
        phoneSendPhoto() {
            this.phoneSendPhotoFun();
        },
        removeChildLi() {
            const el = document.querySelector(`.${this.elUploadClass} .draggable`);
            const elLi = document.querySelector(`.${this.elUploadClass} .draggable ._lastLi`);
            if (elLi) {
                el.removeChild(elLi);
            }
        },
        addChildLi() {
            const el = document.querySelector(`.${this.elUploadClass} .draggable`);
            const li = document.createElement('li');
            li.classList.add('_lastLi');
            li.style.width = this.picStyle.width;
            li.style.height = this.picStyle.height;

            if (this.uploadLocal === 'before') {
                const el = document.querySelector(`.${this.elUploadClass} .draggable`);
                const curDragLi = document.querySelector(`.${this.elUploadClass} .draggable .curDragLi`);
                const lastLis = document.querySelector(`.${this.elUploadClass} ._lastLi`);
                // 在前边的时候只需一个
                // debugger;
                if (lastLis) return;
                if (curDragLi) {
                    el.insertBefore(li, curDragLi);
                } else {
                    el.appendChild(li);
                }
                this.setUploadLocal();
                return;
            } else {
                el.appendChild(li);
                // 获取所有的，保留最后一个，占位
                const lastLis = document.querySelectorAll(`.${this.elUploadClass} ._lastLi`);
                const maxLength = lastLis.length;
                lastLis.forEach((childEl, index) => {
                    if (index !== maxLength - 1) {
                        el.removeChild(childEl);
                    }
                });
                this.setUploadLocal();
            }
        },
        // 设置
        setUploadLocal() {
            const lastLi = document.querySelector(`.${this.elUploadClass} ._lastLi`);
            const offsetTop = lastLi.offsetTop;
            const offsetLeft = lastLi.offsetLeft;
            this.styleUpload = {
                left: offsetLeft + 'px',
                top: offsetTop + 'px',
            };
        },
        addClass() {
            // 当前模态框唯一标识
            this.$vnode.elm.classList.add(this.elUploadClass);
        },
        addStyle() {
            const style = document.createElement('style');
            const { uploadLocal, picStyle } = this;

            style.type = 'text/css';
            try {
                style.appendChild(document.createTextNode(`.${uploadLocal}::${uploadLocal}{width: ${picStyle.width};height:${picStyle.height}}`));
            } catch (ex) {
                style.styleSheet.cssText = `.${uploadLocal}::${uploadLocal}{width: ${picStyle.width};height:${picStyle.height}}`; //针对IE
            }
            const head = document.getElementsByTagName('head')[0];

            head.appendChild(style);
        },
        // 设置封面
        settingFace(item, index) {
            const arrsFace = this.formData[this.bindName];
            arrsFace.splice(index, 1);
            arrsFace.unshift(item);
            this.$set(this.formData, this.bindName, arrsFace);
            this.$message.success('设为封面成功，已移至首图');
        },
        handleRemove(file, fileList) {
            this.$confirm(`是否删除该图片/视频？`, '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'error',
            })
                .then(() => {
                    let newFileList = [...fileList];
                    newFileList = newFileList.map(item => {
                        let response = item.response;
                        if (response) {
                            return response.Data[0];
                        } else {
                            return item;
                        }
                    });
                    if (newFileList.length) {
                        this.formData[this.bindName] = newFileList;
                    } else {
                        this.formData[this.bindName] = null;
                        if (this.$parent && this.$parent.$parent && this.$parent.$parent.$parent && this.$parent.$parent.$parent.validateField) {
                            this.$parent.$parent.$parent.validateField([this.bindName]);
                        }
                    }
                    this.$message.success('移除成功！');
                })
                .catch(() => {});
        },
        handleFileProgress(e, res) {
            this.$refs.upload.submit();
        },
        handleAvatarSuccess(res, file, fileList) {
            if (!this.multiple && !debounceWork('beforeAvatarUpload', 1000)) {
                return;
            }
            const reData = this.formData[this.bindName];
            let data = [];
            if (this.formData[this.bindName] instanceof Array) {
                data = this.formData[this.bindName];
            }
            data = data.concat(res.Data);
            this.$set(this.formData, this.bindName, data);
            if (this.max === 1) {
                this.$set(this.formData, this.bindName, res.Data);
            }
            if (this.flagType === 'video') {
                this.isLoading(false);
            }
            if (this.$parent && this.$parent.clearValidate) {
                this.$parent.clearValidate();
            }
            console.log('========上传成功========', this.formData, res.Data);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeAvatarUpload(file) {
            const successData = this.formData[this.bindName] || [];
            const data = successData.filter(item => {
                return item.status === 'success' || !item.status;
            });
            if (data.length >= this.max && this.max !== 1) {
                this.$message.error(`最多只能上传${this.max}张!`);
                return false;
            }
            let isLtMuchM;
            if (this.isVideo) {
                this.isLoading(true);
                let isvideo = true;
                isLtMuchM = file.size / 1024 / 1024 < this.size;
                isvideo = /video/.test(file.type);
                if (!isvideo) {
                    this.isLoading(false);
                    this.$message.error('只能上传视频图片格式!');
                    return false;
                }
            } else if (this.isPicture) {
                let isimg = true;
                isLtMuchM = file.size / 1024 / 1024 < this.size;
                isimg = /jpeg|png/.test(file.type);
                if (!isimg) {
                    this.$message.error('只能上传jpg、png 图片格式!');
                    return false;
                }
            }

            if (!isLtMuchM) {
                this.$message.error(`上传文件不能超过${this.size}MB!`);
                return false;
            }
            return isLtMuchM;
        },
        isLoading(isLoad = false) {
            if (isLoad) {
                const el = document.querySelector(`.${this.elUploadClass}`);
                window.tops_loading = this.$loading({
                    target: el,
                    lock: true,
                    text: 'Loading...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                });
            } else {
                window.tops_loading.close();
            }
        },
        url_queryString(name) {
            // eslint-disable-next-line no-useless-escape
            const rex = new RegExp('[?&]s*' + name + 's*=([^&$#]*)', 'i');
            let str = location.pathname && location.pathname !== '/' ? location.pathname : location.search;
            const r = rex.exec(str);

            if (r && r.length === 2) {
                name === 'ak' && window.sessionStorage.setItem('ak', r[1]);
                return decodeURIComponent(r[1]);
            }
        },
    },
};
</script>
<style lang="scss">
.sf_upload {
    position: relative;
    .upload {
        margin-right: 10px;
        margin-bottom: 8px;
    }
    .uploadHidden {
        margin-right: 0px;
        .el-upload.el-upload--picture-card {
            display: none;
        }
    }
    .scanPic {
        position: absolute;
        right: -6px;
        top: -28px;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
        text-align: center;
        transform: rotate(-45deg);
        border-top: 45px solid transparent;
        // border-right: 45px solid transparent;
        border-bottom: 45px solid transparent;
        border-left: 45px solid #efeff4;
        .sendPic {
            position: absolute;
            top: -9px;
            right: 17px;
            transform: rotate(45deg);
            width: 15px;
            height: 25px;
        }
    }

    .selfIcon,
    .avatar {
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .el-upload-list.el-upload-list--picture-card.is-disabled + .el-upload.el-upload--picture-card {
        display: none;
    }
    .el-upload.el-upload--picture-card {
        line-height: normal;
        width: auto;
        height: auto;
        border: none;
    }
    ul.draggable {
        padding-left: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin: 0;
        li {
            position: relative;
            list-style-type: none;
            margin: 0 10px 8px 0;
            border-radius: 4px;
            border: 1px dashed #eeeeee;
            box-sizing: border-box;
            overflow: hidden;
            .sortAndCkeck {
                background: none;
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                flex-flow: row;
                justify-content: space-between;
                width: 100%;
                align-items: flex-start;
                .el-checkbox {
                    padding: 6px 0 0 8px;
                    line-height: initial;
                }
            }
            .facePic {
                position: absolute;
                right: -18px;
                top: 5px;
                width: 70px;
                height: 24px;
                font-size: 14px;
                line-height: 24px;
                color: #fff;
                background: #66c23a;
                text-align: center;
                transform: rotate(45deg);
            }
            .preview {
                position: absolute;
                left: 50%;
                top: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(0, 0, 0, 0);
                transition: opacity 0.3s;
                transform: translate(-50%, -50%);
                width: 100%;
                height: 80px;
                font-size: 20px;
                color: white;
                opacity: 0;
                cursor: pointer;
            }
            img {
                width: 100%;
                height: 100%;
                vertical-align: bottom;
            }
            .icon {
                width: 100%;
                height: 38px;
                position: absolute;
                left: 0;
                bottom: 0;
                display: flex;
                justify-content: space-around;
                align-items: center;
                background: rgba(0, 0, 0, 0.5);
                opacity: 0;
                transition: opacity 0.3s;
                span {
                    font-size: 14px;
                    color: white;
                    cursor: pointer;
                }
            }
        }
        li:hover .icon,
        li:hover .preview {
            opacity: 1;
        }
    }
    .hint {
        p {
            margin: 0;
            height: 32px;
            font-size: 14px;
            line-height: 32px;
            color: #909399;
        }
        p:last-child {
            padding-bottom: 20px;
        }
    }
    .hint-single {
        font-size: 14px;
        margin: 0;
        height: 32px;
        line-height: 32px;
        color: #909399;
        padding-bottom: 20px;
    }
    .uploadVideo {
        position: relative;
        box-sizing: border-box;
        span {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 1000;
            background: #ccc;
            text-align: center;
            line-height: 38px;
            height: 38px;
            width: 100%;
            cursor: pointer;
            color: white;
            background: rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: opacity 0.3s;
        }
    }
    .uploadVideo:hover span {
        opacity: 1;
    }
    .draggable-upload {
        position: absolute;
        box-sizing: border-box;
        z-index: 1;
        overflow: hidden;
    }
}
.uploadElDialog .el-dialog__body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 510px;
    padding: 20px 20px 40px;
    img {
        display: block;
        max-width: 100% !important;
        max-height: 510px;
    }
}
.uploadElDialog .el-dialog__header {
    border-bottom: none;
}
</style>
