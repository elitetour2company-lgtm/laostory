export type ItineraryItem =
  | { kind: "note"; text: string }
  | { kind: "move"; route: string; mode: string; time?: string }
  | { kind: "stop"; name: string; text: string };

const note = (text: string): ItineraryItem => ({ kind: "note", text });
const move = (route: string, mode: string, time?: string): ItineraryItem => ({
  kind: "move",
  route,
  mode,
  time,
});
const stop = (name: string, text: string): ItineraryItem => ({ kind: "stop", name, text });

const CAR = "전용차량";
const TRAIN = "고속열차";

// ── 비엔티안
const HOPHRAKEO = stop(
  "왓호파깨우",
  "1565년 세타티랏 왕이 란쌍 왕국의 수도를 비엔티안으로 옮기며 에메랄드 불상을 모시기 위해 세운 왕실 사원입니다. 지금은 박물관으로 쓰이며 여러 불상과 불교 미술품을 볼 수 있습니다."
);
const SISAKET = stop(
  "왓시싸켓",
  "1818년 아누웡 왕이 세운 사원으로, 시암의 침략 속에서도 남은 비엔티안에서 가장 오래된 사원입니다. 회랑 벽을 따라 작은 벽감마다 수천 개의 불상이 줄지어 놓여 있습니다."
);
const THATLUANG = stop(
  "탓루앙 사원",
  "높이 약 45m의 황금빛 불탑으로 라오스의 국가 상징입니다. 라오스 사람들이 가장 신성하게 여기는 불교 유적이며, 해질 무렵 금빛으로 빛납니다."
);
const PATUXAI = stop(
  "빠뚜싸이",
  "프랑스 파리의 개선문을 본떠 지은 독립 기념문으로, 건물 곳곳에 라오스 양식의 문양이 새겨져 있습니다. 167개 계단을 올라 꼭대기 전망대에서 비엔티안 시내를 내려다볼 수 있습니다."
);
const NIGHTMARKET = stop(
  "메콩강변 야시장",
  "오후 5시쯤부터 밤 10시 무렵까지 열리는 시장으로, 길거리 음식과 실크 스카프 같은 기념품을 구경하기 좋습니다. 강 건너편으로 태국이 보입니다."
);
const BUDDHAPARK = stop(
  "붓다파크(씨엥쿠안)",
  "시내에서 약 25km 떨어진 메콩강변의 조각공원입니다. 불교와 힌두 설화를 주제로 한 크고 작은 조각상이 많이 모여 있습니다."
);

// ── 방비엥
const CAVE = stop(
  "탐논·탐쌍 동굴 튜빙",
  "헤드라이트를 쓰고 튜브에 누운 채 줄을 잡고 물이 흐르는 석회암 동굴 속으로 들어갑니다. 탐쌍은 코끼리 모양 종유석이 있어 코끼리 동굴로도 불립니다."
);
const KAYAK = stop(
  "남쏭강 카약",
  "남쏭강 위에서 카약을 타고 석회암 산을 바라보며 내려옵니다. 2인 1정이 기본이고 안전 교육을 받은 뒤 출발합니다."
);
const LAGOON = stop(
  "블루라군",
  "에메랄드빛 물에서 수영하고 나무 위에서 뛰어내리는 천연 수영장으로, 방비엥에서 가장 인기 있는 곳 중 하나입니다. 낮 12시부터 3시 사이에 가장 붐벼서 오전에 가면 한결 한적합니다."
);
const EUROSTREET = stop(
  "유로피안 거리 자유시간",
  "방비엥 시내의 유로피안 거리를 걸으며 카페와 식당을 둘러보고 자유시간을 보냅니다."
);

// ── 무앙프앙
const MUANGTEMPLE = stop(
  "무앙프앙 불교사원",
  "자연경관이 아름다운 사원입니다. 강과 산이 어우러진 풍경 속에서 조용히 시간을 보냅니다."
);
const ANGNAMTONG = stop(
  "앙남통 전망 포인트",
  "강과 산이 한눈에 보이는 전망 포인트로, 무앙프앙의 풍경을 감상하기 좋습니다."
);
const FLOATHOUSE = stop(
  "수상가옥",
  "강 위에 떠 있는 방갈로에서 하룻밤을 보냅니다. 대나무와 목재로 지은 소박한 숙소라 호텔과 시설이 다르지만, 강 위에서 보내는 밤이 이 코스의 특별한 점입니다."
);
const WATERALMS = stop(
  "새벽 수상 탁발",
  "이른 새벽 스님들이 배를 타고 강 위를 지나며 시주를 받는 의식을 지켜봅니다. 수상가옥에 머물러야 볼 수 있는 풍경이며, 관람만 하시고 사진은 조용히 찍어 주세요."
);

// ── 루앙프라방
const KUANGSI = stop(
  "꽝시폭포",
  "루앙프라방 시내에서 남쪽으로 약 30km 떨어진 폭포입니다. 여러 단의 에메랄드빛 물웅덩이로 이어져 수영을 즐길 수 있고, 물색은 건기에 가장 맑습니다."
);
const PHOUSI = stop(
  "푸시산",
  "루앙프라방 시내 한가운데 솟은 작은 산으로, 약 300여 개의 계단을 올라 꼭대기에서 메콩강과 도시를 내려다봅니다. 해질녘에 오르는 분이 많습니다."
);
const LPNIGHT = stop(
  "몽족 야시장",
  "해가 지면 왕궁박물관 앞 거리에 서는 야시장으로, 수공예품과 길거리 음식을 구경할 수 있습니다."
);
const TAKBAT = stop(
  "새벽 탁발",
  "해가 뜨기 전 주황색 가사를 입은 스님들이 줄지어 걸으며 시주를 받는 의식입니다. 구경하실 때는 어깨와 무릎을 가리고, 거리를 두고 조용히 지켜보며 플래시는 꺼 주세요."
);
const MORNINGMARKET = stop(
  "새벽 재래시장",
  "탁발이 끝난 뒤 현지 주민들이 장을 보는 아침 시장을 둘러봅니다."
);
const XIENGTHONG = stop(
  "왓시엥통",
  "금빛 장식과 모자이크 벽화로 유명한 루앙프라방의 대표 사원입니다."
);

// ── 골프장
const BOOYOUNG = stop(
  "부영 골프 클럽",
  "한국 부영그룹이 지은 27홀 코스로, SEA Games 골프 종목이 열린 곳입니다. 18홀 라운딩을 즐깁니다."
);
const LAKEVIEW = stop(
  "레이크뷰 골프 클럽",
  "인공 호수가 코스를 둘러싼 18홀 코스입니다. 18홀 라운딩을 즐깁니다."
);
const LONGBIEN = stop(
  "롱비엔 골프 클럽",
  "라오스에서 가장 큰 규모의 27홀 코스로, 난이도가 높은 편이고 야간 조명 시설이 있습니다. 18홀 라운딩을 즐깁니다."
);
const MEKONG = stop(
  "메콩 골프 CC",
  "비엔티안 시내에서 떨어진 18홀 코스로, 가성비가 좋은 편입니다. 18홀 라운딩을 즐깁니다."
);

// ── 공통 문구
const ARRIVE_GUIDE = [
  note("서울(ICN) 출발 → 비엔티안(VTE) 왓따이 공항 오후 도착"),
  note("성함이 적힌 피켓을 든 가이드와 미팅 후 숙소로 이동, 체크인 후 휴식"),
];
const ARRIVE_DRIVER = [
  note("서울(ICN) 출발 → 비엔티안(VTE) 왓따이 공항 오후 도착"),
  note("성함이 적힌 피켓을 든 기사님과 미팅 후 숙소로 이동, 체크인 후 휴식"),
];
const LAST_DAY = [note("비엔티안(VTE) 출발 → 서울(ICN) 새벽 도착")];
const BREAKFAST_GUIDE = note("호텔 조식 후 가이드 미팅");
const BREAKFAST_DRIVER = note("호텔 조식 후 기사님 미팅");
const REST = note("호텔로 이동 후 휴식");
const AIRPORT = note("왓따이 공항으로 이동 후 출발");
const AFTER_ROUND_FREE = note(
  "라운드 후 호텔로 돌아와 샤워와 정비, 이후 자유시간(고객센터 또는 기사님과 상의해 원하는 곳으로 이동하거나 휴식)"
);

type DayMap = Record<number, ItineraryItem[]>;

const VIENTIANE_SIGHTS_RETURN = [
  move("방비엥 → 비엔티안", CAR, "약 1시간 30분 소요"),
  THATLUANG,
  PATUXAI,
  NIGHTMARKET,
  AIRPORT,
];

const VANGVIENG_DAY: ItineraryItem[] = [BREAKFAST_GUIDE, CAVE, KAYAK, LAGOON];

const DETAILS: Record<string, DayMap> = {
  // 비엔티안·방비엥 3박5일 노쇼핑
  "vientiane-vangvieng-noshopping-package": {
    1: ARRIVE_GUIDE,
    2: [
      BREAKFAST_GUIDE,
      HOPHRAKEO,
      SISAKET,
      move("비엔티안 → 방비엥", CAR, "약 1시간 30분 소요"),
      EUROSTREET,
      note("호텔 체크인 후 휴식"),
    ],
    3: [...VANGVIENG_DAY, REST],
    4: [BREAKFAST_GUIDE, ...VIENTIANE_SIGHTS_RETURN],
    5: LAST_DAY,
  },

  // 무앙프앙·방비엥 3박5일
  "muangphuang-vangvieng-3nights": {
    1: ARRIVE_GUIDE,
    2: [
      BREAKFAST_GUIDE,
      HOPHRAKEO,
      SISAKET,
      move("비엔티안 → 무앙프앙", CAR, "약 1시간 소요"),
      MUANGTEMPLE,
      ANGNAMTONG,
      FLOATHOUSE,
      note("수상가옥으로 이동 후 휴식"),
    ],
    3: [
      BREAKFAST_GUIDE,
      WATERALMS,
      move("무앙프앙 → 방비엥", CAR),
      CAVE,
      KAYAK,
      LAGOON,
      REST,
    ],
    4: [
      BREAKFAST_GUIDE,
      note("방비엥 오전 선택 액티비티"),
      move("방비엥 → 비엔티안", CAR),
      THATLUANG,
      PATUXAI,
      NIGHTMARKET,
      AIRPORT,
    ],
    5: LAST_DAY,
  },

  // 비엔티안·루앙프라방·방비엥 3박5일
  "vientiane-luangprabang-vangvieng-3nights-free-package": {
    1: ARRIVE_GUIDE,
    2: [
      BREAKFAST_GUIDE,
      move("비엔티안 → 루앙프라방", TRAIN, "약 2시간 소요"),
      KUANGSI,
      PHOUSI,
      LPNIGHT,
      note("호텔로 이동 후 휴식"),
    ],
    3: [
      TAKBAT,
      MORNINGMARKET,
      XIENGTHONG,
      note("호텔 조식 후 체크아웃"),
      move("루앙프라방 → 방비엥", TRAIN, "약 1시간 소요"),
      note("방비엥 도착 후 호텔 체크인, 자유시간(고객님 의견에 따라 일정 조율)"),
      note("호텔로 이동 후 휴식"),
    ],
    4: [
      ...VANGVIENG_DAY,
      note("점심 식사 후 비엔티안으로 이동"),
      ...VIENTIANE_SIGHTS_RETURN,
    ],
    5: LAST_DAY,
  },

  // 비엔티안·루앙프라방·방비엥 4박6일
  "vientiane-vangvieng-4nights-free-package": {
    1: ARRIVE_GUIDE,
    2: [
      BREAKFAST_GUIDE,
      move("비엔티안 → 루앙프라방", TRAIN, "약 2시간 소요"),
      KUANGSI,
      PHOUSI,
      LPNIGHT,
      note("호텔로 이동 후 휴식"),
    ],
    3: [
      TAKBAT,
      MORNINGMARKET,
      XIENGTHONG,
      note("호텔 조식 후 체크아웃"),
      move("루앙프라방 → 방비엥", TRAIN, "약 1시간 소요"),
      note("방비엥 도착 후 호텔 체크인, 자유시간(고객님 의견에 따라 일정 조율)"),
      note("호텔로 이동 후 휴식"),
    ],
    4: [...VANGVIENG_DAY, REST],
    5: [
      BREAKFAST_GUIDE,
      move("방비엥 → 비엔티안", CAR, "약 1시간 30분 소요"),
      HOPHRAKEO,
      SISAKET,
      THATLUANG,
      PATUXAI,
      NIGHTMARKET,
      AIRPORT,
    ],
    6: LAST_DAY,
  },

  // 골프 3곳 3박5일 자유골프+관광
  "laos-golf-3courses-sightseeing-3nights": {
    1: ARRIVE_DRIVER,
    2: [
      BREAKFAST_DRIVER,
      move("호텔 → 부영 골프 클럽", CAR, "약 40분 소요"),
      BOOYOUNG,
      AFTER_ROUND_FREE,
    ],
    3: [
      BREAKFAST_DRIVER,
      move("호텔 → 레이크뷰 골프 클럽", CAR, "약 40분 소요"),
      LAKEVIEW,
      note("라운드 후 호텔로 돌아와 샤워와 정비"),
      BUDDHAPARK,
      REST,
    ],
    4: [
      BREAKFAST_DRIVER,
      move("호텔 → 롱비엔 골프 클럽", CAR),
      LONGBIEN,
      note("라운드 후 샤워와 정비"),
      THATLUANG,
      PATUXAI,
      NIGHTMARKET,
      AIRPORT,
    ],
    5: LAST_DAY,
  },

  // 골프 4곳 4박6일 자유골프+관광
  "laos-golf-4courses-sightseeing-4nights": {
    1: ARRIVE_DRIVER,
    2: [
      BREAKFAST_DRIVER,
      move("호텔 → 메콩 골프 CC", CAR, "약 40분 소요"),
      MEKONG,
      AFTER_ROUND_FREE,
    ],
    3: [
      BREAKFAST_DRIVER,
      move("호텔 → 부영 골프 클럽", CAR, "약 40분 소요"),
      BOOYOUNG,
      AFTER_ROUND_FREE,
    ],
    4: [
      BREAKFAST_DRIVER,
      move("호텔 → 레이크뷰 골프 클럽", CAR, "약 40분 소요"),
      LAKEVIEW,
      note("라운드 후 호텔로 돌아와 정비"),
      BUDDHAPARK,
      REST,
    ],
    5: [
      BREAKFAST_DRIVER,
      move("호텔 → 롱비엔 골프 클럽", CAR, "약 40분 소요"),
      LONGBIEN,
      note("라운드 후 샤워와 정비"),
      THATLUANG,
      PATUXAI,
      NIGHTMARKET,
      AIRPORT,
    ],
    6: LAST_DAY,
  },

  // 골프 3회 3박5일 올인원
  "laos-golf-allinone-3nights": {
    1: ARRIVE_DRIVER,
    2: [
      BREAKFAST_DRIVER,
      move("호텔 → 부영 골프 클럽", CAR, "약 50분 소요"),
      BOOYOUNG,
      note("라운드 후 호텔로 돌아와 샤워와 정비, 오후는 자유시간 또는 원하시는 관광, 저녁은 자유식"),
    ],
    3: [
      BREAKFAST_DRIVER,
      move("호텔 → 레이크뷰 골프 클럽", CAR, "약 40분 소요"),
      LAKEVIEW,
      note("라운드 후 호텔로 돌아와 샤워와 휴식, 오후는 자유시간 또는 원하시는 관광"),
    ],
    4: [
      BREAKFAST_DRIVER,
      move("호텔 → 롱비엔 골프 클럽", CAR),
      LONGBIEN,
      note("라운드 후 샤워와 정비, 자유시간"),
      NIGHTMARKET,
      AIRPORT,
    ],
    5: LAST_DAY,
  },

  // 골프 4회 4박6일 올인원
  "laos-golf-allinone-4nights": {
    1: ARRIVE_DRIVER,
    2: [
      BREAKFAST_DRIVER,
      move("호텔 → 롱비엔 골프 클럽", CAR, "약 50분 소요"),
      LONGBIEN,
      note("라운드 후 호텔로 돌아와 샤워와 정비, 오후는 자유시간 또는 원하시는 관광"),
    ],
    3: [
      BREAKFAST_DRIVER,
      move("호텔 → 레이크뷰 골프 클럽", CAR, "약 40분 소요"),
      LAKEVIEW,
      note("라운드 후 호텔로 돌아와 샤워와 휴식, 오후는 자유시간 또는 관광"),
    ],
    4: [
      BREAKFAST_DRIVER,
      move("호텔 → 부영 골프 클럽", CAR, "약 50분 소요"),
      BOOYOUNG,
      note("라운드 후 샤워와 정비, 자유시간 또는 관광"),
    ],
    5: [
      BREAKFAST_DRIVER,
      move("호텔 → 롱비엔 골프 클럽", CAR),
      LONGBIEN,
      note("라운드 후 샤워와 정비, 자유시간"),
      NIGHTMARKET,
      AIRPORT,
    ],
    6: LAST_DAY,
  },

  // 풀빌라 골프 3박5일
  "laos-golf-poolvilla-3nights": {
    1: [
      note("서울(ICN) 출발 → 비엔티안(VTE) 왓따이 공항 오후 도착"),
      note("성함이 적힌 피켓을 든 기사님과 미팅 후 풀빌라로 이동, 체크인 후 휴식"),
    ],
    2: [
      note("풀빌라 조식 후 기사님 미팅"),
      move("풀빌라 → 부영 골프 클럽", CAR, "약 50분 소요"),
      BOOYOUNG,
      note("라운드 후 풀빌라로 돌아와 프라이빗 수영장에서 휴식, 저녁은 기사님과 상의한 현지 맛집"),
    ],
    3: [
      note("풀빌라 조식 후 기사님 미팅"),
      move("풀빌라 → 레이크뷰 골프 클럽", CAR, "약 40분 소요"),
      LAKEVIEW,
      note("라운드 후 탓루앙·빠뚜싸이 같은 비엔티안 관광 또는 마사지, 이후 풀빌라로 돌아와 휴식"),
    ],
    4: [
      note("풀빌라 조식 후 기사님 미팅"),
      move("풀빌라 → 롱비엔 골프 클럽", CAR),
      LONGBIEN,
      note("라운드 후 샤워와 짐 정리"),
      NIGHTMARKET,
      AIRPORT,
    ],
    5: LAST_DAY,
  },

  // 골프 2곳+방비엥 3박5일
  "laos-golf-vientiane-vangvieng-3nights": {
    1: ARRIVE_DRIVER,
    2: [
      BREAKFAST_DRIVER,
      move("호텔 → 레이크뷰 골프 클럽", CAR, "약 40분 소요"),
      LAKEVIEW,
      note("라운드 후 호텔로 돌아와 샤워와 휴식, 오후는 자유시간 또는 원하시는 관광"),
    ],
    3: [
      BREAKFAST_DRIVER,
      move("호텔 → 롱비엔 골프 클럽", CAR, "약 40분 소요"),
      LONGBIEN,
      note("라운드 후 호텔로 돌아와 휴식, 오후는 자유시간이나 마사지"),
    ],
    4: [
      BREAKFAST_DRIVER,
      move("비엔티안 → 방비엥", CAR),
      CAVE,
      KAYAK,
      LAGOON,
      ...VIENTIANE_SIGHTS_RETURN,
    ],
    5: LAST_DAY,
  },

  // 골프 3곳+방비엥 4박6일
  "laos-golf-vientiane-vangvieng-4nights": {
    1: ARRIVE_DRIVER,
    2: [
      BREAKFAST_DRIVER,
      move("호텔 → 부영 골프 클럽", CAR, "약 40분 소요"),
      BOOYOUNG,
      note("라운드 후 호텔로 돌아와 샤워와 휴식, 오후는 자유시간 또는 원하시는 관광"),
    ],
    3: [
      BREAKFAST_DRIVER,
      move("호텔 → 레이크뷰 골프 클럽", CAR, "약 40분 소요"),
      LAKEVIEW,
      BUDDHAPARK,
      note("자유시간 후 호텔로 돌아와 휴식"),
    ],
    4: [
      BREAKFAST_DRIVER,
      move("호텔 → 롱비엔 골프 클럽", CAR, "약 40분 소요"),
      LONGBIEN,
      note("라운드 후 호텔로 돌아와 휴식, 오후는 자유시간 또는 현지 맛집 저녁"),
    ],
    5: [
      BREAKFAST_DRIVER,
      move("비엔티안 → 방비엥", CAR),
      CAVE,
      KAYAK,
      LAGOON,
      ...VIENTIANE_SIGHTS_RETURN,
    ],
    6: LAST_DAY,
  },

  // 골프 VVIP 3박5일
  "laos-golf-vvip-3nights": {
    1: ARRIVE_DRIVER,
    2: [
      BREAKFAST_DRIVER,
      move("호텔 → 부영 골프 클럽", CAR, "약 50분 소요"),
      BOOYOUNG,
      note("클럽하우스 점심"),
      note("호텔로 돌아와 90분 프리미엄 마사지"),
      note("저녁은 현지 맛집에서 라오스 요리"),
    ],
    3: [
      BREAKFAST_DRIVER,
      move("호텔 → 레이크뷰 골프 클럽", CAR, "약 40분 소요"),
      LAKEVIEW,
      note("클럽하우스 점심"),
      note("호텔로 이동해 90분 프리미엄 마사지"),
      note("저녁은 현지 맛집에서 라오스 요리"),
    ],
    4: [
      note("호텔 조식 후 체크아웃, 기사님 미팅"),
      move("호텔 → 롱비엔 골프 클럽", CAR),
      LONGBIEN,
      note("클럽하우스 점심"),
      note("마지막 90분 프리미엄 마사지, 현지 맛집에서 마지막 만찬"),
      NIGHTMARKET,
      AIRPORT,
    ],
    5: LAST_DAY,
  },

  // 골프 VVIP 4박6일
  "laos-golf-vvip-4nights": {
    1: [
      note("서울(ICN) 출발 → 비엔티안(VTE) 왓따이 공항 오후 도착"),
      note("패스트트랙으로 VIP 입국 수속 후 한국인 전담 가이드와 미팅"),
      note("전용차량으로 숙소 이동, 체크인 후 휴식"),
    ],
    2: [
      note("호텔 조식 후 한국인 가이드 미팅"),
      move("호텔 → 롱비엔 골프 클럽", CAR, "약 50분 소요"),
      LONGBIEN,
      note("그린피·카트비·캐디팁이 모두 포함되어 현장에서 따로 지불할 것이 없습니다"),
      note("라운드 후 호텔로 돌아와 샤워와 휴식, 이후 자유시간 또는 관광"),
    ],
    3: [
      note("호텔 조식 후 한국인 가이드 미팅"),
      move("호텔 → 레이크뷰 골프 클럽", CAR, "약 40분 소요"),
      LAKEVIEW,
      note("라운드 후 90분 마사지"),
      note("이후 한국인 가이드와 자유시간 또는 관광"),
    ],
    4: [
      note("호텔 조식 후 한국인 가이드 미팅"),
      move("호텔 → 부영 골프 클럽", CAR, "약 50분 소요"),
      BOOYOUNG,
      note("라운드 후 샤워와 정비, 한국인 가이드와 자유시간 또는 원하시는 관광"),
    ],
    5: [
      note("호텔 조식 후 한국인 가이드 미팅"),
      move("호텔 → 롱비엔 골프 클럽", CAR),
      LONGBIEN,
      note("라운드 후 샤워와 정비"),
      NIGHTMARKET,
      AIRPORT,
    ],
    6: LAST_DAY,
  },
};

export function getItineraryItems(slug: string, day: number): ItineraryItem[] | undefined {
  return DETAILS[slug]?.[day];
}

// ── 일차 제목 (블루투어와 같은 짧은 라벨)
const T_ARRIVE = "인천공항 출발 → 라오스 비엔티안 도착";
const T_LAST = "인천 국제공항 도착";
const T_BYE = "방비엥, 비엔티안 관광 및 이동";
const G_BOOYOUNG = "부영 골프 클럽 (BOOYOUNGLAO SEA GAMES GOLF CLUB)";
const G_LAKEVIEW = "비엔티안 레이크뷰 골프 클럽 (LAKEVIEW GOLF CLUB)";
const G_LONGBIEN = "비엔티안 롱비엔 골프 클럽 (LONGVIEN GOLF CLUB)";
const G_MEKONG = "메콩 골프 CC (Mekong Golf & Resort)";

const TITLES: Record<string, string[]> = {
  "vientiane-vangvieng-noshopping-package": [T_ARRIVE, "비엔티안, 방비엥", "방비엥 관광", T_BYE, T_LAST],
  "muangphuang-vangvieng-3nights": [T_ARRIVE, "비엔티안, 무앙프앙", "방비엥 관광", T_BYE, T_LAST],
  "vientiane-luangprabang-vangvieng-3nights-free-package": [
    T_ARRIVE,
    "비엔티안, 루앙프라방 관광",
    "루앙프라방, 방비엥 관광 및 이동",
    T_BYE,
    T_LAST,
  ],
  "vientiane-vangvieng-4nights-free-package": [
    T_ARRIVE,
    "비엔티안, 루앙프라방 관광",
    "루앙프라방, 방비엥 관광 및 이동",
    "방비엥 관광",
    T_BYE,
    T_LAST,
  ],
  "laos-golf-3courses-sightseeing-3nights": [T_ARRIVE, G_BOOYOUNG, G_LAKEVIEW, G_LONGBIEN, T_LAST],
  "laos-golf-4courses-sightseeing-4nights": [
    T_ARRIVE,
    G_MEKONG,
    `${G_BOOYOUNG} 이동 후 티업`,
    G_LAKEVIEW,
    G_LONGBIEN,
    T_LAST,
  ],
  "laos-golf-allinone-3nights": [T_ARRIVE, G_BOOYOUNG, G_LAKEVIEW, G_LONGBIEN, T_LAST],
  "laos-golf-allinone-4nights": [T_ARRIVE, G_LONGBIEN, G_LAKEVIEW, G_BOOYOUNG, G_LONGBIEN, T_LAST],
  "laos-golf-poolvilla-3nights": [T_ARRIVE, G_BOOYOUNG, G_LAKEVIEW, G_LONGBIEN, T_LAST],
  "laos-golf-vientiane-vangvieng-3nights": [T_ARRIVE, G_LAKEVIEW, G_LONGBIEN, T_BYE, T_LAST],
  "laos-golf-vientiane-vangvieng-4nights": [T_ARRIVE, G_BOOYOUNG, G_LAKEVIEW, G_LONGBIEN, T_BYE, T_LAST],
  "laos-golf-vvip-3nights": [T_ARRIVE, G_BOOYOUNG, G_LAKEVIEW, G_LONGBIEN, T_LAST],
  "laos-golf-vvip-4nights": [T_ARRIVE, G_LONGBIEN, G_LAKEVIEW, G_BOOYOUNG, G_LONGBIEN, T_LAST],
};

export function getItineraryTitle(slug: string, day: number): string | undefined {
  return TITLES[slug]?.[day - 1];
}

// ── 일정표 위 안내 (블루투어처럼 호텔 표기 설명)
const NOTES: Record<string, string> = {
  "vientiane-vangvieng-noshopping-package":
    "일정표에 적힌 호텔은 예시입니다. 숙소는 원하시는 곳으로 잡아 드립니다.",
  "vientiane-luangprabang-vangvieng-3nights-free-package":
    "일정표에 적힌 호텔은 예시입니다. 숙소는 원하시는 곳으로 잡아 드립니다.",
  "vientiane-vangvieng-4nights-free-package":
    "일정표에 적힌 호텔은 예시입니다. 숙소는 원하시는 곳으로 잡아 드립니다.",
  "muangphuang-vangvieng-3nights":
    "일정표에 적힌 호텔은 예시입니다. 무앙프앙 하룻밤만 강 위 수상가옥입니다. 숙소는 원하시는 곳으로 잡아 드립니다.",
  "laos-golf-allinone-3nights":
    "일정표의 호텔은 기준 숙소입니다. 숙소는 3성급부터 5성급까지, 원하시면 풀빌라로도 잡아 드립니다.",
  "laos-golf-allinone-4nights":
    "일정표의 호텔은 기준 숙소입니다. 숙소는 3성급부터 5성급까지, 원하시면 풀빌라로도 잡아 드립니다.",
  "laos-golf-vvip-3nights":
    "숙소는 김씨 풀빌라와 비엔티안 아마리 호텔 중 선택하실 수 있습니다.",
  "laos-golf-vvip-4nights":
    "숙소는 김씨 풀빌라와 비엔티안 아마리 호텔 중 선택하실 수 있습니다.",
};

export function getItineraryNote(slug: string): string | undefined {
  return NOTES[slug];
}
