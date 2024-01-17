type Selectors = 'player' | 'toolbar' | 'sharePanel' | 'wideModeButton' | 'wideModeButtonActivated' | 'barrageSendButton' | 'barrageInput' | 'barrageSendingArea' | 'adBlockTip' | 'avatar' | 'leftEntry'

export const BiliSelectors: Record<Selectors, string> = {
  player: '#bilibili-player',
  toolbar: '.arc_toolbar_report',
  sharePanel: '.share_dropdown',
  wideModeButton: '.bpx-player-ctrl-wide',
  wideModeButtonActivated: 'bpx-state-entered',
  barrageInput: '.bpx-player-dm-input',
  barrageSendButton: '.bpx-player-dm-btn-send',
  barrageSendingArea: '.bpx-player-sending-area',
  adBlockTip: '.adblock-tips',
  avatar: '.header-entry-mini',
  leftEntry: '.left-entry'
}

