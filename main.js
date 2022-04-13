const selection = {
  firstCard: null,
  secondCard: null,
};

const resetSelection = () => {
  selection.firstCard = null;
  selection.secondCard = null;
};

const onImgClickHandler = function (e) {
  if (
    $(e.target).hasClass("flip-box-inner") &&
    (!selection.firstCard || !selection.secondCard)
  ) {
    if (selection.firstCard && !$(e.target).parent().hasClass("clicked")) {
      selection.secondCard = new Card($(e.target));
      if (!selection.secondCard.checkIsBlank()) {
        cards.toggleCard($(e.target).parent());
      }
      if (selection.firstCard.isMatched(selection.secondCard)) {
        setTimeout(() => {
          scores.updateTotalClicks();
          scores.updateCorrectClicks();
          cards.fadeOutCard($(selection.firstCard.imageEl).parent());
          cards.fadeOutCard($(selection.secondCard.imageEl).parent());
          resetSelection();
          if (scores.correctMatch == cards.suffledCard.length / 2) {
            $("#high_score").html(`High score : ${scores.highScore}%`);
          }
          $("#correct").html(`Score : ${scores.checkAndGetScore()}%`);
        }, 500);
      } else {
        setTimeout(() => {
          scores.updateTotalClicks();
          cards.toggleCard(
            $(selection.firstCard.imageEl).parent().parent(),
            true
          );
          cards.toggleCard(
            $(selection.secondCard.imageEl).parent().parent(),
            true
          );
          resetSelection();
        }, 500);
      }
    } else {
      selection.firstCard = new Card($(e.target));
      if (!selection.firstCard.checkIsBlank()) {
        cards.toggleCard($(e.target).parent());
      }
    }
  }
};

const onSaveSettingClickHandler = () => {
  let currentSetting = settings.val;
  if ($("#player_name").val() != currentSetting.playerName) {
    scores.removeHighScore();
  }
  settings.val = {
    name: $("#player_name").val(),
    totalCards: $("#num_cards").val(),
  };

  window.location = "./index.html";
};

$(document).ready(() => {
  $("#tabs").tabs();
  let currentSetting = settings.val;
  if (currentSetting.playerName && currentSetting.totalCards) {
    $("#player_name").val(currentSetting.playerName);
    $("#num_cards").val(currentSetting.totalCards);
  } else {
    settings.val = {
      name: $("#player_name").val(),
      totalCards: $("#num_cards").val(),
    };
    currentSetting = settings.val;
  }

  if (currentSetting.playerName) {
    if (scores.highScore) {
      $("#high_score").html(`High score : ${scores.highScore}%`);
    }
    $("#player").html(`Player : ${currentSetting.playerName}`);
  }
  $("#cards").html(cards.generateCards(currentSetting.totalCards));
  $("#cards").click(onImgClickHandler);
  $("#save_settings").click(onSaveSettingClickHandler);
});
