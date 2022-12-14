"use strict";
$(document).ready(function(){
    $("#successList").DataTable( {
        rowReorder: true,
        order: [[ 0, 'desc' ]],
        searching: false,
        info: false,
        paging: false,
    } );
    $("#failList").DataTable( {
        rowReorder: true,
        order: [[ 0, 'desc' ]],
        searching: false,
        info: false,
        paging: false,
    } );
});


