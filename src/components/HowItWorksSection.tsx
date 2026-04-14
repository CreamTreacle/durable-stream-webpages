import arrowIcon from "../assets/Arrow .svg";

const steps = [
  {
    title: "Connect",
    description: "Point Tonbo at your agent. One command or API call.",
  },
  {
    title: "Work",
    description: "Every event streams to Tonbo automatically.",
  },
  {
    title: "Resume",
    description: "Pick up where you left off even when sandbox dies.",
  },
  {
    title: "Search",
    description: "Find any event across any session.",
  },
];

function HowItWorksSection() {
  return (
    <section className="homepage-section how-it-works-section" id="how-it-works">
      <p className="section-caption">How it works</p>

      <div className="how-it-works-grid">
        {steps.map((step, index) => (
          <div className="how-it-works-cell" key={step.title}>
            <article className="how-it-works-card">
              <h2>{step.title}</h2>
              <p>{step.description}</p>
            </article>

            {index < steps.length - 1 ? (
              <div className="how-it-works-gap" aria-hidden="true">
                <div className="how-it-works-arrow-pair">
                  <img src={arrowIcon} alt="" />
                  <img src={arrowIcon} alt="" />
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorksSection;
