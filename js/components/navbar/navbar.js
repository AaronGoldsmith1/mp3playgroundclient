(function() {
  "use strict";

  angular
    .module("Mp3Playground")
    .component("navbar", {
      templateUrl: '/js/components/navbar/navbar.html',
      controller: NavbarController
    });

  NavbarController.$inject = ["$log", "authService"];

  function NavbarController($log, authService) {
    var vm = this;

    vm.authService = authService;

    $log.info("NavbarController loaded!");
  }
})();
