export function getBentoGridScript(): string {
  return `
    const lockScroll = (locked) => {
      document.documentElement.style.overflow = locked ? "hidden" : "";
      document.body.style.overflow = locked ? "hidden" : "";
    };

    const clampIndex = (index, length) => {
      if (length <= 0) {
        return 0;
      }

      return ((index % length) + length) % length;
    };

    const formatCounter = (value) => String(value).padStart(2, "0");

    const setNodeText = (node, value) => {
      if (node instanceof HTMLElement) {
        node.textContent = value;
      }
    };

    const setTags = (root, tagsNode, tags) => {
      if (!(tagsNode instanceof HTMLElement)) {
        return;
      }

      tagsNode.replaceChildren();

      tags.forEach((tag) => {
        const pill = document.createElement("span");
        pill.className = "inline-flex items-center rounded-full border border-white/14 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-white uppercase";
        pill.textContent = tag;
        tagsNode.appendChild(pill);
      });
    };

    document.querySelectorAll("[data-bento-grid]").forEach((root) => {
      if (!(root instanceof HTMLElement)) {
        return;
      }

      const triggers = Array.from(root.querySelectorAll("[data-bento-trigger]")).filter((item) => item instanceof HTMLButtonElement);
      const modal = root.querySelector("[data-bento-modal]");
      const panel = root.querySelector("[data-bento-modal-panel]");
      const viewport = root.querySelector("[data-bento-modal-viewport]");
      const image = root.querySelector("[data-bento-modal-image]");
      const counter = root.querySelector("[data-bento-modal-counter]");
      const title = root.querySelector("[data-bento-modal-title]");
      const subtitle = root.querySelector("[data-bento-modal-subtitle]");
      const caption = root.querySelector("[data-bento-modal-caption]");
      const description = root.querySelector("[data-bento-modal-description]");
      const tags = root.querySelector("[data-bento-modal-tags]");
      const closeButton = root.querySelector("[data-bento-close]");
      const prevButton = root.querySelector("[data-bento-prev]");
      const nextButton = root.querySelector("[data-bento-next]");
      const dots = Array.from(root.querySelectorAll("[data-bento-dot]")).filter((item) => item instanceof HTMLButtonElement);

      const items = triggers.map((trigger, index) => ({
        index,
        src: trigger.dataset.bentoSrc ?? "",
        thumbnail: trigger.dataset.bentoThumbnail ?? "",
        width: Number(trigger.dataset.bentoWidth ?? "0"),
        height: Number(trigger.dataset.bentoHeight ?? "0"),
        alt: trigger.dataset.bentoAlt ?? "",
        caption: trigger.dataset.bentoCaption ?? "",
        title: trigger.dataset.bentoTitle ?? "",
        subtitle: trigger.dataset.bentoSubtitle ?? "",
        description: trigger.dataset.bentoDescription ?? "",
        tags: (trigger.dataset.bentoTags ?? "")
          .split("|")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }));

      if (!items.length) {
        return;
      }

      let activeIndex = 0;
      let isOpen = false;
      let lastFocusedTrigger = null;
      let pointerStartX = null;

      const getItem = (index) => items[clampIndex(index, items.length)];

      const setDotsState = () => {
        dots.forEach((dot, index) => {
          const active = index === activeIndex;
          dot.dataset.active = String(active);
          dot.setAttribute("aria-pressed", String(active));
        });
      };

      const setModalContent = () => {
        const item = getItem(activeIndex);

        if (!item) {
          return;
        }

        if (image instanceof HTMLImageElement) {
          image.src = item.src;
          image.alt = item.alt;
          image.width = item.width;
          image.height = item.height;
        }

        if (counter instanceof HTMLElement) {
          counter.textContent = \`\${formatCounter(activeIndex + 1)} / \${formatCounter(items.length)}\`;
        }

        setNodeText(title, item.title);
        setNodeText(subtitle, item.subtitle);
        setNodeText(caption, item.caption);
        setNodeText(description, item.description);
        setTags(root, tags, item.tags);
        setDotsState();
      };

      const openModal = (index, trigger) => {
        activeIndex = clampIndex(index, items.length);
        lastFocusedTrigger = trigger instanceof HTMLElement ? trigger : null;
        isOpen = true;

        if (modal instanceof HTMLElement) {
          modal.dataset.open = "true";
          modal.setAttribute("aria-hidden", "false");
        }

        if (panel instanceof HTMLElement) {
          panel.dataset.open = "true";
        }

        setModalContent();
        lockScroll(true);

        window.requestAnimationFrame(() => {
          if (closeButton instanceof HTMLButtonElement) {
            closeButton.focus();
          }
        });
      };

      const closeModal = () => {
        isOpen = false;

        if (modal instanceof HTMLElement) {
          modal.dataset.open = "false";
          modal.setAttribute("aria-hidden", "true");
        }

        if (panel instanceof HTMLElement) {
          panel.dataset.open = "false";
        }

        lockScroll(false);

        if (lastFocusedTrigger instanceof HTMLElement) {
          lastFocusedTrigger.focus();
        }
      };

      const goNext = () => {
        activeIndex = clampIndex(activeIndex + 1, items.length);
        setModalContent();
      };

      const goPrevious = () => {
        activeIndex = clampIndex(activeIndex - 1, items.length);
        setModalContent();
      };

      triggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
          const index = Number(trigger.dataset.bentoIndex ?? "0");
          openModal(index, trigger);
        });
      });

      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          const index = Number(dot.dataset.bentoIndex ?? "0");
          activeIndex = clampIndex(index, items.length);
          setModalContent();
        });
      });

      if (closeButton instanceof HTMLButtonElement) {
        closeButton.addEventListener("click", closeModal);
      }

      if (prevButton instanceof HTMLButtonElement) {
        prevButton.addEventListener("click", goPrevious);
      }

      if (nextButton instanceof HTMLButtonElement) {
        nextButton.addEventListener("click", goNext);
      }

      if (modal instanceof HTMLElement) {
        modal.addEventListener("click", (event) => {
          if (event.target === modal) {
            closeModal();
          }
        });
      }

      if (viewport instanceof HTMLElement) {
        viewport.addEventListener("pointerdown", (event) => {
          pointerStartX = event.clientX;
        });

        viewport.addEventListener("pointerup", (event) => {
          if (pointerStartX === null) {
            return;
          }

          const deltaX = event.clientX - pointerStartX;
          pointerStartX = null;

          if (Math.abs(deltaX) < 40) {
            return;
          }

          if (deltaX < 0) {
            goNext();
            return;
          }

          goPrevious();
        });

        viewport.addEventListener("pointercancel", () => {
          pointerStartX = null;
        });
      }

      window.addEventListener("keydown", (event) => {
        if (!isOpen) {
          return;
        }

        if (event.key === "Escape") {
          closeModal();
          return;
        }

        if (event.key === "ArrowRight") {
          goNext();
          return;
        }

        if (event.key === "ArrowLeft") {
          goPrevious();
        }
      });

      setModalContent();
    });
  `;
}
