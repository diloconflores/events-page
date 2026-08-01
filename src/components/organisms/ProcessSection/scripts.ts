export function getProcessSectionScript(): string {
  return `
    const root = document.querySelector("[data-process-section]");

    if (root instanceof HTMLElement) {
      const init = () => {
        if (root.dataset.processInitialized === "true") {
          return;
        }

        root.dataset.processInitialized = "true";

        const items = Array.from(root.querySelectorAll("[data-process-item]")).filter(
          (item) => item instanceof HTMLElement,
        );
        const titles = items
          .map((item) => item.querySelector("h3"))
          .filter((title) => title instanceof HTMLElement);

        if (!items.length || titles.length !== items.length) {
          return;
        }

        let rafId = 0;

        const getActiveIndex = () => {
          const activationLine = window.innerHeight / 2;
          let activeIndex = 0;

          titles.forEach((title, index) => {
            const rect = title.getBoundingClientRect();

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
        document.addEventListener("scroll", scheduleSync, { passive: true, capture: true });
        window.addEventListener("resize", scheduleSync);
        window.addEventListener("load", scheduleSync);
      };

      if (!("IntersectionObserver" in window)) {
        init();
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            observer.disconnect();
            init();
          });
        },
        { rootMargin: "200px 0px" },
      );

      observer.observe(root);
    }
  `;
}
