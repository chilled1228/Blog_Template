import { supabase } from './supabaseClient';

// New blog posts with comprehensive content for better readability
const newBlogPosts = [
  {
    title: 'The Future of Web Development: Trends to Watch in 2025',
    slug: 'future-of-web-development-trends-2025',
    url: '/blog/future-of-web-development-trends-2025/',
    category: 'Technology',
    category_url: '/category/technology/',
    author: 'Sarah Chen',
    author_url: '/author/sarah-chen/',
    date: 'January 15, 2025',
    datetime: '2025-01-15T09:00:00+00:00',
    image: '/images/web-dev-future.jpg',
    excerpt: 'Explore the cutting-edge trends that will shape web development in 2025, from AI integration to new frameworks.',
    content: `<article>
      <h2>Introduction</h2>
      <p>The web development landscape continues to evolve at a rapid pace. As we move through 2025, several key trends are emerging that will fundamentally change how we build and interact with web applications.</p>
      
      <h2>AI-Powered Development Tools</h2>
      <p>Artificial Intelligence is revolutionizing the development process. From code completion to automated testing, AI tools are making developers more productive than ever before. GitHub Copilot and similar tools are becoming essential parts of the developer toolkit.</p>
      
      <h2>WebAssembly Goes Mainstream</h2>
      <p>WebAssembly (WASM) is finally hitting its stride in 2025. With improved browser support and better tooling, more applications are leveraging WASM for performance-critical operations.</p>
      
      <h2>The Rise of Edge Computing</h2>
      <p>Edge computing is changing how we think about web architecture. By processing data closer to users, applications can achieve unprecedented performance and reliability.</p>
      
      <h2>Conclusion</h2>
      <p>These trends represent just the beginning of what's possible in modern web development. Staying informed and adapting to these changes will be crucial for success in 2025 and beyond.</p>
    </article>`
  },
  {
    title: 'Building Scalable APIs with Node.js and Express',
    slug: 'building-scalable-apis-nodejs-express',
    url: '/blog/building-scalable-apis-nodejs-express/',
    category: 'Backend',
    category_url: '/category/backend/',
    author: 'Michael Rodriguez',
    author_url: '/author/michael-rodriguez/',
    date: 'January 12, 2025',
    datetime: '2025-01-12T14:30:00+00:00',
    image: '/images/nodejs-api.jpg',
    excerpt: 'Learn how to build robust, scalable APIs using Node.js and Express with best practices for production environments.',
    content: `<article>
      <h2>Getting Started</h2>
      <p>Building scalable APIs is crucial for modern web applications. Node.js and Express provide an excellent foundation for creating high-performance backends that can handle millions of requests.</p>
      
      <h2>Architecture Patterns</h2>
      <p>When designing scalable APIs, consider these architectural patterns:</p>
      <ul>
        <li><strong>Microservices:</strong> Break your application into smaller, manageable services</li>
        <li><strong>Layered Architecture:</strong> Separate concerns with distinct layers for routing, business logic, and data access</li>
        <li><strong>Event-Driven Design:</strong> Use events to decouple components and improve scalability</li>
      </ul>
      
      <h2>Performance Optimization</h2>
      <p>Optimize your API performance with these techniques:</p>
      <ul>
        <li>Implement caching strategies (Redis, Memcached)</li>
        <li>Use connection pooling for databases</li>
        <li>Implement rate limiting to prevent abuse</li>
        <li>Optimize database queries and use indexing</li>
      </ul>
      
      <h2>Security Best Practices</h2>
      <p>Security should be built into your API from the ground up. Implement authentication, authorization, input validation, and use HTTPS everywhere.</p>
      
      <h2>Monitoring and Logging</h2>
      <p>Comprehensive monitoring and logging are essential for maintaining scalable APIs. Use tools like Winston for logging and implement health checks for all services.</p>
    </article>`
  },
  {
    title: 'React 19: What\'s New and How to Upgrade',
    slug: 'react-19-whats-new-upgrade-guide',
    url: '/blog/react-19-whats-new-upgrade-guide/',
    category: 'Frontend',
    category_url: '/category/frontend/',
    author: 'Emma Thompson',
    author_url: '/author/emma-thompson/',
    date: 'January 10, 2025',
    datetime: '2025-01-10T11:00:00+00:00',
    image: '/images/react-19.jpg',
    excerpt: 'Discover the exciting new features in React 19 and get a step-by-step guide on upgrading your existing applications.',
    content: `<article>
      <h2>React 19: The Next Evolution</h2>
      <p>React 19 brings several groundbreaking features that will change how we build user interfaces. From improved performance to new APIs, this release is packed with improvements.</p>
      
      <h2>Key New Features</h2>
      <h3>Server Components Enhancement</h3>
      <p>React 19 significantly improves Server Components, making them more efficient and easier to use. The new streaming capabilities allow for better user experiences with progressive loading.</p>
      
      <h3>New Hook: useFormState</h3>
      <p>The new useFormState hook simplifies form handling and state management, reducing boilerplate code and improving developer experience.</p>
      
      <h3>Improved Error Boundaries</h3>
      <p>Error boundaries have been enhanced with better error recovery mechanisms and improved debugging capabilities.</p>
      
      <h2>Upgrade Path</h2>
      <p>Upgrading to React 19 requires careful planning:</p>
      <ol>
        <li>Update your dependencies</li>
        <li>Run the migration codemod</li>
        <li>Test your components thoroughly</li>
        <li>Update your build configuration</li>
      </ol>
      
      <h2>Breaking Changes</h2>
      <p>While React maintains backward compatibility, there are some breaking changes to be aware of. Most can be automatically fixed using the provided codemods.</p>
      
      <h2>Performance Improvements</h2>
      <p>React 19 includes significant performance improvements, especially in rendering large lists and handling frequent updates. Bundle sizes are also reduced thanks to better tree-shaking.</p>
    </article>`
  },
  {
    title: 'CSS Grid vs Flexbox: When to Use Each',
    slug: 'css-grid-vs-flexbox-when-to-use',
    url: '/blog/css-grid-vs-flexbox-when-to-use/',
    category: 'CSS',
    category_url: '/category/css/',
    author: 'David Park',
    author_url: '/author/david-park/',
    date: 'January 8, 2025',
    datetime: '2025-01-08T16:45:00+00:00',
    image: '/images/css-grid-flexbox.jpg',
    excerpt: 'Master the differences between CSS Grid and Flexbox to choose the right layout tool for every situation.',
    content: `<article>
      <h2>The Layout Dilemma</h2>
      <p>CSS Grid and Flexbox are both powerful layout systems, but they serve different purposes. Understanding when to use each one is crucial for creating efficient, maintainable layouts.</p>
      
      <h2>CSS Grid: The Two-Dimensional Champion</h2>
      <p>CSS Grid excels at creating complex, two-dimensional layouts. It's perfect for:</p>
      <ul>
        <li>Page-level layouts</li>
        <li>Card-based designs</li>
        <li>Complex grid systems</li>
        <li>Overlapping elements</li>
      </ul>
      
      <h3>Grid Example</h3>
      <pre><code>
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
  min-height: 100vh;
}
      </code></pre>
      
      <h2>Flexbox: The One-Dimensional Master</h2>
      <p>Flexbox is designed for one-dimensional layouts and is ideal for:</p>
      <ul>
        <li>Navigation bars</li>
        <li>Centering content</li>
        <li>Distributing space in a container</li>
        <li>Component-level layouts</li>
      </ul>
      
      <h3>Flexbox Example</h3>
      <pre><code>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
      </code></pre>
      
      <h2>Making the Right Choice</h2>
      <p>Choose CSS Grid when you need to control both rows and columns simultaneously. Choose Flexbox when you're working with a single dimension or need fine control over space distribution.</p>
      
      <h2>Can They Work Together?</h2>
      <p>Absolutely! Grid and Flexbox complement each other perfectly. Use Grid for the overall page structure and Flexbox for individual components.</p>
    </article>`
  },
  {
    title: 'Database Design Principles for Modern Applications',
    slug: 'database-design-principles-modern-applications',
    url: '/blog/database-design-principles-modern-applications/',
    category: 'Database',
    category_url: '/category/database/',
    author: 'Jennifer Liu',
    author_url: '/author/jennifer-liu/',
    date: 'January 5, 2025',
    datetime: '2025-01-05T13:20:00+00:00',
    image: '/images/database-design.jpg',
    excerpt: 'Learn the fundamental principles of database design that will help you build efficient, scalable data systems.',
    content: `<article>
      <h2>The Foundation of Great Applications</h2>
      <p>A well-designed database is the backbone of any successful application. Poor database design can lead to performance issues, data inconsistency, and maintenance nightmares.</p>
      
      <h2>Normalization: Finding the Balance</h2>
      <p>Database normalization helps eliminate data redundancy, but over-normalization can hurt performance. Understanding when to normalize and when to denormalize is crucial.</p>
      
      <h3>The Normal Forms</h3>
      <ul>
        <li><strong>1NF:</strong> Eliminate repeating groups</li>
        <li><strong>2NF:</strong> Remove partial dependencies</li>
        <li><strong>3NF:</strong> Eliminate transitive dependencies</li>
        <li><strong>BCNF:</strong> A stronger version of 3NF</li>
      </ul>
      
      <h2>Indexing Strategies</h2>
      <p>Proper indexing is essential for query performance:</p>
      <ul>
        <li>Index frequently queried columns</li>
        <li>Consider composite indexes for multi-column queries</li>
        <li>Be mindful of index maintenance overhead</li>
        <li>Use covering indexes when possible</li>
      </ul>
      
      <h2>Data Types and Constraints</h2>
      <p>Choose appropriate data types and implement constraints to ensure data integrity:</p>
      <ul>
        <li>Use the smallest data type that fits your needs</li>
        <li>Implement foreign key constraints</li>
        <li>Use check constraints for data validation</li>
        <li>Consider using enums for limited value sets</li>
      </ul>
      
      <h2>Scalability Considerations</h2>
      <p>Design your database with growth in mind. Consider partitioning strategies, replication options, and caching layers from the beginning.</p>
      
      <h2>Security by Design</h2>
      <p>Implement security measures at the database level: use appropriate user permissions, encrypt sensitive data, and implement audit trails.</p>
    </article>`
  },
  {
    title: 'Mastering Git Workflows for Team Development',
    slug: 'mastering-git-workflows-team-development',
    url: '/blog/mastering-git-workflows-team-development/',
    category: 'DevOps',
    category_url: '/category/devops/',
    author: 'Alex Kumar',
    author_url: '/author/alex-kumar/',
    date: 'January 3, 2025',
    datetime: '2025-01-03T10:15:00+00:00',
    image: '/images/git-workflows.jpg',
    excerpt: 'Discover the best Git workflows for team collaboration and learn how to manage complex development projects efficiently.',
    content: `<article>
      <h2>Git: The Collaboration Cornerstone</h2>
      <p>Effective Git workflows are essential for successful team development. The right workflow can make the difference between smooth collaboration and constant conflicts.</p>
      
      <h2>Popular Git Workflows</h2>
      
      <h3>GitHub Flow</h3>
      <p>Simple and effective for continuous deployment:</p>
      <ol>
        <li>Create a branch from main</li>
        <li>Make changes and commit</li>
        <li>Open a pull request</li>
        <li>Review and merge</li>
      </ol>
      
      <h3>Git Flow</h3>
      <p>More structured approach with multiple branch types:</p>
      <ul>
        <li><strong>main:</strong> Production-ready code</li>
        <li><strong>develop:</strong> Integration branch</li>
        <li><strong>feature:</strong> New features</li>
        <li><strong>release:</strong> Preparing releases</li>
        <li><strong>hotfix:</strong> Critical bug fixes</li>
      </ul>
      
      <h2>Best Practices</h2>
      
      <h3>Commit Messages</h3>
      <p>Write clear, descriptive commit messages:</p>
      <pre><code>
feat: add user authentication system

- Implement JWT token generation
- Add login/logout endpoints
- Create user middleware for protected routes
      </code></pre>
      
      <h3>Branch Naming</h3>
      <p>Use consistent branch naming conventions:</p>
      <ul>
        <li>feature/user-authentication</li>
        <li>bugfix/login-error-handling</li>
        <li>hotfix/security-vulnerability</li>
      </ul>
      
      <h2>Handling Conflicts</h2>
      <p>Merge conflicts are inevitable in team development. Establish clear procedures for resolving conflicts and use tools like Visual Studio Code's built-in merge editor.</p>
      
      <h2>Code Reviews</h2>
      <p>Implement a robust code review process:</p>
      <ul>
        <li>Require at least one reviewer</li>
        <li>Use pull request templates</li>
        <li>Automate checks with CI/CD</li>
        <li>Focus on code quality, not personal preferences</li>
      </ul>
      
      <h2>Advanced Techniques</h2>
      <p>Master advanced Git techniques like interactive rebasing, cherry-picking, and bisecting to become a more efficient developer.</p>
    </article>`
  }
];

const seedBlogPosts = async () => {
  try {
    // First, update categories to match our new blog posts
    await supabase.from('categories').delete().neq('id', 0); // Clear existing categories
    
    const newCategories = [
      { name: 'Technology', slug: 'technology', description: 'Latest technology trends and innovations' },
      { name: 'Backend', slug: 'backend', description: 'Server-side development and architecture' },
      { name: 'Frontend', slug: 'frontend', description: 'User interface and client-side development' },
      { name: 'CSS', slug: 'css', description: 'Styling and layout techniques' },
      { name: 'Database', slug: 'database', description: 'Database design and management' },
      { name: 'DevOps', slug: 'devops', description: 'Development operations and deployment' }
    ];

    const { error: categoriesError } = await supabase
      .from('categories')
      .insert(newCategories);

    if (categoriesError) {
      console.error('Error seeding categories:', categoriesError);
      return;
    }

    // Insert the new blog posts into Supabase
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(newBlogPosts);

    if (error) {
      console.error('Error seeding blog posts:', error);
      return;
    }

    console.log('Successfully seeded categories and blog posts!');
    console.log(`Inserted ${newBlogPosts.length} blog posts with full content.`);
  } catch (error) {
    console.error('Error seeding blog posts:', error);
  }
};

// Run the seeding function
seedBlogPosts();