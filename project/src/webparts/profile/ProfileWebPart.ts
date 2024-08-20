import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPopupWindowProps } from '@microsoft/sp-property-pane';
import styles from './ProfileWebPart.module.scss';

export enum PopupWindowPosition {
  Center = 0,
  LeftTop = 2,
  RightTop = 1,
  RightBottom = 3,
  LeftBottom = 4
}

export interface IProfileWebPartProps {
 
  height: number;
  width: number;
  positionWindowPosition: PopupWindowPosition;
  title: string;
  // Using IGuidSet and IPopupWindowProps

  popupWindowProps: IPopupWindowProps;
}

export default class ProfileWebPart extends BaseClientSideWebPart<IProfileWebPartProps> {
  public render(): void {
    this.domElement.innerHTML = `<div class="${styles.profile}"></div>`;
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
