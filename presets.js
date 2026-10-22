/* 학습지 문제 상황 프리셋 — 학습지 「산과 염기 · 중화 반응」 전체 문항
   code : QR 주소에 쓰는 짧은 이름 (원문 = 교재 번호, 유사 = s유형-번호, 심화 유사 = h유형-번호) */
(function () {
  const p = (s, vol, n) => ({ s, vol, n });
  const M = (label, parts, desc) => ({ label, parts, desc });
  const SYM_B3A = { H: "tri", Cl: "sq", Na: "star", OH: "circ" };
  const L = [];
  const add = o => L.push(o);

  /* ===================== 기본 유형 1 ===================== */
  add({ type: "B1", code: "238", o: true, no: "238", title: "붉은색 리트머스 + 수산화 나트륨",
    text: "질산 칼륨 수용액에 적신 붉은색 리트머스 종이 위에 수산화 나트륨 용액을 적신 실을 올리고 전류를 흘렸더니, 실에서부터 (+)극 쪽으로 푸른색이 넓어졌어요.",
    hint: ["푸른색이 (+)극 쪽으로 → 음이온이 이동했어요. 염기의 공통 이온 OH⁻이에요.", "질산 칼륨 수용액은 중성이라 색을 바꾸지 않아요(전류가 흐르게 하는 역할).", "실을 묽은 염산으로 바꾸면? 붉은색 리트머스는 산성에서 색이 그대로예요."],
    views: [{ k: "litmus", title: "실험 장치", setups: [{ label: "수산화 나트륨", paper: "red", thread: "NaOH" }, { label: "묽은 염산으로 바꾸면?", paper: "red", thread: "HCl" }] }] });
  add({ type: "B1", code: "s1-1", no: "1-1", title: "푸른색 리트머스 + 묽은 염산",
    text: "푸른색 리트머스 종이 위에 묽은 염산을 적신 실을 올리고 전류를 흘렸더니 붉은색이 (−)극 쪽으로 넓어졌어요.",
    hint: ["색을 바꾼 이온은 H⁺이고, 양이온이라 (−)극으로 가요.", "Cl⁻은 음이온이라 (+)극으로 가지만 색을 바꾸지 않아요.", "묽은 황산도 H⁺을 내놓으므로 결과가 같아요."],
    views: [{ k: "litmus", title: "실험 장치", setups: [{ label: "묽은 염산", paper: "blue", thread: "HCl" }, { label: "묽은 황산", paper: "blue", thread: "H2SO4" }] }] });
  add({ type: "B1", code: "s1-2", no: "1-2", title: "붉은색 리트머스 + 수산화 칼륨",
    text: "붉은색 리트머스 종이 위에 수산화 칼륨 수용액을 적신 실을 올리고 전류를 흘렸을 때의 결과예요.",
    hint: ["OH⁻이 (+)극 쪽으로 이동하며 붉은색 → 푸른색.", "K⁺은 (−)극으로 이동하지만 색은 그대로예요."],
    views: [{ k: "litmus", title: "실험 장치", setups: [{ label: "수산화 칼륨", paper: "red", thread: "KOH" }] }] });
  add({ type: "B1", code: "s1-3", no: "1-3", title: "실험 Ⅰ, Ⅱ의 X와 Y",
    text: "실험 Ⅰ은 (−)극 쪽으로 붉은색, 실험 Ⅱ는 (+)극 쪽으로 푸른색이 넓어졌어요. X, Y는 묽은 질산과 수산화 나트륨 수용액 중 하나예요.",
    hint: ["붉은색이 (−)극 쪽 → H⁺ 이동 → X는 묽은 질산, 종이는 푸른색.", "푸른색이 (+)극 쪽 → OH⁻ 이동 → Y는 수산화 나트륨, 종이는 붉은색."],
    views: [{ k: "litmus", title: "실험 Ⅰ / Ⅱ", setups: [{ label: "실험 Ⅰ (X)", paper: "blue", thread: "HNO3" }, { label: "실험 Ⅱ (Y)", paper: "red", thread: "NaOH" }] }] });
  add({ type: "B1", code: "236", o: true, no: "236", title: "지시약 Ⅰ~Ⅲ 찾기",
    text: "Ⅰ~Ⅲ은 BTB 용액, 페놀프탈레인 용액, 붉은색 리트머스 종이 중 하나예요. 묽은 염산과 수산화 나트륨 수용액에서의 색으로 구분해요.",
    hint: ["산성에서 무색 → 페놀프탈레인(Ⅰ).", "산성에서 붉은색 그대로 → 붉은색 리트머스(Ⅱ).", "염기성에서 파란색 → BTB(Ⅲ)."],
    views: [{ k: "ind", title: "지시약 색 (이름 가리기 가능)", inds: ["페놀프탈레인 용액", "붉은색 리트머스 종이", "BTB 용액"], labels: ["Ⅰ", "Ⅱ", "Ⅲ"], hide: true, sols: [["묽은 염산", "산성"], ["수산화 나트륨 수용액", "염기성"]] }] });
  add({ type: "B1", code: "s1-4", no: "1-4", title: "지시약 Ⅰ~Ⅲ 찾기 (메틸 오렌지)",
    text: "Ⅰ~Ⅲ은 푸른색 리트머스 종이, 메틸 오렌지 용액, 페놀프탈레인 용액 중 하나예요. 묽은 질산과 수산화 칼륨 수용액에서의 색으로 구분해요.",
    hint: ["산성 무색, 염기성 붉은색 → 페놀프탈레인(Ⅱ).", "염기성에서 노란색 → 메틸 오렌지(Ⅰ).", "남은 Ⅲ은 푸른색 리트머스 → 염기성에서 그대로 푸른색."],
    views: [{ k: "ind", title: "지시약 색 (이름 가리기 가능)", inds: ["메틸 오렌지 용액", "페놀프탈레인 용액", "푸른색 리트머스 종이"], labels: ["Ⅰ", "Ⅱ", "Ⅲ"], hide: true, sols: [["묽은 질산", "산성"], ["증류수", "중성"], ["수산화 칼륨 수용액", "염기성"]] }] });

  /* ===================== 기본 유형 2 ===================== */
  add({ type: "B2", code: "241", o: true, no: "241", title: "HCl + KOH의 반응", unit: "",
    text: "HCl 수용액과 KOH 수용액이 반응해 물과 ㉠KCl이 생겨요.",
    hint: ["KCl = 산의 음이온 Cl⁻ + 염기의 양이온 K⁺ → 염.", "개수가 변하지 않는 K⁺, Cl⁻이 구경꾼 이온이에요.", "알짜 이온 반응식 H⁺ + OH⁻ → H₂O."],
    views: [{ k: "mix", title: "입자 모형", mixes: [M("혼합 용액", [p("HCl", null, 3), p("KOH", null, 3)], "HCl 3개 + KOH 3개")], btb: true }] });
  add({ type: "B2", code: "s2-1", no: "2-1", title: "질산 + 수산화 칼슘(2가)",
    text: "2HNO₃ + Ca(OH)₂ → 2H₂O + ㉠. 수산화 칼슘은 2가 염기예요.",
    hint: ["Ca(OH)₂ 1개 → Ca²⁺ 1개 + OH⁻ 2개.", "H⁺과 OH⁻은 가수와 관계없이 항상 1 : 1로 반응해요.", "㉠ = Ca(NO₃)₂, 구경꾼 이온 Ca²⁺, NO₃⁻."],
    views: [{ k: "mix", title: "입자 모형", mixes: [M("혼합 용액", [p("HNO3", null, 4), p("CaOH2", null, 2)], "HNO₃ 4개 + Ca(OH)₂ 2개")], btb: true }] });
  add({ type: "B2", code: "245", o: true, no: "245", title: "HCl 6N + NaOH 5N", unit: "N",
    text: "HCl 6N개가 들어 있는 수용액에 NaOH 5N개가 들어 있는 수용액을 넣었어요.",
    hint: ["H⁺ 6N, OH⁻ 5N → 소량인 OH⁻ 5N이 모두 반응 → 물 5N.", "H⁺ N이 남아 산성 → BTB 노란색."],
    views: [{ k: "mix", title: "입자 모형", mixes: [M("혼합 용액", [p("HCl", null, 6), p("NaOH", null, 5)], "HCl 6N + NaOH 5N")], btb: true }] });
  add({ type: "B2", code: "s2-2", no: "2-2", title: "HNO₃ 5N + NaOH 3N (표 완성)", unit: "N",
    text: "H⁺ 5N개가 든 질산 수용액에 OH⁻ 3N개가 든 수산화 나트륨 수용액을 넣었어요. 반응 전·변화량·반응 후 표를 완성해 보세요.",
    hint: ["반응 전 5N, 3N → 변화량 −3N, −3N, +3N → 반응 후 2N, 0, 3N.", "산성, BTB 노란색. 한계 반응물 NaOH, 과잉 반응물 HNO₃.", "전체 이온 10N = 과량 HNO₃의 반응 전 이온 수."],
    views: [{ k: "mix", title: "입자 모형과 표", mixes: [M("혼합 용액", [p("HNO3", null, 5), p("NaOH", null, 3)], "HNO₃ 5N + NaOH 3N")], btb: true }] });
  add({ type: "B2", code: "s2-3", no: "2-3", title: "HCl 4N + KOH 6N", unit: "N",
    text: "H⁺ 4N개가 든 HCl 수용액에 OH⁻ 6N개가 든 KOH 수용액을 모두 넣었어요.",
    hint: ["4N씩 반응 → 물 4N, OH⁻ 2N 남음(염기성).", "전체 이온 = Cl⁻ 4N + K⁺ 6N + OH⁻ 2N = 12N."],
    views: [{ k: "mix", title: "입자 모형", mixes: [M("혼합 용액", [p("HCl", null, 4), p("KOH", null, 6)], "HCl 4N + KOH 6N")], btb: true }] });
  add({ type: "B2", code: "244", o: true, no: "244", title: "중화에 필요한 부피",
    text: "HCl 50 mL를 중화하는 데 NaOH 40 mL가 필요해요. NaOH 120 mL를 중화하려면 HCl이 얼마나 필요할까요?",
    hint: ["HCl 50 mL 속 H⁺ 수 = NaOH 40 mL 속 OH⁻ 수.", "부피비 50 : 40 = V : 120 → V = 150 mL."],
    views: [{ k: "mix", title: "두 혼합 용액 모두 중성 (HCl 10 mL당 1개, NaOH 8 mL당 1개로 표시)", mixes: [M("HCl 50 + NaOH 40", [p("HCl", 50, 5), p("NaOH", 40, 5)]), M("HCl 150 + NaOH 120", [p("HCl", 150, 15), p("NaOH", 120, 15)])], btb: true }] });
  add({ type: "B2", code: "s2-4", no: "2-4", title: "중화에 필요한 부피",
    text: "HCl 40 mL를 중화하는 데 NaOH 30 mL가 필요해요. NaOH 90 mL를 중화하는 데 필요한 HCl의 부피는?",
    hint: ["HCl : NaOH = 4 : 3의 부피비로 중화.", "90 × 4/3 = 120 mL."],
    views: [{ k: "mix", title: "두 혼합 용액 모두 중성", mixes: [M("HCl 40 + NaOH 30", [p("HCl", 40, 4), p("NaOH", 30, 4)]), M("HCl 120 + NaOH 90", [p("HCl", 120, 12), p("NaOH", 90, 12)])], btb: true }] });

  /* ===================== 기본 유형 3 ===================== */
  add({ type: "B3", code: "254", o: true, no: "254", title: "묽은 염산 10 mL + NaOH 10 mL씩",
    text: "묽은 염산 10 mL에 NaOH 수용액을 10 mL씩 넣었을 때의 이온 모형이에요. (가)의 이온은 그리지 않았어요.",
    hint: ["(나)·(다)에서 3개로 그대로인 ● = Cl⁻(구경꾼).", "(나)의 □ 1개 = 남은 H⁺, ☆ = Na⁺ → NaOH 10 mL = Na⁺ 2, OH⁻ 2.", "HCl 20 mL의 H⁺ 6 = NaOH 30 mL의 OH⁻ 6 → 중성."],
    views: [{ k: "tit", title: "첨가 과정", init: { s: "HCl", vol: 10, n: 3 }, add: { s: "NaOH", conc: .2 }, steps: [10, 10], sym: { Cl: "fcirc", Na: "star", H: "sq", OH: "tri" } }] });
  add({ type: "B3", code: "s3-1", no: "3-1", title: "HCl 10 mL + NaOH 10 mL씩",
    text: "HCl 수용액 10 mL에 NaOH 수용액을 10 mL씩 2번 넣을 때의 이온 모형이에요. △, □, ○, ☆은 H⁺, Cl⁻, Na⁺, OH⁻ 중 하나예요.",
    hint: ["△ 3 → 1 → 0 감소 → H⁺.", "□ 그대로 → Cl⁻, ☆ 0 → 2 → 4 증가 → Na⁺.", "(다)에 새로 생긴 ○ = OH⁻ → 염기성."],
    views: [{ k: "tit", title: "첨가 과정", init: { s: "HCl", vol: 10, n: 3 }, add: { s: "NaOH", conc: .2 }, steps: [10, 10], sym: SYM_B3A }] });
  add({ type: "B3", code: "256", o: true, no: "256", title: "KOH 10 mL + 묽은 염산 10 mL씩 (양이온만)",
    text: "수산화 칼륨 수용액 10 mL에 묽은 염산을 10 mL씩 넣었을 때의 양이온 모형이에요.",
    hint: ["● 2개로 일정 → K⁺(KOH 10 mL = K⁺ 2, OH⁻ 2).", "(다)에 새로 생긴 ■ = 남은 H⁺ → HCl 10 mL = H⁺ 2.", "(나)는 OH⁻ 2 = H⁺ 2 → 중성."],
    views: [{ k: "tit", title: "첨가 과정", init: { s: "KOH", vol: 10, n: 2 }, add: { s: "HCl", conc: .2 }, steps: [10, 10], filter: "cation", sym: { K: "fcirc", H: "fsq" } }] });
  add({ type: "B3", code: "s3-2", no: "3-2", title: "KOH 10 mL + 묽은 염산 10 mL씩 (양이온만)",
    text: "KOH 수용액 10 mL에 묽은 염산을 10 mL씩 2번 넣을 때 양이온만 나타낸 모형이에요.",
    hint: ["● 4개 일정 → K⁺(KOH 10 mL = K⁺ 4, OH⁻ 4).", "HCl 20 mL의 H⁺ = 2x, 2x − 4 = 2 → x = 3.", "(나) H⁺ 3 < OH⁻ 4 → 염기성."],
    views: [{ k: "tit", title: "첨가 과정", init: { s: "KOH", vol: 10, n: 4 }, add: { s: "HCl", conc: .3 }, steps: [10, 10], filter: "cation", sym: { K: "fcirc", H: "fsq" } }] });
  add({ type: "B3", code: "275", o: true, no: "275", title: "HCl 10 mL + NaOH 5 mL, 15 mL (음이온만)",
    text: "HCl 수용액 10 mL에 NaOH 수용액을 5 mL, 15 mL 차례로 넣을 때 모든 음이온을 나타낸 모형이에요.",
    hint: ["▲ 3개 일정 → Cl⁻(HCl 10 mL = H⁺ 3, Cl⁻ 3).", "(다)의 ● = 남은 OH⁻ 2 → NaOH 20 mL의 OH⁻ = 5.", "(나) H⁺ 7/4개 / 15 mL, (다) Na⁺ 5개 / 30 mL를 비교해요."],
    views: [{ k: "tit", title: "첨가 과정", init: { s: "HCl", vol: 10, n: 3 }, add: { s: "NaOH", conc: .25 }, steps: [5, 15], filter: "anion", sym: { Cl: "ftri", OH: "fcirc" } }] });
  add({ type: "B3", code: "s3-3", no: "3-3", title: "HCl 10 mL + NaOH 10 mL씩 (음이온만)",
    text: "HCl 수용액 10 mL에 NaOH 수용액을 10 mL씩 2번 넣을 때 음이온만 나타낸 모형이에요.",
    hint: ["▲ 3개 일정 → Cl⁻.", "2y − 3 = 1 → NaOH 10 mL = OH⁻ 2.", "(나)에는 H⁺ 3 − 2 = 1개."],
    views: [{ k: "tit", title: "첨가 과정", init: { s: "HCl", vol: 10, n: 3 }, add: { s: "NaOH", conc: .2 }, steps: [10, 10], filter: "anion", sym: { Cl: "ftri", OH: "fcirc" } }] });

  /* ===================== 기본 유형 4 ===================== */
  add({ type: "B4", code: "259", o: true, no: "259", title: "전체 부피 12 mL, 최고 온도 A~C",
    text: "묽은 염산과 수산화 나트륨 수용액의 부피를 달리해 섞었을 때의 최고 온도예요(전체 부피 12 mL).",
    hint: ["전체 부피가 같으면 최고 온도 순서 = 생성된 물 순서.", "A → 4 mL : 산을 늘렸더니 온도 상승 → A는 산이 한계 반응물 → 염기성.", "B → C : 산을 늘렸는데 온도 하강 → C는 염기가 한계 반응물 → 산성."],
    views: [{ k: "temp", title: "최고 온도", mode: "series", acid: { s: "HCl", conc: 5 }, base: { s: "NaOH", conc: 7 }, points: [[2, 10, "A"], [4, 8, ""], [6, 6, "B"], [8, 4, "C"], [10, 2, ""]], joined: false, tk: 4 }] });
  add({ type: "B4", code: "s4-1", no: "4-1", title: "전체 부피 50 mL, 최고 온도 A~D",
    text: "온도가 같은 묽은 염산과 NaOH 수용액의 부피를 달리해 섞은 A~D의 최고 온도예요.",
    hint: ["최고점 B(20 : 30)가 중화점 → HCl [3개/mL], NaOH [2개/mL].", "A 물 30(염기성), C 물 40(산성), D 물 20(산성)."],
    views: [{ k: "temp", title: "최고 온도", mode: "series", acid: { s: "HCl", conc: 3 }, base: { s: "NaOH", conc: 2 }, points: [[10, 40, "A"], [20, 30, "B"], [30, 20, "C"], [40, 10, "D"]], tk: 2 }] });
  add({ type: "B4", code: "260", o: true, no: "260", title: "HBr 10 mL에 KOH 첨가",
    text: "HBr 수용액 10 mL에 KOH 수용액을 조금씩 넣을 때의 온도예요. b(10 mL)에서 모든 이온 모형은 양이온 4개, 음이온 4개예요. a(5 mL)의 모형은?",
    hint: ["b가 중화점 → HBr 10 mL = H⁺ 4, Br⁻ 4 / KOH 10 mL = K⁺ 4, OH⁻ 4.", "a(5 mL) : K⁺ 2, OH⁻ 2 → H⁺ 2개와 반응 → H⁺ 2, Br⁻ 4, K⁺ 2."],
    views: [{ k: "temp", title: "첨가 실험 (슬라이더로 a, b 확인)", mode: "tit", acid: { s: "HBr", vol: 10, conc: .4 }, base: { s: "KOH", conc: .4 }, max: 15, ticks: [0, 5, 10, 15], marks: [[5, "a"], [10, "b"]], start: 5, tk: 20 }] });
  add({ type: "B4", code: "s4-2", no: "4-2", title: "HCl 20 mL에 NaOH 첨가",
    text: "묽은 염산 20 mL에 NaOH 수용액을 조금씩 넣을 때의 온도예요. 최고점 b는 15 mL예요.",
    hint: ["a는 중화점 전 → 산성.", "중화점 이후에는 물이 더 생기지 않아요(b와 c의 물 수 같음).", "HCl 20 mL = NaOH 15 mL 이온 수 → 단위 부피당 HCl : NaOH = 3 : 4."],
    views: [{ k: "temp", title: "첨가 실험", mode: "tit", acid: { s: "HCl", vol: 20, conc: .3 }, base: { s: "NaOH", conc: .4 }, max: 25, ticks: [0, 5, 10, 15, 20, 25], marks: [[5, "a"], [15, "b"], [25, "c"]], start: 5, tk: 20 }] });
  add({ type: "B4", code: "258", o: true, no: "258", title: "같은 부피 같은 이온 수, (가)~(다)",
    text: "같은 부피에 같은 개수의 이온이 든 HCl과 NaOH 수용액을 (가) 2 : 8, (나) 5 : 5, (다) 7 : 3 mL로 섞었어요.",
    hint: ["물 ∝ 적은 쪽 부피 : 2, 5, 3.", "(가)는 NaOH가 많아 염기성, (다)는 HCl이 많아 Cl⁻ > Na⁺."],
    views: [{ k: "temp", title: "최고 온도", mode: "series", acid: { s: "HCl", conc: 1 }, base: { s: "NaOH", conc: 1 }, points: [[2, 8, "(가)"], [5, 5, "(나)"], [7, 3, "(다)"]], tk: 20 }] });
  add({ type: "B4", code: "s4-3", no: "4-3", title: "같은 부피 같은 이온 수, 최고 온도 비교",
    text: "같은 부피에 같은 개수의 이온이 든 HCl과 NaOH 수용액을 (가) 3 : 7, (나) 5 : 5, (다) 8 : 2 mL로 섞었어요.",
    hint: ["물 ∝ 적은 쪽 부피 : 3, 5, 2 → (나) > (가) > (다)."],
    views: [{ k: "temp", title: "최고 온도", mode: "series", acid: { s: "HCl", conc: 1 }, base: { s: "NaOH", conc: 1 }, points: [[3, 7, "(가)"], [5, 5, "(나)"], [8, 2, "(다)"]], tk: 20 }] });

  /* ===================== 기본 유형 5 (이온 수 그래프) ===================== */
  add({ type: "B5", code: "194", o: true, src: "빈출", no: "194", title: "NaOH에 HCl을 넣을 때 이온 수 A~D",
    text: "일정량의 NaOH 수용액에 묽은 염산을 조금씩 넣을 때 혼합 용액에 존재하는 이온 수 그래프예요. (가)는 A와 C가 만나는 점, (나)는 A가 0이 되는 점이에요.",
    hint: ["일정한 B = Na⁺, 감소해 0이 되는 A = OH⁻.", "0에서 계속 증가하는 C = Cl⁻, (나) 이후 증가하는 D = H⁺.", "(가) : OH⁻이 남아 염기성 → 파란색. (나) : 중화점 → 초록색."],
    views: [{ k: "count", title: "이온 수 그래프 (이름 가리기 가능)", init: { s: "NaOH", n: 2 }, add: { s: "HCl", conc: .2 }, max: 17.5, ticks: [0, 5, 10], tickLabels: { 5: "(가)", 10: "(나)" }, names: { Na: "B", OH: "A", Cl: "C", H: "D" }, start: 5 }] });
  add({ type: "B5", code: "s5-1", no: "5-1", title: "KOH에 HNO₃를 넣을 때", unit: "N",
    text: "KOH 수용액에 HNO₃ 수용액을 조금씩 넣을 때 이온 A~D의 수예요. 20 mL에서 B가 0이 돼요.",
    hint: ["A(일정) = K⁺, B(감소) = OH⁻, C(증가) = NO₃⁻, D(20 mL 뒤) = H⁺.", "10 mL : OH⁻ N이 남아 염기성.", "30 mL : 6N, 처음 4N → 3/2배."],
    views: [{ k: "count", title: "이온 수 그래프", init: { s: "KOH", n: 2 }, add: { s: "HNO3", conc: .1 }, max: 34, ticks: [0, 10, 20, 30], names: { K: "A", OH: "B", NO3: "C", H: "D" }, start: 10 }] });
  add({ type: "B5", code: "s5-2", no: "5-2", title: "HCl 20 mL에 NaOH를 넣을 때", unit: "N",
    text: "HCl 수용액 20 mL에 NaOH 수용액을 조금씩 넣을 때 이온 A~D의 수예요. 10 mL에서 B가 0이 돼요.",
    hint: ["A(일정) = Cl⁻ 4N, B(감소) = H⁺, C(증가) = Na⁺, D(10 mL 뒤) = OH⁻.", "5 mL : H⁺ 2N = Na⁺ 2N.", "15 mL : 음이온 6N = 양이온 6N."],
    views: [{ k: "count", title: "이온 수 그래프", init: { s: "HCl", vol: 20, n: 4 }, add: { s: "NaOH", conc: .4 }, max: 18, ticks: [0, 5, 10, 15], names: { Cl: "A", H: "B", Na: "C", OH: "D" }, start: 5 }] });
  add({ type: "B5", code: "s5-3", no: "5-3", title: "전체 이온 수 그래프 고르기",
    text: "NaOH 수용액에 HCl 수용액을 넣을 때 혼합 용액의 전체 이온 수 그래프예요. V mL에서 완전히 중화돼요.",
    hint: ["중화점까지 사라진 OH⁻ 자리를 Cl⁻이 1 : 1로 채워 일정.", "중화점 뒤에는 H⁺과 Cl⁻이 함께 늘어 증가."],
    views: [{ k: "count", title: "전체 이온 수 (이온별 선도 켜 보세요)", init: { s: "NaOH", n: 2 }, add: { s: "HCl", conc: .2 }, max: 20, ticks: [0, 10, 20], tickLabels: { 10: "V" }, series: ["total"], start: 10 }] });
  add({ type: "B5", code: "s5-4", no: "5-4", title: "HCl에 KOH를 넣을 때 이온 수 A~D",
    text: "일정량의 HCl 수용액에 KOH 수용액을 조금씩 넣을 때 이온 수 그래프예요. (가)는 B와 C가 만나는 점, (나)는 D 위의 점이에요.",
    hint: ["A(일정) = Cl⁻, B(감소) = H⁺, C(증가) = K⁺, D(중화점 뒤) = OH⁻.", "(가) : H⁺이 남아 산성 → 노란색.", "(나) : OH⁻이 남아 염기성 → 파란색."],
    views: [{ k: "count", title: "이온 수 그래프 (이름 가리기 가능)", init: { s: "HCl", n: 2 }, add: { s: "KOH", conc: .2 }, max: 17.5, ticks: [0, 5, 10, 15], tickLabels: { 5: "(가)", 15: "(나)" }, names: { Cl: "A", H: "B", K: "C", OH: "D" }, start: 5 }] });

  /* ===================== 심화 유형 1 ===================== */
  add({ type: "H1", code: "267", o: true, no: "267", title: "HA + NaOH, Na⁺ 수와 물 수", unit: "N",
    text: "HA 수용액과 NaOH 수용액을 섞은 (가) HA 10 · NaOH 2a, (나) HA a · NaOH 15 mL. Na⁺ 수는 2N, 3N이고 물 수는 bN으로 같아요.",
    hint: ["구경꾼 Na⁺ ∝ NaOH 부피 : 2a : 15 = 2 : 3 → a = 5.", "부피비가 다른데 물 수가 같음 → 한계 반응물이 달라요. (가) 산성, (나) 염기성.", "(가) 물 = NaOH 10 mL = 2N → b = 2. 양이온 수 = 과량의 양이온 수 : 4N : 3N."],
    views: [{ k: "mix", title: "(가)와 (나)", mixes: [M("(가)", [p("HA", 10, 4), p("NaOH", 10, 2)]), M("(나)", [p("HA", 5, 2), p("NaOH", 15, 3)])], btb: true },
      { k: "box", title: "칸 그림 — (가) : 과량 HA의 분포가 그대로", acid: { s: "HA", n: 4 }, base: { s: "NaOH", n: 2 } }] });
  add({ type: "H1", code: "h1-1", no: "심화 1-1", title: "HA + NaOH, 물 수 2N → 4N", unit: "N",
    text: "(가) HA 10 · NaOH 20 mL, (나) HA 30 · NaOH 20 mL. 생성된 물은 2N, 4N이에요.",
    hint: ["HA만 3배인데 물은 2배 → 둘 다 HA가 한계일 수 없어요.", "(가) 염기성 : 물 = HA 10 mL = 2N, (나) 산성 : 물 = NaOH 20 mL = 4N.", "(가) 전체 이온 = 과량 NaOH 20 mL의 이온 수 8N."],
    views: [{ k: "mix", title: "(가)와 (나)", mixes: [M("(가)", [p("HA", 10, 2), p("NaOH", 20, 4)]), M("(나)", [p("HA", 30, 6), p("NaOH", 20, 4)])], btb: true },
      { k: "box", title: "칸 그림 — (가)", acid: { s: "HA", n: 2 }, base: { s: "NaOH", n: 4 } }] });
  add({ type: "H1", code: "h1-2", no: "심화 1-2", title: "액성·전체 이온 수·물 수로 V 구하기", unit: "N",
    text: "(가) HCl 10 · NaOH 30 mL는 염기성, 전체 이온 12N, 물 3N. (나) HCl 30 · NaOH V mL는 산성, 물 4N.",
    hint: ["(가) 염기성 → 전체 이온 = NaOH 30 mL의 이온 수 12N → NaOH [0.2N/mL].", "(가) 물 = HCl 10 mL 수 3N → HCl [0.3N/mL].", "(나) 산성 → 물 = NaOH V mL 수 = 4N → V = 20."],
    views: [{ k: "mix", title: "(가)와 (나)", mixes: [M("(가)", [p("HCl", 10, 3), p("NaOH", 30, 6)]), M("(나)", [p("HCl", 30, 9), p("NaOH", 20, 4)])], btb: true }] });
  add({ type: "H1", code: "268", o: true, no: "268", title: "가장 많이 존재하는 이온의 수", unit: "N",
    text: "(가) HCl 10 · NaOH 15 mL, (나) HCl 25 · NaOH 20 mL. 가장 많이 존재하는 이온의 수는 3N, 5N이에요.",
    hint: ["가장 많은 이온 = 과량 쪽의 구경꾼 이온.", "(가)가 산성이면 (나)의 Cl⁻이 7.5N이 되어 모순 → (가) 염기성(Na⁺ 3N).", "(나) 산성(Cl⁻ 5N). 물 x = 2N, y = 4N."],
    views: [{ k: "mix", title: "(가)와 (나)", mixes: [M("(가)", [p("HCl", 10, 2), p("NaOH", 15, 3)]), M("(나)", [p("HCl", 25, 5), p("NaOH", 20, 4)])], btb: true }] });
  add({ type: "H1", code: "h1-3", no: "심화 1-3", title: "가장 많이 존재하는 이온의 수", unit: "N",
    text: "(가) HCl 20 · NaOH 10 mL, (나) HCl 10 · NaOH 30 mL. 가장 많이 존재하는 이온의 수는 4N, 6N이에요.",
    hint: ["(가) 산성 → Cl⁻ 4N → HCl [4N/20 mL].", "(나)의 Cl⁻은 2N → (나) 염기성, Na⁺ 6N.", "물 : (가) 2N, (나) 2N."],
    views: [{ k: "mix", title: "(가)와 (나)", mixes: [M("(가)", [p("HCl", 20, 4), p("NaOH", 10, 2)]), M("(나)", [p("HCl", 10, 2), p("NaOH", 30, 6)])], btb: true }] });
  add({ type: "H1", code: "286", o: true, no: "286", title: "전체 음이온의 수가 같은 (가), (나)", unit: "N",
    text: "(가) HCl 100 · NaOH 20, (나) HCl 80 · NaOH 40, (다) HCl 40 · NaOH 80 mL. (가)와 (나)의 전체 음이온 수는 N으로 같아요.",
    hint: ["같은 액성이면 음이온 수가 같을 수 없어요 → 액성이 달라요.", "(가) 산성 : HCl [N/100 mL], (나) 염기성 : NaOH [N/40 mL].", "(다) 염기성 → 전체 이온 = NaOH 80 mL의 이온 수 4N."],
    views: [{ k: "mix", title: "(가)~(다)", mixes: [M("(가)", [p("HCl", 100, 1), p("NaOH", 20, .5)]), M("(나)", [p("HCl", 80, .8), p("NaOH", 40, 1)]), M("(다)", [p("HCl", 40, .4), p("NaOH", 80, 2)])], btb: true }] });
  add({ type: "H1", code: "h1-4", no: "심화 1-4", title: "전체 음이온의 수가 같은 (가), (나)", unit: "N",
    text: "(가) HCl 50 · NaOH 10 mL, (나) HCl 30 · NaOH 30 mL의 전체 음이온 수가 N으로 같아요.",
    hint: ["액성이 서로 달라요. 산 비율이 큰 (가) 산성, (나) 염기성.", "HCl [N/50 mL], NaOH [N/30 mL] → 3 : 5.", "물 : (가) N/3, (나) 0.6N."],
    views: [{ k: "mix", title: "(가)와 (나)", mixes: [M("(가)", [p("HCl", 50, 1), p("NaOH", 10, 1 / 3)]), M("(나)", [p("HCl", 30, .6), p("NaOH", 30, 1)])], btb: true }] });

  /* ===================== 심화 유형 2 ===================== */
  add({ type: "H2", code: "272", o: true, no: "272", title: "존재하는 이온 A, C, D / A, B, D",
    text: "(가) HCl 10 · NaOH 20 mL에는 A, C, D, (나) HCl 20 · NaOH 15 mL에는 A, B, D가 있어요. (가)의 A 수 < D 수.",
    hint: ["n = 2인데 3가지 → 둘 다 산성 또는 염기성.", "공통 A, D = 구경꾼. 산이 늘고 염기가 준 (나)가 산성(B = H⁺), (가) 염기성(C = OH⁻).", "(가) 염기성 → Na⁺ > Cl⁻ → A = Cl⁻, D = Na⁺."],
    views: [{ k: "mix", title: "(가)와 (나)", mixes: [M("(가)", [p("HCl", 10, 2), p("NaOH", 20, 4)]), M("(나)", [p("HCl", 20, 4), p("NaOH", 15, 3)])], btb: true }] });
  add({ type: "H2", code: "h2-1", no: "심화 2-1", title: "존재하는 이온 A, B, C / A, C, D",
    text: "(가) HCl 15 · NaOH 10 mL에는 A, B, C, (나) HCl 10 · NaOH 20 mL에는 A, C, D가 있어요. (나)의 A 수 > C 수.",
    hint: ["공통 A, C = 구경꾼, B·D = 알짜.", "염기 비율이 큰 (나) 염기성(D = OH⁻), (가) 산성(B = H⁺).", "(나) 염기성 → Na⁺ > Cl⁻ → A = Na⁺, C = Cl⁻."],
    views: [{ k: "mix", title: "(가)와 (나)", mixes: [M("(가)", [p("HCl", 15, 3), p("NaOH", 10, 2)]), M("(나)", [p("HCl", 10, 2), p("NaOH", 20, 4)])], btb: true }] });
  add({ type: "H2", code: "281", o: true, no: "281", title: "HCl·NaOH·KOH, 이온 수의 비",
    text: "(가) HCl 15 · NaOH 5 mL의 이온 비 1 : 5 : 6, (나) HCl 15 · NaOH 10 · KOH 10 mL의 이온 비 1 : 2 : 3.",
    hint: ["(나) n = 3, 3가지 → 중성. Cl⁻ = Na⁺ + K⁺ → Cl⁻ = 3.", "(가) Cl⁻ 3 = '6' → Na⁺ 0.5, H⁺ 2.5.", "물 : (가) 0.5, (나) 3 → 6배."],
    views: [{ k: "mix", title: "(가)와 (나)", mixes: [M("(가)", [p("HCl", 15, 3), p("NaOH", 5, .5)]), M("(나)", [p("HCl", 15, 3), p("NaOH", 10, 1), p("KOH", 10, 2)])], btb: true }] });
  add({ type: "H2", code: "h2-2", no: "심화 2-2", title: "HCl·NaOH·KOH, 이온 수의 비",
    text: "(가) HCl 10 · NaOH 10 · KOH 10 mL의 이온 비 1 : 2 : 3, (나) HCl 10 · NaOH 20 · KOH 10 mL의 이온 비 1 : 2 : 3 : 4.",
    hint: ["(가) n = 3, 3가지 → 중성, 가장 큰 3 = Cl⁻.", "Na⁺ 2, K⁺ 1일 때만 (나)가 1 : 2 : 3 : 4.", "10 mL당 HCl 3, NaOH 2, KOH 1."],
    views: [{ k: "mix", title: "(가)와 (나)", mixes: [M("(가)", [p("HCl", 10, 3), p("NaOH", 10, 2), p("KOH", 10, 1)]), M("(나)", [p("HCl", 10, 3), p("NaOH", 20, 4), p("KOH", 10, 1)])], btb: true }] });
  add({ type: "H2", code: "283", o: true, no: "283", title: "NaOH, NaOH, KOH를 차례로 넣는 실험",
    text: "HCl V mL에 NaOH V mL → (나), NaOH V mL 더 → (다), KOH 2V mL → (라). 양이온 수 비는 (다) 1 : 1, (라) 1 : 2.",
    hint: ["(다) 양이온 2가지 1 : 1 → H⁺, Na⁺ (산성) → h = 4c.", "(라) 양이온이 Na⁺, K⁺뿐 → K⁺ = 2 × Na⁺ → KOH 2V에 4c.", "(라) : OH⁻ 2c 남음 → 염기성."],
    views: [{ k: "mix", title: "과정별 혼합 용액 (V mL당 NaOH 1개로 표시)", mixes: [M("(나)", [p("HCl", 1, 4), p("NaOH", 1, 1)], "HCl V + NaOH V"), M("(다)", [p("HCl", 1, 4), p("NaOH", 2, 2)], "HCl V + NaOH 2V"), M("(라)", [p("HCl", 1, 4), p("NaOH", 2, 2), p("KOH", 2, 4)], "+ KOH 2V")], btb: true }] });
  add({ type: "H2", code: "h2-3", no: "심화 2-3", title: "Ⅰ에 KOH를 넣어 Ⅱ 만들기",
    text: "HCl 20 mL + NaOH 10 mL → Ⅰ, Ⅰ + KOH 10 mL → Ⅱ. Ⅰ, Ⅱ 모두 이온 3가지, Ⅱ의 이온 비 1 : 2 : 3(Na⁺ > K⁺).",
    hint: ["Ⅱ : n = 3, 3가지 → 중성. Ⅰ : n = 2, 3가지 → 산성(염기를 더 넣어 중성이 됨).", "Ⅱ : Cl⁻ 3 = Na⁺ 2 + K⁺ 1.", "Ⅰ : Cl⁻ 3, Na⁺ 2, H⁺ 1."],
    views: [{ k: "mix", title: "Ⅰ과 Ⅱ", mixes: [M("Ⅰ", [p("HCl", 20, 3), p("NaOH", 10, 2)]), M("Ⅱ", [p("HCl", 20, 3), p("NaOH", 10, 2), p("KOH", 10, 1)])], btb: true }] });

  /* ===================== 심화 유형 3 (2가) ===================== */
  add({ type: "H3", code: "266", o: true, no: "266", title: "HCl·H₂A·NaOH, 모두 중성",
    text: "(가) HCl x · H₂A 5 · NaOH 20, (나) H₂A 10 · NaOH 20, (다) HCl 15 · NaOH 10 mL가 모두 중성이에요.",
    hint: ["(나) : H₂A [1개/10 mL] → H⁺ 2 = NaOH 20 mL의 OH⁻ 2.", "(다) : HCl [1개/15 mL].", "(가) : OH⁻ 2 = H₂A 5 mL의 H⁺ 1 + HCl의 H⁺ 1 → x = 15."],
    views: [{ k: "mix", title: "(가)~(다)", mixes: [M("(가)", [p("HCl", 15, 1), p("H2A", 5, .5), p("NaOH", 20, 2)]), M("(나)", [p("H2A", 10, 1), p("NaOH", 20, 2)]), M("(다)", [p("HCl", 15, 1), p("NaOH", 10, 1)])], btb: true }] });
  add({ type: "H3", code: "h3-1", no: "심화 3-1", title: "HCl·H₂A·KOH, 모두 중성",
    text: "(가) HCl x · H₂A 10 · KOH 30, (나) H₂A 20 · KOH 20, (다) HCl 20 · KOH 10 mL가 모두 중성이에요.",
    hint: ["(나) : H₂A [1개/10 mL] → KOH [2개/10 mL].", "(다) : HCl [1개/10 mL].", "(가) : OH⁻ 6 = H⁺ 2 + 4 → x = 40. K⁺ 6 = Cl⁻ 4 + 2 × A²⁻ 1."],
    views: [{ k: "mix", title: "(가)~(다)", mixes: [M("(가)", [p("HCl", 40, 4), p("H2A", 10, 1), p("KOH", 30, 6)]), M("(나)", [p("H2A", 20, 2), p("KOH", 20, 4)]), M("(다)", [p("HCl", 20, 2), p("KOH", 10, 2)])], btb: true }] });
  add({ type: "H3", code: "280", o: true, no: "280", title: "H₂X + NaOH, 이온 수의 비 1 : 2 : a", unit: "N",
    text: "(가) H₂X 15 · NaOH 20 mL에서 물 5N, (나) H₂X 15 · NaOH 40 mL에서 물 8N, (나)의 이온 비 1 : 2 : a.",
    hint: ["NaOH 2배인데 물은 2배가 아님 → (가) 산성, (나) 염기성.", "(가) 물 = NaOH 20 mL = 5N, (나) 물 = H₂X의 H⁺ = 8N → H₂X 4N.", "(나) : X²⁻ 4N, Na⁺ 10N, OH⁻ 2N → 1 : 2 : 5."],
    views: [{ k: "mix", title: "(가)와 (나)", mixes: [M("(가)", [p("H2X", 15, 4), p("NaOH", 20, 5)]), M("(나)", [p("H2X", 15, 4), p("NaOH", 40, 10)])], btb: true },
      { k: "box", title: "칸 그림 — (나) : 한계 반응물 H₂X가 2가", acid: { s: "H2X", n: 4 }, base: { s: "NaOH", n: 10 }, unit: "N" }] });
  add({ type: "H3", code: "h3-2", no: "심화 3-2", title: "H₂X + KOH, 이온 수의 비 1 : 2 : a", unit: "N",
    text: "(가) H₂X 10 · KOH 10 mL에서 물 4N, (나) H₂X 10 · KOH 30 mL에서 물 6N.",
    hint: ["KOH 3배인데 물은 3배가 아님 → (가) 산성, (나) 염기성.", "KOH [4N/10 mL], H₂X 10 mL = 3N.", "(나) : X²⁻ 3N, K⁺ 12N, OH⁻ 6N → 1 : 2 : 4."],
    views: [{ k: "mix", title: "(가)와 (나)", mixes: [M("(가)", [p("H2X", 10, 3), p("KOH", 10, 4)]), M("(나)", [p("H2X", 10, 3), p("KOH", 30, 12)])], btb: true },
      { k: "box", title: "칸 그림 — (나)", acid: { s: "H2X", n: 3 }, base: { s: "KOH", n: 12 }, unit: "N" }] });
  add({ type: "H3", code: "h3-3", no: "심화 3-3", title: "H₂A + NaOH, 이온의 종류 수",
    text: "(가) H₂A 10 · NaOH 10 mL에는 이온 2가지, (나) H₂A 10 · NaOH 30 mL에는 이온 3가지가 있어요.",
    hint: ["(가) n = 2, 2가지 → 중성. 전하 균형 2 × A²⁻ = Na⁺ → 1 : 2.", "10 mL당 H₂A a, NaOH 2a.", "(나) : A²⁻ a, Na⁺ 6a, OH⁻ 4a → 1 : 4 : 6."],
    views: [{ k: "mix", title: "(가)와 (나)", mixes: [M("(가)", [p("H2A", 10, 1), p("NaOH", 10, 2)]), M("(나)", [p("H2A", 10, 1), p("NaOH", 30, 6)])], btb: true }] });
  add({ type: "H3", code: "299", o: true, no: "299", title: "HCl + X(OH)₂, 액성이 모두 다른 (가)~(다)",
    text: "(가) HCl 20 · X(OH)₂ 10, (나) HCl 20 · X(OH)₂ 20, (다) HCl V · X(OH)₂ 20 mL. 액성은 모두 다르고, 전체 이온 수(상댓값)는 4, 6이에요.",
    hint: ["(나) 염기성 : 한계 HCl(1가) → 전체 이온 = X(OH)₂ 20 mL 이온 수 6 → X(OH)₂ 2개.", "(가) 산성 : 한계 X(OH)₂(2가) → 2 × HCl − X²⁺ 1 = 4 → HCl 2.5개.", "(다) 중성 : OH⁻ 4 = HCl V mL의 H⁺ → V = 32."],
    views: [{ k: "mix", title: "(가)~(다)", mixes: [M("(가)", [p("HCl", 20, 2.5), p("XOH2", 10, 1)]), M("(나)", [p("HCl", 20, 2.5), p("XOH2", 20, 2)]), M("(다)", [p("HCl", 32, 4), p("XOH2", 20, 2)])], btb: true },
      { k: "box", title: "칸 그림 — (가) : 한계 반응물 X(OH)₂가 2가", acid: { s: "HCl", n: 5 }, base: { s: "XOH2", n: 2 } }] });
  add({ type: "H3", code: "h3-4", no: "심화 3-4", title: "HCl + Y(OH)₂, 액성이 모두 다른 (가)~(다)",
    text: "(가) HCl 20 · Y(OH)₂ 10, (나) HCl 20 · Y(OH)₂ 40, (다) HCl V · Y(OH)₂ 30 mL. 전체 이온 수(상댓값)는 7, 12예요.",
    hint: ["(나) 염기성 → Y(OH)₂ 40 mL 이온 수 12 → Y(OH)₂ [1개/10 mL].", "(가) 산성 → 2 × HCl − Y²⁺ 1 = 7 → HCl 4개/20 mL.", "(다) 중성 → V = 30. (나) : Cl⁻ 4 = Y²⁺ 4."],
    views: [{ k: "mix", title: "(가)~(다)", mixes: [M("(가)", [p("HCl", 20, 4), p("YOH2", 10, 1)]), M("(나)", [p("HCl", 20, 4), p("YOH2", 40, 4)]), M("(다)", [p("HCl", 30, 6), p("YOH2", 30, 3)])], btb: true },
      { k: "box", title: "칸 그림 — (가)", acid: { s: "HCl", n: 4 }, base: { s: "YOH2", n: 1 } }] });

  add({ type: "H3", code: "ds12", o: true, src: "도선고 기출", no: "12", title: "염기 X에 염산을 넣을 때 이온의 상대적인 수",
    text: "어떤 염기 X 수용액에 묽은 염산을 넣을 때 이온의 상대적인 수 그래프예요. 일정한 선은 1, 감소하는 선은 2에서 시작해 b에서 0이 되고, c에서 H⁺은 1이에요.",
    hint: ["처음 OH⁻ 2 : 구경꾼 양이온 1 → X(OH)₂ (2가 염기).", "원점에서 증가하는 (가) = Cl⁻. a는 중화점 b의 절반이라 아직 염기성.", "양이온 : b에서 X²⁺ 1, c에서 X²⁺ 1 + H⁺ 1 = 2."],
    views: [{ k: "count", title: "이온의 상대적인 수", init: { s: "XOH2", n: 1 }, add: { s: "HCl", conc: .1 }, max: 36, ticks: [0, 10, 20, 30], tickLabels: { 10: "a", 20: "b", 30: "c" }, names: { Cl: "(가)" }, start: 10 }] });
  add({ type: "H3", code: "h3-5", no: "심화 3-5", title: "Ca(OH)₂에 HNO₃를 넣을 때", unit: "N",
    text: "Ca(OH)₂ 수용액에 HNO₃ 수용액을 조금씩 넣을 때 이온 A~D의 수예요. A는 2N, B는 4N에서 시작해 40 mL에서 0이 돼요.",
    hint: ["A(일정) = Ca²⁺, B(감소) = OH⁻ (2 : 1 → 2가 염기).", "20 mL : NO₃⁻ 2N = Ca²⁺ 2N, 하지만 OH⁻ 2N이 남아 염기성.", "A와 C가 만나는 점 = 중화점의 절반."],
    views: [{ k: "count", title: "이온 수 그래프", init: { s: "CaOH2", n: 2 }, add: { s: "HNO3", conc: .1 }, max: 56, ticks: [0, 20, 40], names: { Ca: "A", OH: "B", NO3: "C", H: "D" }, start: 20 }] });
  add({ type: "H3", code: "h3-6", no: "심화 3-6", title: "H₂SO₄에 NaOH를 넣을 때 이온의 상대적인 수",
    text: "H₂SO₄ 수용액에 NaOH 수용액을 넣을 때 이온의 상대적인 수 그래프예요. 일정한 선은 1, 감소하는 선은 2에서 시작해 b에서 0이 돼요.",
    hint: ["일정 = SO₄²⁻, 감소 = H⁺ (2 : 1 → 2가 산), 원점에서 증가하는 (가) = Na⁺.", "a : SO₄²⁻ 1, H⁺ 1, Na⁺ 1.", "c : 양이온 Na⁺ 3, 음이온 SO₄²⁻ 1 + OH⁻ 1 = 2."],
    views: [{ k: "count", title: "이온의 상대적인 수", init: { s: "H2SO4", n: 1 }, add: { s: "NaOH", conc: .1 }, max: 36, ticks: [0, 10, 20, 30], tickLabels: { 10: "a", 20: "b", 30: "c" }, names: { Na: "(가)" }, start: 30 }] });
  add({ type: "H3", code: "sd3", o: true, src: "성동고 기출", no: "서답형 3", title: "H₂SO₄ 10 mL + NaOH 20 mL의 이온 모형",
    text: "황산 10 mL와 수산화 나트륨 수용액 20 mL의 혼합 용액 모형이에요. △ 5개, ● 2개, ○ 1개가 있어요.",
    hint: ["전하 균형 : △ = Na⁺(+1)이면 양전하 5 = ● 2개 × 2 + ○ 1개 × 1.", "● = SO₄²⁻, ○ = OH⁻ → 음이온은 ●, ○.", "H₂SO₄ 10 mL의 H⁺ 4개, NaOH 1 mL당 OH⁻ 0.25개 → 25 mL(H⁺ 10개)에는 40 mL."],
    views: [{ k: "mix", title: "혼합 용액 (기호 모형을 끄면 이온 이름이 보여요)", mixes: [M("혼합 용액", [p("H2SO4", 10, 2), p("NaOH", 20, 5)])], sym: { Na: "tri", SO4: "fcirc", OH: "circ", H: "sq" }, startAfter: true }] });
  add({ type: "H3", code: "h3-7", no: "심화 3-7", title: "Ca(OH)₂ 10 mL + HCl 20 mL의 이온 모형",
    text: "수산화 칼슘 수용액 10 mL와 묽은 염산 20 mL의 혼합 용액 모형이에요. △ 6개, ● 2개, ○ 2개가 있어요.",
    hint: ["가장 많은 △ = Cl⁻(1가 구경꾼).", "음전하 6 = ● 2개 × 2 + ○ 2개 × 1 → ● = Ca²⁺, ○ = H⁺ (산성).", "Ca(OH)₂ 30 mL의 OH⁻ 12개 ÷ HCl 1 mL당 0.3개 = 40 mL."],
    views: [{ k: "mix", title: "혼합 용액", mixes: [M("혼합 용액", [p("CaOH2", 10, 2), p("HCl", 20, 6)])], sym: { Cl: "tri", Ca: "fcirc", H: "circ", OH: "sq" }, startAfter: true }] });
  add({ type: "H3", code: "h3-8", no: "심화 3-8", title: "H₂A 20 mL + KOH 15 mL의 이온 모형",
    text: "H₂A 수용액 20 mL와 KOH 수용액 15 mL의 혼합 용액 모형이에요. △ 3개, ● 2개, ○ 1개가 있어요.",
    hint: ["△ = K⁺이면 양전하 3 + ○ 1 = 4 = ● 2개 × 2.", "△ = K⁺, ● = A²⁻, ○ = H⁺.", "H₂A 10 mL의 H⁺ 2개 ÷ KOH 1 mL당 0.2개 = 10 mL."],
    views: [{ k: "mix", title: "혼합 용액", mixes: [M("혼합 용액", [p("H2A", 20, 2), p("KOH", 15, 3)])], sym: { K: "tri", A2: "fcirc", H: "circ", OH: "sq" }, startAfter: true }] });

  /* ===================== 심화 유형 4 (단위 부피당) ===================== */
  add({ type: "H4", code: "290", o: true, no: "290", title: "단위 부피당 Na⁺ · Cl⁻ 수",
    text: "(가) HCl 30 · NaOH 90 mL의 단위 부피당 Na⁺ 3, Cl⁻ 2, (나) HCl 20 · NaOH V mL의 Na⁺ 2, Cl⁻ 4 (상댓값).",
    hint: ["부피를 곱해 이온 수로 : (가) Na⁺ 360, Cl⁻ 240.", "Cl⁻ ∝ HCl 부피 → (나) Cl⁻ 160 = 4(20 + V) → V = 20.", "HCl [8/mL], NaOH [4/mL] → 물 (가) 240, (나) 80."],
    views: [{ k: "mix", title: "(가)와 (나) (입자 1개 = 40으로 표시)", mixes: [M("(가)", [p("HCl", 30, 6), p("NaOH", 90, 9)]), M("(나)", [p("HCl", 20, 4), p("NaOH", 20, 2)])], btb: true, perVol: true }] });
  add({ type: "H4", code: "h4-1", no: "심화 4-1", title: "단위 부피당 이온 수의 비 Na⁺ : Cl⁻",
    text: "(가) HCl 20 · NaOH 20 mL는 Na⁺ : Cl⁻ = 2 : 3, (나) HCl 10 · NaOH V mL는 4 : 1.",
    hint: ["같은 용액 안의 비 = 이온 수의 비 → HCl [3/mL], NaOH [2/mL].", "(나) : 2V : 30 = 4 : 1 → V = 60.", "물 (가) 40, (나) 30."],
    views: [{ k: "mix", title: "(가)와 (나) (입자 1개 = 10으로 표시)", mixes: [M("(가)", [p("HCl", 20, 6), p("NaOH", 20, 4)]), M("(나)", [p("HCl", 10, 3), p("NaOH", 60, 12)])], btb: true, perVol: true }] });
  add({ type: "H4", code: "ex2", o: true, no: "Skill 08 예제 2", title: "단위 부피당 A, B 그래프 (9N, 6N)", unit: "N",
    text: "HCl 수용액 20 mL에 NaOH 수용액을 넣을 때 단위 부피당 A, B의 수 그래프예요. B는 9N에서 시작해 10 mL에서 6N이에요.",
    hint: ["B = Cl⁻(처음부터 있고 계속 남음), A = Na⁺(0에서 바로 증가).", "Cl⁻ 180N, A와 B가 만나는 30 mL가 중화점 → x = 3.6N.", "NaOH [6N/mL] → y = 2N, 40 mL에서 단위 부피당 전체 이온 8N."],
    views: [{ k: "pervol", title: "첨가 그래프", acid: { s: "HCl", vol: 20, conc: 9 }, base: { s: "NaOH", conc: 6 }, max: 45, ticks: [0, 10, 30, 40], series: ["acidIon", "baseIon"], names: { acidIon: "B (Cl⁻)", baseIon: "A (Na⁺)" }, start: 10 }] });
  add({ type: "H4", code: "h4-2", no: "심화 4-2", title: "단위 부피당 A, B 그래프 (6N)", unit: "N",
    text: "HCl 수용액 20 mL에 NaOH 수용액을 넣을 때 단위 부피당 A, B의 수 그래프예요. B는 6N에서 시작하고, 40 mL에서 A와 만나요.",
    hint: ["B = Cl⁻ 120N, 만나는 40 mL가 중화점 → x = 2N.", "NaOH [3N/mL] → 20 mL에서 y = 1.5N.", "60 mL : 전체 이온 360N / 80 mL = 4.5N."],
    views: [{ k: "pervol", title: "첨가 그래프", acid: { s: "HCl", vol: 20, conc: 6 }, base: { s: "NaOH", conc: 3 }, max: 60, ticks: [0, 20, 40, 60], series: ["acidIon", "baseIon"], names: { acidIon: "B (Cl⁻)", baseIon: "A (Na⁺)" }, start: 20 }] });
  add({ type: "H4", code: "296", o: true, no: "296", title: "단위 부피당 전체 양이온 수 그래프 고르기", unit: "N",
    text: "실험 결과로 HCl [24N/mL], NaOH [48N/mL]를 구한 뒤, HCl 10 mL에 NaOH를 넣을 때의 단위 부피당 전체 양이온 수 그래프를 골라요.",
    hint: ["Ⅰ에서 사라진 B = H⁺ → Ⅰ 산성 → C = Cl⁻, A = K⁺.", "Ⅱ의 E(240N) = Na⁺, D = OH⁻ → NaOH 5 mL에 240N.", "양이온 : 24N → 중화점 5 mL에서 16N(최소) → 점근선 48N."],
    views: [{ k: "mix", title: "용액 Ⅰ, Ⅱ (입자 1개 = 60N으로 표시)", mixes: [M("Ⅰ", [p("HCl", 5, 2), p("KOH", 10, 1)]), M("Ⅱ", [p("HCl", 5, 2), p("KOH", 10, 1), p("NaOH", 5, 4)])], btb: true, perVol: true },
      { k: "pervol", title: "HCl 10 mL에 NaOH를 넣을 때", acid: { s: "HCl", vol: 10, conc: 24 }, base: { s: "NaOH", conc: 48 }, max: 20, ticks: [0, 5, 10, 20], series: ["cation"], asymptote: true, start: 5 }] });
  add({ type: "H4", code: "h4-3", no: "심화 4-3", title: "단위 부피당 양이온 수 그래프 고르기", unit: "N",
    text: "단위 부피당 양이온 수가 HCl 6N, NaOH 3N일 때, HCl 10 mL에 NaOH를 40 mL까지 넣는 그래프를 골라요.",
    hint: ["중화점 20 mL. 그 전까지 양이온 수 60N 일정 → 단위 부피당 감소, 20 mL에서 2N.", "이후 Na⁺만 → 점근선 3N에 가까워짐."],
    views: [{ k: "pervol", title: "첨가 그래프", acid: { s: "HCl", vol: 10, conc: 6 }, base: { s: "NaOH", conc: 3 }, max: 40, ticks: [0, 10, 20, 30, 40], series: ["cation"], asymptote: true, start: 20 }] });
  add({ type: "H4", code: "h4-4", no: "심화 4-4", title: "단위 부피당 전체 이온 수 그래프에서 V 구하기", unit: "N",
    text: "HCl V mL에 NaOH를 넣을 때 단위 부피당 전체 이온 수가 0 mL 6N, 10 mL 4N(최소), 30 mL 7.2N이에요.",
    hint: ["꺾이는 10 mL = 중화점 → 6N × V = 4N × (V + 10) → V = 20.", "30 mL : 7.2N × 50 = 360N = NaOH 30 mL 전체 이온 → 12N/mL.", "5 mL : 120N / 25 mL = 4.8N."],
    views: [{ k: "pervol", title: "첨가 그래프", acid: { s: "HCl", vol: 20, conc: 3 }, base: { s: "NaOH", conc: 6 }, max: 30, ticks: [0, 10, 30], series: ["total"], asymptote: true, start: 10 }] });

  window.PRESETS = L;
})();
