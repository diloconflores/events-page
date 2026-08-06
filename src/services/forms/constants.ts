const formspreeEndpoint = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT?.trim();

// Keep builds working in environments where the secret is not injected yet.
export const FORMSPREE_ENDPOINT =
  typeof formspreeEndpoint === "string" && formspreeEndpoint.length > 0
    ? formspreeEndpoint
    : "https://formspree.io/f/placeholder";
