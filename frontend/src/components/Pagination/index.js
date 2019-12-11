import React from 'react';

import { Container, ActivePage, PageLink } from './styles';

function AddLeft(pages) {
  const page = pages[0];

  if (page.index > 1) {
    pages.unshift({ ...page, index: page.index - 1 });

    return true;
  }

  return false;
}

function AddRight(pages) {
  const page = pages[pages.length - 1];

  if (page.index < page.total) {
    pages.push({ ...page, index: page.index + 1 });

    return true;
  }

  return false;
}

export default function Pagination({ page, onChange }) {
  if (page.total < 2) return <></>;

  const range = 4;
  const max = range * 2 + 1;

  const pages = [page];

  for (let i = 0; i < range && AddLeft(pages); i += 1);

  for (let i = 0; i < range && AddRight(pages); i += 1);

  while (pages.length < max && (AddLeft(pages) || AddRight(pages)));

  function handleClick(p) {
    onChange(p);
  }

  return (
    <Container>
      <span>Páginas: </span>
      {pages.map(p =>
        p === page ? (
          <ActivePage key={p.index}>{p.index}</ActivePage>
        ) : (
          <PageLink type="button" key={p.index} onClick={() => handleClick(p)}>
            {p.index}
          </PageLink>
        )
      )}
    </Container>
  );
}
