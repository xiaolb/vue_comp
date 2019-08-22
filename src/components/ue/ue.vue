<template>
    <div>
        <script :id="id" type="text/plain"></script>
    </div>
</template>
<script>
export default {
    name: 'UE',
    data() {
        return {
            editor: null,
            isReady: false,
            resultData: '',
            tempImgArr: [],
            changeHCount: 0,
            timer: null,
        };
    },
    props: {
        defaultMsg: {
            default: '',
            type: String,
        },
        config: {
            type: Object,
            default: () => ({
                initialFrameWidth: 900,
                initialFrameHeight: 550,
            }),
        },
        id: {
            type: String,
        },
        formData: {
            required: true,
        },
        // 上传url
        uploadUrl: {
            required: true,
            type: String,
            default: '',
        },
    },
    mounted() {
        if (this.id) this.initEditor();
        this.timer && clearInterval(this.timer);

        this.timer = setInterval(() => {
            this.validateValue();
        }, 5000);
    },
    watch: {
        defaultMsg(val) {
            if (val && this.isReady) {
                this.editor.setContent(val);
                this.resultData = val;
            }
        },
        id(val) {
            if (val && !this.isReady) this.initEditor();
        },
    },
    methods: {
        initEditor() {
            let config = {
                serverUrl: this.uploadUrl,
            };
            config = Object.assign(config, this.config);
            this.editor = UE.getEditor(this.id, config); // 初始化UE
            this.editor.addListener('ready', () => {
                this.isReady = true;
                this.editor.setContent(this.defaultMsg); // 确保UE加载完成后，放入内容。
            });
            this.editor.addListener('blur', () => {
                this.valueChange(this.editor.getContent());
                this.editor.hasContents() && this.$parent.clearValidate();
            });
        },
        // 获取内容方法
        getUEContent() {
            return this.resultData;
        },
        validateValue() {
            if (!this.editor.hasContents()) {
                this.$parent.$parent.$parent.validateField(this.$parent.labelFor);
                this.formData[this.$parent.labelFor] = '';
            } else {
                this.$parent.clearValidate();
                this.valueChange(this.editor.getContent());
            }
        },
        // h标签替换
        changeHTag(str) {
            if (this.changeHCount > 0) {
                return str;
            } else {
                this.changeHCount = 1;
            }
            // h标签替换
            str = str.replace(/<h1(.*?)<\/h1>/g, '<h2$1</h2>');
            str = str.replace(/<h3(.*?)<\/h3>/g, '<h2$1</h2>');
            str = str.replace(/<h4(.*?)<\/h4>/g, '<h5$1</h5>');
            str = str.replace(/<h6(.*?)<\/h6>/g, '<h5$1</h5>');

            // 空p标签替换
            str = str.replace(/<p><\/p>/g, '');

            return str;
        },
        // 图片不同项
        imgDiff(imgArr) {
            let { tempImgArr } = this;
            if (tempImgArr.length === 0) {
                this.tempImgArr = Array.from(imgArr);
                return imgArr;
            } else {
                let arr = [];
                imgArr.map((item, index) => {
                    if (!tempImgArr.includes(item)) {
                        arr.push(item);
                        this.tempImgArr.splice(index, 0, item);
                    }
                });
                if (this.tempImgArr.length > imgArr.length) {
                    this.tempImgArr = Array.from(imgArr);
                }

                return arr;
            }
        },
        valueChange(value) {
            const _this = this;
            let str = value;

            // 替换H标签
            str = this.changeHTag(str);

            // 获取编辑器里边的img的数量；
            let imgLen = (str && str.match(/<img\b.*?(?:\>|\/>)/gi)) || [];
            if (JSON.stringify(this.tempImgArr) === JSON.stringify(imgLen)) {
                this.resultData = str;
                return;
            } else {
                // 图片不同项进行处理
                imgLen = this.imgDiff(imgLen);
            }
            if (imgLen.length === 0) {
                this.resultData = str;
                return;
            }

            imgLen.map(item => {
                let resItem = item;

                let src = resItem.match(/\bsrc\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i);
                let newImg = new Image();
                newImg.src = src[1];
                newImg.onload = () => {
                    let halfWidth = newImg.width / 2; // 图片宽一半
                    let halfHeight = newImg.height / 2; // 图片高一半
                    let style = /\bstyle\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i; // 图片匹配内联样式
                    let widthAndHeightImport = `width:${halfWidth}px !important;height:${halfHeight}px !important;`;
                    if (newImg.width > 600) {
                        let widthStyle = /\width\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i;
                        let heightStyle = /\height\b\s*=\s*[\'\"]?([^\'\"]*)[\'\"]?/i;
                        let width = /\width\b\s*:\s*([^;"]*)[;]?/i;
                        let height = /\height\b\s*:\s*([^;"]*)[;]?/i;
                        let minWidth = /\min-width\b\s*:\s*([^;"]*)[;]?/i;
                        let minHeight = /\min-height\b\s*:\s*([^;"]*)[;]?/i;
                        let maxWidth = /\max-width\b\s*:\s*([^;"]*)[;]?/i;
                        let maxHeight = /\max-height\b\s*:\s*([^;"]*)[;]?/i;
                        let dataWidth = /\data-w\b\s*:\s*([^;"]*)[;]?/i;
                        let dataHeight = /\data-h\b\s*:\s*([^;"]*)[;]?/i;
                        resItem = resItem.replace(widthStyle, '');
                        resItem = resItem.replace(heightStyle, '');
                        resItem = resItem.replace(width, '');
                        resItem = resItem.replace(height, '');
                        resItem = resItem.replace(minWidth, '');
                        resItem = resItem.replace(minHeight, '');
                        resItem = resItem.replace(maxWidth, '');
                        resItem = resItem.replace(maxHeight, '');
                        resItem = resItem.replace(dataWidth, '');
                        resItem = resItem.replace(dataHeight, '');
                    } else if (newImg.width > 200) {
                        if (resItem.match(style)) {
                            resItem = resItem.replace(style, `style="$1${widthAndHeightImport}"`);
                        } else {
                            resItem = resItem.replace(/<img(\b.*?(?:\>|\/>))/i, `<img style="${widthAndHeightImport}"$1 `);
                        }
                        let temp = `(${widthAndHeightImport})+`;
                        let reg = new RegExp(temp, 'igm');
                        resItem = resItem.replace(reg, `${widthAndHeightImport}`);
                        str = str.replace(/<p width="100%" style="text-align: center;">(.*?)<\/p>/g, '$1');
                        resItem = `<p width="100%" style="text-align: center;">${resItem}</p>`;
                    } else {
                        if (resItem.match(style)) {
                            resItem = resItem = resItem.replace(style, `style="$1${widthAndHeightImport}"`);
                        } else {
                            resItem = resItem.replace(/<img(\b.*?(?:\>|\/>))/i, `<img style="${widthAndHeightImport}"$1 `);
                        }
                        let temp = `(${widthAndHeightImport})+`;
                        let reg = new RegExp(temp, 'igm');
                        resItem = resItem.replace(reg, `${widthAndHeightImport}`);
                    }
                    str = str.replace(item, resItem);
                    this.resultData = str;
                };
            });
        },
    },
    destroyed() {
        this.timer && clearInterval(this.timer);
        this.editor.destroy();
    },
};
</script>

<style lang="scss">
.edui-default .edui-editor-toolbarboxinner {
    line-height: 20px;
}
</style>
