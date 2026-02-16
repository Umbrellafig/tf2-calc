import { useState, useCallback } from "react";

const ICONS = {
  key: "🔑",
  metal: "⚙️",
  won: "₩",
  settings: "⚙️",
  swap: "🔄",
};

export default function TF2Calculator() {
  const [keyPrice, setKeyPrice] = useState(3300);
  const [metalPerKey, setMetalPerKey] = useState(56);
  const [values, setValues] = useState({ metal: "", keys: "", won: "" });
  const [activeField, setActiveField] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const metalToWon = useCallback(
    (m) => (metalPerKey > 0 ? (m / metalPerKey) * keyPrice : 0),
    [keyPrice, metalPerKey]
  );
  const wonToMetal = useCallback(
    (w) => (keyPrice > 0 ? (w / keyPrice) * metalPerKey : 0),
    [keyPrice, metalPerKey]
  );
  const metalToKeys = useCallback(
    (m) => (metalPerKey > 0 ? m / metalPerKey : 0),
    [metalPerKey]
  );
  const keysToMetal = useCallback((k) => k * metalPerKey, [metalPerKey]);

  const fmt = (n) => {
    if (n === 0) return "0";
    if (Math.abs(n) < 0.01) return n.toFixed(4);
    if (Number.isInteger(n)) return n.toLocaleString("ko-KR");
    return parseFloat(n.toFixed(2)).toLocaleString("ko-KR", {
      maximumFractionDigits: 2,
    });
  };

  const handleMetal = (raw) => {
    const v = parseFloat(raw);
    if (raw === "" || isNaN(v)) {
      setValues({ metal: raw, keys: "", won: "" });
      return;
    }
    setValues({
      metal: raw,
      keys: fmt(metalToKeys(v)),
      won: fmt(metalToWon(v)),
    });
  };

  const handleKeys = (raw) => {
    const v = parseFloat(raw);
    if (raw === "" || isNaN(v)) {
      setValues({ metal: "", keys: raw, won: "" });
      return;
    }
    const m = keysToMetal(v);
    setValues({
      metal: fmt(m),
      keys: raw,
      won: fmt(metalToWon(m)),
    });
  };

  const handleWon = (raw) => {
    const v = parseFloat(raw.replace(/,/g, ""));
    if (raw === "" || isNaN(v)) {
      setValues({ metal: "", keys: "", won: raw });
      return;
    }
    const m = wonToMetal(v);
    setValues({
      metal: fmt(m),
      keys: fmt(metalToKeys(m)),
      won: raw,
    });
  };

  const clearAll = () => setValues({ metal: "", keys: "", won: "" });

  const pricePerMetal =
    metalPerKey > 0 ? (keyPrice / metalPerKey).toFixed(2) : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.1)",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #e94560 0%, #c23152 100%)",
            padding: "28px 24px 20px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.3px",
                }}
              >
                TF2 거래 계산기
              </h1>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                키 · 정제금속 · 원화 실시간 환산
              </p>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              style={{
                background: showSettings
                  ? "rgba(255,255,255,0.25)"
                  : "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: 12,
                padding: "10px 14px",
                cursor: "pointer",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              ⚙️ 환율 설정
            </button>
          </div>

          {/* Rate badges */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 16,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "5px 12px",
                borderRadius: 20,
                fontSize: 12,
                color: "#fff",
                fontWeight: 500,
              }}
            >
              🔑 1키 = {keyPrice.toLocaleString()}원
            </span>
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "5px 12px",
                borderRadius: 20,
                fontSize: 12,
                color: "#fff",
                fontWeight: 500,
              }}
            >
              ⚙️ 1키 = {metalPerKey}정제금속
            </span>
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "5px 12px",
                borderRadius: 20,
                fontSize: 12,
                color: "#fff",
                fontWeight: 500,
              }}
            >
              ₩ 정제금속 1개 ≈ {pricePerMetal}원
            </span>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div
            style={{
              background: "rgba(233, 69, 96, 0.08)",
              borderBottom: "1px solid rgba(233, 69, 96, 0.15)",
              padding: "20px 24px",
            }}
          >
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  🔑 1키 가격 (원)
                </label>
                <input
                  type="number"
                  value={keyPrice}
                  onChange={(e) => {
                    setKeyPrice(Number(e.target.value));
                    if (activeField === "metal") handleMetal(values.metal);
                    else if (activeField === "keys") handleKeys(values.keys);
                    else if (activeField === "won") handleWon(values.won);
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid rgba(233,69,96,0.3)",
                    background: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  ⚙️ 1키당 정제금속
                </label>
                <input
                  type="number"
                  value={metalPerKey}
                  onChange={(e) => {
                    setMetalPerKey(Number(e.target.value));
                    if (activeField === "metal") handleMetal(values.metal);
                    else if (activeField === "keys") handleKeys(values.keys);
                    else if (activeField === "won") handleWon(values.won);
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "1px solid rgba(233,69,96,0.3)",
                    background: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Calculator Body */}
        <div style={{ padding: "24px" }}>
          {/* Metal Input */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              <span
                style={{
                  background: "#f59e0b",
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                }}
              >
                ⚙️
              </span>
              정제금속 (Refined Metal)
            </label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="정제금속 수량 입력..."
              value={activeField === "metal" ? undefined : values.metal}
              defaultValue={activeField === "metal" ? values.metal : undefined}
              onChange={(e) => {
                setActiveField("metal");
                handleMetal(e.target.value);
              }}
              onFocus={() => setActiveField("metal")}
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: 14,
                border:
                  activeField === "metal"
                    ? "2px solid #f59e0b"
                    : "2px solid rgba(255,255,255,0.08)",
                background:
                  activeField === "metal"
                    ? "rgba(245,158,11,0.08)"
                    : "rgba(255,255,255,0.04)",
                color: "#fff",
                fontSize: 20,
                fontWeight: 700,
                outline: "none",
                transition: "all 0.2s",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Arrow divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "4px 0",
              gap: 8,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.08)",
              }}
            />
            <span style={{ fontSize: 16, color: "rgba(255,255,255,0.3)" }}>
              ↕
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.08)",
              }}
            />
          </div>

          {/* Keys Input */}
          <div style={{ marginBottom: 16, marginTop: 16 }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              <span
                style={{
                  background: "#8b5cf6",
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                }}
              >
                🔑
              </span>
              키 (Keys)
            </label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="키 수량 입력..."
              value={activeField === "keys" ? undefined : values.keys}
              defaultValue={activeField === "keys" ? values.keys : undefined}
              onChange={(e) => {
                setActiveField("keys");
                handleKeys(e.target.value);
              }}
              onFocus={() => setActiveField("keys")}
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: 14,
                border:
                  activeField === "keys"
                    ? "2px solid #8b5cf6"
                    : "2px solid rgba(255,255,255,0.08)",
                background:
                  activeField === "keys"
                    ? "rgba(139,92,246,0.08)"
                    : "rgba(255,255,255,0.04)",
                color: "#fff",
                fontSize: 20,
                fontWeight: 700,
                outline: "none",
                transition: "all 0.2s",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Arrow divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "4px 0",
              gap: 8,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.08)",
              }}
            />
            <span style={{ fontSize: 16, color: "rgba(255,255,255,0.3)" }}>
              ↕
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.08)",
              }}
            />
          </div>

          {/* Won Input */}
          <div style={{ marginTop: 16 }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              <span
                style={{
                  background: "#10b981",
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  color: "#fff",
                  fontWeight: 800,
                }}
              >
                ₩
              </span>
              원화 (KRW)
            </label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="원화 금액 입력..."
              value={activeField === "won" ? undefined : values.won}
              defaultValue={activeField === "won" ? values.won : undefined}
              onChange={(e) => {
                setActiveField("won");
                handleWon(e.target.value);
              }}
              onFocus={() => setActiveField("won")}
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: 14,
                border:
                  activeField === "won"
                    ? "2px solid #10b981"
                    : "2px solid rgba(255,255,255,0.08)",
                background:
                  activeField === "won"
                    ? "rgba(16,185,129,0.08)"
                    : "rgba(255,255,255,0.04)",
                color: "#fff",
                fontSize: 20,
                fontWeight: 700,
                outline: "none",
                transition: "all 0.2s",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Clear button */}
          <button
            onClick={clearAll}
            style={{
              width: "100%",
              marginTop: 24,
              padding: "14px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            🗑️ 초기화
          </button>
        </div>

        {/* Quick Reference */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 24px 20px",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              fontSize: 12,
              fontWeight: 600,
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            빠른 참조
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 8,
            }}
          >
            {[
              {
                label: "Craft Hat",
                metal: "1.33",
                color: "#f59e0b",
              },
              {
                label: "ToD Ticket",
                metal: "14",
                color: "#8b5cf6",
              },
              {
                label: "키 1개",
                metal: String(metalPerKey),
                color: "#10b981",
              },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setActiveField("metal");
                  handleMetal(item.metal);
                }}
                style={{
                  padding: "10px 8px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: 2,
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: item.color }}>
                  {item.metal} ref
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
