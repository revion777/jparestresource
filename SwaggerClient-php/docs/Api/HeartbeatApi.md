# Swagger\Client\HeartbeatApi

All URIs are relative to *https://localhost/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**heartbeat**](HeartbeatApi.md#heartbeat) | **GET** /heartbeat | 


# **heartbeat**
> string heartbeat()



### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new Swagger\Client\Api\HeartbeatApi();

try {
    $result = $api_instance->heartbeat();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling HeartbeatApi->heartbeat: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters
This endpoint does not need any parameter.

### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

