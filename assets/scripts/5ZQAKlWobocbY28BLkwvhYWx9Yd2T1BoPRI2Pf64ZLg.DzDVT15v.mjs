import { t as e } from "./rolldown-runtime.owwqI7_v.mjs";
import {
  A as t,
  I as n,
  M as r,
  N as i,
  T as a,
  _ as o,
  b as s,
  c,
  d as l,
  l as ee,
  u,
} from "./react.DWVK6Hs3.mjs";
import { a as d, r as f, t as p, w as m } from "./motion.Ba3seIyO.mjs";
import {
  D as h,
  Dt as g,
  Et as _,
  F as v,
  H as y,
  N as b,
  O as x,
  P as S,
  St as C,
  T as w,
  Tt as T,
  U as E,
  V as D,
  Y as O,
  _t as k,
  a as A,
  b as j,
  ct as M,
  dt as N,
  f as P,
  g as F,
  gt as I,
  i as L,
  k as R,
  kt as z,
  o as B,
  pt as te,
  u as ne,
  ut as re,
  wt as V,
} from "./framer.BxrQ5zMf.mjs";
import { n as ie, t as H } from "./KHQgVYK_f.B2rxstSH.mjs";
import {
  a as ae,
  i as oe,
  n as se,
  o as ce,
  r as le,
  t as ue,
} from "./Countdown.BHY_bPvv.mjs";
import { n as de, t as fe } from "./Badge.slUoJMmD.mjs";
import { n as pe, t as me } from "./SmoothScroll_Prod.CGTqMwA8.mjs";
import { n as he, t as ge } from "./LpQMHSxlP.njJZqqIe.mjs";
import { n as _e, r as ve } from "./bmdQ7AEa3.CVsW3eyV.mjs";
function ye(e) {
  return (t) =>
    l(ee, {
      children: [
        u(`style`, {
          children: `
            /* Hide the Made with Framer badge */
            #__framer-badge-container { display: none !important; }

            /* Hide the Framer edit bar */
            #__framer-editorbar-container { display: none !important; }
            #__framer-editorbar { display: none !important; }
          `,
        }),
        u(e, { ...t }),
      ],
    });
}
var be = e(() => {
  c();
});
function xe(e, ...t) {
  let n = {};
  return (t?.forEach((t) => t && Object.assign(n, e[t])), n);
}
var Se,
  Ce,
  we,
  Te,
  Ee,
  De,
  Oe,
  ke,
  Ae,
  je,
  Me,
  Ne,
  Pe,
  Fe,
  Ie,
  U,
  Le,
  Re = e(() => {
    (c(),
      O(),
      p(),
      a(),
      (Se = g(P)),
      (Ce = [`AD4OFSl8W`, `Hkr_qJ0Y2`]),
      (we = `framer-UPjzv`),
      (Te = { AD4OFSl8W: `framer-v-17fhq4r`, Hkr_qJ0Y2: `framer-v-1rpqnfo` }),
      (Ee = { bounce: 0.2, delay: 0, duration: 0.4, type: `spring` }),
      (De = {
        delay: 0,
        duration: 10,
        ease: [0.44, 0, 0.56, 1],
        type: `tween`,
      }),
      (Oe = {
        opacity: 1,
        rotate: 365,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        skewX: 0,
        skewY: 0,
        x: 0,
        y: 0,
      }),
      (ke = (e, t) => `translateX(-50%) ${t}`),
      (Ae = (e, t) => `translate(-50%, -50%) ${t}`),
      (je = (e, t) => `translateY(-50%) ${t}`),
      (Me = ({ value: e, children: t }) => {
        let n = r(d),
          a = e ?? n.transition,
          o = i(() => ({ ...n, transition: a }), [JSON.stringify(a)]);
        return u(d.Provider, { value: o, children: t });
      }),
      (Ne = m.create(n)),
      (Pe = { "CTA - Desktop": `AD4OFSl8W`, "CTA - Phone": `Hkr_qJ0Y2` }),
      (Fe = ({ height: e, id: t, location: n, width: r, ...i }) => ({
        ...i,
        Q8mzaMJPJ: n ?? i.Q8mzaMJPJ,
        variant: Pe[i.variant] ?? i.variant ?? `AD4OFSl8W`,
      })),
      (Ie = (e, t) =>
        e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`)),
      (U = T(
        o(function (e, r) {
          let i = t(null),
            a = r ?? i,
            o = s(),
            { activeLocale: c, setLocale: ee } = I(),
            d = M(),
            {
              style: p,
              className: h,
              layoutId: g,
              variant: _,
              Q8mzaMJPJ: v,
              ...y
            } = Fe(e),
            {
              baseVariant: x,
              classNames: S,
              clearLoadingGesture: C,
              gestureHandlers: T,
              gestureVariant: D,
              isLoading: O,
              setGestureState: k,
              setVariant: A,
              variants: j,
            } = V({
              cycleOrder: Ce,
              defaultVariant: `AD4OFSl8W`,
              ref: a,
              variant: _,
              variantClassNames: Te,
            }),
            N = Ie(e, j),
            L = b(we),
            R = () => x !== `Hkr_qJ0Y2`,
            z = () => x === `Hkr_qJ0Y2`;
          return u(f, {
            id: g ?? o,
            children: u(Ne, {
              animate: j,
              initial: !1,
              children: u(Me, {
                value: Ee,
                children: l(m.div, {
                  ...y,
                  ...T,
                  className: b(L, `framer-17fhq4r`, h, S),
                  "data-framer-name": `CTA - Desktop`,
                  layoutDependency: N,
                  layoutId: `AD4OFSl8W`,
                  ref: a,
                  style: { ...p },
                  ...xe(
                    { Hkr_qJ0Y2: { "data-framer-name": `CTA - Phone` } },
                    x,
                    D,
                  ),
                  children: [
                    R() &&
                      u(Se, {
                        __framer__loop: Oe,
                        __framer__loopEffectEnabled: !0,
                        __framer__loopPauseOffscreen: !0,
                        __framer__loopRepeatDelay: 0,
                        __framer__loopRepeatType: `mirror`,
                        __framer__loopTransition: De,
                        __framer__styleTransformEffectEnabled: !0,
                        __framer__transformTargets: [
                          {
                            target: {
                              opacity: 1,
                              rotate: 1002,
                              rotateX: 0,
                              rotateY: 0,
                              scale: 1,
                              skewX: 0,
                              skewY: 0,
                              x: 0,
                              y: 0,
                            },
                          },
                          {
                            target: {
                              opacity: 1,
                              rotate: 0,
                              rotateX: 0,
                              rotateY: 0,
                              scale: 1,
                              skewX: 0,
                              skewY: 0,
                              x: 0,
                              y: 0,
                            },
                          },
                        ],
                        __framer__transformTrigger: `onScroll`,
                        __perspectiveFX: !1,
                        __smartComponentFX: !0,
                        __targetOpacity: 1,
                        background: {
                          alt: ``,
                          fit: `fill`,
                          loading: E((d?.y || 0) + 0),
                          pixelHeight: 2168,
                          pixelWidth: 2168,
                          sizes: `max(${d?.width || `100vw`}, 1px)`,
                          src: `./assets/images/j8rC7lVmTCtjwjX0xagtMTxz38-4d777edb.png`,
                          srcSet: `./assets/images/j8rC7lVmTCtjwjX0xagtMTxz38-07c562c2.png 512w,./assets/images/j8rC7lVmTCtjwjX0xagtMTxz38-cc2c2d8f.png 1024w,./assets/images/j8rC7lVmTCtjwjX0xagtMTxz38-11e9e282.png 2048w,./assets/images/j8rC7lVmTCtjwjX0xagtMTxz38-4d777edb.png 2168w`,
                        },
                        className: `framer-1rfoo3n`,
                        layoutDependency: N,
                        layoutId: `LiNqDY3AB`,
                      }),
                    R() &&
                      u(P, {
                        background: {
                          alt: ``,
                          fit: `fill`,
                          loading: E((d?.y || 0) + (d?.height || 614) - 543),
                          pixelHeight: 1814,
                          pixelWidth: 1814,
                          sizes: `471px`,
                          src: `./assets/images/gpuyLKzQFz8PbRrE1RR3LfnRWw-2d80b18c.png`,
                          srcSet: `./assets/images/gpuyLKzQFz8PbRrE1RR3LfnRWw-f8ff3cd6.png 512w,./assets/images/gpuyLKzQFz8PbRrE1RR3LfnRWw-084b1cbe.png 1024w,./assets/images/gpuyLKzQFz8PbRrE1RR3LfnRWw-2d80b18c.png 1814w`,
                        },
                        className: `framer-1xbqr8h`,
                        layoutDependency: N,
                        layoutId: `VKeRa5hMe`,
                        transformTemplate: ke,
                      }),
                    R() &&
                      l(m.div, {
                        className: `framer-1x47j3y`,
                        layoutDependency: N,
                        layoutId: `DRm74Zv8f`,
                        transformTemplate: Ae,
                        children: [
                          u(w, {
                            __fromCanvasComponent: !0,
                            children: l(n, {
                              children: [
                                u(m.p, {
                                  style: {
                                    "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                    "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                    "--framer-font-size": `50px`,
                                    "--framer-line-height": `64%`,
                                    "--framer-text-alignment": `center`,
                                    "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                  },
                                  children: `See the`,
                                }),
                                u(m.p, {
                                  style: {
                                    "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                    "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                    "--framer-font-size": `50px`,
                                    "--framer-line-height": `64%`,
                                    "--framer-text-alignment": `center`,
                                    "--framer-text-color": `var(--extracted-2gxw0f, rgb(172, 149, 69))`,
                                  },
                                  children: `route`,
                                }),
                              ],
                            }),
                            className: `framer-h9wqbf`,
                            "data-framer-name": `See the route`,
                            fonts: [`GF;Cormorant Upright-regular`],
                            layoutDependency: N,
                            layoutId: `oOnTTL7sl`,
                            style: {
                              "--extracted-2gxw0f": `rgb(172, 149, 69)`,
                              "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                              "--framer-paragraph-spacing": `0px`,
                            },
                            verticalAlignment: `top`,
                            withExternalLayout: !0,
                          }),
                          u(w, {
                            __fromCanvasComponent: !0,
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                                  "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                                  "--framer-font-size": `17px`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `Click to open the map`,
                              }),
                            }),
                            className: `framer-45zct4`,
                            "data-framer-name": `Click to open the map`,
                            fonts: [`GF;Cormorant-regular`],
                            layoutDependency: N,
                            layoutId: `dAFY1Xhp3`,
                            style: {
                              "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                              "--framer-paragraph-spacing": `0px`,
                            },
                            verticalAlignment: `top`,
                            withExternalLayout: !0,
                          }),
                          u(F, {
                            href: v,
                            motionChild: !0,
                            nodeId: `lLSpy50DJ`,
                            openInNewTab: !1,
                            scopeId: `GIpJshyu2`,
                            children: u(P, {
                              as: `a`,
                              background: {
                                alt: ``,
                                fit: `fill`,
                                loading: E(
                                  (d?.y || 0) +
                                    ((d?.height || 614) * 0.5879478827361566 -
                                      245) +
                                    0 +
                                    442,
                                ),
                                pixelHeight: 586,
                                pixelWidth: 585,
                                sizes: `45px`,
                                src: `./assets/images/FMx33N0QNZEN9o98413jFSazlw-8f5d11ef.png`,
                                srcSet: `./assets/images/FMx33N0QNZEN9o98413jFSazlw-8f5d11ef.png 585w`,
                              },
                              className: `framer-okxxtm framer-111vxxt`,
                              "data-framer-name": `ChatGPT Image Aug 20, 2025 at 01_02_57 PM 1`,
                              layoutDependency: N,
                              layoutId: `lLSpy50DJ`,
                            }),
                          }),
                        ],
                      }),
                    z() &&
                      u(Se, {
                        __framer__loop: Oe,
                        __framer__loopEffectEnabled: !0,
                        __framer__loopPauseOffscreen: !0,
                        __framer__loopRepeatDelay: 0,
                        __framer__loopRepeatType: `mirror`,
                        __framer__loopTransition: De,
                        __framer__styleTransformEffectEnabled: !0,
                        __framer__transformTargets: [
                          {
                            target: {
                              opacity: 1,
                              rotate: 1002,
                              rotateX: 0,
                              rotateY: 0,
                              scale: 1,
                              skewX: 0,
                              skewY: 0,
                              x: 0,
                              y: 0,
                            },
                          },
                          {
                            target: {
                              opacity: 1,
                              rotate: 0,
                              rotateX: 0,
                              rotateY: 0,
                              scale: 1,
                              skewX: 0,
                              skewY: 0,
                              x: 0,
                              y: 0,
                            },
                          },
                        ],
                        __framer__transformTrigger: `onScroll`,
                        __perspectiveFX: !1,
                        __smartComponentFX: !0,
                        __targetOpacity: 1,
                        background: {
                          alt: ``,
                          fit: `fill`,
                          pixelHeight: 2168,
                          pixelWidth: 2168,
                          src: `./assets/images/j8rC7lVmTCtjwjX0xagtMTxz38-4d777edb.png`,
                          srcSet: `./assets/images/j8rC7lVmTCtjwjX0xagtMTxz38-07c562c2.png 512w,./assets/images/j8rC7lVmTCtjwjX0xagtMTxz38-cc2c2d8f.png 1024w,./assets/images/j8rC7lVmTCtjwjX0xagtMTxz38-11e9e282.png 2048w,./assets/images/j8rC7lVmTCtjwjX0xagtMTxz38-4d777edb.png 2168w`,
                        },
                        className: `framer-1lf3cb8`,
                        layoutDependency: N,
                        layoutId: `UCD6PP0qK`,
                        ...xe(
                          {
                            Hkr_qJ0Y2: {
                              background: {
                                alt: ``,
                                fit: `fill`,
                                loading: E((d?.y || 0) + 0),
                                pixelHeight: 2168,
                                pixelWidth: 2168,
                                sizes: `max(${d?.width || `100vw`}, 1px)`,
                                src: `./assets/images/j8rC7lVmTCtjwjX0xagtMTxz38-4d777edb.png`,
                                srcSet: `./assets/images/j8rC7lVmTCtjwjX0xagtMTxz38-07c562c2.png 512w,./assets/images/j8rC7lVmTCtjwjX0xagtMTxz38-cc2c2d8f.png 1024w,./assets/images/j8rC7lVmTCtjwjX0xagtMTxz38-11e9e282.png 2048w,./assets/images/j8rC7lVmTCtjwjX0xagtMTxz38-4d777edb.png 2168w`,
                              },
                            },
                          },
                          x,
                          D,
                        ),
                      }),
                    z() &&
                      u(P, {
                        background: {
                          alt: ``,
                          fit: `fill`,
                          pixelHeight: 1814,
                          pixelWidth: 1814,
                          src: `./assets/images/gpuyLKzQFz8PbRrE1RR3LfnRWw-2d80b18c.png`,
                          srcSet: `./assets/images/gpuyLKzQFz8PbRrE1RR3LfnRWw-f8ff3cd6.png 512w,./assets/images/gpuyLKzQFz8PbRrE1RR3LfnRWw-084b1cbe.png 1024w,./assets/images/gpuyLKzQFz8PbRrE1RR3LfnRWw-2d80b18c.png 1814w`,
                        },
                        className: `framer-cerns0`,
                        layoutDependency: N,
                        layoutId: `pViqi4SwM`,
                        transformTemplate: ke,
                        ...xe(
                          {
                            Hkr_qJ0Y2: {
                              background: {
                                alt: ``,
                                fit: `fill`,
                                loading: E((d?.y || 0) + 104),
                                pixelHeight: 1814,
                                pixelWidth: 1814,
                                sizes: (d?.height || 614) - 208,
                                src: `./assets/images/gpuyLKzQFz8PbRrE1RR3LfnRWw-2d80b18c.png`,
                                srcSet: `./assets/images/gpuyLKzQFz8PbRrE1RR3LfnRWw-f8ff3cd6.png 512w,./assets/images/gpuyLKzQFz8PbRrE1RR3LfnRWw-084b1cbe.png 1024w,./assets/images/gpuyLKzQFz8PbRrE1RR3LfnRWw-2d80b18c.png 1814w`,
                              },
                            },
                          },
                          x,
                          D,
                        ),
                      }),
                    z() &&
                      l(m.div, {
                        className: `framer-e2j74m`,
                        layoutDependency: N,
                        layoutId: `g04Hzi9pU`,
                        transformTemplate: je,
                        children: [
                          u(w, {
                            __fromCanvasComponent: !0,
                            children: l(n, {
                              children: [
                                u(m.p, {
                                  style: {
                                    "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                    "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                    "--framer-font-size": `70px`,
                                    "--framer-line-height": `64%`,
                                    "--framer-text-alignment": `center`,
                                    "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                  },
                                  children: `See the`,
                                }),
                                u(m.p, {
                                  style: {
                                    "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                    "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                    "--framer-font-size": `70px`,
                                    "--framer-line-height": `64%`,
                                    "--framer-text-alignment": `center`,
                                    "--framer-text-color": `var(--extracted-2gxw0f, rgb(172, 149, 69))`,
                                  },
                                  children: `route`,
                                }),
                              ],
                            }),
                            className: `framer-1q2lvqg`,
                            "data-framer-name": `See the route`,
                            fonts: [`GF;Cormorant Upright-regular`],
                            layoutDependency: N,
                            layoutId: `GPUFcSMGd`,
                            style: {
                              "--extracted-2gxw0f": `rgb(172, 149, 69)`,
                              "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                              "--framer-paragraph-spacing": `0px`,
                            },
                            verticalAlignment: `top`,
                            withExternalLayout: !0,
                          }),
                          u(w, {
                            __fromCanvasComponent: !0,
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                                  "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                                  "--framer-font-size": `20px`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `Click to open the map`,
                              }),
                            }),
                            className: `framer-16ybz0w`,
                            "data-framer-name": `Click to open the map`,
                            fonts: [`GF;Cormorant-regular`],
                            layoutDependency: N,
                            layoutId: `PHmEDaEPF`,
                            style: {
                              "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                              "--framer-paragraph-spacing": `0px`,
                            },
                            verticalAlignment: `top`,
                            withExternalLayout: !0,
                          }),
                          u(P, {
                            background: {
                              alt: ``,
                              fit: `fill`,
                              pixelHeight: 586,
                              pixelWidth: 585,
                              sizes: `88px`,
                              src: `./assets/images/FMx33N0QNZEN9o98413jFSazlw-8f5d11ef.png`,
                              srcSet: `./assets/images/FMx33N0QNZEN9o98413jFSazlw-8f5d11ef.png 585w`,
                            },
                            className: `framer-affitz`,
                            "data-framer-name": `ChatGPT Image Aug 20, 2025 at 01_02_57 PM 1`,
                            layoutDependency: N,
                            layoutId: `zyVEKQEHL`,
                            ...xe(
                              {
                                Hkr_qJ0Y2: {
                                  background: {
                                    alt: ``,
                                    fit: `fill`,
                                    loading: E(
                                      (d?.y || 0) +
                                        ((d?.height || 614) *
                                          0.6058631921824107 -
                                          349.5) +
                                        0 +
                                        606,
                                    ),
                                    pixelHeight: 586,
                                    pixelWidth: 585,
                                    sizes: `88px`,
                                    src: `./assets/images/FMx33N0QNZEN9o98413jFSazlw-8f5d11ef.png`,
                                    srcSet: `./assets/images/FMx33N0QNZEN9o98413jFSazlw-8f5d11ef.png 585w`,
                                  },
                                },
                              },
                              x,
                              D,
                            ),
                          }),
                        ],
                      }),
                  ],
                }),
              }),
            }),
          });
        }),
        [
          `@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`,
          `.framer-UPjzv.framer-111vxxt, .framer-UPjzv .framer-111vxxt { display: block; }`,
          `.framer-UPjzv.framer-17fhq4r { align-content: flex-start; align-items: flex-start; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: 614px; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 614px; }`,
          `.framer-UPjzv .framer-1rfoo3n, .framer-UPjzv .framer-1lf3cb8 { flex: 1 0 0px; height: 100%; position: relative; width: 1px; }`,
          `.framer-UPjzv .framer-1xbqr8h { aspect-ratio: 1 / 1; bottom: 72px; flex: none; height: var(--framer-aspect-ratio-supported, 471px); left: 50%; position: absolute; width: 471px; z-index: 1; }`,
          `.framer-UPjzv .framer-1x47j3y { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; left: 50%; overflow: visible; padding: 0px; position: absolute; top: 59%; width: 321px; z-index: 1; }`,
          `.framer-UPjzv .framer-h9wqbf, .framer-UPjzv .framer-1q2lvqg { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 321px; word-break: break-word; word-wrap: break-word; }`,
          `.framer-UPjzv .framer-45zct4 { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 170px; word-break: break-word; word-wrap: break-word; }`,
          `.framer-UPjzv .framer-okxxtm { flex: none; height: 48px; position: relative; text-decoration: none; width: 45px; }`,
          `.framer-UPjzv .framer-cerns0 { aspect-ratio: 1 / 1; bottom: 104px; flex: none; left: 50%; position: absolute; top: 104px; width: var(--framer-aspect-ratio-supported, 406px); z-index: 1; }`,
          `.framer-UPjzv .framer-e2j74m { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 19px; height: min-content; justify-content: center; left: 153px; overflow: visible; padding: 0px; position: absolute; right: 154px; top: 61%; z-index: 1; }`,
          `.framer-UPjzv .framer-16ybz0w { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 263px; word-break: break-word; word-wrap: break-word; }`,
          `.framer-UPjzv .framer-affitz { flex: none; height: 93px; position: relative; width: 88px; }`,
          `.framer-UPjzv.framer-v-1rpqnfo.framer-17fhq4r { aspect-ratio: 1 / 1; height: var(--framer-aspect-ratio-supported, 614px); }`,
        ],
        `framer-UPjzv`,
      )),
      (Le = U),
      (U.displayName = `CTA`),
      (U.defaultProps = { height: 614, width: 614 }),
      R(U, {
        variant: {
          options: [`AD4OFSl8W`, `Hkr_qJ0Y2`],
          optionTitles: [`CTA - Desktop`, `CTA - Phone`],
          title: `Variant`,
          type: B.Enum,
        },
        Q8mzaMJPJ: {
          description: `Enter the link of venue location above.

Find more templates on dvites.com`,
          title: `Location`,
          type: B.Link,
        },
      }),
      x(
        U,
        [
          {
            explicitInter: !0,
            fonts: [
              {
                family: `Cormorant Upright`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/VuJrdM3I2Y35poFONtLdafkUCHw1y2vQjjTkeMnz.woff2`,
                weight: `400`,
              },
              {
                family: `Cormorant`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFhFTQ7Fg7A2uwYs.woff2`,
                weight: `400`,
              },
            ],
          },
        ],
        { supportsExplicitInterCodegen: !0 },
      ));
  });
function ze(e, ...t) {
  let n = {};
  return (t?.forEach((t) => t && Object.assign(n, e[t])), n);
}
var Be,
  Ve,
  He,
  Ue,
  We,
  Ge,
  Ke,
  qe,
  Je,
  Ye,
  Xe,
  Ze,
  Qe,
  W,
  $e,
  et = e(() => {
    (c(),
      O(),
      p(),
      a(),
      (Be = g(P)),
      (Ve = [`mGwaLAHxf`, `A8vBviT_L`]),
      (He = `framer-KZI34`),
      (Ue = { A8vBviT_L: `framer-v-1bow8se`, mGwaLAHxf: `framer-v-z4jdiw` }),
      (We = { bounce: 0.2, delay: 0, duration: 0.4, type: `spring` }),
      (Ge = {
        delay: 0,
        duration: 10,
        ease: [0.44, 0, 0.56, 1],
        type: `tween`,
      }),
      (Ke = {
        opacity: 1,
        rotate: 365,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        skewX: 0,
        skewY: 0,
        x: 0,
        y: 0,
      }),
      (qe = (e, t) => `translateY(-50%) ${t}`),
      (Je = ({ value: e, children: t }) => {
        let n = r(d),
          a = e ?? n.transition,
          o = i(() => ({ ...n, transition: a }), [JSON.stringify(a)]);
        return u(d.Provider, { value: o, children: t });
      }),
      (Ye = m.create(n)),
      (Xe = { Desktop: `mGwaLAHxf`, Phone: `A8vBviT_L` }),
      (Ze = ({ height: e, id: t, whatsApp: n, width: r, ...i }) => ({
        ...i,
        Sgtzk03RS: n ?? i.Sgtzk03RS,
        variant: Xe[i.variant] ?? i.variant ?? `mGwaLAHxf`,
      })),
      (Qe = (e, t) =>
        e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`)),
      (W = T(
        o(function (e, r) {
          let i = t(null),
            a = r ?? i,
            o = s(),
            { activeLocale: c, setLocale: ee } = I(),
            d = M(),
            {
              style: p,
              className: h,
              layoutId: g,
              variant: _,
              Sgtzk03RS: v,
              ...y
            } = Ze(e),
            {
              baseVariant: x,
              classNames: S,
              clearLoadingGesture: C,
              gestureHandlers: T,
              gestureVariant: D,
              isLoading: O,
              setGestureState: k,
              setVariant: A,
              variants: j,
            } = V({
              cycleOrder: Ve,
              defaultVariant: `mGwaLAHxf`,
              ref: a,
              variant: _,
              variantClassNames: Ue,
            }),
            N = Qe(e, j),
            L = b(He);
          return u(f, {
            id: g ?? o,
            children: u(Ye, {
              animate: j,
              initial: !1,
              children: u(Je, {
                value: We,
                children: l(m.div, {
                  ...y,
                  ...T,
                  className: b(L, `framer-z4jdiw`, h, S),
                  "data-framer-name": `Desktop`,
                  layoutDependency: N,
                  layoutId: `mGwaLAHxf`,
                  ref: a,
                  style: { ...p },
                  ...ze({ A8vBviT_L: { "data-framer-name": `Phone` } }, x, D),
                  children: [
                    u(Be, {
                      __framer__loop: Ke,
                      __framer__loopEffectEnabled: !0,
                      __framer__loopPauseOffscreen: !0,
                      __framer__loopRepeatDelay: 0,
                      __framer__loopRepeatType: `mirror`,
                      __framer__loopTransition: Ge,
                      __framer__styleTransformEffectEnabled: !0,
                      __framer__transformTargets: [
                        {
                          target: {
                            opacity: 1,
                            rotate: 1002,
                            rotateX: 0,
                            rotateY: 0,
                            scale: 1,
                            skewX: 0,
                            skewY: 0,
                            x: 0,
                            y: 0,
                          },
                        },
                        {
                          target: {
                            opacity: 1,
                            rotate: 0,
                            rotateX: 0,
                            rotateY: 0,
                            scale: 1,
                            skewX: 0,
                            skewY: 0,
                            x: 0,
                            y: 0,
                          },
                        },
                      ],
                      __framer__transformTrigger: `onScroll`,
                      __perspectiveFX: !1,
                      __smartComponentFX: !0,
                      __targetOpacity: 1,
                      background: {
                        alt: ``,
                        fit: `fill`,
                        loading: E(
                          (d?.y || 0) +
                            (0 +
                              ((d?.height || 614) -
                                0 -
                                ((d?.height || 614) - 0) * 1) /
                                2),
                        ),
                        pixelHeight: 2168,
                        pixelWidth: 2168,
                        sizes: `max(${d?.width || `100vw`}, 1px)`,
                        src: `./assets/images/hs1j6Q8y9Mo9x9ueuW8MFIfK4-332c0f40.png`,
                        srcSet: `./assets/images/hs1j6Q8y9Mo9x9ueuW8MFIfK4-dbe60b8e.png 512w,./assets/images/hs1j6Q8y9Mo9x9ueuW8MFIfK4-39e717ad.png 1024w,./assets/images/hs1j6Q8y9Mo9x9ueuW8MFIfK4-3f1bb607.png 2048w,./assets/images/hs1j6Q8y9Mo9x9ueuW8MFIfK4-332c0f40.png 2168w`,
                      },
                      className: `framer-lh7shp`,
                      layoutDependency: N,
                      layoutId: `qGs78psCj`,
                    }),
                    u(P, {
                      background: {
                        alt: ``,
                        fit: `fill`,
                        loading: E((d?.y || 0) + 71),
                        pixelHeight: 1814,
                        pixelWidth: 1814,
                        sizes: `471px`,
                        src: `./assets/images/KBiow1jmaeWHazxshSNGQ08lvw-a9aef46e.png`,
                        srcSet: `./assets/images/KBiow1jmaeWHazxshSNGQ08lvw-511887d6.png 512w,./assets/images/KBiow1jmaeWHazxshSNGQ08lvw-4ce142d6.png 1024w,./assets/images/KBiow1jmaeWHazxshSNGQ08lvw-a9aef46e.png 1814w`,
                      },
                      className: `framer-j9782a`,
                      "data-framer-name": `CTA 2`,
                      layoutDependency: N,
                      layoutId: `kGfKP8rjU`,
                      ...ze(
                        {
                          A8vBviT_L: {
                            background: {
                              alt: ``,
                              fit: `fill`,
                              loading: E(
                                (d?.y || 0) + (d?.height || 614) - 510,
                              ),
                              pixelHeight: 1814,
                              pixelWidth: 1814,
                              sizes: `calc(${d?.width || `100vw`} - 208px)`,
                              src: `./assets/images/KBiow1jmaeWHazxshSNGQ08lvw-a9aef46e.png`,
                              srcSet: `./assets/images/KBiow1jmaeWHazxshSNGQ08lvw-511887d6.png 512w,./assets/images/KBiow1jmaeWHazxshSNGQ08lvw-4ce142d6.png 1024w,./assets/images/KBiow1jmaeWHazxshSNGQ08lvw-a9aef46e.png 1814w`,
                            },
                          },
                        },
                        x,
                        D,
                      ),
                    }),
                    l(m.div, {
                      className: `framer-1xft30i`,
                      layoutDependency: N,
                      layoutId: `yhBG4TC5_`,
                      transformTemplate: qe,
                      children: [
                        u(w, {
                          __fromCanvasComponent: !0,
                          children: u(n, {
                            children: u(m.p, {
                              style: {
                                "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                "--framer-font-size": `50px`,
                                "--framer-line-height": `84%`,
                                "--framer-text-alignment": `center`,
                                "--framer-text-color": `var(--extracted-r6o4lv, rgb(12, 72, 96))`,
                              },
                              children: `Looking forward to see you`,
                            }),
                          }),
                          className: `framer-ar81eq`,
                          "data-framer-name": `See the route`,
                          fonts: [`GF;Cormorant Upright-regular`],
                          layoutDependency: N,
                          layoutId: `co0wnGHel`,
                          style: {
                            "--extracted-r6o4lv": `rgb(12, 72, 96)`,
                            "--framer-paragraph-spacing": `0px`,
                          },
                          verticalAlignment: `top`,
                          withExternalLayout: !0,
                        }),
                        u(w, {
                          __fromCanvasComponent: !0,
                          children: u(n, {
                            children: u(m.p, {
                              style: {
                                "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                                "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                                "--framer-font-size": `17px`,
                                "--framer-text-alignment": `center`,
                                "--framer-text-color": `var(--extracted-r6o4lv, rgb(12, 72, 96))`,
                              },
                              children: `Click the link to RSVP`,
                            }),
                          }),
                          className: `framer-1sspnsl`,
                          "data-framer-name": `Click to open the map`,
                          fonts: [`GF;Cormorant-regular`],
                          layoutDependency: N,
                          layoutId: `MJwDbE2Vu`,
                          style: {
                            "--extracted-r6o4lv": `rgb(12, 72, 96)`,
                            "--framer-paragraph-spacing": `0px`,
                          },
                          verticalAlignment: `top`,
                          withExternalLayout: !0,
                          ...ze(
                            {
                              A8vBviT_L: {
                                children: u(n, {
                                  children: u(m.p, {
                                    style: {
                                      "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                                      "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                                      "--framer-font-size": `20px`,
                                      "--framer-text-alignment": `center`,
                                      "--framer-text-color": `var(--extracted-r6o4lv, rgb(12, 72, 96))`,
                                    },
                                    children: `Click the link to RSVP`,
                                  }),
                                }),
                              },
                            },
                            x,
                            D,
                          ),
                        }),
                        u(F, {
                          href: v,
                          motionChild: !0,
                          nodeId: `vGcs3UVDz`,
                          openInNewTab: !1,
                          scopeId: `zGcOoJ4TF`,
                          children: u(P, {
                            as: `a`,
                            background: {
                              alt: ``,
                              fit: `fill`,
                              loading: E(
                                (d?.y || 0) +
                                  ((d?.height || 614) * 0.5863192182410426 -
                                    190) +
                                  0 +
                                  332,
                              ),
                              pixelHeight: 512,
                              pixelWidth: 512,
                              src: `./assets/images/GUNxHDQlW7tXOiQkxIgQNaqyQVw-f11c76f2.png`,
                            },
                            className: `framer-1jq6d6d framer-13tuehj`,
                            "data-framer-name": `ChatGPT Image Aug 20, 2025 at 01_02_57 PM 1`,
                            layoutDependency: N,
                            layoutId: `vGcs3UVDz`,
                            ...ze(
                              {
                                A8vBviT_L: {
                                  background: {
                                    alt: ``,
                                    fit: `fill`,
                                    loading: E(
                                      (d?.y || 0) +
                                        ((d?.height || 614) *
                                          0.5863192182410426 -
                                          227) +
                                        0 +
                                        366,
                                    ),
                                    pixelHeight: 512,
                                    pixelWidth: 512,
                                    src: `./assets/images/GUNxHDQlW7tXOiQkxIgQNaqyQVw-f11c76f2.png`,
                                  },
                                },
                              },
                              x,
                              D,
                            ),
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
          });
        }),
        [
          `@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`,
          `.framer-KZI34.framer-13tuehj, .framer-KZI34 .framer-13tuehj { display: block; }`,
          `.framer-KZI34.framer-z4jdiw { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: 614px; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 614px; }`,
          `.framer-KZI34 .framer-lh7shp { flex: 1 0 0px; height: 100%; position: relative; width: 1px; }`,
          `.framer-KZI34 .framer-j9782a { flex: none; height: 471px; left: calc(50.00000000000002% - 471px / 2); position: absolute; top: 71px; width: 471px; z-index: 1; }`,
          `.framer-KZI34 .framer-1xft30i { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; left: 153px; overflow: visible; padding: 0px; position: absolute; right: 154px; top: 59%; z-index: 1; }`,
          `.framer-KZI34 .framer-ar81eq { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 321px; word-break: break-word; word-wrap: break-word; }`,
          `.framer-KZI34 .framer-1sspnsl { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 170px; word-break: break-word; word-wrap: break-word; }`,
          `.framer-KZI34 .framer-1jq6d6d { flex: none; height: 48px; position: relative; text-decoration: none; width: 45px; }`,
          `.framer-KZI34.framer-v-1bow8se .framer-j9782a { aspect-ratio: 1 / 1; bottom: 104px; height: var(--framer-aspect-ratio-supported, 406px); left: 104px; right: 104px; top: unset; width: unset; }`,
          `.framer-KZI34.framer-v-1bow8se .framer-1xft30i { gap: 18px; }`,
          `.framer-KZI34.framer-v-1bow8se .framer-ar81eq { width: 339px; }`,
          `.framer-KZI34.framer-v-1bow8se .framer-1sspnsl { width: 206px; }`,
          `.framer-KZI34.framer-v-1bow8se .framer-1jq6d6d { height: 88px; width: 97px; }`,
        ],
        `framer-KZI34`,
      )),
      ($e = W),
      (W.displayName = `CTA 2`),
      (W.defaultProps = { height: 614, width: 614 }),
      R(W, {
        variant: {
          options: [`mGwaLAHxf`, `A8vBviT_L`],
          optionTitles: [`Desktop`, `Phone`],
          title: `Variant`,
          type: B.Enum,
        },
        Sgtzk03RS: {
          description: `Paste your WhatsApp link above.

Find more templates on dvites.com`,
          title: `WhatsApp`,
          type: B.Link,
        },
      }),
      x(
        W,
        [
          {
            explicitInter: !0,
            fonts: [
              {
                family: `Cormorant Upright`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/VuJrdM3I2Y35poFONtLdafkUCHw1y2vQjjTkeMnz.woff2`,
                weight: `400`,
              },
              {
                family: `Cormorant`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFhFTQ7Fg7A2uwYs.woff2`,
                weight: `400`,
              },
            ],
          },
        ],
        { supportsExplicitInterCodegen: !0 },
      ));
  });
function tt(e, ...t) {
  let n = {};
  return (t?.forEach((t) => t && Object.assign(n, e[t])), n);
}
var nt,
  rt,
  it,
  at,
  ot,
  st,
  ct,
  lt,
  ut,
  G,
  dt,
  ft = e(() => {
    (c(),
      O(),
      p(),
      a(),
      (nt = [`Bnj3QwWfw`, `JFMepYUnJ`]),
      (rt = `framer-sNC4T`),
      (it = { Bnj3QwWfw: `framer-v-473guh`, JFMepYUnJ: `framer-v-wppye3` }),
      (at = { bounce: 0.2, delay: 0, duration: 0.4, type: `spring` }),
      (ot = ({ value: e, children: t }) => {
        let n = r(d),
          a = e ?? n.transition,
          o = i(() => ({ ...n, transition: a }), [JSON.stringify(a)]);
        return u(d.Provider, { value: o, children: t });
      }),
      (st = m.create(n)),
      (ct = { "Desktop and tablet": `Bnj3QwWfw`, Phone: `JFMepYUnJ` }),
      (lt = ({ height: e, id: t, name1: n, name2: r, width: i, ...a }) => ({
        ...a,
        bHDTlInTN: n ?? a.bHDTlInTN ?? `Abhishek`,
        HF8FakP9B: r ?? a.HF8FakP9B ?? `Kanika`,
        variant: ct[a.variant] ?? a.variant ?? `Bnj3QwWfw`,
      })),
      (ut = (e, t) =>
        e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`)),
      (G = T(
        o(function (e, r) {
          let i = t(null),
            a = r ?? i,
            o = s(),
            { activeLocale: c, setLocale: ee } = I();
          M();
          let {
              style: d,
              className: p,
              layoutId: h,
              variant: g,
              bHDTlInTN: _,
              HF8FakP9B: v,
              ...y
            } = lt(e),
            {
              baseVariant: x,
              classNames: S,
              clearLoadingGesture: C,
              gestureHandlers: T,
              gestureVariant: E,
              isLoading: D,
              setGestureState: O,
              setVariant: k,
              variants: A,
            } = V({
              cycleOrder: nt,
              defaultVariant: `Bnj3QwWfw`,
              ref: a,
              variant: g,
              variantClassNames: it,
            }),
            j = ut(e, A),
            N = b(rt);
          return u(f, {
            id: h ?? o,
            children: u(st, {
              animate: A,
              initial: !1,
              children: u(ot, {
                value: at,
                children: l(m.div, {
                  ...y,
                  ...T,
                  className: b(N, `framer-473guh`, p, S),
                  "data-framer-name": `Desktop and tablet`,
                  layoutDependency: j,
                  layoutId: `Bnj3QwWfw`,
                  ref: a,
                  style: { ...d },
                  ...tt({ JFMepYUnJ: { "data-framer-name": `Phone` } }, x, E),
                  children: [
                    u(w, {
                      __fromCanvasComponent: !0,
                      children: u(n, {
                        children: u(m.p, {
                          style: {
                            "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                            "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                            "--framer-font-size": `150px`,
                            "--framer-line-height": `190.1%`,
                            "--framer-text-alignment": `center`,
                            "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                          },
                          children: `Abhishek`,
                        }),
                      }),
                      className: `framer-j2zb48`,
                      "data-framer-name": `Aaditya`,
                      fonts: [`GF;Cormorant Upright-regular`],
                      layoutDependency: j,
                      layoutId: `oY_6NaSrn`,
                      style: {
                        "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                        "--framer-paragraph-spacing": `0px`,
                      },
                      text: _,
                      verticalAlignment: `top`,
                      withExternalLayout: !0,
                      ...tt(
                        {
                          JFMepYUnJ: {
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                  "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                  "--framer-font-size": `70px`,
                                  "--framer-line-height": `190.1%`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `Abhishek`,
                              }),
                            }),
                          },
                        },
                        x,
                        E,
                      ),
                    }),
                    u(w, {
                      __fromCanvasComponent: !0,
                      children: u(n, {
                        children: u(m.p, {
                          style: {
                            "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                            "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                            "--framer-font-size": `156px`,
                            "--framer-line-height": `110%`,
                            "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                          },
                          children: `&`,
                        }),
                      }),
                      className: `framer-rwnq7h`,
                      "data-framer-name": `&`,
                      fonts: [`GF;Cormorant Upright-regular`],
                      layoutDependency: j,
                      layoutId: `mpdvJmVFC`,
                      style: {
                        "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                        "--framer-paragraph-spacing": `0px`,
                      },
                      verticalAlignment: `top`,
                      withExternalLayout: !0,
                      ...tt(
                        {
                          JFMepYUnJ: {
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                  "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                  "--framer-font-size": `70px`,
                                  "--framer-line-height": `110%`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `&`,
                              }),
                            }),
                          },
                        },
                        x,
                        E,
                      ),
                    }),
                    u(w, {
                      __fromCanvasComponent: !0,
                      children: u(n, {
                        children: u(m.p, {
                          style: {
                            "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                            "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                            "--framer-font-size": `150px`,
                            "--framer-line-height": `60.1%`,
                            "--framer-text-alignment": `center`,
                            "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                          },
                          children: `Kanika`,
                        }),
                      }),
                      className: `framer-1jpgzjj`,
                      "data-framer-name": `Veera`,
                      fonts: [`GF;Cormorant-regular`],
                      layoutDependency: j,
                      layoutId: `SL3515TyP`,
                      style: {
                        "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                        "--framer-paragraph-spacing": `0px`,
                      },
                      text: v,
                      verticalAlignment: `top`,
                      withExternalLayout: !0,
                      ...tt(
                        {
                          JFMepYUnJ: {
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                                  "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                                  "--framer-font-size": `70px`,
                                  "--framer-line-height": `60.1%`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `Kanika`,
                              }),
                            }),
                          },
                        },
                        x,
                        E,
                      ),
                    }),
                  ],
                }),
              }),
            }),
          });
        }),
        [
          `@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`,
          `.framer-sNC4T.framer-hj9k15, .framer-sNC4T .framer-hj9k15 { display: block; }`,
          `.framer-sNC4T.framer-473guh { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 1200px; }`,
          `.framer-sNC4T .framer-j2zb48 { flex: none; height: 210px; position: relative; white-space: pre; width: auto; }`,
          `.framer-sNC4T .framer-rwnq7h { flex: none; height: auto; position: relative; white-space: pre; width: auto; }`,
          `.framer-sNC4T .framer-1jpgzjj { flex: none; height: 186px; position: relative; white-space: pre; width: auto; }`,
          `.framer-sNC4T.framer-v-wppye3 .framer-j2zb48 { height: 89px; }`,
          `.framer-sNC4T.framer-v-wppye3 .framer-1jpgzjj { height: 67px; }`,
        ],
        `framer-sNC4T`,
      )),
      (dt = G),
      (G.displayName = `Couple's names 2`),
      (G.defaultProps = { height: 567.5, width: 1200 }),
      R(G, {
        variant: {
          options: [`Bnj3QwWfw`, `JFMepYUnJ`],
          optionTitles: [`Desktop and tablet`, `Phone`],
          title: `Variant`,
          type: B.Enum,
        },
        bHDTlInTN: {
          defaultValue: `Abhishek`,
          description: `Enter groom or bride's name above

Find more templates on dvites.com`,
          displayTextArea: !1,
          title: `Name 1`,
          type: B.String,
        },
        HF8FakP9B: {
          defaultValue: `Kanika`,
          description: `Enter groom or bride's name above

Find more templates on dvites.com`,
          displayTextArea: !1,
          title: `Name 2`,
          type: B.String,
        },
      }),
      x(
        G,
        [
          {
            explicitInter: !0,
            fonts: [
              {
                family: `Cormorant Upright`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/VuJrdM3I2Y35poFONtLdafkUCHw1y2vQjjTkeMnz.woff2`,
                weight: `400`,
              },
              {
                family: `Cormorant`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFhFTQ7Fg7A2uwYs.woff2`,
                weight: `400`,
              },
            ],
          },
        ],
        { supportsExplicitInterCodegen: !0 },
      ));
  });
function pt(e, ...t) {
  let n = {};
  return (t?.forEach((t) => t && Object.assign(n, e[t])), n);
}
var mt,
  ht,
  gt,
  _t,
  vt,
  yt,
  bt,
  xt,
  St,
  Ct,
  wt,
  Tt,
  Et,
  K,
  Dt,
  Ot = e(() => {
    (c(),
      O(),
      p(),
      a(),
      (mt = [`eKCA4T8lZ`, `Zx5bPYaEe`]),
      (ht = `framer-vQzMM`),
      (gt = { eKCA4T8lZ: `framer-v-1ma1fvn`, Zx5bPYaEe: `framer-v-1eoho2v` }),
      (_t = { bounce: 0.2, delay: 0, duration: 0.4, type: `spring` }),
      (vt = {
        filter: `blur(10px)`,
        opacity: 0.001,
        rotate: 0,
        scale: 0,
        skewX: 0,
        skewY: 0,
        x: 0,
        y: 10,
      }),
      (yt = { bounce: 0, delay: 0.05, duration: 3, type: `spring` }),
      (bt = {
        effect: vt,
        tokenization: `character`,
        transition: yt,
        trigger: `onMount`,
        type: `appear`,
      }),
      (xt = {
        effect: vt,
        repeat: !1,
        startDelay: 0,
        tokenization: `character`,
        transition: yt,
        trigger: `onMount`,
        type: `appear`,
      }),
      (St = ({ value: e, children: t }) => {
        let n = r(d),
          a = e ?? n.transition,
          o = i(() => ({ ...n, transition: a }), [JSON.stringify(a)]);
        return u(d.Provider, { value: o, children: t });
      }),
      (Ct = m.create(n)),
      (wt = { Desktop: `eKCA4T8lZ`, Phone: `Zx5bPYaEe` }),
      (Tt = ({ height: e, id: t, name1: n, name2: r, width: i, ...a }) => ({
        ...a,
        l2wejV_9f: r ?? a.l2wejV_9f ?? `Kanika`,
        sEfkXzmSW: n ?? a.sEfkXzmSW ?? `Abhishek`,
        variant: wt[a.variant] ?? a.variant ?? `eKCA4T8lZ`,
      })),
      (Et = (e, t) =>
        e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`)),
      (K = T(
        o(function (e, r) {
          let i = t(null),
            a = r ?? i,
            o = s(),
            { activeLocale: c, setLocale: ee } = I();
          M();
          let {
              style: d,
              className: p,
              layoutId: h,
              variant: g,
              sEfkXzmSW: _,
              l2wejV_9f: v,
              ...y
            } = Tt(e),
            {
              baseVariant: x,
              classNames: S,
              clearLoadingGesture: C,
              gestureHandlers: T,
              gestureVariant: E,
              isLoading: D,
              setGestureState: O,
              setVariant: k,
              variants: A,
            } = V({
              cycleOrder: mt,
              defaultVariant: `eKCA4T8lZ`,
              ref: a,
              variant: g,
              variantClassNames: gt,
            }),
            j = Et(e, A),
            N = b(ht);
          return u(f, {
            id: h ?? o,
            children: u(Ct, {
              animate: A,
              initial: !1,
              children: u(St, {
                value: _t,
                children: l(m.div, {
                  ...y,
                  ...T,
                  className: b(N, `framer-1ma1fvn`, p, S),
                  "data-framer-name": `Desktop`,
                  layoutDependency: j,
                  layoutId: `eKCA4T8lZ`,
                  ref: a,
                  style: { ...d },
                  ...pt({ Zx5bPYaEe: { "data-framer-name": `Phone` } }, x, E),
                  children: [
                    u(w, {
                      __fromCanvasComponent: !0,
                      children: u(n, {
                        children: u(m.p, {
                          style: {
                            "--font-selector": `R0Y7Q29ybW9yYW50IEluZmFudC1yZWd1bGFy`,
                            "--framer-font-family": `"Cormorant Infant", "Cormorant Infant Placeholder", serif`,
                            "--framer-font-size": `80px`,
                            "--framer-line-height": `340%`,
                            "--framer-text-alignment": `center`,
                            "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                          },
                          children: `Jatin`,
                        }),
                      }),
                      className: `framer-5iacuh`,
                      "data-framer-name": `Abhishek`,
                      effect: bt,
                      fonts: [`GF;Cormorant Infant-regular`],
                      layoutDependency: j,
                      layoutId: `ftRy3Mgaf`,
                      style: {
                        "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                        "--framer-paragraph-spacing": `0px`,
                      },
                      text: _,
                      verticalAlignment: `top`,
                      withExternalLayout: !0,
                      ...pt(
                        {
                          Zx5bPYaEe: {
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50IEluZmFudC1yZWd1bGFy`,
                                  "--framer-font-family": `"Cormorant Infant", "Cormorant Infant Placeholder", serif`,
                                  "--framer-font-size": `55px`,
                                  "--framer-line-height": `370%`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `Jatin`,
                              }),
                            }),
                            effect: xt,
                          },
                        },
                        x,
                        E,
                      ),
                    }),
                    u(w, {
                      __fromCanvasComponent: !0,
                      children: u(n, {
                        children: u(m.p, {
                          style: {
                            "--font-selector": `R0Y7Q29ybW9yYW50IFVuaWNhc2UtcmVndWxhcg==`,
                            "--framer-font-family": `"Cormorant Unicase", "Cormorant Unicase Placeholder", serif`,
                            "--framer-font-size": `53px`,
                            "--framer-line-height": `210%`,
                            "--framer-text-alignment": `center`,
                            "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                          },
                          children: `weds`,
                        }),
                      }),
                      className: `framer-1on53wh`,
                      "data-framer-name": `weds`,
                      effect: xt,
                      fonts: [`GF;Cormorant Unicase-regular`],
                      layoutDependency: j,
                      layoutId: `vYaJGvepN`,
                      style: {
                        "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                        "--framer-paragraph-spacing": `0px`,
                      },
                      verticalAlignment: `top`,
                      withExternalLayout: !0,
                      ...pt(
                        {
                          Zx5bPYaEe: {
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50IFVuaWNhc2UtcmVndWxhcg==`,
                                  "--framer-font-family": `"Cormorant Unicase", "Cormorant Unicase Placeholder", serif`,
                                  "--framer-font-size": `30px`,
                                  "--framer-line-height": `0.1%`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `weds`,
                              }),
                            }),
                          },
                        },
                        x,
                        E,
                      ),
                    }),
                    u(w, {
                      __fromCanvasComponent: !0,
                      children: u(n, {
                        children: u(m.p, {
                          style: {
                            "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                            "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                            "--framer-font-size": `80px`,
                            "--framer-line-height": `120%`,
                            "--framer-text-alignment": `center`,
                            "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                          },
                          children: `Divya`,
                        }),
                      }),
                      className: `framer-1lqcbbb`,
                      "data-framer-name": `Kanika`,
                      effect: xt,
                      fonts: [`GF;Cormorant Upright-regular`],
                      layoutDependency: j,
                      layoutId: `Rm02m5WjD`,
                      style: {
                        "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                        "--framer-paragraph-spacing": `0px`,
                      },
                      text: v,
                      verticalAlignment: `top`,
                      withExternalLayout: !0,
                      ...pt(
                        {
                          Zx5bPYaEe: {
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                  "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                  "--framer-font-size": `55px`,
                                  "--framer-line-height": `0.1%`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `Divya`,
                              }),
                            }),
                          },
                        },
                        x,
                        E,
                      ),
                    }),
                  ],
                }),
              }),
            }),
          });
        }),
        [
          `@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`,
          `.framer-vQzMM.framer-ephkwc, .framer-vQzMM .framer-ephkwc { display: block; }`,
          `.framer-vQzMM.framer-1ma1fvn { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 1200px; }`,
          `.framer-vQzMM .framer-5iacuh { flex: none; height: 153px; position: relative; white-space: pre-wrap; width: 483px; word-break: break-word; word-wrap: break-word; }`,
          `.framer-vQzMM .framer-1on53wh { flex: none; height: 77px; position: relative; white-space: pre-wrap; width: 298px; word-break: break-word; word-wrap: break-word; }`,
          `.framer-vQzMM .framer-1lqcbbb { flex: none; height: 153px; position: relative; white-space: pre-wrap; width: 616px; word-break: break-word; word-wrap: break-word; }`,
          `.framer-vQzMM.framer-v-1eoho2v .framer-1on53wh { height: 49px; }`,
        ],
        `framer-vQzMM`,
      )),
      (Dt = K),
      (K.displayName = `Bride and Groom's Names`),
      (K.defaultProps = { height: 381.5, width: 1200 }),
      R(K, {
        variant: {
          options: [`eKCA4T8lZ`, `Zx5bPYaEe`],
          optionTitles: [`Desktop`, `Phone`],
          title: `Variant`,
          type: B.Enum,
        },
        sEfkXzmSW: {
          defaultValue: `Abhishek`,
          description: `Enter groom or bride's name above

Find more templates on dvites.com`,
          displayTextArea: !1,
          title: `Name 1`,
          type: B.String,
        },
        l2wejV_9f: {
          defaultValue: `Kanika`,
          description: `Enter groom or bride's name above

Find more templates on dvites.com`,
          displayTextArea: !1,
          title: `Name 2`,
          type: B.String,
        },
      }),
      x(
        K,
        [
          {
            explicitInter: !0,
            fonts: [
              {
                family: `Cormorant Infant`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/HhyCU44g9vKiM1sORYSiWeAsLN99xfs9KOOc_agJPrgvYOWWhDlDkWSy.woff2`,
                weight: `400`,
              },
              {
                family: `Cormorant Unicase`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/HI_QiZUaILtOqhqgDeXoF_n1_fTGX-vWnsMnx3C9.woff2`,
                weight: `400`,
              },
              {
                family: `Cormorant Upright`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/VuJrdM3I2Y35poFONtLdafkUCHw1y2vQjjTkeMnz.woff2`,
                weight: `400`,
              },
            ],
          },
        ],
        { supportsExplicitInterCodegen: !0 },
      ));
  });
function kt(e, ...t) {
  let n = {};
  return (t?.forEach((t) => t && Object.assign(n, e[t])), n);
}
var At,
  jt,
  Mt,
  Nt,
  Pt,
  Ft,
  It,
  Lt,
  Rt,
  zt,
  q,
  J,
  Bt = e(() => {
    (c(),
      O(),
      p(),
      a(),
      (At = [`kPIhmdw4I`, `XA4eR62mg`]),
      (jt = `framer-yKeyE`),
      (Mt = { kPIhmdw4I: `framer-v-2tsn7j`, XA4eR62mg: `framer-v-1884b9c` }),
      (Nt = { bounce: 0.2, delay: 0, duration: 0.4, type: `spring` }),
      (Pt = (e) =>
        typeof e == `object` && e && typeof e.src == `string`
          ? e
          : typeof e == `string`
            ? { src: e }
            : void 0),
      (Ft = ({ value: e, children: t }) => {
        let n = r(d),
          a = e ?? n.transition,
          o = i(() => ({ ...n, transition: a }), [JSON.stringify(a)]);
        return u(d.Provider, { value: o, children: t });
      }),
      (It = m.create(n)),
      (Lt = { Desktop: `kPIhmdw4I`, Phone: `XA4eR62mg` }),
      (Rt = ({
        height: e,
        icon: t,
        id: n,
        info: r,
        title: i,
        width: a,
        ...o
      }) => ({
        ...o,
        PrrSJxMUh:
          r ??
          o.PrrSJxMUh ??
          `While posting photos on social media please use the hashtag - #BadriKiDulhania`,
        PVzPSjchM: i ?? o.PVzPSjchM ?? `Hashtag`,
        RXLhSfcG1: t ??
          o.RXLhSfcG1 ?? {
            pixelHeight: 405,
            pixelWidth: 405,
            src: `./assets/images/bjfpWWFGZoYUJgVtmcKqFbe4k-bac39ded.png`,
          },
        variant: Lt[o.variant] ?? o.variant ?? `kPIhmdw4I`,
      })),
      (zt = (e, t) =>
        e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`)),
      (q = T(
        o(function (e, r) {
          let i = t(null),
            a = r ?? i,
            o = s(),
            { activeLocale: c, setLocale: ee } = I(),
            d = M(),
            {
              style: p,
              className: h,
              layoutId: g,
              variant: _,
              RXLhSfcG1: v,
              PVzPSjchM: y,
              PrrSJxMUh: x,
              ...S
            } = Rt(e),
            {
              baseVariant: C,
              classNames: T,
              clearLoadingGesture: D,
              gestureHandlers: O,
              gestureVariant: k,
              isLoading: A,
              setGestureState: j,
              setVariant: N,
              variants: F,
            } = V({
              cycleOrder: At,
              defaultVariant: `kPIhmdw4I`,
              ref: a,
              variant: _,
              variantClassNames: Mt,
            }),
            L = zt(e, F),
            R = b(jt);
          return u(f, {
            id: g ?? o,
            children: u(It, {
              animate: F,
              initial: !1,
              children: u(Ft, {
                value: Nt,
                children: u(m.div, {
                  ...S,
                  ...O,
                  className: b(R, `framer-2tsn7j`, h, T),
                  "data-framer-name": `Desktop`,
                  layoutDependency: L,
                  layoutId: `kPIhmdw4I`,
                  ref: a,
                  style: { ...p },
                  ...kt({ XA4eR62mg: { "data-framer-name": `Phone` } }, C, k),
                  children: l(m.div, {
                    className: `framer-1bsco9d`,
                    layoutDependency: L,
                    layoutId: `XJZGGUVKb`,
                    children: [
                      u(P, {
                        background: {
                          alt: ``,
                          fit: `fill`,
                          loading: E(
                            (d?.y || 0) +
                              0 +
                              (((d?.height || 141) -
                                0 -
                                (Math.max(0, ((d?.height || 141) - 0 - 0) / 1) *
                                  1 +
                                  0)) /
                                2 +
                                0 +
                                0) +
                              0 +
                              ((Math.max(0, ((d?.height || 141) - 0 - 0) / 1) *
                                1 -
                                0 -
                                363) /
                                2 +
                                0 +
                                0),
                          ),
                          pixelHeight: 405,
                          pixelWidth: 405,
                          sizes: `71px`,
                          ...Pt(v),
                        },
                        className: `framer-z6hue0`,
                        "data-framer-name": `ChatGPT Image Aug 20, 2025 at 02_43_47 PM 1`,
                        layoutDependency: L,
                        layoutId: `Pei2o7R9B`,
                        ...kt(
                          {
                            XA4eR62mg: {
                              background: {
                                alt: ``,
                                fit: `fill`,
                                loading: E(
                                  (d?.y || 0) +
                                    0 +
                                    (((d?.height || 197) -
                                      0 -
                                      (Math.max(
                                        0,
                                        ((d?.height || 197) - 0 - 0) / 1,
                                      ) *
                                        1 +
                                        0)) /
                                      2 +
                                      0 +
                                      0) +
                                    0 +
                                    ((Math.max(
                                      0,
                                      ((d?.height || 197) - 0 - 0) / 1,
                                    ) *
                                      1 -
                                      0 -
                                      580.57) /
                                      2 +
                                      0 +
                                      0),
                                ),
                                pixelHeight: 405,
                                pixelWidth: 405,
                                sizes: `118.57px`,
                                ...Pt(v),
                              },
                            },
                          },
                          C,
                          k,
                        ),
                      }),
                      u(w, {
                        __fromCanvasComponent: !0,
                        children: u(n, {
                          children: u(m.p, {
                            style: {
                              "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                              "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                              "--framer-font-size": `32px`,
                              "--framer-text-alignment": `center`,
                              "--framer-text-color": `var(--extracted-r6o4lv, rgb(246, 225, 187))`,
                            },
                            children: `Hashtag`,
                          }),
                        }),
                        className: `framer-1lvn14u`,
                        "data-framer-name": `Hashtag`,
                        fonts: [`GF;Cormorant Upright-regular`],
                        layoutDependency: L,
                        layoutId: `ZXoDKcu7r`,
                        style: {
                          "--extracted-r6o4lv": `rgb(246, 225, 187)`,
                          "--framer-paragraph-spacing": `0px`,
                        },
                        text: y,
                        verticalAlignment: `top`,
                        withExternalLayout: !0,
                        ...kt(
                          {
                            XA4eR62mg: {
                              children: u(n, {
                                children: u(m.p, {
                                  style: {
                                    "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                    "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                    "--framer-font-size": `59px`,
                                    "--framer-text-alignment": `center`,
                                    "--framer-text-color": `var(--extracted-r6o4lv, rgb(246, 225, 187))`,
                                  },
                                  children: `Hashtag`,
                                }),
                              }),
                            },
                          },
                          C,
                          k,
                        ),
                      }),
                      u(w, {
                        __fromCanvasComponent: !0,
                        children: u(n, {
                          children: u(m.p, {
                            style: {
                              "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                              "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                              "--framer-font-size": `14px`,
                              "--framer-text-alignment": `center`,
                              "--framer-text-color": `var(--extracted-r6o4lv, rgb(246, 225, 187))`,
                            },
                            children: `While posting photos on social media please use the hashtag - #BadriKiDulhania`,
                          }),
                        }),
                        className: `framer-19m167k`,
                        "data-framer-name": `#BadriKiDulhania`,
                        fonts: [`GF;Cormorant-regular`],
                        layoutDependency: L,
                        layoutId: `a3IGIlzgg`,
                        style: {
                          "--extracted-r6o4lv": `rgb(246, 225, 187)`,
                          "--framer-paragraph-spacing": `0px`,
                        },
                        text: x,
                        verticalAlignment: `top`,
                        withExternalLayout: !0,
                        ...kt(
                          {
                            XA4eR62mg: {
                              children: u(n, {
                                children: u(m.p, {
                                  style: {
                                    "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                                    "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                                    "--framer-font-size": `15px`,
                                    "--framer-text-alignment": `center`,
                                    "--framer-text-color": `var(--extracted-r6o4lv, rgb(246, 225, 187))`,
                                  },
                                  children: `While posting photos on social media please use the hashtag - #BadriKiDulhania`,
                                }),
                              }),
                            },
                          },
                          C,
                          k,
                        ),
                      }),
                    ],
                  }),
                }),
              }),
            }),
          });
        }),
        [
          `@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`,
          `.framer-yKeyE.framer-755rs7, .framer-yKeyE .framer-755rs7 { display: block; }`,
          `.framer-yKeyE.framer-2tsn7j { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 141px; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 188px; }`,
          `.framer-yKeyE .framer-1bsco9d { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 8px; height: 1px; justify-content: center; max-width: 200px; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
          `.framer-yKeyE .framer-z6hue0 { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 71px); position: relative; width: 71px; }`,
          `.framer-yKeyE .framer-1lvn14u { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 234px; word-break: break-word; word-wrap: break-word; }`,
          `.framer-yKeyE .framer-19m167k { flex: none; height: auto; max-width: 150%; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }`,
          `.framer-yKeyE.framer-v-1884b9c.framer-2tsn7j { height: 197px; width: 327px; }`,
          `.framer-yKeyE.framer-v-1884b9c .framer-1bsco9d { gap: 9px; }`,
          `.framer-yKeyE.framer-v-1884b9c .framer-z6hue0 { height: var(--framer-aspect-ratio-supported, 119px); width: 119px; }`,
          `.framer-yKeyE.framer-v-1884b9c .framer-1lvn14u { width: 327px; }`,
          `.framer-yKeyE.framer-v-1884b9c .framer-19m167k { max-width: 100%; width: 327px; }`,
        ],
        `framer-yKeyE`,
      )),
      (J = q),
      (q.displayName = `Thing to know - Info`),
      (q.defaultProps = { height: 141, width: 188 }),
      R(q, {
        variant: {
          options: [`kPIhmdw4I`, `XA4eR62mg`],
          optionTitles: [`Desktop`, `Phone`],
          title: `Variant`,
          type: B.Enum,
        },
        RXLhSfcG1: {
          __defaultAssetReference: `data:framer/asset-reference,bjfpWWFGZoYUJgVtmcKqFbe4k.png?originalFilename=ChatGPT+Image+Aug+5%2C+2025+at+11_59_42+AM+1.png&preferredSize=auto&width=405&height=405`,
          title: `Icon`,
          type: B.ResponsiveImage,
        },
        PVzPSjchM: {
          defaultValue: `Hashtag`,
          displayTextArea: !1,
          title: `Title`,
          type: B.String,
        },
        PrrSJxMUh: {
          defaultValue: `While posting photos on social media please use the hashtag - #BadriKiDulhania`,
          description: `Enter the info above.

Find more templates on dvites.com`,
          displayTextArea: !0,
          title: `Info`,
          type: B.String,
        },
      }),
      x(
        q,
        [
          {
            explicitInter: !0,
            fonts: [
              {
                family: `Cormorant Upright`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/VuJrdM3I2Y35poFONtLdafkUCHw1y2vQjjTkeMnz.woff2`,
                weight: `400`,
              },
              {
                family: `Cormorant`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFhFTQ7Fg7A2uwYs.woff2`,
                weight: `400`,
              },
            ],
          },
        ],
        { supportsExplicitInterCodegen: !0 },
      ));
  }),
  Vt,
  Ht,
  Ut,
  Wt,
  Gt,
  Kt,
  qt,
  Jt,
  Yt,
  Xt = e(() => {
    (c(),
      O(),
      p(),
      a(),
      (Vt = `framer-9ns4u`),
      (Ht = { FvUtG9e6V: `framer-v-sokg5i` }),
      (Ut = { bounce: 0.2, delay: 0, duration: 0.4, type: `spring` }),
      (Wt = ({ value: e, children: t }) => {
        let n = r(d),
          a = e ?? n.transition,
          o = i(() => ({ ...n, transition: a }), [JSON.stringify(a)]);
        return u(d.Provider, { value: o, children: t });
      }),
      (Gt = m.create(n)),
      (Kt = ({ height: e, id: t, mantra: n, width: r, ...i }) => ({
        ...i,
        Ka1jTZQ18: n ?? i.Ka1jTZQ18 ?? `ॐ श्री गणेशाय नम`,
      })),
      (qt = (e, t) =>
        e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`)),
      (Jt = T(
        o(function (e, r) {
          let i = t(null),
            a = r ?? i,
            o = s(),
            { activeLocale: c, setLocale: l } = I();
          M();
          let {
              style: ee,
              className: d,
              layoutId: p,
              variant: h,
              Ka1jTZQ18: g,
              ..._
            } = Kt(e),
            {
              baseVariant: v,
              classNames: y,
              clearLoadingGesture: x,
              gestureHandlers: S,
              gestureVariant: C,
              isLoading: T,
              setGestureState: E,
              setVariant: D,
              variants: O,
            } = V({
              defaultVariant: `FvUtG9e6V`,
              ref: a,
              variant: h,
              variantClassNames: Ht,
            }),
            k = qt(e, O),
            A = b(Vt);
          return u(f, {
            id: p ?? o,
            children: u(Gt, {
              animate: O,
              initial: !1,
              children: u(Wt, {
                value: Ut,
                children: u(m.div, {
                  ..._,
                  ...S,
                  className: b(A, `framer-sokg5i`, d, y),
                  "data-framer-name": `Variant 1`,
                  layoutDependency: k,
                  layoutId: `FvUtG9e6V`,
                  ref: a,
                  style: { ...ee },
                  children: u(m.div, {
                    className: `framer-1qj8qk9`,
                    layoutDependency: k,
                    layoutId: `NYe3DtX9r`,
                    children: u(w, {
                      __fromCanvasComponent: !0,
                      children: u(n, {
                        children: u(m.p, {
                          style: {
                            "--font-selector": `R0Y7R290dS1yZWd1bGFy`,
                            "--framer-font-family": `"Gotu", "Gotu Placeholder", sans-serif`,
                            "--framer-font-size": `15px`,
                            "--framer-line-height": `150%`,
                            "--framer-text-alignment": `center`,
                            "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                          },
                          children: `ॐ श्री गणेशाय नम`,
                        }),
                      }),
                      className: `framer-ti5y2d`,
                      "data-framer-name": `ॐ श्री गणेशाय नम`,
                      fonts: [`GF;Gotu-regular`],
                      layoutDependency: k,
                      layoutId: `lER_cJPLY`,
                      style: {
                        "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                        "--framer-paragraph-spacing": `0px`,
                      },
                      text: g,
                      verticalAlignment: `top`,
                      withExternalLayout: !0,
                    }),
                  }),
                }),
              }),
            }),
          });
        }),
        [
          `@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`,
          `.framer-9ns4u.framer-1binzf6, .framer-9ns4u .framer-1binzf6 { display: block; }`,
          `.framer-9ns4u.framer-sokg5i { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: min-content; }`,
          `.framer-9ns4u .framer-1qj8qk9 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 124px; }`,
          `.framer-9ns4u .framer-ti5y2d { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }`,
        ],
        `framer-9ns4u`,
      )),
      (Yt = Jt),
      (Jt.displayName = `Mantra`),
      (Jt.defaultProps = { height: 22.5, width: 124 }),
      R(Jt, {
        Ka1jTZQ18: {
          defaultValue: `ॐ श्री गणेशाय नम`,
          description: `Enter your religious mantra above. 

Find more templates on dvites.com`,
          displayTextArea: !0,
          title: `Mantra`,
          type: B.String,
        },
      }),
      x(
        Jt,
        [
          {
            explicitInter: !0,
            fonts: [
              {
                family: `Gotu`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/o-0FIpksx3QOlHgLioh6-hU.woff2`,
                weight: `400`,
              },
            ],
          },
        ],
        { supportsExplicitInterCodegen: !0 },
      ));
  });
function Zt(e, ...t) {
  let n = {};
  return (t?.forEach((t) => t && Object.assign(n, e[t])), n);
}
var Qt,
  $t,
  en,
  tn,
  nn,
  rn,
  an,
  on,
  sn,
  cn,
  ln,
  un,
  dn,
  fn,
  pn,
  mn = e(() => {
    (c(),
      O(),
      p(),
      a(),
      (Qt = g(P)),
      ($t = [`UeIsfCmuY`, `VVJ9I4j1o`]),
      (en = `framer-i4223`),
      (tn = { UeIsfCmuY: `framer-v-bkk9xd`, VVJ9I4j1o: `framer-v-1wihn1x` }),
      (nn = { bounce: 0.2, delay: 0, duration: 0.4, type: `spring` }),
      (rn = {
        delay: 0,
        duration: 10,
        ease: [0.44, 0, 0.56, 1],
        type: `tween`,
      }),
      (an = {
        opacity: 1,
        rotate: 365,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        skewX: 0,
        skewY: 0,
        x: 0,
        y: 0,
      }),
      (on = (e, t) => `translateY(-50%) ${t}`),
      (sn = ({ value: e, children: t }) => {
        let n = r(d),
          a = e ?? n.transition,
          o = i(() => ({ ...n, transition: a }), [JSON.stringify(a)]);
        return u(d.Provider, { value: o, children: t });
      }),
      (cn = m.create(n)),
      (ln = { "Desktop + tablet": `UeIsfCmuY`, Phone: `VVJ9I4j1o` }),
      (un = ({ height: e, id: t, link: n, width: r, ...i }) => ({
        ...i,
        hah7YEktd: n ?? i.hah7YEktd,
        variant: ln[i.variant] ?? i.variant ?? `UeIsfCmuY`,
      })),
      (dn = (e, t) =>
        e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`)),
      (fn = T(
        o(function (e, r) {
          let i = t(null),
            a = r ?? i,
            o = s(),
            { activeLocale: c, setLocale: ee } = I(),
            d = M(),
            {
              style: p,
              className: h,
              layoutId: g,
              variant: _,
              hah7YEktd: v,
              ...y
            } = un(e),
            {
              baseVariant: x,
              classNames: S,
              clearLoadingGesture: C,
              gestureHandlers: T,
              gestureVariant: D,
              isLoading: O,
              setGestureState: k,
              setVariant: A,
              variants: j,
            } = V({
              cycleOrder: $t,
              defaultVariant: `UeIsfCmuY`,
              ref: a,
              variant: _,
              variantClassNames: tn,
            }),
            N = dn(e, j),
            L = b(en);
          return u(f, {
            id: g ?? o,
            children: u(cn, {
              animate: j,
              initial: !1,
              children: u(sn, {
                value: nn,
                children: l(m.div, {
                  ...y,
                  ...T,
                  className: b(L, `framer-bkk9xd`, h, S),
                  "data-framer-name": `Desktop + tablet`,
                  layoutDependency: N,
                  layoutId: `UeIsfCmuY`,
                  ref: a,
                  style: { ...p },
                  ...Zt({ VVJ9I4j1o: { "data-framer-name": `Phone` } }, x, D),
                  children: [
                    u(Qt, {
                      __framer__loop: an,
                      __framer__loopEffectEnabled: !0,
                      __framer__loopPauseOffscreen: !0,
                      __framer__loopRepeatDelay: 0,
                      __framer__loopRepeatType: `mirror`,
                      __framer__loopTransition: rn,
                      __framer__styleTransformEffectEnabled: !0,
                      __framer__transformTargets: [
                        {
                          target: {
                            opacity: 1,
                            rotate: 1002,
                            rotateX: 0,
                            rotateY: 0,
                            scale: 1,
                            skewX: 0,
                            skewY: 0,
                            x: 0,
                            y: 0,
                          },
                        },
                        {
                          target: {
                            opacity: 1,
                            rotate: 0,
                            rotateX: 0,
                            rotateY: 0,
                            scale: 1,
                            skewX: 0,
                            skewY: 0,
                            x: 0,
                            y: 0,
                          },
                        },
                      ],
                      __framer__transformTrigger: `onScroll`,
                      __perspectiveFX: !1,
                      __smartComponentFX: !0,
                      __targetOpacity: 1,
                      background: {
                        alt: ``,
                        fit: `fill`,
                        loading: E(
                          (d?.y || 0) +
                            (0 +
                              ((d?.height || 614) -
                                0 -
                                ((d?.height || 614) - 0) * 1) /
                                2),
                        ),
                        pixelHeight: 2168,
                        pixelWidth: 2168,
                        sizes: `max(${d?.width || `100vw`}, 1px)`,
                        src: `./assets/images/XONgEAErtGEWyGU2daiM0Tke5U-e0750c76.png`,
                        srcSet: `./assets/images/XONgEAErtGEWyGU2daiM0Tke5U-2f21c0c9.png 512w,./assets/images/XONgEAErtGEWyGU2daiM0Tke5U-67df0e88.png 1024w,./assets/images/XONgEAErtGEWyGU2daiM0Tke5U-e43d1588.png 2048w,./assets/images/XONgEAErtGEWyGU2daiM0Tke5U-e0750c76.png 2168w`,
                      },
                      className: `framer-1o38f4i`,
                      layoutDependency: N,
                      layoutId: `SxnnUQOMu`,
                    }),
                    u(P, {
                      background: {
                        alt: ``,
                        fit: `fill`,
                        loading: E((d?.y || 0) + 71),
                        pixelHeight: 1814,
                        pixelWidth: 1814,
                        sizes: `471px`,
                        src: `./assets/images/Aof0oMPsYxLFv2zceiax3Nj7qyU-30963af8.png`,
                        srcSet: `./assets/images/Aof0oMPsYxLFv2zceiax3Nj7qyU-3d10ed12.png 512w,./assets/images/Aof0oMPsYxLFv2zceiax3Nj7qyU-d00547f9.png 1024w,./assets/images/Aof0oMPsYxLFv2zceiax3Nj7qyU-30963af8.png 1814w`,
                      },
                      className: `framer-1qbtx1q`,
                      "data-framer-name": `CTA 2`,
                      layoutDependency: N,
                      layoutId: `rbPy3og09`,
                      ...Zt(
                        {
                          VVJ9I4j1o: {
                            background: {
                              alt: ``,
                              fit: `fill`,
                              loading: E(
                                (d?.y || 0) + (d?.height || 614) - 517,
                              ),
                              pixelHeight: 1814,
                              pixelWidth: 1814,
                              sizes: `calc(${d?.width || `100vw`} - 189px)`,
                              src: `./assets/images/Aof0oMPsYxLFv2zceiax3Nj7qyU-30963af8.png`,
                              srcSet: `./assets/images/Aof0oMPsYxLFv2zceiax3Nj7qyU-3d10ed12.png 512w,./assets/images/Aof0oMPsYxLFv2zceiax3Nj7qyU-d00547f9.png 1024w,./assets/images/Aof0oMPsYxLFv2zceiax3Nj7qyU-30963af8.png 1814w`,
                            },
                          },
                        },
                        x,
                        D,
                      ),
                    }),
                    l(m.div, {
                      className: `framer-6m5jsz`,
                      layoutDependency: N,
                      layoutId: `n1BoowCvl`,
                      transformTemplate: on,
                      children: [
                        u(w, {
                          __fromCanvasComponent: !0,
                          children: u(n, {
                            children: u(m.p, {
                              style: {
                                "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                "--framer-font-size": `50px`,
                                "--framer-line-height": `84%`,
                                "--framer-text-alignment": `center`,
                                "--framer-text-color": `var(--extracted-r6o4lv, rgb(254, 246, 209))`,
                              },
                              children: `Follow the action`,
                            }),
                          }),
                          className: `framer-2nw8zl`,
                          "data-framer-name": `See the route`,
                          fonts: [`GF;Cormorant Upright-regular`],
                          layoutDependency: N,
                          layoutId: `Z5RBOrd1F`,
                          style: {
                            "--extracted-r6o4lv": `rgb(254, 246, 209)`,
                            "--framer-paragraph-spacing": `0px`,
                          },
                          verticalAlignment: `top`,
                          withExternalLayout: !0,
                          ...Zt(
                            {
                              VVJ9I4j1o: {
                                children: u(n, {
                                  children: u(m.p, {
                                    style: {
                                      "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                      "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                      "--framer-font-size": `70px`,
                                      "--framer-line-height": `84%`,
                                      "--framer-text-alignment": `center`,
                                      "--framer-text-color": `var(--extracted-r6o4lv, rgb(254, 246, 209))`,
                                    },
                                    children: `Follow the action`,
                                  }),
                                }),
                              },
                            },
                            x,
                            D,
                          ),
                        }),
                        u(w, {
                          __fromCanvasComponent: !0,
                          children: u(n, {
                            children: u(m.p, {
                              style: {
                                "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                                "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                                "--framer-font-size": `17px`,
                                "--framer-text-alignment": `center`,
                                "--framer-text-color": `var(--extracted-r6o4lv, rgb(254, 246, 209))`,
                              },
                              children: `Click the link to open Instagram`,
                            }),
                          }),
                          className: `framer-9zjwrc`,
                          "data-framer-name": `Click to open the map`,
                          fonts: [`GF;Cormorant-regular`],
                          layoutDependency: N,
                          layoutId: `a9b8s2jsE`,
                          style: {
                            "--extracted-r6o4lv": `rgb(254, 246, 209)`,
                            "--framer-paragraph-spacing": `0px`,
                          },
                          verticalAlignment: `top`,
                          withExternalLayout: !0,
                          ...Zt(
                            {
                              VVJ9I4j1o: {
                                children: u(n, {
                                  children: u(m.p, {
                                    style: {
                                      "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                                      "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                                      "--framer-font-size": `19px`,
                                      "--framer-text-alignment": `center`,
                                      "--framer-text-color": `var(--extracted-r6o4lv, rgb(254, 246, 209))`,
                                    },
                                    children: `Click the link to open Instagram`,
                                  }),
                                }),
                              },
                            },
                            x,
                            D,
                          ),
                        }),
                        u(F, {
                          href: v,
                          motionChild: !0,
                          nodeId: `gAryOK842`,
                          openInNewTab: !1,
                          scopeId: `XR3AGVIPl`,
                          children: u(P, {
                            as: `a`,
                            background: {
                              alt: ``,
                              fit: `fill`,
                              loading: E(
                                (d?.y || 0) +
                                  ((d?.height || 614) * 0.5863192182410426 -
                                    190) +
                                  0 +
                                  332,
                              ),
                              pixelHeight: 339,
                              pixelWidth: 338,
                              src: `./assets/images/gdmN2dDmg0szS1jwXPJFJZ0xsIE-c1669a40.png`,
                            },
                            className: `framer-1yqo92c framer-1hwqsad`,
                            "data-framer-name": `ChatGPT Image Aug 20, 2025 at 01_02_57 PM 1`,
                            layoutDependency: N,
                            layoutId: `gAryOK842`,
                            ...Zt(
                              {
                                VVJ9I4j1o: {
                                  background: {
                                    alt: ``,
                                    fit: `fill`,
                                    loading: E(
                                      (d?.y || 0) +
                                        ((d?.height || 614) *
                                          0.5863192182410426 -
                                          249.5) +
                                        0 +
                                        428,
                                    ),
                                    pixelHeight: 339,
                                    pixelWidth: 338,
                                    src: `./assets/images/gdmN2dDmg0szS1jwXPJFJZ0xsIE-c1669a40.png`,
                                  },
                                },
                              },
                              x,
                              D,
                            ),
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
          });
        }),
        [
          `@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`,
          `.framer-i4223.framer-1hwqsad, .framer-i4223 .framer-1hwqsad { display: block; }`,
          `.framer-i4223.framer-bkk9xd { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: 614px; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 614px; }`,
          `.framer-i4223 .framer-1o38f4i { flex: 1 0 0px; height: 100%; position: relative; width: 1px; }`,
          `.framer-i4223 .framer-1qbtx1q { flex: none; height: 471px; left: calc(50.00000000000002% - 471px / 2); position: absolute; top: 71px; width: 471px; z-index: 1; }`,
          `.framer-i4223 .framer-6m5jsz { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; left: 153px; overflow: visible; padding: 0px; position: absolute; right: 154px; top: 59%; z-index: 1; }`,
          `.framer-i4223 .framer-2nw8zl { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 321px; word-break: break-word; word-wrap: break-word; }`,
          `.framer-i4223 .framer-9zjwrc { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 170px; word-break: break-word; word-wrap: break-word; }`,
          `.framer-i4223 .framer-1yqo92c { flex: none; height: 48px; position: relative; text-decoration: none; width: 45px; }`,
          `.framer-i4223.framer-v-1wihn1x .framer-1qbtx1q { aspect-ratio: 1 / 1; bottom: 92px; height: var(--framer-aspect-ratio-supported, 425px); left: 95px; right: 95px; top: unset; width: unset; }`,
          `.framer-i4223.framer-v-1wihn1x .framer-9zjwrc { width: 265px; }`,
          `.framer-i4223.framer-v-1wihn1x .framer-1yqo92c { height: 71px; width: 91px; }`,
        ],
        `framer-i4223`,
      )),
      (pn = fn),
      (fn.displayName = `CTA 3`),
      (fn.defaultProps = { height: 614, width: 614 }),
      R(fn, {
        variant: {
          options: [`UeIsfCmuY`, `VVJ9I4j1o`],
          optionTitles: [`Desktop + tablet`, `Phone`],
          title: `Variant`,
          type: B.Enum,
        },
        hah7YEktd: {
          description: `Enter your Instagram link above. 

Find more templates on dvites.com`,
          title: `Link`,
          type: B.Link,
        },
      }),
      x(
        fn,
        [
          {
            explicitInter: !0,
            fonts: [
              {
                family: `Cormorant Upright`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/VuJrdM3I2Y35poFONtLdafkUCHw1y2vQjjTkeMnz.woff2`,
                weight: `400`,
              },
              {
                family: `Cormorant`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFhFTQ7Fg7A2uwYs.woff2`,
                weight: `400`,
              },
            ],
          },
        ],
        { supportsExplicitInterCodegen: !0 },
      ));
  });
function hn(e, ...t) {
  let n = {};
  return (t?.forEach((t) => t && Object.assign(n, e[t])), n);
}
var gn,
  _n,
  vn,
  yn,
  bn,
  xn,
  Sn,
  Cn,
  wn,
  Tn,
  En,
  Dn,
  On = e(() => {
    (c(),
      O(),
      p(),
      a(),
      ce(),
      (gn = D(ae)),
      (_n = [`LVn1XTe0j`, `TTNOXUvuF`]),
      (vn = `framer-7FjqJ`),
      (yn = { LVn1XTe0j: `framer-v-fvj4o3`, TTNOXUvuF: `framer-v-9po9uv` }),
      (bn = { bounce: 0.2, delay: 0, duration: 0.4, type: `spring` }),
      (xn = ({ value: e, children: t }) => {
        let n = r(d),
          a = e ?? n.transition,
          o = i(() => ({ ...n, transition: a }), [JSON.stringify(a)]);
        return u(d.Provider, { value: o, children: t });
      }),
      (Sn = m.create(n)),
      (Cn = { Desktop: `LVn1XTe0j`, Phone: `TTNOXUvuF` }),
      (wn = ({ height: e, id: t, width: n, ...r }) => ({
        ...r,
        variant: Cn[r.variant] ?? r.variant ?? `LVn1XTe0j`,
      })),
      (Tn = (e, t) =>
        e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`)),
      (En = T(
        o(function (e, n) {
          let r = t(null),
            i = n ?? r,
            a = s(),
            { activeLocale: o, setLocale: c } = I(),
            l = M(),
            { style: ee, className: d, layoutId: p, variant: m, ...g } = wn(e),
            {
              baseVariant: _,
              classNames: v,
              clearLoadingGesture: y,
              gestureHandlers: x,
              gestureVariant: S,
              isLoading: C,
              setGestureState: w,
              setVariant: T,
              variants: D,
            } = V({
              cycleOrder: _n,
              defaultVariant: `LVn1XTe0j`,
              ref: i,
              variant: m,
              variantClassNames: yn,
            }),
            O = Tn(e, D),
            k = b(vn);
          return u(f, {
            id: p ?? a,
            children: u(Sn, {
              animate: D,
              initial: !1,
              children: u(xn, {
                value: bn,
                children: u(P, {
                  ...g,
                  ...x,
                  background: {
                    alt: ``,
                    fit: `fill`,
                    intrinsicHeight: 561.5,
                    intrinsicWidth: 561.5,
                    loading: E(l?.y || 0),
                    pixelHeight: 1123,
                    pixelWidth: 1123,
                    sizes: l?.width || `100vw`,
                    src: `./assets/images/ZcRhO3OIg6FxXJGYnWlxDDJdt00-edf67d51.png`,
                    srcSet: `./assets/images/ZcRhO3OIg6FxXJGYnWlxDDJdt00-13c3c16b.png 512w,./assets/images/ZcRhO3OIg6FxXJGYnWlxDDJdt00-edf67d51.png 1024w,./assets/images/ZcRhO3OIg6FxXJGYnWlxDDJdt00-68c4c443.png 1123w`,
                  },
                  className: b(k, `framer-fvj4o3`, d, v),
                  "data-framer-name": `Desktop`,
                  layoutDependency: O,
                  layoutId: `LVn1XTe0j`,
                  ref: i,
                  style: { ...ee },
                  ...hn({ TTNOXUvuF: { "data-framer-name": `Phone` } }, _, S),
                  children: u(L, {
                    children: u(h, {
                      className: `framer-147vwyo-container`,
                      isAuthoredByUser: !0,
                      isModuleExternal: !0,
                      layoutDependency: O,
                      layoutId: `I1ep1hV6I-container`,
                      nodeId: `I1ep1hV6I`,
                      rendersWithMotion: !0,
                      scopeId: `EbleDXkVB`,
                      children: u(ae, {
                        alignment: `center`,
                        arrowOptions: {
                          arrowFill: `rgba(0, 0, 0, 0.2)`,
                          arrowGap: 16,
                          arrowPadding: -86,
                          arrowPaddingBottom: 0,
                          arrowPaddingLeft: 0,
                          arrowPaddingRight: 0,
                          arrowPaddingTop: 0,
                          arrowPosition: `bottom-mid`,
                          arrowRadius: 40,
                          arrowShouldFadeIn: !1,
                          arrowShouldSpace: !1,
                          arrowSize: 40,
                          showMouseControls: !1,
                        },
                        autoPlayControl: !0,
                        borderRadius: 300,
                        direction: `left`,
                        dragControl: !0,
                        effectsOptions: {
                          effectsHover: !0,
                          effectsOpacity: 1,
                          effectsPerspective: 1200,
                          effectsRotate: 0,
                          effectsScale: 1,
                          playOffscreen: !1,
                        },
                        fadeOptions: {
                          fadeAlpha: 0,
                          fadeContent: !1,
                          fadeInset: 0,
                          fadeWidth: 1,
                          overflow: !1,
                        },
                        gap: 0,
                        height: `100%`,
                        id: `I1ep1hV6I`,
                        intervalControl: 2,
                        itemAmount: 1,
                        layoutId: `I1ep1hV6I`,
                        padding: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                        paddingPerSide: !1,
                        paddingRight: 0,
                        paddingTop: 0,
                        progressOptions: {
                          dotsActiveOpacity: 1,
                          dotsBackground: `rgba(0, 0, 0, 0.2)`,
                          dotsBlur: 0,
                          dotsFill: `rgb(255, 255, 255)`,
                          dotsGap: 10,
                          dotsInset: 18,
                          dotSize: 4,
                          dotsOpacity: 0.5,
                          dotsPadding: 8,
                          dotsRadius: 50,
                          showProgressDots: !0,
                        },
                        slots: [
                          u(P, {
                            background: {
                              alt: ``,
                              fit: `fill`,
                              intrinsicHeight: 600,
                              intrinsicWidth: 337.5,
                              pixelHeight: 1350,
                              pixelWidth: 1080,
                              sizes: `540px`,
                              src: `./assets/images/gRww6exoGDvAz61zxbMcONGtfY-7fcb4397.jpeg`,
                              srcSet: `./assets/images/gRww6exoGDvAz61zxbMcONGtfY-7fcb4397.jpeg 819w,./assets/images/gRww6exoGDvAz61zxbMcONGtfY-8ff523ed.jpeg 1080w`,
                            },
                            className: `framer-1fte57q`,
                            "data-framer-name": `Wedding shoot 1`,
                            layoutDependency: O,
                            layoutId: `M0j7b4gko`,
                          }),
                          u(P, {
                            background: {
                              alt: ``,
                              fit: `fill`,
                              intrinsicHeight: 674.5,
                              intrinsicWidth: 540,
                              pixelHeight: 1350,
                              pixelWidth: 1080,
                              sizes: `540px`,
                              src: `./assets/images/97fFKjBlB41svOUd0yNGLWv4-234a1b61.jpeg`,
                              srcSet: `./assets/images/97fFKjBlB41svOUd0yNGLWv4-234a1b61.jpeg 819w,./assets/images/97fFKjBlB41svOUd0yNGLWv4-5a99c402.jpeg 1080w`,
                            },
                            className: `framer-1bx5xn3`,
                            "data-framer-name": `Wedding shoot 4`,
                            layoutDependency: O,
                            layoutId: `WmSg4blLq`,
                          }),
                          u(P, {
                            background: {
                              alt: ``,
                              fit: `fill`,
                              intrinsicHeight: 712.5,
                              intrinsicWidth: 589.5,
                              pixelHeight: 1350,
                              pixelWidth: 1080,
                              sizes: `540px`,
                              src: `./assets/images/kIF0ETtgRuNBoRKEFRcc3j8TKc-544f80c0.jpeg`,
                              srcSet: `./assets/images/kIF0ETtgRuNBoRKEFRcc3j8TKc-544f80c0.jpeg 819w,./assets/images/kIF0ETtgRuNBoRKEFRcc3j8TKc-14649d36.jpeg 1080w`,
                            },
                            className: `framer-1vmxmou`,
                            "data-framer-name": `Wedding shoot 2`,
                            layoutDependency: O,
                            layoutId: `D4Bb0STh9`,
                          }),
                          u(P, {
                            background: {
                              alt: ``,
                              fit: `fill`,
                              intrinsicHeight: 674.5,
                              intrinsicWidth: 540,
                              pixelHeight: 1350,
                              pixelWidth: 1080,
                              sizes: `540px`,
                              src: `./assets/images/cxldxuk5ae7V1ezs4LEAeu06bQ-2c8983a2.jpeg`,
                              srcSet: `./assets/images/cxldxuk5ae7V1ezs4LEAeu06bQ-2c8983a2.jpeg 819w,./assets/images/cxldxuk5ae7V1ezs4LEAeu06bQ-62c89458.jpeg 1080w`,
                            },
                            className: `framer-1sjniza`,
                            "data-framer-name": `Wedding shoot 3`,
                            layoutDependency: O,
                            layoutId: `ZekSNWmAC`,
                          }),
                        ],
                        startFrom: 0,
                        style: { height: `100%`, width: `100%` },
                        transitionControl: {
                          damping: 40,
                          delay: 0,
                          mass: 1,
                          stiffness: 200,
                          type: `spring`,
                        },
                        width: `100%`,
                      }),
                    }),
                  }),
                }),
              }),
            }),
          });
        }),
        [
          `@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`,
          `.framer-7FjqJ.framer-f3t02o, .framer-7FjqJ .framer-f3t02o { display: block; }`,
          `.framer-7FjqJ.framer-fvj4o3 { height: 897px; overflow: visible; position: relative; width: 897px; }`,
          `.framer-7FjqJ .framer-147vwyo-container { bottom: 313px; flex: none; left: 327px; position: absolute; right: 323px; top: 284px; }`,
          `.framer-7FjqJ .framer-1fte57q, .framer-7FjqJ .framer-1bx5xn3, .framer-7FjqJ .framer-1vmxmou, .framer-7FjqJ .framer-1sjniza { height: 675px; overflow: visible; position: relative; width: 540px; }`,
          `.framer-7FjqJ.framer-v-9po9uv.framer-fvj4o3 { aspect-ratio: 1 / 1; height: var(--framer-aspect-ratio-supported, 897px); }`,
          `.framer-7FjqJ.framer-v-9po9uv .framer-147vwyo-container { bottom: 323px; left: 342px; right: 342px; top: 294px; }`,
        ],
        `framer-7FjqJ`,
      )),
      (Dn = En),
      (En.displayName = `Pendant`),
      (En.defaultProps = { height: 897, width: 897 }),
      R(En, {
        variant: {
          options: [`LVn1XTe0j`, `TTNOXUvuF`],
          optionTitles: [`Desktop`, `Phone`],
          title: `Variant`,
          type: B.Enum,
        },
      }),
      x(En, [{ explicitInter: !0, fonts: [] }, ...gn], {
        supportsExplicitInterCodegen: !0,
      }));
  });
function kn(e, ...t) {
  let n = {};
  return (t?.forEach((t) => t && Object.assign(n, e[t])), n);
}
var An,
  jn,
  Mn,
  Nn,
  Pn,
  Fn,
  In,
  Ln,
  Rn,
  zn,
  Bn,
  Vn = e(() => {
    (c(),
      O(),
      p(),
      a(),
      (An = [`At3_yzDr0`, `h1X6IILMa`]),
      (jn = `framer-TTEX3`),
      (Mn = { At3_yzDr0: `framer-v-l7j1zt`, h1X6IILMa: `framer-v-1xhzh4r` }),
      (Nn = { bounce: 0.2, delay: 0, duration: 0.4, type: `spring` }),
      (Pn = ({ value: e, children: t }) => {
        let n = r(d),
          a = e ?? n.transition,
          o = i(() => ({ ...n, transition: a }), [JSON.stringify(a)]);
        return u(d.Provider, { value: o, children: t });
      }),
      (Fn = m.create(n)),
      (In = { "Desktop + tablet": `At3_yzDr0`, Phone: `h1X6IILMa` }),
      (Ln = ({ height: e, id: t, message: n, width: r, ...i }) => ({
        ...i,
        ElrcvIalk:
          n ??
          i.ElrcvIalk ??
          `We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. The affection shown to us by so many people since our roka has been incredibly moving, and has touched us both deeply. We would like to take this opportunity to thank everyone most sincerely for their kindness.We are looking forward to see you at the wedding functions.`,
        variant: In[i.variant] ?? i.variant ?? `At3_yzDr0`,
      })),
      (Rn = (e, t) =>
        e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`)),
      (zn = T(
        o(function (e, r) {
          let i = t(null),
            a = r ?? i,
            o = s(),
            { activeLocale: c, setLocale: ee } = I();
          M();
          let {
              style: d,
              className: p,
              layoutId: h,
              variant: g,
              ElrcvIalk: _,
              ...v
            } = Ln(e),
            {
              baseVariant: y,
              classNames: x,
              clearLoadingGesture: S,
              gestureHandlers: C,
              gestureVariant: T,
              isLoading: E,
              setGestureState: D,
              setVariant: O,
              variants: k,
            } = V({
              cycleOrder: An,
              defaultVariant: `At3_yzDr0`,
              ref: a,
              variant: g,
              variantClassNames: Mn,
            }),
            A = Rn(e, k),
            j = b(jn);
          return u(f, {
            id: h ?? o,
            children: u(Fn, {
              animate: k,
              initial: !1,
              children: u(Pn, {
                value: Nn,
                children: u(m.div, {
                  ...v,
                  ...C,
                  className: b(j, `framer-l7j1zt`, p, x),
                  "data-framer-name": `Desktop + tablet`,
                  layoutDependency: A,
                  layoutId: `At3_yzDr0`,
                  ref: a,
                  style: { ...d },
                  ...kn({ h1X6IILMa: { "data-framer-name": `Phone` } }, y, T),
                  children: u(m.div, {
                    className: `framer-1taty03`,
                    layoutDependency: A,
                    layoutId: `OyEFW9Zmu`,
                    children: u(w, {
                      __fromCanvasComponent: !0,
                      children: l(n, {
                        children: [
                          u(m.p, {
                            style: {
                              "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                              "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                              "--framer-text-alignment": `center`,
                              "--framer-text-color": `var(--extracted-r6o4lv, rgb(12, 72, 96))`,
                            },
                            children: `We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. The affection shown to us by so many people since our roka has been incredibly moving, and has touched us both deeply. We would like to take this opportunity to thank everyone most sincerely for their kindness.`,
                          }),
                          u(m.p, {
                            style: {
                              "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                              "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                              "--framer-text-alignment": `center`,
                              "--framer-text-color": `var(--extracted-2gxw0f, rgb(12, 72, 96))`,
                            },
                            children: u(m.br, { className: `trailing-break` }),
                          }),
                          u(m.p, {
                            style: {
                              "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                              "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                              "--framer-text-alignment": `center`,
                              "--framer-text-color": `var(--extracted-1iakedh, rgb(12, 72, 96))`,
                            },
                            children: `We are looking forward to see you `,
                          }),
                          u(m.p, {
                            style: {
                              "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                              "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                              "--framer-text-alignment": `center`,
                              "--framer-text-color": `var(--extracted-14qxiz, rgb(12, 72, 96))`,
                            },
                            children: `at the wedding functions.`,
                          }),
                        ],
                      }),
                      className: `framer-xlue5t`,
                      "data-framer-name": `Couple's message`,
                      fonts: [`GF;Cormorant-regular`],
                      layoutDependency: A,
                      layoutId: `WwZTLcO1_`,
                      style: {
                        "--extracted-14qxiz": `rgb(12, 72, 96)`,
                        "--extracted-1iakedh": `rgb(12, 72, 96)`,
                        "--extracted-2gxw0f": `rgb(12, 72, 96)`,
                        "--extracted-r6o4lv": `rgb(12, 72, 96)`,
                        "--framer-paragraph-spacing": `0px`,
                      },
                      text: _,
                      verticalAlignment: `top`,
                      withExternalLayout: !0,
                    }),
                  }),
                }),
              }),
            }),
          });
        }),
        [
          `@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`,
          `.framer-TTEX3.framer-2q6oln, .framer-TTEX3 .framer-2q6oln { display: block; }`,
          `.framer-TTEX3.framer-l7j1zt { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 650px; }`,
          `.framer-TTEX3 .framer-1taty03 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
          `.framer-TTEX3 .framer-xlue5t { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }`,
        ],
        `framer-TTEX3`,
      )),
      (Bn = zn),
      (zn.displayName = `Couple's message`),
      (zn.defaultProps = { height: 77, width: 650 }),
      R(zn, {
        variant: {
          options: [`At3_yzDr0`, `h1X6IILMa`],
          optionTitles: [`Desktop + tablet`, `Phone`],
          title: `Variant`,
          type: B.Enum,
        },
        ElrcvIalk: {
          defaultValue: `We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. The affection shown to us by so many people since our roka has been incredibly moving, and has touched us both deeply. We would like to take this opportunity to thank everyone most sincerely for their kindness.We are looking forward to see you at the wedding functions.`,
          description: `Write your custom couple's message above`,
          displayTextArea: !0,
          title: `Message`,
          type: B.String,
        },
      }),
      x(
        zn,
        [
          {
            explicitInter: !0,
            fonts: [
              {
                family: `Cormorant`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFhFTQ7Fg7A2uwYs.woff2`,
                weight: `400`,
              },
            ],
          },
        ],
        { supportsExplicitInterCodegen: !0 },
      ));
  });
function Hn(e, ...t) {
  let n = {};
  return (t?.forEach((t) => t && Object.assign(n, e[t])), n);
}
var Un,
  Wn,
  Gn,
  Kn,
  qn,
  Jn,
  Yn,
  Xn,
  Zn,
  Qn,
  $n,
  er = e(() => {
    (c(),
      O(),
      p(),
      a(),
      (Un = [`uloxJ0t5s`, `csPF25Krs`]),
      (Wn = `framer-k1di0`),
      (Gn = { csPF25Krs: `framer-v-1ttdn9i`, uloxJ0t5s: `framer-v-omr146` }),
      (Kn = { bounce: 0.2, delay: 0, duration: 0.4, type: `spring` }),
      (qn = ({ value: e, children: t }) => {
        let n = r(d),
          a = e ?? n.transition,
          o = i(() => ({ ...n, transition: a }), [JSON.stringify(a)]);
        return u(d.Provider, { value: o, children: t });
      }),
      (Jn = m.create(n)),
      (Yn = { "Desktop + tablet": `uloxJ0t5s`, Phone: `csPF25Krs` }),
      (Xn = ({
        height: e,
        id: t,
        parents: n,
        relation: r,
        width: i,
        ...a
      }) => ({
        ...a,
        gYtHAhAat: r ?? a.gYtHAhAat ?? `Daughter of`,
        M0b6PSgQY: n ?? a.M0b6PSgQY ?? `Mrs. Reena & Mr. Kamal Mittal,`,
        variant: Yn[a.variant] ?? a.variant ?? `uloxJ0t5s`,
      })),
      (Zn = (e, t) =>
        e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`)),
      (Qn = T(
        o(function (e, r) {
          let i = t(null),
            a = r ?? i,
            o = s(),
            { activeLocale: c, setLocale: ee } = I();
          M();
          let {
              style: d,
              className: p,
              layoutId: h,
              variant: g,
              gYtHAhAat: _,
              M0b6PSgQY: v,
              ...y
            } = Xn(e),
            {
              baseVariant: x,
              classNames: S,
              clearLoadingGesture: C,
              gestureHandlers: T,
              gestureVariant: E,
              isLoading: D,
              setGestureState: O,
              setVariant: k,
              variants: A,
            } = V({
              cycleOrder: Un,
              defaultVariant: `uloxJ0t5s`,
              ref: a,
              variant: g,
              variantClassNames: Gn,
            }),
            j = Zn(e, A),
            N = b(Wn);
          return u(f, {
            id: h ?? o,
            children: u(Jn, {
              animate: A,
              initial: !1,
              children: u(qn, {
                value: Kn,
                children: l(m.div, {
                  ...y,
                  ...T,
                  className: b(N, `framer-omr146`, p, S),
                  "data-framer-name": `Desktop + tablet`,
                  layoutDependency: j,
                  layoutId: `uloxJ0t5s`,
                  ref: a,
                  style: { ...d },
                  ...Hn({ csPF25Krs: { "data-framer-name": `Phone` } }, x, E),
                  children: [
                    l(m.div, {
                      className: `framer-c5qoi5`,
                      layoutDependency: j,
                      layoutId: `AdYIZhmsb`,
                      children: [
                        u(w, {
                          __fromCanvasComponent: !0,
                          children: u(n, {
                            children: u(m.p, {
                              style: {
                                "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                "--framer-font-size": `30px`,
                                "--framer-letter-spacing": `-0.05em`,
                                "--framer-line-height": `100%`,
                                "--framer-text-alignment": `center`,
                                "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                              },
                              children: `Daughter of`,
                            }),
                          }),
                          className: `framer-15b9sdl`,
                          "data-framer-name": `Text 1`,
                          fonts: [`GF;Cormorant Upright-regular`],
                          layoutDependency: j,
                          layoutId: `dMWjrrSMj`,
                          style: {
                            "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                            "--framer-paragraph-spacing": `0px`,
                          },
                          text: _,
                          verticalAlignment: `top`,
                          withExternalLayout: !0,
                          ...Hn(
                            {
                              csPF25Krs: {
                                children: u(n, {
                                  children: u(m.p, {
                                    style: {
                                      "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                      "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                      "--framer-font-size": `20px`,
                                      "--framer-letter-spacing": `-0.05em`,
                                      "--framer-line-height": `100%`,
                                      "--framer-text-alignment": `center`,
                                      "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                    },
                                    children: `Daughter of`,
                                  }),
                                }),
                              },
                            },
                            x,
                            E,
                          ),
                        }),
                        u(w, {
                          __fromCanvasComponent: !0,
                          children: u(n, {
                            children: u(m.p, {
                              style: {
                                "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                "--framer-font-size": `30px`,
                                "--framer-letter-spacing": `-0.05em`,
                                "--framer-line-height": `100%`,
                                "--framer-text-alignment": `center`,
                                "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                              },
                              children: `Mrs. Reena & Mr. Kamal Mittal,`,
                            }),
                          }),
                          className: `framer-1wj7b8h`,
                          "data-framer-name": `Text 2`,
                          fonts: [`GF;Cormorant Upright-regular`],
                          layoutDependency: j,
                          layoutId: `OtARJJi5L`,
                          style: {
                            "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                            "--framer-paragraph-spacing": `0px`,
                          },
                          text: v,
                          verticalAlignment: `top`,
                          withExternalLayout: !0,
                          ...Hn(
                            {
                              csPF25Krs: {
                                children: u(n, {
                                  children: u(m.p, {
                                    style: {
                                      "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                      "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                      "--framer-font-size": `20px`,
                                      "--framer-letter-spacing": `-0.05em`,
                                      "--framer-line-height": `100%`,
                                      "--framer-text-alignment": `center`,
                                      "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                    },
                                    children: `Mrs. Reena & Mr. Kamal Mittal,`,
                                  }),
                                }),
                              },
                            },
                            x,
                            E,
                          ),
                        }),
                      ],
                    }),
                    u(w, {
                      __fromCanvasComponent: !0,
                      children: u(n, {
                        children: u(m.p, {
                          style: {
                            "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                            "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                            "--framer-font-size": `30px`,
                            "--framer-letter-spacing": `-0.05em`,
                            "--framer-line-height": `100%`,
                            "--framer-text-alignment": `center`,
                            "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                          },
                          children: `On the following events`,
                        }),
                      }),
                      className: `framer-13yttev`,
                      "data-framer-name": `Text 3`,
                      fonts: [`GF;Cormorant Upright-regular`],
                      layoutDependency: j,
                      layoutId: `wAl9155jw`,
                      style: {
                        "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                        "--framer-paragraph-spacing": `0px`,
                      },
                      verticalAlignment: `top`,
                      withExternalLayout: !0,
                      ...Hn(
                        {
                          csPF25Krs: {
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                  "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                  "--framer-font-size": `20px`,
                                  "--framer-letter-spacing": `-0.05em`,
                                  "--framer-line-height": `100%`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `On the following events`,
                              }),
                            }),
                          },
                        },
                        x,
                        E,
                      ),
                    }),
                  ],
                }),
              }),
            }),
          });
        }),
        [
          `@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`,
          `.framer-k1di0.framer-7yrwcb, .framer-k1di0 .framer-7yrwcb { display: block; }`,
          `.framer-k1di0.framer-omr146 { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 46px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 32px 0px 32px 0px; position: relative; width: 1200px; }`,
          `.framer-k1di0 .framer-c5qoi5 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
          `.framer-k1di0 .framer-15b9sdl, .framer-k1di0 .framer-1wj7b8h, .framer-k1di0 .framer-13yttev { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }`,
        ],
        `framer-k1di0`,
      )),
      ($n = Qn),
      (Qn.displayName = `Family names 2`),
      (Qn.defaultProps = { height: 210, width: 1200 }),
      R(Qn, {
        variant: {
          options: [`uloxJ0t5s`, `csPF25Krs`],
          optionTitles: [`Desktop + tablet`, `Phone`],
          title: `Variant`,
          type: B.Enum,
        },
        gYtHAhAat: {
          defaultValue: `Daughter of`,
          description: `"Son of" or "Daughter of"`,
          displayTextArea: !1,
          title: `Relation`,
          type: B.String,
        },
        M0b6PSgQY: {
          defaultValue: `Mrs. Reena & Mr. Kamal Mittal,`,
          description: `Enter parent's names above.

Find more templates on dvites.com`,
          displayTextArea: !0,
          title: `Parents`,
          type: B.String,
        },
      }),
      x(
        Qn,
        [
          {
            explicitInter: !0,
            fonts: [
              {
                family: `Cormorant Upright`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/VuJrdM3I2Y35poFONtLdafkUCHw1y2vQjjTkeMnz.woff2`,
                weight: `400`,
              },
            ],
          },
        ],
        { supportsExplicitInterCodegen: !0 },
      ));
  });
function tr(e, ...t) {
  let n = {};
  return (t?.forEach((t) => t && Object.assign(n, e[t])), n);
}
var nr,
  rr,
  ir,
  ar,
  or,
  sr,
  cr,
  lr,
  ur,
  dr,
  fr,
  pr = e(() => {
    (c(),
      O(),
      p(),
      a(),
      (nr = [`IylPxKka_`, `ZgTVo_Rem`]),
      (rr = `framer-3XAJW`),
      (ir = { IylPxKka_: `framer-v-185etpf`, ZgTVo_Rem: `framer-v-1yaaktb` }),
      (ar = { bounce: 0.2, delay: 0, duration: 0.4, type: `spring` }),
      (or = ({ value: e, children: t }) => {
        let n = r(d),
          a = e ?? n.transition,
          o = i(() => ({ ...n, transition: a }), [JSON.stringify(a)]);
        return u(d.Provider, { value: o, children: t });
      }),
      (sr = m.create(n)),
      (cr = { "Desktop + tablet": `IylPxKka_`, Phone: `ZgTVo_Rem` }),
      (lr = ({ height: e, id: t, message: n, width: r, ...i }) => ({
        ...i,
        EHFKzhqxg:
          n ??
          i.EHFKzhqxg ??
          `Mittal family is excited that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. `,
        variant: cr[i.variant] ?? i.variant ?? `IylPxKka_`,
      })),
      (ur = (e, t) =>
        e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`)),
      (dr = T(
        o(function (e, r) {
          let i = t(null),
            a = r ?? i,
            o = s(),
            { activeLocale: c, setLocale: l } = I();
          M();
          let {
              style: ee,
              className: d,
              layoutId: p,
              variant: h,
              EHFKzhqxg: g,
              ..._
            } = lr(e),
            {
              baseVariant: v,
              classNames: y,
              clearLoadingGesture: x,
              gestureHandlers: S,
              gestureVariant: C,
              isLoading: T,
              setGestureState: E,
              setVariant: D,
              variants: O,
            } = V({
              cycleOrder: nr,
              defaultVariant: `IylPxKka_`,
              ref: a,
              variant: h,
              variantClassNames: ir,
            }),
            k = ur(e, O),
            A = b(rr);
          return u(f, {
            id: p ?? o,
            children: u(sr, {
              animate: O,
              initial: !1,
              children: u(or, {
                value: ar,
                children: u(m.div, {
                  ..._,
                  ...S,
                  className: b(A, `framer-185etpf`, d, y),
                  "data-framer-name": `Desktop + tablet`,
                  layoutDependency: k,
                  layoutId: `IylPxKka_`,
                  ref: a,
                  style: { ...ee },
                  ...tr({ ZgTVo_Rem: { "data-framer-name": `Phone` } }, v, C),
                  children: u(m.div, {
                    className: `framer-a6ycli`,
                    layoutDependency: k,
                    layoutId: `O4WjDuTvg`,
                    children: u(w, {
                      __fromCanvasComponent: !0,
                      children: u(n, {
                        children: u(m.p, {
                          style: {
                            "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                            "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                            "--framer-font-size": `14px`,
                            "--framer-text-alignment": `center`,
                            "--framer-text-color": `var(--extracted-r6o4lv, rgb(68, 19, 155))`,
                          },
                          children: `Mittal family is excited that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. `,
                        }),
                      }),
                      className: `framer-8mqvhq`,
                      "data-framer-name": `Our families are excited that you are able to join us in celebrating what we hope will be one of the happiest days of our lives.`,
                      fonts: [`GF;Cormorant Upright-regular`],
                      layoutDependency: k,
                      layoutId: `vn85byb1U`,
                      style: {
                        "--extracted-r6o4lv": `rgb(68, 19, 155)`,
                        "--framer-paragraph-spacing": `0px`,
                      },
                      text: g,
                      verticalAlignment: `top`,
                      withExternalLayout: !0,
                    }),
                  }),
                }),
              }),
            }),
          });
        }),
        [
          `@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`,
          `.framer-3XAJW.framer-vjvkvm, .framer-3XAJW .framer-vjvkvm { display: block; }`,
          `.framer-3XAJW.framer-185etpf { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 418px; }`,
          `.framer-3XAJW .framer-a6ycli { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
          `.framer-3XAJW .framer-8mqvhq { flex: 1 0 0px; height: auto; position: relative; white-space: pre-wrap; width: 1px; word-break: break-word; word-wrap: break-word; }`,
        ],
        `framer-3XAJW`,
      )),
      (fr = dr),
      (dr.displayName = `Family message`),
      (dr.defaultProps = { height: 33.5, width: 418 }),
      R(dr, {
        variant: {
          options: [`IylPxKka_`, `ZgTVo_Rem`],
          optionTitles: [`Desktop + tablet`, `Phone`],
          title: `Variant`,
          type: B.Enum,
        },
        EHFKzhqxg: {
          defaultValue: `Mittal family is excited that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. `,
          description: `Enter your custom family message.

Find more templates on dvites.com`,
          displayTextArea: !0,
          title: `Message`,
          type: B.String,
        },
      }),
      x(
        dr,
        [
          {
            explicitInter: !0,
            fonts: [
              {
                family: `Cormorant Upright`,
                source: `google`,
                style: `normal`,
                url: `./assets/fonts/VuJrdM3I2Y35poFONtLdafkUCHw1y2vQjjTkeMnz.woff2`,
                weight: `400`,
              },
            ],
          },
        ],
        { supportsExplicitInterCodegen: !0 },
      ));
  });
function mr(e, ...t) {
  let n = {};
  return (t?.forEach((t) => t && Object.assign(n, e[t])), n);
}
var hr,
  gr,
  _r,
  vr,
  yr,
  br,
  xr,
  Sr,
  Cr,
  wr,
  Tr,
  Er = e(() => {
    (c(),
      O(),
      p(),
      a(),
      (hr = [`m0xjdm2fz`, `WZ1jbCL3w`]),
      (gr = `framer-8n7dF`),
      (_r = { m0xjdm2fz: `framer-v-pi54um`, WZ1jbCL3w: `framer-v-10cu0x6` }),
      (vr = { bounce: 0.2, delay: 0, duration: 0.4, type: `spring` }),
      (yr = ({ value: e, children: t }) => {
        let n = r(d),
          a = e ?? n.transition,
          o = i(() => ({ ...n, transition: a }), [JSON.stringify(a)]);
        return u(d.Provider, { value: o, children: t });
      }),
      (br = m.create(n)),
      (xr = { "Desktop + tablet": `m0xjdm2fz`, Phone: `WZ1jbCL3w` }),
      (Sr = ({
        blessingOf: e,
        grandparents: t,
        height: n,
        id: r,
        parents: i,
        width: a,
        ...o
      }) => ({
        ...o,
        BshHh42hy: i ?? o.BshHh42hy ?? `Mrs. Lata & Mr. Kishore Kapoor`,
        variant: xr[o.variant] ?? o.variant ?? `m0xjdm2fz`,
        vHsJLcDe4: t ?? o.vHsJLcDe4 ?? `Smt. Sita Devi & Sm. Kamal Mittal`,
        z8Etn2ctK: e ?? o.z8Etn2ctK ?? `With the heavenly blessings of `,
      })),
      (Cr = (e, t) =>
        e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`)),
      (wr = T(
        o(function (e, r) {
          let i = t(null),
            a = r ?? i,
            o = s(),
            { activeLocale: c, setLocale: ee } = I();
          M();
          let {
              style: d,
              className: p,
              layoutId: h,
              variant: g,
              z8Etn2ctK: _,
              vHsJLcDe4: v,
              BshHh42hy: y,
              ...x
            } = Sr(e),
            {
              baseVariant: S,
              classNames: C,
              clearLoadingGesture: T,
              gestureHandlers: E,
              gestureVariant: D,
              isLoading: O,
              setGestureState: k,
              setVariant: A,
              variants: j,
            } = V({
              cycleOrder: hr,
              defaultVariant: `m0xjdm2fz`,
              ref: a,
              variant: g,
              variantClassNames: _r,
            }),
            N = Cr(e, j),
            P = b(gr);
          return u(f, {
            id: h ?? o,
            children: u(br, {
              animate: j,
              initial: !1,
              children: u(yr, {
                value: vr,
                children: l(m.div, {
                  ...x,
                  ...E,
                  className: b(P, `framer-pi54um`, p, C),
                  "data-framer-name": `Desktop + tablet`,
                  layoutDependency: N,
                  layoutId: `m0xjdm2fz`,
                  ref: a,
                  style: { ...d },
                  ...mr({ WZ1jbCL3w: { "data-framer-name": `Phone` } }, S, D),
                  children: [
                    u(w, {
                      __fromCanvasComponent: !0,
                      children: u(n, {
                        children: u(m.p, {
                          style: {
                            "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                            "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                            "--framer-font-size": `30px`,
                            "--framer-letter-spacing": `-0.03em`,
                            "--framer-line-height": `100%`,
                            "--framer-text-alignment": `center`,
                            "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                          },
                          children: `With the heavenly blessings of `,
                        }),
                      }),
                      className: `framer-6e6lk2`,
                      "data-framer-name": `With the heavenly blessings of Smt. Sita Devi & Sm. Om Puri`,
                      fonts: [`GF;Cormorant Upright-regular`],
                      layoutDependency: N,
                      layoutId: `raIo8nRAV`,
                      style: {
                        "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                        "--framer-paragraph-spacing": `0px`,
                      },
                      text: _,
                      verticalAlignment: `top`,
                      withExternalLayout: !0,
                      ...mr(
                        {
                          WZ1jbCL3w: {
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                  "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                  "--framer-font-size": `20px`,
                                  "--framer-letter-spacing": `-0.03em`,
                                  "--framer-line-height": `100%`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `With the heavenly blessings of `,
                              }),
                            }),
                          },
                        },
                        S,
                        D,
                      ),
                    }),
                    u(w, {
                      __fromCanvasComponent: !0,
                      children: u(n, {
                        children: u(m.p, {
                          style: {
                            "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                            "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                            "--framer-font-size": `30px`,
                            "--framer-letter-spacing": `-0.03em`,
                            "--framer-line-height": `100%`,
                            "--framer-text-alignment": `center`,
                            "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                          },
                          children: `Smt. Sita Devi & Sm. Kamal Mittal`,
                        }),
                      }),
                      className: `framer-eywdfr`,
                      "data-framer-name": `With the heavenly blessings of Smt. Sita Devi & Sm. Om Puri`,
                      fonts: [`GF;Cormorant Upright-regular`],
                      layoutDependency: N,
                      layoutId: `pObxyhp3B`,
                      style: {
                        "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                        "--framer-paragraph-spacing": `0px`,
                      },
                      text: v,
                      verticalAlignment: `top`,
                      withExternalLayout: !0,
                      ...mr(
                        {
                          WZ1jbCL3w: {
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                  "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                  "--framer-font-size": `20px`,
                                  "--framer-letter-spacing": `-0.03em`,
                                  "--framer-line-height": `100%`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `Smt. Sita Devi & Sm. Kamal Mittal`,
                              }),
                            }),
                          },
                        },
                        S,
                        D,
                      ),
                    }),
                    u(w, {
                      __fromCanvasComponent: !0,
                      children: u(n, {
                        children: u(m.p, {
                          style: {
                            "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                            "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                            "--framer-font-size": `30px`,
                            "--framer-letter-spacing": `-0.03em`,
                            "--framer-line-height": `150%`,
                            "--framer-text-alignment": `center`,
                            "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                          },
                          children: `——`,
                        }),
                      }),
                      className: `framer-z0vfwb`,
                      "data-framer-name": `and`,
                      fonts: [`GF;Cormorant Upright-regular`],
                      layoutDependency: N,
                      layoutId: `v48oERR_6`,
                      style: {
                        "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                        "--framer-paragraph-spacing": `0px`,
                      },
                      verticalAlignment: `top`,
                      withExternalLayout: !0,
                      ...mr(
                        {
                          WZ1jbCL3w: {
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                  "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                  "--framer-font-size": `20px`,
                                  "--framer-letter-spacing": `-0.03em`,
                                  "--framer-line-height": `150%`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `——`,
                              }),
                            }),
                          },
                        },
                        S,
                        D,
                      ),
                    }),
                    u(w, {
                      __fromCanvasComponent: !0,
                      children: u(n, {
                        children: u(m.p, {
                          style: {
                            "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                            "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                            "--framer-font-size": `30px`,
                            "--framer-letter-spacing": `-0.03em`,
                            "--framer-line-height": `150%`,
                            "--framer-text-alignment": `center`,
                            "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                          },
                          children: `Mrs. Lata & Mr. Kishore Kapoor`,
                        }),
                      }),
                      className: `framer-9qocwq`,
                      "data-framer-name": `Mrs. Lata & Mr. Kishore Kapoor`,
                      fonts: [`GF;Cormorant Upright-regular`],
                      layoutDependency: N,
                      layoutId: `AeHQzYEwG`,
                      style: {
                        "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                        "--framer-paragraph-spacing": `0px`,
                      },
                      text: y,
                      verticalAlignment: `top`,
                      withExternalLayout: !0,
                      ...mr(
                        {
                          WZ1jbCL3w: {
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                  "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                  "--framer-font-size": `20px`,
                                  "--framer-letter-spacing": `-0.03em`,
                                  "--framer-line-height": `150%`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `Mrs. Lata & Mr. Kishore Kapoor`,
                              }),
                            }),
                          },
                        },
                        S,
                        D,
                      ),
                    }),
                  ],
                }),
              }),
            }),
          });
        }),
        [
          `@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`,
          `.framer-8n7dF.framer-1hks6hh, .framer-8n7dF .framer-1hks6hh { display: block; }`,
          `.framer-8n7dF.framer-pi54um { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 38px 0px 38px 0px; position: relative; width: 1200px; }`,
          `.framer-8n7dF .framer-6e6lk2, .framer-8n7dF .framer-eywdfr, .framer-8n7dF .framer-z0vfwb, .framer-8n7dF .framer-9qocwq { flex: none; height: auto; position: relative; white-space: pre; width: auto; }`,
        ],
        `framer-8n7dF`,
      )),
      (Tr = wr),
      (wr.displayName = `Family names`),
      (wr.defaultProps = { height: 256, width: 1200 }),
      R(wr, {
        variant: {
          options: [`m0xjdm2fz`, `WZ1jbCL3w`],
          optionTitles: [`Desktop + tablet`, `Phone`],
          title: `Variant`,
          type: B.Enum,
        },
        z8Etn2ctK: {
          defaultValue: `With the heavenly blessings of `,
          displayTextArea: !0,
          title: `Blessing of`,
          type: B.String,
        },
        vHsJLcDe4: {
          defaultValue: `Smt. Sita Devi & Sm. Kamal Mittal`,
          description: `Enter your grandparent's names above.

Find more templates on dvites.com`,
          displayTextArea: !0,
          title: `Grandparents`,
          type: B.String,
        },
        BshHh42hy: {
          defaultValue: `Mrs. Lata & Mr. Kishore Kapoor`,
          description: `Enter your parent's names above

Find more templates on dvites.com`,
          displayTextArea: !0,
          title: `Parents`,
          type: B.String,
        },
      }),
      x(
        wr,
        [
          {
            explicitInter: !0,
            fonts: [
              {
                cssFamilyName: `Cormorant Upright`,
                source: `google`,
                style: `normal`,
                uiFamilyName: `Cormorant Upright`,
                url: `./assets/fonts/VuJrdM3I2Y35poFONtLdafkUCHw1y2vQjjTkeMnz.woff2`,
                weight: `400`,
              },
            ],
          },
        ],
        { supportsExplicitInterCodegen: !0 },
      ));
  }),
  Dr,
  Or,
  kr,
  Ar = e(() => {
    (O(),
      S.loadFonts([]),
      (Dr = [{ explicitInter: !0, fonts: [] }]),
      (Or = [
        `.framer-5kyW7 .framer-styles-preset-thf6wm:not(.rich-text-wrapper), .framer-5kyW7 .framer-styles-preset-thf6wm.rich-text-wrapper a { --framer-link-text-color: #ab9546; --framer-link-text-decoration: underline; }`,
      ]),
      (kr = `framer-5kyW7`));
  }),
  jr,
  Mr,
  Nr,
  Pr,
  Fr,
  Ir,
  Lr,
  Rr,
  zr,
  Br,
  Vr,
  Y,
  Hr = e(() => {
    (c(),
      O(),
      p(),
      a(),
      Ar(),
      (jr = `framer-m4bwU`),
      (Mr = { IGCqALO3_: `framer-v-j2h2je` }),
      (Nr = void 0),
      (Pr = { bounce: 0.2, delay: 0, duration: 0.4, type: `spring` }),
      (Fr = (e) =>
        typeof e == `object` && e && typeof e.src == `string`
          ? e
          : typeof e == `string`
            ? { src: e }
            : void 0),
      (Ir = (e, t) => `translateY(-50%) ${t}`),
      (Lr = ({ value: e, children: t }) => {
        let n = r(d),
          a = e ?? n.transition,
          o = i(() => ({ ...n, transition: a }), [JSON.stringify(a)]);
        return u(d.Provider, { value: o, children: t });
      }),
      (Rr = m.create(n)),
      (zr = ({
        date: e,
        event: t,
        height: n,
        id: r,
        image: i,
        time: a,
        venue: o,
        width: s,
        ...c
      }) => ({
        ...c,
        BpHZc3dYA: i ??
          c.BpHZc3dYA ?? {
            alt: ``,
            pixelHeight: 733,
            pixelWidth: 489,
            src: `./assets/images/ID0lfmpfvPSHakowK7tCTjmSu0-4e3f4b38.png`,
            srcSet: `./assets/images/ID0lfmpfvPSHakowK7tCTjmSu0-4e3f4b38.png 489w`,
          },
        bsf43jDPr: o ?? c.bsf43jDPr ?? `JW Mariott, Mussoorie`,
        kcDbVVA2X: e ?? c.kcDbVVA2X ?? `Thursday, January 25th `,
        oTOyY8dm8: a ?? c.oTOyY8dm8 ?? `6pm Onwards`,
        WoL7lzUKR: t ?? c.WoL7lzUKR ?? `Mehendi`,
      })),
      (Br = (e, t) =>
        e.layoutDependency ? t.join(`-`) + e.layoutDependency : t.join(`-`)),
      (Vr = T(
        o(function (e, r) {
          let i = t(null),
            a = r ?? i,
            o = s(),
            { activeLocale: c, setLocale: ee } = I(),
            d = M(),
            {
              style: p,
              className: h,
              layoutId: g,
              variant: _,
              BpHZc3dYA: v,
              WoL7lzUKR: y,
              kcDbVVA2X: x,
              bsf43jDPr: S,
              oTOyY8dm8: C,
              ...T
            } = zr(e),
            {
              baseVariant: D,
              classNames: O,
              clearLoadingGesture: k,
              gestureHandlers: A,
              gestureVariant: j,
              isLoading: N,
              setGestureState: L,
              setVariant: R,
              variants: z,
            } = V({
              defaultVariant: `IGCqALO3_`,
              ref: a,
              variant: _,
              variantClassNames: Mr,
            }),
            B = Br(e, z),
            te = b(jr, kr);
          return u(f, {
            id: g ?? o,
            children: u(Rr, {
              animate: z,
              initial: !1,
              children: u(Lr, {
                value: Pr,
                children: u(m.div, {
                  ...T,
                  ...A,
                  className: b(te, `framer-j2h2je`, h, O),
                  "data-framer-name": `Variant 1`,
                  layoutDependency: B,
                  layoutId: `IGCqALO3_`,
                  ref: a,
                  style: { ...p },
                  children: l(m.div, {
                    className: `framer-f7k6uh`,
                    layoutDependency: B,
                    layoutId: `aRnSzt4bX`,
                    children: [
                      u(m.div, {
                        className: `framer-1ili1ku`,
                        "data-framer-name": `Image and elements`,
                        layoutDependency: B,
                        layoutId: `XzhFDFUXr`,
                        children: l(m.div, {
                          className: `framer-1rpake`,
                          "data-framer-name": `The card`,
                          layoutDependency: B,
                          layoutId: `PsTLoRPzU`,
                          children: [
                            u(P, {
                              background: {
                                alt: ``,
                                fit: `stretch`,
                                loading: E(
                                  (d?.y || 0) +
                                    0 +
                                    (((d?.height || 553) - 0 - 553) / 2 +
                                      0 +
                                      0) +
                                    0 +
                                    -122.48 +
                                    0 +
                                    0 +
                                    11.4807,
                                ),
                                pixelHeight: 733,
                                pixelWidth: 489,
                                sizes: `244px`,
                                ...Fr(v),
                                positionX: `center`,
                                positionY: `center`,
                              },
                              className: `framer-1y6mu2p`,
                              "data-framer-name": `Event image`,
                              layoutDependency: B,
                              layoutId: `SfEO2pJwN`,
                              style: {
                                borderBottomLeftRadius: 203.49,
                                borderBottomRightRadius: 203.49,
                                borderTopLeftRadius: 203.49,
                                borderTopRightRadius: 203.49,
                                boxShadow: `inset 0px 0px 68.5px 0px rgb(0, 0, 0), inset 0px 0px 50px 5.09px rgb(0, 0, 0)`,
                              },
                            }),
                            u(P, {
                              background: {
                                alt: ``,
                                fit: `fit`,
                                loading: E(
                                  (d?.y || 0) +
                                    0 +
                                    (((d?.height || 553) - 0 - 553) / 2 +
                                      0 +
                                      0) +
                                    0 +
                                    -122.48 +
                                    0 +
                                    0 +
                                    -49,
                                ),
                                pixelHeight: 2846,
                                pixelWidth: 2842,
                                positionX: `center`,
                                positionY: `center`,
                                sizes: `141px`,
                                src: `./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-7741780a.png`,
                                srcSet: `./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-59ebc56e.png 1022w,./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-0c8a070d.png 2045w,./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-7741780a.png 2842w`,
                              },
                              className: `framer-qyzqkd`,
                              "data-framer-name": `Hot air balloon + jotti`,
                              layoutDependency: B,
                              layoutId: `afJZN3hxv`,
                            }),
                            u(P, {
                              background: {
                                alt: ``,
                                fit: `stretch`,
                                loading: E(
                                  (d?.y || 0) +
                                    0 +
                                    (((d?.height || 553) - 0 - 553) / 2 +
                                      0 +
                                      0) +
                                    0 +
                                    -122.48 +
                                    0 +
                                    0 +
                                    406.46 -
                                    168.1142,
                                ),
                                pixelHeight: 2078,
                                pixelWidth: 2892,
                                positionX: `center`,
                                positionY: `center`,
                                sizes: `173.98px`,
                                src: `./assets/images/64NTAFiZlzU2kGaVG82xflIhbqk-b7b2323d.png`,
                                srcSet: `./assets/images/64NTAFiZlzU2kGaVG82xflIhbqk-f1f9b139.png 512w,./assets/images/64NTAFiZlzU2kGaVG82xflIhbqk-26941776.png 1024w,./assets/images/64NTAFiZlzU2kGaVG82xflIhbqk-554f54e2.png 2048w,./assets/images/64NTAFiZlzU2kGaVG82xflIhbqk-b7b2323d.png 2892w`,
                              },
                              className: `framer-1rs6urz`,
                              "data-framer-name": `Hotel`,
                              layoutDependency: B,
                              layoutId: `XwJzHW6Ut`,
                              style: { rotate: -9 },
                            }),
                            u(P, {
                              background: {
                                alt: ``,
                                fit: `fill`,
                                loading: E(
                                  (d?.y || 0) +
                                    0 +
                                    (((d?.height || 553) - 0 - 553) / 2 +
                                      0 +
                                      0) +
                                    0 +
                                    -122.48 +
                                    0 +
                                    0 +
                                    109.459,
                                ),
                                pixelHeight: 1185,
                                pixelWidth: 1130,
                                sizes: `137.86px`,
                                src: `./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-60e73146.png`,
                                srcSet: `./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-e643ad1e.png 976w,./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-60e73146.png 1130w`,
                              },
                              className: `framer-g71nwn`,
                              "data-framer-name": `Moon`,
                              layoutDependency: B,
                              layoutId: `gZ68s5qOw`,
                              style: {
                                filter: `drop-shadow(0px 1.4px 1px rgba(0, 0, 0, 0.19961337745189667)) drop-shadow(0px 3.38px 3px rgba(0, 0, 0, 0.28676387667655945)) drop-shadow(0px 6.37px 5px rgba(0, 0, 0, 0.35499998927116394)) drop-shadow(0px 11.36px 8px rgba(0, 0, 0, 0.4232361316680908)) drop-shadow(0px 21.25px 15px rgba(0, 0, 0, 0.51038658618927)) drop-shadow(0px 50.87px 34px rgba(0, 0, 0, 0.7099999785423279))`,
                                rotate: -7,
                                WebkitFilter: `drop-shadow(0px 1.4px 1px rgba(0, 0, 0, 0.19961337745189667)) drop-shadow(0px 3.38px 3px rgba(0, 0, 0, 0.28676387667655945)) drop-shadow(0px 6.37px 5px rgba(0, 0, 0, 0.35499998927116394)) drop-shadow(0px 11.36px 8px rgba(0, 0, 0, 0.4232361316680908)) drop-shadow(0px 21.25px 15px rgba(0, 0, 0, 0.51038658618927)) drop-shadow(0px 50.87px 34px rgba(0, 0, 0, 0.7099999785423279))`,
                              },
                              transformTemplate: Ir,
                            }),
                            u(m.div, {
                              className: `framer-1ik77g7`,
                              "data-border": !0,
                              "data-framer-name": `Rectangle 41`,
                              layoutDependency: B,
                              layoutId: `vQ4ZX6kuq`,
                              style: {
                                "--border-bottom-width": `4.07px`,
                                "--border-color": `rgb(172, 149, 69)`,
                                "--border-left-width": `4.07px`,
                                "--border-right-width": `4.07px`,
                                "--border-style": `solid`,
                                "--border-top-width": `4.07px`,
                                borderBottomLeftRadius: 127.18,
                                borderBottomRightRadius: 127.18,
                                borderTopLeftRadius: 127.18,
                                borderTopRightRadius: 127.18,
                              },
                            }),
                          ],
                        }),
                      }),
                      l(m.div, {
                        className: `framer-1coik32`,
                        "data-framer-name": `Details`,
                        layoutDependency: B,
                        layoutId: `ecBiUd5bj`,
                        children: [
                          u(w, {
                            __fromCanvasComponent: !0,
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50IEluZmFudC1yZWd1bGFy`,
                                  "--framer-font-family": `"Cormorant Infant", "Cormorant Infant Placeholder", serif`,
                                  "--framer-font-size": `45px`,
                                  "--framer-line-height": `150%`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `Mehendi`,
                              }),
                            }),
                            className: `framer-1qi94va`,
                            "data-framer-name": `Event name`,
                            fonts: [`GF;Cormorant Infant-regular`],
                            layoutDependency: B,
                            layoutId: `WVLXP_Yn2`,
                            style: {
                              "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                              "--framer-paragraph-spacing": `0px`,
                            },
                            text: y,
                            verticalAlignment: `top`,
                            withExternalLayout: !0,
                          }),
                          u(w, {
                            __fromCanvasComponent: !0,
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                                  "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                                  "--framer-font-size": `14px`,
                                  "--framer-line-height": `100%`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `Thursday, January 25th `,
                              }),
                            }),
                            className: `framer-oifpdg`,
                            "data-framer-name": `Date and day`,
                            fonts: [`GF;Cormorant-regular`],
                            layoutDependency: B,
                            layoutId: `Bgu491GuT`,
                            style: {
                              "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                              "--framer-paragraph-spacing": `0px`,
                            },
                            text: x,
                            verticalAlignment: `top`,
                            withExternalLayout: !0,
                          }),
                          u(w, {
                            __fromCanvasComponent: !0,
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                                  "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                                  "--framer-font-size": `14px`,
                                  "--framer-line-height": `100%`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `JW Mariott, Mussoorie`,
                              }),
                            }),
                            className: `framer-fkuhmo`,
                            "data-framer-name": `Venue`,
                            fonts: [`GF;Cormorant-regular`],
                            layoutDependency: B,
                            layoutId: `LtW5XJkQr`,
                            style: {
                              "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                              "--framer-paragraph-spacing": `0px`,
                            },
                            text: S,
                            verticalAlignment: `top`,
                            withExternalLayout: !0,
                          }),
                          u(w, {
                            __fromCanvasComponent: !0,
                            children: u(n, {
                              children: u(m.p, {
                                style: {
                                  "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                                  "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                                  "--framer-font-size": `14px`,
                                  "--framer-line-height": `100%`,
                                  "--framer-text-alignment": `center`,
                                  "--framer-text-color": `var(--extracted-r6o4lv, rgb(172, 149, 69))`,
                                },
                                children: `6pm Onwards`,
                              }),
                            }),
                            className: `framer-1bv1hg8`,
                            "data-framer-name": `Time`,
                            fonts: [`GF;Cormorant-regular`],
                            layoutDependency: B,
                            layoutId: `vzySDi8dp`,
                            style: {
                              "--extracted-r6o4lv": `rgb(172, 149, 69)`,
                              "--framer-paragraph-spacing": `0px`,
                            },
                            text: C,
                            verticalAlignment: `top`,
                            withExternalLayout: !0,
                          }),
                          u(m.div, {
                            className: `framer-2z8xos`,
                            "data-framer-name": `Location`,
                            layoutDependency: B,
                            layoutId: `G0q59UqKl`,
                            children: u(w, {
                              __fromCanvasComponent: !0,
                              children: u(n, {
                                children: u(m.p, {
                                  style: {
                                    "--font-selector": `R0Y7Q29ybW9yYW50LTcwMA==`,
                                    "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                                    "--framer-font-size": `14px`,
                                    "--framer-font-weight": `700`,
                                    "--framer-line-height": `100%`,
                                    "--framer-text-alignment": `center`,
                                    "--framer-text-color": `var(--extracted-r6o4lv, rgb(230, 211, 255))`,
                                  },
                                  children: u(F, {
                                    href: Nr,
                                    motionChild: !0,
                                    nodeId: `rvxT2bb4V`,
                                    openInNewTab: !1,
                                    relValues: [],
                                    scopeId: `qwfLMyoac`,
                                    smoothScroll: !1,
                                    children: u(m.a, {
                                      className: `framer-styles-preset-thf6wm`,
                                      "data-styles-preset": `Yt_9XCLfK`,
                                      children: `See the route`,
                                    }),
                                  }),
                                }),
                              }),
                              className: `framer-1s5joo0`,
                              "data-framer-name": `Map link`,
                              fonts: [`GF;Cormorant-700`],
                              layoutDependency: B,
                              layoutId: `rvxT2bb4V`,
                              style: {
                                "--extracted-r6o4lv": `rgb(230, 211, 255)`,
                                "--framer-paragraph-spacing": `0px`,
                              },
                              verticalAlignment: `top`,
                              withExternalLayout: !0,
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
            }),
          });
        }),
        [
          `@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`,
          `.framer-m4bwU.framer-3ulr1a, .framer-m4bwU .framer-3ulr1a { display: block; }`,
          `.framer-m4bwU.framer-j2h2je { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: min-content; }`,
          `.framer-m4bwU .framer-f7k6uh { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: 553px; justify-content: center; overflow: visible; padding: 0px; position: relative; width: min-content; }`,
          `.framer-m4bwU .framer-1ili1ku { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 7.06px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: min-content; }`,
          `.framer-m4bwU .framer-1rpake { flex: none; height: 406px; overflow: visible; position: relative; width: 429px; }`,
          `.framer-m4bwU .framer-1y6mu2p { flex: none; height: 369px; left: calc(50.116550116550144% - 244px / 2); position: absolute; top: calc(48.21648216482167% - 369px / 2); width: 244px; }`,
          `.framer-m4bwU .framer-qyzqkd { flex: none; height: 187px; left: 75px; position: absolute; top: -49px; width: 141px; }`,
          `.framer-m4bwU .framer-1rs6urz { bottom: 16px; flex: none; height: 153px; left: 18px; position: absolute; width: 174px; }`,
          `.framer-m4bwU .framer-g71nwn { aspect-ratio: 0.666666649642821 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 207px); position: absolute; right: 15px; top: 52%; width: 138px; }`,
          `.framer-m4bwU .framer-1ik77g7 { flex: none; height: 390px; left: calc(50.059311981020194% - 268.09px / 2); position: absolute; top: 0px; width: 268px; }`,
          `.framer-m4bwU .framer-1coik32 { align-content: center; align-items: center; align-self: stretch; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: auto; }`,
          `.framer-m4bwU .framer-1qi94va { flex: none; height: auto; position: relative; white-space: pre; width: auto; }`,
          `.framer-m4bwU .framer-oifpdg, .framer-m4bwU .framer-fkuhmo, .framer-m4bwU .framer-1bv1hg8, .framer-m4bwU .framer-1s5joo0 { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }`,
          `.framer-m4bwU .framer-2z8xos { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 17px 0px 17px 0px; position: relative; width: 100%; }`,
          ...Or,
          `.framer-m4bwU[data-border="true"]::after, .framer-m4bwU [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; corner-shape: inherit; pointer-events: none; }`,
        ],
        `framer-m4bwU`,
      )),
      (Y = Vr),
      (Vr.displayName = `Event Card 2`),
      (Vr.defaultProps = { height: 553, width: 429 }),
      R(Vr, {
        BpHZc3dYA: {
          __defaultAssetReference: `data:framer/asset-reference,ID0lfmpfvPSHakowK7tCTjmSu0.png?originalFilename=Event.png&preferredSize=auto&width=489&height=733`,
          __vekterDefault: {
            alt: ``,
            assetReference: `data:framer/asset-reference,ID0lfmpfvPSHakowK7tCTjmSu0.png?originalFilename=Event.png&preferredSize=auto&width=489&height=733`,
          },
          title: `Image`,
          type: B.ResponsiveImage,
        },
        WoL7lzUKR: {
          defaultValue: `Mehendi`,
          displayTextArea: !1,
          title: `Event`,
          type: B.String,
        },
        kcDbVVA2X: {
          defaultValue: `Thursday, January 25th `,
          displayTextArea: !0,
          title: `Date`,
          type: B.String,
        },
        bsf43jDPr: {
          defaultValue: `JW Mariott, Mussoorie`,
          displayTextArea: !0,
          title: `Venue`,
          type: B.String,
        },
        oTOyY8dm8: {
          defaultValue: `6pm Onwards`,
          description: `Find more templates on dvites.com`,
          displayTextArea: !0,
          title: `Time`,
          type: B.String,
        },
      }),
      x(
        Vr,
        [
          {
            explicitInter: !0,
            fonts: [
              {
                cssFamilyName: `Cormorant Infant`,
                source: `google`,
                style: `normal`,
                uiFamilyName: `Cormorant Infant`,
                url: `./assets/fonts/HhyCU44g9vKiM1sORYSiWeAsLN99xfs9KOOc_agJPrgvYOWWhDlDkWSy.woff2`,
                weight: `400`,
              },
              {
                cssFamilyName: `Cormorant`,
                source: `google`,
                style: `normal`,
                uiFamilyName: `Cormorant`,
                url: `./assets/fonts/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFhFTQ7Fg7A2uwYs.woff2`,
                weight: `400`,
              },
              {
                cssFamilyName: `Cormorant`,
                source: `google`,
                style: `normal`,
                uiFamilyName: `Cormorant`,
                url: `./assets/fonts/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFvZUQ7Fg7A2uwYs.woff2`,
                weight: `700`,
              },
            ],
          },
          ...y(Dr),
        ],
        { supportsExplicitInterCodegen: !0 },
      ));
  }),
  Ur,
  Wr,
  Gr,
  Kr,
  qr,
  Jr,
  Yr,
  Xr,
  X,
  Zr,
  Qr,
  $r,
  ei,
  ti,
  ni,
  ri,
  ii,
  ai,
  oi,
  si,
  ci,
  li,
  ui,
  di,
  fi,
  pi,
  mi,
  hi,
  gi,
  _i,
  vi,
  yi,
  bi,
  xi,
  Si,
  Ci,
  wi,
  Ti,
  Z,
  Ei,
  Di,
  Oi,
  ki,
  Ai,
  ji,
  Mi,
  Ni,
  Pi,
  Fi,
  Ii,
  Li,
  Ri,
  zi,
  Bi,
  Vi,
  Hi,
  Ui,
  Wi,
  Q,
  Gi,
  Ki,
  qi,
  Ji,
  Yi,
  Xi,
  Zi,
  Qi,
  $i,
  ea,
  ta,
  na,
  ra,
  ia,
  aa,
  $,
  oa,
  sa,
  ca,
  la,
  ua,
  da;
e(() => {
  (c(),
    O(),
    p(),
    a(),
    be(),
    Re(),
    et(),
    ft(),
    Ot(),
    Bt(),
    Xt(),
    oe(),
    mn(),
    On(),
    Vn(),
    fe(),
    se(),
    pe(),
    er(),
    pr(),
    Er(),
    ie(),
    he(),
    Hr(),
    _e(),
    (Ur = D(me)),
    (Wr = _(me, { nodeId: `eLrPnOKmB`, override: de, scopeId: `bmdQ7AEa3` })),
    (Gr = D(le)),
    (Kr = g(A)),
    (qr = D(H)),
    (Jr = D(ge)),
    (Yr = g(m.div)),
    (Xr = D(Dt)),
    (X = z(g(P))),
    (Zr = g(P)),
    (Qr = D(Yt)),
    ($r = D(Tr)),
    (ei = D(dt)),
    (ti = D($n)),
    (ni = D(Y)),
    (ri = D(Le)),
    (ii = D(Bn)),
    (ai = D(Dn)),
    (oi = D($e)),
    (si = D(J)),
    (ci = D(pn)),
    (li = D(ue)),
    (ui = D(fr)),
    (di = _(m.div, {
      nodeId: `qosWGFm_4`,
      override: ye,
      scopeId: `bmdQ7AEa3`,
    })),
    (fi = {
      kBRqx33QC: `(min-width: 810px) and (max-width: 1199.98px)`,
      qosWGFm_4: `(min-width: 1200px)`,
      ydPqKqvDJ: `(max-width: 809.98px)`,
    }),
    (pi = () => typeof document < `u`),
    (mi = []),
    (hi = `framer-iSlkH`),
    (gi = {
      kBRqx33QC: `framer-v-1l9f9eo`,
      qosWGFm_4: `framer-v-3nf04q`,
      ydPqKqvDJ: `framer-v-124291v`,
    }),
    (_i = (e, t, n) => (e && t ? `position` : n)),
    (vi = { bounce: 0.15, delay: 0, duration: 1, type: `spring` }),
    (yi = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1.1,
      skewX: 0,
      skewY: 0,
      x: 0,
      y: 0,
    }),
    (bi = { bounce: 0.1, delay: 0, duration: 1, type: `spring` }),
    (xi = {
      opacity: 0,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 0,
      y: 0,
    }),
    (Si = { bounce: 0.2, delay: 0, duration: 3, type: `spring` }),
    (Ci = {
      opacity: 0,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      transition: Si,
      x: 0,
      y: 0,
    }),
    (wi = { bounce: 0.2, delay: 0, duration: 1, type: `spring` }),
    (Ti = {
      opacity: 0,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      transition: wi,
      x: 0,
      y: 0,
    }),
    (Z = (...e) => {
      for (let t of e) if (t && typeof t == `string`) return t;
    }),
    (Ei = { bounce: 0.2, delay: 2, duration: 2, type: `spring` }),
    (Di = {
      opacity: 0,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      transition: Ei,
      x: 0,
      y: 0,
    }),
    (Oi = (e, t) => `translateX(-50%) ${t}`),
    (ki = { delay: 0, duration: 5, ease: [0.44, 0, 0.56, 1], type: `tween` }),
    (Ai = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 84,
      y: 0,
    }),
    (ji = { delay: 0, duration: 3.8, ease: [0.44, 0, 0.56, 1], type: `tween` }),
    (Mi = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: -18,
      y: 0,
    }),
    (Ni = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      transition: Si,
      x: 0,
      y: 0,
    }),
    (Pi = {
      opacity: 0.001,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 0,
      y: 18,
    }),
    (Fi = { delay: 0, duration: 3.5, ease: [0.44, 0, 0.56, 1], type: `tween` }),
    (Ii = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 16,
      y: -24,
    }),
    (Li = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: -19,
      y: -9,
    }),
    (Ri = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      transition: { bounce: 0.2, delay: 0, duration: 6, type: `spring` },
      x: 0,
      y: 0,
    }),
    (zi = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: -21,
      y: 83,
    }),
    (Bi = { delay: 0, duration: 3, ease: [0, 0, 1, 1], type: `tween` }),
    (Vi = {
      opacity: 1,
      rotate: 10,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 0,
      y: 0,
    }),
    (Hi = {
      opacity: 1,
      rotate: 19,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 0,
      y: 0,
    }),
    (Ui = { delay: 0, duration: 5.6, ease: [0, 0, 1, 1], type: `tween` }),
    (Wi = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 0,
      y: 18,
    }),
    (Q = { delay: 0, duration: 4, ease: [0.44, 0, 0.56, 1], type: `tween` }),
    (Gi = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: -33,
      y: 0,
    }),
    (Ki = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: -10,
      y: 0,
    }),
    (qi = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      transition: { bounce: 0.2, delay: 0, duration: 2.5, type: `spring` },
      x: 0,
      y: 0,
    }),
    (Ji = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: -65,
      y: 0,
    }),
    (Yi = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 33,
      y: 0,
    }),
    (Xi = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 4,
      y: 0,
    }),
    (Zi = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      transition: { bounce: 0.2, delay: 0, duration: 5, type: `spring` },
      x: 0,
      y: 0,
    }),
    (Qi = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 102,
      y: 0,
    }),
    ($i = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 0,
      y: -10,
    }),
    (ea = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 0,
      y: -100,
    }),
    (ta = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1.3,
      skewX: 0,
      skewY: 0,
      x: 0,
      y: -10,
    }),
    (na = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 0,
      y: 14,
    }),
    (ra = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 0,
      y: -70,
    }),
    (ia = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 0,
      y: 10,
    }),
    (aa = {
      opacity: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      skewX: 0,
      skewY: 0,
      x: 0,
      y: -200,
    }),
    ($ = (e, t) => {
      if (!(!e || typeof e != `object`)) return { ...e, alt: t };
    }),
    (oa = { Desktop: `qosWGFm_4`, Phone: `ydPqKqvDJ`, Tablet: `kBRqx33QC` }),
    (sa = ({ value: e }) =>
      te()
        ? null
        : u(`style`, {
            dangerouslySetInnerHTML: { __html: e },
            "data-framer-html-style": ``,
          })),
    (ca = ({ height: e, id: t, width: n, ...r }) => ({
      ...r,
      variant: oa[r.variant] ?? r.variant ?? `qosWGFm_4`,
    })),
    (la = T(
      o(function (e, a) {
        let o = t(null),
          c = a ?? o,
          ee = s(),
          { activeLocale: p, setLocale: h } = I(),
          g = M(),
          { style: _, className: v, layoutId: y, variant: x, ...S } = ca(e);
        k(i(() => ve({}, p), [p]));
        let [T, D] = N(x, fi, !1),
          O = b(hi),
          F = r(ne)?.isLayoutTemplate,
          R = _i(F, !!r(d)?.transition?.layout),
          z = () => !pi() || T === `ydPqKqvDJ`,
          B = C(`ScerDqzxO`),
          te = t(null),
          V = C(`JblZgXuD9`),
          ie = t(null),
          ae = C(`UYR7Q8Kxt`),
          oe = t(null),
          se = C(`RH0GMJ5ne`),
          ce = t(null),
          de = C(`WEdSDcqq6`),
          fe = t(null),
          pe = C(`ch3fiKOLX`),
          me = t(null);
        return (
          re({}),
          u(ne.Provider, {
            value: {
              activeVariantId: T,
              humanReadableVariantMap: oa,
              primaryVariantId: `qosWGFm_4`,
              variantClassNames: gi,
            },
            children: l(f, {
              id: y ?? ee,
              children: [
                u(sa, {
                  value: `html body { background: rgb(255, 255, 255); } @media (max-width: 809.98px) { html body { background: linear-gradient(180deg, rgb(2, 41, 56) 0%, rgb(136, 178, 160) 98%); } }`,
                }),
                l(di, {
                  ...S,
                  className: b(O, `framer-3nf04q`, v),
                  ref: c,
                  style: { ..._ },
                  children: [
                    u(L, {
                      children: u(A, {
                        className: `framer-1waoh23-container`,
                        isAuthoredByUser: !0,
                        isModuleExternal: !0,
                        layout: R,
                        nodeId: `eLrPnOKmB`,
                        rendersWithMotion: !0,
                        scopeId: `bmdQ7AEa3`,
                        children: u(j, {
                          breakpoint: T,
                          overrides: { kBRqx33QC: { intensity: 10 } },
                          children: u(Wr, {
                            height: `100%`,
                            id: `eLrPnOKmB`,
                            intensity: 30,
                            layoutId: `eLrPnOKmB`,
                            width: `100%`,
                          }),
                        }),
                      }),
                    }),
                    u(m.div, {
                      className: `framer-t10cp0`,
                      "data-framer-name": `Container`,
                      layout: R,
                      children: l(m.div, {
                        className: `framer-g116mj`,
                        "data-framer-name": `Main`,
                        children: [
                          u(m.div, {
                            className: `framer-10izldj`,
                            "data-framer-name": `Music`,
                            children: u(L, {
                              children: u(j, {
                                breakpoint: T,
                                overrides: {
                                  ydPqKqvDJ: { __framer__loopTransition: bi },
                                },
                                children: u(Kr, {
                                  __framer__loop: yi,
                                  __framer__loopEffectEnabled: !0,
                                  __framer__loopPauseOffscreen: !1,
                                  __framer__loopRepeatDelay: 0,
                                  __framer__loopRepeatType: `mirror`,
                                  __framer__loopTransition: vi,
                                  __perspectiveFX: !1,
                                  __targetOpacity: 1,
                                  className: `framer-exthyr-container`,
                                  "data-framer-name": `Add your music file`,
                                  isAuthoredByUser: !0,
                                  isModuleExternal: !0,
                                  name: `Add your music file`,
                                  nodeId: `gMZu3fZOg`,
                                  rendersWithMotion: !0,
                                  scopeId: `bmdQ7AEa3`,
                                  children: u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      ydPqKqvDJ: {
                                        background: `rgba(196, 164, 49, 0.9)`,
                                        borderRadius: 20,
                                        bottomLeftRadius: 20,
                                        bottomRightRadius: 20,
                                        onPlayGlobalPauseOption: `pause`,
                                        padding: 10,
                                        paddingBottom: 10,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 10,
                                        playing: !0,
                                        srcUrl: ``,
                                        topLeftRadius: 20,
                                        topRightRadius: 20,
                                      },
                                    },
                                    children: u(le, {
                                      background: `rgba(171, 149, 70, 0.9)`,
                                      borderRadius: 8,
                                      bottomLeftRadius: 8,
                                      bottomRightRadius: 8,
                                      font: {},
                                      gap: 15,
                                      height: `100%`,
                                      id: `gMZu3fZOg`,
                                      isMixedBorderRadius: !1,
                                      layoutId: `gMZu3fZOg`,
                                      loop: !0,
                                      name: `Add your music file`,
                                      onPlayGlobalPauseOption: `continue`,
                                      padding: 14,
                                      paddingBottom: 14,
                                      paddingLeft: 14,
                                      paddingPerSide: !1,
                                      paddingRight: 14,
                                      paddingTop: 14,
                                      pauseOnExit: !0,
                                      playing: !1,
                                      progress: 0,
                                      progressColor: `rgb(255, 255, 255)`,
                                      showPlayPause: !0,
                                      showTime: !1,
                                      showTrack: !1,
                                      srcFile: `./assets/images/q8x7MYVF61gOLfkcxdG7dlXjxw.mp3`,
                                      srcType: `Upload`,
                                      srcUrl: `https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3`,
                                      style: { height: `100%`, width: `100%` },
                                      topLeftRadius: 8,
                                      topRightRadius: 8,
                                      trackColor: `rgb(255, 255, 255)`,
                                      volume: 100,
                                      width: `100%`,
                                    }),
                                  }),
                                }),
                              }),
                            }),
                          }),
                          u(m.div, {
                            className: `framer-bo7x1i`,
                            "data-framer-name": `Watermark`,
                            children: u(j, {
                              breakpoint: T,
                              overrides: {
                                kBRqx33QC: {
                                  height: 88,
                                  width: `394px`,
                                  y: (g?.y || 0) + 0 + 200 + 0 + 0 + 1 + 202,
                                },
                                ydPqKqvDJ: {
                                  height: 77,
                                  width: `343px`,
                                  y: (g?.y || 0) + 0 + 200 + 0 + 0 + 2 + 496.5,
                                },
                              },
                              children: u(L, {
                                height: 73,
                                width: `327px`,
                                children: u(A, {
                                  className: `framer-1rzxnh9-container`,
                                  nodeId: `cMUzNlfNk`,
                                  rendersWithMotion: !0,
                                  scopeId: `bmdQ7AEa3`,
                                  children: u(H, {
                                    height: `100%`,
                                    id: `cMUzNlfNk`,
                                    layoutId: `cMUzNlfNk`,
                                    style: { height: `100%`, width: `100%` },
                                    width: `100%`,
                                  }),
                                }),
                              }),
                            }),
                          }),
                          z() &&
                            l(m.div, {
                              className: `framer-hmg421 hidden-3nf04q hidden-1l9f9eo`,
                              "data-framer-name": `Watermark`,
                              children: [
                                u(j, {
                                  breakpoint: T,
                                  overrides: {
                                    ydPqKqvDJ: {
                                      y:
                                        (g?.y || 0) +
                                        0 +
                                        200 +
                                        0 +
                                        0 +
                                        1 +
                                        659.5,
                                    },
                                  },
                                  children: u(L, {
                                    height: 77,
                                    width: `343px`,
                                    children: u(A, {
                                      className: `framer-1rxclm9-container`,
                                      nodeId: `aIz2dLLFk`,
                                      rendersWithMotion: !0,
                                      scopeId: `bmdQ7AEa3`,
                                      children: u(H, {
                                        height: `100%`,
                                        id: `aIz2dLLFk`,
                                        layoutId: `aIz2dLLFk`,
                                        style: {
                                          height: `100%`,
                                          width: `100%`,
                                        },
                                        width: `100%`,
                                      }),
                                    }),
                                  }),
                                }),
                                u(j, {
                                  breakpoint: T,
                                  overrides: {
                                    ydPqKqvDJ: {
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 426,
                                        intrinsicWidth: 196.5,
                                        loading: E(
                                          (g?.y || 0) + 0 + 200 + 0 + 0 + 1 + 0,
                                        ),
                                        pixelHeight: 852,
                                        pixelWidth: 393,
                                        sizes: `calc(min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px) + 2px)`,
                                        src: `./assets/images/CrkrJDdeoM65OHFWoOmjt0Jln9Y-fbc8e936.png`,
                                        srcSet: `./assets/images/CrkrJDdeoM65OHFWoOmjt0Jln9Y-fbc8e936.png 393w`,
                                      },
                                    },
                                  },
                                  children: u(P, {
                                    background: {
                                      alt: ``,
                                      fit: `fill`,
                                      intrinsicHeight: 426,
                                      intrinsicWidth: 196.5,
                                      pixelHeight: 852,
                                      pixelWidth: 393,
                                      src: `./assets/images/CrkrJDdeoM65OHFWoOmjt0Jln9Y-fbc8e936.png`,
                                      srcSet: `./assets/images/CrkrJDdeoM65OHFWoOmjt0Jln9Y-fbc8e936.png 393w`,
                                    },
                                    className: `framer-fz1joa`,
                                    "data-framer-name": `Trans`,
                                  }),
                                }),
                              ],
                            }),
                          u(m.div, {
                            className: `framer-qlfn9l`,
                            "data-framer-name": `Watermark`,
                            children: u(j, {
                              breakpoint: T,
                              overrides: {
                                kBRqx33QC: {
                                  height: 88,
                                  width: `394px`,
                                  y: (g?.y || 0) + 0 + 200 + 0 + 0 + 2 + 305,
                                },
                                ydPqKqvDJ: {
                                  height: 77,
                                  width: `343px`,
                                  y: (g?.y || 0) + 0 + 200 + 0 + 0 + 3 + 346.5,
                                },
                              },
                              children: u(L, {
                                height: 73,
                                width: `327px`,
                                children: u(A, {
                                  className: `framer-bgum6g-container`,
                                  nodeId: `gKH3Ma8bh`,
                                  rendersWithMotion: !0,
                                  scopeId: `bmdQ7AEa3`,
                                  children: u(H, {
                                    height: `100%`,
                                    id: `gKH3Ma8bh`,
                                    layoutId: `gKH3Ma8bh`,
                                    style: { height: `100%`, width: `100%` },
                                    width: `100%`,
                                  }),
                                }),
                              }),
                            }),
                          }),
                          u(m.div, {
                            className: `framer-w0l22n`,
                            "data-framer-name": `Watermark`,
                            children: u(j, {
                              breakpoint: T,
                              overrides: {
                                kBRqx33QC: {
                                  height: 88,
                                  width: `394px`,
                                  y: (g?.y || 0) + 0 + 200 + 0 + 0 + 3 + 91,
                                },
                                ydPqKqvDJ: {
                                  height: 77,
                                  width: `343px`,
                                  y: (g?.y || 0) + 0 + 200 + 0 + 0 + 4 + 218.5,
                                },
                              },
                              children: u(L, {
                                height: 73,
                                width: `327px`,
                                children: u(A, {
                                  className: `framer-skkinu-container`,
                                  nodeId: `BBHdPEdrh`,
                                  rendersWithMotion: !0,
                                  scopeId: `bmdQ7AEa3`,
                                  children: u(H, {
                                    height: `100%`,
                                    id: `BBHdPEdrh`,
                                    layoutId: `BBHdPEdrh`,
                                    style: { height: `100%`, width: `100%` },
                                    width: `100%`,
                                  }),
                                }),
                              }),
                            }),
                          }),
                          u(m.div, {
                            className: `framer-1on0r0q`,
                            "data-framer-name": `Watermark`,
                            children: u(j, {
                              breakpoint: T,
                              overrides: {
                                kBRqx33QC: {
                                  height: 88,
                                  width: `394px`,
                                  y: (g?.y || 0) + 0 + 200 + 0 + 0 + 4 + 409,
                                },
                                ydPqKqvDJ: {
                                  height: 77,
                                  width: `343px`,
                                  y: (g?.y || 0) + 0 + 200 + 0 + 0 + 5 + 43.5,
                                },
                              },
                              children: u(L, {
                                height: 73,
                                width: `327px`,
                                children: u(A, {
                                  className: `framer-1dnm4no-container`,
                                  nodeId: `sxJkLI1wx`,
                                  rendersWithMotion: !0,
                                  scopeId: `bmdQ7AEa3`,
                                  children: u(H, {
                                    height: `100%`,
                                    id: `sxJkLI1wx`,
                                    layoutId: `sxJkLI1wx`,
                                    style: { height: `100%`, width: `100%` },
                                    width: `100%`,
                                  }),
                                }),
                              }),
                            }),
                          }),
                          u(Yr, {
                            __framer__animate: { transition: Si },
                            __framer__animateOnce: !1,
                            __framer__enter: xi,
                            __framer__exit: Ci,
                            __framer__styleAppearEffectEnabled: !0,
                            __framer__threshold: 0,
                            __perspectiveFX: !1,
                            __targetOpacity: 1,
                            className: `framer-13h1j0t`,
                            "data-framer-name": `Buy button stack`,
                            children: u(j, {
                              breakpoint: T,
                              overrides: {
                                kBRqx33QC: {
                                  y: (g?.y || 0) + 0 + 200 + 0 + 0 + 5 + 29,
                                },
                                ydPqKqvDJ: {
                                  y: (g?.y || 0) + 0 + 200 + 0 + 0 + 6 + 16,
                                },
                              },
                              children: u(L, {
                                height: 48,
                                children: u(j, {
                                  breakpoint: T,
                                  overrides: {
                                    ydPqKqvDJ: {
                                      __framer__animate: { transition: Ei },
                                      __framer__exit: Di,
                                      transformTemplate: Oi,
                                    },
                                  },
                                  children: u(Kr, {
                                    __framer__animate: { transition: wi },
                                    __framer__animateOnce: !1,
                                    __framer__enter: xi,
                                    __framer__exit: Ti,
                                    __framer__styleAppearEffectEnabled: !0,
                                    __framer__threshold: 0,
                                    __perspectiveFX: !1,
                                    __targetOpacity: 1,
                                    className: `framer-1a9ufat-container`,
                                    nodeId: `edEw9GwuL`,
                                    rendersWithMotion: !0,
                                    scopeId: `bmdQ7AEa3`,
                                    children: u(ge, {
                                      height: `100%`,
                                      id: `edEw9GwuL`,
                                      layoutId: `edEw9GwuL`,
                                      oYsZVBOnc: `https://rzp.io/rzp/mountain`,
                                      style: { height: `100%` },
                                      variant: Z(`PeCAeFQ05`),
                                      width: `100%`,
                                    }),
                                  }),
                                }),
                              }),
                            }),
                          }),
                          u(j, {
                            breakpoint: T,
                            overrides: {
                              kBRqx33QC: {
                                background: {
                                  alt: ``,
                                  fit: `fill`,
                                  loading: E((g?.y || 0) + 0 + 200 + 0 + 0 + 6),
                                  pixelHeight: 900,
                                  pixelWidth: 1350,
                                  sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                  src: `./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-7cf8ac5c.png`,
                                  srcSet: `./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-db106ce3.png 512w,./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-1093c334.png 1024w,./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-7cf8ac5c.png 1350w`,
                                },
                              },
                              ydPqKqvDJ: { background: void 0 },
                            },
                            children: u(P, {
                              background: {
                                alt: ``,
                                fit: `fill`,
                                pixelHeight: 900,
                                pixelWidth: 1350,
                                sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                src: `./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-7cf8ac5c.png`,
                                srcSet: `./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-db106ce3.png 512w,./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-1093c334.png 1024w,./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-7cf8ac5c.png 1350w`,
                              },
                              className: `framer-139e2on`,
                              "data-framer-name": `Section 1`,
                              children: l(m.div, {
                                className: `framer-eyztyl`,
                                "data-framer-name": `Content`,
                                children: [
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 468.5,
                                          intrinsicWidth: 841.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              0 +
                                              0,
                                          ),
                                          pixelHeight: 937,
                                          pixelWidth: 1697,
                                          sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                          src: `./assets/images/mkfwcRjo0Q4e0yChswkKfBTFN7I-735edd83.png`,
                                          srcSet: `./assets/images/mkfwcRjo0Q4e0yChswkKfBTFN7I-930c162c.png 512w,./assets/images/mkfwcRjo0Q4e0yChswkKfBTFN7I-583405ca.png 1024w,./assets/images/mkfwcRjo0Q4e0yChswkKfBTFN7I-735edd83.png 1697w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 468.5,
                                          intrinsicWidth: 841.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              0 +
                                              0,
                                          ),
                                          pixelHeight: 1788,
                                          pixelWidth: 1286,
                                          sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                          src: `./assets/images/psGzWz3bp2imrNpq02vFdmHgs3g-11a73a97.png`,
                                          srcSet: `./assets/images/psGzWz3bp2imrNpq02vFdmHgs3g-49630e0c.png 736w,./assets/images/psGzWz3bp2imrNpq02vFdmHgs3g-11a73a97.png 1286w`,
                                        },
                                      },
                                    },
                                    children: u(P, {
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 468.5,
                                        intrinsicWidth: 841.5,
                                        pixelHeight: 937,
                                        pixelWidth: 1697,
                                        sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                        src: `./assets/images/mkfwcRjo0Q4e0yChswkKfBTFN7I-735edd83.png`,
                                        srcSet: `./assets/images/mkfwcRjo0Q4e0yChswkKfBTFN7I-930c162c.png 512w,./assets/images/mkfwcRjo0Q4e0yChswkKfBTFN7I-583405ca.png 1024w,./assets/images/mkfwcRjo0Q4e0yChswkKfBTFN7I-735edd83.png 1697w`,
                                      },
                                      className: `framer-i0c579`,
                                      "data-framer-name": `The top`,
                                      children: u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          kBRqx33QC: {
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              0 +
                                              0 +
                                              10 +
                                              0,
                                          },
                                          ydPqKqvDJ: {
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              0 +
                                              0 +
                                              0 +
                                              0,
                                          },
                                        },
                                        children: u(L, {
                                          height: 381,
                                          width: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                          children: u(A, {
                                            className: `framer-rmb2bn-container`,
                                            isModuleExternal: !0,
                                            nodeId: `euYymW8I7`,
                                            rendersWithMotion: !0,
                                            scopeId: `bmdQ7AEa3`,
                                            children: u(j, {
                                              breakpoint: T,
                                              overrides: {
                                                ydPqKqvDJ: {
                                                  variant: Z(`Zx5bPYaEe`),
                                                },
                                              },
                                              children: u(Dt, {
                                                height: `100%`,
                                                id: `euYymW8I7`,
                                                l2wejV_9f: `Kanika`,
                                                layoutId: `euYymW8I7`,
                                                sEfkXzmSW: `Abhishek`,
                                                style: { width: `100%` },
                                                variant: Z(`eKCA4T8lZ`),
                                                width: `100%`,
                                              }),
                                            }),
                                          }),
                                        }),
                                      }),
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 468.5,
                                          intrinsicWidth: 841.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              0 +
                                              700,
                                          ),
                                          pixelHeight: 900,
                                          pixelWidth: 1350,
                                          sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                          src: `./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-7cf8ac5c.png`,
                                          srcSet: `./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-db106ce3.png 512w,./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-1093c334.png 1024w,./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-7cf8ac5c.png 1350w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 468.5,
                                          intrinsicWidth: 841.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              0 +
                                              451,
                                          ),
                                          pixelHeight: 900,
                                          pixelWidth: 1350,
                                          sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                          src: `./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-7cf8ac5c.png`,
                                          srcSet: `./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-db106ce3.png 512w,./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-1093c334.png 1024w,./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-7cf8ac5c.png 1350w`,
                                        },
                                      },
                                    },
                                    children: u(P, {
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 468.5,
                                        intrinsicWidth: 841.5,
                                        pixelHeight: 900,
                                        pixelWidth: 1350,
                                        sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                        src: `./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-7cf8ac5c.png`,
                                        srcSet: `./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-db106ce3.png 512w,./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-1093c334.png 1024w,./assets/images/liVQAaRjDSdoeY00NcyalGC1JA-7cf8ac5c.png 1350w`,
                                      },
                                      className: `framer-1pqt39g`,
                                      "data-framer-name": `Starbase 1`,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 254,
                                          intrinsicWidth: 336.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              986,
                                          ),
                                          pixelHeight: 2078,
                                          pixelWidth: 2892,
                                          sizes: `617px`,
                                          src: `./assets/images/wKiH01QNP8DMVItVBJyF9tbg-146632dd.png`,
                                          srcSet: `./assets/images/wKiH01QNP8DMVItVBJyF9tbg-8f23d7d4.png 512w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-d7e85751.png 1024w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-c7565905.png 2048w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-146632dd.png 2892w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        __framer__loop: Mi,
                                        __framer__loopTransition: ji,
                                        animate: Ni,
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 254,
                                          intrinsicWidth: 336.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              645,
                                          ),
                                          pixelHeight: 2078,
                                          pixelWidth: 2892,
                                          sizes: `308px`,
                                          src: `./assets/images/wKiH01QNP8DMVItVBJyF9tbg-146632dd.png`,
                                          srcSet: `./assets/images/wKiH01QNP8DMVItVBJyF9tbg-8f23d7d4.png 512w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-d7e85751.png 1024w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-c7565905.png 2048w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-146632dd.png 2892w`,
                                        },
                                        initial: Pi,
                                        optimized: !0,
                                      },
                                    },
                                    children: u(X, {
                                      __framer__loop: Ai,
                                      __framer__loopEffectEnabled: !0,
                                      __framer__loopPauseOffscreen: !1,
                                      __framer__loopRepeatDelay: 0,
                                      __framer__loopRepeatType: `mirror`,
                                      __framer__loopTransition: ki,
                                      __perspectiveFX: !1,
                                      __targetOpacity: 1,
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 254,
                                        intrinsicWidth: 336.5,
                                        pixelHeight: 2078,
                                        pixelWidth: 2892,
                                        sizes: `903.5px`,
                                        src: `./assets/images/wKiH01QNP8DMVItVBJyF9tbg-146632dd.png`,
                                        srcSet: `./assets/images/wKiH01QNP8DMVItVBJyF9tbg-8f23d7d4.png 512w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-d7e85751.png 1024w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-c7565905.png 2048w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-146632dd.png 2892w`,
                                      },
                                      className: `framer-wpigon`,
                                      "data-framer-appear-id": `wpigon`,
                                      "data-framer-name": `Hotel`,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fit`,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              658,
                                          ),
                                          pixelHeight: 2846,
                                          pixelWidth: 2842,
                                          positionX: `center`,
                                          positionY: `center`,
                                          sizes: `567px`,
                                          src: `./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-7741780a.png`,
                                          srcSet: `./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-59ebc56e.png 1022w,./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-0c8a070d.png 2045w,./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-7741780a.png 2842w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        __framer__loop: Li,
                                        animate: Ri,
                                        background: {
                                          alt: ``,
                                          fit: `fit`,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              398,
                                          ),
                                          pixelHeight: 4242,
                                          pixelWidth: 3208,
                                          positionX: `center`,
                                          positionY: `center`,
                                          sizes: `367px`,
                                          src: `./assets/images/NCJNcvJZC0xrKHOBNNDyEtVQ8a8-c94cb923.png`,
                                          srcSet: `./assets/images/NCJNcvJZC0xrKHOBNNDyEtVQ8a8-360cc5c0.png 774w,./assets/images/NCJNcvJZC0xrKHOBNNDyEtVQ8a8-7e82fdce.png 1548w,./assets/images/NCJNcvJZC0xrKHOBNNDyEtVQ8a8-c6ca1ba6.png 3097w,./assets/images/NCJNcvJZC0xrKHOBNNDyEtVQ8a8-c94cb923.png 3208w`,
                                        },
                                        initial: zi,
                                        optimized: !0,
                                      },
                                    },
                                    children: u(X, {
                                      __framer__loop: Ii,
                                      __framer__loopEffectEnabled: !0,
                                      __framer__loopPauseOffscreen: !1,
                                      __framer__loopRepeatDelay: 0,
                                      __framer__loopRepeatType: `mirror`,
                                      __framer__loopTransition: Fi,
                                      __perspectiveFX: !1,
                                      __targetOpacity: 1,
                                      background: {
                                        alt: ``,
                                        fit: `fit`,
                                        pixelHeight: 2846,
                                        pixelWidth: 2842,
                                        positionX: `center`,
                                        positionY: `center`,
                                        sizes: `786px`,
                                        src: `./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-7741780a.png`,
                                        srcSet: `./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-59ebc56e.png 1022w,./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-0c8a070d.png 2045w,./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-7741780a.png 2842w`,
                                      },
                                      className: `framer-1jyzb6c`,
                                      "data-framer-appear-id": `1jyzb6c`,
                                      "data-framer-name": `Hot air balloon + jotti`,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 592.5,
                                          intrinsicWidth: 565,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              1310,
                                          ),
                                          pixelHeight: 1185,
                                          pixelWidth: 1130,
                                          sizes: `calc(min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px) - 547.5px)`,
                                          src: `./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-60e73146.png`,
                                          srcSet: `./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-e643ad1e.png 976w,./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-60e73146.png 1130w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        __framer__loop: Hi,
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 592.5,
                                          intrinsicWidth: 565,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              810,
                                          ),
                                          pixelHeight: 1185,
                                          pixelWidth: 1130,
                                          sizes: `166px`,
                                          src: `./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-60e73146.png`,
                                          srcSet: `./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-e643ad1e.png 976w,./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-60e73146.png 1130w`,
                                        },
                                      },
                                    },
                                    children: u(Zr, {
                                      __framer__loop: Vi,
                                      __framer__loopEffectEnabled: !0,
                                      __framer__loopPauseOffscreen: !0,
                                      __framer__loopRepeatDelay: 0,
                                      __framer__loopRepeatType: `mirror`,
                                      __framer__loopTransition: Bi,
                                      __perspectiveFX: !1,
                                      __targetOpacity: 1,
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 592.5,
                                        intrinsicWidth: 565,
                                        pixelHeight: 1185,
                                        pixelWidth: 1130,
                                        sizes: `362px`,
                                        src: `./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-60e73146.png`,
                                        srcSet: `./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-e643ad1e.png 976w,./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-60e73146.png 1130w`,
                                      },
                                      className: `framer-1ccl2wx`,
                                      "data-framer-name": `The moon`,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 468.5,
                                          intrinsicWidth: 841.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              0 +
                                              1503,
                                          ),
                                          pixelHeight: 900,
                                          pixelWidth: 1350,
                                          sizes: `calc(min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px) * 1.1667)`,
                                          src: `./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-674d046e.png`,
                                          srcSet: `./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-fa0bee4e.png 512w,./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-0d37d9c1.png 1024w,./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-674d046e.png 1350w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 468.5,
                                          intrinsicWidth: 841.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              0 +
                                              1108,
                                          ),
                                          pixelHeight: 900,
                                          pixelWidth: 1350,
                                          sizes: `calc(min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px) * 1.1667)`,
                                          src: `./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-674d046e.png`,
                                          srcSet: `./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-fa0bee4e.png 512w,./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-0d37d9c1.png 1024w,./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-674d046e.png 1350w`,
                                        },
                                      },
                                    },
                                    children: u(P, {
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 468.5,
                                        intrinsicWidth: 841.5,
                                        pixelHeight: 900,
                                        pixelWidth: 1350,
                                        sizes: `calc(min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px) * 1.1667)`,
                                        src: `./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-674d046e.png`,
                                        srcSet: `./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-fa0bee4e.png 512w,./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-0d37d9c1.png 1024w,./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-674d046e.png 1350w`,
                                      },
                                      className: `framer-15u9y2l`,
                                      "data-framer-name": `Star base 3`,
                                    }),
                                  }),
                                  z() &&
                                    u(j, {
                                      breakpoint: T,
                                      overrides: {
                                        ydPqKqvDJ: {
                                          background: {
                                            alt: ``,
                                            fit: `fill`,
                                            intrinsicHeight: 468.5,
                                            intrinsicWidth: 841.5,
                                            loading: E(
                                              (g?.y || 0) +
                                                0 +
                                                200 +
                                                0 +
                                                0 +
                                                7 +
                                                0 +
                                                0 +
                                                0 +
                                                808,
                                            ),
                                            pixelHeight: 900,
                                            pixelWidth: 1350,
                                            sizes: `calc(min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px) * 1.1667)`,
                                            src: `./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-674d046e.png`,
                                            srcSet: `./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-fa0bee4e.png 512w,./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-0d37d9c1.png 1024w,./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-674d046e.png 1350w`,
                                          },
                                        },
                                      },
                                      children: u(P, {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 468.5,
                                          intrinsicWidth: 841.5,
                                          pixelHeight: 900,
                                          pixelWidth: 1350,
                                          src: `./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-674d046e.png`,
                                          srcSet: `./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-fa0bee4e.png 512w,./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-0d37d9c1.png 1024w,./assets/images/B9rNrlRBfXrORwzfHvYWhPDX1Y-674d046e.png 1350w`,
                                        },
                                        className: `framer-1k80ww9 hidden-3nf04q hidden-1l9f9eo`,
                                        "data-framer-name": `Star base (Phone)`,
                                      }),
                                    }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 900,
                                          intrinsicWidth: 948.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              1523,
                                          ),
                                          pixelHeight: 3101,
                                          pixelWidth: 3269,
                                          sizes: `calc(min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px) + 109px)`,
                                          src: `./assets/images/oXPWxt9UALsgRxAkQtOYoJzw-7d95cca7.png`,
                                          srcSet: `./assets/images/oXPWxt9UALsgRxAkQtOYoJzw-124561be.png 512w,./assets/images/oXPWxt9UALsgRxAkQtOYoJzw-3ddfbb62.png 1024w,./assets/images/oXPWxt9UALsgRxAkQtOYoJzw-be2fd36c.png 2048w,./assets/images/oXPWxt9UALsgRxAkQtOYoJzw-7d95cca7.png 3269w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 900,
                                          intrinsicWidth: 948.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              983,
                                          ),
                                          pixelHeight: 3090,
                                          pixelWidth: 3269,
                                          sizes: `calc(min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px) + 120px)`,
                                          src: `./assets/images/UN1gFmlTxQh3vQN5XLotZTdM-6866e09e.png`,
                                          srcSet: `./assets/images/UN1gFmlTxQh3vQN5XLotZTdM-3a292be6.png 512w,./assets/images/UN1gFmlTxQh3vQN5XLotZTdM-83c4f1b3.png 1024w,./assets/images/UN1gFmlTxQh3vQN5XLotZTdM-27c42e38.png 2048w,./assets/images/UN1gFmlTxQh3vQN5XLotZTdM-6866e09e.png 3269w`,
                                        },
                                      },
                                    },
                                    children: u(Zr, {
                                      __framer__loop: Wi,
                                      __framer__loopEffectEnabled: !0,
                                      __framer__loopPauseOffscreen: !0,
                                      __framer__loopRepeatDelay: 0,
                                      __framer__loopRepeatType: `mirror`,
                                      __framer__loopTransition: Ui,
                                      __perspectiveFX: !1,
                                      __targetOpacity: 1,
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 900,
                                        intrinsicWidth: 948.5,
                                        pixelHeight: 3090,
                                        pixelWidth: 3269,
                                        sizes: `calc(min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px) + 200px)`,
                                        src: `./assets/images/UN1gFmlTxQh3vQN5XLotZTdM-6866e09e.png`,
                                        srcSet: `./assets/images/UN1gFmlTxQh3vQN5XLotZTdM-3a292be6.png 512w,./assets/images/UN1gFmlTxQh3vQN5XLotZTdM-83c4f1b3.png 1024w,./assets/images/UN1gFmlTxQh3vQN5XLotZTdM-27c42e38.png 2048w,./assets/images/UN1gFmlTxQh3vQN5XLotZTdM-6866e09e.png 3269w`,
                                      },
                                      className: `framer-ugi89b`,
                                      "data-framer-name": `Hills`,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 1205,
                                          intrinsicWidth: 830.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              647,
                                          ),
                                          pixelHeight: 2410,
                                          pixelWidth: 1661,
                                          sizes: `1312px`,
                                          src: `./assets/images/rEehKhdtkygCYWwZsEWl6rkOY-2e104e24.png`,
                                          srcSet: `./assets/images/rEehKhdtkygCYWwZsEWl6rkOY-bbfef702.png 705w,./assets/images/rEehKhdtkygCYWwZsEWl6rkOY-d858db7a.png 1411w,./assets/images/rEehKhdtkygCYWwZsEWl6rkOY-2e104e24.png 1661w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        __framer__loop: Ki,
                                        animate: qi,
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 1205,
                                          intrinsicWidth: 830.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              434,
                                          ),
                                          pixelHeight: 2410,
                                          pixelWidth: 1661,
                                          sizes: `743px`,
                                          src: `./assets/images/rEehKhdtkygCYWwZsEWl6rkOY-2e104e24.png`,
                                          srcSet: `./assets/images/rEehKhdtkygCYWwZsEWl6rkOY-bbfef702.png 705w,./assets/images/rEehKhdtkygCYWwZsEWl6rkOY-d858db7a.png 1411w,./assets/images/rEehKhdtkygCYWwZsEWl6rkOY-2e104e24.png 1661w`,
                                        },
                                        initial: Ji,
                                        optimized: !0,
                                      },
                                    },
                                    children: u(X, {
                                      __framer__loop: Gi,
                                      __framer__loopEffectEnabled: !0,
                                      __framer__loopPauseOffscreen: !0,
                                      __framer__loopRepeatDelay: 0,
                                      __framer__loopRepeatType: `mirror`,
                                      __framer__loopTransition: Q,
                                      __perspectiveFX: !1,
                                      __targetOpacity: 1,
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 1205,
                                        intrinsicWidth: 830.5,
                                        pixelHeight: 2410,
                                        pixelWidth: 1661,
                                        sizes: `1651px`,
                                        src: `./assets/images/rEehKhdtkygCYWwZsEWl6rkOY-2e104e24.png`,
                                        srcSet: `./assets/images/rEehKhdtkygCYWwZsEWl6rkOY-bbfef702.png 705w,./assets/images/rEehKhdtkygCYWwZsEWl6rkOY-d858db7a.png 1411w,./assets/images/rEehKhdtkygCYWwZsEWl6rkOY-2e104e24.png 1661w`,
                                      },
                                      className: `framer-b2lg7r`,
                                      "data-framer-appear-id": `b2lg7r`,
                                      "data-framer-name": `Tree (left side) `,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 2295,
                                          intrinsicWidth: 1559.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              423,
                                          ),
                                          pixelHeight: 3950,
                                          pixelWidth: 3082,
                                          sizes: `1265px`,
                                          src: `./assets/images/ZSJY7eumK7S41MjYYufhtN01IRg-c1f611cf.png`,
                                          srcSet: `./assets/images/ZSJY7eumK7S41MjYYufhtN01IRg-688e31ce.png 798w,./assets/images/ZSJY7eumK7S41MjYYufhtN01IRg-32ee4734.png 1597w,./assets/images/ZSJY7eumK7S41MjYYufhtN01IRg-c1f611cf.png 3082w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        __framer__loop: Xi,
                                        animate: Zi,
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 2295,
                                          intrinsicWidth: 1559.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              319,
                                          ),
                                          pixelHeight: 3950,
                                          pixelWidth: 3082,
                                          sizes: `736px`,
                                          src: `./assets/images/ZSJY7eumK7S41MjYYufhtN01IRg-c1f611cf.png`,
                                          srcSet: `./assets/images/ZSJY7eumK7S41MjYYufhtN01IRg-688e31ce.png 798w,./assets/images/ZSJY7eumK7S41MjYYufhtN01IRg-32ee4734.png 1597w,./assets/images/ZSJY7eumK7S41MjYYufhtN01IRg-c1f611cf.png 3082w`,
                                        },
                                        initial: Qi,
                                        optimized: !0,
                                      },
                                    },
                                    children: u(X, {
                                      __framer__loop: Yi,
                                      __framer__loopEffectEnabled: !0,
                                      __framer__loopPauseOffscreen: !0,
                                      __framer__loopRepeatDelay: 0,
                                      __framer__loopRepeatType: `mirror`,
                                      __framer__loopTransition: Q,
                                      __perspectiveFX: !1,
                                      __targetOpacity: 1,
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 2295,
                                        intrinsicWidth: 1559.5,
                                        pixelHeight: 3950,
                                        pixelWidth: 3082,
                                        sizes: `1561px`,
                                        src: `./assets/images/ZSJY7eumK7S41MjYYufhtN01IRg-c1f611cf.png`,
                                        srcSet: `./assets/images/ZSJY7eumK7S41MjYYufhtN01IRg-688e31ce.png 798w,./assets/images/ZSJY7eumK7S41MjYYufhtN01IRg-32ee4734.png 1597w,./assets/images/ZSJY7eumK7S41MjYYufhtN01IRg-c1f611cf.png 3082w`,
                                      },
                                      className: `framer-9hg1xy`,
                                      "data-framer-appear-id": `9hg1xy`,
                                      "data-framer-name": `Tree (right side) (desktop)`,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 230,
                                          intrinsicWidth: 290,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              383,
                                          ),
                                          pixelHeight: 897,
                                          pixelWidth: 1130,
                                          sizes: `815px`,
                                          src: `./assets/images/twvHU5G71aUcNiM3cKNcpwJs9M-950d54db.png`,
                                          srcSet: `./assets/images/twvHU5G71aUcNiM3cKNcpwJs9M-4e0888a8.png 512w,./assets/images/twvHU5G71aUcNiM3cKNcpwJs9M-36917c8e.png 1024w,./assets/images/twvHU5G71aUcNiM3cKNcpwJs9M-950d54db.png 1130w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 230,
                                          intrinsicWidth: 290,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              266,
                                          ),
                                          pixelHeight: 897,
                                          pixelWidth: 1130,
                                          sizes: `432px`,
                                          src: `./assets/images/twvHU5G71aUcNiM3cKNcpwJs9M-950d54db.png`,
                                          srcSet: `./assets/images/twvHU5G71aUcNiM3cKNcpwJs9M-4e0888a8.png 512w,./assets/images/twvHU5G71aUcNiM3cKNcpwJs9M-36917c8e.png 1024w,./assets/images/twvHU5G71aUcNiM3cKNcpwJs9M-950d54db.png 1130w`,
                                        },
                                        initial: ta,
                                      },
                                    },
                                    children: u(X, {
                                      __framer__loop: $i,
                                      __framer__loopEffectEnabled: !0,
                                      __framer__loopPauseOffscreen: !0,
                                      __framer__loopRepeatDelay: 0,
                                      __framer__loopRepeatType: `mirror`,
                                      __framer__loopTransition: Q,
                                      __perspectiveFX: !1,
                                      __targetOpacity: 1,
                                      animate: Ni,
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 230,
                                        intrinsicWidth: 290,
                                        pixelHeight: 897,
                                        pixelWidth: 1130,
                                        sizes: `815px`,
                                        src: `./assets/images/twvHU5G71aUcNiM3cKNcpwJs9M-950d54db.png`,
                                        srcSet: `./assets/images/twvHU5G71aUcNiM3cKNcpwJs9M-4e0888a8.png 512w,./assets/images/twvHU5G71aUcNiM3cKNcpwJs9M-36917c8e.png 1024w,./assets/images/twvHU5G71aUcNiM3cKNcpwJs9M-950d54db.png 1130w`,
                                      },
                                      className: `framer-1f80wvp`,
                                      "data-framer-appear-id": `1f80wvp`,
                                      "data-framer-name": `Shiva`,
                                      initial: ea,
                                      optimized: !0,
                                      transformTemplate: Oi,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 230,
                                          intrinsicWidth: 290,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              350,
                                          ),
                                          pixelHeight: 698,
                                          pixelWidth: 713,
                                          sizes: `699px`,
                                          src: `./assets/images/f7Vmkbdc4BW3zKHb26ksJL3fjE-4cab287b.png`,
                                          srcSet: `./assets/images/f7Vmkbdc4BW3zKHb26ksJL3fjE-61626e40.png 512w,./assets/images/f7Vmkbdc4BW3zKHb26ksJL3fjE-4cab287b.png 713w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        __framer__loop: ia,
                                        __framer__loopTransition: ki,
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 230,
                                          intrinsicWidth: 290,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              297,
                                          ),
                                          pixelHeight: 698,
                                          pixelWidth: 713,
                                          sizes: `250px`,
                                          src: `./assets/images/f7Vmkbdc4BW3zKHb26ksJL3fjE-4cab287b.png`,
                                          srcSet: `./assets/images/f7Vmkbdc4BW3zKHb26ksJL3fjE-61626e40.png 512w,./assets/images/f7Vmkbdc4BW3zKHb26ksJL3fjE-4cab287b.png 713w`,
                                        },
                                      },
                                    },
                                    children: u(X, {
                                      __framer__loop: na,
                                      __framer__loopEffectEnabled: !0,
                                      __framer__loopPauseOffscreen: !0,
                                      __framer__loopRepeatDelay: 0,
                                      __framer__loopRepeatType: `mirror`,
                                      __framer__loopTransition: Q,
                                      __perspectiveFX: !1,
                                      __targetOpacity: 1,
                                      animate: Zi,
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 230,
                                        intrinsicWidth: 290,
                                        pixelHeight: 698,
                                        pixelWidth: 713,
                                        sizes: `724px`,
                                        src: `./assets/images/f7Vmkbdc4BW3zKHb26ksJL3fjE-4cab287b.png`,
                                        srcSet: `./assets/images/f7Vmkbdc4BW3zKHb26ksJL3fjE-61626e40.png 512w,./assets/images/f7Vmkbdc4BW3zKHb26ksJL3fjE-4cab287b.png 713w`,
                                      },
                                      className: `framer-1637jij`,
                                      "data-framer-appear-id": `1637jij`,
                                      "data-framer-name": `Leaves - Right`,
                                      initial: ra,
                                      optimized: !0,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 230,
                                          intrinsicWidth: 290,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              350,
                                          ),
                                          pixelHeight: 695,
                                          pixelWidth: 713,
                                          sizes: `724px`,
                                          src: `./assets/images/yLyHOR0RXbyZbQFfhrMI61lFHG4-95e9e219.png`,
                                          srcSet: `./assets/images/yLyHOR0RXbyZbQFfhrMI61lFHG4-f377698f.png 512w,./assets/images/yLyHOR0RXbyZbQFfhrMI61lFHG4-95e9e219.png 713w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        __framer__loop: ia,
                                        __framer__loopTransition: ki,
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 230,
                                          intrinsicWidth: 290,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              297,
                                          ),
                                          pixelHeight: 695,
                                          pixelWidth: 713,
                                          sizes: `250px`,
                                          src: `./assets/images/yLyHOR0RXbyZbQFfhrMI61lFHG4-95e9e219.png`,
                                          srcSet: `./assets/images/yLyHOR0RXbyZbQFfhrMI61lFHG4-f377698f.png 512w,./assets/images/yLyHOR0RXbyZbQFfhrMI61lFHG4-95e9e219.png 713w`,
                                        },
                                      },
                                    },
                                    children: u(X, {
                                      __framer__loop: na,
                                      __framer__loopEffectEnabled: !0,
                                      __framer__loopPauseOffscreen: !0,
                                      __framer__loopRepeatDelay: 0,
                                      __framer__loopRepeatType: `mirror`,
                                      __framer__loopTransition: Q,
                                      __perspectiveFX: !1,
                                      __targetOpacity: 1,
                                      animate: Zi,
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 230,
                                        intrinsicWidth: 290,
                                        pixelHeight: 695,
                                        pixelWidth: 713,
                                        sizes: `724px`,
                                        src: `./assets/images/yLyHOR0RXbyZbQFfhrMI61lFHG4-95e9e219.png`,
                                        srcSet: `./assets/images/yLyHOR0RXbyZbQFfhrMI61lFHG4-f377698f.png 512w,./assets/images/yLyHOR0RXbyZbQFfhrMI61lFHG4-95e9e219.png 713w`,
                                      },
                                      className: `framer-hhczno`,
                                      "data-framer-appear-id": `hhczno`,
                                      "data-framer-name": `Leaves - Left`,
                                      initial: ra,
                                      optimized: !0,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 1343,
                                          intrinsicWidth: 68,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              -52,
                                          ),
                                          pixelHeight: 2685,
                                          pixelWidth: 137,
                                          sizes: `120px`,
                                          src: `./assets/images/EdEFe6n6lZU38I3Q3QjTMt9iEY-91c3de39.png`,
                                          srcSet: `./assets/images/EdEFe6n6lZU38I3Q3QjTMt9iEY-91c3de39.png 137w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 1343,
                                          intrinsicWidth: 68,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              -21,
                                          ),
                                          pixelHeight: 2685,
                                          pixelWidth: 137,
                                          sizes: `72px`,
                                          src: `./assets/images/EdEFe6n6lZU38I3Q3QjTMt9iEY-91c3de39.png`,
                                          srcSet: `./assets/images/EdEFe6n6lZU38I3Q3QjTMt9iEY-91c3de39.png 137w`,
                                        },
                                      },
                                    },
                                    children: u(P, {
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 1343,
                                        intrinsicWidth: 68,
                                        pixelHeight: 2685,
                                        pixelWidth: 137,
                                        sizes: `130px`,
                                        src: `./assets/images/EdEFe6n6lZU38I3Q3QjTMt9iEY-91c3de39.png`,
                                        srcSet: `./assets/images/EdEFe6n6lZU38I3Q3QjTMt9iEY-91c3de39.png 137w`,
                                      },
                                      className: `framer-10ov673`,
                                      "data-framer-name": `Paper border right`,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 379,
                                          intrinsicWidth: 419.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              334,
                                          ),
                                          pixelHeight: 826,
                                          pixelWidth: 839,
                                          sizes: `823px`,
                                          src: `./assets/images/nANJUUA3JunmZmLf3Peu7TbmMU-db65ac42.png`,
                                          srcSet: `./assets/images/nANJUUA3JunmZmLf3Peu7TbmMU-9db7ec06.png 512w,./assets/images/nANJUUA3JunmZmLf3Peu7TbmMU-db65ac42.png 839w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        __framer__loopTransition: ki,
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 379,
                                          intrinsicWidth: 419.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              340,
                                          ),
                                          pixelHeight: 826,
                                          pixelWidth: 839,
                                          sizes: `278px`,
                                          src: `./assets/images/nANJUUA3JunmZmLf3Peu7TbmMU-db65ac42.png`,
                                          srcSet: `./assets/images/nANJUUA3JunmZmLf3Peu7TbmMU-9db7ec06.png 512w,./assets/images/nANJUUA3JunmZmLf3Peu7TbmMU-db65ac42.png 839w`,
                                        },
                                      },
                                    },
                                    children: u(X, {
                                      __framer__loop: $i,
                                      __framer__loopEffectEnabled: !0,
                                      __framer__loopPauseOffscreen: !0,
                                      __framer__loopRepeatDelay: 0,
                                      __framer__loopRepeatType: `mirror`,
                                      __framer__loopTransition: Q,
                                      __perspectiveFX: !1,
                                      __targetOpacity: 1,
                                      animate: Ri,
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 379,
                                        intrinsicWidth: 419.5,
                                        pixelHeight: 826,
                                        pixelWidth: 839,
                                        sizes: `823px`,
                                        src: `./assets/images/nANJUUA3JunmZmLf3Peu7TbmMU-db65ac42.png`,
                                        srcSet: `./assets/images/nANJUUA3JunmZmLf3Peu7TbmMU-9db7ec06.png 512w,./assets/images/nANJUUA3JunmZmLf3Peu7TbmMU-db65ac42.png 839w`,
                                      },
                                      className: `framer-34w19m`,
                                      "data-framer-appear-id": `34w19m`,
                                      "data-framer-name": `Big leaves - R`,
                                      initial: aa,
                                      optimized: !0,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 1343,
                                          intrinsicWidth: 67.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              -52,
                                          ),
                                          pixelHeight: 2686,
                                          pixelWidth: 121,
                                          sizes: `120px`,
                                          src: `./assets/images/LjMVHbCtoHm46EvfNtJa0PczbLw-6a4e2cef.png`,
                                          srcSet: `./assets/images/LjMVHbCtoHm46EvfNtJa0PczbLw-6a4e2cef.png 121w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 1343,
                                          intrinsicWidth: 67.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              -32,
                                          ),
                                          pixelHeight: 2686,
                                          pixelWidth: 121,
                                          sizes: `72px`,
                                          src: `./assets/images/LjMVHbCtoHm46EvfNtJa0PczbLw-6a4e2cef.png`,
                                          srcSet: `./assets/images/LjMVHbCtoHm46EvfNtJa0PczbLw-6a4e2cef.png 121w`,
                                        },
                                      },
                                    },
                                    children: u(P, {
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 1343,
                                        intrinsicWidth: 67.5,
                                        pixelHeight: 2686,
                                        pixelWidth: 121,
                                        sizes: `130px`,
                                        src: `./assets/images/LjMVHbCtoHm46EvfNtJa0PczbLw-6a4e2cef.png`,
                                        srcSet: `./assets/images/LjMVHbCtoHm46EvfNtJa0PczbLw-6a4e2cef.png 121w`,
                                      },
                                      className: `framer-zs4ph6`,
                                      "data-framer-name": `Paper border left`,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 278,
                                          intrinsicWidth: 229,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              2012,
                                          ),
                                          pixelHeight: 518,
                                          pixelWidth: 458,
                                          sizes: `252px`,
                                          src: `./assets/images/O8OgsmAHClxaPrCg7jS8lEFVO8E-14439a4c.png`,
                                          srcSet: `./assets/images/O8OgsmAHClxaPrCg7jS8lEFVO8E-14439a4c.png 458w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 278,
                                          intrinsicWidth: 229,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              1229,
                                          ),
                                          pixelHeight: 518,
                                          pixelWidth: 458,
                                          sizes: `150px`,
                                          src: `./assets/images/O8OgsmAHClxaPrCg7jS8lEFVO8E-14439a4c.png`,
                                          srcSet: `./assets/images/O8OgsmAHClxaPrCg7jS8lEFVO8E-14439a4c.png 458w`,
                                        },
                                      },
                                    },
                                    children: u(P, {
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 278,
                                        intrinsicWidth: 229,
                                        pixelHeight: 518,
                                        pixelWidth: 458,
                                        sizes: `361px`,
                                        src: `./assets/images/O8OgsmAHClxaPrCg7jS8lEFVO8E-14439a4c.png`,
                                        srcSet: `./assets/images/O8OgsmAHClxaPrCg7jS8lEFVO8E-14439a4c.png 458w`,
                                      },
                                      className: `framer-1bxw18n`,
                                      "data-framer-name": `G - Vector (left)`,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 379,
                                          intrinsicWidth: 419.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              334,
                                          ),
                                          pixelHeight: 826,
                                          pixelWidth: 839,
                                          sizes: `823px`,
                                          src: `./assets/images/zGRmbM0Kc7cI5GZh2XKWu9xP920-96bbd8e5.png`,
                                          srcSet: `./assets/images/zGRmbM0Kc7cI5GZh2XKWu9xP920-c64cc56b.png 512w,./assets/images/zGRmbM0Kc7cI5GZh2XKWu9xP920-96bbd8e5.png 839w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        __framer__loopTransition: ki,
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 379,
                                          intrinsicWidth: 419.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              340,
                                          ),
                                          pixelHeight: 826,
                                          pixelWidth: 839,
                                          sizes: `278px`,
                                          src: `./assets/images/zGRmbM0Kc7cI5GZh2XKWu9xP920-96bbd8e5.png`,
                                          srcSet: `./assets/images/zGRmbM0Kc7cI5GZh2XKWu9xP920-c64cc56b.png 512w,./assets/images/zGRmbM0Kc7cI5GZh2XKWu9xP920-96bbd8e5.png 839w`,
                                        },
                                      },
                                    },
                                    children: u(X, {
                                      __framer__loop: $i,
                                      __framer__loopEffectEnabled: !0,
                                      __framer__loopPauseOffscreen: !0,
                                      __framer__loopRepeatDelay: 0,
                                      __framer__loopRepeatType: `mirror`,
                                      __framer__loopTransition: Q,
                                      __perspectiveFX: !1,
                                      __targetOpacity: 1,
                                      animate: Ri,
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 379,
                                        intrinsicWidth: 419.5,
                                        pixelHeight: 826,
                                        pixelWidth: 839,
                                        sizes: `823px`,
                                        src: `./assets/images/zGRmbM0Kc7cI5GZh2XKWu9xP920-96bbd8e5.png`,
                                        srcSet: `./assets/images/zGRmbM0Kc7cI5GZh2XKWu9xP920-c64cc56b.png 512w,./assets/images/zGRmbM0Kc7cI5GZh2XKWu9xP920-96bbd8e5.png 839w`,
                                      },
                                      className: `framer-qv860g`,
                                      "data-framer-appear-id": `qv860g`,
                                      "data-framer-name": `Big leaves - L`,
                                      initial: aa,
                                      optimized: !0,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 259,
                                          intrinsicWidth: 229,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              2012,
                                          ),
                                          pixelHeight: 518,
                                          pixelWidth: 458,
                                          sizes: `252px`,
                                          src: `./assets/images/LGk7fDm17zukhruB2ql24Jgzaq0-ae24d9b2.png`,
                                          srcSet: `./assets/images/LGk7fDm17zukhruB2ql24Jgzaq0-ae24d9b2.png 458w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 259,
                                          intrinsicWidth: 229,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              1229,
                                          ),
                                          pixelHeight: 518,
                                          pixelWidth: 458,
                                          sizes: `150px`,
                                          src: `./assets/images/LGk7fDm17zukhruB2ql24Jgzaq0-ae24d9b2.png`,
                                          srcSet: `./assets/images/LGk7fDm17zukhruB2ql24Jgzaq0-ae24d9b2.png 458w`,
                                        },
                                      },
                                    },
                                    children: u(P, {
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 259,
                                        intrinsicWidth: 229,
                                        pixelHeight: 518,
                                        pixelWidth: 458,
                                        sizes: `361px`,
                                        src: `./assets/images/LGk7fDm17zukhruB2ql24Jgzaq0-ae24d9b2.png`,
                                        srcSet: `./assets/images/LGk7fDm17zukhruB2ql24Jgzaq0-ae24d9b2.png 458w`,
                                      },
                                      className: `framer-1a5z692`,
                                      "data-framer-name": `G - vector (right)`,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 68,
                                          intrinsicWidth: 946,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              2178,
                                          ),
                                          pixelHeight: 136,
                                          pixelWidth: 1892,
                                          sizes: `calc(min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px) + 1165px)`,
                                          src: `./assets/images/FZrF0IYCyry5YbaC0YGwqR4xmrU-b96625c5.png`,
                                          srcSet: `./assets/images/FZrF0IYCyry5YbaC0YGwqR4xmrU-56911c14.png 512w,./assets/images/FZrF0IYCyry5YbaC0YGwqR4xmrU-b1705b05.png 1024w,./assets/images/FZrF0IYCyry5YbaC0YGwqR4xmrU-b96625c5.png 1892w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 68,
                                          intrinsicWidth: 946,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              1322,
                                          ),
                                          pixelHeight: 136,
                                          pixelWidth: 1892,
                                          sizes: `calc(min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px) + 829px)`,
                                          src: `./assets/images/FZrF0IYCyry5YbaC0YGwqR4xmrU-b96625c5.png`,
                                          srcSet: `./assets/images/FZrF0IYCyry5YbaC0YGwqR4xmrU-56911c14.png 512w,./assets/images/FZrF0IYCyry5YbaC0YGwqR4xmrU-b1705b05.png 1024w,./assets/images/FZrF0IYCyry5YbaC0YGwqR4xmrU-b96625c5.png 1892w`,
                                        },
                                      },
                                    },
                                    children: u(P, {
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 68,
                                        intrinsicWidth: 946,
                                        pixelHeight: 136,
                                        pixelWidth: 1892,
                                        sizes: `calc(min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px) + 859px)`,
                                        src: `./assets/images/FZrF0IYCyry5YbaC0YGwqR4xmrU-b96625c5.png`,
                                        srcSet: `./assets/images/FZrF0IYCyry5YbaC0YGwqR4xmrU-56911c14.png 512w,./assets/images/FZrF0IYCyry5YbaC0YGwqR4xmrU-b1705b05.png 1024w,./assets/images/FZrF0IYCyry5YbaC0YGwqR4xmrU-b96625c5.png 1892w`,
                                      },
                                      className: `framer-tb9nk2`,
                                      "data-framer-name": `Bottom flowers`,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 264,
                                          intrinsicWidth: 176,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              2051,
                                          ),
                                          pixelHeight: 528,
                                          pixelWidth: 352,
                                          sizes: `199px`,
                                          src: `./assets/images/yjx8LdCZh3g7FOCG3NXovDQMCL4-234fbac1.png`,
                                          srcSet: `./assets/images/yjx8LdCZh3g7FOCG3NXovDQMCL4-234fbac1.png 352w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 264,
                                          intrinsicWidth: 176,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              1241,
                                          ),
                                          pixelHeight: 528,
                                          pixelWidth: 352,
                                          sizes: `120px`,
                                          src: `./assets/images/yjx8LdCZh3g7FOCG3NXovDQMCL4-234fbac1.png`,
                                          srcSet: `./assets/images/yjx8LdCZh3g7FOCG3NXovDQMCL4-234fbac1.png 352w`,
                                        },
                                      },
                                    },
                                    children: u(P, {
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 264,
                                        intrinsicWidth: 176,
                                        pixelHeight: 528,
                                        pixelWidth: 352,
                                        sizes: `286.7106px`,
                                        src: `./assets/images/yjx8LdCZh3g7FOCG3NXovDQMCL4-234fbac1.png`,
                                        srcSet: `./assets/images/yjx8LdCZh3g7FOCG3NXovDQMCL4-234fbac1.png 352w`,
                                      },
                                      className: `framer-mxb0af`,
                                      "data-framer-name": `Ganesha ji (left)`,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 264,
                                          intrinsicWidth: 176,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              2052,
                                          ),
                                          pixelHeight: 528,
                                          pixelWidth: 352,
                                          sizes: `199px`,
                                          src: `./assets/images/UqYB865gcmj8qfTeafdMPsbmoFs-40eef9a0.png`,
                                          srcSet: `./assets/images/UqYB865gcmj8qfTeafdMPsbmoFs-40eef9a0.png 352w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 264,
                                          intrinsicWidth: 176,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              1241,
                                          ),
                                          pixelHeight: 528,
                                          pixelWidth: 352,
                                          sizes: `120px`,
                                          src: `./assets/images/UqYB865gcmj8qfTeafdMPsbmoFs-40eef9a0.png`,
                                          srcSet: `./assets/images/UqYB865gcmj8qfTeafdMPsbmoFs-40eef9a0.png 352w`,
                                        },
                                      },
                                    },
                                    children: u(P, {
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 264,
                                        intrinsicWidth: 176,
                                        pixelHeight: 528,
                                        pixelWidth: 352,
                                        sizes: `286.5px`,
                                        src: `./assets/images/UqYB865gcmj8qfTeafdMPsbmoFs-40eef9a0.png`,
                                        srcSet: `./assets/images/UqYB865gcmj8qfTeafdMPsbmoFs-40eef9a0.png 352w`,
                                      },
                                      className: `framer-n94lqy`,
                                      "data-framer-name": `Ganesha ji (right)`,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 170,
                                          intrinsicWidth: 152.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6 +
                                              0 +
                                              0 +
                                              2119,
                                          ),
                                          pixelHeight: 340,
                                          pixelWidth: 305,
                                          sizes: `197px`,
                                          src: `./assets/images/HvPxJF5tlETfDdKrl00JuLQppA-f85b5dd6.png`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 170,
                                          intrinsicWidth: 152.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7 +
                                              0 +
                                              0 +
                                              1298,
                                          ),
                                          pixelHeight: 340,
                                          pixelWidth: 305,
                                          sizes: `106px`,
                                          src: `./assets/images/HvPxJF5tlETfDdKrl00JuLQppA-f85b5dd6.png`,
                                        },
                                      },
                                    },
                                    children: u(P, {
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 170,
                                        intrinsicWidth: 152.5,
                                        pixelHeight: 340,
                                        pixelWidth: 305,
                                        sizes: `215px`,
                                        src: `./assets/images/HvPxJF5tlETfDdKrl00JuLQppA-f85b5dd6.png`,
                                      },
                                      className: `framer-16cctct`,
                                      "data-framer-name": `Om `,
                                      transformTemplate: Oi,
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          }),
                          u(m.div, {
                            className: `framer-vp0bm4`,
                            "data-framer-name": `Section 2`,
                            children: u(j, {
                              breakpoint: T,
                              overrides: {
                                kBRqx33QC: {
                                  background: {
                                    alt: ``,
                                    fit: `fill`,
                                    loading: E(
                                      (g?.y || 0) +
                                        0 +
                                        200 +
                                        0 +
                                        0 +
                                        2325 +
                                        0 +
                                        0,
                                    ),
                                    pixelHeight: 4794,
                                    pixelWidth: 1596,
                                    sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                    src: `./assets/images/SPr0bvMk9Lu3lQOpXzLoknBPaJo-d1b12633.png`,
                                    srcSet: `./assets/images/SPr0bvMk9Lu3lQOpXzLoknBPaJo-3e7a792c.png 681w,./assets/images/SPr0bvMk9Lu3lQOpXzLoknBPaJo-188fa170.png 1363w,./assets/images/SPr0bvMk9Lu3lQOpXzLoknBPaJo-d1b12633.png 1596w`,
                                  },
                                },
                                ydPqKqvDJ: {
                                  background: {
                                    alt: ``,
                                    fit: `fill`,
                                    loading: E(
                                      (g?.y || 0) +
                                        0 +
                                        200 +
                                        0 +
                                        0 +
                                        1415 +
                                        0 +
                                        0,
                                    ),
                                    pixelHeight: 9558,
                                    pixelWidth: 1605,
                                    sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                    src: `./assets/images/OhKsaRXATwXiQKdJxCPeJ5gOLoY-ac75610a.png`,
                                    srcSet: `./assets/images/OhKsaRXATwXiQKdJxCPeJ5gOLoY-1ca86efd.png 687w,./assets/images/OhKsaRXATwXiQKdJxCPeJ5gOLoY-ac75610a.png 1605w`,
                                  },
                                },
                              },
                              children: l(P, {
                                background: {
                                  alt: ``,
                                  fit: `fill`,
                                  pixelHeight: 4794,
                                  pixelWidth: 1596,
                                  sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                  src: `./assets/images/SPr0bvMk9Lu3lQOpXzLoknBPaJo-d1b12633.png`,
                                  srcSet: `./assets/images/SPr0bvMk9Lu3lQOpXzLoknBPaJo-3e7a792c.png 681w,./assets/images/SPr0bvMk9Lu3lQOpXzLoknBPaJo-188fa170.png 1363w,./assets/images/SPr0bvMk9Lu3lQOpXzLoknBPaJo-d1b12633.png 1596w`,
                                },
                                className: `framer-9412jb`,
                                "data-framer-name": `Content`,
                                children: [
                                  l(m.div, {
                                    className: `framer-1qycoz3`,
                                    "data-framer-name": `Invite`,
                                    children: [
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          ydPqKqvDJ: {
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              1415 +
                                              0 +
                                              0 +
                                              0 +
                                              0 +
                                              59 +
                                              0,
                                          },
                                        },
                                        children: u(L, {
                                          height: 22,
                                          width: `124px`,
                                          children: u(A, {
                                            className: `framer-1mrjyuk-container`,
                                            id: B,
                                            isModuleExternal: !0,
                                            nodeId: `ScerDqzxO`,
                                            ref: te,
                                            rendersWithMotion: !0,
                                            scopeId: `bmdQ7AEa3`,
                                            children: u(Yt, {
                                              height: `100%`,
                                              id: `ScerDqzxO`,
                                              Ka1jTZQ18: `ॐ श्री गणेशाय नम
`,
                                              layoutId: `ScerDqzxO`,
                                              style: { width: `100%` },
                                              width: `100%`,
                                            }),
                                          }),
                                        }),
                                      }),
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          ydPqKqvDJ: {
                                            background: {
                                              alt: ``,
                                              fit: `fill`,
                                              loading: E(
                                                (g?.y || 0) +
                                                  0 +
                                                  200 +
                                                  0 +
                                                  0 +
                                                  1415 +
                                                  0 +
                                                  0 +
                                                  0 +
                                                  0 +
                                                  59 +
                                                  32,
                                              ),
                                              pixelHeight: 418,
                                              pixelWidth: 417,
                                              sizes: `134px`,
                                              src: `./assets/images/PyU8hByuFeV32eoPq4qDye3jQ18-bc91d848.png`,
                                            },
                                          },
                                        },
                                        children: u(P, {
                                          background: {
                                            alt: ``,
                                            fit: `fill`,
                                            pixelHeight: 418,
                                            pixelWidth: 417,
                                            sizes: `166px`,
                                            src: `./assets/images/PyU8hByuFeV32eoPq4qDye3jQ18-bc91d848.png`,
                                          },
                                          className: `framer-1qehb46`,
                                          "data-framer-name": `Ganesha ji`,
                                        }),
                                      }),
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          ydPqKqvDJ: {
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              1415 +
                                              0 +
                                              0 +
                                              0 +
                                              0 +
                                              59 +
                                              176,
                                          },
                                        },
                                        children: u(L, {
                                          height: 256,
                                          width: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                          children: u(A, {
                                            className: `framer-96zptf-container`,
                                            nodeId: `UK0W9SvW3`,
                                            rendersWithMotion: !0,
                                            scopeId: `bmdQ7AEa3`,
                                            children: u(j, {
                                              breakpoint: T,
                                              overrides: {
                                                ydPqKqvDJ: {
                                                  variant: Z(`WZ1jbCL3w`),
                                                },
                                              },
                                              children: u(Tr, {
                                                BshHh42hy: `Mrs. Reena & Mr. Rajiv Kapoor`,
                                                height: `100%`,
                                                id: `UK0W9SvW3`,
                                                layoutId: `UK0W9SvW3`,
                                                style: { width: `100%` },
                                                variant: Z(`m0xjdm2fz`),
                                                vHsJLcDe4: `Smt. Lata Devi & Sm. Kamal Kapoor`,
                                                width: `100%`,
                                                z8Etn2ctK: `With the heavenly blessings of `,
                                              }),
                                            }),
                                          }),
                                        }),
                                      }),
                                      u(m.div, {
                                        className: `framer-emeao1`,
                                        children: u(j, {
                                          breakpoint: T,
                                          overrides: {
                                            ydPqKqvDJ: {
                                              children: u(n, {
                                                children: u(`p`, {
                                                  style: {
                                                    "--font-selector": `R0Y7Q29ybW9yYW50IEluZmFudC1yZWd1bGFy`,
                                                    "--framer-font-family": `"Cormorant Infant", "Cormorant Infant Placeholder", serif`,
                                                    "--framer-font-size": `80px`,
                                                    "--framer-line-height": `120%`,
                                                    "--framer-text-color": `rgb(172, 149, 69)`,
                                                  },
                                                  children: `INVITE`,
                                                }),
                                              }),
                                            },
                                          },
                                          children: u(w, {
                                            __fromCanvasComponent: !0,
                                            children: u(n, {
                                              children: u(`p`, {
                                                style: {
                                                  "--font-selector": `R0Y7Q29ybW9yYW50IEluZmFudC1yZWd1bGFy`,
                                                  "--framer-font-family": `"Cormorant Infant", "Cormorant Infant Placeholder", serif`,
                                                  "--framer-font-size": `100px`,
                                                  "--framer-line-height": `70%`,
                                                  "--framer-text-color": `rgb(172, 149, 69)`,
                                                },
                                                children: `INVITE`,
                                              }),
                                            }),
                                            className: `framer-117qzko`,
                                            "data-framer-name": `INVITE`,
                                            fonts: [
                                              `GF;Cormorant Infant-regular`,
                                            ],
                                            verticalAlignment: `top`,
                                            withExternalLayout: !0,
                                          }),
                                        }),
                                      }),
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          ydPqKqvDJ: {
                                            children: u(n, {
                                              children: u(`p`, {
                                                style: {
                                                  "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                                  "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                                  "--framer-font-size": `20px`,
                                                  "--framer-letter-spacing": `-0.05em`,
                                                  "--framer-line-height": `100%`,
                                                  "--framer-text-alignment": `center`,
                                                  "--framer-text-color": `rgb(172, 149, 69)`,
                                                },
                                                children: `You to join us in the wedding celebrations of`,
                                              }),
                                            }),
                                          },
                                        },
                                        children: u(w, {
                                          __fromCanvasComponent: !0,
                                          children: u(n, {
                                            children: u(`p`, {
                                              style: {
                                                "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                                "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                                "--framer-font-size": `30px`,
                                                "--framer-letter-spacing": `-0.05em`,
                                                "--framer-line-height": `100%`,
                                                "--framer-text-alignment": `center`,
                                                "--framer-text-color": `rgb(172, 149, 69)`,
                                              },
                                              children: `You to join us in the wedding celebrations of`,
                                            }),
                                          }),
                                          className: `framer-1xsdkt9`,
                                          "data-framer-name": `You to join us in the wedding celebrations of`,
                                          fonts: [
                                            `GF;Cormorant Upright-regular`,
                                          ],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      }),
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          ydPqKqvDJ: {
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              1415 +
                                              0 +
                                              0 +
                                              0 +
                                              0 +
                                              59 +
                                              725,
                                          },
                                        },
                                        children: u(L, {
                                          height: 567,
                                          width: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                          children: u(A, {
                                            className: `framer-1wz8q9m-container`,
                                            isModuleExternal: !0,
                                            nodeId: `zZSTdtqaZ`,
                                            rendersWithMotion: !0,
                                            scopeId: `bmdQ7AEa3`,
                                            children: u(j, {
                                              breakpoint: T,
                                              overrides: {
                                                ydPqKqvDJ: {
                                                  variant: Z(`JFMepYUnJ`),
                                                },
                                              },
                                              children: u(dt, {
                                                bHDTlInTN: `Abhishek`,
                                                height: `100%`,
                                                HF8FakP9B: `Kanika`,
                                                id: `zZSTdtqaZ`,
                                                layoutId: `zZSTdtqaZ`,
                                                style: { width: `100%` },
                                                variant: Z(`Bnj3QwWfw`),
                                                width: `100%`,
                                              }),
                                            }),
                                          }),
                                        }),
                                      }),
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          ydPqKqvDJ: {
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              1415 +
                                              0 +
                                              0 +
                                              0 +
                                              0 +
                                              59 +
                                              1302,
                                          },
                                        },
                                        children: u(L, {
                                          height: 210,
                                          width: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                          children: u(A, {
                                            className: `framer-180sx8m-container`,
                                            isModuleExternal: !0,
                                            nodeId: `HmMzqDSje`,
                                            rendersWithMotion: !0,
                                            scopeId: `bmdQ7AEa3`,
                                            children: u(j, {
                                              breakpoint: T,
                                              overrides: {
                                                ydPqKqvDJ: {
                                                  variant: Z(`csPF25Krs`),
                                                },
                                              },
                                              children: u($n, {
                                                gYtHAhAat: `Daughter of`,
                                                height: `100%`,
                                                id: `HmMzqDSje`,
                                                layoutId: `HmMzqDSje`,
                                                M0b6PSgQY: `Mrs. Shalini & Mr. Aakash Mittal,`,
                                                style: { width: `100%` },
                                                variant: Z(`uloxJ0t5s`),
                                                width: `100%`,
                                              }),
                                            }),
                                          }),
                                        }),
                                      }),
                                    ],
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 592.5,
                                          intrinsicWidth: 565,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              2325 +
                                              0 +
                                              0 +
                                              358.5,
                                          ),
                                          pixelHeight: 1185,
                                          pixelWidth: 1130,
                                          sizes: `413px`,
                                          src: `./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-60e73146.png`,
                                          srcSet: `./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-e643ad1e.png 976w,./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-60e73146.png 1130w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 592.5,
                                          intrinsicWidth: 565,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              1415 +
                                              0 +
                                              0 +
                                              165,
                                          ),
                                          pixelHeight: 1185,
                                          pixelWidth: 1130,
                                          sizes: `222px`,
                                          src: `./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-60e73146.png`,
                                          srcSet: `./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-e643ad1e.png 976w,./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-60e73146.png 1130w`,
                                        },
                                      },
                                    },
                                    children: u(P, {
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 592.5,
                                        intrinsicWidth: 565,
                                        pixelHeight: 1185,
                                        pixelWidth: 1130,
                                        sizes: `528px`,
                                        src: `./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-60e73146.png`,
                                        srcSet: `./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-e643ad1e.png 976w,./assets/images/wHXdUM5TWv2v0SV6GoD6XjI7A8-60e73146.png 1130w`,
                                      },
                                      className: `framer-1qi7tcr`,
                                      "data-framer-name": `The moon`,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fit`,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              2325 +
                                              0 +
                                              0 +
                                              -7,
                                          ),
                                          pixelHeight: 2846,
                                          pixelWidth: 2842,
                                          positionX: `center`,
                                          positionY: `center`,
                                          sizes: `636px`,
                                          src: `./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-7741780a.png`,
                                          srcSet: `./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-59ebc56e.png 1022w,./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-0c8a070d.png 2045w,./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-7741780a.png 2842w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fit`,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              1415 +
                                              0 +
                                              0 +
                                              -10,
                                          ),
                                          pixelHeight: 4242,
                                          pixelWidth: 3208,
                                          positionX: `center`,
                                          positionY: `center`,
                                          sizes: `345px`,
                                          src: `./assets/images/NCJNcvJZC0xrKHOBNNDyEtVQ8a8-c94cb923.png`,
                                          srcSet: `./assets/images/NCJNcvJZC0xrKHOBNNDyEtVQ8a8-360cc5c0.png 774w,./assets/images/NCJNcvJZC0xrKHOBNNDyEtVQ8a8-7e82fdce.png 1548w,./assets/images/NCJNcvJZC0xrKHOBNNDyEtVQ8a8-c6ca1ba6.png 3097w,./assets/images/NCJNcvJZC0xrKHOBNNDyEtVQ8a8-c94cb923.png 3208w`,
                                        },
                                      },
                                    },
                                    children: u(P, {
                                      background: {
                                        alt: ``,
                                        fit: `fit`,
                                        pixelHeight: 2846,
                                        pixelWidth: 2842,
                                        positionX: `center`,
                                        positionY: `center`,
                                        sizes: `690px`,
                                        src: `./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-7741780a.png`,
                                        srcSet: `./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-59ebc56e.png 1022w,./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-0c8a070d.png 2045w,./assets/images/LQC5ElMk4rqJ4rtBP5vF6B4-7741780a.png 2842w`,
                                      },
                                      className: `framer-1noxxhl`,
                                      "data-framer-name": `Hot air balloon + jotti`,
                                    }),
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 254,
                                          intrinsicWidth: 336.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              2325 +
                                              0 +
                                              0 +
                                              531,
                                          ),
                                          pixelHeight: 2078,
                                          pixelWidth: 2892,
                                          sizes: `388px`,
                                          src: `./assets/images/wKiH01QNP8DMVItVBJyF9tbg-146632dd.png`,
                                          srcSet: `./assets/images/wKiH01QNP8DMVItVBJyF9tbg-8f23d7d4.png 512w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-d7e85751.png 1024w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-c7565905.png 2048w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-146632dd.png 2892w`,
                                        },
                                      },
                                      ydPqKqvDJ: {
                                        background: {
                                          alt: ``,
                                          fit: `fill`,
                                          intrinsicHeight: 254,
                                          intrinsicWidth: 336.5,
                                          loading: E(
                                            (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              1415 +
                                              0 +
                                              0 +
                                              346,
                                          ),
                                          pixelHeight: 2078,
                                          pixelWidth: 2892,
                                          sizes: `231px`,
                                          src: `./assets/images/wKiH01QNP8DMVItVBJyF9tbg-146632dd.png`,
                                          srcSet: `./assets/images/wKiH01QNP8DMVItVBJyF9tbg-8f23d7d4.png 512w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-d7e85751.png 1024w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-c7565905.png 2048w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-146632dd.png 2892w`,
                                        },
                                      },
                                    },
                                    children: u(P, {
                                      background: {
                                        alt: ``,
                                        fit: `fill`,
                                        intrinsicHeight: 254,
                                        intrinsicWidth: 336.5,
                                        pixelHeight: 2078,
                                        pixelWidth: 2892,
                                        sizes: `542px`,
                                        src: `./assets/images/wKiH01QNP8DMVItVBJyF9tbg-146632dd.png`,
                                        srcSet: `./assets/images/wKiH01QNP8DMVItVBJyF9tbg-8f23d7d4.png 512w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-d7e85751.png 1024w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-c7565905.png 2048w,./assets/images/wKiH01QNP8DMVItVBJyF9tbg-146632dd.png 2892w`,
                                      },
                                      className: `framer-1mbm3vh`,
                                      "data-framer-name": `Hotel`,
                                    }),
                                  }),
                                  l(m.div, {
                                    className: `framer-1qb2nt1`,
                                    "data-framer-name": `Event Cards`,
                                    children: [
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          ydPqKqvDJ: {
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              1415 +
                                              0 +
                                              0 +
                                              0 +
                                              1571 +
                                              0 +
                                              0,
                                          },
                                        },
                                        children: u(L, {
                                          height: 553,
                                          children: u(A, {
                                            className: `framer-1mb953l-container`,
                                            nodeId: `MvVPJCqTc`,
                                            rendersWithMotion: !0,
                                            scopeId: `bmdQ7AEa3`,
                                            children: u(Y, {
                                              BpHZc3dYA: $(
                                                {
                                                  pixelHeight: 1378,
                                                  pixelWidth: 1051,
                                                  src: `./assets/images/yNeMJ3XWsMsSoStbhfEnKuV0-2f845812.png`,
                                                  srcSet: `./assets/images/yNeMJ3XWsMsSoStbhfEnKuV0-c85cf53d.png 781w,./assets/images/yNeMJ3XWsMsSoStbhfEnKuV0-2f845812.png 1051w`,
                                                },
                                                ``,
                                              ),
                                              bsf43jDPr: `The Savoy, Mussoorie`,
                                              height: `100%`,
                                              id: `MvVPJCqTc`,
                                              kcDbVVA2X: `Friday, March 7th 2026`,
                                              layoutId: `MvVPJCqTc`,
                                              oTOyY8dm8: `6pm Onwards`,
                                              width: `100%`,
                                              WoL7lzUKR: `Mehendi`,
                                            }),
                                          }),
                                        }),
                                      }),
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          ydPqKqvDJ: {
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              1415 +
                                              0 +
                                              0 +
                                              0 +
                                              1571 +
                                              0 +
                                              613,
                                          },
                                        },
                                        children: u(L, {
                                          height: 553,
                                          children: u(A, {
                                            className: `framer-68xp2y-container`,
                                            nodeId: `MURREyY7M`,
                                            rendersWithMotion: !0,
                                            scopeId: `bmdQ7AEa3`,
                                            children: u(Y, {
                                              BpHZc3dYA: $(
                                                {
                                                  pixelHeight: 1378,
                                                  pixelWidth: 1051,
                                                  src: `./assets/images/q06YGCStDPz1XyP6VJhYfoPp5w8-254c27e7.png`,
                                                  srcSet: `./assets/images/q06YGCStDPz1XyP6VJhYfoPp5w8-0fd5533f.png 781w,./assets/images/q06YGCStDPz1XyP6VJhYfoPp5w8-254c27e7.png 1051w`,
                                                },
                                                ``,
                                              ),
                                              bsf43jDPr: `The Savoy, Mussoorie`,
                                              height: `100%`,
                                              id: `MURREyY7M`,
                                              kcDbVVA2X: `Friday, March 8th 2026`,
                                              layoutId: `MURREyY7M`,
                                              oTOyY8dm8: `6pm Onwards`,
                                              width: `100%`,
                                              WoL7lzUKR: `Haldi`,
                                            }),
                                          }),
                                        }),
                                      }),
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          ydPqKqvDJ: {
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              1415 +
                                              0 +
                                              0 +
                                              0 +
                                              1571 +
                                              0 +
                                              1226,
                                          },
                                        },
                                        children: u(L, {
                                          height: 553,
                                          children: u(A, {
                                            className: `framer-1l21y3k-container`,
                                            nodeId: `vmAaeu_ne`,
                                            rendersWithMotion: !0,
                                            scopeId: `bmdQ7AEa3`,
                                            children: u(Y, {
                                              BpHZc3dYA: $(
                                                {
                                                  pixelHeight: 1378,
                                                  pixelWidth: 1051,
                                                  src: `./assets/images/GSbqcDKqnrwlakZFBrW7dNukUr8-c268d6ee.png`,
                                                  srcSet: `./assets/images/GSbqcDKqnrwlakZFBrW7dNukUr8-0d0266f4.png 781w,./assets/images/GSbqcDKqnrwlakZFBrW7dNukUr8-c268d6ee.png 1051w`,
                                                },
                                                ``,
                                              ),
                                              bsf43jDPr: `The Savoy, Mussoorie`,
                                              height: `100%`,
                                              id: `vmAaeu_ne`,
                                              kcDbVVA2X: `Friday, March 8th 2026`,
                                              layoutId: `vmAaeu_ne`,
                                              oTOyY8dm8: `6pm Onwards`,
                                              width: `100%`,
                                              WoL7lzUKR: `Cocktail`,
                                            }),
                                          }),
                                        }),
                                      }),
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          ydPqKqvDJ: {
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              1415 +
                                              0 +
                                              0 +
                                              0 +
                                              1571 +
                                              0 +
                                              1839,
                                          },
                                        },
                                        children: u(L, {
                                          height: 553,
                                          children: u(A, {
                                            className: `framer-1dbc3nq-container`,
                                            nodeId: `vmAhpejdn`,
                                            rendersWithMotion: !0,
                                            scopeId: `bmdQ7AEa3`,
                                            children: u(Y, {
                                              BpHZc3dYA: $(
                                                {
                                                  pixelHeight: 1378,
                                                  pixelWidth: 1051,
                                                  src: `./assets/images/UrvYrWOHdNQYDDGmVMsVSKysPBk-e5ea7c4d.png`,
                                                  srcSet: `./assets/images/UrvYrWOHdNQYDDGmVMsVSKysPBk-b8c0e338.png 781w,./assets/images/UrvYrWOHdNQYDDGmVMsVSKysPBk-e5ea7c4d.png 1051w`,
                                                },
                                                ``,
                                              ),
                                              bsf43jDPr: `The Savoy, Mussoorie`,
                                              height: `100%`,
                                              id: `vmAhpejdn`,
                                              kcDbVVA2X: `Friday, March 9th 2026`,
                                              layoutId: `vmAhpejdn`,
                                              oTOyY8dm8: `6pm Onwards`,
                                              width: `100%`,
                                              WoL7lzUKR: `Pre-Wedding`,
                                            }),
                                          }),
                                        }),
                                      }),
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          ydPqKqvDJ: {
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              1415 +
                                              0 +
                                              0 +
                                              0 +
                                              1571 +
                                              0 +
                                              2452,
                                          },
                                        },
                                        children: u(L, {
                                          height: 553,
                                          children: u(A, {
                                            className: `framer-1mud1wr-container`,
                                            nodeId: `EMH5GqULo`,
                                            rendersWithMotion: !0,
                                            scopeId: `bmdQ7AEa3`,
                                            children: u(Y, {
                                              BpHZc3dYA: $(
                                                {
                                                  pixelHeight: 1378,
                                                  pixelWidth: 1051,
                                                  src: `./assets/images/eA9goNWysRXKpdvsAU4PsytxrKg-1f5b1313.png`,
                                                  srcSet: `./assets/images/eA9goNWysRXKpdvsAU4PsytxrKg-9d3b9bb6.png 781w,./assets/images/eA9goNWysRXKpdvsAU4PsytxrKg-1f5b1313.png 1051w`,
                                                },
                                                ``,
                                              ),
                                              bsf43jDPr: `The Savoy, Mussoorie`,
                                              height: `100%`,
                                              id: `EMH5GqULo`,
                                              kcDbVVA2X: `Friday, March 10th 2026`,
                                              layoutId: `EMH5GqULo`,
                                              oTOyY8dm8: `6pm Onwards`,
                                              width: `100%`,
                                              WoL7lzUKR: `Shaadi`,
                                            }),
                                          }),
                                        }),
                                      }),
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          ydPqKqvDJ: {
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              1415 +
                                              0 +
                                              0 +
                                              0 +
                                              1571 +
                                              0 +
                                              3065,
                                          },
                                        },
                                        children: u(L, {
                                          height: 553,
                                          children: u(A, {
                                            className: `framer-tnr6m4-container`,
                                            nodeId: `rBP4n7FNw`,
                                            rendersWithMotion: !0,
                                            scopeId: `bmdQ7AEa3`,
                                            children: u(Y, {
                                              BpHZc3dYA: $(
                                                {
                                                  pixelHeight: 1378,
                                                  pixelWidth: 1051,
                                                  src: `./assets/images/9pEmEhJuFoKRIlxeoHts3mi4-dd4c2210.png`,
                                                  srcSet: `./assets/images/9pEmEhJuFoKRIlxeoHts3mi4-fb54838e.png 781w,./assets/images/9pEmEhJuFoKRIlxeoHts3mi4-dd4c2210.png 1051w`,
                                                },
                                                ``,
                                              ),
                                              bsf43jDPr: `The Savoy, Mussoorie`,
                                              height: `100%`,
                                              id: `rBP4n7FNw`,
                                              kcDbVVA2X: `Friday, March 11th 2026`,
                                              layoutId: `rBP4n7FNw`,
                                              oTOyY8dm8: `6pm Onwards`,
                                              width: `100%`,
                                              WoL7lzUKR: `Reception`,
                                            }),
                                          }),
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                          }),
                          u(m.div, {
                            className: `framer-msu6hn`,
                            "data-framer-name": `Section 3`,
                            children: u(j, {
                              breakpoint: T,
                              overrides: {
                                kBRqx33QC: {
                                  background: {
                                    alt: ``,
                                    fit: `fill`,
                                    loading: E(
                                      (g?.y || 0) +
                                        0 +
                                        200 +
                                        0 +
                                        0 +
                                        7624 +
                                        0 +
                                        0,
                                    ),
                                    pixelHeight: 5698,
                                    pixelWidth: 1605,
                                    sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                    src: `./assets/images/gBnMB6ghHljVUqx9JmFOWkp7Yh4-76a00c48.png`,
                                    srcSet: `./assets/images/gBnMB6ghHljVUqx9JmFOWkp7Yh4-6d3b821a.png 576w,./assets/images/gBnMB6ghHljVUqx9JmFOWkp7Yh4-653d0d97.png 1153w,./assets/images/gBnMB6ghHljVUqx9JmFOWkp7Yh4-76a00c48.png 1605w`,
                                  },
                                },
                                ydPqKqvDJ: {
                                  background: {
                                    alt: ``,
                                    fit: `fill`,
                                    loading: E(
                                      (g?.y || 0) +
                                        0 +
                                        200 +
                                        0 +
                                        0 +
                                        6699 +
                                        0 +
                                        0,
                                    ),
                                    pixelHeight: 3920,
                                    pixelWidth: 1605,
                                    sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                    src: `./assets/images/zftzqaNk2eBB4UQosVCKxLTcg-8fc61e9e.png`,
                                    srcSet: `./assets/images/zftzqaNk2eBB4UQosVCKxLTcg-5f653a38.png 838w,./assets/images/zftzqaNk2eBB4UQosVCKxLTcg-8fc61e9e.png 1605w`,
                                  },
                                },
                              },
                              children: l(P, {
                                background: {
                                  alt: ``,
                                  fit: `fill`,
                                  pixelHeight: 5698,
                                  pixelWidth: 1605,
                                  sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                  src: `./assets/images/gBnMB6ghHljVUqx9JmFOWkp7Yh4-76a00c48.png`,
                                  srcSet: `./assets/images/gBnMB6ghHljVUqx9JmFOWkp7Yh4-6d3b821a.png 576w,./assets/images/gBnMB6ghHljVUqx9JmFOWkp7Yh4-653d0d97.png 1153w,./assets/images/gBnMB6ghHljVUqx9JmFOWkp7Yh4-76a00c48.png 1605w`,
                                },
                                className: `framer-ymki7g`,
                                "data-framer-name": `Content`,
                                children: [
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        y:
                                          (g?.y || 0) +
                                          0 +
                                          200 +
                                          0 +
                                          0 +
                                          7624 +
                                          0 +
                                          0 +
                                          196.14,
                                      },
                                      ydPqKqvDJ: {
                                        height: 924,
                                        width: `924px`,
                                        y:
                                          (g?.y || 0) +
                                          0 +
                                          200 +
                                          0 +
                                          0 +
                                          6699 +
                                          0 +
                                          0 +
                                          0 +
                                          0,
                                      },
                                    },
                                    children: u(L, {
                                      height: 614,
                                      width: `614px`,
                                      children: u(A, {
                                        className: `framer-1u5i8a9-container`,
                                        "data-framer-name": `CTA - Location`,
                                        id: V,
                                        isModuleExternal: !0,
                                        name: `CTA - Location`,
                                        nodeId: `JblZgXuD9`,
                                        ref: ie,
                                        rendersWithMotion: !0,
                                        scopeId: `bmdQ7AEa3`,
                                        children: u(j, {
                                          breakpoint: T,
                                          overrides: {
                                            ydPqKqvDJ: {
                                              variant: Z(`Hkr_qJ0Y2`),
                                            },
                                          },
                                          children: u(Le, {
                                            height: `100%`,
                                            id: `JblZgXuD9`,
                                            layoutId: `JblZgXuD9`,
                                            name: `CTA - Location`,
                                            Q8mzaMJPJ: `dvites.com`,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                            variant: Z(`AD4OFSl8W`),
                                            width: `100%`,
                                          }),
                                        }),
                                      }),
                                    }),
                                  }),
                                  l(m.div, {
                                    className: `framer-ocgc8g`,
                                    "data-framer-name": `Meet the...`,
                                    children: [
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          kBRqx33QC: {
                                            background: {
                                              alt: ``,
                                              fit: `stretch`,
                                              loading: E(
                                                (g?.y || 0) +
                                                  0 +
                                                  200 +
                                                  0 +
                                                  0 +
                                                  7624 +
                                                  0 +
                                                  0 +
                                                  0 +
                                                  0 +
                                                  868 +
                                                  0,
                                              ),
                                              pixelHeight: 372,
                                              pixelWidth: 372,
                                              positionX: `center`,
                                              positionY: `center`,
                                              sizes: `93px`,
                                              src: `./assets/images/NmVSVg1aTrcYbgmRoP9eOE9gpw-05472977.png`,
                                            },
                                          },
                                          ydPqKqvDJ: {
                                            background: {
                                              alt: ``,
                                              fit: `stretch`,
                                              loading: E(
                                                (g?.y || 0) +
                                                  0 +
                                                  200 +
                                                  0 +
                                                  0 +
                                                  6699 +
                                                  0 +
                                                  0 +
                                                  0 +
                                                  924 +
                                                  39 +
                                                  0,
                                              ),
                                              pixelHeight: 372,
                                              pixelWidth: 372,
                                              positionX: `center`,
                                              positionY: `center`,
                                              sizes: `93px`,
                                              src: `./assets/images/NmVSVg1aTrcYbgmRoP9eOE9gpw-05472977.png`,
                                            },
                                          },
                                        },
                                        children: u(P, {
                                          background: {
                                            alt: ``,
                                            fit: `stretch`,
                                            pixelHeight: 372,
                                            pixelWidth: 372,
                                            positionX: `center`,
                                            positionY: `center`,
                                            sizes: `93px`,
                                            src: `./assets/images/NmVSVg1aTrcYbgmRoP9eOE9gpw-05472977.png`,
                                          },
                                          className: `framer-1ml5i5u`,
                                          "data-framer-name": `Hearts`,
                                          id: ae,
                                          ref: oe,
                                        }),
                                      }),
                                      u(w, {
                                        __fromCanvasComponent: !0,
                                        children: u(n, {
                                          children: u(`p`, {
                                            style: {
                                              "--font-selector": `R0Y7Q29ybW9yYW50LXJlZ3VsYXI=`,
                                              "--framer-font-family": `"Cormorant", "Cormorant Placeholder", serif`,
                                              "--framer-font-size": `30px`,
                                              "--framer-letter-spacing": `0.19em`,
                                              "--framer-text-alignment": `center`,
                                              "--framer-text-color": `rgb(12, 72, 96)`,
                                            },
                                            children: `MEET THE`,
                                          }),
                                        }),
                                        className: `framer-walyxp`,
                                        "data-framer-name": `MEET THE`,
                                        fonts: [`GF;Cormorant-regular`],
                                        verticalAlignment: `top`,
                                        withExternalLayout: !0,
                                      }),
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          ydPqKqvDJ: {
                                            children: u(n, {
                                              children: u(`p`, {
                                                style: {
                                                  "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                                  "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                                  "--framer-font-size": `90px`,
                                                  "--framer-line-height": `80%`,
                                                  "--framer-text-alignment": `center`,
                                                  "--framer-text-color": `rgb(12, 72, 96)`,
                                                },
                                                children: `Bride & Groom`,
                                              }),
                                            }),
                                          },
                                        },
                                        children: u(w, {
                                          __fromCanvasComponent: !0,
                                          children: u(n, {
                                            children: u(`p`, {
                                              style: {
                                                "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                                "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                                "--framer-font-size": `120px`,
                                                "--framer-line-height": `80%`,
                                                "--framer-text-alignment": `center`,
                                                "--framer-text-color": `rgb(12, 72, 96)`,
                                              },
                                              children: `Bride & Groom`,
                                            }),
                                          }),
                                          className: `framer-w4fv6e`,
                                          "data-framer-name": `Bride & Groom`,
                                          fonts: [
                                            `GF;Cormorant Upright-regular`,
                                          ],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      }),
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          kBRqx33QC: {
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              7624 +
                                              0 +
                                              0 +
                                              0 +
                                              0 +
                                              868 +
                                              858,
                                          },
                                          ydPqKqvDJ: {
                                            height: 165,
                                            width: `calc(min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px) - 50px)`,
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              6699 +
                                              0 +
                                              0 +
                                              0 +
                                              924 +
                                              39 +
                                              738,
                                          },
                                        },
                                        children: u(L, {
                                          height: 135,
                                          width: `650px`,
                                          children: u(A, {
                                            className: `framer-1ial3d5-container`,
                                            isModuleExternal: !0,
                                            nodeId: `kcVEpqOQW`,
                                            rendersWithMotion: !0,
                                            scopeId: `bmdQ7AEa3`,
                                            children: u(j, {
                                              breakpoint: T,
                                              overrides: {
                                                ydPqKqvDJ: {
                                                  variant: Z(`h1X6IILMa`),
                                                },
                                              },
                                              children: u(Bn, {
                                                ElrcvIalk: `We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. The affection shown to us by so many people since our roka has been incredibly moving, and has touched us both deeply. We would like to take this opportunity to thank everyone most sincerely for their kindness. We are looking forward to see you at the wedding functions.`,
                                                height: `100%`,
                                                id: `kcVEpqOQW`,
                                                layoutId: `kcVEpqOQW`,
                                                style: {
                                                  height: `100%`,
                                                  width: `100%`,
                                                },
                                                variant: Z(`At3_yzDr0`),
                                                width: `100%`,
                                              }),
                                            }),
                                          }),
                                        }),
                                      }),
                                    ],
                                  }),
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        y:
                                          (g?.y || 0) +
                                          0 +
                                          200 +
                                          0 +
                                          0 +
                                          7624 +
                                          0 +
                                          0 +
                                          0 +
                                          1861,
                                      },
                                      ydPqKqvDJ: {
                                        height: 931,
                                        width: `931px`,
                                        y:
                                          (g?.y || 0) +
                                          0 +
                                          200 +
                                          0 +
                                          0 +
                                          6699 +
                                          0 +
                                          0 +
                                          0 +
                                          1905,
                                      },
                                    },
                                    children: u(L, {
                                      height: 897,
                                      width: `897px`,
                                      children: u(A, {
                                        className: `framer-q56cn-container`,
                                        "data-framer-name": `Wedding shoot`,
                                        isModuleExternal: !0,
                                        name: `Wedding shoot`,
                                        nodeId: `YlMgr_JtR`,
                                        rendersWithMotion: !0,
                                        scopeId: `bmdQ7AEa3`,
                                        children: u(j, {
                                          breakpoint: T,
                                          overrides: {
                                            ydPqKqvDJ: {
                                              variant: Z(`TTNOXUvuF`),
                                            },
                                          },
                                          children: u(Dn, {
                                            height: `100%`,
                                            id: `YlMgr_JtR`,
                                            layoutId: `YlMgr_JtR`,
                                            name: `Wedding shoot`,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                            variant: Z(`LVn1XTe0j`),
                                            width: `100%`,
                                          }),
                                        }),
                                      }),
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          }),
                          u(m.div, {
                            className: `framer-82chy7`,
                            "data-framer-name": `Section 4`,
                            children: u(j, {
                              breakpoint: T,
                              overrides: {
                                kBRqx33QC: {
                                  background: {
                                    alt: ``,
                                    fit: `fill`,
                                    loading: E(
                                      (g?.y || 0) +
                                        0 +
                                        200 +
                                        0 +
                                        0 +
                                        10482 +
                                        0 +
                                        0,
                                    ),
                                    pixelHeight: 1808,
                                    pixelWidth: 1349,
                                    sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                    src: `./assets/images/bsMApjuWNtSH6ZoQiKsathtFI-deb158d8.png`,
                                    srcSet: `./assets/images/bsMApjuWNtSH6ZoQiKsathtFI-b4cdc7f4.png 764w,./assets/images/bsMApjuWNtSH6ZoQiKsathtFI-deb158d8.png 1349w`,
                                  },
                                },
                                ydPqKqvDJ: {
                                  background: {
                                    alt: ``,
                                    fit: `fill`,
                                    loading: E(
                                      (g?.y || 0) +
                                        0 +
                                        200 +
                                        0 +
                                        0 +
                                        9241 +
                                        0 +
                                        0,
                                    ),
                                    pixelHeight: 9264,
                                    pixelWidth: 1605,
                                    sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                    src: `./assets/images/Ek4UmYDGiGa27intXXkAykog-8c86eed7.png`,
                                    srcSet: `./assets/images/Ek4UmYDGiGa27intXXkAykog-e3662283.png 709w,./assets/images/Ek4UmYDGiGa27intXXkAykog-8c86eed7.png 1605w`,
                                  },
                                },
                              },
                              children: l(P, {
                                background: {
                                  alt: ``,
                                  fit: `fill`,
                                  pixelHeight: 1808,
                                  pixelWidth: 1349,
                                  sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                  src: `./assets/images/bsMApjuWNtSH6ZoQiKsathtFI-deb158d8.png`,
                                  srcSet: `./assets/images/bsMApjuWNtSH6ZoQiKsathtFI-b4cdc7f4.png 764w,./assets/images/bsMApjuWNtSH6ZoQiKsathtFI-deb158d8.png 1349w`,
                                },
                                className: `framer-16l2pdg`,
                                "data-framer-name": `Content`,
                                children: [
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        y:
                                          (g?.y || 0) +
                                          0 +
                                          200 +
                                          0 +
                                          0 +
                                          10482 +
                                          0 +
                                          0 +
                                          50.7806,
                                      },
                                      ydPqKqvDJ: {
                                        height: 924,
                                        width: `924px`,
                                        y:
                                          (g?.y || 0) +
                                          0 +
                                          200 +
                                          0 +
                                          0 +
                                          9241 +
                                          0 +
                                          0 +
                                          0 +
                                          0,
                                      },
                                    },
                                    children: u(L, {
                                      height: 614,
                                      width: `614px`,
                                      children: u(A, {
                                        className: `framer-h9jnkx-container`,
                                        "data-framer-name": `CTA 2 - WhatsApp link`,
                                        id: se,
                                        isModuleExternal: !0,
                                        name: `CTA 2 - WhatsApp link`,
                                        nodeId: `RH0GMJ5ne`,
                                        ref: ce,
                                        rendersWithMotion: !0,
                                        scopeId: `bmdQ7AEa3`,
                                        children: u(j, {
                                          breakpoint: T,
                                          overrides: {
                                            ydPqKqvDJ: {
                                              variant: Z(`A8vBviT_L`),
                                            },
                                          },
                                          children: u($e, {
                                            height: `100%`,
                                            id: `RH0GMJ5ne`,
                                            layoutId: `RH0GMJ5ne`,
                                            name: `CTA 2 - WhatsApp link`,
                                            Sgtzk03RS: `https://wa.me/91XXXXXXXXXX`,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                            variant: Z(`mGwaLAHxf`),
                                            width: `100%`,
                                          }),
                                        }),
                                      }),
                                    }),
                                  }),
                                  l(m.div, {
                                    className: `framer-1mus9pp`,
                                    children: [
                                      l(m.div, {
                                        className: `framer-11s4ua7`,
                                        "data-framer-name": `Things to know - Title`,
                                        id: de,
                                        ref: fe,
                                        children: [
                                          u(j, {
                                            breakpoint: T,
                                            overrides: {
                                              kBRqx33QC: {
                                                background: {
                                                  alt: ``,
                                                  fit: `fill`,
                                                  intrinsicHeight: 190,
                                                  intrinsicWidth: 190,
                                                  pixelHeight: 380,
                                                  pixelWidth: 380,
                                                  sizes: `57px`,
                                                  src: `./assets/images/BS00HRHT5NWobvzo4WjW9UA763g-6618b949.png`,
                                                },
                                              },
                                              ydPqKqvDJ: {
                                                background: {
                                                  alt: ``,
                                                  fit: `fill`,
                                                  intrinsicHeight: 190,
                                                  intrinsicWidth: 190,
                                                  loading: E(
                                                    (g?.y || 0) +
                                                      0 +
                                                      200 +
                                                      0 +
                                                      0 +
                                                      9241 +
                                                      0 +
                                                      0 +
                                                      0 +
                                                      984 +
                                                      0 +
                                                      0 +
                                                      0 +
                                                      0,
                                                  ),
                                                  pixelHeight: 380,
                                                  pixelWidth: 380,
                                                  sizes: `82px`,
                                                  src: `./assets/images/BS00HRHT5NWobvzo4WjW9UA763g-6618b949.png`,
                                                },
                                              },
                                            },
                                            children: u(P, {
                                              background: {
                                                alt: ``,
                                                fit: `fill`,
                                                intrinsicHeight: 190,
                                                intrinsicWidth: 190,
                                                pixelHeight: 380,
                                                pixelWidth: 380,
                                                sizes: `98px`,
                                                src: `./assets/images/BS00HRHT5NWobvzo4WjW9UA763g-6618b949.png`,
                                              },
                                              className: `framer-p74rlv`,
                                              "data-framer-name": `?`,
                                            }),
                                          }),
                                          u(j, {
                                            breakpoint: T,
                                            overrides: {
                                              kBRqx33QC: {
                                                children: u(n, {
                                                  children: u(`p`, {
                                                    style: {
                                                      "--font-selector": `R0Y7Q29ybW9yYW50IEluZmFudC1yZWd1bGFy`,
                                                      "--framer-font-family": `"Cormorant Infant", "Cormorant Infant Placeholder", serif`,
                                                      "--framer-font-size": `80px`,
                                                      "--framer-line-height": `110%`,
                                                      "--framer-text-alignment": `center`,
                                                      "--framer-text-color": `rgb(246, 225, 187)`,
                                                    },
                                                    children: `Things to know`,
                                                  }),
                                                }),
                                              },
                                              ydPqKqvDJ: {
                                                children: u(n, {
                                                  children: u(`p`, {
                                                    style: {
                                                      "--font-selector": `R0Y7Q29ybW9yYW50IEluZmFudC1yZWd1bGFy`,
                                                      "--framer-font-family": `"Cormorant Infant", "Cormorant Infant Placeholder", serif`,
                                                      "--framer-font-size": `60px`,
                                                      "--framer-line-height": `110%`,
                                                      "--framer-text-alignment": `center`,
                                                      "--framer-text-color": `rgb(246, 225, 187)`,
                                                    },
                                                    children: `Things to know`,
                                                  }),
                                                }),
                                              },
                                            },
                                            children: u(w, {
                                              __fromCanvasComponent: !0,
                                              children: u(n, {
                                                children: u(`p`, {
                                                  style: {
                                                    "--font-selector": `R0Y7Q29ybW9yYW50IEluZmFudC1yZWd1bGFy`,
                                                    "--framer-font-family": `"Cormorant Infant", "Cormorant Infant Placeholder", serif`,
                                                    "--framer-font-size": `100px`,
                                                    "--framer-line-height": `110%`,
                                                    "--framer-text-alignment": `center`,
                                                    "--framer-text-color": `rgb(246, 225, 187)`,
                                                  },
                                                  children: `Things to know`,
                                                }),
                                              }),
                                              className: `framer-1f66h6j`,
                                              "data-framer-name": `Thing to know`,
                                              fonts: [
                                                `GF;Cormorant Infant-regular`,
                                              ],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                          }),
                                          u(j, {
                                            breakpoint: T,
                                            overrides: {
                                              ydPqKqvDJ: {
                                                children: u(n, {
                                                  children: u(`p`, {
                                                    style: {
                                                      "--font-selector": `R0Y7Q29ybW9yYW50IEluZmFudC1yZWd1bGFy`,
                                                      "--framer-font-family": `"Cormorant Infant", "Cormorant Infant Placeholder", serif`,
                                                      "--framer-font-size": `20px`,
                                                      "--framer-line-height": `110%`,
                                                      "--framer-text-alignment": `center`,
                                                      "--framer-text-color": `rgb(246, 225, 187)`,
                                                    },
                                                    children: `To help you feel at ease and enjoy every moment of the celebrations, we’ve gathered a few thoughtful details we’d love for you to know before the big day.`,
                                                  }),
                                                }),
                                              },
                                            },
                                            children: u(w, {
                                              __fromCanvasComponent: !0,
                                              children: u(n, {
                                                children: u(`p`, {
                                                  style: {
                                                    "--font-selector": `R0Y7Q29ybW9yYW50IEluZmFudC1yZWd1bGFy`,
                                                    "--framer-font-family": `"Cormorant Infant", "Cormorant Infant Placeholder", serif`,
                                                    "--framer-font-size": `30px`,
                                                    "--framer-line-height": `110%`,
                                                    "--framer-text-alignment": `center`,
                                                    "--framer-text-color": `rgb(246, 225, 187)`,
                                                  },
                                                  children: `To help you feel at ease and enjoy every moment of the celebrations, we’ve gathered a few thoughtful details we’d love for you to know before the big day.`,
                                                }),
                                              }),
                                              className: `framer-ejawci`,
                                              "data-framer-name": `Message`,
                                              fonts: [
                                                `GF;Cormorant Infant-regular`,
                                              ],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                          }),
                                        ],
                                      }),
                                      l(m.div, {
                                        className: `framer-d4pr6f`,
                                        "data-framer-name": `Information`,
                                        children: [
                                          u(j, {
                                            breakpoint: T,
                                            overrides: {
                                              ydPqKqvDJ: {
                                                y:
                                                  (g?.y || 0) +
                                                  0 +
                                                  200 +
                                                  0 +
                                                  0 +
                                                  9241 +
                                                  0 +
                                                  0 +
                                                  0 +
                                                  984 +
                                                  0 +
                                                  386 +
                                                  80 +
                                                  0,
                                              },
                                            },
                                            children: u(L, {
                                              height: 140.5,
                                              width: `233px`,
                                              children: u(A, {
                                                className: `framer-1nj4rec-container`,
                                                isModuleExternal: !0,
                                                nodeId: `BtH_RC0q9`,
                                                rendersWithMotion: !0,
                                                scopeId: `bmdQ7AEa3`,
                                                children: u(j, {
                                                  breakpoint: T,
                                                  overrides: {
                                                    ydPqKqvDJ: {
                                                      variant: Z(`XA4eR62mg`),
                                                    },
                                                  },
                                                  children: u(J, {
                                                    height: `100%`,
                                                    id: `BtH_RC0q9`,
                                                    layoutId: `BtH_RC0q9`,
                                                    PrrSJxMUh: `While posting photos on social media please use the hashtag - #BadriKiDulhania`,
                                                    PVzPSjchM: `Hashtag`,
                                                    style: {
                                                      height: `100%`,
                                                      width: `100%`,
                                                    },
                                                    variant: Z(`kPIhmdw4I`),
                                                    width: `100%`,
                                                  }),
                                                }),
                                              }),
                                            }),
                                          }),
                                          u(j, {
                                            breakpoint: T,
                                            overrides: {
                                              ydPqKqvDJ: {
                                                y:
                                                  (g?.y || 0) +
                                                  0 +
                                                  200 +
                                                  0 +
                                                  0 +
                                                  9241 +
                                                  0 +
                                                  0 +
                                                  0 +
                                                  984 +
                                                  0 +
                                                  386 +
                                                  80 +
                                                  299.5,
                                              },
                                            },
                                            children: u(L, {
                                              height: 140.5,
                                              width: `233px`,
                                              children: u(A, {
                                                className: `framer-1xff4wo-container`,
                                                isModuleExternal: !0,
                                                nodeId: `oz6Zs5SvE`,
                                                rendersWithMotion: !0,
                                                scopeId: `bmdQ7AEa3`,
                                                children: u(j, {
                                                  breakpoint: T,
                                                  overrides: {
                                                    ydPqKqvDJ: {
                                                      variant: Z(`XA4eR62mg`),
                                                    },
                                                  },
                                                  children: u(J, {
                                                    height: `100%`,
                                                    id: `oz6Zs5SvE`,
                                                    layoutId: `oz6Zs5SvE`,
                                                    PrrSJxMUh: `It will be mostly cloudy with temperature reaching up to 22 degrees at the venue`,
                                                    PVzPSjchM: `Weather`,
                                                    RXLhSfcG1: $(
                                                      {
                                                        pixelHeight: 343,
                                                        pixelWidth: 343,
                                                        src: `./assets/images/LAJ3Nftw1I9tvsShsVZHFUHMx0-93231674.png`,
                                                      },
                                                      ``,
                                                    ),
                                                    style: {
                                                      height: `100%`,
                                                      width: `100%`,
                                                    },
                                                    variant: Z(`kPIhmdw4I`),
                                                    width: `100%`,
                                                  }),
                                                }),
                                              }),
                                            }),
                                          }),
                                          u(j, {
                                            breakpoint: T,
                                            overrides: {
                                              ydPqKqvDJ: {
                                                y:
                                                  (g?.y || 0) +
                                                  0 +
                                                  200 +
                                                  0 +
                                                  0 +
                                                  9241 +
                                                  0 +
                                                  0 +
                                                  0 +
                                                  984 +
                                                  0 +
                                                  386 +
                                                  80 +
                                                  599,
                                              },
                                            },
                                            children: u(L, {
                                              height: 140.5,
                                              width: `233px`,
                                              children: u(A, {
                                                className: `framer-1kxq51h-container`,
                                                isModuleExternal: !0,
                                                nodeId: `k9DcaKhZZ`,
                                                rendersWithMotion: !0,
                                                scopeId: `bmdQ7AEa3`,
                                                children: u(j, {
                                                  breakpoint: T,
                                                  overrides: {
                                                    ydPqKqvDJ: {
                                                      variant: Z(`XA4eR62mg`),
                                                    },
                                                  },
                                                  children: u(J, {
                                                    height: `100%`,
                                                    id: `k9DcaKhZZ`,
                                                    layoutId: `k9DcaKhZZ`,
                                                    PrrSJxMUh: `We recommend the nearby lodge called Amba Valley near the venue for the staff members`,
                                                    PVzPSjchM: `Staff`,
                                                    RXLhSfcG1: $(
                                                      {
                                                        pixelHeight: 334,
                                                        pixelWidth: 334,
                                                        src: `./assets/images/OWWpRVBrRQT2vkpfH6ZbEHaSso-d4f226c6.png`,
                                                      },
                                                      ``,
                                                    ),
                                                    style: {
                                                      height: `100%`,
                                                      width: `100%`,
                                                    },
                                                    variant: Z(`kPIhmdw4I`),
                                                    width: `100%`,
                                                  }),
                                                }),
                                              }),
                                            }),
                                          }),
                                          u(j, {
                                            breakpoint: T,
                                            overrides: {
                                              ydPqKqvDJ: {
                                                y:
                                                  (g?.y || 0) +
                                                  0 +
                                                  200 +
                                                  0 +
                                                  0 +
                                                  9241 +
                                                  0 +
                                                  0 +
                                                  0 +
                                                  984 +
                                                  0 +
                                                  386 +
                                                  80 +
                                                  898.5,
                                              },
                                            },
                                            children: u(L, {
                                              height: 140.5,
                                              width: `233px`,
                                              children: u(A, {
                                                className: `framer-u4x4j1-container`,
                                                isModuleExternal: !0,
                                                nodeId: `plx1SE9Lr`,
                                                rendersWithMotion: !0,
                                                scopeId: `bmdQ7AEa3`,
                                                children: u(j, {
                                                  breakpoint: T,
                                                  overrides: {
                                                    ydPqKqvDJ: {
                                                      variant: Z(`XA4eR62mg`),
                                                    },
                                                  },
                                                  children: u(J, {
                                                    height: `100%`,
                                                    id: `plx1SE9Lr`,
                                                    layoutId: `plx1SE9Lr`,
                                                    PrrSJxMUh: `Valet parking for all our guests will be available at the venue`,
                                                    PVzPSjchM: `Parking`,
                                                    RXLhSfcG1: $(
                                                      {
                                                        pixelHeight: 317,
                                                        pixelWidth: 317,
                                                        src: `./assets/images/blObjK2qRN76PYOc8kI9PKAl2e8-032bb19f.png`,
                                                      },
                                                      ``,
                                                    ),
                                                    style: {
                                                      height: `100%`,
                                                      width: `100%`,
                                                    },
                                                    variant: Z(`kPIhmdw4I`),
                                                    width: `100%`,
                                                  }),
                                                }),
                                              }),
                                            }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                          }),
                          u(m.div, {
                            className: `framer-105zzlt`,
                            "data-framer-name": `Footer`,
                            children: u(j, {
                              breakpoint: T,
                              overrides: {
                                kBRqx33QC: {
                                  background: {
                                    alt: ``,
                                    fit: `fill`,
                                    loading: E(
                                      (g?.y || 0) +
                                        0 +
                                        200 +
                                        0 +
                                        0 +
                                        12212 +
                                        0 +
                                        0,
                                    ),
                                    pixelHeight: 1808,
                                    pixelWidth: 1349,
                                    sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                    src: `./assets/images/uHJCRyTJO5bFnINnfmo5GFo0sQ-dc5acd3d.png`,
                                    srcSet: `./assets/images/uHJCRyTJO5bFnINnfmo5GFo0sQ-2c6c65ab.png 764w,./assets/images/uHJCRyTJO5bFnINnfmo5GFo0sQ-dc5acd3d.png 1349w`,
                                  },
                                },
                                ydPqKqvDJ: {
                                  background: {
                                    alt: ``,
                                    fit: `fill`,
                                    loading: E(
                                      (g?.y || 0) +
                                        0 +
                                        200 +
                                        0 +
                                        0 +
                                        11969 +
                                        0 +
                                        0,
                                    ),
                                    pixelHeight: 1808,
                                    pixelWidth: 1349,
                                    sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                    src: `./assets/images/uHJCRyTJO5bFnINnfmo5GFo0sQ-dc5acd3d.png`,
                                    srcSet: `./assets/images/uHJCRyTJO5bFnINnfmo5GFo0sQ-2c6c65ab.png 764w,./assets/images/uHJCRyTJO5bFnINnfmo5GFo0sQ-dc5acd3d.png 1349w`,
                                  },
                                },
                              },
                              children: l(P, {
                                background: {
                                  alt: ``,
                                  fit: `fill`,
                                  pixelHeight: 1808,
                                  pixelWidth: 1349,
                                  sizes: `min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px)`,
                                  src: `./assets/images/uHJCRyTJO5bFnINnfmo5GFo0sQ-dc5acd3d.png`,
                                  srcSet: `./assets/images/uHJCRyTJO5bFnINnfmo5GFo0sQ-2c6c65ab.png 764w,./assets/images/uHJCRyTJO5bFnINnfmo5GFo0sQ-dc5acd3d.png 1349w`,
                                },
                                className: `framer-ycacil`,
                                "data-framer-name": `Content`,
                                children: [
                                  u(j, {
                                    breakpoint: T,
                                    overrides: {
                                      kBRqx33QC: {
                                        y:
                                          (g?.y || 0) +
                                          0 +
                                          200 +
                                          0 +
                                          0 +
                                          12212 +
                                          0 +
                                          0 +
                                          0,
                                      },
                                      ydPqKqvDJ: {
                                        height: 924,
                                        width: `calc(min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px) + 534px)`,
                                        y:
                                          (g?.y || 0) +
                                          0 +
                                          200 +
                                          0 +
                                          0 +
                                          11969 +
                                          0 +
                                          0 +
                                          -177,
                                      },
                                    },
                                    children: u(L, {
                                      height: 614,
                                      width: `614px`,
                                      children: u(A, {
                                        className: `framer-1l046i8-container`,
                                        "data-framer-name": `CTA 3 - Instagram`,
                                        id: pe,
                                        isModuleExternal: !0,
                                        name: `CTA 3 - Instagram`,
                                        nodeId: `ch3fiKOLX`,
                                        ref: me,
                                        rendersWithMotion: !0,
                                        scopeId: `bmdQ7AEa3`,
                                        children: u(j, {
                                          breakpoint: T,
                                          overrides: {
                                            ydPqKqvDJ: {
                                              variant: Z(`VVJ9I4j1o`),
                                            },
                                          },
                                          children: u(pn, {
                                            hah7YEktd: `dvites.com`,
                                            height: `100%`,
                                            id: `ch3fiKOLX`,
                                            layoutId: `ch3fiKOLX`,
                                            name: `CTA 3 - Instagram`,
                                            style: {
                                              height: `100%`,
                                              width: `100%`,
                                            },
                                            variant: Z(`UeIsfCmuY`),
                                            width: `100%`,
                                          }),
                                        }),
                                      }),
                                    }),
                                  }),
                                  l(m.div, {
                                    className: `framer-14m6es5`,
                                    children: [
                                      l(m.div, {
                                        className: `framer-f5ej2j`,
                                        children: [
                                          u(j, {
                                            breakpoint: T,
                                            overrides: {
                                              ydPqKqvDJ: {
                                                children: u(n, {
                                                  children: u(`p`, {
                                                    style: {
                                                      "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                                      "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                                      "--framer-font-size": `53px`,
                                                      "--framer-line-height": `100.1%`,
                                                      "--framer-text-alignment": `center`,
                                                      "--framer-text-color": `rgb(68, 19, 155)`,
                                                    },
                                                    children: `The countdown begins`,
                                                  }),
                                                }),
                                              },
                                            },
                                            children: u(w, {
                                              __fromCanvasComponent: !0,
                                              children: u(n, {
                                                children: u(`p`, {
                                                  style: {
                                                    "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                                    "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                                    "--framer-font-size": `40px`,
                                                    "--framer-line-height": `100.1%`,
                                                    "--framer-text-alignment": `center`,
                                                    "--framer-text-color": `rgb(68, 19, 155)`,
                                                  },
                                                  children: `The countdown begins`,
                                                }),
                                              }),
                                              className: `framer-1b8mzo3`,
                                              "data-framer-name": `Title`,
                                              fonts: [
                                                `GF;Cormorant Upright-regular`,
                                              ],
                                              verticalAlignment: `top`,
                                              withExternalLayout: !0,
                                            }),
                                          }),
                                          u(L, {
                                            children: u(A, {
                                              className: `framer-lpl8ib-container`,
                                              isAuthoredByUser: !0,
                                              isModuleExternal: !0,
                                              nodeId: `hkbHyWFYq`,
                                              rendersWithMotion: !0,
                                              scopeId: `bmdQ7AEa3`,
                                              children: u(j, {
                                                breakpoint: T,
                                                overrides: {
                                                  ydPqKqvDJ: {
                                                    labelColor: `rgb(68, 17, 123)`,
                                                  },
                                                },
                                                children: u(ue, {
                                                  color: `rgb(68, 19, 155)`,
                                                  date: `2026-03-10T00:00:00.000Z`,
                                                  displayProps: {
                                                    dayLabel: `D`,
                                                    digitCount: !1,
                                                    hourLabel: `H`,
                                                    labelSpace: !0,
                                                    labelType: !1,
                                                    minuteLabel: `M`,
                                                    numberSpace: !1,
                                                    secondLabel: `S`,
                                                    showHours: !0,
                                                    showMinutes: !0,
                                                    showSeconds: !1,
                                                    tabularFont: !0,
                                                  },
                                                  font: {
                                                    fontFamily: `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                                    fontSize: `34px`,
                                                    fontStyle: `normal`,
                                                    fontWeight: 500,
                                                    letterSpacing: `0em`,
                                                    lineHeight: `1em`,
                                                  },
                                                  height: `100%`,
                                                  id: `hkbHyWFYq`,
                                                  labelColor: `rgb(68, 19, 155)`,
                                                  layoutId: `hkbHyWFYq`,
                                                  pickTime: 0,
                                                  width: `100%`,
                                                }),
                                              }),
                                            }),
                                          }),
                                        ],
                                      }),
                                      u(j, {
                                        breakpoint: T,
                                        overrides: {
                                          kBRqx33QC: {
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              12212 +
                                              0 +
                                              0 +
                                              300 +
                                              0 +
                                              550 +
                                              -13.3,
                                          },
                                          ydPqKqvDJ: {
                                            width: `calc(min(max(min(${g?.width || `100vw`}, 1500px), 1px), 1500px) - 40px)`,
                                            y:
                                              (g?.y || 0) +
                                              0 +
                                              200 +
                                              0 +
                                              0 +
                                              11969 +
                                              0 +
                                              0 +
                                              300 +
                                              0 +
                                              480 +
                                              676.7325,
                                          },
                                        },
                                        children: u(L, {
                                          height: 34,
                                          width: `418px`,
                                          children: u(A, {
                                            className: `framer-1k1j90h-container`,
                                            isModuleExternal: !0,
                                            nodeId: `VcnBhXK2w`,
                                            rendersWithMotion: !0,
                                            scopeId: `bmdQ7AEa3`,
                                            children: u(j, {
                                              breakpoint: T,
                                              overrides: {
                                                ydPqKqvDJ: {
                                                  variant: Z(`ZgTVo_Rem`),
                                                },
                                              },
                                              children: u(fr, {
                                                EHFKzhqxg: `Mittal family is excited that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. `,
                                                height: `100%`,
                                                id: `VcnBhXK2w`,
                                                layoutId: `VcnBhXK2w`,
                                                style: {
                                                  height: `100%`,
                                                  width: `100%`,
                                                },
                                                variant: Z(`IylPxKka_`),
                                                width: `100%`,
                                              }),
                                            }),
                                          }),
                                        }),
                                      }),
                                      u(m.div, {
                                        className: `framer-wjiunu`,
                                        children: u(w, {
                                          __fromCanvasComponent: !0,
                                          children: u(n, {
                                            children: u(`p`, {
                                              style: {
                                                "--font-selector": `R0Y7Q29ybW9yYW50IFVwcmlnaHQtcmVndWxhcg==`,
                                                "--framer-font-family": `"Cormorant Upright", "Cormorant Upright Placeholder", serif`,
                                                "--framer-font-size": `14px`,
                                                "--framer-text-alignment": `center`,
                                                "--framer-text-color": `rgb(68, 19, 155)`,
                                              },
                                              children: `© Dvites 2026`,
                                            }),
                                          }),
                                          className: `framer-1bs5w4p`,
                                          "data-framer-name": `Copyright`,
                                          fonts: [
                                            `GF;Cormorant Upright-regular`,
                                          ],
                                          verticalAlignment: `top`,
                                          withExternalLayout: !0,
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                u(`div`, { id: `overlay` }),
              ],
            }),
          })
        );
      }),
      [
        `@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }`,
        `.framer-iSlkH.framer-1gcdfgk, .framer-iSlkH .framer-1gcdfgk { display: block; }`,
        `.framer-iSlkH.framer-3nf04q { align-content: center; align-items: center; background: #ffffff; background-color: #ffffff; display: flex; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: flex-start; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 1200px; }`,
        `.framer-iSlkH .framer-1waoh23-container, .framer-iSlkH .framer-1mb953l-container, .framer-iSlkH .framer-68xp2y-container, .framer-iSlkH .framer-1l21y3k-container, .framer-iSlkH .framer-1dbc3nq-container, .framer-iSlkH .framer-1mud1wr-container, .framer-iSlkH .framer-tnr6m4-container, .framer-iSlkH .framer-lpl8ib-container { flex: none; height: auto; position: relative; width: auto; }`,
        `.framer-iSlkH .framer-t10cp0 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; max-width: 1500px; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 100%; }`,
        `.framer-iSlkH .framer-g116mj { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: flex-start; max-width: 1500px; overflow: visible; padding: 0px; position: relative; width: 1px; }`,
        `.framer-iSlkH .framer-10izldj { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: 1px; justify-content: center; min-width: 1px; overflow: visible; padding: 0px; position: sticky; top: 10px; width: min-content; z-index: 10; }`,
        `.framer-iSlkH .framer-exthyr-container { flex: none; height: 29px; position: absolute; right: -530px; top: 100px; width: 1px; z-index: 10; }`,
        `.framer-iSlkH .framer-bo7x1i, .framer-iSlkH .framer-qlfn9l { align-content: center; align-items: center; bottom: 0px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: 1px; justify-content: center; overflow: visible; padding: 0px; position: sticky; top: 130px; width: 100%; z-index: 10; }`,
        `.framer-iSlkH .framer-1rzxnh9-container { flex: none; height: 73px; left: calc(80.16666666666669% - 327px / 2); opacity: 0.37; position: absolute; top: calc(35500% - 73px / 2); width: 327px; z-index: 3; }`,
        `.framer-iSlkH .framer-hmg421 { align-content: center; align-items: center; bottom: 0px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 1px; justify-content: center; overflow: visible; padding: 0px; position: sticky; top: 10px; width: 100%; z-index: 10; }`,
        `.framer-iSlkH .framer-1rxclm9-container { flex: none; height: 77px; left: calc(50.00000000000002% - 343px / 2); opacity: 0.37; position: absolute; top: calc(69800% - 77px / 2); width: 343px; z-index: 3; }`,
        `.framer-iSlkH .framer-fz1joa { aspect-ratio: 0.4612676056338028 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 850px); left: 0px; overflow: visible; pointer-events: none; position: absolute; right: -2px; top: 0px; z-index: 9; }`,
        `.framer-iSlkH .framer-bgum6g-container { flex: none; height: 73px; left: calc(22.91666666666669% - 327px / 2); opacity: 0.37; position: absolute; top: calc(35400% - 73px / 2); width: 327px; z-index: 3; }`,
        `.framer-iSlkH .framer-w0l22n { align-content: center; align-items: center; bottom: 0px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: 1px; justify-content: center; overflow: visible; padding: 0px; position: sticky; top: 100px; width: 100%; z-index: 10; }`,
        `.framer-iSlkH .framer-skkinu-container { flex: none; height: 73px; left: calc(50.00000000000002% - 327px / 2); opacity: 0.37; position: absolute; top: calc(14400% - 73px / 2); width: 327px; z-index: 3; }`,
        `.framer-iSlkH .framer-1on0r0q { align-content: center; align-items: center; bottom: 0px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: 1px; justify-content: center; overflow: visible; padding: 0px; position: sticky; top: 150px; width: 100%; z-index: 10; }`,
        `.framer-iSlkH .framer-1dnm4no-container { flex: none; height: 73px; left: calc(50.00000000000002% - 327px / 2); opacity: 0.37; position: absolute; top: calc(55600% - 73px / 2); width: 327px; z-index: 3; }`,
        `.framer-iSlkH .framer-13h1j0t { align-content: center; align-items: center; bottom: 10px; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 1px; justify-content: center; overflow: visible; padding: 0px; position: sticky; top: 0px; width: 100%; z-index: 10; }`,
        `.framer-iSlkH .framer-1a9ufat-container { flex: none; height: 48px; position: absolute; right: 40px; top: 27px; width: auto; z-index: 3; }`,
        `.framer-iSlkH .framer-139e2on, .framer-iSlkH .framer-msu6hn, .framer-iSlkH .framer-82chy7, .framer-iSlkH .framer-105zzlt { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-iSlkH .framer-eyztyl { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: flex-start; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 100%; }`,
        `.framer-iSlkH .framer-i0c579 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: 700px; justify-content: flex-start; overflow: visible; padding: 10px 0px 0px 0px; position: relative; width: 100%; z-index: 2; }`,
        `.framer-iSlkH .framer-rmb2bn-container, .framer-iSlkH .framer-96zptf-container, .framer-iSlkH .framer-1wz8q9m-container, .framer-iSlkH .framer-180sx8m-container { flex: none; height: auto; position: relative; width: 100%; }`,
        `.framer-iSlkH .framer-1pqt39g { flex: none; height: 803px; overflow: visible; position: relative; width: 100%; z-index: 1; }`,
        `.framer-iSlkH .framer-wpigon { aspect-ratio: 1.3248031496062993 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 682px); left: 149px; overflow: visible; position: absolute; top: 1043px; width: 904px; z-index: 2; }`,
        `.framer-iSlkH .framer-1jyzb6c { flex: none; height: 832px; left: 37px; position: absolute; top: 593px; width: 786px; z-index: 1; }`,
        `.framer-iSlkH .framer-1ccl2wx { aspect-ratio: 0.9535864978902954 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 380px); overflow: visible; position: absolute; right: 102px; top: 1450px; width: 362px; z-index: 1; }`,
        `.framer-iSlkH .framer-15u9y2l { flex: none; height: 1282px; overflow: visible; position: relative; width: 117%; z-index: 0; }`,
        `.framer-iSlkH .framer-1k80ww9 { flex: none; height: 300px; overflow: visible; pointer-events: none; position: relative; width: 117%; z-index: -1; }`,
        `.framer-iSlkH .framer-ugi89b { aspect-ratio: 1.0538888888888889 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 1329px); left: -99px; overflow: visible; position: absolute; right: -101px; top: 1580px; z-index: 1; }`,
        `.framer-iSlkH .framer-b2lg7r { aspect-ratio: 0.6892116182572614 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 2396px); left: -888px; overflow: visible; position: absolute; top: 519px; width: 1651px; z-index: 1; }`,
        `.framer-iSlkH .framer-9hg1xy { aspect-ratio: 0.679520697167756 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 2297px); overflow: visible; position: absolute; right: -822px; top: 473px; width: 1561px; z-index: 1; }`,
        `.framer-iSlkH .framer-1f80wvp { aspect-ratio: 1.261127596439169 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 646px); left: 50%; min-width: 425px; overflow: visible; position: absolute; top: 383px; transform: translateX(-50%); width: 815px; will-change: var(--framer-will-change-effect-override, transform); z-index: 1; }`,
        `.framer-iSlkH .framer-1637jij { aspect-ratio: 1.261127596439169 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 574px); min-width: 425px; overflow: visible; position: absolute; right: -16px; top: 350px; width: 724px; will-change: var(--framer-will-change-effect-override, transform); z-index: 1; }`,
        `.framer-iSlkH .framer-hhczno { aspect-ratio: 1.261127596439169 / 1; flex: none; gap: 10px; height: var(--framer-aspect-ratio-supported, 574px); left: 12px; min-width: 425px; overflow: visible; position: absolute; top: 350px; width: 724px; will-change: var(--framer-will-change-effect-override, transform); z-index: 1; }`,
        `.framer-iSlkH .framer-10ov673 { aspect-ratio: 0.05063291139240506 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 2568px); overflow: visible; position: absolute; right: 0px; top: 218px; width: 130px; z-index: 1; }`,
        `.framer-iSlkH .framer-34w19m { aspect-ratio: 1.1068601583113455 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 744px); overflow: visible; position: absolute; right: -306px; top: 286px; width: 823px; will-change: var(--framer-will-change-effect-override, transform); z-index: 1; }`,
        `.framer-iSlkH .framer-zs4ph6 { aspect-ratio: 0.05026061057334326 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 2587px); left: 0px; overflow: visible; position: absolute; top: 183px; width: 130px; z-index: 1; }`,
        `.framer-iSlkH .framer-1bxw18n { aspect-ratio: 0.8237410071942446 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 438px); left: -60px; overflow: visible; position: absolute; top: 2366px; width: 361px; z-index: 1; }`,
        `.framer-iSlkH .framer-qv860g { aspect-ratio: 1.1068601583113455 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 744px); left: -312px; overflow: visible; position: absolute; top: 286px; width: 823px; will-change: var(--framer-will-change-effect-override, transform); z-index: 1; }`,
        `.framer-iSlkH .framer-1a5z692 { aspect-ratio: 0.8841698841698842 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 409px); overflow: visible; position: absolute; right: -60px; top: 2377px; width: 361px; z-index: 1; }`,
        `.framer-iSlkH .framer-tb9nk2 { aspect-ratio: 13.911764705882353 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 148px); left: -429px; overflow: visible; position: absolute; right: -430px; top: 2638px; z-index: 2; }`,
        `.framer-iSlkH .framer-mxb0af { flex: none; height: 390px; left: -20px; overflow: visible; position: absolute; top: 2413px; width: 287px; z-index: 2; }`,
        `.framer-iSlkH .framer-n94lqy { flex: none; height: 390px; overflow: visible; position: absolute; right: -25px; top: 2413px; width: 287px; z-index: 2; }`,
        `.framer-iSlkH .framer-16cctct { aspect-ratio: 0.8970588235294118 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 240px); left: 50%; overflow: visible; position: absolute; top: 2570px; transform: translateX(-50%); width: 215px; z-index: 2; }`,
        `.framer-iSlkH .framer-vp0bm4 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: flex-start; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 100%; z-index: 1; }`,
        `.framer-iSlkH .framer-9412jb { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px 0px 363px 0px; position: relative; width: 100%; z-index: 0; }`,
        `.framer-iSlkH .framer-1qycoz3 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 101px 0px 100px 0px; position: relative; width: 100%; z-index: 1; }`,
        `.framer-iSlkH .framer-1mrjyuk-container { flex: none; height: auto; position: relative; width: 124px; }`,
        `.framer-iSlkH .framer-1qehb46 { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 166px); position: relative; width: 166px; }`,
        `.framer-iSlkH .framer-emeao1 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 100%; }`,
        `.framer-iSlkH .framer-117qzko { --framer-paragraph-spacing: 0px; flex: none; height: 116px; position: relative; white-space: pre; width: auto; }`,
        `.framer-iSlkH .framer-1xsdkt9 { --framer-paragraph-spacing: 0px; flex: none; height: auto; position: relative; white-space: pre-wrap; width: 445px; word-break: break-word; word-wrap: break-word; }`,
        `.framer-iSlkH .framer-1qi7tcr { aspect-ratio: 0.9535864978902954 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 554px); left: -170px; overflow: visible; position: absolute; top: 349px; width: 528px; z-index: 1; }`,
        `.framer-iSlkH .framer-1noxxhl { flex: none; height: 730px; position: absolute; right: -269px; top: -24px; width: 690px; z-index: 1; }`,
        `.framer-iSlkH .framer-1mbm3vh { aspect-ratio: 1.3248031496062993 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 409px); overflow: visible; position: absolute; right: -190px; top: 593px; width: 542px; z-index: 2; }`,
        `.framer-iSlkH .framer-1qb2nt1 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: wrap; gap: 60px 10px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 100%; }`,
        `.framer-iSlkH .framer-ymki7g { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: flex-start; overflow: visible; padding: 0px 0px 100px 0px; position: relative; width: 100%; }`,
        `.framer-iSlkH .framer-1u5i8a9-container { flex: none; height: 614px; left: calc(50.00000000000002% - 614px / 2); position: absolute; top: calc(17.070409780393955% - 614px / 2); width: 614px; z-index: 1; }`,
        `.framer-iSlkH .framer-ocgc8g { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 35px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 751px 0px 0px 0px; position: relative; width: 100%; }`,
        `.framer-iSlkH .framer-1ml5i5u { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 93px); position: relative; width: 93px; }`,
        `.framer-iSlkH .framer-walyxp, .framer-iSlkH .framer-w4fv6e { --framer-paragraph-spacing: 0px; flex: none; height: auto; position: relative; white-space: pre-wrap; width: 479px; word-break: break-word; word-wrap: break-word; }`,
        `.framer-iSlkH .framer-1ial3d5-container { flex: none; height: 135px; position: relative; width: 650px; }`,
        `.framer-iSlkH .framer-q56cn-container { flex: none; height: 897px; position: relative; width: 897px; }`,
        `.framer-iSlkH .framer-16l2pdg { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: 1730px; justify-content: flex-start; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-iSlkH .framer-h9jnkx-container { flex: none; height: 614px; left: calc(50.00000000000002% - 614px / 2); position: absolute; top: calc(20.63583815028904% - 614px / 2); width: 614px; z-index: 1; }`,
        `.framer-iSlkH .framer-1mus9pp { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 900px 0px 0px 0px; position: relative; width: 100%; }`,
        `.framer-iSlkH .framer-11s4ua7 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 14px; height: 368px; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-iSlkH .framer-p74rlv { aspect-ratio: 1 / 1; flex: none; height: var(--framer-aspect-ratio-supported, 98px); overflow: visible; position: relative; width: 98px; }`,
        `.framer-iSlkH .framer-1f66h6j { --framer-paragraph-spacing: 0px; flex: none; height: 224px; max-width: 40%; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }`,
        `.framer-iSlkH .framer-ejawci { --framer-paragraph-spacing: 0px; flex: none; height: 224px; max-width: 59%; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }`,
        `.framer-iSlkH .framer-d4pr6f { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 32px 0px 32px 0px; position: relative; width: 100%; }`,
        `.framer-iSlkH .framer-1nj4rec-container, .framer-iSlkH .framer-1xff4wo-container, .framer-iSlkH .framer-1kxq51h-container, .framer-iSlkH .framer-u4x4j1-container { flex: none; height: 141px; position: relative; width: 233px; }`,
        `.framer-iSlkH .framer-ycacil { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: 1193px; justify-content: flex-start; overflow: visible; padding: 300px 0px 0px 0px; position: relative; width: 100%; }`,
        `.framer-iSlkH .framer-1l046i8-container { flex: none; height: 614px; left: calc(50.00000000000002% - 614px / 2); position: absolute; top: 50px; width: 614px; z-index: 1; }`,
        `.framer-iSlkH .framer-14m6es5 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 39px; height: 374px; justify-content: center; mix-blend-mode: multiply; overflow: visible; padding: 600px 0px 444px 0px; position: relative; width: 100%; z-index: 1; }`,
        `.framer-iSlkH .framer-f5ej2j { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 3px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: 100%; }`,
        `.framer-iSlkH .framer-1b8mzo3 { --framer-paragraph-spacing: 0px; flex: none; height: auto; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; }`,
        `.framer-iSlkH .framer-1k1j90h-container { flex: none; height: 34px; position: relative; width: 418px; }`,
        `.framer-iSlkH .framer-wjiunu { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 44px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 0px; position: relative; width: 100%; }`,
        `.framer-iSlkH .framer-1bs5w4p { --framer-paragraph-spacing: 0px; flex: none; height: auto; position: relative; white-space: pre; width: auto; }`,
        `@media (min-width: 810px) and (max-width: 1199.98px) { .framer-iSlkH.framer-3nf04q { width: 810px; } .framer-iSlkH .framer-exthyr-container { right: -342px; top: 25px; } .framer-iSlkH .framer-bo7x1i { top: 50px; } .framer-iSlkH .framer-1rzxnh9-container { height: 88px; left: calc(60.12345679012348% - 394px / 2); top: calc(24600% - 88px / 2); width: 394px; } .framer-iSlkH .framer-qlfn9l { top: 200px; } .framer-iSlkH .framer-bgum6g-container { height: 88px; left: calc(38.14814814814817% - 394px / 2); top: calc(34900% - 88px / 2); width: 394px; } .framer-iSlkH .framer-skkinu-container { height: 88px; left: calc(37.160493827160515% - 394px / 2); top: calc(13500% - 88px / 2); width: 394px; } .framer-iSlkH .framer-1on0r0q { top: 160px; } .framer-iSlkH .framer-1dnm4no-container { height: 88px; left: calc(65.06172839506175% - 394px / 2); top: calc(45300% - 88px / 2); width: 394px; } .framer-iSlkH .framer-13h1j0t { top: 650px; } .framer-iSlkH .framer-1a9ufat-container { top: 29px; } .framer-iSlkH .framer-i0c579 { order: 0; } .framer-iSlkH .framer-1pqt39g { order: 1; z-index: 0; } .framer-iSlkH .framer-wpigon { height: var(--framer-aspect-ratio-supported, 466px); left: 105px; order: 3; top: 986px; width: 617px; } .framer-iSlkH .framer-1jyzb6c { height: 601px; left: 30px; order: 2; top: 658px; width: 567px; } .framer-iSlkH .framer-1ccl2wx { height: var(--framer-aspect-ratio-supported, 276px); left: 446px; order: 4; top: 1310px; width: unset; } .framer-iSlkH .framer-15u9y2l { height: 816px; order: 5; } .framer-iSlkH .framer-ugi89b { height: var(--framer-aspect-ratio-supported, 872px); left: -53px; order: 7; right: -56px; top: 1523px; } .framer-iSlkH .framer-b2lg7r { height: var(--framer-aspect-ratio-supported, 1904px); left: -727px; order: 8; top: 647px; width: 1312px; } .framer-iSlkH .framer-9hg1xy { height: var(--framer-aspect-ratio-supported, 1862px); order: 9; right: -661px; top: 423px; width: 1265px; } .framer-iSlkH .framer-1f80wvp { order: 10; } .framer-iSlkH .framer-1637jij { height: var(--framer-aspect-ratio-supported, 555px); order: 11; right: -195px; width: 699px; } .framer-iSlkH .framer-hhczno { left: -194px; order: 12; } .framer-iSlkH .framer-10ov673 { height: var(--framer-aspect-ratio-supported, 2370px); order: 13; top: -52px; width: 120px; } .framer-iSlkH .framer-34w19m { order: 14; right: -504px; top: 334px; } .framer-iSlkH .framer-zs4ph6 { aspect-ratio: unset; height: 2370px; order: 15; top: -52px; width: 120px; } .framer-iSlkH .framer-1bxw18n { height: var(--framer-aspect-ratio-supported, 306px); left: -36px; order: 16; top: 2012px; width: 252px; } .framer-iSlkH .framer-qv860g { left: -464px; order: 17; top: 334px; } .framer-iSlkH .framer-1a5z692 { aspect-ratio: unset; height: 306px; order: 18; right: -36px; top: 2012px; width: 252px; } .framer-iSlkH .framer-tb9nk2 { height: var(--framer-aspect-ratio-supported, 142px); left: -591px; order: 19; right: -574px; top: 2178px; } .framer-iSlkH .framer-mxb0af { height: 262px; left: -7px; order: 21; top: 2051px; width: 199px; } .framer-iSlkH .framer-n94lqy { height: 262px; order: 20; right: -6px; top: 2052px; width: 199px; } .framer-iSlkH .framer-16cctct { height: var(--framer-aspect-ratio-supported, 220px); left: 48%; order: 22; top: 2119px; width: 197px; } .framer-iSlkH .framer-9412jb { height: 5299px; z-index: -1; } .framer-iSlkH .framer-1qycoz3 { padding: 43px 0px 150px 0px; } .framer-iSlkH .framer-1qi7tcr { height: var(--framer-aspect-ratio-supported, 433px); left: -118px; top: 359px; width: 413px; } .framer-iSlkH .framer-1noxxhl { height: 674px; right: -347px; top: -7px; width: 636px; } .framer-iSlkH .framer-1mbm3vh { height: var(--framer-aspect-ratio-supported, 293px); right: -160px; top: 531px; width: 388px; } .framer-iSlkH .framer-1u5i8a9-container { top: calc(17.604617604617626% - 614px / 2); } .framer-iSlkH .framer-ocgc8g { padding: 868px 0px 0px 0px; } .framer-iSlkH .framer-h9jnkx-container { top: calc(20.68095838587644% - 614px / 2); } .framer-iSlkH .framer-1mus9pp { padding: 759px 0px 0px 0px; } .framer-iSlkH .framer-11s4ua7 { gap: 0px; } .framer-iSlkH .framer-p74rlv { height: var(--framer-aspect-ratio-supported, 57px); width: 57px; } .framer-iSlkH .framer-ejawci { max-width: 67%; } .framer-iSlkH .framer-d4pr6f { flex-wrap: wrap; gap: 92px 0px; max-width: 500px; } .framer-iSlkH .framer-ycacil { height: 1154px; } .framer-iSlkH .framer-1l046i8-container { top: calc(26.603119584055477% - 614px / 2); } .framer-iSlkH .framer-14m6es5 { height: 615px; padding: 550px 0px 444px 0px; }}`,
        `@media (max-width: 809.98px) { .framer-iSlkH.framer-3nf04q { background: linear-gradient(180deg, #022938 0%, rgb(136, 178, 160) 98%); background-color: unset; width: 390px; } .framer-iSlkH .framer-10izldj { order: 0; top: 620px; } .framer-iSlkH .framer-exthyr-container { height: 39px; right: -165px; top: 19px; width: 39px; } .framer-iSlkH .framer-bo7x1i { gap: 10px; order: 2; top: 10px; } .framer-iSlkH .framer-1rzxnh9-container { height: 77px; left: calc(50.00000000000002% - 343px / 2); top: calc(53500% - 77px / 2); width: 343px; } .framer-iSlkH .framer-hmg421 { order: 1; } .framer-iSlkH .framer-qlfn9l { gap: 10px; order: 3; top: 10px; } .framer-iSlkH .framer-bgum6g-container { height: 77px; left: calc(50.00000000000002% - 343px / 2); top: calc(38500% - 77px / 2); width: 343px; } .framer-iSlkH .framer-w0l22n { gap: 10px; order: 4; top: 10px; } .framer-iSlkH .framer-skkinu-container { height: 77px; left: calc(50.00000000000002% - 343px / 2); top: calc(25700% - 77px / 2); width: 343px; } .framer-iSlkH .framer-1on0r0q { gap: 10px; order: 5; top: 10px; } .framer-iSlkH .framer-1dnm4no-container { height: 77px; left: calc(50.00000000000002% - 343px / 2); top: calc(8200% - 77px / 2); width: 343px; } .framer-iSlkH .framer-13h1j0t { order: 6; top: 620px; } .framer-iSlkH .framer-1a9ufat-container { left: 50%; right: unset; top: 16px; transform: translateX(-50%); } .framer-iSlkH .framer-139e2on { justify-content: flex-end; order: 7; pointer-events: none; z-index: 0; } .framer-iSlkH .framer-eyztyl { pointer-events: none; z-index: 1; } .framer-iSlkH .framer-i0c579 { height: 451px; order: 0; padding: 0px; } .framer-iSlkH .framer-1pqt39g { height: 357px; order: 1; pointer-events: none; z-index: 0; } .framer-iSlkH .framer-wpigon { height: var(--framer-aspect-ratio-supported, 233px); left: 31px; order: 2; pointer-events: none; top: 645px; width: 308px; will-change: var(--framer-will-change-effect-override, transform); } .framer-iSlkH .framer-1jyzb6c { height: 511px; left: -17px; order: 3; pointer-events: none; top: 398px; width: 367px; will-change: var(--framer-will-change-effect-override, transform); } .framer-iSlkH .framer-1ccl2wx { height: var(--framer-aspect-ratio-supported, 174px); left: 184px; order: 13; pointer-events: none; right: unset; top: 810px; width: 166px; } .framer-iSlkH .framer-15u9y2l { height: 300px; order: 7; pointer-events: none; z-index: -1; } .framer-iSlkH .framer-1k80ww9, .framer-iSlkH .framer-180sx8m-container { order: 6; } .framer-iSlkH .framer-ugi89b { height: var(--framer-aspect-ratio-supported, 484px); left: -60px; order: 4; pointer-events: none; right: -60px; top: 983px; } .framer-iSlkH .framer-b2lg7r { height: var(--framer-aspect-ratio-supported, 1078px); left: -412px; order: 8; pointer-events: none; top: 434px; width: 743px; will-change: var(--framer-will-change-effect-override, transform); } .framer-iSlkH .framer-9hg1xy { height: var(--framer-aspect-ratio-supported, 1083px); order: 5; pointer-events: none; right: -386px; top: 319px; width: 736px; will-change: var(--framer-will-change-effect-override, transform); } .framer-iSlkH .framer-1f80wvp { height: var(--framer-aspect-ratio-supported, 343px); min-width: 390px; order: 9; pointer-events: none; top: 266px; width: 432px; } .framer-iSlkH .framer-1637jij { gap: 10px; height: var(--framer-aspect-ratio-supported, 198px); min-width: 250px; order: 10; pointer-events: none; right: -57px; top: 297px; width: 250px; } .framer-iSlkH .framer-hhczno { height: var(--framer-aspect-ratio-supported, 198px); left: -57px; min-width: 250px; order: 11; pointer-events: none; top: 297px; width: 250px; } .framer-iSlkH .framer-10ov673 { height: var(--framer-aspect-ratio-supported, 1422px); order: 12; pointer-events: none; top: -21px; width: 72px; } .framer-iSlkH .framer-34w19m { height: var(--framer-aspect-ratio-supported, 251px); order: 17; pointer-events: none; right: -146px; top: 340px; width: 278px; } .framer-iSlkH .framer-zs4ph6 { height: var(--framer-aspect-ratio-supported, 1433px); order: 14; pointer-events: none; top: -32px; width: 72px; } .framer-iSlkH .framer-1bxw18n { height: var(--framer-aspect-ratio-supported, 182px); left: -26px; order: 15; pointer-events: none; top: 1229px; width: 150px; } .framer-iSlkH .framer-qv860g { gap: 10px; height: var(--framer-aspect-ratio-supported, 251px); left: -146px; order: 16; pointer-events: none; top: 340px; width: 278px; } .framer-iSlkH .framer-1a5z692 { aspect-ratio: unset; height: 182px; order: 18; pointer-events: none; right: -26px; top: 1229px; width: 150px; } .framer-iSlkH .framer-tb9nk2 { height: var(--framer-aspect-ratio-supported, 88px); left: -414px; order: 19; pointer-events: none; right: -415px; top: 1322px; } .framer-iSlkH .framer-mxb0af { height: 180px; left: -10px; order: 22; pointer-events: none; top: 1241px; width: 120px; } .framer-iSlkH .framer-n94lqy { height: 180px; order: 21; pointer-events: none; right: -10px; top: 1241px; width: 120px; } .framer-iSlkH .framer-16cctct { height: var(--framer-aspect-ratio-supported, 118px); order: 20; pointer-events: none; top: 1298px; width: 106px; } .framer-iSlkH .framer-vp0bm4 { order: 8; pointer-events: none; } .framer-iSlkH .framer-9412jb { padding: 0px 0px 95px 0px; } .framer-iSlkH .framer-1qycoz3 { justify-content: flex-start; padding: 59px 0px 0px 0px; } .framer-iSlkH .framer-1mrjyuk-container { order: 0; } .framer-iSlkH .framer-1qehb46 { height: var(--framer-aspect-ratio-supported, 134px); order: 1; width: 134px; } .framer-iSlkH .framer-96zptf-container, .framer-iSlkH .framer-wjiunu { order: 2; } .framer-iSlkH .framer-emeao1 { height: 163px; order: 3; } .framer-iSlkH .framer-1xsdkt9 { order: 4; } .framer-iSlkH .framer-1wz8q9m-container { order: 5; } .framer-iSlkH .framer-1qi7tcr { height: var(--framer-aspect-ratio-supported, 233px); left: -89px; top: 165px; width: 222px; } .framer-iSlkH .framer-1noxxhl { height: 480px; right: -170px; top: -10px; width: 345px; } .framer-iSlkH .framer-1mbm3vh { height: var(--framer-aspect-ratio-supported, 174px); right: -90px; top: 346px; width: 231px; } .framer-iSlkH .framer-1qb2nt1 { flex-direction: column; } .framer-iSlkH .framer-msu6hn { height: 2542px; order: 9; pointer-events: none; } .framer-iSlkH .framer-1u5i8a9-container { height: 924px; left: unset; order: 0; position: relative; top: unset; width: 924px; } .framer-iSlkH .framer-ocgc8g { order: 1; padding: 39px 25px 39px 25px; } .framer-iSlkH .framer-1ial3d5-container { height: 165px; width: 100%; } .framer-iSlkH .framer-q56cn-container { height: 931px; order: 2; width: 931px; } .framer-iSlkH .framer-82chy7 { order: 10; pointer-events: none; } .framer-iSlkH .framer-16l2pdg { gap: 60px; height: 2728px; } .framer-iSlkH .framer-h9jnkx-container { height: 924px; left: unset; position: relative; top: unset; width: 924px; } .framer-iSlkH .framer-1mus9pp { height: 1696px; justify-content: flex-start; padding: 0px; } .framer-iSlkH .framer-11s4ua7 { gap: 0px; height: min-content; justify-content: flex-start; padding: 0px 40px 0px 40px; z-index: 2; } .framer-iSlkH .framer-p74rlv { height: var(--framer-aspect-ratio-supported, 82px); width: 82px; } .framer-iSlkH .framer-1f66h6j { height: 153px; max-width: unset; } .framer-iSlkH .framer-ejawci { height: 141px; max-width: unset; } .framer-iSlkH .framer-d4pr6f { flex-direction: column; gap: 159px; height: 817px; justify-content: flex-start; padding: 80px 0px 32px 0px; z-index: 2; } .framer-iSlkH .framer-105zzlt { order: 11; pointer-events: none; } .framer-iSlkH .framer-ycacil { height: 1729px; } .framer-iSlkH .framer-1l046i8-container { height: 924px; left: -266px; right: -268px; top: -177px; width: unset; } .framer-iSlkH .framer-14m6es5 { height: 1822px; padding: 480px 20px 444px 20px; } .framer-iSlkH .framer-f5ej2j { gap: 41px; order: 0; } .framer-iSlkH .framer-1k1j90h-container { order: 1; width: 100%; }}`,
      ],
      `framer-iSlkH`,
    )),
    (ua = la),
    (la.displayName = `Card Responsiveness 2`),
    (la.defaultProps = { height: 11794, width: 1200 }),
    x(
      la,
      [
        {
          explicitInter: !0,
          fonts: [
            {
              cssFamilyName: `Cormorant Infant`,
              source: `google`,
              style: `normal`,
              uiFamilyName: `Cormorant Infant`,
              url: `./assets/fonts/HhyCU44g9vKiM1sORYSiWeAsLN99xfs9KOOc_agJPrgvYOWWhDlDkWSy.woff2`,
              weight: `400`,
            },
            {
              cssFamilyName: `Cormorant Upright`,
              source: `google`,
              style: `normal`,
              uiFamilyName: `Cormorant Upright`,
              url: `./assets/fonts/VuJrdM3I2Y35poFONtLdafkUCHw1y2vQjjTkeMnz.woff2`,
              weight: `400`,
            },
            {
              cssFamilyName: `Cormorant`,
              source: `google`,
              style: `normal`,
              uiFamilyName: `Cormorant`,
              url: `./assets/fonts/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFhFTQ7Fg7A2uwYs.woff2`,
              weight: `400`,
            },
            {
              cssFamilyName: `Cormorant Upright`,
              source: `google`,
              style: `normal`,
              uiFamilyName: `Cormorant Upright`,
              url: `./assets/fonts/VuJudM3I2Y35poFONtLdafkUCHw1y1MhpxDpU9X6RPzQ.woff2`,
              weight: `500`,
            },
          ],
        },
        ...Ur,
        ...Gr,
        ...qr,
        ...Jr,
        ...Xr,
        ...Qr,
        ...$r,
        ...ei,
        ...ti,
        ...ni,
        ...ri,
        ...ii,
        ...ai,
        ...oi,
        ...si,
        ...ci,
        ...li,
        ...ui,
      ],
      { supportsExplicitInterCodegen: !0 },
    ),
    (la.loader = {
      load: (e, t) => (
        t.locale,
        Promise.allSettled([
          v(H, {}, t),
          v(ge, {}, t),
          v(Dt, {}, t),
          v(Yt, {}, t),
          v(Tr, {}, t),
          v(dt, {}, t),
          v($n, {}, t),
          v(Y, {}, t),
          v(Le, {}, t),
          v(Bn, {}, t),
          v(Dn, {}, t),
          v($e, {}, t),
          v(J, {}, t),
          v(pn, {}, t),
          v(fr, {}, t),
        ])
      ),
    }),
    (da = {
      exports: {
        Props: { type: `tsType`, annotations: { framerContractVersion: `1` } },
        default: {
          type: `reactComponent`,
          name: `FramerbmdQ7AEa3`,
          slots: [],
          annotations: {
            framerColorSyntax: `true`,
            framerIntrinsicHeight: `11794`,
            framerResponsiveScreen: `true`,
            framerAutoSizeImages: `true`,
            framerImmutableVariables: `true`,
            framerContractVersion: `1`,
            framerComponentViewportWidth: `true`,
            framerAcceptsLayoutTemplate: `true`,
            framerCanvasComponentVariantDetails: `{"propertyName":"variant","data":{"default":{"layout":["fixed","auto"]},"kBRqx33QC":{"layout":["fixed","auto"]},"ydPqKqvDJ":{"layout":["fixed","auto"]}}}`,
            framerIntrinsicWidth: `1200`,
            framerScrollSections: `{"ScerDqzxO":{"pattern":":ScerDqzxO","name":"invite"},"JblZgXuD9":{"pattern":":JblZgXuD9","name":"location"},"UYR7Q8Kxt":{"pattern":":UYR7Q8Kxt","name":"bride-and-groom"},"RH0GMJ5ne":{"pattern":":RH0GMJ5ne","name":"rsvp"},"WEdSDcqq6":{"pattern":":WEdSDcqq6","name":"things-to-know"},"ch3fiKOLX":{"pattern":":ch3fiKOLX","name":"instagram"}}`,
            framerLayoutTemplateFlowEffect: `true`,
            framerDisplayContentsDiv: `false`,
          },
        },
        queryParamNames: {
          type: `variable`,
          annotations: { framerContractVersion: `1` },
        },
        __FramerMetadata__: { type: `variable` },
      },
    }));
})();
export { da as __FramerMetadata__, ua as default, mi as queryParamNames };
//# sourceMappingURL=5ZQAKlWobocbY28BLkwvhYWx9Yd2T1BoPRI2Pf64ZLg.DzDVT15v.mjs.map
