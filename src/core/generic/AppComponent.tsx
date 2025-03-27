import React from 'react';
import {WithTranslation} from 'react-i18next';
export interface SharedState {
  isConnected: boolean;
  progressVisible: boolean;
  showAlert: boolean;
  showProgress: boolean;
  alertTitle: string | undefined;
  alertMessage: string | undefined;
  showCancelButton: boolean;
  showConfirmButton: boolean;
  cancelAlertText: string | undefined;
  confirmAlertText: string | undefined;
  onCancelPressed: any;
  onConfirmPressed: any;
  isRefreshing: boolean;
  isLoading: boolean;
  PageIndex: number;
  PageSize: number;
  SearchQry: string;
}
export interface SharedProps extends WithTranslation {}
export class AppComponent<SharedProps, TState> extends React.Component<
  SharedProps,
  TState
> {
  constructor(props: SharedProps) {
    super(props);
  }
}
