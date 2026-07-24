export function getProcessSectionScript(): string {
  return `
    const root = document.querySelector("[data-process-section]");

    if (!root) {
      return;
    }

    const items = Array.from(root.querySelectorAll("[data-process-item]"));

    if (!items.length) {
      return;
    }

    const activateItem = (item) => {
      if (item instanceof HTMLElement) {
        item.dataset.active = "true";
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      items.forEach(activateItem);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        activateItem(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.45, rootMargin: "0px 0px -12% 0px" });

    items.forEach((item) => observer.observe(item));
  `;
}
