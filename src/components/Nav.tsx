/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import Link from 'next/link';

const Nav = () => (
  <header sx={{ height: '60px', width: '100vw', bg: 'primary', borderBottom: '1px solid', borderColor: 'primary' }}>
    <nav
      sx={{
        display: 'flex',
        alignItems: 'center',
        variant: 'containers.page',
        height: '100%',
        '> *': {
          marginLeft: '2rem',
        },
      }}
    >
      <p sx={{ fontSize: '30px' }}>🏓</p>
      <Link href="/">
        <a sx={{ fontWeight: 'bold', fontSize: 4, cursor: 'pointer' }}>Home</a>
      </Link>

      <Link href="/players">
        <a sx={{ color: 'text', fontSize: 3, cursor: 'pointer' }}>Players</a>
      </Link>

      <Link href="/matches">
        <a sx={{ color: 'text', fontSize: 3, cursor: 'pointer' }}>Matches</a>
      </Link>
    </nav>
  </header>
);

export default Nav;
