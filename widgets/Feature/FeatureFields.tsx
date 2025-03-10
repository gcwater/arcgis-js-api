// esri.core
import { init } from "esri/../core/watchUtils";

// esri.core.accessorSupport
import { aliasOf, property, subclass } from "esri/../core/accessorSupport/decorators";

// esri.popup
import ExpressionInfo from "esri/../popup/ExpressionInfo";
import FieldInfo from "esri/../popup/FieldInfo";

// esri.widgets
import Widget from "esri/Widget";

// esri.widgets.Feature.FeatureFields
import FeatureFieldsViewModel from "esri/widgets/FeatureFields/FeatureFieldsViewModel";

// esri.widgets.Feature.support
import FeatureElementInfo from "esri/widgets/support/FeatureElementInfo";

// esri.widgets.Feature.t9n
import type FeatureMessages from "esri/widgets/t9n/Feature";

// esri.widgets.support
import { VNode } from "esri/support/interfaces";
import * as uriUtils from "esri/support/uriUtils";
import { tsx, messageBundle } from "esri/support/widget";

// esri.widgets.support.t9n
import UriUtilsMessages from "esri/support/t9n/uriUtils";

const CSS = {
  base: "esri-feature-fields",
  fieldHeader: "esri-feature-fields__field-header",
  fieldData: "esri-feature-fields__field-data",
  fieldDataDate: "esri-feature-fields__field-data--date",
  // common
  esriTable: "esri-widget__table"
};

@subclass("esri.widgets.Feature.FeatureFields")
class FeatureFields extends Widget {
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor(properties?: any, parentNode?: string | Element) {
    super(properties, parentNode);
  }

  initialize(): void {
    this._featureElementInfo = new FeatureElementInfo();

    init(this, ["viewModel.description", "viewModel.title"], () => this._setupFeatureElementInfo());
  }

  destroy(): void {
    this._featureElementInfo.destroy();
  }

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  private _featureElementInfo: FeatureElementInfo = null;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  // attributes
  //----------------------------------

  @aliasOf("viewModel.attributes")
  attributes: HashMap<any> = null;

  //----------------------------------
  // description
  //----------------------------------

  @aliasOf("viewModel.description")
  description: string = null;

  //----------------------------------
  // expressionInfos
  //----------------------------------

  @aliasOf("viewModel.expressionInfos")
  expressionInfos: ExpressionInfo[] = null;

  //----------------------------------
  // fieldInfos
  //----------------------------------

  @aliasOf("viewModel.fieldInfos")
  fieldInfos: FieldInfo[] = null;

  //----------------------------------
  // title
  //----------------------------------

  @aliasOf("viewModel.title")
  title: string = null;

  //----------------------------------
  // viewModel
  //----------------------------------

  @property({
    type: FeatureFieldsViewModel
  })
  viewModel = new FeatureFieldsViewModel();

  //----------------------------------
  //  messages
  //----------------------------------

  /**
   * @name messages
   * @instance
   * @type {Object}
   *
   * @ignore
   * @todo intl doc
   */
  @property()
  @messageBundle("esri/widgets/Feature/t9n/Feature")
  messages: FeatureMessages = null;

  //----------------------------------
  //  messagesURIUtils
  //----------------------------------

  /**
   * @name messagesURIUtils
   * @instance
   * @type {Object}
   *
   * @ignore
   * @todo intl doc
   */
  @property()
  @messageBundle("esri/widgets/support/t9n/uriUtils")
  messagesURIUtils: UriUtilsMessages = null;

  //--------------------------------------------------------------------------
  //
  //  Protected Methods
  //
  //--------------------------------------------------------------------------

  protected renderFieldInfo(fieldInfo: FieldInfo, index: number): VNode {
    const { attributes } = this.viewModel;

    const fieldName = fieldInfo.fieldName;
    const fieldLabel = fieldInfo.label || fieldName;
    const fieldValue = attributes
      ? attributes[fieldName] == null
        ? ""
        : attributes[fieldName]
      : "";
    const isDateField = !!(fieldInfo.format && fieldInfo.format.dateFormat);
    const isNumericField = typeof fieldValue === "number" && !isDateField;
    const formattedFieldValue = isNumericField
      ? this._forceLTR(fieldValue)
      : uriUtils.autoLink(this.messagesURIUtils, fieldValue);
    const valueCellClasses = {
      [CSS.fieldDataDate]: isDateField
    };

    return (
      <tr key={`fields-element-info-row-${fieldName}-${index}`}>
        <th
          key={`fields-element-info-row-header-${fieldName}-${index}`}
          class={CSS.fieldHeader}
          innerHTML={fieldLabel}
        />
        <td
          key={`fields-element-info-row-data-${fieldName}-${index}`}
          class={this.classes(CSS.fieldData, valueCellClasses)}
          innerHTML={formattedFieldValue}
        />
      </tr>
    );
  }

  protected renderFields(): VNode {
    const { formattedFieldInfos } = this.viewModel;

    return formattedFieldInfos.length ? (
      <table class={CSS.esriTable} summary={this.messages.fieldsSummary}>
        <tbody>
          {formattedFieldInfos.map((fieldInfo, index) => this.renderFieldInfo(fieldInfo, index))}
        </tbody>
      </table>
    ) : null;
  }

  render(): VNode {
    return (
      <div class={CSS.base}>
        {this._featureElementInfo?.render()}
        {this.renderFields()}
      </div>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private _setupFeatureElementInfo(): void {
    const { description, title } = this;

    this._featureElementInfo.set({ description, title });
  }

  private _forceLTR(value: number | string): string {
    /*
     * We use "&lrm;" when displaying numeric attribute field
     * values. We can use it to force LTR text direction - regardless of whether
     * the page is in LTR or RTL mode. Even in LTR mode, a number can be surrounded
     * by English or RTL scripts - but we need the number to be displayed in LTR
     * direction.
     * When not forced, minus sign of negative numbers is displayed after
     * the number - we want to avoid this.
     */
    return `&lrm;${value}`;
  }
}

export default FeatureFields;
