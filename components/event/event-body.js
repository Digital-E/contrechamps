import styled from "styled-components"
import Body from "../body"

import Image from "../image"
import Video from "../video"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`

const ColLeft = styled.div`
  flex-basis: 30%;
`

const ColRight = styled.div`
  flex-basis: 70%;
`

const SliceWrapper = styled.div`
    margin: 30px 0;

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



export default function EventHeader({ data }) {

  return (
    <Container>
      <ColLeft>
        <Body content={data.information} />
      </ColLeft>
      <ColRight>
        {data.slices?.map(slice => renderSlice(slice))}
      </ColRight>
    </Container>
  )
}
