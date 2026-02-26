import * as React from "react";

const NAV_COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Learn", href: "#" },
      { label: "Sell", href: "#" },
      { label: "Buyer Network", href: "#" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Find Buyers", href: "#" },
      { label: "Valuation Tool", href: "#" },
      { label: "Market Comps", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "LinkedIn", href: "#", external: true },
      { label: "X", href: "#", external: true },
    ],
  },
];

const LandingFooter: React.FC = () => {
  return (
    <footer
      style={{
        position: "relative",
        backgroundColor: "#0A0A0A",
        color: "#E8E8E8",
        overflow: "hidden",
        fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* Background Watermark */}
      <span
        aria-hidden="true"
        style={{
          pointerEvents: "none",
          userSelect: "none",
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "20vw",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          color: "#ffffff",
          opacity: 0.03,
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        BIB
      </span>

      {/* Top Row */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px 64px 16px",
        }}
      >
        {/* Logo + Location */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#ffffff",
            }}
          >
            BIB
          </span>
          <span style={{ fontSize: "13px", color: "#888888", fontWeight: 300 }}>
            New York, NY
          </span>
        </div>

        {/* Hamburger Icon */}
        <button
          aria-label="Open menu"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "8px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span style={{ display: "block", width: "24px", height: "1.5px", backgroundColor: "#E8E8E8" }} />
          <span style={{ display: "block", width: "16px", height: "1.5px", backgroundColor: "#E8E8E8" }} />
          <span style={{ display: "block", width: "20px", height: "1.5px", backgroundColor: "#E8E8E8" }} />
        </button>
      </div>

      {/* Divider */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          margin: "0 64px",
          borderTop: "1px solid #1E1E1E",
        }}
      />

      {/* Main Footer Grid */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "32px",
          padding: "80px 64px",
        }}
      >
        {NAV_COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3
              style={{
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "#666666",
                marginBottom: "24px",
              }}
            >
              {col.title}
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    style={{
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "#D4D4D4",
                      textDecoration: "none",
                      transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.6"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom Legal Bar */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          margin: "0 64px",
          borderTop: "1px solid #1E1E1E",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          padding: "32px 64px",
        }}
      >
        <p style={{ fontSize: "13px", color: "#555555", fontWeight: 300, margin: 0 }}>
          Copyright &copy; 2024 BIB, Inc. | All Rights Reserved
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {[
            { label: "Terms of Service", href: "#" },
            { label: "Privacy Policy", href: "#" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: "13px",
                color: "#555555",
                fontWeight: 300,
                textDecoration: "none",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.6"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
