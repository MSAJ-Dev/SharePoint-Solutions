import * as React from 'react';
import styles from './HelloWorld.module.scss';
import type { IHelloWorldProps } from './IHelloWorldProps';
import { IHelloWorldstate } from "./IHelloWorldstate";
import { SPOperations } from "../Services/SPServices";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react";

export default class HelloWorld extends React.Component<IHelloWorldProps, IHelloWorldstate, {}> {
    public _spOps: SPOperations;

    constructor(props: IHelloWorldProps) {
        super(props);
        this._spOps = new SPOperations(props.context); // Pass context to SPOperations constructor
        this.state = { title: "Default Title", ListTitles: [] };
    }

    public testmethod(value: string) {
        this.setState({ title: "state change" });
    }

    public render(): React.ReactElement<IHelloWorldProps> {
        const {
            // Any props you want to use
        } = this.props;

        let Option: IDropdownOption[] = []; // Initialize options for dropdown

        return (
            <div className={styles.helloWorld}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.title}> Welcome to the DS tec</span>
                            <p className={styles.subTitle}>
                                DMO: SharePoint CRUD Operations USing Rest Api (spHTTP client)
                            </p>
                            <div id="dv_parent">
                                <Dropdown options={Option} /> {/* Render dropdown component */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
