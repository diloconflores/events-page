export function getBentoGridScript(): string {
  return `
    const lockScroll = (locked) => {
      document.documentElement.style.overflow = locked ? "hidden" : "";
      document.body.style.overflow = locked ? "hidden" : "";
      document.body.classList.toggle("modal-open", locked);
    };

    const clampIndex = (index, length) => {
      if (length <= 0) {
        return 0;
      }

      return ((index % length) + length) % length;
    };

    const summarizeText = (text, maxWords = 12) => {
      const cleaned = (text || "").replace(/\\s+/g, " ").trim();

      if (!cleaned) {
        return "";
      }

      const sentence = cleaned.split(/(?<=[.!?])\\s+/)[0] || cleaned;
      const words = sentence.split(" ");

      if (words.length <= maxWords) {
        return sentence.replace(/[.!?]+$/, "");
      }

      return \`\${words.slice(0, maxWords).join(" ")}…\`;
    };

    const formatCounter = (value) => String(value).padStart(2, "0");

    const setNodeText = (node, value) => {
      if (node instanceof HTMLElement) {
        node.textContent = value;
      }
    };

    document.querySelectorAll("[data-bento-grid]").forEach((root) => {
      if (!(root instanceof HTMLElement)) {
        return;
      }

      const triggers = Array.from(root.querySelectorAll("[data-bento-trigger]")).filter((item) => item instanceof HTMLButtonElement);
      const gridVariant = root.dataset.bentoVariant === "gallery" ? "gallery" : "album";
      const lightbox = root.querySelector("[data-bento-modal]");
      const lightboxContent = root.querySelector("[data-bento-modal-content]");
      const lightboxStage = root.querySelector("[data-bento-modal-stage]");
      const lightboxMedia = root.querySelector("[data-bento-modal-media]");
      const lightboxPanel = root.querySelector("[data-bento-modal-panel]");
      const lightboxImage = root.querySelector("[data-bento-modal-image]");
      const lightboxTitle = root.querySelector("[data-bento-modal-title]");
      const lightboxSubtitle = root.querySelector("[data-bento-modal-subtitle]");
      const lightboxDescription = root.querySelector("[data-bento-modal-description]");
      const lightboxCaption = root.querySelector("[data-bento-modal-caption]");
      const lightboxCounter = root.querySelector("[data-bento-modal-counter]");
      const lightboxDots = root.querySelector("[data-bento-modal-dots]");
      const lightboxPrev = root.querySelector("[data-bento-prev]");
      const lightboxNext = root.querySelector("[data-bento-next]");
      const lightboxClose = root.querySelector("[data-bento-close]");
      const dotButtons = Array.from(root.querySelectorAll("[data-bento-dot]")).filter((item) => item instanceof HTMLButtonElement);

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

      let currentIndex = 0;
      let currentGroup = gridVariant;
      let closeTimer = null;
      let lastFocusedTrigger = null;
      let pointerStartX = null;

      const getItems = () => items;

      const updateLightboxMediaSize = () => {
        if (!(lightboxMedia instanceof HTMLElement) || !(lightboxImage instanceof HTMLImageElement)) {
          return;
        }

        if (!window.matchMedia("(min-width: 700px)").matches) {
          lightboxMedia.style.width = "100%";
          return;
        }

        const naturalWidth = lightboxImage.naturalWidth || 1;
        const naturalHeight = lightboxImage.naturalHeight || 1;
        const ratio = naturalWidth / naturalHeight;
        const contentWidth = lightboxContent instanceof HTMLElement ? lightboxContent.getBoundingClientRect().width : window.innerWidth;
        const panelWidth = lightboxPanel instanceof HTMLElement ? lightboxPanel.getBoundingClientRect().width : Math.min(Math.max(window.innerWidth * 0.27, 260), 340);
        const stageWidth = lightboxStage instanceof HTMLElement ? lightboxStage.getBoundingClientRect().width : contentWidth;
        const availableForImage = Math.max(Math.min(stageWidth, contentWidth - panelWidth - 24), 240);
        const maxViewportHeight = Math.min(window.innerHeight * 0.84, 900);
        const targetWidth = Math.min(availableForImage, maxViewportHeight * ratio);

        lightboxMedia.style.width = \`\${Math.max(220, targetWidth)}px\`;
      };

      const renderLightboxDots = () => {
        if (!(lightboxDots instanceof HTMLElement)) {
          return;
        }

        const itemsForGroup = getItems();
        lightboxDots.replaceChildren();

        itemsForGroup.forEach((_, index) => {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "h-[9px] w-[9px] rounded-full border-0 bg-white/28 p-0 transition-[width,background-color,transform] duration-200 data-[active=true]:w-[28px] data-[active=true]:bg-[#e72371]";
          button.dataset.bentoDot = String(index);
          button.dataset.active = String(index === currentIndex);
          button.setAttribute("aria-label", \`Ver imagen \${index + 1}\`);
          button.setAttribute("aria-pressed", String(index === currentIndex));

          button.addEventListener("click", () => {
            currentIndex = clampIndex(index, itemsForGroup.length);
            renderLightbox();
          });

          lightboxDots.appendChild(button);
        });
      };

      const setDotsState = () => {
        if (!(lightboxDots instanceof HTMLElement)) {
          return;
        }

        Array.from(lightboxDots.querySelectorAll("[data-bento-dot]")).forEach((dot, index) => {
          if (!(dot instanceof HTMLButtonElement)) {
            return;
          }

          const active = index === currentIndex;
          dot.dataset.active = String(active);
          dot.setAttribute("aria-pressed", String(active));
        });

        dotButtons.forEach((dot, index) => {
          const active = index === currentIndex;
          dot.dataset.active = String(active);
          dot.setAttribute("aria-pressed", String(active));
        });
      };

      const renderLightbox = () => {
        const itemsForGroup = getItems();
        const item = itemsForGroup[currentIndex];

        if (!item) {
          return;
        }

        if (lightboxImage instanceof HTMLImageElement) {
          lightboxImage.src = item.src;
          lightboxImage.alt = item.alt;
          lightboxImage.width = item.width;
          lightboxImage.height = item.height;
          lightboxImage.onload = updateLightboxMediaSize;
        }

        setNodeText(lightboxTitle, item.title);
        setNodeText(lightboxSubtitle, item.subtitle);
        setNodeText(lightboxDescription, item.description);
        setNodeText(lightboxCaption, item.caption ? summarizeText(item.caption) : summarizeText(item.description));

        if (lightboxCounter instanceof HTMLElement) {
          lightboxCounter.textContent = \`\${formatCounter(currentIndex + 1)} / \${formatCounter(itemsForGroup.length)}\`;
        }

        renderLightboxDots();
        setDotsState();

        if (lightboxImage instanceof HTMLImageElement && lightboxImage.complete && lightboxImage.naturalWidth) {
          updateLightboxMediaSize();
        }
      };

      const openLightbox = (group, index, trigger) => {
        if (!(lightbox instanceof HTMLDialogElement)) {
          return;
        }

        if (closeTimer) {
          window.clearTimeout(closeTimer);
          closeTimer = null;
        }

        currentGroup = group;
        currentIndex = clampIndex(index, getItems(group).length);
        lastFocusedTrigger = trigger instanceof HTMLElement ? trigger : null;

        renderLightbox();
        lightbox.dataset.open = "true";
        lightbox.dataset.closing = "false";
        lightbox.showModal();
        lockScroll(true);

        window.requestAnimationFrame(() => {
          if (lightboxClose instanceof HTMLButtonElement) {
            lightboxClose.focus({ preventScroll: true });
          }
        });
      };

      const closeLightbox = () => {
        if (!(lightbox instanceof HTMLDialogElement) || !lightbox.open || lightbox.dataset.closing === "true") {
          return;
        }

        lightbox.dataset.closing = "true";
        lightbox.dataset.open = "false";

        closeTimer = window.setTimeout(() => {
          lightbox.close();
          closeTimer = null;
        }, 240);

        lockScroll(false);

        if (lastFocusedTrigger instanceof HTMLElement) {
          lastFocusedTrigger.focus({ preventScroll: true });
        }
      };

      const moveLightbox = (direction) => {
        const itemsForGroup = getItems();
        currentIndex = clampIndex(currentIndex + direction, itemsForGroup.length);
        renderLightbox();
      };

      triggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
          const index = Number(trigger.dataset.bentoIndex ?? "0");
          openLightbox(gridVariant, index, trigger);
        });
      });

      if (lightboxClose instanceof HTMLButtonElement) {
        lightboxClose.addEventListener("click", closeLightbox);
      }

      if (lightboxPrev instanceof HTMLButtonElement) {
        lightboxPrev.addEventListener("click", () => moveLightbox(-1));
      }

      if (lightboxNext instanceof HTMLButtonElement) {
        lightboxNext.addEventListener("click", () => moveLightbox(1));
      }

      if (lightbox instanceof HTMLDialogElement) {
        lightbox.addEventListener("click", (event) => {
          if (event.target === lightbox) {
            closeLightbox();
          }
        });

        lightbox.addEventListener("cancel", (event) => {
          event.preventDefault();
          closeLightbox();
        });

        lightbox.addEventListener("close", () => {
          lightbox.classList.remove("is-visible", "is-closing");
          lightbox.dataset.open = "false";
          lightbox.dataset.closing = "false";
          lockScroll(false);

          if (closeTimer) {
            window.clearTimeout(closeTimer);
            closeTimer = null;
          }
        });
      }

      if (lightboxMedia instanceof HTMLElement) {
        lightboxMedia.addEventListener("pointerdown", (event) => {
          pointerStartX = event.clientX;
        });

        lightboxMedia.addEventListener("pointerup", (event) => {
          if (pointerStartX === null) {
            return;
          }

          const deltaX = event.clientX - pointerStartX;
          pointerStartX = null;

          if (Math.abs(deltaX) < 40) {
            return;
          }

          if (deltaX < 0) {
            moveLightbox(1);
            return;
          }

          moveLightbox(-1);
        });

        lightboxMedia.addEventListener("pointercancel", () => {
          pointerStartX = null;
        });
      }

      window.addEventListener("keydown", (event) => {
        if (!(lightbox instanceof HTMLDialogElement) || !lightbox.open) {
          return;
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          moveLightbox(-1);
          return;
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          moveLightbox(1);
        }
      });

      window.addEventListener("resize", () => {
        if (lightbox instanceof HTMLDialogElement && lightbox.open) {
          updateLightboxMediaSize();
        }
      });
    });
  `;
}
