import type { BytemdPlugin,BytemdEditorContext } from 'bytemd'
import remarkMentions from '../remark-mentions';
import { queryMentionUser } from '../requestAPI';
import { User } from '@/types';


/**
 * 提及
 * https://github.com/FinnRG/remark-mentions
 * @returns 
 */
export function mention(callback: (id: string,bytemdEditorContext:BytemdEditorContext) => void): BytemdPlugin {
  
  let cacheMentionUserMap = new Map<string,User|null| undefined>();


  return {
    actions: [
      {
        title: '提及',
        icon: '<?xml version="1.0" encoding="UTF-8"?><svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44V44C28.9886 44 33.5507 42.1735 37.0539 39.1529" stroke="#4e5969" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z" fill="none" stroke="#4e5969" stroke-width="4" stroke-linejoin="round"/><path d="M32 24C32 27.3137 34.6863 30 38 30V30C41.3137 30 44 27.3137 44 24" stroke="#4e5969" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 25V16" stroke="#4e5969" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        
        //icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M224 539.136h335.786667a47.701333 47.701333 0 0 1 44.330666 29.866667 48.042667 48.042667 0 0 1 2.730667 27.946666 47.488 47.488 0 0 1-9.984 21.205334 48 48 0 0 1-37.12 17.706666H224a48.128 48.128 0 0 1-30.421333-10.965333 47.701333 47.701333 0 0 1-15.488-23.381333 48.768 48.768 0 0 1 15.488-51.413334 47.957333 47.957333 0 0 1 30.464-10.965333z m386.688 330.538667l-96-265.642667a48.64 48.64 0 0 1 24.32-60.16 47.872 47.872 0 0 1 65.877333 27.093333l96 265.642667a49.322667 49.322667 0 0 1 2.389334 23.338667 48.981333 48.981333 0 0 1-15.061334 28.842666 47.232 47.232 0 0 1-25.173333 12.117334 47.914667 47.914667 0 0 1-52.352-31.232z m-527.786667-33.066667l96-265.642667a48.469333 48.469333 0 0 1 33.706667-30.421333 47.616 47.616 0 0 1 52.693333 22.314667 48.213333 48.213333 0 0 1 6.144 32 48.512 48.512 0 0 1-2.346666 9.173333l-96 265.642667a48.725333 48.725333 0 0 1-20.650667 25.088 47.36 47.36 0 0 1-36.352 5.205333 47.786667 47.786667 0 0 1-34.730667-35.328 48.853333 48.853333 0 0 1 1.536-28.032z m96.042667-265.813333l168.106667-459.52c15.445333-42.197333 74.666667-42.154667 90.112 0.042666l167.68 459.52a49.024 49.024 0 0 1-3.669334 41.173334 48.597333 48.597333 0 0 1-24.832 20.906666 47.872 47.872 0 0 1-61.610666-28.714666L347.050667 144.64 392.106667 128l45.013333 16.725333-168.106667 459.52a48.597333 48.597333 0 0 1-29.269333 28.928 48.128 48.128 0 0 1-36.693333-2.133333 47.872 47.872 0 0 1-24.405334-27.690667 48.512 48.512 0 0 1 0.298667-32.554666zM847.957333 853.333333V128a48 48 0 1 1 96 0v725.333333a48 48 0 0 1-96 0z" fill="#4e5969" ></path></svg>',
        
        position: 'left',
        handler: {
          type: 'action',
          click: (ctx:BytemdEditorContext) => {
            let editorId = ctx.root.parentElement?.getAttribute('editorId');
            if(editorId){
              callback(editorId,ctx);
            }
          }
        }
      }
    ],
    viewerEffect({ markdownBody }) {
      
    }
  }
}

