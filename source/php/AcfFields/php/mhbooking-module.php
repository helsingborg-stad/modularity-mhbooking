<?php 



    'key' => 'group_620f6978b127c',
    'title' => __('Settings for Booking Service', 'modularity-mhbooking'),
    'fields' => array(
        0 => array(
            'key' => 'field_620f6984f8b48',
            'label' => __('Endpoint for Mitt Helsingborg Booking Service', 'modularity-mhbooking'),
            'name' => 'mod_mhbooking_endpoint',
            'type' => 'url',
            'instructions' => __('You can get the endpoint from the Mitt Helsingborg Team.', 'modularity-mhbooking'),
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
        ),
    ),
    'location' => array(
        0 => array(
            0 => array(
                'param' => 'post_type',
                'operator' => '==',
                'value' => 'mod-mhbooking',
            ),
        ),
        1 => array(
            0 => array(
                'param' => 'block',
                'operator' => '==',
                'value' => 'acf/mhbooking',
            ),
        ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => true,
    'description' => '',
));
