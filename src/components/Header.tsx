import durableSessionLogo from "../assets/durable session T logo.svg";
import { buildAppHref, isInternalAppPath, navigateTo } from "../utils/navigation";

type HeaderNavItem = {
  label: string;
  href?: string;
  active?: boolean;
  caret?: boolean;
  disabled?: boolean;
};

type HeaderProps = {
  navItems: HeaderNavItem[];
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
};

function Header({ navItems, ctaHref = "#waitlist", ctaLabel = "Book Demo", className }: HeaderProps) {
  const handleLinkClick = (href: string) => (event: React.MouseEvent<HTMLElement>) => {
    if (!isInternalAppPath(href)) {
      return;
    }

    event.preventDefault();
    navigateTo(href);
  };

  return (
    <header className={className ? `site-header ${className}` : "site-header"}>
      <div className="header-primary">
        <a
          className="header-brand"
          aria-label="Durable Session"
          href={buildAppHref("/")}
          onClick={handleLinkClick("/")}
        >
          <img className="header-brand-logo" src={durableSessionLogo} alt="" />
          <span className="header-brand-divider" aria-hidden="true">
            |
          </span>
          <span className="header-brand-wordmark" onClick={handleLinkClick("/")}>
            <span className="header-brand-wordmark-accent">Durable</span>
            <span className="header-brand-wordmark-primary"> Session</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) =>
            item.href && !item.disabled ? (
              <a
                key={item.label}
                className={item.active ? "nav-link nav-link-active" : "nav-link"}
                href={isInternalAppPath(item.href) ? buildAppHref(item.href) : item.href}
                onClick={handleLinkClick(item.href)}
                aria-current={item.active ? "page" : undefined}
              >
                <span>{item.label}</span>
                {item.caret ? <span className="nav-caret" aria-hidden="true" /> : null}
              </a>
            ) : (
              <span
                key={item.label}
                className={item.active ? "nav-link nav-link-active nav-link-disabled" : "nav-link nav-link-disabled"}
                aria-disabled="true"
              >
                <span>{item.label}</span>
                {item.caret ? <span className="nav-caret" aria-hidden="true" /> : null}
              </span>
            ),
          )}
        </nav>
      </div>

      <div className="header-actions">
        <a
          className="button button-primary button-header button-header-terminal"
          href={isInternalAppPath(ctaHref) ? buildAppHref(ctaHref) : ctaHref}
          onClick={handleLinkClick(ctaHref)}
        >
          {ctaLabel}
        </a>
      </div>
    </header>
  );
}

export default Header;
