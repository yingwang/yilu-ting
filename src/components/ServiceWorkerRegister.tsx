"use client";

import { useEffect } from "react";
import { withBasePath } from "@/lib/assetPath";

// 注册 service worker，让应用外壳和音频可以离线使用。
// 只在客户端跑一次；注册失败不影响正常在线使用。
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const register = () => {
      navigator.serviceWorker
        .register(withBasePath("/sw.js"), { scope: withBasePath("/") })
        .catch(() => {
          // 注册失败就当作普通在线站点，不打扰用户。
        });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
