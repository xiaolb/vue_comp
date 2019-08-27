<template>
    <div id="UETest">
        <UE
            :id="id" 
            ref="ue" 
            :form-data="formData" 
            :default-msg="formData[name]"
            :uploadAK="uploadAK"
            :uploadUrl="uploadUrl"
        ></UE>
    </div>
</template>
<script>
export default {
    name: 'UETest',
    data() {
        return {
            id: 'ue2',
            name: 'ue2',
            formData: {
                ue2: '33333333',
            },
            uploadUrl: 'http://bigdata-api.apitops.com/api/v1/common/upload/files',
            uploadAK: '31c5df4c-054c-40a9-98fc-99e0fea40ef3',
        };
    },
};
</script>