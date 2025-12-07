// AniPFP v2.1 — Manifest-Free Edition (Edits Out the Fetch BS for Pure Spin)
// Force raw serve for Pages – no Jekyll interference
if (location.hostname.endsWith('.github.io')) { document.write(atob('your_base64_js_here')); } else { /* original code */ }
(() => {
  // Force plugin registration without manifest fetch (swag hack for picky loaders)
  try {
    if (window.Revenge && window.Revenge.registerPlugin) {
      window.Revenge.registerPlugin({
        id: "anipfp",
        name: "AniPFP",
        description: "Animated PFPs + rainbow spin without Nitro. No manifest needed 🔥",
        version: "2.1.0",
        author: "realNasser9229",
        start: startPlugin,
        stop: stopPlugin
      });
    } else if (window.__REVENGE_PLUGINS) {
      window.__REVENGE_PLUGINS.anipfp = { id: "anipfp", name: "AniPFP", version: "2.1.0", author: "Nas9229alt" };
    }
  } catch (e) {
    console.warn("AniPFP reg skipped—still spinning tho 😈", e);
  }

  let UserStore, observer, style;
  const startPlugin = () => {
    // Grab UserStore (2025 webpack flex)
    let wp;
    try {
      wp = webpackChunkdiscord_app.push([[Symbol()], {}, req => req]);
      webpackChunkdiscord_app.pop();
      UserStore = wp.c[Object.keys(wp.c).find(k => wp.c[k].exports?.getCurrentUser)]?.exports;
    } catch (e) {
      const modules = webpackChunkdiscord_app.push([[Math.random()], {}, r => r]);
      webpackChunkdiscord_app.pop();
      UserStore = Object.values(modules.c).find(m => m?.exports?.getCurrentUser)?.exports;
    }

    // Force 'a_' prefix for animated PFPs
    const forceAnim = () => {
      const me = UserStore?.getCurrentUser?.();
      if (me?.avatar && !me.avatar.startsWith("a_")) {
        me.avatar = "a_" + me.avatar;
      }
    };
    forceAnim();
    setInterval(forceAnim, 10000);

    // Rainbow CSS injection
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
    style = document.createElement("style");
    style.id = "anipfp-rainbow";
    style.textContent = css;
    document.head.appendChild(style);

    // Patch avatars for GIF force
    const patchAvatars = () => {
      document.querySelectorAll('img[src*="avatars/"]').forEach(img => {
        if (img.src.includes("a_") && !img.src.includes(".gif")) {
          img.src = img.src.split("?")[0] + "?size=512#.gif";
        }
      });
    };
    patchAvatars();
    observer = new MutationObserver(patchAvatars);
    observer.observe(document.body, { childList: true, subtree: true });

    console.log("%cAniPFP v2.1 Loaded — Manifest bypassed, spinning eternal 😎🔥", "color:#00ffff;font-size:18px");
  };

  const stopPlugin = () => {
    if (observer) observer.disconnect();
    if (style) style.remove();
    console.log("%cAniPFP Stopped — Aura paused", "color:#ff004d");
  };

  // Auto-start if no reg
  if (!window.Revenge || !window.Revenge.registerPlugin) startPlugin();
})();
