import { useEffect, useRef } from "react";
export default function HoseProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - innerHeight;
      const value = Math.max(0, Math.min(1, total > 0 ? scrollY / total : 0));
      ref.current?.style.setProperty("--page-progress", value);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div className="hose-progress" ref={ref} aria-hidden="true">
      <div className="hose-track" />
      <div className="hose-filled" />
      <div className="hose-nozzle">
        <i />
        <b />
      </div>
    </div>
  );
}
