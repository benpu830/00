var rule = {
    title: 'MissAV',
    author: 'Grok',
    host: 'https://missav.ws',
    host_backup: ['https://missav.ai', 'https://missav.live', 'https://missav.com', 'https://missav.nl'],
    homeUrl: '/cn',
    url: '/cn/fyclass?fypage',
    searchUrl: '/cn/search/**?page=fypage',
    searchable: 2,
    quickSearch: 1,
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Referer': 'https://missav.ws/',
        'Accept-Language': 'zh-CN,zh;q=0.9'
    },
    timeout: 8000,
    class_name: '最近更新&新作上市&无码流出&SIRO&LUXU&GANA&PRESTIGE&S-CUTE&ARA&FC2&麻豆传媒&本月热门&最多次播放&最長視頻',
    class_url: 'new&release&uncensored-leak&siro&luxu&gana&maan&scute&ara&fc2&madou&monthly-hot&most-viewed&longest',

    limit: 30,
    play_parse: true,
    lazy: $js.toString(() => {
        // MissAV 2025版播放页逻辑（支持 m3u8 + mp4 直链 + 加密链接自动解密）
        let html = request(input, {headers:{Referer:input, "User-Agent":MOBILE_UA}});
        let src = html.match(/source src=["']([^"']+)["']/)?.[1]
               || html.match(/video_src:\s*["']([^"']+)["']/)?.[1]
               || html.match(/src:\s*["']([^"']+)["']/)?.[1];

        if (src) {
            if (src.startsWith('//')) src = 'https:' + src;
            if (src.startsWith('/')) src = 'https://missav.ws' + src;
            // 部分链接带 token 加密，直接原样播就行，播放器能自动解
            input = { jx:0, parse:0, url: src };
        } else {
            input = { jx:0, parse:1, url: input };
        }
    }),

    // 一级（首页 + 所有分类页）
    一级: '.grid.gap-4 a.group;img&&alt;img&&data-src||img&&src;.truncate&&Text;a&&href',

    // 二级可以极简，几乎全靠 lazy 直解
    二级: {
        "title": "h1&&Text",
        "img": ".w-full.rounded&&src",
        "desc": ".flex.flex-wrap.gap-2&&Text",
        "content": ".line-clamp-3&&Text"
    },

    // 搜索（结构和一级完全一致）
    搜索: '.grid.gap-4 a.group;img&&alt;img&&data-src||img&&src;.truncate&&Text;a&&href',
};
