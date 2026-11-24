"use client";

import { Suspense, useEffect, useId, useRef, useState } from "react";
import {
  ACCENTS,
  ACCENT_LABEL,
  AVATARS,
  AVATAR_LABEL,
  AVATAR_NAMES,
  BANNERS,
  BANNER_LABEL,
  BOOTH_NAME_MAX,
  BUILDER_DEFAULTS,
  LAYOUTS,
  LAYOUT_INFO,
  builderQuery,
  cleanBoothName,
  parseBuilder,
  type BuilderState,
} from "@/lib/catalog";
import { BoothPreviewHead, BoothPreviewShop } from "./booth-preview";
import { BoothBanner, PixelAvatar, accentStyle } from "./pixel-art";
import { UrlWatcher, useUrlState } from "./use-url-state";

/**
 * Build a booth and watch it change: a name, a pixel avatar, an accent, a
 * banner and one of the five shop layouts. Nothing is saved. The choices
 * live in the page's query string, so the result can be shared as a link.
 */
export function BoothBuilder() {
  const [state, setState] = useUrlState<BuilderState>(parseBuilder, builderQuery);
  const id = useId();
  const nameInput = useRef<HTMLInputElement>(null);
  const custom = builderQuery(state) !== "";

  // The name box keeps its own text while someone types, and follows the address otherwise.
  useEffect(() => {
    const input = nameInput.current;
    const shown = state.name === BUILDER_DEFAULTS.name ? "" : state.name;
    if (input && document.activeElement !== input && input.value.trim() !== shown) input.value = shown;
  }, [state.name]);

  function update(change: Partial<BuilderState>) {
    setState({ ...state, ...change });
  }

  function reset() {
    if (nameInput.current) nameInput.current.value = "";
    setState(BUILDER_DEFAULTS);
  }

  return (
    <div className="bb">
      <Suspense fallback={null}>
        <UrlWatcher />
      </Suspense>
      <BoothPreviewHead state={state} />

      <form className="bb-controls" aria-label="Booth settings" onSubmit={(event) => event.preventDefault()}>
        <div className="field">
          <label htmlFor={`${id}-name`}>Booth name</label>
          <input
            ref={nameInput}
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="off"
            spellCheck={false}
            maxLength={BOOTH_NAME_MAX}
            placeholder={BUILDER_DEFAULTS.name}
            defaultValue={state.name === BUILDER_DEFAULTS.name ? "" : state.name}
            onChange={(event) => update({ name: cleanBoothName(event.target.value).trim() || BUILDER_DEFAULTS.name })}
          />
        </div>

        <fieldset className="bb-group">
          <legend>Avatar</legend>
          <div className="bb-avatars">
            {AVATAR_NAMES.map((name) => (
              <button key={name} type="button" className="swatch" aria-pressed={state.avatar === name} aria-label={AVATAR_LABEL[name]} title={AVATAR_LABEL[name]} onClick={() => update({ avatar: name })}>
                <PixelAvatar rows={AVATARS[name]} accent={state.accent} size={48} />
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="bb-group">
          <legend>Accent</legend>
          <div className="bb-accents">
            {ACCENTS.map((accent) => (
              <button key={accent} type="button" className="swatch swatch-dot" aria-pressed={state.accent === accent} aria-label={ACCENT_LABEL[accent]} title={ACCENT_LABEL[accent]} style={accentStyle(accent)} onClick={() => update({ accent })}>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="bb-group">
          <legend>Banner</legend>
          <div className="bb-banners">
            {BANNERS.map((banner) => (
              <button key={banner} type="button" className="pick pick-art" aria-pressed={state.banner === banner} onClick={() => update({ banner })}>
                <BoothBanner banner={banner} accent={state.accent} />
                <span>{BANNER_LABEL[banner]}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="bb-group">
          <legend>Shop layout</legend>
          <div className="bb-layouts">
            {LAYOUTS.map((layout) => (
              <button key={layout} type="button" className="pick pick-text" aria-pressed={state.layout === layout} onClick={() => update({ layout })}>
                <strong>{LAYOUT_INFO[layout].label}</strong>
                <span>Suits: {LAYOUT_INFO[layout].suits.toLowerCase()}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="bb-actions">
          <CopyLinkButton />
          {custom ? (
            <button type="button" className="minibtn" onClick={reset}>
              Start over
            </button>
          ) : null}
        </div>
      </form>

      <BoothPreviewShop state={state} />
    </div>
  );
}

/** Copies this page's address, choices included. The icon swaps to a check, and a live region says what happened. */
function CopyLinkButton() {
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  useEffect(() => {
    if (copied === "idle") return;
    const timer = window.setTimeout(() => setCopied("idle"), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
  }

  return (
    <button type="button" className="minibtn" data-done={copied === "done"} onClick={copy}>
      <span className="copy-icons" aria-hidden="true">
        <svg className="copy-sheet" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4.5" y="4.5" width="8" height="8" rx="1.5" />
          <path d="M9.5 2.5h-6a1 1 0 0 0-1 1v6" />
        </svg>
        <svg className="copy-check" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="m2.5 7.5 3 3 6-7" />
        </svg>
      </span>
      <span aria-live="polite">{copied === "done" ? "Link copied" : copied === "failed" ? "Copy failed. Copy the address bar instead." : "Copy a link to this booth"}</span>
    </button>
  );
}
