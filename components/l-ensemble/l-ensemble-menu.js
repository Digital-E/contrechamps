import Link from '../link'
import styled from "styled-components"

let Container = styled.header`
  display: flex;
  justify-content: space-between;

  .p {
   margin: 0;
  }
`

let List = styled.ul`
  display: flex;
  flex-direction: column;
`

let ListItem = styled.li`
  margin-bottom: 5px;
`

let Menu = styled.div`
  display: flex;
`





export default function Component({ data }) {

  if(data === undefined) return null;

  return (
    <Container>
      <Menu>
        <List>
          {data.menuItems.map(item => <ListItem key={item._id}><div className="h5"><Link href={item.url}>{item.label}</Link></div></ListItem>)}
        </List>
      </Menu>
    </Container>
  )
}
