import { TocNodeInfo } from "@/types";




/**
 * 创建Markdown目录
 * @param element 元素 document.querySelector('.markdown-body')
 * @param nodeTag 节点标签  例如['H1', 'H2', 'H3', 'H4']
 */
export const createMarkdownToc = (element: any,nodeTag=['H1', 'H2', 'H3']) => {
	let nodeInfo = [] as Array<TocNodeInfo>;
    
    element?.childNodes.forEach((item:any, key:number) => {
        if (nodeTag.includes(item.nodeName)) {
          nodeInfo.push({
            tag: item.nodeName,
            txt: item.innerText,
            //offsetTop: item.offsetTop,
            tocId: `toc_${key}`,
          })
          item.setAttribute('id', `toc_${key}`)
        }
    })
    return nodeInfo;
}

/**
 * 目录样式
 * @param tag 标签
 * @returns 
 */
export const tocStyle = (tag:string) => {
    let style = {}
    if (tag === 'H2') style = { 'padding-left': 10 + 'px' }
    if (tag === 'H3') style = { 'padding-left': 20 + 'px' }
    if (tag === 'H4') style = { 'padding-left': 30 + 'px' }
    return style
}


/**
 * 滚动到目录项
 * @param tocId 目录Id
 */
export const scrollToTocItem = (tocId:string) => {
    const target:any = document.querySelector(`#${tocId}`);
    const targetTop = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({
      top: targetTop,
     // behavior: 'smooth'
    });
}
