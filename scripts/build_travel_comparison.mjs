import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "outputs/rmq-kkj-20260925";
const outputFile = `${outputDir}/台中北九州_2026-09-25行程比較.xlsx`;

const trips = [
  ["T01", "首選", "旅遊家旅行社", "FUK05260925A", "九州神話秘境5日：高千穗、南阿蘇鐵道、柳川、糸島、雙溫泉", 35900, 25, 0, 0, 1, 1, 1, 0, "只有第4天晚餐自理；免稅店與LaLaport集中同一天。價格、餐食與景點密度最均衡。", "https://b2b.travelerts.com.tw/EW/GO/GroupDetail.asp?prodCd=FUK05260925A", "最符合偏好，建議優先詢問"],
  ["T02", "首選", "華府旅行社", "CIKKJ260925C", "北九州山口5日：Safari Land、秋芳洞、琉璃光寺、元乃隅神社、角島", 43900, null, 0, 0, 1, 1, 1, 0, "Safari Land是自然動物園，不是機械遊樂園；唐戶市場午餐自理，另有免稅店與LaLaport。", "https://www.go100tour.com/products/group/detail/CIKKJ260925C", "內容完整，但比旅遊家貴8,000元"],
  ["T03", "推薦", "山富旅遊", "FUK05KJ29", "超值好運北九州鐵道5日：海景電車、賞豚、高千穗、熊本熊電鐵", 36900, 21, 0, 0, 1, 1, 2, 1, "回程日午餐自理；另含茶村、L'isola Terrace、免稅店與LaLaport，購物比前兩名多。", "https://www.travel4u.com.tw/group/itinerary/FUK05KJ29/", "活動豐富，購物量中等"],
  ["T04", "推薦", "山富旅遊", "FUK05KJ30", "超值全覽北九州宮崎5日：由布院、日南海岸、鵜戶神宮、青井阿蘇神社", 36900, 23, 0, 0, 1, 1, 1, 2, "回程日午餐自理；黑醋工廠、酒造、免稅店與LaLaport，商品型見學較多。", "https://www.travel4u.com.tw/group/itinerary/FUK05KJ30/", "無自由活動，購物略多"],
  ["T05", "普通", "燦星旅遊", "KKJ05CI01", "九州星旅行5日：湯布院、高千穗、柳川、熊本城、特色小火車", 45900, 7, 0, 0.5, 2, 1, 0, 0, "第4天晚餐、第5天午餐自理；回程日前半天為福岡自由活動。", "https://tour.startravel.com.tw/itin/00001-KKJ05CI01/KKJ05261009A", "價格最高且含半日自由"],
  ["T06", "不建議", "山富旅遊", "FUK05KJ28", "超值特惠輕鬆玩北九州5日：酒造、由布院、黑川溫泉、熊本熊電鐵", 34900, 23, 0, 0, 4, 2, 2, 1, "第3天晚餐、第4天午晚餐、第5天午餐自理；連兩天免稅店，另有商場。", "https://www.travel4u.com.tw/group/itinerary/FUK05KJ28/", "便宜，但自理餐與購物都偏多"],
  ["T07", "不建議", "華府／中天", "CIKKJ5D01", "北九州小資輕旅行5日：門司港、唐戶市場、湯布院、柳川、一日自由", 36900, 27, 0, 1, 4, 1, 1, 0, "第4天整日自由活動，共4餐自理；末日另有免稅店與LaLaport。", "https://www.chinasky.com.tw/group_detail.asp?seq=11084", "與偏好明顯衝突"],
  ["T08", "排除", "華府／中天", "CIKKJ5D02", "五星北九州豪斯登堡5日：豪斯登堡一日、柳川、豆田町、湯布院", 43900, 32, 1, 0, 2, 0, 1, 0, "第2天整日豪斯登堡主題樂園，直接違反不要遊樂園。", "https://www.chinasky.com.tw/group_detail.asp?seq=11080", "硬性排除"],
  ["T09", "排除", "中天旅行社", "FIT-KKJ5", "福岡機加酒自由行5日：福岡住宿4晚、不含早餐", 30900, 10, 0, 3, 11, 0, 0, 0, "幾乎全程自由活動，飯店4晚不含早餐，多數餐食自理。", "https://www.mta.com.tw/group_detail.asp?seq=11088", "硬性不符"],
];

const daily = [
  ["T01",1,"台中→北九州","家中","家中","機上餐",""],["T01",2,"門司港→唐戶市場→湯布院→別府","飯店","河豚料理","飯店自助餐",""],["T01",3,"高千穗峽→天岩戶神社→南阿蘇鐵道","飯店","鄉土料理","螃蟹吃到飽",""],["T01",4,"柳川遊船→太宰府→福岡塔→免稅店→LaLaport","飯店","水炊雞肉鍋","自理","購物2站"],["T01",5,"糸島夫婦岩→一蘭之森→機場","飯店","一蘭拉麵","機上餐",""],
  ["T02",1,"台中→北九州","無","無","機上餐",""],["T02",2,"門司港→赤間神宮→唐戶市場→湯田溫泉","飯店","自理","飯店料理","自理1餐"],["T02",3,"琉璃光寺→秋芳洞→Safari Land→雲林寺","飯店","蕎麥御膳","飯店料理","自然動物園"],["T02",4,"元乃隅神社→角島大橋→免稅店→LaLaport","飯店","河豚御膳","涮涮鍋吃到飽","購物2站"],["T02",5,"竈門神社→太宰府→機場","飯店","和牛陶板御膳","機上餐",""],
  ["T03",1,"台中→北九州","家中","家中","機上餐",""],["T03",2,"虹之松原→武雄圖書館／神社→嬉野茶村","飯店","佐賀鄉土御膳","飯店料理","茶村見學"],["T03",3,"島原海景電車→天草賞豚→L'isola Terrace","飯店","日式料理","飯店料理","商場1"],["T03",4,"高千穗峽→天岩戶→熊本熊電鐵","飯店","高千穗料理","燒肉吃到飽",""],["T03",5,"旅人列車→太宰府→免稅店→LaLaport→機場","飯店","自理","機上餐","購物2站"],
  ["T04",1,"台中→北九州","家中","家中","機上餐",""],["T04",2,"由布院→別府纜車","飯店","佐賀鄉土御膳","飯店料理",""],["T04",3,"日向岬→日南太陽花園→鵜戶神宮","飯店","日式料理","飯店料理",""],["T04",4,"黑醋工廠→青井阿蘇神社→酒造→熊本熊港","飯店","南九州料理","燒肉吃到飽","工廠2"],["T04",5,"太宰府→免稅店→LaLaport→機場","飯店","自理","機上餐","購物2站"],
  ["T05",1,"台中→北九州","家中","家中","機上餐",""],["T05",2,"門司港→宇佐神宮→湯布院","飯店","日式御膳","飯店料理",""],["T05",3,"九重吊橋→南阿蘇鐵道→高千穗","飯店","阿蘇料理","螃蟹吃到飽",""],["T05",4,"熊本城→柳川→免稅店→太宰府","飯店","鰻魚御膳","自理","購物1站"],["T05",5,"福岡半日自由活動→機場","飯店","自理","機上餐","半日自由"],
  ["T06",1,"台中→北九州","家中","家中","機上餐",""],["T06",2,"酒造→由布院→黑川溫泉","飯店","團體餐","飯店料理","酒造見學"],["T06",3,"熊本熊電鐵等團體行程","飯店","團體餐","自理","自理1餐"],["T06",4,"團體景點→免稅店／商場","飯店","自理","自理","自理2餐＋購物"],["T06",5,"免稅店→機場","飯店","自理","機上餐","自理1餐＋購物"],
  ["T07",1,"台中→北九州","家中","家中","機上餐",""],["T07",2,"門司港→唐戶市場→湯布院","飯店","自理","飯店料理","自理1餐"],["T07",3,"柳川等團體行程","飯店","團體餐","自理","自理1餐"],["T07",4,"整日自由活動","飯店","自理","自理","自由1日＋自理2餐"],["T07",5,"免稅店→LaLaport→機場","飯店","團體餐","機上餐","購物2站"],
  ["T08",1,"台中→北九州","家中","家中","機上餐",""],["T08",2,"豪斯登堡整日遊園","飯店","自理","自理","主題樂園，排除"],["T08",3,"豆田町等團體行程","飯店","團體餐","團體餐",""],["T08",4,"柳川→湯布院等團體行程","飯店","團體餐","團體餐","商場1"],["T08",5,"太宰府→機場","飯店","團體餐","機上餐",""],
  ["T09",1,"台中→北九州→福岡飯店","自理","自理","機上餐",""],["T09",2,"自由活動","自理","自理","自理","自由1日"],["T09",3,"自由活動","自理","自理","自理","自由1日"],["T09",4,"自由活動","自理","自理","自理","自由1日"],["T09",5,"自由活動→機場","自理","自理","機上餐","自由半日"],
];

const channels = [
  ["FUK05260925A","旅遊家旅行社",35900,25,"9/25專屬頁面","https://b2b.travelerts.com.tw/EW/GO/GroupDetail.asp?prodCd=FUK05260925A"],
  ["CIKKJ5D03","華府旅行社",43900,null,"9/25直接售價","https://www.go100tour.com/products/group/detail/CIKKJ260925C"],
  ["CIKKJ5D03","富丞旅行社",46900,28,"同團型不同通路；高3,000元","https://www.cheerstour.com.tw/group_detail.asp?seq=11087"],
  ["FUK05KJ29","山富旅遊",36900,21,"9/25團期","https://www.travel4u.com.tw/group/itinerary/FUK05KJ29/"],
  ["FUK05KJ30","山富旅遊",36900,23,"9/25團期","https://www.travel4u.com.tw/group/itinerary/FUK05KJ30/"],
  ["FUK05KJ28","山富旅遊",34900,23,"9/25團期","https://www.travel4u.com.tw/group/itinerary/FUK05KJ28/"],
  ["CIKKJ5D01","華府旅行社",36900,27,"9/25；華府／中天聯盟商品","https://www.chinasky.com.tw/group_detail.asp?seq=11084"],
  ["CIKKJ5D02","中天旅行社",43900,32,"9/25；含豪斯登堡","https://www.chinasky.com.tw/group_detail.asp?seq=11080"],
  ["FIT-KKJ5","中天旅行社",30900,10,"9/25機加酒自由行","https://www.mta.com.tw/group_detail.asp?seq=11088"],
  ["KKJ05CI01","燦星旅遊",45900,7,"9/25；頁面列32席","https://tour.startravel.com.tw/itin/00001-KKJ05CI01/KKJ05261009A"],
];

const wb = Workbook.create();
const summary = wb.worksheets.add("9-25推薦");
const compare = wb.worksheets.add("行程比較");
const detail = wb.worksheets.add("逐日明細");
const sales = wb.worksheets.add("通路價差");
const rules = wb.worksheets.add("評分規則");
wb.comments.setSelf({ displayName: "zinojeng" });

const navy="#17324D", teal="#0F766E", gold="#E8B44F", red="#B42318", green="#D1FADF", light="#F5F7FA";
for (const sheet of [summary,compare,detail,sales,rules]) sheet.showGridLines=false;

rules.getRange("A1:B8").values=[["評分規則","分數／扣分"],["起始分",100],["每一整日自由活動",35],["每一餐自理",8],["每一免稅店",8],["每一購物中心／Outlet",4],["每一商品型工廠／酒造見學",4],["有遊樂園","直接0分"]];
rules.getRange("A1:B1").format={fill:navy,font:{bold:true,color:"#FFFFFF"}};
rules.getRange("A2:A8").format.font={bold:true};
rules.getRange("A10:B14").values=[["判讀原則","說明"],["日期範圍","只收錄2026/09/25從台中出發的公開可檢索產品"],["Safari Land","自然動物園，未視為機械遊樂園；若連動物園也不要，請排除T02"],["半日自由活動","按0.5日計算，自評分扣17.5分"],["資料時間","2026-07-13；售價與席次可能即時變動"]];
rules.getRange("A10:B10").format={fill:teal,font:{bold:true,color:"#FFFFFF"}};

const headers=["ID","建議","旅行社","產品碼","行程名稱","9/25售價","可售席次","遊樂園","自由日","自理餐","免稅店","購物站","工廠見學","偏好分數","判讀","來源網址","結論"];
compare.getRange("A1:Q1").values=[headers];
compare.getRange(`A2:Q${trips.length+1}`).values=trips.map(r=>[...r.slice(0,13),null,...r.slice(13)]);
for(let i=2;i<=trips.length+1;i++) compare.getRange(`N${i}`).formulas=[[`=IF(H${i}>0,0,MAX(0,'評分規則'!$B$2-I${i}*'評分規則'!$B$3-J${i}*'評分規則'!$B$4-K${i}*'評分規則'!$B$5-L${i}*'評分規則'!$B$6-M${i}*'評分規則'!$B$7))`]];
compare.getRange("A1:Q1").format={fill:navy,font:{bold:true,color:"#FFFFFF"},wrapText:true};
compare.getRange(`F2:F${trips.length+1}`).format.numberFormat='"NT$"#,##0';
compare.getRange(`A2:N${trips.length+1}`).format.horizontalAlignment="center";
compare.getRange(`E2:E${trips.length+1}`).format.wrapText=true;
compare.getRange(`O2:Q${trips.length+1}`).format.wrapText=true;
compare.getRange(`A1:Q${trips.length+1}`).format.borders={insideHorizontal:{style:"thin",color:"#E4E7EC"}};
compare.freezePanes.freezeRows(1); compare.freezePanes.freezeColumns(5);
compare.tables.add(`A1:Q${trips.length+1}`,true,"Trips925Table");
compare.getRange(`B2:B${trips.length+1}`).conditionalFormats.add("containsText",{text:"首選",format:{fill:green,font:{bold:true,color:"#05603A"}}});
compare.getRange(`B2:B${trips.length+1}`).conditionalFormats.add("containsText",{text:"排除",format:{fill:"#FEE4E2",font:{bold:true,color:red}}});
compare.getRange(`N2:N${trips.length+1}`).conditionalFormats.add("colorScale",{criteria:[{type:"lowestValue",color:"#F97066"},{type:"percentile",value:50,color:"#FEDF89"},{type:"highestValue",color:"#32D583"}]});

summary.mergeCells("A1:H2"); summary.getRange("A1").values=[["2026/09/25 台中直飛北九州：偏好型比較"]];
summary.getRange("A1:H2").format={fill:navy,font:{bold:true,color:"#FFFFFF",size:18},verticalAlignment:"center"};
summary.getRange("A4:H4").values=[["順位","旅行社","行程","售價","分數","自由／自理","購物量","建議"]];
summary.getRange("A4:H4").format={fill:teal,font:{bold:true,color:"#FFFFFF"},wrapText:true};
const ranked=[2,3,4,5,6,7];
for(let j=0;j<ranked.length;j++){const sr=ranked[j],r=5+j;summary.getRange(`A${r}`).values=[[j+1]];summary.getRange(`B${r}:H${r}`).formulas=[[`='行程比較'!C${sr}`,`='行程比較'!E${sr}`,`='行程比較'!F${sr}`,`='行程比較'!N${sr}`,`="自由"&'行程比較'!I${sr}&"日／自理"&'行程比較'!J${sr}&"餐"`,`="免稅"&'行程比較'!K${sr}&"／商場"&'行程比較'!L${sr}&"／見學"&'行程比較'!M${sr}`,`='行程比較'!Q${sr}`]];}
summary.getRange("D5:D10").format.numberFormat='"NT$"#,##0'; summary.getRange("A5:E10").format.horizontalAlignment="center"; summary.getRange("C5:C10").format.wrapText=true; summary.getRange("F5:H10").format.wrapText=true;
summary.getRange("A12:H12").values=[["結論","最佳選擇","售價差","Safari團","排除項目","航班","查價日","完整性"]]; summary.getRange("A12:H12").format={fill:gold,font:{bold:true,color:"#1D2939"},wrapText:true};
summary.getRange("A13:H13").values=[["快速判斷","旅遊家FUK05260925A","比Safari便宜8,000","動物園非遊樂園","豪斯登堡／FIT自由行","CI7380／CI7381","2026-07-13","公開可檢索範圍"]];
summary.getRange("A15:H17").values=[["為什麼首選","旅遊家只有1餐自理，沒有自由活動；雖有免稅店與LaLaport，但集中在同一天，9/25售價35,900元。",null,null,null,null,null,null],["替代選擇","華府Safari團同樣只有1餐自理、沒有自由活動；適合能接受動物園且偏好山口自然景觀的人。",null,null,null,null,null,null],["未列入排名","雄獅可找到9/04同系列商品，但未找到可核實的9/25專屬團號與售價，因此不混入已確認9/25清單。",null,null,null,null,null,null]];
for(const r of [15,16,17]){summary.mergeCells(`B${r}:H${r}`);summary.getRange(`A${r}`).format.font={bold:true};summary.getRange(`B${r}:H${r}`).format.wrapText=true;}
summary.getRange("A4:H17").format.borders={insideHorizontal:{style:"thin",color:"#E4E7EC"}};

detail.getRange("A1:H1").values=[["ID","日次","每日路線","早餐","午餐","晚餐","自由／購物／自理註記","來源"]]; detail.getRange("A1:H1").format={fill:navy,font:{bold:true,color:"#FFFFFF"}};
const sourceMap=Object.fromEntries(trips.map(r=>[r[0],r[14]]));
detail.getRange(`A2:H${daily.length+1}`).values=daily.map(r=>[...r,sourceMap[r[0]]]);
detail.getRange(`C2:C${daily.length+1}`).format.wrapText=true; detail.getRange(`G2:H${daily.length+1}`).format.wrapText=true; detail.getRange(`A2:B${daily.length+1}`).format.horizontalAlignment="center";
detail.getRange(`A1:H${daily.length+1}`).format.borders={insideHorizontal:{style:"thin",color:"#E4E7EC"}}; detail.freezePanes.freezeRows(1); detail.freezePanes.freezeColumns(2); detail.tables.add(`A1:H${daily.length+1}`,true,"Daily925Table");

sales.getRange("A1:F1").values=[["團型／產品碼","銷售旅行社或平台","9/25售價","可售席次","價格說明","來源網址"]]; sales.getRange("A1:F1").format={fill:navy,font:{bold:true,color:"#FFFFFF"}};
sales.getRange(`A2:F${channels.length+1}`).values=channels; sales.getRange(`C2:C${channels.length+1}`).format.numberFormat='"NT$"#,##0'; sales.getRange(`E2:F${channels.length+1}`).format.wrapText=true; sales.getRange(`A1:F${channels.length+1}`).format.borders={insideHorizontal:{style:"thin",color:"#E4E7EC"}}; sales.freezePanes.freezeRows(1); sales.tables.add(`A1:F${channels.length+1}`,true,"Channels925Table");

const widths=(sheet,specs)=>{for(const [range,width] of specs)sheet.getRange(range).format.columnWidth=width;};
widths(summary,[["A:A",11],["B:B",17],["C:C",43],["D:E",13],["F:G",24],["H:H",34]]);
widths(compare,[["A:B",10],["C:C",17],["D:D",18],["E:E",50],["F:G",13],["H:N",11],["O:O",45],["P:P",54],["Q:Q",34]]);
widths(detail,[["A:B",9],["C:C",61],["D:F",19],["G:G",28],["H:H",55]]);
widths(sales,[["A:A",21],["B:B",24],["C:D",14],["E:E",30],["F:F",62]]); widths(rules,[["A:A",31],["B:B",62]]);
summary.getRange("1:2").format.rowHeight=28; summary.getRange("5:10").format.rowHeight=52; summary.getRange("15:17").format.rowHeight=44; compare.getRange(`2:${trips.length+1}`).format.rowHeight=58; detail.getRange(`2:${daily.length+1}`).format.rowHeight=46;
summary.getRange("A1:H17").format.verticalAlignment="center"; compare.getRange(`A1:Q${trips.length+1}`).format.verticalAlignment="center"; detail.getRange(`A1:H${daily.length+1}`).format.verticalAlignment="center";

const check=await wb.inspect({kind:"table",range:"9-25推薦!A1:H17",include:"values,formulas",tableMaxRows:20,tableMaxCols:8}); console.log(check.ndjson);
const errors=await wb.inspect({kind:"match",searchTerm:"#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",options:{useRegex:true,maxResults:100},summary:"formula scan"}); console.log(errors.ndjson);
await fs.mkdir(outputDir,{recursive:true});
for(const [name,range,file] of [["9-25推薦","A1:H17","summary.png"],["行程比較",`A1:Q${trips.length+1}`,"comparison.png"],["逐日明細",`A1:H${daily.length+1}`,"daily.png"],["通路價差",`A1:F${channels.length+1}`,"channels.png"],["評分規則","A1:B14","rules.png"]]){const png=await wb.render({sheetName:name,range,scale:1,format:"png"});await fs.writeFile(`${outputDir}/${file}`,new Uint8Array(await png.arrayBuffer()));}
const out=await SpreadsheetFile.exportXlsx(wb); await out.save(outputFile); console.log(outputFile);
