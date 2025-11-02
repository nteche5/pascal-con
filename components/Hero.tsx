import Link from 'next/link'
import styles from './Hero.module.css'

type HeroProps = {
  title: string
  subtitle: string
  primaryCta: { href: string; label: string }
  secondaryCta?: { href: string; label: string }
  backgroundVideoSrc?: string
  backgroundPosterSrc?: string
}

export default function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  backgroundVideoSrc,
  backgroundPosterSrc,
}: HeroProps) {
  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.heroBg} aria-hidden="true">
        {backgroundVideoSrc ? (
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            poster={backgroundPosterSrc}
          >
            <source src={backgroundVideoSrc} type="video/mp4" />
          </video>
        ) : null}
        <div className={styles.heroOverlay} />
      </div>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.actions}>
            <Link href={primaryCta.href} className="btn">
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <Link href={secondaryCta.href} className={styles.btnSecondary}>
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}


