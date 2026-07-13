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

const state = { filter:"all", noFree:false, sort:"score", open:new Set() };
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
  return `<div><h3>判讀</h3><p>${trip.summary}</p><div class="detail-actions"><a class="text-link" href="${trip.source}" target="_blank" rel="noreferrer">旅行社原始頁面<i data-lucide="external-link"></i></a></div></div><div><h3>每日重點</h3>${dayList(trip)}</div>`;
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
      ${expanded ? `<div class="trip-card__detail">${dayList(trip)}<a class="text-link" href="${trip.source}" target="_blank" rel="noreferrer">旅行社原始頁面<i data-lucide="external-link"></i></a></div>` : ""}
    </article>`;
  }).join("");
}

function render() {
  const list = visibleTrips();
  document.querySelector("#result-count").textContent = `顯示 ${list.length} 個行程`;
  renderTable(list); renderCards(list);
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
