import * as React from 'react';
import { BaseComponent } from '../../Utilities';

export interface IRouterProps {
  replaceState?: boolean;
  children?: React.ReactElement<any>[];
  onNewRouteLoaded?: () => void;
}

export class Router extends BaseComponent<IRouterProps, {}> {
  public componentDidMount() {
    this._events.on(window, 'hashchange', () => this.forceUpdate());
  }

  public render() {
    return (
      <div>
        { this._resolveRoute() }
      </div>
    );
  }

  private _getPath() {
    let path = location.hash;
    let index = path.lastIndexOf('#');

    if (index > 0) {
      path = path.substr(0, index);
    }

    return path;
  }

  private _resolveRoute(path?: string, children?: React.ReactNode) {
    path = path || this._getPath();
    children = children || this.props.children;

    let routes = React.Children.toArray(children);

    for (let i = 0; i < routes.length; i++) {
      let route: any = routes[i];

      if (_match(path, route)) {
        let { component, getComponent } = route.props;

        if (getComponent) {
          let asynchronouslyResolved = false;

          if (getComponent.component) {
            component = getComponent.component;
          } else {
            getComponent((resolved) => {
              component = getComponent.component = resolved;

              if (asynchronouslyResolved) {
                this.forceUpdate();
              }
            });
          }
          // Note: in webpack 2, this ends up always async.
          asynchronouslyResolved = true;
        }

        if (component) {
          let componentChildren = this._resolveRoute(path, route.props.children || []);

          if (componentChildren) {
            return React.createElement(component, { key: route.key }, componentChildren);
          } else {
            return React.createElement(component, { key: route.key });
          }
        } else if (getComponent) {
          // We are asynchronously fetching this component.
          return null;
        }
      }
    }

    return null;
  }

}

function _match(currentPath, child): boolean {
  if (child.props) {
    let { path } = child.props;

    path = path || '';
    currentPath = currentPath || '';

    return (
      (!path) ||
      (path.toLowerCase() === currentPath.toLowerCase())
    );
  }

  return false;
}
