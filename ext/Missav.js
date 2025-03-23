var rule = {
    title: 'Missav',
    host: 'https://missav.ws',
    host_backup: ['https://missav.ai', 'https://missav.live'],
    searchUrl: '/cn/search/**?page=fypage',
    url: '/cn/fyclass?page=fypage',
    headers: {
        'User-Agent': 'MOBILE_UA',
        'Referer': 'https://missav.ws/'
    },
    timeout: 5000,
    class_name: '最近更新&新作上市&无码流出&SIRO&LUXU&GANA&PRESTIGE&S-CUTE&ARA&FC2&麻豆传媒&本月热门',
    class_url: 'new&release&uncensored-leak&siro&luxu&gana&maan&scute&ara&fc2&madou&monthly-hot',
    limit: 5,
    play_parse: true,
    lazy: "js: var html = request(input); var url = parseDomForHtml(html, 'video source&&src'); input = {url: url, parse: 0};",
    一级: '.grid.grid-cols-2 div&&a;.lozad.w-full&&alt;.lozad.w-full&&data-src;.absolute.bottom-1&&Text;a&&href',
    二级: '*',
    搜索: 'js: var html = request(input); var items = parseDomForArray(html, \'.grid.grid-cols-2 div&&a\'); var list = []; items.forEach(function(item) { list.push({ title: parseDomForHtml(item, \'.lozad.w-full&&alt\'), pic_url: parseDomForHtml(item, \'.lozad.w-full&&data-src\'), remark: parseDomForHtml(item, \'.absolute.bottom-1&&Text\'), url: parseDomForHtml(item, \'a&&href\') }); }); setResult(list);',
    searchable: 1,
    quickSearch: 1,
    filterable: 0
};
