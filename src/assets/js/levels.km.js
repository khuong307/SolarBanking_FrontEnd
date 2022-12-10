var dropRemainChart = ""
var startPerUserChart = ""
var failPerUserChart = ""

var interstitialChart = ""
var bannerChart = ""
var rewardChart = ""

var interstitialRevenueChart = ""
var bannerRevenueChart = ""
var rewardRevenueChart = ""

var iapSDKChart = ""
var currencyRate = ""
var dataAllStart = ""
var dataAllFail = ""
var dataAllImpression = ""
var dataAllSDK = ""
function setUpAllData(start, fail, impression, sdk){
    dataAllStart = start
    dataAllFail = fail
    dataAllImpression = impression
    dataAllSDK = sdk
}
function initCurrencyRate(rate){
    currencyRate = rate
}
function redrawLevelPlay(){
    dropRemainChart.redraw()
    startPerUserChart.redraw()
    failPerUserChart.redraw()
}
function redrawImpresion(){
    interstitialChart.redraw()
    rewardChart.redraw()
    bannerChart.redraw()
}
function redrawRevenue(){
    interstitialRevenueChart.redraw()
    rewardRevenueChart.redraw()
    bannerRevenueChart.redraw()
}
function redrawAll(){
    redrawLevelPlay()
    redrawRevenue()
    redrawImpresion()
    iapSDKChart.redraw()
}

function initDropRemain(start, end, startData){
    $('#drop-remain-chart').empty()
    const tmp = []
    for (const c of startData){
        if (parseInt(c.Level) >= start && parseInt(c.Level) <= end)
            tmp.push(c)
    }
    if (tmp.length == 0){
        for (let i = parseInt(start); i <= parseInt(end); i++){
            const emp = {
                Level: i + "",
                DropRate: 0,
                RemainRate: 0
            }
            tmp.push(emp)
        }
    }

    dropRemainChart =  Morris.Bar({
        element: 'drop-remain-chart',
        data: tmp,
        barColors: ["#584dff","#f79634"],
        xkey: 'Level',
        ykeys: ['DropRate', 'RemainRate'],
        labels: ['Abandonment Rate', 'Remain Rate'],
        nbYkeys2: 1,
        animate: true,
        dataLabels: false,
        hideHover: "auto",
        yLabelFormat: function (y) { return y.toString() + '%'; },
        pointSize: 3,
        gridTextFamily: 'Jost'
    });
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
}
function initStartPerUser(start, end, startData){
    $('#start-perUser-chart').empty()
    const tmp = []
    for (const c of startData){
        if (parseInt(c.Level) >= start && parseInt(c.Level) <= end)
            tmp.push(c)
    }

    if (tmp.length == 0){
        for (let i = parseInt(start); i <= parseInt(end); i++){
            const emp = {
                Level: i + "",
                PerUser: 0,
                Number_Users: 0
            }
            tmp.push(emp)
        }
    }


    startPerUserChart =  Morris.Bar({
        element: 'start-perUser-chart',
        data: tmp,
        barColors: ["#584dff","#f79634"],
        xkey: 'Level',
        ykeys: ['PerUser', 'Number_Users'],
        labels: ['Level Starts per User', 'Level Start Users'],
        nbYkeys2: 1,
        animate: true,
        dataLabels: false,
        hideHover: "auto",
        pointSize: 3,
        gridTextFamily: 'Jost'
    });
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
}
function initFailPerUser(start, end, failData){
    $('#fail-perUser-chart').empty()
    const tmp = []
    for (const c of failData){
        if (parseInt(c.Level) >= start && parseInt(c.Level) <= end)
            tmp.push(c)
    }
    if (tmp.length == 0){
        for (let i = parseInt(start); i <= parseInt(end); i++){
            const emp = {
                Level: i + "",
                PerUser: 0,
                Number_Users: 0
            }
            tmp.push(emp)
        }
    }

    failPerUserChart =  Morris.Bar({
        element: 'fail-perUser-chart',
        data: tmp,
        barColors: ["#584dff","#f79634"],
        xkey: 'Level',
        ykeys: ['PerUser', 'Number_Users'],
        labels: ['Level Fails per User', 'Level Fail Users'],
        nbYkeys2: 1,
        animate: true,
        dataLabels: false,
        hideHover: "auto",
        pointSize: 3,
        gridTextFamily: 'Jost'
    });
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
}

function initInterstitialPerUser(start, end, impressionData){
    $('#impression-interstitial-chart').empty()
    const tmp = []
    for (const c of getImpressionByFormat(impressionData, "interstitial")){
        if (parseInt(c.Level) >= start && parseInt(c.Level) <= end)
            tmp.push(c)
    }

    if (tmp.length == 0){
        for (let i = parseInt(start); i <= parseInt(end); i++){
            const emp = {
                Level: i + "",
                PerUser: 0,
                Number_Users: 0
            }
            tmp.push(emp)
        }
    }

    interstitialChart =  Morris.Bar({
        element: 'impression-interstitial-chart',
        data: tmp,
        barColors: ["#584dff","#f79634"],
        xkey: 'Level',
        ykeys: ['PerUser', 'Number_Users'],
        labels: ['Interstitial Impression per User', 'Interstitial Ad Users'],
        nbYkeys2: 1,
        animate: true,
        dataLabels: false,
        hideHover: "auto",
        pointSize: 3,
        gridTextFamily: 'Jost'
    });
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
}
function initBannerPerUser(start, end, impressionData){
    $('#impression-banner-chart').empty()
    const tmp = []
    for (const c of getImpressionByFormat(impressionData, "banner")){
        if (parseInt(c.Level) >= start && parseInt(c.Level) <= end)
            tmp.push(c)
    }

    if (tmp.length == 0){
        for (let i = parseInt(start); i <= parseInt(end); i++){
            const emp = {
                Level: i + "",
                PerUser: 0,
                Number_Users: 0
            }
            tmp.push(emp)
        }
    }

    bannerChart =  Morris.Bar({
        element: 'impression-banner-chart',
        data: tmp,
        barColors: ["#584dff","#f79634"],
        xkey: 'Level',
        ykeys: ['PerUser', 'Number_Users'],
        labels: ['Banner Impression per User', 'Banner Ad Users'],
        nbYkeys2: 1,
        animate: true,
        dataLabels: false,
        hideHover: "auto",
        pointSize: 3,
        gridTextFamily: 'Jost'
    });
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
}
function initRewardPerUser(start, end, impressionData){
    $('#impression-reward-chart').empty()
    const tmp = []
    for (const c of getImpressionByFormat(impressionData, "reward")){
        if (parseInt(c.Level) >= start && parseInt(c.Level) <= end)
            tmp.push(c)
    }

    if (tmp.length == 0){
        for (let i = parseInt(start); i <= parseInt(end); i++){
            const emp = {
                Level: i + "",
                PerUser: 0,
                Number_Users: 0
            }
            tmp.push(emp)
        }
    }


    rewardChart =  Morris.Bar({
        element: 'impression-reward-chart',
        data: tmp,
        barColors: ["#584dff","#f79634"],
        xkey: 'Level',
        ykeys: ['PerUser', 'Number_Users'],
        labels: ['Reward Impression per User', 'Reward Ad Users'],
        nbYkeys2: 1,
        animate: true,
        dataLabels: false,
        hideHover: "auto",
        pointSize: 3,
        gridTextFamily: 'Jost'
    });
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
}

function initInterstitialRevenue(start, end, impressionData){
    $('#revenue-interstitial-chart').empty()
    const tmp = []
    for (const c of getImpressionByFormat(impressionData, "interstitial")){
        if (parseInt(c.Level) >= start && parseInt(c.Level) <= end)
            tmp.push(c)
    }

    if (tmp.length == 0){
        for (let i = parseInt(start); i <= parseInt(end); i++){
            const emp = {
                Level: i + "",
                ValuePerUser: 0,
                Number_Users: 0
            }
            tmp.push(emp)
        }
    }
    interstitialRevenueChart =  Morris.Bar({
        element: 'revenue-interstitial-chart',
        data: tmp,
        barColors: ["#584dff","#f79634"],
        xkey: 'Level',
        ykeys: ['ValuePerUser', 'Number_Users'],
        labels: ['Interstitial Revenue per User', 'Interstitial Ad Users'],
        nbYkeys2: 1,
        animate: true,
        dataLabels: false,
        hideHover: "auto",
        pointSize: 3,
        gridTextFamily: 'Jost',
        postUnits: "$"
    });
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
}
function initBannerRevenue(start, end, impressionData){
    $('#revenue-banner-chart').empty()
    const tmp = []
    for (const c of getImpressionByFormat(impressionData, "banner")){
        if (parseInt(c.Level) >= start && parseInt(c.Level) <= end)
            tmp.push(c)
    }

    if (tmp.length == 0){
        for (let i = parseInt(start); i <= parseInt(end); i++){
            const emp = {
                Level: i + "",
                ValuePerUser: 0,
                Number_Users: 0
            }
            tmp.push(emp)
        }
    }

    bannerRevenueChart =  Morris.Bar({
        element: 'revenue-banner-chart',
        data: tmp,
        barColors: ["#584dff","#f79634"],
        xkey: 'Level',
        ykeys: ['ValuePerUser', 'Number_Users'],
        labels: ['Banner Revenue per User', 'Banner Ad Users'],
        nbYkeys2: 1,
        animate: true,
        dataLabels: false,
        hideHover: "auto",
        pointSize: 3,
        gridTextFamily: 'Jost',
        postUnits: "$"
    });
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
}
function initRewardRevenue(start, end, impressionData){
    $('#revenue-reward-chart').empty()
    const tmp = []
    for (const c of getImpressionByFormat(impressionData, "reward")){
        if (parseInt(c.Level) >= start && parseInt(c.Level) <= end)
            tmp.push(c)
    }

    if (tmp.length == 0){
        for (let i = parseInt(start); i <= parseInt(end); i++){
            const emp = {
                Level: i + "",
                ValuePerUser: 0,
                Number_Users: 0
            }
            tmp.push(emp)
        }
    }


    rewardRevenueChart =  Morris.Bar({
        element: 'revenue-reward-chart',
        data: tmp,
        barColors: ["#584dff","#f79634"],
        xkey: 'Level',
        ykeys: ['ValuePerUser', 'Number_Users'],
        labels: ['Reward Revenue per User', 'Reward Ad Users'],
        nbYkeys2: 1,
        animate: true,
        dataLabels: false,
        hideHover: "auto",
        pointSize: 3,
        gridTextFamily: 'Jost',
        postUnits: "$"
    });
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
}

function initIAPSDK(start, end, sdk){
    $('#iap-sdk-chart').empty()
    const tmp = []
    for (const c of sdk){
        if (parseInt(c.Level) >= start && parseInt(c.Level) <= end){
            tmp.push(c)
        }
    }
    if (tmp.length == 0){
        for (let i = parseInt(start); i <= parseInt(end); i++){
            const emp = {
                Level: i + "",
                ValuePerUser: 0,
                Number_Users: 0
            }
            tmp.push(emp)
        }
    }

    iapSDKChart =  Morris.Bar({
        element: 'iap-sdk-chart',
        data: tmp,
        barColors: ["#584dff","#f79634"],
        xkey: 'Level',
        ykeys: ['ValuePerUser', 'Number_Users'],
        labels: ['IAP Revenue per User', 'IAP Users'],
        nbYkeys2: 1,
        animate: true,
        dataLabels: false,
        hideHover: "auto",
        pointSize: 3,
        gridTextFamily: 'Jost',
        postUnits: "$"
    });
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
}


function getImpressionByFormat(data, format){
    const ans = []
    for (const c of data){
        if (c.Format.includes(format))
            ans.push(c)
    }
    return ans
}

// filter data
var rawDataStart = ""
var rawDataFail = ""
var rawDataImpression = ""
var rawDataSDK = ""
function setUpRawData(start, fail, impression, sdk){
    rawDataStart = start
    rawDataFail = fail
    rawDataImpression = impression
    rawDataSDK = sdk
}

function getDataStartByFilter(mode, ver, country){
    if (country != "All Countries"){
        const ans = []
        for (const c of rawDataStart){
            if (c.country == country && c.mode == mode && c.version == ver){
                ans.push(c)
            }
        }
        return ans
    }else{
        return getSumDataStart(rawDataStart, mode, ver)
    }
}
function getDataFailByFilter(mode, ver, country){
    if (country != "All Countries"){
        const ans = []
        for (const c of rawDataFail){
            if (c.country == country && c.mode == mode && c.version == ver){
                ans.push(c)
            }
        }
        return ans
    }else{
        return getSumDataFail(rawDataFail, mode, ver)
    }
}
function getDataSDKByFilter(ver, country){
    if (country != "All Countries"){
        const ans = []
        for (const c of rawDataSDK){
            if (c.country == country && c.version == ver){
                ans.push(c)
            }
        }
        return ans
    }else{
        return getSumDataIAPSDK(rawDataSDK, ver)
    }
}
function getDataImpressByFilter(ver, country){
    if (country != "All Countries"){
        const ans = []
        for (const c of rawDataImpression){
            if (c.country == country && c.version == ver){
                ans.push(c)
            }
        }
        return ans
    }else{
        return getSumDataImpression(rawDataImpression, ver)
    }
}

function convertDataStartLevels(data, firstUser){
    const groupbyLv = []
    if (data.length == 0){
        return groupbyLv
    }
    const usersLevelFirst = firstUser

    for (let i = 1; i < data.length; i++){
        const tmp = {}
        tmp.Level = ""+data[i].player_level
        if (i < data.length - 1){
            tmp.DropRate = this.countDropRate(data[i].number_players, data[i+1].number_players)
        }
        else
            tmp.DropRate = 0
        tmp.RemainRate = this.countRemainRate(data[i].number_players, usersLevelFirst)
        tmp.Number_Users = data[i].number_players
        tmp.PerUser = parseFloat((data[i].event / data[i].number_players).toFixed(2))
        groupbyLv.push(tmp)
    }
    return groupbyLv
}
function convertDataFailLevels(data){
    const groupbyLv = []

    if (data.length == 0){
        return groupbyLv
    }

    for (let i = 0; i < data.length; i++){
        const tmp = {}
        tmp.Level = ""+data[i].player_level
        tmp.Number_Users = data[i].number_players
        tmp.PerUser = parseFloat((data[i].event / data[i].number_players).toFixed(2))
        groupbyLv.push(tmp)
    }
    return groupbyLv
}
function convertDataImpression(data){
    const groupbyLv = []
    if (data.length == 0){
        return groupbyLv
    }
    for (let i = 0; i < data.length; i++){
        const tmp = {}
        tmp.Level = ""+data[i].player_level
        tmp.Number_Users = data[i].number_players
        tmp.Format = data[i].format
        tmp.ValuePerUser = parseFloat((data[i].value / data[i].number_players).toFixed(4))
        tmp.PerUser = parseFloat((data[i].event_lv / data[i].number_players).toFixed(2))
        groupbyLv.push(tmp)
    }
    return groupbyLv
}
function convertDataSDK(data){
    const groupbyLv = []
    if (data.length == 0){
        return groupbyLv
    }
    for (let i = 0; i < data.length; i++){
        const tmp = {}
        tmp.Level = ""+data[i].player_level
        tmp.Number_Users = data[i].number_players
        tmp.ValuePerUser = parseFloat((data[i].value / data[i].number_players).toFixed(4))
        tmp.Currency = data[i].cur
        groupbyLv.push(tmp)
    }
    return groupbyLv
}


function countDropRate(x, x1){
    if (x - x1 < 0)
        return 0
    return parseFloat((100*(x -x1)/x).toFixed(3))
}
function countRemainRate(x, x0){
    return parseFloat((100*x/x0).toFixed(3))
}

function getSumDataStart(data, mode , ver){
    const tmp = {}
    var arrLevel = []
    for (const c of data){
        if (c.mode == mode && c.version == ver){
            if (tmp[c.player_level] == undefined){
                tmp[c.player_level] = {}
                tmp[c.player_level]["Level"] = c.player_level
                tmp[c.player_level]["Event"] = 0
                tmp[c.player_level]["number_players"] = 0
            }
            tmp[c.player_level]["number_players"] += c.number_players
            tmp[c.player_level]["Event"] += c.event
            if (arrLevel.indexOf(c.player_level) === -1){
                arrLevel.push(c.player_level)
            }
        }
    }
    arrLevel.sort(function(a, b) {
        return a - b;
    });

    const groupbyLv = []
    if (tmp[arrLevel[1]+""] == undefined){
        return groupbyLv
    }

    const usersLevelFirst = tmp[arrLevel[1]+""].number_players

    for (let i = 1; i < arrLevel.length; i++){
        const ans = {}
        ans.Level = ""+tmp[arrLevel[i]+""].Level
        if (i < arrLevel.length - 1){
            ans.DropRate = this.countDropRate(tmp[arrLevel[i]+""].number_players, tmp[arrLevel[i + 1]+""].number_players)
        }
        else
            ans.DropRate = 0
        ans.RemainRate = this.countRemainRate(tmp[arrLevel[i]+""].number_players, usersLevelFirst)
        ans.Number_Users = tmp[arrLevel[i]].number_players
        ans.PerUser = parseFloat((tmp[arrLevel[i]].Event / tmp[arrLevel[i]+""].number_players).toFixed(2))
        groupbyLv.push(ans)
    }
    return groupbyLv
}
function getSumDataFail(data, mode , ver){
    const tmp = {}
    var arrLevel = []
    for (const c of data){
        if (c.mode == mode && c.version == ver){
            if (tmp[c.player_level] == undefined){
                tmp[c.player_level] = {}
                tmp[c.player_level]["Level"] = c.player_level
                tmp[c.player_level]["Event"] = 0
                tmp[c.player_level]["number_players"] = 0
            }
            tmp[c.player_level]["number_players"] += c.number_players
            tmp[c.player_level]["Event"] += c.event
            if (arrLevel.indexOf(c.player_level) === -1){
                arrLevel.push(c.player_level)
            }
        }
    }
    arrLevel.sort(function(a, b) {
        return a - b;
    });

    const groupbyLv = []
    for (let i = 0; i < arrLevel.length; i++){
        const ans = {}
        ans.Level = ""+tmp[arrLevel[i]+""].Level
        ans.Number_Users = tmp[arrLevel[i]].number_players
        ans.PerUser = parseFloat((tmp[arrLevel[i]].Event / tmp[arrLevel[i]+""].number_players).toFixed(2))
        groupbyLv.push(ans)
    }
    return groupbyLv
}
function getSumDataImpression(data , ver){
    const tmp = {}
    var arrLevel = []
    for (const c of data){
        if (c.version == ver){
            if (tmp[c.player_level] == undefined){
                tmp[c.player_level] = {}
                tmp[c.player_level]["Level"] = c.player_level
                tmp[c.player_level]["Format"] = c.format
                tmp[c.player_level]["Event"] = 0
                tmp[c.player_level]["Value"] = 0
                tmp[c.player_level]["number_players"] = 0
            }
            tmp[c.player_level]["number_players"] += c.number_players
            tmp[c.player_level]["Event"] += c.event_lv
            tmp[c.player_level]["Value"] += c.value
            if (arrLevel.indexOf(c.player_level) === -1){
                arrLevel.push(c.player_level)
            }
        }
    }
    arrLevel.sort(function(a, b) {
        return a - b;
    });

    const groupbyLv = []
    for (let i = 0; i < arrLevel.length; i++){
        const ans = {}
        ans.Level = ""+tmp[arrLevel[i]+""].Level
        ans.Number_Users = tmp[arrLevel[i]].number_players
        ans.Format = tmp[arrLevel[i]].Format
        ans.PerUser = parseFloat((tmp[arrLevel[i]].Event / tmp[arrLevel[i]+""].number_players).toFixed(2))
        ans.ValuePerUser = parseFloat((tmp[arrLevel[i]].Value / tmp[arrLevel[i]+""].number_players).toFixed(4))
        groupbyLv.push(ans)
    }
    return groupbyLv
}
function getSumDataIAPSDK(data, ver){
    const tmp = {}
    var arrLevel = []
    for (const c of data){
        if (c.version == ver){
            if (tmp[c.player_level] == undefined){
                tmp[c.player_level] = {}
                tmp[c.player_level]["Level"] = c.player_level
                tmp[c.player_level]["Value"] = 0
                tmp[c.player_level]["number_players"] = 0
            }
            tmp[c.player_level]["number_players"] += c.number_players
            tmp[c.player_level]["Value"] += (parseFloat(c.value) / currencyRate[c.cur])
            if (arrLevel.indexOf(c.player_level) === -1){
                arrLevel.push(c.player_level)
            }
        }
    }
    arrLevel.sort(function(a, b) {
        return a - b;
    });

    const groupbyLv = []
    for (let i = 0; i < arrLevel.length; i++){
        const ans = {}
        ans.Level = ""+tmp[arrLevel[i]+""].Level
        ans.Number_Users = tmp[arrLevel[i]].number_players
        ans.ValuePerUser = parseFloat((tmp[arrLevel[i]].Value / tmp[arrLevel[i]+""].number_players).toFixed(4))
        groupbyLv.push(ans)
    }
    return groupbyLv
}


function filterUpdate(){
    const ver = $('#selectVer').find(":selected").val();
    const mode = $('#selectMode').find(":selected").val();
    const country = $('#selectCountry').find(":selected").val();

    // const firstLevelUser = findLeverStartFirstByCountry(rawDataStart, mode, ver, country)

    // const rawStartData = getDataStartByFilter(mode, ver, country)
    // const rawFailData = getDataFailByFilter(mode, ver, country)
    // const rawImpressData = getDataImpressByFilter(ver, country)
    // const rawIAPSDK = getDataSDKByFilter(ver, country)
    var startData = dataAllStart
    var failData = dataAllFail
    var impressionData = dataAllImpression
    var iapSDKData = dataAllSDK


    initDropRemain($('#backValue').val(), $('#nextValue').val(), startData)
    initStartPerUser($('#backValue').val(), $('#nextValue').val(), startData)
    initFailPerUser($('#backValue').val(), $('#nextValue').val(), failData)

    initInterstitialPerUser($('#backValue').val(), $('#nextValue').val(), impressionData)
    initRewardPerUser($('#backValue').val(), $('#nextValue').val(), impressionData)
    initBannerPerUser($('#backValue').val(), $('#nextValue').val(), impressionData)

    initInterstitialRevenue($('#backValue').val(), $('#nextValue').val(), impressionData)
    initRewardRevenue($('#backValue').val(), $('#nextValue').val(), impressionData)
    initBannerRevenue($('#backValue').val(), $('#nextValue').val(), impressionData)

    initIAPSDK($('#backValue').val(), $('#nextValue').val(), iapSDKData)
}

function findLeverStartFirstByCountry(data, mode, ver, country){
    for (const c of data){
        if (c.mode == mode && c.version == ver && c.country == country && c.player_level != 0)
            return c. number_players
    }
}


$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    var target = $(e.target).attr("href") // activated tab
    switch (target) {
        case "#level":
            redrawLevelPlay()
            $("#modeArea").attr("hidden", false)
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        case "#impression":
            $("#modeArea").attr("hidden", true)
            redrawImpresion()
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        case "#revenue":
            redrawRevenue()
            $("#modeArea").attr("hidden", true)
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        case "#sdk":
            iapSDKChart.redraw()
            $("#modeArea").attr("hidden", true)
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        default:
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
    }
});
