import styled from "styled-components"

import Image from "../image"
import Video from "../video"

const GridWrapper = styled.div`
    display: flex;
    flex-basis: 50%;
    flex-wrap: wrap;
    margin: 0 -5px;

    @media(max-width: 989px) {
        display: block;
        margin: 0;
    }
`


const SliceWrapper = styled.div`
    margin: 0 0 30px 0;

    @media(min-width: 990px) {
        &&.image-slice,
        &&.video-slice
         {
            width: 50%;
            padding: 0 5px;
        }
    }
`

let renderSlice = (slice ,index) => {
    
      switch(slice._type) {
          case 'video':
          return <SliceWrapper key={slice._id} className="video-slice"><Video data={slice} id={`video-${index}`} hasCaption={true}/></SliceWrapper>
          case 'image':
          return <SliceWrapper key={slice._id} className="image-slice"><Image data={slice} hasCaption={true} /></SliceWrapper>       
      }
}

const Grid = ({ data, hasCaption }) => {

    return <GridWrapper>{data.gridItems !== null ? data.gridItems.map((slice, index) => renderSlice(slice, index)) : null}</GridWrapper>
}

export default Grid;