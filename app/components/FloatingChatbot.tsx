'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './FloatingChatbot.module.css'

export default function FloatingChatbot() {
  const [isGlowing, setIsGlowing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing(prev => !prev)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.floatingContainer}>
      <div className={`${styles.chatbotIcon} ${isGlowing ? styles.glow : ''}`}>
        <div className={styles.rippleEffect}></div>
        <div className={styles.rippleEffect2}></div>
        <Image
          src="/images/ai.png"
          alt="AI Chatbot"
          width={60}
          height={60}
          className={styles.botImage}
        />
        <div className={styles.glowingRing}></div>
      </div>
    </div>
  )
} 