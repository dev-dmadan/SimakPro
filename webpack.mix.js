const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.copyDirectory('node_modules/admin-lte/dist/img', 'public/assets/img');

mix.js('resources/js/app.js', 'public/js')
    
    // home
    .js('resources/js/app/home/dashboard.js', 'public/js/app/home')

    // bank
    .js('resources/js/app/bank/list.js', 'public/js/app/bank')
    .js('resources/js/app/bank/page.js', 'public/js/app/bank')
    .js('resources/js/app/bank/view.js', 'public/js/app/bank')

    // project
    .js('resources/js/app/project/list.js', 'public/js/app/project')
    .js('resources/js/app/project/page.js', 'public/js/app/project')
    .js('resources/js/app/project/view.js', 'public/js/app/project')

    // project operational
    .js('resources/js/app/project_operational/list.js', 'public/js/app/project_operational')
    .js('resources/js/app/project_operational/page.js', 'public/js/app/project_operational')
    .js('resources/js/app/project_operational/view.js', 'public/js/app/project_operational')

    // company operational
    .js('resources/js/app/company_operational/list.js', 'public/js/app/company_operational')
    .js('resources/js/app/company_operational/page.js', 'public/js/app/company_operational')
    .js('resources/js/app/company_operational/view.js', 'public/js/app/company_operational')

    // kas kecil submission
    .js('resources/js/app/kas_kecil_submission/list.js', 'public/js/app/kas_kecil_submission')
    .js('resources/js/app/kas_kecil_submission/page.js', 'public/js/app/kas_kecil_submission')
    .js('resources/js/app/kas_kecil_submission/view.js', 'public/js/app/kas_kecil_submission')

    // sub kas kecil submission
    .js('resources/js/app/sub_kas_kecil_submission/list.js', 'public/js/app/sub_kas_kecil_submission')
    .js('resources/js/app/sub_kas_kecil_submission/page.js', 'public/js/app/sub_kas_kecil_submission')
    .js('resources/js/app/sub_kas_kecil_submission/view.js', 'public/js/app/sub_kas_kecil_submission')

    // contact
    .js('resources/js/app/contact/list.js', 'public/js/app/contact')
    .js('resources/js/app/contact/page.js', 'public/js/app/contact')
    .js('resources/js/app/contact/view.js', 'public/js/app/contact')

    // user
    .js('resources/js/app/user/list.js', 'public/js/app/user')
    .js('resources/js/app/user/page.js', 'public/js/app/user')
    .js('resources/js/app/user/view.js', 'public/js/app/user')

    // lookup
    .js('resources/js/app/lookup/list.js', 'public/js/app/lookup')
    .js('resources/js/app/lookup/page.js', 'public/js/app/lookup')
    .js('resources/js/app/lookup/view.js', 'public/js/app/lookup')

    // css
    .sass('resources/sass/app.scss', 'public/css')
    .version();