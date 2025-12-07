// AniPFP v3.1 – Vanilla JS Edition (No Imports, Raw Load God Mode for Revenge)
(() => {
  // Self-register plugin (bypasses manifest fetch whine)
  const registerPlugin = (data) => {
    if (window.RevengePlugins) window.RevengePlugins.push(data);
    console.log('%cAniPFP Registered – Ready to spin 😎', 'color: #00ffff; font-size: 14px');
  };
  registerPlugin({
    id: 'anipfp',
    name: 'AniPFP',
    description: 'Animated PFPs + rainbow spin without Nitro. Mods see the drip 🔥',
    version: '3.1.0',
    author: 'realNasser9229',
    enabled: true
  });

  // Grab UserStore via webpack (vanilla style)
  let UserStore;
  const getWebpack = () => {
    const id = Symbol();
    webpackChunkdiscord_app.push([[id], {}, req => { webpackChunkdiscord_app.pop(); UserStore = Object.values(req.c).find(m => m.exports?.getCurrentUser)?.exports; }]);
  };
  getWebpack();

  // Force animated prefix
  const forceAnim = () => {
    const me = UserStore?.getCurrentUser();
    if (me?.avatar && !me.avatar.startsWith('a_')) me.avatar = 'a_' + me.avatar;
  };
  forceAnim();
  setInterval(forceAnim, 10000);

  // Rainbow CSS injection
  const css = `
    @keyframes rainbowSpin {
      0% { border-color: #ff004d; transform: rotate(0deg); }
      16% { border-color: #ff7700; }
      33% { border-color: #ffff00; }
      50% { border-color: #00ff00; }
      66% { border-color: #0099ff; }
      83% { border-color: #9900ff; }
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
  const style = document.createElement('style');
  style.id = 'anipfp-rainbow';
  style.textContent = css;
  document.head.appendChild(style);

  // Patch avatars for GIF
  const patchAvatars = () => {
    document.querySelectorAll('img[src*="avatars/"]').forEach(img => {
      if (img.src.includes('a_') && !img.src.includes('.gif')) {
        img.src = img.src.split('?')[0] + '?size=512.gif';
      }
    });
  };
  patchAvatars();
  const observer = new MutationObserver(patchAvatars);
  observer.observe(document.body, { childList: true, subtree: true });

  // Disable toggle (always on, but clean up if needed)
  const stop = () => {
    observer.disconnect();
    const style = document.getElementById('anipfp-rainbow');
    if (style) style.remove();
  };
  window.AniPFPStop = stop;

  console.log('%cAniPFP v3.1 Loaded – Rainbow aura unlocked eternal 🔥', 'color: #00ffff; font-size: 16px');
})();
