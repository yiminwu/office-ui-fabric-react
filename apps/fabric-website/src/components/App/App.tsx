import * as React from 'react';
import './App.scss';
import { AppState } from './AppState';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { Fabric } from 'office-ui-fabric-react/lib/components/Fabric';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Nav } from '../Nav/Nav';

export interface IAppProps extends React.Props<App> {
}

export interface IAppState {
  isNavOpen: boolean;
}

export class App extends React.Component<IAppProps, any> {

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      isNavOpen: false
    };
  }

  public render() {
    let { isNavOpen } = this.state;

    let toggleIcon;
    let siteTitle;
    if (isNavOpen) {
      toggleIcon = <i className='ms-Icon ms-Icon--ChromeClose'></i>;
      siteTitle = '';
    } else {
      toggleIcon = <i className='ms-Icon ms-Icon--GlobalNavButton'></i>;
      siteTitle = <div className='siteTitle'>Fabric</div>;
    }

    return (
      <Fabric className={ css('App',
        { 'is-navOpen': isNavOpen }
      ) }>
        <Header />
        <div className='App-wrapper'>
          <div className='App-mobileNavBar'>
            <button className='menuButton' onClick={ this._onNavToggleClicked.bind(this) }>
              { toggleIcon }
            </button>
            { siteTitle }
          </div>
          <div className='App-mobileNavOverlay' onClick={ this._onOverlayClicked.bind(this) }></div>
          <div className='App-nav'>
            <Nav pages={ AppState.pages } onLinkClick={ this._onNavItemClicked.bind(this) } />
          </div>
          <div className='App-content' data-is-scrollable='true'>
            { this.props.children }
          </div>
        </div>
        <Footer />
      </Fabric>
    );
  }

  private _onNavToggleClicked(ev: MouseEvent) {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  private _onOverlayClicked(ev: MouseEvent) {
    this.setState({
      isNavOpen: false
    });
  }

  private _onNavItemClicked(ev: MouseEvent) {
    this.setState({
      isNavOpen: false
    });
  }
}
