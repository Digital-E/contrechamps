import styled from "styled-components"

import Body from "../body"
import Image from "../image"
import Video from "../video"

const SliceWrapper = styled.div`
    margin: 0 0 30px 0;

    &.double-col * {
        columns: 2;
        column-gap: 50px;
    }
`


let renderSlice = (slice) => {
      switch(slice._type) {
          case 'video':
          return <SliceWrapper key={slice._id}><Video data={slice.video}/></SliceWrapper>
          case 'image':
          return <SliceWrapper key={slice._id}><Image data={slice} /></SliceWrapper>
          case 'Text':
          return <SliceWrapper key={slice._id} className={slice.doubleColumn ? "double-col" : ""}><Body content={slice.text} /></SliceWrapper>;
      }
}


export default function Component({ data }) {

  return data !== null ? data.map(slice => renderSlice(slice)) : null
}
