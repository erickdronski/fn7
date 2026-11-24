import { BrandIcon } from "@/components/ui/brand-icon";
import { CopyButton } from "@/components/ui/copy-button";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { copyLabel, STATUS_LABEL, VERIFIED_ON, type InstallSnippet, type InstallSource, type InstallTool } from "@/lib/install";
import { canShowMark } from "@/lib/marks";

/** A link to an official guide. It opens in a new tab and says so. */
export function SourceLink({ source }: { source: InstallSource }) {
  return (
    <a className="link link-on" href={source.href} target="_blank" rel="noreferrer">
      {source.label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** A list of sources as a sentence: "A, B and C". */
export function SourceList({ sources }: { sources: InstallSource[] }) {
  return (
    <>
      {sources.map((source, index) => (
        <span key={source.href}>
          {index === 0 ? "" : index === sources.length - 1 ? " and " : ", "}
          <SourceLink source={source} />
        </span>
      ))}
    </>
  );
}

function Snippet({ snippet }: { snippet: InstallSnippet }) {
  return (
    <figure className="code">
      <figcaption>
        <span className="snip-cap">
          <span className="snip-label">{snippet.label}</span>
          <span className="snip-file mono">{snippet.file}</span>
        </span>
        <CopyButton text={snippet.code} label={copyLabel(snippet)} />
      </figcaption>
      {/* Focusable, so a long line can be scrolled from the keyboard. */}
      <pre className="mono" tabIndex={0}>
        {snippet.code}
      </pre>
    </figure>
  );
}

/**
 * One tool: its mark where the owner allows it, the steps in order, and the
 * exact text to paste. The mark falls back to fn/7's own icon for the kind of tool.
 */
/** A tool's own mark where it may be shown (lib/marks.ts), and fn/7's icon for that kind of tool where it may not. */
export function ToolMark({ tool, size }: { tool: InstallTool; size: number }) {
  return tool.brand && canShowMark(tool.brand) ? <BrandIcon name={tool.brand} size={size} /> : <PixelIcon name={tool.icon} size={size} />;
}

export function ToolPanel({ tool }: { tool: InstallTool }) {
  return (
    <div className="install-tool">
      <div className="tool-head">
        <span className="tool-mark">
          <ToolMark tool={tool} size={26} />
        </span>
        <div className="tool-name">
          <h3>{tool.title}</h3>
          <p>{tool.connects}</p>
        </div>
        <span className="state">{STATUS_LABEL[tool.status]}</span>
      </div>

      <div className="tool-body">
        <ol className="tool-steps">
          {tool.steps.map((step, index) => (
            <li key={step.title}>
              <span className="tool-n mono" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="tool-snippets">
          {tool.snippets.map((snippet) => (
            <Snippet key={snippet.label} snippet={snippet} />
          ))}
        </div>
      </div>

      {tool.note ? <p className="tool-note">{tool.note}</p> : null}

      <p className="tool-foot">
        Checked on {VERIFIED_ON} against <SourceList sources={tool.sources} />.
      </p>
    </div>
  );
}
