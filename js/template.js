$(document).ready(function () {
    drawTemplate();
    $(".button-collapse").sideNav();
    var calendar = $("#calendar").fullCalendar({
        contentHeight: 300
    });

    getEvents().done(function (json) {
        localStorage.setItem("events", JSON.stringify(json));
        populateCal(json);
    });
});

function getEvents() {
    return $.ajax({
        url: "json/event.json",
        type: "GET",
        dataType: "json"
    })
        .always(function () {
        })
        .fail(function () {
            var events = JSON.parse(localStorage.getItem("events"));
            if (events != null) {
                populateCal(events);
            }
            else {
                errorAlert();
            }
        });
}

function errorAlert() {
    alert("Error occurred. Please check your network connection and refresh the page.");
}

function drawTemplate() {
    $("nav").append("<div class='nav-wrapper blue lighten-1'>" +
        "<div class='container'>" +
        "<a class='brand-logo center' href='index.html'>CARP Connect</a>" +
        "<a data-activates='side-nav' class='button-collapse'><i class='mdi-navigation-menu'></i></a>" +
        "<ul class='side-nav fixed' id='side-nav'>" +
        "<li class='logo'>" +
        "<a id='logo-container' href='index.html'>" +
        "<img id='front-page-logo' src='images/logo.png' class='responsive-img'>" +
        "</a>" +
        "</li>" +
        "<li class='clearfix'></li>" +
        "<li class='active href-disabled'><a href='index.html'>Home</a></li>" +
        "<li><a href='account.html'>Account Management</a></li>" +
        "<li><a href='calendar.html'>Calendar</a></li>" +
        "<li class='divider'></li>" +
        "<li><a href='createevent.html'>Create New Event</a></li>" +
        "<li><a href='pastevents.html'>View Past Events</a></li>" +
        "<li><a href='reports.html'>View Reports</a></li>" +
        "<li class='divider'></li>" +
        "<li><a href='login.html'>Log Out</a></li>" +
        "</ul>" +
        "</div>" +
        "</div>");
}

function populateCal(result) {

    event = result.event;
    var string = "";


    var calendar = $('#calendar').fullCalendar();
    var events = new Array();

    //adding events
    for (i = 0; result.event.length > i; i++) {
        var date = new Date(result.event[i].dateTime);
        var title = result.event[i].name;
        var eventUrl = "workevent.html?eventId=" + result.event[i].id;

        list = new Object();
        list.title = title; // this should be string
        list.start = date; // this should be date object
        list.url = eventUrl;
        list.color = "#99CCFF";
        list.allDay = false;
        events.push(list);

        //adding tasks
        for (ii = 0; result.event[i].tasks.length > ii; ii++) {
            var date1 = new Date(result.event[i].tasks[ii].dateTime);
            var title1 = result.event[i].tasks[ii].name;
            var taskUrl = "worktask.html?eventId=" + result.event[i].id + "&taskId=" + result.event[i].tasks[ii].taskId;

            list1 = new Object();
            list1.title = title1; // this should be string
            list1.start = date1; // this should be date object
            list1.url = taskUrl;
            list1.allDay = false;
            events.push(list1);
        }
    }
    calendar.fullCalendar('addEventSource', events);
    $('#calendar').fullCalendar('rerenderEvents');

}