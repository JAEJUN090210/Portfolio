import { Fragment } from 'react';

/** 문자열 안의 `**텍스트**`를 강조(mark)로 렌더링합니다. 스타일은 부모에서 지정합니다. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? <mark key={index}>{part}</mark> : <Fragment key={index}>{part}</Fragment>,
      )}
    </>
  );
}
