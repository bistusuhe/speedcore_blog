'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, Pause, SkipForward, ChevronDown, ChevronUp, Music } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface Track {
  title: string
  src: string
}

function getTracks(): Track[] {
  const raw = process.env.NEXT_PUBLIC_MUSIC_TRACKS ?? ''
  if (!raw) return []
  return raw
    .split(',')
    .filter(Boolean)
    .map((file) => ({
      title: file.replace(/\.mp3$/i, ''),
      src: `/music/${file}`,
    }))
}

export function MusicPlayer() {
  const t = useTranslations('music')
  const tracks = getTracks()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (tracks.length === 0) return
    if (playing) {
      audio.play().catch(() => setPlaying(false))
    } else {
      audio.pause()
    }
  }, [playing, current, tracks.length])

  // 没有配置音乐时不渲染
  if (tracks.length === 0) return null

  const next = () => {
    setCurrent((c) => (c + 1) % tracks.length)
    setPlaying(true)
  }

  const toggle = () => setPlaying((p) => !p)

  const track = tracks[current]!

  return (
    <>
      <audio
        ref={audioRef}
        src={track.src}
        onEnded={next}
        preload="none"
      />
      <AnimatePresence>
        {!hidden && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border border-border bg-card/90 px-3 py-2 shadow-xl backdrop-blur-xl"
          >
            <button
              onClick={toggle}
              aria-label={playing ? t('pause') : t('play')}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background transition hover:opacity-90"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-0.5" />}
            </button>
            <button
              onClick={next}
              aria-label={t('next')}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <SkipForward className="h-4 w-4" />
            </button>
            <div className="hidden max-w-[140px] items-center gap-1.5 sm:flex">
              <Music className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="truncate text-xs font-medium">{track.title}</span>
            </div>
            <button
              onClick={() => setHidden(true)}
              aria-label={t('hide')}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {hidden && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setHidden(false)}
          aria-label={t('show')}
          className={cn(
            'fixed bottom-4 left-1/2 z-30 inline-flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card/90 shadow-lg backdrop-blur-xl transition hover:bg-muted',
          )}
        >
          <ChevronUp className="h-4 w-4" />
        </motion.button>
      )}
    </>
  )
}
