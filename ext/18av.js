var rule = {
    title: '18AV',
    host: 'https://18av.mm-cg.com',
    homeUrl: '/zh/',
    url: '/zh/fyclass/all/fypage.html',
    searchUrl: '/zh/search/**/fypage.html',
    headers: {
        'User-Agent': 'MOBILE_UA',
        'Referer': 'https://18av.mm-cg.com/',
        'Accept-Language': 'zh-CN,zh;q=0.9'
    },
    timeout: 10000,
    class_name: '最近更新&多人群交&強姦亂倫&巨乳美乳&自拍偷拍&成人動畫&絲襪美腿&人妻熟女&制服誘惑&中文字幕&無碼專區&韓國主播&超清畫質',
    class_url: 'chinese_list&orgy&rape_incest&big_breast&selfie_stealing&adult_animation&stockings&wife_mature&uniform&chinese_subtitle&uncensored&korean&4k',
    searchable: 2,
    quickSearch: 1,
    filterable: 0,
    limit: 24,
    play_parse: true,
    lazy: $js.toString(() => {
        // 18AV 播放页防盗链 + m3u8/mp4 直链
        let html = request(input, {
            headers: {
                "Referer": input,
                "User-Agent": MOBILE_UA
            }
        });
        // 新版用 <source src="xxx">，旧版用 player_aaaa={'url':'xxx'}
        let src = html.match(/source\s+src=["'](.*?)["']/) || html.match(/player_aaaa=\s*{[^}]*url:\s*["'](.*?)["']/);
        if (src && src[1]) {
            if (src[1].startsWith('http')) {
                input = { parse: 0, url: src[1], jx: 0 };
            } else {
                input = { parse: 0, url: 'https://18av.mm-cg.com' + src[1], jx: 0 };
            }
        } else {
            // 极少数走第三方解析
            input = { parse: 1, url: input, jx: 0 };
        }
    }),

    // 一级（首页 + 分类页）
    一级: '.post-list .post-item;a&&title;img&&data-src||img&&src;.post-item-label&&Text;a&&href',

    // 二级尽量轻量，直接 lazy 播就行
    二级: {
        "title": "h1&&Text",
        "img": ".post-thumbnail img&&data-src||.post-thumbnail img&&src",
        "desc": ".post-meta && Text",
        "content": ".entry-content&&Text",
        "tabs": "",
        "lists": "body",
        "list_text": "body&&Text",
        "list_url": "src"
    },

    // 搜索
    搜索: '#post-list .post-item;a&&title;img&&data-src||img&&src;.post-item-label&&Text;a&&href',
}
