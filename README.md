# dsh-plugin-periodic-model-select

把 DSH 输入框右下角的模型下拉（`conversation.input.model`）换成**元素周期表**式展开面板：按 provider 分族成行、六边形元素块铺开、点击有波纹与发光特效、推理等级用可拖动滑块调整。

## 界面

- **周期表布局**：每个 provider 占一行，左侧是族号（`01`、`02`…）+ provider 名，行内按原子序数排列六边形元素块。像元素周期表一样一眼看全，不用在长列表里往下滚。
- **六边形元素块**：六边形里只放原子序数（`01`、`02`…），**完整模型名就贴在六边形正下方**（最多 3 行），所以不需要靠缩写去猜是哪个模型。每个 provider 一种主色，六边形与下方名字同色系。
- **点击特效**：点击时六边形内部扩散一圈波纹 + 元素块缩放脉冲；选中的元素块带持续呼吸光晕与外发光边线，选中面板会等波纹播完（240ms）再收起。
- **推理等级滑块**：面板底部右侧是一条 Codex 风格滑条，左右端显示最低/最高档位，当前档位在标题行右侧实时显示；拖动或键盘左右键即时生效，面板保持打开。
- **筛选与图例**：顶部搜索框会把不匹配的元素块就地淡化（保留周期表位置，不重排）；provider 图例胶囊可单个筛选。

### 底部详情条

底部左侧是一枚**单行详情胶囊**：小圆点（provider 主色）+ 完整模型名 + `· provider · #序号`。鼠标停在任意六边形上时它会预览那个模型，移开恢复当前选中项。

**点一下这枚胶囊**会把当前模型的 model id 复制到剪贴板（成功/失败都会弹一条 Toast 说明），长 id 不必在面板里常驻占位。触发器（输入框右下角那个按钮）也去掉了六边形图标，只保留模型名 + 推理等级 + 折角。

## 安装

```bash
dsh plugin --profile desktop add /xx/dsh-plugin-periodic-model-select
```

安装后重启 DSH 客户端生效。本插件以 `priority: -10` 注册在 `conversation.input.model` 槽位，无侵入地覆盖内置 `ModelSelect`，复用 `ctx.modelDirectories`，`/model` 命令不受影响。

临时试用可以只挂 patch：

```bash
dsh web --patch /xx/dsh-plugin-periodic-model-select/cordis.patch.yml
```

## 实现要点

- `lib/client.js` 是纯客户端插件：通过 `window.__ModuleLoader__.load({ id, factory })` 注册，`inject = ["slots", "modelDirectories", "locale", "sessions"]`。
- 样式由插件自己注入 `<style data-plugin-css="…">`，配色使用 `color-mix(in srgb, var(--pt-accent) …, var(--dsw-alias-bg-layer-1))`，暗色/浅色主题都成立。
- `lib/index.js` 是 host 侧空实现（`apply() {}`），插件没有后端逻辑。
- `cordis.patch.yml` 必须是顶层 YAML 数组 + `- insert:` 条目，否则安装会被拒绝。

## 校验

`lib/client.js` 经过 `node --check`、CSS 类完整性检查（51 个类定义与使用一一对应），以及在 jsdom 中用真实 React 18 渲染的 **36 项**冒烟测试：触发器（已无图标、仍显示模型名）、分行布局、六边形双层结构、六边形内为原子序数而非缩写、六边形下方为完整模型名（不截断）、Codex 滑条（刻度/星尘/键盘提交）、点击波纹、选后延迟收起、底部详情条常显全名 + hover 预览 + 点击复制 Toast、搜索淡化、Esc 关闭。

`preview/` 下是本地渲染的静态预览：`panel-dark.png`（暗色常态）、`panel-dark-hover.png`（hover 预览其它模型）、`panel-light.png`（浅色）、`panel-real-names.png`（用真实长模型名检验换行）、`trigger-dark.png`（触发器）。由 `/tmp/dsh-pt-test` 下的预览脚本生成。
