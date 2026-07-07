// 미리보기 섹션 래퍼: 콘텐츠 카드 + 우상단 "다시 생성" 버튼.

import { RotateCw } from "lucide-react";

export default function PreviewSection({ idx, onRegen, loading, accent, children }) {
  return (
    <div style={{ position: "relative", marginBottom: 18 }}>
      {children}
      <button
        onClick={() => onRegen(idx)}
        disabled={loading}
        title="다시 생성"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 26,
          height: 26,
          borderRadius: "50%",
          border: "none",
          background: "rgba(0,0,0,0.05)",
          color: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <RotateCw size={13} className={loading ? "spin" : ""} />
      </button>
    </div>
  );
}
