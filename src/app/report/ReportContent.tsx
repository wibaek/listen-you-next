"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

const ReportContent = () => {
  const [report, setReport] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const summary = searchParams.get("summary");
    if (summary) {
      setReport(summary);
      setLoading(false);
      return;
    }
  }, [searchParams]);

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
                onClick={() => router.push("/")}
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
                <span className="text-base md:text-lg font-normal text-gray-800 text-left leading-relaxed w-full">
                  <ReactMarkdown>{report}</ReactMarkdown>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportContent;
