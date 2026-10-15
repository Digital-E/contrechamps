// Parses a YouTube or Vimeo URL into { provider, id }, or null if it
// doesn't match either.
export function parseVideoUrl(url) {
    if (!url) return null

    let youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/)
    if (youtubeMatch) return { provider: 'youtube', id: youtubeMatch[1] }

    let vimeoMatch = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/)
    if (vimeoMatch) return { provider: 'vimeo', id: vimeoMatch[1] }

    return null
}

export function getYoutubeThumbnail(id) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

export function getEmbedSrc({ provider, id }) {
    if (provider === 'youtube') return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
    if (provider === 'vimeo') return `https://player.vimeo.com/video/${id}?autoplay=1`
    return null
}

// Vimeo has no predictable thumbnail URL (unlike YouTube), so this hits
// Vimeo's public, unauthenticated oEmbed endpoint to get one.
export async function fetchVimeoThumbnail(url) {
    let response = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`)
    if (!response.ok) throw new Error('Vimeo oEmbed request failed')

    let data = await response.json()
    return data.thumbnail_url || null
}
