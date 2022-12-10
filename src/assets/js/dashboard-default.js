"use strict";

var dashboard_default = {
    init: function() {
        // $("#custom-line-chart").sparkline([24, 27, 8, 18, 12, 8, 40, 33, 37, 25, 22, 18, 25, 2, 4, 15, 10, 11, 15, 14, 6, 8, 6, 8, 30, 25], {
        //     type: 'line',
        //     width: '100%',
        //     height: '100%',
        //     tooltipClassname: 'chart-sparkline',
        //     chartRangeMax: '50',
        //     lineColor: 'rgba(56,  211, 231, 0.5)',
        //     fillColor: 'rgba(56,  211, 231, 0.6)',
        //     highlightLineColor: 'rgba(56,  211, 231, 0.5)',
        //     highlightSpotColor: 'rgba(56,  211, 231, 0.8)'
        // });
        var test=$("#testimonial");
        test.owlCarousel({
            items :1,
            margin:30,
            loop : true,
            pagination:false,
            navigationText:false,
            nav: false
        });var testimonial=$("#testimonial1");
        testimonial.owlCarousel({
            rtl:true,
            items :1,
            margin:30,
            loop : true,
            pagination:false,
            navigationText:false,
            nav: false,
            responsive: {
                0: {
                    items: 1
                }
            }
        });
    }
};

jQuery(document).ready(function() {
    dashboard_default.init()
});