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
  tags,
  location,
  image,
  ticketLink,
  ticketLinkLabel,
  information,
  slices,
  "slug": slug.current,
`

const homeFields = `
  _id,
  title,
  content,
  newsTitle,
  videoTitle,
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
  tags,
  "slug": slug.current
`

const lEnsembleFields = `
  _lang,
  name,
  title,
  content,
  slices,
  "slug": slug.current,
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
  _lang,
  title,
  content,
  type,
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
export const mediaSlugsQuery = `
*[_type == "mediaPage" && defined(slug.current)][].slug.current 
`

export const pressQuery = `
*[_type == "presse" && _lang == $lang] | order(date desc) {
    title,
    content,
    date,
    text,
    pressLink,
    pressLinkLabel
}
`

export const videosQuery = `
*[_type == "video" && _lang == $lang] | order(date desc) {
    title,
    content,
    image,
    video,
    text,
    "slug": slug.current
}
`

export const disquesQuery = `
*[_type == "disque" && _lang == $lang] | order(date desc) {
    title,
    content,
    text,
    link,
    linkLabel
}
`
export const lEnsembleSlugsQuery = `
*[_type == "lEnsemble" && defined(slug.current)][].slug.current
`

export const lEnsembleQuery = `
*[_type == "lEnsemble" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ${lEnsembleFields}
}`

export const lEnsembleMenuQuery = `
*[_type == "lEnsembleMenu" && _lang == $lang][0] {
  menuItems
}`

export const lesMusiciensSlugsQuery = `
*[_type == "lesMusiciens" && defined(slug.current)][].slug.current
`

export const lesMusiciensQuery = `
*[_type == "lesMusiciens" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ${lEnsembleFields}
}`

export const lesMusiciensMenuQuery = `
*[_type == "lesMusiciensMenu" && _lang == $lang][0] {
  title,
  menuItems
}`

export const allMediaSlugsQuery = `
*[_type in ["presse", "video", "disque"] && defined(slug.current)][].slug.current
`

export const mediaQuery = `
*[_type in ["presse", "video", "disque"] && slug.current == $slug] | order(_updatedAt desc) [0] {
    ${lEnsembleFields}
}`
