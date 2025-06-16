"use client";

import Link from "next/link";
import CalendarWithConsult from "./CalendarWithConsult";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [consultDates, setConsultDates] = useState<number[]>([]);
  const [consultMap, setConsultMap] = useState<
    Record<number, { counsel_id: string; created_at: string }>
  >({});
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [reportLoading, setReportLoading] = useState(false);

  // 상담 내역 불러오기
  useEffect(() => {
    const fetchConsultDates = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/date/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: 1 }),
          }
        );
        const data = await res.json();
        if (data.consult_details) {
          const map: Record<
            number,
            { counsel_id: string; created_at: string }
          > = {};
          const dates: number[] = [];
          data.consult_details.forEach(
            (item: { counsel_id: string; created_at: string }) => {
              const date = new Date(item.created_at);
              const day = date.getDate();
              map[day] = {
                counsel_id: item.counsel_id,
                created_at: item.created_at,
              };
              dates.push(day);
            }
          );
          setConsultMap(map);
          setConsultDates(dates);
        }
      } catch {
        // 에러 무시 (에러 메시지 필요시 추가)
      }
    };
    fetchConsultDates();
  }, []);

  // 날짜 클릭 시 상담 리포트 불러오기
  const handleDateClick = async (day: number) => {
    if (!consultMap[day]) return;
    setReportLoading(true);
    setSelectedDate(day);
    setSelectedReport(null);
    setSelectedStatus(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/consultreport/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ counsel_id: consultMap[day].counsel_id }),
        }
      );
      const data = await res.json();
      setSelectedReport(data.report?.summary || null);
      setSelectedStatus(data.report?.status || null);
    } catch {
      setSelectedReport("상담 리포트를 불러오지 못했습니다.");
    }
    setReportLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        {/* AI Report 카드 */}
        <div className="w-full h-44 flex items-center justify-center border-2 border-gray-200 rounded-2xl font-semibold text-2xl mb-2 bg-white shadow">
          <span className="text-gray-800">AI report</span>
        </div>
        {/* CalendarWithConsult 컴포넌트 */}
        <CalendarWithConsult
          consultDates={consultDates}
          onDateClick={handleDateClick}
          selectedDate={selectedDate}
        />
        {/* 상담 리포트 */}
        {selectedDate && (
          <div className="w-full bg-white rounded-2xl shadow p-4 mb-6 flex flex-col items-center">
            <div className="text-lg font-bold mb-2">
              {selectedDate}일 상담 내역
            </div>
            {reportLoading ? (
              <div className="text-gray-500">불러오는 중...</div>
            ) : selectedReport ? (
              <div className="text-gray-800 text-sm w-full">
                <ReactMarkdown>{selectedReport}</ReactMarkdown>
              </div>
            ) : (
              <div className="text-gray-400">상담 내역이 없습니다.</div>
            )}
            {selectedStatus && (
              <div className="text-xs text-gray-500 mt-2">
                상태: {selectedStatus}
              </div>
            )}
          </div>
        )}
        {/* 오늘의 상담 시작 버튼 */}
        <Link href="/consult" className="block w-full">
          <button className="w-full py-5 px-4 border-2 border-blue-500 rounded-2xl text-blue-600 font-bold text-xl bg-white hover:bg-blue-50 hover:text-blue-700 transition-all shadow-lg mt-2 mb-1">
            Start Today&apos;s Consult
          </button>
        </Link>
      </div>
    </div>
  );
}
