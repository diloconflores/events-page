export function getDropdownScript(): string {
  return `
    const initDropdown = (root) => {
      const trigger = root.querySelector("[data-dropdown-trigger]");
      const menu = root.querySelector("[data-dropdown-menu]");

      if (!(trigger instanceof HTMLButtonElement) || !(menu instanceof HTMLElement)) {
        return;
      }

      const getItems = () => Array.from(root.querySelectorAll("[data-dropdown-item]")).filter((item) => item instanceof HTMLElement);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let openFrameId = 0;
      let closeTimeoutId = 0;
      let closeTransitionEnd = null;

      const cleanupCloseAnimation = () => {
        if (openFrameId) {
          window.cancelAnimationFrame(openFrameId);
          openFrameId = 0;
        }

        window.clearTimeout(closeTimeoutId);

        if (closeTransitionEnd) {
          menu.removeEventListener("transitionend", closeTransitionEnd);
          closeTransitionEnd = null;
        }
      };

      const setOpenState = (isOpen, shouldFocusTrigger = false) => {
        if (isOpen) {
          cleanupCloseAnimation();
          menu.hidden = false;
          root.dataset.open = "false";
          trigger.dataset.open = "false";
          menu.dataset.open = "false";
          trigger.setAttribute("aria-expanded", "true");
          menu.setAttribute("aria-hidden", "false");
          menu.getBoundingClientRect();

          openFrameId = window.requestAnimationFrame(() => {
            root.dataset.open = "true";
            trigger.dataset.open = "true";
            menu.dataset.open = "true";
          });

          return;
        }

        root.dataset.open = "false";
        trigger.dataset.open = "false";
        menu.dataset.open = "false";
        trigger.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");

        if (prefersReducedMotion.matches) {
          menu.hidden = true;

          if (shouldFocusTrigger) {
            trigger.focus();
          }

          return;
        }

        cleanupCloseAnimation();

        closeTransitionEnd = (event) => {
          if (event.target !== menu) {
            return;
          }

          menu.hidden = true;
          cleanupCloseAnimation();

          if (shouldFocusTrigger) {
            trigger.focus();
          }
        };

        menu.addEventListener("transitionend", closeTransitionEnd);

        closeTimeoutId = window.setTimeout(() => {
          menu.hidden = true;
          cleanupCloseAnimation();

          if (shouldFocusTrigger) {
            trigger.focus();
          }
        }, 240);

      };

      const open = (focusItemIndex) => {
        setOpenState(true);

        if (typeof focusItemIndex === "number") {
          const items = getItems();
          const item = items[focusItemIndex];

          if (item instanceof HTMLElement) {
            item.focus();
          }
        }
      };

      const close = (shouldFocusTrigger = false) => {
        setOpenState(false, shouldFocusTrigger);
      };

      const toggle = () => {
        if (menu.hidden || menu.dataset.open === "false") {
          open();
          return;
        }

        close();
      };

      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle();
      });

      trigger.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          close(true);
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
          return;
        }

        if (event.key === "ArrowDown") {
          event.preventDefault();
          open(0);
          return;
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          const items = getItems();
          open(items.length > 0 ? items.length - 1 : 0);
        }
      });

      menu.addEventListener("keydown", (event) => {
        const items = getItems();
        const activeIndex = items.findIndex((item) => item === document.activeElement);

        if (event.key === "Escape") {
          event.preventDefault();
          close(true);
          return;
        }

        if (items.length === 0) {
          return;
        }

        if (event.key === "ArrowDown") {
          event.preventDefault();
          const nextIndex = activeIndex < 0 || activeIndex + 1 >= items.length ? 0 : activeIndex + 1;
          items[nextIndex]?.focus();
          return;
        }

        if (event.key === "ArrowUp") {
          event.preventDefault();
          const previousIndex = activeIndex <= 0 ? items.length - 1 : activeIndex - 1;
          items[previousIndex]?.focus();
          return;
        }

        if (event.key === "Home") {
          event.preventDefault();
          items[0]?.focus();
          return;
        }

        if (event.key === "End") {
          event.preventDefault();
          items[items.length - 1]?.focus();
        }
      });

      menu.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) {
          return;
        }

        if (event.target.closest("[data-dropdown-item]")) {
          close();
        }
      });

      root.addEventListener("focusout", (event) => {
        const nextTarget = event.relatedTarget;

        if (nextTarget instanceof Node && root.contains(nextTarget)) {
          return;
        }

        close();
      });

      document.addEventListener("click", (event) => {
        if (!(event.target instanceof Node)) {
          return;
        }

        if (root.contains(event.target)) {
          return;
        }

        close();
      });
    };

    document.querySelectorAll("[data-dropdown]").forEach((root) => {
      if (root instanceof HTMLElement) {
        initDropdown(root);
      }
    });
  `;
}
