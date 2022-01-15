/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import type { NextPage } from 'next';
import Button from '../src/components/Button';

const Home: NextPage = () => {
  return (
    <div>
      <h1>Table tennis ranking system</h1>
      <Button>Nice button</Button>
    </div>
  );
};

export default Home;
