'use strict';

var body = $('body'),
    iMessageIndicator = $('.imessage-indicator'),
    replayButton = $('#replay'),
    message1 = $("#message1"),
    message2WithLoader = $("#message2"),
    message3 = $("#message3"),
    message4WithLoader = $("#message4");

var animationSpeed = .35;
var onMessageLoadHandler = function onMessageLoadHandler() {
  var message = this._targets[0];
  setTimeout(function () {
    $(message).removeClass('loading');
  }, 1500);
};

var fadeInUpAnimation = { opacity: 1, transform: "translateY(0px)" };
var fadeInUpAnimationWithCallback = { opacity: 1, transform: "translateY(0px)", onComplete: onMessageLoadHandler };

var iMessageConversation = new TimelineLite();

// Inject SVGs
SVGInjector(iMessageIndicator);

// iMessage Animation. Sorry for the magic numbers, mom.
iMessageConversation.to(message1, animationSpeed, fadeInUpAnimation, "+=1.0");
iMessageConversation.to(message2WithLoader, animationSpeed, fadeInUpAnimationWithCallback, "+=1.0");
iMessageConversation.to(message3, animationSpeed, fadeInUpAnimation, "+=2.5");
iMessageConversation.to(message4WithLoader, animationSpeed, fadeInUpAnimationWithCallback, "+=1.25");

var replayConversation = function replayConversation() {
  message2WithLoader.addClass('loading');
  message4WithLoader.addClass('loading');
  iMessageConversation.restart();
};

replayButton.on('click', replayConversation);