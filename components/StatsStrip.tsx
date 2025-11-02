import styles from './StatsStrip.module.css'

type Stat = { label: string; value: string; sublabel?: string }

export default function StatsStrip({ stats }: { stats: Stat[] }) {
  return (
    <section className={styles.strip} aria-label="Key stats">
      <div className="container">
        <ul className={styles.grid}>
          {stats.map((stat, idx) => (
            <li key={idx} className={styles.item}>
              <span className={styles.value}>{stat.value}</span>
              {stat.sublabel ? (
                <span className={styles.sublabel}>{stat.sublabel}</span>
              ) : null}
              <span className={styles.label}>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}


