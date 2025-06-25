import Navigation from "@/app/ui/navigation";

const CLIPS = {
  요추: [
    {
      title: "요추 디스크 - 맥켄지 신전 운동 1",
      src: "/clips/lumbar_mckenzie1.MP4",
    },
    {
      title: "요추 디스크 - 맥켄지 신전 운동 2",
      src: "/clips/lumbar_mckenzie2.MP4",
    },
    {
      title: "요추 디스크 - 맥켄지 신전 운동 3",
      src: "/clips/lumbar_mckenzie3.MP4",
    },
    {
      title: "요추 디스크 - 맥켄지 신전 운동 4",
      src: "/clips/lumbar_mckenzie4.MP4",
    },
    {
      title: "척추관협착증 - 앵그리캣 운동",
      src: "/clips/lumbar_stenosis_angry_cat.MP4",
    },
  ],
  무릎: [
    {
      title: "무릎 - SLR 운동",
      src: "/clips/knee_slr.MP4",
    },
  ],
  어깨: [
    {
      title: "어깨 - 펜듈럼 운동",
      src: "/clips/shoulder_pendulum.MP4",
    },
  ],
};

export default function ExercisePage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center py-12 px-4">
      {/* Background with overlay */}
      <div 
        className="fixed inset-0 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('/backgrounds/exercise_bg.jpg')" }}
      />
      <div className="fixed inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <Navigation />

        <h1 className="text-3xl font-bold text-white mb-8 drop-shadow-lg text-center">
          다나을 운동 동영상 가이드
        </h1>
        <div className="flex gap-4 justify-center mb-8">
          <a href="#lumbar" className="px-4 py-2 rounded bg-white/20 text-white hover:bg-white/30 transition-all duration-300 hover:scale-105">요추</a>
          <a href="#knee" className="px-4 py-2 rounded bg-white/20 text-white hover:bg-white/30 transition-all duration-300 hover:scale-105">무릎</a>
          <a href="#shoulder" className="px-4 py-2 rounded bg-white/20 text-white hover:bg-white/30 transition-all duration-300 hover:scale-105">어깨</a>
        </div>

        {Object.entries(CLIPS).map(([section, clips]) => (
          <section
            key={section}
            id={
              section === "요추"
                ? "lumbar"
                : section === "무릎"
                ? "knee"
                : section === "어깨"
                ? "shoulder"
                : undefined
            }
            className="w-full max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 border-l-4 border-blue-400 pl-4">
              {section}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {clips.map((clip, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 rounded-xl shadow-lg overflow-hidden flex flex-col items-center"
                >
                  <div className="w-full aspect-video bg-black">
                    <video
                      src={clip.src}
                      controls
                      className="w-full h-full border-0 rounded-t-xl"
                    />
                  </div>
                  <div className="p-4 text-white text-center text-base font-semibold">
                    {clip.title}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
