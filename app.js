const trips = [
  { id:"T01", level:"fit", label:"首選", agency:"旅遊家旅行社", code:"FUK05260925A", name:"九州神話秘境 5 日", subtitle:"高千穗、南阿蘇鐵道、柳川、糸島、雙溫泉", price:35900, score:80, free:0, selfMeals:1, dutyFree:1, malls:1, factories:0, summary:"價格、餐食與景點密度最均衡；免稅店與 LaLaport 集中同一天。", source:"https://b2b.travelerts.com.tw/EW/GO/GroupDetail.asp?prodCd=FUK05260925A", days:["台中→北九州","門司港→唐戶市場→湯布院→別府","高千穗峽→天岩戶神社→南阿蘇鐵道","柳川遊船→太宰府→福岡塔→免稅店→LaLaport","糸島夫婦岩→一蘭之森→機場"] },
  { id:"T02", level:"fit", label:"首選", agency:"華府旅行社", code:"CIKKJ260925C", name:"北九州山口 Safari 5 日", subtitle:"秋芳洞、琉璃光寺、元乃隅神社、角島大橋", price:43900, score:80, free:0, selfMeals:1, dutyFree:1, malls:1, factories:0, summary:"Safari Land 為自然動物園；行程完整，但比旅遊家貴 NT$8,000。", source:"https://www.go100tour.com/products/group/detail/CIKKJ260925C", days:["台中→北九州","門司港→赤間神宮→唐戶市場→湯田溫泉","琉璃光寺→秋芳洞→Safari Land→雲林寺","元乃隅神社→角島大橋→免稅店→LaLaport","竈門神社→太宰府→機場"] },
  { id:"T03", level:"fit", label:"推薦", agency:"山富旅遊", code:"FUK05KJ29", name:"超值好運北九州鐵道 5 日", subtitle:"海景電車、賞豚、高千穗、熊本熊電鐵", price:36900, score:72, free:0, selfMeals:1, dutyFree:1, malls:2, factories:1, summary:"活動豐富；含茶村、L'isola Terrace、免稅店與 LaLaport，購物量中等。", source:"https://www.travel4u.com.tw/group/itinerary/FUK05KJ29/", days:["台中→北九州","虹之松原→武雄圖書館／神社→嬉野茶村","島原海景電車→天草賞豚→L'isola Terrace","高千穗峽→天岩戶→熊本熊電鐵","旅人列車→太宰府→免稅店→LaLaport→機場"] },
  { id:"T04", level:"fit", label:"推薦", agency:"山富旅遊", code:"FUK05KJ30", name:"超值全覽北九州宮崎 5 日", subtitle:"由布院、日南海岸、鵜戶神宮、青井阿蘇神社", price:36900, score:72, free:0, selfMeals:1, dutyFree:1, malls:1, factories:2, summary:"沒有自由活動；黑醋工廠、酒造、免稅店與 LaLaport 讓商品型見學較多。", source:"https://www.travel4u.com.tw/group/itinerary/FUK05KJ30/", days:["台中→北九州","由布院→別府纜車","日向岬→日南太陽花園→鵜戶神宮","黑醋工廠→青井阿蘇神社→酒造→熊本熊港","太宰府→免稅店→LaLaport→機場"] },
  { id:"T05", level:"warn", label:"普通", agency:"燦星旅遊", code:"KKJ05CI01", name:"九州星旅行 5 日", subtitle:"湯布院、高千穗、柳川、熊本城、特色小火車", price:45900, score:58.5, free:0.5, selfMeals:2, dutyFree:1, malls:0, factories:0, summary:"售價最高；回程日前半天為福岡自由活動，另有 2 餐自理。", source:"https://tour.startravel.com.tw/itin/00001-KKJ05CI01/KKJ05261009A", days:["台中→北九州","門司港→宇佐神宮→湯布院","九重吊橋→南阿蘇鐵道→高千穗","熊本城→柳川→免稅店→太宰府","福岡半日自由活動→機場"] },
  { id:"T06", level:"warn", label:"不建議", agency:"山富旅遊", code:"FUK05KJ28", name:"超值特惠輕鬆玩北九州 5 日", subtitle:"酒造、由布院、黑川溫泉、熊本熊電鐵", price:34900, score:40, free:0, selfMeals:4, dutyFree:2, malls:2, factories:1, summary:"價格低，但有 4 餐自理、連兩天免稅店及商場安排。", source:"https://www.travel4u.com.tw/group/itinerary/FUK05KJ28/", days:["台中→北九州","酒造→由布院→黑川溫泉","熊本熊電鐵等團體行程","團體景點→免稅店／商場","免稅店→機場"] },
  { id:"T07", level:"exclude", label:"不建議", agency:"華府／中天", code:"CIKKJ5D01", name:"北九州小資輕旅行 5 日", subtitle:"門司港、唐戶市場、湯布院、柳川、一日自由", price:36900, score:21, free:1, selfMeals:4, dutyFree:1, malls:1, factories:0, summary:"第 4 天整日自由活動，共 4 餐自理，與偏好明顯衝突。", source:"https://www.chinasky.com.tw/group_detail.asp?seq=11084", days:["台中→北九州","門司港→唐戶市場→湯布院","柳川等團體行程","整日自由活動","免稅店→LaLaport→機場"] },
  { id:"T08", level:"exclude", label:"排除", agency:"華府／中天", code:"CIKKJ5D02", name:"五星北九州豪斯登堡 5 日", subtitle:"豪斯登堡一日、柳川、豆田町、湯布院", price:43900, score:0, free:0, selfMeals:2, dutyFree:0, malls:1, factories:0, summary:"第 2 天整日豪斯登堡主題樂園，直接違反不要遊樂園。", source:"https://www.chinasky.com.tw/group_detail.asp?seq=11080", days:["台中→北九州","豪斯登堡整日遊園","豆田町等團體行程","柳川→湯布院等團體行程","太宰府→機場"] },
  { id:"T09", level:"exclude", label:"排除", agency:"中天旅行社", code:"FIT-KKJ5", name:"福岡機加酒自由行 5 日", subtitle:"福岡住宿 4 晚、不含早餐", price:30900, score:0, free:3, selfMeals:11, dutyFree:0, malls:0, factories:0, summary:"幾乎全程自由活動，飯店不含早餐，多數餐食自理。", source:"https://www.mta.com.tw/group_detail.asp?seq=11088", days:["台中→北九州→福岡飯店","自由活動","自由活動","自由活動","自由活動→機場"] }
];

const tripInsights = {
  T01:{ verdict:"四項偏好條件都符合：沒有遊樂園、沒有自由活動、只有 1 餐自理，購物也只有免稅店與 LaLaport，且集中在第 4 天。價格又是四個首選中最低，因此是最穩妥的整體首選。", amusement:"沒有遊樂園或動物園。高千穗、柳川、糸島與南阿蘇鐵道都屬自然、文化或交通體驗。", freeDetail:"0 日。五天皆由旅行社安排，不需要自行規劃半天或整天行程。", shoppingDetail:"共 2 個明確商業停留：第 4 天的免稅店與 LaLaport。兩站排在同一天，不會每天穿插購物。", mealDetail:"共 1 餐自理：第 4 天晚餐。其餘主要餐食包含河豚料理、鄉土料理、螃蟹吃到飽、水炊雞鍋與一蘭拉麵。", theme:"高千穗神話自然、南阿蘇鐵道、柳川遊船與糸島海岸，景點類型平均。", pace:"移動量高。路線跨北九州、大分／別府、高千穗、福岡與糸島，但每天仍有明確主題。", bestFor:"最重視少購物、少自理餐，同時希望價格合理、景點種類均衡的人。", warning:"第 4 天仍有免稅店與大型商場；若完全不想購物，四個首選都無法做到零購物。"},
  T02:{ verdict:"自由活動與自理餐控制得和旅遊家一樣好，購物也只有 2 站。最大差異是 Safari Land：它不是機械式遊樂園，但仍是以動物觀賞與餵食為核心的園區；另外價格高 8,000 元。", amusement:"沒有機械式主題樂園，但第 3 天安排 Safari Land 自然動物園。若你的『不要遊樂園』也包含不想去動物園，這團就應排除。", freeDetail:"0 日。全程團體行程，沒有半日或整日自由活動。", shoppingDetail:"共 2 個明確商業停留：第 4 天免稅店與 LaLaport，同樣集中在一天。", mealDetail:"共 1 餐自理：第 2 天唐戶市場午餐。這種自理餐可自行挑海鮮，但也代表費用與座位要自己處理。", theme:"山口自然與文化景觀最突出，包括秋芳洞、琉璃光寺、元乃隅神社與角島大橋。", pace:"相對移動量中等。主要集中在北九州、山口與福岡，比跨宮崎、熊本的路線單純。", bestFor:"能接受自然動物園，而且特別想看山口海岸、洞窟與神社景觀的人。", warning:"四個首選中價格最高；Safari 是否符合個人定義，是下訂前最需要先確認的問題。"},
  T03:{ verdict:"沒有遊樂園與自由活動，也只有 1 餐自理；弱點在購物／商品型停留達 4 站。它的優勢不是清閒，而是交通體驗非常多，適合把火車、遊船和賞豚看得比少購物更重要的人。", amusement:"沒有遊樂園。海景電車、賞豚船與熊本熊電鐵都屬交通或觀光體驗。", freeDetail:"0 日。每日均有團體安排，回程日也不是自由活動。", shoppingDetail:"共 4 個商業或商品型停留：嬉野茶村、L'isola Terrace、免稅店、LaLaport。後兩站集中第 5 天，但前面仍有茶村與商場。", mealDetail:"共 1 餐自理：第 5 天午餐。其餘日程餐食完整，自理餐發生在回程日，影響相對較小。", theme:"四團中交通體驗最豐富：島原海景電車、天草賞豚、熊本熊電鐵與旅人列車。", pace:"移動量高。路線跨佐賀、島原、天草、高千穗、熊本與福岡，交通體驗多也代表轉換較頻繁。", bestFor:"喜歡特色列車、遊船與賞豚，願意以較多商業停留交換活動豐富度的人。", warning:"購物相關停留是旅遊家與 Safari 團的兩倍，不符合『購物越少越好』的嚴格版本。"},
  T04:{ verdict:"沒有遊樂園、沒有自由活動、只有 1 餐自理，但有黑醋工廠、酒造、免稅店與 LaLaport 共 4 個商品型／購物停留。最大賣點是其他首選沒有的宮崎海岸線。", amusement:"沒有遊樂園。日南太陽花園列為景觀園區而非機械式主題樂園。", freeDetail:"0 日。五天皆有團體行程，沒有自行安排時段。", shoppingDetail:"共 4 個商品型或購物停留：黑醋工廠、酒造、免稅店、LaLaport。第 4、5 天連續出現商業停留。", mealDetail:"共 1 餐自理：第 5 天午餐。其他餐食由行程安排。", theme:"宮崎海岸與神社主題最鮮明，包括日向岬、日南海岸、鵜戶神宮與青井阿蘇神社。", pace:"移動量高，而且南北跨度最大。從大分往宮崎，再經熊本回福岡，較在意長途拉車者要審慎。", bestFor:"最想看宮崎海岸、鵜戶神宮，且能接受工廠與酒造見學的人。", warning:"商品型停留較多，路線跨度也大；若少購物和少拉車都很重要，優先度應低於前兩名。"},
  T05:{ verdict:"沒有遊樂園，但回程日前半天是自由活動，另有 2 餐自理，售價又是全部團型最高。即使景點不差，也不符合『不要自由活動、自理餐不要多』的核心偏好。", amusement:"沒有遊樂園。", freeDetail:"約 0.5 日：第 5 天福岡自由活動至前往機場。需要自行安排動線與午餐。", shoppingDetail:"1 個明確免稅店；頁面未列大型商場為主要購物站。", mealDetail:"共 2 餐自理：第 4 天晚餐、第 5 天午餐。", theme:"湯布院、高千穗、柳川、熊本城與特色小火車，經典九州景點齊全。", pace:"移動量高，跨大分、高千穗、熊本與福岡。", bestFor:"能接受半日自由活動，想一次看到多個經典九州景點的人。", warning:"自由活動、自理餐與高售價三項都不占優勢。"},
  T06:{ verdict:"沒有自由活動和遊樂園，但 4 餐自理、2 次免稅店、2 個商場及 1 次酒造見學，明顯違反『少購物、少自理餐』。低價不足以抵銷這些取捨。", amusement:"沒有遊樂園。", freeDetail:"0 日。全程有團體安排。", shoppingDetail:"至少 5 個購物或商品型停留：酒造、2 次免稅店與 2 個商場。購物分散在多天。", mealDetail:"共 4 餐自理：第 3 天晚餐、第 4 天午餐與晚餐、第 5 天午餐。", theme:"由布院、黑川溫泉與熊本熊電鐵，溫泉和熱門景點兼具。", pace:"移動量中高，並在後段安排較多商業停留。", bestFor:"預算優先、能接受自行用餐與購物安排的人。", warning:"自理餐與購物量都偏高，是本次偏好下最不利的組合之一。"},
  T07:{ verdict:"有整日自由活動、4 餐自理，末日還有免稅店與 LaLaport。雖然沒有遊樂園，但同時踩到自由活動與餐食兩個主要扣分項目。", amusement:"沒有遊樂園。", freeDetail:"1 整日：第 4 天完全自由活動，需要自行規劃交通、景點與兩餐。", shoppingDetail:"2 個明確購物站：免稅店與 LaLaport。", mealDetail:"共 4 餐自理，包含自由活動日的午晚餐。", theme:"門司港、唐戶市場、湯布院與柳川，行程前半段較經典。", pace:"團體行程日移動量中等，但自由活動日的負擔轉由旅客承擔。", bestFor:"喜歡留一整天自行逛福岡、願意自己處理餐食的人。", warning:"與『不要自由活動』直接衝突，不應因價格較低而選擇。"},
  T08:{ verdict:"第 2 天整日豪斯登堡，屬明確主題樂園行程。這是硬性排除條件，不需要再用價格、餐食或購物數量補救。", amusement:"有：豪斯登堡整日遊園，屬主題樂園。", freeDetail:"0 日，但遊樂園內通常會有自行遊玩時段；本評分仍以遊樂園直接歸零。", shoppingDetail:"至少 1 個商場型停留；豪斯登堡園內消費不另計入購物站。", mealDetail:"共 2 餐自理，安排在豪斯登堡遊園日。", theme:"豪斯登堡歐風園區搭配柳川、豆田町與湯布院。", pace:"移動量中等，但一天完整投入主題樂園。", bestFor:"以豪斯登堡為主要目的、喜歡主題園區的人。", warning:"直接違反『不要遊樂園』，本次應排除。"},
  T09:{ verdict:"價格最低，但幾乎全程自由活動，飯店不含早餐，多達 11 餐自理。它是機加酒自由行，不是符合本次需求的團體套裝行程。", amusement:"沒有指定遊樂園，但自由活動期間旅客可自行安排。", freeDetail:"約 3 日以上，行程大多由旅客自行規劃。", shoppingDetail:"沒有旅行社指定購物站，但自由活動中的逛街與交通需自行決定，不能因此視為低負擔團體行程。", mealDetail:"約 11 餐自理，且飯店 4 晚不含早餐。", theme:"福岡定點住宿，自行規劃北九州或市區活動。", pace:"旅行社安排少，但個人規劃、交通與用餐負擔最高。", bestFor:"本來就想自由行、願意自己處理所有細節的人。", warning:"同時違反『不要自由活動』與『自理餐不要多』，本次直接排除。"}
};

const state = { filter:"all", noFree:false, sort:"score", open:new Set(), compare:new Set(["T01","T02","T03"]) };
const money = value => `NT$${value.toLocaleString("zh-TW")}`;
const statusClass = level => level === "fit" ? "good" : level === "warn" ? "warn" : "bad";
const shoppingText = trip => `免稅 ${trip.dutyFree}・商場 ${trip.malls}・見學 ${trip.factories}`;

function visibleTrips() {
  let list = trips.filter(trip => {
    const categoryMatch = state.filter === "all" || (state.filter === "fit" ? trip.level === "fit" : trip.level !== "fit");
    return categoryMatch && (!state.noFree || trip.free === 0);
  });
  return list.sort((a,b) => {
    if (state.sort === "price-low") return a.price - b.price || b.score - a.score;
    if (state.sort === "self-meals") return a.selfMeals - b.selfMeals || b.score - a.score;
    return b.score - a.score || a.price - b.price;
  });
}

function dayList(trip) {
  return `<ol class="day-list">${trip.days.map((day,index)=>`<li><b>DAY ${index+1}</b><span>${day}</span></li>`).join("")}</ol>`;
}

function detailContent(trip) {
  const insight = tripInsights[trip.id];
  return `<div><h3>偏好判讀</h3><p>${insight.verdict}</p><dl class="detail-criteria"><div><dt>遊樂園</dt><dd>${insight.amusement}</dd></div><div><dt>自由活動</dt><dd>${insight.freeDetail}</dd></div><div><dt>購物</dt><dd>${insight.shoppingDetail}</dd></div><div><dt>自理餐</dt><dd>${insight.mealDetail}</dd></div></dl><div class="detail-actions"><a class="text-link" href="${trip.source}" target="_blank" rel="noreferrer">旅行社原始頁面<i data-lucide="external-link"></i></a></div></div><div><h3>每日重點</h3>${dayList(trip)}</div>`;
}

function renderComparePicker() {
  const count = state.compare.size;
  document.querySelector("#compare-status").textContent = `已選 ${count}／3 家`;
  document.querySelector("#compare-picker").innerHTML = trips.map(trip => {
    const checked = state.compare.has(trip.id);
    const disabled = !checked && count >= 3;
    return `<label class="compare-option ${checked ? "is-selected" : ""} ${disabled ? "is-disabled" : ""}"><input type="checkbox" data-compare="${trip.id}" ${checked ? "checked" : ""} ${disabled ? "disabled" : ""}><span><b>${trip.agency}</b><small>${trip.name}</small></span><strong>${trip.score}</strong></label>`;
  }).join("");
  document.querySelectorAll("[data-compare]").forEach(input => input.addEventListener("change", event => {
    const id = event.target.dataset.compare;
    if (event.target.checked && state.compare.size < 3) state.compare.add(id);
    if (!event.target.checked && state.compare.size > 1) state.compare.delete(id);
    renderComparePicker(); renderSelectedCompare();
    if (window.lucide) window.lucide.createIcons();
  }));
}

const compareRows = [
  ["偏好總判讀","verdict"],["遊樂園判讀","amusement"],["自由活動判讀","freeDetail"],["購物安排判讀","shoppingDetail"],["自理餐判讀","mealDetail"],["行程主題","theme"],["路線與節奏","pace"],["適合誰","bestFor"],["最需注意","warning"]
];

function renderSelectedCompare() {
  const selected = trips.filter(trip => state.compare.has(trip.id));
  const head = selected.map(trip => `<th><span class="status status--${statusClass(trip.level)}">${trip.label}</span><strong>${trip.agency}</strong><small>${trip.name}</small><b>${money(trip.price)}・${trip.score} 分</b></th>`).join("");
  const rows = compareRows.map(([label,key]) => `<tr><th>${label}</th>${selected.map(trip => `<td>${tripInsights[trip.id][key]}</td>`).join("")}</tr>`).join("");
  const mobile = selected.map(trip => `<article class="selected-card"><header><span class="status status--${statusClass(trip.level)}">${trip.label}</span><div><h3>${trip.agency}｜${trip.name}</h3><p>${money(trip.price)}・${trip.score} 分</p></div></header><dl>${compareRows.map(([label,key]) => `<div><dt>${label}</dt><dd>${tripInsights[trip.id][key]}</dd></div>`).join("")}</dl></article>`).join("");
  document.querySelector("#selected-compare").innerHTML = `<div class="selected-table-shell"><table class="selected-table cols-${selected.length}"><thead><tr><th>詳細差異</th>${head}</tr></thead><tbody>${rows}</tbody></table></div><div class="selected-mobile">${mobile}</div>`;
}

function renderTable(list) {
  document.querySelector("#trip-table").innerHTML = list.map(trip => {
    const expanded = state.open.has(trip.id);
    return `<tr class="trip-row">
      <td><span class="status status--${statusClass(trip.level)}">${trip.label}</span></td>
      <td class="trip-name"><strong>${trip.agency}｜${trip.name}</strong><span>${trip.subtitle}・${trip.code}</span></td>
      <td class="metric">${money(trip.price)}</td><td class="score">${trip.score}</td><td>${trip.free} 日</td><td>${trip.selfMeals} 餐</td><td class="shopping">${shoppingText(trip)}</td>
      <td><button class="icon-button" type="button" data-toggle="${trip.id}" aria-label="${expanded ? "收合" : "展開"}${trip.name}" aria-expanded="${expanded}"><i data-lucide="chevron-down"></i></button></td>
    </tr>${expanded ? `<tr class="detail-row"><td colspan="8"><div class="detail-panel">${detailContent(trip)}</div></td></tr>` : ""}`;
  }).join("");
}

function renderCards(list) {
  document.querySelector("#trip-cards").innerHTML = list.map(trip => {
    const expanded = state.open.has(trip.id);
    return `<article class="trip-card">
      <div class="trip-card__head"><div><span class="status status--${statusClass(trip.level)}">${trip.label}</span><h3>${trip.agency}｜${trip.name}</h3><p>${trip.subtitle}</p></div><strong>${trip.score}</strong></div>
      <div class="trip-card__metrics"><div><span>售價</span><strong>${money(trip.price)}</strong></div><div><span>自由活動</span><strong>${trip.free} 日</strong></div><div><span>自理餐</span><strong>${trip.selfMeals} 餐</strong></div></div>
      <div class="trip-card__summary">${trip.summary}</div>
      <button class="trip-card__toggle" type="button" data-toggle="${trip.id}" aria-expanded="${expanded}">${expanded ? "收合行程" : "查看五日行程"}<i data-lucide="chevron-down"></i></button>
      ${expanded ? `<div class="trip-card__detail"><div class="mobile-analysis"><strong>偏好判讀</strong><p>${tripInsights[trip.id].verdict}</p></div>${dayList(trip)}<a class="text-link" href="${trip.source}" target="_blank" rel="noreferrer">旅行社原始頁面<i data-lucide="external-link"></i></a></div>` : ""}
    </article>`;
  }).join("");
}

function render() {
  const list = visibleTrips();
  document.querySelector("#result-count").textContent = `顯示 ${list.length} 個行程`;
  renderTable(list); renderCards(list); renderComparePicker(); renderSelectedCompare();
  document.querySelectorAll("[data-toggle]").forEach(button => button.addEventListener("click", () => {
    const id = button.dataset.toggle;
    state.open.has(id) ? state.open.delete(id) : state.open.add(id);
    render();
  }));
  if (window.lucide) window.lucide.createIcons();
}

document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
  state.filter = button.dataset.filter;
  document.querySelectorAll("[data-filter]").forEach(item => item.classList.toggle("is-active", item === button));
  render();
}));
document.querySelector("#no-free").addEventListener("change", event => { state.noFree = event.target.checked; render(); });
document.querySelector("#sort-select").addEventListener("change", event => { state.sort = event.target.value; render(); });
window.addEventListener("DOMContentLoaded", render);
