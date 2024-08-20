import { Log } from '@microsoft/sp-core-library';
import {
  BaseFieldCustomizer,
  type IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'P1FieldCustomizerStrings';
import styles from './P1FieldCustomizer.module.scss';
import { override } from '@microsoft/decorators';

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IP1FieldCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'P1FieldCustomizer';

export default class P1FieldCustomizer
  extends BaseFieldCustomizer<IP1FieldCustomizerProperties> {

  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated P1FieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "P1FieldCustomizer" and "${strings.Title}"`);
    return Promise.resolve();
  }

  @override
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    // Apply styling and content to the cell element
    event.domElement.classList.add(styles.cell);
    event.domElement.innerHTML = `
        <div class='${styles.p1}'>
            <div class='${styles.full}' style='width: ${event.fieldValue}px; background: red; color:#c8c8c0'>
                &nbsp; New Value: ${event.fieldValue}
            </div>
        </div>`;
    
    // const text: string = `${this.properties.sampleText}: ${event.fieldValue}`;

    // event.domElement.innerText = text;

    // event.domElement.classList.add(styles.p1);
  }

  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    super.onDisposeCell(event);
  }
}
