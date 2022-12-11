"use strict";
function testAnim(x) {
    $('.modal .modal-dialog').attr('class', 'modal-dialog  ' + x + '  animated');
};
var modal_animate_custom = {
    init: function() {
        $('#successModal').on('show.bs.modal', function (e) {
            var anim = "bounceInUp"
            testAnim(anim);
        })
        $('#successModal').on('hide.bs.modal', function (e) {
            var anim = "slideOutRight"
            testAnim(anim);
        })
        $("a").tooltip();
    }
};
jQuery(document).ready(function() {
    modal_animate_custom.init()
});