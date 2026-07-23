import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Menu,
  Plus,
  Send,
  Sparkles,
  Star,
  X,
  type IconNode,
} from "lucide";

import type { IconName } from "./types";

const ICONS: Record<IconName, IconNode> = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "external-link": ExternalLink,
  menu: Menu,
  plus: Plus,
  send: Send,
  sparkles: Sparkles,
  star: Star,
  x: X,
};

function escapeHtml(value: string | number | undefined): string {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");
}

function getAttributeString(attributes: Record<string, string | number | undefined>): string {
  return Object.entries(attributes)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
    .join(" ");
}

function getNodeMarkup(node: IconNode[number]): string {
  const [tagName, attributes] = node;
  return `<${tagName} ${getAttributeString(attributes)}></${tagName}>`;
}

export function getIconClassName(className: string | undefined): string {
  return ["shrink-0", className ?? ""].filter(Boolean).join(" ");
}

export function getIconMarkup(name: IconName, title?: string): string {
  const iconNode = ICONS[name];
  const titleMarkup = title ? `<title>${escapeHtml(title)}</title>` : "";

  return `${titleMarkup}${iconNode.map(getNodeMarkup).join("")}`;
}
