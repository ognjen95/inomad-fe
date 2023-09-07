"use client";

import { FC, memo, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { DocumentCallback } from "react-pdf/dist/cjs/shared/types";
import { useWindowSize } from "usehooks-ts";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export type PdfViewerProps = {
  src?: string;
  file?: File;
};

const PdfViewer: FC<PdfViewerProps> = ({ src, file }) => {
  const ref = useRef<HTMLDivElement | null>();
  const [width, setWidth] = useState(0);

  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.getBoundingClientRect().width);
    }
  }, [windowWidth, setWidth]);

  const [numPages, setNumPages] = useState<number>();

  const onDocumentLoadSuccess = (document: DocumentCallback) => {
    setNumPages(document.numPages);
  };

  return (
    <div
      className="overflow-y-auto w-full h-full"
      ref={(el) => {
        ref.current = el;
      }}
    >
      <Document
        file={src || URL.createObjectURL(file!)}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(Array(numPages), (_, index) => (
          <div key={index + 1}>
            <Page pageNumber={index + 1} key="index" width={width} />
          </div>
        ))}
      </Document>
    </div>
  );
};

export default memo(PdfViewer);
