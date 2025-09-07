import { Layout } from '@/components/layout';
import { HeroSlider, BlogPostsGrid, Pagination } from '@/components/ui';

export default function Home() {
  return (
    <Layout>
      <div className="page-wrapper">
        <HeroSlider />
        <div className="columns-holder">
          <section className="columns-holder-section">
            <BlogPostsGrid />
          </section>
        </div>
        <Pagination />
      </div>
    </Layout>
  );
}