"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const MyPage = () => {
  // 상담 주기 및 상담 결과 상태
  const [consultCount, setConsultCount] = useState<number | null>(null);
  const [period, setPeriod] = useState<{ start: string; end: string } | null>(
    null
  );
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cycleLoading, setCycleLoading] = useState(false);
  const [cycleError, setCycleError] = useState<string | null>(null);

  // 최근 1주일 상담 주기 불러오기
  useEffect(() => {
    const fetchWeeklyCount = async () => {
      setCycleLoading(true);
      setCycleError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/weeklycount/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: 1 }),
          }
        );
        const data = await res.json();
        setConsultCount(data.weekly_consult_count);
        setPeriod(data.period);
      } catch {
        setCycleError("상담 주기 정보를 불러오지 못했습니다.");
      }
      setCycleLoading(false);
    };
    fetchWeeklyCount();
  }, []);

  // 최근 상담 결과 불러오기
  useEffect(() => {
    const fetchLatestConsult = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/report/latest/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: 1 }),
          }
        );
        const data = await res.json();
        if (
          data.latest_consult &&
          data.latest_consult.report &&
          data.latest_consult.report.summary
        ) {
          setSummary(data.latest_consult.report.summary);
        } else {
          setSummary(null);
        }
      } catch {
        setError("최신 상담 내역을 불러오지 못했습니다.");
      }
      setLoading(false);
    };
    fetchLatestConsult();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8 min-h-screen flex flex-col">
      <header className="text-center mb-8">
        <h1 className="text-4xl text-blue-600 mb-2">Listen You</h1>
        <p className="text-xl text-gray-600">당신의 이야기를 들려주세요</p>
      </header>

      <main className="flex-1 flex flex-col gap-8">
        {/* 최근 1주일 상담 주기 카드 */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col items-center shadow-sm">
          <div className="text-lg text-blue-700 font-semibold mb-2">
            최근 1주일 상담 주기
          </div>
          {cycleLoading ? (
            <div className="text-gray-500">불러오는 중...</div>
          ) : cycleError ? (
            <div className="text-red-500">{cycleError}</div>
          ) : consultCount !== null && period ? (
            <>
              <div className="text-2xl font-bold text-blue-900 mb-2">
                {consultCount}회
              </div>
              <div className="text-gray-600 text-sm">
                {period.start} ~ {period.end}
              </div>
            </>
          ) : (
            <div className="text-gray-500">상담 주기 정보가 없습니다.</div>
          )}
        </div>

        {/* 최근 상담 결과 카드 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
          <div className="text-lg text-gray-700 font-semibold mb-4">
            가장 최근 상담 결과
          </div>
          {loading ? (
            <div className="text-gray-500">불러오는 중...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : summary ? (
            <div className="text-gray-800 text-base leading-relaxed">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          ) : (
            <div className="text-gray-500">상담 내역이 없습니다.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyPage;
