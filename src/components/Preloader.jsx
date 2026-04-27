import { useEffect, useState } from 'react'

export default function Preloader({ onDone }) {
  const [stage, setStage] = useState('visible') // visible | fading

  useEffect(() => {
    const fadeTimer = setTimeout(() => setStage('fading'), 1800)
    const doneTimer = setTimeout(() => onDone(), 2400)
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer) }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-600 ease-in-out"
      style={{ opacity: stage === 'fading' ? 0 : 1, pointerEvents: 'none' }}
    >
      {/* Logo */}
      <img
        src="/logo.PNG"
        alt="LovcenWear"
        className="h-24 sm:h-32 w-auto object-contain animate-pulse"
      />

      {/* Loading bar */}
      <div className="mt-10 w-32 h-px bg-white/10 overflow-hidden rounded-full">
        <div
          className="h-full bg-yellow-500 rounded-full"
          style={{
            animation: 'loadbar 1.6s ease-in-out forwards',
          }}
        />
      </div>

      <style>{`
        @keyframes loadbar {
          0%   { width: 0% }
          60%  { width: 80% }
          100% { width: 100% }
        }
      `}</style>
    </div>
  )
}
