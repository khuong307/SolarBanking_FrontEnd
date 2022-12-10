"use strict";
$(document).ready(function(){
//Minimum and Maxium Date
//     $('#DateChosen').datepicker({
//         language: 'en',
//         maxDate: new Date() // Now can select only dates, which goes after today
//     })
//

//Disable Days of week
    var disabledDays = [0, 6];

    $('#disabled-days').datepicker({
        language: 'en',
        onRenderCell: function (date, cellType) {
            if (cellType == 'day') {
                var day = date.getDay(),
                    isDisabled = disabledDays.indexOf(day) != -1;
                return {
                    disabled: isDisabled
                }
            }
        }
    })
});