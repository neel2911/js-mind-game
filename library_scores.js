const scores = (() => {
  let totalClick = 0;
  let correctSelectionClick = 0;

  const setHighScore = (score) => {
    localStorage.setItem("high_score", score);
  };
  return {
    get correctMatch() {
      return correctSelectionClick;
    },
    get highScore() {
      return localStorage.getItem("high_score");
    },
    updateTotalClicks: () => {
      totalClick += 1;
    },
    updateCorrectClicks: () => {
      correctSelectionClick += 1;
    },
    checkAndGetScore: function () {
      const score = parseInt((correctSelectionClick * 100) / totalClick);
      if (score > this.highScore) {
        setHighScore(score);
      }
      return score;
    },
    removeHighScore: () => {
      return localStorage.removeItem("high_score");
    },
  };
})();
