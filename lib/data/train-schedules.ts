// LCR (Laos-China Railway) departure times and fares. Times follow the
// public timetable (Travellao notice 2026-09-29: C96/C95 added from 9/28,
// C92 moved ~30 min earlier). Fares match Bluetour's booking screen as of
// 2026-10-27: "중국고속" (D-series) trains cost more than "고속" (C-series).
export interface TrainDeparture {
  code: string;
  depart: string;
  arrive: string;
  duration: string;
  price: number;
  priceUsd: number;
}

export const TRAIN_SCHEDULES: Record<string, TrainDeparture[]> = {
  "vientiane-luangprabang": [
    { code: "D88", depart: "08:00", arrive: "09:46", duration: "1시간 46분", price: 39000, priceUsd: 28 },
    { code: "C92", depart: "09:20", arrive: "11:38", duration: "2시간 18분", price: 35000, priceUsd: 25 },
    { code: "D84", depart: "11:25", arrive: "13:11", duration: "1시간 46분", price: 39000, priceUsd: 28 },
    { code: "C96", depart: "14:05", arrive: "16:48", duration: "2시간 43분", price: 35000, priceUsd: 25 },
    { code: "C86", depart: "15:15", arrive: "17:26", duration: "2시간 11분", price: 35000, priceUsd: 25 },
  ],
  "vientiane-vangvieng": [
    { code: "D88", depart: "08:00", arrive: "08:52", duration: "52분", price: 25500, priceUsd: 18 },
    { code: "C92", depart: "09:20", arrive: "10:12", duration: "52분", price: 23000, priceUsd: 17 },
    { code: "D84", depart: "11:25", arrive: "12:17", duration: "52분", price: 25500, priceUsd: 18 },
    { code: "C96", depart: "14:05", arrive: "15:08", duration: "1시간 3분", price: 23000, priceUsd: 17 },
    { code: "C86", depart: "15:15", arrive: "16:26", duration: "1시간 11분", price: 23000, priceUsd: 17 },
  ],
  "vangvieng-luangprabang": [
    { code: "D88", depart: "08:55", arrive: "09:46", duration: "51분", price: 24000, priceUsd: 17 },
    { code: "C92", depart: "10:16", arrive: "11:38", duration: "1시간 22분", price: 22000, priceUsd: 16 },
    { code: "D84", depart: "12:20", arrive: "13:11", duration: "51분", price: 24000, priceUsd: 17 },
    { code: "C96", depart: "15:15", arrive: "16:48", duration: "1시간 33분", price: 22000, priceUsd: 16 },
    { code: "C86", depart: "16:30", arrive: "17:26", duration: "56분", price: 22000, priceUsd: 16 },
  ],
  "luangprabang-vientiane": [
    { code: "C95", depart: "09:48", arrive: "11:47", duration: "1시간 59분", price: 35000, priceUsd: 25 },
    { code: "C91", depart: "12:28", arrive: "14:31", duration: "2시간 3분", price: 35000, priceUsd: 25 },
    { code: "D87", depart: "14:58", arrive: "16:44", duration: "1시간 46분", price: 39000, priceUsd: 28 },
    { code: "D83", depart: "18:11", arrive: "19:59", duration: "1시간 48분", price: 39000, priceUsd: 28 },
    { code: "C85", depart: "18:35", arrive: "20:28", duration: "1시간 53분", price: 35000, priceUsd: 25 },
  ],
  "luangprabang-vangvieng": [
    { code: "C95", depart: "09:48", arrive: "10:42", duration: "54분", price: 22000, priceUsd: 16 },
    { code: "C91", depart: "12:28", arrive: "13:34", duration: "1시간 6분", price: 22000, priceUsd: 16 },
    { code: "D87", depart: "14:58", arrive: "15:49", duration: "51분", price: 24000, priceUsd: 17 },
    { code: "D83", depart: "18:11", arrive: "19:02", duration: "51분", price: 24000, priceUsd: 17 },
    { code: "C85", depart: "18:35", arrive: "19:31", duration: "56분", price: 22000, priceUsd: 16 },
  ],
  "vangvieng-vientiane": [
    { code: "C95", depart: "10:46", arrive: "11:47", duration: "1시간 1분", price: 23000, priceUsd: 17 },
    { code: "C91", depart: "13:38", arrive: "14:31", duration: "53분", price: 23000, priceUsd: 17 },
    { code: "D87", depart: "15:52", arrive: "16:44", duration: "52분", price: 25500, priceUsd: 18 },
    { code: "D83", depart: "19:06", arrive: "19:59", duration: "53분", price: 25500, priceUsd: 18 },
    { code: "C85", depart: "19:35", arrive: "20:28", duration: "53분", price: 23000, priceUsd: 17 },
  ],
};
