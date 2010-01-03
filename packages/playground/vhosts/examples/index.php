<?php

$uri = $_SERVER['REQUEST_URI'];

if($uri=='/') {
?>    
    <p><a href="/github/Gozala/experiments/commonjs/index.html">/github/Gozala/experiments/commonjs/index.html</a></p>
<?php    
} else {
    
    $file = dirname(dirname(dirname(__FILE__))) . "/examples" . $uri;
    
    readfile($file);    
}
