function OpenProtocolSection() {
  return (
    <section className="homepage-section protocol-section">
      <div className="section-mark section-mark-centered">Open protocol</div>

      <div className="protocol-header">
        <h2>Built on open HTTP.</h2>
        <p>POST to append, GET to read, SSE to subscribe. No SDK required.</p>
      </div>

      <div className="protocol-card">
        <pre className="protocol-code-block">
          <code>
            <span className="protocol-code-line">
              <span className="code-token-method">POST</span>{" "}
              <span className="code-token-path">/v1/sessions/{"{session_id}"}/events</span>{" "}
              <span className="code-token-comment">HTTP/1.1</span>
            </span>
            <span className="protocol-code-line">
              <span className="code-token-property">Content-Type</span>
              <span className="code-token-plain">: application/json</span>
            </span>
            <span className="protocol-code-line">&nbsp;</span>
            <span className="protocol-code-line">
              <span className="code-token-brace">{"{"}</span>
              <span className="code-token-string">"type"</span>
              <span className="code-token-plain">: </span>
              <span className="code-token-string">"tool_call"</span>
              <span className="code-token-plain">, </span>
              <span className="code-token-string">"name"</span>
              <span className="code-token-plain">: </span>
              <span className="code-token-string">"edit_file"</span>
              <span className="code-token-plain">, </span>
              <span className="code-token-string">"data"</span>
              <span className="code-token-plain">: </span>
              <span className="code-token-comment">{"{...}"}</span>
              <span className="code-token-brace">{"}"}</span>
            </span>
            <span className="protocol-code-line">&nbsp;</span>
            <span className="protocol-code-line">
              <span className="code-token-success">HTTP/1.1 204 No Content</span>
            </span>
            <span className="protocol-code-line">
              <span className="code-token-success">Stream-Next-Offset: 00000145</span>
            </span>
          </code>
        </pre>
      </div>
    </section>
  );
}

export default OpenProtocolSection;
