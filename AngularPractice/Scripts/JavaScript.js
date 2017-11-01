var app = angular.module('store', []);
app.controller('myController', function ($scope, $http) {

    $http({
        method: 'get',
        url: '/json/gem.json'
    }).then(function (response) {

        $scope.gem = response.data;
        });

    //$scope.gem = [{
    //    name: 'Ruby',
    //    price: 1,
    //    description: 'Awesome gem1',
    //    canPurchase: true,
    //    soldOut: false,
    //    images: [{ picURL: "/images/ruby1.png" }, { picURL: "/images/ruby2.png" }],
    //    reviews: [{ stars: 1, body: "Not real", author: "ME" }, { stars: 2, body: "Bad quality", author: "ME" }]
    //},
    //    {
    //        name: 'Sapphire',
    //        price: 2,
    //        description: 'Awesome gem2',
    //        canPurchase: true,
    //        soldOut: false,
    //        images: [{ picURL: "/images/a.jpg" }, { picURL: "/images/b.jpg" }],
    //        reviews: [{ stars: 5,body: "AWESOME", author:"ME" }, { stars: 4,body: "GOOD", author: "ME" }]
    //    },
    //    {
    //        name: 'Amethyst',
    //        price: 3,
    //        description: 'Awesome gem3',
    //        canPurchase: true,
    //        soldOut: false,
    //        images: [{ picURL: "/images/amethyst1.png" }, { picURL: "/images/amethyst2.png" }],
    //        reviews: [{ stars: 3, body: "BEAUTIFUL", author: "ME" }, { stars: 3, body: "GOOD", author: "ME" }]
    //    }];
});

app.controller('panelController', function ($scope) {

    this.tab = 1;

    this.selectedTab = function (setTab) {
        this.tab = setTab;
    };

    this.isSelected = function (checkTab) {
        return this.tab == checkTab;
    };
});

app.controller('reviewController', function ($scope) {

    this.review = {};

    this.addReview = function (data) {
        data.reviews.push(this.review);
        this.review = {}
    }
});

app.directive('gemInfo', function () {
    return {
        restrict: 'A',
        templateURL: 'gem-info.html'
    };
});

//app.directive('gemPanel', function () {
//    return {
//        restrict: 'E',
//        templateURL: 'gem-panel.html',
//        controller: function () {
//            this.tab = 1;
//            this.selectedTab = function (setTab) {
//                this.tab = setTab;
//            };
//            this.isSelected = function (checkTab) {
//                return this.tab == checkTab;
//            };
//        },
//        controllerAs:'panel'
//    };
//});