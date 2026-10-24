// BookNest Theme Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");

  if (!toggle) return;

  const savedTheme = localStorage.getItem("booknest-theme");
  document.body.classList.toggle("dark-mode", savedTheme === "dark");
  toggle.checked = savedTheme === "dark";

  toggle.addEventListener("change", () => {
    const isDark = toggle.checked;

    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("booknest-theme", isDark ? "dark" : "light");
  });
});


// theme search and flirting option 
const searchInput = document.getElementById("bookSearch");
const categoryFilter = document.getElementById("categoryFilter");
const bookCards = document.querySelectorAll(".book-card");
const emptyMessage = document.getElementById("emptyMessage");

function filterBooks() {
  const searchText = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  let visibleCount = 0;

  bookCards.forEach((card) => {
    const text = card.textContent.toLowerCase();

    const matchesSearch = text.includes(searchText);
    const matchesCategory =
      category === "all" || card.dataset.category === category;

    const visible = matchesSearch && matchesCategory;

    card.hidden = !visible;

    if (visible) {
      visibleCount++;
    }
  });

  emptyMessage.hidden = visibleCount > 0;
}

if (searchInput && categoryFilter && emptyMessage) {
  searchInput.addEventListener("input", filterBooks);
  categoryFilter.addEventListener("change", filterBooks);
}
