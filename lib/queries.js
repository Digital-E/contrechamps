const postFields = `
  _id,
  _lang,
  _type,
  name,
  title,
  content,
  startdate,
  enddate,
  starttime,
  endtime,
  occurences,
  tags,
  location,
  image,
  "videoMp4": videoMp4.asset->url,
  "videoWebM": videoWebm.asset->url,
  label,
  ticketLink,
  ticketLinkLabel,
  information,
  slices,
  "slug": slug.current,
`

const actualiteFields = `
  _id,
  _lang,
  _type,
  name,
  title,
  content,
  startdate,
  textVignette,
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
  circles[] {
    "videoMp4": videoMp4.asset->url,
    "videoWebM": videoWebm.asset->url,
    label
  },
  "slug": slug.current
`


const saisonFields = `
  _id,
  _lang,
  title,
  content,
  text,
  tags,
  "documentURL": document.asset->url,
  documentLabel,
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

const legalFields = `
  _id,
  title,
  content,
  text,
  "slug": slug.current
`

export const indexQuery = `
*[_type == "post" && _lang == $slug && !(_id in path('drafts.**'))] | order(startdate asc) {
  ${postFields}
}
`

export const actualitesQuery = `
*[_type == "news" && _lang == $slug && !(_id in path('drafts.**'))] | order(startdate asc) {
  ${actualiteFields}
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
  menuItems,
  color,
  cookietext,
  cookieaccept,
  cookierefuse
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
  "post": *[_type == "post" && slug.current == $slug && !(_id in path('drafts.**'))] | order(date desc) [0] {
    content,
    ${postFields}
  }
}`


export const previewPostQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc)[0] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current
`

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
  ${postFields}
}
`

export const allPostQuery = `
*[slug.current == $slug && !(_id in path('drafts.**'))][0] {
  ${postFields}
}
`
export const actualiteSlugsQuery = `
*[_type == "news" && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current
`

export const previewActualiteBySlugQuery = `
*[_type == "news" && slug.current == $slug] | order(_updatedAt desc)[0] {
  ${actualiteFields}
}
`

export const actualiteBySlugQuery = `
*[_type == "news" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
  ${actualiteFields}
}
`

export const mediaSlugsQuery = `
*[_type == "mediaPage" && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current 
`

export const pressQuery = `
*[_type == "presse" && _lang == $lang && !(_id in path('drafts.**'))] | order(date desc) {
    title,
    content,
    date,
    text,
    pressLink,
    "documentURL": document.asset->url,
    pressLinkLabel,
    "slug": slug.current
}
`

export const videosQuery = `
*[_type == "video" && _lang == $lang && !(_id in path('drafts.**'))] | order(date desc) {
    title,
    content,
    image,
    video,
    text,
    "slug": slug.current
}
`
export const photosQuery = `
*[_type == "photo" && _lang == $lang && !(_id in path('drafts.**'))] | order(date desc) {
    title,
    content,
    image,
    text,
    "slug": slug.current
}
`

export const disquesQuery = `
*[_type == "disque" && _lang == $lang && !(_id in path('drafts.**'))] | order(date desc) {
    title,
    content,
    text,
    link,
    linkLabel,
    "slug": slug.current
}
`

export const lEnsembleSlugsQuery = `
*[_type == "lEnsemble" && defined(slug.current)][].slug.current
`

export const previewLEnsembleQuery = `
*[_type == "lEnsemble" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ${lEnsembleFields}
}`

export const lEnsembleQuery = `
*[_type == "lEnsemble" && slug.current == $slug && !(_id in path('drafts.**'))] | order(_updatedAt desc) [0] {
    ${lEnsembleFields}
}`

export const lEnsembleMenuQuery = `
*[_type == "lEnsembleMenu" && _lang == $lang][0] {
  menuItems
}`

export const lesMusiciensSlugsQuery = `
*[_type == "lesMusiciens" && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current
`
export const previewLesMusiciensQuery = `
*[_type == "lesMusiciens" && slug.current == $slug] | order(_updatedAt desc) [0] {
    ${lEnsembleFields}
}`

export const lesMusiciensQuery = `
*[_type == "lesMusiciens" && slug.current == $slug && !(_id in path('drafts.**'))] | order(_updatedAt desc) [0] {
    ${lEnsembleFields}
}`

export const lesMusiciensMenuQuery = `
*[_type == "lesMusiciensMenu" && _lang == $lang][0] {
  title,
  menuItems
}`

export const allMediaSlugsQuery = `
*[_type in ["presse", "video", "disque", "photo"] && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current
`

export const previewMediaQuery = `
*[_type in ["presse", "video", "disque", "photo"] && slug.current == $slug] | order(_updatedAt desc)[0] {
    ${lEnsembleFields}
}`

export const mediaQuery = `
*[_type in ["presse", "video", "disque", "photo"] && slug.current == $slug && !(_id in path('drafts.**'))] | order(_updatedAt desc) [0] {
    ${lEnsembleFields}
}`

export const legalQuery = `
*[_type == "legal" && slug.current == $slug][0] {
    ${legalFields}
}
`