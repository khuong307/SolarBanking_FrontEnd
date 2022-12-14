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
        $('#statusMultiModal').on('show.bs.modal', function (e) {
            var anim = "bounceInUp"
            testAnim(anim);
        })
        $('#statusMultiModal').on('hide.bs.modal', function (e) {
            var anim = "slideOutRight"
            testAnim(anim);
        })
        $('#invalidModal').on('show.bs.modal', function (e) {
            var anim = "shake"
            testAnim(anim);
        })
        $('#invalidModal').on('hide.bs.modal', function (e) {
            var anim = "tada"
            testAnim(anim);
        })

        $('#addMultiModal').on('show.bs.modal', function (e) {
            var anim = "slideInUp"
            testAnim(anim);
        })
        $('#addMultiModal').on('hide.bs.modal', function (e) {
            var anim = "slideOutRight"
            testAnim(anim);
        })
        $('#statusMultiModal').on('show.bs.modal', function (e) {
            var anim = "slideInUp"
            testAnim(anim);
        })
        $('#statusMultiModal').on('hide.bs.modal', function (e) {
            var anim = "slideOutRight"
            testAnim(anim);
        })

        $("a").tooltip();
    }
};
jQuery(document).ready(function() {
    modal_animate_custom.init()
});