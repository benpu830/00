var rule = {
    title: '豆瓣影视',
    host: 'https://movie.douban.com',
    homeUrl: '/j/search_subjects?type=movie&tag=%E8%B1%86%E7%93%A3%E9%AB%98%E5%88%86&page_limit=50&page_start=0',
    url: '/j/search_subjects?type=fyclass&tag=fyfilter&page_limit=30&page_start=fypage',
    filter_url: '电影&电视剧&动画&纪录片&短片&综艺',
    filter_url: '{{fl}}',
    filter_def: {电影:'豆瓣高分', 电视剧:'热播榜', 动画:'日本动画', 纪录片:'高分纪录片', 综艺:'综艺', 短片:'短片'},
    searchUrl: '/j/search_subjects?type=movie&tag=**&page_limit=50&page_start=0',
    searchable: 2,
    quickSearch: 1,
    filterable: 1,
    headers: {'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148'},
    timeout: 8000,
    class_name: '豆瓣电影Top250&实时热门电影&高分经典&华语佳片&欧美大片&日本电影&韩国电影&动画电影&纪录片&冷门佳片&综艺节目&国产剧&美剧&日剧&韩剧',
    class_url: 'movie_top250&movie_real_time_hotest&classic&chinese&american&japanese&korean&animation&documentary&underrated&variety&domestic_tv&american_tv&japanese_tv&korean_tv',

    limit: 30,
    play_parse: true,
    lazy: $js.toString(() => {
        // 豆瓣本身不提供播放源，二级点击后跳转到「想看/在看/看过」或直接调用第三方搜索
        input = { parse: 0, url: 'tvbox://search?s=' + encodeURIComponent(input.split('id=')[1]), jx: 0 };
    }),

    一级: 'js:let subjects=JSON.parse(request(input)).subjects;let d=[];subjects.forEach(it=>{let rate=it.rate||"0";let remark=rate==0?"无评分":rate;if(it.episodes_info)remark+=it.episodes_info;d.push({title:it.title,pic_url:it.cover||it.pic?.normal,desc:remark,url:"https://movie.douban.com/subject/"+it.id+"/",content:it.card_subtitle||""})});VODS=d;',

    二级: {
        title: "h1&&Text;.year&&Text",
        img: "#mainpic img&&src",
        desc: ".rating_num&&Text;;;.year&&Text",
        content: "#link-report span[property='v:summary']&&Text||#link-report-intra&&Text",
        tabs: "js:TABS=['【豆瓣评分与简介】']",
        lists: `js:LISTS=[];let html=request(input);let rating=pdfa(html,'.rating_num');rating=rating.length>0?rating[0].innerText.trim():'暂无评分';let people=pdfa(html,'.rating_people span');people=people.length>0?people[0].innerText:'0人评价';let desc=$('.related-info .indent')[0].innerText.trim();LISTS.push(['豆瓣评分：'+rating+'（'+people+'）\\n'+desc]);`
    },

    搜索: 'js:let kw=input.split("tag=")[1].split("&")[0];kw=decodeURIComponent(kw);let url="https://movie.douban.com/j/search_subjects?type=movie&tag="+encodeURIComponent(kw)+"&page_limit=50&page_start=0";let html=request(url);let subjects=JSON.parse(html).subjects;let d=[];subjects.forEach(it=>{d.push({title:it.title,pic_url:it.cover,url:"https://movie.douban.com/subject/"+it.id+"/",desc:it.rate||""})});VODS=d;'
}
