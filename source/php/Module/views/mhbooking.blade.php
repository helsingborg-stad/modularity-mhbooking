@if (!$hideTitle)
    @typography([
        'element' => "h2"
    ])
        {{ $postTitle }}
    @endtypography
@endif

<div id="mh-mount-booking" class="mh-mount-booking">
    @paper(['attributeList' => ['style' => 'height: 500px;'], 'classList' => ['u-preloader']])
    @endpaper
</div>