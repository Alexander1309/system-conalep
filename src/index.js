import React from 'react'
import ReactDOM from 'react-dom'
import 'bootswatch/dist/cosmo/bootstrap.min.css'
import './styles.general.css'
import Router from './router/Router'
import { SettingProvider } from './contexts/settingContext'

ReactDOM.render(<SettingProvider><Router /></SettingProvider>, document.getElementById('app'))
