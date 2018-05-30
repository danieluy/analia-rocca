import React from 'react';
import { Link, Route } from 'react-router-dom';

const Breadcrumbs = () => (
  <Route
    path="*"
    render={({ match }) => {
      const steps = match.url
        .split('/')
        .filter(step => step !== '')
        .reduce((fullPaths, step) => {
          const pathName = step;
          const prev = fullPaths[fullPaths.length - 1];
          const fullPath = prev ? `${prev.fullPath}/${step}` : `/${step}`;
          fullPaths.push({ pathName, fullPath });
          return fullPaths;
        }, []);
      if (steps.length > 0)
        return (
          <div className="breadcrumbs">
            <div className="slash">/</div>
            <Link to="/">inicio</Link>
            {steps.map(step => (
              <React.Fragment key={`step${step.pathName}`}>
                <div className="slash">/</div>
                <Link to={`${step.fullPath}`}>{step.pathName}</Link>
              </React.Fragment>
            ))}
          </div>
        );
      return null;
    }}
  />
);

export default Breadcrumbs;
