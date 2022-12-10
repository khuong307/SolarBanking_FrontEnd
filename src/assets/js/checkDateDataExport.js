$('#pickDateForm').on('submit', function(e){
    e.preventDefault()
    const _start = $('#StartDate').val()
    const _end = $('#EndDate').val()

    if(new Date(_start) > new Date(_end)){
        alert('Please choose a valid end date!');
        return;
    }
    else{
        $('#pickDateForm').off('submit').submit()
    }
})