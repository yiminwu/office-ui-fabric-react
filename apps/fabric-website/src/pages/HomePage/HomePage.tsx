import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
const styles: any = require('./HomePage.module.scss');

const packageData = require('json!../../../package.json');

export class HomePage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <div className={ styles.hero }>
          <h1 className={ styles.title }>Office UI Fabric</h1>
          <span className={ styles.tagline }>The official front-end framework for building experiences that fit seamlessly into Office and Office 365.</span>
          <a href='#/get-started' className={ css(styles.button, styles.primaryButton) }>Get started</a>
          <span className={ styles.version }>Fabric Core { packageData.dependencies['office-ui-fabric-core'] } and Fabric React { packageData.dependencies['office-ui-fabric-react'] }</span>
        </div>

        <div className={ styles.flavors }>
          <div className={ styles.flavor }>
            <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/logo-js-white.svg' } width='48' height='48' alt='Javascript logo' />
            <span className={ styles.flavorTitle }>Fabric JS</span>
            <span className={ styles.flavorDescription }>Lightweight and simple components in vanilla JavaScript</span>
            <a href='#/fabric-js'>Learn more</a>
          </div>
          <div className={ styles.flavor }>
            <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/logo-react.svg' } width='72' height='64' alt='React logo' />
            <span className={ styles.flavorTitle }>Built with React</span>
            <span className={ styles.flavorDescription }>Fabric&rsquo;s robust, up-to-date components are built with React</span>
            <a href='#/components' className={ styles.button }>See components</a>
          </div>
          <div className={ styles.flavor }>
            <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/logo-angular-white.svg' } width='48' height='48' alt='Angular JS Logo' />
            <span className={ styles.flavorTitle }>AngularJS</span>
            <span className={ styles.flavorDescription }>Community-driven project for Angular apps</span>
            <a href='#/angular-js'>Learn more</a>
          </div>
          <div className={ styles.flavor }>
            <span className={ styles.flavorTitle }>Fabric iOS</span>
            <span className={ styles.flavorDescription }>Native iOS styling and components written in Swift</span>
            <a href='#/fabric-ios'>Learn more</a>
          </div>
        </div>

        <div className={ css(styles.product, styles.productSharepoint) }>
          <div>
            <span className={ styles.productTitle }>SharePoint</span>
            <span className={ styles.productDescription }>New SharePoint experiences are built with Fabric and the SharePoint Framework comes with it baked in to make things simple. <a href='https://dev.office.com/sharepoint/docs/spfx/web-parts/get-started/use-fabric-react-components'>Learn more</a></span>
          </div>
          <img className={ styles.productImage } src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/home-sharepoint.svg' } width='496' height='300' alt='Illustrated representation of the sharepoint page.' />
        </div>

        <div className={ css(styles.product, styles.productAddins) }>
          <div>
            <span className={ styles.productTitle }>Office Add-ins</span>
            <span className={ styles.productDescription }>Fabric is the official UX design framework for Office Add-ins. With Fabric, add-ins blend seamlessly with Word, Excel, PowerPoint, and Outlook. <a href='http://dev.office.com/docs/add-ins/design/add-in-design'>Learn more</a></span>
          </div>
          <img className={ styles.productImage } src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/home-addins.svg' } width='496' height='300' alt='Illustrated representation of an office add-in.' />
        </div>

        <div className={ styles.featured }>
          <span className={ styles.featuredTitle }>Highlights</span>
          <span className={ styles.featuredDescription }>Fabric offers a variety of UI elements to help you create an experience that delights users and complements Office 365.</span>
          <ul className={ styles.featureList } aria-label='List of highlighted features'>
            <li>
              <a href='#/styles/icons'>
                <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/home-highlights-icons.svg' } width='240' height='112' alt='Illustrations of <icons className=""></icons>' />
                <span>Icons</span>
              </a>
            </li>
            <li>
              <a href='#/styles/typography'>
                <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/home-highlights-typography.svg' } width='240' height='112' alt='Illustration of different font weights.' />
                <span>Typography</span>
              </a>
            </li>
            <li>
              <a href='#/styles/brand-icons'>
                <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/home-highlights-brand.svg' } width='240' height='112' alt='Word, Excel, OneNote, PowerPoint icons.' />
                <span>Brand icons</span>
              </a>
            </li>
            <li>
              <a href='#/components/button'>
                <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/home-highlights-buttons.svg' } width='240' height='112' alt='Illustrated representation of buttons.' />
                <span>Buttons</span>
              </a>
            </li>
          </ul>
          <span className={ styles.trademark }>All trademarks are the property of their respective owners. Usage of Fabric assets, such as fonts and icons, is subject to the <a href='https://static2.sharepointonline.com/files/fabric/assets/license.txt'>assets license agreement</a>.</span>
        </div>
      </div>
    );
  }

}
