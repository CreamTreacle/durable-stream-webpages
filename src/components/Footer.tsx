import linkedInIcon from "../assets/Social icon-linkedIn.svg";
import xIcon from "../assets/Social icon-X.svg";
import { buildAppHref, navigateTo } from "../utils/navigation";

type FooterLink = {
  label: string;
  href?: string;
};

const footerColumns = [
  {
    title: "Pruduct",
    links: [{ label: "Pricing", href: "/pricing" }] satisfies FooterLink[],
  },
  {
    title: "Company",
    links: [
      { label: "Blogs" },
      { label: "Contact Us" },
    ] satisfies FooterLink[],
  },
] as const;

function Footer() {
  const handlePricingClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateTo("/pricing");
  };

  return (
    <footer className="site-footer" id="waitlist">
      <div className="footer-brand-column">
        <p className="footer-brand-title">Tonbo Session</p>

        <div className="footer-social-block">
          <p className="footer-section-label">Socials</p>
          <div className="footer-social-links" aria-label="Social links">
            <a className="footer-social-link" href="https://x.com" aria-label="X">
              <img src={xIcon} alt="" />
            </a>
            <a className="footer-social-link" href="https://www.linkedin.com" aria-label="LinkedIn">
              <img src={linkedInIcon} alt="" />
            </a>
          </div>
        </div>

        <p className="footer-copyright">@ 2026 Tonbo IO Inc.</p>
      </div>

      <div className="footer-nav-columns">
        {footerColumns.map((column) => (
          <div className="footer-nav-column" key={column.title}>
            <p className="footer-nav-title">{column.title}</p>
            <div className="footer-nav-links">
              {column.links.map((link) =>
                "href" in link ? (
                  <a
                    key={link.label}
                    className="footer-nav-link"
                    href={buildAppHref(link.href)}
                    onClick={handlePricingClick}
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
