import { override } from '@microsoft/decorators';

import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';


import * as strings from 'HelloWorldApplicationCustomizerStrings';
import styles from './AppCustomizer.modules.scss';
import { escape } from '@microsoft/sp-lodash-subset';  


const LOG_SOURCE: string = 'HelloWorldApplicationCustomizer';

export interface IHelloWorldApplicationCustomizerProperties {
  Top: string;
  Bottom: string; 
}

export default class HelloWorldApplicationCustomizer extends BaseApplicationCustomizer<IHelloWorldApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceholders); 
    return Promise.resolve();
  }

  private _renderPlaceholders(): void { 
    console.log("HelloWorldApplicationCustomizer._renderPlaceholders");

    console.log(
      "Available placeholders: ",
      this.context.placeholderProvider.placeholderNames.join(", ")
    );

    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: () => this._onDispose() }
      );

      // The extension should not assume that the expected placeholder is available 
      if (!this._topPlaceholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }

      if (this.properties) {
        let topString: string = this.properties.Top || "(Top property was not defined.)";
        
        if (this._topPlaceholder.domElement) {
          this._topPlaceholder.domElement.innerHTML = `
            <div class="${styles.app}">
              <div class="${styles.top}">
                <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(topString)}
              </div>
            </div>`;
        }
      }
    }

    // Handling the bottom placeholder
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent( 
        PlaceholderName.Bottom, 
        { onDispose: () => this._onDispose() }
      );

      // The extension should not assume that the expected placeholder is available
      if (!this._bottomPlaceholder) {
        console.error("The expected placeholder (Bottom) was not found.");
        return;
      }

      if (this.properties) {
        let bottomString: string = this.properties.Bottom || "(Bottom property was not defined.)";
        
        if (this._bottomPlaceholder.domElement) {
          this._bottomPlaceholder.domElement.innerHTML = `
            <div class="${styles.app}">
              <div class="${styles.bottom}">
                <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(bottomString)}
              </div>
            </div>`;
        }
      }
    }
  }

  private _onDispose(): void {
    console.log("[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.");
  }
}
