@if (!$hideTitle)
    @typography([
        'element' => "h2"
    ])
        {{ $postTitle }}
    @endtypography
@endif

@if(!empty($modMhbookingEndpoint))
    <div id="mh-mount-booking" class="mh-mount-booking" data-endpoint="{{ $modMhbookingEndpoint }}">
        @paper(['attributeList' => ['style' => 'height: 500px;'], 'classList' => ['u-preloader']])
        @endpaper
    </div>
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