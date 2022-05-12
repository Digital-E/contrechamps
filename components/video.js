import { useEffect } from "react"

import Plyr from 'plyr';


export default function Component({ data }) {

    let videoId = data;

    useEffect(() => {
        const player = new Plyr('#player');
    },[]);

    return videoId !== null ?
        <div class="plyr__video-embed" id="player">
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