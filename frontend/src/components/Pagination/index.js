import React from 'react';

import PropTypes from 'prop-types';

import {
  MdChevronLeft,
  MdChevronRight,
  MdFirstPage,
  MdLastPage,
} from 'react-icons/md';

import { Container, ActivePage, PageLink, PageMove } from './styles';

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

  const previousPage = AddLeft(pages) ? pages[0] : null;

  const nextPage = AddRight(pages) ? pages[pages.length - 1] : null;

  for (let i = 1; i < range && AddLeft(pages); i += 1);

  for (let i = 1; i < range && AddRight(pages); i += 1);

  while (pages.length < max && (AddLeft(pages) || AddRight(pages)));

  function handleClick(p) {
    onChange(p);
  }

  const size = 20;

  return (
    <Container>
      <div>
        <span>Páginas: </span>

        {pages[0].index > 1 ? (
          <PageMove
            key="first"
            onClick={() => handleClick({ ...page, index: 1 })}
          >
            <MdFirstPage size={size} />
          </PageMove>
        ) : (
          <></>
        )}

        {previousPage ? (
          <PageMove
            key="previousPage"
            onClick={() => handleClick(previousPage)}
          >
            <MdChevronLeft size={size} />
          </PageMove>
        ) : (
          <></>
        )}
      </div>
      <div>
        {pages.map(p =>
          p === page ? (
            <ActivePage key={p.index}>{p.index}</ActivePage>
          ) : (
            <PageLink key={p.index} onClick={() => handleClick(p)}>
              {p.index}
            </PageLink>
          )
        )}
      </div>
      <div>
        {nextPage ? (
          <PageMove key="nextPage" onClick={() => handleClick(nextPage)}>
            <MdChevronRight size={size} />
          </PageMove>
        ) : (
          <></>
        )}

        {pages[pages.length - 1].index < page.total ? (
          <PageMove
            key="last"
            onClick={() => handleClick({ ...page, index: page.total })}
          >
            <MdLastPage size={size} />
          </PageMove>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
}

Pagination.propTypes = {
  page: PropTypes.shape({
    total: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
