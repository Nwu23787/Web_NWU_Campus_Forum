import { icons } from './icons'
import en from './locales/en.json'
import type { BytemdPlugin } from 'bytemd'
import type { default as Mermaid, MermaidConfig } from 'mermaid'

type Locale = {
  mermaid: string
  flowchart: string
  sequence: string
  class: string
  state: string
  er: string
  uj: string
  gantt: string
  pie: string
  mindmap: string
  timeline: string
}

export interface BytemdPluginMermaidOptions extends MermaidConfig {
  locale?: Partial<Locale>
}

export default function mermaid({
  locale: _locale,
  ...mermaidConfig
}: BytemdPluginMermaidOptions = {}): BytemdPlugin {
  const locale = { ...en, ..._locale } as Locale
  let m: typeof Mermaid

  const actionItems = [
    {
      title: locale.flowchart,
      code: `graph TD
Start --> Stop`,
    },
    {
      title: locale.sequence,
      code: `sequenceDiagram
Alice->>John: Hello John, how are you?
John-->>Alice: Great!
Alice-)John: See you later!`,
    },
    {
      title: locale.class,
      code: `classDiagram
Animal <|-- Duck
Animal <|-- Fish
Animal <|-- Zebra
Animal : +int age
Animal : +String gender
Animal: +isMammal()
Animal: +mate()
class Duck{
+String beakColor
+swim()
+quack()
}
class Fish{
-int sizeInFeet
-canEat()
}
class Zebra{
+bool is_wild
+run()
}`,
    },
    {
      title: locale.state,
      code: `stateDiagram-v2
[*] --> Still
Still --> [*]

Still --> Moving
Moving --> Still
Moving --> Crash
Crash --> [*]`,
    },
    {
      title: locale.er,
      code: `erDiagram
CUSTOMER ||--o{ ORDER : places
ORDER ||--|{ LINE-ITEM : contains
CUSTOMER }|..|{ DELIVERY-ADDRESS : uses`,
    },
    {
      title: locale.uj,
      code: `journey
title My working day
section Go to work
Make tea: 5: Me
Go upstairs: 3: Me
Do work: 1: Me, Cat
section Go home
Go downstairs: 5: Me
Sit down: 5: Me`,
    },
    {
      title: locale.gantt,
      code: `gantt
title A Gantt Diagram
dateFormat  YYYY-MM-DD
section Section
A task           :a1, 2014-01-01, 30d
Another task     :after a1  , 20d
section Another
Task in sec      :2014-01-12  , 12d
another task      : 24d`,
    },
    {
      title: locale.pie,
      code: `pie title Pets adopted by volunteers
"Dogs" : 386
"Cats" : 85
"Rats" : 15`,
    },/**
    {
      title: locale.mindmap,
      code: `mindmap
      Root
          A
            B
            C
    `,
    }, */
    {
      title: locale.timeline,
      code: `timeline
      title History of Social Media Platform
      2002 : LinkedIn
      2004 : Facebook
           : Google
      2005 : Youtube
      2006 : Twitter
      `,
    },
  ]

  return {
    viewerEffect({ markdownBody }) {
      ;(async () => {
        const els = markdownBody.querySelectorAll<HTMLElement>(
          'pre>code.language-mermaid'
        )
        if (els.length === 0) return

        if (!m) {
          m = await import('mermaid').then((c) => c.default)
          if (mermaidConfig) {
            m.initialize(mermaidConfig)
          }
        }

        els.forEach((el, i) => {
          const pre = el.parentElement!
          const source = el.innerText
         
          const container:any = document.createElement('div')
          container.classList.add('bytemd-mermaid')
          container.style.lineHeight = 'initial' // reset line-height
           
          setTimeout(async () => {
            if((markdownBody.parentNode! as any).style.display != 'none'){//如果‘预览区’不隐藏
              pre.replaceWith(container);
              m.render(
                `bytemd-mermaid-${Date.now()}-${i}`,
                source,
                // @ts-ignore
                container
              )
              .then((svgCode) => {
                // @ts-ignore
                container.innerHTML = svgCode.svg

                
                if(source.trim().toLowerCase().startsWith("pie title ")){//饼图
                  let viewBox = container.firstChild?.getAttribute("viewBox");
                  
                  if(viewBox){
                    let item_1 = viewBox.split(" ")[0];
                    let item_2 = viewBox.split(" ")[1];
                    let item_3 = viewBox.split(" ")[2];
                    let item_4 = viewBox.split(" ")[3];

                    item_3 = parseInt(item_3)+100;//让饼图向左移100
                    container.firstChild?.setAttribute("viewBox",item_1+" "+item_2+" "+item_3+" "+item_4);
                  }
                  
                }
              })
              .catch((err) => {
                console.error(err);
              })

            }else{
              if(markdownBody.clientWidth == 0){
                container.style.width ="380px"
              }else{
                container.style.width= markdownBody.clientWidth+"px"
              }
              pre.replaceWith(container) 
              let id = `bytemd-mermaid-${Date.now()}-${i}`;
              
              await m.render(id, source).then((svgCode) => {
                // @ts-ignore
                container.innerHTML = svgCode.svg


                if(source.trim().toLowerCase().startsWith("pie title ")){//饼图
                  let viewBox = container.firstChild?.getAttribute("viewBox");//<svg aria-labelledby="chart-title-bytemd-mermaid-1693369676593-0" aria-roledescription="pie" role="graphics-document document" style="max-width: 1070px;" viewBox="0 0 713 450" xmlns="http://www.w3.org/2000/svg" width="100%" id="bytemd-mermaid-1693369676593-0">
                  
                  if(viewBox){
                    let item_1 = viewBox.split(" ")[0];
                    let item_2 = viewBox.split(" ")[1];
                    let item_3 = viewBox.split(" ")[2];
                    let item_4 = viewBox.split(" ")[3];

                    let quantity = Math.ceil(item_3/3)
                    item_3 = parseInt(item_3)-quantity;//让饼图放大
                    container.firstChild?.setAttribute("viewBox",item_1+" "+item_2+" "+item_3+" "+item_4);

                    let g = container.firstChild?.lastChild;//<g transform="translate(535,225)">
                    if(g && g.tagName == "g"){
                      let transform = g.getAttribute("transform");
                      if(transform && transform.startsWith("translate(")){
                        let item_x = transform.split(",")[0];
                        let item_y = transform.split(",")[1];
                        const x_index = item_x.lastIndexOf("(");
                        let x = item_x.substring(x_index+1, item_x.length);
                        let new_x = parseInt(x)-(quantity*2/3);
                        g.setAttribute("transform","translate("+new_x+","+item_y);
                      }
                      
                    }
                  }
                  
                }
                
              }).catch((err) => {
                  console.error(err);
                  const errorDiv = document.querySelector(`#d${id}`);//删除页面底部显示的‘错误关系图’
                  const svg = errorDiv?.innerHTML ?? '';
                  container.innerHTML = svg//将‘错误关系图’插入图表层
                  errorDiv?.remove();
              })
            }
          }, 0);
        })
      })()
    },
    actions: [
      {
        title: locale.mermaid,
        icon: icons.ChartGraph,
        cheatsheet: '```mermaid',
        handler: {
          type: 'dropdown',
          actions: actionItems.map(({ title, code }) => ({
            title,
            handler: {
              type: 'action',
              click({ editor, appendBlock, codemirror }) {
                const { line } = appendBlock('```mermaid\n' + code + '\n```')
                editor.setSelection(
                  codemirror.Pos(line + 1, 0),
                  codemirror.Pos(line + code.split('\n').length)
                )
                editor.focus()
              },
            },
          })),
          ...locale,
        },
      },
    ],
  }
}
