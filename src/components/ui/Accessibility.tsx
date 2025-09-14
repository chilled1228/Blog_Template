import React from 'react';

interface AccessibleImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'sync' | 'async' | 'auto';
}

export default function AccessibleImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading = 'lazy',
  fetchPriority = 'auto',
  decoding = 'async',
}: AccessibleImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding={decoding}
      aria-label={alt}
      role="img"
    />
  );
}

interface AccessibleLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
}

export function AccessibleLink({
  href,
  children,
  className = '',
  ariaLabel,
  target = '_self',
  rel,
}: AccessibleLinkProps) {
  const externalRel = target === '_blank' ? 'noopener noreferrer' : '';
  const finalRel = rel ? `${rel} ${externalRel}`.trim() : externalRel;

  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      target={target}
      rel={finalRel}
    >
      {children}
    </a>
  );
}

interface AccessibleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function AccessibleButton({
  children,
  onClick,
  className = '',
  ariaLabel,
  disabled = false,
  type = 'button',
}: AccessibleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

interface SemanticSectionProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  id?: string;
}

export function SemanticSection({
  children,
  className = '',
  ariaLabel,
  id,
}: SemanticSectionProps) {
  return (
    <section
      className={className}
      aria-label={ariaLabel}
      id={id}
    >
      {children}
    </section>
  );
}

interface SemanticArticleProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  id?: string;
}

export function SemanticArticle({
  children,
  className = '',
  ariaLabel,
  id,
}: SemanticArticleProps) {
  return (
    <article
      className={className}
      aria-label={ariaLabel}
      id={id}
    >
      {children}
    </article>
  );
}

interface SemanticNavProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function SemanticNav({
  children,
  className = '',
  ariaLabel = 'Main navigation',
}: SemanticNavProps) {
  return (
    <nav
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </nav>
  );
}

interface SemanticMainProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function SemanticMain({
  children,
  className = '',
  ariaLabel = 'Main content',
}: SemanticMainProps) {
  return (
    <main
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </main>
  );
}

interface SemanticHeaderProps {
  children: React.ReactNode;
  className?: string;
  role?: 'banner';
}

export function SemanticHeader({
  children,
  className = '',
  role = 'banner',
}: SemanticHeaderProps) {
  return (
    <header
      className={className}
      role={role}
    >
      {children}
    </header>
  );
}

interface SemanticFooterProps {
  children: React.ReactNode;
  className?: string;
  role?: 'contentinfo';
}

export function SemanticFooter({
  children,
  className = '',
  role = 'contentinfo',
}: SemanticFooterProps) {
  return (
    <footer
      className={className}
      role={role}
    >
      {children}
    </footer>
  );
}