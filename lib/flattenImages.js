// Pulls every image out of a slices array, in document order, including
// images nested inside Grid slices — so a lightbox can navigate across all
// of them regardless of where they sit in the content stream.
export default function flattenImages(slices) {
  let images = []

  // Sanity returns null (not undefined) for an unset array field, which a
  // default parameter doesn't catch — guard explicitly instead.
  let items = slices || []

  items.forEach((slice) => {
    if(slice._type === 'image') {
      images.push(slice)
    } else if(slice._type === 'Grid') {
      slice.gridItems?.forEach((item) => {
        if(item._type === 'image') images.push(item)
      })
    }
  })

  return images
}
