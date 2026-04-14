function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-lines" aria-hidden="true" />
      <div className="hero-content">
        <h1>Sessions outlive harness</h1>
        <p>
          <span>Persist agent events in remote streams</span>
          <span>and resume execution for long running agents.</span>
        </p>
        <div className="hero-actions">
          <a className="button button-terminal button-terminal-primary hero-primary-cta" href="#waitlist">
            [ Book a demo ]
          </a>
          <a className="hero-secondary-cta" href="#how-it-works">
            How it Works →
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
