import React, { Component } from 'react';
import classNames from 'classnames';
import panes from '../constants/pane-types';
import Header from '../components/Header';
import SidebarContainer from '../containers/SidebarContainer';
import PreviewContainer from '../containers/PreviewContainer';
import BurstContainer from '../containers/BurstContainer';
import SettingsContainer from '../containers/SettingsContainer';
import FolderContainer from '../containers/FolderContainer';
import ErrorToastContainer from '../containers/ErrorToastContainer';
import CALCULATOR_OPTIONS from '../constants/calculator-options';
import { initializeCalculator } from '../lib/calculator';
import './App.css';

// The Desmos API is loaded in index.html
const Desmos = window.Desmos;
const calcContainer = React.createRef();

class App extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown({ key }) {
    const { onEscape } = this.props;
    if (key === 'Escape') onEscape();
  }

  componentDidMount() {
    initializeCalculator(Desmos, calcContainer, CALCULATOR_OPTIONS);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { expandedPane } = this.props;

    return (
      <div className="App">
        <Header />
        <div
          className={classNames('calculator', {
            'calculator-burst': expandedPane === panes.BURST,
            'calculator-settings': expandedPane === panes.SETTINGS,
            'calculator-files': expandedPane === panes.FILES
          })}
          ref={calcContainer}
        />
        <SettingsContainer />
        <PreviewContainer />
        <BurstContainer />
        <FolderContainer />
        <SidebarContainer />
        <ErrorToastContainer />
      </div>
    );
  }
}

export default App;
