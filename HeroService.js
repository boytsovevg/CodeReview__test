'use strict';

(function (ng) {
    ng.module('Heroes.Core')
        .factory('HeroesService', HeroesService);

    HeroesService.$inject = ['HeroProxy'];
    function HeroesService(proxy) {
        var service = {};

        service.toggleDelete = toggleDelete;
        service.save = save;

        return service;


        function toggleDelete(endPointUrl, data, callback) {
            return (function () {
                var onSuccess = function () {
                    if (typeof callback === "function") callback();
                },
                    onError = function () {
                        toastr.error('Ошибка при удалении');
                    };

                proxy.post(endPointUrl, data, onSuccess, onError);
            })();
        }

        function save(endPointUrl, data, callback) {
            return (function () {

                function onSuccess(res) {
                    if (typeof callback === "function") callback(res);
                    else toastr.success('Сохранено успешно');
                }

                function onError(res) {
                    toastr.error('Ошибка при сохранении');
                }

                proxy.post(endPointUrl, data, onSuccess, onError);
            })();
        }

    }
})(angular)
