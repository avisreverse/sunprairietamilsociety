import { useTranslations } from "next-intl";
import Link from "next/link";

/**
 * Site footer — dark (#080808), Tamil brand in gold, English below, nav columns.
 * Bottom strip: copyright left, Purananuru quote right in gold Tamil.
 * Accepts optional foundingYear prop (from site_settings via page.tsx server fetch).
 * Falls back to "2012" if not provided.
 * @see REQ-202603-001 — Landing page
 * @see REQ-202603-010 — Admin-editable home page content
 */
export default function Footer({ foundingYear = "2012" }: { foundingYear?: string }) {
  const t = useTranslations("footer");

  return (
    <footer
      style={{
        background: "#080808",
        padding: "4rem 6rem 2.5rem",
      }}
      className="px-6 md:px-24"
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "3rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
          className="flex-col md:flex-row"
        >
          {/* Brand + description */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-tamil)",
                fontSize: "1.4rem",
                color: "#D4930A",
                marginBottom: "0.5rem",
              }}
            >
              {t("brandTa")}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "0.9rem",
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.75)",
                marginBottom: "0.75rem",
              }}
            >
              {t("brandEn")}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "0.84rem",
                color: "rgba(255,255,255,0.58)",
                lineHeight: 1.75,
                maxWidth: "280px",
              }}
            >
              {/* foundingYear is fetched from site_settings so admin changes reflect here */}
              Tamil culture, alive in Wisconsin since {foundingYear}. A volunteer-run community of families.
            </p>
          </div>

          {/* Nav columns */}
          <div
            style={{ display: "flex", gap: "4rem" }}
            className="flex-col sm:flex-row gap-8"
          >
            {/* Programs */}
            <div>
              <p
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "1rem",
                }}
              >
                {t("programs")}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {(
                  [
                    "tamilSchool",
                    "library",
                    "pattarai",
                    "musicClub",
                    "volunteer",
                  ] as const
                ).map((key) => (
                  <li key={key}>
                    <Link
                      href="#mullai"
                      style={{
                        fontSize: "0.88rem",
                        color: "rgba(255,255,255,0.65)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                    >
                      {t(`links.${key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <p
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "1rem",
                }}
              >
                {t("community")}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {(
                  [
                    "activityFeed",
                    "achievementWall",
                    "helpBoard",
                    "events",
                  ] as const
                ).map((key) => (
                  <li key={key}>
                    <Link
                      href="#"
                      style={{
                        fontSize: "0.88rem",
                        color: "rgba(255,255,255,0.65)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                    >
                      {t(`links.${key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="flex-col sm:flex-row gap-4"
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "0.76rem",
              color: "rgba(255,255,255,0.42)",
            }}
          >
            {t("copyright")}
          </p>
          <p
            style={{
              fontFamily: "var(--font-tamil)",
              fontSize: "0.85rem",
              color: "rgba(212,147,10,0.55)",
            }}
          >
            {t("kural")}
          </p>
        </div>
      </div>
    </footer>
  );
}
