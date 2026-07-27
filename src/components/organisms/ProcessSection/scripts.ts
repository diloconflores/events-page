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

    let rafId = 0;

    const getActiveIndex = () => {
      const activationLine = Math.max(window.innerHeight * 0.35, 180);
      let activeIndex = -1;

      items.forEach((item, index) => {
        if (!(item instanceof HTMLElement)) {
          return;
        }

        const rect = item.getBoundingClientRect();

        if (rect.top <= activationLine) {
          activeIndex = index;
        }
      });

      return activeIndex;
    };

    const syncItemStates = () => {
      rafId = 0;

      const activeIndex = getActiveIndex();

      items.forEach((item, index) => {
        if (!(item instanceof HTMLElement)) {
          return;
        }

        if (activeIndex < 0) {
          item.dataset.state = "inactive";
          return;
        }

        if (index < activeIndex) {
          item.dataset.state = "past";
          return;
        }

        if (index === activeIndex) {
          item.dataset.state = "active";
          return;
        }

        item.dataset.state = "inactive";
      });
    };

    const scheduleSync = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(syncItemStates);
    };

    syncItemStates();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
  `;
}
