import blogGhostImage from "../assets/blog-ghost-outside-the-shell.png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ghostOutsideTheShellPost } from "../content/blog";
import { BLOG_PATH, buildAppHref, navigateTo } from "../utils/navigation";

function BlogPostPage() {
  const handleMetaClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateTo(BLOG_PATH);
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

      <main className="blog-detail-page">
        <section className="blog-detail-shell blog-detail-hero">
          <a className="blog-detail-meta-link" href={buildAppHref(BLOG_PATH)} onClick={handleMetaClick}>
            <p className="blog-detail-meta">
              <span className="blog-detail-category">{ghostOutsideTheShellPost.category}</span>
              <span className="blog-detail-date">{ghostOutsideTheShellPost.publishedAt}</span>
            </p>
          </a>

          <div className="blog-detail-title-group">
            <h1>{ghostOutsideTheShellPost.title}</h1>
            <p>{ghostOutsideTheShellPost.subtitle}</p>
          </div>
        </section>

        <article className="blog-detail-shell blog-detail-content">
          <div className="blog-detail-prose">
            {ghostOutsideTheShellPost.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <div className="blog-detail-image-wrap">
              <img className="blog-detail-image" src={blogGhostImage} alt="Ghost Outside the Shell article illustration" />
            </div>

            <h2>{ghostOutsideTheShellPost.sectionTitle}</h2>

            <p>
              Anthropic made this point well in their recent engineering post on{" "}
              <a href={ghostOutsideTheShellPost.managedAgentsHref} target="_blank" rel="noreferrer">
                managed agents
              </a>
              . They drew an analogy to operating systems: the way OS abstractions like read() and write() outlasted
              every hardware generation underneath them. The interfaces stayed stable while implementations changed
              freely.
            </p>

            {ghostOutsideTheShellPost.sectionParagraphs.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}

export default BlogPostPage;
