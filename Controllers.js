'use strict';

(function(ng) {
    ng.module('Heroes.Controllers')
        .controller('HeroesController', HeroesController)
        .controller('HeroUnitsController', HeroUnitsController)
        .controller('BattlesResultsController', BattlesResultsController);


    HeroesController.$inject = ['$scope', 'HeroesModel', 'HeroesService', 'HeroProxy'];

    function HeroesController($scope, model, heroesService, proxy) {

        $scope.vm = angular.copy(model);

        $scope.search = search;
        $scope.showAllHeroes = showAllHeroes;
        $scope.toggleDeleteHero = toggleDeleteHero;

        function search($event) {
            //13 - enter key
            if ($event.keyCode !== 13) return;

            var url = '/searchHeroes',
                data = {
                    gameId: angular.copy(this.vm.gameId),
                    query: this.vm.searchQuery
                };

            function onSuccess(res) {
                $scope.vm.heroes = res.data.heroes;
                $scope.vm.searchQuery = null;
                toastr.success('Поиск завершен');
                $scope.vm.isSearched = true;
            }

            toastr.info('Ищу...');
            proxy.post(url, data, onSuccess);
        }

        function showAllHeroes() {
            this.vm.heroes = angular.copy(model.heroes);
            this.vm.isSearched = false;
        }

        function toggleDeleteHero(index) {
            var url = '/toggleDeleteHero',
                heroId = this.vm.heroes[index].id;

            var data = {
                gameId: angular.copy(this.vm.gameId),
                heroId: heroId
            };

            function onSuccess() {
                $scope.vm.heroes[index].isDeleted = !$scope.vm.heroes[index].isDeleted;
            }

            heroesService.toggleDelete(url, data, onSuccess);
        }
    }


    HeroUnitsController.$inject = ['$scope', 'HeroUnitsModel', 'HeroesService'];

    function HeroUnitsController($scope, model, heroesService) {
        $scope.vm = angular.copy(model);

        $scope.editUnit = editUnit;
        $scope.saveEditedUnit = saveEditedUnit;
        $scope.toggleDeleteUnit = toggleDeleteUnit;


        function addOrder(list) {
            var order = [];
            angular.forEach(list, getOrderIds, order);

            function getOrderIds(value) {
                if (angular.isDefined(value.id)) {
                    order.push(value.id);
                }
            }

            return order.join(';');
        }

        function editUnit(index) {
            this.vm.units[index].isUnitEdited = true;
        }

        function saveEditedUnit(index) {
            var url = '/saveHeroUnit',
                unit = this.vm.units[index];

            var data = {
                gameId: angular.copy(this.vm.gameId),
                unit: unit,
                order: addOrder(angular.copy(this.vm.units))
            };

            function onSuccess() {
                $scope.vm.units[index].isUnitEdited = false;
                toastr.success('Юнит сохранен');
            }

            heroesService.save(url, data, onSuccess);
        }

        function toggleDeleteUnit(index) {
            var url = '/toggleDeleteHeroUnit';

            var data = {
                gameId: angular.copy(this.vm.gameId),
                unitId: this.vm.units[index].id
            };

            function onSuccess() {
                $scope.vm.units[index].isDeleted = !$scope.vm.units[index].isDeleted;
            }

            heroesService.toggleDelete(url, data, onSuccess);
        }

    }


    BattlesResultsController.$inject = ['$scope', 'BattlesResultsModel', 'HeroProxy'];

    function BattlesResultsController($scope, model, proxy) {
        $scope.vm = angular.copy(model);

        $scope.getBattleResults = getBattleResults;
        $scope.filterBattleResults = filterBattleResults;


        function getBattleResults(index) {
            var url = '/changeDifficultyLevel',
                battle = this.vm.battles[index];

            var data = {
                gameId: angular.copy(this.vm.gameId),
                battleId: battle.id,
                difficultyLevel: battle.difficultyLevel
            };

            function onSuccess(res) {
                $scope.vm.battles[index] = res.data;
            }

            function onError(res) {
                toastr.error('Не удалось поменять уровень сложности. Пожалуйста, поробуйте позже');
            }

            proxy.post(url, data, onSuccess, onError);
        }

        function filterBattleResults(index, battle) {
            var battleId = this.vm.battles[index].id;

            return (battle.results.find(function(battleResult) {
                return battleId === battleResult.battleId;
            }) || { result: null }).result;
        }

    }
})(angular);
