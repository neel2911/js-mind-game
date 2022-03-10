const grid = {
  8: [1, 8],
  16: [2, 8],
  24: [3, 8],
  32: [4, 8],
  40: [5, 8],
  48: [6, 8],
};

let suffledCard = [];

const images = {
  cards: [
    "card_1.png",
    "card_2.png",
    "card_3.png",
    "card_4.png",
    "card_5.png",
    "card_6.png",
    "card_7.png",
    "card_8.png",
    "card_9.png",
    "card_10.png",
    "card_11.png",
    "card_12.png",
    "card_13.png",
    "card_14.png",
    "card_15.png",
    "card_16.png",
    "card_17.png",
    "card_18.png",
    "card_19.png",
    "card_20.png",
    "card_21.png",
    "card_22.png",
    "card_23.png",
    "card_24.png",
  ],
  blankCard: "blank.png",
  backCard: "back.png",
};

const match = {
  firstSelection: {
    originalId: "",
    selectedId: "",
  },
  secondSelection: {
    originalId: "",
    selectedId: "",
  },
  totalClick: 0,
  correctSelectionClick: 0,
};

const currentSetting = {};

const prepareRandomCards = (cards) => {
  const tempSet1 = [...cards];
  const tempSet2 = [...cards];
  let noOfSuffles = tempSet1.length;
  noOfSuffles = Math.ceil(Math.random() * (noOfSuffles - 1 + 1) + 1);
  for (let i = 0; i < noOfSuffles; i++) {
    const removedValue = tempSet1.pop();
    tempSet1.unshift(removedValue);
  }
  noOfSuffles = Math.ceil(Math.random() * (noOfSuffles - 1 + 1) + 1);
  for (let i = 0; i < noOfSuffles; i++) {
    const removedValue = tempSet2.shift();
    tempSet2.push(removedValue);
  }
  return [...tempSet1, ...tempSet2];
};

const generateImageUrl = (fileName) => {
  return `images/${fileName}`;
};

const toggleCard = (card, changeTo, isMatched = false) => {
  $(card).fadeOut(function () {
    $(this)
      .attr("src", `${generateImageUrl(changeTo)}`)
      .attr("ismatched", isMatched)
      .fadeIn();
  });
};

const resetSelection = () => {
  match.firstSelection.originalId = "";
  match.firstSelection.selectedId = "";
  match.secondSelection.originalId = "";
  match.secondSelection.selectedId = "";
};

const onImgClickHandler = function (e) {
  const card = e.target;
  console.log(match.firstSelection);
  console.log(match.secondSelection);
  if (
    card.classList.contains("card") &&
    ["false", null].includes(card.getAttribute("ismatched")) &&
    (match.firstSelection.selectedId == "" ||
      match.secondSelection.selectedId == "")
  ) {
    if (!match.firstSelection.originalId) {
      match.firstSelection.originalId = card.id;
      match.firstSelection.selectedId = card.getAttribute("cardid");
      toggleCard(card, suffledCard[card.id.split("_")[1]]);
    } else {
      if (match.firstSelection.originalId != card.id) {
        if (!match.secondSelection.originalId) {
          match.secondSelection.originalId = card.id;
          match.secondSelection.selectedId = card.getAttribute("cardid");
          toggleCard(card, suffledCard[card.id.split("_")[1]]);
        }
        setTimeout(() => {
          if (
            match.firstSelection.selectedId == match.secondSelection.selectedId
          ) {
            match.totalClick += 1;
            match.correctSelectionClick += 1;
            toggleCard(
              `#${match.firstSelection.originalId}`,
              images.blankCard,
              true
            );
            toggleCard(
              `#${match.secondSelection.originalId}`,
              images.blankCard,
              true
            );
            resetSelection();
            if (match.correctSelectionClick == suffledCard.length / 2) {
              const score = parseInt(
                (match.correctSelectionClick * 100) / match.totalClick
              );
              if (score > localStorage.getItem("high_score")) {
                localStorage.setItem("high_score", score);
                $("#high_score").html(`High score : ${score}%`);
              }
              $("#correct").html(`Score : ${score}%`);
            }
          } else {
            match.totalClick += 1;
            toggleCard(`#${match.firstSelection.originalId}`, images.backCard);
            toggleCard(`#${match.secondSelection.originalId}`, images.backCard);
            resetSelection();
          }
        }, 1000);
      }
    }
  }
};

const onSaveSettingClickHandler = () => {
  currentSetting.playerName = $("#player_name").val();
  currentSetting.totalCards = $("#num_cards").val();
  if (
    localStorage.getItem("playerName").toLowerCase() !=
    currentSetting.playerName.toLowerCase()
  ) {
    localStorage.removeItem("high_score");
  }
  localStorage.setItem("playerName", currentSetting.playerName);
  localStorage.setItem("totalCards", currentSetting.totalCards);
  window.location = "/";
};

$(document).ready(() => {
  $("#tabs").tabs();

  if (localStorage.getItem("playerName")) {
    currentSetting.playerName = localStorage.getItem("playerName");
    $("#player_name").val(localStorage.getItem("playerName"));
  } else {
    currentSetting.playerName = $("#player_name").val();
  }

  if (localStorage.getItem("totalCards")) {
    currentSetting.totalCards = localStorage.getItem("totalCards");
    $("#num_cards").val(currentSetting.totalCards);
  } else {
    currentSetting.totalCards = $("#num_cards").val();
  }

  currentSetting.totalCards = $("#num_cards").val();
  suffledCard = prepareRandomCards(
    images.cards.slice(0, currentSetting.totalCards / 2)
  );
  const currentArrangement = grid[currentSetting.totalCards];
  let imagesEl = "Please enter add your name from the setting tab";
  if (currentSetting.playerName) {
    if (localStorage.getItem("high_score")) {
      $("#high_score").html(
        `High score : ${localStorage.getItem("high_score")}%`
      );
    }
    $("#player").html(`Player : ${currentSetting.playerName}`);
    imagesEl = "";
    for (let i = 0; i < currentArrangement[0]; i++) {
      for (let j = 0; j < currentArrangement[1]; j++) {
        const imgUrl = generateImageUrl(images.backCard);
        imagesEl += `<a href="#" id=${imgUrl}><img id="img_${i + j}" cardid="${
          suffledCard[i + j].split(".")[0]
        }" class="card" src="${imgUrl}" alt="card" /></a>`;
      }
    }
  }
  $("#cards").html(imagesEl);
  $("#cards").click(onImgClickHandler);
  $("#save_settings").click(onSaveSettingClickHandler);
});
