import Link from 'next/link'
import JsonLd from './JsonLd'
import { breadcrumbSchema } from '../lib/schema'
import './Breadcrumbs.css'

export default function Breadcrumbs({ items }) {
  const allItems = [{ name: 'Home', path: '/' }, ...items]

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <JsonLd data={breadcrumbSchema(allItems)} />
      <ol className="breadcrumbs-list">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1
          return (
            <li key={item.path} className="breadcrumbs-item">
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.path}>{item.name}</Link>
              )}
              {!isLast && <span className="breadcrumbs-separator">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
