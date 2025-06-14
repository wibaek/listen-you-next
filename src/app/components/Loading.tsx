export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm pb-16">
      <div className="w-12 h-12 mb-3 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-blue-600 text-lg font-semibold">로딩 중...</span>
    </div>
  );
}
