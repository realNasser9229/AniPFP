// AniPFP v2.0 — Rainbow Spin + Animated PFP for Revenge (github.io ready)
(() => {
  // Self-register so Revenge shows it in the plugin list
  if (!window.__REVENGE_PLUGINS) window.__REVENGE_PLUGINS = {};
  window.__REVENGE_PLUGINS.anipfp = {
    id: "anipfp",
    name: "AniPFP",
    description: "Animated avatars + rainbow spinning border without Nitro 🔥",
    version: "2.0.0",
    author: "realNasser9229"
  };

  // Grab Discord's UserStore the 2025 way
  let UserStore;
  try {
    const wp = webpackChunkdiscord_app.push([[Symbol()], {}, req => req]);
    webpackChunkdiscord_app.pop();
    UserStore = wp.c[Object.keys(wp.c).find(k => wp.c[k].exports?.getCurrentUser)]?.exports;
  } catch (e) {
    const modules = webpackChunkdiscord_app.push([[Math.random()], {}, r => r]);
    webpackChunkdiscord_app.pop();
    UserStore = Object.values(modules.c).find(m => m?.exports?.getCurrentUser)?.exports;
  }

  // Force animated avatar prefix (the "a_" magic)
  const forceAnim = () => {
    const me = UserStore?.getCurrentUser?.();
    if (me?.avatar && !me.avatar.startsWith?.("a_")) {
      me.avatar = "a_" + me.avatar;
    }
  };
  forceAnim();
  setInterval(forceAnim, 10000);

  // Rainbow spin + glow CSS (pure aura)
  const css = `
    @keyframes rainbowSpin {
      0%   { border-color: #ff004d; transform: rotate(0deg); }
      16%  { border-color: #ff7700; }
      33%  { border-color: #ffff00; }
      50%  { border-color: #00ff00; }
      66%  { border-color: #0099ff; }
      83%  { border-color: #9900ff; }
      100% { border-color: #ff004d; transform: rotate(360deg); }
    }
    img[src*="avatars/"], .avatarHint-*, .avatar-* {
      border: 4px solid !important;
      border-radius: 50% !important;
      animation: rainbowSpin 3s linear infinite !important;
      box-shadow: 0 0 18px #00ffff !important;
    }
    img[src*="avatars/"]:hover { box-shadow: 0 0 35px #00ffff !important; }
  `;

  const style = document.createElement("style");
  style.id = "anipfp-rainbow";
  style.textContent = css;
  document.head.appendChild(style);

  // Force GIF playback on every avatar render
  const patchAvatars = () => {
    document.querySelectorAll('img[src*="avatars/"]').forEach(img => {
      if (img.src.includes("a_") && !img.src.includes(".gif")) {
        img.src = img.src.split("?")[0] + "?size=512#.gif";
      }
    });
  };
  patchAvatars();
  new MutationObserver(patchAvatars).observe(document.body, { childList: true, subtree: true });

  console.log("%cAniPFP Loaded — Your PFP is now spinning with rainbow aura 😎🔥", "color:#00ffff;font-size:18px");
})();
