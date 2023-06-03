import { BiliSelectors } from "../constants";
import { $, observe } from "../utils/dom";

observe(document.body, () => {
  const player = $(document, BiliSelectors.player)
  if(!player) return

  const wideModeButton = $(player, BiliSelectors.wideModeButton)
  if(wideModeButton && !wideModeButton.className.includes(BiliSelectors.wideModeButtonActivated)) {
    wideModeButton.click()
  }
})