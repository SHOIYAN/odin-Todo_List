export default function initTodoMenu() {
  document.addEventListener("click", (e) => {
    const isMenuButton = e.target.classList.contains("menu-button");

    // Close all dropdowns first
    document.querySelectorAll(".menu-button").forEach((btn) => {
      if (btn !== e.target) btn.classList.remove("active");
    });

    if (isMenuButton) {
      e.target.classList.toggle("active");
      e.stopPropagation();
    }
  });
}
