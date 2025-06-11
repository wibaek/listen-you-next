"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 확인 검증
    if (formData.password !== formData.passwordConfirm) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirm: "비밀번호가 일치하지 않습니다.",
      }));
      return;
    }

    // TODO: 회원가입 로직 구현
    console.log("회원가입 시도:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 비밀번호 확인 필드 변경 시 에러 메시지 초기화
    if (name === "passwordConfirm" || name === "password") {
      setErrors((prev) => ({
        ...prev,
        passwordConfirm: "",
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        {/* 로고 영역 */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-40 h-40 relative">
            <Image
              src="/logo.png"
              alt="Listen You Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">회원가입</h2>
            <p className="mt-2 text-sm text-gray-600">
              Listen You의 회원이 되어보세요
            </p>
          </div>
        </div>

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                아이디
              </label>
              <input
                id="id"
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="아이디를 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                required
              />
            </div>
            <div>
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                비밀번호 확인
              </label>
              <input
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력하세요"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all ${
                  errors.passwordConfirm ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.passwordConfirm && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.passwordConfirm}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                닉네임
              </label>
              <input
                id="nickname"
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="닉네임을 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all text-sm font-semibold shadow-sm"
          >
            회원가입
          </button>
        </form>

        {/* 로그인 링크 */}
        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              로그인하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
