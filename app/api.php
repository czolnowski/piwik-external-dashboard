<?php

function sendError ($message) {
    echo json_encode(array('result' => 'error', 'message' => $message));
    exit;
}

$url = parse_url($_SERVER['REQUEST_URI']);

if (!preg_match('/\/api\/(.+?)\/(.+?)[\/|$]/', $url['path'], $matches)) {
    sendError('Wrong URL format. Should be /api/$module/$action?...');
}

$module = $matches[1];
$action = $matches[2];

$urlParams = $_POST + $_GET;
$urlParams['module'] = 'API';
$urlParams['method'] = $module . '.' . $action;

if (empty($urlParams['host'])) {
    sendError('Missing host parameter');
}

$host = $urlParams['host'];
unset($urlParams['host']);

if (empty($urlParams['token_auth']) || 32 != strlen($urlParams['token_auth'])) {
    $urlParams['token_auth'] = 'anonymous';
}

$url = $host . '?format=json&' . http_build_query($urlParams);

$fetched = file_get_contents($url);

if (!$fetched) {
    sendError('Error fetching content from API. Maybe no connection to the Internet?');
}

echo $fetched;