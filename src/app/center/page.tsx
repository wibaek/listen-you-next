"use client";

import { useEffect, useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

const DEFAULT_CENTER = { lat: 37.5665, lng: 126.978 };

interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
}

export default function CenterPage() {
  // 카카오맵 로더 훅 사용
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY!,
    libraries: ["services"],
  });

  const [searchKeyword, setSearchKeyword] = useState("정신과");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 병원 검색
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
          searchKeyword
        )}&x=${DEFAULT_CENTER.lng}&y=${DEFAULT_CENTER.lat}&radius=20000`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
          },
        }
      );
      const data = await res.json();
      setHospitals(
        data.documents.map((place: any) => ({
          id: place.id,
          name: place.place_name,
          address: place.address_name,
          phone: place.phone || "전화번호 없음",
          lat: Number(place.y),
          lng: Number(place.x),
        }))
      );
    } catch {
      setHospitals([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, []);

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
      {/* 검색창 */}
      <div className="mb-8 flex gap-4">
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          검색
        </button>
      </div>
      {/* 카카오맵 */}
      <div className="mb-8">
        <Map
          center={DEFAULT_CENTER}
          style={{ width: "100%", height: "400px" }}
          level={7}
        >
          {hospitals.map((hospital) => (
            <MapMarker
              key={hospital.id}
              position={{ lat: hospital.lat, lng: hospital.lng }}
              title={hospital.name}
            />
          ))}
        </Map>
      </div>
      {/* 병원 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              병원 정보를 불러오는 중입니다...
            </p>
          </div>
        ) : hospitals.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-600">
            검색 결과가 없습니다.
          </div>
        ) : (
          hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{hospital.name}</h2>
              <p className="text-gray-600 mb-2">{hospital.address}</p>
              <p className="text-blue-600">{hospital.phone}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
