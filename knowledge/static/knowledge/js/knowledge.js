document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchForm = document.querySelector("#search-form");
  const queryInput = document.querySelector("#query");
  const categorySelect = document.querySelector("#category-select");
  const query = urlParams.get("query");
  const categorySlug = urlParams.get("category");

  if (categorySlug) {
    const categoryOption = Array.from(categorySelect.options).find(
      (option) => option.dataset.slug === categorySlug,
    );
    if (categoryOption) {
      categoryOption.selected = true;
    }
  }
  if (query) {
    queryInput.value = query;
  }
  function applyFilters() {
    const query = queryInput.value.trim();
    const category = categorySelect.selectedOptions[0]?.dataset.slug;
    const params = new URLSearchParams();
    if (query) {
      params.set("query", query);
    }
    console.log(category);
    if (category && category !== "any") {
      params.set("category", category);
    }
    console.log(query, category);
    window.location.href = `/knowledge/?${params.toString()}#articles`;
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    applyFilters();
  });

  searchForm.addEventListener("reset", (e) => {
    e.preventDefault();
    window.location.href = `/knowledge/#articles`;
  });
  categorySelect.addEventListener("change", () => {
    applyFilters();
  });
});
