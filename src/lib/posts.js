// Blog post data - in a real app, this would come from a database or CMS
const posts = [
  {
    id: 1,
    slug: "the-future-of-web-development",
    title: "The Future of Web Development: What to Expect in 2026",
    excerpt:
      "Web development is evolving rapidly. From AI-assisted coding to edge computing, discover the trends that are shaping how we build for the web.",
    content: `
      <p>The landscape of web development is undergoing a seismic shift. As we move deeper into 2026, several key trends are emerging that will fundamentally change how we build, deploy, and interact with web applications.</p>
      
      <h2>AI-Assisted Development</h2>
      <p>Artificial intelligence has moved beyond simple code completion. Modern AI tools now understand entire codebases, suggest architectural improvements, and can even generate complete features from natural language descriptions. This doesn't replace developers — it amplifies their capabilities, allowing them to focus on creative problem-solving rather than boilerplate code.</p>
      
      <p>The most exciting development is the emergence of AI pair programming tools that understand context deeply. They can reason about your application's state management, predict potential bugs, and suggest optimizations that would take hours of manual code review to identify.</p>
      
      <h2>Edge Computing Revolution</h2>
      <p>Server-side rendering is being reimagined through edge computing. Instead of rendering pages in a single data center, applications now render at the edge — geographically closer to users. This dramatically reduces latency and improves the perceived performance of web applications.</p>
      
      <p>Frameworks like Next.js have been at the forefront of this revolution, making it trivially easy to deploy server-rendered applications that run at the edge. The result is web applications that feel instantaneous, regardless of where your users are located.</p>
      
      <h2>The Rise of Server Components</h2>
      <p>React Server Components have matured significantly. They allow developers to build applications where the server does the heavy lifting — fetching data, processing business logic, and rendering HTML — while only shipping the minimal JavaScript needed for interactivity to the client.</p>
      
      <p>This paradigm shift means faster page loads, better SEO, and improved accessibility. It's a win for everyone: developers get a better development experience, and users get faster, more reliable applications.</p>
      
      <h2>Looking Ahead</h2>
      <p>The future of web development is bright. With these advancements, the web platform continues to be the most accessible, most powerful, and most democratic platform for building software. The tools are getting better, the frameworks are getting smarter, and the possibilities are endless.</p>
    `,
    author: {
      name: "Sarah Chen",
      avatar: "SC",
      bio: "Senior Frontend Engineer & Tech Writer",
    },
    category: "Technology",
    readTime: "8 min read",
    date: "Apr 10, 2026",
    featured: true,
    claps: 2847,
  },
  {
    id: 2,
    slug: "designing-for-accessibility",
    title: "Designing for Accessibility: A Comprehensive Guide",
    excerpt:
      "Accessibility isn't just a nice-to-have — it's essential. Learn how to build inclusive web experiences that work for everyone.",
    content: `
      <p>When we talk about web accessibility, we're talking about ensuring that everyone — regardless of their abilities or disabilities — can perceive, understand, navigate, and interact with the web. It's not just about compliance; it's about human dignity.</p>

      <h2>Understanding the Landscape</h2>
      <p>Over one billion people worldwide live with some form of disability. This includes visual impairments, hearing loss, motor difficulties, and cognitive disabilities. When we build inaccessible websites, we're excluding a significant portion of the global population.</p>

      <p>But accessibility benefits everyone. Curb cuts, originally designed for wheelchair users, are now used by parents with strollers, travelers with luggage, and delivery workers with carts. The same principle applies to the web: accessible design improves the experience for all users.</p>

      <h2>Core Principles</h2>
      <p>The Web Content Accessibility Guidelines (WCAG) are built on four principles, often remembered by the acronym POUR:</p>
      
      <p><strong>Perceivable:</strong> Information must be presentable in ways that users can perceive. This means providing text alternatives for non-text content, captions for audio, and sufficient color contrast.</p>
      
      <p><strong>Operable:</strong> Users must be able to operate the interface. All functionality should be available from a keyboard, users should have enough time to read content, and navigation should be predictable.</p>
      
      <p><strong>Understandable:</strong> Content and operation of the interface must be understandable. Use clear language, make behaviors predictable, and help users avoid and correct mistakes.</p>
      
      <p><strong>Robust:</strong> Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.</p>
      
      <h2>Practical Implementation</h2>
      <p>Start with semantic HTML. Use the right elements for their intended purpose: headings for headings, buttons for actions, links for navigation. This single practice solves a remarkable number of accessibility issues.</p>
      
      <p>Add ARIA attributes sparingly and correctly. ARIA is powerful, but incorrect ARIA is worse than no ARIA. The first rule of ARIA is: if you can use a native HTML element, do so.</p>
      
      <h2>The Path Forward</h2>
      <p>Accessibility is a journey, not a destination. Start where you are, audit your current applications, and make incremental improvements. Every step toward accessibility is a step toward a more inclusive web.</p>
    `,
    author: {
      name: "Marcus Johnson",
      avatar: "MJ",
      bio: "UX Designer & Accessibility Advocate",
    },
    category: "Design",
    readTime: "12 min read",
    date: "Apr 8, 2026",
    featured: false,
    claps: 1923,
  },
  {
    id: 3,
    slug: "mastering-react-server-components",
    title: "Mastering React Server Components: A Deep Dive",
    excerpt:
      "React Server Components represent a paradigm shift in how we think about rendering. Here's everything you need to know to master them.",
    content: `
      <p>React Server Components (RSC) are perhaps the most significant evolution in React since hooks. They fundamentally change the mental model of how React applications are built, moving us toward a world where the server and client work together seamlessly.</p>

      <h2>The Mental Model</h2>
      <p>Think of Server Components as components that execute on the server. They can directly access databases, file systems, and internal services. They never ship JavaScript to the client. They're rendered once, on the server, and their output is streamed to the client as HTML and a special serialized format.</p>
      
      <p>Client Components, marked with the 'use client' directive, are the components we've always known. They can use state, effects, and browser APIs. The key insight is that most of your application probably doesn't need client-side interactivity.</p>

      <h2>Data Fetching Simplified</h2>
      <p>One of the most powerful aspects of Server Components is how they simplify data fetching. Instead of useEffect calls, loading states, and complex state management for async data, you simply make your component async and await your data.</p>
      
      <p>This eliminates entire categories of bugs: race conditions, stale closures, waterfall requests, and the infamous "flash of loading state." Your component simply has its data when it renders.</p>

      <h2>Composition Patterns</h2>
      <p>The real power emerges in how Server and Client Components compose together. Server Components can render Client Components, passing server-fetched data as props. Client Components can render Server Components through the children prop, creating a powerful interleaving pattern.</p>
      
      <p>This composition model lets you push interactivity to the edges of your component tree, keeping the majority of your application as lightweight Server Components.</p>

      <h2>Performance Implications</h2>
      <p>The performance benefits are substantial. By moving rendering to the server, you reduce the JavaScript bundle sent to the client, eliminate client-side data fetching waterfalls, and leverage the server's proximity to your data sources. The result is applications that load faster and feel more responsive.</p>
    `,
    author: {
      name: "Sarah Chen",
      avatar: "SC",
      bio: "Senior Frontend Engineer & Tech Writer",
    },
    category: "Technology",
    readTime: "10 min read",
    date: "Apr 5, 2026",
    featured: false,
    claps: 3412,
  },
  {
    id: 4,
    slug: "psychology-of-user-interfaces",
    title: "The Psychology Behind Great User Interfaces",
    excerpt:
      "Understanding human psychology is the key to designing interfaces that feel intuitive. Explore the cognitive principles that drive great UX.",
    content: `
      <p>Every great user interface is, at its core, a conversation between human psychology and digital design. The best interfaces don't just look good — they feel right. They align with how our brains naturally process information, make decisions, and form habits.</p>

      <h2>Cognitive Load Theory</h2>
      <p>Our working memory is limited. Cognitive psychology tells us we can hold roughly 4-7 chunks of information in working memory at any time. Great interfaces respect this limitation. They present information progressively, group related elements, and eliminate unnecessary complexity.</p>
      
      <p>Progressive disclosure — showing only the most important options first and revealing additional functionality on demand — is one of the most powerful patterns for managing cognitive load. It's why the best productivity tools feel simple despite being incredibly powerful.</p>

      <h2>The Power of Recognition Over Recall</h2>
      <p>Human brains are remarkably good at recognition but relatively poor at recall. This is why dropdown menus, auto-complete suggestions, and visual search results work so well. They transform the difficult cognitive task of remembering into the much easier task of recognizing.</p>
      
      <p>Apple's design language exemplifies this principle. Icons are metaphors for real-world objects. Interactions mimic physical gestures. The interface becomes an extension of our natural understanding of the world.</p>

      <h2>Emotional Design</h2>
      <p>Don Norman, in his seminal work "Emotional Design," identifies three levels of design processing: visceral (immediate emotional response), behavioral (the experience of use), and reflective (the meaning we assign after the fact).</p>
      
      <p>The most beloved interfaces succeed at all three levels. They're visually appealing (visceral), delightful to use (behavioral), and make users feel competent and empowered (reflective). This emotional connection is what transforms users into advocates.</p>

      <h2>Building Habits Through Design</h2>
      <p>Nir Eyal's Hook Model describes how products can build habits: a trigger leads to an action, which produces a variable reward, followed by an investment that makes the product more valuable over time. Understanding this loop is crucial for designing engaging interfaces.</p>
    `,
    author: {
      name: "Elena Rodriguez",
      avatar: "ER",
      bio: "Product Designer at Creative Labs",
    },
    category: "Design",
    readTime: "7 min read",
    date: "Apr 3, 2026",
    featured: false,
    claps: 1567,
  },
  {
    id: 5,
    slug: "building-scalable-apis",
    title: "Building Scalable APIs: Lessons from Production",
    excerpt:
      "After years of building APIs that serve millions of requests, here are the hard-won lessons about scalability, reliability, and developer experience.",
    content: `
      <p>Building an API that serves a hundred requests per day is easy. Building one that serves a hundred million is a different challenge entirely. After years of building and maintaining APIs at scale, here are the lessons that consistently prove most valuable.</p>

      <h2>Design for the Consumer</h2>
      <p>The most common mistake in API design is building for the database rather than the consumer. Your API should model your domain, not your data storage. This means thinking carefully about resource naming, relationship modeling, and the operations your consumers actually need.</p>
      
      <p>RESTful APIs remain the gold standard for most use cases. They're predictable, cacheable, and well-understood. GraphQL has its place for complex query patterns, but the operational complexity it introduces is often underestimated.</p>

      <h2>Rate Limiting and Throttling</h2>
      <p>Rate limiting isn't just about protecting your servers — it's about fair resource allocation. Implement rate limiting at multiple levels: per-user, per-IP, and per-endpoint. Use sliding window algorithms rather than fixed windows to prevent burst traffic at window boundaries.</p>
      
      <p>Consider implementing adaptive rate limiting that adjusts based on system load. During peak traffic, you can gracefully degrade by reducing rate limits rather than failing entirely.</p>

      <h2>Versioning Strategy</h2>
      <p>API versioning is one of those decisions that seems simple but has far-reaching consequences. URL-based versioning (/v1/, /v2/) is the most explicit and easiest to understand. Header-based versioning is more elegant but harder to discover and test.</p>

      <h2>Monitoring and Observability</h2>
      <p>You can't improve what you can't measure. Instrument everything: request latency, error rates, payload sizes, and business metrics. Use structured logging that makes it easy to trace requests through your system. Implement health checks that go beyond "is the server running" to "can the server actually serve requests."</p>
    `,
    author: {
      name: "David Park",
      avatar: "DP",
      bio: "Backend Engineer & System Architect",
    },
    category: "Engineering",
    readTime: "9 min read",
    date: "Mar 30, 2026",
    featured: false,
    claps: 2156,
  },
  {
    id: 6,
    slug: "art-of-technical-writing",
    title: "The Art of Technical Writing: Communicate Complex Ideas Simply",
    excerpt:
      "Great technical writing is a superpower. Learn how to explain complex concepts clearly, whether you're writing documentation, blog posts, or RFCs.",
    content: `
      <p>Technical writing is not about dumbing things down. It's about making complex ideas accessible without losing their nuance. The best technical writers don't just explain — they illuminate.</p>

      <h2>Know Your Audience</h2>
      <p>Before writing a single word, understand who you're writing for. A blog post for senior engineers reads very differently from documentation for beginners. The gap that great technical writing bridges is the gap between what your reader knows and what they need to know.</p>
      
      <p>Create a mental model of your reader. What do they already understand? What misconceptions might they have? What are they trying to accomplish? Every sentence should either build on their existing knowledge or correct a misconception.</p>

      <h2>Structure is Everything</h2>
      <p>People don't read technical content linearly — they scan. Use headings, bullet points, and code blocks to create visual anchors. Put the most important information first. Use the inverted pyramid: start with the conclusion, then provide supporting details.</p>
      
      <p>Each section should be self-contained enough to be useful on its own. A reader who jumps directly to section 3 should be able to understand it without reading sections 1 and 2, even if reading them in order provides a richer experience.</p>

      <h2>Code Examples</h2>
      <p>In technical writing, code examples are worth more than a thousand words. But they must be complete, correct, and minimal. A good code example demonstrates exactly one concept with nothing extraneous.</p>
      
      <p>Always test your code examples. Nothing destroys credibility faster than code that doesn't work.</p>

      <h2>The Editing Process</h2>
      <p>Good writing is rewriting. Your first draft is for getting ideas on the page. Your second draft is for organizing those ideas. Your third draft is for clarity. And your fourth draft is for cutting everything that isn't essential.</p>
    `,
    author: {
      name: "Marcus Johnson",
      avatar: "MJ",
      bio: "UX Designer & Accessibility Advocate",
    },
    category: "Writing",
    readTime: "6 min read",
    date: "Mar 27, 2026",
    featured: false,
    claps: 1834,
  },
];

export function getAllPosts() {
  return posts;
}

export function getFeaturedPost() {
  return posts.find((post) => post.featured);
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category) {
  return posts.filter((post) => post.category === category);
}

export function getAllCategories() {
  return [...new Set(posts.map((post) => post.category))];
}

export function getRelatedPosts(slug, limit = 3) {
  const currentPost = getPostBySlug(slug);
  if (!currentPost) return [];
  return posts
    .filter(
      (post) =>
        post.slug !== slug && post.category === currentPost.category
    )
    .slice(0, limit);
}
