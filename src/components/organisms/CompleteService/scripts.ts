export function getCompleteServiceScript(): string {
  return `
    const root = document.querySelector("[data-complete-service]");

    if (!root || typeof IntersectionObserver === "undefined") {
      root?.querySelectorAll?.(".reveal")?.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.classList.add("in-view");
        }
      });
      return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        if (entry.target instanceof HTMLElement) {
          entry.target.classList.add("in-view");
        }

        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    root.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
  `;
}
