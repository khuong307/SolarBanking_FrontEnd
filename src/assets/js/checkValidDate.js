$('#datePickerForm').on('submit', function(e){
    e.preventDefault()
    const _start = $('#StartDateEconomy').val()
    const _end = $('#EndDateEconomy').val()


    if (_start.length == 0 || _end.length == 0){
        alert('Please choose dates!');
        return;
    }

    if(new Date(_start) > new Date(_end)){
        alert('Please choose a valid end date!');
        return;
    }
    else{
        $('#datePickerForm').off('submit').submit()
    }
})