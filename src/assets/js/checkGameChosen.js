$('#insertForm').on('submit', function(e){
    e.preventDefault()
    var gameChosen = document.getElementById("GameSelect").value
    var DateChosen = document.getElementById("DateChosen").value
    var Des = document.getElementById("Description").value
    var Value = document.getElementById("Value").value
    if(gameChosen == "Select Game"){
        alert('Please choose a game');
        return;
    }
    if (DateChosen.length == 0){
        alert('Please enter all information');
        return;
    }
    if (Des.length == 0){
        alert('Please enter all information');
        return;
    }
    if (Value.length == 0){
        alert('Please enter all information');
        return;
    }
    else{
        $('#insertForm').off('submit').submit()
    }
})

$('#insertFormMonths').on('submit', function(e){
    e.preventDefault()
    var gameChosen = document.getElementById("GameSelectMonths").value
    var MonthChosen = document.getElementById("datepickerMonthsCost").value
    var Des = document.getElementById("DescriptionMonths").value
    var Value = document.getElementById("ValueMonths").value
    if(gameChosen == "Select Game"){
        alert('Please choose a game');
        return;
    }
    if (MonthChosen.length == 0){
        alert('Please enter all information');
        return;
    }
    if (Des.length == 0){
        alert('Please enter all information');
        return;
    }
    if (Value.length == 0){
        alert('Please enter all information');
        return;
    }
    else{
        $('#insertFormMonths').off('submit').submit()
    }
})