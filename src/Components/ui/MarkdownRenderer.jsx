/* eslint-disable react/prop-types */
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useStore } from "../../store";

const CodeBlock = ({ language, children }) => {
  const theme = useStore((state) => state.theme);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden my-4 border border-black/5 dark:border-white/10">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50/50 dark:bg-white/5 border-b border-black/5 dark:border-white/10">
        <span className="text-xs text-muted-foreground uppercase">
          {language || "text"}
        </span>
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded transition-colors text-muted-foreground hover:text-foreground dark:hover:text-white"
          title="Copy code"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || "text"}
        style={theme === "light" ? vs : vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: theme === "light" ? "#f9fafb" : "rgba(0, 0, 0, 0.4)",
          fontSize: "0.9rem",
        }}
        wrapLines={true}
        wrapLongLines={true}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <CodeBlock language={match[1]}>
              {String(children).replace(/\n$/, "")}
            </CodeBlock>
          ) : (
            <code
              className={`${className} bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-primary-foreground font-semibold`}
              {...props}
            >
              {children}
            </code>
          );
        },
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold mt-5 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-bold mt-4 mb-2">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="mb-4 leading-relaxed last:mb-0">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="pl-1 marker:text-primary">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary/50 pl-4 py-1 my-4 bg-gray-50/50 dark:bg-white/5 italic rounded-r text-muted-foreground">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-4"
          >
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-4 rounded-lg border border-black/5 dark:border-white/10">
            <table className="w-full text-sm text-left">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50/50 dark:bg-white/5 border-b border-black/5 dark:border-white/10">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            {children}
          </tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-3 font-medium text-muted-foreground">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-foreground">{children}</td>
        ),
        hr: () => <hr className="my-6 border-black/5 dark:border-white/10" />,
      }}
      className="text-sm md:text-[15px] prose prose-invert max-w-none prose-p:my-0 prose-ul:my-2 prose-ol:my-2"
    >
      {content}
    </ReactMarkdown>
  );
};
