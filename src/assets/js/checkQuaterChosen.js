$('#pickQuaterForm').on('submit', function(e){
    e.preventDefault()
    var year = document.getElementById("yearQuater").value
    if(year.length == 0){
        alert('Please pick a year');
        return;
    }
    else{
        $('#pickQuaterForm').off('submit').submit()
    }
})