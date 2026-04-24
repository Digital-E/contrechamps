import { isValidRequest } from '@sanity/webhook'
import { sanityClient } from '../../lib/sanity.server'

// Slugs are stored as "${lang}__${section}__${slug}" (e.g. "fr__saison__mon-evenement")
// These queries return that raw slug.current value.
const POST_UPDATED_QUERY = `*[_type == "post" && _id == $id].slug.current`
const NEWS_UPDATED_QUERY = `*[_type == "news" && _id == $id].slug.current`

// Convert a Sanity composite slug into the actual Next.js route path.
// "fr__saison__mon-evenement" → "/fr/saison/mon-evenement"
const toSaisonRoute = (slug) => {
  const parts = slug.split('__')
  return `/${parts[0]}/saison/${parts[2]}`
}
const toActualitesRoute = (slug) => {
  const parts = slug.split('__')
  return `/${parts[0]}/actualites/${parts[2]}`
}

const HOME_ROUTES = ['/fr', '/en_gb']

const getRoutesForType = async (type, id) => {
  switch (type) {
    case 'post': {
      const slugs = await sanityClient.fetch(POST_UPDATED_QUERY, { id })
      const arr = Array.isArray(slugs) ? slugs : [slugs]
      return [...HOME_ROUTES, ...arr.filter(Boolean).map(toSaisonRoute)]
    }
    case 'news': {
      const slugs = await sanityClient.fetch(NEWS_UPDATED_QUERY, { id })
      const arr = Array.isArray(slugs) ? slugs : [slugs]
      return [...HOME_ROUTES, ...arr.filter(Boolean).map(toActualitesRoute)]
    }
    default:
      return []
  }
}

const log = (msg, error) =>
  console[error ? 'error' : 'log'](`[revalidate] ${msg}`)

export default async function revalidate(req, res) {
  if (!isValidRequest(req, process.env.SANITY_STUDIO_REVALIDATE_SECRET)) {
    const invalidRequest = 'Invalid request'
    log(invalidRequest, true)
    return res.status(401).json({ message: invalidRequest })
  }

  const { _id: id, _type } = req.body
  if (typeof id !== 'string' || !id) {
    const invalidId = 'Invalid _id'
    log(invalidId, true)
    return res.status(400).json({ message: invalidId })
  }

  // Sanity auto-saves drafts (prefixed with "drafts.") on every keystroke.
  // These are not published content and should never trigger ISR revalidation.
  if (id.startsWith('drafts.')) {
    log(`Skipping draft document '${id}'`)
    return res.status(200).json({ message: 'Skipping draft' })
  }

  log(`Querying routes for _id '${id}', type '${_type}' ..`)
  const staleRoutes = await getRoutesForType(_type, id)

  try {
    await Promise.all(
      staleRoutes.map((route) => res.unstable_revalidate(route))
    )
    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`
    log(updatedRoutes)
    return res.status(200).json({ message: updatedRoutes })
  } catch (err) {
    log(err.message, true)
    return res.status(500).json({ message: err.message })
  }
}
