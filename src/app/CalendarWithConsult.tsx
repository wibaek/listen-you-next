type CalendarWithConsultProps = {
  consultDates: number[];
  onDateClick?: (day: number) => void;
  selectedDate?: number | null;
};

export default function CalendarWithConsult({
  consultDates,
  onDateClick,
  selectedDate,
}: CalendarWithConsultProps) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayDate = today.getDate();
  const todayConsulted = consultDates.includes(todayDate);

  return (
    <div className="w-full bg-white rounded-2xl shadow p-4 mb-6 flex flex-col items-center">
      <div className="text-lg font-bold mb-3">상담 캘린더</div>
      <div className="grid grid-cols-7 gap-2 w-full text-sm mb-2">
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const isConsulted = consultDates.includes(day);
          const isToday = day === todayDate;
          const isSelected = day === selectedDate;
          return (
            <div
              key={day}
              className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all
                ${
                  isSelected
                    ? "bg-green-400 border-green-600 text-white font-bold scale-110 shadow-lg"
                    : isConsulted
                    ? "bg-blue-500 border-blue-500 text-white font-bold"
                    : "bg-gray-100 border-gray-200 text-gray-400"
                }
                ${
                  isToday && !isSelected
                    ? "ring-2 ring-blue-400 border-blue-400 text-blue-700 bg-white font-bold"
                    : ""
                }
                hover:scale-105 hover:shadow-md cursor-pointer select-none
              `}
              title={isConsulted ? "상담 완료" : undefined}
              onClick={() => onDateClick && onDateClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
      {!todayConsulted && (
        <div className="mt-1 text-xs text-red-500 font-normal">
          오늘 상담을 아직 진행하지 않았어요!
        </div>
      )}
    </div>
  );
}
