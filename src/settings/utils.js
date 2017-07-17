
export function isSM(){
  const width = 780
  return width -1 > window.innerWidth ? true : false
}


export function isMid(){
  const width = 1600
  return width -1 > window.innerWidth ? true : false
}

export const qsa = document.querySelectorAll.bind(document)

export function getTax (state) {
  let tax = {}
  tax.term = state.mode.replace(/(category-|tax-)/, '')
  tax.name = /category-/.test(state.mode) ? 'categories' : 'tags'
  return tax
}
