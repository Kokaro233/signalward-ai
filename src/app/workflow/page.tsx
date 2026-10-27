"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { SiteNav } from "@/components/SiteNav";

export default function WorkflowPage() {
  const { language } = useLanguage();
  const copy =
    language === "zh"
      ? {
          eyebrow: "Agent 流程",
          title: "先冷静，再分析，最后由用户决定行动。",
          body: "SignalWard 专门面向那种骗子让你不敢搜索、不敢告诉别人的时刻。",
          steps: [
            ["01", "冷静", "先提醒用户：现在不需要回复、付款，也不需要一个人保守秘密。"],
            ["02", "提交", "用户上传截图、粘贴文字或电话转写。SignalWard 不会偷偷监控聊天。"],
            ["03", "感知", "Qwen 提取可见文字、威胁、期限、金钱要求和保密压力。"],
            ["04", "独立复核", "Nebius 上的 NVIDIA Nemotron 不接收 Qwen 风险结论，审核原文及提取证据。截图复核依赖 Qwen 的提取。"],
            ["05", "协调", "程序显示分歧并保留更谨慎的等级；复核失败会明确标注。"],
            ["06", "安全行动", "安全回复、证据摘要和核实步骤都由用户自己控制。"]
          ]
        }
      : {
          eyebrow: "Agent workflow",
          title: "Calm first, analyze second, act only with the user.",
          body:
            "SignalWard is designed around the moment when a scammer tries to make searching or telling someone feel dangerous.",
          steps: [
            ["01", "Calm", "SignalWard first tells the user they do not need to reply, pay, or keep the secret alone."],
            ["02", "Submit", "The user uploads a screenshot, pastes text, or adds a call transcript. SignalWard never monitors chats silently."],
            ["03", "Perceive", "Qwen extracts visible text, threats, deadlines, money requests, and secrecy pressure."],
            ["04", "Independent review", "NVIDIA Nemotron on Nebius reviews original text and extracted evidence without seeing Qwen’s risk conclusion. Screenshot review depends on Qwen’s extraction."],
            ["05", "Reconcile", "Code compares the two judgments, shows disagreements, and retains the higher caution level. A failed review is explicitly marked unavailable."],
            ["06", "Act safely", "Safe replies, evidence summaries, and verification steps stay under user control."]
          ]
        };

  return (
    <main>
      <section className="page-hero compact-hero">
        <SiteNav />
        <div className="page-heading">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p>{copy.body}</p>
        </div>
      </section>
      <section className="workflow-band standalone">
        <div className="workflow-grid detail-grid">
          {copy.steps.map(([number, title, body]) => (
            <article className="workflow-step detail-step" key={title}>
              <span>{number}</span>
              <strong>{title}</strong>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
