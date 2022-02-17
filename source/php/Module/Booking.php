<?php

namespace ModularityMhBooking\Module;

use ModularityMhBooking\Helper\CacheBust;

/**
 * Class Booking
 * @package Booking\Module
 */
class Booking extends \Modularity\Module
{
    public $slug = 'mhbooking';
    public $supports = array();

    public function init()
    {
        $this->nameSingular = __("Booking", 'modularity-mhbooking');
        $this->namePlural = __("Booking", 'modularity-mhbooking');
        $this->description = __("Adds a booking feature for Mitt Helsingborg as a module.", 'modularity-mhbooking');
    }

    /**
     * Data array
     * @return array $data
     */
    public function data(): array
    {
        $data = array();

        //Append field config
        $data = array_merge($data, (array) \Modularity\Helper\FormatObject::camelCase(
            get_fields($this->ID)
        ));

        //Translations
        $data['lang'] = (object) array(
            'info' => __(
                "Hey! This is your new Modularity Booking (MH) module. Let's get going.",
                'modularity-mhbooking'
            )
        );

        return $data;
    }

    /**
     * Blade Template
     * @return string
     */
    public function template(): string
    {
        return "mhbooking.blade.php";
    }

    /**
     * Style - Register & adding css
     * @return void
     */
    public function style()
    {
        //Register custom css
        wp_register_style(
            'modularity-mhbooking',
            MODULARITY_MH_BOOKING_URL . '/dist/' . CacheBust::name('css/modularity-mhbooking.css'),
            null,
            '1.0.0'
        );

        //Enqueue
        wp_enqueue_style('modularity-mhbooking');
    }

    /**
     * Script - Register & adding scripts
     * @return void
     */
    public function script()
    {
        //Register custom css
        wp_register_script(
            'modularity-mhbooking',
            MODULARITY_MH_BOOKING_URL . '/dist/' . CacheBust::name('js/modularity-mhbooking.js'),
            null,
            '1.0.0'
        );

        //Enqueue
        wp_enqueue_script('modularity-mhbooking');
    }

    /**
     * Available "magic" methods for modules:
     * init()            What to do on initialization
     * data()            Use to send data to view (return array)
     * style()           Enqueue style only when module is used on page
     * script            Enqueue script only when module is used on page
     * adminEnqueue()    Enqueue scripts for the module edit/add page in admin
     * template()        Return the view template (blade) the module should use when displayed
     */
}
