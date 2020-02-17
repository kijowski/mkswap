import m from 'mithril'

let isOpen = false

export function openHelp () {
  isOpen = true
  m.redraw()
}

function closeModal (redraw = true) {
  isOpen = false
  if (redraw) {
    m.redraw()
  }
}

export const HelpModal: m.Component = {
  async onbeforeremove ({ dom }) {
    dom.classList.add('hide')
    return new Promise(resolve => {
      dom.addEventListener('animationend', resolve)
    })
  },

  view () {
    return m('.modal', { onclick: closeModal },
      m('.modal-box',
        m('h3', 'mkswap '),
        m('p', 'What is mkswap?')
      )
    )
  }
}

export function renderHelpModal (): false | m.Vnode<{}, {}> {
  return isOpen && m(HelpModal)
}
