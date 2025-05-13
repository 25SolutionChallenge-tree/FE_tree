import {
  DiaryListResponse,
  DiaryResponse,
  DiaryResponseList,
  PostDiaryRequest,
  QType,MonthlyReport,
} from "./diary.type";
import instance from "./instance";

export const postDiary = async (
  data: PostDiaryRequest
): Promise<DiaryResponse> => {
  try {
    const response = await instance.post<DiaryResponse>("/api/diary", data);
    return response.data;
  } catch (error) {
    console.error("일기 전송 실패", error);
    throw error;
  }
};

export const getDiaryList = async (
  qtype: QType
): Promise<DiaryResponseList> => {
  try {
    const response = await instance.get<DiaryResponseList>(
      `/api/diary/qtype/${qtype}`
    );
    return response.data;
  } catch (error) {
    console.error("일기 조회 실패", error);
    throw error;
  }
};

export const getPeriodDiary = async (
  start: string,
  end: string
): Promise<DiaryListResponse> => {
  try {
    const response = await instance.get<DiaryListResponse>(
      "/api/diary/period",
      {
        params: { start: start, end: end },
      }
    );
    return response.data;
  } catch (error) {
    console.error("기간별 일기 조회 실패", error);
    throw error;
  }
};

//월간 레포트
export const getMonthlyReport = async (year: number, month: number): Promise<MonthlyReport> => {
  const res = await instance.get("/api/report/monthly", {
    params: { year, month },
  });
  return res.data;
};

export const createMonthlyReport = async (
  year: number,
  month: number
): Promise<MonthlyReport> => {
  const yearMonth = `${year}-${month.toString().padStart(2, "0")}`; // 예: "2025-05"
  const response = await instance.post("/api/report/monthly", null, {
    params: { yearMonth },
  });
  return response.data;
};
