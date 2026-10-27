"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { usePathname } from "next/navigation";

export function SiteNav() {
  const { language, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const copy =
    language === "zh"
      ? {
          brand: "SignalWard",
          tag: "证据优先 · 独立复核",
          cases: "案例",
          workflow: "流程",
          agent: "调查",
          saved: "记录",
          contact: "联系",
          switch: "EN"
        }
      : {
          brand: "SignalWard",
          tag: "Evidence-first safety",
          cases: "Cases",
          workflow: "Workflow",
          agent: "Investigate",
          saved: "Saved",
          contact: "Contact",
          switch: "中文"
        };

  return (
    <nav className="nav sticky-nav">
      <div className="nav-primary">
        <a className="brand" href="/">
          <img src="/signalward-icon.svg" alt="" aria-hidden="true" />
          {copy.brand}
        </a>
        <span className="nav-tagline">{copy.tag}</span>
        <button className="language-toggle" type="button" onClick={toggleLanguage}>
          {copy.switch}
        </button>
      </div>
      <div className="nav-links">
        {[
          ["/cases", copy.cases],
          ["/workflow", copy.workflow],
          ["/agent", copy.agent],
          ["/saved", copy.saved],
          ["/contact", copy.contact]
        ].map(([href, label]) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <a className={active ? "active" : ""} aria-current={active ? "page" : undefined} href={href} key={href}>
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
