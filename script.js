const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const searchForm = document.querySelector("#trip-search");
const toast = document.querySelector("#toast");
const packageDialog = document.querySelector("#package-dialog");
const dialogTitle = document.querySelector("#package-dialog-title");
const dialogDescription = document.querySelector("#package-dialog-description");
const dialogPrice = document.querySelector("#package-dialog-price");
const dialogClose = document.querySelector(".dialog-close");
let toastTimer;

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

function closeNavigation(restoreFocus = false) {
  navigation.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  if (restoreFocus) menuToggle.focus();
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => closeNavigation());
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (packageDialog.open) {
    event.preventDefault();
    packageDialog.close();
    return;
  }
  if (menuToggle.getAttribute("aria-expanded") === "true") closeNavigation(true);
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
    dialogTitle.textContent = button.dataset.package;
    dialogDescription.textContent = button.dataset.description;
    dialogPrice.textContent = button.dataset.price;
    packageDialog.showModal();
  });
});

dialogClose.addEventListener("click", () => packageDialog.close());

packageDialog.addEventListener("click", (event) => {
  if (event.target === packageDialog) packageDialog.close();
});
