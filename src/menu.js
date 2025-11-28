export default function initTodoMenu() {
  document.querySelectorAll(".menu-dropdown").forEach((menu) => {
    menu.addEventListener("click", (e) => e.stopPropagation());
  });

  document.addEventListener("click", (e) => {
    const isMenuBtn = e.target.classList.contains("menu-button");

    document.querySelectorAll(".menu-button").forEach((btn) => {
      if (btn !== e.target) btn.classList.remove("active");
    });

    if (isMenuBtn) {
      e.target.classList.toggle("active");
    }
  });
}
