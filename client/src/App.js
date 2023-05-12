import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { adminRoutes, publicRoutes, staffRoutes } from './routes';
import { DefaultLayout } from './layouts';
import config from './config';
import { Error } from '~/pages/Public';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          <Route path="/error" element={<Error />} />
          {staffRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  localStorage.getItem('Role') === 'STAFF' ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Navigate to={config.routes.login}></Navigate>
                  )
                }
              />
            );
          })}
          {adminRoutes.map((route, index) => {
            const Page = route.component;

            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  localStorage.getItem('Role') === 'ADMIN' ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Navigate to={config.routes.login}></Navigate>
                  )
                }
              />
            );
          })}
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
