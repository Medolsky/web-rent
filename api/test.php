<?php
echo json_encode(["status"=>"ok","php"=>phpversion(),"sapi"=>php_sapi_name()]);
