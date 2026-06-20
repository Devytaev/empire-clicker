const tg = window.Telegram.WebApp;
tg.expand();

const userId = tg.initDataUnsafe?.user?.id || "test";

let state = {};

// загрузка
async function load() {
  let res = await fetch("https://YOUR-BACKEND.com/user/" + userId);
  state = await res.json();
  render();
}

// сохранение
function save() {
  fetch("https://YOUR-BACKEND.com/user/" + userId, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(state)
  });
}

// клик
function tap() {
  if (state.energy <= 0) return;

  state.money += state.clickPower * 1000000;
  state.energy -= 1;

  // лёгкая вибрация как в мобильных играх
  if (window.Telegram?.WebApp?.HapticFeedback) {
    Telegram.WebApp.HapticFeedback.impactOccurred("light");
  }

  save();
  render();
}

// реферал
function useRef(refId) {
  fetch(`https://YOUR-BACKEND.com/ref/${userId}/${refId}`);
}

// UI
function render() {
  document.getElementById("money").innerText = state.money;
  document.getElementById("level").innerText = state.level;
  document.getElementById("energy").innerText = state.energy;
}
setInterval(() => {
  if (state.energy < state.maxEnergy) {
    state.energy += 1;
    render();
    save();
  }
}, 5000); // быстрее чем раньше = mobile feel
function buy(item) {
  if (item === "click") {
    if (state.money >= 5000000) {
      state.money -= 5000000;
      state.clickPower += 1;
    }
  }

  if (item === "energy") {
    if (state.money >= 3000000) {
      state.money -= 3000000;
      state.maxEnergy += 20;
    }
  }

  if (item === "full") {
    state.energy = state.maxEnergy;
  }

  save();
  render();
}

load();