"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ReportPage = () => {
  const [report, setReport] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        // 실제 API 엔드포인트로 교체 필요
        setReport(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        );
        return;
        const res = await fetch("/api/report/today");
        if (!res.ok) throw new Error("리포트 불러오기 실패");
        const data = await res.json();
        setReport(data.report || "");
      } catch (e: unknown) {
        if (typeof e === "object" && e !== null && "message" in e) {
          setError(
            (e as { message: string }).message || "오류가 발생했습니다."
          );
        } else {
          setError("오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative px-4 py-8">
      <div className="w-full flex justify-center items-center">
        <div className="relative w-full flex justify-center items-center">
          <div className="w-full max-w-md md:max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-12 flex flex-col items-center justify-center min-h-[60vh]">
            {/* 헤더: 뒤로가기 버튼 + 제목 */}
            <div className="w-full relative mb-8 pt-2 pb-2">
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-blue-400 shadow hover:bg-blue-50 active:bg-blue-100 text-blue-600"
                aria-label="뒤로가기"
                onClick={() => router.push("/lobby")}
                style={{ minWidth: 36, minHeight: 36 }}
              >
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M15.25 19.25L8.75 12.75L15.25 6.25"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <h2 className="w-full text-2xl md:text-3xl font-extrabold text-blue-600 text-center">
                오늘의 상담 리포트
              </h2>
            </div>
            <div className="w-full flex-1 flex items-center justify-center">
              {loading ? (
                <span className="text-lg md:text-xl text-gray-400 animate-pulse">
                  리포트 불러오는 중...
                </span>
              ) : error ? (
                <span className="text-red-500 text-base md:text-lg text-center">
                  {error}
                </span>
              ) : (
                <span className="text-base md:text-lg font-normal text-gray-800 whitespace-pre-line text-left leading-relaxed">
                  {report}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
