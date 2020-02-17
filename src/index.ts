import m from 'mithril'
import { HelpCircle } from '@mithril-icons/feather'
import { renderHelpModal } from './help'
import './style.css'
import { Actions, State } from './state'

const ThoughtInput: m.Component<{actions: Actions}> = {
  view: ({ attrs: { actions } }) => m('input#input[type="text"][placeholder="Capture thought"]',
    {
      onkeydown: (ev: KeyboardEvent) => {
        if (ev.code === 'Enter' && ev.target != null) {
          const input: HTMLInputElement = (ev.target as HTMLInputElement)
          if (input.value !== '') {
            actions.add(input.value)
            input.value = ''
          }
        }
      }
    })
}

const Thought: m.Component<{text: string}> = {
  onbeforeremove: async (vnode) => {
    vnode.dom.classList.add('exit')
    return new Promise((resolve) => {
      vnode.dom.addEventListener('animationend', resolve)
    })
  },
  view: ({ attrs: { text } }) => m('p', text)
}

const Thoughts: m.Component<{model: State}> = {
  view: ({ attrs: { model } }) => {
    return model.thoughts.slice(0, model.capacity).map(({ id, text }) => m(Thought, { key: id, text }))
  }
}

const Topbar: m.Component<{actions: Actions}> = {
  view: ({ attrs: { actions } }) =>
    m('.topbar', m(ThoughtInput, { actions }), m('a', { onclick: actions.openHelp },
      m(HelpCircle, { width: 30, height: 30 }
      )))
}

const App = () => {
  const model = State()
  const actions = Actions(model)
  return {
    view: () => [
      m('main',
        m(Topbar, { actions }),
        m(Thoughts, { model })
      ),
      renderHelpModal()
    ]
  }
}

m.mount(document.body, App)
