<template>
    <div id="uploadItemTest">
        <upload-item
            v-model="formData[item.name]"
            :max="item.maxi"
            :hint="item.hint"
            :flag-type="item.name"
            :bind-name="item.name"
            :form-data="formData"
            :size="item.size"
            :is-face-pic="!!item.isFacePic"
            :is-write="!!item.isWrite"
            :is-write-fun="item.isWriteFun"
            :uploadUrl="item.uploadUrl"
            :uploadAK="item.uploadAK"
            :disabled="item.disabled"
            :scanPics="item.scanPics"
            :setable="item.setable"
            :multiple="item.multiple"
            :upload-fun="item.uploadFun"
            :phoneSendPhotoFun="phoneSendPhotoFun"
            :phoneSendPhotoPic="item.phoneSendPhotoPic"
            :onCancel="onCancel"
        ></upload-item>
    </div>
</template>
<script>
export default {
    name: 'uploadItemTest',
    data() {
        return {
            item: {
                phoneSendPhotoPic: false,
                multiple: false,
                maxi: 12,
                hint: '默认图片',
                hint: ['默认图片1', '默认图片2'],
                name: 'picture',
                size: 10,
                isFacePic: true,
                isWrite: true,
                disabled: false,
                uploadUrl: 'http://bigdata-api.apitops.com/api/v1/common/upload/files',
                uploadAK: '31c5df4c-054c-40a9-98fc-99e0fea40ef3',
                scanPics: 'https://imgapi.apitops.com/TEST/bigdata-mgr/20190826/f137a9562d774b09938ec3360b551d04.jpg',
                setable: true,
                isWriteFun: () => {
                    console.log('写入图片');
                },
                uploadFun: params => {
                    const fileobj = params.file;
                    const form = new FormData();
                    form.append('file', fileobj);
                    const xhr = new XMLHttpRequest();
                    xhr.open('post', 'http://bigdata-api.apitops.com/api/v1/common/upload/files', true);
                    xhr.setRequestHeader('Authorization', params.headers.Authorization);
                    xhr.onload = () => {
                        const data = JSON.parse(xhr.response).Data[0];
                        this.formData.picture.push(data);
                    };
                    xhr.send(form);
                },
            },
            formData: {
                picture: [
                    {
                        url: 'https://imgapi.apitops.com/TEST/bigdata-mgr/20190826/f137a9562d774b09938ec3360b551d04.jpg',
                    },
                    {
                        url: 'https://imgapi.apitops.com/TEST/bigdata-mgr/20190826/c1355b4172784268bf8c925e3de2a052.jpg',
                    },
                    {
                        url: 'https://imgapi.apitops.com/TEST/bigdata-mgr/20190826/c1355b4172784268bf8c925e3de2a052.jpg',
                    },
                    {
                        url: 'https://imgapi.apitops.com/TEST/bigdata-mgr/20190826/c1355b4172784268bf8c925e3de2a052.jpg',
                    },
                    {
                        url: 'https://imgapi.apitops.com/TEST/bigdata-mgr/20190826/c1355b4172784268bf8c925e3de2a052.jpg',
                    },
                    // {
                    //     url: 'https://imgapi.apitops.com/TEST/bigdata-mgr/20190826/c1355b4172784268bf8c925e3de2a052.jpg',
                    // },
                ],
                video: [
                    {
                        url: 'https://imgapi.apitops.com/TEST/bigdata-mgr/20190826/31847fa74d324158ba47656cc97c4815.mp4',
                    },
                ],
            },
        };
    },
    watch: {
        formData: {
            handler(data) {
                console.log(data, 1111111111);
            },
            deep: true,
        },
    },
    methods: {
        phoneSendPhotoFun() {
            this.item.phoneSendPhotoPic = true;
        },
        onCancel() {
            this.item.phoneSendPhotoPic = false;
        },
    },
};
</script>
<style lang="scss">
#uploadItemTest {
    padding: 32px;
}
</style>
