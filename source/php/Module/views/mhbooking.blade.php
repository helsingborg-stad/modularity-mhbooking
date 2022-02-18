@if(!empty($modMhbookingEndpoint))
    @card(['context' => 'module.mhbooking'])
        <div class="c-card__body">
            @if (!$hideTitle)
                @typography([
                    'element' => "h2",
                    'classList' => ['c-card__heading'],
                ])
                    {{ $postTitle }}
                @endtypography
            @endif
            <div id="mh-mount-booking" class="mh-mount-booking" data-endpoint="{{ $modMhbookingEndpoint }}">
                <!-- Mount of MH Booking -->
            </div>
        </div>
    @endcard
@else
    @notice([
        'type' => 'warning',
        'message' => [
            'text' => $lang->missingEp,
        ],
        'icon' => [
            'name' => 'report',
            'size' => 'md',
            'color' => 'black'
        ]
    ])
    @endnotice
@endif