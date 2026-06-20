const tg = window.Telegram.WebApp;
tg.expand();

// ===== STATE =====
let state = {
  money: 0,
  level: 1,
  energy: 50,
  maxEnergy: 50,
  baseClick: 1000000
};

// ===== LOAD =====
if (localStorage.getItem("empire")) {
  state = JSON.parse(localStorage.getItem("empire"));
}

// ===== SAVE =====
function save() {
  localStorage.setItem("empire", JSON.stringify(state));
}

// ===== CLICK VALUE =====
function getClickValue() {
  return state.baseClick + (state.level * 500000);
}

// ===== LEVEL SYSTEM =====
function updateLevel() {
  let newLevel = Math.floor(state.money / 10000000) + 1;

  if (newLevel !== state.level) {
    state.level = newLevel;

    // рост энергии
    state.maxEnergy = 50 + (state.level - 1) * 10;
  }
}

// ===== TAP =====
function tap() {
  if (state.energy <= 0) return;

  state.money += getClickValue();
  state.energy -= 1;

  tg.HapticFeedback.impactOccurred("light");

  updateLevel();
  save();
  render();
}

// ===== ENERGY REGEN =====
setInterval(() => {
  if (state.energy < state.maxEnergy) {
    state.energy += 1;
    save();
    render();
  }
}, 600000); // 10 минут

// ===== UI =====
function render() {
  document.getElementById("money").innerText = state.money;
  document.getElementById("level").innerText = state.level;
  document.getElementById("energy").innerText = state.energy;
}

render();