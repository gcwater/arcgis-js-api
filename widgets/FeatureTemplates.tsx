/**
 * The FeatureTemplates widget is part of the overall editing workflow. Its main purpose is to display
 * {@link module:esri/layers/FeatureLayer#templates templates} from one or more {@link module:esri/layers/FeatureLayer feature layers}.
 * In addition to displaying feature layer templates, it is also possible to [filter](#filterFunction) and [group](#groupBy) templates
 * for an easier editing experience. The widget listens for an end user to select a specific {@link esri/widgets/FeatureTemplates/TemplateItem template}
 * in the widget. Its [select](#event-select)
 * event is fired and the resulting template information is returned. This widget can be used in conjunction with
 * {@link module:esri/layers/FeatureLayer#applyEdits FeatureLayer.applyEdits} to enable an end user to
 * update one of its feature layers.
 *
 * [![featureTemplates](../assets/img/apiref/widgets/featureTemplates.png)](../sample-code/editing-applyedits/index.html)
 *
 *
 * @module esri/widgets/FeatureTemplates
 * @since 4.10
 *
 * @see [FeatureTemplates.tsx (widget view)]({{ JSAPI_ARCGIS_JS_API_URL }}/widgets/FeatureTemplates.tsx)
 * @see [FeatureTemplates.scss]({{ JSAPI_ARCGIS_JS_API_URL }}/themes/base/widgets/_FeatureTemplates.scss)
 * @see [Sample - Update FeatureLayer using ApplyEdits](../sample-code/editing-applyedits/index.html)
 * @see module:esri/widgets/FeatureTemplates/FeatureTemplatesViewModel
 * @see module:esri/widgets/FeatureTemplates/TemplateItem
 * @see module:esri/widgets/FeatureTemplates/TemplateItemGroup
 * @see module:esri/views/ui/DefaultUI
 * @see module:esri/layers/FeatureLayer
 * @see module:esri/layers/support/FeatureTemplate
 *
 * @example
 * const templates = new FeatureTemplates({
 *   container: "templatesDiv",
 *   layers: layers
 * });
 */

// esri.core
import { HandleOwnerMixin } from "esri/core/HandleOwner";
import { init } from "esri/core/watchUtils";

// esri.core.accessorSupport
import { aliasOf, cast, property, subclass } from "esri/core/accessorSupport/decorators";

// esri.layers
import FeatureLayer from "esri/layers/FeatureLayer";

// esri.libs
import { VNode } from "esri/libs/maquette";

// esri.widgets
import Widget from "esri/widgets/Widget";

// esri.widgets.FeatureTemplates
import FeatureTemplatesViewModel from "esri/widgets/FeatureTemplates/FeatureTemplatesViewModel";
import { Filter, GroupByType } from "esri/widgets/FeatureTemplates/interfaces";
import { ItemList } from "esri/widgets/FeatureTemplates/ItemList";
import TemplateItem from "esri/widgets/FeatureTemplates/TemplateItem";
import TemplateItemGroup from "esri/widgets/FeatureTemplates/TemplateItemGroup";

// esri.widgets.FeatureTemplates.t9n
import FeatureTemplatesMessages from "esri/widgets/FeatureTemplates/t9n/FeatureTemplates";

// esri.widgets.support
import { HeadingLevel } from "esri/widgets/support/Heading";
import { messageBundle, tsx, vmEvent } from "esri/widgets/support/widget";

const CSS = {
  base: "esri-feature-templates",
  loader: "esri-feature-templates__loader",
  itemIcon: "esri-feature-templates__list-item-icon",

  // common
  widget: "esri-widget"
};

function isGroup(itemOrGroup: TemplateItem | TemplateItemGroup): itemOrGroup is TemplateItemGroup {
  return "items" in itemOrGroup;
}

function getItemOrGroupId(itemOrGroup: TemplateItem | TemplateItemGroup): string {
  const { label } = itemOrGroup;
  return isGroup(itemOrGroup) ? label : `${label}–${itemOrGroup.layer.id}`;
}

interface VisibleElements {
  filter?: boolean;
}

const DEFAULT_VISIBLE_ELEMENTS: VisibleElements = {
  filter: true
};

type FeatureTemplatesProperties = Partial<
  Pick<
    FeatureTemplates,
    | "container"
    | "filterFunction"
    | "filterText"
    | "groupBy"
    | "headingLevel"
    | "label"
    | "layers"
    | "viewModel"
    | "visibleElements"
  >
>;

@subclass("esri.widgets.FeatureTemplates")
class FeatureTemplates extends HandleOwnerMixin(Widget) {
  // ------------------------
  //  Typedefs
  // ------------------------

  // ------------------------
  //  FilterFunction typedef
  // ------------------------

  /**
   * The filter used when setting the [filterFunction](#filterFunction)
   * property. It takes an object containing a {@link module:esri/widgets/FeatureTemplates/TemplateItem#label name}
   * property of the {@link module:esri/widgets/FeatureTemplates/TemplateItem template item} and returns
   * whether or not to include it.
   *
   * @typedef {Function} FilterFunction
   * @param {Object} filterName - An object containing a `name` property.
   * @param {string} filterName.name - The {@link module:esri/widgets/FeatureTemplates/TemplateItem#label name}
   * of the {@link module:esri/widgets/FeatureTemplates/TemplateItem template item} to filter.
   *
   * @return {boolean} Function is a predicate, to test each element of the array.
   * Return `true` to keep {@link module:esri/widgets/FeatureTemplates/TemplateItem item} in the template widget, otherwise, `false`
   * to remove it.
   *
   * @example
   * // Filter and display templates only if their labels contain the word `Street`
   * function myFilterFunction(filter) {
   *   let containsName = filter.label.includes("Street");
   *   return containsName;
   * }
   *
   * // Create the FeatureTemplates widget
   * templates = new FeatureTemplates({
   *   container: "templatesDiv",
   *   visibleElements: {
   *     filter: false, // disable the default filter UI
   *   }
   *   layers: [featureLayer], // in this example, one layer is used
   *   filterFunction: myFilterFunction
   * });
   */

  // ------------------------
  //  GroupByFunction typedef
  // ------------------------

  /**
   * The function used when setting the [groupBy](#groupBy) property. It is
   * used to customize the grouping of {@link module:esri/widgets/FeatureTemplates/TemplateItem template items}. This can aid
   * in managing various template items and how they display within the widget. This takes an object containing a
   * `template` and a `layer` property.
   *
   * @typedef {Function} GroupByFunction
   * @param {Object} grouping - An object containing the properties referenced below.
   *
   * @param {module:esri/layers/FeatureLayer} grouping.layer - {@link module:esri/layers/FeatureLayer} instance referenced in [layers](#layers) property.
   * @param {module:esri/layers/support/FeatureTemplate} grouping.template - {@link module:esri/layers/support/FeatureTemplate} associated with the `layer`.
   * @return {string | Object} Groups consist of a group `key` and `label`. These are shown in the UI. If both
   * the `key` and `label` are identical, return a `string`. Otherwise, return an `object` with
   * `key/name` properties. This gives finer control of the groups.
   *
   * @example
   * // This example shows using a function to check if
   * // the layer title contains the word 'military'. If so,
   * // return a group of items called "All Military Templates"
   * function customGroup(grouping) {
   *   // Consolidate all military layers
   *   if (grouping.layer.title.toLowerCase().indexOf("military") > -1) {
   *     return "All Military Templates"
   *   }
   * // Otherwise, group by layer title
   *   return grouping.layer.title;
   * }
   *
   * // Create the FeatureTemplates widget
   * templates = new FeatureTemplates({
   *   container: "templatesDiv",
   *   layers: layers,
   *   groupBy: customGroup
   * });
   *
   * @example
   * // Group template items by layers.
   * // This function is as same as setting
   * // the groupBy property to "layer" option.
   * function groupByLayer (grouping) {
   *   const group = {
   *     key: grouping.layer,
   *     name: grouping.layer.title
   *   };
   *   return group;
   * }
   *
   * // Create the FeatureTemplates widget
   * const templates = new FeatureTemplates({
   *   container: "templatesDiv",
   *   layers: layers,
   *   groupBy: groupByLayer
   * });
   */

  // ---------------------
  // select event
  // ---------------------

  /**
   * Fires when a {@link module:esri/widgets/FeatureTemplates/TemplateItem template item} is selected.
   * This occurs when the associated view model's {@link module:esri/widgets/FeatureTemplates/FeatureTemplatesViewModel#select select} method
   * is called.
   *
   * @event module:esri/widgets/FeatureTemplates#select
   * @property {module:esri/widgets/FeatureTemplates/TemplateItem} item - The selected template item.
   * @property {module:esri/layers/support/FeatureTemplate} template - The feature template associated with the template item.
   *
   * @see [Sample - Update FeatureLayer using ApplyEdits](../sample-code/editing-applyedits/index.html)
   * @example
   * // Listen for when a template item is selected
   * templates.on("select", function(evtTemplate) {
   *   // Access the selected template item's attributes
   *   attributes = evtTemplate.template.prototype.attributes;
   *
   *   // Create a new feature with the selected template at cursor location
   *   const handler = view.on("click", function(event) {
   *     handler.remove(); // remove click event handler.
   *     event.stopPropagation(); // Stop click event propagation
   *
   *     if (event.mapPoint) {
   *       // Create a new feature with the selected template item.
   *       editFeature = new Graphic({
   *         geometry: event.mapPoint,
   *           attributes: {
   *             "IncidentType": attributes.IncidentType
   *           }
   *       });
   *
   *       // Setup the applyEdits parameter with adds.
   *       const edits = {
   *         addFeatures: [editFeature]
   *       };
   *       featureLayer.applyEdits(params).then(function(editsResult) {
   *         if (editsResult.addFeatureResults.length > 0) {
   *           console.log("Created a new feature.")
   *         }
   *       });
   *     }
   *   });
   * });
   */
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * @constructor
   * @extends module:esri/widgets/Widget
   * @constructor
   * @alias module:esri/widgets/FeatureTemplates
   * @param {Object} [properties] - See the [properties](#properties-summary) for a list of all the properties
   *                            that may be passed into the constructor.
   *
   * @example
   * // Typical usage
   * const templates = new FeatureTemplates({
   *   container: "templatesDiv",
   *   layers: layers
   * });
   */
  constructor(properties?: FeatureTemplatesProperties, parentNode?: string | Element) {
    super(properties, parentNode);

    this.renderItemIcon = this.renderItemIcon.bind(this);
    this._afterItemCreateOrUpdate = this._afterItemCreateOrUpdate.bind(this);
    this._afterItemRemoved = this._afterItemRemoved.bind(this);
  }

  initialize(): void {
    const nameBasedFilter: Filter = ({ label }) =>
      !this.filterText || label.toLowerCase().indexOf(this.filterText.toLowerCase()) > -1;

    this.own(
      init<this>(this, "viewModel", (value, oldValue) => {
        if (value && !value.filterFunction) {
          this.filterFunction = nameBasedFilter;
        }

        if (oldValue && oldValue !== value && oldValue.filterFunction === nameBasedFilter) {
          oldValue.filterFunction = null;
        }
      })
    );
  }

  destroy(): void {
    if (this._iconIntersectionObserver) {
      this._iconIntersectionObserver.disconnect();
      this._iconIntersectionObserver = null;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  private _iconIntersectionObserver: IntersectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          const node = entry.target;

          if (!node["data-has-icon"]) {
            const item = node["data-item"] as TemplateItem;

            node["data-has-icon"] = true;
            observer.unobserve(node);
            await item.fetchThumbnail();

            const sameItem = node["data-item"] === item;

            if (sameItem && item.thumbnail) {
              node.appendChild(item.thumbnail);
            } else {
              node["data-has-icon"] = false;
              observer.observe(node);
            }
          }
        }
      });
    }
  );

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  filterFunction
  //----------------------------------

  /**
   * {@link module:esri/widgets/FeatureTemplates~FilterFunction function} can be defined to help filter
   * {@link module:esri/widgets/FeatureTemplates/TemplateItem template items} within the widget.
   * A custom function can be used to aid when searching for templates. It takes a function which passes in
   * an object containing a {@link module:esri/widgets/FeatureTemplates/TemplateItem#label name}
   * property of the {@link module:esri/widgets/FeatureTemplates/TemplateItem template item}.
   *
   * ![featureTemplatesFilterFunction](../assets/img/apiref/widgets/featureTemplatesFilterFunction.png)
   *
   * @name filterFunction
   * @type {module:esri/widgets/FeatureTemplates~FilterFunction}
   * @instance
   *
   * @example
   * // Filter and display templates only if their labels contain the word `Street`
   * function myFilterFunction(filter) {
   *   let containsName = filter.label.includes("Street");
   *   return containsName;
   * }
   *
   * // Create the FeatureTemplates widget
   * templates = new FeatureTemplates({
   *   container: "templatesDiv",
   *   visibleElements: {
   *     filter: false, // disable the default filter UI
   *   },
   *   layers: [featureLayer], // in this example, one layer is used
   *   filterFunction: myFilterFunction
   * });
   */
  @aliasOf("viewModel.filterFunction")
  filterFunction: Filter = null;

  //----------------------------------
  //  filterText
  //----------------------------------

  /**
   * Text used to filter items.
   *
   * @name filterText
   * @instance
   * @type string
   */
  @property()
  filterText: string = "";

  //----------------------------------
  //  groupBy
  //----------------------------------

  /**
   * It is possible to group {@link module:esri/widgets/FeatureTemplates/TemplateItem template items}. This can aid
   * in managing various template items and how they display within the widget. The values are discussed below.
   *
   * Type | Description | Example
   * ----- | ----------- | -------
   * layer | This is the *default* grouping. Groups template items by layers. | ![featureTemplatesGroupByLayer](../assets/img/apiref/widgets/groupByLayers.png)
   * geometry | Groups template items by geometry type. | ![FeatureTemplatesGroupByGeometry](../assets/img/apiref/widgets/groupByGeometry.png)
   * none | The widget displays everything in one list with no grouping. | ![featureTemplatesGroupByLayer](../assets/img/apiref/widgets/groupByNone.png)
   * {@link module:esri/widgets/FeatureTemplates~GroupByFunction} | Custom function that takes an object containing a {@link module:esri/layers/support/FeatureTemplate} and {@link module:esri/layers/FeatureLayer}. | ![FeatureTemplatesGroupByCustomGroupFunction](../assets/img/apiref/widgets/groupCustomGroup.png)
   *
   * @name groupBy
   * @type {string | module:esri/widgets/FeatureTemplates~GroupByFunction}
   * @instance
   * @default layer
   *
   * @example
   * // This example shows using a function to check if
   * // the layer title contains the word 'military'. If so,
   * // return a group of items called "All Military Templates"
   * function customGroup(grouping) {
   *   // Consolidate all military layers
   *   if (grouping.layer.title.toLowerCase().indexOf("military") > -1) {
   *     return "All Military Templates"
   *   }
   * // Otherwise, group by layer title
   *   return grouping.layer.title;
   * }
   *
   * // Create the FeatureTemplates widget
   * templates = new FeatureTemplates({
   *   container: "templatesDiv",
   *   layers: layers,
   *   groupBy: customGroup
   * });
   */
  @aliasOf("viewModel.groupBy")
  groupBy: GroupByType = null;

  //----------------------------------
  //  headingLevel
  //----------------------------------

  /**
   * Indicates the heading level to use for the labels of grouped feature templates.
   * By default, the group label is rendered
   * as a level 4 heading (e.g. `<h4>Group label</h4>`). Depending on the widget's placement
   * in your app, you may need to adjust this heading for proper semantics. This is
   * important for meeting accessibility standards.
   *
   * @name headingLevel
   * @instance
   * @since 4.20
   * @type {number}
   * @default 4
   * @see [Heading Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements)
   *
   * @example
   * // Group label will render as an <h3>
   * featureTemplates.headingLevel = 3;
   */
  @property()
  headingLevel: HeadingLevel = 4;

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
  //  layers
  //----------------------------------

  /**
   * An array of {@link module:esri/layers/FeatureLayer Featurelayers}
   * to display within the widget. The order in which these layers are
   * set in the array dictates how they display within the widget.
   *
   * ::: esri-md class="panel trailer-1"
   * The widget is designed to only display layers that are enabled for editing.
   * It will not display layers that are enabled to only edit attributes.
   * :::
   *
   * @name layers
   * @type {module:esri/layers/FeatureLayer[]}
   * @instance
   *
   * @example
   * // The layers to display within the widget
   * let militaryUnits = new FeatureLayer({
   *   url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Military/FeatureServer/2"
   * });
   *
   * let militaryHostile = new FeatureLayer({
   *   url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Military/FeatureServer/6"
   * });
   *
   * let layers = [militaryUnits, militaryHostile];
   *
   * // Create FeatureTemplates widget
   * templates = new FeatureTemplates({
   *   container: "templatesDiv",
   *   layers: layers
   * });
   */
  @aliasOf("viewModel.layers")
  layers: FeatureLayer[] = null;

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
  @messageBundle("esri/widgets/FeatureTemplates/t9n/FeatureTemplates")
  messages: FeatureTemplatesMessages = null;

  //----------------------------------
  //  selectedItem
  //----------------------------------

  /**
   * The selected template item.
   *
   * @name selectedItem
   * @instance
   * @type {module:esri/widgets/FeatureTemplates/TemplateItem}
   * @ignore
   * @todo doc after 4.20
   */
  @aliasOf("viewModel.selectedItem")
  selectedItem: TemplateItem = null;

  //----------------------------------
  //  viewModel
  //----------------------------------

  /**
   * The view model for this widget. This is a class that contains all the logic
   * (properties and methods) that controls this widget's behavior. See the
   * {@link module:esri/widgets/FeatureTemplates/FeatureTemplatesViewModel} class to access
   * all properties and methods on the widget.
   *
   * @name viewModel
   * @instance
   * @type {module:esri/widgets/FeatureTemplates/FeatureTemplatesViewModel}
   * @autocast
   */
  @property()
  @vmEvent("select")
  viewModel: FeatureTemplatesViewModel = new FeatureTemplatesViewModel();

  /**
   * The visible elements that are displayed within the widget.
   * This provides the ability to turn individual elements of the widget's display on/off.
   *
   * @typedef module:esri/widgets/FeatureTemplates~VisibleElements
   *
   * @property {boolean} [filter] - Indicates whether to the filter will be displayed. Default is `true`.
   */

  /**
   * The visible elements that are displayed within the widget.
   * This property provides the ability to turn individual elements of the widget's display on/off.
   *
   * ![featureTemplatesFilter](../assets/img/apiref/widgets/featureTemplatesFilter.png)
   *
   * @name visibleElements
   * @instance
   * @type {module:esri/widgets/FeatureTemplates~VisibleElements}
   * @autocast
   *
   * @since 4.15
   *
   * @example
   * featureTemplates.visibleElements = {
   *    filter: false
   * };
   */
  @property()
  visibleElements: VisibleElements = { ...DEFAULT_VISIBLE_ELEMENTS };

  @cast("visibleElements")
  protected castVisibleElements(value: Partial<VisibleElements>): VisibleElements {
    return { ...DEFAULT_VISIBLE_ELEMENTS, ...value };
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Selects the {@link module:esri/widgets/FeatureTemplates/TemplateItem template item} to use.
   *
   * @method select
   * @instance
   * @see [event:select](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTemplates.html#event-select)
   *
   * @param {module:esri/widgets/FeatureTemplates/TemplateItem} [item] - The {@link module:esri/widgets/FeatureTemplates/TemplateItem template item} to select.
   *
   * @ignore
   * @todo doc after 4.20
   */
  @aliasOf("viewModel.select")
  select(_item: TemplateItem): void {
    return null;
  }

  render(): VNode {
    const {
      filterText,
      headingLevel,
      messages,
      viewModel: { items, selectedItem, state }
    } = this;
    const filterEnabled = this.visibleElements.filter;

    return (
      <div class={this.classes(CSS.base, CSS.widget)} aria-label={messages.widgetLabel}>
        {state === "loading" ? (
          this.renderLoader()
        ) : state === "ready" ? (
          <ItemList
            id={this.id}
            identify={getItemOrGroupId}
            filterText={filterText}
            items={items}
            headingLevel={headingLevel}
            messages={{
              filterPlaceholder: messages.filterPlaceholder,
              noItems: messages.noItems,
              noMatches: messages.noMatches
            }}
            filterEnabled={filterEnabled}
            onItemSelect={(item) => {
              this.viewModel.select(item);
            }}
            onFilterChange={(value) => {
              this.filterText = value;
              this.viewModel.refresh();
            }}
            renderIcon={this.renderItemIcon}
            selectedItem={selectedItem}
          />
        ) : null}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Protected Methods
  //
  //--------------------------------------------------------------------------

  protected renderItemIcon({ item }: { item: TemplateItem }): VNode {
    return (
      <span
        key="icon"
        class={CSS.itemIcon}
        afterCreate={this._afterItemCreateOrUpdate}
        afterUpdate={this._afterItemCreateOrUpdate}
        afterRemoved={this._afterItemRemoved}
        data-item={item}
        data-has-icon={false}
      />
    );
  }

  protected renderLoader(): VNode {
    return <div class={CSS.loader} key="loader" />;
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  protected _afterItemCreateOrUpdate(node: HTMLElement): void {
    this._iconIntersectionObserver.observe(node);
  }

  protected _afterItemRemoved(node: HTMLElement): void {
    this._iconIntersectionObserver.unobserve(node);
  }
}

export default FeatureTemplates;
