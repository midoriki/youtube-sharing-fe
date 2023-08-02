import { AppShell } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Share from '@pages/Share';
import Header from '@layout/Header';
import { useProfileStore } from '@lib/stores/ProfileStore';
import NotFound from '@pages/404';

export default function Layout () {
  const user = useProfileStore((state) => state.user);
  return (
    <AppShell
      header={<Header />}
    >
      <Routes>
        <Route path={'/'}>
          <Route index element={<Home />} />
          {user ? <Route path={'/share'} element={<Share />} /> : null}
        </Route>
        <Route index path='/*' element={<NotFound />} />
      </Routes>
    </AppShell>
  );
}