class Card {
  imageEl = null;
  currentId = null;
  constructor(selectedEl) {
    this.imageEl = selectedEl.children()[1];
    this.currentId = selectedEl.attr("id");
  }

  checkIsBlank() {
    return $(this.imageEl).parent().attr("ismatched");
  }
  isMatched(secondCard) {
    if (this.currentId == secondCard.currentId) {
      $(this.imageEl).parent().attr("ismatched", true);
      $(secondCard.imageEl).parent().attr("ismatched", true);
      return true;
    }
    return false;
  }
}
