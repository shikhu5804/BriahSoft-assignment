import { useState, useEffect } from "react";

type ContributionDay = {
  date: string;
  count: number;
};

export default function ContributionGraph({ username }: { username: string }) {
  const [weeks, setWeeks] = useState<(ContributionDay | null)[][]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const colorScheme = [
    "#0d1117", 
    "#033A16",
    "#196C2E",
    "#2EA043",
    "#56D364",
  ];

  const getColorForCount = (count: number) => {
    if (count === 0) return colorScheme[0];
    if (count < 2) return colorScheme[1];
    if (count < 7) return colorScheme[2];
    if (count < 20) return colorScheme[3];
    return colorScheme[4];
  };

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        const raw: ContributionDay[] = json.contributions;
        const totalCount: number = json.total?.lastYear || 0;

        let currentWeek: (ContributionDay | null)[] = Array(7).fill(null);
        const weeksData: (ContributionDay | null)[][] = [];

        raw.forEach((day) => {
          const date = new Date(day.date);
          const dow = date.getDay();
          currentWeek[dow] = { ...day };
          if (dow === 6) {
            weeksData.push(currentWeek);
            currentWeek = Array(7).fill(null);
          }
        });

        if (currentWeek.some((d) => d)) {
          weeksData.push(currentWeek);
        }

        setWeeks(weeksData);
        setTotal(totalCount);
        setLoading(false);
      } catch (err) {
        setError("Error loading contribution data");
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  const getMonthLabel = (week: (ContributionDay | null)[]) => {
    const firstValid = week.find((d) => d !== null);
    if (!firstValid) return "";
    return new Date(firstValid.date).toLocaleDateString("en-US", {
      month: "short",
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!weeks.length) return <div>No data found</div>;

  return (
    < >
    <h1 className="font-bold mt-10">Contribution Chart</h1>
    <div className="flex justify-center">
    <div className="w-full md:w-[70%] mt-6 px-4 py-6 bg-[#0d1117] rounded-lg border border-[#30363d]">
      <div className="text-sm font-semibold text-center text-gray-300 mb-4">
        {total} contributions in the last year
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-[700px]">
          {/* Month Labels */}
          <div className="flex ml-[30px] text-[11px] text-gray-500 mb-1">
            {weeks.map((week, idx) =>
              idx % 4 === 0 ? (
                <div
                  key={idx}
                  className="w-[11px] sm:w-[13px] text-left mr-[2px]"
                >
                  {getMonthLabel(week)}
                </div>
              ) : (
                <div key={idx} className="w-[11px] sm:w-[13px] mr-[2px]" />
              )
            )}
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-[auto_1fr] gap-x-1">
            {/* Days Labels */}
            <div className="grid grid-rows-7 text-[10px] text-gray-500 mt-[2px] gap-[2px]">
              {Array.from({ length: 7 }).map((_, i) => {
                const label = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i];
                return (
                  <span key={i} className={i % 2 === 1 ? "block" : "invisible"}>
                    {label}
                  </span>
                );
              })}
            </div>

            {/* Contribution Grid */}
            <div className="flex gap-[2px]">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="grid grid-rows-7 gap-[2px]">
                  {week.map((day, dayIdx) => (
                    <div
                      key={dayIdx}
                      className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] rounded-sm border border-[#161b22]"
                      style={{
                        backgroundColor: day
                          ? getColorForCount(day.count)
                          : colorScheme[0],
                      }}
                      title={
                        day
                          ? `${day.count} contributions on ${day.date}`
                          : "No contributions"
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4 text-xs text-gray-500 items-center gap-1">
            <span>Less</span>
            <div className="flex gap-[2px]">
              {colorScheme.slice(1).map((color, i) => (
                <div
                  key={i}
                  className="w-[11px] h-[11px] rounded-sm border border-[#161b22]"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
