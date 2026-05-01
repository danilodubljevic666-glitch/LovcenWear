import { useEffect, useRef, useState, useCallback } from 'react'

export default function Preloader({ onDone, imagesReady = false }) {
  const [minTimePassed, setMinTimePassed] = useState(false)
  const [stage, setStage] = useState('visible')
  const doneCalledRef = useRef(false)

  const triggerDone = useCallback(() => {
    if (doneCalledRef.current) return
    doneCalledRef.current = true
    setStage('fading')
    setTimeout(() => onDone(), 600)
  }, [onDone])

  useEffect(() => {
    const minTimer = setTimeout(() => setMinTimePassed(true), 1800)
    const safetyTimer = setTimeout(() => triggerDone(), 7000)
    return () => { clearTimeout(minTimer); clearTimeout(safetyTimer) }
  }, [triggerDone])

  useEffect(() => {
    if (minTimePassed && imagesReady) triggerDone()
  }, [minTimePassed, imagesReady, triggerDone])

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
            animation: 'loadbar 4s ease-out forwards',
          }}
        />
      </div>

      <style>{`
        @keyframes loadbar {
          0%   { width: 0% }
          100% { width: 88% }
        }
      `}</style>
    </div>
  )
}
