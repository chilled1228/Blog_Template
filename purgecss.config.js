module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
  ],
  safelist: [
    // behindthebrain Brand Colors
    'text-client-clr',
    'text-client-clr--hover',
    'text-client-btn',
    'text-client-btn--hover',
    'bg-client-clr',
    'bg-client-clr--hover',
    'bg-client-btn',
    'bg-client-btn--hover',
    'border-client-clr',
    'border-client-clr--hover',
    
    // Layout Classes
    'content-wrapper',
    'wrapper',
    'row',
    'col',
    
    // Column Classes
    'col__xs--12',
    'col__sm--6',
    'col__sm--3',
    'col__md--4',
    
    // Utility Classes
    'mg-none',
    'mg-none-i',
    'width-auto',
    'inline-block',
    'clearfix',
    
    // Text Color Classes
    'link--category',
    'link--text',
    
    // Button Classes
    'button',
    'button--sm',
    'button--md',
    'button--lg',
    'button--xl',
    'button--flat',
    'button--inverted',
    'button--icon',
    'button--icon--only',
    'button--state',
    
    // Icon Classes
    'icon',
    'icon--sm',
    'icon--md',
    'icon--lg',
    'icon--xl',
    'icon--mg-sm',
    'icon--mg-md',
    'icon--mg-lg',
    'icon--mg-xl',
    
    // State Classes
    'state--inactive',
    'state--active',
    
    // Main Container
    'main-container',
    
    // Page Layout Classes
    'page-wrapper',
    'columns-holder',
    'columns-holder-section',
    
    // Blog Posts Grid
    'posts-grid-row',
    'posts-grid',
    
    // Header Component
    'header',
    'header-nav',
    'header-menu-item',
    'search-button-holder',
    'trigger__button',
    'header-mobile-menu',
    'header-mobile-menu-button',
    'header-mobile-nav',
    'search-overlay',
    'search-container',
    'search-form',
    'search-input-container',
    'search-input',
    'search-close-button',
    
    // Hero Slider
    'hero-slider',
    'hero-slider-content',
    'slider-controls',
    'slider-control-button',
    'slider-control-button--active',
    'slider-control-button--inactive',
    'slider-item',
    'slider-item--inactive',
    'slide-text',
    'slide-text-content',
    'slide-category-link',
    'slide-categories-list',
    'slide-category-item',
    'slide-category-item-link',
    'slide-title',
    'slide-title-link',
    'slide-description',
    'slide-author',
    'slide-author-link',
    'slide-date',
    'slide-image-container',
    'slide-image-link',
    'slide-image-wrapper',
    'slide-image',
    
    // Blog Post Card
    'blog-post-card',
    'blog-post-card-link',
    'blog-post-image-container',
    'blog-post-image',
    'blog-post-content',
    'blog-post-category-link',
    'blog-post-title',
    'blog-post-title-link',
    'blog-post-meta',
    'blog-post-author',
    'blog-post-date',
    'blog-post-date-time',
    
    // Pagination
    'pagination',
    'pagination-button-container',
    'pagination-prev-button',
    'pagination-next-button',
    'pagination-button-text',
    'pagination-button-icon',
    'pagination-button-icon--prev',
    
    // WordPress Classes
    'has-normal-font-size',
    'has-huge-font-size',
    'blocks-gallery-grid',
    'wp-block-gallery',
    'blocks-gallery-image',
    'blocks-gallery-item',
    'wp-block-list',
    'wp-block-quote',
    'aligncenter',
    'items-justified-left',
    'items-justified-center',
    'items-justified-right',
    'items-justified-space-between',
    'screen-reader-text',
    
    // Dynamic classes that might be used
    'active',
    'show',
    'hide',
    'visible',
    'hidden',
    'open',
    'collapsed',
    'expanded'
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
};