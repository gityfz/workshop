/***
Metronic AngularJS App Main Script
***/
/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    // "ngAnimate",
    "angularjs-dropdown-multiselect"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: './assets',
        globalPath: './assets/global',
        layoutPath: './assets/layouts/layout3',
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar
        }, 2000)
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('PageHeadController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/homepage");

    $stateProvider

        // Dashboard
        .state('homepage', {
            url: "/homepage",
            templateUrl: "views/homepage.html",
            data: {pageTitle: 'HomePage'},
            controller: "HomePageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            './css/homepage.css',
                            'js/controller/HomePageController.js'
                        ]
                    });
                }]
            }
        })

        // AngularJS plugins
        .state('accountmanager', {
            url: "/accountmanager",
            templateUrl: "views/accountmanager.html",
            data: {pageTitle: 'AccountManager'},
            controller: "AccountManagerController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            './css/accountmanager.css',
                            'js/controller/AccountManagerController.js'
                        ]
                    });
                }]
            }
        })

        // UI Select
        .state('uiselect', {
            url: "/ui_select",
            templateUrl: "views/ui_select.html",
            data: {pageTitle: 'AngularJS Ui Select'},
            controller: "UISelectController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'ui.select',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            './assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            './assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                        ]
                    }, {
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/UISelectController.js'
                        ]
                    }]);
                }]
            }
        })

        // UI Bootstrap
        .state('uibootstrap', {
            url: "/ui_bootstrap.html",
            templateUrl: "views/ui_bootstrap",
            data: {pageTitle: 'AngularJS UI Bootstrap'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // New Investigation
        .state('newinvestigation', {
            url: "/new_investigation",
            templateUrl: "views/new_investigation.html",
            data: {pageTitle: '新建调查'},
            controller: "NewInvestigationController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            './assets/global/plugins/clockface/css/clockface.css',
                            './assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
                            './assets/global/plugins/bootstrap-daterangepicker/daterangepicker.css',
                            './assets/global/plugins/datatables/datatables.min.css',
                            // './assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                            './assets/global/plugins/select2/dist/css/select2.min.css',
                            './assets/pages/css/process-bar.css',
                            './assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            './assets/global/plugins/kendo_ui/kendo_common.css',
                            './assets/global/plugins/kendo_ui/kendo_default.css',

                            './assets/global/plugins/kendo_ui/kendo_ui.js',
                            './assets/global/plugins/angularjs/plugins/ui-select/select.min.js',
                            './assets/global/plugins/clockface/js/clockface.js',
                            './assets/global/plugins/select2/dist/js/select2.full.js',
                            './assets/global/plugins/jstree/dist/jstree.min.js',
                            './assets/pages/scripts/ui-tree.min.js',
                            './assets/global/plugins/DataTables-1.10.15/media/js/jquery.dataTables.js',
                            './assets/global/plugins/jquery.pulsate.min.js',

                            'views/rowlog-l10.js',
                            'views/net_protocol.js',
                            'js/controllers/NewInvestigationController.js'

                        ]
                    }]);
                }]
            }
        })

        // Investigation Record
        .state('investigationrecord', {
            url: "/investigation_record",
            templateUrl: "views/investigation_record.html",
            data: {pageTitle: '调查记录'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            './assets/global/plugins/datatables/datatables.min.css',
                            './assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                            './assets/global/plugins/DataTables-1.10.15/extensions/RowGroup/css/rowGroup.dataTables.css',
                            './assets/global/plugins/DataTables-1.10.15/extensions/Select/css/select.dataTables.css',
                            './assets/pages/css/endpoint_management.css',

                            './assets/global/plugins/bootstrap-tabdrop/js/bootstrap-tabdrop.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Event Tree
        .state('eventtree', {
            url: "/event_tree",
            templateUrl: "views/event_tree.html",
            data: {pageTitle: '事件树'},
            controller: "EventTreeController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            'tree/d3.v3.js',
                            'tree/dndTree.js',
                            'tree/FileSaver.js',
                            'js/controllers/EventTreeController.js',
                            'tree/mindmap.css',
                            'views/rowlog-l10.js'

                        ]
                    }]);
                }]
            }
        })

        // Endpoint Management
        .state('endpointmanagement', {
            url: "/endpoint_management",
            templateUrl: "views/endpoint_management.html",
            data: {pageTitle: '探针管理'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            './assets/global/plugins/datatables/datatables.min.css',
                            // './assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                            './assets/global/plugins/DataTables-1.10.15/extensions/RowGroup/css/rowGroup.dataTables.css',
                            './assets/global/plugins/DataTables-1.10.15/extensions/Select/css/select.dataTables.css',
                            './assets/pages/css/endpoint_management.css',

                            // './assets/global/plugins/DataTables-1.10.15/media/js/jquery.dataTables.js',
                            // './assets/global/plugins/DataTables-1.10.15/media/js/datatables.bootstrap.js',
                            // './assets/global/plugins/DataTables-1.10.15/extensions/RowGroup/js/dataTables.rowGroup.js',
                            // './assets/global/plugins/DataTables-1.10.15/extensions/Select/js/dataTables.select.js',
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Tree View
        .state('tree', {
            url: "/tree",
            templateUrl: "views/tree.html",
            data: {pageTitle: 'jQuery Tree View'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            './assets/global/plugins/jstree/dist/themes/default/style.min.css',

                            './assets/global/plugins/jstree/dist/jstree.min.js',
                            './assets/pages/scripts/ui-tree.min.js',
                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Form Tools
        .state('formtools', {
            url: "/form-tools",
            templateUrl: "views/form_tools.html",
            data: {pageTitle: 'Form Tools'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            './assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            './assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
                            './assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',
                            './assets/global/plugins/typeahead/typeahead.css',

                            './assets/global/plugins/fuelux/js/spinner.min.js',
                            './assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                            './assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
                            './assets/global/plugins/jquery.input-ip-address-control-1.0.min.js',
                            './assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
                            './assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
                            './assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
                            './assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
                            './assets/global/plugins/typeahead/handlebars.min.js',
                            './assets/global/plugins/typeahead/typeahead.bundle.min.js',
                            './assets/pages/scripts/components-form-tools-2.min.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Date & Time Pickers
        .state('pickers', {
            url: "/pickers",
            templateUrl: "views/pickers.html",
            data: {pageTitle: 'Date & Time Pickers'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            './assets/global/plugins/clockface/css/clockface.css',
                            './assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            './assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css',
                            './assets/global/plugins/bootstrap-colorpicker/css/colorpicker.css',
                            './assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',
                            './assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',

                            './assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            './assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js',
                            './assets/global/plugins/clockface/js/clockface.js',
                            './assets/global/plugins/moment.min.js',
                            './assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js',
                            './assets/global/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                            './assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js',

                            './assets/pages/scripts/components-date-time-pickers.min.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Custom Dropdowns
        .state('dropdowns', {
            url: "/dropdowns",
            templateUrl: "views/dropdowns.html",
            data: {pageTitle: 'Custom Dropdowns'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            './assets/global/plugins/bootstrap-select/css/bootstrap-select.min.css',
                            './assets/global/plugins/select2/css/select2.min.css',
                            './assets/global/plugins/select2/css/select2-bootstrap.min.css',

                            './assets/global/plugins/bootstrap-select/js/bootstrap-select.min.js',
                            './assets/global/plugins/select2/js/select2.full.min.js',

                            './assets/pages/scripts/components-bootstrap-select.min.js',
                            './assets/pages/scripts/components-select2.min.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    }]);
                }]
            }
        })

        // Advanced Datatables
        .state('datatablesAdvanced', {
            url: "/datatables/managed.html",
            templateUrl: "views/datatables/managed.html",
            data: {pageTitle: 'Advanced Datatables'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            './assets/global/plugins/datatables/datatables.min.css',
                            './assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',

                            './assets/global/plugins/datatables/datatables.all.min.js',

                            './assets/pages/scripts/table-datatables-managed.min.js',

                            'js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })

        // Ajax Datetables
        .state('datatablesAjax', {
            url: "/datatables/ajax.html",
            templateUrl: "views/datatables/ajax.html",
            data: {pageTitle: 'Ajax Datatables'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            './assets/global/plugins/datatables/datatables.min.css',
                            './assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                            './assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',

                            './assets/global/plugins/datatables/datatables.all.min.js',
                            './assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                            './assets/global/scripts/datatable.min.js',

                            'js/scripts/table-ajax.js',
                            'js/controllers/GeneralPageController.js'
                        ]
                    });
                }]
            }
        })

        // User Profile
        .state("profile", {
            url: "/profile",
            templateUrl: "views/profile/main1.html",
            data: {pageTitle: 'User Profile'},
            controller: "UserProfileController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            './assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            './assets/pages/css/profile-new.css',

                            './assets/global/plugins/jquery.sparkline.min.js',
                            './assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',

                            './assets/pages/scripts/profile.min.js',

                            //'views/profile/accountData.js',

                            'js/controllers/UserProfileController.js'
                        ]
                    });
                }]
            }
        })


        // User Profile ChangePassword
        .state("profile.changepassword", {
            //parmas:{"username":{}},
            url: "/changepassword/{username}",
            templateUrl: "views/profile/changepassword.html",
            data: {pageTitle: 'User Profile'}
            //controller: "ChangeUserPasswordController",
            //resolve: {
            //    deps: ['$ocLazyLoad', function($ocLazyLoad) {
            //        return $ocLazyLoad.load({
            //            name: 'MetronicApp',
            //            insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
            //            files: [
            //                './assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
            //                './assets/pages/css/profile-new.css',
            //
            //                './assets/global/plugins/jquery.sparkline.min.js',
            //                './assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
            //
            //                './assets/pages/scripts/profile.min.js',
            //
            //                'js/controllers/ChangeUserPasswordController.js'
            //            ]
            //        });
            //    }]
            //}
        })

        // User Profile ChangePassword
        .state("profile.accountlist", {
            url: "/accountlist",
            templateUrl: "views/profile/accountlist.html",
            data: {pageTitle: 'User Profile'}
        })


        // User Profile Dashboard
        .state("profile.dashboard", {
            url: "/dashboard",
            templateUrl: "views/profile/dashboard.html",
            data: {pageTitle: 'User Profile'}
        })

        // User Profile Account
        .state("profile.account", {
            url: "/account",
            templateUrl: "views/profile/account.html",
            data: {pageTitle: 'User Account'}
        })

        // User Profile Help
        .state("profile.help", {
            url: "/help",
            templateUrl: "views/profile/help.html",
            data: {pageTitle: 'User Help'}
        })



        // network
        .state("network", {
            url: "/network",
            templateUrl: "views/network.html",
            data: {pageTitle: 'Network'},
            controller: "NetworkController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            './assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            './assets/pages/css/network.css',

                            './assets/global/plugins/jquery.sparkline.min.js',
                            './assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',


                            'js/controllers/NetworkController.js'
                        ]
                    });
                }]
            }
        })

        // network interface
        .state("netinterface", {
            url: "/netinterface",
            templateUrl: "views/netinterface.html",
            data: {pageTitle: 'Network Interface'},
            controller: "NetInterfaceController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            './assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            './assets/global/plugins/bootstrap-switch/css/bootstrap-switch.css',
                            './assets/pages/css/netinterface.css',
                            './assets/pages/scripts/components-bootstrap-switch.min.js',
                            './assets/global/plugins/bootstrap-switch/js/bootstrap-switch.js',

                            './assets/global/plugins/jquery.sparkline.min.js',
                            './assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                            'js/controllers/NetInterfaceController.js',

                        ]
                    });
                }]
            }
        })

        // download
        .state("download", {
            url: "/download",
            templateUrl: "views/download.html",
            data: {pageTitle: 'Network Interface'},
            controller: "DownloadController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            './assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            './assets/pages/css/main.css',

                            './assets/global/plugins/jquery.sparkline.min.js',
                            './assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',

                            'js/controllers/DownloadController.js'
                        ]
                    });
                }]
            }
        })

        // download
        .state("time", {
            url: "/time",
            templateUrl: "views/time.html",
            data: {pageTitle: 'Time'},
            controller: "TimeController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            './assets/global/plugins/bootstrap-datetimepicker-3/css/bootstrap-datetimepicker.min.css',
                            './assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            //'./assets/global/plugins/bootstrap-select/css/bootstrap-select.css',

                            './assets/pages/css/time.css',
                            './assets/global/plugins/select2/js/select2.js',

                            './assets/global/plugins/select2/css/select2.css',
                            './assets/global/plugins/select2/css/select2-bootstrap.min.css',
                            //'./assets/global/plugins/bootstrap-select/js/bootstrap-select.js',
                            //'./assets/global/plugins/bootstrap-select/js/i18n/defaults-zh_CN.js',
                            './assets/global/plugins/jquery.sparkline.min.js',
                            './assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',

                            'js/controllers/TimeController.js'
                        ]
                    });
                }]
            }
        })

        // New Investigation
        .state('sysmaintain', {
            url: "/sysmaintain",
            templateUrl: "views/sysmaintain.html",
            data: {pageTitle: '新建调查'},
            controller: "SysmaintainController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'MetronicApp',
                        files: [
                            './assets/pages/css/sysmaintain.css',

                            'js/controllers/SysmaintainController.js'

                        ]
                    }]);
                }]
            }
        })

        // Todo
        .state('todo', {
            url: "/todo",
            templateUrl: "views/todo.html",
            data: {pageTitle: 'Todo'},
            controller: "TodoController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            './assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                            './assets/apps/css/todo-2.css',
                            './assets/global/plugins/select2/css/select2.min.css',
                            './assets/global/plugins/select2/css/select2-bootstrap.min.css',

                            './assets/global/plugins/select2/js/select2.full.min.js',

                            './assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',

                            './assets/apps/scripts/todo-2.min.js',

                            'js/controllers/TodoController.js'
                        ]
                    });
                }]
            }
        })

}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);

var DIalert = function (type, message) {
    $('.alert-message', $('.alert-' + type)).html(message);
    $('.alert-' + type).show();
    var alertClose = function() {
        $('.alert-' + type).hide();
    };
    setTimeout(alertClose, 10000)

};

var Modalalert = function(type,message,modalId){
    console.log($('#'+modalId+' .modal-header'));
    if(!$('#'+modalId+' .modal-header').next().hasClass('alert')) {
        $('#' + modalId + ' .modal-header').after('' +
            '<div  class="no-radius alert modal-alert-info display-hide margin-top-10" style="margin-bottom:0;background-color: #e0ebf9;border-color: #e0ebf9;color: #327ad5;">' +
            '<span class="alert-message"> alert-info </span>'
            + '<button class="close pull-right margin-top-5 margin-bottom-10 margin-right-10" data-close="alert"></button>'
            + '</div>'
            + '<div  class="no-radius alert modal-alert-danger display-hide margin-top-10" style="margin-bottom:0;background-color: #fbe1e3;border-color: #fbe1e3;color: #e73d4a;'
            + '"><span class="alert-message"> alert-danger </span>'
            + '<button class="close pull-right margin-top-5 margin-bottom-10 margin-right-10" data-close="alert"></button></div>'
            + '<div  class="no-radius alert modal-alert-success display-hide margin-top-10" style="margin-bottom:0;background-color: #abe7ed;border-color: #abe7ed;color: #27a4b0;'
            + '"><span class="alert-message"> alert-success </span>'
            + '<button class="close pull-right margin-top-5 margin-bottom-10 margin-right-10" data-close="alert"></button>'
            + '</div><div  class="no-radius alert modal-alert-warning display-hide margin-top-10" style="margin-bottom:0;background-color: #f9e491;border-color: #f9e491;color: #c29d0b;">'
            + '<span class="alert-message"> alert-warning </span>'
            + '<button class="close pull-right margin-top-5 margin-bottom-10 margin-right-10" data-close="alert"></button></div>');
    }
    $('.alert-message', $('#'+modalId+' .modal-alert-' + type)).html(message);
    $('#'+modalId+' .modal-alert-' + type).show();
    //console.log($(this));
    //console.log(this);

    var alertClose = function() {
        $('#'+modalId+' .modal-alert-' + type).hide();
    };
    setTimeout(alertClose, 10000);
}