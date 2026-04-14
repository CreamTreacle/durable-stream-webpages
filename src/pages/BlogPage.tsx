import blogGhostImage from "../assets/blog-ghost-outside-the-shell.png";
import Footer from "../components/Footer";
import Header from "../components/Header";

const featuredArticle = {
  title: "Ghost Outside the Shell",
  description:
    "Our research teams investigate the safety, inner workings, and societal impacts of AI models – so that artificial intelligence has a positive impact as it becomes increasingly capable.",
  category: "Think Notes",
  publishedAt: "April 13, 2026",
};

function BlogPage() {
  return (
    <>
      <Header
        navItems={[
          { label: "Pricing", href: "/pricing" },
          { label: "Docs", disabled: true },
          { label: "Blog", href: "/blog", active: true },
          { label: "Projects", disabled: true, caret: true },
        ]}
      />

      <main className="blog-page">
        <section className="blog-shell blog-overview">
          <h1>Blogs</h1>
          <p>
            Our research teams investigate the safety, inner workings, and societal impacts of AI models – so that
            artificial intelligence has a positive impact as it becomes increasingly capable.
          </p>
        </section>

        <section className="blog-shell blog-featured">
          <article className="blog-featured-article">
            <div className="blog-featured-copy">
              <div className="blog-featured-text">
                <h2>{featuredArticle.title}</h2>
                <p>{featuredArticle.description}</p>
              </div>

              <p className="blog-featured-meta">
                <span className="blog-featured-category">{featuredArticle.category}</span>
                <span className="blog-featured-date">{featuredArticle.publishedAt}</span>
              </p>
            </div>

            <div className="blog-featured-image-wrap">
              <img className="blog-featured-image" src={blogGhostImage} alt="Ghost Outside the Shell article cover" />
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default BlogPage;
