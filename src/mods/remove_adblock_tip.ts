import { BiliSelectors } from "../constants";
import { $, observe } from "../utils/dom";

observe(document.body, () => {
  const adBlockTip = $(document, BiliSelectors.adBlockTip)
  if(adBlockTip) {
    adBlockTip.remove()
  }
})