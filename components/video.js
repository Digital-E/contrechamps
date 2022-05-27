

export default function Component({ data, id }) {

    let videoId = data;

    let regExp = /[a-zA-Z]/g;

    let isYoutube = regExp.test(data);

    return videoId !== null ?
        <div class="plyr__video-embed player" id={id}>
            <iframe
            src={
            isYoutube ?
            `https://youtube.com/embed/${videoId}?controls=0&amp;loop=false&amp;byline=false&amp;modestbranding=1&amp;showinfo=0&amp;`
            :
            `https://player.vimeo.com/video/${videoId}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`
            }
            allowfullscreen
            allowtransparency
            allow="autoplay"
            ></iframe>
        </div>
    :
    null
}