$(() => {
    $('.load-background').hide();
    $('#close-menu-bottom').on('click', function(){
        closeMenuBottom();
    });
    $('#close-menu-top').on('click', function(){
        closeMenuTop();
    });
    $('.load-background').on('click', function(){
        closeMenuBottom();
        closeMenuTop();
    });

    $('.iconcatagory').on('click', function(){
        showMenuTop();
    });

    $('#mobile-menu-icon').on('click', function(){
        showMenuBottom();
    });
});

function closeMenuBottom(){
    $('#cssmenu-bottom').removeClass('active');
    $('.load-background').removeClass('show');
    $('.close-menu').removeClass('show')

}

function showMenuBottom(){
    $('#cssmenu-bottom').addClass('active');
    $('.load-background').addClass('show');
    $('#close-menu-bottom').addClass('show');
}

function showMenuTop(){
    $('.load-background').addClass('show');
    $('#cssmenu').addClass('active');
    $('#close-menu-top').addClass('show');
}


function closeMenuTop(){
    $('#cssmenu').removeClass('active');
    $('.load-background').removeClass('show');
    $('.close-menu').removeClass('show')

}