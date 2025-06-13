import React from "react";

type RecordButtonProps = {
  isRecording: boolean;
  isSupported: boolean;
  counselId: string | null;
  handleStartRecording: () => void;
  handleStopRecording: () => void;
};

const RecordButton = ({
  isRecording,
  isSupported,
  counselId,
  handleStartRecording,
  handleStopRecording,
}: RecordButtonProps) => (
  <button
    className={`w-16 h-16 rounded-full border-none bg-white shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none ${
      isRecording ? "bg-red-50 animate-[pulse_2s_infinite]" : ""
    }`}
    onClick={isRecording ? handleStopRecording : handleStartRecording}
    aria-label={isRecording ? "녹음 중지" : "녹음 시작"}
    disabled={!isSupported || !counselId}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"
        fill={isRecording ? "#dc3545" : isSupported ? "#0066ff" : "#999"}
      />
      <path
        d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
        fill={isRecording ? "#dc3545" : isSupported ? "#0066ff" : "#999"}
      />
    </svg>
  </button>
);

export default RecordButton;
