import { useState, useCallback } from 'react'
import useReveal from '../hooks/useReveal'
import styles from './Scheduler.module.css'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const SHORT = MONTHS.map(m => m.slice(0, 3))

const STORAGE_KEY = 'lz_posts_v3'

function loadPosts(viewDate) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (_) {}
  // Seed defaults
  const m = viewDate.getMonth()
  const y = viewDate.getFullYear()
  return [
    { day: 5,  month: m, year: y, text: 'Why most LinkedIn outreach fails — and how we fixed it', type: 'hook' },
    { day: 9,  month: m, year: y, text: '10 lessons from 500 cold connection requests',            type: 'carousel' },
    { day: 15, month: m, year: y, text: 'How I went from 0 to 80K monthly impressions',            type: 'story' },
    { day: 23, month: m, year: y, text: 'The perfect LinkedIn hook formula',                       type: 'hook' },
  ]
}

function typeColor(type) {
  return type === 'hook' ? 'var(--lime)' : type === 'carousel' ? 'var(--black)' : '#aaa'
}

function typeDotClass(type) {
  return type === 'hook' ? styles.dotLime : type === 'carousel' ? styles.dotDark : styles.dotGray
}

/* ── Calendar grid ── */
function CalGrid({ viewDate, posts, selectedDay, onSelectDay }) {
  const year     = viewDate.getFullYear()
  const month    = viewDate.getMonth()
  const today    = new Date()
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7
  const lastDay  = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= lastDay; d++) cells.push(d)

  return (
    <div className={styles.daysGrid} role="grid">
      {cells.map((d, i) => {
        if (!d) return <div key={`e${i}`} className={styles.emptyCell} aria-hidden="true" />
        const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear()
        const isSel   = selectedDay === d
        const dayPosts = posts.filter(p => p.day === d && p.month === month && p.year === year)
        return (
          <div
            key={d}
            className={`${styles.dayCell} ${isToday ? styles.today : ''} ${isSel ? styles.selected : ''}`}
            onClick={() => onSelectDay(d)}
            role="gridcell"
            tabIndex={0}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelectDay(d)}
            aria-label={`${MONTHS[month]} ${d}${isToday ? ', today' : ''}${dayPosts.length ? `, ${dayPosts.length} post${dayPosts.length > 1 ? 's' : ''}` : ''}`}
            aria-pressed={isSel}
          >
            <div className={styles.dayNum}>{d}</div>
            {dayPosts.slice(0, 3).map((p, j) => (
              <div key={j} className={`${styles.postDot} ${typeDotClass(p.type)}`} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default function Scheduler() {
  const ref = useReveal()
  const now  = new Date()

  const [viewDate,    setViewDate]    = useState(new Date(now.getFullYear(), now.getMonth(), 1))
  const [selectedDay, setSelectedDay] = useState(null)
  const [posts,       setPosts]       = useState(() => loadPosts(now))
  const [postText,    setPostText]    = useState('')
  const [postType,    setPostType]    = useState('hook')
  const [feedback,    setFeedback]    = useState('')

  const save = useCallback((updated) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)) } catch (_) {}
  }, [])

  const prevMonth = () => {
    setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))
    setSelectedDay(null)
  }

  const nextMonth = () => {
    setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))
    setSelectedDay(null)
  }

  const addPost = () => {
    const text = postText.trim()
    if (!text) { showFeedback('Please write your post content first.'); return }
    const day   = selectedDay || now.getDate()
    const month = viewDate.getMonth()
    const year  = viewDate.getFullYear()
    const updated = [...posts, { day, month, year, text, type: postType }]
    setPosts(updated)
    save(updated)
    setPostText('')
    showFeedback(`Scheduled for ${MONTHS[month]} ${day}! ✓`)
  }

  const deletePost = (idx) => {
    const updated = posts.filter((_, i) => i !== idx)
    setPosts(updated)
    save(updated)
    showFeedback('Post removed.')
  }

  const showFeedback = (msg) => {
    setFeedback(msg)
    setTimeout(() => setFeedback(''), 2400)
  }

  const monthPosts = posts
    .filter(p => p.month === viewDate.getMonth() && p.year === viewDate.getFullYear())
    .sort((a, b) => a.day - b.day)

  return (
    <section id="scheduler" className={styles.section} ref={ref}>
      <div className={`${styles.header} reveal`}>
        <div className="sec-label">
          <span className="sec-label-dot" /> Content Scheduler
        </div>
        <div className="big-h">PLAN YOUR</div>
        <div className="big-h outline">CONTENT.</div>
      </div>

      <div className={`${styles.main} reveal reveal-d1`}>
        {/* ── Calendar ── */}
        <div className={styles.calWrap}>
          <div className={styles.calTop}>
            <button className={styles.navBtn} onClick={prevMonth} aria-label="Previous month">‹</button>
            <div className={styles.monthTitle} aria-live="polite">
              {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </div>
            <button className={styles.navBtn} onClick={nextMonth} aria-label="Next month">›</button>
          </div>

          <div className={styles.daysHead} aria-hidden="true">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
              <div key={d} className={styles.dayHead}>{d}</div>
            ))}
          </div>

          <CalGrid
            viewDate={viewDate}
            posts={posts}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />
        </div>

        {/* ── Sidebar ── */}
        <div className={styles.sidebar}>
          {/* Create form */}
          <div className={styles.createBox}>
            <div className={styles.createTitle}>Schedule a Post</div>
            <textarea
              className={styles.input}
              rows={3}
              placeholder="Write your LinkedIn post here..."
              value={postText}
              onChange={e => setPostText(e.target.value)}
              onKeyDown={e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') addPost() }}
              aria-label="Post content"
            />
            <select
              className={styles.select}
              value={postType}
              onChange={e => setPostType(e.target.value)}
              aria-label="Post type"
            >
              <option value="hook">Hook Post</option>
              <option value="carousel">Carousel</option>
              <option value="story">Story</option>
            </select>
            <button className={styles.addBtn} onClick={addPost}>
              + Schedule Post
            </button>
            {feedback && (
              <div className={styles.feedback} role="status" aria-live="polite">
                {feedback}
              </div>
            )}
          </div>

          {/* Posts list */}
          <div className={styles.postsBox}>
            <div className={styles.postsTitle}>Scheduled Posts</div>
            {monthPosts.length === 0 ? (
              <p className={styles.empty}>
                No posts scheduled this month.<br />Select a day and add one!
              </p>
            ) : (
              <div className={styles.postsList}>
                {monthPosts.map((p) => {
                  const globalIdx = posts.indexOf(p)
                  return (
                    <div key={globalIdx} className={styles.postItem}>
                      <div
                        className={styles.postColor}
                        style={{ background: typeColor(p.type) }}
                      />
                      <div className={styles.postInfo}>
                        <div className={styles.postText} title={p.text}>{p.text}</div>
                        <div className={styles.postDate}>
                          {SHORT[p.month]} {p.day}, {p.year}
                        </div>
                      </div>
                      <span className={`${styles.postType} ${styles[p.type]}`}>
                        {p.type}
                      </span>
                      <button
                        className={styles.delBtn}
                        onClick={() => deletePost(globalIdx)}
                        aria-label={`Remove post: ${p.text}`}
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
