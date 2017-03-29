import * as React from 'react';
import { CodeBlock } from '../../components/CodeBlock/CodeBlock';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { PageHeader } from '../../components/PageHeader/PageHeader';

const diagramStyles: any = require('./GetStartedPage.diagram.module.scss');
const styles: any = require('./GetStartedPage.module.scss');

export class GetStartedPage extends React.Component<any, any> {
  public render() {
    return (
      <div id='design'>
        <PageHeader
          pageTitle='Get started'
          links={
            [
              {
                'text': 'Design',
                'location': 'design'
              },
              {
                'text': 'Structure',
                'location': 'structure'
              },
              {
                'text': 'Fabric React',
                'location': 'react'
              },
              {
                'text': 'Fabric Core',
                'location': 'core'
              }
            ]
          }
          backgroundColor='#5c126b'
        />

        <div className={ styles.designSection }>
          <h2>Use our design language in your own experience</h2>
          <div className='ms-Grid ms-Grid--wide'>
            <div className='ms-Grid-row'>
              <div className={ css('ms-Grid-col ms-u-lg4', styles.feature) }>
                <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/get-started-styles.svg' } alt='Illustration of Typography and color swatches.' />
                <div className={ styles.title }>Styles</div>
                <div className={ styles.description }>Fabric gives you access to Segoe, Microsoft&rsquo;s official typeface, along with the color palette, type ramp, icons, and responsive grid for Office 365.</div>
              </div>
              <div className={ css('ms-Grid-col ms-u-lg4', styles.feature) }>
                <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/get-started-icons.svg' } alt='Illustration of Icons' />
                <div className={ styles.title }>Icons</div>
                <div className={ styles.description }>Fabric includes Office&rsquo;s official product icons. Fabric also provides a suite of product and document symbols, so you can use the same metaphors we use.</div>
              </div>
              <div className={ css('ms-Grid-col ms-u-lg4', styles.feature) }>
                <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/get-started-components.svg' } alt='Illustration of Components' />
                <div className={ styles.title }>Components</div>
                <div className={ styles.description }>Components are the building blocks of your UI. Fabric has a variety of components, including navigation, commands, containers, and content.</div>
              </div>
            </div>
          </div>
        </div>

        <div className={ styles.structureSection } id='structure'>
          <h2>Choose the version of Fabric that&rsquo;s right for you</h2>
          <div className={ diagramStyles.diagram }>
            <div className={ diagramStyles.core }>
              <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/diagram-core.svg' } />
              <div className={ diagramStyles.text }>
                <span className={ diagramStyles.headline }>Fabric Core Styles</span>
                <span className={ diagramStyles.description }>Core elements of the design language, including icons, colors, type, and grid</span>
                <a href='#/styles'>See styles</a>
              </div>
            </div>
            <div className={ diagramStyles.or }>or</div>
            <ul className={ diagramStyles.components }>
              <li className={ css(diagramStyles.component, diagramStyles.featuredComponent) }>
                <div className={ diagramStyles.graphics }>
                  <img className={ diagramStyles.componentImage } src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/diagram-components-many.svg' } width='175' height='90' alt='Illustrated Diagram of many components' />
                  <img className={ diagramStyles.coreImage } src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/diagram-core.svg' } alt='Illustrated representation of Fabric cores styles and libraries.' />
                </div>
                <div className={ diagramStyles.content }>
                  <span className={ diagramStyles.headline }>Fabric React</span>
                  <span className={ diagramStyles.description }>Robust, up-to-date components built with the React framework</span>
                  <a href='#/components'>See components</a>
                </div>
              </li>
              <li className={ diagramStyles.component }>
                <div className={ diagramStyles.graphics }>
                  <img className={ diagramStyles.componentImage } src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/diagram-components-few.svg' } width='175' height='90' alt='Illustrated Diagram of few components' />
                  <img className={ diagramStyles.coreImage } src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/diagram-core.svg' } alt='Illustrated representation of Fabric cores styles and libraries.' />
                </div>
                <div className={ diagramStyles.content }>
                  <span className={ diagramStyles.headline }>Fabric JS</span>
                  <span className={ diagramStyles.description }>Simple, visuals-focused components that you can extend, rework, and use</span>
                  <a href='#/fabric-js'>Learn more</a>
                </div>
              </li>
              <li className={ diagramStyles.component }>
                <div className={ diagramStyles.graphics }>
                  <img className={ diagramStyles.componentImage } src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/diagram-components-few.svg' } width='175' height='90' alt='Illustrated Diagram of few components' />
                  <img className={ diagramStyles.coreImage } src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/diagram-core.svg' } alt='Illustrated representation of Fabric cores styles and libraries.' />
                </div>
                <div className={ diagramStyles.content }>
                  <span className={ diagramStyles.headline }>AngularJS</span>
                  <span className={ diagramStyles.description }>Community-driven project to build components for Angular-based apps</span>
                  <a href='#/angular-js'>Learn more</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className={ styles.instructionsSection }>
          <h2 id='react'>Get started with Fabric React</h2>
          <p>Use NPM to get Fabric components and core styling. All you need is <a href='https://nodejs.org/en/'>node.js</a> and <a href='http://gulpjs.com/'>gulp</a>.</p>

          <ol className={ styles.steps }>
            <li>
              <p>To install the Fabric React NPM package, from the root of your project, run:</p>
              <CodeBlock language='bash' isLightTheme={ true }>
                {
                  `npm --save install office-ui-fabric-react`
                }
              </CodeBlock>
            </li>
            <li>
              <p>With office-ui-fabric-react as a dependency in your package.json file, you can now start using components and styling. To reference a component, import it and use it in your render method:</p>
              <CodeBlock language='javascript' isLightTheme={ true }>
                {
                  `import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from 'office-ui-fabric-react/lib/Button';

const MyPage = () => (<div><Button>I am a button.</Button></div>);

ReactDOM.render(<MyPage />, document.body.firstChild);`
                }
              </CodeBlock>
              <p>For more information about using components, check out the <a href='#/components/'>components page</a>.</p>
            </li>
            <li>
              <p>You can also reference type styles for any text element:</p>
              <CodeBlock language='html' isLightTheme={ true }>
                {
                  `<span class="ms-font-su ms-fontColor-themePrimary">Big blue text</span>`
                }
              </CodeBlock>
            </li>
            <li>
              <p>Reference icons by using the appropriate icon classes:</p>
              <CodeBlock language='html' isLightTheme={ true }>
                {
                  `<i class="ms-Icon ms-Icon--Mail" aria-hidden="true"></i>`
                }
              </CodeBlock>
              <p>Components, type, and icons are just a small part of what Fabric has to offer. To reference other assets, including colors, product symbols, and more, see the <a href='#/styles'>styles page</a>.</p>
            </li>
          </ol>

          <h3>Other ways to get Fabric React</h3>
          <p>For advanced scenarios or alternatives to NPM see the <a href='https://github.com/OfficeDev/office-ui-fabric-react/blob/master/ghdocs/ADVANCED.md'>advanced documentation in the Fabric React repository</a>.</p>

          <h3>Need a component Fabric React doesn&rsquo;t have?</h3>
          <p>Check the <a href='https://trello.com/b/hBP8XdvR/office-ui-fabric-react-requests'>Fabric React Trello board</a> and vote up the request so we can track it. If you don&rsquo;t see an existing card, please <a href='https://github.com/OfficeDev/office-ui-fabric-react/issues'>file an issue in the repository</a> and we&rsquo;ll add the card for you.</p>

          <h2 id='core'>Get started with Fabric Core</h2>
          <p>With one reference to our CDN, you can access Fabric&rsquo;s fonts, icons, type styles, colors, grid, and more.</p>

          <ol className={ styles.steps }>
            <li>
              <p>Add the following line to the &lt;head&gt; of your webpage:</p>
              <CodeBlock language='html' isLightTheme={ true }>
                {
                  `<link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/4.1.0/css/fabric.min.css">`
                }
              </CodeBlock>
            </li>
            <li>
              <p>Reference core Fabric styles:</p>
              <CodeBlock language='html' isLightTheme={ true }>
                {
                  `<span class="ms-font-su ms-fontColor-themePrimary">Big blue text</span>`
                }
              </CodeBlock>
              <p>To reference all the assets available in Fabric Core, see the <a href='#/styles'>styles page</a>. To use components, see <a href='#/get-started#react'>Fabric React</a>, <a href='#/fabric-js'>Fabric JS</a>, or <a href='#/angular-js'>ngOfficeUIFabric</a>.</p>
            </li>
          </ol>

          <h3>Other ways to get Fabric Core</h3>
          <p>You can <a href='https://github.com/OfficeDev/office-ui-fabric-core/releases'>download a copy of Fabric for your project</a> or <a href='https://github.com/OfficeDev/office-ui-fabric-core/blob/master/ghdocs/PACKAGES.md'>add it through a package manager</a>. You can also <a href='https://github.com/OfficeDev/office-ui-fabric-core/blob/master/ghdocs/BUILDING.md'>build your own copy from the source code</a>.</p>

          <h3>Need an icon or feature Fabric Core doesn&rsquo;t have?</h3>
          <p>Check the <a href='https://trello.com/b/sPTXiMzG/office-ui-fabric-core-requests'>Fabric Core Trello board</a> and vote up the request so we can track it. If you don&rsquo;t see an existing card, please <a href='https://github.com/OfficeDev/office-ui-fabric-core/issues'>file an issue in the repository</a> and we&rsquo;ll add the card for you.</p>
        </div>

        <p>Usage of Fabric assets, such as fonts and icons, is subject to the <a href='https://static2.sharepointonline.com/files/fabric/assets/license.txt'>assets license agreement</a>.</p>

      </div>
    );
  }

}
