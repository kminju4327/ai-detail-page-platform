// Claude API 호출 서비스.
//
// 개발 환경에서는 vite.config.js 의 프록시(/api/anthropic)를 통해 호출한다.
// 프록시가 서버 단에서 x-api-key 헤더를 붙여주므로, API 키가 브라우저 번들에
// 직접 노출되지 않는다.
//
// 응답에서 JSON을 안전하게 파싱하며, 잘린 응답은 utils/jsonParser 로 복구한다.

import { parseLLMJson } from "../utils/jsonParser.js";

// vite 프록시 경로. (프로덕션 배포 시에는 별도 백엔드 프록시로 교체 필요 — README 참고)
const API_ENDPOINT = "/api/anthropic";
const MODEL = import.meta.env.VITE_ANTHROPIC_MODEL || "claude-sonnet-4-6";

/**
 * Claude에 프롬프트를 보내고, JSON으로 파싱된 결과를 반환한다.
 * @param {string} prompt - 사용자 프롬프트
 * @param {number} maxTokens - 최대 출력 토큰 (단계별로 다르게 지정)
 * @returns {Promise<object>} 파싱된 JSON 객체
 */
export async function callClaude(prompt, maxTokens = 2000) {
  const res = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`API 오류 (${res.status}): ${data?.error?.message || JSON.stringify(data)}`);
  }

  const text = (data.content || []).map((b) => (b.type === "text" ? b.text : "")).join("\n");

  if (!text) {
    throw new Error("응답에 텍스트 내용이 없어요: " + JSON.stringify(data));
  }

  return parseLLMJson(text);
}
