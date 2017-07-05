'use strict';

(function (ng) {
    ng.module('Heroes.Core')
        .factory('HeroesUtils', HeroesUtils);

    HeroesUtils.$inject = ['moment'];
    function HeroesUtils(moment) {
        var service = {};

        service.checkContainsBeforePushing = checkContainsBeforePushing;
        service.dateFormat = dateFormat;
        service.formatTime = formatTime;

        return service;


        function checkContainsBeforePushing(data) {
            if (_.contains(_.values(data), undefined)) {
                data = _.mapObject(data,
                    function (key, val) {
                        return '';
                    });
            }
            if (!_.contains(_.values(data), '')) return true;
            else return false;
        }

        function dateFormat(date, time) {
            var formattedDateTime = '';

            if (angular.isDate(date))
                formattedDateTime = moment(date).format('YYYY-MM-DD');
            else if (angular.isString(date))
                formattedDateTime = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD');

            if (angular.isDate(time))
                formattedDateTime += " " + moment(time).format('HH:mm:ss');
            else if (angular.isString(time))
                formattedDateTime += " " + time + ":00";

            return formattedDateTime;
        }

        function formatTime(date) {
            return moment(date).format('HH:mm');
        }

    }
})(angular)
