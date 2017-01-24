var buttons = $('.section button');
var buttonsWithGo = buttons.filter("button[go]");
var buttonsWithoutGo = buttons.filter("button:not(button[go])");
var status = $("#status");
var currentSection = $(".section").first();
var minNumberOfWordsForDescription = 300;
var falsePseudo;
var pseudo;
var checkPoint = "wakeUp";
