const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const searchForm = document.querySelector("#trip-search");
const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(searchForm);
  const destination = formData.get("destination").trim();
  const date = formData.get("date");
  const travelers = formData.get("travelers");
  const place = destination || "any destination";
  const dateText = date ? ` from ${date}` : "";
  showToast(`Searching ${place}${dateText} for ${travelers}.`);
});

document.querySelectorAll(".package-button").forEach((button) => {
  button.addEventListener("click", () => {
    showToast(`${button.dataset.package} is ready to explore.`);
  });
});

document.querySelectorAll(".footer-social a, .footer-bottom a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});
