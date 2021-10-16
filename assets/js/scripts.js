
$("#currentDay").html(moment().format());

$('.tasks').each(function() {

    currentHour = moment().format("HH");
    
    if ($(this).attr("id") === currentHour) {
        $(this).css('background-color', 'red');
    }
    else if ($(this).attr("id") < moment().format("HH")) {
        $(this).css('background-color', 'gray');
    }
    else {
        $(this).css('background-color', 'green');
    }
});
