<?php 

if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group(array(
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
        1 => array(
            'key' => 'field_shared_mailbox',
            'label' => __('Shared mailbox', 'modularity-mhbooking'),
            'name' => 'mod_mhbooking_shared_mailbox',
            'type' => 'email',
            'instructions' => __('Configure which shared mailbox to use.', 'modularity-mhbooking'),
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
        ),
        2 => array(
            'key' => 'field_meeting_subject',
            'label' => __('Meeting subject', 'modularity-mhbooking'),
            'name' => 'mod_mhbooking_meeting_subject',
            'type' => 'text',
            'instructions' => __('Configure the meeting subject that will be used in the application.', 'modularity-mhbooking'),
            'required' => 1,
            'conditional_logic' => 0,
            'wrapper' => array(
                'width' => '',
                'class' => '',
                'id' => '',
            ),
            'default_value' => '',
            'placeholder' => '',
            'prepend' => '',
            'append' => '',
            'maxlength' => '',
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
}