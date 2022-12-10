$('#ExportInfo').on('submit', function(e){
    e.preventDefault()
    var StartDate = document.getElementById("StartDate").value
    var EndDate = document.getElementById("EndDate").value
    if (StartDate.length == 0){
        alert('Please choose StartDate');
        return;
    }
    if (EndDate.length == 0){
        alert('Please choose EndDate');
        return;
    }
    if(new Date(StartDate) > new Date(EndDate)){
        alert('Please choose a valid EndDate!');
        return;
    }
    else{
        $('#ExportInfo').off('submit').submit()
    }
})