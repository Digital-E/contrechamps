

export default function Component({ data, id, hasCaption }) {

    let videoId = data.video;

    let regExp = /[a-zA-Z]/g;

    let isYoutube = regExp.test(data.video);

    return videoId !== null ?
        // isYoutube ?
        // <div id="player" className="player" data-plyr-provider="youtube" data-plyr-embed-id={videoId}></div>
        // :
        <>
        <div class="plyr__video-embed player" id={id}>
            <iframe
            src={
            isYoutube ?
            // `https://youtube.com/embed/${videoId}?controls=0&amp;loop=false&amp;byline=false&amp;modestbranding=1&amp;showinfo=0`
            `https://youtube.com/embed/${videoId}`
            :
            `https://player.vimeo.com/video/${videoId}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`
            }
            allowfullscreen
            allowtransparency
            allow="autoplay"
            ></iframe>
        </div>
        {(hasCaption && data.caption) && <span className="caption">{data.caption}</span>}
        </>
    :
    null
}