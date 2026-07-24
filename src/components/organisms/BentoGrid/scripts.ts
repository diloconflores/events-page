export function getBentoGridScript(): string {
  return `
    const lockScroll = (locked) => {
      document.documentElement.style.overflow = locked ? "hidden" : "";
      document.body.style.overflow = locked ? "hidden" : "";
      document.documentElement.classList.toggle("modal-open", locked);
      document.body.classList.toggle("modal-open", locked);
    };

    const clampIndex = (index, length) => {
      if (length <= 0) {
        return 0;
      }

      return ((index % length) + length) % length;
    };

    const formatCounter = (value) => String(value).padStart(2, "0");

    const escapeHtml = (value) =>
      String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const formatLeadTag = (value) => {
      const cleaned = String(value || "").replace(/\\s+/g, " ").trim();

      return cleaned ? cleaned.toUpperCase() : "";
    };

    const summarizeText = (text, maxWords = 12) => {
      const cleaned = (text || "").replace(/\\s+/g, " ").trim();

      if (!cleaned) return "";

      const sentence = cleaned.split(/(?<=[.!?])\\s+/)[0] || cleaned;
      const words = sentence.split(" ");

      if (words.length <= maxWords) return sentence.replace(/[.!?]+$/, "");

      return \`\${words.slice(0, maxWords).join(" ")}…\`;
    };

    document.querySelectorAll("[data-media-grid]").forEach((root) => {
      if (!(root instanceof HTMLElement)) {
        return;
      }

      const cards = Array.from(root.querySelectorAll("[data-media-group]")).filter((item) => item instanceof HTMLButtonElement);
      const gridVariant = root.dataset.mediaGrid === "gallery" ? "gallery" : "album";
      const lightbox = root.querySelector("[data-lightbox]");
      const lightboxOverlay = root.querySelector("[data-lightbox-overlay]");
      const lightboxContent = root.querySelector("[data-lightbox-content]");
      const lightboxStage = root.querySelector("[data-lightbox-stage]");
      const lightboxMedia = root.querySelector("[data-lightbox-media]");
      const lightboxPanel = root.querySelector("[data-lightbox-panel]");
      const lightboxImage = root.querySelector("[data-lightbox-image]");
      const lightboxTitle = root.querySelector("[data-lightbox-title]");
      const lightboxSubtitle = root.querySelector("[data-lightbox-subtitle]");
      const lightboxDescription = root.querySelector("[data-lightbox-description]");
      const lightboxCaption = root.querySelector("[data-lightbox-caption]");
      const lightboxTags = root.querySelector("[data-lightbox-tags]");
      const lightboxCounter = root.querySelector("[data-lightbox-counter]");
      const lightboxDots = root.querySelector("[data-lightbox-dots]");
      const lightboxPrev = root.querySelector("[data-lightbox-prev]");
      const lightboxNext = root.querySelector("[data-lightbox-next]");
      const lightboxClose = root.querySelector("[data-lightbox-close]");

      const items = cards.map((trigger, index) => ({
        index,
        src: trigger.dataset.mediaSrc ?? "",
        thumbnail: trigger.dataset.mediaThumbnail ?? "",
        width: Number(trigger.dataset.mediaWidth ?? "0"),
        height: Number(trigger.dataset.mediaHeight ?? "0"),
        alt: trigger.dataset.mediaAlt ?? "",
        caption: trigger.dataset.mediaCaption ?? "",
        title: trigger.dataset.mediaTitle ?? "",
        subtitle: trigger.dataset.mediaSubtitle ?? "",
        description: trigger.dataset.mediaDescription ?? "",
        details: trigger.dataset.mediaDetails ?? "",
        tag: trigger.dataset.mediaTag ?? "",
        tags: (() => {
          try {
            return JSON.parse(trigger.dataset.mediaTags ?? "[]");
          } catch {
            return [];
          }
        })(),
      }));

      if (!items.length) {
        return;
      }

      let currentGroup = gridVariant;
      let currentIndex = 0;
      let closeTimer = null;

      const setLightboxState = (state) => {
        const { open, closing, entered } = state;

        if (lightbox) {
          lightbox.dataset.open = String(open);
          lightbox.dataset.closing = String(closing);
          lightbox.dataset.entered = String(entered);
        }

        if (lightboxOverlay) {
          lightboxOverlay.dataset.open = String(open);
          lightboxOverlay.dataset.closing = String(closing);
          lightboxOverlay.dataset.entered = String(entered);
        }
      };

      const getItems = (group) => {
        if (group && group !== gridVariant) {
          return items;
        }

        return items;
      };

      const updateLightboxMediaSize = () => {
        if (!lightboxMedia || !lightboxImage) return;

        if (!window.matchMedia("(min-width: 700px)").matches) {
          lightboxMedia.style.width = "100%";
          lightboxMedia.style.justifySelf = "";
          lightboxMedia.style.marginInline = "";
          return;
        }

        const naturalWidth = lightboxImage.naturalWidth || 1;
        const naturalHeight = lightboxImage.naturalHeight || 1;
        const isVertical = naturalHeight > naturalWidth;
        const ratio = naturalWidth / naturalHeight;
        const contentWidth = lightboxContent?.getBoundingClientRect().width || window.innerWidth;
        const panelWidth = lightboxPanel?.getBoundingClientRect().width || Math.min(Math.max(window.innerWidth * 0.27, 260), 340);
        const stageWidth = lightboxStage?.getBoundingClientRect().width || contentWidth;
        const availableForImage = Math.max(Math.min(stageWidth, contentWidth - panelWidth - 24), 240);
        const maxViewportHeight = Math.min(window.innerHeight * 0.84, 900);
        const targetWidth = Math.min(availableForImage, maxViewportHeight * ratio);

        lightboxMedia.style.width = \`\${Math.max(220, targetWidth)}px\`;
        lightboxMedia.style.justifySelf = isVertical ? "center" : "start";
        lightboxMedia.style.marginInline = isVertical ? "auto" : "";
      };

      const renderLightboxDots = () => {
        if (!lightboxDots) return;

        const buttons = Array.from(lightboxDots.querySelectorAll("[data-lightbox-dot]"));

        buttons.forEach((button, index) => {
          const isActive = index === currentIndex;
          button.setAttribute("aria-pressed", String(isActive));
          button.dataset.active = String(isActive);
        });
      };

      const renderLightboxTags = () => {
        if (!lightboxTags) return;

        const itemsForGroup = getItems(currentGroup);
        const item = itemsForGroup[currentIndex];
        const tags = Array.isArray(item?.tags) ? item.tags : [];

        lightboxTags.innerHTML = tags
          .map(
            (tag) => \`
              <li>
                <span class="inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-semibold leading-none text-white/90">
                  \${escapeHtml(tag)}
                </span>
              </li>
            \`,
          )
          .join("");
      };

      const renderLightbox = () => {
        const itemsForGroup = getItems(currentGroup);
        const item = itemsForGroup[currentIndex];

        if (!item || !lightboxImage) return;

        lightboxImage.src = item.src;
        lightboxImage.alt = item.alt;
        lightboxImage.onload = updateLightboxMediaSize;
        lightboxTitle.textContent = item.title;
        lightboxSubtitle.textContent = item.subtitle;
        const fullDescription = item.description || item.details || item.caption || "";
        lightboxCaption.textContent =
          formatLeadTag(item.tag || item.tags?.[0] || item.caption || "") ||
          summarizeText(fullDescription);
        lightboxDescription.textContent = fullDescription;
        renderLightboxTags();
        lightboxCounter.textContent = \`\${String(currentIndex + 1).padStart(2, "0")} / \${String(itemsForGroup.length).padStart(2, "0")}\`;
        renderLightboxDots();
        lightboxPrev?.setAttribute("aria-disabled", String(itemsForGroup.length < 2));
        lightboxNext?.setAttribute("aria-disabled", String(itemsForGroup.length < 2));

        if (lightboxImage.complete && lightboxImage.naturalWidth) {
          updateLightboxMediaSize();
        }
      };

      const openLightbox = (group, index) => {
        if (closeTimer) {
          window.clearTimeout(closeTimer);
          closeTimer = null;
        }

        currentGroup = group;
        currentIndex = index;
        renderLightbox();
        setLightboxState({ open: true, closing: false, entered: false });
        lightbox?.showModal();
        requestAnimationFrame(() => {
          setLightboxState({ open: true, closing: false, entered: true });
          renderLightboxDots();

          lightbox?.classList.add("is-visible");
        });
        lockScroll(true);
      };

      const closeLightbox = () => {
        if (!lightbox?.open || lightbox.classList.contains("is-closing")) return;

        setLightboxState({ open: false, closing: true, entered: false });
        lightbox.classList.add("is-closing");
        lightbox.classList.remove("is-visible");
        closeTimer = window.setTimeout(() => {
          lightbox?.close();
          closeTimer = null;
        }, 240);
      };

      const moveLightbox = (direction) => {
        const itemsForGroup = getItems(currentGroup);
        currentIndex = (currentIndex + direction + itemsForGroup.length) % itemsForGroup.length;
        renderLightbox();
      };

      cards.forEach((button) => {
        button.addEventListener("click", () => {
          const group = button.dataset.mediaGroup ?? gridVariant;
          const index = Number(button.dataset.mediaIndex ?? 0);
          openLightbox(group, index);
        });
      });

      lightboxPrev?.addEventListener("click", () => moveLightbox(-1));
      lightboxNext?.addEventListener("click", () => moveLightbox(1));
      lightboxDots?.addEventListener("click", (event) => {
        const dot = event.target.closest("[data-lightbox-dot]");
        if (!dot) return;
        currentIndex = Number(dot.dataset.lightboxDot);
        renderLightbox();
      });
      lightboxClose?.addEventListener("click", closeLightbox);
      lightboxOverlay?.addEventListener("click", closeLightbox);

      lightbox?.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
      });

      lightbox?.addEventListener("cancel", (event) => {
        event.preventDefault();
        closeLightbox();
      });

      lightbox?.addEventListener("close", () => {
        lockScroll(false);
        lightbox?.classList.remove("is-visible", "is-closing");
        setLightboxState({ open: false, closing: false, entered: false });
        if (closeTimer) {
          window.clearTimeout(closeTimer);
          closeTimer = null;
        }
      });

      window.addEventListener("resize", () => {
        if (!lightbox?.open) return;
        updateLightboxMediaSize();
        renderLightboxDots();
      });

      lightbox?.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          moveLightbox(-1);
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          moveLightbox(1);
        }
      });
    });
  `;
}
