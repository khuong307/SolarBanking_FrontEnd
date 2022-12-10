var lineIAPDateAll = ""
var lineIAPRevenueAll = ""
var IAPDateAll = ""
var IAPRevenueAll = ""

var lineIAPDate =[]
var lineIAPRevenue =[]
const IAPDate = []
const IAPRevenue = []


const id_Tab = []



var splitNames = []
var splitColors = []
const boolSplit = []
const boolAll = []

var allNames = ["Top","Gem", "Pass", "Daily", "Event", "Vip", "Limit"]

var chartType = 1 // line


//////
var colors = {}
function setColors(col){
    colors = col
    colors["Top"] = "#000000"
    colors["Gem"] = "#cc0648"
    colors["Daily"] = "#a3d9ff"
    colors["Pass"] = "#1f6969"
    colors["Event"] = this.stringtoColor("Event Offer")
    colors["Vip"] = this.stringtoColor("Vip")
    colors["Limit"] = this.stringtoColor("Limit Offer")
}

function stringtoColor(str){
    var hash = 0;
    if (str.length === 0) return hash;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    var color = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 255;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}
function generateSplitColors (list){
    for (let i = 0; i < list.length; i++){
        for (const c of list[i].Data)
            splitColors.push(colors[c.Name])
    }

}
//-------------------
function updateChartType(value){
    chartType = value
}
function updateIAPDateAll(boolArr) {
    var ret = JSON.parse(JSON.stringify(IAPDateAll))
    var labels = JSON.parse(JSON.stringify(allNames))
    var chartColors = []
    for (let i = 0; i < boolArr.length; i++){
        if(boolArr[i][0] == false){
            labels = labels.filter(e => e !== boolArr[i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolArr[i][1]];
        }else{
            chartColors.push(colors[boolArr[i][1]])
        }
    }

    $('#iap-date-all').empty()

    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "Sum"

    if (chartType == 1){
        lineIAPDateAll = Morris.Line({
            element: 'iap-date-all',
            data: ret,
            xkey: 'Date',
            ykeys: labels,
            lineColors: chartColors,
            labels: finaleLabels,
            gridTextSize: 11,
            gridTextFamily: 'Jost',
            xLabelAngle: 0.5,
            resize: true,
            hideHover: true,
            parseTime: false,
            dataLabels: false,
            hoverOrdered: true
        })
    }else{
        lineIAPDateAll = Morris.Bar({
            element: 'iap-date-all',
            data: ret,
            xkey: 'Date',
            ykeys: labels,
            barColors: chartColors,
            labels: finaleLabels,
            gridTextSize: 11,
            gridTextFamily: 'Jost',
            xLabelAngle: 0.5,
            resize: true,
            hideHover: true,
            parseTime: false,
            dataLabels: false,
            hoverOrdered: true
        })
    }
};
function updateIAPRevenueAll(boolArr) {
    var ret = JSON.parse(JSON.stringify(IAPRevenueAll))
    var labels = JSON.parse(JSON.stringify(allNames))
    var chartColors = []
    for (let i = 0; i < boolArr.length; i++){
        if(boolArr[i][0] == false){
            labels = labels.filter(e => e !== boolArr[i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolArr[i][1]];
        }else{
            chartColors.push(colors[boolArr[i][1]])
        }
    }

    $('#iap-revenue-all').empty()

    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "Sum"

    if (chartType == 1){
        lineIAPRevenueAll = Morris.Line({
            element: 'iap-revenue-all',
            data: ret,
            xkey: 'Date',
            ykeys: labels,
            lineColors: chartColors,
            labels: finaleLabels,
            gridTextSize: 11,
            gridTextFamily: 'Jost',
            xLabelAngle: 0.5,
            postUnits: "$",
            resize: true,
            hideHover: true,
            parseTime: false,
            dataLabels: false,
            hoverOrdered: true
        })
    }else{
        lineIAPRevenueAll = Morris.Bar({
            element: 'iap-revenue-all',
            data: ret,
            xkey: 'Date',
            ykeys: labels,
            barColors: chartColors,
            labels: finaleLabels,
            gridTextSize: 11,
            gridTextFamily: 'Jost',
            xLabelAngle: 0.5,
            resize: true,
            postUnits: "$",
            hideHover: true,
            parseTime: false,
            dataLabels: false,
            hoverOrdered: true
        })
    }
};

function updateIAPDateByIndex(index) {
    var ret = JSON.parse(JSON.stringify(IAPDate[index]))
    var labels = JSON.parse(JSON.stringify(splitNames[index]))
    var chartColors = []
    for (let i = 0; i < boolSplit[index].length; i++){
        if(boolSplit[index][i][0] == false){
            labels = labels.filter(e => e !== boolSplit[index][i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolSplit[index][i][1]];
        }else{
            chartColors.push(colors[boolSplit[index][i][1]])
        }
    }
    $('#iap-date-'+id_Tab[index]).empty()

    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "Sum"

    if (chartType == 1){
        lineIAPDate[index] = Morris.Line({
            element: 'iap-date-'+ id_Tab[index],
            data: ret,
            xkey: 'Date',
            ykeys: labels,
            lineColors: chartColors,
            labels: finaleLabels,
            gridTextSize: 11,
            gridTextFamily: 'Jost',
            xLabelAngle: 0.5,
            resize: true,
            hideHover: true,
            parseTime: false,
            dataLabels: false,
            hoverOrdered: true
        })
    }else{
        lineIAPDate[index] = Morris.Bar({
            element: 'iap-date-'+ id_Tab[index],
            data: ret,
            xkey: 'Date',
            ykeys: labels,
            barColors: chartColors,
            labels: finaleLabels,
            gridTextSize: 11,
            gridTextFamily: 'Jost',
            xLabelAngle: 0.5,
            resize: true,
            hideHover: true,
            parseTime: false,
            dataLabels: false,
            hoverOrdered: true
        })
    }
};
function updateIAPRevenueByIndex(index) {
    var ret = JSON.parse(JSON.stringify(IAPRevenue[index]))
    var labels = JSON.parse(JSON.stringify(splitNames[index]))
    var chartColors = []
    for (let i = 0; i < boolSplit[index].length; i++){
        if(boolSplit[index][i][0] == false){
            labels = labels.filter(e => e !== boolSplit[index][i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolSplit[index][i][1]];
        }else{
            chartColors.push(colors[boolSplit[index][i][1]])
        }
    }
    $('#iap-revenue-' + id_Tab[index]).empty()

    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "Sum"

    if (chartType == 1){
        lineIAPRevenue[index] = Morris.Line({
            element: 'iap-revenue-' + id_Tab[index],
            data: ret,
            xkey: 'Date',
            ykeys: labels,
            lineColors: chartColors,
            labels: finaleLabels,
            gridTextSize: 11,
            gridTextFamily: 'Jost',
            xLabelAngle: 0.5,
            resize: true,
            hideHover: true,
            parseTime: false,
            postUnits: "$",
            dataLabels: false,
            hoverOrdered: true
        })
    }else{
        lineIAPRevenue[index] = Morris.Bar({
            element: 'iap-revenue-' + id_Tab[index],
            data: ret,
            xkey: 'Date',
            ykeys: labels,
            barColors: chartColors,
            labels: finaleLabels,
            gridTextSize: 11,
            gridTextFamily: 'Jost',
            xLabelAngle: 0.5,
            resize: true,
            hideHover: true,
            parseTime: false,
            postUnits: "$",
            dataLabels: false,
            hoverOrdered: true
        })
    }
};

//------------



//------------------- set up names
function setUpSplitNames(tmp){
    for (let i = 0; i < tmp.length; i++){
        if (tmp[i].isEmpty == false){
            const ans = []
            id_Tab.push(tmp[i].ID)
            for (const t of tmp[i].Data){
                ans.push(t.Name)
            }
            splitNames.push(ans)
            lineIAPDate.push("")
            lineIAPRevenue.push("")
            IAPDate.push("")
            IAPRevenue.push("")
        }
    }
}

// ------------------

function initCheckBoxLink(){
    for (let i = 0; i < splitNames.length; i++){
        for (let j = 0; j < splitNames[i].length; j++){
            $('.'+splitNames[i][j]+"-" +id_Tab[i]).on('change', function() {
                boolSplit[i].length = 0
                for (let k = 0;k < splitNames[i].length; k++){
                    const tmp = []
                    tmp.push($('.'+splitNames[i][k]+"-"+id_Tab[i]).is(':checked'))
                    tmp.push(splitNames[i][k])
                    boolSplit[i].push(tmp)
                }
                updateIAPDateByIndex(i)
                updateIAPRevenueByIndex(i)
            });
        }
        for (let j = 0; j < splitNames[i].length; j++){
            if (j != 0){
                $('.' + splitNames[i][j] + '-' + id_Tab[i]).prop("checked", false).trigger("change");
            }else{
                $('.' + splitNames[i][j] + '-' + id_Tab[i]).prop("disabled", true);
            }
            //link checkbox
            $("."+splitNames[i][j] +'-' + id_Tab[i]).click(function() {
                var x = this.checked;
                $("."+splitNames[i][j] +'-' + id_Tab[i]).prop("checked", x);
                updateBoolList(boolSplit[i], splitNames[i][j], x)
                const index = checkLastOne(boolSplit[i], true)
                if (index.length == 1)
                    $("."+boolSplit[i][[index[0]]][1] +'-' + id_Tab[i]).prop("disabled", true)
                else
                    clearDisabled(splitNames[i], id_Tab[i])
            });
        }
    }
    for (let i = 0; i < allNames.length; i++){
        $('.'+allNames[i]+"-all").on('change', function() {
            boolAll.length = 0
            for (let j = 0;j < allNames.length; j++){
                const tmp = []
                tmp.push($('.'+allNames[j]+'-all').is(':checked'))
                tmp.push(allNames[j])
                boolAll.push(tmp)
            }
            updateIAPDateAll(boolAll)
            updateIAPRevenueAll(boolAll)
        });
    }
    for (let i = 0; i < allNames.length; i++){
        if (i != 0){
            $('.' + allNames[i]+'-all').prop("checked", false).trigger("change");
        }
        else{
            $('.' + allNames[i]+'-all').prop("disabled", true);
        }
        //link checkbox
        $("."+allNames[i]+"-all").click(function() {
            var x = this.checked;
            $("."+allNames[i]+"-all").prop("checked", x);
            updateBoolList(boolAll, allNames[i], x)
            const index = checkLastOne(boolAll, true)
            if (index.length == 1 )
                $("."+allNames[[index[0]]]+"-all").prop("disabled", true)
            else
                clearAllDisabled(allNames)
        });
    }
}
function clearAllDisabled(arr){
    for (let i = 0; i < arr.length; i++){
        $("."+arr[i]+"-all").prop("disabled", false);
    }
}

function clearChart(){

    $("."+allNames[0]+"-All").prop("checked", true);
    $("."+allNames[0]+"-All").prop("disabled", true);

    for (let i = 1; i < allNames.length; i++){
        $("."+allNames[i]+"-All").prop("checked", false);
        $("."+allNames[i]+"-All").prop("disabled", false);
    }
    boolAll[0][0] = true;
    for (let i = 1; i < boolAll.length; i++){
        boolAll[i][0] = false;
    }
    updateIAPRevenueAll(boolAll)
    updateIAPDateAll(boolAll)

}
function clearEventChart(){
    $("."+eventNames[0]+"-Event").prop("checked", true);
    $("."+eventNames[0]+"-Event").prop("disabled", true);

    for (let i = 1; i < eventNames.length; i++){
        $("."+eventNames[i]+"-Event").prop("checked", false);
        $("."+eventNames[i]+"-Event").prop("disabled", false);
    }
    boolEvent[0][0] = true;
    for (let i = 1; i < boolEvent.length; i++){
        boolEvent[i][0] = false;
    }
    updateIAPRevenueEvent(boolEvent)
    updateIAPDateEvent(boolEvent)
}

function clearDisabled(arr, id){
    for (let i = 0; i < arr.length; i++){
        $("."+arr[i]+"-" + id).prop("disabled", false);
    }
}
function checkLastOne(bool, value){
    var index = []
    for (let i = 0; i < bool.length; i++){
        if (bool[i][0] == value){
            index.push(i)
        }
    }
    return index
}
function updateBoolList(bool, name, status){
    for (let i = 0; i < bool.length; i++){
        if (bool[i][1] == name)
            bool[i][0] = status
    }
}

function convertDataToMorrisLineChart(allData, iapDate, iapRevenue){
    updateChartType(1)
    const dataTrue = []
    for (let i = 0; i < allData.length; i++){
        dataTrue.push(allData[i].isEmpty)
    }
    IAPDate.length = 0
    IAPRevenue.length = 0
    for (let i = 0 ; i < iapDate.length; i++){
        if (dataTrue[i] == false)
            IAPDate.push(iapDate[i])
    }
    for (let i = 0 ; i < iapRevenue.length; i++){
        if (dataTrue[i] == false)
            IAPRevenue.push(iapRevenue[i])
    }

    for (let i = 0; i < splitNames.length; i++){
        updateIAPDateByIndex(i)
        updateIAPRevenueByIndex(i)
    }

    if(lineIAPDateAll!= "" && lineIAPRevenueAll != ""){
        updateIAPDateAll(boolAll)
        updateIAPRevenueAll(boolAll)
    }
}

function initBoolArray(){
    for (let i = 0; i < splitNames.length; i++) {
        const tmp = []
        for (let j = 0; j < splitNames[i].length; j++){
            if (j == 0){
                tmp.push(true)
            }else {
                tmp.push(false)
            }
        }
        boolSplit.push(tmp)
    }
    for (let i = 0; i < allNames.length; i++) {
        const tmp = []
        if (i == 0){
            tmp.push(true)
        }else{
            tmp.push(false)
        }
        tmp.push(allNames[i])
        boolAll.push(tmp)
    }
}
function setUpAllTabData(a, b){
    IAPDateAll = a;
    IAPRevenueAll = b
}
$('a[data-toggle="pill"]').on('shown.bs.tab', function(e) {
    var target = $(e.target).attr("href") // activated tab
    switch (target) {
        case "#iap-date-all-content":
            lineIAPDateAll.redraw();
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        case "#iap-revenue-all-content":
            lineIAPRevenueAll.redraw();
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        default:
            const index  = getIndexHrefTab(target)
            lineIAPDate[index].redraw()
            lineIAPRevenue[index].redraw()
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
    }
});

function getIndexHrefTab(id){
    return id_Tab.indexOf(id.split("-")[2])
}


function redrawAll(){
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
    for (let i = 0;  i < lineIAPRevenue.length; i++){
        lineIAPRevenue[i].redraw()
        lineIAPDate[i].redraw()
    }
    if (lineIAPRevenueAll != "" && lineIAPDateAll!=""){
        lineIAPRevenueAll.redraw()
        lineIAPDateAll.redraw()
    }
}

function selectAllBegin(){
    for (let i = 0; i < splitNames.length; i++){
        selectAllByIndex(i)
    }
    selectAll()
}
function selectAll(){
    $("."+allNames[0]+"-all").prop("checked", false);
    $("."+allNames[0]+"-all").prop("disabled", false);

    for (let i = 1; i < allNames.length; i++){
        $("."+allNames[i]+"-all").prop("checked", true);
        $("."+allNames[i]+"-all").prop("disabled", false);
    }
    boolAll[0][0] = false;
    for (let i = 1; i < boolAll.length; i++){
        boolAll[i][0] = true;
    }
    updateIAPDateAll(boolAll)
    updateIAPRevenueAll(boolAll)

}

function selectAllByIndex(index){
    $("."+splitNames[index][0]+ "-" +id_Tab[index]).prop("checked", false);
    $("."+splitNames[index][0]+ "-" +id_Tab[index]).prop("disabled", false);

    for (let i = 1; i < splitNames[index].length; i++){
        $("."+splitNames[index][i] + "-" + id_Tab[index]).prop("checked", true);
        $("."+splitNames[index][i] + "-" +id_Tab[index]).prop("disabled", false);
    }

    boolSplit[index][0][0] = false;
    for (let i = 1; i < boolSplit[index].length; i++){
        boolSplit[index][i][0] = true;
    }
    updateIAPRevenueByIndex(index)
    updateIAPDateByIndex(index)
}
function clearChartByIndex(index){

    $("."+splitNames[index][0]+ "-" +id_Tab[index]).prop("checked", true);
    $("."+splitNames[index][0]+ "-" +id_Tab[index]).prop("disabled", true);

    for (let i = 1; i < splitNames[index].length; i++){
        $("."+splitNames[index][i] + "-" +id_Tab[index]).prop("checked", false);
        $("."+splitNames[index][i] + "-" +id_Tab[index]).prop("disabled", false);
    }

    boolSplit[index][0][0] = true;
    for (let i = 1; i < boolSplit[index].length; i++){
        boolSplit[index][i][0] = false;
    }
    updateIAPRevenueByIndex(index)
    updateIAPDateByIndex(index)

}
function clearChart(){

    $("."+allNames[0]+"-all").prop("checked", true);
    $("."+allNames[0]+"-all").prop("disabled", true);

    for (let i = 1; i < allNames.length; i++){
        $("."+allNames[i]+"-all").prop("checked", false);
        $("."+allNames[i]+"-all").prop("disabled", false);
    }
    boolAll[0][0] = true;
    for (let i = 1; i < boolAll.length; i++){
        boolAll[i][0] = false;
    }
    updateIAPRevenueAll(boolAll)
    updateIAPDateAll(boolAll)

}


function initSelectAndClear(){
    for (let i =0 ; i < id_Tab.length; i++){
        $("#btnAll"+id_Tab[i]).click(function (){
            selectAllByIndex(i)
        })
        $("#btnClear"+id_Tab[i]).click(function (){
            clearChartByIndex(i)
        })
    }
    $("#btnAll").click(function (){
        selectAll()
    })
    $("#btnClear").click(function (){
        clearChart()
    })
}

function emptyChart(){
    for (let i = 0; i < id_Tab; i++){
        $('#iap-date-'+id_Tab[i]).empty()
        $('#iap-revenue-'+id_Tab[i]).empty()
    }
}

function convertToMorrisLineChart(){
    updateChartType(1)
    for (let i = 0; i < splitNames.length; i++){
        updateIAPDateByIndex(i)
        updateIAPRevenueByIndex(i)
    }
    if (lineIAPRevenueAll != "" && lineIAPDateAll!=""){
        updateIAPRevenueAll(boolAll)
        updateIAPDateAll(boolAll)
    }
}

function convertToMorrisBarChart(){
    updateChartType(2)
    for (let i = 0; i < splitNames.length; i++){
        updateIAPDateByIndex(i)
        updateIAPRevenueByIndex(i)
    }
    if (lineIAPRevenueAll != "" && lineIAPDateAll!=""){
        updateIAPRevenueAll(boolAll)
        updateIAPDateAll(boolAll)
    }
}

function redrawChart() {
    for (let i =0 ; i < lineIAPDate.length; i++){
        lineIAPDate[i].redraw()
    }
    if (lineIAPRevenueAll != "" && lineIAPDateAll!=""){
        lineIAPRevenueAll.redraw()
        lineIAPDateAll.redraw()
    }
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
}


function loadGraphWhenClickGraph(){
    redrawAll()
}

let currentTab = 0
function redrawByID(id){
    let index = id_Tab.indexOf(id)
    if (id == "all"){
        currentTab = 0
        lineIAPRevenueAll.redraw()
        lineIAPDateAll.redraw()
        return
    }
    if (index != -1){
        currentTab = index + 1
        lineIAPRevenue[index].redraw()
        lineIAPDate[index].redraw()
    }
}

function isCurrentTab(id){
    let index = id_Tab.indexOf(id)
    return index + 1 == currentTab?true:false
}

function fakedrawByID(id){
    let index = id_Tab.indexOf(id)
    if (id == "all"){
        lineIAPRevenueAll.redraw()
        lineIAPDateAll.redraw()
        return
    }
    if (index != -1){
        lineIAPRevenue[index].redraw()
        lineIAPDate[index].redraw()
    }
}

$('#TableButton').click(function () {
    $(this).attr("class","btn btn-info")
    $('#GraphButton').attr("class","btn btn-outline-info")
    for (let i = 0; i < id_Tab.length; i++){
        $('#' +id_Tab[i]+ '-data-table').attr("hidden", false)
        $('#' +id_Tab[i]+'-chart').attr("hidden", true)

    }
    $('#all-data-table').attr("hidden", false)
    $('#all-chart').attr("hidden", true)

    $('#bar-icon').attr("hidden", true)
    $('#line-icon').attr("hidden", true)
})

$('#GraphButton').click(function () {
    $(this).attr("class","btn btn-info")
    $('#TableButton').attr("class","btn btn-outline-info")

    for (let i = 0; i < id_Tab.length; i++){
        $('#' +id_Tab[i]+ '-data-table').attr("hidden", true)
        $('#' +id_Tab[i]+'-chart').attr("hidden", false)
    }
    $('#all-data-table').attr("hidden", true)
    $('#all-chart').attr("hidden", false)

    $('#bar-icon').attr("hidden", true)
    $('#line-icon').attr("hidden", true)

    loadGraphWhenClickGraph()
})
