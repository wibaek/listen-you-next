import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        {/* AI Report 카드 */}
        <div className="w-full h-40 flex items-center justify-center border-2 border-gray-200 rounded-xl font-semibold text-xl mb-4">
          AI report
        </div>
        {/* Calendar 카드 */}
        <div className="w-full h-40 flex items-center justify-center border-2 border-gray-200 rounded-xl font-semibold text-xl mb-4">
          Calendar
        </div>
        {/* 오늘의 상담 시작 버튼 */}
        <Link href="/consult" className="block w-full">
          <button className="w-full py-4 px-4 border-2 border-blue-500 rounded-xl text-blue-700 font-bold text-lg bg-white hover:bg-blue-50 transition-all shadow-sm">
            Start Today&apos;s Consult
          </button>
        </Link>
      </div>
    </div>
  );
}
