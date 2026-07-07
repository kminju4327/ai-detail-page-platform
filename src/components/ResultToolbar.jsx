// 결과 상단 툴바: 결과 복사 / 새로 만들기 버튼.

import { Copy, Check, RefreshCw } from "lucide-react";

const btnStyle = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "7px 12px",
  borderRadius: 8,
  border: "1px solid #DEDCD3",
  background: "#fff",
  color: "#4A4940",
  fontSize: 12.5,
  cursor: "pointer",
};

export default function ResultToolbar({ copied, onCopy, onReset }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 18 }}>
      <button onClick={onCopy} style={btnStyle}>
        {copied ? <Check size={13} color="#2F6F45" /> : <Copy size={13} />}
        {copied ? "복사됨" : "결과 복사"}
      </button>
      <button onClick={onReset} style={btnStyle}>
        <RefreshCw size={13} /> 새로 만들기
      </button>
    </div>
  );
}
