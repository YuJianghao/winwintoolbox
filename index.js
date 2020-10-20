document.addEventListener('DOMContentLoaded', () => {
    function createDiv() {
        return document.createElement('div')
    }
    function createSpan() {
        return document.createElement('span')
    }
    function createRow() {
        const row = createDiv()
        row.classList.add('list-row')
        return row
    }
    function openLink(href) {
        const a = document.createElement('a')
        a.href = href
        a.target = '_blank'
        a.click()
    }
    function createTitle(data, level = 0) {
        const title = createDiv()
        title.style.paddingLeft = 12 + 'px'
        function createDash() {
            const div = createDiv()
            div.style.borderLeft = '1px solid #646464'
            div.style.display = 'inline-block'
            div.style.width = '11px'
            div.style.height = '22px'
            return div
        }
        for (let i = 1; i <= level; i++) {
            title.appendChild(createDash())
        }
        const icon = createSpan()
        icon.classList.add('icon')
        icon.classList.add('iconfont')
        icon.style.color = "#90a4ae"
        title.appendChild(icon)
        const name = createSpan()
        name.innerText = data.name
        name.classList.add('title')
        title.appendChild(name)
        if (data.isDir) {
            icon.classList.add('icon-folder')
        } else {
            title.style.cursor = "pointer"
            switch (data.extname) {
                case '.html':
                    icon.classList.add('icon-html')
                    icon.style.color = "#FC490B"
                    break
                case '.css':
                    icon.classList.add('icon-css')
                    icon.style.color = "#2196F3"
                    break
                case '.js':
                    icon.classList.add('icon-js')
                    icon.style.color = "#ffca28"
                    break
                case '.png':
                    icon.classList.add('icon-image')
                    icon.style.color = "#26A69A"
                    break
                case '.jpg':
                    icon.classList.add('icon-image')
                    icon.style.color = "#26A69A"
                    break
                default:
                    icon.classList.add('icon-file')
                    break
            }
            title.addEventListener("click", () => {
                handleClick(data)
            })
        }
        return title
    }
    function createNode(data, level = 0) {
        if (data.isDir) {
            const node = createDiv()
            const row = createRow()
            const title = createTitle(data, level)
            row.appendChild(title)
            node.appendChild(row)
            const list = createDiv()
            list.classList.add('list-content')
            data.children.forEach(child => {
                const listItem = createNode(child, level + 1)
                list.appendChild(listItem)
            })
            node.appendChild(list)
            return node
        } else {
            const row = createRow()
            const title = createTitle(data, level)
            row.appendChild(title)
            return row
        }
    }
    const toc = document.getElementById('toc')
    if (window.__TREE_DATA.length > 0) {
        window.__TREE_DATA.forEach(item => {
            toc.appendChild(createNode(item))
        })
    } else {
        const empty = createRow()
        empty.innerText = '无'
        empty.style.paddingLeft = '8px'
        toc.appendChild(empty)
    }
    const stage = document.getElementById('stage')
    const welcome = document.getElementById('welcome')
    let openedFile = null
    function handleClick(d) {
        openedFile = d
        welcome.classList.add('hide')
        stage.classList.remove('hide')
        stage.src = d.path
        textName.innerText = '文件：' + d.path
    }
    // addButtonEventListeners
    const btnToggleToc = document.getElementById('btn-toggle-toc')
    btnToggleToc.addEventListener('click', () => {
        if (toc.classList.contains('hide')) {
            toc.classList.remove('hide')
            btnToggleToc.innerText = '隐藏侧栏'
        } else {
            toc.classList.add('hide')
            btnToggleToc.innerText = '打开侧栏'
        }
    })
    const textName = document.getElementById('text-name')
    textName.addEventListener("click", () => {
        if (openedFile && openedFile.isFile) {
            openLink(openedFile.path)
        }
    })
})