const body = document.body
const sites=[]
add('https://mubu.com/app','幕布')
add('https://www.bilibili.com/','哔哩哔哩')
add('https://host.retiehe.com/','热铁盒虚拟主机')
function add(url,name){
	sites.push({url,name})
}
sites.forEach(addItem)
function ele() {
  return document.createElement(...arguments)
}
function addItem(info) {
  if (!info || !info.name || !info.url) throw new TypeError()
  const a = ele('a')
  a.classList.add('item')
  a.href = info.url
  a.target = '_blank'
  const bg = ele('div')
  bg.appendChild(ele('div'))
  bg.classList.add('bg')
  const title = ele('div')
  title.classList.add('title')
  title.innerText = info.name
  a.appendChild(bg)
  a.appendChild(title)
  body.appendChild(a)
}