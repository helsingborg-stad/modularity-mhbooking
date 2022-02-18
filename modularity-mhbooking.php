<?php

/**
 * Plugin Name:       Modularity Booking (MH)
 * Plugin URI:        https://github.com/helsingborg-stad/modularity-mhbooking
 * Description:       Adds a booking feature for Mitt Helsingborg as a module.
 * Version:           1.0.0
 * Author:            Sebastian Thulin
 * Author URI:        https://github.com/helsingborg-stad
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       mod-mhbooking
 * Domain Path:       /languages
 */

 // Protect agains direct file access
if (! defined('WPINC')) {
    die;
}

define('MODULARITY_MH_BOOKING_PATH', plugin_dir_path(__FILE__));
define('MODULARITY_MH_BOOKING_URL', plugins_url('', __FILE__));
define('MODULARITY_MH_BOOKING_TEMPLATE_PATH', MODULARITY_MH_BOOKING_PATH . 'templates/');
define('MODULARITY_MH_BOOKING_VIEW_PATH', MODULARITY_MH_BOOKING_PATH . 'views/');
define('MODULARITY_MH_BOOKING_MODULE_VIEW_PATH', plugin_dir_path(__FILE__) . 'source/php/Module/views');
define('MODULARITY_MH_BOOKING_MODULE_PATH', MODULARITY_MH_BOOKING_PATH . 'source/php/Module/');

load_plugin_textdomain('modularity-mhbooking', false, plugin_basename(dirname(__FILE__)) . '/languages');

require_once MODULARITY_MH_BOOKING_PATH . 'source/php/Vendor/Psr4ClassLoader.php';
require_once MODULARITY_MH_BOOKING_PATH . 'Public.php';

// Instantiate and register the autoloader
$loader = new ModularityMhBooking\Vendor\Psr4ClassLoader();
$loader->addPrefix('ModularityMhBooking', MODULARITY_MH_BOOKING_PATH);
$loader->addPrefix('ModularityMhBooking', MODULARITY_MH_BOOKING_PATH . 'source/php/');
$loader->register();

// Acf auto import and export
$acfExportManager = new \AcfExportManager\AcfExportManager();
$acfExportManager->setTextdomain('modularity-mhbooking');
$acfExportManager->setExportFolder(MODULARITY_MH_BOOKING_PATH . 'source/php/AcfFields/');
$acfExportManager->autoExport(array(
    'mhbooking-module' => 'group_620f6978b127c', //Update with acf id here, module view
));
$acfExportManager->import();

// Modularity 3.0 ready - ViewPath for Component library
add_filter('/Modularity/externalViewPath', function ($arr) {
    $arr['mod-mhbooking'] = MODULARITY_MH_BOOKING_MODULE_VIEW_PATH;
    return $arr;
}, 10, 3);

// Start application
new ModularityMhBooking\App();
