'use strict';

(function(ng) {
    ng.module('Heroes.Models')
        .factory('HeroesModel', HeroesModel)
        .factory('HeroUnitsModel', HeroUnitsModel)
        .factory('BattlesResultsModel', BattlesResultsModel);


    HeroesModel.$inject = ['serverModel'];

    function HeroesModel(serverModel) {
        var model = {
            gameId: angular.copy(serverModel.gameId),
            heroes: angular.copy(serverModel.heroes)
        };

        return model;
    }


    HeroUnitsModel.$inject = ['serverModel'];

    function HeroUnitsModel(serverModel) {
        var model = {
            gameId: angular.copy(serverModel.gameId),
            units: angular.copy(serverModel.units),
            unitsInfo: angular.copy(serverModel.unitsInfo)
        };

        return model;
    }


    BattlesResultsModel.$inject = ['serverModel'];

    function BattlesResultsModel(serverModel) {
        var model = {
            gameId: angular.copy(serverModel.gameId),
            battles: angular.copy(serverModel.battles),
            enemies: angular.copy(serverModel.enemies),
            stats: {
                participationBattles: serverModel.totalBattles,
                wins: serverModel.wins
            }
        };

        model.stats.winsPercent = (model.stats.battles / model.stats.participationBattles * 100).toFixed(2);
        model.stats.participationBattles = model.stats.participationBattles.toFixed(2);

        model.stats.winsPercent += '%';

        return model;
    }

})(angular)