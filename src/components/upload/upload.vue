<template>
   <div class="sf_upload">
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
            :class="{ uploadSHow: disabled, upload: true}"
        >
            <el-button type="primary" class="uploadImgOrVideo">上传</el-button>
        </el-upload>
        <draggable
            v-if="formData[bindName]" 
            class="draggable" 
            v-model="formData[bindName]" 
            tag="ul" v-bind="dragOptions"
        >
            <li v-for="(item, index) of formData[bindName]" :key="item.url+index">
                <div v-if="!disabled" class="sortAndCkeck">
                    <span>{{index+1}}</span>
                    <el-checkbox v-model="item.checked"></el-checkbox>
                </div>
                <div v-if="!disabled && index === 0 && isFacePic" class="facePic">
                </div>
                <span class="icon">
                    <i v-if="isWrite" class="el-icon-tickets" @click="() => isWriteFun(item)"></i>
                    <i class="el-icon-zoom-in" @click="() => handlePictureCardPreview(item)"></i>
                    <i v-if="!disabled" class="el-icon-delete" @click="() => handleRemove(item, formData[bindName].filter(value => value.url !== item.url))"></i>
                </span>
                <!-- <i class="el-icon-upload-success el-icon-check"></i> -->
                <img v-if="flagType === 'picture'" :src="item.url" alt="">
                <div v-if="flagType === 'video'" class="uploadVideo">
                    <video :src="item.url" :class="{video: true, deleteShow: disabled}" controls="controls">您的浏览器不支持视频播放</video>
                    <span v-if="!disabled" @click="() => handleRemove(item, formData[bindName].filter(value => value.url !== item.url))">删除</span>
                </div>
            </li>
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
    methods: {
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
                this.$parent.$parent.$parent.validateField([this.bindName]);
            }
        },
        handleAvatarSuccess(res) {
            let data = [];
            if (this.formData[this.bindName] instanceof Array) {
                data = this.formData[this.bindName];
            }
            data.push(res.Data[0]);
            this.$set(this.formData, this.bindName, data);
            if (this.flagType === 'video') {
                this.isLoading(false);
            }
            this.$parent.clearValidate();
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
            if (data.length >= this.max) {
                this.$message.error(`最多只能上传${this.max}张!`);
                return false;
            }
            let isLtMuchM;
            if (this.flagType === 'video') {
                this.isLoading(true);
                let isvideo = true;
                isLtMuchM = file.size / 1024 / 1024 < this.size;
                isvideo = /video/.test(file.type);
                if (!isvideo) {
                    this.isLoading(false);
                    this.$message.error('只能上传视频图片格式!');
                    return false;
                }
            } else if (this.flagType === 'picture') {
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
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .uploadSHow .el-upload.el-upload--picture-card {
        display: none;
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
            overflow: hidden;
            .sortAndCkeck {
                background: none;
                position: absolute;
                top: 0;
                left: 0px;
                display: flex;
                flex-flow: row;
                justify-content: space-between;
                width: 100%;
                align-items: flex-start;
                span {
                    padding-left: 4px;
                    font-size: 16px;
                    color: white;
                    line-height: initial;
                }
                .el-checkbox {
                    padding-right: 4px;
                    line-height: initial;
                }
            }
            .facePic {
                position: absolute;
                right: -17px;
                bottom: -7px;
                width: 46px;
                height: 26px;
                background: #13ce66;
                text-align: center;
                transform: rotate(-45deg);
                box-shadow: 0 1px 1px #ccc;
            }
            img {
                width: 100%;
                height: 100%;
                vertical-align: bottom;
            }
            .icon {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                background: rgba(0, 0, 0, 0.5);
                opacity: 0;
                transition: opacity 0.3s;
                i {
                    width: 20px;
                    height: 20px;
                    font-size: 20px;
                    color: white;
                    margin-left: 15px;
                }
                i:nth-child(1) {
                    margin-left: 0;
                }
            }
            .icon:hover {
                opacity: 1;
            }
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
            line-height: 20px;
            width: 100%;
            cursor: pointer;
            color: red;
        }
    }
    .uploadImgOrVideo {
        margin-left: 0;
    }
    .video {
        width: 100%;
        height: 128px;
    }
    .deleteShow {
        height: 148px;
    }
}
</style>
