import * as React from 'react';

export interface INav {
  /**
   * The meta 'key' property of the currently selected NavItem of the Nav. Can return
   * undefined if the currently selected nav item has no populated key property. Be aware
   * that in order for Nav to properly understand which key is selected all NavItems in
   * all groups of the Nav must have populated key properties.
   */
  selectedKey: string;
}

export interface INavProps {
  /**
   * A collection of link groups to display in the navigation bar
   */
  groups: INavLinkGroup[];

  /**
   * Used to customize how content inside the link tag is rendered
   * @defaultvalue Default link rendering
   */
  onRenderLink?: Function;

  /**
   * Function callback invoked when a link in the navigation is clicked
   */
  onLinkClick?: (ev?: React.MouseEvent) => void;

  /**
   * Indicates whether the navigation component renders on top of other content in the UI
   */
  isOnTop?: boolean;

  /**
   * (Optional) The key of the nav item initially selected.
   */
  initialSelectedKey?: string;
  /**
   * (Optional) The nav container aria label.
   */
  ariaLabel?: string;
}

export interface INavLinkGroup {
  /**
   * Text to render as the header of a group
   */
  name?: string;

  /**
   * Links to render within this group
   */
  links: INavLink[];

  /**
   * The name to use for functional automation tests
   */
  automationId?: string;
}

export interface INavLink {
  /**
   * Text to render for this link
   */
  name: string;

  /**
   * URL to navigate to for this link
   */
  url: string;

  /**
   * Child links to this link, if any
   */
  links?: INavLink[];

  /**
   * Classname to apply to the icon.
   */
  iconClassName?: string;

  /**
   * The name of the item to be used in logging engagement data
   */
  engagementName?: string;

  /**
   * The alt text for the item
   */
  altText?: string;

  /**
   * The name to use for functional automation tests
   */
  automationId?: string;

  /**
   * Whether or not the link is in an expanded state
   */
  isExpanded?: boolean;

  /**
   * Aria label for nav link
   */
  ariaLabel?: string;

  /**
   * Meta info for the link, does not involving rendering.
   */
  key?: string;

  /**
   * title for tooltip or description
   */
  title?: string;

  /**
   * Link <a> target.
   */
  target?: string;

  /**
   * Any additional properties to apply to the rendered links.
   */
  [propertyName: string]: any;
}
