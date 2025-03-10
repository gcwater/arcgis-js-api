// @esri.calcite-components.dist.custom-elements.bundles
import "@esri/calcite-components/dist/custom-elements/bundles/button";
import "@esri/calcite-components/dist/custom-elements/bundles/label";

// esri
import Color from "esri/../../Color";

// esri.core
import { generateUUID } from "esri/../../core/uuid";

// esri.core.accessorSupport
import { property, subclass } from "esri/../../core/accessorSupport/decorators";

// esri.libs
import { VNode, VNodeProperties } from "esri/../../libs/maquette";

// esri.widgets
import Widget from "esri/../Widget";

// esri.widgets.ShadowAccumulation
import { DURATION_CONFIGURATOR_CSS as CSS } from "esri/css";
import { DurationMode } from "esri/DurationMode";
import DurationOptions from "esri/DurationOptions";

// esri.widgets.ShadowAccumulation.components
import { Label } from "esri/widgets/Label";
import { LabeledColorPicker } from "esri/widgets/LabeledColorPicker";

// esri.widgets.ShadowAccumulation.t9n
import ShadowAccumulationMessages from "esri/t9n/ShadowAccumulation";

// esri.widgets.support
import { messageBundle, tsx, WidgetProperties } from "esri/../support/widget";

interface ConstructProperties extends WidgetProperties {
  options: DurationOptions;
  colorPickerVisible?: boolean;
}

@subclass("esri.widgets.ShadowAccumulation.components.DurationConfigurator")
export class DurationConfigurator
  extends Widget<ConstructProperties>
  implements ConstructProperties
{
  //----------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //----------------------------------------------------------------------------

  constructor(properties: ConstructProperties) {
    super(properties);
  }

  render(): VNode {
    const messages = this._messages.duration;
    const { color, mode } = this.options;

    return (
      <div class={CSS.base}>
        <Label for={this._modeSelectorId} label={messages.modeLabel}>
          <div class={CSS.radioGroup}>
            <Button
              active={mode === DurationMode.Continuous}
              label={messages.continuousLabel}
              onclick={this._setContinuous}
            />
            <Button
              active={mode === DurationMode.Hourly}
              label={messages.hourlyLabel}
              onclick={this._setHourly}
            />
          </div>
        </Label>

        {this.colorPickerVisible && (
          <LabeledColorPicker
            id={this._colorPickerId}
            label={messages.colorLabel}
            value={color}
            onChange={this._onColorChange}
          />
        )}
      </div>
    );
  }

  //----------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //----------------------------------------------------------------------------

  @property()
  options!: DurationOptions;

  @property()
  colorPickerVisible: boolean = true;

  //----------------------------------------------------------------------------
  //
  //  Private Properties
  //
  //----------------------------------------------------------------------------

  private readonly _modeSelectorId = `mode-selector-${generateUUID()}`;
  private readonly _colorPickerId = `color-picker-${generateUUID()}`;

  @property()
  @messageBundle("esri/widgets/ShadowAccumulation/t9n/ShadowAccumulation")
  private _messages!: ShadowAccumulationMessages;

  //----------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //----------------------------------------------------------------------------

  private _onColorChange = (color: Color) => {
    this.options.color = color;
  };

  private _setContinuous = () => {
    this.options.mode = DurationMode.Continuous;
  };

  private _setHourly = () => {
    this.options.mode = DurationMode.Hourly;
  };
}

function Button({
  active,
  label,
  ...other
}: { active: boolean; label: string } & VNodeProperties): VNode {
  return (
    <calcite-button
      alignment="center"
      appearance={active ? "solid" : "outline"}
      scale="s"
      width="half"
      {...other}
    >
      {label}
    </calcite-button>
  );
}
