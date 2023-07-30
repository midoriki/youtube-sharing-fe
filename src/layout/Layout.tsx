import { AppShell } from '@mantine/core';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Share from '@pages/Share';
import Header from '@layout/Header';

export default function Layout () {
  return (
    <AppShell
      header={<Header />}
    >
      <Routes>
        <Route path={'/'}>
          <Route index element={<Home />} />
          <Route path={'/share'} element={<Share />} />
        </Route>
      </Routes>
    </AppShell>
  );
}