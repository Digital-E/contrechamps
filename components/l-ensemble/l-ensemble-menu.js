import Link from '../link'
import styled from "styled-components"

let Container = styled.div`
  display: flex;
  justify-content: space-between;

  .p {
   margin: 0;
   font-family: "Courier";
  }

  .active-link {
    color: black !important;
    text-decoration: underline;
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





export default function Component({ data, isSubSubPage }) {

  if(data === undefined) return null;

  return (
    <Container>
      <Menu>
        <List>
          {data?.menuItems.map(item => <ListItem key={item._id}><div className="p"><Link href={item.url} isSubSubPage={isSubSubPage}>{item.label}</Link></div></ListItem>)}
        </List>
      </Menu>
    </Container>
  )
}
