import blogGhostImage from "../assets/blog-ghost-outside-the-shell.png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ghostOutsideTheShellPost } from "../content/blog";
import { BLOG_GHOST_PATH, buildAppHref, navigateTo } from "../utils/navigation";

function BlogPage() {
  const handlePostClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateTo(BLOG_GHOST_PATH);
  };

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
                <h2>
                  <a className="blog-featured-title-link" href={buildAppHref(BLOG_GHOST_PATH)} onClick={handlePostClick}>
                    {ghostOutsideTheShellPost.title}
                  </a>
                </h2>
                <p>{ghostOutsideTheShellPost.summary}</p>
              </div>

              <p className="blog-featured-meta">
                <span className="blog-featured-category">{ghostOutsideTheShellPost.category}</span>
                <span className="blog-featured-date">{ghostOutsideTheShellPost.publishedAt}</span>
              </p>
            </div>

            <div className="blog-featured-image-wrap">
              <a href={buildAppHref(BLOG_GHOST_PATH)} onClick={handlePostClick}>
                <img className="blog-featured-image" src={blogGhostImage} alt="Ghost Outside the Shell article cover" />
              </a>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default BlogPage;
