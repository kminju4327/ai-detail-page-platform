// 메인 앱: 좌측 입력 레일 + 우측 결과 패널의 2단 레이아웃.
// 상태/로직은 useDetailPageGenerator 훅에 위임하고, 여기서는 조립만 한다.

import InputRail from "./components/InputRail.jsx";
import ResultPanel from "./components/ResultPanel.jsx";
import { useDetailPageGenerator } from "./hooks/useDetailPageGenerator.js";

export default function App() {
  const gen = useDetailPageGenerator();

  return (
    <div
      style={{
        fontFamily: '"Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
        background: "#F4F3EE",
        minHeight: "100%",
        color: "#1F2A24",
      }}
    >
      <div
        className="app-grid"
        style={{ display: "grid", gridTemplateColumns: "340px 1fr", minHeight: "100%" }}
      >
        {/* 좌측: 입력 */}
        <InputRail
          product={gen.product}
          update={gen.update}
          image={gen.image}
          setImage={gen.setImage}
          handleImage={gen.handleImage}
          fileInputRef={gen.fileInputRef}
          themeColor={gen.themeColor}
          setThemeColor={gen.setThemeColor}
          concept={gen.concept}
          setConcept={gen.setConcept}
          isGenerating={gen.isGenerating}
          canGenerate={gen.canGenerate}
          stage={gen.stage}
          error={gen.error}
          onGenerate={gen.generate}
        />

        {/* 우측: 결과 */}
        <ResultPanel
          draft={gen.draft}
          compliance={gen.compliance}
          stage={gen.stage}
          image={gen.image}
          concept={gen.concept}
          themeColor={gen.themeColor}
          regenIndex={gen.regenIndex}
          copied={gen.copied}
          onCopy={gen.copyResult}
          onReset={gen.resetAll}
          onRegen={gen.regenerate}
        />
      </div>
    </div>
  );
}
