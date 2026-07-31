const formspreeEndpoint = import.meta.env.PUBLIC_FORMSPREE_ENDPOINT;

if (typeof formspreeEndpoint !== "string" || formspreeEndpoint.length === 0) {
  throw new Error("Missing PUBLIC_FORMSPREE_ENDPOINT environment variable.");
}

export const FORMSPREE_ENDPOINT = formspreeEndpoint;
