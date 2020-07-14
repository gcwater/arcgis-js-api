/**
 * The Expand widget acts as a clickable button for opening a widget.
 *
 * @module esri/widgets/Expand
 * @since 4.3
 *
 * @see [Expand.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/Expand.tsx)
 * @see [Expand.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_Expand.scss)
 * @see [Sample - Expand widget](../sample-code/widgets-expand/index.html)
 * @see module:esri/widgets/Expand/ExpandViewModel
 * @see module:esri/views/ui/DefaultUI
 *
 * @example
 * // LayerList
 * layerList = new LayerList({
 *   container: document.createElement("div"),
 *   view: view
 * });
 * layerListExpand = new Expand({
 *   expandIconClass: "esri-icon-layer-list",  // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
 *   // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
 *   view: view,
 *   content: layerList.domNode
 * });
 * view.ui.add(layerListExpand, "top-right");
 */

// esri.core.accessorSupport
import { aliasOf, property, subclass } from "esri/core/accessorSupport/decorators";

// esri.t9n
import CommonMessages from "esri/t9n/common";

// esri.views
import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");

// esri.widgets
import Widget = require("esri/widgets/Widget");

// esri.widgets.Expand
import ExpandViewModel = require("esri/widgets/Expand/ExpandViewModel");

// esri.widgets.Expand.t9n
import ExpandMessages from "esri/widgets/Expand/t9n/Expand";

// esri.widgets.support
import { VNode } from "esri/widgets/support/interfaces";
import {
  accessibleHandler,
  isWidget,
  hasDomNode,
  renderable,
  tsx,
  DomNodeOwner,
  messageBundle
} from "esri/widgets/support/widget";

type ContentSource = string | HTMLElement | Widget | DomNodeOwner;

const CSS = {
  base: "esri-expand esri-widget",
  modeAuto: "esri-expand--auto",
  modeDrawer: "esri-expand--drawer",
  modeFloating: "esri-expand--floating",
  container: "esri-expand__container",
  containerExpanded: "esri-expand__container--expanded",
  panel: "esri-expand__panel",
  button: "esri-widget--button",
  text: "esri-icon-font-fallback-text",
  icon: "esri-collapse__icon",
  iconExpanded: "esri-expand__icon--expanded",
  iconNumber: "esri-expand__icon-number",
  iconNumberExpanded: "esri-expand__icon-number--expanded",
  expandIcon: "esri-icon-expand",
  collapseIcon: "esri-icon-collapse",
  content: "esri-expand__content",
  contentExpanded: "esri-expand__content--expanded",
  expandMask: "esri-expand__mask",
  expandMaskExpanded: "esri-expand__mask--expanded"
};

@subclass("esri.widgets.Expand")
class Expand extends Widget {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * @constructor
   * @alias module:esri/widgets/Expand
   * @extends module:esri/widgets/Widget
   * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
   *                                that may be passed into the constructor.
   */
  constructor(params?: any, parentNode?: string | Element) {
    super(params, parentNode);
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  @property({
    readOnly: true,
    dependsOn: ["id"]
  })
  @renderable()
  protected get contentId(): string {
    return `${this.id}_controls_content`;
  }

  @property({
    readOnly: true,
    dependsOn: ["expanded", "messagesCommon", "collapseTooltip", "expandTooltip"]
  })
  @renderable()
  protected get expandTitle(): string {
    const { expanded, messagesCommon, collapseTooltip, expandTooltip } = this;

    return expanded
      ? collapseTooltip || messagesCommon.collapse
      : expandTooltip || messagesCommon.expand;
  }

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  autoCollapse
  //----------------------------------

  /**
   * Automatically collapses the expand widget instance when the view's
   * {@link module:esri/views/View#viewpoint viewpoint} updates.
   *
   * @name autoCollapse
   * @instance
   * @type {boolean}
   * @default false
   */
  @aliasOf("viewModel.autoCollapse")
  autoCollapse: boolean = null;

  //----------------------------------
  //  collapseIconClass
  //----------------------------------

  /**
   * Icon font used to style the Expand button.
   *
   * @see [Guide - Esri Icon Font](../guide/esri-icon-font/index.html)
   *
   * @since 4.4
   * @name collapseIconClass
   * @instance
   * @type {string}
   */
  @property({
    dependsOn: ["content"]
  })
  @renderable()
  get collapseIconClass(): string {
    return CSS.collapseIcon;
  }
  set collapseIconClass(value: string) {
    if (!value) {
      this._clearOverride("collapseIconClass");
      return;
    }

    this._override("collapseIconClass", value);
  }

  //----------------------------------
  //  collapseTooltip
  //----------------------------------

  /**
   * Tooltip to display to indicate Expand widget can be collapsed.
   *
   * @name collapseTooltip
   * @instance
   * @type {string}
   * @default "Collapse" (English locale)
   */
  @property()
  @renderable()
  collapseTooltip: string = "";

  //----------------------------------
  //  content
  //----------------------------------

  /**
   * The content to display within the expanded Expand widget.
   *
   * @example
   * // A. specify content with a widget
   *    var searchWidget = new Search({
   *      view: view
   *    });
   *
   *    var expand = new Expand({
   *      expandIconClass: "esri-icon-search",
   *      view: view,
   *      content: searchWidget
   *    });
   *    view.ui.add(expand, "bottom-left");
   *
   * @example
   * // B. specify content with a string (of HTML)
   *    content: "Hi, I can have <input placeholder='HTML'/>!"
   *
   * @example
   * // C. specify content with a DOM node
   *    var node = domConstruct.create("div", {
   *      innerHTML: "I'm a real node!"
   *    });
   *
   *    var expand = new Expand({
   *      expandIconClass: "esri-icon-right-arrow",
   *      view: view,
   *      content: node
   *    });
   *    view.ui.add(expand, "top-right");
   *
   * @name content
   * @instance
   * @type {Node | string | module:esri/widgets/Widget}
   */
  @property()
  @renderable()
  content: ContentSource = "";

  //----------------------------------
  //  expanded
  //----------------------------------

  /**
   * Indicates whether the widget is currently expanded or not.
   *
   * @name expanded
   * @instance
   * @type {boolean}
   * @default false
   */
  @aliasOf("viewModel.expanded")
  @renderable()
  expanded: boolean = null;

  //----------------------------------
  //  expandIconClass
  //----------------------------------

  /**
   * Icon font used to style the Expand button.
   * Will automatically use the [content's](#content) iconClass if it has one.
   *
   * @see [Guide - Esri Icon Font](../guide/esri-icon-font/index.html)
   *
   * @name expandIconClass
   * @instance
   * @type {string}
   */
  @property({
    dependsOn: ["content"]
  })
  @renderable()
  get expandIconClass(): string {
    return isWidget(this.content) ? this.content.iconClass : CSS.expandIcon;
  }
  set expandIconClass(value: string) {
    if (!value) {
      this._clearOverride("expandIconClass");
      return;
    }

    this._override("expandIconClass", value);
  }

  //----------------------------------
  //  expandTooltip
  //----------------------------------

  /**
   * Tooltip to display to indicate Expand widget can be expanded.
   *
   * @name expandTooltip
   * @instance
   * @type {string}
   * @default "Expand" (English locale)
   */
  @property()
  @renderable()
  expandTooltip: string = "";

  //----------------------------------
  //  group
  //----------------------------------

  /**
   * This value associates two or more Expand widget instances with each other, allowing one
   * instance to auto collapse when another instance in the same group is expanded. For auto collapsing
   * to take effect, all instances of the group must be included in the {@link module:esri/views/View#ui view.ui}.
   *
   * For example, if you place multiple Expand instances in the top-left of the view's ui, you can assign them to a
   * group called `top-left`. If one Expand instance is expanded and the user clicks on a different instance in the
   * `top-left` group, then the first instance is collapsed, allowing the content of the second instance to be
   * fully visible.
   *
   * @name group
   * @instance
   * @since 4.6
   * @type {string}
   *
   * @example
   * var expand1 = new Expand({
   *   view: view,
   *   content: document.getElementById("bg-gallery"),
   *   expandIconClass: "esri-icon-basemap",
   *   group: "bottom-right"
   * });
   * var expand2 = new Expand({
   *   view: view,
   *   content: document.getElementById("legend"),
   *   expandIconClass: "esri-icon-key",
   *   group: "bottom-right"
   * });
   *
   * view.ui.add([expand1, expand2], "bottom-right");
   */
  @aliasOf("viewModel.group")
  group: string = null;

  //----------------------------------
  //  iconNumber
  //----------------------------------

  /**
   * A number to display at the corner of the widget to indicate the number of, for example, open issues or unread notices.
   *
   * ![expand widget icon number](../../assets/img/apiref/widgets/expand-with-iconnumber.png)
   *
   * @name iconNumber
   * @instance
   * @type {number}
   */
  @property()
  @renderable()
  iconNumber: number = 0;

  //----------------------------------
  //  label
  //----------------------------------

  /**
   * The widget's default label.
   *
   * @name label
   * @instance
   * @type {string}
   */
  @property({
    aliasOf: { source: "messages.widgetLabel", overridable: true }
  })
  label: string = undefined;

  //----------------------------------
  //  messages
  //----------------------------------

  /**
   * The widget's message bundle
   *
   * @instance
   * @name messages
   * @type {Object}
   *
   * @ignore
   * @todo revisit doc
   */
  @property()
  @renderable()
  @messageBundle("esri/widgets/Expand/t9n/Expand")
  messages: ExpandMessages = null;

  //----------------------------------
  //  messagesCommon
  //----------------------------------

  /**
   * @name messagesCommon
   * @instance
   * @type {Object}
   *
   * @ignore
   * @todo intl doc
   */
  @property()
  @renderable()
  @messageBundle("esri/t9n/common")
  messagesCommon: CommonMessages = null;

  //----------------------------------
  //  mode
  //----------------------------------

  /**
   * The mode in which the widget displays. These modes are listed below.
   *
   * mode | description
   * ---------------|------------
   * auto | This is the default mode. It is responsive to browser size changes and will update based on whether the widget is viewed in a desktop or mobile application.
   * floating | Use this mode if you wish to always display the widget as floating regardless of browser size.
   * drawer | Use this mode if you wish to always display the widget in a panel regardless of browser size.
   *
   * @name mode
   * @instance
   * @since 4.7
   * @default "auto"
   * @type {"auto" | "floating" | "drawer"}
   */
  @property()
  @renderable()
  mode: "auto" | "floating" | "drawer" = "auto";

  //----------------------------------
  //  view
  //----------------------------------

  /**
   * A reference to the {@link module:esri/views/MapView} or {@link module:esri/views/SceneView}. Set this to link the widget to a specific view.
   *
   * @name view
   * @instance
   * @type {(module:esri/views/MapView | module:esri/views/SceneView)}
   */
  @aliasOf("viewModel.view")
  @renderable()
  view: MapView | SceneView = null;

  //----------------------------------
  //  viewModel
  //----------------------------------

  /**
   * The view model for this widget. This is a class that contains all the logic
   * (properties and methods) that controls this widget's behavior. See the
   * {@link module:esri/widgets/Expand/ExpandViewModel} class to access
   * all properties and methods on the widget.
   *
   * @name viewModel
   * @instance
   * @type {module:esri/widgets/Expand/ExpandViewModel}
   * @autocast
   */
  @property({
    type: ExpandViewModel
  })
  @renderable("viewModel.state")
  viewModel: ExpandViewModel = new ExpandViewModel();

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Expand the widget.
   *
   * @method
   */
  public expand(): void {
    this.viewModel.expanded = true;
  }

  /**
   * Collapse the widget.
   *
   * @method
   */
  public collapse(): void {
    this.viewModel.expanded = false;
  }

  /**
   * Toggle the widget by expanding it if it's collapsed, or collapsing it if it's expanded.
   *
   * @method
   */
  public toggle(): void {
    this.viewModel.expanded = !this.viewModel.expanded;
  }

  render(): VNode {
    const { mode } = this;

    const baseClasses = {
      [CSS.modeAuto]: mode === "auto",
      [CSS.modeDrawer]: mode === "drawer",
      [CSS.modeFloating]: mode === "floating"
    };

    return (
      <div class={this.classes(CSS.base, baseClasses)}>
        {this.renderMask()}
        {this.renderContainer()}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Protected Methods
  //
  //--------------------------------------------------------------------------

  protected renderContainer(): VNode {
    const { expanded } = this;

    const containerExpanded = {
      [CSS.containerExpanded]: expanded
    };

    return (
      <div class={this.classes(CSS.container, containerExpanded)}>
        {this.renderPanel()}
        {this.renderContent()}
      </div>
    );
  }

  protected renderMask(): VNode {
    const { expanded } = this;

    const maskClasses = {
      [CSS.expandMaskExpanded]: expanded
    };

    return (
      <div bind={this} onclick={this._toggle} class={this.classes(CSS.expandMask, maskClasses)} />
    );
  }

  protected renderBadgeNumber(): VNode {
    const { expanded, iconNumber } = this;

    return iconNumber && !expanded ? (
      <span key={"expand__icon-number"} class={CSS.iconNumber}>
        {iconNumber}
      </span>
    ) : null;
  }

  protected renderPanelNumber(): VNode {
    const { iconNumber, expanded } = this;

    return iconNumber && expanded ? (
      <span
        key={"expand__expand-icon-number"}
        class={this.classes(CSS.iconNumber, CSS.iconNumberExpanded)}
      >
        {iconNumber}
      </span>
    ) : null;
  }

  protected renderIcon(): VNode {
    const { collapseIconClass, expandIconClass, expanded } = this;

    const expandIconClasses = {
      [CSS.iconExpanded]: expanded,
      [collapseIconClass]: expanded,
      [expandIconClass]: !expanded
    };

    if (collapseIconClass === expandIconClass) {
      expandIconClasses[collapseIconClass] = true;
    }

    return <span aria-hidden="true" class={this.classes(CSS.icon, expandIconClasses)} />;
  }

  protected renderTitle(): VNode {
    return <span class={CSS.text}>{this.expandTitle}</span>;
  }

  protected renderExpandButton(): VNode {
    const { expanded, expandTitle, contentId } = this;

    return (
      <div
        bind={this}
        onclick={this._toggle}
        onkeydown={this._toggle}
        aria-controls={contentId}
        aria-expanded={expanded ? "true" : "false"}
        title={expandTitle}
        role="button"
        tabindex="0"
        class={CSS.button}
      >
        {this.renderBadgeNumber()}
        {this.renderIcon()}
        {this.renderTitle()}
      </div>
    );
  }

  protected renderPanel(): VNode {
    return (
      <div class={CSS.panel}>
        {this.renderExpandButton()}
        {this.renderPanelNumber()}
      </div>
    );
  }

  protected renderContent(): VNode {
    const { expanded, contentId } = this;

    const contentClasses = {
      [CSS.contentExpanded]: expanded
    };

    return (
      <div id={contentId} role="region" class={this.classes(CSS.content, contentClasses)}>
        {this.renderContentContainer()}
      </div>
    );
  }

  protected renderContentContainer(): VNode {
    const content = this.content;

    if (typeof content === "string") {
      return <div innerHTML={content} />;
    }

    if (isWidget(content)) {
      return content.render();
    }

    if (content instanceof HTMLElement) {
      return <div bind={content} afterCreate={this._attachToNode} />;
    }

    if (hasDomNode(content)) {
      return <div bind={content.domNode} afterCreate={this._attachToNode} />;
    }

    return null;
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  @accessibleHandler()
  private _toggle(): void {
    this.toggle();
  }

  private _attachToNode(this: HTMLElement, node: HTMLElement): void {
    const content: HTMLElement = this;
    node.appendChild(content);
  }
}

export = Expand;