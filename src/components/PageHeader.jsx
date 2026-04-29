export default function PageHeader({ tag, title, subtitle, action }) {
  return (
    <div className="pageHeaderBox">
      <div>
        {tag && <div className="pageHeaderTag">{tag}</div>}
        <h1 className="pageHeaderTitle">{title}</h1>
        {subtitle && <p className="pageHeaderSub">{subtitle}</p>}
      </div>

      {action && <div className="pageHeaderAction">{action}</div>}
    </div>
  )
}