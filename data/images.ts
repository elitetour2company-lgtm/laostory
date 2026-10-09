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
 * - paramotorDondetFront: owner-sourced real tandem paramotor photo over
 *   Vang Vieng's karst peaks at sunset — replaces a square, sky-only photo
 *   (that one was actually shot in Don Det, hence the variable name).
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
  muangphuangFloatingBungalows: img("muangphuang-floating-bungalows.jpg"),
  vangViengClouds: img("vangvieng-clouds.jpg"),
  vangViengPaddy: img("vangvieng-paddy.jpg"),
  vangViengBungalows: img("vangvieng-bungalows.jpg"),
  mekongRiverfront: img("mekong-riverfront.jpg"),
  phaThatLuang: img("pha-that-luang.jpg"),
  luangPrabangTemple: img("luangprabang-temple.jpg"),
  kuangSiFalls: img("kuang-si-falls.jpg"),
  luangPrabangNightMarket: img("luangprabang-nightmarket.jpg"),
  takBatMonks: img("takbat-monks.jpg"),
  // Owner-provided night shot of the pool villa used in the golf+villa package (960px original, two crops).
  poolvillaNightTall: img("poolvilla-night-tall.jpg"),
  poolvillaNightWide: img("poolvilla-night-wide.jpg"),
  // KiM.C Pool Villa (Vientiane) photos from the villa's own site, used with the owner's permission (confirmed by owner, 2026-10-09).
  kimcPoolvillaSunsetAerial: img("kimc-poolvilla-sunset-aerial.jpg"),
  kimcPoolvillaPoolDay: img("kimc-poolvilla-pool-day.jpg"),
  kimcPoolvillaPoolNight: img("kimc-poolvilla-pool-night.jpg"),
  // Vang Vieng activity photos (1400px), used with the supplier's permission (confirmed by owner, 2026-10-09).
  vvParamotorTakeoffPhoto: img("vv-paramotor-takeoff.jpg"),
  vvMountainPanoramaPhoto: img("vv-mountain-panorama.jpg"),
  vvBalloonsDawnPhoto: img("vv-balloons-dawn.jpg"),
  vvBuggyLineupPhoto: img("vv-buggy-lineup.jpg"),
  vvBluelagoonSwimmingPhoto: img("vv-bluelagoon-swimming.jpg"),
  vvCaveTubingPoolPhoto: img("vv-cave-tubing-pool.jpg"),
  vvKayakRiverTwoPhoto: img("vv-kayak-river-two.jpg"),
  vvZiplinePlatformGroupPhoto: img("vv-zipline-platform-group.jpg"),
  // Owner-supplied zipline-over-Nam-Song photo (1920x1080), used with permission (confirmed by owner, 2026-10-09).
  vvZiplineNamsongRiver: img("vv-zipline-namsong-river.jpg"),
  golfSunsetHill: img("golf-sunset-hill.jpg"),
  golfBunker: img("golf-bunker.jpg"),
  golfBackupTeeOff: img("golf-backup-teeoff.jpg"),
  golfBackupFairwayPath: img("golf-backup-fairwaypath.jpg"),
  wattayAirportExterior: img("wattay-airport-exterior.jpg"),
  golfBagCarry: img("golf-bag-carry.jpg"),
  hotairBalloonVangVieng: img("hotair-balloon-vangvieng.jpg"),
  buggyVangVieng: img("buggy-vangvieng.jpg"),
  // Landscape crop of lcrTrainExterior (the original is portrait, which put the train outside the 21:9 hero band).
  lcrTrainViaductWide: img("lcr-train-viaduct-wide.jpg"),
  // "Blue Lagoon at Vang Vieng" by Gonzo Gooner, CC BY 3.0 (Wikimedia Commons) — credited in the guide article.
  blueLagoonTubing: img("vangvieng-blue-lagoon-tubing.jpg"),
  // "Avenue Lane Xang (Vientiane)" by Christophe95, CC BY-SA 4.0 (Wikimedia Commons) — credited in the guide article.
  vientianeLaneXangDrive: img("vientiane-lane-xang-avenue.jpg"),
  // "Pills and medicines 02" by BuhaM, CC BY-SA 4.0 (Wikimedia Commons) — credited in the guide article.
  travelMedicinePills: img("travel-medicine-pills.jpg"),
  // Self-made illustration card (no third-party photo) for the taxi-app guide.
  taxiAppGuideCard: img("taxi-app-guide-card.jpg"),
  // Self-made illustration card for the packing checklist guide.
  packingChecklistCard: img("packing-checklist-card.jpg"),
  // Self-made cheat-sheet card for the exchange-rate guide.
  exchangeRateGuideCard: img("exchange-rate-guide-card.jpg"),
  // Owner-provided photo of the Korean embassy in Vientiane (guide: emergency contacts), 678x375.
  emergencyEmbassyPhoto: img("emergency-embassy.jpg"),
  // Vientiane Lao Development Bank exchange counter, used with the photo owner's permission (confirmed by owner, 2026-10-09).
  vientianeExchangeCounter: img("vientiane-exchange-counter.jpg"),
  // "Meter Taxi in Vientiane 01" (Wikimedia Commons), CC BY-SA 3.0 — credited in the guide article.
  vientianeMeterTaxi: img("vientiane-meter-taxi.jpg"),
  // "Clothes-travel-voyage-backpack" (Wikimedia Commons / Flickr), CC0 — no credit required.
  travelPackingBackpack: img("travel-packing-backpack.jpg"),
  // Basile Morin, Wikimedia Commons, CC BY-SA 4.0 — credited in the guide article.
  luangPrabangKuangsiTurquoise: img("luangprabang-kuangsi-falls-turquoise.jpg"),
  luangPrabangPhousiDusk: img("luangprabang-phousi-dusk.jpg"),
  // Bank of the Lao PDR banknote images, CC BY-SA 4.0 (Wikimedia Commons, uploader credit: bol.gov.la) — credited in the guide article.
  laosKipNotesGrid: img("laos-kip-notes-grid.jpg"),
  // Owner-provided photo (white Toyota HiAce on a palm-lined city street) — homepage category card and all van thumbnails.
  categoryTransportVan: img("category-transport-van.webp"),
  bolavenZiplineAction: img("bolaven-zipline-action.jpg"),
  vangviengZiplineRiver: img("vangvieng-zipline-river.jpg"),
  vangviengBuggyMudSplash: img("vangvieng-buggy-mud-splash.jpg"),
  vangviengThamXangCave: img("vangvieng-tham-xang-cave.jpg"),
  vangviengZiplineJungle: img("vangvieng-zipline-jungle.jpg"),
  bluelagoon3RopeSwingAction: img("bluelagoon3-rope-swing-action.jpg"),
  vangviengBuggy4seatFamily: img("vangvieng-buggy-4seat-family.jpg"),
  paramotorDondetFront: img("vangvieng-paramotor-sunset.jpg"),
  mekongSunsetDondet: img("mekong-sunset-dondet.jpg"),
  lcrTrainFrontview: img("train-lcr-frontview.jpg"),

  mekongCCGallery3: img("mekong-cc-4.png"),

  laoCCGallery2: img("lao-cc-3.png"),

  longbienCCGallery2: img("longbien-cc-2.png"),
  longbienCCGallery3: img("longbien-cc-3.png"),
  longbienCCGallery4: img("longbien-cc-4.png"),
  longbienCCGallery6: img("longbien-cc-7.png"),
  longbienCCGallery8: img("longbien-cc-9.png"),
  // Long Vien Golf Club photos (1366-1440px) from a booking site, used with the club's permission (confirmed by owner, 2026-10-09).
  longbienCCSunsetPond: img("longbien-cc-sunset-pond.jpg"),
  longbienCCBunkerPalms: img("longbien-cc-bunker-palms.jpg"),
  longbienCCNightLit: img("longbien-cc-night-lit.jpg"),

  lakeviewCCBridge: img("lakeview-cc-5.png"),
  // Lakeview Vientiane Golf Club photos (1920x1439) from a booking site, used with the club's permission (confirmed by owner, 2026-10-09).
  lakeviewCCLakeCartpath: img("lakeview-cc-lake-cartpath.jpg"),
  lakeviewCCBunkerPalms: img("lakeview-cc-bunker-palms.jpg"),
  lakeviewCCPondCartpath: img("lakeview-cc-pond-cartpath.jpg"),
  lakeviewCCRangeStripes: img("lakeview-cc-range-stripes.jpg"),
  lakeviewCCGallery1: img("lakeview-cc-1.png"),
  lakeviewCCGallery3: img("lakeview-cc-3.png"),
  lakeviewCCGallery4: img("lakeview-cc-4.png"),
  lakeviewCCGallery7: img("lakeview-cc-8.png"),

  booyoungCCGallery11: img("booyoung-cc-12.png"),
  booyoungCCGallery12: img("booyoung-cc-13.png"),

  asiaClubVangviengHero: img("asia-club-vangvieng-2.jpeg"),
  asiaClubVangviengGallery1: img("asia-club-vangvieng-1.jpeg"),
  asiaClubVangviengGallery2: img("asia-club-vangvieng-3.jpeg"),
  asiaClubVangviengGallery3: img("asia-club-vangvieng-4.jpeg"),
  asiaClubVangviengGallery4: img("asia-club-vangvieng-5.jpeg"),

  vangviengBluelagoonSwim: img("vangvieng-bluelagoon-swim.png"),
  vangviengKayakPeople: img("vangvieng-kayak-people.png"),
  vangviengZiplineCanyon: img("vangvieng-zipline-canyon.png"),
  vangviengBalloonRiverTown: img("vangvieng-balloon-river-town.jpg"),
  vangviengBuggyMudWheel: img("vangvieng-buggy-mud-wheel.jpg"),
  vangviengBuggyPovDriving: img("vangvieng-buggy-pov-driving.jpg"),
  vangviengBluelagoonSwingClean: img("vangvieng-bluelagoon-swing-clean.jpg"),
  vangviengBalloonTwinSunset: img("vangvieng-balloon-twin-sunset.png"),
  vangviengKayakTwoBoats: img("vangvieng-kayak-two-boats.jpg"),
  vangviengKayakBalloonCombo: img("vangvieng-kayak-balloon-combo.jpg"),
  vangviengZiplinePlatformPrep: img("vangvieng-zipline-platform-prep.jpg"),
  vangviengBluelagoonTreeswingPose: img("vangvieng-bluelagoon-treeswing-pose.jpg"),
  vangviengParamotorSunsetSilhouette: img("vangvieng-paramotor-sunset-silhouette.jpg"),
  luangprabangGolfCliffRiver: img("luangprabang-golf-cliff-river.webp"),
  luangprabangGolfFlagRiver: img("luangprabang-golf-flag-river.webp"),
  luangprabangGolfClubhouse: img("luangprabang-golf-clubhouse.webp"),
  luangprabangGolfFairwayPavilion: img("luangprabang-golf-fairway-pavilion.webp"),
  luangprabangGolfGreenMountain: img("luangprabang-golf-green-mountain.webp"),
  luangprabangGolfRiverView: img("luangprabang-golf-river-view.webp"),
  mekongCCClubhouseBunker: img("mekong-cc-clubhouse-bunker.jpg"),
  mekongCCAerial: img("mekong-cc-aerial.jpg"),
  mekongCCCartpath: img("mekong-cc-cartpath.jpg"),
  laoCCAerialClover: img("lao-cc-aerial-clover.jpg"),
  laoCCFountainClubhouse: img("lao-cc-fountain-clubhouse.webp"),
  laoCCAerialTown: img("lao-cc-aerial-town.webp"),
  golfCourseSunriseGreens: img("golf-course-sunrise-greens.jpg"),
  laoCCFairwayPond: img("lao-cc-fairway-pond.webp"),
  longbienCCClubhouseAerial: img("longbien-cc-clubhouse-aerial.jpg"),
  longbienCCGoldenGreen: img("longbien-cc-golden-green.webp"),
  golfCourseSunsetGreen: img("golf-course-sunset-green.jpg"),
  longbienCCWelcomeSignVivid: img("longbien-cc-welcome-sign-vivid.webp"),
  // Booyoung (SEA Games) Golf Club fairway + clubhouse, 1440x810 — used with the club's permission (owner confirmed, 2026-10-09).
  booyoungCCFairwayClubhouse: img("booyoung-cc-fairway-clubhouse.jpg"),
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
};

type ImageKey =
  | "hero"
  | "editorial-vangvieng"
  | "product-muangphuang-vangvieng"
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
  | "product-noshopping-vientiane"
  | "product-3"
  | "product-4"
  | "product-5"
  | "product-6"
  | "product-9"
  | "product-10"
  | "villa-hero"
  | "villa-1"
  | "villa-2"
  | "villa-3"
  | "poolvilla-night-tall"
  | "poolvilla-night-wide"
  | "golf-hero"
  | "golf-1"
  | "golf-2"
  | "golf-3"
  | "golf-villa-combo"
  | "kimc-poolvilla"
  | "kimc-poolvilla-pool-day"
  | "kimc-poolvilla-pool-night"
  | "picks-luangprabang-activity"
  | "guide-1"
  | "guide-2"
  | "guide-3"
  | "guide-4"
  | "guide-5"
  | "guide-6"
  | "guide-8"
  | "guide-10"
  | "guide-13"
  | "guide-14"
  | "guide-15"
  | "guide-16"
  | "guide-17"
  | "guide-18"
  | "guide-19"
  | "guide-20"
  | "guide-21"
  | "guide-22"
  | "guide-23"
  | "guide-24"
  | "guide-25"
  | "guide-26"
  | "guide-27"
  | "guide-28"
  | "guide-29"
  | "guide-30"
  | "guide-31"
  | "guide-32"
  | "guide-33"
  | "guide-currency-exchange"
  | "course-mekong-cc"
  | "course-lao-cc"
  | "course-longbien-cc"
  | "course-mekong-cc-g3"
  | "course-mekong-cc-g5"
  | "course-mekong-cc-g7"
  | "course-lao-cc-g2"
  | "course-lao-cc-g4"
  | "course-lao-cc-g5"
  | "course-lao-cc-g6"
  | "course-longbien-cc-g2"
  | "course-longbien-cc-g3"
  | "course-longbien-cc-g4"
  | "course-longbien-cc-g6"
  | "course-longbien-cc-g8"
  | "course-longbien-cc-g10"
  | "course-longbien-cc-g11"
  | "course-longbien-cc-g21"
  | "course-longbien-cc-g22"
  | "course-longbien-cc-g23"
  | "course-lakeview-cc"
  | "course-lakeview-cc-g1"
  | "course-lakeview-cc-g3"
  | "course-lakeview-cc-g4"
  | "course-lakeview-cc-g7"
  | "course-lakeview-cc-bridge"
  | "course-lakeview-cc-g21"
  | "course-lakeview-cc-g22"
  | "course-lakeview-cc-g23"
  | "course-booyoung-cc"
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
  | "transport-minivan"
  | "vv-bluelagoon-swim"
  | "vv-bluelagoon-slide"
  | "vv-kayak-people"
  | "vv-zipline-canyon"
  | "vv-zipline-group"
  | "vv-zipline-cliff"
  | "vv-cave-tubing"
  | "vv-cave-kayak"
  | "vv-balloon-multi-aerial"
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
  | "vv-p-paramotor-takeoff"
  | "vv-p-mountain-panorama"
  | "vv-p-balloons-dawn"
  | "vv-p-buggy-lineup"
  | "vv-p-bluelagoon-swimming"
  | "vv-p-cave-tubing-pool"
  | "vv-p-kayak-river-two"
  | "vv-p-zipline-platform-group"
  | "vv-p-zipline-namsong-river"
  | "vv-paramotor-sunset-silhouette"
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
  | "luangprabang-nightmarket-night";

export const images: Record<ImageKey, string | undefined> = {
  // The wide karst+paddy-reflection shot works far better in the ultra-wide hero band than a portrait
  // balloon photo does (no empty-sky crop on desktop); the sea-of-clouds shot moves to the editorial band.
  hero: src.vangViengHero,
  "editorial-vangvieng": src.vangViengClouds,
  "product-muangphuang-vangvieng": src.muangphuangFloatingBungalows,

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

  // Reuses the real Vang Vieng guesthouse photo (same as villa-1) — accurate location match, no new file needed.
  "product-noshopping-vientiane": src.vientianePatuxaiSunset,
  // Honest non-Laos stand-in — see golf attribution note above.
  "product-3": src.golfBunker,
  "product-4": src.luangPrabangNightMarket,
  // Vientiane riverfront — reused here (was previously unused in the registry), fits the Vientiane leg of this route.
  "product-5": src.mekongRiverfront,
  "product-6": src.kuangSiFalls,
  // Matches the elephant sanctuary activity mentioned in this package's itinerary.
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

  // Honest non-Laos stand-ins for all golf slots below — Wikimedia Commons has zero Laos golf course photography (verified). Each slot uses a different photo so no two golf cards repeat the same image.
  "golf-hero": src.golfCourseSunsetGreen,
  "golf-1": src.golfSunsetHill,
  "golf-2": src.golfBunker,
  "golf-3": src.golfBackupTeeOff,
  // Owner's villa photo (wide crop) — replaces the 600px vangviengPoolvillaReal thumbnail.
  "golf-villa-combo": src.poolvillaNightWide,
  "kimc-poolvilla": src.kimcPoolvillaSunsetAerial,
  "kimc-poolvilla-pool-day": src.kimcPoolvillaPoolDay,
  "kimc-poolvilla-pool-night": src.kimcPoolvillaPoolNight,

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
  // Laos-transportation-guide — real LCR train, directly on-topic.
  "guide-8": src.lcrTrainViaductWide,
  // Laos-visa-guide — real Wattay airport (entry point), reasonable thematic fit.
  // Laos-safety-tips — generic real Vang Vieng scenery.
  "guide-10": src.vangViengClouds,
  // Laos-budget-guide — generic real Laos countryside.
  // Laos-packing-checklist — generic real Vang Vieng activity scenery.
  // Laos-trip-duration-guide — real Kuang Si Falls, evokes a multi-day itinerary.
  "guide-13": src.kuangSiFalls,
  // Laos-food-guide — real Luang Prabang night market, closest real match for food/street-food culture.
  "guide-14": src.luangPrabangNightMarket,
  // Laos-sim-esim-guide — real Pha That Luang (generic Vientiane/city backdrop).
  "guide-15": src.phaThatLuang,
  // Laos-golf-caddy-cart-tip-guide — real Mekong CC cart path shot, directly on-topic.
  "guide-16": src.mekongCCCartpath,
  // Laos-travel-medicine-guide — real Wattay International Airport exterior.
  "guide-17": src.wattayAirportExterior,
  // Laos-golf-bag-airline-baggage-guide — real golf bag over shoulder, directly on-topic.
  "guide-18": src.golfBagCarry,
  // Laos-golf-course-transport-guide — real Vientiane tuk-tuk taxi scene, directly on-topic.
  "guide-19": src.longbienCCGoldenGreen,
  // Vangvieng-blue-lagoon-guide — turquoise water with swimmers, matches the Blue Lagoon topic.
  "guide-20": src.blueLagoonTubing,
  // Laos-rental-car-vs-charter-van-guide — real Vientiane avenue seen from the driver's view with SUVs and motorbikes.
  "guide-21": src.vientianeLaneXangDrive,
  // Laos-travel-medicine-guide — tablets and capsules, directly on-topic.
  "guide-22": src.travelMedicinePills,
  // Laos-taxi-app-guide — own illustration card (LOCA / inDrive / Kokkok summary).
  "guide-23": src.taxiAppGuideCard,
  // Laos-travel-packing-checklist — own checklist card.
  "guide-24": src.packingChecklistCard,
  // Laos-exchange-rate-calculation-guide — own cheat-sheet card.
  "guide-25": src.exchangeRateGuideCard,
  // Laos-emergency-contacts-guide — embassy photo.
  "guide-26": src.emergencyEmbassyPhoto,
  // Laos-golf-tour-types-guide — Lakeview lake + cart path (replaces the Longbien photo that duplicated guide-19).
  "guide-27": src.lakeviewCCLakeCartpath,
  // Laos-exchange-rate guide — real money-exchange counter, Vientiane.
  "guide-28": src.vientianeExchangeCounter,
  // Laos-taxi-app guide — yellow Meter Taxi, Vientiane.
  "guide-29": src.vientianeMeterTaxi,
  // Laos-travel-packing-checklist guide — travel gear flat lay.
  "guide-30": src.travelPackingBackpack,
  // Luang-prabang-travel-course guide — cover: Kuang Si Falls.
  "guide-31": src.luangPrabangKuangsiTurquoise,
  // Luang-prabang-travel-course guide — body photo: Phou Si dusk view.
  "guide-32": src.luangPrabangPhousiDusk,
  // Laos-solo-golf guide — Lao CC fairway with pond (existing 2000px photo).
  "guide-33": src.laoCCFairwayPond,
  // Laos-currency-exchange-guide — real Lao Kip banknote denominations, directly on-topic.
  "guide-currency-exchange": src.laosKipNotesGrid,

  // Owner-provided real photo of Mekong Golf & Resort, Vientiane.
  "course-mekong-cc": src.mekongCCClubhouseBunker,
  // Owner-provided real photo of Lao CC, Vientiane.
  "course-lao-cc": src.laoCCAerialClover,
  // Owner-chosen welcome-sign photo, Longbien Golf Club, Vientiane — "CLUB" is
  // foreshortened by the camera angle and hard to read, but the owner prefers
  // this shot over the clearer clubhouse-sign alternative (course-longbien-cc-g6).
  "course-longbien-cc": src.longbienCCWelcomeSignVivid,

  // Gallery photos — Mekong Golf & Resort, Vientiane.
  "course-mekong-cc-g3": src.mekongCCGallery3,
  "course-mekong-cc-g5": src.mekongCCAerial,
  "course-mekong-cc-g7": src.mekongCCCartpath,

  // Gallery photos — Lao CC, Vientiane.
  "course-lao-cc-g2": src.laoCCGallery2,
  "course-lao-cc-g4": src.laoCCFountainClubhouse,
  "course-lao-cc-g5": src.laoCCAerialTown,
  "course-lao-cc-g6": src.laoCCFairwayPond,

  // Gallery photos — Longbien Golf Club, Vientiane.
  "course-longbien-cc-g2": src.longbienCCGallery2,
  "course-longbien-cc-g3": src.longbienCCGallery3,
  "course-longbien-cc-g4": src.longbienCCGallery4,
  "course-longbien-cc-g6": src.longbienCCGallery6,
  "course-longbien-cc-g8": src.longbienCCGallery8,
  "course-longbien-cc-g21": src.longbienCCSunsetPond,
  "course-longbien-cc-g22": src.longbienCCBunkerPalms,
  "course-longbien-cc-g23": src.longbienCCNightLit,
  "course-longbien-cc-g10": src.longbienCCGoldenGreen,
  "course-longbien-cc-g11": src.longbienCCClubhouseAerial,

  // Owner-provided real photo of Lakeview CC, Vientiane.
  "course-lakeview-cc": src.lakeviewCCLakeCartpath,
  "course-lakeview-cc-bridge": src.lakeviewCCBridge,
  "course-lakeview-cc-g21": src.lakeviewCCBunkerPalms,
  "course-lakeview-cc-g22": src.lakeviewCCPondCartpath,
  "course-lakeview-cc-g23": src.lakeviewCCRangeStripes,
  "course-lakeview-cc-g1": src.lakeviewCCGallery1,
  "course-lakeview-cc-g3": src.lakeviewCCGallery3,
  "course-lakeview-cc-g4": src.lakeviewCCGallery4,
  "course-lakeview-cc-g7": src.lakeviewCCGallery7,

  // Owner-provided real photo of Booyoung (SEA Games) Golf Club, Vientiane.
  "course-booyoung-cc": src.booyoungCCFairwayClubhouse,

  // Owner-provided real photos of Asia Club, Vang Vieng.
  "course-asia-club-vangvieng": src.asiaClubVangviengHero,
  "course-asia-club-vangvieng-g1": src.asiaClubVangviengGallery1,
  "course-asia-club-vangvieng-g2": src.asiaClubVangviengGallery2,
  "course-asia-club-vangvieng-g3": src.asiaClubVangviengGallery3,
  "course-asia-club-vangvieng-g4": src.asiaClubVangviengGallery4,
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
  "tour-buggy-4seat": src.vangviengBuggy4seatFamily,
  "train-lcr-exterior": src.lcrTrainFrontview,
  "train-lcr-interior": src.lcrTrainFrontview,
  "train-vientiane-station": src.lcrTrainFrontview,
  "tour-mekong-cruise-lp": src.mekongSunsetDondet,
  "transport-minivan": src.categoryTransportVan,

  // Owner-provided real Vang Vieng activity photos.
  "vv-bluelagoon-swim": src.vangviengBluelagoonSwim,
  "vv-bluelagoon-slide": src.vangviengBluelagoonTreeswingPose,
  "vv-kayak-people": src.vangviengKayakPeople,
  "vv-zipline-canyon": src.vangviengZiplineCanyon,
  // Real Vang Vieng kayaking action (Nam Song river) — this half-day tour's own kayak element wasn't shown before.
  // Reuses the same zipline photo as vv-elephantcave-oneday (owner's choice).
  "vv-zipline-group": src.vangviengZiplineJungle,
  "vv-zipline-cliff": src.vangviengZiplineRiver,
  "vv-cave-tubing": src.bluelagoon3RopeSwingAction,
  // Same real Tham Xang ("Elephant Cave") as "tour-zipline-cave" — this tour also visits it, just without blue lagoon.
  "vv-elephantcave-oneday": src.vangviengZiplineJungle,
  // Tham Phu Kham is the actual cave directly above Blue Lagoon 1 — matches this tour's specific "블루라군1" stop.
  // Reuses the Blue Lagoon 1 photo (same destination as vv-bluelagoon-swim) —
  // the old dark cave-interior photo undersold this as a "fun water tour".
  "vv-cave-kayak": src.vangviengBluelagoonSwim,
  "vv-balloon-multi-aerial": src.vangviengBalloonRiverTown,
  "vv-buggy-mud-wheel": src.vangviengBuggyMudWheel,
  "vv-buggy-pov-driving": src.vangviengBuggyPovDriving,
  // Owner-picked: zipline over turquoise Blue Creek, Belize.
  "vv-zipline-waterfall-aerial": src.vangviengBuggyMudSplash,
  "vv-bluelagoon-swing-clean": src.vangviengBluelagoonSwingClean,
  "vv-balloon-twin-sunset": src.vangviengBalloonTwinSunset,
  "vv-kayak-two-boats": src.vangviengKayakTwoBoats,
  "vv-kayak-balloon-combo": src.vangviengKayakBalloonCombo,
  "vv-zipline-platform-prep": src.vangviengZiplinePlatformPrep,
  "vv-bluelagoon-treeswing-pose": src.vangviengBluelagoonTreeswingPose,
  "vv-paramotor-tandem-selfie": src.paramotorDondetFront,
  "vv-p-paramotor-takeoff": src.vvParamotorTakeoffPhoto,
  "vv-p-mountain-panorama": src.vvMountainPanoramaPhoto,
  "vv-p-balloons-dawn": src.vvBalloonsDawnPhoto,
  "vv-p-buggy-lineup": src.vvBuggyLineupPhoto,
  "vv-p-bluelagoon-swimming": src.vvBluelagoonSwimmingPhoto,
  "vv-p-cave-tubing-pool": src.vvCaveTubingPoolPhoto,
  "vv-p-kayak-river-two": src.vvKayakRiverTwoPhoto,
  "vv-p-zipline-platform-group": src.vvZiplinePlatformGroupPhoto,
  "vv-p-zipline-namsong-river": src.vvZiplineNamsongRiver,
  "vv-paramotor-sunset-silhouette": src.vangviengParamotorSunsetSilhouette,

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
};

export function getImage(key?: string): string | undefined {
  if (!key) return undefined;
  if (key.startsWith("/api/site-images/")) return key;
  return images[key as ImageKey];
}
