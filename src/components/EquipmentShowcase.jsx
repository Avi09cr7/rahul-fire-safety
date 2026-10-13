import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useState,
  useId,
  useRef,
  useEffect,
} from "react";
const Stage = lazy(() => import("./ExtinguisherStage"));

export function EquipmentIllustration({ type = 0, className = "" }) {
  const id = useId().replaceAll(":", "");
  return (
    <svg className={className} viewBox="0 0 480 480" aria-hidden="true">
      <defs>
        <linearGradient id={`red-${id}`}>
          <stop stopColor="#7e130f" />
          <stop offset=".32" stopColor="#ff4a36" />
          <stop offset=".65" stopColor="#db271d" />
          <stop offset="1" stopColor="#8d100a" />
        </linearGradient>
        <linearGradient id={`steel-${id}`}>
          <stop stopColor="#686b68" />
          <stop offset=".4" stopColor="#f5f3df" />
          <stop offset="1" stopColor="#666962" />
        </linearGradient>
      </defs>
      <ellipse cx="240" cy="418" rx="133" ry="21" fill="#d6c9b8" />
      {type === 0 ? (
        <g transform="rotate(-9 235 240)">
          <path
            d="M258 92C364 90 358 195 337 309"
            fill="none"
            stroke="#252827"
            strokeWidth="17"
            strokeLinecap="round"
          />
          <path
            d="M195 145Q190 120 215 113V93H252V113Q280 123 280 145V375Q280 402 253 402H219Q192 400 192 375Z"
            fill={`url(#red-${id})`}
          />
          <rect x="194" y="225" width="84" height="118" rx="3" fill="#fff8e9" />
          <rect x="198" y="231" width="76" height="27" fill="#d22c1f" />
          <path
            d="M222 278h30m-30 9h30m-30 9h30m-30 26h30"
            stroke="#333"
            strokeWidth="4"
          />
          <path d="M212 90V66L278 58L273 75L240 78V97" fill="#343735" />
          <path d="M212 84L270 87" stroke="#545751" strokeWidth="12" />
          <circle cx="253" cy="105" r="17" fill={`url(#steel-${id})`} />
          <circle cx="253" cy="105" r="11" fill="#f8f8e8" />
          <path d="M253 105l5-6" stroke="#1b603e" strokeWidth="3" />
          <path d="M335 304l-7 43" stroke="#191c1b" strokeWidth="24" />
          <circle
            cx="207"
            cy="83"
            r="12"
            fill="none"
            stroke="#b3a578"
            strokeWidth="4"
          />
        </g>
      ) : type === 1 ? (
        <g>
          <path
            d="M318 260C403 350 329 432 152 377L119 342"
            fill="none"
            stroke="#252827"
            strokeWidth="15"
            strokeLinecap="round"
          />
          <circle cx="238" cy="208" r="128" fill={`url(#red-${id})`} />
          {[109, 95, 81, 67, 53].map((r) => (
            <circle
              key={r}
              cx="238"
              cy="208"
              r={r}
              fill="none"
              stroke="#252827"
              strokeWidth="11"
            />
          ))}
          <path
            d="M238 99V208L336 264M238 208L140 265"
            stroke="#dc3024"
            strokeWidth="15"
          />
          <circle cx="238" cy="208" r="39" fill={`url(#red-${id})`} />
          <circle cx="238" cy="208" r="15" fill={`url(#steel-${id})`} />
          <path d="M113 331l-21-32" stroke="#c2ae6f" strokeWidth="20" />
          <path d="M90 292l-8-17" stroke="#242623" strokeWidth="14" />
        </g>
      ) : (
        <g>
          <rect
            x="202"
            y="140"
            width="82"
            height="243"
            rx="24"
            fill={`url(#red-${id})`}
          />
          <path
            d="M195 143Q194 88 241 85Q292 88 290 143Z"
            fill={`url(#red-${id})`}
          />
          <rect x="182" y="376" width="122" height="24" rx="7" fill="#a62015" />
          <rect
            x="144"
            y="179"
            width="200"
            height="47"
            rx="10"
            fill={`url(#red-${id})`}
          />
          <rect
            x="128"
            y="172"
            width="24"
            height="62"
            rx="5"
            fill={`url(#steel-${id})`}
          />
          <rect
            x="334"
            y="172"
            width="24"
            height="62"
            rx="5"
            fill={`url(#steel-${id})`}
          />
          <circle cx="243" cy="243" r="42" fill={`url(#steel-${id})`} />
          <circle cx="243" cy="243" r="30" fill="#cc2c1e" />
          <path d="M239 87V67" stroke="#5e6259" strokeWidth="14" />
          <ellipse
            cx="240"
            cy="60"
            rx="38"
            ry="9"
            fill="none"
            stroke="#252827"
            strokeWidth="9"
          />
        </g>
      )}
    </svg>
  );
}
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
const names = ["Extinguishers", "Hose reels", "Hydrants"];
export default function EquipmentShowcase() {
  const [selected, setSelected] = useState(0),
    [rotation, setRotation] = useState({ x: 0, y: 0 }),
    [dragging, setDragging] = useState(false),
    [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []),
    onFailure = useCallback(() => {
      setFailed(true);
      setReady(false);
    }, []);
  const gesture = useRef(null);
  const resetRotation = useCallback(() => {
    gesture.current = null;
    setDragging(false);
    setRotation({ x: 0, y: 0 });
  }, []);
  useEffect(() => {
    window.addEventListener("blur", resetRotation);
    return () => window.removeEventListener("blur", resetRotation);
  }, [resetRotation]);
  const startDrag = (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    event.preventDefault();
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    gesture.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      width: bounds.width,
      height: bounds.height,
    };
    target.setPointerCapture(event.pointerId);
    setDragging(true);
  };
  const drag = (event) => {
    const start = gesture.current;
    if (!start || start.pointerId !== event.pointerId) return;
    setRotation({
      x: Math.max(
        -0.55,
        Math.min(0.55, ((event.clientY - start.y) / start.height) * 1.6),
      ),
      y: ((event.clientX - start.x) / start.width) * Math.PI * 2,
    });
  };
  const endDrag = (event) => {
    if (gesture.current?.pointerId !== event.pointerId) return;
    resetRotation();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };
  const rotateWithKeyboard = (event) => {
    const directions = {
      ArrowLeft: [0, -0.35],
      ArrowRight: [0, 0.35],
      ArrowUp: [-0.2, 0],
      ArrowDown: [0.2, 0],
    };
    if (event.key === "Escape") return resetRotation();
    const delta = directions[event.key];
    if (!delta) return;
    event.preventDefault();
    setDragging(true);
    setRotation((previous) => ({
      x: Math.max(-0.55, Math.min(0.55, previous.x + delta[0])),
      y: previous.y + delta[1],
    }));
  };
  return (
    <div
      className="equipment-showcase"
      aria-label="Explore fire safety equipment"
    >
      <div className="equipment-backdrop" aria-hidden="true">
        <span>READY.</span>
      </div>
      <div
        className="equipment-stage"
        role="group"
        aria-label={`${names[selected]} equipment illustration`}
      >
        {(!ready || failed) && (
          <EquipmentIllustration
            type={selected}
            className="equipment-fallback"
          />
        )}
        {!failed && (
          <SceneBoundary onFailure={onFailure}>
            <Suspense fallback={null}>
              <Stage
                selected={selected}
                rotation={rotation}
                dragging={dragging}
                onReady={onReady}
                onFailure={onFailure}
              />
            </Suspense>
          </SceneBoundary>
        )}
        {ready && !failed && (
          <div
            className={`equipment-drag-surface${dragging ? " is-dragging" : ""}`}
            role="img"
            aria-label={`${names[selected]}: drag to rotate; release to reset. Keyboard: hold an arrow key to rotate.`}
            tabIndex={0}
            onPointerDown={startDrag}
            onPointerMove={drag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onLostPointerCapture={resetRotation}
            onBlur={resetRotation}
            onContextMenu={(event) => event.preventDefault()}
            onKeyDown={rotateWithKeyboard}
            onKeyUp={(event) => {
              if (event.key.startsWith("Arrow")) resetRotation();
            }}
          />
        )}
      </div>
      <div className="equipment-controls">
        <div
          className="equipment-selector"
          role="group"
          aria-label="Choose equipment"
        >
          {names.map((name, i) => (
            <button
              type="button"
              key={name}
              aria-pressed={selected === i}
              onClick={() => {
                setSelected(i);
                resetRotation();
              }}
            >
              <span>0{i + 1}</span>
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
