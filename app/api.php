<?php
/**
 * Usage
 * /api/$apiModule/$apiAction?host=$host[&token_auth=343434...]
 * Example
 * /api/UsersManager/getTokenAuth?host=http://demo.piwik.org&login=myUsername&md5Password=3434A34...
 * /api/API/getReportMetadata?host=http://demo.piwik.org&token_auth=3434A34...&idSite=1&date=2014-01-01&period=day
 */

function sendError ($message) {
    echo json_encode(array('result' => 'error', 'message' => $message));
    exit;
}

$url = parse_url($_SERVER['REQUEST_URI']);

if (!preg_match('/api\/(.+?)\/(.+)/', trim($url['path'], '/'), $matches)) {
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
