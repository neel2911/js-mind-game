const settings = {
  set val(value) {
    localStorage.setItem("playerName", value.name);
    localStorage.setItem("totalCards", value.totalCards);
  },
  get val() {
    return {
      playerName: localStorage.getItem("playerName"),
      totalCards: localStorage.getItem("totalCards"),
    };
  },
};
