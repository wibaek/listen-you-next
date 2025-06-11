"use client ";

import Link from "next/link";
import CalendarWithConsult from "./CalendarWithConsult";

export default function Home() {
  // 예시: 5, 10, 15일에 상담함
  const consultDates = [5, 10, 15];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        {/* AI Report 카드 */}
        <div className="w-full h-44 flex items-center justify-center border-2 border-gray-200 rounded-2xl font-semibold text-2xl mb-2 bg-white shadow">
          <span className="text-gray-800">AI report</span>
        </div>
        {/* CalendarWithConsult 컴포넌트 */}
        <CalendarWithConsult consultDates={consultDates} />
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
