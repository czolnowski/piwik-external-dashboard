(function (ng) {
    'use strict';

    var Report,
        State = function (name, reports)
        {
            this.name = ng.isString(name) && name.length > 0 ? name : 'Dashboard';
            this.reports = ng.isArray(reports) ? reports : [];
            this.active = false;
        };

    State.prototype.serialize = function ()
    {
        return ng.toJson(this);
    };

    State.prototype.unserialize = function (serializedState)
    {
        var state = ng.fromJson(serializedState);

        this.name = state.name;
        this.reports = Report.unserialize(state.reports);
        this.active = state.active === true;

        return this;
    };

    State.prototype.remove = function (report)
    {
        var index = this.reports.indexOf(report);

        if (index > -1) {
            this.reports.splice(index, 1);
        }
    };

    ng.module('piwik-external-dashboard.dashboard').factory(
        'DashboardState',
        [
            'Report',
            function (_Report)
            {
                Report = _Report;

                return State;
            }
        ]
    );
})(window.angular);
