<template>
   <div class="sf_upload">
        <draggable
            class="draggable" 
            v-model="formData[bindName]" 
            tag="ul" v-bind="dragOptions"
        >
            <el-upload
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
                :show-file-list="false"
                :class="{ uploadHidden: disabled, upload: true}"
            >
                <img v-if="max === 1 && formData[bindName] && formData[bindName][0] && formData[bindName][0].url" :src="formData[bindName][0].url" class="avatar">
                <span v-else class="selfIcon">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </span>
                <div v-if="isPicture" class="scanPic">
                    <img class="sendPic" src="https://imgapi.apitops.com/TEST/bigdata-mgr/20190826/f137a9562d774b09938ec3360b551d04.jpg" alt="">
                </div>
                <img v-if="isPicture" class="sendbigPic" src="https://imgapi.apitops.com/TEST/bigdata-mgr/20190826/f137a9562d774b09938ec3360b551d04.jpg" alt="">
            </el-upload>
            <template v-if="formData[bindName] && (max !== 1 || disabled)">

                <li v-for="(item, index) of formData[bindName]" :key="item.url+index">
                    <div v-if="!disabled" class="sortAndCkeck">
                        <el-checkbox v-model="item.checked"></el-checkbox>
                    </div>
                    <div v-if="!disabled && index === 0 && isFacePic && isPicture" class="facePic">
                        封面
                    </div>
                    <i v-if="isPicture" class="el-icon-zoom-in preview" @click="() => handlePictureCardPreview(item)"></i>
                    <span v-if="isPicture" class="icon">
                        <span v-if="!disabled" @click="() => settingFace(item, index)">设为封面</span>
                        <span v-if="isWrite" @click="() => isWriteFun(item)">备注</span>
                        <span v-if="!disabled" @click="() => handleRemove(item, formData[bindName].filter(value => value.url !== item.url))">删除</span>
                    </span>
                    <img v-if="isPicture" :src="item.url" alt="">
                    <div v-if="isVideo" class="uploadVideo">
                        <video :src="item.url" :class="{video: true, deleteShow: disabled}" controls="controls">您的浏览器不支持视频播放</video>
                        <span v-if="!disabled" @click="() => handleRemove(item, formData[bindName].filter(value => value.url !== item.url))">删除</span>
                    </div>
                </li>
            </template>
        </draggable>
        <div v-if="Array.isArray(hint)" class="hint">
            <p v-for="(item, index) of hint" :key="index">{{item}}</p>
        </div>
        <span v-else>{{hint}}</span>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
   </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
    name: 'UploadItem',
    components: {
        draggable,
    },
    props: {
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
    },
    data() {
        return {
            dragOptions: {
                sort: true,
                group: true,
                disabled: this.disabled,
            },
            dialogVisible: false,
            dialogImageUrl: '',
            headers: {
                Authorization: this.uploadAK,
            },
            isUploadList: [],
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
    methods: {
        // 设置封面
        settingFace(item, index) {
            const arrsFace = this.formData[this.bindName];
            arrsFace.splice(index, 1);
            arrsFace.unshift(item);
            this.$set(this.formData, this.bindName, arrsFace);
        },
        handleRemove(file, fileList) {
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
        },
        handleAvatarSuccess(res) {
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
                const el = document.querySelector('.sf_upload');
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
        right: -44px;
        top: -44px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        transform: rotate(-45deg);
        border-top: 45px solid transparent;
        border-right: 45px solid transparent;
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
        width: 148px;
        height: 148px;
        cursor: pointer;
        line-height: 146px;
        vertical-align: top;
        display: inline-block;
    }
    .el-upload {
        position: relative;
        .sendbigPic {
            position: absolute;
            top: 30px;
            left: 150px;
            z-index: 2;
            padding: 10px;
            border: 1px solid #c0ccda;
            background: #fff;
            width: 148px;
            height: 148px;
            border-radius: 4px;
            opacity: 0;
            transition: opacity 0.3s;
        }
    }
    .scanPic:hover + .sendbigPic {
        opacity: 1;
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
            width: 146px;
            height: 146px;
            margin: 0 10px 8px 0;
            border-radius: 4px;
            border: 1px dashed #eeeeee;
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
                width: 20px;
                height: 20px;
                font-size: 20px;
                color: white;
                opacity: 0;
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
                    height: 20px;
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
            line-height: 32px;
        }
    }
    .uploadVideo {
        position: relative;
        width: 146px;
        height: 146px;
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
    .video {
        width: 100%;
        height: 148px;
    }
    .deleteShow {
        height: 148px;
    }
}
</style>
