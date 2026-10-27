"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { SiteNav } from "@/components/SiteNav";

export default function ContactPage() {
  const { language } = useLanguage();
  const githubUrl = "https://github.com/Kokaro233/signalward-ai";
  const copy =
    language === "zh"
      ? {
          eyebrow: "联系",
          title: "联系 Caro Shao。",
          body: "SignalWard 由 Caro Shao 独立设计和构建，基于 LUCID 演进，新增独立模型证据复核。",
          project: "项目信息",
          team: "创作者：Caro Shao",
          useCase: "用途：面向反诈骗决策的认知分诊",
          status: "状态：黑客松 MVP / 可试点演示",
          later: "项目入口",
          devpost: "Devpost 提交页。",
          github: "GitHub 开源仓库",
          cloudRun: "新演示地址将在部署后提供。"
        }
      : {
          eyebrow: "Contact",
          title: "Contact Caro Shao.",
          body:
            "SignalWard was independently designed and built by Caro Shao as an evolution of LUCID, adding independent model evidence review.",
          project: "Project contact",
          team: "Creator: Caro Shao",
          useCase: "Use case: Cognitive triage for scam-resistant decisions",
          status: "Status: Hackathon MVP / pilot-ready demo",
          later: "Project links",
          devpost: "Devpost submission page.",
          github: "SignalWard open-source repository",
          cloudRun: "New demo URL pending deployment."
        };

  return (
    <main>
      <section className="page-hero contact-hero">
        <SiteNav />
        <div className="page-heading">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p>{copy.body}</p>
        </div>
      </section>
      <section className="contact-band">
        <article className="panel contact-card">
          <h2>{copy.project}</h2>
          <p>{copy.team}</p>
          <p>{copy.useCase}</p>
          <p>{copy.status}</p>
        </article>
        <article className="panel contact-card">
          <h2>{copy.later}</h2>
          <ul>
            <li>{copy.devpost}</li>
            <li>
              <a href={githubUrl} target="_blank" rel="noreferrer">
                {copy.github}
              </a>
            </li>
            <li>{copy.cloudRun}</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
