import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PageHeader from "../../components/common/PageHeader";

type InfoPageProps = {
  title: string;
  content: string;
};

export default function InfoPage({ title, content }: InfoPageProps) {
  const contentWithoutTitle = content.replace(/^#\s+.*(?:\r?\n)+/, "");

  return (
    <main className="mx-auto flex w-full max-w-200 flex-col gap-8 p-4 md:p-6">
      <PageHeader title={title} />

      <section className="min-h-60 rounded-2xl border border-gray-04 bg-white p-5 md:min-h-80 md:p-8">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => <h2 className="mt-8 first:mt-0 text-black-01 typo-head-03">{children}</h2>,
            h3: ({ children }) => <h3 className="mt-6 text-black-01 typo-head-05 md:text-lg!">{children}</h3>,
            p: ({ children }) => <p className="mt-3 text-gray-01 typo-body-04 md:text-base! md:leading-7!">{children}</p>,
            ul: ({ children }) => <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-01 typo-body-04 md:text-base!">{children}</ul>,
            ol: ({ children }) => <ol className="mt-3 list-decimal space-y-2 pl-5 text-gray-01 typo-body-04 md:text-base!">{children}</ol>,
            li: ({ children }) => <li className="pl-1">{children}</li>,
            strong: ({ children }) => <strong className="font-bold text-black-01">{children}</strong>,
            a: ({ children, href }) => (
              <a href={href} className="text-sub-01 underline underline-offset-2">
                {children}
              </a>
            ),
            table: ({ children }) => (
              <div className="mt-4 overflow-x-auto rounded-xl border border-gray-03">
                <table className="w-full min-w-140 border-collapse text-left typo-body-04">{children}</table>
              </div>
            ),
            thead: ({ children }) => <thead className="bg-yellow-02 text-black-01">{children}</thead>,
            th: ({ children }) => <th className="border-b border-r border-gray-03 px-3 py-2 font-bold last:border-r-0">{children}</th>,
            td: ({ children }) => <td className="border-b border-r border-gray-04 px-3 py-2 text-gray-01 last:border-r-0">{children}</td>,
            hr: () => <hr className="my-8 border-gray-03" />,
          }}
        >
          {contentWithoutTitle}
        </ReactMarkdown>
      </section>
    </main>
  );
}
