var lineAmountSpend = ""
var lineUserSpend = ""
var lineEventSpend = ""
var lineAmountByUserSpend = ""
var lineAmountByEventSpend = ""
var lineEventByUserSpend = ""

var amountSpendData = ""
var userSpendData = ""
var eventSpendData = ""
var amountByUserSpendData = ""
var amountByEventSpendData = ""
var eventByUserSpendData = ""
var spendContexts = []
var earnContexts = []
var spendColors = []
var earnColors = []
var chartType = 1 // line
var CurrentCurrency = ""

const boolSpend = []
const boolEarn = []
const boolSpendFlow = []
const boolEarnFlow = []
var dataFlow = ""

String.prototype.toHex = function() {
    var hash = 0;
    if (this.length === 0) return hash;
    for (var i = 0; i < this.length; i++) {
        hash = this.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    var color = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 255;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}

function generateSpendColors (list){
    for (const c of list){
        spendColors.push(c.Context.toHex())
    }
}
function generateEarnColors (list){
    for (const c of list){
        earnColors.push(c.Context.toHex())
    }
}

function updateChartType(value){
    chartType = value
}
function updateSpendAmount(boolArr) {
    var ret = JSON.parse(JSON.stringify(amountSpendData))
    var labels = JSON.parse(JSON.stringify(spendContexts))
    var chartColors = []
    for (let i = 0; i < boolArr.length; i++){
        if(boolArr[i][0] == false){
            labels = labels.filter(e => e !== boolArr[i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolArr[i][1]];
        }else{
            chartColors.push(spendColors[i])
        }
    }
    $('#spend-amount').empty()

    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "Sum"

    if (chartType == 1){
        lineAmountSpend = Morris.Line({
            element: 'spend-amount',
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
        lineAmountSpend = Morris.Bar({
            element: 'spend-amount',
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
function updateSpendUser(boolArr) {
    var ret = JSON.parse(JSON.stringify(userSpendData))
    var labels = JSON.parse(JSON.stringify(spendContexts))
    var chartColors = []
    for (let i = 0; i < boolArr.length; i++){
        if(boolArr[i][0] == false){
            labels = labels.filter(e => e !== boolArr[i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolArr[i][1]];
        }else{
            chartColors.push(spendColors[i])
        }
    }
    $('#spend-user').empty()

    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "None"
    if (chartType == 1){
        lineUserSpend = Morris.Line({
            element: 'spend-user',
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
        lineUserSpend = Morris.Bar({
            element: 'spend-user',
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
function updateSpendEvent(boolArr) {
    var ret = JSON.parse(JSON.stringify(eventSpendData))
    var labels = JSON.parse(JSON.stringify(spendContexts))
    var chartColors = []
    for (let i = 0; i < boolArr.length; i++){
        if(boolArr[i][0] == false){
            labels = labels.filter(e => e !== boolArr[i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolArr[i][1]];
        }else{
            chartColors.push(spendColors[i])
        }
    }
    $('#spend-event').empty()

    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "None"
    if (chartType == 1){
        lineEventSpend = Morris.Line({
            element: 'spend-event',
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
        lineEventSpend = Morris.Bar({
            element: 'spend-event',
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
function updateSpendAmountByUser(boolArr) {
    var ret = JSON.parse(JSON.stringify(amountByUserSpendData))
    var labels = JSON.parse(JSON.stringify(spendContexts))
    var chartColors = []
    for (let i = 0; i < boolArr.length; i++){
        if(boolArr[i][0] == false){
            labels = labels.filter(e => e !== boolArr[i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolArr[i][1]];
        }else{
            chartColors.push(spendColors[i])
        }
    }
    $('#spend-amount-user').empty()

    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "Average"
    if (chartType == 1){
        lineAmountByUserSpend = Morris.Line({
            element: 'spend-amount-user',
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
        lineAmountByUserSpend = Morris.Bar({
            element: 'spend-amount-user',
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
function updateSpendAmountByEvent(boolArr) {
    var ret = JSON.parse(JSON.stringify(amountByEventSpendData))
    var labels = JSON.parse(JSON.stringify(spendContexts))
    var chartColors = []
    for (let i = 0; i < boolArr.length; i++){
        if(boolArr[i][0] == false){
            labels = labels.filter(e => e !== boolArr[i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolArr[i][1]];
        }else{
            chartColors.push(spendColors[i])
        }
    }
    $('#spend-amount-event').empty()

    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "Average"
    if (chartType == 1){
        lineAmountByEventSpend = Morris.Line({
            element: 'spend-amount-event',
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
        lineAmountByEventSpend = Morris.Bar({
            element: 'spend-amount-event',
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
function updateSpendEventByUser(boolArr) {
    var ret = JSON.parse(JSON.stringify(eventByUserSpendData))
    var labels = JSON.parse(JSON.stringify(spendContexts))
    var chartColors = []
    for (let i = 0; i < boolArr.length; i++){
        if(boolArr[i][0] == false){
            labels = labels.filter(e => e !== boolArr[i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolArr[i][1]];
        }else{
            chartColors.push(spendColors[i])
        }
    }
    $('#spend-event-user').empty()

    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "Average"
    if (chartType == 1){
        lineEventByUserSpend = Morris.Line({
            element: 'spend-event-user',
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
        lineEventByUserSpend = Morris.Bar({
            element: 'spend-event-user',
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

function setUpSpendContext(contexts){
    for (const c of contexts){
        spendContexts.push(c.Context)
    }
}
function setUpEarnContext(tmp){
    for (const t of tmp){
        earnContexts.push(t.Context)
    }
}


function updateBoolSpendWithValueFilter(start, end){
    const ans = []
    var ret = JSON.parse(JSON.stringify(amountSpendData))
    for (const c of ret){
        for (let i = 0; i < spendContexts.length; i++){
            if (c[spendContexts[i]] <= end && c[spendContexts[i]] > start && spendContexts[i] != "Top"){
                if (ans.indexOf(spendContexts[i]) === -1){
                    ans.push(spendContexts[i])
                }
            }
        }
    }
    if (ans.length != 0){
        boolSpend.length = 0
        for (let i = 0 ; i < spendContexts.length; i++){
            const tmp = []
            tmp.push(ans.includes(spendContexts[i]))
            tmp.push(spendContexts[i])
            boolSpend.push(tmp)
        }
    }
    return ans
}
function updateBoolEarnWithValueFilter(start, end){
    const ans = []
    var ret = JSON.parse(JSON.stringify(amountEarnData))
    for (const c of ret){
        for (let i = 0; i < earnContexts.length; i++){
            if (c[earnContexts[i]] <= end && c[earnContexts[i]] > start && earnContexts[i] != "Top"){
                if (ans.indexOf(earnContexts[i]) === -1){
                    ans.push(earnContexts[i])
                }
            }
        }
    }
    if (ans.length != 0){
        boolEarn.length = 0
        for (let i = 0 ; i < earnContexts.length; i++){
            const tmp = []
            tmp.push(ans.includes(earnContexts[i]))
            tmp.push(earnContexts[i])
            boolEarn.push(tmp)
        }
    }
    return ans
}
function initSpendEarnCheckBoxLink(){
    for (let i = 0; i < spendContexts.length; i++){
        $('.'+spendContexts[i]+"-Spend").on('change', function() {
            boolSpend.length = 0
            for (let j = 0;j < spendContexts.length; j++){
                const tmp = []
                tmp.push($('.'+spendContexts[j]+'-Spend').is(':checked'))
                tmp.push(spendContexts[j])
                boolSpend.push(tmp)
            }
            updateSpendAmount(boolSpend);
            updateSpendUser(boolSpend);
            updateSpendEvent(boolSpend);
            updateSpendAmountByUser(boolSpend);
            updateSpendAmountByEvent(boolSpend);
            updateSpendEventByUser(boolSpend);
        });
    }
    for (let i = 0; i < spendContexts.length; i++){
        if (i != 0){
            $('.' + spendContexts[i]+'-Spend').prop("checked", false).trigger("change");
        }else{
            $('.' + spendContexts[i]+'-Spend').prop("disabled", true);
        }
        //link checkbox
        $("."+spendContexts[i]+"-Spend").click(function() {
            var x = this.checked;
            $("."+spendContexts[i]+"-Spend").prop("checked", x);
            updateBoolList(boolSpend, spendContexts[i], x)
            const index = checkLastOne(boolSpend, true)
            if (index.length == 1)
                $("."+spendContexts[[index[0]]]+"-Spend").prop("disabled", true)
            else
                clearSpendDisabled(spendContexts)
        });
    }

    for (let i = 0; i < earnContexts.length; i++){
        $('.'+earnContexts[i]+"-Earn").on('change', function() {
            boolEarn.length = 0
            for (let j = 0;j < earnContexts.length; j++){
                const tmp = []
                tmp.push($('.'+earnContexts[j]+'-Earn').is(':checked'))
                tmp.push(earnContexts[j])
                boolEarn.push(tmp)
            }
            updateEarnAmount(boolEarn);
            updateEarnUser(boolEarn);
            updateEarnEvent(boolEarn);
            updateEarnAmountByUser(boolEarn);
            updateEarnAmountByEvent(boolEarn);
            updateEarnEventByUser(boolEarn);
        });
    }
    for (let i = 0; i < earnContexts.length; i++){
        if (i != 0){
            $('.' + earnContexts[i]+'-Earn').prop("checked", false).trigger("change");
        }
        else{
            $('.' + earnContexts[i]+'-Earn').prop("disabled", true);
        }
        //link checkbox
        $("."+earnContexts[i]+"-Earn").click(function() {
            var x = this.checked;
            $("."+earnContexts[i]+"-Earn").prop("checked", x);
            updateBoolList(boolEarn, earnContexts[i], x)
            const index = checkLastOne(boolEarn, true)
            if (index.length == 1 )
                $("."+earnContexts[[index[0]]]+"-Earn").prop("disabled", true)
            else
                clearEarnDisabled(earnContexts)
        });
    }
    //flow new method
    $("#" + spendContexts[0] + "-Spend-Flow").prop("checked", true).trigger("change")
    $("#" + earnContexts[0] + "-Earn-Flow").prop("checked", true).trigger("change")
    for (let i = 0; i < spendContexts.length; i++) {
        $('#' + spendContexts[i] + "-Spend-Flow").on('change', function () {
            boolSpendFlow.length = 0
            if (i != 0){
                $("#" + spendContexts[0] + "-Spend-Flow").prop("checked", false).trigger("change");
            }
            else{
                if ($("#" + spendContexts[0] + "-Spend-Flow").prop("checked")) {
                    for (let k = 1; k < spendContexts.length; k++) {
                        $("#" + spendContexts[k] + "-Spend-Flow").prop("checked", false)
                    }
                }
            }
            for (let j = 0; j < spendContexts.length; j++) {
                const tmp = []
                tmp.push($('#' + spendContexts[j] + '-Spend-Flow').is(':checked'))
                tmp.push(spendContexts[j])
                boolSpendFlow.push(tmp)
            }
            updateCheckFlowChart(boolSpendFlow, boolEarnFlow)
        });
    }


    for (let i = 0; i < earnContexts.length; i++) {
        $('#' + earnContexts[i] + "-Earn-Flow").on('change', function () {
            boolEarnFlow.length = 0
            if (i != 0){
                $("#" + earnContexts[0] + "-Earn-Flow").prop("checked", false).trigger("change");
            }
            else{
                if ($("#" + earnContexts[0] + "-Earn-Flow").prop("checked")) {
                    for (let k = 1; k < earnContexts.length; k++) {
                        $("#" + earnContexts[k] + "-Earn-Flow").prop("checked", false)
                    }
                }
            }
            for (let j = 0; j < earnContexts.length; j++) {
                const tmp = []
                tmp.push($('#' + earnContexts[j] + '-Earn-Flow').is(':checked'))
                tmp.push(earnContexts[j])
                boolEarnFlow.push(tmp)
            }
            updateCheckFlowChart(boolSpendFlow, boolEarnFlow)
        });
    }
}

function updateCheckFlowChart(boolSpendFlow, boolEarnFlow){
    var amountSpend = JSON.parse(JSON.stringify(amountSpendData))
    var labelsSpend = JSON.parse(JSON.stringify(spendContexts))
    for (let i = 0; i < boolSpendFlow.length; i++){
        if(boolSpendFlow[i][0] == false){
            labelsSpend = labelsSpend.filter(e => e !== boolSpendFlow[i][1]);
            for(var j = 0; j < amountSpend.length; j++)
                delete amountSpend[j][boolSpendFlow[i][1]];
        }
    }

    const withDraw = []
    const initSpend = JSON.parse(JSON.stringify(amountSpendData))
    for (const c of initSpend){
        const tmp = {}
        tmp.Date = c.Date
        tmp.Withdraw = c["Withdraw"]
        withDraw.push(tmp)
    }


    const totalSpendByDate = []
    var withDrawCount = 0
    for (const c of amountSpend){
        const tmp = {}
        tmp.Date = c.Date
        tmp.Amount = 0
        tmp.Withdraw = 0
        if ($("#Withdraw-Spend-Flow").prop("checked") || $("#Top-Spend-Flow").prop("checked"))
            tmp.Withdraw = withDraw[withDrawCount].Withdraw
        for (let i = 0; i < labelsSpend.length; i++){
            tmp.Amount += labelsSpend[i]!= "APIToolSpend"? c[labelsSpend[i]] : 0
        }
        totalSpendByDate.push(tmp)
        withDrawCount++
    }


    var amountEarn = JSON.parse(JSON.stringify(amountEarnData))
    var labelsEarn = JSON.parse(JSON.stringify(earnContexts))
    if (boolEarnFlow[0][0] == true){
        labelsEarn = labelsEarn.filter(e => e !== "Top");
        for(var j = 0; j < amountEarn.length; j++)
            delete amountEarn[j]["Top"];

    }else{
        for (let i = 0; i < boolEarnFlow.length; i++){
            if(boolEarnFlow[i][0] == false){
                labelsEarn = labelsEarn.filter(e => e !== boolEarnFlow[i][1]);
                for(var j = 0; j < amountEarn.length; j++)
                    delete amountEarn[j][boolEarnFlow[i][1]];
            }
        }
    }

    const deposit = []
    const initEarn = JSON.parse(JSON.stringify(amountEarnData))
    for (const c of initEarn){
        const tmp = {}
        tmp.Date = c.Date
        tmp.Deposit = c["Deposit"]
        deposit.push(tmp)
    }

    const totalEarnByDate = []
    var depositCount = 0
    for (const c of amountEarn){
        const tmp = {}
        tmp.Date = c.Date
        tmp.Amount = 0
        tmp.Deposit = 0
        if ($("#Deposit-Earn-Flow").prop("checked") || $("#Top-Earn-Flow").prop("checked"))
            tmp.Deposit = deposit[depositCount].Deposit
        for (let i = 0; i < labelsEarn.length; i++){
            if (labelsEarn[i] != "APIToolEarn" && labelsEarn[i] != "Deposit"){
                tmp.Amount += c[labelsEarn[i]]
            }
        }
        totalEarnByDate.push(tmp)
        depositCount++
    }

    const data = []
    for (let i = 0; i < totalSpendByDate.length; i++){
        const tmp = {}
        tmp.Date = totalEarnByDate[i].Date
        tmp.Spend = totalSpendByDate[i].Amount
        tmp.Earn = totalEarnByDate[i].Amount
        tmp.Flow = totalSpendByDate[i].Amount - totalEarnByDate[i].Amount
        tmp.Withdraw = totalSpendByDate[i].Withdraw
        tmp.Deposit = totalEarnByDate[i].Deposit
        data.push(tmp)
    }
    $('#FlowByGE').empty()

    dataFlow = data
    if (CurrentCurrency == "HE"){
        if (chartType == 1) {
            flowGE = Morris.Line({
                element: "FlowByGE",
                data: data,
                xkey: "Date",
                ykeys: ["Spend", "Earn", "Flow", "Deposit", "Withdraw"],
                lineColors: ["#7229d9", "#5bd9ce", "#181566", "#fcee4e", "#de2828"],
                labels: ["Spend", "Earn", "Flow", "Deposit", "Withdraw"],
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
            flowGE = Morris.Bar({
                element: "FlowByGE",
                data: data,
                xkey: "Date",
                ykeys: ["Spend", "Earn", "Flow", "Deposit", "Withdraw"],
                barColors: ["#7229d9", "#5bd9ce", "#181566", "#fcee4e", "#de2828"],
                labels: ["Spend", "Earn", "Flow", "Deposit", "Withdraw"],
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
    }else{
        if (chartType == 1) {
            flowGE = Morris.Line({
                element: "FlowByGE",
                data: data,
                xkey: "Date",
                ykeys: ["Spend", "Earn", "Flow"],
                lineColors: ["#7229d9", "#5bd9ce", "#181566"],
                labels: ["Spend", "Earn", "Flow"],
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
        else{
            flowGE = Morris.Bar({
                element: "FlowByGE",
                data: data,
                xkey: "Date",
                ykeys: ["Spend", "Earn", "Flow"],
                barColors: ["#7229d9", "#5bd9ce", "#181566"],
                labels: ["Spend", "Earn", "Flow"],
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
    }
}

function clearSpendChart(){
    $("."+spendContexts[0]+"-Spend").prop("checked", true);
    $("."+spendContexts[0]+"-Spend").prop("disabled", true);

    for (let i = 1; i < spendContexts.length; i++){
        $("."+spendContexts[i]+"-Spend").prop("checked", false);
        $("."+spendContexts[i]+"-Spend").prop("disabled", false);
    }
    boolSpend[0][0] = true;
    for (let i = 1; i < boolSpend.length; i++){
        boolSpend[i][0] = false;
    }
    updateSpendAmount(boolSpend)
    updateSpendUser(boolSpend)
    updateSpendEvent(boolSpend)
    updateSpendAmountByUser(boolSpend)
    updateSpendAmountByEvent(boolSpend)
    updateSpendEventByUser(boolSpend)
}
function clearSpendDisabled(arr){
    for (let i = 0; i < arr.length; i++){
        $("."+arr[i]+"-Spend").prop("disabled", false);
    }
}
function checkLastOne(bool, value){
    var index = []
    for (let i = 0; i < bool.length; i++){
        if (bool[i][0] == value)
            index.push(i)
    }
    return index
}
function updateBoolList(bool, context, status){
    for (let i = 0; i < bool.length; i++){
        if (bool[i][1] == context)
            bool[i][0] = status
    }
}


function convertSpendToMorrisLineChart(amount, user, event , amountByUser, amountByEvent, eventByUser){
    updateChartType(1)
    amountSpendData = amount
    userSpendData = user
    eventSpendData = event
    amountByUserSpendData = amountByUser
    amountByEventSpendData = amountByEvent
    eventByUserSpendData = eventByUser

    if (lineAmountSpend != ""){
        updateSpendAmount(boolSpend)
        updateSpendUser(boolSpend)
        updateSpendEvent(boolSpend)
        updateSpendAmountByUser(boolSpend)
        updateSpendAmountByEvent(boolSpend)
        updateSpendEventByUser(boolSpend)
    }
}
function convertSpendToMorrisBarChart(){
    updateChartType(2)
    updateSpendAmount(boolSpend)
    updateSpendUser(boolSpend)
    updateSpendEvent(boolSpend)
    updateSpendAmountByUser(boolSpend)
    updateSpendAmountByEvent(boolSpend)
    updateSpendEventByUser(boolSpend)
}

function initBoolEarnSpend(){
    for (let i = 0; i < spendContexts.length; i++) {
        const tmp = []
        if (i == 0){
            tmp.push(true)
        }else{
            tmp.push(false)
        }
        tmp.push(spendContexts[i])
        boolSpendFlow.push(tmp)
    }

    for (let i = 0; i < earnContexts.length; i++) {
        const tmp = []
        if (i == 0){
            tmp.push(true)
        }else{
            tmp.push(false)
        }
        tmp.push(earnContexts[i])
        boolEarnFlow.push(tmp)
    }
}

var lineAmountEarn = ""
var lineUserEarn = ""
var lineEventEarn = ""
var lineAmountByUserEarn = ""
var lineAmountByEventEarn = ""
var lineEventByUserEarn = ""

var amountEarnData = ""
var userEarnData = ""
var eventEarnData = ""
var amountByUserEarnData = ""
var amountByEventEarnData = ""
var eventByUserEarnData = ""
function updateEarnAmount(boolArr) {
    var ret = JSON.parse(JSON.stringify(amountEarnData))
    var labels = JSON.parse(JSON.stringify(earnContexts))
    var chartColors = []
    for (let i = 0; i < boolArr.length; i++){
        if(boolArr[i][0] == false){
            labels = labels.filter(e => e !== boolArr[i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolArr[i][1]];
        }else{
            chartColors.push(earnColors[i])
        }
    }
    $('#earn-amount').empty()
    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "Sum"
    if (chartType == 1){
        lineAmountEarn = Morris.Line({
            element: 'earn-amount',
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
        lineAmountEarn = Morris.Bar({
            element: 'earn-amount',
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
function updateEarnUser(boolArr) {
    var ret = JSON.parse(JSON.stringify(userEarnData))
    var labels = JSON.parse(JSON.stringify(earnContexts))
    var chartColors = []
    for (let i = 0; i < boolArr.length; i++){
        if(boolArr[i][0] == false){
            labels = labels.filter(e => e !== boolArr[i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolArr[i][1]];
        }else{
            chartColors.push(earnColors[i])
        }
    }
    $('#earn-user').empty()

    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "None"
    if (chartType == 1){
        lineUserEarn = Morris.Line({
            element: 'earn-user',
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
        lineUserEarn = Morris.Bar({
            element: 'earn-user',
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
function updateEarnEvent(boolArr) {
    var ret = JSON.parse(JSON.stringify(eventEarnData))
    var labels = JSON.parse(JSON.stringify(earnContexts))
    var chartColors = []
    for (let i = 0; i < boolArr.length; i++){
        if(boolArr[i][0] == false){
            labels = labels.filter(e => e !== boolArr[i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolArr[i][1]];
        }else{
            chartColors.push(earnColors[i])
        }
    }
    $('#earn-event').empty()

    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "None"
    if (chartType == 1){
        lineEventEarn = Morris.Line({
            element: 'earn-event',
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
        lineEventEarn = Morris.Bar({
            element: 'earn-event',
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
function updateEarnAmountByUser(boolArr) {
    var ret = JSON.parse(JSON.stringify(amountByUserEarnData))
    var labels = JSON.parse(JSON.stringify(earnContexts))
    var chartColors = []
    for (let i = 0; i < boolArr.length; i++){
        if(boolArr[i][0] == false){
            labels = labels.filter(e => e !== boolArr[i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolArr[i][1]];
        }else{
            chartColors.push(earnColors[i])
        }
    }
    $('#earn-amount-user').empty()

    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "Average"
    if (chartType == 1){
        lineAmountByUserEarn = Morris.Line({
            element: 'earn-amount-user',
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
        lineAmountByUserEarn = Morris.Bar({
            element: 'earn-amount-user',
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
function updateEarnAmountByEvent(boolArr) {
    var ret = JSON.parse(JSON.stringify(amountByEventEarnData))
    var labels = JSON.parse(JSON.stringify(earnContexts))
    var chartColors = []
    for (let i = 0; i < boolArr.length; i++){
        if(boolArr[i][0] == false){
            labels = labels.filter(e => e !== boolArr[i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolArr[i][1]];
        }else{
            chartColors.push(earnColors[i])
        }
    }
    $('#earn-amount-event').empty()

    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "Average"
    if (chartType == 1){
        lineAmountByEventEarn = Morris.Line({
            element: 'earn-amount-event',
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
        lineAmountByEventEarn = Morris.Bar({
            element: 'earn-amount-event',
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
function updateEarnEventByUser(boolArr) {
    var ret = JSON.parse(JSON.stringify(eventByUserEarnData))
    var labels = JSON.parse(JSON.stringify(earnContexts))
    var chartColors = []
    for (let i = 0; i < boolArr.length; i++){
        if(boolArr[i][0] == false){
            labels = labels.filter(e => e !== boolArr[i][1]);
            chartColors.splice(i, 1)
            for(var j = 0; j < ret.length; j++)
                delete ret[j][boolArr[i][1]];
        }else{
            chartColors.push(earnColors[i])
        }
    }
    $('#earn-event-user').empty()

    var finaleLabels = JSON.parse(JSON.stringify(labels))
    finaleLabels[finaleLabels.indexOf("Top")] = "Average"
    if (chartType == 1){
        lineEventByUserEarn = Morris.Line({
            element: 'earn-event-user',
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
        lineEventByUserEarn = Morris.Bar({
            element: 'earn-event-user',
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

function clearEarnChart(){
    $("."+earnContexts[0]+"-Earn").prop("checked", true);
    $("."+earnContexts[0]+"-Earn").prop("disabled", true);

    for (let i = 1; i < earnContexts.length; i++){
        $("."+earnContexts[i]+"-Earn").prop("checked", false);
        $("."+earnContexts[i]+"-Earn").prop("disabled", false);
    }
    boolEarn[0][0] = true;
    for (let i = 1; i < boolEarn.length; i++){
        boolEarn[i][0] = false;
    }
    updateEarnAmount(boolEarn)
    updateEarnUser(boolEarn)
    updateEarnEvent(boolEarn)
    updateEarnAmountByUser(boolEarn)
    updateEarnAmountByEvent(boolEarn)
    updateEarnEventByUser(boolEarn)
}
function clearEarnDisabled(arr){
    for (let i = 0; i < arr.length; i++){
        $("."+arr[i]+"-Earn").prop("disabled", false);
    }
}

function convertEarnToMorrisLineChart(amount, user, event , amountByUser, amountByEvent, eventByUser){
    updateChartType(1)
    amountEarnData = amount
    userEarnData = user
    eventEarnData = event
    amountByUserEarnData = amountByUser
    amountByEventEarnData = amountByEvent
    eventByUserEarnData = eventByUser

    if (lineAmountEarn != ""){
        updateEarnAmount(boolEarn)
        updateEarnUser(boolEarn)
        updateEarnEvent(boolEarn)
        updateEarnAmountByUser(boolEarn)
        updateEarnAmountByEvent(boolEarn)
        updateEarnEventByUser(boolEarn)
    }
}
function convertEarnToMorrisBarChart(){
    updateChartType(2)
    updateEarnAmount(boolEarn)
    updateEarnUser(boolEarn)
    updateEarnEvent(boolEarn)
    updateEarnAmountByUser(boolEarn)
    updateEarnAmountByEvent(boolEarn)
    updateEarnEventByUser(boolEarn)
}

$('a[data-toggle="pill"]').on('shown.bs.tab', function(e) {
    var target = $(e.target).attr("href") // activated tab
    switch (target) {
        case "#gem-spend-amount":
            lineAmountSpend.redraw();
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        case "#gem-spend-user":
            lineUserSpend.redraw();
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        case "#gem-spend-event":
            lineEventSpend.redraw();
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        case "#gem-spend-amount-user":
            lineAmountByUserSpend.redraw();
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        case "#gem-spend-amount-event":
            lineAmountByEventSpend.redraw();
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        case "#gem-spend-event-user":
            lineEventByUserSpend.redraw();
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        case "#gem-earn-amount":
            lineAmountEarn.redraw();
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        case "#gem-earn-user":
            lineUserEarn.redraw();
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        case "#gem-earn-event":
            lineEventEarn.redraw();
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        case "#gem-earn-amount-user":
            lineAmountByUserEarn.redraw();
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        case "#gem-earn-amount-event":
            lineAmountByEventEarn.redraw();
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        case "#gem-earn-event-user":
            lineEventByUserEarn.redraw();
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;

        case "#flow-tab": //flow GE
            flowGE.redraw();
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
            break;
        default:
            redrawSpendChart()
            // redrawEarnSource()
            $('svg').css({ width: '100%' });
            $('svg').css({ height: '100%' });
    }
});

function redrawSpendChart(){
   lineAmountSpend.redraw()
   lineUserSpend.redraw()
   lineEventSpend.redraw()
   lineAmountByEventSpend.redraw()
   lineAmountByUserSpend.redraw()
   lineEventByUserSpend.redraw()
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });

}

function redrawEarnChart(){
    lineAmountEarn.redraw()
    lineUserEarn.redraw()
    lineEventEarn.redraw()
    lineAmountByEventEarn.redraw()
    lineAmountByUserEarn.redraw()
    lineEventByUserEarn.redraw()
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
}

function redrawnAll(){
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
    redrawSpendChart()
    redrawEarnChart()
    redrawFlow()
    $('.owl-carousel').trigger('refresh.owl.carousel')
}

function selectAllSpendChart(){
    $("."+spendContexts[0]+"-Spend").prop("checked", false);
    $("."+spendContexts[0]+"-Spend").prop("disabled", false);

    for (let i = 1; i < spendContexts.length; i++){
        $("."+spendContexts[i]+"-Spend").prop("checked", true);
        $("."+spendContexts[i]+"-Spend").prop("disabled", false);
    }
    boolSpend[0][0] = false;
    for (let i = 1; i < boolSpend.length; i++){
        boolSpend[i][0] = true;
    }
    updateSpendAmount(boolSpend)
    updateSpendEvent(boolSpend)
    updateSpendUser(boolSpend)
    updateSpendAmountByEvent(boolSpend)
    updateSpendEventByUser(boolSpend)
    updateSpendAmountByUser(boolSpend)
}

function selectAllEarnChart(){
    $("."+earnContexts[0]+"-Earn").prop("checked", false);
    $("."+earnContexts[0]+"-Earn").prop("disabled", false);

    for (let i = 1; i < earnContexts.length; i++){
        $("."+earnContexts[i]+"-Earn").prop("checked", true);
        $("."+earnContexts[i]+"-Earn").prop("disabled", false);
    }
    boolEarn[0][0] = false;
    for (let i = 1; i < boolEarn.length; i++){
        boolEarn[i][0] = true;
    }
    updateEarnAmount(boolEarn)
    updateEarnUser(boolEarn)
    updateEarnEvent(boolEarn)
    updateEarnAmountByUser(boolEarn)
    updateEarnAmountByEvent(boolEarn)
    updateEarnEventByUser(boolEarn)
}

function emptyChart(){

    $('#earn-amount').empty()
    $('#earn-user').empty()
    $('#earn-event').empty()
    $('#earn-amount-user').empty()
    $('#earn-amount-event').empty()
    $('#earn-event-user').empty()

    $('#spend-amount').empty()
    $('#spend-user').empty()
    $('#spend-event').empty()
    $('#spend-amount-user').empty()
    $('#spend-amount-event').empty()
    $('#spend-event-user').empty()

    $('#FlowByGE').empty()

}

function redrawChart() {
    lineAmountSpend.redraw();
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
}
function reDrawEarn(){
    lineAmountEarn.redraw();
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
}




//chart flow by GE

//
var flowGE = ""
function flowByGE(flow, currency){
    CurrentCurrency = currency
    if (currency == "HE"){
        flowGE = Morris.Line({
            element: "FlowByGE",
            data: flow,
            xkey: "Date",
            ykeys: ["Spend", "Earn", "Flow", "Deposit", "Withdraw"],
            lineColors: ["#7229d9", "#5bd9ce", "#181566", "#fcee4e", "#de2828"],
            labels: ["Spend", "Earn", "Flow",  "Deposit", "Withdraw"],
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
        flowGE = Morris.Line({
            element: "FlowByGE",
            data: flow,
            xkey: "Date",
            ykeys: ["Spend", "Earn", "Flow"],
            lineColors: ["#7229d9", "#5bd9ce", "#181566"],
            labels: ["Spend", "Earn", "Flow"],
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
}
function flowLineChart(flow, currency){
    if (dataFlow != ""){
        flow = dataFlow
    }
    CurrentCurrency = currency
    if (currency == "HE"){
        flowGE = Morris.Line({
            element: "FlowByGE",
            data: flow,
            xkey: "Date",
            ykeys: ["Spend", "Earn", "Flow", "Deposit", "Withdraw"],
            lineColors: ["#7229d9", "#5bd9ce", "#181566", "#fcee4e", "#de2828"],
            labels: ["Spend", "Earn", "Flow",  "Deposit", "Withdraw"],
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
        flowGE = Morris.Line({
            element: "FlowByGE",
            data: flow,
            xkey: "Date",
            ykeys: ["Spend", "Earn", "Flow"],
            lineColors: ["#7229d9", "#5bd9ce", "#181566"],
            labels: ["Spend", "Earn", "Flow"],
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
}
function flowBarChart(flow, currency){
    if (dataFlow != "")
        flow = dataFlow
    if (currency == "HE"){
        flowGE = Morris.Bar({
            element: "FlowByGE",
            data: flow,
            xkey: "Date",
            ykeys: ["Spend", "Earn", "Flow", "Deposit", "Withdraw"],
            barColors: ["#7229d9", "#5bd9ce", "#181566", "#fcee4e", "#de2828"],
            labels: ["Spend", "Earn", "Flow",  "Deposit", "Withdraw"],
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
        flowGE = Morris.Bar({
            element: "FlowByGE",
            data: flow,
            xkey: "Date",
            ykeys: ["Spend", "Earn", "Flow"],
            barColors: ["#7229d9", "#5bd9ce", "#181566"],
            labels: ["Spend", "Earn", "Flow"],
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
}
function redrawFlow() {
    flowGE.redraw();
    $('svg').css({ width: '100%' });
    $('svg').css({ height: '100%' });
}

function loadGraphWhenClickGraph(){
    reDrawEarn()
    redrawChart()
    redrawFlow()
}

// ----------------------- FILTER -------------------
function changeSelectChooseContext(){
    $('#filterSpend').on('change', function() {
        var options = document.getElementById('filterSpend').selectedOptions;
        var values = Array.from(options).map(({ value }) => value);
        if (values.length + 1 == spendContexts.length){
            $('#inputValueScreenSpend').attr('hidden', false)
        }else{
            $('#inputValueScreenSpend').attr('hidden', true)
            $('input[id=startValueAmountSpend]').val('');
            $('input[id=endValueAmountSpend]').val('');
        }
    })
    $('#filterEarn').on('change', function() {
        var options = document.getElementById('filterEarn').selectedOptions;
        var values = Array.from(options).map(({ value }) => value);
        if (values.length + 1 == earnContexts.length){
            $('#inputValueScreenEarn').attr('hidden', false)
        }else{
            $('#inputValueScreenEarn').attr('hidden', true)
            $('input[id=startValueAmountEarn]').val('');
            $('input[id=endValueAmountEarn]').val('');
        }
    })
}
function filterSpendValue(boolArr, values){
    boolArr.length = 0
    for (let i = 0;i < spendContexts.length; i++){
        const tmp = []
        tmp.push(values.includes(spendContexts[i]))
        tmp.push(spendContexts[i])
        boolArr.push(tmp)
    }
    boolArr= JSON.parse(JSON.stringify(boolArr))

    updateSpendAmount(boolArr)
    updateSpendEvent(boolArr)
    updateSpendUser(boolArr)
    updateSpendAmountByEvent(boolArr)
    updateSpendEventByUser(boolArr)
    updateSpendAmountByUser(boolArr)
}
function filterSpend2Value(){
    updateSpendAmount(boolSpend)
    updateSpendEvent(boolSpend)
    updateSpendUser(boolSpend)
    updateSpendAmountByEvent(boolSpend)
    updateSpendEventByUser(boolSpend)
    updateSpendAmountByUser(boolSpend)
}
function filterEarn2Value(){
    updateEarnAmount(boolEarn)
    updateEarnEvent(boolEarn)
    updateEarnUser(boolEarn)
    updateEarnAmountByEvent(boolEarn)
    updateEarnEventByUser(boolEarn)
    updateEarnAmountByUser(boolEarn)
}

function filterEarnValue(boolArr, values){
    boolArr.length = 0
    for (let i = 0;i < earnContexts.length; i++){
        const tmp = []
        tmp.push(values.includes(earnContexts[i]))
        tmp.push(earnContexts[i])
        boolArr.push(tmp)
    }
    boolArr= JSON.parse(JSON.stringify(boolArr))

    updateEarnAmount(boolArr)
    updateEarnEvent(boolArr)
    updateEarnUser(boolArr)
    updateEarnAmountByEvent(boolArr)
    updateEarnEventByUser(boolArr)
    updateEarnAmountByUser(boolArr)

}

// apply filter
function btnApplySpend(){
    var options = document.getElementById('filterSpend').selectedOptions;
    var values = Array.from(options).map(({ value }) => value);
    const start = $('#startValueAmountSpend').val().replace(/,/g, '');
    const end = $('#endValueAmountSpend').val().replace(/,/g, '');

    if (values.length == 0){
        alert('Please choose at lest 1 context!')
        return
    }
    if (start.length == 0 && end.length == 0){
        $('#btnRemoveSpend').attr("hidden", false)
        $('#btnAllSpend').attr("hidden", true)
        $('#btnClearSpend').attr("hidden", true)
        filterSpendValue(boolSpend, values)
        updateSpendCarouselContext()
        removeEmptyDivSpend()
        return;
    }
    if (start.length == 0 || end.length == 0){
        alert('Please choose value!')
        return
    }
    if (parseInt(start) >= parseInt(end)){
        alert('Wrong range of value!')
        return
    }
    else{
        const values = updateBoolSpendWithValueFilter(parseInt(start), parseInt(end))
        if (values.length == 0){
            alert('No matches found, please choose another range!')
        }else{
            $('#btnRemoveSpend').attr("hidden", false)
            $('#btnAllSpend').attr("hidden", true)
            $('#btnClearSpend').attr("hidden", true)
            filterSpend2Value()
            updateSpendCarouselContextWithValue(values)
            removeEmptyDivSpend()
        }

    }
}
function btnApplyEarn(){
    var options = document.getElementById('filterEarn').selectedOptions;
    var values = Array.from(options).map(({ value }) => value);
    const start = $('#startValueAmountEarn').val().replace(/,/g, '');
    const end = $('#endValueAmountEarn').val().replace(/,/g, '');


    if (values.length == 0){
        alert('Please choose at lest 1 context!')
        return
    }
    if (start.length == 0 && end.length == 0){
        $('#btnRemoveEarn').attr("hidden", false)
        $('#btnAllEarn').attr("hidden", true)
        $('#btnClearEarn').attr("hidden", true)
        filterEarnValue(boolEarn, values)
        updateEarnCarouselContext()
        removeEmptyDivEarn()
        return;
    }
    if (start.length == 0 || end.length == 0){
        alert('Please choose value!')
        return
    }
    if (parseInt(start) >= parseInt(end)){
        alert('Wrong range of value!')
        return
    }
    else{
        const values = updateBoolEarnWithValueFilter(parseInt(start), parseInt(end))
        if (values.length == 0){
            alert('No matches found, please choose another range!')
            return
        }else{
            $('#btnRemoveEarn').attr("hidden", false)
            $('#btnAllEarn').attr("hidden", true)
            $('#btnClearEarn').attr("hidden", true)
            filterEarn2Value()
            updateEarnCarouselContextWithValue(values)
            removeEmptyDivEarn()
        }
    }
}

function btnRemoveFilterSpend(){
    $('input[id=startValueAmountSpend]').val('');
    $('input[id=endValueAmountSpend]').val('');

    $('#btnRemoveSpend').attr("hidden", true)
    $('#btnAllSpend').attr("hidden", false)
    $('#btnClearSpend').attr("hidden", false)
    var count = 0
    for (let i = 0; i < boolSpend.length; i++){
        if (boolSpend[i][0] == true){
            count++
        }
    }
    emptyCarouselSpend(count)
    updateElementCarouselSpend(carouselContext(spendContexts))
    changeFirstElementSpendContent()
    restoreEmptyDivSpend()
    reInitSpendContextLink()
    selectAllSpendChart()

}
function btnRemoveFilterEarn(){
    $('input[id=startValueAmountEarn]').val('');
    $('input[id=endValueAmountEarn]').val('');


    $('#btnRemoveEarn').attr("hidden", true)
    $('#btnAllEarn').attr("hidden", false)
    $('#btnClearEarn').attr("hidden", false)
    var count = 0
    for (let i = 0; i < boolEarn.length; i++){
        if (boolEarn[i][0] == true){
            count++
        }
    }
    emptyCarouselEarn(count)
    updateElementCarouselEarn(carouselContext(earnContexts))
    changeFirstElementEarnContent()
    restoreEmptyDivEarn()
    reInitEarnContextLink()
    selectAllEarnChart()
}

//remove empty div tag
function removeEmptyDivSpend() {
    var count = 0;
    for (let i = 0; i < boolSpend.length; i++){
        if (boolSpend[i][0] == true){
            count++
        }
    }

    for (let i = 0; i <= spendContexts.length / '12'; i++){
        if($("#Spend-Amount-Carousel-" +i).children().length == 0){
            $("#Spend-Amount-Carousel-" +i).parent().css({"display": "none"});
        }
        if($("#Spend-User-Carousel-" +i).children().length == 0){
            $("#Spend-User-Carousel-" +i).parent().css({"display": "none"});
        }
        if($("#Spend-Event-Carousel-" +i).children().length == 0){
            $("#Spend-Event-Carousel-" +i).parent().css({"display": "none"});
        }
        if($("#Spend-Amount-User-Carousel-" +i).children().length == 0){
            $("#Spend-Amount-User-Carousel-" +i).parent().css({"display": "none"});
        }
        if($("#Spend-Amount-Event-Carousel-" +i).children().length == 0){
            $("#Spend-Amount-Event-Carousel-" +i).parent().css({"display": "none"});
        }if($("#Spend-Event-User-Carousel-" +i).children().length == 0){
            $("#Spend--Event-User-Carousel-" +i).parent().css({"display": "none"});
        }
    }
    for (let i = 0; i < spendContexts.length / '12'; i++){
        if (i >= count / '12'){
            $("#owl_carousel_spend_amount").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "none"});
            $("#owl_carousel_spend_user").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "none"});
            $("#owl_carousel_spend_event").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "none"});
            $("#owl_carousel_spend_amount_by_user").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "none"});
            $("#owl_carousel_spend_amount_by_event").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "none"});
            $("#owl_carousel_spend_event_by_user").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "none"});
        }
    }

}
function removeEmptyDivEarn() {
    var count = 0;
    for (let i = 0; i < boolEarn.length; i++){
        if (boolEarn[i][0] == true){
            count++
        }
    }

    for (let i = 0; i <= earnContexts.length / '12'; i++){
        if($("#Earn-Amount-Carousel-" +i).children().length == 0){
            $("#Earn-Amount-Carousel-" +i).parent().css({"display": "none"});
        }
        if($("#Earn-User-Carousel-" +i).children().length == 0){
            $("#Earn-User-Carousel-" +i).parent().css({"display": "none"});
        }
        if($("#Earn-Event-Carousel-" +i).children().length == 0){
            $("#Earn-Event-Carousel-" +i).parent().css({"display": "none"});
        }
        if($("#Earn-Amount-User-Carousel-" +i).children().length == 0){
            $("#Earn-Amount-User-Carousel-" +i).parent().css({"display": "none"});
        }
        if($("#Earn-Amount-Event-Carousel-" +i).children().length == 0){
            $("#Earn-Amount-Event-Carousel-" +i).parent().css({"display": "none"});
        }
        if($("#Earn-Event-User-Carousel-" +i).children().length == 0){
            $("#Earn--Event-User-Carousel-" +i).parent().css({"display": "none"});
        }
    }
    for (let i = 0; i < earnContexts.length / '12'; i++){
        if (i >= count / '12'){
            $("#owl_carousel_earn_amount").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "none"});
            $("#owl_carousel_earn_user").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "none"});
            $("#owl_carousel_earn_event").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "none"});
            $("#owl_carousel_earn_amount_by_user").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "none"});
            $("#owl_carousel_earn_amount_by_event").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "none"});
            $("#owl_carousel_earn_event_by_user").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "none"});
        }
    }
}
function restoreEmptyDivSpend() {
    for (let i = 0; i <= spendContexts.length / '12'; i++){
        $("#Spend-Amount-Carousel-" +i).parent().css({"display": "inline"});
        $("#Spend-User-Carousel-" +i).parent().css({"display": "inline"});
        $("#Spend-Event-Carousel-" +i).parent().css({"display": "inline"});
        $("#Spend-Amount-User-Carousel-" +i).parent().css({"display": "inline"});
        $("#Spend-Amount-Event-Carousel-" +i).parent().css({"display": "inline"});
        $("#Spend-Event-User-Carousel-" +i).parent().css({"display": "inline"});
    }
    for (let i = 0; i < spendContexts.length / '12'; i++){
        $("#owl_carousel_spend_amount").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "inline"});
        $("#owl_carousel_spend_user").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "inline"});
        $("#owl_carousel_spend_event").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "inline"});
        $("#owl_carousel_spend_amount_by_user").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "inline"});
        $("#owl_carousel_spend_amount_by_event").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "inline"});
        $("#owl_carousel_spend_event_by_user").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "inline"});
    }

}
function restoreEmptyDivEarn() {
    for (let i = 0; i <= earnContexts.length / '12'; i++){
        $("#Earn-Amount-Carousel-" +i).parent().css({"display": "inline"});
        $("#Earn-User-Carousel-" +i).parent().css({"display": "inline"});
        $("#Earn-Event-Carousel-" +i).parent().css({"display": "inline"});
        $("#Earn-Amount-User-Carousel-" +i).parent().css({"display": "inline"});
        $("#Earn-Amount-Event-Carousel-" +i).parent().css({"display": "inline"});
        $("#Earn-Event-User-Carousel-" +i).parent().css({"display": "inline"});
    }
    for (let i = 0; i < earnContexts.length / '12'; i++){
        $("#owl_carousel_earn_amount").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "inline"});
        $("#owl_carousel_earn_user").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "inline"});
        $("#owl_carousel_earn_event").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "inline"});
        $("#owl_carousel_earn_amount_by_user").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "inline"});
        $("#owl_carousel_earn_amount_by_event").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "inline"});
        $("#owl_carousel_earn_event_by_user").children('div.owl-dots').children(`button:nth-child(${i+1})`).css({"display": "inline"});
    }

}

///reset spend context when remove filter
function reInitSpendContextLink(){
    for (let i = 0; i < spendContexts.length; i++){
        $('.'+spendContexts[i]+"-Spend").on('change', function() {
            boolSpend.length = 0
            for (let j = 0;j < spendContexts.length; j++){
                const tmp = []
                tmp.push($('.'+spendContexts[j]+'-Spend').is(':checked'))
                tmp.push(spendContexts[j])
                boolSpend.push(tmp)
            }
            updateSpendAmount(boolSpend);
            updateSpendUser(boolSpend);
            updateSpendEvent(boolSpend);
            updateSpendAmountByUser(boolSpend);
            updateSpendAmountByEvent(boolSpend);
            updateSpendEventByUser(boolSpend);
        });
    }
    for (let i = 0; i < spendContexts.length; i++){
        if (i != 0){
            $('.' + spendContexts[i]+'-Spend').prop("checked", true);
        }else{
            $('.' + spendContexts[i]+'-Spend').prop("disabled", false);
        }
        //link checkbox
        $("."+spendContexts[i]+"-Spend").click(function() {
            var x = this.checked;
            $("."+spendContexts[i]+"-Spend").prop("checked", x);
            updateBoolList(boolSpend, spendContexts[i], x)
            const index = checkLastOne(boolSpend, true)
            if (index.length == 1)
                $("."+spendContexts[[index[0]]]+"-Spend").prop("disabled", true)
            else
                clearSpendDisabled(spendContexts)
        });
    }
}
function reInitEarnContextLink(){
    for (let i = 0; i < earnContexts.length; i++){
        $('.'+earnContexts[i]+"-Earn").on('change', function() {
            boolEarn.length = 0
            for (let j = 0;j < earnContexts.length; j++){
                const tmp = []
                tmp.push($('.'+earnContexts[j]+'-Earn').is(':checked'))
                tmp.push(earnContexts[j])
                boolEarn.push(tmp)
            }
            updateEarnAmount(boolEarn);
            updateEarnUser(boolEarn);
            updateEarnEvent(boolEarn);
            updateEarnAmountByUser(boolEarn);
            updateEarnAmountByEvent(boolEarn);
            updateEarnEventByUser(boolEarn);
        });
    }
    for (let i = 0; i < earnContexts.length; i++){
        if (i != 0){
            $('.' + earnContexts[i]+'-Earn').prop("checked", true);
        }else{
            $('.' + earnContexts[i]+'-Earn').prop("disabled", false);
        }
        //link checkbox
        $("."+earnContexts[i]+"-Earn").click(function() {
            var x = this.checked;
            $("."+earnContexts[i]+"-Earn").prop("checked", x);
            updateBoolList(boolEarn, earnContexts[i], x)
            const index = checkLastOne(boolEarn, true)
            if (index.length == 1)
                $("."+earnContexts[[index[0]]]+"-Earn").prop("disabled", true)
            else
                clearEarnDisabled(earnContexts)
        });
    }
}

/// update new element in carousel
function emptyCarouselSpend(length){
    for (let i = 0; i <= length / '12'; i++){
        $("#Spend-Amount-Carousel-" +i).empty();
        $("#Spend-User-Carousel-" +i).empty();
        $("#Spend-Event-Carousel-" +i).empty();
        $("#Spend-Amount-User-Carousel-" +i).empty();
        $("#Spend-Amount-Event-Carousel-" +i).empty();
        $("#Spend-Event-User-Carousel-" +i).empty();
    }
}
function emptyCarouselEarn(length){
    for (let i = 0; i <= length / '12'; i++){
        $("#Earn-Amount-Carousel-" +i).empty();
        $("#Earn-User-Carousel-" +i).empty();
        $("#Earn-Event-Carousel-" +i).empty();
        $("#Earn-Amount-User-Carousel-" +i).empty();
        $("#Earn-Amount-Event-Carousel-" +i).empty();
        $("#Earn-Event-User-Carousel-" +i).empty();
    }
}
function updateElementCarouselSpend(newContextList){
    for (let l = 0; l < newContextList.length; l++){
        for (let i = 0; i < newContextList[l].List.length; i++){
            const color  = stringtoColor(newContextList[l].List[i])
            const context = newContextList[l].List[i] == "Top"?"Sum": newContextList[l].List[i]
            $("#Spend-Amount-Carousel-" +l.toString()).append(`<div class=\"d-inline-flex container-fluid\" id=\"${newContextList[l].List[i]}-Spend-Filter-Amount\">` +
                `<input type=\"checkbox\" id=\"${newContextList[l].List[i]}-Spend-Amount\" class=\"check mr-1 ${newContextList[l].List[i]}-Spend\" checked/>`+
                `<i class=\"fa fa-window-minimize mr-1\" style=\"color: ${color}\"></i>` + `${context}` +
                "</div>"
            )
            $("#Spend-User-Carousel-" +l.toString()).append(`<div class=\"d-inline-flex container-fluid\" id=\"${newContextList[l].List[i]}-Spend-Filter-User\">` +
                `<input type=\"checkbox\" id=\"${newContextList[l].List[i]}-Spend-User\" class=\"check mr-1 ${newContextList[l].List[i]}-Spend\" checked/>`+
                `<i class=\"fa fa-window-minimize mr-1\" style=\"color: ${color}\"></i>` + `${context}` +
                "</div>"
            )
            $("#Spend-Event-Carousel-" +l.toString()).append(`<div class=\"d-inline-flex container-fluid\" id=\"${newContextList[l].List[i]}-Spend-Filter-Event\">` +
                `<input type=\"checkbox\" id=\"${newContextList[l].List[i]}-Spend-Event\" class=\"check mr-1 ${newContextList[l].List[i]}-Spend\" checked/>`+
                `<i class=\"fa fa-window-minimize mr-1\" style=\"color: ${color}\"></i>` + `${context}` +
                "</div>"
            )
            $("#Spend-Amount-User-Carousel-" +l.toString()).append(`<div class=\"d-inline-flex container-fluid\" id=\"${newContextList[l].List[i]}-Spend-Filter-Amount-User\">` +
                `<input type=\"checkbox\" id=\"${newContextList[l].List[i]}-Spend-Amount-User\" class=\"check mr-1 ${newContextList[l].List[i]}-Spend\" checked/>`+
                `<i class=\"fa fa-window-minimize mr-1\" style=\"color: ${color}\"></i>` + `${context}` +
                "</div>"
            )
            $("#"+"Spend-Amount-Event-Carousel-" +l.toString()).append(`<div class=\"d-inline-flex container-fluid\" id=\"${newContextList[l].List[i]}-Spend-Filter-Amount-Event\">` +
                `<input type=\"checkbox\" id=\"${newContextList[l].List[i]}-Spend-Amount-Event\" class=\"check mr-1 ${newContextList[l].List[i]}-Spend\" checked/>`+
                `<i class=\"fa fa-window-minimize mr-1\" style=\"color: ${color}\"></i>` + `${context}` +
                "</div>"
            )
            $("#Spend-Event-User-Carousel-" + l.toString()).append(`<div class=\"d-inline-flex container-fluid\" id=\"${newContextList[l].List[i]}-Spend-Filter-Event-User\">` +
                `<input type=\"checkbox\" id=\"${newContextList[l].List[i]}-Spend-Event-User\" class=\"check mr-1 ${newContextList[l].List[i]}-Spend\" checked>`+
                `<i class=\"fa fa-window-minimize mr-1\" style=\"color: ${color}\"></i>` + `${context}` +
                "</div>"
            )
        }
    }
}
function updateElementCarouselEarn(newContextList){
    for (let l = 0; l < newContextList.length; l++){
        for (let i = 0; i < newContextList[l].List.length; i++){
            const color  = stringtoColor(newContextList[l].List[i])
            const context = newContextList[l].List[i] == "Top"?"Sum": newContextList[l].List[i]
            $("#Earn-Amount-Carousel-" +l.toString()).append(`<div class=\"d-inline-flex container-fluid\" id=\"${newContextList[l].List[i]}-Earn-Filter-Amount\">` +
                `<input type=\"checkbox\" id=\"${newContextList[l].List[i]}-Earn-Amount\" class=\"check mr-1 ${newContextList[l].List[i]}-Earn\" checked/>`+
                `<i class=\"fa fa-window-minimize mr-1\" style=\"color: ${color}\"></i>` + `${context}` +
                "</div>"
            )


            $("#Earn-User-Carousel-" +l.toString()).append(`<div class=\"d-inline-flex container-fluid\" id=\"${newContextList[l].List[i]}-Earn-Filter-User\">` +
                `<input type=\"checkbox\" id=\"${newContextList[l].List[i]}-Earn-User\" class=\"check mr-1 ${newContextList[l].List[i]}-Earn\" checked/>`+
                `<i class=\"fa fa-window-minimize mr-1\" style=\"color: ${color}\"></i>` + `${context}` +
                "</div>"
            )

            $("#Earn-Event-Carousel-" +l.toString()).append(`<div class=\"d-inline-flex container-fluid\" id=\"${newContextList[l].List[i]}-Earn-Filter-Event\">` +
                `<input type=\"checkbox\" id=\"${newContextList[l].List[i]}-Earn-Event\" class=\"check mr-1 ${newContextList[l].List[i]}-Earn\" checked/>`+
                `<i class=\"fa fa-window-minimize mr-1\" style=\"color: ${color}\"></i>` + `${context}` +
                "</div>"
            )
            //
            $("#Earn-Amount-User-Carousel-" +l.toString()).append(`<div class=\"d-inline-flex container-fluid\" id=\"${newContextList[l].List[i]}-Earn-Filter-Amount-User\">` +
                `<input type=\"checkbox\" id=\"${newContextList[l].List[i]}-Earn-Amount-User\" class=\"check mr-1 ${newContextList[l].List[i]}-Earn\" checked/>`+
                `<i class=\"fa fa-window-minimize mr-1\" style=\"color: ${color}\"></i>` + `${context}` +
                "</div>"
            )

            $("#"+"Earn-Amount-Event-Carousel-" +l.toString()).append(`<div class=\"d-inline-flex container-fluid\" id=\"${newContextList[l].List[i]}-Earn-Filter-Amount-Event\">` +
                `<input type=\"checkbox\" id=\"${newContextList[l].List[i]}-Earn-Amount-Event\" class=\"check mr-1 ${newContextList[l].List[i]}-Earn\" checked/>`+
                `<i class=\"fa fa-window-minimize mr-1\" style=\"color: ${color}\"></i>` + `${context}` +
                "</div>"
            )

            $("#Earn-Event-User-Carousel-" + l.toString()).append(`<div class=\"d-inline-flex container-fluid\" id=\"${newContextList[l].List[i]}-Earn-Filter-Event-User\">` +
                `<input type=\"checkbox\" id=\"${newContextList[l].List[i]}-Earn-Event-User\" class=\"check mr-1 ${newContextList[l].List[i]}-Earn\" checked/>`+
                `<i class=\"fa fa-window-minimize mr-1\" style=\"color: ${color}\"></i>` + `${context}` +
                "</div>"
            )
        }
    }
}

function changeFirstElementSpendContent(){
    $('#Top-Spend-Filter-Amount').html($('#Top-Spend-Filter-Amount').html().replace('Sum','Sum'));
    $('#Top-Spend-Filter-User').html($('#Top-Spend-Filter-User').html().replace('Sum','None'));
    $('#Top-Spend-Filter-Event').html($('#Top-Spend-Filter-Event').html().replace('Sum','None'));
    $('#Top-Spend-Filter-Amount-User').html($('#Top-Spend-Filter-Amount-User').html().replace('Sum','Average'));
    $('#Top-Spend-Filter-Amount-Event').html($('#Top-Spend-Filter-Amount-Event').html().replace('Sum','Average'));
    $('#Top-Spend-Filter-Event-User').html($('#Top-Spend-Filter-Event-User').html().replace('Sum','Average'));
}
function changeFirstElementEarnContent(){
    $('#Top-Earn-Filter-Amount').html($('#Top-Earn-Filter-Amount').html().replace('Sum','Sum'));
    $('#Top-Earn-Filter-User').html($('#Top-Earn-Filter-User').html().replace('Sum','None'));
    $('#Top-Earn-Filter-Event').html($('#Top-Earn-Filter-Event').html().replace('Sum','None'));
    $('#Top-Earn-Filter-Amount-User').html($('#Top-Earn-Filter-Amount-User').html().replace('Sum','Average'));
    $('#Top-Earn-Filter-Amount-Event').html($('#Top-Earn-Filter-Amount-Event').html().replace('Sum','Average'));
    $('#Top-Earn-Filter-Event-User').html($('#Top-Earn-Filter-Event-User').html().replace('Sum','Average'));

}
function carouselContext(data){
    const ans = []
    if (data.length > 12){
        let i = 0
        while (true){
            if (i >= data.length){
                break
            }
            else{
                const tmp = {}
                tmp.List = data.slice(i, i+12)
                ans.push(tmp)
                i+= 12
            }
        }
    }
    else{
        const tmp = {}
        tmp.List = data.slice(0, data.length)
        ans.push(tmp)
    }
    return ans
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

// start and end
function updateSpendCarouselContextWithValue(values){
    var options = []
    for (let i = 0; i < boolSpend.length; i++){
        if (boolSpend[i][0] == true){
            options.push(boolSpend[i][1])
        }
    }

    var filterSpendContexts = JSON.parse(JSON.stringify(spendContexts))
    emptyCarouselSpend(filterSpendContexts.length)

    let common = filterSpendContexts.filter(x => options.includes(x));
    const newContextList = carouselContext(common)
    updateElementCarouselSpend(newContextList)
    getRenewLinkSpendCheckbox(values)

}
function updateEarnCarouselContextWithValue(values){
    var options = []
    for (let i = 0; i < boolEarn.length; i++){
        if (boolEarn[i][0] == true){
            options.push(boolEarn[i][1])
        }
    }

    var filterEarnContexts = JSON.parse(JSON.stringify(earnContexts))
    emptyCarouselEarn(filterEarnContexts.length)

    let common = filterEarnContexts.filter(x => options.includes(x));
    const newContextList = carouselContext(common)
    updateElementCarouselEarn(newContextList)
    getRenewLinkEarnCheckbox(values)

}

//
function updateSpendCarouselContext(){
    var options = document.getElementById('filterSpend').selectedOptions;
    var values = Array.from(options).map(({ value }) => value);
    var filterSpendContexts = JSON.parse(JSON.stringify(spendContexts))
    emptyCarouselSpend(filterSpendContexts.length)

    let common = filterSpendContexts.filter(x => values.includes(x));
    const newContextList = carouselContext(common)
    updateElementCarouselSpend(newContextList)
    getRenewLinkSpendCheckbox(values)

}
function updateEarnCarouselContext(){
    var options = document.getElementById('filterEarn').selectedOptions;
    var values = Array.from(options).map(({ value }) => value);
    var filterEarnContexts = JSON.parse(JSON.stringify(earnContexts))
    emptyCarouselEarn(filterEarnContexts.length)

    let common = filterEarnContexts.filter(x => values.includes(x));
    const newContextList = carouselContext(common)
    updateElementCarouselEarn(newContextList)
    getRenewLinkEarnCheckbox(values)
}

function getRenewLinkSpendCheckbox(values){
    boolSpend.length = 0
    for (let i = 0; i < spendContexts.length; i++){
        const tmp = []
        if(values.includes(spendContexts[i]) == true){
            tmp.push(true)
        }else {
            tmp.push(false)
        }
        tmp.push(spendContexts[i])
        boolSpend.push(tmp)
    }

    for (let i = 0; i < spendContexts.length; i++){
        $('.'+spendContexts[i]+"-Spend").on('change', function() {
            boolSpend.length = 0
            for (let j = 0;j < spendContexts.length; j++){
                const tmp = []
                tmp.push($('.'+spendContexts[j]+'-Spend').is(':checked'))
                tmp.push(spendContexts[j])
                boolSpend.push(tmp)
            }
            updateSpendAmount(boolSpend);
            updateSpendUser(boolSpend);
            updateSpendEvent(boolSpend);
            updateSpendAmountByUser(boolSpend);
            updateSpendAmountByEvent(boolSpend);
            updateSpendEventByUser(boolSpend);
        });
    }
    for (let i = 0; i < spendContexts.length; i++){
        //link checkbox
        $("."+spendContexts[i]+"-Spend").click(function() {
            var x = this.checked;
            $("."+spendContexts[i]+"-Spend").prop("checked", x);
            updateBoolList(boolSpend, spendContexts[i], x)
            const index = checkLastOne(boolSpend, true)
            if (index.length == 1)
                $("."+spendContexts[[index[0]]]+"-Spend").prop("disabled", true)
            else
                clearSpendDisabled(spendContexts)
        });
    }
}
function getRenewLinkEarnCheckbox(values){
    boolEarn.length = 0
    for (let i = 0; i < earnContexts.length; i++){
        const tmp = []
        if(values.includes(earnContexts[i]) == true){
            tmp.push(true)
        }else {
            tmp.push(false)
        }
        tmp.push(earnContexts[i])
        boolEarn.push(tmp)
    }
    for (let i = 0; i < earnContexts.length; i++){
        $('.'+earnContexts[i]+"-Earn").on('change', function() {
            boolEarn.length = 0
            for (let j = 0;j < earnContexts.length; j++){
                const tmp = []
                tmp.push($('.'+earnContexts[j]+'-Earn').is(':checked'))
                tmp.push(earnContexts[j])
                boolEarn.push(tmp)
            }
            updateEarnAmount(boolEarn);
            updateEarnUser(boolEarn);
            updateEarnEvent(boolEarn);
            updateEarnAmountByUser(boolEarn);
            updateEarnAmountByEvent(boolEarn);
            updateEarnEventByUser(boolEarn);
        });
    }
    for (let i = 0; i < earnContexts.length; i++){
        $("."+earnContexts[i]+"-Earn").click(function() {
            var x = this.checked;
            $("."+earnContexts[i]+"-Earn").prop("checked", x);
            updateBoolList(boolEarn, earnContexts[i], x)
            const index = checkLastOne(boolEarn, true)
            if (index.length == 1 )
                $("."+earnContexts[[index[0]]]+"-Earn").prop("disabled", true)
            else
                clearEarnDisabled(earnContexts)
        });
    }
}





