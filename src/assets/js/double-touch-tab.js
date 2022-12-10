$(function() {
    var ge_earn_tab = 0
    var ge_spend_tab = 0
    var ge_flow_tab = 0

    $("#spend").click(function() {
        redrawSpendChart()
        if (ge_spend_tab == 1)
            return
        setTimeout(delaySpendTab, 200)
    });
    function delaySpendTab(){
        ge_flow_tab = 0
        ge_earn_tab = 0
        ge_spend_tab = 1
        $("#spend").click();
    };

    $("#earn").click(function() {
        redrawEarnChart()
        if (ge_earn_tab == 1)
            return
        setTimeout(delayEarnTab, 200)
    });
    function delayEarnTab(){
        ge_earn_tab = 1
        ge_flow_tab = 0
        ge_spend_tab = 0
        $("#earn").click();
    };



    $("#flow").click(function() {
        if (ge_flow_tab == 1)
            return
        setTimeout(delayFlowTab, 200)
    });
    function delayFlowTab(){
        ge_flow_tab = 1
        ge_earn_tab = 0
        ge_spend_tab = 0
        $("#flow").click();
    };
});