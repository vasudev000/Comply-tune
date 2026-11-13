import {
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AppButton } from "@/components/dashboard/Buttons";
import { APP_TITLE } from "@/lib/app-config";

import "@/styles/compliance-bot.css";

const assetRoot = "/figma-assets/compliance-bot";

const suggestedTopics = [
  {
    title: "Environmental Compliance",
    descriptionLines: ["Regulations aimed at reduce", "environmental impact"],
    descriptionWidth: 179,
    illustration: "environmental.svg",
    hoverIllustration: "environmental-hover.svg",
  },
  {
    title: "Data Privacy Compliance",
    descriptionLines: ["Ensure your data handling", "meets privacy regulations."],
    descriptionWidth: 163,
    illustration: "privacy.svg",
    hoverIllustration: "privacy-hover.svg",
  },
  {
    title: "User Consent Management",
    descriptionLines: ["Track and manage user", "consent for data usage."],
    descriptionWidth: 146,
    illustration: "consent.svg",
    hoverIllustration: "consent-hover.svg",
  },
];

export function meta() {
  return [
    { title: `Compliance Bot | ${APP_TITLE}` },
    {
      name: "description",
      content: "Ask questions about compliance topics and regulations.",
    },
  ];
}

function SuggestionCard({
  title,
  descriptionLines,
  descriptionWidth,
  illustration,
  hoverIllustration,
  onSelect,
}: (typeof suggestedTopics)[number] & { onSelect: () => void }) {
  return (
    <button
      type="button"
      className="compliance-suggestion"
      onClick={onSelect}
      aria-label={`Ask about ${title}`}
    >
      <span
        className="compliance-suggestion__copy"
      >
        <span className="compliance-suggestion__title">{title}</span>
        <span
          className="compliance-suggestion__description"
          style={{ "--description-width": `${descriptionWidth}px` } as CSSProperties}
        >
          {descriptionLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </span>
      </span>
      <span className="compliance-document" aria-hidden="true">
        <img
          className="compliance-document__image compliance-document__image--default"
          src={`${assetRoot}/${illustration}`}
          alt=""
        />
        <img
          className="compliance-document__image compliance-document__image--hover"
          src={`${assetRoot}/${hoverIllustration}`}
          alt=""
        />
      </span>
    </button>
  );
}

export default function ComplianceBotRoute() {
  const [prompt, setPrompt] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("6 Luna");
  const [notice, setNotice] = useState("");
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const filesRef = useRef<HTMLInputElement>(null);

  function attachFiles(fileList: FileList | null) {
    if (!fileList) return;
    setSelectedFiles((current) => [
      ...current,
      ...Array.from(fileList, (file) => file.name),
    ]);
  }

  function selectTopic(title: string) {
    setPrompt(`Tell me about ${title.toLowerCase()}.`);
    setNotice("");
    promptRef.current?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!prompt.trim()) return;

    setNotice(
      "Your question is ready. The Compliance Bot service is not connected yet.",
    );
  }

  return (
    <DashboardShell currentSection="Compliance Bot" pageIcon="76780.svg">
      <div className="compliance-bot-page">
        <div className="compliance-bot-content">
          <section className="compliance-bot-intro" aria-labelledby="bot-title">
            <div className="compliance-bot-mascot" aria-hidden="true">
              <span className="compliance-bot-mascot__grid" />
              <img src={`${assetRoot}/mascot.png`} alt="" />
            </div>
            <h1 id="bot-title">How can i help you with compliance?</h1>
          </section>

          <form className="compliance-composer" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="compliance-prompt">
              Ask about compliance
            </label>
            <textarea
              ref={promptRef}
              id="compliance-prompt"
              value={prompt}
              onChange={(event) => {
                setPrompt(event.target.value);
                setNotice("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              placeholder="Ask about compliance..."
              rows={1}
            />

            {selectedFiles.length > 0 && (
              <div className="compliance-composer__attachments" aria-live="polite">
                {selectedFiles.map((file, index) => (
                  <span key={`${file}-${index}`} className="compliance-file-chip">
                    {file}
                    <button
                      type="button"
                      aria-label={`Remove ${file}`}
                      onClick={() =>
                        setSelectedFiles((current) =>
                          current.filter((_, fileIndex) => fileIndex !== index),
                        )
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="compliance-composer__toolbar">
              <div className="compliance-composer__file-actions">
                <input
                  ref={uploadRef}
                  className="sr-only"
                  type="file"
                  onChange={(event) => attachFiles(event.currentTarget.files)}
                />
                <input
                  ref={filesRef}
                  className="sr-only"
                  type="file"
                  multiple
                  onChange={(event) => attachFiles(event.currentTarget.files)}
                />
                <button
                  type="button"
                  className="compliance-tool-button"
                  onClick={() => uploadRef.current?.click()}
                >
                  <img src={`${assetRoot}/upload.svg`} alt="" />
                  Upload
                </button>
                <button
                  type="button"
                  className="compliance-tool-button"
                  onClick={() => filesRef.current?.click()}
                >
                  <img src={`${assetRoot}/files.svg`} alt="" />
                  Files
                </button>
              </div>

              <div className="compliance-composer__actions">
                <div className="compliance-model-picker">
                  <button
                    type="button"
                    className="compliance-model-picker__trigger"
                    aria-haspopup="menu"
                    aria-expanded={modelMenuOpen}
                    onClick={() => setModelMenuOpen((open) => !open)}
                  >
                    <span>{selectedModel}</span>
                    <span className="compliance-model-picker__tier">Medium</span>
                    <img src={`${assetRoot}/model-chevron.svg`} alt="" />
                  </button>
                  {modelMenuOpen && (
                    <div className="compliance-model-picker__menu" role="menu">
                      {["6 Luna", "6 Luna Mini"].map((model) => (
                        <button
                          key={model}
                          type="button"
                          role="menuitemradio"
                          aria-checked={selectedModel === model}
                          onClick={() => {
                            setSelectedModel(model);
                            setModelMenuOpen(false);
                          }}
                        >
                          {model}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="compliance-tool-button compliance-tool-button--icon"
                  aria-label="Voice input"
                  title="Voice input is not connected yet"
                >
                  <img src={`${assetRoot}/send.svg`} alt="" />
                </button>
                <AppButton
                  type="submit"
                  variant="primary"
                  size="md"
                  className="compliance-send-button"
                >
                  Send
                  <img src={`${assetRoot}/input-action.svg`} alt="" />
                </AppButton>
              </div>
            </div>
          </form>

          {notice && (
            <p className="compliance-bot-notice" role="status">
              {notice}
            </p>
          )}

          <section className="compliance-suggestions" aria-label="Suggested topics">
            {suggestedTopics.map((topic) => (
              <SuggestionCard
                key={topic.title}
                {...topic}
                onSelect={() => selectTopic(topic.title)}
              />
            ))}
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
