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
        ></upload-item>
    </div>
</template>
<script>
export default {
    name: 'uploadItemTest',
    data() {
        return {
            item: {
                maxi: 3,
                hint: '默认图片',
                hint: ['默认图片1', '默认图片2'],
                name: 'picture',
                size: 10,
                isFacePic: true,
                isWrite: true,
                disabled: false,
                uploadUrl: 'http://bigdata-api.apitops.com/api/v1/common/upload/files',
                uploadAK: '31c5df4c-054c-40a9-98fc-99e0fea40ef3',
                isWriteFun: () => {
                    console.log('写入图片');
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
                ],
                video: [
                    {
                        url: 'https://imgapi.apitops.com/TEST/bigdata-mgr/20190826/31847fa74d324158ba47656cc97c4815.mp4',
                    },
                ],
            },
        };
    },
};
</script>
<style lang="scss">
#uploadItemTest {
    padding: 32px;
}
</style>