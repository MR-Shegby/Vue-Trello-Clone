export function compareOrder(a, b) {
  if (a.order < b.order)
    return -1
  if (a.order > b.order)
    return 1
  return 0
}

export function comparebyProperty(property) {
  return (a, b) => {
    return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
  }
}

export function expandTextArea(node) {
  // console.log(node.tagName)
  if (node.tagName === 'TEXTAREA') {
    if (node.scrollTop > 0) {
      node.style.height = node.scrollHeight + 'px'
    }
  }
}