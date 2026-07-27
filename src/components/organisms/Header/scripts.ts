import type { HeaderScriptOptions } from "./types";

export function getHeaderScript(options: HeaderScriptOptions): string {
  return `
    const header = document.querySelector("[data-header]");

    if (header) {
      const headerBrandWhite = header.querySelector('[data-brand-logo="white"]');
      const headerBrandColor = header.querySelector('[data-brand-logo="color"]');
      const brandDropdown = header.querySelector("[data-dropdown]");
      const brandDropdownOverlay = document.querySelector("[data-header-dropdown-overlay]");
      const menuButton = header.querySelector("[data-menu-button]");
      const navOverlay = document.querySelector("[data-nav-overlay]");
      const nav = header.querySelector("[data-nav]");
      const navIndicator = header.querySelector("[data-header-nav-indicator]");
      const navLinks = Array.from(header.querySelectorAll("[data-header-nav-link]"));
      const openMenuLabel = ${JSON.stringify(options.openMenuLabel)};
      const closeMenuLabel = ${JSON.stringify(options.closeMenuLabel)};
      const mobileMediaQuery = window.matchMedia("(max-width: 979px)");
      const lockScroll = (locked) => {
        document.documentElement.style.overflow = locked ? "hidden" : "";
        document.body.style.overflow = locked ? "hidden" : "";
        document.body.style.overscrollBehavior = locked ? "none" : "";
      };
      const isMobileNavMode = () => mobileMediaQuery.matches;
      let brandDropdownOverlayTimer = 0;
      const syncBrandDropdownOverlay = () => {
        if (!(brandDropdownOverlay instanceof HTMLElement)) {
          return;
        }

        const isOpen = isMobileNavMode() && brandDropdown instanceof HTMLElement && brandDropdown.dataset.open === "true";

        if (brandDropdownOverlayTimer) {
          window.clearTimeout(brandDropdownOverlayTimer);
          brandDropdownOverlayTimer = 0;
        }

        if (isOpen) {
          brandDropdownOverlay.dataset.closing = "false";
          brandDropdownOverlay.dataset.open = "true";
          return;
        }

        if (brandDropdownOverlay.dataset.open !== "true") {
          brandDropdownOverlay.dataset.open = "false";
          brandDropdownOverlay.dataset.closing = "false";
          return;
        }

        brandDropdownOverlay.dataset.closing = "true";
        brandDropdownOverlayTimer = window.setTimeout(() => {
          brandDropdownOverlay.dataset.open = "false";
          brandDropdownOverlay.dataset.closing = "false";
          brandDropdownOverlayTimer = 0;
        }, 300);
      };
      const normalizePath = (value) => {
        if (value === "/") {
          return "/";
        }

        return value.replace(/\\/+$/, "");
      };
      const navTargets = navLinks
        .map((link) => {
          if (!(link instanceof HTMLAnchorElement)) {
            return null;
          }

          const href = link.getAttribute("href");

          if (!href) {
            return null;
          }

          if (href.startsWith("#")) {
            const target = document.querySelector(href);

            if (!(target instanceof HTMLElement)) {
              return null;
            }

            return {
              link,
              kind: "section",
              target,
              path: null,
            };
          }

          const resolvedUrl = new URL(href, window.location.origin);

          return {
            link,
            kind: "page",
            target: null,
            path: normalizePath(resolvedUrl.pathname),
          };
        })
        .filter((entry) => entry !== null);

      const setHeaderState = () => {
        const menuOpen = isMobileNavMode() && nav instanceof HTMLElement && nav.dataset.open === "true";
        const scrolled = menuOpen || window.scrollY > 24;

        header.dataset.scrolled = String(scrolled);
        header.style.setProperty("--header-height", scrolled ? "68px" : "78px");

        header.querySelectorAll("[data-dropdown]").forEach((dropdown) => {
          if (dropdown instanceof HTMLElement) {
            dropdown.dataset.scrolled = String(scrolled);
          }
        });

        if (menuButton instanceof HTMLElement) {
          menuButton.dataset.scrolled = String(scrolled);
        }

        if (navOverlay instanceof HTMLElement) {
          navOverlay.dataset.scrolled = String(scrolled);
        }

        header.querySelectorAll("[data-dropdown-trigger]").forEach((trigger) => {
          if (trigger instanceof HTMLElement) {
            trigger.dataset.scrolled = String(scrolled);
          }
        });

        navLinks.forEach((link) => {
          if (link instanceof HTMLElement) {
            link.dataset.scrolled = String(scrolled);
          }
        });

        if (headerBrandWhite instanceof HTMLElement && headerBrandColor instanceof HTMLElement) {
          headerBrandWhite.hidden = scrolled;
          headerBrandColor.hidden = !scrolled;
        }

        syncBrandDropdownOverlay();
      };

      const setActiveNavLink = (activeKey, activePath) => {
        navLinks.forEach((link) => {
          if (!(link instanceof HTMLElement)) {
            return;
          }

          const href = link.getAttribute("href");
          const isSectionLink = typeof href === "string" && href.startsWith("#");
          const linkPath = isSectionLink || !href ? "" : normalizePath(new URL(href, window.location.origin).pathname);
          const isActive = (isSectionLink && href === activeKey) || (!isSectionLink && linkPath === activePath);

          link.dataset.active = isActive ? "true" : "false";

          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      };

      const updateNavIndicator = () => {
        if (!(nav instanceof HTMLElement) || !(navIndicator instanceof HTMLElement)) {
          return;
        }

        const activeLink = navLinks.find((link) => link instanceof HTMLElement && link.dataset.active === "true");

        if (!(activeLink instanceof HTMLElement)) {
          navIndicator.style.opacity = "0";
          navIndicator.style.width = "0px";
          navIndicator.style.transform = "translateX(0px)";
          return;
        }

        const navRect = nav.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        const left = Math.max(0, linkRect.left - navRect.left);

        navIndicator.style.width = linkRect.width + "px";
        navIndicator.style.transform = "translateX(" + left + "px)";
        navIndicator.style.opacity = "1";
      };

      const getCurrentSectionId = () => {
        const offset = header instanceof HTMLElement ? header.offsetHeight + 56 : 56;
        let currentId = "hero";

        navTargets.forEach((entry) => {
          if (entry.kind !== "section" || !(entry.target instanceof HTMLElement)) {
            return;
          }

          const top = entry.target.getBoundingClientRect().top;

          if (top <= offset) {
            currentId = entry.target.id;
          }
        });

        return currentId;
      };

      const getCurrentActiveState = () => {
        const pathname = normalizePath(window.location.pathname);
        const sectionId = getCurrentSectionId();
        const sectionMatch = navTargets.find((entry) => entry.kind === "section" && entry.target instanceof HTMLElement && entry.target.id === sectionId);

        if (sectionMatch instanceof Object && "link" in sectionMatch) {
          const href = sectionMatch.link.getAttribute("href");

          if (href) {
            return {
              activeKey: href,
              activePath: "",
            };
          }
        }

        const pageMatch = navTargets.find((entry) => entry.kind === "page" && entry.path === pathname);

        if (pageMatch instanceof Object && "path" in pageMatch) {
          return {
            activeKey: "",
            activePath: pageMatch.path ?? "",
          };
        }

        return {
          activeKey: "",
          activePath: "",
        };
      };

      let activeNavKey = "";
      let activeNavPath = "";
      let rafId = 0;
      let closeTimer = 0;
      let brandDropdownObserver = null;

      const updateActiveNavState = () => {
        rafId = 0;

        const { activeKey: nextActiveKey, activePath: nextActivePath } = getCurrentActiveState();

        if (nextActiveKey !== activeNavKey || nextActivePath !== activeNavPath) {
          activeNavKey = nextActiveKey;
          activeNavPath = nextActivePath;
          setActiveNavLink(activeNavKey, activeNavPath);
        }

        updateNavIndicator();
      };

      const scheduleActiveNavUpdate = () => {
        if (rafId) {
          return;
        }

        rafId = window.requestAnimationFrame(updateActiveNavState);
      };

      const closeMobileNav = () => {
        if (!(menuButton instanceof HTMLButtonElement) || !(nav instanceof HTMLElement)) {
          return;
        }

        if (!isMobileNavMode()) {
          return;
        }

        if (closeTimer) {
          window.clearTimeout(closeTimer);
          closeTimer = 0;
        }

        nav.dataset.closing = "true";
        if (navOverlay instanceof HTMLElement) {
          navOverlay.dataset.closing = "true";
        }

        menuButton.dataset.open = "false";
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", openMenuLabel);

        closeTimer = window.setTimeout(() => {
          nav.dataset.open = "false";
          nav.dataset.closing = "false";

          if (navOverlay instanceof HTMLElement) {
            navOverlay.dataset.open = "false";
            navOverlay.dataset.closing = "false";
          }

          lockScroll(false);
          setHeaderState();
          closeTimer = 0;
        }, 300);
      };

      const openMobileNav = () => {
        if (!(menuButton instanceof HTMLButtonElement) || !(nav instanceof HTMLElement)) {
          return;
        }

        if (!isMobileNavMode()) {
          return;
        }

        if (closeTimer) {
          window.clearTimeout(closeTimer);
          closeTimer = 0;
        }

        nav.dataset.closing = "false";
        if (navOverlay instanceof HTMLElement) {
          navOverlay.dataset.closing = "false";
        }

        menuButton.dataset.open = "true";
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", closeMenuLabel);
        nav.dataset.open = "true";

        if (navOverlay instanceof HTMLElement) {
          navOverlay.dataset.open = "true";
        }

        lockScroll(true);
        setHeaderState();
      };

      setHeaderState();
      updateActiveNavState();
      window.addEventListener("scroll", setHeaderState, { passive: true });
      window.addEventListener("scroll", scheduleActiveNavUpdate, { passive: true });
      window.addEventListener("resize", () => {
        if (!isMobileNavMode() && nav instanceof HTMLElement && nav.dataset.open === "true") {
          nav.dataset.open = "false";
          nav.dataset.closing = "false";

          if (navOverlay instanceof HTMLElement) {
            navOverlay.dataset.open = "false";
            navOverlay.dataset.closing = "false";
          }

          if (menuButton instanceof HTMLButtonElement) {
            menuButton.dataset.open = "false";
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", openMenuLabel);
          }

          lockScroll(false);
        }

        setHeaderState();
        scheduleActiveNavUpdate();
      });
      window.addEventListener("hashchange", scheduleActiveNavUpdate);
      window.addEventListener("load", scheduleActiveNavUpdate);

      if (brandDropdown instanceof HTMLElement) {
        brandDropdownObserver = new MutationObserver(syncBrandDropdownOverlay);
        brandDropdownObserver.observe(brandDropdown, {
          attributes: true,
          attributeFilter: ["data-open"],
        });
      }

      if (menuButton instanceof HTMLButtonElement && nav instanceof HTMLElement) {
        menuButton.addEventListener("click", () => {
          if (!isMobileNavMode()) {
            return;
          }

          if (nav.dataset.open === "true") {
            closeMobileNav();
            return;
          }

          openMobileNav();
        });

        nav.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => {
            closeMobileNav();
          });
        });
      }

      if (navOverlay instanceof HTMLElement) {
        navOverlay.addEventListener("click", closeMobileNav);
      }

      document.addEventListener("click", (event) => {
        if (!isMobileNavMode()) {
          return;
        }

        if (!(event.target instanceof Node)) {
          return;
        }

        if (header.contains(event.target)) {
          if (event.target instanceof Element && event.target.closest("[data-dropdown-item]")) {
            closeMobileNav();
          }
          return;
        }

        closeMobileNav();
      });

      document.addEventListener("keydown", (event) => {
        if (!isMobileNavMode()) {
          return;
        }

        if (event.key !== "Escape") {
          return;
        }

        syncBrandDropdownOverlay();

        closeMobileNav();
      });
    }
  `;
}
