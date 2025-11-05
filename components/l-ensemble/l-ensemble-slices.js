import { useEffect } from "react"
import styled from "styled-components"
import Plyr from 'plyr';


import Body from "../body"
import Image from "../image"
import Video from "../video"
import Grid from "./grid"

const SliceWrapper = styled.div`
    margin: 0 0 30px 0;

    &.double-col * {
        columns: 2;
        column-gap: 50px;
    }

    @media(min-width: 990px) {
        &&.grid-slice-2 .image-slice,
        &&.grid-slice-2 .video-slice
         {
            width: calc(50% - 5px);
        }

        &&.grid-slice-3 .image-slice,
        &&.grid-slice-3 .video-slice
         {
            width: calc(33.3333% - 5px);
        }        
    }
`


let renderSlice = (slice ,index) => {
    
      switch(slice._type) {
          case 'video':
          return <SliceWrapper key={slice._id} className="video-slice"><Video data={slice} id={`video-${index}`} hasCaption={true}/></SliceWrapper>
          case 'image':
          return <SliceWrapper key={slice._id} className="image-slice"><Image data={slice} hasCaption={true} /></SliceWrapper>
          case 'Text':
          return <SliceWrapper key={slice._id} className={slice.doubleColumn ? "double-col" : ""}><Body content={slice.text} /></SliceWrapper>;
          case 'Grid':
          return <SliceWrapper key={slice._id} className={`grid-slice-${slice.columns}`}><Grid data={slice}/></SliceWrapper>;          
      }
}


export default function Component({ data }) {

    useEffect(() => {
        // const players = Array.from(document.querySelectorAll('.player')).map((p) => new Plyr(p));
        const players = Plyr.setup('.player');
    },[])

  return data !== null ? data.map((slice, index) => renderSlice(slice, index)) : null
}
