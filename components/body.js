import { PortableText } from '@portabletext/react'

const myPortableTextComponents = {
  // types: {
  //   image: ({value}) => <img src={value.imageUrl} />,
  //   callToAction: ({value, isInline}) =>
  //     isInline ? (
  //       <a href={value.url}>{value.text}</a>
  //     ) : (
  //       <div className="callToAction">{value.text}</div>
  //     ),
  // },

  marks: {
    link: ({children, value}) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined

      var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);
      let isURL = value.href.match(regex) !== null ? true : false

      return (
        <a target={isURL ? "_blank" : undefined} href={value.href} rel={rel}>
          {children}
        </a>
      )
    },
  },
}


export default function Body({ content }) {
  return (
    <PortableText value={content} components={myPortableTextComponents} />
  )
}
