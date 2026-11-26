window.__ModuleLoader__.load({
	id: "dsh-plugin-periodic-model-select",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

		const react = require("react");
		const react_dom = require("react-dom");
		const jsx = require("react/jsx-runtime");
		const primitives = require("@deepseek-ai/dsh-client-ui-primitives");

		const NS = "periodicModel";
		const STYLE_ID = "dsh-plugin-periodic-model-select/PeriodicModelSelect.css";

		const CSS = `
.dsh-pt-root {
	min-width: 0;
	position: relative;
}

/* ---------- trigger ---------- */
.dsh-pt-trigger {
	border-radius: 999px;
	min-width: 0;
	max-width: min(360px, 45cqw);
	height: 28px;
	color: var(--dsw-alias-label-secondary);
	cursor: pointer;
	background: transparent;
	border: none;
	outline: none;
	align-items: center;
	gap: 6px;
	padding: 0 9px;
	font-size: 13px;
	font-weight: 400;
	line-height: 20px;
	display: flex;
	transition: background 0.15s ease;
}
.dsh-pt-trigger:hover:not(:disabled) {
	background: var(--dsw-alias-interactive-bg-hover);
}
.dsh-pt-trigger:focus-visible:not([data-selection-focus]) {
	box-shadow: 0 0 0 2px var(--dsw-focus-ring-color, var(--dsw-alias-state-business-primary));
}
.dsh-pt-trigger:disabled {
	color: var(--dsw-alias-label-dimmed);
	cursor: default;
}
.dsh-pt-trigger-label {
	text-overflow: ellipsis;
	white-space: nowrap;
	min-width: 0;
	overflow: hidden;
}
.dsh-pt-trigger-effort {
	text-overflow: ellipsis;
	white-space: nowrap;
	min-width: 0;
	color: var(--dsw-alias-label-caption);
	flex-shrink: 1000;
	overflow: hidden;
}
.dsh-pt-trigger-effort::before {
	content: "·";
	margin-right: 5px;
	opacity: 0.6;
}
.dsh-pt-chevron {
	color: var(--dsw-alias-label-caption);
	flex: none;
	transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.dsh-pt-chevron-open {
	transform: rotate(180deg);
}

/* ---------- popover shell ---------- */
.dsh-pt-popover {
	z-index: 1100;
	position: fixed;
	width: min(884px, calc(100vw - 24px));
	max-height: min(620px, calc(100vh - 80px));
	display: flex;
	flex-direction: column;
	padding: 14px;
	gap: 12px;
	box-shadow: var(--dsw-elevation-prominent);
	color: var(--dsw-alias-label-primary);
	--dsw-elevation-stroke-color: var(--dsw-alias-border-l1);
	border: 1px solid var(--dsw-alias-border-l1);
	border-radius: 18px;
	overflow: hidden;
	box-sizing: border-box;
	animation: dsh-pt-pop 0.22s cubic-bezier(0.34, 1.4, 0.64, 1);
	transform-origin: bottom right;
}
@keyframes dsh-pt-pop {
	from { opacity: 0; transform: translateY(8px) scale(0.97); }
	to { opacity: 1; transform: translateY(0) scale(1); }
}

/* ---------- header ---------- */
.dsh-pt-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 10px;
	flex-wrap: wrap;
}
.dsh-pt-title-group {
	display: flex;
	align-items: center;
	gap: 8px;
}
.dsh-pt-title {
	font-size: 13px;
	font-weight: 600;
	letter-spacing: 0.01em;
	color: var(--dsw-alias-label-primary);
}
.dsh-pt-count {
	font-size: 11px;
	color: var(--dsw-alias-label-tertiary);
	background: var(--dsw-alias-interactive-bg-hover);
	padding: 1px 8px;
	border-radius: 999px;
}
.dsh-pt-controls {
	display: flex;
	align-items: center;
	gap: 6px;
	margin-left: auto;
}
.dsh-pt-search-wrap {
	position: relative;
	display: flex;
	align-items: center;
}
.dsh-pt-search {
	width: 172px;
	height: 28px;
	padding: 0 26px 0 10px;
	font-size: 12px;
	border-radius: 999px;
	border: 1px solid var(--dsw-alias-border-l1);
	background: var(--dsw-alias-bg-module-platform, transparent);
	color: var(--dsw-alias-label-primary);
	outline: none;
	transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.dsh-pt-search:focus {
	border-color: var(--dsw-alias-state-business-primary, #4d6bfe);
	box-shadow: 0 0 0 3px rgba(77, 107, 254, 0.14);
}
.dsh-pt-search::placeholder {
	color: var(--dsw-alias-label-caption);
}
.dsh-pt-search-clear {
	position: absolute;
	right: 5px;
	width: 18px;
	height: 18px;
	border: none;
	background: transparent;
	color: var(--dsw-alias-label-tertiary);
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	border-radius: 50%;
}
.dsh-pt-search-clear:hover {
	background: var(--dsw-alias-interactive-bg-hover);
}
.dsh-pt-icon-btn {
	height: 28px;
	padding: 0 10px;
	border-radius: 999px;
	border: 1px solid var(--dsw-alias-border-l1);
	background: transparent;
	color: var(--dsw-alias-label-secondary);
	font-size: 11px;
	cursor: pointer;
	transition: background 0.15s ease, color 0.15s ease;
}
.dsh-pt-icon-btn:hover:not(:disabled) {
	background: var(--dsw-alias-interactive-bg-hover);
	color: var(--dsw-alias-label-primary);
}

/* ---------- family legend ---------- */
.dsh-pt-legend {
	display: flex;
	align-items: center;
	gap: 6px;
	flex-wrap: wrap;
}
.dsh-pt-legend-pill {
	display: inline-flex;
	align-items: center;
	gap: 5px;
	height: 23px;
	padding: 0 9px;
	border-radius: 999px;
	border: 1px solid var(--dsw-alias-border-l1);
	background: transparent;
	color: var(--dsw-alias-label-secondary);
	font-size: 11px;
	cursor: pointer;
	transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.12s ease;
}
.dsh-pt-legend-pill:hover {
	background: var(--dsw-alias-interactive-bg-hover);
	transform: translateY(-1px);
}
.dsh-pt-legend-pill[data-active="true"] {
	color: var(--dsw-alias-label-primary);
	font-weight: 600;
	border-color: var(--pt-family-accent);
	background: var(--pt-family-bg);
}
.dsh-pt-legend-dot {
	width: 7px;
	height: 7px;
	border-radius: 50%;
	background: var(--pt-family-accent);
	flex: none;
	box-shadow: 0 0 6px var(--pt-family-accent);
}

/* ---------- periodic table ---------- */
.dsh-pt-table {
	display: flex;
	flex-direction: column;
	gap: 4px;
	overflow-y: auto;
	padding: 2px 2px 6px;
	min-height: 0;
	scrollbar-width: thin;
}
.dsh-pt-row {
	display: flex;
	align-items: flex-start;
	gap: 8px;
	padding: 8px 0 10px;
	border-bottom: 1px dashed var(--dsw-alias-border-l1);
}
.dsh-pt-row:last-child {
	border-bottom: none;
}
.dsh-pt-row-label {
	flex: none;
	width: 88px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	gap: 2px;
	padding: 22px 0 0 4px;
	border-left: 2px solid var(--pt-accent, var(--dsw-alias-border-l1));
	margin-left: 2px;
}
.dsh-pt-row-num {
	font-size: 9px;
	font-weight: 700;
	line-height: 1;
	letter-spacing: 0.06em;
	color: var(--pt-accent);
	opacity: 0.9;
}
.dsh-pt-row-name {
	font-size: 10px;
	line-height: 1.25;
	color: var(--dsw-alias-label-tertiary);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 82px;
}
.dsh-pt-cells {
	display: flex;
	flex-wrap: wrap;
	gap: 10px 8px;
	align-items: flex-start;
	min-width: 0;
	flex: 1;
}

/* ---------- element cell (hexagon + full name) ---------- */
.dsh-pt-cell {
	position: relative;
	flex: none;
	width: 100px;
	padding: 0;
	border: none;
	background: none;
	cursor: pointer;
	outline: none;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
	transition: transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.18s ease;
}
.dsh-pt-cell:hover:not(:disabled),
.dsh-pt-cell:focus-visible:not(:disabled) {
	transform: translateY(-3px);
	z-index: 2;
}
.dsh-pt-cell[data-dimmed="true"] {
	opacity: 0.2;
}
.dsh-pt-cell:disabled {
	cursor: default;
	opacity: 0.55;
}
.dsh-pt-hex {
	position: relative;
	flex: none;
	width: 58px;
	height: 64px;
	transition: transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.dsh-pt-cell:hover:not(:disabled) .dsh-pt-hex,
.dsh-pt-cell:focus-visible:not(:disabled) .dsh-pt-hex {
	transform: scale(1.06);
}
.dsh-pt-hex-outer {
	position: absolute;
	inset: 0;
	clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
	background: color-mix(in srgb, var(--pt-accent) 68%, var(--dsw-alias-bg-layer-1, #1a1b1e));
	transition: filter 0.2s ease, background 0.2s ease;
}
.dsh-pt-cell:hover:not(:disabled) .dsh-pt-hex-outer,
.dsh-pt-cell:focus-visible:not(:disabled) .dsh-pt-hex-outer {
	filter: drop-shadow(0 0 9px var(--pt-glow));
}
.dsh-pt-hex-inner {
	position: absolute;
	inset: 1.5px;
	clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
	background:
		linear-gradient(158deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0) 52%),
		color-mix(in srgb, var(--pt-accent) 13%, var(--dsw-alias-bg-layer-1, #1a1b1e));
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 6px;
	box-sizing: border-box;
	transition: background 0.2s ease;
}
.dsh-pt-cell:hover:not(:disabled) .dsh-pt-hex-inner,
.dsh-pt-cell:focus-visible:not(:disabled) .dsh-pt-hex-inner {
	background:
		linear-gradient(158deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0) 55%),
		color-mix(in srgb, var(--pt-accent) 27%, var(--dsw-alias-bg-layer-1, #1a1b1e));
}
.dsh-pt-cell-index {
	font-family: var(--dsw-font-markdown-code-font-family, ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace);
	font-size: 18px;
	font-weight: 700;
	line-height: 1;
	letter-spacing: -0.04em;
	font-variant-numeric: tabular-nums;
	color: var(--pt-accent);
	text-shadow: 0 0 12px var(--pt-glow);
}
.dsh-pt-cell-name {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	line-clamp: 3;
	width: 100%;
	min-height: 26px;
	font-size: 9.5px;
	line-height: 1.35;
	font-weight: 500;
	color: var(--dsw-alias-label-secondary);
	word-break: break-word;
	overflow: hidden;
	text-align: center;
	transition: color 0.18s ease;
}

/* selected: bright glowing ring + elevated fill */
.dsh-pt-cell[data-selected="true"] {
	z-index: 2;
}
.dsh-pt-cell[data-selected="true"] .dsh-pt-hex {
	transform: scale(1.06);
	filter: drop-shadow(0 0 8px var(--pt-accent)) drop-shadow(0 0 18px var(--pt-glow));
	animation: dsh-pt-breath 2.6s ease-in-out infinite;
}
.dsh-pt-cell[data-selected="true"] .dsh-pt-hex-outer {
	background: linear-gradient(150deg, #ffffff 0%, var(--pt-accent) 42%, var(--pt-accent) 100%);
}
.dsh-pt-cell[data-selected="true"] .dsh-pt-hex-inner {
	inset: 2.5px;
	background:
		radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--pt-accent) 68%, #ffffff 20%), color-mix(in srgb, var(--pt-accent) 44%, var(--dsw-alias-bg-layer-1, #1a1b1e)) 82%);
}
.dsh-pt-cell[data-selected="true"] .dsh-pt-cell-index {
	color: #ffffff;
	text-shadow: 0 0 12px var(--pt-accent), 0 1px 2px rgba(0, 0, 0, 0.45);
}
.dsh-pt-cell[data-selected="true"] .dsh-pt-cell-name {
	color: var(--dsw-alias-label-primary);
	font-weight: 700;
}
.dsh-pt-cell[data-selected="true"] .dsh-pt-cell-status {
	width: 14px;
	height: 14px;
	top: 10px;
	right: 9px;
	border-radius: 50%;
	background: var(--pt-accent);
	color: #ffffff;
	box-shadow: 0 0 8px var(--pt-glow);
}
@keyframes dsh-pt-breath {
	0%, 100% { filter: drop-shadow(0 0 6px var(--pt-accent)) drop-shadow(0 0 14px var(--pt-glow)); }
	50% { filter: drop-shadow(0 0 11px var(--pt-accent)) drop-shadow(0 0 24px var(--pt-glow)); }
}

/* click burst ripple */
.dsh-pt-burst {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 18px;
	height: 18px;
	margin: -9px 0 0 -9px;
	border-radius: 50%;
	border: 2px solid var(--pt-accent);
	pointer-events: none;
	animation: dsh-pt-burst 0.62s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
}
@keyframes dsh-pt-burst {
	0% { transform: scale(0.3); opacity: 0.95; }
	70% { opacity: 0.5; }
	100% { transform: scale(3.4); opacity: 0; }
}
.dsh-pt-cell[data-pulse="true"] .dsh-pt-hex {
	animation: dsh-pt-pulse 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes dsh-pt-pulse {
	0% { transform: scale(1); }
	35% { transform: scale(0.9); }
	70% { transform: scale(1.1); }
	100% { transform: scale(1); }
}
.dsh-pt-cell-status {
	position: absolute;
	top: 12px;
	right: 11px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: var(--pt-accent);
}
.dsh-pt-cell-status svg {
	width: 9px;
	height: 9px;
}

/* ---------- banners ---------- */
.dsh-pt-banner-error,
.dsh-pt-banner-warn {
	border-radius: 10px;
	padding: 6px 10px;
	font-size: 11px;
	line-height: 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
}
.dsh-pt-banner-error {
	background: var(--dsw-alias-interactive-bg-hover-danger);
	color: var(--dsw-alias-state-error-primary);
}
.dsh-pt-banner-warn {
	background: var(--dsw-alias-bg-module-platform);
	color: var(--dsw-alias-state-warn-label);
}
.dsh-pt-retry {
	border: none;
	background: transparent;
	color: inherit;
	font-weight: 600;
	cursor: pointer;
	padding: 0;
}
.dsh-pt-empty {
	padding: 20px 8px;
	text-align: center;
	font-size: 12px;
	color: var(--dsw-alias-label-tertiary);
}

/* ---------- footer / inspector ---------- */
.dsh-pt-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 14px;
	padding-top: 10px;
	border-top: 1px solid var(--dsw-alias-border-l1);
	flex-wrap: wrap;
}
.dsh-pt-inspector {
	appearance: none;
	display: flex;
	align-items: center;
	gap: 7px;
	min-width: 0;
	flex: 1 1 180px;
	height: 26px;
	padding: 0 8px 0 5px;
	margin-left: -5px;
	border: 1px solid transparent;
	border-radius: 999px;
	background: transparent;
	color: var(--dsw-alias-label-secondary);
	font: inherit;
	text-align: left;
	cursor: pointer;
	transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.dsh-pt-inspector:hover,
.dsh-pt-inspector:focus-visible {
	outline: none;
	background: var(--dsw-alias-interactive-bg-hover);
	border-color: var(--dsw-alias-border-l1);
	color: var(--dsw-alias-label-primary);
}
.dsh-pt-inspector:active {
	transform: translateY(0.5px);
}
.dsh-pt-inspector-mark {
	flex: none;
	width: 7px;
	height: 7px;
	border-radius: 50%;
	background: var(--pt-accent, #4d6bfe);
	box-shadow: 0 0 0 3px color-mix(in srgb, var(--pt-accent, #4d6bfe) 18%, transparent);
	transition: box-shadow 0.15s ease;
}
.dsh-pt-inspector:hover .dsh-pt-inspector-mark,
.dsh-pt-inspector:focus-visible .dsh-pt-inspector-mark {
	box-shadow: 0 0 0 4px color-mix(in srgb, var(--pt-accent, #4d6bfe) 26%, transparent);
}
.dsh-pt-inspector-name {
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 11.5px;
	font-weight: 600;
	letter-spacing: -0.005em;
}
.dsh-pt-inspector-meta {
	flex: none;
	display: flex;
	align-items: center;
	gap: 5px;
	min-width: 0;
	font-size: 10px;
	color: var(--dsw-alias-label-tertiary);
}
.dsh-pt-inspector-provider {
	min-width: 0;
	max-width: 132px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.dsh-pt-inspector-sep {
	flex: none;
	opacity: 0.5;
}
.dsh-pt-inspector-ordinal {
	flex: none;
	font-family: var(--dsw-font-markdown-code-font-family, ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace);
	font-size: 10px;
	letter-spacing: 0.02em;
	font-variant-numeric: tabular-nums;
	opacity: 0.75;
}
.dsh-pt-inspector-copy-icon {
	flex: none;
	opacity: 0;
	color: var(--dsw-alias-label-caption);
	transition: opacity 0.14s ease;
}
.dsh-pt-inspector:hover .dsh-pt-inspector-copy-icon,
.dsh-pt-inspector:focus-visible .dsh-pt-inspector-copy-icon {
	opacity: 1;
}

/* ---------- reasoning effort slider (mirrors dsh-codex-effort-slider) ---------- */
.dsh-pt-effort-area {
	display: flex;
	flex-direction: column;
	gap: 4px;
	min-width: 230px;
	flex: 0 1 270px;
}
.dsh-pt-effort-head {
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: 8px;
}
.dsh-pt-effort-title {
	font-size: 11px;
	color: var(--dsw-alias-label-tertiary);
}
.dsh-pt-effort-value {
	font-size: 11px;
	font-weight: 600;
}
.dsh-pt-ces-wrap {
	--ces-accent: var(--dsw-alias-state-business-primary, var(--dsw-static-blue-450, #4d93f8));
	width: 100%;
	min-width: 0;
}
.dsh-pt-ces-wrap .ces-track {
	position: relative;
	box-sizing: border-box;
	height: 28px;
	margin-top: 2px;
	border-radius: 999px;
	background: var(--dsw-alias-border-l1, rgba(15, 17, 21, 0.08));
	cursor: pointer;
	touch-action: none;
	user-select: none;
	-webkit-user-select: none;
}
.dsh-pt-ces-wrap .ces-track:focus-visible {
	outline: var(--dsw-focus-ring-width, 2px) solid var(--dsw-focus-ring-color, var(--ces-accent));
	outline-offset: 2px;
}
.dsh-pt-ces-wrap .ces-fill {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	border-radius: 14px 0 0 14px;
	pointer-events: none;
}
.dsh-pt-ces-wrap .ces-tick {
	position: absolute;
	top: 50%;
	width: 3px;
	height: 3px;
	margin: -1.5px 0 0 -1.5px;
	border-radius: 50%;
	background: color-mix(in srgb, var(--dsw-alias-label-primary, #0f1115) 26%, transparent);
	pointer-events: none;
}
.dsh-pt-ces-wrap .ces-tick[data-on="1"] {
	background: rgba(255, 255, 255, 0.5);
}
.dsh-pt-ces-wrap[data-reached-ticks="dim"] .ces-tick[data-on="1"] {
	background: color-mix(in srgb, var(--dsw-alias-label-primary, #0f1115) 26%, transparent);
}
.dsh-pt-ces-wrap[data-reached-ticks="hidden"] .ces-tick[data-on="1"] {
	display: none;
}
.dsh-pt-ces-wrap .ces-knob {
	position: absolute;
	top: 50%;
	width: 28px;
	height: 28px;
	margin: -14px 0 0 -14px;
	border-radius: 50%;
	background: #fff;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.34), 0 0 0 0.5px rgba(0, 0, 0, 0.06);
	pointer-events: none;
}
.dsh-pt-ces-wrap[data-energy="1"] .ces-track {
	box-shadow: 0 0 calc(var(--ces-energy, 0) * 16px) rgba(168, 85, 247, 0.5);
}
.dsh-pt-ces-wrap[data-energy="0"] .ces-star,
.dsh-pt-ces-wrap[data-energy="0"] .ces-energy__sweep {
	animation-play-state: paused;
}
.dsh-pt-ces-wrap .ces-energy {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	border-radius: 14px 0 0 14px;
	overflow: hidden;
	pointer-events: none;
	opacity: var(--ces-energy, 0);
	transition: opacity 0.2s ease;
	background: linear-gradient(90deg, #3b1178 0%, #6d28d9 30%, #9333ea 62%, #c084fc 100%);
}
.dsh-pt-ces-wrap .ces-stars {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	border-radius: 14px 0 0 14px;
	overflow: hidden;
	pointer-events: none;
	transition: opacity 0.2s ease;
}
.dsh-pt-ces-wrap .ces-star {
	position: absolute;
	left: 0;
	right: 0;
	height: 3px;
	margin-top: -1.5px;
	pointer-events: none;
	animation-name: dsh-pt-ces-star-sweep;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
}
.dsh-pt-ces-wrap .ces-star__dot {
	position: absolute;
	left: 100%;
	top: 0;
	width: 3px;
	height: 3px;
	margin-left: -1.5px;
	border-radius: 50%;
	background: #fff;
	box-shadow: 0 0 4px rgba(255, 255, 255, 0.85);
	opacity: var(--ces-b, 1);
	transform: scale(var(--ces-b, 1));
}
@keyframes dsh-pt-ces-star-sweep {
	0% { transform: translate3d(0, 0, 0); opacity: 0; }
	6% { opacity: 1; }
	94% { opacity: 1; }
	100% { transform: translate3d(-100%, 0, 0); opacity: 0; }
}
.dsh-pt-ces-wrap .ces-energy__sweep {
	position: absolute;
	inset: 0;
	background: linear-gradient(100deg, transparent 18%, rgba(255, 255, 255, 0.3) 50%, transparent 82%);
	transform: translateX(100%);
	animation: dsh-pt-ces-sweep 2.4s linear infinite;
}
@keyframes dsh-pt-ces-sweep {
	0% { transform: translateX(100%); }
	100% { transform: translateX(-100%); }
}
.dsh-pt-trigger[data-ces-ring="1"] {
	box-shadow: inset 0 0 0 1.5px var(--ces-ring-color, #4d93f8), 0 0 10px var(--ces-ring-glow, rgba(77, 147, 248, 0.25));
}
`;

		function injectStyle() {
			if (typeof document === "undefined") return;
			if (document.querySelector(`style[data-plugin-css=${JSON.stringify(STYLE_ID)}]`) !== null) return;
			const tag = document.createElement("style");
			tag.setAttribute("data-plugin-css", STYLE_ID);
			tag.textContent = CSS;
			document.head.appendChild(tag);
		}

		const FAMILY_PALETTES = [
			{
				accent: "#4d6bfe",
				accentStrong: "#2f49c9",
				bg: "rgba(77, 107, 254, 0.13)",
				bgHover: "rgba(77, 107, 254, 0.24)",
				bgSelected: "rgba(77, 107, 254, 0.3)",
				border: "rgba(77, 107, 254, 0.38)",
				glow: "rgba(77, 107, 254, 0.55)"
			},
			{
				accent: "#0ea5e9",
				accentStrong: "#0284c7",
				bg: "rgba(14, 165, 233, 0.13)",
				bgHover: "rgba(14, 165, 233, 0.24)",
				bgSelected: "rgba(14, 165, 233, 0.3)",
				border: "rgba(14, 165, 233, 0.38)",
				glow: "rgba(14, 165, 233, 0.55)"
			},
			{
				accent: "#10b981",
				accentStrong: "#059669",
				bg: "rgba(16, 185, 129, 0.13)",
				bgHover: "rgba(16, 185, 129, 0.24)",
				bgSelected: "rgba(16, 185, 129, 0.3)",
				border: "rgba(16, 185, 129, 0.38)",
				glow: "rgba(16, 185, 129, 0.55)"
			},
			{
				accent: "#a855f7",
				accentStrong: "#7e22ce",
				bg: "rgba(168, 85, 247, 0.13)",
				bgHover: "rgba(168, 85, 247, 0.24)",
				bgSelected: "rgba(168, 85, 247, 0.3)",
				border: "rgba(168, 85, 247, 0.38)",
				glow: "rgba(168, 85, 247, 0.55)"
			},
			{
				accent: "#f59e0b",
				accentStrong: "#b45309",
				bg: "rgba(245, 158, 11, 0.14)",
				bgHover: "rgba(245, 158, 11, 0.25)",
				bgSelected: "rgba(245, 158, 11, 0.31)",
				border: "rgba(245, 158, 11, 0.4)",
				glow: "rgba(245, 158, 11, 0.55)"
			},
			{
				accent: "#ec4899",
				accentStrong: "#be185d",
				bg: "rgba(236, 72, 153, 0.13)",
				bgHover: "rgba(236, 72, 153, 0.24)",
				bgSelected: "rgba(236, 72, 153, 0.3)",
				border: "rgba(236, 72, 153, 0.38)",
				glow: "rgba(236, 72, 153, 0.55)"
			},
			{
				accent: "#06b6d4",
				accentStrong: "#0891b2",
				bg: "rgba(6, 182, 212, 0.13)",
				bgHover: "rgba(6, 182, 212, 0.24)",
				bgSelected: "rgba(6, 182, 212, 0.3)",
				border: "rgba(6, 182, 212, 0.38)",
				glow: "rgba(6, 182, 212, 0.55)"
			}
		];

		const ROMAN = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

		/* ---------- dsh-codex-effort-slider integration ---------- */
		const CES_SETTINGS_KEY = "dsh-codex-effort-slider.settings";
		const CES_SETTINGS_EVENT = "dsh-codex-effort-slider:settings";
		const CES_KNOB_RADIUS = 14;
		const CES_ENERGY_START = 1 / 3;
		const CES_ENERGY_END = 2 / 3;
		const CES_COLOR_BLUE = [77, 147, 248];
		const CES_COLOR_VIOLET = [147, 51, 234];
		const CES_COLOR_DEEP = [76, 29, 149];
		const CES_COLOR_TEXT_VIOLET = [139, 92, 246];
		const CES_GOLDEN_RATIO = 0.6180339887498949;

		function cesClamp01(v) {
			return v < 0 ? 0 : v > 1 ? 1 : v;
		}

		function cesMixColor(from, to, t) {
			const k = cesClamp01(t);
			return [
				Math.round(from[0] + (to[0] - from[0]) * k),
				Math.round(from[1] + (to[1] - from[1]) * k),
				Math.round(from[2] + (to[2] - from[2]) * k)
			];
		}

		function cesRgbOf(c) {
			return `rgb(${c[0]},${c[1]},${c[2]})`;
		}

		function cesPctFromIndex(idx, count) {
			return count > 1 ? idx / (count - 1) : 0;
		}

		function cesEnergyFor(pct) {
			return cesClamp01((cesClamp01(pct) - CES_ENERGY_START) / (1 - CES_ENERGY_START));
		}

		function cesFillColorFor(pct) {
			const t = cesClamp01(pct);
			if (t <= CES_ENERGY_START) return cesRgbOf(CES_COLOR_BLUE);
			if (t <= CES_ENERGY_END) return cesRgbOf(cesMixColor(CES_COLOR_BLUE, CES_COLOR_VIOLET, (t - CES_ENERGY_START) / (CES_ENERGY_END - CES_ENERGY_START)));
			return cesRgbOf(cesMixColor(CES_COLOR_VIOLET, CES_COLOR_DEEP, (t - CES_ENERGY_END) / (1 - CES_ENERGY_END)));
		}

		function cesFillBackgroundFor(pct) {
			return `linear-gradient(90deg, ${cesRgbOf(CES_COLOR_BLUE)}, ${cesFillColorFor(pct)})`;
		}

		function cesValueColorFor(pct) {
			return cesRgbOf(cesMixColor(CES_COLOR_BLUE, CES_COLOR_TEXT_VIOLET, cesEnergyFor(pct)));
		}

		function cesKnobOffsetOf(pct) {
			const t = Math.round(cesClamp01(pct) * 10000) / 10000;
			return `calc(${CES_KNOB_RADIUS}px + ${t} * (100% - ${CES_KNOB_RADIUS * 2}px))`;
		}

		function cesStarHash01(index, salt) {
			const value = ((index + 1) * salt * 2654435761) % 4294967296;
			return ((value >>> 8) % 1000) / 1000;
		}

		const CES_PARTICLES = (() => {
			const count = 22;
			const out = [];
			for (let i = 0; i < count; i += 1) {
				out.push({ y: 0, phase: ((i + 1) * CES_GOLDEN_RATIO) % 1 });
			}
			const byPhase = out.map((_, idx) => idx).sort((a, b) => out[a].phase - out[b].phase);
			let slots = null;
			for (let salt = 71; salt < 4000 && slots === null; salt += 1) {
				const candidate = out.map((_, idx) => idx).sort((a, b) => {
					const ha = cesStarHash01(a, salt);
					const hb = cesStarHash01(b, salt);
					return ha === hb ? a - b : ha - hb;
				});
				let ok = true;
				for (let k = 1; k < count && ok; k += 1) {
					if (Math.abs(candidate[k] - candidate[k - 1]) < 3) ok = false;
				}
				if (ok) slots = candidate;
			}
			if (slots === null) slots = out.map((_, idx) => (idx * 5) % count);
			for (let rank = 0; rank < count; rank += 1) {
				out[byPhase[rank]].y = 8 + (slots[rank] / (count - 1)) * 84;
			}
			return out;
		})();

		function readCesSettings() {
			const defaults = { motion: "full", reachedTicks: "hidden", composerBar: true };
			try {
				if (typeof localStorage === "undefined" || !localStorage) return defaults;
				const raw = localStorage.getItem(CES_SETTINGS_KEY);
				if (!raw) return defaults;
				const parsed = JSON.parse(raw);
				if (!parsed || typeof parsed !== "object") return defaults;
				return {
					motion: parsed.motion === "fast" || parsed.motion === "quick" || parsed.motion === "full" ? parsed.motion : defaults.motion,
					reachedTicks: parsed.reachedTicks === "highlight" || parsed.reachedTicks === "dim" || parsed.reachedTicks === "hidden" ? parsed.reachedTicks : defaults.reachedTicks,
					composerBar: typeof parsed.composerBar === "boolean" ? parsed.composerBar : defaults.composerBar
				};
			} catch {
				return defaults;
			}
		}

		function useCesSettings() {
			const [settings, setSettings] = react.useState(() => readCesSettings());
			react.useEffect(() => {
				const sync = () => setSettings(readCesSettings());
				window.addEventListener(CES_SETTINGS_EVENT, sync);
				window.addEventListener("storage", sync);
				return () => {
					window.removeEventListener(CES_SETTINGS_EVENT, sync);
					window.removeEventListener("storage", sync);
				};
			}, []);
			return settings;
		}

		function CodexEffortSlider({ choices, shownIdx, busy, onPreviewIdx, onCommitIdx, settings, label }) {
			const trackRef = react.useRef(null);
			const draggingRef = react.useRef(false);
			const count = choices.length;
			const pct = cesPctFromIndex(shownIdx, count);
			const energy = cesEnergyFor(pct);
			const energyOn = energy > 0;
			const knobOffset = cesKnobOffsetOf(pct);
			const fillBg = cesFillBackgroundFor(pct);
			const starAnchor = count > 1 ? cesPctFromIndex(1, count) : 0;
			const starSpan = 1 - starAnchor;
			const starProgress = starSpan > 1e-6 ? cesClamp01((pct - starAnchor) / starSpan) : cesClamp01(pct);
			const starLayerOpacity = 0.6 + 0.4 * energy;
			const starGlow = 0.45 + 0.55 * starProgress;

			const idxFromClientX = (clientX) => {
				const rect = trackRef.current?.getBoundingClientRect();
				if (!rect || rect.width <= 0 || count <= 1) return 0;
				const usable = Math.max(1, rect.width - CES_KNOB_RADIUS * 2);
				const raw = (clientX - (rect.left + CES_KNOB_RADIUS)) / usable;
				return Math.round(cesClamp01(raw) * (count - 1));
			};

			return jsx.jsx("div", {
				className: "dsh-pt-ces-wrap",
				"data-energy": energyOn ? "1" : "0",
				"data-motion": settings.motion,
				"data-reached-ticks": settings.reachedTicks,
				style: { "--ces-energy": String(energy) },
				children: jsx.jsxs("div", {
					ref: trackRef,
					className: "ces-track",
					role: "slider",
					tabIndex: busy ? -1 : 0,
					"aria-label": label,
					"aria-valuemin": 0,
					"aria-valuemax": Math.max(0, count - 1),
					"aria-valuenow": shownIdx,
					"aria-valuetext": choices[shownIdx]?.label ?? "",
					title: `${label}: ${choices[shownIdx]?.label ?? ""}`,
					onPointerDown: (e) => {
						if (busy || e.button !== 0) return;
						e.preventDefault();
						draggingRef.current = true;
						e.currentTarget.setPointerCapture?.(e.pointerId);
						onPreviewIdx(idxFromClientX(e.clientX));
					},
					onPointerMove: (e) => {
						if (!draggingRef.current) return;
						onPreviewIdx(idxFromClientX(e.clientX));
					},
					onPointerUp: (e) => {
						if (!draggingRef.current) return;
						draggingRef.current = false;
						const next = idxFromClientX(e.clientX);
						onPreviewIdx(next);
						onCommitIdx(next);
					},
					onPointerCancel: () => {
						draggingRef.current = false;
					},
					onKeyDown: (e) => {
						if (busy) return;
						if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
							e.preventDefault();
							const next = Math.max(0, shownIdx - 1);
							onPreviewIdx(next);
							onCommitIdx(next);
						} else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
							e.preventDefault();
							const next = Math.min(count - 1, shownIdx + 1);
							onPreviewIdx(next);
							onCommitIdx(next);
						}
					},
					children: [
						jsx.jsx("div", {
							className: "ces-fill",
							style: { width: knobOffset, background: fillBg }
						}),
						jsx.jsx("div", {
							className: "ces-energy",
							style: { width: knobOffset },
							children: jsx.jsx("div", { className: "ces-energy__sweep" })
						}),
						jsx.jsx("div", {
							className: "ces-stars",
							style: { width: knobOffset, opacity: starLayerOpacity.toFixed(3) },
							children: CES_PARTICLES.map((p, s) => {
								const threshold = s / CES_PARTICLES.length;
								const reveal = cesClamp01((starProgress - threshold) / 0.22);
								const spread = 1 - 0.08 + 2 * 0.08 * cesStarHash01(s, 29);
								const dur = 2 * spread;
								const jitter = cesStarHash01(s, 53) * 0.03;
								const delay = -(((p.phase + jitter) % 1) * dur);
								const brightness = (0.5 + 0.5 * cesStarHash01(s, 61)) * starGlow;
								return jsx.jsx(
									"span",
									{
										className: "ces-star",
										style: {
											top: `${p.y}%`,
											animationDuration: `${dur.toFixed(3)}s`,
											animationDelay: `${delay.toFixed(3)}s`
										},
										children: jsx.jsx("span", {
											className: "ces-star__dot",
											style: { "--ces-b": brightness.toFixed(3), opacity: reveal.toFixed(3) }
										})
									},
									s
								);
							})
						}),
						choices.map((choice, tIdx) =>
							jsx.jsx(
								"span",
								{
									className: "ces-tick",
									"data-on": tIdx <= shownIdx ? "1" : "0",
									style: { left: cesKnobOffsetOf(cesPctFromIndex(tIdx, count)) }
								},
								choice.key
							)
						),
						jsx.jsx("div", {
							className: "ces-knob",
							style: { left: knobOffset }
						})
					]
				})
			});
		}

		function orderModelProviders(groups) {
			return groups.toSorted((left, right) => {
				const rank = (id) => (id === "deepseek-account" ? 0 : id === "deepseek-official" ? 1 : 2);
				return rank(left.id) - rank(right.id);
			});
		}

		function paletteVars(palette) {
			return {
				"--pt-accent": palette.accent,
				"--pt-accent-strong": palette.accentStrong,
				"--pt-bg": palette.bg,
				"--pt-bg-hover": palette.bgHover,
				"--pt-bg-selected": palette.bgSelected,
				"--pt-border": palette.border,
				"--pt-glow": palette.glow
			};
		}

		const zh = {
			"provider.account": "DeepSeek 账号",
			"title": "模型周期表",
			"allProviders": "全部",
			"search.placeholder": "筛选模型…",
			"search.clear": "清除筛选",
			"reload": "刷新",
			"close": "关闭",
			"trigger.fallback": "请选择模型",
			"trigger.loading": "正在加载模型…",
			"trigger.selectAria": "请选择模型",
			"trigger.aria": "选择模型，当前 {model}",
			"trigger.ariaEffort": "选择模型，当前 {model}，推理等级 {effort}",
			"effort.label": "推理等级",
			"inspector.copyAria": "复制 {name} 的模型标识（{provider}）",
			"inspector.copied": "已复制 {id}",
			"inspector.copyFailed": "复制失败，请手动复制 {id}",
			"effort.drag": "拖动调整推理等级",
			"effort.providerDefault": "Default",
			"status.loading": "正在加载模型目录…",
			"empty.models": "没有可用的模型。",
			"error.action": "模型操作失败：{message}",
			"error.sessionInUse": "当前会话已被占用，可能是其他正在运行的 DSH 导致的，请退出其他正在运行的 DSH 后重试。",
			"warning.groupLoad": "{name} 加载失败：{message}",
			"modelsCount": "{count} 个模型"
		};

		const en = {
			"provider.account": "DeepSeek Account",
			"title": "Model Periodic Table",
			"allProviders": "All",
			"search.placeholder": "Filter models…",
			"search.clear": "Clear filter",
			"reload": "Refresh",
			"close": "Close",
			"trigger.fallback": "Select model",
			"trigger.loading": "Loading models…",
			"trigger.selectAria": "Select model",
			"trigger.aria": "Select model, current {model}",
			"trigger.ariaEffort": "Select model, current {model}, reasoning effort {effort}",
			"effort.label": "Reasoning",
			"inspector.copyAria": "Copy model id of {name} ({provider})",
			"inspector.copied": "Copied {id}",
			"inspector.copyFailed": "Copy failed — the model id is {id}",
			"effort.drag": "Drag to adjust reasoning effort",
			"effort.providerDefault": "Default",
			"status.loading": "Loading model catalog…",
			"empty.models": "No models available.",
			"error.action": "Model operation failed: {message}",
			"error.sessionInUse": "This session is already in use by another running DSH instance. Quit other instances and try again.",
			"warning.groupLoad": "{name} failed to load: {message}",
			"modelsCount": "{count} models"
		};

		const MEASURE_STYLE = { visibility: "hidden", left: 0, top: 0 };

		function ElementCell({ el, selected, pending, dimmed, busy, onPick, onHover }) {
			const [pulse, setPulse] = react.useState(false);
			const timerRef = react.useRef(null);

			react.useEffect(
				() => () => {
					if (timerRef.current !== null) clearTimeout(timerRef.current);
				},
				[]
			);

			const handleClick = () => {
				setPulse(false);
				queueMicrotask(() => setPulse(true));
				if (timerRef.current !== null) clearTimeout(timerRef.current);
				timerRef.current = setTimeout(() => setPulse(false), 620);
				onPick();
			};

			return jsx.jsxs("button", {
				type: "button",
				className: "dsh-pt-cell",
				disabled: busy,
				"aria-label": `${el.model.name} · ${el.providerLabel}`,
				"data-selected": selected ? "true" : "false",
				"data-dimmed": dimmed ? "true" : "false",
				"data-pulse": pulse ? "true" : "false",
				style: paletteVars(el.palette),
				onClick: handleClick,
				onMouseEnter: (event) => onHover?.(el, event.currentTarget.getBoundingClientRect()),
				onMouseLeave: () => onHover?.(null, null),
				onFocus: (event) => onHover?.(el, event.currentTarget.getBoundingClientRect()),
				onBlur: () => onHover?.(null, null),
				children: [
					jsx.jsxs(
						"span",
						{
							className: "dsh-pt-hex",
							children: [
								jsx.jsx("span", { className: "dsh-pt-hex-outer" }, "outer"),
								jsx.jsx(
									"span",
									{
										className: "dsh-pt-hex-inner",
										children: jsx.jsx("span", {
											className: "dsh-pt-cell-index",
											children: String(el.atomicNumber).padStart(2, "0")
										})
									},
									"inner"
								),
								jsx.jsx(
									"span",
									{
										className: "dsh-pt-cell-status",
										children: pending
											? jsx.jsx(primitives.StateDot, { state: "ongoing" })
											: selected
												? jsx.jsx(primitives.IconCheckOutlineRegular, {})
												: null
									},
									"status"
								),
								pulse ? jsx.jsx("span", { className: "dsh-pt-burst" }, "burst") : null
							]
						},
						"hex"
					),
					jsx.jsx("span", { className: "dsh-pt-cell-name", children: el.model.name }, "name")
				]
			});
		}

		function PeriodicModelSelect({ locked, available, directory, load, select, t }) {
			injectStyle();

			const state = react.useSyncExternalStore(
				(fn) => directory.subscribe(fn),
				() => directory.getSnapshot()
			);
			const [open, setOpen] = react.useState(false);
			const [query, setQuery] = react.useState("");
			const [activeProvider, setActiveProvider] = react.useState(null);
			const [hoveredKey, setHoveredKey] = react.useState(null);
			const [selectionFocus, setSelectionFocus] = react.useState(false);
			const [menuPos, setMenuPos] = react.useState(null);
			const [toast, setToast] = react.useState(null);
			const [sliderIdx, setSliderIdx] = react.useState(null);
			const cesSettings = useCesSettings();

			const toastSeq = react.useRef(0);
			const lastActionRef = react.useRef("load");
			const rootRef = react.useRef(null);
			const triggerRef = react.useRef(null);
			const popoverRef = react.useRef(null);
			const searchRef = react.useRef(null);
			const id = react.useId();

			const groups = react.useMemo(() => orderModelProviders(state.groups), [state.groups]);

			const elements = react.useMemo(() => {
				const list = [];
				let atomic = 1;
				groups.forEach((group, groupIndex) => {
					const palette = FAMILY_PALETTES[groupIndex % FAMILY_PALETTES.length];
					const providerLabel = group.id === "deepseek-account" ? t("provider.account") : group.name;
					for (const model of group.models) {
						list.push({
							key: `${group.id}/${model.id}`,
							atomicNumber: atomic++,
							providerId: group.id,
							providerLabel,
							model,
							palette
						});
					}
				});
				return list;
			}, [groups, t]);

			const rows = react.useMemo(() => {
				const byProvider = new Map();
				for (const el of elements) {
					const bucket = byProvider.get(el.providerId);
					if (bucket === void 0) byProvider.set(el.providerId, [el]);
					else bucket.push(el);
				}
				return groups.map((group, groupIndex) => ({
					id: group.id,
					roman: ROMAN[groupIndex] ?? String(groupIndex + 1),
					label: group.id === "deepseek-account" ? t("provider.account") : group.name,
					palette: FAMILY_PALETTES[groupIndex % FAMILY_PALETTES.length],
					elements: byProvider.get(group.id) ?? []
				}));
			}, [elements, groups, t]);

			const currentElement = react.useMemo(
				() => elements.find((el) => el.providerId === state.current?.provider && el.model.id === state.current?.model) ?? null,
				[elements, state.current]
			);

			const hoveredElement = react.useMemo(
				() => (hoveredKey === null ? null : elements.find((el) => el.key === hoveredKey) ?? null),
				[elements, hoveredKey]
			);

			const inspectedElement = hoveredElement ?? currentElement;
			const reasoning = currentElement?.model.reasoning;
			const effectiveEffort = state.current?.reasoningEffort ?? reasoning?.defaultEffort;
			const effortLabel =
				reasoning === void 0
					? state.retainedEffort
					: effectiveEffort === void 0
						? t("effort.providerDefault")
						: reasoning.efforts.find((level) => level.id === effectiveEffort)?.name ?? effectiveEffort;

			const effortChoices = react.useMemo(() => {
				if (reasoning === void 0) return [];
				return [
					...(reasoning.defaultEffort === void 0
						? [{ key: "provider-default", effort: void 0, label: t("effort.providerDefault") }]
						: []),
					...reasoning.efforts.map((effort) => ({
						key: `effort:${effort.id}`,
						effort: effort.id,
						label: effort.name
					}))
				];
			}, [reasoning, t]);

			const committedIdx = react.useMemo(() => {
				if (effortChoices.length === 0) return 0;
				const idx = effortChoices.findIndex((choice) => choice.effort === effectiveEffort);
				return idx >= 0 ? idx : 0;
			}, [effortChoices, effectiveEffort]);

			const shownIdx = sliderIdx ?? committedIdx;
			const sliderPct = effortChoices.length > 1 ? (shownIdx / (effortChoices.length - 1)) * 100 : 0;

			react.useEffect(() => {
				if (sliderIdx === null) return;
				if (effortChoices[sliderIdx]?.effort === effectiveEffort) setSliderIdx(null);
			}, [sliderIdx, effortChoices, effectiveEffort]);

			const { pending } = state;
			const busy = pending !== null;

			const reload = () => {
				lastActionRef.current = "load";
				load();
			};

			react.useEffect(() => {
				if (!open) return;
				const onMouseDownOutside = (event) => {
					if (rootRef.current?.contains(event.target) === true) return;
					if (popoverRef.current?.contains(event.target) === true) return;
					setOpen(false);
				};
				const onKeyDown = (event) => {
					if (event.key === "Escape") {
						event.preventDefault();
						setOpen(false);
						queueMicrotask(() => triggerRef.current?.focus());
					}
				};
				document.addEventListener("mousedown", onMouseDownOutside);
				document.addEventListener("keydown", onKeyDown);
				return () => {
					document.removeEventListener("mousedown", onMouseDownOutside);
					document.removeEventListener("keydown", onKeyDown);
				};
			}, [open]);

			react.useLayoutEffect(() => {
				if (!open) {
					setMenuPos(null);
					return;
				}
				const place = () => {
					const rect = triggerRef.current?.getBoundingClientRect();
					if (rect === void 0) return;
					const MARGIN = 12;
					const lw = popoverRef.current?.offsetWidth ?? 0;
					const lh = popoverRef.current?.offsetHeight ?? 0;
					let x = rect.right - lw;
					let y = rect.top - 8 - lh;
					if (lw > 0) x = Math.min(Math.max(x, MARGIN), window.innerWidth - lw - MARGIN);
					if (lh > 0) y = Math.min(Math.max(y, MARGIN), window.innerHeight - lh - MARGIN);
					setMenuPos({ left: x, top: y });
				};
				place();
				window.addEventListener("scroll", place, true);
				window.addEventListener("resize", place);
				return () => {
					window.removeEventListener("scroll", place, true);
					window.removeEventListener("resize", place);
				};
			}, [open, elements.length, activeProvider, query, state.status, sliderIdx]);

			if (!available) return null;

			const settleSelection = (result, closeOnSuccess) => {
				if (result === void 0) return;
				if (result.ok) {
					if (closeOnSuccess && rootRef.current !== null) {
						setSelectionFocus(true);
						/* 让点击波纹与发光动画播完再收起面板 */
						window.setTimeout(() => {
							setOpen(false);
							queueMicrotask(() => triggerRef.current?.focus());
						}, 240);
					}
					return;
				}
				const { error } = result;
				toastSeq.current += 1;
				setToast({
					seq: toastSeq.current,
					text:
						error.code === "session/writer-held"
							? t("error.sessionInUse")
							: t("error.action", { message: `${error.code}: ${error.message}` })
				});
			};

			const chooseModel = (el) => {
				if (busy) return;
				if (state.current?.provider === el.providerId && state.current.model === el.model.id) {
					setSelectionFocus(true);
					setOpen(false);
					return;
				}
				lastActionRef.current = "select";
				const defaultEffort = el.model.reasoning?.defaultEffort;
				select({
					provider: el.providerId,
					model: el.model.id,
					...(defaultEffort === void 0 ? {} : { reasoningEffort: defaultEffort })
				}).then((res) => settleSelection(res, el.model.reasoning === void 0));
			};

			const commitEffort = (effort) => {
				if (busy || state.current === null) return;
				if (effectiveEffort === effort) return;
				lastActionRef.current = "select";
				select({
					provider: state.current.provider,
					model: state.current.model,
					...(effort === void 0 ? {} : { reasoningEffort: effort })
				}).then((res) => settleSelection(res, false));
			};

			const handleHover = (el) => {
				setHoveredKey(el === null ? null : el.key);
			};

			const copyInspected = () => {
				const el = inspectedElement;
				if (el === null) return;
				const text = el.model.id;
				const label = t("inspector.copied", { id: text, name: el.model.name });
				const done = (ok) => {
					toastSeq.current += 1;
					setToast({
						seq: toastSeq.current,
						tone: ok ? "ok" : "warn",
						text: ok ? label : t("inspector.copyFailed", { id: text })
					});
				};
				try {
					const write = navigator.clipboard?.writeText?.(text);
					if (write !== void 0 && typeof write.then === "function") {
						write.then(() => done(true)).catch(() => done(false));
						return;
					}
				} catch {
					/* fall through to legacy path */
				}
				try {
					const area = document.createElement("textarea");
					area.value = text;
					area.setAttribute("readonly", "");
					area.style.position = "fixed";
					area.style.opacity = "0";
					document.body.appendChild(area);
					area.select();
					const ok = document.execCommand("copy");
					document.body.removeChild(area);
					done(ok);
				} catch {
					done(false);
				}
			};

			const normalizedQuery = query.trim().toLowerCase();
			const waiting = state.current === null && state.status === "loading";
			const modelLabel = waiting
				? t("trigger.loading")
				: currentElement?.model.name ?? (state.current === null ? t("trigger.fallback") : `${state.current.provider}/${state.current.model}`);
			const triggerLabel = effortLabel === void 0 ? modelLabel : `${modelLabel} · ${effortLabel}`;
			const triggerAria = waiting
				? t("trigger.loading")
				: state.current === null
					? t("trigger.selectAria")
					: effortLabel === void 0
						? t("trigger.aria", { model: modelLabel })
						: t("trigger.ariaEffort", { model: modelLabel, effort: effortLabel });

			const triggerPalette = currentElement?.palette ?? FAMILY_PALETTES[0];
			const triggerEffortPct = cesPctFromIndex(shownIdx, effortChoices.length);
			const showCesRing = cesSettings.composerBar && effortChoices.length > 0;
			const triggerStyle = {
				...paletteVars(triggerPalette),
				...(showCesRing
					? {
							"--ces-ring-color": cesFillColorFor(triggerEffortPct),
							"--ces-ring-glow": cesEnergyFor(triggerEffortPct) > 0 ? "rgba(168, 85, 247, 0.35)" : "rgba(77, 147, 248, 0.25)"
						}
					: {})
			};

			return jsx.jsxs("div", {
				ref: rootRef,
				className: "dsh-pt-root",
				children: [
					jsx.jsxs("button", {
						ref: triggerRef,
						type: "button",
						className: "dsh-pt-trigger",
						"aria-label": triggerAria,
						"aria-haspopup": "dialog",
						"aria-expanded": open,
						"aria-controls": open ? `${id}-popover` : void 0,
						title: triggerLabel,
						"aria-busy": busy,
						"data-selection-focus": selectionFocus ? "" : void 0,
						"data-ces-ring": showCesRing ? "1" : void 0,
						disabled: locked,
						style: triggerStyle,
						onBlur: () => setSelectionFocus(false),
						onClick: () => {
							if (open) {
								setOpen(false);
							} else {
								setSelectionFocus(false);
								setQuery("");
								setOpen(true);
								reload();
							}
						},
						children: [
							jsx.jsx("span", { className: "dsh-pt-trigger-label", children: modelLabel }),
							effortLabel !== void 0 &&
								jsx.jsx("span", { className: "dsh-pt-trigger-effort", children: effortLabel }),
							busy
								? jsx.jsx(primitives.StateDot, { state: "ongoing" })
								: jsx.jsx(primitives.IconChevronDownOutlineRegular, {
										className: `dsh-pt-chevron${open ? " dsh-pt-chevron-open" : ""}`
									})
						]
					}),
					open &&
						react_dom.createPortal(
							jsx.jsxs(
								primitives.MenuSurface,
								{
									ref: popoverRef,
									id: `${id}-popover`,
									className: "dsh-pt-popover",
									style: menuPos ?? MEASURE_STYLE,
									role: "dialog",
									"aria-label": t("title"),
									children: [
										jsx.jsxs("div", {
											className: "dsh-pt-header",
											children: [
												jsx.jsxs("div", {
													className: "dsh-pt-title-group",
													children: [
														jsx.jsx("span", { className: "dsh-pt-title", children: t("title") }),
														jsx.jsx("span", {
															className: "dsh-pt-count",
															children: t("modelsCount", { count: elements.length })
														})
													]
												}),
												jsx.jsxs("div", {
													className: "dsh-pt-controls",
													children: [
														jsx.jsxs("div", {
															className: "dsh-pt-search-wrap",
															children: [
																jsx.jsx("input", {
																	ref: searchRef,
																	type: "text",
																	className: "dsh-pt-search",
																	placeholder: t("search.placeholder"),
																	value: query,
																	onChange: (e) => setQuery(e.target.value)
																}),
																query !== "" &&
																	jsx.jsx("button", {
																		type: "button",
																		className: "dsh-pt-search-clear",
																		"aria-label": t("search.clear"),
																		onClick: () => {
																			setQuery("");
																			searchRef.current?.focus();
																		},
																		children: jsx.jsx(primitives.IconCloseFillRegular, {})
																	})
															]
														}),
														jsx.jsx("button", {
															type: "button",
															className: "dsh-pt-icon-btn",
															onClick: reload,
															children: t("reload")
														}),
														jsx.jsx("button", {
															type: "button",
															className: "dsh-pt-icon-btn",
															onClick: () => setOpen(false),
															children: t("close")
														})
													]
												})
											]
										}),
										rows.length > 1 &&
											jsx.jsxs("div", {
												className: "dsh-pt-legend",
												children: [
													jsx.jsx("button", {
														type: "button",
														className: "dsh-pt-legend-pill",
														"data-active": activeProvider === null ? "true" : "false",
														style: {
															"--pt-family-accent": "var(--dsw-alias-label-primary)",
															"--pt-family-bg": "var(--dsw-alias-interactive-bg-hover)"
														},
														onClick: () => setActiveProvider(null),
														children: t("allProviders")
													}),
													rows.map((row) =>
														jsx.jsxs(
															"button",
															{
																type: "button",
																className: "dsh-pt-legend-pill",
																"data-active": activeProvider === row.id ? "true" : "false",
																style: {
																	"--pt-family-accent": row.palette.accent,
																	"--pt-family-bg": row.palette.bg
																},
																onClick: () => setActiveProvider((prev) => (prev === row.id ? null : row.id)),
																children: [
																	jsx.jsx("span", { className: "dsh-pt-legend-dot" }),
																	jsx.jsx("span", { children: row.label })
																]
															},
															row.id
														)
													)
												]
											}),
										state.status === "loading" &&
											elements.length === 0 &&
											jsx.jsx("div", { className: "dsh-pt-empty", children: t("status.loading") }),
										state.error !== null &&
											lastActionRef.current === "load" &&
											jsx.jsxs("div", {
												className: "dsh-pt-banner-error",
												children: [
													jsx.jsx("span", { children: t("error.action", { message: state.error }) }),
													jsx.jsx("button", {
														type: "button",
														className: "dsh-pt-retry",
														onClick: reload,
														children: t("reload")
													})
												]
											}),
										state.failures.map((failure) =>
											jsx.jsxs(
												"div",
												{
													className: "dsh-pt-banner-warn",
													children: [
														jsx.jsx("span", {
															children: t("warning.groupLoad", {
																name: failure.id === "deepseek-account" ? t("provider.account") : failure.name,
																message: failure.message
															})
														}),
														jsx.jsx("button", {
															type: "button",
															className: "dsh-pt-retry",
															onClick: reload,
															children: t("reload")
														})
													]
												},
												failure.id
											)
										),
										elements.length === 0 && state.status === "ready"
											? jsx.jsx("div", { className: "dsh-pt-empty", children: t("empty.models") })
											: jsx.jsx("div", {
													className: "dsh-pt-table scrollable",
													children: rows.map((row) => {
														const rowVisible = activeProvider === null || activeProvider === row.id;
														return jsx.jsxs(
															"div",
															{
																className: "dsh-pt-row",
																"data-active": rowVisible ? "true" : "false",
																style: paletteVars(row.palette),
																children: [
																	jsx.jsxs("div", {
																		className: "dsh-pt-row-label",
																		children: [
																			jsx.jsx("span", { className: "dsh-pt-row-num", children: row.roman }),
																			jsx.jsx("span", {
																				className: "dsh-pt-row-name",
																				title: row.label,
																				children: row.label
																			})
																		]
																	}),
																	jsx.jsx("div", {
																		className: "dsh-pt-cells",
																		children: row.elements.map((el) => {
																			const selected =
																				state.current?.provider === el.providerId &&
																				state.current.model === el.model.id;
																			const isPending =
																				pending?.provider === el.providerId && pending.model === el.model.id;
																			const matchesQuery =
																				normalizedQuery === "" ||
																				el.model.name.toLowerCase().includes(normalizedQuery) ||
																				el.model.id.toLowerCase().includes(normalizedQuery) ||
																				el.providerLabel.toLowerCase().includes(normalizedQuery);
																			const dimmed = !matchesQuery || !rowVisible;
																			return jsx.jsx(
																				ElementCell,
																				{
																					el,
																					selected,
																					pending: isPending,
																					dimmed,
																					busy,
																					onPick: () => chooseModel(el),
																					onHover: handleHover
																				},
																				el.key
																			);
																		})
																	})
																]
															},
															row.id
														);
													})
												}),
										jsx.jsxs("div", {
											className: "dsh-pt-footer",
											children: [
												jsx.jsxs("button", {
													type: "button",
													className: "dsh-pt-inspector",
													style: paletteVars(inspectedElement?.palette ?? triggerPalette),
													title: inspectedElement
														? `${inspectedElement.model.name} · ${inspectedElement.providerLabel} · ${inspectedElement.model.id}`
														: t("title"),
													"aria-label": inspectedElement
														? t("inspector.copyAria", {
																name: inspectedElement.model.name,
																provider: inspectedElement.providerLabel
															})
														: t("title"),
													onClick: () => copyInspected(),
													children: [
														jsx.jsx("span", {
															className: "dsh-pt-inspector-mark",
															"aria-hidden": "true"
														}),
														jsx.jsx("span", {
															className: "dsh-pt-inspector-name",
															children: inspectedElement
																? inspectedElement.model.name
																: modelLabel
														}),
														inspectedElement !== null &&
															jsx.jsxs("span", {
																className: "dsh-pt-inspector-meta",
																children: [
																	jsx.jsx("span", {
																		className: "dsh-pt-inspector-sep",
																		children: "·"
																	}),
																	jsx.jsx("span", {
																		className: "dsh-pt-inspector-provider",
																		children: inspectedElement.providerLabel
																	}),
																	jsx.jsx("span", {
																		className: "dsh-pt-inspector-sep",
																		children: "·"
																	}),
																	jsx.jsx("span", {
																		className: "dsh-pt-inspector-ordinal",
																		children: `#${String(
																			inspectedElement.atomicNumber
																		).padStart(2, "0")}`
																	})
																]
															}),
														jsx.jsx(primitives.IconCopyOutlineRegular, {
															className: "dsh-pt-inspector-copy-icon",
															width: 12,
															height: 12
														})
													]
												}),
												effortChoices.length > 0 &&
													jsx.jsxs("div", {
														className: "dsh-pt-effort-area",
														children: [
															jsx.jsxs("div", {
																className: "dsh-pt-effort-head",
																children: [
																	jsx.jsx("span", {
																		className: "dsh-pt-effort-title",
																		children: t("effort.label")
																	}),
																	jsx.jsx("span", {
																		className: "dsh-pt-effort-value",
																		style: {
																			color: cesValueColorFor(cesPctFromIndex(shownIdx, effortChoices.length))
																		},
																		children: effortChoices[shownIdx]?.label ?? effortLabel ?? ""
																	})
																]
															}),
															jsx.jsx(CodexEffortSlider, {
																choices: effortChoices,
																shownIdx,
																busy,
																settings: cesSettings,
																label: t("effort.label"),
																onPreviewIdx: (next) => setSliderIdx(next),
																onCommitIdx: (next) => {
																	const choice = effortChoices[next];
																	if (choice !== void 0) commitEffort(choice.effort);
																}
															})
														]
													})
											]
										})
									]
								},
								"popover"
							),
							document.body
						),
					toast !== null &&
						jsx.jsx(
							primitives.Toast,
							{
								text: toast.text,
								icon:
									toast.tone === "ok"
										? jsx.jsx(primitives.IconCheckCircleOutlineRegular, {})
										: jsx.jsx(primitives.IconWarningOutlineRegular, {}),
								anchor: rootRef.current?.closest("[data-composer-card]") ?? null,
								onDone: () => setToast(null)
							},
							toast.seq
						)
				]
			});
		}

		const inject = ["slots", "modelDirectories", "locale", "sessions"];

		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), "periodic-model-select: dictionaries");

			ctx.inject(["slots", "modelDirectories", "sessions"], (scope) => {
				const models = scope.modelDirectories;
				const sessions = scope.sessions;
				scope.slots.inject("conversation.input.model", () =>
					scope.slots.register(
						{
							name: "conversation.input.model",
							priority: -10,
							locale: NS,
							registrant: "dsh-plugin-periodic-model-select",
							inject: (sessionId) => {
								const directory = models.directoryFor(sessionId);
								const available = sessions.subagentAddress(sessionId) === void 0;
								return {
									available,
									directory: directory.store,
									load: () => {
										if (available) directory.load().catch(() => {});
									},
									select: (selection) => (available ? directory.select(selection) : Promise.resolve(void 0))
								};
							}
						},
						PeriodicModelSelect
					)
				);
			});
		}

		exports.PeriodicModelSelect = PeriodicModelSelect;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
