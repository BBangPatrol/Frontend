import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { authApi } from "../../api/client";

type PreviewReceipt = {
  imageUrl: string;
  fileName: string;
};

type PreviewReceiptResponse = {
  isSuccess: true;
  code: string;
  message: string;
  data: PreviewReceipt;
};

type PreviewReceiptError = {
  isSuccess: false;
  code: string;
  message: string;
};

async function issuePreviewReceipt(code: string) {
  const response = await authApi.post<PreviewReceiptResponse>("/demo/preview-receipt", { code });

  return response.data.data;
}

function getErrorMessage(error: unknown) {
  if (isAxiosError<PreviewReceiptError>(error)) {
    if (error.response?.status === 401) return "로그인이 필요합니다.";
    if (error.response?.data.message) return error.response.data.message;
  }

  return "시연용 사진을 발급하지 못했습니다.";
}

export default function PreviewReceiptDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const previewMutation = useMutation({ mutationFn: issuePreviewReceipt });

  const closeModal = () => {
    setIsOpen(false);
    setCode("");
    previewMutation.reset();
  };

  const submitCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    previewMutation.mutate(code);
  };

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className="bg-sub-01 border border-sub-01 rounded-xl py-3 w-40 font-bold text-white">
        코드 등록
      </button>

      {isOpen &&
        createPortal(
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-receipt-title"
            onClick={(event) => {
              if (event.target === event.currentTarget) closeModal();
            }}
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-5"
          >
            <div className="relative max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-dropdown md:p-8">
              <button type="button" onClick={closeModal} aria-label="닫기" className="absolute top-4 right-5 text-2xl leading-none text-gray-02">
                ×
              </button>

              <div className="flex flex-col gap-6">
                <header className="pr-8">
                  <h2 id="preview-receipt-title" className="typo-head-03">
                    시연용 사진 발급
                  </h2>
                  <p className="mt-2 text-gray-02 typo-body-04">시연 코드를 입력하면 영수증 사진을 발급합니다.</p>
                </header>

                <form onSubmit={submitCode} className="flex flex-col gap-3">
                  <label htmlFor="preview-receipt-code" className="typo-head-05">
                    시연 코드
                  </label>
                  <input
                    id="preview-receipt-code"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="시연 코드를 입력하세요"
                    autoComplete="off"
                    className="w-full rounded-xl border border-gray-03 px-4 py-3 outline-none focus:border-sub-01"
                  />
                  <button type="submit" disabled={previewMutation.isPending} className="w-full rounded-xl bg-sub-01 py-3 text-white typo-head-05 disabled:opacity-50">
                    {previewMutation.isPending ? "발급 중..." : "사진 발급하기"}
                  </button>
                  {previewMutation.isError && (
                    <p role="alert" className="text-center text-red typo-body-04">
                      {getErrorMessage(previewMutation.error)}
                    </p>
                  )}
                </form>

                {previewMutation.data && (
                  <div className="flex flex-col gap-4 border-t border-gray-04 pt-6">
                    <div className="flex w-full items-center justify-center overflow-hidden rounded-2xl border border-gray-04 bg-gray-04 p-3">
                      <img
                        src={previewMutation.data.imageUrl}
                        alt="발급된 시연용 영수증"
                        draggable={false}
                        className="pointer-events-none block h-48 w-40 select-none object-contain md:h-56 md:w-48"
                      />
                    </div>

                    <dl className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <dt className="text-gray-02 typo-body-04">파일명</dt>
                        <dd className="break-all typo-body-03">{previewMutation.data.fileName}</dd>
                      </div>
                    </dl>

                    <a
                      href={previewMutation.data.imageUrl}
                      download={previewMutation.data.fileName}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full rounded-xl border border-sub-01 py-3 text-center text-sub-01 typo-head-05"
                    >
                      이미지 다운로드
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>,
          document.body,
        )}
    </>
  );
}
