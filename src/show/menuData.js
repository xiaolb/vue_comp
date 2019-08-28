import _ from 'lodash';

const faMenus = [
    {
        href: '/listPage',
        menuId: '5',
        menuName: 'listPage列表',
        sonMenus: [],
    },
    {
        href: '/search',
        menuId: '8',
        menuName: 'search表格',
        sonMenus: [],
    },
    {
        href: '/table',
        menuId: '4',
        menuName: 'table表格',
        sonMenus: [],
    },
    {
        href: '/form',
        menuId: '3',
        menuName: 'form表单',
        sonMenus: [],
    },
    {
        href: '/modalform',
        menuId: '2',
        sonMenus: [],
        menuName: 'modalform弹窗',
    },
    {
        href: '/upload',
        menuId: '6',
        sonMenus: [],
        menuName: 'upload视频图片上传',
    },
    {
        href: '/map',
        menuId: '9',
        sonMenus: [],
        menuName: 'map地图',
    },
    {
        href: '/ueditor',
        menuId: '7',
        sonMenus: [],
        menuName: 'ueditor富文本',
    },
    {
        href: '/qrcode',
        menuId: '1',
        sonMenus: [],
        menuName: 'qrcode二维码',
    },
    {
        href: '/listPage',
        menuId: '1a',
        menuName: '一级导航',
        sonMenus: [],
    },
    {
        href: '',
        menuId: '2a',
        menuName: '二级导航',
        sonMenus: [
            {
                href: '/ueditor',
                menuId: '2a-1',
                menuName: '二级导航一级',
                sonMenus: [],
            },
        ],
    },
    {
        href: '',
        menuId: '3a',
        menuName: '三级导航',
        sonMenus: [
            {
                href: '',
                menuId: '3a-1',
                menuName: '三级导航2',
                sonMenus: [
                    {
                        href: '/map',
                        menuId: '3a-1-1',
                        menuName: '三级导航3',
                        sonMenus: [],
                    },
                ],
            },
        ],
    },
];

export default faMenus;
