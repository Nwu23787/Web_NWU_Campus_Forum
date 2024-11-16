import type { Directive, DirectiveBinding } from "vue";
/**
 * 
 * 延迟加载标签
 * 标签出现在可视区时才加载
 */
const vLazyTag: Directive<HTMLImageElement, string> = {
  // 在指令绑定之前调用
  //created() {},
  // 在元素被插入到页面前调用
  //beforeMount() {},
  // 在绑定元素的父组件和子元素都加载完成后调用
  //mounted() {},
  // 绑定元素的父组件更新前调用
  //beforeUpdate() {},
  // 绑定元素的父组件和子元素都更新完成后调用
  //updated() {},
  // 绑定元素的父组件销毁前调用
  //beforeUnmount() {},
  // 绑定元素的父组件销毁后调用
  //unmounted() {}

  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      // 目标元素与根元素相交
      if (isIntersecting) {
        binding.value();
        observer.unobserve(el);
      }
    });
    observer.observe(el);
  },
};
export default vLazyTag;