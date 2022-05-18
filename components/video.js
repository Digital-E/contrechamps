

export default function Component({ data, id }) {

    let videoId = data;

    return videoId !== null ?
        <div class="plyr__video-embed player" id={id}>
            <iframe
            src={`https://player.vimeo.com/video/${videoId}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`}
            allowfullscreen
            allowtransparency
            allow="autoplay"
            ></iframe>
        </div>
    :
    null
}