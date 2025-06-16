"use client";

import { useState, useEffect, useRef } from "react";
import { SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { pollyClient } from "@/utils/polly";
import { SpeechRecognition } from "@/types/speech";
import { useRouter } from "next/navigation";
import RecordButton from "./RecordButton";
import ExitButton from "./ExitButton";
import Loading from "../components/Loading";

const ConsultPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [counselId, setCounselId] = useState<string | null>(null);
  const counselIdRef = useRef<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    counselIdRef.current = counselId;
  }, [counselId]);

  useEffect(() => {
    let recognition: SpeechRecognition | null = null;
    let audio: HTMLAudioElement | null = null;
    let mounted = true;
    (async () => {
      // 상담 시작
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/chat`, {
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!mounted) return;
        setCounselId(data.counsel_id);
      } catch {
        setIsSupported(false);
        return;
      }
      // 음성 인식 지원 확인
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
        return;
      }
      setIsSupported(true);
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "ko-KR";
      recognition.onresult = (event) => {
        let interim = "";
        let final = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const t = event.results[i][0].transcript;
          if (event.results[i].isFinal) final += t;
          else interim += t;
        }
        setCurrentTranscript(interim);
        if (final) {
          setMessages((prev) => [...prev, { text: final, isUser: true }]);
          setCurrentTranscript("");
          if (counselIdRef.current) fetchCounselMessage(final);
        }
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => {
        setIsRecording(false);
        setCurrentTranscript("");
      };
      recognitionRef.current = recognition;
      audio = new Audio();
      audioRef.current = audio;
    })();
    return () => {
      mounted = false;
      recognitionRef.current?.stop();
      audioRef.current?.pause();
    };
  }, []);

  // 상담사 답변이 새로 오면 자동 Polly 호출
  useEffect(() => {
    if (!audioRef.current) return;
    if (messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.isUser) return;
    (async () => {
      try {
        const command = new SynthesizeSpeechCommand({
          Engine: "neural",
          LanguageCode: "ko-KR",
          Text: lastMsg.text,
          OutputFormat: "mp3",
          VoiceId: "Seoyeon",
          TextType: "text",
        });
        const response = await pollyClient.send(command);
        if (response.AudioStream) {
          const blob = new Blob(
            [await response.AudioStream.transformToByteArray()],
            { type: "audio/mpeg" }
          );
          const url = URL.createObjectURL(blob);
          audioRef.current!.src = url;
          audioRef.current!.play();
          audioRef.current!.onended = () => {
            URL.revokeObjectURL(url);
          };
        }
      } catch {
        // 실패 시 무시하고 이동
      }
    })();
  }, [messages]);

  const handleStartRecording = () => {
    if (recognitionRef.current && isSupported) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(false);
      recognitionRef.current.stop();
    }
  };

  const fetchCounselMessage = async (query: string) => {
    if (!counselIdRef.current) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/generate/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            user_id: 1,
            counsel_id: counselIdRef.current,
          }),
        }
      );
      const data = await res.json();
      if (data.message) {
        setMessages((prev) => [...prev, { text: data.message, isUser: false }]);
      }
    } catch {
      // 실패 시 무시하고 이동
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 min-h-screen flex flex-col">
      <header className="text-center mb-8">
        <h1 className="text-4xl text-blue-600 mb-2">Listen You</h1>
        <p className="text-xl text-gray-600">당신의 이야기를 들려주세요</p>
      </header>

      {!isSupported && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-8 text-center">
          이 브라우저는 음성 인식을 지원하지 않습니다.{" "}
          <b>Chrome, Edge, Safari</b>를 사용해주세요.
        </div>
      )}

      {isSupported && !counselId && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-8 text-center">
          상담 준비 중입니다... 잠시만 기다려주세요.
        </div>
      )}

      <main className="flex-1 flex flex-col">
        {messages.length === 0 && !currentTranscript ? (
          <div className="text-center text-2xl text-gray-600 m-auto">
            안녕하세요! Listen You입니다.
            <br />
            <br />
            마이크 버튼을 눌러 이야기를 시작해보세요.
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto mb-8 bg-gray-50 rounded-2xl p-6">
            <div className="flex flex-col gap-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] p-4 rounded-2xl leading-relaxed ${
                    m.isUser
                      ? "self-end bg-blue-600 text-white rounded-br-sm"
                      : "self-start bg-white text-gray-800 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {currentTranscript && (
                <div className="max-w-[80%] p-4 rounded-2xl leading-relaxed self-end bg-blue-600 text-white rounded-br-sm opacity-70">
                  {currentTranscript}
                  <span className="inline-block ml-1 animate-[blink_1s_infinite]">
                    |
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4 p-4 items-center pb-16">
          <RecordButton
            isRecording={isRecording}
            isSupported={isSupported}
            counselId={counselId}
            handleStartRecording={handleStartRecording}
            handleStopRecording={handleStopRecording}
          />
          <ExitButton
            onExit={async () => {
              if (window.confirm("정말 상담을 종료하시겠습니까?")) {
                setLoading(true);
                // summary API 호출
                try {
                  const consult_history = messages.map((m) =>
                    m.isUser
                      ? { "Human Message": m.text }
                      : { "AI Message": m.text }
                  );
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/chat/summarize/`,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ consult_history }),
                    }
                  );
                  const data = await res.json();
                  if (data.summary) {
                    setLoading(false);
                    router.push(
                      `/report?summary=${encodeURIComponent(data.summary)}`
                    );
                    return;
                  }
                } catch {
                  // 실패 시 무시하고 이동
                }
                setLoading(false);
                router.push("/");
              }
            }}
          />
        </div>
      </main>
      {loading && <Loading />}
    </div>
  );
};

export default ConsultPage;
