// AniPFP v3.5 – Works on Revenge 2025 (raw load, no imports, no errors)
(() => {
  // Auto-register so it shows in plugin list
  if (!window.__REVENGE_PLUGINS) window.__REVENGE_PLUGINS = [];
  window.__REVENGE_PLUGINS.push({
    id: "anipfp",
    name: "AniPFP",
    version: "3.5.0",
    author: "realNasser9229"
  });

  // Grab UserStore
  let UserStore;
  try {
    const wp = webpackChunkdiscord_app.push([[Symbol("anipfp")], {}, r => r]);
    webpackChunkdiscord_app.pop();
    UserStore = Object.values(wp.c).find(m => m?.exports?.getCurrentUser)?.exports;
  } catch (e) {}

  // Force a_ prefix
  const forceAnim = () => {
    const me = UserStore?.getCurrentUser?.();
    if (me?.avatar && !me.avatar.startsWith("a_")) {
      me.avatar = "a_" + me.avatar;
    }
  };
  forceAnim();
  setInterval(forceAnim, 8000);

  // Rainbow CSS
  const css = `
    @keyframes rainbowSpin{0%{border-color:#ff004d;transform:rotate(0deg)}100%{border-color:#ff004d;transform:rotate(360deg)}}
    img[src*="avatars/"],.avatarHint-*,[class*="avatar"]{
      border:4px solid!important;
      border-radius:50%!important;
      animation:rainbowSpin 3s linear infinite!important;
      box-shadow:0 0 20px #00ffff!important;
    }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // Force .gif on animated avatars
  const patch = () => document.querySelectorAll('img[src*="avatars/"]').forEach(i => {
    if (i.src.includes("a_") && !i.src.includes(".gif")) {
      i.src = i.src.split("?")[0] + ".gif";
    }
  });
  patch();
  new MutationObserver(patch).observe(document.body, {childList:true,subtree:true});

  console.log("%cAniPFP v3.5 Loaded – Rainbow spinning activated 😎🔥","color:#00ffff;font-size:16px");
})();
