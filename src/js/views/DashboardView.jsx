/*
 * Dashboard view.
 * @author Frank Wood
 */

var React = require('react/addons'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    Reflux = require('reflux'),
    I18n = require('i18n'),
    ViewBoxHeader = require('ViewBoxHeader'),
    ActionIcon = require('ActionIcon'),
    PropTable = require('PropTable'),
    DashboardActions = require('DashboardActions'),
    DashboardStore = require('DashboardStore'),
    StatusText = require('StatusText'),
    GMeter = require('grommet/components/Meter'),
    GEditIcon = require('grommet/components/icons/Edit'),
    autoRefreshTimeout;

function t(key) {
    return I18n.text('views.dashboard.' + key);
}

// FIXME: remove this
var startPort = 110;
var remove = true;

module.exports = React.createClass({

    displayName: 'DashboardView',

    mixins: [ Reflux.connect(DashboardStore) ],

    componentDidMount: function() {
        this.autoRefresh();
    },

    componentWillUnmount: function() {
        if (autoRefreshTimeout) {
            clearTimeout(autoRefreshTimeout);
        }
    },

    autoRefresh: function() {
        var recurFn = this.autoRefresh;
        DashboardActions.loadSysInfo();
        startPort++;
        remove = !remove;
        autoRefreshTimeout = setTimeout(function() {
            recurFn();
        }, 3000);
    },

    onClickEditSysInfo: function() {
        alert('Clicked edit sysInfo.');
    },

    mkSysInfoPropData: function() {
        var si = this.state.sysInfo;
        return [
            [ t('productName'), si.product_name ],
            [ t('partNumber'), si.part_number ],
            [ t('serialNum'), si.serial_number ],
            [ t('vendor'), si.vendor ],
            [ t('version'), si.version ],
            [ t('onieVersion'), si.onie_version ],
            [ t('baseMac'), si.base_mac_address ],
            [
                t('fanStatus'),
                <StatusText value="warning" text={t('warning')} />
            ], [
                t('powerStatus'),
                <StatusText value="ok" text={t('ok')} />
            ],
            [ t('upTime'), si.up_time ]
        ];
    },

    mkCpuMeter: function() {
        // FIXME: localize the text
        return (
            <GMeter small={true} type="arc" value={45}
                min={ { value: 0, label: '0 GB' } }
                max={ { value: 80, label: '80 GB' } }
                thresholds={[
                    { label: 'OK', value: 0, colorIndex: 'ok' },
                    { label: 'Warning', value: 60, colorIndex: 'warning' },
                    { label: 'Error', value: 70, colorIndex: 'error' }
                ]}
                units="GB" />
        );
    },

    mkPortMeter: function(portNum) {
        // FIXME: localize the text
        var somePercent = Math.floor((Math.random() * 100) + 1);
        return (
            <div>
                <div>{'Port: ' + portNum}</div>
                <GMeter value={somePercent}
                    min={ { value: 0, label: '0%' } }
                    max={ { value: 100, label: '100%' } }
                    thresholds={[
                        { label: 'OK', value: 0, colorIndex: 'ok' },
                        { label: 'Warning', value: 75, colorIndex: 'warning' },
                        { label: 'Error', value: 90, colorIndex: 'error' }
                    ]}
                    units="%" />
            </div>
        );
    },

    render: function() {
        var sysInfoTb = {
                edit: <ActionIcon
                    icon=<GEditIcon />
                    onClick={this.onClickEditSysInfo} />
            };

        return (
            <div className="viewFill viewCol">

                <div className="viewRow viewFlex0">

                    <div className="viewBox">
                        <ViewBoxHeader
                            title={t('system')}
                            toolbar={sysInfoTb} />
                        <PropTable data={this.mkSysInfoPropData()} />
                    </div>

                    <div className="viewCol">
                        <div className="viewRow">
                            <div className="viewBox">
                                <ViewBoxHeader title={t('cpu')} />
                                {this.mkCpuMeter()}
                            </div>
                            <div className="viewBox">
                                <ViewBoxHeader title={t('memory')} />
                                {this.mkCpuMeter()}
                            </div>
                        </div>
                        <div className="viewRow">
                            <div className="viewBox">
                                <ViewBoxHeader title={t('storage')} />
                                {this.mkCpuMeter()}
                            </div>
                            <div className="viewBox">
                                <ViewBoxHeader title={t('temp')} />
                                {this.mkCpuMeter()}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="viewRow viewFlex1">

                    <div className="viewBox viewFlex1">
                        <ViewBoxHeader title={t('portTopUtil')} />
                        <div className="viewCol">
                            <ReactCSSTransitionGroup
                                transitionName="portTopTrans">
                                <div key={'k' + 100}>{this.mkPortMeter(100)}</div>
                                <div key={'k' + startPort}>{this.mkPortMeter(startPort)}</div>
                                <div key={'k' + 200}>{this.mkPortMeter(200)}</div>
                                <div key={'k' + startPort+1}>{this.mkPortMeter(startPort+1)}</div>
                            </ReactCSSTransitionGroup>
                        </div>
                    </div>

                    <div className="viewBox viewFlex1">
                        <ViewBoxHeader title={t('vlanTopUtil')} />
                        <div className="viewCol">
                            <ReactCSSTransitionGroup
                                transitionName="vlanTopTrans">
                                {remove ? null : <div key={'k' + startPort}>{this.mkPortMeter(startPort)}</div> }
                                <div key={'k' + 100}>{this.mkPortMeter(100)}</div>
                                <div key={'k' + 200}>{this.mkPortMeter(200)}</div>
                                <div key={'k' + 300}>{this.mkPortMeter(200)}</div>
                            </ReactCSSTransitionGroup>
                        </div>
                    </div>

                </div>

            </div>
        );
    }

});
