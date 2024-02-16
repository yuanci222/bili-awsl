import { BiliSelectors } from "../constants";
import { append, attrs, create, observe } from "../utils/dom";
import { $ } from "../utils/dom";

observe(document.body, () => {
  const leftEntry = $(document, `${BiliSelectors.leftEntry}:not([awsl="yes"])`)
  if(!leftEntry) {
    return
  }

  if(leftEntry.lastChild) {
    // remove "download" button
    leftEntry.removeChild(leftEntry.lastChild)
  }

  const avatar = $(document, BiliSelectors.avatar)
  if(!avatar || avatar.tagName.toUpperCase() !== 'A') return

  const href = (avatar as HTMLLinkElement).href
  const id = href.split('/').pop()
  if(!id) return

  const cinemaLink = `https://space.bilibili.com/${id}/cinema`
  const cinemaButton = create('li', [
    'v-popover-wrap'
  ])
  append(cinemaButton, () => {
    const link = create('a', [
      'default-entry',
      ''
    ])
    attrs(link, {
      'href': cinemaLink,
      'target': '_blank'
    })
    const lang = document.documentElement.lang
    link.innerText = lang === 'zh-CN' ? '追剧' :'Cinema'
    return link
  })

  leftEntry.appendChild(cinemaButton)
  attrs(leftEntry, {'awsl': 'yes'})
})