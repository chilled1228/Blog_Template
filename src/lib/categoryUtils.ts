import { getCategoryBySlug, getAllCategories } from './firebase';

// Cache for category data to avoid repeated database calls
let categoryCache: { [categoryName: string]: string } = {};
let cacheExpiry = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to get category slug by category name
export async function getCategorySlugByName(categoryName: string): Promise<string> {
  // Check cache first
  const now = Date.now();
  if (cacheExpiry > now && categoryCache[categoryName]) {
    return categoryCache[categoryName];
  }

  try {
    // Refresh cache if expired
    if (cacheExpiry <= now) {
      const categories = await getAllCategories();
      categoryCache = {};
      categories.forEach(cat => {
        categoryCache[cat.name] = cat.slug;
      });
      cacheExpiry = now + CACHE_DURATION;
    }

    // Return cached slug or fallback to name-to-slug conversion
    return categoryCache[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
  } catch (error) {
    console.error('Error getting category slug:', error);
    // Fallback: convert name to slug format
    return categoryName.toLowerCase().replace(/\s+/g, '-');
  }
}

// Function to generate category URL dynamically
export async function generateCategoryUrl(categoryName: string): Promise<string> {
  const slug = await getCategorySlugByName(categoryName);
  return `/category/${slug}`;
}

// Function to validate if a category exists
export async function categoryExists(categoryName: string): Promise<boolean> {
  try {
    const slug = await getCategorySlugByName(categoryName);
    const category = await getCategoryBySlug(slug);
    return !!category;
  } catch (error) {
    console.error('Error checking category existence:', error);
    return false;
  }
}