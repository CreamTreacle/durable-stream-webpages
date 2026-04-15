import { buildAppHref, getBlogPostPath, getDocsPagePath, navigateTo } from "../utils/navigation";

function Hero() {
  const quickstartPath = getDocsPagePath("quickstart");
  const thesisPath = getBlogPostPath("ghost-outside-the-shell");

  const handleInternalClick =
    (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      navigateTo(path);
    };

  return (
    <section className="hero-section">
      <div className="hero-lines" aria-hidden="true" />
      <div className="hero-content">
        <h1>Sessions outlive the harness</h1>
        <p>
          <span>Persist agent events in remote streams</span>
          <span>and resume execution for long-running agents.</span>
        </p>
        <div className="hero-actions">
          <a
            className="button button-terminal button-terminal-primary hero-primary-cta"
            href={buildAppHref(quickstartPath)}
            onClick={handleInternalClick(quickstartPath)}
          >
            [ Get started ]
          </a>
          <a
            className="hero-secondary-cta"
            href={buildAppHref(thesisPath)}
            onClick={handleInternalClick(thesisPath)}
          >
            Read the post →
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
