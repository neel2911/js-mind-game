const cards = (() => {
  const grid = {
    8: [1, 8],
    16: [2, 8],
    24: [3, 8],
    32: [4, 8],
    40: [5, 8],
    48: [6, 8],
  };

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

  let imagesEl = "Please enter add your name from the setting tab";

  let suffledCard = [];

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

  const generateSuffledCards = (settingTotalCards) => {
    suffledCard = prepareRandomCards(
      images.cards.slice(0, settingTotalCards / 2)
    );
  };

  return {
    get backCard() {
      return images.backCard;
    },
    get blankCard() {
      return images.blankCard;
    },
    get suffledCard() {
      return suffledCard;
    },
    generateCards: function (settingTotalCards) {
      generateSuffledCards(settingTotalCards);
      imagesEl = "";
      let ids = 0;
      for (let i = 0; i < grid[settingTotalCards][0]; i++) {
        imagesEl += "<div>";
        for (let j = 0; j < grid[settingTotalCards][1]; j++) {
          const imgUrl = generateImageUrl(images.backCard);
          imagesEl += `<div class="flip-box"><a class="flip-box-inner" id="${
            suffledCard[ids].split(".")[0]
          }" href="#">
            <img class="flip-box-front" id="img_front_${ids}" cardid="${
            suffledCard[ids].split(".")[0]
          }" class="card" src="${imgUrl}" alt="card" />
            <img class="flip-box-back" id="img_back_${ids}" class="card" src="${generateImageUrl(
            suffledCard[ids]
          )}" alt="card" />
        </a></div>`;
          ids++;
        }
        imagesEl += "</div>";
      }
      return imagesEl;
    },
    toggleCard: (card, isReset = false) => {
      if (isReset) {
        $(card).removeClass("clicked");
      } else {
        $(card).addClass("clicked");
      }
    },
    fadeOutCard: (card) => {
      $(card).fadeOut();
    },
  };
})();
