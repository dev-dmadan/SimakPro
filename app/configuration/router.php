<?php
Defined('BASE_PATH') or die(ACCESS_DENIED);

/** USE THIS CODE IF YOUR PROJECT IN SUBDIRECTORY OR NOT USE SERVER DEV BUILT-IN  */
    $base  = dirname($_SERVER['PHP_SELF']);
    if(ltrim($base, '/')) { 
        $_SERVER['REQUEST_URI'] = substr($_SERVER['REQUEST_URI'], strlen($base));
    }
/** USE THIS CODE IF YOUR PROJECT IN SUBDIRECTORY OR NOT USE SERVER DEV BUILT-IN */

$__request = new Request();
$route = new \Klein\Klein();

/**
 * Example add Routing
 * $route->responsd(method, uri, closure);
 * 
 * $route->respond('GET', '/home', function() use ($__request) {
 *  $__request->call(controller/method, data, caseSensitive)
 * });
 * 
 * $route->respond('GET', '/home', function() use ($__request) {
 *  $__request->call('home/index', array())
 * });
 * 
 * $route->respond('PUT', '/product/[:id]', function($request) use ($__request) {
 *  $__request->call('ProductSales/Edit', array($request->id), true)
 * });
 */

/** Your custom route */

    /** Auth */

        $route->respond('GET', '/login', function() use ($__request) {
            $__request->call('login');
        });

        $route->respond('POST', '/login', function() use ($__request) {
            $__request->call('Login/doLogin', array(), true);
        });

        $route->respond('GET', '/logout', function() use ($__request) {
            $__request->call('Login/logout', array(), true);
        });

    /** End Auth */
    
    /** Lookup */
        
        $route->respond('POST', '/lookup/[:lookupName]', function($request) use ($__request) {
            $__request->call('lookup/getLookup', array($request->lookupName));
        });

    /** End Lookup */

    /** Export Excel */
    /** End Export Excel */

    /** Home */

        $route->respond('GET', '/', function() use ($__request) {
            $__request->call('home');
        });

    /** End Home */

    /** Bank */
        
        $route->respond('GET', '/bank', function() use ($__request) {
            $__request->call('bank');
        });

        $route->respond('POST', '/bank/save', function() use ($__request) {
            $__request->call('bank/save');
        });
        
        $route->respond('UPDATE', '/bank/edit/[:id]', function($request) use ($__request) {
            $__request->call('bank/edit', array($request->id));
        });

        $route->respond('DELETE', '/bank/delete/[:id]', function($request) use ($__request) {
            $__request->call('bank/delete', array($request->id));
        });

        $route->respond('GET', '/bank/view/[:id]', function($request) use ($__request) {
            $__request->call('bank/detail', array($request->id));
        });

        $route->respond('GET', '/bank/[:id]', function($request) use ($__request) {
            $__request->call('bank/getData', array($request->id));
        });

        $route->respond('POST', '/bank/get/datatable', function() use ($__request) {
            $__request->call('bank/getDatatable');
        });

        $route->respond('POST', '/bank/get/access-right', function() use ($__request) {
            $__request->call('bank/getAccessRight');
        });

    /** End Bank */

/** End Your custom route */

$route->respond('GET', '/migrate/[full|procedure|view:type]/[dev|prod:environment]/[:filename]', function($request) {
    $migrate = new Migrate($request->type, $request->environment, $request->filename);
});

/** Error Request */
$route->onHttpError(function($code, $router) use ($__request) {
    switch ($code) {
        case 404:
            $router->response()->body($__request->error(404));
            break;
        case 405:
            $router->response()->body($__request->error(405));
            break;
        default:
            $router->response()->body($__request->error());
    }
});
/** End Error Request */

$route->dispatch();