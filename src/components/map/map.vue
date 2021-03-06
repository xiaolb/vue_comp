<template>
    <div id='topsmap'>
        <el-input
            :id="ids.suggestId"
            class="mapInput"
            ref="mapInput"
            v-model="formData[bindData]"
            :disabled="disabled"
            :placeholder="placeholder"
            :style="inputStyle"
        ></el-input>
        <div :id="ids.map" :style="style"></div>
        <div :id="ids.searchResult" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
    </div>
</template>

<script>
let currentMap = null;
export default {
    name: 'Map',
    props: {
        // 是否可编辑
        disabled: {
            type: Boolean,
            default: false,
        },
        // 提示文本
        placeholder: {
            type: String,
            default: '',
        },
        // 输入框的prop，用于绑定数据
        bindData: {
            required: true,
            type: String,
        },
        // 表单数据
        formData: {
            type: Object,
            default: () => {},
        },
        // 绑定经纬度的name
        bindName: {
            type: Array,
            default: () => [],
        },
        // input框的宽度
        inputStyle: {
            type: Object,
            default: () => ({
                width: '800px',
            }),
        },
        // 无经纬度时，默认位置
        initData: {
            type: Object,
            default: () => ({
                longitude: 0,
                latitude: 0,
            }),
        },
    },
    data() {
        const { bindData } = this;
        return {
            ids: {
                map: bindData + '_js_map',
                suggestId: bindData + '_suggestId',
                searchResult: bindData + '_searchResult',
            },
            style: {
                'min-width': '500px',
                'max-width': '100%',
                height: '484px',
            },
        };
    },
    mounted() {
        this.initMap();
        this.initEvent();
    },
    beforeUpdate() {
        this.initEvent();
    },
    destroyed() {
        currentMap.addEventListener('click', this.clickMap);
    },
    methods: {
        initEvent() {
            const { bindName, formData, bindData, ids, initMap, findId } = this;
            setTimeout(function() {
                initMap(formData[bindName[0]], formData[bindName[1]]);
            }, 10);
            setTimeout(function() {
                findId(ids.suggestId).value = formData[bindData] || '';
            }, 10);
        },
        searchMap(map) {
            const { ids } = this;
            const ac = new BMap.Autocomplete({
                //建立一个自动完成的对象
                input: ids.suggestId,
                location: map,
            });

            const _myselfThis = this;
            if (!this.disabled) {
                ac.addEventListener('onhighlight', function(e) {
                    //鼠标放在下拉列表上的事件
                    let str = '';
                    let _value = e.fromitem.value;
                    let value = '';
                    if (e.fromitem.index > -1) {
                        value = _value.province + _value.city + _value.district + _value.street + _value.business;
                    }
                    str = 'FromItem<br />index = ' + e.fromitem.index + '<br />value = ' + value;

                    value = '';
                    if (e.toitem.index > -1) {
                        _value = e.toitem.value;
                        value = _value.province + _value.city + _value.district + _value.street + _value.business;
                    }
                    str += '<br />ToItem<br />index = ' + e.toitem.index + '<br />value = ' + value;
                    _myselfThis.findId(ids.searchResult).innerHTML = str;
                });

                ac.addEventListener('onconfirm', function(e) {
                    //鼠标点击下拉列表后的事件
                    const _value = e.item.value;
                    const myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
                    _myselfThis.findId(ids.searchResult).innerHTML = 'onconfirm<br />index = ' + e.item.index + '<br />myValue = ' + myValue;
                    // _myselfThis.findId(ids.suggestId).value =myValue;
                    _myselfThis.setPlace(map, myValue);
                    _myselfThis.hideSearch();
                });
            }
        },
        hideSearch() {
            let searchResult = document.querySelectorAll('.tangram-suggestion-main');
            for (let i = 0; i < searchResult.length; i += 1) {
                searchResult[i].classList.add('hideSearch');
            }
        },
        setPlace(map, value) {
            const _myselfThis = this;
            map.clearOverlays(); //清除地图上所有覆盖物
            function myFun() {
                var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
                map.centerAndZoom(pp, 15);
                map.addOverlay(new BMap.Marker(pp)); //添加标注
            }
            var local = new BMap.LocalSearch(map, {
                //智能搜索
                onSearchComplete: myFun,
            });
            local.search(value);

            local.setSearchCompleteCallback(function(searchResult) {
                const poi = searchResult.getPoi(0);
                const { bindName, bindData, ids } = _myselfThis;
                if (bindName.length > 0) {
                    _myselfThis.$set(_myselfThis.formData, bindName[0], poi.point.lng);
                    _myselfThis.$set(_myselfThis.formData, bindName[1], poi.point.lat);
                    _myselfThis.$set(_myselfThis.formData, bindData, value);
                }
            });
        },
        initMap(lng = 0, lat = 0) {
            let longitude = 0,
                latitude = 0;
            if (!(lng && lat)) {
                longitude = this.initData.longitude;
                latitude = this.initData.latitude;
            } else {
                longitude = lng;
                latitude = lat;
            }
            const map = new BMap.Map(this.ids.map);
            const mapTypeLeft = new BMap.MapTypeControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT,
            }); // 地图类型
            const topLeftControl = new BMap.ScaleControl({
                anchor: BMAP_ANCHOR_TOP_LEFT,
            }); // 左上角，添加比例尺
            const topLeftNavigation = new BMap.NavigationControl(); // 左上角，添加默认缩放平移控件
            const centPoint = new BMap.Point(longitude, latitude);
            const marker = new BMap.Marker(centPoint);
            map.addControl(topLeftControl);
            map.addControl(topLeftNavigation);
            map.addControl(mapTypeLeft);
            map.enableDoubleClickZoom();
            map.enableScrollWheelZoom(); // 开启鼠标滚轮缩放
            map.addOverlay(marker);
            map.centerAndZoom(centPoint, 15); // 初始化地图，设置中心点坐标和地图级别

            !this.disabled && this.searchMap(map);

            currentMap = map;
            currentMap.addEventListener('click', e => this.clickMap(e));
        },
        clickMap(e) {
            if (this.disabled) {
                return;
            }
            const gc = new BMap.Geocoder(); // 逆地址解析
            const { bindName, bindData, ids } = this;
            gc.getLocation(e.point, rs => {
                this.$set(this.formData, bindData, rs.address);
            });

            if (bindName.length > 0) {
                this.$set(this.formData, bindName[0], e.point.lng);
                this.$set(this.formData, bindName[1], e.point.lat);
            }
            this.initMap(e.point.lng, e.point.lat);
        },
        // 获取id
        findId(id) {
            return document.getElementById(id);
        },
    },
};
</script>

<style lang="scss">
#topsmap {
    position: relative;
    margin-top: 16px;
    .mapInput {
        position: absolute;
        top: 9px;
        right: 8px;
        z-index: 10;
    }
}
/* 百度地图提示被覆盖的问题 */
.tangram-suggestion-main {
    z-index: 999999;
}
.hideSearch {
    display: none !important;
}
</style>
