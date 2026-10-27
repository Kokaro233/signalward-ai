# SignalWard

基于 LUCID 演进的双模型反诈骗证据复核工具。Qwen 负责主分析，Nebius Token Factory 上的 NVIDIA Nemotron 负责独立复核，确定性协调层负责展示一致、分歧与复核失败。

## 本地运行

需要 Node.js 20+。执行 `npm ci`，把 `.env.example` 复制为 `.env.local`。原 LUCID 的 Qwen 配置使用 `qwen3-vl-plus`，并兼容 `QWEN_API_KEY` 或 `DASHSCOPE_API_KEY`。配置 Nebius Key 后，运行 `npm run models:nebius` 查出账号当前可用的 Nemotron 模型 ID，再填入 `NEBIUS_MODEL`。最后运行 `npm run dev`。

模型密钥只保存在服务端。截图复核依赖 Qwen 提取的文字，Nemotron 并没有独立查看图片；AI 判断也不等于身份或事实认证。更多说明见英文 [README](README.md)、[项目演进](docs/project-evolution.md) 与 [评估说明](docs/evaluation.md)。
