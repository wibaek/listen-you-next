"use client";
import { Suspense } from "react";
import ReportContent from "./ReportContent";

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-400">
          로딩중...
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}
