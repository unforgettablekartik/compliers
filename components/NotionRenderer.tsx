import React from 'react';

function StyledText({ text }: { text: any }) {
  let element: React.ReactNode = text.plain_text;
  const { annotations, href } = text;
  if (annotations.code) {
    element = <code>{element}</code>;
  }
  if (annotations.bold) {
    element = <strong>{element}</strong>;
  }
  if (annotations.italic) {
    element = <em>{element}</em>;
  }
  if (annotations.strikethrough) {
    element = <s>{element}</s>;
  }
  if (annotations.underline) {
    element = <u>{element}</u>;
  }
  if (annotations.color && annotations.color !== 'default') {
    element = <span style={{ color: annotations.color }}>{element}</span>;
  }
  if (href) {
    element = (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {element}
      </a>
    );
  }
  return <React.Fragment>{element}</React.Fragment>;
}

function RichText({ rich_text }: { rich_text: any[] }) {
  return (
    <>
      {rich_text.map((text, i) => (
        <StyledText key={i} text={text} />
      ))}
    </>
  );
}

function renderBlock(block: any): React.ReactNode {
  const { type, id } = block;
  const value = block[type];
  switch (type) {
    case 'paragraph':
      return (
        <p key={id}>
          <RichText rich_text={value.rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1 key={id}>
          <RichText rich_text={value.rich_text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2 key={id}>
          <RichText rich_text={value.rich_text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3 key={id}>
          <RichText rich_text={value.rich_text} />
        </h3>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li key={id}>
          <RichText rich_text={value.rich_text} />
        </li>
      );
    case 'quote':
      return (
        <blockquote key={id}>
          <RichText rich_text={value.rich_text} />
        </blockquote>
      );
    case 'code':
      return (
        <pre key={id}>
          <code>
            <RichText rich_text={value.rich_text} />
          </code>
        </pre>
      );
    case 'divider':
      return <hr key={id} />;
    default:
      return null;
  }
}

export default function NotionRenderer({ blocks }: { blocks: any[] }) {
  const elements: React.ReactNode[] = [];
  let list: { type: 'ul' | 'ol'; items: React.ReactNode[] } | null = null;

  const flush = () => {
    if (list) {
      elements.push(
        React.createElement(list.type, { key: elements.length }, list.items)
      );
      list = null;
    }
  };

  blocks.forEach(block => {
    if (block.type === 'bulleted_list_item') {
      if (!list || list.type !== 'ul') {
        flush();
        list = { type: 'ul', items: [] };
      }
      list.items.push(renderBlock(block));
    } else if (block.type === 'numbered_list_item') {
      if (!list || list.type !== 'ol') {
        flush();
        list = { type: 'ol', items: [] };
      }
      list.items.push(renderBlock(block));
    } else {
      flush();
      elements.push(renderBlock(block));
    }
  });
  flush();

  return <>{elements}</>;
}

