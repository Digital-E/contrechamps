const postFields = `
  _id,
  _lang,
  name,
  title,
  content,
  startdate,
  enddate,
  starttime,
  endtime,
  location,
  image,
  ticketLink,
  ticketLinkLabel,
  information,
  slices,
  "slug": slug.current,
  "author": author->{name, picture},
`

const homeFields = `
  _id,
  title,
  content,
  newsTitle,
  video,
  textfieldone,
  textfieldtwo,
  "slug": slug.current
`


const saisonFields = `
  _id,
  title,
  content,
  text,
  "slug": slug.current
`

export const indexQuery = `
*[_type == "post" && _lang == $slug] | order(date desc, _updatedAt desc) {
  ${postFields}
}
`

export const homeQuery = `
*[_type == "home" && slug.current == $slug][0] {
  ${homeFields}
}
`

export const saisonQuery = `
*[_type == "saison" && slug.current == $slug][0] {
  ${saisonFields}
}
`

export const mediaPageQuery = `
*[_type == "mediaPage" && slug.current == $slug][0] {
  title,
  content,
  text,
  "slug": slug.current
}
`

export const menuQuery = `
*[_type == "menu" && _lang == $lang][0] {
  menuItems
}
`

export const footerQuery = `
*[_type == "footer" && _lang == $lang][0] {
  textFieldOne,
  textFieldTwo,
  textFieldThree,
  emailPlaceholder,
  submitButtonText,
  socialItems
}
`

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export const allPostQuery = `
*[slug.current == $slug][0] {
  ${postFields}
}
`
