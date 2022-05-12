import markdownStyles from './markdown-styles.module.css'
import { PortableText } from '@portabletext/react'

export default function Body({ content }) {
  return (
    <PortableText value={content} />
  )
}
