import githubIcon from "../assets/Social icon-GitHub.svg";
import linkedInIcon from "../assets/Social icon-linkedIn.svg";
import xIcon from "../assets/Social icon-X.svg";
import { buildAppHref, isInternalAppPath, navigateTo } from "../utils/navigation";

type FooterLink = {
  label: string;
  href?: string;
};

const footerColumns = [
  {
    title: "Product",
    links: [{ label: "Pricing", href: "/pricing" }] satisfies FooterLink[],
  },
  {
    title: "Company",
    links: [
      { label: "Blogs", href: "/blogs" },
      { label: "Contact Us", href: "mailto:contact@tonbo.io" },
    ] satisfies FooterLink[],
  },
] as const;

function Footer() {
  const handleLinkClick = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isInternalAppPath(href)) {
      return;
    }

    event.preventDefault();
    navigateTo(href);
  };

  return (
    <footer className="site-footer" id="waitlist">
      <div className="footer-brand-column">
        <p className="footer-brand-title">Durable Sessions</p>

        <div className="footer-social-block">
          <p className="footer-section-label">Socials</p>
          <div className="footer-social-links" aria-label="Social links">
            <a
              className="footer-social-link"
              href="https://x.com/tonboio"
              aria-label="X (Twitter)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={xIcon} alt="" />
            </a>
            <a
              className="footer-social-link"
              href="https://www.linkedin.com/company/104844714"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedInIcon} alt="" />
            </a>
            <a
              className="footer-social-link"
              href="https://github.com/tonbo-io"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="" />
            </a>
          </div>
        </div>

        <p className="footer-copyright">© 2026 Tonbo IO Inc.</p>
      </div>

      <div className="footer-nav-columns">
        {footerColumns.map((column) => (
          <div className="footer-nav-column" key={column.title}>
            <p className="footer-nav-title">{column.title}</p>
            <div className="footer-nav-links">
              {column.links.map((link) =>
                link.href ? (
                  <a
                    key={link.label}
                    className="footer-nav-link"
                    href={isInternalAppPath(link.href) ? buildAppHref(link.href) : link.href}
                    onClick={handleLinkClick(link.href)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <span className="footer-nav-link footer-nav-link-muted" key={link.label}>
                    {link.label}
                  </span>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
