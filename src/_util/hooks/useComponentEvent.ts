import { useComponent } from 'functional-mini/component';
import fmtEvent from '../fmtEvent';

export function useComponentEvent<T>(props: T) {
  const component = useComponent();
  return {
    triggerEvent: (eventName: string, value: unknown, e?: any) => {
      // 首字母大写，然后加上 on

      /// #if ALIPAY
      const alipayCallbackName =
        'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);

      if (props[alipayCallbackName]) {
        props[alipayCallbackName](value, fmtEvent(props, e));
      }
      /// #endif

      /// #if WECHAT
      component.triggerEvent(eventName.toLocaleLowerCase(), value);
      /// #endif
    },

    triggerEventOnly: (eventName: string, e?: any) => {
      // 首字母大写，然后加上 on

      /// #if ALIPAY
      const alipayCallbackName =
        'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);

      if (props[alipayCallbackName]) {
        props[alipayCallbackName](fmtEvent(props, e));
      }
      /// #endif

      /// #if WECHAT
      component.triggerEvent(eventName.toLocaleLowerCase());
      /// #endif
    },

    // 转发 catch 事件
    alipayForwardCatchEvent: (eventName: string, e: any) => {
      // 首字母大写，然后加上 catch

      /// #if ALIPAY
      const alipayCallbackName =
        'catch' + eventName.charAt(0).toUpperCase() + eventName.slice(1);

      if (props[alipayCallbackName]) {
        props[alipayCallbackName](fmtEvent(props, e));
      }
      /// #endif
    },
    // 转发事件
    alipayForwardEvent: (eventName: string, e: any) => {
      // 首字母大写，然后加上 on

      /// #if ALIPAY
      const alipayCallbackName =
        'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);

      if (props[alipayCallbackName]) {
        props[alipayCallbackName](fmtEvent(props, e));
      }
      /// #endif
    },
  };
}
