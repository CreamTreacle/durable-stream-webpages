import { useEffect, useState } from "react";
import bucketIcon from "../assets/bucket.svg";
import claudeCodeIcon from "../assets/claudecode- icon-colored.svg";
import codexIcon from "../assets/codex-color-icon-colored.svg";
import openCodeIcon from "../assets/open code icon-colored.svg";
import piIcon from "../assets/pi-logo -colored.svg";
import sessionIcon from "../assets/session icon.svg";

const harnessIcons = [
  { src: claudeCodeIcon, label: "Claude Code" },
  { src: codexIcon, label: "Codex" },
  { src: openCodeIcon, label: "OpenCode" },
  { src: piIcon, label: "PI" },
];

const durableFlowChars = Array.from("------------>");
const defaultFlowIndex = 1;

function IngestionStreamSection() {
  const [activeHarnessLabel, setActiveHarnessLabel] = useState("any harness");
  const [isFlowHovered, setIsFlowHovered] = useState(false);
  const [activeFlowIndex, setActiveFlowIndex] = useState(defaultFlowIndex);
  const [fadingFlowIndex, setFadingFlowIndex] = useState<number | null>(null);

  const handleFlowAreaEnter = () => setIsFlowHovered(true);
  const handleFlowAreaLeave = () => setIsFlowHovered(false);

  useEffect(() => {
    if (!isFlowHovered) {
      setActiveFlowIndex(defaultFlowIndex);
      setFadingFlowIndex(null);
      return;
    }

    let nextIndexTimer: number | undefined;

    const fadeTimer = window.setTimeout(() => {
      setFadingFlowIndex(activeFlowIndex);

      nextIndexTimer = window.setTimeout(() => {
        setActiveFlowIndex((previousIndex) => (previousIndex + 1) % durableFlowChars.length);
        setFadingFlowIndex(null);
      }, 50);
    }, 250);

    return () => {
      window.clearTimeout(fadeTimer);
      if (nextIndexTimer !== undefined) {
        window.clearTimeout(nextIndexTimer);
      }
    };
  }, [activeFlowIndex, isFlowHovered]);

  return (
    <section className="homepage-section ingestion-section">
      <div className="ingestion-inner">
        <div className="section-mark ingestion-mark">Ingestion and stream</div>

        <div className="ingestion-grid">
          <div className="ingestion-copy-block">
            <div className="ingestion-title" role="heading" aria-level={2}>
              <p>Ingest coding agent sessions from</p>
              <p>
                <span className="ingestion-title-dynamic" aria-live="polite">
                  <span className="ingestion-title-dynamic-text" key={activeHarnessLabel}>
                    {activeHarnessLabel}
                  </span>
                </span>
              </p>
            </div>
          </div>

          <div
            className="harness-tile-row"
            aria-label="Supported harnesses"
            onMouseLeave={() => setActiveHarnessLabel("any harness")}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setActiveHarnessLabel("any harness");
              }
            }}
          >
            {harnessIcons.map((icon) => (
              <button
                className={`harness-tile${activeHarnessLabel === icon.label ? " is-active" : ""}`}
                key={icon.label}
                type="button"
                aria-label={icon.label}
                onMouseEnter={() => setActiveHarnessLabel(icon.label)}
                onFocus={() => setActiveHarnessLabel(icon.label)}
              >
                <img src={icon.src} alt="" />
              </button>
            ))}
          </div>

          <div
            className="durable-flow-card"
            aria-hidden="true"
            onMouseEnter={handleFlowAreaEnter}
            onMouseLeave={handleFlowAreaLeave}
          >
            <div className="durable-flow-icon">
              <img src={sessionIcon} alt="" />
            </div>
            <p className="durable-flow-arrow">
              {durableFlowChars.map((char, index) => (
                <span
                  className={[
                    "durable-flow-arrow-char",
                    index === activeFlowIndex ? "durable-flow-arrow-char-active" : "",
                    index === fadingFlowIndex ? "durable-flow-arrow-char-fading" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={`${char}-${index}`}
                >
                  {char === ">" ? "\u003e" : char}
                </span>
              ))}
            </p>
            <div className="durable-flow-icon">
              <img src={bucketIcon} alt="" />
            </div>
          </div>

          <div
            className="ingestion-copy-block ingestion-copy-block-secondary"
            onMouseEnter={handleFlowAreaEnter}
            onMouseLeave={handleFlowAreaLeave}
          >
            <h3>Durable in your S3</h3>
            <p>
              Session data lives in its own isolated bucket. Export your data or
              migrate at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IngestionStreamSection;
