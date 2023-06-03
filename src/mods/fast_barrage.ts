import { GM } from "\$";
import { BiliSelectors } from "../constants";
import { $, $$, $H, append, attrs, create, observe, on,  style } from "../utils/dom";

const DEFAULT_WORDS = 'awsl;草'

const ButtonStyle = {
  'height': '28px',
  'line-height': '28px',
  'border-radius': '9999px',
  'border': 'none',
  'font-size': '13px',
  'padding': '0 12px',
  'box-sizing': 'border-box',
  'transition': 'all .3s',
  'display': 'inline-flex',
  '-ms-flex-align': 'center',
  'align-items': 'center',
  'cursor': 'pointer',
  'color': '#ffffff',
}

observe(document.body, async () => {
  const player = $(document, BiliSelectors.player)
  if(!player) return

  const composer = $(document, `${BiliSelectors.barrageSendingArea}:not([awsl="yes"])`);
  if(!composer) return
  
  const words = (await GM.getValue('words', DEFAULT_WORDS)).split(';').filter(t => !!t)

  const success = injectButtons(composer as HTMLElement, words)
  if(success) {
    attrs(composer as HTMLElement, {'awsl': 'yes'})
  }
})

interface IComposeBar {
  textarea: HTMLInputElement;
  submit: HTMLElement;
}

const injectButtons = (container: HTMLElement, words: string[]): boolean => {
  const ctx = $H<IComposeBar>(container, {
    textarea: BiliSelectors.barrageInput,
    submit: BiliSelectors.barrageSendButton,
  });
  if(!ctx) {
    return false
  }

  const FastBarrageWords = append(container, () => create('div', [], {
    style: {
      'display': 'flex',
      'flex-wrap': 'wrap',
      'align-items': 'center',
      'gap': '12px',
      'padding': '12px',
      'background': '#ffffff',
    }
  }))

  append(FastBarrageWords, () => createConfigButton())

  for(const word of words) {
    const button = append(FastBarrageWords, () => createButton(word))
    on(button, 'click', () => {
      ctx.textarea.value = word + ctx.textarea.value;
      ctx.textarea.dispatchEvent(new Event('input'));
      setTimeout(() => {
        ctx.submit.click();
      }, 200);
    })
  }

  return true
}

const createButton = (text: string): HTMLElement => {
  const button = create('button', [
    'bui-button-blue'
  ], {
    style: {
      ...ButtonStyle,
      'background': 'var(--bpx-fn-color,#00a1d6)',
    }
  });

  append(button, () => {
    const inner = create('span', ['woo-button-content'], { html: text })
    return inner;
  });

  return button;
}

const createConfigButton = () => {
  const button = create('button', [], {
    style: {
    ...ButtonStyle,
    'background': 'var(--brand_pink, #FF6699)',
  }})

  append(button, () => {
    const inner = create('span', ['woo-button-content'], { html: '自定义/Customize' })
    return inner;
  });

  on(button, 'click', async () => {
    const words = window.prompt('输入多个短语，以「;」分隔\nEnter multiple phrases, separated by ";"')
    if(words && words.trim() !== '') {
      await GM.setValue('words', words)
      // TODO: more insensitive way
      window.location.reload()
    }
  })

  return button
}
