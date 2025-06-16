"use client";

import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };

export default function CenterPage() {
  // 카카오맵 로더 훅 사용
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY!,
    libraries: ["services"],
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="ml-4 text-gray-600">지도를 불러오는 중입니다...</p>
      </div>
    );
  }
  if (error) {
    console.log(error);
    return (
      <div className="text-center text-red-600">
        지도를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">정신건강 전문기관 찾기</h1>
      {/* 카카오맵 */}
      <div className="mb-8">
        <Map
          center={DEFAULT_CENTER}
          style={{ width: "100%", height: "400px" }}
          level={7}
        />
      </div>
    </div>
  );
}
