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
  oninit () {
    document.addEventListener('keydown', () => closeModal(), { once: true })
  },

  async onbeforeremove ({ dom }) {
    dom.classList.add('hide')
    return new Promise(resolve => {
      dom.addEventListener('animationend', resolve)
    })
  },

  view () {
    return m('.modal', { onclick: closeModal },
      m('.modal-box',
        m('h1', 'What is mkswap.xyz?'),
        m('p',
          'According to famous psychology paper ',
          m('a', { href: 'https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two' }, '"The Magical Number Seven, Plus or Minus Two"'),
          ' we are able to hold between 5 and 9 pieces of information in our short-term memory. ',
          'mkswap is a simple tool that was designed to help with overload of said memory by creating a place where you can quickly capture short lived pieces of information.'),
        m('h3', 'How does it work?'),
        m('p', 'Is simulates higher end of the bell curve and can hold 9 pieces of information'),
        m('p', 'Adding new item after you reach the limit will delete the oldest item in the list'),
        m('p', 'Adding new item pushes older ones closer towards oblivion'),
        m('p', 'Your list is cached for the duration of your browser session')
      )
    )
  }
}

export function renderHelpModal (): false | m.Vnode<{}, {}> {
  return isOpen && m(HelpModal)
}
