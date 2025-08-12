export type RichContentNode = {
  type?: string;
  nodes?: RichContentNode[];
  textData?: { text?: string };
  linkData?: { url?: string };
  headingData?: { level?: number };
  listData?: { type?: 'unordered' | 'ordered' };
  imageData?: { src?: string; altText?: string };
  [key: string]: any;
};

export interface RichContent {
  nodes?: RichContentNode[];
  [key: string]: any;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderText(node: RichContentNode): string {
  const text = node.textData?.text ?? '';
  return escapeHtml(text);
}

function renderChildren(nodes: RichContentNode[] | undefined): string {
  if (!nodes || nodes.length === 0) return '';
  return nodes.map(renderNode).join('');
}

function renderLink(node: RichContentNode): string {
  const href = node.linkData?.url ?? '#';
  const inner = renderChildren(node.nodes);
  const safeHref = escapeHtml(href);
  return `<a href="${safeHref}">${inner}</a>`;
}

function renderImage(node: RichContentNode): string {
  const src = node.imageData?.src ?? '';
  const alt = node.imageData?.altText ?? '';
  const safeSrc = escapeHtml(src);
  const safeAlt = escapeHtml(alt);
  if (!safeSrc) return '';
  return `<figure><img src="${safeSrc}" alt="${safeAlt}" loading="lazy" decoding="async" /></figure>`;
}

function renderHeading(node: RichContentNode): string {
  const level = Math.min(Math.max(node.headingData?.level ?? 2, 1), 6);
  const inner = renderChildren(node.nodes);
  return `<h${level}>${inner}</h${level}>`;
}

function renderParagraph(node: RichContentNode): string {
  const inner = renderChildren(node.nodes);
  return `<p>${inner}</p>`;
}

function renderList(node: RichContentNode): string {
  const isOrdered = node.listData?.type === 'ordered';
  const tag = isOrdered ? 'ol' : 'ul';
  const inner = renderChildren(node.nodes);
  return `<${tag}>${inner}</${tag}>`;
}

function renderListItem(node: RichContentNode): string {
  const inner = renderChildren(node.nodes);
  return `<li>${inner}</li>`;
}

export function renderNode(node: RichContentNode): string {
  const type = node.type ?? '';
  switch (type) {
    case 'TEXT':
      return renderText(node);
    case 'LINK':
      return renderLink(node);
    case 'IMAGE':
      return renderImage(node);
    case 'PARAGRAPH':
      return renderParagraph(node);
    case 'HEADING':
      return renderHeading(node);
    case 'BULLETED_LIST':
      return renderList({ ...node, listData: { type: 'unordered' } });
    case 'NUMBERED_LIST':
      return renderList({ ...node, listData: { type: 'ordered' } });
    case 'LIST_ITEM':
      return renderListItem(node);
    default:
      // Fallback: render children
      return renderChildren(node.nodes);
  }
}

export function richContentToHtml(content: RichContent | null | undefined): string {
  if (!content || !content.nodes || content.nodes.length === 0) return '';
  return renderChildren(content.nodes);
} 