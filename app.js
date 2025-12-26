import { createApp, onAppShow, onAppHide, onAppError } from "@vue-mini/core";
import { request, get, post, put, del } from "@/utils/request.js";

createApp({
  setup() {
    onAppShow(() => {
      console.log("show");
    });
    onAppHide(() => {
      console.log("hide");
    });
    onAppError(() => {
      console.log("error");
    });

    // 兼容性：也把方法挂到全局 wx 对象，方便在非 page/context 环境下调用
    try {
      if (typeof wx !== "undefined") {
        wx.$request = request;
        wx.$get = get;
        wx.$post = post;
        wx.$put = put;
        wx.$del = del;
      }
    } catch (e) {}

    return {
      // 将请求方法挂载到 App 实例上，方便通过 getApp() 使用
      request,
      get,
      post,
      put,
      del,
    };
  },
});
