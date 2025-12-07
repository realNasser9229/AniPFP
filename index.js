// AniPFP v3.0 — Official Revenge Plugin (Manifest Auto-Handled, Pure Spin Aura)
import { definePlugin, findByProps } from '@revenge/api';  // Official API import
import { after } from '@revenge/patcher';  // For safe patches

// Grab UserStore via official finder
const UserStore = findByProps('getCurrentUser');

export default definePlugin({
  id: 'anipfp',
  name: 'AniPFP',
  description: 'Animated profile pictures + rainbow spinning border without Nitro. Mods see the full drip 🔥',
  version: '3.0.0',
  author: 'realNasser9229',

  start() {
    // Force 'a_' prefix for animated PFPs (runs on load)
    const forceAnim = () => {
      const me = UserStore.getCurrentUser();
      if (me?.avatar && !me.avatar.startsWith('a_')) {
        me.avatar = 'a_' + me.avatar;
      }
    };
    forceAnim();
    setInterval(forceAnim, 10000);  // Refresh for profile changes

    // Rainbow spin + glow CSS injection
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
    const style = document.createElement('style');
    style.id = 'anipfp-rainbow';
    style.textContent = css;
    document.head.appendChild(style);

    // Patch avatar renders for GIF force (official after hook)
    after('default', findByProps('Avatar'), (_, __, ret) => {
      if (ret?.props?.src?.includes('a_') && !ret.props.src.includes('.gif')) {
        ret.props.src = ret.props.src.split('?')[0] + '?size=512#.gif';
        ret.props.animated = true;
      }
    });

    // DOM observer for dynamic avatars
    const patchAvatars = () => {
      document.querySelectorAll('img[src*="avatars/"]').forEach(img => {
        if (img.src.includes('a_') && !img.src.includes('.gif')) {
          img.src = img.src.split('?')[0] + '?size=512#.gif';
        }
      });
    };
    patchAvatars();
    const observer = new MutationObserver(patchAvatars);
    observer.observe(document.body, { childList: true, subtree: true });
  },

  stop() {
    // Cleanup for toggles
    const style = document.getElementById('anipfp-rainbow');
    if (style) style.remove();
    console.log('%cAniPFP Stopped — Aura paused 😎', 'color:#ff004d');
  }
});
