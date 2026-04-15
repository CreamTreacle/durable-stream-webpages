const searchResults = [
  {
    session: "backend-agent-a1b2",
    age: "5h ago",
    events: [
      { id: "# 847", kind: "tool_call", tone: "tool", detail: "create webhook endpoint" },
      { id: "# 851", kind: "message", tone: "message", detail: '"using raw body for verify"' },
    ],
  },
  {
    session: "debug-agent-c3d4",
    age: "3m ago",
    events: [
      { id: "# 112", kind: "tool_call", tone: "tool", detail: "create webhook endpoint" },
      { id: "# 115", kind: "error", tone: "error", detail: '"signature verification failed"' },
    ],
  },
];

function SearchHistorySection() {
  return (
    <section className="homepage-section search-history-section">
      <div className="search-history-copy">
        <div className="section-mark">Searchable history</div>
        <div className="search-history-header">
          <h2>BM25-ranked search across session history</h2>
          <p>Build context from relevant events, not just the last N.</p>
        </div>
      </div>

      <div className="search-window">
        <div className="search-window-top" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="search-window-body">
          <div className="search-input-shell">
            <div className="search-input-icon" aria-hidden="true" />
            <span className="search-input-text">
              stripe webhook handler
              <span className="search-input-cursor" aria-hidden="true" />
            </span>
            <span className="search-input-clear" aria-hidden="true">✕</span>
          </div>

          <p className="search-result-summary">4 events · 2 sessions · 18,402 indexed</p>

          <div className="search-result-list">
            {searchResults.map((result) => (
              <article className="search-result-card" key={result.session}>
                <div className="search-result-session">
                  <div className="search-session-badge">SESSION</div>
                  <p className="search-session-name">{result.session}</p>
                  <p className="search-session-age">{result.age}</p>
                </div>

                <div className="search-event-list">
                  {result.events.map((event) => (
                    <div className="search-event-row" key={`${result.session}-${event.id}`}>
                      <div className="search-event-meta">
                        <span className="search-event-id">{event.id}</span>
                        <span className={`search-event-kind search-event-kind-${event.tone}`}>{event.kind}</span>
                      </div>
                      <p className={`search-event-detail search-event-detail-${event.tone}`}>{event.detail}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchHistorySection;
