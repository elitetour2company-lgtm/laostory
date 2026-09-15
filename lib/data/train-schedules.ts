// Real LCR (Laos-China Railway) public departure times, one fixed daily
// timetable (no seasonal variation published). Vientiane-origin trains run
// mornings, Luang Prabang-origin trains run afternoons/evenings — this
// matches the line's actual schedule, not an assumption.
export interface TrainDeparture {
  code: string;
  depart: string;
  arrive: string;
  duration: string;
}

export const TRAIN_SCHEDULES: Record<string, TrainDeparture[]> = {
  "vientiane-luangprabang": [
    { code: "D88", depart: "08:00", arrive: "09:46", duration: "1시간 46분" },
    { code: "C92", depart: "09:50", arrive: "11:58", duration: "2시간 8분" },
    { code: "D84", depart: "11:25", arrive: "13:11", duration: "1시간 46분" },
    { code: "C86", depart: "15:15", arrive: "17:26", duration: "2시간 11분" },
  ],
  "luangprabang-vientiane": [
    { code: "C91", depart: "12:28", arrive: "14:31", duration: "2시간 3분" },
    { code: "D87", depart: "14:58", arrive: "16:44", duration: "1시간 46분" },
    { code: "D83", depart: "18:11", arrive: "19:59", duration: "1시간 48분" },
    { code: "C85", depart: "18:35", arrive: "20:28", duration: "1시간 53분" },
  ],
  "vientiane-vangvieng": [
    { code: "D88", depart: "08:00", arrive: "08:52", duration: "52분" },
    { code: "C92", depart: "09:50", arrive: "10:42", duration: "52분" },
    { code: "D84", depart: "11:25", arrive: "12:17", duration: "52분" },
    { code: "C86", depart: "15:15", arrive: "16:26", duration: "1시간 11분" },
  ],
  "vangvieng-vientiane": [
    { code: "C91", depart: "13:38", arrive: "14:31", duration: "53분" },
    { code: "D87", depart: "15:52", arrive: "16:44", duration: "52분" },
    { code: "D83", depart: "19:06", arrive: "19:59", duration: "53분" },
    { code: "C85", depart: "19:35", arrive: "20:28", duration: "53분" },
  ],
  "vangvieng-luangprabang": [
    { code: "D88", depart: "08:55", arrive: "09:46", duration: "51분" },
    { code: "C92", depart: "10:46", arrive: "11:58", duration: "1시간 12분" },
    { code: "D84", depart: "12:20", arrive: "13:11", duration: "51분" },
    { code: "C86", depart: "16:30", arrive: "17:26", duration: "56분" },
  ],
  "luangprabang-vangvieng": [
    { code: "C91", depart: "12:28", arrive: "13:34", duration: "1시간 6분" },
    { code: "D87", depart: "14:58", arrive: "15:49", duration: "51분" },
    { code: "D83", depart: "18:11", arrive: "19:02", duration: "51분" },
    { code: "C85", depart: "18:35", arrive: "19:31", duration: "56분" },
  ],
};
