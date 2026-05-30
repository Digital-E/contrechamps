import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from './link'
import styled from 'styled-components'

const Wrapper = styled.div`
  .p {
    margin: 0;
    text-transform: uppercase;
    font-family: "Barlow Condensed SemiBold";
    font-size: 1.2rem;
  }

  .active-link {
    font-family: "Barlow Condensed ExtraBold";
    opacity: 1 !important;
    color: black !important;
  }
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
`

const Item = styled.li`
  margin-bottom: 8px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: ${({ clickable }) => clickable ? 'pointer' : 'default'};
  user-select: none;
`

const Arrow = styled.img`
  flex-shrink: 0;
  transition: transform 0.2s ease;
  transform: ${({ open }) => open ? 'rotate(90deg)' : 'rotate(0deg)'};
`

const SubList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 6px;
  padding-left: 14px;
`

const SubItem = styled.li`
  margin-bottom: 6px;

  ${({ noUppercase }) => noUppercase && `.p { text-transform: none; }`}
`

const SubSubList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 6px;
  padding-left: 14px;
`

const SubSubItem = styled.li`
  margin-bottom: 5px;

  .p {
    text-transform: none;
  }
`


export default function NestedMenu({ items, onNavigate, noUppercaseNested }) {
  const [openItems, setOpenItems] = useState({})
  const router = useRouter()

  if (!items?.length) return null

  const toggle = (key) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))

  const normalizeUrl = (url) => {
    if (!url) return ''
    const parts = url.split('__')
    return parts.length > 1 ? '/' + parts.join('/') : url
  }

  const isUrlActive = (url) => {
    const normalized = normalizeUrl(url)
    return router.asPath === normalized || router.asPath.startsWith(normalized + '/')
  }

  const isDescendantActive = (item) =>
    item.subItems?.some(sub =>
      isUrlActive(sub.url) || sub.subItems?.some(subsub => isUrlActive(subsub.url))
    )

  const isSubDescendantActive = (sub) =>
    sub.subItems?.some(subsub => isUrlActive(subsub.url))

  return (
    <Wrapper>
    <List>
      {items.map((item, i) => {
        const hasChildren = item.subItems?.length > 0
        const isOpen = !!openItems[i]

        return (
          <Item key={item._key || i}>
            {hasChildren ? (
              <>
                <Row clickable onClick={() => toggle(i)}>
                  <Arrow src="/icons/caret-right-solid-full.svg" alt="" width={16} open={isOpen} />
                  <span className={`p${isDescendantActive(item) ? ' active-link' : ''}`}>{item.label}</span>
                </Row>
                {isOpen && (
                  <SubList>
                    {item.subItems.map((sub, j) => {
                      const subKey = `${i}-${j}`
                      const hasSubChildren = sub.subItems?.length > 0
                      const subIsOpen = !!openItems[subKey]

                      return (
                        <SubItem key={sub._key || j} noUppercase={noUppercaseNested}>
                          {hasSubChildren ? (
                            <>
                              <Row clickable onClick={() => toggle(subKey)}>
                                <Arrow src="/icons/caret-right-solid-full.svg" alt="" width={16} open={subIsOpen} />
                                <span className={`p${isSubDescendantActive(sub) ? ' active-link' : ''}`}>{sub.label}</span>
                              </Row>
                              {subIsOpen && (
                                <SubSubList>
                                  {sub.subItems.map((subsub, k) => (
                                    <SubSubItem key={subsub._key || k} onClick={onNavigate}>
                                      <div className="p">
                                        <Link href={subsub.url} isMenu={true}>{subsub.label}</Link>
                                      </div>
                                    </SubSubItem>
                                  ))}
                                </SubSubList>
                              )}
                            </>
                          ) : (
                            <div className="p" onClick={onNavigate}>
                              <Link href={sub.url} isMenu={true}>{sub.label}</Link>
                            </div>
                          )}
                        </SubItem>
                      )
                    })}
                  </SubList>
                )}
              </>
            ) : (
              <div className="p" onClick={onNavigate}>
                <Link href={item.url} isMenu={true}>{item.label}</Link>
              </div>
            )}
          </Item>
        )
      })}
    </List>
    </Wrapper>
  )
}
