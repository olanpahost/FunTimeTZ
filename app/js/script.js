
$(document).ready(function(){
    $(window).on('load', function () {
        let $preloader = $('#preloading');
        let $header = $("#header");
        $preloader.slideUp('slow');
        $header.delay(1000).slideDown();

    });
    //анімацiя на старті
    let $h1 = $(".h1");
    let $h3 = $(".h3");
    let $button = $(".button-details");
    let $form = $(".main__pannel");
    let $deco = $(".main__decor");
    let marg = '75px';
    let timeDelay = 1500;
    let timeDelta = 500;
    $h1.delay(timeDelay).show()
        .css( {'opacity': 0, 'marginTop': '300px' } )
        .animate( { 'opacity': '1', 'marginTop' : '160px' }, 1000 );
    $h3.delay(timeDelay + timeDelta).show()
        .css( {'opacity': 0, 'marginTop': marg } )
        .animate( { 'opacity': '1', 'marginTop' : '37px' }, 1000 );
    $deco.delay(timeDelay + timeDelta*2).show()
        .css( {'opacity': 0, 'marginTop': marg } )
        .animate( { 'opacity': '1', 'marginTop' : '37px' }, 1000 );
    $button.delay(timeDelay + timeDelta*3).show()
        .css( {'opacity': 0, 'marginTop': marg } )
        .animate( { 'opacity': '1', 'marginTop' : '37px' }, 1000 );
    $form.delay(timeDelay + timeDelta*4).show()
        .css( {'opacity': 0, 'marginTop': marg } )
        .animate( { 'opacity': '1', 'marginTop' : '37px' }, 1000 );
    $('.footer').delay(timeDelay+ timeDelta*5).find('i.fas').addClass('animate');
    //підключення подвійного range бігунка
        $( "#slider-range" ).slider({
            range: true,
            min:0,
            max: 300,
            values: [10, 180],
            slide: function( event, ui ) {
                    $( "#rangeDigital" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
                }
            });
            $( "#rangeDigital" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " M - $" + $( "#slider-range" ).slider( "values", 1 )+"+M" );
})
