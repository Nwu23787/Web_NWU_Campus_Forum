<!-- emoji表情选择器 -->
<template>
    <div ref="emojiPickerRef" ></div>
</template>

<script setup lang="ts">
    import { ref, watchEffect} from 'vue'
    import { Picker } from 'emoji-mart'
    import i18n from "@emoji-mart/data/i18n/zh.json";



    // Emoji picker
    const emojiPickerRef = ref<HTMLElement | null>(null);

   
    //接收父组件消息
    const props = defineProps({
        theme: {//主题
            type: String,
            default: 'auto'
        },
        onEmojiSelect: {//表情符号选择
            type: Function,
            default: null
        },
      //  onClickOutside: {//在选取器外部发生单击时回调
      //      type: Function,
      //      default: null
      //  },
    })  
    

    const handleCreateEmojiPicker = () => {
        const emojiPicker = new Picker({
            data: async () => {
                const data = await import("@emoji-mart/data");
            

                /** 
                //复制浏览器控制台数据解析出emoji字符`<div data-id="nature" class="category"><div class="sticky padding-small align-l">动物与自然</div><div class="relative" style="height: 540px;">......</div></div></div>`
                let html = `<div class="relative" style="height: 36px;"><div data-index="167" class="flex row" style="top: 0px;"><button aria-label="🏁" aria-posinset="1459" aria-setsize="1465" type="button" class="flex flex-center flex-middle" tabindex="-1" style="width: 36px; height: 36px; font-size: 24px; line-height: 0;"><div aria-hidden="true" class="background" style="border-radius: 100%;"></div><span class="emoji-mart-emoji" data-emoji-set="native"><span style="font-size: 24px; font-family: EmojiMart, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Segoe UI&quot;, &quot;Apple Color Emoji&quot;, &quot;Twemoji Mozilla&quot;, &quot;Noto Color Emoji&quot;, &quot;Android Emoji&quot;;">🏁</span></span></button><button aria-label="🎌" aria-posinset="1460" aria-setsize="1465" type="button" class="flex flex-center flex-middle" tabindex="-1" style="width: 36px; height: 36px; font-size: 24px; line-height: 0;"><div aria-hidden="true" class="background" style="border-radius: 100%;"></div><span class="emoji-mart-emoji" data-emoji-set="native"><span style="font-size: 24px; font-family: EmojiMart, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Segoe UI&quot;, &quot;Apple Color Emoji&quot;, &quot;Twemoji Mozilla&quot;, &quot;Noto Color Emoji&quot;, &quot;Android Emoji&quot;;">🎌</span></span></button><button aria-label="🏴‍☠️" aria-posinset="1461" aria-setsize="1465" type="button" class="flex flex-center flex-middle" tabindex="-1" style="width: 36px; height: 36px; font-size: 24px; line-height: 0;"><div aria-hidden="true" class="background" style="border-radius: 100%;"></div><span class="emoji-mart-emoji" data-emoji-set="native"><span style="font-size: 24px; font-family: EmojiMart, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Segoe UI&quot;, &quot;Apple Color Emoji&quot;, &quot;Twemoji Mozilla&quot;, &quot;Noto Color Emoji&quot;, &quot;Android Emoji&quot;;">🏴‍☠️</span></span></button><button aria-label="🏳️‍🌈" aria-posinset="1462" aria-setsize="1465" type="button" class="flex flex-center flex-middle" tabindex="-1" style="width: 36px; height: 36px; font-size: 24px; line-height: 0;"><div aria-hidden="true" class="background" style="border-radius: 100%;"></div><span class="emoji-mart-emoji" data-emoji-set="native"><span style="font-size: 24px; font-family: EmojiMart, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Segoe UI&quot;, &quot;Apple Color Emoji&quot;, &quot;Twemoji Mozilla&quot;, &quot;Noto Color Emoji&quot;, &quot;Android Emoji&quot;;">🏳️‍🌈</span></span></button><button aria-label="🚩" aria-posinset="1463" aria-setsize="1465" type="button" class="flex flex-center flex-middle" tabindex="-1" style="width: 36px; height: 36px; font-size: 24px; line-height: 0;"><div aria-hidden="true" class="background" style="border-radius: 100%;"></div><span class="emoji-mart-emoji" data-emoji-set="native"><span style="font-size: 24px; font-family: EmojiMart, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Segoe UI&quot;, &quot;Apple Color Emoji&quot;, &quot;Twemoji Mozilla&quot;, &quot;Noto Color Emoji&quot;, &quot;Android Emoji&quot;;">🚩</span></span></button><button aria-label="🏴" aria-posinset="1464" aria-setsize="1465" type="button" class="flex flex-center flex-middle" tabindex="-1" style="width: 36px; height: 36px; font-size: 24px; line-height: 0;"><div aria-hidden="true" class="background" style="border-radius: 100%;"></div><span class="emoji-mart-emoji" data-emoji-set="native"><span style="font-size: 24px; font-family: EmojiMart, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Segoe UI&quot;, &quot;Apple Color Emoji&quot;, &quot;Twemoji Mozilla&quot;, &quot;Noto Color Emoji&quot;, &quot;Android Emoji&quot;;">🏴</span></span></button><button aria-label="🏳️" aria-posinset="1465" aria-setsize="1465" type="button" class="flex flex-center flex-middle" tabindex="-1" style="width: 36px; height: 36px; font-size: 24px; line-height: 0;"><div aria-hidden="true" class="background" style="border-radius: 100%;"></div><span class="emoji-mart-emoji" data-emoji-set="native"><span style="font-size: 24px; font-family: EmojiMart, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Segoe UI&quot;, &quot;Apple Color Emoji&quot;, &quot;Twemoji Mozilla&quot;, &quot;Noto Color Emoji&quot;, &quot;Android Emoji&quot;;">🏳️</span></span></button><div style="width: 36px; height: 36px;"></div><div style="width: 36px; height: 36px;"></div></div></div>`


                var dom = document.createElement('div');
				dom.innerHTML = html;
                var liGroup = dom.querySelectorAll('button');
                
                var emojiText = "[";

				for (var j = 0; j< liGroup.length; j++) {
					var item =  liGroup[j];
                    emojiText += "'"+item.getAttribute('aria-label')+"',";
			   	}
                //删除最后一个逗号
                let index = emojiText.lastIndexOf(',');
                emojiText = emojiText.substring(0,index ) + emojiText.substring(index+1,emojiText.length);
                emojiText += ']';

                console.log(emojiText);
                */
                return Object.assign({}, data);
            },
            
            autoFocus: false,//自动焦点
            skinTonePosition:'none',//肤色选择器的位置
            i18n: i18n,//用于选取器的本地化数据
           // onEmojiSelect: onEmojiSelect,//表情符号选择
           // onClickOutside: onClickOutside,//在选取器外部发生单击时回调
            ...props,
        });


        emojiPickerRef.value?.appendChild(emojiPicker as unknown as Node);
    };

    //表情符号选择
    const onEmojiSelect = (emoji: { native: string }) => {
        console.log("选中",emoji.native)
       
    };

    //在选取器外部发生单击时回调
    const onClickOutside = (e:Event) => {
       
       
    };



    watchEffect(() => {
        if (emojiPickerRef.value) {
            handleCreateEmojiPicker();
        }
    });
   
</script>

<style scoped lang="scss">
//参考https://github.com/missive/emoji-mart/blob/main/packages/emoji-mart-website/example-custom-styles.html
//源代码https://github.com/missive/emoji-mart/blob/d29728f7b4e295e46f9b64aa80335aa4a3c15b8e/packages/emoji-mart/src/components/Picker/PickerStyles.scss#L4
:deep(em-emoji-picker) {
    --rgb-accent: 64,158,255;//图标、输入框边框颜色
   // --rgb-background: 262, 240, 283;//面板背景颜色
    --rgb-color: 39,46,59;//字体颜色
    --rgb-input: 255,255,255;//输入框焦点背景颜色

    --color-border:rgb(247,248,250);//输入框背景颜色
}
</style>
