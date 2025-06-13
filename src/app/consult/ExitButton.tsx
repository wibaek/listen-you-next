import React from "react";

type ExitButtonProps = {
  onExit: () => void;
};

const ExitButton = ({ onExit }: ExitButtonProps) => (
  <button
    className="w-16 h-16 rounded-full border-none bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ml-2"
    aria-label="상담 종료"
    onClick={onExit}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="#dc3545"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  </button>
);

export default ExitButton;
