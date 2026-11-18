import { Link } from "react-router-dom"
import { getSafeUrl } from "../../utils/contentHelpers"

// Renders internal paths with the router and external http(s) links in a new tab.
// Anything else (javascript:, data:, etc.) renders nothing.
const SafeLink = ({ href, className, children }) => {
  const url = getSafeUrl(href)
  if (!url) return null

  if (url.startsWith("/")) {
    return <Link to={url} className={className}>{children}</Link>
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}

export default SafeLink
