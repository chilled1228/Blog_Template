import { Layout } from '@/components/layout';
import { HeroSlider, BlogPostsGrid, Pagination } from '@/components/ui';

export default function Home() {
  return (
    <Layout>
      <div className="wrapper">
        <HeroSlider />
        <div className="columns--holder row">
          <section>
            <BlogPostsGrid />
          </section>
        </div>
        <Pagination />
      </div>
    </Layout>
  );
}
