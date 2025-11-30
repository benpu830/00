var rule = {
    title: '猪AV',
    host: 'https://pigav.com',
    // 备用域名（主域名偶尔被墙或抽风时可用）
    homeUrl: '/',
    url: '/fyclass/page/fypage?fypage',
    headers: {
        'User-Agent': 'MOBILE_UA',
        'Referer': 'https://pigav.com/'
    },
    timeout: 8000,
    class_name: '最新&熱門&每日&精選&無碼&HDAV&日韓&長片',
    class_url: '最新av線上看&熱門av線上看&每日av線上看&精選av線上看&無碼av線上看&hdav線上看&日韓av線上看&長片av線上看',
    searchUrl: '/search/**?fypage',
    searchable: 2,                    // 启用搜索
    quickSearch: 1,
    filterable: 0,
    limit: 24,
    play_parse: true,
    lazy: $js.toString(() => {
        // pigav 的播放页需要 Referer 防盗链，直接用 lazy 转 m3u8 或 mp4
        let html = request(input, {headers: {"Referer": input, "User-Agent": MOBILE_UA}});
        let src = html.match(/source src="(.*?)"/) || html.match(/src:\s*"(.*?)"/);
        if (src && src[1]) {
            input = { parse: 0, url: src[1], jx: 0 };
        } else {
            input = { parse: 1, url: input, jx: 0 };
        }
    }),
    // 一级列表（首页、分类页）
    一级: '.l-post .flex.flex-col a.relative;img&&alt;img&&data-src;.absolute.bottom-0&&Text;a&&href',
    // 二级访问太慢，直接用一级点进去就能播放，所以二级尽量简洁
    二级: {
        "title": "h1&&Text",
        "img": ".relative img&&data-src",
        "desc": ".text-sm.mt-2&&Text",
        "content": ".text-gray-600&&Text",
        "tabs": "",
        "lists": ".my-8 source||.my-8 video:source[src]",
        "list_text": "body&&Text",
        "list_url": "src"
    },
    // 搜索一级（和主页结构一致）
    搜索: '#search-list .flex.flex-col a.relative;img&&alt;img&&data-src;.absolute.bottom-0&&Text;a&&href',
}
