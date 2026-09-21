/**
 * Central image registry.
 *
 * Temporary stand-in photography (self-hosted under /public/images/,
 * originally sourced from Wikimedia Commons — freely licensed) so the
 * site never shows an empty or broken image box during development.
 * Swap any value here with the agency's own professional photography
 * once available — nothing else in the codebase needs to change.
 *
 * Accuracy rule for this registry: an image is only assigned to a key
 * if it genuinely depicts that thing (a villa key gets a real villa/
 * pool photo, not scenery near it). Where no genuine match exists on
 * Wikimedia Commons, the key is left `undefined` on purpose — CoverImage
 * falls back to an honest "photo coming soon" placeholder instead of a
 * misleading stand-in. See the per-key TODO comments below for the
 * handful of intentional exceptions (clearly non-Laos generic photos
 * used only where no real Laos equivalent exists, e.g. golf courses).
 *
 * NOTE: these files are CC-licensed and require visible attribution
 * if this site goes to real production. Before public launch, either
 * replace them with licensed/owned photography, or add proper
 * on-page photo credits. Attribution for each source photo:
 *
 * - vangViengHero: "Water reflection of karst mountains at golden hour
 *   in Vang Vieng" by Basile Morin, CC-BY-SA-4.0
 * - vangViengClouds: "Karst peaks with sea of clouds at sunrise, Mount
 *   Nam Xay" by Basile Morin, CC-BY-SA-4.0
 * - vangViengPaddy: "Green paddy fields and karst mountains at sunset"
 *   by Basile Morin, CC-BY-SA-4.0
 * - vangViengBungalows: "Row of five red wooden bungalows... Otherside
 *   guesthouse, Vang Vieng" by Basile Morin, CC-BY-SA-4.0 (Commons
 *   Featured Picture) — real Vang Vieng guesthouse exterior/terraces
 * - mekongRiverfront: "Vientiane - Riverfront" by Stefan Fussan, CC-BY-SA-3.0
 *   (this real Vientiane photo is safe to reuse for any Vientiane-leg content)
 * - phaThatLuang: "Pha That Luang Sunrise Panorama" by Benh LIEU SONG, CC-BY-SA-4.0
 * - luangPrabangTemple: "Temple Wat Xieng Thong - Luang Prabang" by Basile Morin, CC-BY-SA-4.0
 * - kuangSiFalls: "Kuang Si Falls and its emerald water pools" by Basile Morin, CC-BY-SA-4.0
 * - luangPrabangNightMarket: "Luang Prabang Night Market 2016 (HDR)" by Ekrem Canli, CC-BY-SA-4.0
 * - takBatMonks: "A man gives to the last monk in the line" (Tak Bat
 *   alms-giving, Luang Prabang) by shankar s., CC-BY-2.0
 * - (amantakaPoolSuite / amantakaMainPool were removed once the owner
 *   supplied a photo of the villa actually sold in the golf+villa package)
 * - tadFane: "Tad Fane Waterfall" by Supanut Arunoprayote, CC-BY-4.0
 * - tadLoElephant: "Asian elephant walking in Tad Lo river at golden hour" by Basile Morin, CC-BY-SA-4.0
 * - riceFarmers: "Two farmers ... paddy field of Vang Vieng" by Basile Morin, CC-BY-SA-4.0
 * - poolBali / poolSunset / poolDanang / riverFisherman: NOT Laos —
 *   kept only as raw files from the previous pass, no longer referenced
 *   below (see git history if needed)
 * - golfSunsetHill / golfBunker / golfBackupTeeOff /
 *   golfBackupFairwayPath: generic tropical golf courses (Thailand),
 *   (golfWaterHazard was removed once real Laos course photos existed)
 *   NOT Laos. Wikimedia Commons has zero Laos golf course photography
 *   (verified against the site's own sports-venue category tree) —
 *   these are used only as an honest "golf, generally" stand-in and
 *   must never be captioned as a specific named Laos course.
 *   golfSunsetHill/golfBunker/golfWaterHazard by AirportExpert /
 *   PattayaPatrol, CC-BY-SA-4.0; golfBackupTeeOff/golfBackupFairwayPath
 *   by PattayaPatrol, CC-BY-SA-4.0
 * - wattayAirportShuttle: "Airport shuttle bus at Wattay International
 *   Airport" by Mx. Granger, CC0 1.0 — real Vientiane airport shuttle,
 *   replaces the earlier non-Laos SuperShuttle stand-in.
 * - thamJangCave: "Tham Jang entrance" (cave in Vang Vieng) by
 *   Christophe95, CC-BY-SA-4.0 — replaces a mismatched Tad Lo elephant
 *   photo (wrong region entirely) on the zipline/cave tour product.
 * - hotairBalloonVangVieng: "Balloons over vang vieng" by Moriac,
 *   CC-BY-SA-3.0 — real hot air balloon over Vang Vieng.
 * - buggyVangVieng: "Lao Buggy" by ELLK Photo, CC-BY-2.0 — real buggy
 *   rental vehicle, Vang Vieng ("You can hire these in Vang Vieng, Laos").
 * - lcrTrainExterior: "China-Laos train, going over the Mekong river
 *   north of Luang Prabang, Laos" by Julia Denton-Barker, CC-BY-SA-2.0.
 * - lcrTrainInterior: "Lao China Railway first class" by Jpatokal,
 *   CC-BY-SA-4.0 — real LCR first-class cabin interior.
 * - vientianeRailwayStation: "Laos-China-Railway Station in Vientiane"
 *   by Dominik Landwehr, CC-BY-SA-4.0.
 * - mekongSunsetCruiseLP: "Pirogue and boat on the Mekong with colorful
 *   sky at sunset in Luang Prabang Laos" by Basile Morin, CC-BY-SA-4.0
 *   (Commons Featured Picture).
 * - blueLagoonVangVieng: "Blue Lagoon Vang Vieng" by Christophe95,
 *   CC-BY-SA-4.0 — GPS-verified match to the actual Blue Lagoon 1 site.
 * - minivanVientiane: "Nissan Civilian in Vientiane" by Ilya Plekhanov,
 *   CC-BY-SA-3.0 — generic Laos passenger minibus, no third-party branding.
 * - watPhouChampasak: "Three quarter view of the ruined Khmer Hindu temple
 *   of Wat Phou with blue sky in Champasak, Laos" — CC-BY-SA-4.0, real
 *   Pakse-area UNESCO landmark.
 * - bolavenCoffeePlantation: "Coffee plantations Bolaven Plateau 02.jpg" —
 *   CC-BY-SA-4.0, real Pakse-area coffee-growing plateau.
 * - bolavenZiplineAction: "Bolaven - woman riding zip line at Tad Fane
 *   waterfalls - Aug 2024" by Dominic Nelson (BigDom), CC-BY-SA-4.0 — real
 *   Laos zipline (Tad Fane, Bolaven Plateau), replaces a low-res
 *   (447x296) zipline photo.
 * - belizeBluecreekZipline: "Zipline over Blue Creek, Belize" by
 *   abnederveld, CC-BY-2.0 — owner-selected replacement for the
 *   짚라인+카약킹+버기카4시간 tour's hero (turquoise creek visible through
 *   the canopy, helmet POV framing); honest non-Laos stand-in.
 * - vangviengKayakAction: "Kayaking in Vang Vieng" by Christophe95,
 *   CC-BY-SA-4.0, GPS-verified Vang Vieng (Nam Song river) — real kayaking
 *   action. Note: a rival tour operator's brand ("RIVERSIDETOURS") is
 *   legible on one foreground kayak; acceptable but worth a crop/note.
 * - vangviengThamXangCave: "Vang Vieng-Tham Xang-14-innen" by Gerd
 *   Eichmann, CC-BY-SA-4.0 — real interior of Tham Xang ("Elephant Cave"),
 *   Vang Vieng. Used for both the zipline+elephant-cave half-day tour and
 *   the zipline+elephant-cave+tubing+kayak one-day tour, since both
 *   genuinely visit this same real cave.
 * - vangviengThamPhukhamCave: "Tham Phu Kham, Vang Vieng, Laos" by
 *   yeowatzup, CC-BY-2.0 — real interior (reclining Buddha shrine) of Tham
 *   Phu Kham, the cave directly above Blue Lagoon 1; used for the
 *   elephant-cave+tubing+kayak+blue-lagoon-1 combo tour since this is the
 *   actual cave at that specific blue lagoon.
 * - caveTubingBelize: "Tubing, Belize 2013" by Samantha Beddoes, CC-BY-2.0
 *   — honest non-Laos stand-in for cave tubing (Commons has no Laos cave
 *   tubing action photo), replaces a dark/grainy low-res action-cam frame.
 * - buggy4seatPolaris: "Polaris RZR XP 1000 EPS - Calico Ghost Town" by
 *   Tomás Del Coro, CC-BY-SA-2.0 — honest non-Laos stand-in for a genuine
 *   4-seat/2-row buggy (the previous photo was the same image used for
 *   the 2-seat tour, and visually reads as a 2-seat vehicle).
 * - paramotorDondetFront: "Two-seater paramotor - Powered paragliding in
 *   flight - 3 quarter view a sunny afternoon in Don Det Laos" by Basile
 *   Morin, CC-BY-SA-4.0 — real Laos paramotor tandem flight (Don Det, Si
 *   Phan Don), replaces a low-res (500x313) selfie photo.
 * - mekongSunsetDondet: "Silhouette of a fisherman standing on his pirogue
 *   at sunset with orange clouds in Don Det, Si Phan Don, Laos" by Basile
 *   Morin, CC-BY-SA-4.0 (Commons Featured Picture) — real Laos Mekong
 *   sunset with a person actively fishing, replaces a photo with no
 *   sunset color and no traditional performance.
 *
 * Owner-provided photography (not Wikimedia — supplied directly by the
 * agency, on-site photos of the actual named venue; no CC attribution
 * needed since these are the agency's own):
 * - mekongCCHero2, mekongCCAerial, mekongCCBunkers, mekongCCCartpath +
 *   mekongCCGallery1,3: Mekong Golf & Resort, Vientiane — real photos of
 *   this specific course, provided by the agency owner. 2026-09-13:
 *   swapped the original hazy hero for a clearer blue-sky fairway shot
 *   and added an aerial overview; dropped two low-quality gallery shots
 *   (overexposed sky, flowering branch blocking the course).
 * - laoCCAerialClover, laoCCFountainClubhouse, laoCCAerialTown,
 *   laoCCFairwayPond, laoCCTopiarySign, laoCCElephantMascot +
 *   laoCCGallery2-3: Lao CC, Vientiane — real photos of this specific
 *   course, provided by the agency owner. 2026-09-13: replaced the
 *   original hero (course barely visible behind palm landscaping) with
 *   an aerial shot of the course's clover-shaped bunkers, and added an
 *   entrance mascot statue photo and course-branding topiary shot.
 *   Excluded on review: photos with visible TaylorMade/Nike branding or
 *   competition bibs.
 * - longbienCCClubhouseAerial, longbienCCGoldenGreen +
 *   longbienCCGallery1-4,6-9: Longbien (Long Vien) Golf Club, Vientiane —
 *   real photos of this specific course, provided by the agency owner.
 *   2026-09-13: swapped the hero for a sharper aerial clubhouse shot
 *   (original had a muddy color cast) and dropped the exit-gate photo
 *   (showed the road gate, not the course).
 * - lakeviewCCBridge + lakeviewCCGallery1-8,10: Lakeview CC, Vientiane —
 *   real photos of this specific course, provided by the agency owner.
 *   One photo (customers seated at the clubhouse restaurant, faces
 *   clearly visible) was excluded on review — no consent on file.
 * - booyoungCCClubhouseAerial, booyoungCCElephant +
 *   booyoungCCGallery1-3,8,10-12: Booyoung (SEA Games) Golf Club,
 *   Vientiane — real photos of this specific course, provided by the
 *   agency owner. 2026-09-13: replaced the hero (flowering branch
 *   blocked the entire course) with an aerial clubhouse+course overview,
 *   added a small elephant-statue photo, and dropped four hazy/redundant
 *   gallery shots.
 * - vangviengBluelagoon* / vangviengKayak* / vangviengZipline* /
 *   vangviengCave* / vangviengBalloon* / vangviengParamotor*: real
 *   Vang Vieng activity photos (blue lagoon, kayaking, zipline, cave
 *   tubing/kayaking, hot air balloon, motor paragliding), provided
 *   directly by the agency owner from actual tours. Reused across the
 *   various zipline/cave/kayak/lagoon combo tour products according to
 *   which activities each specific product actually includes. Out of an
 *   original batch of 41, a handful were excluded: 3 corrupted/empty
 *   files, one attraction-gate photo dominated by third-party beverage
 *   ads, one unclear close-up of underwater fish, and one exact duplicate
 *   frame.
 * - vientianeThatluang* / vientianePatuxai* / luangprabangWatXiengthong* /
 *   luangprabangTempleMural / luangprabangAlmsgiving* /
 *   luangprabangNightmarket* / vangviengNamsongBridge /
 *   vangviengBalloonPanorama / vangviengViewpointFlag / mekongCruise* /
 *   luangprabangKuangsiAlt: real owner-provided photos (Vientiane,
 *   Luang Prabang, Vang Vieng, Mekong sunset cruise), curated and
 *   assigned by the agency owner to the destinations gallery, the
 *   Mekong sunset cruise tour gallery, and the Luang Prabang·Vang Vieng
 *   3-night free package product gallery.
 * - asiaClubVangviengHero + asiaClubVangviengGallery1-4: Asia Club golf
 *   course, Vang Vieng — real photos of this specific course, provided
 *   by the agency owner (2026-09-17). Hero is a rainbow-over-the-green
 *   shot (most striking of the batch); gallery adds a karst-mountain
 *   fairway view, two wide lake/fairway landscapes, and a clean
 *   putting-green shot. Out of 14 supplied photos, 9 were left unused
 *   (redundant group/umbrella shots, close-up cart shots, and a
 *   construction-site-adjacent frame).
 * - lcrTrainFrontview: LCR (Laos-China Railway) high-speed train, front
 *   3/4 view at a station platform — supplied by the agency owner, usage
 *   rights obtained from the Lao Ministry of Public Works and Transport
 *   (라오스 교통청). Original had a visible "LCR" corporate watermark in
 *   the bottom-right corner; cropped out (bottom ~14% of frame) rather
 *   than inpainted, since it only touched empty trackbed/gravel.
 */

const img = (file: string) => `/images/${file}`;

const src = {
  vangViengHero: img("vangvieng-hero.jpg"),
  vangViengClouds: img("vangvieng-clouds.jpg"),
  vangViengPaddy: img("vangvieng-paddy.jpg"),
  vangViengBungalows: img("vangvieng-bungalows.jpg"),
  vangviengPoolvillaReal: img("vangvieng-poolvilla-real.jpg"),
  mekongRiverfront: img("mekong-riverfront.jpg"),
  phaThatLuang: img("pha-that-luang.jpg"),
  luangPrabangTemple: img("luangprabang-temple.jpg"),
  kuangSiFalls: img("kuang-si-falls.jpg"),
  luangPrabangNightMarket: img("luangprabang-nightmarket.jpg"),
  takBatMonks: img("takbat-monks.jpg"),
  // Owner-provided night shot of the pool villa used in the golf+villa package (960px original, two crops).
  poolvillaNightTall: img("poolvilla-night-tall.jpg"),
  poolvillaNightWide: img("poolvilla-night-wide.jpg"),
  tadFane: img("tad-fane-waterfall.jpg"),
  tadLoElephant: img("tad-lo-elephant.jpg"),
  riceFarmers: img("rice-farmers.jpg"),
  golfSunsetHill: img("golf-sunset-hill.jpg"),
  golfBunker: img("golf-bunker.jpg"),
  golfBackupTeeOff: img("golf-backup-teeoff.jpg"),
  golfBackupFairwayPath: img("golf-backup-fairwaypath.jpg"),
  wattayAirportShuttle: img("wattay-airport-shuttle.jpg"),
  thamJangCave: img("tham-jang-cave-entrance.jpg"),
  hotairBalloonVangVieng: img("hotair-balloon-vangvieng.jpg"),
  buggyVangVieng: img("buggy-vangvieng.jpg"),
  lcrTrainExterior: img("lcr-train-exterior.jpg"),
  // Landscape crop of lcrTrainExterior (the original is portrait, which put the train outside the 21:9 hero band).
  lcrTrainViaductWide: img("lcr-train-viaduct-wide.jpg"),
  lcrTrainInterior: img("lcr-train-interior.jpg"),
  vientianeRailwayStation: img("vientiane-railway-station.jpg"),
  mekongSunsetCruiseLP: img("mekong-sunset-cruise-lp.jpg"),
  blueLagoonVangVieng: img("blue-lagoon-vangvieng.jpg"),
  minivanVientiane: img("minivan-vientiane.jpg"),
  // Owner-provided photo (white Toyota HiAce on a palm-lined city street) — homepage category card and all van thumbnails.
  categoryTransportVan: img("category-transport-van.webp"),
  bolavenZiplineAction: img("bolaven-zipline-action.jpg"),
  belizeBluecreekZipline: img("belize-bluecreek-zipline.jpg"),
  vangviengKayakAction: img("vangvieng-kayak-action.jpg"),
  vangviengThamXangCave: img("vangvieng-tham-xang-cave.jpg"),
  vangviengThamPhukhamCave: img("vangvieng-tham-phukham-cave.jpg"),
  caveTubingBelize: img("cave-tubing-belize.jpg"),
  buggy4seatPolaris: img("buggy-4seat-polaris.jpg"),
  paramotorDondetFront: img("paramotor-dondet-front.jpg"),
  mekongSunsetDondet: img("mekong-sunset-dondet.jpg"),
  lcrTrainFrontview: img("train-lcr-frontview.jpg"),
  watPhouChampasak: img("wat-phou-champasak.jpg"),
  bolavenCoffeePlantation: img("bolaven-coffee-plantation.jpg"),

  mekongCCGallery1: img("mekong-cc-1.png"),
  mekongCCGallery3: img("mekong-cc-4.png"),

  laoCCGallery2: img("lao-cc-3.png"),
  laoCCGallery3: img("lao-cc-4.png"),

  longbienCCGallery2: img("longbien-cc-2.png"),
  longbienCCGallery3: img("longbien-cc-3.png"),
  longbienCCGallery4: img("longbien-cc-4.png"),
  longbienCCGallery6: img("longbien-cc-7.png"),
  longbienCCGallery7: img("longbien-cc-8.png"),
  longbienCCGallery8: img("longbien-cc-9.png"),
  longbienCCGallery9: img("longbien-cc-10.png"),

  lakeviewCCBridge: img("lakeview-cc-5.png"),
  lakeviewCCGallery1: img("lakeview-cc-1.png"),
  lakeviewCCGallery2: img("lakeview-cc-2.png"),
  lakeviewCCGallery3: img("lakeview-cc-3.png"),
  lakeviewCCGallery4: img("lakeview-cc-4.png"),
  lakeviewCCGallery5: img("lakeview-cc-6.png"),
  lakeviewCCGallery6: img("lakeview-cc-7.png"),
  lakeviewCCGallery7: img("lakeview-cc-8.png"),
  lakeviewCCGallery8: img("lakeview-cc-9.png"),
  lakeviewCCGallery10: img("lakeview-cc-11.png"),

  booyoungCCGallery1: img("booyoung-cc-1.png"),
  booyoungCCGallery2: img("booyoung-cc-2.png"),
  booyoungCCGallery3: img("booyoung-cc-3.png"),
  booyoungCCGallery8: img("booyoung-cc-8.png"),
  booyoungCCGallery10: img("booyoung-cc-10.png"),
  booyoungCCGallery11: img("booyoung-cc-12.png"),
  booyoungCCGallery12: img("booyoung-cc-13.png"),

  asiaClubVangviengHero: img("asia-club-vangvieng-2.jpeg"),
  asiaClubVangviengGallery1: img("asia-club-vangvieng-1.jpeg"),
  asiaClubVangviengGallery2: img("asia-club-vangvieng-3.jpeg"),
  asiaClubVangviengGallery3: img("asia-club-vangvieng-4.jpeg"),
  asiaClubVangviengGallery4: img("asia-club-vangvieng-5.jpeg"),

  yuwanVientianeHero: img("yuwan-vientiane-hero.png"),
  yuwanVientianeGallery1: img("yuwan-vientiane-room-twin.webp"),
  yuwanVientianeGallery2: img("yuwan-vientiane-room-king.webp"),
  yuwanVientianeGallery3: img("yuwan-vientiane-pool.webp"),
  yuwanVientianeGallery4: img("yuwan-vientiane-lobby.webp"),
  yuwanVientianeGallery5: img("yuwan-vientiane-restaurant.webp"),
  yuwanVientianeGallery6: img("yuwan-vientiane-suite.webp"),
  yuwanVientianeGallery7: img("yuwan-vientiane-bathroom.webp"),

  amariVientianeHero: img("amari-vientiane-hero.png"),
  amariVientianeGallery1: img("amari-vientiane-sunset-sign.webp"),
  amariVientianeGallery2: img("amari-vientiane-room-king.webp"),
  amariVientianeGallery3: img("amari-vientiane-aerial.webp"),
  amariVientianeGallery4: img("amari-vientiane-lobby.webp"),
  amariVientianeGallery5: img("amari-vientiane-suite.webp"),
  amariVientianeGallery6: img("amari-vientiane-restaurant.webp"),
  amariVientianeGallery7: img("amari-vientiane-pool.webp"),
  amariVientianeGallery8: img("amari-vientiane-bathroom.webp"),
  amariVientianeGallery9: img("amari-vientiane-room-twin.webp"),

  muongthanhVientianeHero: img("muongthanh-vientiane-hero.png"),
  muongthanhVientianeGallery1: img("muongthanh-vientiane-night.webp"),
  muongthanhVientianeGallery2: img("muongthanh-vientiane-skyrestaurant.webp"),
  muongthanhVientianeGallery3: img("muongthanh-vientiane-breakfast.webp"),
  muongthanhVientianeGallery4: img("muongthanh-vientiane-room-king.webp"),
  muongthanhVientianeGallery5: img("muongthanh-vientiane-lobby.webp"),
  muongthanhVientianeGallery6: img("muongthanh-vientiane-room-twin.webp"),
  muongthanhVientianeGallery7: img("muongthanh-vientiane-pool.webp"),
  muongthanhVientianeGallery8: img("muongthanh-vientiane-bathroom.webp"),

  vangviengBluelagoonSwim: img("vangvieng-bluelagoon-swim.png"),
  vangviengBluelagoonSlide: img("vangvieng-bluelagoon-slide.png"),
  vangviengBluelagoonView: img("vangvieng-bluelagoon-view.png"),
  vangviengKayakGroupLaunch: img("vangvieng-kayak-group-launch.png"),
  vangviengKayakPeople: img("vangvieng-kayak-people.png"),
  vangviengKayakRiver: img("vangvieng-kayak-river.png"),
  vangviengKayakAerial: img("vangvieng-kayak-aerial.png"),
  vangviengKayakGreenRiver: img("vangvieng-kayak-green-river.png"),
  vangviengZiplineWoman: img("vangvieng-zipline-woman.png"),
  vangviengZiplineCanyon: img("vangvieng-zipline-canyon.png"),
  vangviengZiplineCanopy: img("vangvieng-zipline-canopy.png"),
  vangviengZiplineGroup: img("vangvieng-zipline-group.png"),
  vangviengZiplineBridge: img("vangvieng-zipline-bridge.png"),
  vangviengZiplineRiverBridge: img("vangvieng-zipline-river-bridge.png"),
  vangviengZiplineCliff: img("vangvieng-zipline-cliff.png"),
  vangviengCaveInterior1: img("vangvieng-cave-interior1.png"),
  vangviengCaveStalactite: img("vangvieng-cave-stalactite.png"),
  vangviengCaveCeiling: img("vangvieng-cave-ceiling.png"),
  vangviengCaveTubing: img("vangvieng-cave-tubing.png"),
  vangviengCaveKayak: img("vangvieng-cave-kayak.png"),
  vangviengCaveWalkway: img("vangvieng-cave-walkway.png"),
  vangviengBalloonMultiAerial: img("vangvieng-balloon-multi-aerial.png"),
  vangviengBalloonSky: img("vangvieng-balloon-sky.png"),
  vangviengBalloonLaunch: img("vangvieng-balloon-launch.png"),
  vangviengBalloonMoon: img("vangvieng-balloon-moon.png"),
  vangviengParamotorPair: img("vangvieng-paramotor-pair.png"),
  vangviengParamotorPrelaunch: img("vangvieng-paramotor-prelaunch.png"),
  vangviengParamotorFlying: img("vangvieng-paramotor-flying.png"),
  vangviengBuggyMudWheel: img("vangvieng-buggy-mud-wheel.jpg"),
  vangviengBuggyPovDriving: img("vangvieng-buggy-pov-driving.jpg"),
  vangviengZiplineWaterfallAerial: img("vangvieng-zipline-waterfall-aerial.jpg"),
  vangviengBluelagoonSwingClean: img("vangvieng-bluelagoon-swing-clean.jpg"),
  vangviengBalloonTwinSunset: img("vangvieng-balloon-twin-sunset.png"),
  vangviengKayakTwoBoats: img("vangvieng-kayak-two-boats.jpg"),
  vangviengKayakBalloonCombo: img("vangvieng-kayak-balloon-combo.jpg"),
  vangviengZiplinePlatformPrep: img("vangvieng-zipline-platform-prep.jpg"),
  vangviengBluelagoonTreeswingPose: img("vangvieng-bluelagoon-treeswing-pose.jpg"),
  vangviengParamotorTandemSelfie: img("vangvieng-paramotor-tandem-selfie.jpg"),
  vangviengParamotorSunsetSilhouette: img("vangvieng-paramotor-sunset-silhouette.jpg"),
  vangviengParamotorPovRicefields: img("vangvieng-paramotor-pov-ricefields.jpg"),
  luangprabangGolfCliffRiver: img("luangprabang-golf-cliff-river.webp"),
  luangprabangGolfFlagRiver: img("luangprabang-golf-flag-river.webp"),
  luangprabangGolfClubhouse: img("luangprabang-golf-clubhouse.webp"),
  luangprabangGolfFairwayPavilion: img("luangprabang-golf-fairway-pavilion.webp"),
  luangprabangGolfGreenMountain: img("luangprabang-golf-green-mountain.webp"),
  luangprabangGolfRiverView: img("luangprabang-golf-river-view.webp"),
  mekongCCHero2: img("mekong-cc-hero2.jpg"),
  mekongCCAerial: img("mekong-cc-aerial.jpg"),
  mekongCCBunkers: img("mekong-cc-bunkers.jpg"),
  mekongCCCartpath: img("mekong-cc-cartpath.jpg"),
  laoCCAerialClover: img("lao-cc-aerial-clover.jpg"),
  laoCCFountainClubhouse: img("lao-cc-fountain-clubhouse.webp"),
  laoCCAerialTown: img("lao-cc-aerial-town.webp"),
  golfCourseSunriseGreens: img("golf-course-sunrise-greens.jpg"),
  laoCCFairwayPond: img("lao-cc-fairway-pond.webp"),
  laoCCTopiarySign: img("lao-cc-topiary-sign.jpg"),
  laoCCElephantMascot: img("lao-cc-elephant-mascot.png"),
  longbienCCClubhouseAerial: img("longbien-cc-clubhouse-aerial.jpg"),
  longbienCCGoldenGreen: img("longbien-cc-golden-green.webp"),
  golfCourseSunsetGreen: img("golf-course-sunset-green.jpg"),
  longbienCCWelcomeSignVivid: img("longbien-cc-welcome-sign-vivid.webp"),
  booyoungCCClubhouseAerial: img("booyoung-cc-clubhouse-aerial.jpg"),
  booyoungCCElephant: img("booyoung-cc-elephant.jpg"),

  vientianeThatluangDay: img("vientiane-thatluang-day.jpg"),
  vientianeThatluangMonks: img("vientiane-thatluang-monks.jpg"),
  vientianeThatluangNight: img("vientiane-thatluang-night.jpg"),
  vientianePatuxaiSunset: img("vientiane-patuxai-sunset.jpg"),
  vientianePatuxaiNightFountain: img("vientiane-patuxai-night-fountain.jpg"),
  vientianeThatluangAerial: img("vientiane-thatluang-aerial.jpg"),
  luangprabangKuangsiBridge: img("luangprabang-kuangsi-bridge.jpg"),
  luangprabangWatXiengthongTreemosaic: img("luangprabang-wat-xiengthong-treemosaic.jpg"),
  luangprabangTempleMural: img("luangprabang-temple-mural.jpg"),
  luangprabangAlmsgivingMorning: img("luangprabang-almsgiving-morning.jpg"),
  luangprabangAlmsgivingNight: img("luangprabang-almsgiving-night.jpg"),
  luangprabangNightmarketSunset: img("luangprabang-nightmarket-sunset.jpg"),
  vangviengNamsongBridge: img("vangvieng-namsong-bridge.jpg"),
  vangviengBalloonPanorama: img("vangvieng-balloon-panorama.jpg"),
  vangviengViewpointFlag: img("vangvieng-viewpoint-flag.jpg"),
  mekongCruiseCocktail: img("mekong-cruise-cocktail.jpg"),
  mekongCruiseDinner: img("mekong-cruise-dinner.jpg"),
  mekongCruiseBoatSailing: img("mekong-cruise-boat-sailing.jpg"),
  mekongCruiseTableSetting: img("mekong-cruise-table-setting.jpg"),
  luangprabangNightmarketNight: img("luangprabang-nightmarket-night.jpg"),
  luangprabangKuangsiAlt: img("luangprabang-kuangsi-alt.jpg"),
};

type ImageKey =
  | "hero"
  | "editorial-vangvieng"
  | "category-package"
  | "category-freetravel"
  | "category-villa"
  | "category-golf"
  | "category-tour"
  | "category-transport"
  | "destination-vientiane"
  | "destination-vangvieng"
  | "destination-luangprabang"
  | "destination-pakse"
  | "destination-pakse-g1"
  | "destination-pakse-g2"
  | "product-1"
  | "product-2"
  | "product-noshopping-vientiane"
  | "product-3"
  | "product-4"
  | "product-5"
  | "product-6"
  | "product-8"
  | "product-9"
  | "product-10"
  | "villa-hero"
  | "villa-1"
  | "villa-2"
  | "villa-3"
  | "poolvilla-night-tall"
  | "poolvilla-night-wide"
  | "hotel-yuwan-vientiane"
  | "hotel-yuwan-vientiane-g1"
  | "hotel-yuwan-vientiane-g2"
  | "hotel-yuwan-vientiane-g3"
  | "hotel-yuwan-vientiane-g4"
  | "hotel-yuwan-vientiane-g5"
  | "hotel-yuwan-vientiane-g6"
  | "hotel-yuwan-vientiane-g7"
  | "hotel-amari-vientiane"
  | "hotel-amari-vientiane-g1"
  | "hotel-amari-vientiane-g2"
  | "hotel-amari-vientiane-g3"
  | "hotel-amari-vientiane-g4"
  | "hotel-amari-vientiane-g5"
  | "hotel-amari-vientiane-g6"
  | "hotel-amari-vientiane-g7"
  | "hotel-amari-vientiane-g8"
  | "hotel-amari-vientiane-g9"
  | "hotel-muongthanh-vientiane"
  | "hotel-muongthanh-vientiane-g1"
  | "hotel-muongthanh-vientiane-g2"
  | "hotel-muongthanh-vientiane-g3"
  | "hotel-muongthanh-vientiane-g4"
  | "hotel-muongthanh-vientiane-g5"
  | "hotel-muongthanh-vientiane-g6"
  | "hotel-muongthanh-vientiane-g7"
  | "hotel-muongthanh-vientiane-g8"
  | "golf-hero"
  | "golf-1"
  | "golf-2"
  | "golf-3"
  | "golf-villa-combo"
  | "picks-luangprabang-activity"
  | "guide-1"
  | "guide-2"
  | "guide-3"
  | "guide-4"
  | "guide-5"
  | "guide-6"
  | "guide-7"
  | "guide-8"
  | "guide-9"
  | "guide-10"
  | "guide-11"
  | "guide-12"
  | "guide-13"
  | "guide-14"
  | "guide-15"
  | "course-mekong-cc"
  | "course-lao-cc"
  | "course-longbien-cc"
  | "course-mekong-cc-g1"
  | "course-mekong-cc-g3"
  | "course-mekong-cc-g5"
  | "course-mekong-cc-g6"
  | "course-mekong-cc-g7"
  | "course-lao-cc-g2"
  | "course-lao-cc-g3"
  | "course-lao-cc-g4"
  | "course-lao-cc-g5"
  | "course-lao-cc-g6"
  | "course-lao-cc-g7"
  | "course-lao-cc-g8"
  | "course-longbien-cc-g2"
  | "course-longbien-cc-g3"
  | "course-longbien-cc-g4"
  | "course-longbien-cc-g6"
  | "course-longbien-cc-g7"
  | "course-longbien-cc-g8"
  | "course-longbien-cc-g9"
  | "course-longbien-cc-g10"
  | "course-longbien-cc-g11"
  | "course-lakeview-cc"
  | "course-lakeview-cc-g1"
  | "course-lakeview-cc-g2"
  | "course-lakeview-cc-g3"
  | "course-lakeview-cc-g4"
  | "course-lakeview-cc-g5"
  | "course-lakeview-cc-g6"
  | "course-lakeview-cc-g7"
  | "course-lakeview-cc-g8"
  | "course-lakeview-cc-g10"
  | "course-booyoung-cc"
  | "course-booyoung-cc-g1"
  | "course-booyoung-cc-g2"
  | "course-booyoung-cc-g3"
  | "course-booyoung-cc-g8"
  | "course-booyoung-cc-g10"
  | "course-booyoung-cc-g11"
  | "course-booyoung-cc-g12"
  | "course-booyoung-cc-g13"
  | "course-asia-club-vangvieng"
  | "course-asia-club-vangvieng-g1"
  | "course-asia-club-vangvieng-g2"
  | "course-asia-club-vangvieng-g3"
  | "course-asia-club-vangvieng-g4"
  | "course-luang-prabang-golf-club"
  | "course-luang-prabang-golf-club-g1"
  | "course-luang-prabang-golf-club-g2"
  | "course-luang-prabang-golf-club-g3"
  | "course-luang-prabang-golf-club-g4"
  | "course-luang-prabang-golf-club-g5"
  | "tour-zipline-cave"
  | "tour-hotair-balloon"
  | "tour-buggy"
  | "tour-buggy-4seat"
  | "vv-elephantcave-oneday"
  | "train-lcr-exterior"
  | "train-lcr-interior"
  | "train-vientiane-station"
  | "tour-mekong-cruise-lp"
  | "tour-blue-lagoon"
  | "transport-minivan"
  | "vv-bluelagoon-swim"
  | "vv-bluelagoon-slide"
  | "vv-bluelagoon-view"
  | "vv-kayak-group-launch"
  | "vv-kayak-people"
  | "vv-kayak-river"
  | "vv-kayak-aerial"
  | "vv-kayak-green-river"
  | "vv-zipline-woman"
  | "vv-zipline-canyon"
  | "vv-zipline-canopy"
  | "vv-zipline-group"
  | "vv-zipline-bridge"
  | "vv-zipline-river-bridge"
  | "vv-zipline-cliff"
  | "vv-cave-interior1"
  | "vv-cave-stalactite"
  | "vv-cave-ceiling"
  | "vv-cave-tubing"
  | "vv-cave-kayak"
  | "vv-cave-walkway"
  | "vv-balloon-multi-aerial"
  | "vv-balloon-sky"
  | "vv-balloon-launch"
  | "vv-balloon-moon"
  | "vv-paramotor-pair"
  | "vv-paramotor-prelaunch"
  | "vv-paramotor-kiting"
  | "vv-buggy-mud-wheel"
  | "vv-buggy-pov-driving"
  | "vv-zipline-waterfall-aerial"
  | "vv-bluelagoon-swing-clean"
  | "vv-balloon-twin-sunset"
  | "vv-kayak-two-boats"
  | "vv-kayak-balloon-combo"
  | "vv-zipline-platform-prep"
  | "vv-bluelagoon-treeswing-pose"
  | "vv-paramotor-tandem-selfie"
  | "vv-paramotor-sunset-silhouette"
  | "vv-paramotor-pov-ricefields"
  | "vientiane-thatluang-day"
  | "vientiane-thatluang-monks"
  | "vientiane-thatluang-night"
  | "vientiane-patuxai-sunset"
  | "vientiane-patuxai-night-fountain"
  | "vientiane-thatluang-aerial"
  | "luangprabang-kuangsi-bridge"
  | "luangprabang-wat-xiengthong-treemosaic"
  | "luangprabang-temple-mural"
  | "luangprabang-almsgiving-morning"
  | "luangprabang-almsgiving-night"
  | "luangprabang-nightmarket-sunset"
  | "vangvieng-namsong-bridge"
  | "vangvieng-balloon-panorama"
  | "vangvieng-viewpoint-flag"
  | "mekong-cruise-cocktail"
  | "mekong-cruise-dinner"
  | "mekong-cruise-boat-sailing"
  | "mekong-cruise-table-setting"
  | "luangprabang-nightmarket-night"
  | "luangprabang-kuangsi-alt";

export const images: Record<ImageKey, string | undefined> = {
  // Interim swap until the owner sources a 3000px+ hero: the dawn sea-of-clouds shot has far more drama for
  // the first screen, and the calmer paddy-reflection shot suits the quieter editorial band below it.
  hero: src.vangViengClouds,
  "editorial-vangvieng": src.vangViengHero,

  "category-package": src.luangPrabangTemple,
  "category-freetravel": src.vangViengPaddy,
  "category-villa": src.poolvillaNightTall,
  // Owner-provided Lao CC drone shot (Vientiane) — fairway runs top-to-bottom, so it survives the tall 4:5 card crop; no signage text.
  "category-golf": src.golfCourseSunriseGreens,
  // Real hot air balloon over Vang Vieng — replaces a Tad Lo elephant photo (wrong region; most of our tours are Vang Vieng activities, not the elephant sanctuary 500km south).
  "category-tour": src.hotairBalloonVangVieng,
  "category-transport": src.categoryTransportVan,

  "destination-vientiane": src.phaThatLuang,
  "destination-vangvieng": src.vangviengViewpointFlag,
  "destination-luangprabang": src.kuangSiFalls,
  // Tad Fane twin falls with a zipliner — landscape, so the falls survive the 21:9 hero crop (the plain tadFane shot is portrait-ish).
  "destination-pakse": src.bolavenZiplineAction,
  // Real Wat Phou ruins, Champasak province — genuine Pakse-area landmark.
  "destination-pakse-g1": src.watPhouChampasak,
  // Real Bolaven Plateau coffee plantation — genuine Pakse-area landmark.
  "destination-pakse-g2": src.bolavenCoffeePlantation,

  "product-1": src.riceFarmers,
  // Reuses the real Vang Vieng guesthouse photo (same as villa-1) — accurate location match, no new file needed.
  "product-2": src.vangviengPoolvillaReal,
  "product-noshopping-vientiane": src.vientianePatuxaiSunset,
  // Honest non-Laos stand-in — see golf attribution note above.
  "product-3": src.golfBunker,
  "product-4": src.luangPrabangNightMarket,
  // Vientiane riverfront — reused here (was previously unused in the registry), fits the Vientiane leg of this route.
  "product-5": src.mekongRiverfront,
  "product-6": src.kuangSiFalls,
  // Matches the elephant sanctuary activity mentioned in this package's itinerary.
  "product-8": src.tadLoElephant,
  // Honest non-Laos stand-ins — see golf attribution note below.
  "product-9": src.golfBackupTeeOff,
  "product-10": src.golfBackupFairwayPath,

  "villa-hero": src.poolvillaNightTall,
  "poolvilla-night-tall": src.poolvillaNightTall,
  "poolvilla-night-wide": src.poolvillaNightWide,
  // Real Vang Vieng guesthouse bungalow row (terrace/exterior). No pool visible, but a genuine local villa-style stay.
  "villa-1": src.vangViengBungalows,
  // TODO: no real "Vientiane + Mekong view + pool villa" photo exists on Commons. Left as an honest placeholder rather than a misleading substitute.
  "villa-2": undefined,
  // Unpublished placeholder row — shares the owner's villa photo so nothing references the deleted Amantaka file.
  "villa-3": src.poolvillaNightTall,

  // Real 유은 호텔 (Vientiane) photography — owner-provided exterior hero plus room/facility photos.
  "hotel-yuwan-vientiane": src.yuwanVientianeHero,
  "hotel-yuwan-vientiane-g1": src.yuwanVientianeGallery1,
  "hotel-yuwan-vientiane-g2": src.yuwanVientianeGallery2,
  "hotel-yuwan-vientiane-g3": src.yuwanVientianeGallery3,
  "hotel-yuwan-vientiane-g4": src.yuwanVientianeGallery4,
  "hotel-yuwan-vientiane-g5": src.yuwanVientianeGallery5,
  "hotel-yuwan-vientiane-g6": src.yuwanVientianeGallery6,
  "hotel-yuwan-vientiane-g7": src.yuwanVientianeGallery7,

  // Real 아마리 호텔 (Vientiane) photography — owner-provided sunset drone hero plus room/facility photos.
  "hotel-amari-vientiane": src.amariVientianeHero,
  "hotel-amari-vientiane-g1": src.amariVientianeGallery1,
  "hotel-amari-vientiane-g2": src.amariVientianeGallery2,
  "hotel-amari-vientiane-g3": src.amariVientianeGallery3,
  "hotel-amari-vientiane-g4": src.amariVientianeGallery4,
  "hotel-amari-vientiane-g5": src.amariVientianeGallery5,
  "hotel-amari-vientiane-g6": src.amariVientianeGallery6,
  "hotel-amari-vientiane-g7": src.amariVientianeGallery7,
  "hotel-amari-vientiane-g8": src.amariVientianeGallery8,
  "hotel-amari-vientiane-g9": src.amariVientianeGallery9,

  // Real 무엉탄 럭셔리 호텔 (Vientiane) photography — owner-provided daytime hero plus room/facility photos.
  "hotel-muongthanh-vientiane": src.muongthanhVientianeHero,
  "hotel-muongthanh-vientiane-g1": src.muongthanhVientianeGallery1,
  "hotel-muongthanh-vientiane-g2": src.muongthanhVientianeGallery2,
  "hotel-muongthanh-vientiane-g3": src.muongthanhVientianeGallery3,
  "hotel-muongthanh-vientiane-g4": src.muongthanhVientianeGallery4,
  "hotel-muongthanh-vientiane-g5": src.muongthanhVientianeGallery5,
  "hotel-muongthanh-vientiane-g6": src.muongthanhVientianeGallery6,
  "hotel-muongthanh-vientiane-g7": src.muongthanhVientianeGallery7,
  "hotel-muongthanh-vientiane-g8": src.muongthanhVientianeGallery8,

  // Honest non-Laos stand-ins for all golf slots below — Wikimedia Commons has zero Laos golf course photography (verified). Each slot uses a different photo so no two golf cards repeat the same image.
  "golf-hero": src.golfCourseSunsetGreen,
  "golf-1": src.golfSunsetHill,
  "golf-2": src.golfBunker,
  "golf-3": src.golfBackupTeeOff,
  // Owner's villa photo (wide crop) — replaces the 600px vangviengPoolvillaReal thumbnail.
  "golf-villa-combo": src.poolvillaNightWide,

  "picks-luangprabang-activity": src.takBatMonks,

  "guide-1": src.vangViengPaddy,
  "guide-2": src.vangViengClouds,
  "guide-3": src.poolvillaNightWide,
  // Honest non-Laos stand-in — see golf attribution note above.
  "guide-4": src.laoCCFairwayPond,
  // Real Luang Prabang temple photo — accurate match for the Luang Prabang guide.
  "guide-5": src.luangPrabangTemple,
  // Real Vientiane riverfront photo — accurate match for the Vientiane guide.
  "guide-6": src.mekongRiverfront,
  // Real Tad Fane waterfall (Pakse/Bolaven Plateau area) — accurate match for the Pakse guide.
  "guide-7": src.tadFane,
  // Laos-transportation-guide — real LCR train, directly on-topic.
  "guide-8": src.lcrTrainViaductWide,
  // Laos-visa-guide — real Wattay airport (entry point), reasonable thematic fit.
  "guide-9": src.wattayAirportShuttle,
  // Laos-safety-tips — generic real Vang Vieng scenery.
  "guide-10": src.vangViengClouds,
  // Laos-budget-guide — generic real Laos countryside.
  "guide-11": src.riceFarmers,
  // Laos-packing-checklist — generic real Vang Vieng activity scenery.
  "guide-12": src.vangviengKayakRiver,
  // Laos-trip-duration-guide — real Kuang Si Falls, evokes a multi-day itinerary.
  "guide-13": src.kuangSiFalls,
  // Laos-food-guide — real Luang Prabang night market, closest real match for food/street-food culture.
  "guide-14": src.luangPrabangNightMarket,
  // Laos-sim-esim-guide — real Pha That Luang (generic Vientiane/city backdrop).
  "guide-15": src.phaThatLuang,

  // Owner-provided real photo of Mekong Golf & Resort, Vientiane.
  "course-mekong-cc": src.mekongCCHero2,
  // Owner-provided real photo of Lao CC, Vientiane.
  "course-lao-cc": src.laoCCAerialClover,
  // Owner-chosen welcome-sign photo, Longbien Golf Club, Vientiane — "CLUB" is
  // foreshortened by the camera angle and hard to read, but the owner prefers
  // this shot over the clearer clubhouse-sign alternative (course-longbien-cc-g6).
  "course-longbien-cc": src.longbienCCWelcomeSignVivid,

  // Gallery photos — Mekong Golf & Resort, Vientiane.
  "course-mekong-cc-g1": src.mekongCCGallery1,
  "course-mekong-cc-g3": src.mekongCCGallery3,
  "course-mekong-cc-g5": src.mekongCCAerial,
  "course-mekong-cc-g6": src.mekongCCBunkers,
  "course-mekong-cc-g7": src.mekongCCCartpath,

  // Gallery photos — Lao CC, Vientiane.
  "course-lao-cc-g2": src.laoCCGallery2,
  "course-lao-cc-g3": src.laoCCGallery3,
  "course-lao-cc-g4": src.laoCCFountainClubhouse,
  "course-lao-cc-g5": src.laoCCAerialTown,
  "course-lao-cc-g6": src.laoCCFairwayPond,
  "course-lao-cc-g7": src.laoCCTopiarySign,
  "course-lao-cc-g8": src.laoCCElephantMascot,

  // Gallery photos — Longbien Golf Club, Vientiane.
  "course-longbien-cc-g2": src.longbienCCGallery2,
  "course-longbien-cc-g3": src.longbienCCGallery3,
  "course-longbien-cc-g4": src.longbienCCGallery4,
  "course-longbien-cc-g6": src.longbienCCGallery6,
  "course-longbien-cc-g7": src.longbienCCGallery7,
  "course-longbien-cc-g8": src.longbienCCGallery8,
  "course-longbien-cc-g9": src.longbienCCGallery9,
  "course-longbien-cc-g10": src.longbienCCGoldenGreen,
  "course-longbien-cc-g11": src.longbienCCClubhouseAerial,

  // Owner-provided real photo of Lakeview CC, Vientiane.
  "course-lakeview-cc": src.lakeviewCCBridge,
  "course-lakeview-cc-g1": src.lakeviewCCGallery1,
  "course-lakeview-cc-g2": src.lakeviewCCGallery2,
  "course-lakeview-cc-g3": src.lakeviewCCGallery3,
  "course-lakeview-cc-g4": src.lakeviewCCGallery4,
  "course-lakeview-cc-g5": src.lakeviewCCGallery5,
  "course-lakeview-cc-g6": src.lakeviewCCGallery6,
  "course-lakeview-cc-g7": src.lakeviewCCGallery7,
  "course-lakeview-cc-g8": src.lakeviewCCGallery8,
  "course-lakeview-cc-g10": src.lakeviewCCGallery10,

  // Owner-provided real photo of Booyoung (SEA Games) Golf Club, Vientiane.
  "course-booyoung-cc": src.booyoungCCClubhouseAerial,

  // Owner-provided real photos of Asia Club, Vang Vieng.
  "course-asia-club-vangvieng": src.asiaClubVangviengHero,
  "course-asia-club-vangvieng-g1": src.asiaClubVangviengGallery1,
  "course-asia-club-vangvieng-g2": src.asiaClubVangviengGallery2,
  "course-asia-club-vangvieng-g3": src.asiaClubVangviengGallery3,
  "course-asia-club-vangvieng-g4": src.asiaClubVangviengGallery4,
  "course-booyoung-cc-g1": src.booyoungCCGallery1,
  "course-booyoung-cc-g2": src.booyoungCCGallery2,
  "course-booyoung-cc-g3": src.booyoungCCGallery3,
  "course-booyoung-cc-g8": src.booyoungCCGallery8,
  "course-booyoung-cc-g10": src.booyoungCCGallery10,
  "course-booyoung-cc-g11": src.booyoungCCGallery11,
  "course-booyoung-cc-g12": src.booyoungCCGallery12,
  "course-booyoung-cc-g13": src.booyoungCCElephant,

  // Real Luang Prabang Golf Club photos, owner-provided from a site they previously operated.
  "course-luang-prabang-golf-club": src.luangprabangGolfCliffRiver,
  "course-luang-prabang-golf-club-g1": src.luangprabangGolfFlagRiver,
  "course-luang-prabang-golf-club-g2": src.luangprabangGolfClubhouse,
  "course-luang-prabang-golf-club-g3": src.luangprabangGolfFairwayPavilion,
  "course-luang-prabang-golf-club-g4": src.luangprabangGolfGreenMountain,
  "course-luang-prabang-golf-club-g5": src.luangprabangGolfRiverView,

  // Real Tham Xang ("Elephant Cave") interior — matches this zipline/elephant-cave tour's actual destination.
  "tour-zipline-cave": src.vangviengThamXangCave,

  "tour-hotair-balloon": src.hotairBalloonVangVieng,
  "tour-buggy": src.buggyVangVieng,
  // Genuine 4-seat/2-row buggy (the shared "tour-buggy" photo above reads as a 2-seat vehicle).
  "tour-buggy-4seat": src.buggy4seatPolaris,
  "train-lcr-exterior": src.lcrTrainFrontview,
  "train-lcr-interior": src.lcrTrainFrontview,
  "train-vientiane-station": src.lcrTrainFrontview,
  "tour-mekong-cruise-lp": src.mekongSunsetDondet,
  "tour-blue-lagoon": src.blueLagoonVangVieng,
  "transport-minivan": src.categoryTransportVan,

  // Owner-provided real Vang Vieng activity photos.
  "vv-bluelagoon-swim": src.vangviengBluelagoonSwim,
  "vv-bluelagoon-slide": src.vangviengBluelagoonTreeswingPose,
  "vv-bluelagoon-view": src.vangviengBluelagoonView,
  "vv-kayak-group-launch": src.vangviengKayakGroupLaunch,
  "vv-kayak-people": src.vangviengKayakPeople,
  "vv-kayak-river": src.vangviengKayakRiver,
  "vv-kayak-aerial": src.vangviengKayakAerial,
  "vv-kayak-green-river": src.vangviengKayakGreenRiver,
  "vv-zipline-woman": src.vangviengZiplineWoman,
  "vv-zipline-canyon": src.vangviengZiplineCanyon,
  "vv-zipline-canopy": src.vangviengZiplineCanopy,
  // Real Vang Vieng kayaking action (Nam Song river) — this half-day tour's own kayak element wasn't shown before.
  "vv-zipline-group": src.vangviengKayakAction,
  "vv-zipline-bridge": src.vangviengZiplineBridge,
  "vv-zipline-river-bridge": src.vangviengZiplineRiverBridge,
  "vv-zipline-cliff": src.bolavenZiplineAction,
  "vv-cave-interior1": src.vangviengCaveInterior1,
  "vv-cave-stalactite": src.vangviengCaveStalactite,
  "vv-cave-ceiling": src.vangviengCaveCeiling,
  "vv-cave-tubing": src.caveTubingBelize,
  // Same real Tham Xang ("Elephant Cave") as "tour-zipline-cave" — this tour also visits it, just without blue lagoon.
  "vv-elephantcave-oneday": src.vangviengThamXangCave,
  // Tham Phu Kham is the actual cave directly above Blue Lagoon 1 — matches this tour's specific "블루라군1" stop.
  "vv-cave-kayak": src.vangviengThamPhukhamCave,
  "vv-cave-walkway": src.vangviengCaveWalkway,
  "vv-balloon-multi-aerial": src.vangviengBalloonMultiAerial,
  "vv-balloon-sky": src.vangviengBalloonSky,
  "vv-balloon-launch": src.vangviengBalloonLaunch,
  "vv-balloon-moon": src.vangviengBalloonMoon,
  "vv-paramotor-pair": src.vangviengParamotorPair,
  "vv-paramotor-prelaunch": src.vangviengParamotorPrelaunch,
  "vv-paramotor-kiting": src.vangviengParamotorFlying,
  "vv-buggy-mud-wheel": src.vangviengBuggyMudWheel,
  "vv-buggy-pov-driving": src.vangviengBuggyPovDriving,
  // Owner-picked: zipline over turquoise Blue Creek, Belize.
  "vv-zipline-waterfall-aerial": src.belizeBluecreekZipline,
  "vv-bluelagoon-swing-clean": src.vangviengBluelagoonSwingClean,
  "vv-balloon-twin-sunset": src.vangviengBalloonTwinSunset,
  "vv-kayak-two-boats": src.vangviengKayakTwoBoats,
  "vv-kayak-balloon-combo": src.vangviengKayakBalloonCombo,
  "vv-zipline-platform-prep": src.vangviengZiplinePlatformPrep,
  "vv-bluelagoon-treeswing-pose": src.vangviengBluelagoonTreeswingPose,
  "vv-paramotor-tandem-selfie": src.paramotorDondetFront,
  "vv-paramotor-sunset-silhouette": src.vangviengParamotorSunsetSilhouette,
  "vv-paramotor-pov-ricefields": src.vangviengParamotorPovRicefields,

  // Owner-provided real photos — destinations gallery, Mekong sunset cruise tour gallery, and the LP·VV 3-night free package product gallery.
  "vientiane-thatluang-day": src.vientianeThatluangDay,
  "vientiane-thatluang-monks": src.vientianeThatluangMonks,
  "vientiane-thatluang-night": src.vientianeThatluangNight,
  "vientiane-patuxai-sunset": src.vientianePatuxaiSunset,
  "vientiane-patuxai-night-fountain": src.vientianePatuxaiNightFountain,
  "vientiane-thatluang-aerial": src.vientianeThatluangAerial,
  "luangprabang-kuangsi-bridge": src.luangprabangKuangsiBridge,
  "luangprabang-wat-xiengthong-treemosaic": src.luangprabangWatXiengthongTreemosaic,
  "luangprabang-temple-mural": src.luangprabangTempleMural,
  "luangprabang-almsgiving-morning": src.luangprabangAlmsgivingMorning,
  "luangprabang-almsgiving-night": src.luangprabangAlmsgivingNight,
  "luangprabang-nightmarket-sunset": src.luangprabangNightmarketSunset,
  "vangvieng-namsong-bridge": src.vangviengNamsongBridge,
  "vangvieng-balloon-panorama": src.vangviengBalloonPanorama,
  "vangvieng-viewpoint-flag": src.vangviengViewpointFlag,
  "mekong-cruise-cocktail": src.mekongCruiseCocktail,
  "mekong-cruise-dinner": src.mekongCruiseDinner,
  "mekong-cruise-boat-sailing": src.mekongCruiseBoatSailing,
  "mekong-cruise-table-setting": src.mekongCruiseTableSetting,
  "luangprabang-nightmarket-night": src.luangprabangNightmarketNight,
  "luangprabang-kuangsi-alt": src.luangprabangKuangsiAlt,
};

export function getImage(key?: string): string | undefined {
  if (!key) return undefined;
  return images[key as ImageKey];
}
