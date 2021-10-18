
var savedTasks = [];
var tempArray = [];

$("#currentDay").html(moment().format("dddd, MMMM Do YYYY"));

let colorBG = function(){
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
}

$(".row").on("click", "div", function() {

    var textId = $(this).attr("id");
    var text = $(this)
      .text()
      .trim();
  
    var textInput = $("<textarea>")
      .addClass("tasks col-10 border")
      .attr("id",textId)
      .val(text);

    $(this).replaceWith(textInput);
    textInput.trigger("focus");

    colorBG();

});
  

$(".save").on("click", function() {
    
    var textId = $(this).siblings(".tasks").attr("id");
    var tagId = $(this).siblings(".tasks").prop("tagName");

    if (tagId === "TEXTAREA") {

        var text = $(this).siblings(".tasks")
        .val()
        .trim();

        var taskP = $("<div>")
        .attr("id",textId)
        .addClass("tasks col-10 border")
        .text(text);

        $(this).siblings(".tasks").replaceWith(taskP);

        saveTasks(textId);
        colorBG();
    }

});

let loadTasks = function(){

    loadArray();
 
    $.each(savedTasks, function(index, value) {

        $(value[0]).text(value[1]);
        });

}

let loadArray = function(){
    savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (!savedTasks) {
        savedTasks = [];

        $('.tasks').each(function() {
            tempId = "#"+$(this).attr("id");
            tempArray = [tempId,""];
            savedTasks.push(tempArray);  
        });

        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    };
}

let saveTasks = function(taskId) {

    taskId = "#"+taskId;
    var indexVal = -1;
    tempArray = [taskId,$(taskId).text()];
    $.each(savedTasks, function(index, value){
        if (value[0] === taskId) {
           indexVal = index;    
        } 
    });

    if (indexVal > -1){
        savedTasks.splice(indexVal,1);
    }

    savedTasks.push(tempArray);

    localStorage.setItem("tasks", JSON.stringify(savedTasks));
 

}

loadTasks();
colorBG();
